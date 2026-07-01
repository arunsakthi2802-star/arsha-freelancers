const express = require("express");
const Message = require("../models/Message");
const { protect } = require("../middleware/auth");

const router = express.Router();

// GET /api/messages/all - get all messages
router.get("/all", protect, async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("sender", "fullName email role")
      .populate("receiver", "fullName email role")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET /api/messages/by-subject/:subject - get messages by subject heading
router.get("/by-subject/:subject", protect, async (req, res) => {
  try {
    const messages = await Message.find({ subject: req.params.subject })
      .populate("sender", "fullName email role")
      .populate("receiver", "fullName email role")
      .sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// POST /api/messages
router.post("/", protect, async (req, res) => {
  try {
    const message = await Message.create({
      ...req.body,
      sender: req.user._id
    });
    
    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "fullName email role")
      .populate("receiver", "fullName email role");
      
    res.status(201).json({ success: true, data: populatedMessage });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// PUT /api/messages/:id/read
router.put("/:id/read", protect, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// DELETE /api/messages/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
