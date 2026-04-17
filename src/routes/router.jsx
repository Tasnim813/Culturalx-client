import { createBrowserRouter } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Library from "../pages/Library/Library";
import PrivateRoute from "./privateRoute";
import DashBoardLayout from "../layout/DashBoardLayout";
import Profile from "../pages/Dashboard/Common/Profile";

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
            }
        ]
    }
    
    
])