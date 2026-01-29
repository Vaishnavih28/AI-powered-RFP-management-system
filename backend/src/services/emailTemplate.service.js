export const rfpEmailTemplate = (rfpdata) => {
    const items = rfpdata.items
    .map(
      (item) =>
        `- ${item.category}: ${item.quantity} units, ${item.specs}`
    )
    .join("\n");

  return {
    subject: "Request for Proposal - Procurement Requirements",
    body: `Dear Vendor,

ABC Company invites your organization to submit a proposal for the following procurement requirements:

${items}

${rfpdata.budget ? `Budget: ${rfpdata.currency} ${rfpdata.budget}` : ""}
${rfpdata.deliveryDays ? `Delivery timeline: ${rfpdata.deliveryDays} days` : ""}
${rfpdata.paymentTerms ? `Payment terms: ${rfpdata.paymentTerms}` : ""}
${rfpdata.warranty ? `Warranty requirement: ${rfpdata.warranty}` : ""}

Interested vendors are requested to submit their detailed proposal including pricing and delivery details.

Sincerely,
Procurement Manager
ABC Company`
  };
};

export const generateEmailFromTemplate = (rfpdata) => {
  return rfpEmailTemplate(rfpdata);
};