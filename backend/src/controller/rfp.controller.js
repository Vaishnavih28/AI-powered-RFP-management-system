import { parseRfpWithAI, summaryRfpAI, emailRfpAI, parseProposalAI } from "../services/rfpAi.service.js";
import {generateEmailFromTemplate} from "../services/emailTemplate.service.js"
import prisma from '../../prisma/prisma.js';
import {sendRfpEmailToVendors} from "../services/mailgun.service.js";
import { PDFParse } from 'pdf-parse'


export const createRfp = async (req, res) => {
    
  try {
    
    const { text } = req.body;

   
    const structuredRfp = await parseRfpWithAI(text);

    

  
    const savedRfp = await prisma.rFP.create({
      data: {
        rawText: text,
        budget: structuredRfp.budget,
        currency: structuredRfp.currency,
        deliveryDays: structuredRfp.deliveryDays,
        paymentTerms: structuredRfp.paymentTerms,
        warranty: structuredRfp.warranty,
        items: {
          create: structuredRfp.items.map(item => ({
            category: item.category,
            quantity: item.quantity,
            specs: item.specs
          }))
        }
      },
      include: { items: true }
    });
    
    const summary = await summaryRfpAI(savedRfp);
    
    const  rfpdata = savedRfp;

    



    res.status(201).json( {summary,rfpdata});

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const generateEmail = async(req, res) =>{
  try {
    const { rfpdata } = req.body;

    const email = generateEmailFromTemplate(rfpdata);
    console.log(email);

    return res.status(200).json(email);
  

  } catch (err) {
    res.status(500).json({ error: err.message });

  }
}

export const sendEmailToVendor = async (req, res) => {
  try {
    const { subject, body, rfpId, vendorEmails } = req.body;

    if (!vendorEmails || !subject || !body || !rfpId) {
      return res.status(400).json({
        error: "vendorEmail or email(subject, body) or RFP are required"
      });
    }

    const result = await sendRfpEmailToVendors({
      rfpId,
      vendorEmails,
      subject,
      body
    });
    console.log("result", result)

    return res.status(200).json({
      message: "RFP email sent successfully",
      result
    });

  } catch (err) {
    console.error("Mailgun error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to send email"
    });
  }
};

export const receiveVendorEmail = async(req, res)=>{
  try {
    console.log(req.body);
    const sender = req.body.from;
    const subject = req.body.subject;
    const emailText = req.body["body-plain"] || "";
    const inReplyTo = req.body['In-Reply-To'];

    const emailMatch = sender.match(/<(.+?)>/) || sender.match(/([^\s]+@[^\s]+)/);
    const senderEmail = emailMatch ? emailMatch[1] : sender;
    

    const vendor = await prisma.vendors.findUnique({
      where: { email: senderEmail }
    });

    if (!vendor) return res.status(200).send("Unknown vendor");

    const sentEmail = await prisma.email.findFirst({
      where: {
        messageId: inReplyTo,
        direction: "SENT"
      }
    });

    const email = await prisma.email.create({
      data: {
        rfpId: sentEmail.rfpId,
        vendorId: vendor.id,
        direction: "RECEIVED",
        subject,
        body: emailText,
        fromEmail: senderEmail,
        toEmail: process.env.MAIL_FROM,
        status: "RECEIVED"
      }
    });

    let extractedText = emailText;

   
    const attachmentCount = Number(req.body["attachment-count"] || 0);

    for (let i = 1; i <= attachmentCount; i++) {
      const file = req.files[`attachment-${i}`];

      if (file && file.mimetype === "application/pdf") {
        const pdfData = await PDFParse(file.data);
        extractedText += "\n\n" + pdfData.text;
      }
    }

   
    const response= await parseProposalAI(email.id, extractedText, vendor.id,sentEmail.rfpId);

    

    res.status(200).send(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Webhook error");
  }
}


export const recommendation = async(req, res)=>{
  try {

    const rfpdata = req.body;

    const rfpId = rfpdata.id;

  const proposals = await prisma.proposal.findMany({
    where: { rfpId },
    include: { }
  });

  const recommendation = await recommendVendorAI(rfpdata, proposals);

    res.json(recommendation);

    
    
  } catch (error) {
    res.status(400).json({ error: err.message });
    
  }

}

export const allRfp = async(req,res)=>{
  try {
    const Rfp = await prisma.rFP.findMany();

    res.status(200).json(Rfp);

    
  } catch (error) {
    res.status(400).json({ error: err.message });
    
  }
}