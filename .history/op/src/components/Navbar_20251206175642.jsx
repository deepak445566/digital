import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import AnimatedButton from './v1/AnimatedButton';

function Navbar({ isHomePage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const menuOverlayRef = useRef(null);
  const dropdownRef = useRef(null);
  const subDropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const subTimeoutRef = useRef(null);

  // Complete services data with proper links
  const servicesData = {
    title: 'SERVICES',
    number: '02',
    navColor: 'from-yellow-500 to-orange-500',
    href: '/services',
    hasDropdown: true,
    subServices: [
      { 
        title: 'GOOGLE SERVICES', 
        href: '/services/google',
        hasSubDropdown: true,
        subItems: [
          { title: 'Google Listing', href: '/services/google/listing' },
          { title: 'Google Ads', href: '/services/google/ads' },
          { title: 'Google SEO', href: '/services/google/seo' },
          { title: 'Google My Business', href: '/services/google/business' }
        ]
      },
      { 
        title: 'WEBSITE DEVELOPMENT', 
        href: '/services/web-development',
        hasSubDropdown: true,
        subItems: [
          { title: 'Static Websites', href: '/services/web-development/static' },
          { title: 'Dynamic Websites', href: '/services/web-development/dynamic' },
          { title: 'E-commerce', href: '/services/web-development/ecommerce' },
          { title: 'Custom Web Apps', href: '/services/web-development/custom' }
        ]
      },
      { 
        title: 'APP DEVELOPMENT', 
        href: '/services/app-development',
        hasSubDropdown: true,
        subItems: [
          { title: 'Android Apps', href: '/services/app-development/android' },
          { title: 'iOS Apps', href: '/services/app-development/ios' },
          { title: 'Flutter Apps', href: '/services/app-development/flutter' },
          { title: 'React Native', href: '/services/app-development/react-native' }
        ]
      },
      { 
        title: 'CRM SOFTWARE', 
        href: '/services/crm',
        hasSubDropdown: true,
        subItems: [
          { title: 'MLM Software', href: '/services/crm/mlm' },
          { title: 'Custom CRM', href: '/services/crm/custom' },
          { title: 'Business Software', href: '/services/crm/business' },
          { title: 'ERP Systems', href: '/services/crm/erp' }
        ]
      },
      { 
        title: 'VIDEO EDITING', 
        href: '/services/video-editing',
        hasSubDropdown: true,
        subItems: [
          { title: 'Short Videos', href: '/services/video-editing/short' },
          { title: 'Corporate Videos', href: '/services/video-editing/corporate' },
          { title: 'Virtual Tours', href: '/services/video-editing/virtual-tours' },
          { title: 'Animation', href: '/services/video-editing/animation' }
        ]
      },
      { 
        title: 'CELEBRITY AWARDS', 
        href: '/services/celebrity-awards',
        hasSubDropdown: true,
        subItems: [
          { title: 'With Actress', href: '/services/celebrity-awards/actress' },
          { title: 'With Actor', href: '/services/celebrity-awards/actor' },
          { title: 'Award Shows', href: '/services/celebrity-awards/shows' },
          { title: 'Red Carpet Events', href: '/services/celebrity-awards/events' }
        ]
      }
    ]
  };

  // Combined menu items data for both navbar and overlay
  const menuItems = [
    { 
      title: 'HOME', 
      number: '01',
      navColor: 'from-blue-500 to-cyan-400',
      href: '/'
    },
    servicesData,
    { 
      title: 'STUDIO', 
      number: '03',
      navColor: 'from-purple-500 to-pink-500',
      href: '/studio'
    },
    { 
      title: 'PROJECTS', 
      number: '04',
      navColor: 'from-green-500 to-emerald-400',
      href: '/projects'
    },
  ];

  // Scroll detection for navbar style change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.Shery && window.gsap) {
      window.Shery.makeMagnet(".magnet", {
        duration: 1,
      });
    }
  }, []);

  // Initialize menu as hidden
  useEffect(() => {
    if (menuOverlayRef.current) {
      menuOverlayRef.current.style.display = 'none';
    }
  }, []);

  // Handle main dropdown hover
  const handleMouseEnter = (itemTitle) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemTitle);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    }, 200);
  };

  // Handle sub-dropdown hover
  const handleSubMouseEnter = (itemTitle) => {
    if (subTimeoutRef.current) {
      clearTimeout(subTimeoutRef.current);
    }
    setActiveSubDropdown(itemTitle);
  };

  const handleSubMouseLeave = () => {
    subTimeoutRef.current = setTimeout(() => {
      setActiveSubDropdown(null);
    }, 150);
  };

  const handleMenuClick = () => {
    const wasOpen = isMenuOpen;
    setIsMenuOpen(!wasOpen);
    setActiveDropdown(null);
    setActiveSubDropdown(null);

    if (!wasOpen) {
      if (menuOverlayRef.current) {
        menuOverlayRef.current.style.display = 'flex';
        
        const menuContainer = menuOverlayRef.current.querySelector('.relative');
        
        if (menuContainer) {
          gsap.set(menuContainer, {
            x: '100%',
            y: '100%',
            opacity: 0,
            scale: 0.9,
            transformOrigin: 'bottom right'
          });

          gsap.to(menuContainer, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'expo.out'
          });
        }
      }
    } else {
      if (menuOverlayRef.current) {
        const menuContainer = menuOverlayRef.current.querySelector('.relative');
        
        if (menuContainer) {
          gsap.to(menuContainer, {
            x: '100%',
            y: '100%',
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: 'expo.in',
            onComplete: () => {
              if (menuOverlayRef.current) {
                menuOverlayRef.current.style.display = 'none';
              }
            }
          });
        }
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-4 lg:top-4 left-2 right-2 lg:left-4 lg:right-4 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl bg-black backdrop-blur-sm rounded-full' : ''}`}
      >
        <div className={`w-full py-4 lg:px-8 lg:py-4 ${isHomePage ? 'bg-transparent' : 'bg-black'} rounded-full transition-all duration-300 ${isScrolled ? 'scale-[0.98]' : ''}`}>
          <div className="flex items-center justify-between">
            {/* Logo/Brand Section */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">U®</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-wider">UNUSUALLY<sup className="text-xs">®</sup></span>
                <span className="text-gray-300 text-xs tracking-widest">OS SUR</span>
              </div>
            </div>
            
            <div className='flex items-center gap-5 relative' ref={dropdownRef}>
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-5 text-lg big">
                {menuItems.slice(0, 4).map((item, index) => (
                  <div 
                    key={index}
                    className="relative"
                    onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a 
                      href={item.href} 
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
                    </a>

                    {/* Main Dropdown for SERVICES */}
                    {item.hasDropdown && activeDropdown === item.title && (
                      <div 
                        className="absolute top-full right-20 mt-2 w-80 bg-black/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 overflow-visible z-[100]"
                        onMouseEnter={() => handleMouseEnter(item.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="p-3">
                          {item.subServices.map((subItem, subIndex) => (
                            <div 
                              key={subIndex} 
                              className="relative group"
                              onMouseEnter={() => subItem.hasSubDropdown && handleSubMouseEnter(subItem.title)}
                              onMouseLeave={handleSubMouseLeave}
                            >
                              <a
                                href={subItem.href}
                                className="flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 text-sm font-medium exo rounded-lg"
                              >
                                <span>{subItem.title}</span>
                                {subItem.hasSubDropdown && (
                                  <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                )}
                              </a>

                              {/* Sub-Dropdown for Sub-Items - RIGHT SIDE with proper z-index */}
                              {subItem.hasSubDropdown && activeSubDropdown === subItem.title && (
                                <div 
                                  ref={subDropdownRef}
                                  className="absolute left-full top-0 ml-1 w-72 bg-black/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 overflow-hidden z-[200]"
                                  onMouseEnter={() => handleSubMouseEnter(subItem.title)}
                                  onMouseLeave={handleSubMouseLeave}
                                  style={{
                                    maxHeight: '400px',
                                    overflowY: 'auto'
                                  }}
                                >
                                  <div className="p-3">
                                    <div className="mb-2 px-3 py-2 border-b border-gray-800">
                                      <h4 className="text-white font-bold text-sm">{subItem.title}</h4>
                                      <p className="text-gray-400 text-xs mt-1">Specialized Services</p>
                                    </div>
                                    {subItem.subItems.map((nestedItem, nestedIndex) => (
                                      <a
                                        key={nestedIndex}
                                        href={nestedItem.href}
                                        className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 text-sm font-medium exo rounded-lg mb-1 group/item"
                                      >
                                        <div className="flex items-center">
                                          <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 mr-3"></div>
                                          <span>{nestedItem.title}</span>
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="px-4 py-3 border-t border-gray-800 bg-black/50">
                          <a 
                            href={item.href}
                            className="text-yellow-400 hover:text-yellow-300 text-sm font-medium inline-flex items-center"
                          >
                            View All Services
                            <span className="ml-2">→</span>
                          </a>
                        </div>
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

      {/* Spacer div */}
      <div className="h-24"></div>
    </>
  );
}

export default Navbar;