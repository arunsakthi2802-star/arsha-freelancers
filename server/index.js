require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const reviewRoutes = require("./routes/reviews.routes");
const galleryRoutes = require("./routes/gallery.routes");
const storyRoutes = require("./routes/stories.routes");
const serviceRoutes = require("./routes/services.routes");
const contactRoutes = require("./routes/contact.routes");

// Models for stats
const User = require("./models/User");
const Review = require("./models/Review");
const Gallery = require("./models/Gallery");
const Story = require("./models/Story");
const Service = require("./models/Service");
const Contact = require("./models/Contact");
const { protect } = require("./middleware/auth");
const { adminOnly } = require("./middleware/adminOnly");

// Connect to MongoDB Atlas (cached for serverless warm starts)
let dbConnected = false;
const ensureDbConnected = async () => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
};
// Connect immediately (for both local dev and serverless cold starts)
ensureDbConnected();

const app = express();

// ── Security Middleware ────────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// Allow both localhost (dev) and the Netlify production URL
const allowedOrigins = [
  "http://localhost:3000",
  "https://arsha-freelancers.netlify.app",
];
if (process.env.CLIENT_URL && !allowedOrigins.includes(process.env.CLIENT_URL)) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (server-to-server, curl, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Rate limiting — 200 req per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: "Too many requests, please try again later." },
  // Provide a custom keyGenerator for Netlify serverless since req.ip might be undefined
  keyGenerator: (req) => {
    return req.headers['x-nf-client-connection-ip'] || req.ip || req.connection?.remoteAddress || 'unknown';
  }
});
app.use("/api", limiter);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// MongoDB injection sanitization
app.use(mongoSanitize());

// ── Routes ─────────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contact", contactRoutes);

// ── Lyzr AI Agent Proxy ────────────────────────────────────────────────────────
app.post("/api/lyzr/chat", async (req, res) => {
  try {
    const { message, session_id } = req.body;
    const response = await fetch("https://agent-prod.studio.lyzr.ai/v3/inference/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.LYZR_API_KEY,
      },
      body: JSON.stringify({
        user_id: process.env.LYZR_USER_ID,
        agent_id: process.env.LYZR_AGENT_ID,
        session_id: session_id || process.env.LYZR_SESSION_ID,
        message,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ success: false, message: err });
    }

    const data = await response.json();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lyzr agent error: " + error.message });
  }
});


app.get("/api/stats", protect, adminOnly, async (req, res) => {
  try {
    const [
      totalUsers,
      totalReviews,
      pendingReviews,
      totalGallery,
      totalStories,
      totalServices,
      totalContacts,
      unreadContacts,
      recentReviews,
      recentGallery,
      recentStories,
      recentContacts,
    ] = await Promise.all([
      User.countDocuments(),
      Review.countDocuments(),
      Review.countDocuments({ approvalStatus: "pending" }),
      Gallery.countDocuments(),
      Story.countDocuments(),
      Service.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: "unread" }),
      Review.find().sort({ createdAt: -1 }).limit(5),
      Gallery.find().sort({ createdAt: -1 }).limit(5).populate("uploadedBy", "fullName"),
      Story.find().sort({ createdAt: -1 }).limit(5).populate("author", "fullName"),
      Contact.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          totalUsers,
          totalReviews,
          pendingReviews,
          totalGallery,
          totalStories,
          totalServices,
          totalContacts,
          unreadContacts,
        },
        recent: {
          reviews: recentReviews,
          gallery: recentGallery,
          stories: recentStories,
          contacts: recentContacts,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── Global Search ──────────────────────────────────────────────────────────────
app.get("/api/search", async (req, res) => {
  try {
    const q = req.query.q || "";
    if (!q.trim()) return res.status(200).json({ success: true, data: { stories: [], reviews: [], gallery: [], services: [] } });

    const regex = { $regex: q, $options: "i" };

    const [stories, reviews, gallery, services] = await Promise.all([
      Story.find({ status: "published", $or: [{ title: regex }, { description: regex }] }).limit(5).select("title category coverImage createdAt"),
      Review.find({ approvalStatus: "approved", $or: [{ studentName: regex }, { collegeName: regex }, { projectTitle: regex }] }).limit(5).select("studentName collegeName rating"),
      Gallery.find({ $or: [{ title: regex }, { description: regex }] }).limit(5).select("title image category"),
      Service.find({ status: "active", $or: [{ serviceName: regex }, { description: regex }] }).limit(5).select("serviceName icon description"),
    ]);

    res.status(200).json({ success: true, data: { stories, reviews, gallery, services } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── Health Check ────────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Arsha Backend API is running ✅", timestamp: new Date().toISOString() });
});

// ── 404 Handler ────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ── Global Error Handler ───────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ── Start server only in local development (not in serverless) ─────────────────
// When required by the Netlify function, app.listen() is NOT called
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Arsha Backend running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard API: http://localhost:${PORT}/api/stats`);
    console.log(`🤖 Lyzr AI Chat: http://localhost:${PORT}/api/lyzr/chat`);
    console.log(`🔍 Global Search: http://localhost:${PORT}/api/search`);
  });
}

module.exports = app;
