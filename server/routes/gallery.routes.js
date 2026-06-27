const express = require("express");
const Gallery = require("../models/Gallery");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/adminOnly");
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

// POST /api/gallery — single upload (admin)
router.post("/", protect, adminOnly, uploadGallery.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "Image is required." });

    const { title, category, description } = req.body;
    const { url, publicId } = await handleImageUpload(req.file);

    const gallery = await Gallery.create({
      image: url,
      publicId,
      title,
      category: category || "Student Projects",
      description,
      uploadedBy: req.user._id,
    });

    res.status(201).json({ success: true, data: gallery });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// POST /api/gallery/bulk — multiple images upload (admin)
router.post("/bulk", protect, adminOnly, uploadGallery.array("images", 20), async (req, res) => {
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

    const created = await Gallery.insertMany(galleryItems);
    res.status(201).json({ success: true, data: created, count: created.length });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/gallery/:id — admin
router.put("/:id", protect, adminOnly, uploadGallery.single("image"), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      const { url, publicId } = await handleImageUpload(req.file);
      updates.image = url;
      updates.publicId = publicId;
    }

    const gallery = await Gallery.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!gallery) return res.status(404).json({ success: false, message: "Gallery item not found." });

    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/gallery/:id — admin
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: "Gallery item not found." });

    await deleteFromCloudinary(gallery.publicId);
    await gallery.deleteOne();
    res.status(200).json({ success: true, message: "Gallery item deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
