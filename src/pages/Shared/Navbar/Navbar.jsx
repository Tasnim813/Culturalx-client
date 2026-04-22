import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { AiOutlineMenu } from 'react-icons/ai';
import useAuth from '../../../hook/useAuth';
import avatarImg from '../../../assets/placeholder.jpg';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch(error => console.log(error));
  };

  const links = (
    <>
      <NavLink to="/" className="mr-4 font-medium text-[#0F3D2E] hover:text-[#145A32] transition">
        Home
      </NavLink>

      <NavLink to="/library" className="mr-4 font-medium text-[#0F3D2E] hover:text-[#145A32] transition">
        Library
      </NavLink>

      {user && (
        <NavLink to="/dashboard" className="mr-4 font-medium text-[#0F3D2E] hover:text-[#145A32] transition">
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <div
      className={`navbar  bg-white px-4 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-[#0F3D2E]">
            <AiOutlineMenu className="h-5 w-5" />
          </div>

          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
            <li>{links}</li>

            {!user && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}

            {user && (
              <li>
                <span onClick={handleLogOut}>Logout</span>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-[#0F3D2E] text-3xl font-bold">
          CulturalX
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end relative">
        {user ? (
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-2 border border-[#0F3D2E] rounded-full cursor-pointer hover:shadow-md"
          >
            <img
              src={user?.photoURL || avatarImg}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <AiOutlineMenu className="text-[#0F3D2E]" />
          </div>
        ) : (
          <div className="hidden md:flex gap-2">
            <Link
              className="btn bg-[#0F3D2E] text-white hover:bg-[#145A32]"
              to="/login"
            >
              Login
            </Link>

            <Link
              className="btn border border-[#0F3D2E] text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white"
              to="/register"
            >
              Register
            </Link>
          </div>
        )}

        {/* Dropdown */}
        {isOpen && user && (
          <div className="absolute right-0 top-12 w-40 bg-white shadow-md rounded-xl overflow-hidden z-50 border border-[#0F3D2E]">
            <Link
              to="/dashboard"
              className="block px-4 py-2 hover:bg-[#E8F5E9]"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>

            <div
              onClick={handleLogOut}
              className="block px-4 py-2 hover:bg-[#E8F5E9] cursor-pointer"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;