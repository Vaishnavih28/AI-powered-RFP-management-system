import prisma from "../../prisma/prisma.js";

export const allVendors = async(req,res)=>{

    try {

    const vendor = await prisma.vendors.findMany();
    res.status(200).send(vendor);
    



        
    } catch (error) {
         res.status(400).json({ error: err.message });
        
    }

}