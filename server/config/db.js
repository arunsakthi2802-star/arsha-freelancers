const mongoose = require("mongoose");

const connectDB = async () => {
  // Reuse existing connection if already connected (serverless warm starts)
  if (mongoose.connection.readyState === 1) {
    console.log("✅ MongoDB already connected (reusing)");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Atlas connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // In serverless, do NOT call process.exit() — it kills the function and causes 502
    // Instead, throw so the caller can handle it
    throw error;
  }
};

module.exports = connectDB;

