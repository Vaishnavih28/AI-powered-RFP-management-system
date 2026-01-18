import React from 'react'
import { LogOutIcon , MessageSquareText,Building2,ChartPie, LayoutGrid,Star,UsersRound  } from 'lucide-react'
import {  NavLink} from 'react-router-dom'
import { Button } from '../../components/ui/button'



function SideNav() {

    const menuList = [
         {
            name:'Dashboard',
            icon : LayoutGrid,
            path : "/dashboard"
        },
        {
            name:'RFP',
            icon : MessageSquareText,
            path :"/dashboard/rfp"
        },
        {
            name : 'Vendors',
            icon: UsersRound,
            path : "/dashboard/vendors"
        },
        {
            name : 'Recommendation',
            icon: Star,
            path : "/dashboard/recommendation"
        },
       
    ]








  return (
    <div className='h-screen p-5 border shadow-sm'>
        <img src="/logo.svg"
        alt="logo"
        width={160}
        height={100}></img>
        <div className='mt-8'>
           <ul>
            
            {menuList.map((menu,index)=>(
                <li key={index}>
                    <NavLink to={menu.path} end className={({isActive})=> `flex gap-2 items-center text-gray-500 font-medium mb-2 p-5 text-lg cursor-pointer rounded-md hover:text-purple-800 hover:bg-purple-200 ${isActive ? 'bg-purple-200 text-purple-800 ' :'' } `}>
                    
                 
                    <menu.icon />
                    {menu.name}
                    
                    </NavLink>    
                </li>  
            ))}
            
            </ul>
        
        </div>
        <div className='mt-auto fixed bottom-10 p-5 flex gap-2 items-center '>
            <Button className='text-gray-500 font-bold hover:text-purple-800 bg-white w-full hover:bg-purple-200' >
            <LogOutIcon/> Log out</Button>

        </div>
    </div>
  )
}

export default SideNav
