const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    publicId: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Student Projects", "Workshops", "Events", "Certifications", "Office", "Team"],
      default: "Student Projects",
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
