import { useRfpContext } from "@/RfpContext";
import axios from "axios"
import { toast } from "sonner";



const useRfp =()=>{

    const { setRfpData} = useRfpContext();


    const createRfp = async (text)=>{
        try {

            const response = await axios.post("/api/rfp/create", {text});

           setRfpData(response.data)
           return response.data
            
        } catch (error) {
            console.error("Error creating RFP:", error);
            toast.error(error.message);
        }
    }

    const generateEmail = async (rfpdata)=>{
        try {
            const response = await axios.post("/api/rfp/generateemail", {rfpdata});

           return response.data



            
        } catch (error) {
            console.error("Error generating mail:", error);
            toast.error(error.message);
            
        }

    }

    const  sendEmailToVendor = async(subject, body, rfpId,vendorEmails )=>{
        try {

           
            const response = await axios.post("/api/rfp/sendemail", {subject, body, rfpId,vendorEmails});

           return response.data


            
        } catch (error) {

             console.error("Error sending mail to vendor:", error);
            toast.error(error.message);
            
        }
    }

    const getVendors = async()=>{
        try {
            const response = await axios.get("/api/vendors");

           return response.data
            
        } catch (error) {
            console.error("Error fetching vendors:", error);
            toast.error(error.message);
            
        }
    }

    const recommendationProposal = async(rfpdata)=>{
        try {

        

            const response = await axios.post("/api/rfp/recommendation", rfpdata);
            return response.data


            
        } catch (error) {
            console.error("Error Recommendation proposal:", error);
            toast.error(error.message);
            
        }
    }







    return {createRfp, generateEmail,sendEmailToVendor, getVendors,recommendationProposal}

};

export default useRfp;