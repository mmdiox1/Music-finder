import express from "express";
import fetch from "node-fetch"; // npm install node-fetch
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const OPENROUTER_API_KEY = "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"; // ← کلیدتو اینجا بذار

app.post("/api/search-song", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "tngtech/deepseek-r1t2-chimera:free",
        messages: [{ role: "user", content: req.body.query }]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API request failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
