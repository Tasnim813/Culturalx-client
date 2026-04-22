import { createBrowserRouter } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Library from "../pages/Library/Library";
import PrivateRoute from "./privateRoute";
import DashBoardLayout from "../layout/DashBoardLayout";
import Profile from "../pages/Dashboard/Common/Profile";
import AddEvent from "../pages/Dashboard/Admin/AddEvent";
import EventDetail from "../pages/Home/EventDetail/EventDetail";
import MyOrder from "../pages/Dashboard/Cutomer/MyOrder";


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
                Component: EventDetail
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
                    <Profile></Profile>
                </PrivateRoute>
            },
            {
                path:"Add-event",
                element: <AddEvent></AddEvent>
            },
            {
                path:"my-orders",
                element: <MyOrder></MyOrder>
            }
        ]
    }
    
    
])