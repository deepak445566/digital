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
  const subDropdownRef = useRef(null);
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
      const mobile = window.innerWidth < 1024; // Changed to 1024 for better tablet handling
      setIsMobile(mobile);
      
      // Close desktop dropdowns on mobile
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

  useEffect(() => {
    if (menuOverlayRef.current) {
      menuOverlayRef.current.style.display = 'none';
    }
  }, []);

  const handleMouseEnter = (itemTitle) => {
    if (isMobile) return; // Disable hover effects on mobile
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
      if (menuOverlayRef.current) {
        menuOverlayRef.current.style.display = 'flex';
        
        const menuContainer = menuOverlayRef.current.querySelector('.relative');
        
        if (menuContainer) {
          // Mobile specific animation
          if (isMobile) {
            gsap.set(menuContainer, {
              y: '100%',
              opacity: 0,
              scale: 0.95,
              transformOrigin: 'bottom center'
            });

            gsap.to(menuContainer, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power3.out'
            });
          } else {
            // Desktop/Tablet animation
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

          gsap.fromTo(menuOverlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4 }
          );

          const menuItems = menuContainer.querySelectorAll('.menu-item');
          gsap.fromTo(menuItems,
            {
              opacity: 0,
              y: isMobile ? 20 : 40
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              delay: 0.2,
              ease: 'power3.out'
            }
          );

          const closeBtn = menuContainer.querySelector('.close-btn');
          if (closeBtn) {
            gsap.fromTo(closeBtn,
              { opacity: 0, rotation: -45 },
              { opacity: 1, rotation: 0, duration: 0.5, delay: 0.5 }
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
              y: isMobile ? 10 : 20,
              duration: 0.3,
              stagger: 0.03,
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

          // Mobile specific closing animation
          if (isMobile) {
            gsap.to(menuContainer, {
              y: '100%',
              opacity: 0,
              scale: 0.95,
              duration: 0.5,
              ease: 'power3.in',
              onComplete: () => {
                if (menuOverlayRef.current) {
                  menuOverlayRef.current.style.display = 'none';
                }
              }
            });
          } else {
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

  const handleViewAllClick = (href, e) => {
    if (e) e.stopPropagation();
    handleMenuClick();
    
    setTimeout(() => {
      navigate(href);
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
        className={`fixed top-2 sm:top-4 left-2 right-2 lg:left-4 lg:right-4 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl bg-black/90 backdrop-blur-sm rounded-full' : ''}`}
      >
        <div className={`w-full py-1 px-2 sm:px-4 lg:px-8 lg:py-1 ${isHomePage ? 'bg-transparent' : 'bg-black/90'} rounded-full transition-all duration-300 ${isScrolled ? 'scale-[0.98]' : ''}`}>
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <img 
                src="/logo.jpg" 
                className="h-10 w-10 sm:h-12 sm:w-12 lg:h-15 lg:w-15 rounded-full" 
                alt="Logo"
              />
              <div className="flex flex-col ml-2 sm:ml-3">
                <span className="text-white font-bold text-sm sm:text-md lg:text-lg tracking-wider exo">
                  Digital Express<sup className="text-xs">®</sup>
                </span>
                <span className="text-gray-300 text-xs sm:text-sm lg:text-md exo tracking-widest">India</span>
              </div>
            </div>
            
            {/* Navigation Items */}
            <div className='flex items-center gap-2 sm:gap-3 lg:gap-5 relative' ref={dropdownRef}>
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-5 text-lg big">
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
                        className="fixed top-15 left-0 right-10 h-[80vh]"
                        onMouseEnter={() => handleMouseEnter(item.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="absolute top-0 right-0 h-full w-[85%] max-w-[1000px] bg-white shadow-2xl">
                          {/* Close Button */}
                          <button 
                            onClick={() => setActiveDropdown(null)}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
                          >
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>

                          {/* Content Container */}
                          <div className="h-[80vh] overflow-y-auto py-8 px-10">
                            <div className="flex gap-8">
                              {/* LEFT SIDE - Services List */}
                              <div className="w-1/3">
                                <div className="space-y-2">
                                  {item.subServices.map((service, index) => (
                                    <div 
                                      key={service.id}
                                      className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${activeSubDropdown === service.id ? 'bg-blue-50 border-l-2 border-blue-500' : 'bg-gray-50 hover:bg-gray-100'}`}
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
                                      {/* Service Header */}
                                      <div className="mb-6">
                                        <div className="flex items-center mb-3">
                                          <div className={`w-4 h-4 rounded-full ${item.subServices.findIndex(s => s.id === activeSubDropdown) % 5 === 0 ? 'bg-blue-500' : item.subServices.findIndex(s => s.id === activeSubDropdown) % 5 === 1 ? 'bg-green-500' : item.subServices.findIndex(s => s.id === activeSubDropdown) % 5 === 2 ? 'bg-purple-500' : item.subServices.findIndex(s => s.id === activeSubDropdown) % 5 === 3 ? 'bg-orange-500' : 'bg-pink-500'} mr-3`}></div>
                                          <h2 className="text-2xl font-bold text-gray-900">{service.name}</h2>
                                        </div>
                                        <p className="text-gray-600 ml-7">{service.description}</p>
                                      </div>

                                      {/* Subservices Grid - 3 COLUMNS */}
                                      <div className="mb-8">
                                        <div className="grid grid-cols-3 gap-4">
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

              {/* Tablet Navigation (shorter version) */}
              <div className="hidden md:flex lg:hidden items-center space-x-3">
                {menuItems.slice(0, 2).map((item, index) => (
                  <a 
                    key={index}
                    href={item.href} 
                    className="text-gray-300 font-medium text-sm tracking-wide hover:text-white transition-colors duration-300 bg-[#383838] px-3 py-1.5 rounded-full inline-flex items-center justify-center min-w-[70px]"
                  >
                    {item.title}
                  </a>
                ))}
                <button 
                  onClick={handleMenuClick}
                  className="px-3 py-1.5 text-white text-sm font-medium bg-[#383838] rounded-full transition-all duration-300 hover:bg-[#444444]"
                >
                  MENU
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden">
                <button 
                  onClick={handleMenuClick}
                  className="px-3 py-1.5 text-white text-sm font-medium bg-[#383838] rounded-full transition-all duration-300 hover:bg-[#444444]"
                >
                  {isMenuOpen ? "CLOSE" : "MENU"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-16 sm:h-20 lg:h-24"></div>

      {/* MOBILE MENU OVERLAY */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 hidden items-end justify-end px-2 sm:px-4 md:items-center md:justify-center"
      >
        <div 
          className="relative h-[85vh] w-full md:h-[70vh] md:w-[90vw] lg:w-[50vw] bg-white rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl transform-gpu overflow-y-auto"
          style={{
            transformOrigin: isMobile ? 'bottom center' : 'center'
          }}
        >
          {/* Close Button - Top Right */}
          <button 
            onClick={handleMenuClick}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10 close-btn"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="h-full flex flex-col justify-start items-center px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 pb-10">
            <div className="w-full space-y-0">
              {menuItems.map((item, index) => (
                <div 
                  key={index}
                  className="menu-item group relative block w-full"
                >
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => handleOverlayItemClick(item)}
                  >
                    <div className="relative overflow-hidden py-2 sm:py-3">
                      <h3 className="text-black font-extrabold text-2xl sm:text-3xl lg:text-5xl exo tracking-tight opacity-90 group-hover:opacity-100 transition-all duration-300 flex items-center">
                        <span>{item.title}</span>
                        {item.hasDropdown && (
                          <span className={`ml-3 text-xl sm:text-2xl transform transition-transform duration-300 ${activeOverlayItem === item.title ? 'rotate-90' : ''}`}>
                            ›
                          </span>
                        )}
                      </h3>
                    </div>
                    
                    <div className="text-gray-500 text-xl sm:text-2xl lg:text-3xl font-light group-hover:text-black transition-colors duration-300">
                      ({item.number})
                    </div>
                  </div>

                  {/* Mobile Services Dropdown */}
                  {item.hasDropdown && activeOverlayItem === item.title && (
                    <div className="submenu overflow-hidden pl-4 sm:pl-6 mt-2 sm:mt-4">
                      <div className="border-l-2 border-gray-300 pl-4 sm:pl-6 pb-4 sm:pb-6">
                        <h4 className="text-black font-bold text-lg sm:text-xl mb-3 sm:mb-4">Our Services</h4>
                        
                        {/* Mobile Services List */}
                        <div className="space-y-3 sm:space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                          {item.subServices.map((service, index) => (
                            <div key={service.id} className="pb-3 sm:pb-4 border-b border-gray-100 last:border-0">
                              {/* Service Header */}
                              <div 
                                className="cursor-pointer mb-1 sm:mb-2"
                                onClick={(e) => handleServiceLinkClick(service.id, e)}
                              >
                                <div className="flex items-center mb-1 sm:mb-2">
                                  <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${index % 5 === 0 ? 'bg-blue-500' : index % 5 === 1 ? 'bg-green-500' : index % 5 === 2 ? 'bg-purple-500' : index % 5 === 3 ? 'bg-orange-500' : 'bg-pink-500'} mr-2 sm:mr-3`}></div>
                                  <h5 className="text-black font-bold text-sm sm:text-base flex-1">{service.name}</h5>
                                </div>
                                <p className="text-gray-600 text-xs sm:text-sm ml-5 sm:ml-7 mb-2 sm:mb-3 line-clamp-2">{service.description}</p>
                              </div>
                              
                              {/* Subservices - Responsive Grid */}
                              {service.subservices && service.subservices.length > 0 && (
                                <div className="ml-5 sm:ml-7">
                                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                                    {service.subservices.map((subservice) => (
                                      <div
                                        key={subservice.id}
                                        className="cursor-pointer p-2 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200"
                                        onClick={(e) => handleSubserviceLinkClick(service.id, subservice.id, e)}
                                      >
                                        <div className="flex items-center">
                                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 flex-shrink-0"></div>
                                          <span className="text-xs font-medium text-gray-800 truncate">
                                            {subservice.name}
                                          </span>
                                        </div>
                                        <p className="text-gray-600 text-xs mt-1 ml-3 line-clamp-1">
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

            {/* Contact/CTA Section for Mobile */}
            <div className="mt-8 sm:mt-12 w-full px-4">
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