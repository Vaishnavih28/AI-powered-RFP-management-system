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
            toast.error(error.response.data.error);
        }
    }

    const generateEmail = async (rfpdata)=>{
        try {
            const response = await axios.post("/api/rfp/generateemail", {rfpdata});

           return response.data



            
        } catch (error) {
            console.error("Error generating mail:", error);
            toast.error(error.response.data.error);
            
        }

    }

    const  sendEmailToVendor = async(email, rfpId, vendorEmails )=>{
        try {

            const response = await axios.post("/api/rfp/sendemail", {email, rfpId,vendorEmails});

           return response.data


            
        } catch (error) {

             console.error("Error sending mail to vendor:", error);
            toast.error(error.response.data.error);
            
        }
    }

    const getVendors = async()=>{
        try {
            const response = await axios.get("/api/vendors");

           return response.data
            
        } catch (error) {
            console.error("Error fetching vendors:", error);
            toast.error(error.response.data.error);
            
        }
    }

    const recommendationProposal = async(rfpdata)=>{
        try {

        

            const response = await axios.post("/api/rfp/recommendation", {rfpdata});
            return response.data


            
        } catch (error) {
            console.error("Error fetching vendors:", error);
            toast.error(error.response.data.error);
            
        }
    }







    return {createRfp, generateEmail,sendEmailToVendor, getVendors,recommendationProposal}

};

export default useRfp;