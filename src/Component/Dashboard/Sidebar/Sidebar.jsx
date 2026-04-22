import React, { useState } from 'react';
import useAuth from '../../../hook/useAuth';
import { Link } from 'react-router';
import { AiOutlineBars } from 'react-icons/ai';
import { FcSettings } from 'react-icons/fc';
import { GrLogout } from 'react-icons/gr';
import AdminMenu from '../Menu/AdminMenu';
import CustomerMenu from '../Menu/Table/CutomerMenu';

const Sidebar = () => {
  const {logOut}=useAuth()
  const [isActive, setActive] = useState(false)
  return (
    <>
     {/* Mobile Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between items-center md:hidden'>
       
         <Link
              to='/'
              className='text-2xl md:text-3xl font-bold flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500'
            >
              <img
                className='w-10 h-10'
                src='https://i.ibb.co.com/ymfctdJV/chef-restaurant5078-logowik-com.webp'
                alt='Logo'
              />
              LocalChefBazar
            </Link>

        <button
          onClick={() => setActive(!isActive)}
          className='p-4 focus:outline-none'
        >
          <AiOutlineBars className='h-6 w-6' />
        </button>
      </div>
      
       {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-100 px-3 py-4 transform transition-transform duration-300
        ${isActive ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0`}
      >
        <div className='flex flex-col h-full justify-between'>
          {/* Top */}
          <div>
            <div className='hidden md:flex justify-center  rounded-lg  shadow'>
             
<Link to="/" className="text-[#1E3A8A] text-3xl font-bold">
          LibraTech
        </Link>
             
            </div>

            {/* Profile */}
            <div className='mt-4'>
              <menuitem
                icon={FcSettings}
                label='Profile'
                address='/dashboard'
              />
            </div>

            {/* Role Menus */}
            {/* {!isRoleLoading && (
              <nav className='mt-2 space-y-1'>
                {role === 'customer' && <CustomerMenu />}
                {role === 'chef' && <SellerMenu />}
                {role === 'admin' && <AdminMenu />}
              </nav>
            )} */}
            
              <nav className='mt-2 space-y-1'>
         {/* <CustomerMenu />
             <SellerMenu />
                 <AdminMenu />     */}
                 <AdminMenu></AdminMenu>
                 <CustomerMenu></CustomerMenu>
                       </nav>
           
          </div>

          {/* Logout */}
          <button
            onClick={logOut}
            className='flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-300 rounded-md transition'
          >
            <GrLogout className='w-5' />
            <span className='font-medium'>Logout</span>
          </button>
        </div>
      </div>
      
      </>
      

   
  );
};

export default Sidebar;