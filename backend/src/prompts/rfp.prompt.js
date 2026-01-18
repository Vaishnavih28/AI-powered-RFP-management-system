export const RFP_PROMPT = (text) => `
You are a procurement assistant.

Extract the user's requirements into the following JSON format.
Return ONLY valid JSON. Do not add explanations.

Schema:
{
  "budget": number | null,
  "currency": string | null,
  "deliveryDays": string | null,
  "paymentTerms": string | null,
  "warranty": string | null,
  "items": [
    {
      "category": string | null,
      "quantity": string | null,
      "specs": string | null,
    }
  ]
}

Rules:
- Currency must be a 3-letter ISO code (INR, USD, EUR, etc.)
- If currency is explicitly mentioned, use it
- If currency is NOT mentioned, set currency to "INR"

Text:
"""${text}"""
`;