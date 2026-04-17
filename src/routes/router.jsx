import { createBrowserRouter } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Library from "../pages/Library/Library";

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
    
    
])