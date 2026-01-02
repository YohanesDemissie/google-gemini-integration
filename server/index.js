import './env.js'; // Must be imported first variables
// import geminiRoute from "../routes/gemini.js";
import geminiRoute from "./routes/gemini.js";
import generateRoute from './api/generate.js'
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API route DEV
// app.use("/api", geminiRoute);
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// API route prod
app.use("/api", generateRoute);
export default app;