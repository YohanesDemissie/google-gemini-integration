import './env.js'; // Must be imported first variables
// import geminiRoute from "../routes/gemini.js";
import generateRoute from './generate.js'
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

// API route
// app.use("/api", geminiRoute);
// app.use("/api/generate", generateRoute);
app.use("/", generateRoute);
export default app;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });