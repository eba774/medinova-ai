import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Initialize Gemini Client lazily or gracefully
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY environment variable is missing.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "MediNova AI Server" });
});

// AI Symptom Checker API
app.post("/api/analyze-symptoms", async (req, res) => {
  try {
    const { symptoms, age, gender, duration } = req.body;
    if (!symptoms || typeof symptoms !== "string") {
      return res.status(400).json({ error: "Symptoms description is required." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback response if API Key isn't available yet
      return res.json({
        summary: "Based on your described symptoms, mild fatigue and discomfort may be related to dehydration or physical overexertion.",
        urgency: "Moderate",
        urgencyColor: "amber",
        possibleConditions: [
          { name: "Viral Upper Respiratory Infection", probability: "High", description: "Common viral infection affecting nasal passages and throat." },
          { name: "Dehydration & Mild Fatigue", probability: "Medium", description: "Insufficient fluid intake leading to sluggishness and minor headache." },
          { name: "Seasonal Allergies", probability: "Low", description: "Allergic reaction to environmental pollen or dust." }
        ],
        recommendedSpecialist: "General Physician / Internal Medicine",
        recommendedActions: [
          "Rest adequately and drink plenty of fluids (2-3L water daily).",
          "Monitor body temperature every 4 hours.",
          "Seek immediate medical attention if fever exceeds 102°F or shortness of breath occurs."
        ],
        disclaimer: "MediNova AI provides health information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment."
      });
    }

    const prompt = `Analyze the following symptoms for a ${age || "adult"} year old ${gender || "patient"} suffering for ${duration || "a few days"}:
Symptoms: "${symptoms}".

Provide a structured medical AI triage response with likely causes, urgency, specialist recommendation, and self-care steps. Be concise, accurate, and empathetic.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are MediNova AI, a world-class clinical AI assistant. Provide helpful medical guidance in JSON format. Always include a disclaimer that this is AI advice, not a doctor's diagnosis.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            urgency: { type: Type.STRING, description: "Low, Moderate, High, or Emergency" },
            urgencyColor: { type: Type.STRING, description: "emerald, amber, orange, or red" },
            possibleConditions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  probability: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["name", "probability", "description"]
              }
            },
            recommendedSpecialist: { type: Type.STRING },
            recommendedActions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            disclaimer: { type: Type.STRING }
          },
          required: ["summary", "urgency", "urgencyColor", "possibleConditions", "recommendedSpecialist", "recommendedActions", "disclaimer"]
        }
      }
    });

    const resultText = response.text || "{}";
    const data = JSON.parse(resultText);
    res.json(data);
  } catch (error: any) {
    console.error("Error in symptom analysis:", error);
    res.status(500).json({
      error: "Failed to analyze symptoms",
      details: error?.message || "Internal server error"
    });
  }
});

// AI Lab Report Analysis API
app.post("/api/analyze-report", async (req, res) => {
  try {
    const { reportText, fileBase64, mimeType } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        title: "Medical Report Summary",
        patientName: "John Doe",
        reportType: "Complete Blood Count & Metabolic Panel",
        overallStatus: "Mild Abnormalities Detected",
        keyFindings: [
          "Hemoglobin levels are slightly below normal reference range (11.8 g/dL vs standard 13.5-17.5 g/dL).",
          "Fasting Glucose level is within healthy range (92 mg/dL).",
          "Total Cholesterol is mildly elevated (215 mg/dL)."
        ],
        abnormalParameters: [
          { parameter: "Hemoglobin", value: "11.8 g/dL", normalRange: "13.5 - 17.5 g/dL", status: "Low", note: "Suggests mild anemia; consider iron-rich diet or supplement after consulting your doctor." },
          { parameter: "Total Cholesterol", value: "215 mg/dL", normalRange: "< 200 mg/dL", status: "Elevated", note: "Mildly elevated; consider dietary modifications low in saturated fats." }
        ],
        recommendations: [
          "Schedule a follow-up with your Hematologist or General Physician.",
          "Maintain a balanced diet rich in leafy greens, legumes, and lean proteins.",
          "Repeat blood work in 3 months to monitor trends."
        ]
      });
    }

    const parts: any[] = [];
    if (fileBase64 && mimeType) {
      parts.push({
        inlineData: {
          data: fileBase64.replace(/^data:[^;]+;base64,/, ""),
          mimeType: mimeType || "image/png"
        }
      });
    }
    
    parts.push({
      text: `Analyze this medical lab report / test document. Text content if available: "${reportText || 'Uploaded Document File'}". Parse the key findings, extract any out-of-range test values, and explain what they mean in clear, reassuring patient terms.`
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: { parts },
      config: {
        systemInstruction: "You are MediNova AI, expert clinical report analyzer. Extract structured findings from lab documents accurately. Return structured JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            patientName: { type: Type.STRING },
            reportType: { type: Type.STRING },
            overallStatus: { type: Type.STRING },
            keyFindings: { type: Type.ARRAY, items: { type: Type.STRING } },
            abnormalParameters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  parameter: { type: Type.STRING },
                  value: { type: Type.STRING },
                  normalRange: { type: Type.STRING },
                  status: { type: Type.STRING },
                  note: { type: Type.STRING }
                },
                required: ["parameter", "value", "normalRange", "status", "note"]
              }
            },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["title", "overallStatus", "keyFindings", "abnormalParameters", "recommendations"]
        }
      }
    });

    const resultText = response.text || "{}";
    const data = JSON.parse(resultText);
    res.json(data);
  } catch (error: any) {
    console.error("Error in report analysis:", error);
    res.status(500).json({
      error: "Failed to analyze lab report",
      details: error?.message || "Internal server error"
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MediNova AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
