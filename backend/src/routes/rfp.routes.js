import express from 'express'
import {createRfp, generateEmail,sendEmailToVendor, receiveVendorEmail,recommendation,allRfp } from '../controller/rfp.controller.js'

const router = express.Router();

router.post("/create",createRfp);
router.post("/generateemail",generateEmail);
router.post("/sendemail",sendEmailToVendor);
router.post("/webhooks/mailgun",receiveVendorEmail);
router.post("/recommendation",recommendation);
router.post("/",allRfp)




export default router;