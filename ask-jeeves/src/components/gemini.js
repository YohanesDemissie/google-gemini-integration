import { GoogleGenAI } from "@google/genai";

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
    apiKey: geminiApiKey
});

async function runChat(prompt) {
//     const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
    // TRY CATCH INTEGRATAION
    try{
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Explain how AI works in a few words",
        });
        console.log(response.text);
    } catch(error){
       // Check if the error is due to rate limits
        if (error.status === 429 || error.message.includes('429')) {
            console.error("Quota Exceeded Error:", error.message);
            // Display a user-friendly message to the user
            alert("You have run out of Gemini API requests for the day. Please try again tomorrow (quotas reset at midnight Pacific Time).");
        } else {
            console.error("An error occurred:", error.message);
        }
    }
}

await runChat();

export default runChat;