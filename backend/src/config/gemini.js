import { GoogleGenerativeAI } from "@google/generative-ai";

const KEY = "AIzaSyActczs3KHYOTcJp0lFqnoXFwUpoVnYpJA"
const genAI = new GoogleGenerativeAI(KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});