import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { AiOutlineMenu } from 'react-icons/ai';
import useAuth from '../../../hook/useAuth';
import avatarImg from '../../../assets/placeholder.jpg';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔥 scroll shadow effect
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
      .catch(error => {
        console.log(error);
      });
  };

  const links = (
    <>
      <NavLink to="/" className="mr-4 font-medium text-gray-800">
        Home
      </NavLink>

      <NavLink to="/library" className="mr-4 font-medium text-gray-800">
        Library
      </NavLink>

      {user && (
        <NavLink to="/dashboard" className="mr-4 font-medium text-gray-800">
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <div
      className={`navbar bg-[#F9FAFB] px-4 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <AiOutlineMenu className="h-5 w-5" />
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li>{links}</li>

            {!user && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
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
        <Link to="/" className="text-[#1E3A8A] text-3xl font-bold">
          LibraTech
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
            className="flex items-center gap-2 p-2 border rounded-full cursor-pointer hover:shadow-md"
          >
            <img
              src={user?.photoURL || avatarImg}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <AiOutlineMenu />
          </div>
        ) : (
          <div className="hidden md:flex gap-2">
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline" to="/register">
              Register
            </Link>
          </div>
        )}

        {/* Dropdown (User) */}
        {isOpen && user && (
          <div className="absolute right-0 top-12 w-40 bg-white shadow-md rounded-xl overflow-hidden z-50">
            <Link
              to="/dashboard"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>

            <div
              onClick={handleLogOut}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
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