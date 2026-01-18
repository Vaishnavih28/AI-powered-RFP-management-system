import React from 'react'
import Header from '../header/Header'
import SideNav from '../sidenav/SideNav'
import { Outlet } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner';

function DashboardLayout() {
  return (
    <div >
        <div className='fixed md:w-64 hidden md:block'>
            <SideNav />
        </div>
        <div className='md:ml-64'>
            <Header />
            <Outlet />
        </div>
        <Toaster />
        
    </div>
  )
}

export default DashboardLayout