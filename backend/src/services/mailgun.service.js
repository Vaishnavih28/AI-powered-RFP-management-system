import { mg } from "../config/mailgun.js";
import prisma from "../../prisma/prisma.js";

export const sendRfpEmailToVendors = async ({
  rfpId,
  subject,
  body,
  vendorEmails
}) => {
  console.log("Hello from sendRfpEmailTo Vendors")
  if (!body || body.trim() === "") {
    throw new Error("Email body cannot be empty");
  }

  
  const vendors = await prisma.vendors.findMany({
    where: {
      email: { in: vendorEmails }
    }
  });

  if (vendors.length === 0) {
    throw new Error("No valid vendors found");
  }
  console.log(vendors);

  const results = await Promise.allSettled(
    vendors.map(async (vendor) => {
      const response = await mg.messages.create(
        process.env.MAILGUN_DOMAIN,
        {
          from: process.env.MAIL_FROM,
          to: vendor.email,
          subject,
          text: body,
          
        }
      );

      
      await prisma.email.create({
        data: {
          rfpId,
          vendorId: vendor.id,
          direction: "SENT",
          subject,
          body,
          fromEmail: process.env.MAIL_FROM,
          toEmail: vendor.email,
          messageId: response.id,
          status: "SENT"
        }
      });

      return {
        vendorEmail: vendor.email,
        messageId: response.id
      };
    })
  );

 
  const success = results
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

  const failed = results
    .filter(r => r.status === "rejected")
    .map(r => r.reason.message);

  return {
    successCount: success.length,
    failureCount: failed.length,
    success,
    failed
  };
};
