import { text } from "express";
import { geminiModel } from "../config/gemini.js";
import { RFP_PROMPT } from "../prompts/rfp.prompt.js";
import { RFP_SUMMARY_PROMPT } from "../prompts/summary.prompt.js";

import prisma from "../../prisma/prisma.js";

export const parseRfpWithAI = async (text) => {
  const prompt = RFP_PROMPT(text);

  const result = await geminiModel.generateContent(prompt);
  const responseText = result.response.text();





  try {
    return extractJson(responseText);

  } catch (err) {
    console.error("AI RAW OUTPUT:", text);
    throw new Error("Failed to parse AI response as JSON");
  }


};

export const summaryRfpAI = async (rfpJson) => {
  const prompt = RFP_SUMMARY_PROMPT(rfpJson);

  const result = await geminiModel.generateContent(prompt);
  const responseText = result.response.text();

  return responseText;

}






export const parseProposalAI = async (emailId, text, vendorId, rfpId) => {

  const prompt = `You are a procurement analyst.

Extract proposal details from the following vendor response. 
Create a brief summary of the proposal using only 3-4 bullet points. Capture all important commercial and delivery details (budget, timeline, payment terms, warranty). Additionally, include a structured list of all proposed items with their quantities and per-unit cost. Output this content under the "notes" field
Return ONLY valid JSON. Do not include explanations, markdown, or text outside JSON.

Schema:
{
  "totalBudget": number | null,
  "currency": string | null,
  "deliveryDays": number | null,
  "paymentTerms": string | null,
  "warranty": number | null,
  "notes": String | null,
  
}

Vendor Response:
"""
${text}
"""
`;

  //const prompt = PARSE_PROPOSAL(text);

  const result = await geminiModel.generateContent(prompt);
  const response = result.response.text();

  try {
    const proposalJson = extractJson(response);
    const proposal = await prisma.proposal.create({
      data: {
        rfpId,
        emailId,
        vendorId,
        rawText: text,
        totalBudget: proposalJson.totalBudget,
        deliveryDays: proposalJson.deliveryDays,
        warrantyYears: proposalJson.warrantyYears,
        paymentTerms: proposalJson.paymentTerms,
        notes : proposalJson.notes
      }
    });
    return proposal;

  } catch (err) {
    console.error("AI RAW OUTPUT:", text);
    throw new Error("Failed to parse AI response as JSON");
  }
}

export const recommendVendorAI = async(rfpdata, proposals)=>{
  
  const prompt = `
You are a procurement decision assistant.Compare throughly the Proposals received and provide a report with the summary of the comparision in Comparision and the recommendded vendor Id in recommendedVendorId along with its reason.Give vaid explaination on why u are selecting this vendor  
Do Not invent data . Do not add any new data. Do NOT include Vendor ID in Comparision
RFP:
${JSON.stringify(rfpdata, null, 2)}

Vendor Proposals:
${JSON.stringify(proposals, null, 2)}

Evaluate based on:
- Price
- Delivery
- Warranty
- Payment terms

Return ONLY valid JSON:

Schema:
{ 
  "Comparision": string,
  "recommendedVendorId": number,
  "reason": string

}
`;

  const result = await geminiModel.generateContent(prompt);
  const response = result.response.text();
 

  try {
    return extractJson(response);

  } catch (err) {
    console.error("AI RAW OUTPUT:", text);
    throw new Error("Failed to parse AI response as JSON");
  }

  


}















export const extractJson = (text) => {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();


  return JSON.parse(cleaned);
};