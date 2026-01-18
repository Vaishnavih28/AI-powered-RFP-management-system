export const RFP_SCHEMA = {
  curreny: "currency | null ",
  budget: "number | null",
  deliveryDays: "number | null",
  paymentTerms: "string | null",
  warranty: "string | null",
  items: [
    {
      category: "string",
      quantity: "number",
      specs: "string"
    }
  ]
};