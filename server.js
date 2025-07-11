import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/ask", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid message." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are StudyBot, a helpful AI tutor for students." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    console.log("🧠 API raw response:", JSON.stringify(data, null, 2));

    let reply = null;

    if (
      data &&
      Array.isArray(data.choices) &&
      data.choices.length > 0 &&
      data.choices[0].message &&
      data.choices[0].message.content
    ) {
      reply = data.choices[0].message.content.trim();
    }

    if (!reply) {
      reply = `📢 Demo Reply: StudyBot AI didn't return a valid answer. This is a fallback demo response.`;
    }

    res.json({ reply });

  } catch (err) {
    console.error("❌ Fetch failed. Sending fallback. Error:", err);

    const demoReply = `📢 Demo Reply: Sorry, StudyBot AI is currently unavailable. This is a simulated response.`;
    res.json({ reply: demoReply });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🟢 StudyBot backend running at http://localhost:${PORT}`);
});
