const express = require("express");
const Service = require("../models/Service");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/adminOnly");

const router = express.Router();

// GET /api/services — public (only active by default)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    else filter.status = "active";

    const services = await Service.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/services/all — admin (all statuses)
router.get("/all", protect, adminOnly, async (req, res) => {
  try {
    const services = await Service.find({}).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/services — admin
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/services/:id — admin
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) return res.status(404).json({ success: false, message: "Service not found." });
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/services/:id — admin
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: "Service not found." });
    res.status(200).json({ success: true, message: "Service deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/services/:id/toggle — toggle active/inactive
router.post("/:id/toggle", protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: "Service not found." });
    service.status = service.status === "active" ? "inactive" : "active";
    await service.save();
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
