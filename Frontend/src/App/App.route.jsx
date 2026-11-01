import { createBrowserRouter, Navigate } from "react-router-dom"
import Home from "../features/auth/component/Home.jsx"
import Register from '../features/auth/pages/Register.jsx'
import Login from '../features/auth/pages/Login.jsx'
import Booking from "../features/order/pages/Booking.jsx"
import Resendmail from '../features/auth/component/Resendmail.jsx'
import Forgetmail from '../features/auth/component/Forgetmail.jsx'
import ForgetPassword from '../features/auth/component/ForgetPassword.jsx'
import View from '../features/auth/component/View.jsx'
import CustomerProfile from '../features/auth/component/CustomerProfile.jsx'
import TechnicianRegister from '../features/technician/pages/TechnicianRegister.jsx'
import TechnicianDashboard from '../features/technician/pages/TechnicianDashboard.jsx'
import TechnicianProfile from '../features/technician/component/Technician-Profile.jsx'
import TechnicianNotification from "../features/technician/component/TechnicianNotification.jsx"
import NotFound from "../features/auth/component/NotFound.jsx"
import Protected from "../features/auth/component/Protected.jsx"
import AllService from "../features/admin/pages/AllService.jsx"
import createService from "../features/admin/components/createService.jsx"
import AdminDashboard from "../features/admin/pages/admin_Dashboard.jsx"
import AppLayout from "./AppLayout.jsx"
export const router = createBrowserRouter([
    {
                 path: "/",
             element: <Navigate to="/customer" replace /> 
            },
     {
        path:"/customer", 
      
        children:[
          {
                index: true,
                element: <Home />
            }, 
            {
        path: "/customer/",
        element: <Home />
    },
    
    {
        path:"/customer/allServices",
        element:<AllService/>
    },
    {
        path: "/customer/register",
        element: <Register />
    },
    {
        path: "/customer/login",
        element: <Login />
    },
    {
        path: "/customer/booking",
        element: <Booking/>
    },
    {
        path: "/customer/resend-mail",
        element: <Resendmail />
    },
    {
        path: "/customer/forget-mail",
        element:<Forgetmail />
        
    },
    {
        path: "/customer/forget-password",
        element: <ForgetPassword />
    },
   
    {
        /* Dynamic route — /view/apple, /view/dell, /view/hp, /view/lenovo */
        path: "/customer/service/:serviceId",
        element: <View />
    },
    {
        path: "/customer/profile",
        element: <Protected>
            <CustomerProfile />
        </Protected>
    },
        ]
     },
     
    {
        path: "/Technician-Dashboard",
        element: <TechnicianDashboard />
    },
    {
        path:"/technician-register",
        element:<TechnicianRegister/>
    },
    {
        path: "/Technician-Profile",
        element: <TechnicianProfile />
    },
    {
        path: "/TechnicianNotification",
        element: <TechnicianNotification />
    },
    {
        path: "/admin",
        element: (
          <Protected>
            <AdminDashboard />
          </Protected>
        ),
    },
    {
        path: "/admin/admin-Dashboard",
        element: (
          <Protected>
            <AdminDashboard />
          </Protected>
        ),
    },
    {
        path: "/Admin-Dashboard",
        element: (
          <Protected>
            <AdminDashboard />
          </Protected>
        ),
    },
    {
        path: "*",
        element: <NotFound />
    },
])
