// Netlify Serverless Function — wraps the Express app
// This file is the entry point for all /api/* requests on Netlify
const serverless = require("serverless-http");
const path = require("path");

// Load environment variables
// In production (Netlify), env vars come from Netlify Dashboard
// In local dev, fall back to the .env file
if (!process.env.MONGODB_URI) {
  require("dotenv").config({ path: path.resolve(__dirname, "../../server/.env") });
}

// Import the Express app (not the server listener)
const app = require("../../server/index");

// Cache the serverless handler for warm starts
let cachedHandler;

const getHandler = () => {
  if (!cachedHandler) {
    cachedHandler = serverless(app, {
      // Strip the /.netlify/functions/api prefix so Express sees clean /api/* paths
      basePath: "/.netlify/functions/api",
    });
  }
  return cachedHandler;
};

// Netlify Functions handler
exports.handler = async (event, context) => {
  // Keep the MongoDB connection alive across warm invocations
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const handler = getHandler();
    return await handler(event, context);
  } catch (error) {
    console.error("Serverless function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Server error: " + error.message,
      }),
    };
  }
};
