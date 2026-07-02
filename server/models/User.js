const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [15, "Phone number cannot exceed 15 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "student", "developer", "user"],
      default: "student",
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    college: {
      type: String,
      trim: true,
      default: "",
    },
    department: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    driveLink: {
      type: String,
      default: "",
    },
    uniqueId: {
      type: String,
      unique: true,
      sparse: true,
    },
    projectTitle: {
      type: String,
      default: "",
    },
    resources: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        fileType: { type: String, enum: ["drive", "pdf", "zip", "image"], default: "drive" },
        isUnlocked: { type: Boolean, default: true },
      }
    ],
  },
  { timestamps: true }
);

// Hash password and generate unique ID before saving
userSchema.pre("save", async function (next) {
  // Generate unique ID if not exists
  if (!this.uniqueId) {
    let isUnique = false;
    while (!isUnique) {
      const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
      const generatedId = `ARSHA-${randomStr}`;
      const existing = await mongoose.models.User.findOne({ uniqueId: generatedId });
      if (!existing) {
        this.uniqueId = generatedId;
        isUnique = true;
      }
    }
  }

  // Hash password
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive data from JSON output
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
