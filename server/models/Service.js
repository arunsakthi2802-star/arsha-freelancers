const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      maxlength: [150, "Service name cannot exceed 150 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    icon: {
      type: String,
      default: "Code",
      trim: true,
    },
    price: {
      type: String,
      default: "Contact for pricing",
      trim: true,
    },
    features: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
