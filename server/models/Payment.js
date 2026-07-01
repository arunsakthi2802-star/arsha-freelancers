const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["advance", "milestone", "final"],
      required: true,
    },
    currency: {
      type: String,
      default: "RS"
    },
    status: {
      type: String,
      enum: ["pending", "closing", "scheduled", "paid", "completed", "failed", "refunded"],
      default: "pending",
    },
    transactionId: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["upi", "card", "net_banking", "cash"],
    },
    invoiceUrl: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
