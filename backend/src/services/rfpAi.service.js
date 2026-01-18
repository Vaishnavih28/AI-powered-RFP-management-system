import { text } from "express";
import { geminiModel } from "../config/gemini.js";
import { RFP_PROMPT } from "../prompts/rfp.prompt.js";
import { RFP_SUMMARY_PROMPT } from "../prompts/summary.prompt.js";
import { RFP_EMAIL_PROMPT } from "../prompts/email.prompt.js";
import { PARSE_PROPOSAL } from "../prompts/parseproposal.js";
import prisma from "../../prisma/prisma.js";

export const parseRfpWithAI = async (text) => {
  const prompt = RFP_PROMPT(text);

  const result = await geminiModel.generateContent(prompt);
  const responseText = result.response.text();

  console.log(responseText);



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
  console.log(responseText);
  return responseText;

}

// export const emailRfpAI = async (text) => {
//   console.log("Hi from email AI")
//   const prompt = RFP_EMAIL_PROMPT(text);

//   const result = await geminiModel.generateContent(prompt);
//   const responseText = result.response.text();

//   console.log(responseText);
//   try {
//     return extractJson(responseText);

//   } catch (err) {
//     console.error("AI RAW OUTPUT:", textext);
//     throw new Error("Failed to parse AI response as JSON");
//   }





export const parseProposalAI = async (emailId, text, vendorId, rfpId) => {

  const prompt = `You are a procurement analyst.

Extract proposal details from the following vendor response.
Return ONLY valid JSON.

Schema:
{
  "totalBudget": number | null,
  "currency": string | null,
  "deliveryDays": number | null,
  "paymentTerms": string | null,
  "warrantyYears": number | null,
  "items": [
    {
      "category": string,
      "unitPrice": number | null,
      "quantity": number | null
    }
  ]
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
        parsedJson: proposalJson
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
Do Not invent data . Do not add any new data
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

{ 
  "Comparision": string,
  "recommendedVendorId": number,
  "reason": string

}
`;

  const result = await geminiModel.generateContent(prompt);
  return JSON.parse(result);


}















export const extractJson = (text) => {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  console.log(cleaned);

  return JSON.parse(cleaned);
};