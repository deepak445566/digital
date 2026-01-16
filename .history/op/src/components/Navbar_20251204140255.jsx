import React from 'react';

function Navbar() {
  return (
    <nav className="w-full px-6 py-4 lg:px-8 lg:py-4 bg-[#0E0E0E] rounded-full">
      <div className="flex items-center justify-between">
        {/* Logo/Brand Section - Left */}
        <div className="flex items-center">
          {/* Logo Icon/Emblem */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">U®</span>
          </div>
          
          {/* Brand Name */}
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg tracking-wider">UNUSUALLY<sup className="text-xs">®</sup></span>
            <span className="text-gray-300 text-xs tracking-widest">OS SUR</span>
          </div>
        </div>

        {/* Navigation Links - Center */}
        <div className="hidden md:flex items-center space-x-10 exo text-md">
          <a 
            href="#" 
            className="text-white font-medium  tracking-wide hover:text-blue-300 transition-colors duration-300 relative group bg-[#383838] px-5 py-1 rounded-full"
          >
            HOME
           
          </a>
          
          <a 
            href="#" 
            className="text-gray-300 font-medium  tracking-wide hover:text-white transition-colors duration-300 relative group"
          >
            STUDIO
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          
          <a 
            href="#" 
            className="text-gray-300 font-medium  tracking-wide hover:text-white transition-colors duration-300 relative group"
          >
            PROJECTS
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          
          <a 
            href="#" 
            className="text-gray-300 font-medium  tracking-wide hover:text-white transition-colors duration-300 relative group"
          >
            CONTACT
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        {/* CTA Button - Right */}
        <div className="flex items-center">
          <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            GET STARTED
          </button>
          
          {/* Mobile Menu Button */}
          <button className="ml-4 md:hidden">
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden mt-4 pt-4 border-t border-gray-800">
        <div className="flex flex-col space-y-4">
          <a href="#" className="text-white font-medium py-2">HOME</a>
          <a href="#" className="text-gray-300 font-medium py-2">STUDIO</a>
          <a href="#" className="text-gray-300 font-medium py-2">PROJECTS</a>
          <a href="#" className="text-gray-300 font-medium py-2">CONTACT</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;