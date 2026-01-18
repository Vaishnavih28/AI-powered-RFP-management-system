import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useRfpContext } from '@/RfpContext';
import useRfp from '@/hooks/useRfp';

function Recommendation() {

  const {rfpdata} = useRfpContext();
  const { recommendationProposal} = useRfp();
  const [recomData , setRecomData] = useState("");



  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await recommendationProposal(rfpdata);
      setRecomData(res);
    } catch (error) {
      
    }

  }

  return (
    <div className='grid grid-col-1'>
    <div>
      <h2>Recommendation</h2>
      <Button onclick={handleSubmit}>Generate Recommendation</Button>
    </div>
    <p>
      {recomData}
    </p>


    </div>
  )
}

export default Recommendation