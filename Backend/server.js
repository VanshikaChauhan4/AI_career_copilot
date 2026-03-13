require("dotenv").config();

const Groq = require("groq-sdk");
const express = require("express");
const cors = require("cors");

const app = express();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});
function cleanAIJSON(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}
app.post("/ResumeAnalyze", async (req, res) => {
  try {

    const resumeText = req.body.resumeText;

    const prompt = `
Analyze this resume.

Return ONLY JSON.

{
 "score": number,
 "strengths": [],
 "missingSkills": [],
 "suggestions": []
}

Resume:
${resumeText}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    let aiText = completion.choices[0].message.content;

    aiText = cleanAIJSON(aiText);

    const json = JSON.parse(aiText);

    res.json(json);

  } catch (error) {

    console.error("Resume Analysis Error:", error);

    res.status(500).json({
      message: "AI analysis failed"
    });

  }
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});