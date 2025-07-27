import { GoogleGenAI } from "@google/genai";

// Get API key from environment variable
const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function rewriteTextWithGemini(text, instruction = "Rewrite with better grammar, spelling, and clarity, but keep the meaning the same.") {
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Instruction: ${instruction}\n\nContent:\n${text}`,
    });
    return result.text;
  } catch (error) {
    console.error("AI Rewrite Error:", error);
    return null;
  }
}
