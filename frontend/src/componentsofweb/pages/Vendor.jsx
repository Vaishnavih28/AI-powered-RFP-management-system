import { useEffect } from 'react'
import { useRfpContext } from '@/RfpContext';
import useRfp from '@/hooks/useRfp';
import { useState } from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Vendor() {

  const { vendorsData, setVendorsData } = useRfpContext();
  const { getVendors } = useRfp();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchVendors = async () => {
      setLoading(true);

      try {
        const vendors = await getVendors();

        if (isMounted) {
          setVendorsData(vendors);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load vendors');
          console.error(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVendors();

    return () => {
      isMounted = false;
    };
  }, []);









  return (
    <div>
      <h2 className="font-bold text-3xl p-4" >Vendors</h2>

      {loading && <p>Loading vendors...</p>}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
          {vendorsData?.map(v => (

            <div key={v.id} className=''>
              <Card>
                <CardHeader>
                  <CardTitle>{v.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Contact : {v.email}</p>
                </CardContent>
              </Card>
            </div>


          ))}


        </div>
      </div>



    </div>
  )
}

export default Vendor