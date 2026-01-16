import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import AnimatedButton from './v1/AnimatedButton';
import { services } from './data/data';

function Navbar({ isHomePage = false }) {
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
    subServices: services // Use your actual services array directly
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

  // Handle overlay menu click
  const handleOverlayItemClick = (item) => {
    if (item.hasDropdown) {
      setActiveOverlayItem(activeOverlayItem === item.title ? null : item.title);
    } else {
      // Close menu if it's not a dropdown item
      handleMenuClick();
    }
  };

  const handleMenuClick = () => {
    const wasOpen = isMenuOpen;
    setIsMenuOpen(!wasOpen);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setActiveOverlayItem(null);

    if (!wasOpen) {
      // OPEN MENU ANIMATION
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

          // Background fade in
          gsap.fromTo(menuOverlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4 }
          );

          // Menu items animation (from bottom)
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

          // Close button animation
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
      // CLOSE MENU ANIMATION
      if (menuOverlayRef.current) {
        const menuContainer = menuOverlayRef.current.querySelector('.relative');
        
        if (menuContainer) {
          // Menu items exit
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

          // Close button exit
          const closeBtn = menuContainer.querySelector('.close-btn');
          if (closeBtn) {
            gsap.to(closeBtn, {
              opacity: 0,
              rotation: 45,
              duration: 0.3
            });
          }

          // Menu container slide out to bottom-right
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

          // Background fade out
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
        setActiveSubDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle wheel event on sub-dropdown
  const handleSubDropdownWheel = (e) => {
    const subDropdown = e.currentTarget;
    const isScrollable = subDropdown.scrollHeight > subDropdown.clientHeight;
    const isAtTop = subDropdown.scrollTop === 0;
    const isAtBottom = Math.abs(subDropdown.scrollTop + subDropdown.clientHeight - subDropdown.scrollHeight) < 1;
    
    // Prevent parent scrolling when scrolling inside dropdown
    if (isScrollable) {
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        // Allow parent to scroll when at edges
        return;
      }
      // Prevent parent scroll when scrolling inside dropdown
      e.stopPropagation();
    }
  };

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
             <img src="/logo.jpg"
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

                    {/* Fixed Dropdown for SERVICES using your dataset */}
                    {item.hasDropdown && activeDropdown === item.title && (
                      <div 
                        className="absolute top-full right-20 mt-2 w-80 bg-black/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 overflow-visible z-[100]"
                        onMouseEnter={() => handleMouseEnter(item.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="p-3">
                          {item.subServices.map((service, serviceIndex) => (
                            <div 
                              key={service.id} 
                              className="relative group"
                              onMouseEnter={() => service.subservices && service.subservices.length > 0 && handleSubMouseEnter(service.name)}
                              onMouseLeave={handleSubMouseLeave}
                            >
                              <a
  href={`/subservice/${service.id}/subservices`}
  className="flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 text-sm font-medium exo rounded-lg"
>
                                <span>{service.name.toUpperCase()}</span>
                                {service.subservices && service.subservices.length > 0 && (
                                  <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7-7" />
                                  </svg>
                                )}
                              </a>

                              {/* Sub-Dropdown with actual subservices */}
                              {service.subservices && service.subservices.length > 0 && activeSubDropdown === service.name && (
                                <div 
                                  ref={subDropdownRef}
                                  className="absolute left-full top-0 ml-1 w-80 bg-black/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 overflow-hidden z-[200]"
                                  onMouseEnter={() => handleSubMouseEnter(service.name)}
                                  onMouseLeave={handleSubMouseLeave}
                                  onWheel={handleSubDropdownWheel}
                                  style={{
                                    maxHeight: '400px',
                                    overflowY: 'auto'
                                  }}
                                >
                                  <div className="p-3">
                                    {/* Service Header */}
                                    <div className="mb-2 px-3 py-2 border-b border-gray-800">
                                      <h4 className="text-white font-bold text-sm">{service.name}</h4>
                                      <p className="text-gray-400 text-xs mt-1">{service.description}</p>
                                    </div>
                                    
                                    {/* Subservices List */}
                                    {service.subservices.map((subservice, subIndex) => (
                                     <a
  key={subservice.id}
  href={`/subservice/${service.id}/detail/${subservice.id}`}
  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 text-sm font-medium exo rounded-lg mb-1 group/item"
>
                                        <div className="flex items-center">
                                          <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 mr-3"></div>
                                          <div className="flex-1">
                                            <span className="block">{subservice.name}</span>
                                            <span className="block text-xs text-gray-400 mt-1">{subservice.description}</span>
                                          </div>
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
                          <span className={`ml-4 text-2xl transform transition-transform duration-300 ${activeOverlayItem === item.title ? 'rotate-90' : ''}`}>
                            ›
                          </span>
                        )}
                      </h3>
                    </div>
                    
                    {/* Number in parentheses - Right side */}
                    <div className="text-gray-500 text-2xl lg:text-3xl font-light group-hover:text-black transition-colors duration-500">
                      ({item.number})
                    </div>
                  </div>

                  {/* Submenu for SERVICES in overlay */}
                  {item.hasDropdown && activeOverlayItem === item.title && (
                    <div className="submenu overflow-hidden pl-6">
                      <div className="border-l-2 border-gray-300 pl-4 my-2 space-y-2">
                        {item.subServices.map((service, serviceIndex) => (
                          <div key={service.id} className="group">
                            <div 
                              className="flex items-center justify-between cursor-pointer py-3 text-gray-700 hover:text-black text-xl lg:text-2xl font-medium exo transition-all duration-300 hover:pl-4"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Open link if no subservices
                                if (!service.subservices || service.subservices.length === 0) {
                                  window.location.href = `/services/${service.id}`;
                                  handleMenuClick();
                                }
                              }}
                            >
                              <span>• {service.name.toUpperCase()}</span>
                              {service.subservices && service.subservices.length > 0 && (
                                <span className="text-lg transform transition-transform duration-300">›</span>
                              )}
                            </div>
                            
                            {/* Nested items in overlay - Show subservices */}
                            {service.subservices && service.subservices.length > 0 && (
                              <div 
                                className="nested-menu ml-6 pl-4 border-l border-gray-200 space-y-1"
                                onWheel={handleSubDropdownWheel}
                              >
                                {service.subservices.map((subservice, subIndex) => (
                                  <a
                                    key={subservice.id}
                                    href={`/services/${service.id}/${subservice.id}`}
                                    className="block py-2 text-lg text-gray-600 hover:text-black transition-colors duration-200 pl-4"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMenuClick();
                                    }}
                                  >
                                    <div className="flex items-start">
                                      <span className="mr-2">›</span>
                                      <div>
                                        <span className="block">{subservice.name}</span>
                                        <span className="block text-sm text-gray-500">{subservice.description}</span>
                                      </div>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        <a
                          href={item.href}
                          className="block py-3 text-yellow-600 hover:text-yellow-800 text-lg lg:text-xl font-bold exo transition-all duration-300 mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenuClick();
                          }}
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