export const PARSE_PROPOSAL = (text) =>{
 `You are a procurement analyst.
 Provide a consise summary of the proposal mentioning all the important point if the proposal received under notes

Extract proposal details from the text below.

Return ONLY valid JSON.

Schema:
{
  
  "totalBudget": number | null,
  "deliveryDays": INT | null,
  "warranty": String | null,
  "paymentTerms": string | null,
  "notes": string | null
}

Text:
"""${text}"""
`;

}