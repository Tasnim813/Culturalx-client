import React, { useState } from 'react';
import useAuth from '../../../hook/useAuth';
import { Link } from 'react-router';
import { AiOutlineBars } from 'react-icons/ai';
import { GrLogout } from 'react-icons/gr';
import AdminMenu from '../Menu/AdminMenu';
import CustomerMenu from '../Menu/Table/CutomerMenu';
import useRole from '../../../hook/useRole';
import { BsGraphUp } from 'react-icons/bs';
import MenuItem from '../../../pages/Dashboard/Admin/MenuItem';

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role] = useRole();

  return (
    <>
      {/* Mobile Navbar */}
      <div className='bg-white text-[#0F3D2E] flex justify-between items-center md:hidden border-b border-gray-200'>
        <Link to='/' className='flex items-center gap-2 p-2'>
          <span className='font-bold text-[#0F3D2E]'>CulturalX</span>
        </Link>

        <button onClick={() => setActive(!isActive)} className='p-4 focus:outline-none'>
          <AiOutlineBars className='h-6 w-6 text-[#0F3D2E]' />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white px-3 py-4 transform transition-transform duration-300 border-r border-gray-200
        ${isActive ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

        <div className='flex flex-col h-full justify-between'>

          <div>

            {/* Logo */}
            <div className='hidden md:flex justify-center rounded-lg shadow p-2 bg-white'>
              <Link to="/" className="text-[#0F3D2E] text-2xl font-bold">
                CulturalX
              </Link>
            </div>

            {/* Menu */}
            <nav className='mt-6 space-y-1'>

              {/* Dashboard link */}
              <Link
                to='/dashboard'
                className='flex items-center gap-3 px-4 py-2 text-[#0F3D2E] hover:bg-[#E8F5E9] rounded-md mb-4 transition'
              >
                <MenuItem
                  icon={BsGraphUp}
                  label='Statistics'
                  address='/'
                />
              </Link>

              {/* Menus */}
              <AdminMenu />
              <CustomerMenu />
              

            </nav>
          </div>

          {/* Logout */}
          <button
            onClick={logOut}
            className='flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition'
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