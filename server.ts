import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI SDK with user's API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

app.use(express.json());

// API: AI Reading Assistant / Quran Companion
app.post("/api/ai-assistant", async (req, res) => {
  try {
    const { prompt, context, chatHistory, mode } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({
        error: "GEMINI_API_KEY is not configured. Please add your key in Settings > Secrets.",
      });
    }

    const systemInstruction = mode === "doubts"
      ? `
You are an advanced, humble, and deeply knowledgeable Islamic scholar and Fiqh/theology expert.
Your goal is to assist the user in clarifying doubts (സംശയ നിവാരണം) about Islamic beliefs, jurisprudence (Fiqh), daily life practices, ethics, and etiquettes.
When clarifying:
1. Provide accurate, balanced, and gentle guidance based on established Islamic teachings and consensus.
2. Quote relevant Quranic verses (Aayahs) with their reference (Surah and verse number) and Sahih Hadeeths (e.g., Bukhari, Muslim) whenever possible to support your explanation.
3. Be respectful, encouraging, and clear. Avoid harsh, controversial, or extreme language.
4. You can answer in Malayalam, Manglish, English, or Kannada if the user refers to or writes in those languages. Keep explanations structured, warm, and easy to read.
`
      : `
You are Alif Digital AI Quran & Swalath Companion, an advanced, humble, and deeply knowledgeable Islamic scholar and AI reading assistant.
Your goal is to assist the user in:
1. Explaining Quranic verses, context, and meanings (even though translations are removed from the main display, you can explain verses if they ask).
2. Clarifying proper Arabic pronunciation (Tajweed), spelling, and phonetics.
3. Providing explanations of the virtues and rewards of different Swalaths (salutations), Rathib Haddad, Majlisunnoor, or various Moulids.
4. Elaborating on the stories of the Prophets (Nabis) in detail.
5. Offering helpful spiritual reminders, Duas, and explaining Islamic prayers.

Respond respectfully, accurately, and clearly. Keep explanations concise unless the user asks for deep detail. You can answer in Malayalam/Manglish, English, or Kannada if the user refers to those languages. Do not use complex formatting that breaks easily; markdown is preferred.
`;

    const contents = [];
    if (context && mode !== "doubts") {
      contents.push({ role: "user", parts: [{ text: `CONTEXT/CURRENT PAGE: ${context}` }] });
      contents.push({ role: "model", parts: [{ text: "Understood. I will keep this context in mind for your question." }] });
    }

    if (chatHistory && Array.isArray(chatHistory)) {
      chatHistory.forEach((msg) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      });
    }

    contents.push({ role: "user", parts: [{ text: prompt }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: error?.message || "An error occurred with the AI assistant." });
  }
});

// API: Generate Islamic Speech with Aayahs and Hadeeths
app.post("/api/generate-speech", async (req, res) => {
  try {
    const { topic, language, length } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({
        error: "GEMINI_API_KEY is not configured. Please add your key in Settings > Secrets.",
      });
    }

    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: "Speech topic is required." });
    }

    const systemInstruction = `
You are an eloquent and inspiring Islamic orator and scholar.
Your goal is to draft a deeply moving, elegant, and structured Islamic speech (Khutbah / Speech) on the requested topic.

The speech must be structured exactly as follows:
1. Title: A beautiful, inspiring title for the speech.
2. Introduction: Start with the traditional Arabic opening praises (Hamd and Swalath) e.g., "الحمد لله رب العالمين... والصلاة والسلام على رسولنا الكريم..." along with translation, welcoming the listeners in a warm, spiritual tone.
3. Relevant Quranic Verses (Aayahs): Include at least one or two relevant Quranic verses with their Arabic text, translation, transliteration, and spiritual explanation of how it relates to the topic.
4. Relevant Prophetic Sayings (Hadeeths): Include at least one or two authentic Prophetic sayings (Sahih) with their Arabic text, translation, transliteration, and how it guides us on the topic.
5. Key Takeaways / Practical Lessons: Bullet points outlining how a Muslim can practice this in daily life.
6. Conclusion & Dua: End the speech with a beautiful closing summary and a heartfelt Dua (supplication) in Arabic with translation, and standard Islamic salutations (Wassalamu Alaikum...).

The language requested for the main explanation is: ${language || "English"}. Please write the main explanation, intro, body, and takeaways in this language, while keeping Quranic verses and Hadeeths in pristine Arabic alongside translation/transliteration.
The length requested is: ${length || "Medium (10 mins)"}. Adapt the detail level accordingly. Use beautiful, clear markdown with headers, bullet points, and italic blockquotes for spiritual impact.
`;

    const prompt = `Please draft an Islamic speech about: "${topic}". Make sure it is deeply spiritual, highly inspiring, educational, and strictly contains authentic Quranic Aayahs and Sahih Hadeeths in Arabic with translation and transliteration.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Speech API error:", error);
    res.status(500).json({ error: error?.message || "An error occurred while generating the speech." });
  }
});

// Start the server with Vite or static asset serving
async function main() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
});
