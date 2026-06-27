const express = require("express");
const Contact = require("../models/Contact");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/adminOnly");

const router = express.Router();

// POST /api/contact — public
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const contact = await Contact.create({ name, email, phone, subject, message });
    res.status(201).json({ success: true, data: contact, message: "Message sent successfully." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET /api/contact — admin
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
        { subject: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const [contacts, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(filter),
    ]);

    res.status(200).json({ success: true, data: contacts, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/contact/:id — admin (mark as read/replied)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: "Enquiry not found." });
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/contact/:id — admin
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: "Enquiry not found." });
    res.status(200).json({ success: true, message: "Enquiry deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/contact/stats — admin dashboard stats
router.get("/stats/counts", protect, adminOnly, async (req, res) => {
  try {
    const [total, unread] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: "unread" }),
    ]);
    res.status(200).json({ success: true, data: { total, unread } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
