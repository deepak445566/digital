import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import AnimatedButton from './v1/AnimatedButton';
import { services } from './data/data';

function Navbar({ isHomePage = false }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [activeOverlayItem, setActiveOverlayItem] = useState(null);
  
  const menuOverlayRef = useRef(null);
  const dropdownRef = useRef(null);
  const subDropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const subTimeoutRef = useRef(null);

  // Use your services data directly
  const servicesData = {
    title: 'SERVICES',
    number: '02',
    navColor: 'from-yellow-500 to-orange-500',
    href: '/services',
    hasDropdown: true,
    subServices: services
  };

  // Combined menu items data for both navbar and overlay
  const menuItems = [
    { 
      title: 'HOME', 
      number: '01',
      navColor: 'from-blue-500 to-cyan-400',
      href: '/',
      type: 'link'
    },
    servicesData,
    { 
      title: 'STUDIO', 
      number: '03',
      navColor: 'from-purple-500 to-pink-500',
      href: '/studio',
      type: 'link',
      // Hash sections for smooth scroll
      sections: ['about', 'team', 'process', 'contact']
    },
    { 
      title: 'PROJECTS', 
      number: '04',
      navColor: 'from-green-500 to-emerald-400',
      href: '/projects',
      type: 'link',
      // Hash sections for smooth scroll
      sections: ['featured', 'recent', 'all', 'clients']
    },
  ];

  // Function to handle smooth scroll to section
  const handleSmoothScroll = (href, sectionId = null) => {
    // Close menu if open
    if (isMenuOpen) {
      handleMenuClick();
    }

    // Close dropdowns
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    
    // Navigate to the page first
    navigate(href);
    
    // Wait for page to load and then scroll to section
    setTimeout(() => {
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }, 100);
  };

  // Function to handle Studio/Projects click with hash
  const handlePageWithHash = (href, hash = null) => {
    if (isMenuOpen) {
      handleMenuClick();
    }
    
    if (hash) {
      // Navigate to page with hash
      navigate(`${href}#${hash}`);
      
      // Smooth scroll after navigation
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      // Regular navigation without hash
      navigate(href);
    }
  };

  // Update your Desktop Navigation Links section:
  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-4 lg:top-4 left-2 right-2 lg:left-4 lg:right-4 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl bg-black backdrop-blur-sm rounded-full' : ''}`}
      >
        <div className={`w-full py-4 lg:px-8 lg:py-1 ${isHomePage ? 'bg-transparent' : 'bg-black'} rounded-full transition-all duration-300 ${isScrolled ? 'scale-[0.98]' : ''}`}>
          <div className="flex items-center justify-between">
            {/* Logo/Brand Section */}
            <div className="flex items-center">
              <img src="/logo.jpg" className="h-19 w-19"/>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-wider exo">Digital Express<sup className="text-xs">®</sup></span>
                <span className="text-gray-300 text-md exo tracking-widest">India</span>
              </div>
            </div>
            
            <div className='flex items-center gap-5 relative' ref={dropdownRef}>
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-5 text-lg big">
                {menuItems.map((item, index) => (
                  <div 
                    key={index}
                    className="relative"
                    onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.title === 'STUDIO' || item.title === 'PROJECTS' ? (
                      // For STUDIO and PROJECTS with hash sections dropdown
                      <div className="relative group">
                        <button
                          onClick={() => handlePageWithHash(item.href)}
                          className={`text-gray-300 font-medium tracking-wide hover:text-white magnet transition-colors duration-300 bg-[#383838] px-5 py-2 rounded-full inline-flex items-center justify-center min-w-[100px]`}
                        >
                          <span className="text-center">
                            {item.title}
                            <span className="ml-2 text-xs">▼</span>
                          </span>
                        </button>
                        
                        {/* Hash Sections Dropdown for STUDIO and PROJECTS */}
                        <div className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 overflow-hidden z-[100] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                          <div className="p-2">
                            <div className="px-3 py-2 border-b border-gray-800 mb-2">
                              <h4 className="text-white text-sm font-bold">{item.title} SECTIONS</h4>
                            </div>
                            {item.sections?.map((section, idx) => (
                              <button
                                key={idx}
                                onClick={() => handlePageWithHash(item.href, section)}
                                className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 rounded-lg mb-1"
                              >
                                <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                                  <span className="capitalize">{section}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // For other items (HOME, SERVICES)
                      <Link 
                        to={item.href} 
                        className={`text-gray-300 font-medium tracking-wide hover:text-white magnet transition-colors duration-300 bg-[#383838] px-5 py-2 rounded-full ${item.title === 'HOME' ? 'text-white' : ''} inline-flex items-center justify-center min-w-[100px]`}
                        onClick={(e) => {
                          if (item.hasDropdown) {
                            e.preventDefault();
                            setActiveDropdown(activeDropdown === item.title ? null : item.title);
                            setActiveSubDropdown(null);
                          }
                        }}
                      >
                        <span className="text-center">
                          {item.title}
                          {item.hasDropdown && (
                            <span className="ml-2 text-xs">▼</span>
                          )}
                        </span>
                      </Link>
                    )}
                    
                    {/* Existing SERVICES dropdown code remains same */}
                    {item.hasDropdown && activeDropdown === item.title && (
                      <div 
                        className="absolute top-full right-20 mt-2 w-80 bg-black/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 overflow-visible z-[100]"
                        onMouseEnter={() => handleMouseEnter(item.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* ... existing SERVICES dropdown content ... */}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Menu Button */}
              <button 
                onClick={handleMenuClick}
                className="px-2 lg:px-5 py-2 text-white text-md font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl magnet"
              >
                <AnimatedButton text={isMenuOpen ? "CLOSE" : "☰ MENU"} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Update the overlay menu items for STUDIO and PROJECTS */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 hidden items-end justify-end px-4"
      >
        {/* ... existing overlay structure ... */}
        
        {/* Menu Items in overlay */}
        <div className="w-full space-y-1">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item group relative block w-full">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => {
                  if (item.hasDropdown) {
                    setActiveOverlayItem(activeOverlayItem === item.title ? null : item.title);
                  } else if (item.title === 'STUDIO' || item.title === 'PROJECTS') {
                    // Don't close menu, show hash sections
                    setActiveOverlayItem(activeOverlayItem === item.title ? null : item.title);
                  } else {
                    handleMenuClick();
                  }
                }}
              >
                {/* ... title and number ... */}
              </div>

              {/* Show hash sections for STUDIO and PROJECTS in overlay */}
              {(item.title === 'STUDIO' || item.title === 'PROJECTS') && activeOverlayItem === item.title && (
                <div className="submenu overflow-hidden pl-6">
                  <div className="border-l-2 border-gray-300 pl-4 my-2 space-y-2">
                    <div className="mb-2">
                      <h4 className="text-black text-lg font-bold">{item.title} Sections</h4>
                    </div>
                    {item.sections?.map((section, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePageWithHash(item.href, section)}
                        className="block w-full text-left py-3 text-gray-700 hover:text-black text-xl lg:text-2xl font-medium exo transition-all duration-300 hover:pl-4"
                      >
                        <div className="flex items-center">
                          <span className="mr-3">•</span>
                          <span className="capitalize">{section}</span>
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageWithHash(item.href)}
                      className="block py-3 text-purple-600 hover:text-purple-800 text-lg lg:text-xl font-bold exo transition-all duration-300 mt-2"
                    >
                      View Full {item.title} →
                    </button>
                  </div>
                </div>
              )}
              
              {/* ... existing SERVICES dropdown ... */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;