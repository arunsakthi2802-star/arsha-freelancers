const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectType: {
      type: String,
      required: true,
      enum: ["academic", "custom", "internship", "mini"],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    technology: {
      type: [String],
      required: true,
    },
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Order Confirmed", "Requirements Verified", "Development Started", "Testing", "Documentation", "Completed"],
      default: "Order Confirmed",
    },
    deadline: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    mainDriveLink: {
      type: String,
      default: "",
    },
    files: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        fileType: { type: String, enum: ["drive", "pdf", "zip", "image"], default: "drive" },
        isUnlocked: { type: Boolean, default: true },
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        uploadedAt: { type: Date, default: Date.now },
      }
    ],
    versionHistory: [
      {
        version: String,
        description: String,
        date: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
