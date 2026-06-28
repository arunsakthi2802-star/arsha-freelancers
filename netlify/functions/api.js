// Netlify Serverless Function — wraps the Express app
// This file is the entry point for all /api/* requests on Netlify
const serverless = require("serverless-http");

// Load environment variables (Netlify provides them from the dashboard)
// No .env file needed in production — env vars are set in Netlify UI
if (!process.env.MONGODB_URI) {
  require("dotenv").config({ path: require("path").resolve(__dirname, "../../server/.env") });
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

  const handler = getHandler();
  return handler(event, context);
};
