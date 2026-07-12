const mongoose = require("mongoose");

// Cache connection promise across invocations in serverless
let cachedConnectionPromise = null;

const connectDB = async () => {
  // Reuse existing connection if already connected (readyState 1)
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If a connection is already in progress, reuse its promise
  if (cachedConnectionPromise) {
    return cachedConnectionPromise;
  }

  // Disable buffering globally so queries fail fast if connection is down
  mongoose.set("bufferCommands", false);

  const dbUri = process.env.MONGODB_URI;
  if (!dbUri) {
    const err = new Error("MONGODB_URI environment variable is not defined");
    console.error("❌ MongoDB connection failed:", err.message);
    throw err;
  }

  console.log("🔄 Connecting to MongoDB...");
  cachedConnectionPromise = mongoose.connect(dbUri, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  }).then((conn) => {
    console.log(`✅ MongoDB Atlas connected: ${conn.connection.host}`);
    return conn.connection;
  }).catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
    cachedConnectionPromise = null; // Clear cached promise on failure to allow retry
    throw error;
  });

  return cachedConnectionPromise;
};

module.exports = connectDB;

