const express = require("express");
const Gallery = require("../models/Gallery");
const { protect } = require("../middleware/auth");
const { adminOrManager, mainAdminOnly } = require("../middleware/adminOnly");
const { uploadGallery, uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");
const ApprovalRequest = require("../models/ApprovalRequest");
const AuditLog = require("../models/AuditLog");

// Helper to log audit
const logAudit = async (req, action, targetId, details) => {
  await AuditLog.create({
    performedBy: req.user._id,
    userEmail: req.user.email,
    userRole: req.user.role,
    action,
    module: "gallery",
    targetId,
    details,
  });
};
const { uploadGallery, uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");

const router = express.Router();

// Helper: upload buffer to Cloudinary
const handleImageUpload = async (file, folder = "gallery") => {
  const result = await uploadToCloudinary(file.buffer, folder, { resource_type: "image" });
  return { url: result.secure_url, publicId: result.public_id };
};

// GET /api/gallery — public
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 24;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) filter.title = { $regex: req.query.search, $options: "i" };

    const [images, total] = await Promise.all([
      Gallery.find(filter).populate("uploadedBy", "fullName").sort({ createdAt: -1 }).skip(skip).limit(limit),
      Gallery.countDocuments(filter),
    ]);

    res.status(200).json({ success: true, data: images, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/gallery — single upload (admin or manager)
router.post("/", protect, adminOrManager, uploadGallery.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "Image is required." });

    const { title, category, description } = req.body;
    const { url, publicId } = await handleImageUpload(req.file);

    const payload = {
      image: url,
      publicId,
      title,
      category: category || "Student Projects",
      description,
      uploadedBy: req.user._id,
    };

    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "gallery",
        action: "create",
        payload,
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    const gallery = await Gallery.create(payload);
    await logAudit(req, "create", gallery._id, `Uploaded image to gallery`);
    res.status(201).json({ success: true, data: gallery });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// POST /api/gallery/bulk — multiple images upload (admin or manager)
router.post("/bulk", protect, adminOrManager, uploadGallery.array("images", 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required." });
    }

    const { category, description } = req.body;
    const titles = req.body.titles ? req.body.titles.split(",") : [];

    const uploadPromises = req.files.map((file, idx) => handleImageUpload(file));
    const uploaded = await Promise.all(uploadPromises);

    const galleryItems = uploaded.map(({ url, publicId }, idx) => ({
      image: url,
      publicId,
      title: titles[idx] ? titles[idx].trim() : `Image ${idx + 1}`,
      category: category || "Student Projects",
      description: description || "",
      uploadedBy: req.user._id,
    }));

    if (req.user.role === "manager") {
      // Create separate requests for each image so they can be approved individually
      const reqPromises = galleryItems.map(item => 
        ApprovalRequest.create({
          requestedBy: req.user._id,
          module: "gallery",
          action: "create",
          payload: item,
        })
      );
      await Promise.all(reqPromises);
      return res.status(202).json({ success: true, message: `${galleryItems.length} requests sent for Admin approval.` });
    }

    const created = await Gallery.insertMany(galleryItems);
    await logAudit(req, "create", null, `Bulk uploaded ${created.length} images to gallery`);
    res.status(201).json({ success: true, data: created, count: created.length });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/gallery/:id — admin or manager
router.put("/:id", protect, adminOrManager, uploadGallery.single("image"), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      const { url, publicId } = await handleImageUpload(req.file);
      updates.image = url;
      updates.publicId = publicId;
    }

    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "gallery",
        action: "update",
        targetId: req.params.id,
        payload: updates,
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    const gallery = await Gallery.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!gallery) return res.status(404).json({ success: false, message: "Gallery item not found." });

    await logAudit(req, "update", gallery._id, `Updated gallery item`);
    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/gallery/:id — admin or manager
router.delete("/:id", protect, adminOrManager, async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: "Gallery item not found." });

    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "gallery",
        action: "delete",
        targetId: req.params.id,
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    await deleteFromCloudinary(gallery.publicId);
    await gallery.deleteOne();
    
    await logAudit(req, "delete", gallery._id, `Deleted gallery item`);
    res.status(200).json({ success: true, message: "Gallery item deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
