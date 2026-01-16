import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import AnimatedButton from './v1/AnimatedButton';
import { services } from './data/data';
import { useNavigate } from 'react-router-dom';

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

  // Check if screen is mobile - इसको ऊपर ले जाएं
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const servicesData = {
    title: 'SERVICES',
    number: '03',
    navColor: 'from-yellow-500 to-orange-500',
    href: '/services',
    hasDropdown: true,
    subServices: services
  };

  const menuItems = [
    { 
      title: 'HOME', 
      number: '01',
      navColor: 'from-blue-500 to-cyan-400',
      href: '/'
    },
    { 
      title: 'PROJECTS', 
      number: '02',
      navColor: 'from-green-500 to-emerald-400',
      href: '/projects'
    },
    servicesData,
  ];

  // Rest of your existing code remains the same...

  // Updated handleDesktopServicesClick function
  const handleDesktopServicesClick = (e, item) => {
    // सिर्फ डेस्कटॉप के लिए और सिर्फ Services के लिए
    if (!isMobile && item.hasDropdown) {
      e.preventDefault();
      e.stopPropagation();
      
      // अगर पहले से खुला है तो बंद करें, नहीं तो खोलें
      if (activeDropdown === item.title) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      } else {
        setActiveDropdown(item.title);
        setActiveSubDropdown(null);
      }
    } else if (!isMobile && !item.hasDropdown) {
      // बिना ड्रॉपडाउन वाले आइटम्स के लिए सीधे नेविगेट
      navigate(item.href);
    }
  };

  // Updated handleMouseLeave function
  const handleMouseLeave = () => {
    // सिर्फ डेस्कटॉप के लिए ही timeout सेट करें
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }, 200);
    }
  };

  // Updated handleMouseEnter function
  const handleMouseEnter = (itemTitle) => {
    // सिर्फ डेस्कटॉप के लिए ही mouse enter काम करे
    if (!isMobile && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setActiveDropdown(itemTitle);
    }
  };

  // Updated menu items mapping in JSX
  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-4 lg:top-4 left-2 right-2 lg:left-4 lg:right-4 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl bg-black backdrop-blur-sm rounded-full' : ''}`}
      >
        <div className={`w-full py-1 lg:px-8 lg:py-1 ${isHomePage ? 'bg-transparent' : 'bg-black'} rounded-full transition-all duration-300 ${isScrolled ? 'scale-[0.98]' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/logo.jpg" className="h-15 w-15 lg:h-19 lg:w-19 rounded-full" alt="Logo"/>
              <div className="flex flex-col">
                <span className="text-white font-bold text-md lg:text-lg tracking-wider exo">Digital Express<sup className="text-xs">®</sup></span>
                <span className="text-gray-300 text-md exo tracking-widest">India</span>
              </div>
            </div>
            
            <div className='flex items-center gap-5 relative' ref={dropdownRef}>
              {/* DESKTOP MENU ITEMS - hidden on mobile */}
              <div className="hidden md:flex items-center space-x-5 text-lg big">
                {menuItems.slice(0, 4).map((item, index) => (
                  <div 
                    key={index}
                    className="relative"
                    onMouseEnter={() => !isMobile && item.hasDropdown && handleMouseEnter(item.title)}
                    onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                  >
                    <a 
                      href={item.href} 
                      className={`text-gray-300 font-medium tracking-wide hover:text-white magnet transition-colors duration-300 bg-[#383838] px-5 py-2 rounded-full ${item.title === 'HOME' ? 'text-white' : ''} inline-flex items-center justify-center min-w-[100px] ${activeDropdown === item.title ? '!text-white bg-gray-700' : ''}`}
                      onClick={(e) => handleDesktopServicesClick(e, item)}
                    >
                      <span className="text-center">
                        {item.title}
                        {item.hasDropdown && (
                          <span className={`ml-2 text-xs transition-transform duration-300 ${activeDropdown === item.title ? 'rotate-180' : ''}`}>
                            ▼
                          </span>
                        )}
                      </span>
                    </a>

                    {/* SERVICES DROPDOWN - ONLY FOR DESKTOP */}
                    {item.hasDropdown && activeDropdown === item.title && !isMobile && (
                      <div 
                        className="fixed top-15 left-0 right-10 h-[80vh] z-50"
                        onMouseEnter={() => !isMobile && handleMouseEnter(item.title)}
                        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                      >
                        {/* Your existing dropdown code... */}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* MENU BUTTON - MOBILE ONLY */}
              <div className="md:hidden">
                <button 
                  onClick={handleMenuClick}
                  className="px-2 lg:px-5 py-2 text-white text-md font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl magnet"
                >
                  <AnimatedButton text={isMenuOpen ? "CLOSE" : "☰ MENU"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-24"></div>

      {/* MOBILE MENU OVERLAY - ONLY FOR MOBILE */}
      {isMobile && (
        <div 
          ref={menuOverlayRef}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 hidden items-end justify-end px-4"
        >
          {/* Your existing mobile menu code... */}
        </div>
      )}
    </>
  );
}

export default Navbar;