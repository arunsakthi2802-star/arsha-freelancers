const ApprovalRequest = require("../models/ApprovalRequest");
const AuditLog = require("../models/AuditLog");
const User = require("../models/User");
const Story = require("../models/Story");
const Review = require("../models/Review");
const Gallery = require("../models/Gallery");

// Helper to log audit
const logAudit = async (req, action, module, targetId, details) => {
  await AuditLog.create({
    performedBy: req.user._id,
    userEmail: req.user.email,
    userRole: req.user.role,
    action,
    module,
    targetId,
    details,
  });
};

// GET /api/approvals (Admin gets all, Manager gets theirs)
exports.getApprovalRequests = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "manager") {
      query.requestedBy = req.user._id;
    }
    const requests = await ApprovalRequest.find(query)
      .populate("requestedBy", "fullName email")
      .populate("processedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/approvals/:id/decide (Main Admin Only)
exports.decideApproval = async (req, res) => {
  try {
    const { status, adminComment } = req.body;
    
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const request = await ApprovalRequest.findById(req.params.id).populate("requestedBy", "email");
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ success: false, message: `Request is already ${request.status}` });
    }

    request.status = status;
    request.adminComment = adminComment || "";
    request.processedBy = req.user._id;
    request.processedAt = new Date();

    let executedSuccessfully = false;

    // Execute the requested change if approved
    if (status === "approved") {
      const { module, action, payload, targetId } = request;

      try {
        if (module === "users") {
          if (action === "create") await User.create(payload);
          else if (action === "update") await User.findByIdAndUpdate(targetId, payload);
          else if (action === "delete") await User.findByIdAndDelete(targetId);
        } else if (module === "stories") {
          if (action === "create") await Story.create(payload);
          else if (action === "update") await Story.findByIdAndUpdate(targetId, payload);
          else if (action === "delete") await Story.findByIdAndDelete(targetId);
        } else if (module === "gallery") {
          if (action === "create") await Gallery.create(payload);
          else if (action === "update") await Gallery.findByIdAndUpdate(targetId, payload);
          else if (action === "delete") await Gallery.findByIdAndDelete(targetId);
        } else if (module === "reviews") {
          if (action === "update") await Review.findByIdAndUpdate(targetId, payload);
          else if (action === "delete") await Review.findByIdAndDelete(targetId);
        }
        executedSuccessfully = true;
      } catch (execError) {
        return res.status(500).json({ success: false, message: "Error executing approved change: " + execError.message });
      }
    }

    await request.save();

    await logAudit(
      req,
      status === "approved" ? "approve" : "reject",
      "approvals",
      request._id,
      `${status === "approved" ? "Approved" : "Rejected"} ${request.action} on ${request.module} requested by ${request.requestedBy.email}`
    );

    res.status(200).json({ success: true, data: request, executedSuccessfully });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/approvals/audit-logs (Main Admin Only)
exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate("performedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
