import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import useRfp from '@/hooks/useRfp';
import { useNavigate } from 'react-router-dom';


function RFP() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { createRfp } = useRfp();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      return toast.error("Enter the required details to generate the RFP");
    }

    try {
       setLoading(true);
      await createRfp(text);
      

      navigate("/dashboard/summary")
      
    } catch (error) {
      
    }   

  };


  return (
    <>


      <h2 className="font-bold text-3xl p-8">AI-Powered RFP Management System</h2>

      <div className='flex flex-col items-center justify-center h-[50vh]  '>
        <p className="text-black p-8 ">Enter the required details to generate the RFP</p>

        <div className='w-full relative  p-5'>
          <Textarea value={text} onChange={(e) => { setText(e.target.value) }} placeholder="Type your message here." />
        </div>
        <div>
          <Button onClick={handleSubmit} className='bg-purple-800 hover:bg-purple-900 w-full cursor-pointer' >{loading ? "Generating..." : "Generate RFP"}</Button>
        </div>
      </div>

    </>


  )
}

export default RFP