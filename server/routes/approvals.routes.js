const express = require("express");
const { protect } = require("../middleware/auth");
const { adminOrManager, mainAdminOnly } = require("../middleware/adminOnly");
const {
  getApprovalRequests,
  decideApproval,
  getAuditLogs
} = require("../controllers/approvals.controller");

const router = express.Router();

router.use(protect);
router.use(adminOrManager);

router.get("/", getApprovalRequests);
router.put("/:id/decide", mainAdminOnly, decideApproval);
router.get("/audit-logs", mainAdminOnly, getAuditLogs);

module.exports = router;
