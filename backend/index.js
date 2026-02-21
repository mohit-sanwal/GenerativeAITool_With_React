import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: process.env.GROQ_API_URL,
});

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

app.listen(5000, () =>
  console.log("Server running on port 5000")
);