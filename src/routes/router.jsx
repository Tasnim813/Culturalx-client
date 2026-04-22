import { createBrowserRouter } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Library from "../pages/Library/Library";
import PrivateRoute from "./privateRoute";
import DashBoardLayout from "../layout/DashBoardLayout";
import AddEvent from "../pages/Dashboard/Admin/AddEvent";
import EventDetail from "../pages/Home/EventDetail/EventDetail";
import MyOrder from "../pages/Dashboard/Cutomer/MyOrder";
import Payment from "../Component/Dashboard/Payment/Payment";
import TotalBooking from "../pages/Dashboard/Admin/TotalBooking";

import ManageUser from "../pages/Dashboard/Admin/ManageUser";
import Static from "../pages/Dashboard/Common/Static";


export  const router=createBrowserRouter([
    {
        path:'/',
        Component:Rootlayout,
        children:[
            {
                path:'/',
                Component:Home

            },
             {
                path:'/login',
                Component:Login,
            },
            {
                path:'/register',
                Component: Register
            },
            {
                path:'/library',
                Component:Library
            },
            {
                path:'/event-details/:id',
                element:<PrivateRoute>
                    <EventDetail></EventDetail>
                </PrivateRoute> 
                
            },
            {
                path: '/payment-success',
                Component: Payment
            }
           
        ]
    },
    {
        path:'/dashboard',
        element:(
            <PrivateRoute>
            <DashBoardLayout></DashBoardLayout>
        </PrivateRoute>
        ),
        children:[
            {
                index:true,
                element:<PrivateRoute>
                    <Static></Static>
                </PrivateRoute>
            },
            {
                path:"Add-event",
                element: <AddEvent></AddEvent>
            },
            {
                path:"Total-booking",
                element: <TotalBooking></TotalBooking>

            },
            {
                path:"my-orders",
                element: <MyOrder></MyOrder>
            },
            {
                path:'manage-user',
                element: <ManageUser></ManageUser>

            }
            
        ]
    }
    
    
])