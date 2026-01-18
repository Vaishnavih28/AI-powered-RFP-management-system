import Recommendation from "@/componentsofweb/pages/Recommendation";
import RFP from "@/componentsofweb/pages/RFP";
import Vendor from "@/componentsofweb/pages/Vendor";
import DashboardLayout from "@/componentsofweb/layout/DashboardLayout";
import Dashboard from "@/componentsofweb/Dashboard";
import {  Route, Routes,Navigate } from "react-router-dom";
import Email from "@/componentsofweb/pages/EmailLayout";
import Summary from "@/componentsofweb/pages/Summary";


const AppRoutes = ()=>{
    return(
        
            <Routes>
                
                <Route path='/dashboard' element={<DashboardLayout />} >
                <Route index element={<Dashboard />} />
                <Route path='rfp' element={<RFP/>} />
                <Route path="email" element={<Email />} />
                <Route path="summary" element={<Summary />} />
                <Route path='vendors' element={<Vendor/>} />
                <Route path='recommendation' element={<Recommendation/>} />
                </Route>
                <Route path='*' element={<Navigate to="/dashboard" replace />} />
            </Routes>
        
    );
};

export default AppRoutes;