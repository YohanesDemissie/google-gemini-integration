import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

async function runChat(prompt) {
  if (!prompt) throw new Error("Prompt is required");

//   try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    return response.candidates[0].content.parts[0].text;
//   } catch (error) {
//     console.error("Gemini error:", error);
//     throw error;
//   }
}

export default runChat;
