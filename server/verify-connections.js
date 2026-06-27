require("dotenv").config();
const mongoose = require("mongoose");
const { cloudinary } = require("./config/cloudinary");

async function verifyMongo() {
  console.log("Testing MongoDB connection...");
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    // Check collection counts
    const collections = Object.keys(conn.connection.collections);
    console.log(`📁 Collections in DB: ${collections.join(", ")}`);
    for (const colName of collections) {
      const count = await conn.connection.collections[colName].countDocuments();
      console.log(`   - ${colName}: ${count} records`);
    }
    await mongoose.disconnect();
    return true;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    return false;
  }
}

async function verifyCloudinary() {
  console.log("Testing Cloudinary connection...");
  try {
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary Connected:", result);
    return true;
  } catch (error) {
    console.error("❌ Cloudinary Connection Failed:", error.message);
    return false;
  }
}

async function verifyLyzrV2() {
  console.log("Testing Lyzr V2 Chat API (https://agent.api.lyzr.ai/v2/chat/)...");
  try {
    const response = await fetch("https://agent.api.lyzr.ai/v2/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.LYZR_API_KEY,
      },
      body: JSON.stringify({
        user_id: process.env.LYZR_USER_ID,
        agent_id: process.env.LYZR_AGENT_ID,
        session_id: process.env.LYZR_SESSION_ID,
        message: "hello",
      }),
    });
    const status = response.status;
    const data = await response.json().catch(() => null);
    if (response.ok) {
      console.log(`✅ Lyzr V2 Response (status ${status}):`, JSON.stringify(data));
      return true;
    } else {
      console.error(`❌ Lyzr V2 Response Failed (status ${status}):`, JSON.stringify(data));
      return false;
    }
  } catch (error) {
    console.error("❌ Lyzr V2 Connection Failed:", error.message);
    return false;
  }
}

async function verifyLyzrV3() {
  console.log("Testing Lyzr V3 Chat API (https://agent-prod.studio.lyzr.ai/v3/inference/chat/)...");
  try {
    const response = await fetch("https://agent-prod.studio.lyzr.ai/v3/inference/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.LYZR_API_KEY,
      },
      body: JSON.stringify({
        user_id: process.env.LYZR_USER_ID,
        agent_id: process.env.LYZR_AGENT_ID,
        session_id: process.env.LYZR_SESSION_ID,
        message: "hello",
      }),
    });
    const status = response.status;
    const data = await response.json().catch(() => null);
    if (response.ok) {
      console.log(`✅ Lyzr V3 Response (status ${status}):`, JSON.stringify(data));
      return true;
    } else {
      console.error(`❌ Lyzr V3 Response Failed (status ${status}):`, JSON.stringify(data));
      return false;
    }
  } catch (error) {
    console.error("❌ Lyzr V3 Connection Failed:", error.message);
    return false;
  }
}

async function run() {
  console.log("=== ARSHA CONNECTION DIAGNOSTIC RUN ===");
  const mongoOk = await verifyMongo();
  console.log("-----------------------------------------");
  const cloudinaryOk = await verifyCloudinary();
  console.log("-----------------------------------------");
  const lyzrV2Ok = await verifyLyzrV2();
  console.log("-----------------------------------------");
  const lyzrV3Ok = await verifyLyzrV3();
  console.log("-----------------------------------------");
  console.log("=== DIAGNOSTIC COMPLETE ===");
  console.log(`MongoDB: ${mongoOk ? "OK" : "FAILED"}`);
  console.log(`Cloudinary: ${cloudinaryOk ? "OK" : "FAILED"}`);
  console.log(`Lyzr V2: ${lyzrV2Ok ? "OK" : "FAILED"}`);
  console.log(`Lyzr V3: ${lyzrV3Ok ? "OK" : "FAILED"}`);
  process.exit(0);
}

run();
