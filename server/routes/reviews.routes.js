const express = require("express");
const Review = require("../models/Review");
const { protect } = require("../middleware/auth");
const { adminOrManager, mainAdminOnly } = require("../middleware/adminOnly");
const { uploadReview, uploadToCloudinary } = require("../config/cloudinary");
const ApprovalRequest = require("../models/ApprovalRequest");
const AuditLog = require("../models/AuditLog");

// Helper to log audit
const logAudit = async (req, action, targetId, details) => {
  await AuditLog.create({
    performedBy: req.user._id,
    userEmail: req.user.email,
    userRole: req.user.role,
    action,
    module: "reviews",
    targetId,
    details,
  });
};


const router = express.Router();

// GET /api/reviews — public gets only approved; admin gets all
router.get("/", async (req, res) => {
  try {
    const isAdmin = req.headers.authorization;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    let filter = {};

    // Public: only approved
    if (req.query.approved === "true") filter.approvalStatus = "approved";

    // Admin filters
    if (req.query.status) filter.approvalStatus = req.query.status;
    if (req.query.rating) filter.rating = parseInt(req.query.rating);
    if (req.query.college) filter.collegeName = { $regex: req.query.college, $options: "i" };
    if (req.query.search) {
      filter.$or = [
        { studentName: { $regex: req.query.search, $options: "i" } },
        { collegeName: { $regex: req.query.search, $options: "i" } },
        { projectTitle: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const [reviews, total] = await Promise.all([
      Review.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Review.countDocuments(filter),
    ]);

    res.status(200).json({ success: true, data: reviews, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/reviews — public can submit
router.post("/", uploadReview.single("studentPhoto"), async (req, res) => {
  try {
    const { studentName, collegeName, projectTitle, reviewMessage, rating } = req.body;

    const reviewData = { studentName, collegeName, projectTitle, reviewMessage, rating };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "reviews");
      reviewData.studentPhoto = result.secure_url;
    }

    const review = await Review.create(reviewData);
    res.status(201).json({ success: true, data: review, message: "Review submitted for approval." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/reviews/:id — admin or manager
router.put("/:id", protect, adminOrManager, uploadReview.single("studentPhoto"), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "reviews");
      updates.studentPhoto = result.secure_url;
    }

    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "reviews",
        action: "update",
        targetId: req.params.id,
        payload: updates,
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    const review = await Review.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!review) return res.status(404).json({ success: false, message: "Review not found." });

    await logAudit(req, "update", review._id, `Updated review by ${review.studentName}`);
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/reviews/:id — admin or manager
router.delete("/:id", protect, adminOrManager, async (req, res) => {
  try {
    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "reviews",
        action: "delete",
        targetId: req.params.id,
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found." });
    
    await logAudit(req, "delete", review._id, `Deleted review by ${review.studentName}`);
    res.status(200).json({ success: true, message: "Review deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/reviews/:id/approve — admin or manager
router.post("/:id/approve", protect, adminOrManager, async (req, res) => {
  try {
    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "reviews",
        action: "update",
        targetId: req.params.id,
        payload: { approvalStatus: "approved" },
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approvalStatus: "approved" },
      { new: true }
    );
    if (!review) return res.status(404).json({ success: false, message: "Review not found." });
    
    await logAudit(req, "update", review._id, `Approved review by ${review.studentName}`);
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/reviews/:id/reject — admin or manager
router.post("/:id/reject", protect, adminOrManager, async (req, res) => {
  try {
    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "reviews",
        action: "update",
        targetId: req.params.id,
        payload: { approvalStatus: "rejected" },
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approvalStatus: "rejected" },
      { new: true }
    );
    if (!review) return res.status(404).json({ success: false, message: "Review not found." });
    
    await logAudit(req, "update", review._id, `Rejected review by ${review.studentName}`);
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
