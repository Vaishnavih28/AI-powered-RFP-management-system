import express from 'express'
import { allVendors } from '../controller/vendors.controller.js';

const router = express.Router();

router.get("/",allVendors);
export default router;