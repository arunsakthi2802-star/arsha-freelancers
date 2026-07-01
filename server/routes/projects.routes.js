const express = require("express");
const Project = require("../models/Project");
const { protect } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/adminOnly");

const router = express.Router();

// GET /api/projects/my-projects
router.get("/my-projects", protect, async (req, res) => {
  try {
    const projects = await Project.find({ student: req.user._id })
      .populate("developer", "fullName email")
      .populate("manager", "fullName email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error("Fetch projects error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET /api/projects/all (Managers & Admins - Temporarily opened for testing)
router.get("/all", protect, async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("student", "fullName email")
      .populate("developer", "fullName email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error("Fetch all projects error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// PUT /api/projects/:id (Managers & Admins - Temporarily opened for testing)
router.put("/:id", protect, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// POST /api/projects (Managers & Admins - Temporarily opened for testing)
router.post("/", protect, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    const populatedProject = await Project.findById(project._id)
      .populate("student", "fullName email")
      .populate("developer", "fullName email");
    res.status(201).json({ success: true, data: populatedProject });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// DELETE /api/projects/:id (Managers & Admins - Temporarily opened for testing)
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
