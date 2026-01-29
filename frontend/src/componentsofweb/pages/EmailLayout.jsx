import React, { useState } from 'react'
import useRfp from '@/hooks/useRfp'
import { useRfpContext } from '@/RfpContext';
import { toast } from 'sonner';
import { Mail, Send, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function EmailLayout() {

  const { sendEmailToVendor } = useRfp();
  const { rfpdata, emailData, vendorsData } = useRfpContext();
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();




 

  const rfpId = rfpdata?.rfpdata?.id
  const body = emailData.body;
  const subject = emailData.subject;



  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const vendorEmails = selectedVendors;


    try {
      setLoading(true);
   
      const response = await sendEmailToVendor(subject, body, rfpId, vendorEmails);

      if (response.result.successCount == vendorEmails.length) {
        navigate("/dashboard/recommendation");

      } else {
        if (response.result.failureCount > 0) {
          toast.error(
            `Failed to send email to: ${response.result.failed.join(", ")}`,
            { duration: 6000 }
          );
        }

      }



    } catch (error) {

    }
  }



  const toggleVendor = (vendorEmail) => {
    setSelectedVendors(prev =>
      prev.includes(vendorEmail)
        ? prev.filter(email => email !== vendorEmail)
        : [...prev, vendorEmail]
    );
  };









  return (

    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Send Email to Vendors</h1>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-semibold text-gray-900">Email Preview</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
                    {subject}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-900 whitespace-pre-wrap min-h-[300px]">
                    {body}
                  </div>
                </div>
              </div>
            </div>


            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Recipients</h2>

              <div className="space-y-2 mb-6">
                {vendorsData.map(vendor => (
                  <div
                    key={vendor.id}
                    onClick={() => toggleVendor(vendor.email)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedVendors.includes(vendor.email)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{vendor.name}</h3>
                        <p className="text-sm text-gray-600">{vendor.email}</p>
                      </div>
                      {selectedVendors.includes(vendor.email) && (
                        <Check className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">
                    {selectedVendors.length} vendor{selectedVendors.length !== 1 ? 's' : ''} selected
                  </span>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={selectedVendors.length === 0}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer ${selectedVendors.length > 0
                      ? 'bg-purple-500 hover:bg-purple-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  <Send className="w-5 h-5" />
                  {loading ? "Sending Mail" : "Send Mail"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmailLayout