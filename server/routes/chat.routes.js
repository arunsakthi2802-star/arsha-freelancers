const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

// Initialize the Gemini client
// Note: Requires GEMINI_API_KEY in the environment
const ai = new GoogleGenAI({});

const SYSTEM_INSTRUCTION = `You are "Arsha AI Assistant", the official customer support chatbot for "Arsha Freelancers". 
Your goal is to help students and clients with their inquiries about academic projects, IEEE projects, AI/ML services, and web development.

Key Information about Arsha Freelancers:
- Services: IEEE Academic Projects (Final Year Projects), Web Development, App Development, AI/ML Solutions, UI/UX Design.
- Pricing: Varies based on project complexity. Tell users to use the "Contact" form for an exact quote.
- Contact: Email arunsakthi2802@gmail.com.
- Tone: Professional, friendly, encouraging, and concise.
- Limitations: If someone asks about something unrelated to software development, projects, or our services, politely decline and steer the conversation back to our offerings. Do NOT write full code for users. You are a sales/support agent, not a coding assistant. Keep responses relatively short (under 3 paragraphs).`;

// POST /api/chat
router.post("/", async (req, res) => {
  try {
    const { history, message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        message: "Gemini API key is not configured. Please contact the administrator." 
      });
    }

    // Format history for Gemini API
    const formattedHistory = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg) => {
        if (msg.role === "user" || msg.role === "model") {
          formattedHistory.push({
            role: msg.role,
            parts: [{ text: msg.content }],
          });
        } else if (msg.role === "assistant") {
           // map "assistant" (frontend) to "model" (gemini)
           formattedHistory.push({
            role: "model",
            parts: [{ text: msg.content }],
          });
        }
      });
    }

    // Initialize the chat session
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: formattedHistory,
    });

    // Send the new message
    const response = await chat.sendMessage({ message });

    res.status(200).json({ 
      success: true, 
      data: { 
        response: response.text 
      } 
    });
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Our AI is currently taking a break. Please try again later or contact us directly." 
    });
  }
});

module.exports = router;
