const mongoose = require("mongoose");

const approvalRequestSchema = new mongoose.Schema(
  {
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    module: {
      type: String,
      enum: ["users", "stories", "gallery", "reviews", "projects", "resources"],
      required: true,
    },
    action: {
      type: String,
      enum: ["create", "update", "delete"],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      // Target document being updated or deleted (null for create)
    },
    payload: {
      type: mongoose.Schema.Types.Mixed,
      // The data to create or update
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminComment: {
      type: String,
      default: "",
    },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    processedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApprovalRequest", approvalRequestSchema);
