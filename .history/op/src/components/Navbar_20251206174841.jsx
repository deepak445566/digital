import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import AnimatedButton from './v1/AnimatedButton';

function Navbar({ isHomePage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const menuOverlayRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

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
        subItems: [
          { title: 'Google Listing', href: '/services/google/listing' },
          { title: 'Google Ads', href: '/services/google/ads' },
          { title: 'Google SEO', href: '/services/google/seo' }
        ]
      },
      { 
        title: 'WEBSITE DEVELOPMENT', 
        href: '/services/web-development',
        subItems: [
          { title: 'Static Websites', href: '/services/web-development/static' },
          { title: 'Dynamic Websites', href: '/services/web-development/dynamic' },
          { title: 'E-commerce', href: '/services/web-development/ecommerce' }
        ]
      },
      { 
        title: 'APP DEVELOPMENT', 
        href: '/services/app-development',
        subItems: [
          { title: 'Android Apps', href: '/services/app-development/android' },
          { title: 'iOS Apps', href: '/services/app-development/ios' },
          { title: 'Flutter Apps', href: '/services/app-development/flutter' }
        ]
      },
      { 
        title: 'CRM SOFTWARE', 
        href: '/services/crm',
        subItems: [
          { title: 'MLM Software', href: '/services/crm/mlm' },
          { title: 'Custom CRM', href: '/services/crm/custom' },
          { title: 'Business Software', href: '/services/crm/business' }
        ]
      },
      { 
        title: 'VIDEO EDITING', 
        href: '/services/video-editing',
        subItems: [
          { title: 'Short Videos', href: '/services/video-editing/short' },
          { title: 'Corporate Videos', href: '/services/video-editing/corporate' },
          { title: 'Virtual Tours', href: '/services/video-editing/virtual-tours' }
        ]
      },
      { 
        title: 'CELEBRITY AWARDS', 
        href: '/services/celebrity-awards',
        subItems: [
          { title: 'With Actress', href: '/services/celebrity-awards/actress' },
          { title: 'With Actor', href: '/services/celebrity-awards/actor' }
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

  // Handle dropdown hover
  const handleMouseEnter = (itemTitle) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemTitle);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Handle dropdown in overlay menu
  const handleOverlayItemClick = (item) => {
    if (item.hasDropdown) {
      const overlayItem = document.querySelector(`[data-item="${item.title}"]`);
      const submenu = overlayItem?.querySelector('.submenu');
      
      if (submenu) {
        if (submenu.style.display === 'block') {
          gsap.to(submenu, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
            onComplete: () => {
              submenu.style.display = 'none';
            }
          });
        } else {
          submenu.style.display = 'block';
          gsap.fromTo(submenu,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
          );
        }
      }
    }
  };

  const handleMenuClick = () => {
    const wasOpen = isMenuOpen;
    setIsMenuOpen(!wasOpen);
    setActiveDropdown(null);

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

          gsap.fromTo(menuOverlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4 }
          );

          const menuItems = menuContainer.querySelectorAll('.menu-item');
          gsap.fromTo(menuItems,
            {
              opacity: 0,
              y: 40
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              delay: 0.3,
              ease: 'power3.out'
            }
          );

          const closeBtn = menuContainer.querySelector('.close-btn');
          if (closeBtn) {
            gsap.fromTo(closeBtn,
              { opacity: 0, rotation: -45 },
              { opacity: 1, rotation: 0, duration: 0.5, delay: 0.8 }
            );
          }
        }
      }
    } else {
      if (menuOverlayRef.current) {
        const menuContainer = menuOverlayRef.current.querySelector('.relative');
        
        if (menuContainer) {
          const menuItems = menuContainer.querySelectorAll('.menu-item');
          gsap.to(menuItems,
            {
              opacity: 0,
              y: 20,
              duration: 0.3,
              stagger: 0.05,
              ease: 'power2.in'
            }
          );

          const closeBtn = menuContainer.querySelector('.close-btn');
          if (closeBtn) {
            gsap.to(closeBtn, {
              opacity: 0,
              rotation: 45,
              duration: 0.3
            });
          }

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

          gsap.to(menuOverlayRef.current, {
            opacity: 0,
            duration: 0.4
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

                    {/* Dropdown for SERVICES */}
                    {item.hasDropdown && activeDropdown === item.title && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-72 bg-black/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 overflow-hidden z-50"
                        onMouseEnter={() => handleMouseEnter(item.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="p-2">
                          {item.subServices.map((subItem, subIndex) => (
                            <div key={subIndex} className="group">
                              <a
                                href={subItem.href}
                                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 text-sm font-medium exo rounded-lg"
                              >
                                <div className="flex items-center justify-between">
                                  <span>{subItem.title}</span>
                                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                                {/* Nested sub-items */}
                                {subItem.subItems && (
                                  <div className="ml-3 mt-2 pl-3 border-l border-gray-700 space-y-1">
                                    {subItem.subItems.map((nestedItem, nestedIndex) => (
                                      <a
                                        key={nestedIndex}
                                        href={nestedItem.href}
                                        className="block py-1 text-xs text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                                      >
                                        • {nestedItem.title}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </a>
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

      {/* Fullscreen Menu Overlay */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 hidden items-end justify-end px-4"
      >
        {/* Menu Container */}
        <div 
          className="relative h-[70vh] w-full lg:h-[80vh] lg:w-[45vw] bg-white rounded-4xl overflow-hidden shadow-2xl transform-gpu mb-35 lg:mb-0 overflow-y-auto"
          style={{
            transformOrigin: 'bottom right'
          }}
        >
          {/* Simple Header with Brand */}
          <div className="absolute top-8 left-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">U®</span>
              </div>
              <div>
                <span className="text-black font-bold text-sm">UNUSUALLY<sup className="text-xs">®</sup></span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button 
            onClick={handleMenuClick}
            className="absolute top-8 right-8 close-btn z-50 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-300"
          >
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main Content Area */}
          <div className="h-full flex flex-col justify-start items-center px-4 lg:px-12 pt-20 pb-10">
            {/* Menu Items */}
            <div className="w-full space-y-1">
              {menuItems.map((item, index) => (
                <div 
                  key={index}
                  data-item={item.title}
                  className="menu-item group relative block w-full"
                >
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => handleOverlayItemClick(item)}
                  >
                    {/* Title - Left side */}
                    <div className="relative overflow-hidden py-3 lg:p-0.5">
                      <h3 className="text-black font-extrabold text-4xl lg:text-6xl exo tracking-tight opacity-90 group-hover:opacity-100 transition-all duration-500 flex items-center">
                        <span>{item.title}</span>
                        {item.hasDropdown && (
                          <span className="ml-4 text-2xl transform transition-transform duration-300">›</span>
                        )}
                      </h3>
                    </div>
                    
                    {/* Number in parentheses - Right side */}
                    <div className="text-gray-500 text-2xl lg:text-3xl font-light group-hover:text-black transition-colors duration-500">
                      ({item.number})
                    </div>
                  </div>

                  {/* Submenu for SERVICES in overlay */}
                  {item.hasDropdown && (
                    <div className="submenu hidden overflow-hidden pl-6">
                      <div className="border-l-2 border-gray-300 pl-4 my-2 space-y-2">
                        {item.subServices.map((subItem, subIndex) => (
                          <div key={subIndex} className="group">
                            <a
                              href={subItem.href}
                              className="block py-3 text-gray-700 hover:text-black text-xl lg:text-2xl font-medium exo transition-all duration-300 hover:pl-4"
                              onClick={handleMenuClick}
                            >
                              • {subItem.title}
                            </a>
                            {/* Nested items in overlay */}
                            {subItem.subItems && (
                              <div className="ml-6 pl-4 border-l border-gray-200 space-y-1">
                                {subItem.subItems.map((nestedItem, nestedIndex) => (
                                  <a
                                    key={nestedIndex}
                                    href={nestedItem.href}
                                    className="block py-2 text-lg text-gray-600 hover:text-black transition-colors duration-200"
                                    onClick={handleMenuClick}
                                  >
                                    › {nestedItem.title}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        <a
                          href={item.href}
                          className="block py-3 text-yellow-600 hover:text-yellow-800 text-lg lg:text-xl font-bold exo transition-all duration-300 mt-2"
                          onClick={handleMenuClick}
                        >
                          View All Services →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;