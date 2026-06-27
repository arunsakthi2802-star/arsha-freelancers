const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password, college, department } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered." });
    }

    const user = await User.create({ fullName, email, phone, password, college, department });
    const token = signToken(user._id);

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    if (user.status === "blocked") {
      return res.status(403).json({ success: false, message: "Your account has been blocked." });
    }

    const token = signToken(user._id);
    const userObj = user.toJSON();

    res.status(200).json({ success: true, token, user: userObj });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/me
router.get("/me", protect, async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

// POST /api/auth/logout (client-side token removal, just acknowledge)
router.post("/logout", protect, (req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully." });
});

module.exports = router;
