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
      title: 'CARRERS', 
      number: '03',
      navColor: 'from-green-500 to-emerald-400',
      href: '/'
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

  const handleSubMouseEnter = (serviceId) => {
    if (subTimeoutRef.current) {
      clearTimeout(subTimeoutRef.current);
    }
    setActiveSubDropdown(serviceId);
  };

  const handleSubMouseLeave = () => {
    subTimeoutRef.current = setTimeout(() => {
      setActiveSubDropdown(null);
    }, 150);
  };

  const handleOverlayItemClick = (item) => {
    if (item.hasDropdown) {
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

  const handleServiceLinkClick = (serviceId, e) => {
    e.stopPropagation();
    handleMenuClick();
    
    setTimeout(() => {
      navigate(`/subservice/${serviceId}/subservices`);
    }, 400);
  };

  const handleSubserviceLinkClick = (serviceId, subserviceId, e) => {
    e.stopPropagation();
    handleMenuClick();
   
    setTimeout(() => {
      navigate(`/subservice/${serviceId}/detail/${subserviceId}`);
    }, 400);
  };

  const handleViewAllClick = (href, e) => {
    e.stopPropagation();
    handleMenuClick();
    
    setTimeout(() => {
      navigate(href);
    }, 400);
  };

  // Check if screen is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle desktop click on Services
  const handleDesktopServicesClick = (e, item) => {
    if (!isMobile && item.hasDropdown) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === item.title ? null : item.title);
      setActiveSubDropdown(null);
    }
  };

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleMobileClickOutside = (event) => {
      if (isMobile && isMenuOpen && menuOverlayRef.current && 
          !menuOverlayRef.current.contains(event.target)) {
        handleMenuClick();
      }
    };

    // Also close on Escape key
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        handleMenuClick();
      }
    };

    document.addEventListener('mousedown', handleMobileClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleMobileClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMobile, isMenuOpen]);

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-4 lg:top-4 left-2 right-2 lg:left-4 lg:right-4 z-[9999] transition-all duration-300 ${isScrolled ? 'shadow-xl bg-black backdrop-blur-sm rounded-full' : ''}`} // Changed z-50 to z-[9999]
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
                      onClick={(e) => handleDesktopServicesClick(e, item)}
                    >
                      <span className="text-center">
                        {item.title}
                        {item.hasDropdown && (
                          <span className="ml-2 text-xs">▼</span>
                        )}
                      </span>
                    </a>

                    {/* SERVICES DROPDOWN - RIGHT SIDE STYLE */}
                    {item.hasDropdown && activeDropdown === item.title && !isMobile && (
                      <div 
                        className="fixed top-15 left-0 right-10 h-[80vh] z-[9998]"
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
                            {/* MAIN CONTENT - 2 COLUMN LAYOUT */}
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

                              {/* RIGHT SIDE - Subservices (Opens on hover) */}
                              <div className="w-2/3">
                                {activeSubDropdown && (() => {
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
                                })()}

                                {/* Default State */}
                                {!activeSubDropdown && (
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
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 z-[9998] hidden items-end justify-end px-4 md:hidden" // Increased z-index to 9998
      >
        {/* Backdrop that closes menu on click */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={handleMenuClick}
        />
        
        {/* Menu Content */}
        <div 
          className="relative h-[90vh] w-full lg:h-[80vh] lg:w-[45vw] bg-white rounded-4xl overflow-hidden shadow-2xl transform-gpu mb-5 lg:mb-0 overflow-y-auto"
          style={{
            transformOrigin: 'bottom right'
          }}
          onClick={(e) => e.stopPropagation()} // Prevent click from closing menu
        >
          {/* Close Button */}
          <button 
            onClick={handleMenuClick}
            className="absolute right-6 top-6 w-10 h-10  rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10 close-btn"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="h-full flex flex-col justify-start items-center px-4 lg:px-12 pt-20 pb-10">
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
                    
                    <div className="text-gray-500 text-2xl lg:text-3xl font-light group-hover:text-black transition-colors duration-500">
                      ({item.number})
                    </div>
                  </div>

                  {/* Mobile Services Dropdown */}
                  {item.hasDropdown && activeOverlayItem === item.title && (
                    <div className="submenu overflow-hidden  mt-4">
                      <div className="border-l-2 border-gray-300 pl-1 pb-6">
                        <h4 className="text-black font-bold text-xl mb-4">Our Services</h4>
                        
                        {/* Mobile Services List */}
                        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
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
                                <p className="text-gray-600 text-xs ml-5 mb-3">{service.description}</p>
                              </div>
                              
                              {/* Subservices - 2 Columns */}
                              {service.subservices && service.subservices.length > 0 && (
                                <div className="ml-5">
                                  <div className="grid grid-cols-2 gap-2">
                                    {service.subservices.map((subservice) => (
                                      <div
                                        key={subservice.id}
                                        className="cursor-pointer p-2 bg-gray-50 hover:bg-blue-50 rounded border border-gray-200 hover:border-blue-300"
                                        onClick={(e) => handleSubserviceLinkClick(service.id, subservice.id, e)}
                                      >
                                        <div className="flex items-center">
                                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2"></div>
                                          <span className="text-xs font-medium text-gray-800 truncate">
                                            {subservice.name}
                                          </span>
                                        </div>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;