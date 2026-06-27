const express = require("express");
const Review = require("../models/Review");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/adminOnly");
const { uploadReview, uploadToCloudinary } = require("../config/cloudinary");

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

// PUT /api/reviews/:id — admin only
router.put("/:id", protect, adminOnly, uploadReview.single("studentPhoto"), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "reviews");
      updates.studentPhoto = result.secure_url;
    }

    const review = await Review.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!review) return res.status(404).json({ success: false, message: "Review not found." });

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/reviews/:id — admin only
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found." });
    res.status(200).json({ success: true, message: "Review deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/reviews/:id/approve — admin
router.post("/:id/approve", protect, adminOnly, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approvalStatus: "approved" },
      { new: true }
    );
    if (!review) return res.status(404).json({ success: false, message: "Review not found." });
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/reviews/:id/reject — admin
router.post("/:id/reject", protect, adminOnly, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approvalStatus: "rejected" },
      { new: true }
    );
    if (!review) return res.status(404).json({ success: false, message: "Review not found." });
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
