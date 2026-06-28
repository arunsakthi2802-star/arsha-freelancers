const mainAdminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Main Admins only.",
    });
  }
  next();
};

const adminOrManager = (req, res, next) => {
  if (!req.user || (req.user.role !== "admin" && req.user.role !== "manager")) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins or Managers only.",
    });
  }
  next();
};

module.exports = { mainAdminOnly, adminOrManager, adminOnly: adminOrManager };
