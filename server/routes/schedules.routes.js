const express = require("express");
const Schedule = require("../models/Schedule");
const { protect } = require("../middleware/auth");
const { adminOrManager } = require("../middleware/adminOnly");

const router = express.Router();

// POST /api/schedules — Admin creates a schedule
router.post("/", protect, adminOrManager, async (req, res) => {
  try {
    const { user, title, description, date, time, type } = req.body;
    
    if (!user || !title || !date || !time) {
      return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }

    const schedule = await Schedule.create({
      user,
      title,
      description,
      date,
      time,
      type: type || "meeting",
      createdBy: req.user._id,
    });

    const populatedSchedule = await Schedule.findById(schedule._id).populate("user", "fullName email");
    res.status(201).json({ success: true, data: populatedSchedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/schedules — Admin gets all schedules
router.get("/", protect, adminOrManager, async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate("user", "fullName email")
      .populate("createdBy", "fullName")
      .sort({ date: 1 });
    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/schedules/my-schedules — User gets their own schedules
router.get("/my-schedules", protect, async (req, res) => {
  try {
    // Only get future schedules or recently past schedules
    const schedules = await Schedule.find({ user: req.user._id })
      .populate("createdBy", "fullName")
      .sort({ date: 1 });
    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/schedules/:id — Admin updates a schedule
router.put("/:id", protect, adminOrManager, async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("user", "fullName email");

    if (!schedule) {
      return res.status(404).json({ success: false, message: "Schedule not found" });
    }

    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/schedules/:id — Admin deletes a schedule
router.delete("/:id", protect, adminOrManager, async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: "Schedule not found" });
    }
    res.status(200).json({ success: true, message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
