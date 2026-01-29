import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useRfpContext } from '@/RfpContext';
import useRfp from '@/hooks/useRfp';

function Recommendation() {

  const { rfpdata } = useRfpContext();
  const { recommendationProposal } = useRfp();
  const [recomData, setRecomData] = useState(null);
  const [loading, setLoading] = useState(false);




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await recommendationProposal(rfpdata);

      setRecomData(res);
      setLoading(false);

    } catch (error) {


    }

  }



  return (
    <>
      <div className='grid grid-cols-1 gap-2 p-2'>
        <div>
          <h2 className="font-bold text-3xl p-2">Recommendations ⭐</h2>
          {!recomData && !loading && (
            <div className=" overflow-hidden flex flex-col">
              <div className="overflow-hidden flex items-center justify-center p-2">
                <img
                  src="/Vendor.jpg"
                  alt="Vendor Recommendation Instructions"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className='w-full px-2'>
                <Button onClick={handleSubmit} className='bg-purple-800 hover:bg-purple-900 w-full cursor-pointer'>
                  Generate Recommendation
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-2 space-y-4 w-full">
          {loading && (
            <p className="text-purple-800 font-semibold">Generating AI recommendation...</p>
          )}

          {recomData && (
            <div className="bg-gray-100 p-4 rounded-2xl shadow-md space-y-4 w-full">
              <div>
                <h3 className="font-bold text-lg text-purple-800">📊 Comparison Summary</h3>
                <pre className="text-gray-700 whitespace-pre-wrap wrap-break-word overflow-x-auto">
                  {recomData.recommendation.Comparision}
                </pre>
              </div>

              <div>
                <h3 className="font-bold text-lg text-purple-800">🏆 Recommended Vendor</h3>
                <p className="text-gray-900 font-semibold wrap-break-word">{recomData.vendor.name}</p>
                <p className="text-gray-900 font-semibold wrap-break-word">Contact : {recomData.vendor.email}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-purple-800">💡 Reason</h3>
                <pre className="text-gray-700 whitespace-pre-wrap wrap-break-word overflow-x-auto">
                  {recomData.recommendation.reason}
                </pre>
              </div>
            </div>
          )}


        </div>
      </div>
    </>
  )
}

export default Recommendation