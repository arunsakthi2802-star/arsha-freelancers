const express = require("express");
const Task = require("../models/Task");
const { protect } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/adminOnly");

const router = express.Router();

// GET /api/tasks (Temporarily opened for testing)
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("project", "title")
      .populate("assignedTo", "fullName email")
      .populate("createdBy", "fullName")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error("Fetch tasks error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// POST /api/tasks (Temporarily opened for testing)
router.post("/", protect, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user._id
    });
    const populatedTask = await Task.findById(task._id)
      .populate("project", "title")
      .populate("assignedTo", "fullName email")
      .populate("createdBy", "fullName");
    res.status(201).json({ success: true, data: populatedTask });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// PUT /api/tasks/:id (Temporarily opened for testing)
router.put("/:id", protect, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
    .populate("project", "title")
    .populate("assignedTo", "fullName email")
    .populate("createdBy", "fullName");
    
    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// DELETE /api/tasks/:id (Temporarily opened for testing)
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
