// import './env.js'; // Must be imported first variables
// import express from 'express';
// import cors from 'cors';
// import { GoogleGenAI } from '@google/genai';

// const app = express();
// app.use(cors()); // Enable CORS for the React app
// app.use(express.json()); // For parsing application/json

// const port = 3001; // Choose a different port than the React app


// const apiKey = process.env.VITE_GEMINI_API_KEY;
// const ai = new GoogleGenAI({ apiKey });

// app.post('/generate', async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" }); // Use a suitable model

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text;

//     res.json({ generatedText: text });
//   } catch (error) {
//     console.error("Error generating content:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening on http://localhost:${port}`);
// });


//new stuf
import './env.js'; // Must be imported first variables
import geminiRoute from "../routes/gemini.js";
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API route
app.use("/api", geminiRoute);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });