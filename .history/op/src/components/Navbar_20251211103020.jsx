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
  const [isMobile, setIsMobile] = useState(false);
  
  const menuOverlayRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const subTimeoutRef = useRef(null);

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

  // Check screen size for mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      if (mobile) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (window.Shery && window.gsap) {
      window.Shery.makeMagnet(".magnet", {
        duration: 1,
      });
    }
  }, []);

  // Initialize menu overlay
  useEffect(() => {
    if (menuOverlayRef.current) {
      menuOverlayRef.current.style.opacity = '0';
      menuOverlayRef.current.style.pointerEvents = 'none';
    }
  }, []);

  const handleMouseEnter = (itemTitle) => {
    if (isMobile) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemTitle);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    }, 200);
  };

  const handleSubMouseEnter = (serviceId) => {
    if (isMobile) return;
    if (subTimeoutRef.current) {
      clearTimeout(subTimeoutRef.current);
    }
    setActiveSubDropdown(serviceId);
  };

  const handleSubMouseLeave = () => {
    if (isMobile) return;
    subTimeoutRef.current = setTimeout(() => {
      setActiveSubDropdown(null);
    }, 150);
  };

  const handleOverlayItemClick = (item) => {
    if (item.hasDropdown && isMobile) {
      setActiveOverlayItem(activeOverlayItem === item.title ? null : item.title);
    } else {
      handleMenuClick();
      
      setTimeout(() => {
        navigate(item.href);
      }, 400);
    }
  };

  const handleMenuClick = () => {
    const wasOpen = isMenuOpen;
    setIsMenuOpen(!wasOpen);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setActiveOverlayItem(null);

    if (!wasOpen) {
      // Open menu
      if (menuOverlayRef.current) {
        // Show the overlay first
        menuOverlayRef.current.style.display = 'flex';
        menuOverlayRef.current.style.pointerEvents = 'auto';
        
        const menuContainer = menuOverlayRef.current.querySelector('.menu-container');
        
        if (menuContainer) {
          // Reset styles before animation
          gsap.set(menuContainer, {
            clearProps: 'all'
          });

          if (isMobile) {
            // Mobile animation - slide up from bottom
            gsap.set(menuContainer, {
              y: '100%',
              opacity: 0
            });

            gsap.to(menuContainer, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power3.out',
              onComplete: () => {
                // Animate menu items
                const menuItems = menuContainer.querySelectorAll('.menu-item');
                gsap.fromTo(menuItems,
                  {
                    opacity: 0,
                    y: 20
                  },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    delay: 0.1,
                    ease: 'power2.out'
                  }
                );
              }
            });
          } else {
            // Desktop/Tablet animation
            gsap.set(menuContainer, {
              x: '100%',
              opacity: 0,
              scale: 0.95
            });

            gsap.to(menuContainer, {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power3.out',
              onComplete: () => {
                const menuItems = menuContainer.querySelectorAll('.menu-item');
                gsap.fromTo(menuItems,
                  {
                    opacity: 0,
                    y: 30
                  },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.2,
                    ease: 'power3.out'
                  }
                );
              }
            });
          }

          // Fade in overlay background
          gsap.to(menuOverlayRef.current, {
            opacity: 1,
            duration: 0.3
          });
        }
      }
    } else {
      // Close menu
      if (menuOverlayRef.current) {
        const menuContainer = menuOverlayRef.current.querySelector('.menu-container');
        
        if (menuContainer) {
          // Animate out menu items first
          const menuItems = menuContainer.querySelectorAll('.menu-item');
          gsap.to(menuItems, {
            opacity: 0,
            y: 10,
            duration: 0.2,
            stagger: 0.05,
            ease: 'power2.in'
          });

          // Then animate out the container
          if (isMobile) {
            gsap.to(menuContainer, {
              y: '100%',
              opacity: 0,
              duration: 0.4,
              ease: 'power3.in',
              onComplete: () => {
                if (menuOverlayRef.current) {
                  menuOverlayRef.current.style.display = 'none';
                  menuOverlayRef.current.style.pointerEvents = 'none';
                }
              }
            });
          } else {
            gsap.to(menuContainer, {
              x: '100%',
              opacity: 0,
              scale: 0.95,
              duration: 0.5,
              ease: 'power3.in',
              onComplete: () => {
                if (menuOverlayRef.current) {
                  menuOverlayRef.current.style.display = 'none';
                  menuOverlayRef.current.style.pointerEvents = 'none';
                }
              }
            });
          }

          // Fade out overlay background
          gsap.to(menuOverlayRef.current, {
            opacity: 0,
            duration: 0.3
          });
        }
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };

    if (!isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const handleServiceLinkClick = (serviceId, e) => {
    if (e) e.stopPropagation();
    handleMenuClick();
    
    setTimeout(() => {
      navigate(`/subservice/${serviceId}/subservices`);
    }, 400);
  };

  const handleSubserviceLinkClick = (serviceId, subserviceId, e) => {
    if (e) e.stopPropagation();
    handleMenuClick();
   
    setTimeout(() => {
      navigate(`/subservice/${serviceId}/detail/${subserviceId}`);
    }, 400);
  };

  // Handle desktop click on Services
  const handleDesktopServicesClick = (e, item) => {
    if (!isMobile && item.hasDropdown) {
      e.preventDefault();
      e.stopPropagation();
      setActiveDropdown(activeDropdown === item.title ? null : item.title);
      setActiveSubDropdown(null);
    }
  };

  // Handle click outside dropdown on mobile
  useEffect(() => {
    const handleTouchOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };

    if (isMobile) {
      document.addEventListener('touchstart', handleTouchOutside);
      document.addEventListener('click', handleTouchOutside);
    }
    
    return () => {
      document.removeEventListener('touchstart', handleTouchOutside);
      document.removeEventListener('click', handleTouchOutside);
    };
  }, [isMobile]);

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 sm:top-2 left-0 right-0 lg:left-4 lg:right-4 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl bg-black/95 backdrop-blur-sm' : ''}`}
        style={{ padding: '8px' }}
      >
        <div className={`w-full py-2 px-4 sm:px-6 lg:px-8 ${isHomePage ? 'bg-transparent' : 'bg-black/90'} rounded-full transition-all duration-300 ${isScrolled ? 'scale-[0.98]' : ''}`}>
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <img 
                src="/logo.jpg" 
                className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full" 
                alt="Logo"
              />
              <div className="flex flex-col ml-2 sm:ml-3">
                <span className="text-white font-bold text-sm sm:text-md lg:text-lg tracking-wider exo">
                  Digital Express<sup className="text-xs">®</sup>
                </span>
                <span className="text-gray-300 text-xs sm:text-sm exo tracking-widest">India</span>
              </div>
            </div>
            
            {/* Navigation Items */}
            <div className='flex items-center gap-2 sm:gap-3 lg:gap-5 relative' ref={dropdownRef}>
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-5 text-lg">
                {menuItems.map((item, index) => (
                  <div 
                    key={index}
                    className="relative"
                    onMouseEnter={() => !isMobile && item.hasDropdown && handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a 
                      href={item.href} 
                      className={`text-gray-300 font-medium tracking-wide hover:text-white magnet transition-colors duration-300 bg-[#383838] px-5 py-2 rounded-full ${item.title === 'HOME' ? 'text-white' : ''} inline-flex items-center justify-center min-w-[100px]`}
                      onClick={(e) => handleDesktopServicesClick(e, item)}
                    >
                      <span className="text-center">
                        {item.title}
                        {item.hasDropdown && (
                          <span className="ml-2 text-xs">▼</span>
                        )}
                      </span>
                    </a>

                    {/* SERVICES DROPDOWN - Desktop Only */}
                    {item.hasDropdown && activeDropdown === item.title && !isMobile && (
                      <div 
                        className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)]"
                        onMouseEnter={() => handleMouseEnter(item.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="absolute top-0 right-0 h-full w-full max-w-[1000px] bg-white shadow-2xl">
                          {/* Close Button */}
                          <button 
                            onClick={() => setActiveDropdown(null)}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
                          >
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>

                          <div className="h-full overflow-y-auto py-8 px-10">
                            <div className="flex gap-8">
                              {/* LEFT SIDE - Services List */}
                              <div className="w-1/3">
                                <div className="space-y-2">
                                  {item.subServices.map((service, index) => (
                                    <div 
                                      key={service.id}
                                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${activeSubDropdown === service.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50 hover:bg-gray-100'}`}
                                      onMouseEnter={() => handleSubMouseEnter(service.id)}
                                      onClick={(e) => handleServiceLinkClick(service.id, e)}
                                    >
                                      <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-3 ${index % 5 === 0 ? 'bg-blue-500' : index % 5 === 1 ? 'bg-green-500' : index % 5 === 2 ? 'bg-purple-500' : index % 5 === 3 ? 'bg-orange-500' : 'bg-pink-500'}`}></div>
                                        <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* RIGHT SIDE - Subservices */}
                              <div className="w-2/3">
                                {activeSubDropdown ? (() => {
                                  const service = item.subServices.find(s => s.id === activeSubDropdown);
                                  if (!service || !service.subservices || service.subservices.length === 0) {
                                    return (
                                      <div className="h-full flex items-center justify-center">
                                        <div className="text-center">
                                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                          </div>
                                          <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Service</h3>
                                          <p className="text-gray-600">Hover over a service to see its subservices</p>
                                        </div>
                                      </div>
                                    );
                                  }

                                  return (
                                    <div>
                                      <div className="mb-6">
                                        <div className="flex items-center mb-3">
                                          <div className={`w-4 h-4 rounded-full ${item.subServices.findIndex(s => s.id === activeSubDropdown) % 5 === 0 ? 'bg-blue-500' : item.subServices.findIndex(s => s.id === activeSubDropdown) % 5 === 1 ? 'bg-green-500' : item.subServices.findIndex(s => s.id === activeSubDropdown) % 5 === 2 ? 'bg-purple-500' : item.subServices.findIndex(s => s.id === activeSubDropdown) % 5 === 3 ? 'bg-orange-500' : 'bg-pink-500'} mr-3`}></div>
                                          <h2 className="text-2xl font-bold text-gray-900">{service.name}</h2>
                                        </div>
                                        <p className="text-gray-600 ml-7">{service.description}</p>
                                      </div>

                                      <div className="mb-8">
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                          {service.subservices.map((subservice) => (
                                            <a
                                              key={subservice.id}
                                              href={`/services/${service.id}/${subservice.id}`}
                                              className="bg-gray-50 hover:bg-blue-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 group"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handleSubserviceLinkClick(service.id, subservice.id, e);
                                              }}
                                            >
                                              <div className="flex items-start mb-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></div>
                                                <h4 className="text-base font-semibold text-gray-900 group-hover:text-blue-600">
                                                  {subservice.name}
                                                </h4>
                                              </div>
                                              <p className="text-gray-600 text-sm ml-4 line-clamp-2">
                                                {subservice.description}
                                              </p>
                                            </a>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })() : (
                                  <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                      </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Hover Over Services</h3>
                                    <p className="text-gray-600 max-w-md">
                                      Hover over any service on the left to view its complete list of subservices and detailed information.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Tablet Navigation */}
              <div className="hidden md:flex lg:hidden items-center space-x-3">
                {menuItems.slice(0, 2).map((item, index) => (
                  <a 
                    key={index}
                    href={item.href} 
                    className="text-gray-300 font-medium text-sm tracking-wide hover:text-white transition-colors duration-300 bg-[#383838] px-4 py-2 rounded-full"
                  >
                    {item.title}
                  </a>
                ))}
                <button 
                  onClick={handleMenuClick}
                  className="px-4 py-2 text-white text-sm font-medium bg-[#383838] rounded-full hover:bg-[#444444] transition-colors"
                >
                  MENU
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden">
                <button 
                  onClick={handleMenuClick}
                  className="px-4 py-2 text-white text-sm font-medium bg-[#383838] rounded-full hover:bg-[#444444] transition-colors"
                >
                  {isMenuOpen ? "CLOSE" : "MENU"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-16 sm:h-20 lg:h-24"></div>

      {/* MOBILE MENU OVERLAY - FIXED VERSION */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-40 flex items-end md:items-center md:justify-center"
        style={{
          display: isMenuOpen ? 'flex' : 'none',
          opacity: 0,
          pointerEvents: 'none'
        }}
      >
        <div 
          className="menu-container w-full md:w-[90vw] lg:w-[50vw] bg-white rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl"
          style={{
            maxHeight: isMobile ? '85vh' : '70vh',
            marginTop: isMobile ? 'auto' : '0',
            transform: isMobile ? 'translateY(100%)' : 'translateX(100%)'
          }}
        >
          {/* Close Button */}
          <button 
            onClick={handleMenuClick}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="h-full overflow-y-auto px-6 pt-16 pb-8">
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <div 
                  key={index}
                  className="menu-item opacity-0"
                  style={{ transform: 'translateY(20px)' }}
                >
                  <div 
                    className="flex items-center justify-between cursor-pointer py-3"
                    onClick={() => handleOverlayItemClick(item)}
                  >
                    <div className="relative overflow-hidden">
                      <h3 className="text-black font-extrabold text-3xl sm:text-4xl exo tracking-tight flex items-center">
                        <span>{item.title}</span>
                        {item.hasDropdown && (
                          <span className={`ml-3 text-2xl transform transition-transform duration-300 ${activeOverlayItem === item.title ? 'rotate-90' : ''}`}>
                            ›
                          </span>
                        )}
                      </h3>
                    </div>
                    
                    <div className="text-gray-500 text-2xl font-light">
                      ({item.number})
                    </div>
                  </div>

                  {/* Mobile Services Dropdown */}
                  {item.hasDropdown && activeOverlayItem === item.title && (
                    <div className="overflow-hidden pl-4 mt-2">
                      <div className="border-l-2 border-gray-300 pl-6 pb-4">
                        <h4 className="text-black font-bold text-xl mb-4">Our Services</h4>
                        
                        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                          {item.subServices.map((service, index) => (
                            <div key={service.id} className="pb-4 border-b border-gray-100 last:border-0">
                              {/* Service Header */}
                              <div 
                                className="cursor-pointer mb-2"
                                onClick={(e) => handleServiceLinkClick(service.id, e)}
                              >
                                <div className="flex items-center mb-2">
                                  <div className={`w-2 h-2 rounded-full ${index % 5 === 0 ? 'bg-blue-500' : index % 5 === 1 ? 'bg-green-500' : index % 5 === 2 ? 'bg-purple-500' : index % 5 === 3 ? 'bg-orange-500' : 'bg-pink-500'} mr-3`}></div>
                                  <h5 className="text-black font-bold text-base flex-1">{service.name}</h5>
                                </div>
                                <p className="text-gray-600 text-sm ml-5 mb-3">{service.description}</p>
                              </div>
                              
                              {/* Subservices */}
                              {service.subservices && service.subservices.length > 0 && (
                                <div className="ml-5">
                                  <div className="grid grid-cols-2 gap-2">
                                    {service.subservices.map((subservice) => (
                                      <div
                                        key={subservice.id}
                                        className="cursor-pointer p-2 bg-gray-50 hover:bg-blue-50 rounded border border-gray-200 hover:border-blue-300 transition-all duration-200"
                                        onClick={(e) => handleSubserviceLinkClick(service.id, subservice.id, e)}
                                      >
                                        <div className="flex items-center">
                                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2"></div>
                                          <span className="text-xs font-medium text-gray-800 truncate">
                                            {subservice.name}
                                          </span>
                                        </div>
                                        <p className="text-gray-600 text-xs mt-1 ml-3 truncate">
                                          {subservice.description}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button 
                onClick={() => {
                  handleMenuClick();
                  setTimeout(() => navigate('/contact'), 400);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl text-lg hover:opacity-90 transition-opacity duration-300"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;