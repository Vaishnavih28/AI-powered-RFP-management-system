# AI-Powered RFP Management System 
A single-user web application that create RFPs from natural language, send them to vendors, receive and parse vendor proposals and compare proposals to recommend the best vendor using AI.

# Project Setup
Node.js >= 22.x

npm / yarn=Latest

MySQL >= 8.x

Prisma ORM 5.22

Vite React 19.x

ngrok

MailGun API provider

AI Provider API Key

Google AI

**Required environment variables:**

DATABASE_URL

MAILGUN CREDENTIALS

GEMINI API key

# Backend
cd backend

npm install

npx prisma migrate dev --name

npx prisma generate

npm run dev

# Frontend
cd frontend

npm install

npm run dev

# Configure Mails
**Sending Emails**

Uses Mailgun API

RFP emails are sent to selected vendors

Each email is stored in DB (Email table)

**Receiving Emails**

Mailgun Inbound Webhook is configured

Incoming vendor emails to POST : http://localhost:8000/api/rfp/webhooks/mailgun

Email text are passed to AI for proposal extraction and saved to DB

# Tech Stack

**Frontend**

React

TailwindCss

ShadCN

Axios

**Backend**

Node.js

Express.js

Prisma ORM

MailGun Email API

Gemini AI model

ngrok

**Database**

MySQL

Prisma Models:

Rfp

RfpItem

Vendors

Email

Proposal

**AI**

Google AI used for

* Generating structured Rfp from natural languages
* Extract the important details from these responses and update in DB
* Comparision and Recommendation of the Proposals received

# API Documentation

**Create RFP**

Post : create
```
{
  "text": "I need to procure laptops and monitors for our new office. 
Budget is $50,000 total. Need delivery within 30 days. We need 20 laptops with 16GB RAM and 15 
monitors 27-inch. Payment terms should be net 30, and we need at least 1 year warranty"
}
```

output: 
```
{
  "id": 31,
  "rawText": 'I need to procure laptops and monitors for our new office. \n' +
    'Budget is $50,000 total. Need delivery within 30 days. We need 20 laptops with 16GB RAM and 15 \n' +  
    'monitors 27-inch. Payment terms should be net 30, and we need at least 1 year warranty',
  "budget": 50000,
  "currency": 'USD',
  "deliveryDays": '30 days',
  "paymentTerms": 'net 30',
  "warranty": '1 year',
  "createdAt": 2026-01-18T13:39:03.373Z,
  items: [
  {
      "id": 50,
      "category": 'laptops',
      "quantity": '20',
      "specs": '16GB RAM',
      "rfpId": 31
    },
    {
      "id": 51,
      "category": 'monitors',
      "quantity": '15',
      "specs": '27-inch',
      "rfpId": 31
    }
  ]
}
```
**Vendors**

Get Vendors

output:
```
{
  "vendors": [
    { "id": 1, "name": "Tech Solutions", "email": "tech@example.com" }
  ]
}
```
**Recommendation**

Post:
output:
```
{ 
  "Comparision": string,
  "recommendedVendorId": number,
  "reason": string

}
```

# Key Design Decisions
* Structured RFP is the core entity used across the system
* Emails are stored for traceability
* Proposal data is extracted using AI and stored in DB without manually updating
* Proposal comparison is done using AI assistance

**Assumptions**

* Currency defaults to INR if not mentioned
* Single Vendor (no auth / roles)

# AI Tools & usage

* ChatGPT , claude – generate dummy data, boilerplate code etc







