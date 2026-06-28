const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userEmail: {
      type: String, // Stored explicitly so log remains valid if user is deleted
      required: true,
    },
    userRole: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      enum: ["create", "update", "delete", "approve", "reject"],
      required: true,
    },
    module: {
      type: String,
      enum: ["users", "stories", "gallery", "reviews", "projects", "resources", "approvals"],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    details: {
      type: String, // E.g., "Updated user john@example.com"
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
