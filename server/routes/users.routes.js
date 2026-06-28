const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const { adminOrManager, mainAdminOnly } = require("../middleware/adminOnly");
const { uploadProfile, uploadToCloudinary, uploadGeneric } = require("../config/cloudinary");
const bcrypt = require("bcryptjs");
const ApprovalRequest = require("../models/ApprovalRequest");
const AuditLog = require("../models/AuditLog");

const router = express.Router();

// Helper to log audit
const logAudit = async (req, action, targetId, details) => {
  await AuditLog.create({
    performedBy: req.user._id,
    userEmail: req.user.email,
    userRole: req.user.role,
    action,
    module: "users",
    targetId,
    details,
  });
};

// All user routes require admin or manager
router.use(protect, adminOrManager);

// GET /api/users — list all users with pagination & search
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const filter = search
      ? { $or: [{ fullName: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }] }
      : {};

    const [users, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    res.status(200).json({ success: true, data: users, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/users — Admin creates user
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, password, college, department, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "Email already registered." });

    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "users",
        action: "create",
        payload: { fullName, email, phone, password, college, department, role: role || "user" },
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    const user = await User.create({ fullName, email, phone, password, college, department, role: role || "user" });
    await logAudit(req, "create", user._id, `Created user ${email}`);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/users/:id
router.put("/:id", uploadProfile.single("profilePhoto"), async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) return res.status(404).json({ success: false, message: "User not found." });
    
    // Protect main admin account from being modified by other admins
    if (existingUser.email === "arunsakthi2802@gmail.com" && req.user.email !== "arunsakthi2802@gmail.com") {
      return res.status(403).json({ success: false, message: "Only the main admin can modify this account." });
    }

    const updates = { ...req.body };
    delete updates.password; // Use reset endpoint for password

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "profiles");
      updates.profilePhoto = result.secure_url;
    }

    if (updates.resources && typeof updates.resources === "string") {
      try {
        updates.resources = JSON.parse(updates.resources);
      } catch (err) {
        // ignore parsing error
      }
    }

    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "users",
        action: "update",
        targetId: req.params.id,
        payload: updates,
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    await logAudit(req, "update", user._id, `Updated user ${user.email}`);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    
    if (user.email === "arunsakthi2802@gmail.com") {
      return res.status(403).json({ success: false, message: "Main admin account cannot be deleted." });
    }

    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "users",
        action: "delete",
        targetId: req.params.id,
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    await user.deleteOne();
    await logAudit(req, "delete", user._id, `Deleted user ${user.email}`);
    res.status(200).json({ success: true, message: "User deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/users/:id/block — toggle block status
router.post("/:id/block", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    
    if (user.email === "arunsakthi2802@gmail.com") {
      return res.status(403).json({ success: false, message: "Main admin account cannot be blocked." });
    }

    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "users",
        action: "update",
        targetId: req.params.id,
        payload: { status: user.status === "active" ? "blocked" : "active" },
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    user.status = user.status === "active" ? "blocked" : "active";
    await user.save();
    
    await logAudit(req, "update", user._id, `${user.status === "blocked" ? "Blocked" : "Unblocked"} user ${user.email}`);
    res.status(200).json({ success: true, data: user, message: `User ${user.status}.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/users/:id/reset-password
router.post("/:id/reset-password", async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    
    if (user.email === "arunsakthi2802@gmail.com" && req.user.email !== "arunsakthi2802@gmail.com") {
      return res.status(403).json({ success: false, message: "Only the main admin can reset their password." });
    }

    if (req.user.role === "manager") {
      return res.status(403).json({ success: false, message: "Managers cannot reset passwords. Main Admin only." });
    }

    user.password = newPassword; // pre-save hook will hash it
    await user.save();

    await logAudit(req, "update", user._id, `Reset password for user ${user.email}`);
    res.status(200).json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/users/:id/change-role
router.post("/:id/change-role", async (req, res) => {
  try {
    const { role, adminPassword } = req.body;
    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role." });
    }

    if (role === "admin") {
      if (!adminPassword) {
        return res.status(400).json({ success: false, message: "Admin password is required to grant admin role." });
      }
      
      const activeAdmin = await User.findById(req.user._id).select("+password");
      if (!activeAdmin) {
        return res.status(401).json({ success: false, message: "Admin session invalid." });
      }

      const isMatch = await bcrypt.compare(adminPassword, activeAdmin.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Incorrect administrator password." });
      }
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    
    if (user.email === "arunsakthi2802@gmail.com") {
      return res.status(403).json({ success: false, message: "Main admin account role cannot be changed." });
    }

    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "users",
        action: "update",
        targetId: req.params.id,
        payload: { role },
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    user.role = role;
    await user.save();
    
    await logAudit(req, "update", user._id, `Changed role of user ${user.email} to ${role}`);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/users/upload-resource
router.post("/upload-resource", uploadGeneric.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const result = await uploadToCloudinary(req.file.buffer, "resources", {
      resource_type: "auto",
    });

    res.status(200).json({
      success: true,
      url: result.secure_url,
      message: "File uploaded successfully to Cloudinary.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
