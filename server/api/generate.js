import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAi = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
// const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


router.post("/generate", async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const contents = [
      ...history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const model = genAi.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent({ contents });
    const text = result.response.text();

    res.json({ generatedText: text });

  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;