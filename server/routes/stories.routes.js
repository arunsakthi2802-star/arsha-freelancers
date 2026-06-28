const express = require("express");
const Story = require("../models/Story");
const { protect } = require("../middleware/auth");
const { adminOrManager, mainAdminOnly } = require("../middleware/adminOnly");
const { uploadStory, uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");
const ApprovalRequest = require("../models/ApprovalRequest");
const AuditLog = require("../models/AuditLog");

// Helper to log audit
const logAudit = async (req, action, targetId, details) => {
  await AuditLog.create({
    performedBy: req.user._id,
    userEmail: req.user.email,
    userRole: req.user.role,
    action,
    module: "stories",
    targetId,
    details,
  });
};
const { uploadStory, uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");

const router = express.Router();

// GET /api/stories — public (published only)
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const filter = { status: "published" };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const [stories, total] = await Promise.all([
      Story.find(filter).populate("author", "fullName profilePhoto").sort({ createdAt: -1 }).skip(skip).limit(limit).select("-__v"),
      Story.countDocuments(filter),
    ]);

    res.status(200).json({ success: true, data: stories, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/stories/admin/all — all stories (admin or manager)
router.get("/admin/all", protect, adminOrManager, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const [stories, total] = await Promise.all([
      Story.find(filter).populate("author", "fullName").sort({ createdAt: -1 }).skip(skip).limit(limit),
      Story.countDocuments(filter),
    ]);

    res.status(200).json({ success: true, data: stories, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/stories/:id
router.get("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate("author", "fullName profilePhoto");
    if (!story) return res.status(404).json({ success: false, message: "Story not found." });

    story.views += 1;
    await story.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, data: story });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/stories — admin or manager
router.post("/", protect, adminOrManager, uploadStory.single("coverImage"), async (req, res) => {
  try {
    const { title, description, category, status, tags } = req.body;
    const storyData = {
      title,
      description,
      category,
      status: status || "draft",
      author: req.user._id,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
    };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "stories");
      storyData.coverImage = result.secure_url;
      storyData.coverImagePublicId = result.public_id;
    }

    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "stories",
        action: "create",
        payload: storyData,
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    const story = await Story.create(storyData);
    await logAudit(req, "create", story._id, `Created story "${story.title}"`);
    res.status(201).json({ success: true, data: story });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/stories/:id — admin or manager
router.put("/:id", protect, adminOrManager, uploadStory.single("coverImage"), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.body.tags) updates.tags = req.body.tags.split(",").map((t) => t.trim());

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "stories");
      updates.coverImage = result.secure_url;
      updates.coverImagePublicId = result.public_id;
    }

    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "stories",
        action: "update",
        targetId: req.params.id,
        payload: updates,
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    const story = await Story.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!story) return res.status(404).json({ success: false, message: "Story not found." });

    await logAudit(req, "update", story._id, `Updated story "${story.title}"`);
    res.status(200).json({ success: true, data: story });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/stories/:id — admin or manager
router.delete("/:id", protect, adminOrManager, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ success: false, message: "Story not found." });

    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "stories",
        action: "delete",
        targetId: req.params.id,
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    await deleteFromCloudinary(story.coverImagePublicId);
    await story.deleteOne();
    
    await logAudit(req, "delete", story._id, `Deleted story "${story.title}"`);
    res.status(200).json({ success: true, message: "Story deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/stories/:id/publish — toggle publish/draft
router.post("/:id/publish", protect, adminOrManager, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ success: false, message: "Story not found." });

    if (req.user.role === "manager") {
      await ApprovalRequest.create({
        requestedBy: req.user._id,
        module: "stories",
        action: "update",
        targetId: req.params.id,
        payload: { status: story.status === "published" ? "draft" : "published" },
      });
      return res.status(202).json({ success: true, message: "Request sent for Admin approval." });
    }

    story.status = story.status === "published" ? "draft" : "published";
    await story.save();

    await logAudit(req, "update", story._id, `${story.status === "published" ? "Published" : "Unpublished"} story "${story.title}"`);
    res.status(200).json({ success: true, data: story });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
