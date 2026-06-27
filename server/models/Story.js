const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Story title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Story description is required"],
      trim: true,
      maxlength: [10000, "Description cannot exceed 10000 characters"],
    },
    coverImage: {
      type: String,
      default: "",
    },
    coverImagePublicId: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["Success Story", "Project Showcase", "Workshop", "Announcement", "Tips & Tricks", "Other"],
      default: "Success Story",
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
    tags: [{ type: String, trim: true }],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Full-text search index
storySchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Story", storySchema);
