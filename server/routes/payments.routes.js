const express = require("express");
const Payment = require("../models/Payment");
const { protect } = require("../middleware/auth");

const router = express.Router();

// GET /api/payments/my-payments
router.get("/my-payments", protect, async (req, res) => {
  try {
    const payments = await Payment.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error("Fetch payments error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET /api/payments/all
router.get("/all", protect, async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("student", "fullName email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error("Fetch all payments error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// POST /api/payments
router.post("/", protect, async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    const populatedPayment = await Payment.findById(payment._id)
      .populate("student", "fullName email");
    res.status(201).json({ success: true, data: populatedPayment });
  } catch (error) {
    console.error("Create payment error:", error);
    res.status(500).json({ success: false, message: error.message || "Server Error" });
  }
});

// PUT /api/payments/:id
router.put("/:id", protect, async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate("student", "fullName email");
      
    if (!updatedPayment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }
    res.status(200).json({ success: true, data: updatedPayment });
  } catch (error) {
    console.error("Update payment error:", error);
    res.status(500).json({ success: false, message: error.message || "Server Error" });
  }
});

// DELETE /api/payments/:id (Managers & Admins - Temporarily opened for testing)
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Delete payment error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
