import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className="p-8 w-full h-[80vh] ">
            <h2 className="font-bold text-3xl">Hello User!</h2>
            <p className="text-gray-500">AI-powered RFP management system</p>
            <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                <h2 className=" text-xl font-bold">Create RFP and get recommendations on proposals received using AI!</h2>
                <Button onClick={() => navigate('/dashboard/rfp')} className='bg-purple-800 hover:bg-purple-950'>Get Started</Button>
            </div>
        </div>
    )
}

export default Dashboard