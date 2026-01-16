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
  const menuContentRef = useRef(null);
  const dropdownRef = useRef(null);
  const subDropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const subTimeoutRef = useRef(null);

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

  useEffect(() => {
    if (window.Shery && window.gsap) {
      window.Shery.makeMagnet(".magnet", {
        duration: 1,
      });
    }
  }, []);

  // Updated mouse handlers for desktop only
  const handleMouseEnter = (itemTitle) => {
    if (!isMobile && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!isMobile) {
      setActiveDropdown(itemTitle);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }, 200);
    }
  };

  const handleSubMouseEnter = (serviceId) => {
    if (!isMobile && subTimeoutRef.current) {
      clearTimeout(subTimeoutRef.current);
    }
    if (!isMobile) {
      setActiveSubDropdown(serviceId);
    }
  };

  const handleSubMouseLeave = () => {
    if (!isMobile && subTimeoutRef.current) {
      clearTimeout(subTimeoutRef.current);
    }
    if (!isMobile) {
      subTimeoutRef.current = setTimeout(() => {
        setActiveSubDropdown(null);
      }, 150);
    }
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
    
    if (!wasOpen) {
      // Open mobile menu
      if (menuOverlayRef.current) {
        // Show overlay immediately
        menuOverlayRef.current.style.display = 'block';
        
        // Animate backdrop
        gsap.to(menuOverlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        // Animate menu content from bottom
        if (menuContentRef.current) {
          gsap.fromTo(menuContentRef.current,
            {
              y: '100%',
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              delay: 0.1
            }
          );
        }
      }
    } else {
      // Close mobile menu
      if (menuOverlayRef.current && menuContentRef.current) {
        // Animate menu content out
        gsap.to(menuContentRef.current, {
          y: '100%',
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        });
        
        // Animate backdrop out
        gsap.to(menuOverlayRef.current, {
          opacity: 0,
          duration: 0.3,
          delay: 0.1,
          ease: 'power2.in',
          onComplete: () => {
            if (menuOverlayRef.current) {
              menuOverlayRef.current.style.display = 'none';
            }
          }
        });
      }
    }
    
    // Reset dropdown states
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setActiveOverlayItem(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isMobile && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

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

  // Handle desktop click on Services
  const handleDesktopServicesClick = (e, item) => {
    // Only handle for desktop and Services item
    if (!isMobile && item.hasDropdown) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle dropdown
      if (activeDropdown === item.title) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      } else {
        setActiveDropdown(item.title);
        setActiveSubDropdown(null);
      }
    } else if (!isMobile && !item.hasDropdown) {
      // For non-dropdown items on desktop, navigate directly
      e.preventDefault();
      navigate(item.href);
    }
  };

  // Close mobile menu when clicking outside or pressing ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        handleMenuClick();
      }
    };

    const handleClickOutside = (e) => {
      if (isMenuOpen && menuContentRef.current && 
          !menuContentRef.current.contains(e.target) &&
          menuOverlayRef.current && 
          menuOverlayRef.current.contains(e.target)) {
        handleMenuClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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
                {menuItems.map((item, index) => (
                  <div 
                    key={index}
                    className="relative"
                    onMouseEnter={() => item.hasDropdown && !isMobile && handleMouseEnter(item.title)}
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

                    {/* SERVICES DROPDOWN - DESKTOP ONLY */}
                    {!isMobile && item.hasDropdown && activeDropdown === item.title && (
                      <div 
                        className="fixed top-15 left-0 right-10 h-[80vh] z-50"
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
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleDesktopServicesClick(e, item);
                                        navigate(`/subservice/${service.id}/subservices`);
                                      }}
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
                                                setActiveDropdown(null);
                                                navigate(`/subservice/${service.id}/detail/${subservice.id}`);
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

      {/* MOBILE MENU OVERLAY - SIMPLE VERSION */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 z-40 hidden"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(4px)'
        }}
      >
        {/* Menu Content */}
        <div 
          ref={menuContentRef}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-hidden"
          style={{
            transform: 'translateY(100%)',
            opacity: 0
          }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-xl font-bold text-gray-900">Menu</h2>
            <button 
              onClick={handleMenuClick}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Menu Items */}
          <div className="overflow-y-auto max-h-[calc(80vh-64px)] px-6 py-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <div key={index} className="mb-4">
                  <div 
                    className="flex items-center justify-between py-3 cursor-pointer"
                    onClick={() => handleOverlayItemClick(item)}
                  >
                    <div className="flex items-center">
                      <span className="text-gray-500 text-sm mr-3">({item.number})</span>
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    </div>
                    
                    {item.hasDropdown && (
                      <span className={`text-xl transform transition-transform duration-300 ${activeOverlayItem === item.title ? 'rotate-90' : ''}`}>
                        ›
                      </span>
                    )}
                  </div>

                  {/* Mobile Services Dropdown */}
                  {item.hasDropdown && activeOverlayItem === item.title && (
                    <div className="pl-8 mt-2 border-l-2 border-gray-300">
                      <div className="space-y-4">
                        {item.subServices.map((service, index) => (
                          <div key={service.id} className="pb-4 border-b border-gray-100 last:border-0">
                            {/* Service Header */}
                            <div 
                              className="cursor-pointer mb-2"
                              onClick={(e) => handleServiceLinkClick(service.id, e)}
                            >
                              <div className="flex items-center mb-1">
                                <div className={`w-2 h-2 rounded-full ${index % 5 === 0 ? 'bg-blue-500' : index % 5 === 1 ? 'bg-green-500' : index % 5 === 2 ? 'bg-purple-500' : index % 5 === 3 ? 'bg-orange-500' : 'bg-pink-500'} mr-3`}></div>
                                <h5 className="text-black font-bold text-base flex-1">{service.name}</h5>
                              </div>
                              <p className="text-gray-600 text-xs ml-5 mb-2">{service.description}</p>
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