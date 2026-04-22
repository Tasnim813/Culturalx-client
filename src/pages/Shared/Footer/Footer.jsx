import React from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F3D2E] text-white mt-20">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold mb-3">CulturalX</h2>
          <p className="text-gray-200 text-sm">
            Discover, book, and enjoy amazing cultural events around you.
            Your experience starts here 🎉
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li><Link to="/" className="hover:text-[#22c55e]">Home</Link></li>
            <li><Link to="/library" className="hover:text-[#22c55e]">Events</Link></li>
            <li><Link to="/dashboard" className="hover:text-[#22c55e]">Dashboard</Link></li>
            <li><Link to="/login" className="hover:text-[#22c55e]">Login</Link></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="text-gray-200 mb-3">support@culturalx.com</p>

          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-[#22c55e]"><FaFacebook /></a>
            <a href="#" className="hover:text-[#22c55e]"><FaInstagram /></a>
            <a href="#" className="hover:text-[#22c55e]"><FaTwitter /></a>
            <a href="mailto:support@culturalx.com" className="hover:text-[#22c55e]"><FaEnvelope /></a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center py-4 border-t border-[#145A32] text-gray-300 text-sm">
        © {new Date().getFullYear()} CulturalX. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;