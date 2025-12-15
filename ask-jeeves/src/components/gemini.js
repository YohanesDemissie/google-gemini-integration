import { GoogleGenAI } from "@google/genai";

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
    apiKey: geminiApiKey
});

async function runChat(prompt) {
    // TRY CATCH INTEGRATAIONO
    try{

    } catch(err){
        console.error("Error running chat:", err);
    }
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await runChat();

export default runChat;