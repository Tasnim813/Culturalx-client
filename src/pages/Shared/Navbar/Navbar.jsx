import React from 'react';
import { Link } from 'react-router';
import useAuth from '../../../hook/useAuth';

const Navbar = () => {
  const {user,logOut}=useAuth()

  const handleLogOut=()=>{
    logOut()
    .then()
    .catch(error=>{
      console.log(error)
    })
  }
    const links=<>
    <Link to='/library' className='text-secondary text-2xl font-bold'>Library</Link>
 
    </>


    return (
        <div className="navbar bg-[#F9FAFB] shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <Link to='/' className="text-[#1E3A8A] text-3xl font-bold">LibraTech</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
 {links}
    </ul>
  </div>
  <div className="navbar-end">
    
   {/* <Link className='btn btn-primary' to='/login'>Login</Link> */}
   {
    user?  <Link onClick={handleLogOut} className='btn btn-primary ml-2' >logout</Link> : <Link className='btn btn-primary' to='/login'>Login</Link>
   }
 {/* <Link className='btn btn-primary ml-2' to='/register'>Register</Link> */}
  </div>
</div>
    );
};

export default Navbar;