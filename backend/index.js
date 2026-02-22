import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import {GROQ_API_URL} from './utils/urls.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: GROQ_API_URL,
});

console.log("KEY LENGTH:", process.env.GROQ_API_KEY?.length);
console.log("KEY STARTS WITH:", process.env.GROQ_API_KEY?.slice(0, 4));
console.log("===== DEBUG START =====");
console.log("ENV KEY EXISTS:", !!process.env.GROQ_API_KEY);
console.log("ENV KEY LENGTH:", process.env.GROQ_API_KEY?.length);
console.log("KEY FIRST 5 CHARS:", process.env.GROQ_API_KEY?.slice(0, 5));
console.log("KEY LAST 5 CHARS:", process.env.GROQ_API_KEY?.slice(-5));
console.log("KEY HAS SPACES:", process.env.GROQ_API_KEY?.includes(" "));
console.log("KEY HAS NEWLINE:", process.env.GROQ_API_KEY?.includes("\n"));
console.log("AUTH HEADER VALUE:", `Bearer ${process.env.GROQ_API_KEY}`.slice(0, 15) + "...");
console.log("API URL:", "https://api.groq.com/openai/v1/chat/completions");
console.log("===== DEBUG END =====");
console.log("llm model", process.env.LLM_MODEL_NAME);

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      model: process.env.LLM_MODEL_NAME,
      messages: [{ role: "user", content: message }],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log("Server running on port 5000")
);