import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});