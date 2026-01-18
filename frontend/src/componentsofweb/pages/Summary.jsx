import React from 'react'
import { useRfpContext } from '@/RfpContext'
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useRfp from '@/hooks/useRfp';
import { useState } from 'react';

function Summary() {
    const { rfpdata, setEmailData,setVendorsData } = useRfpContext();
    const [loading, setLoading] = useState(false);
    console.log(rfpdata);
    const navigate = useNavigate();
    if (!rfpdata) {
        toast.error("AI failed to generate RFP")
        navigate("/dashboard/rfp")

    }
    const { generateEmail, getVendors } = useRfp();


    const summ = rfpdata.summary;
   
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const email = await generateEmail(rfpdata.rfpdata)
            setEmailData(email)
            const vendors = await getVendors();
            setVendorsData(vendors)
            navigate("/dashboard/email")
          

        } catch (error) {

            console.error("Error generating email:", error);
            toast.error("Failed to generate email");
        }
    };
    



    return (   
        <>



            <div className=" p-8 border rounded">
                <pre className='font-medium '>{summ}</pre>
            </div>
            <div className='grid grid-cols-2 gap-2 p-2'>
                <Button className='cursor-pointer bg-purple-800 hover:bg-purple-900 ' onClick={() => navigate('/dashboard/rfp')}>Retry</Button>
                <Button className='cursor-pointer bg-purple-800 hover:bg-purple-900  ' onClick={handleSubmit}>Generate Email</Button>
            </div>

        </>
       
    )
}

export default Summary