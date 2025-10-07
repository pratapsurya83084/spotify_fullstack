import React from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between  px-6 py-3 shadow-md sticky top-0 z-50">
      
      {/* Left: Logo */}
      <div className="flex items-center">
        <img 
          className="w-12 h-12 mr-6"
          src="https://i.pinimg.com/originals/f0/5c/bc/f05cbc8c0f8b075d2b4f1f68fee49649.jpg" 
          alt="spotify-logo" 
        />
      </div>

      {/* Center: Search Bar */}
      <div className="flex items-center bg-brown rounded-full px-4 py-1 w-1/2">
        <FaSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="What do you want to play?"
          className="bg-transparent focus:outline-none text-white h-10 w-full"
        />
      </div>

      {/* Right: Profile / User */}
      <div className="flex items-center space-x-4">
        {/* Example: User icon */}
        <FaUserCircle className="text-white text-3xl cursor-pointer" />
      </div>

    </nav>
  );
};

export default Navbar;
