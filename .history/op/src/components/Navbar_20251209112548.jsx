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
  const [activeService, setActiveService] = useState(null);
  const [activeOverlayItem, setActiveOverlayItem] = useState(null);
  
  const menuOverlayRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const servicesData = {
    title: 'SERVICES',
    number: '02',
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
    servicesData,
    { 
      title: 'PROJECTS', 
      number: '04',
      navColor: 'from-green-500 to-emerald-400',
      href: '/projects'
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        setActiveDropdown(null);
        setActiveService(null);
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
    setActiveService(null);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveService(null);
    }, 200);
  };

  const handleServiceMouseEnter = (serviceId) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveService(serviceId);
  };

  const handleServiceMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveService(null);
    }, 200);
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
    setActiveService(null);
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
        setActiveService(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleServiceLinkClick = (serviceId, e) => {
    e.stopPropagation();
    handleMenuClick();
    
    setTimeout(() => {
      navigate(`/services/${serviceId}`);
    }, 400);
  };

  const handleSubserviceLinkClick = (serviceId, subserviceId, e) => {
    e.stopPropagation();
    handleMenuClick();
    
    setTimeout(() => {
      navigate(`/services/${serviceId}/${subserviceId}`);
    }, 400);
  };

  const handleViewAllClick = (href, e) => {
    e.stopPropagation();
    handleMenuClick();
    
    setTimeout(() => {
      navigate(href);
    }, 400);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-4 lg:top-4 left-2 right-2 lg:left-4 lg:right-4 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl bg-black backdrop-blur-sm rounded-full' : ''}`}
      >
        <div className={`w-full py-4 lg:px-8 lg:py-1 ${isHomePage ? 'bg-transparent' : 'bg-black'} rounded-full transition-all duration-300 ${isScrolled ? 'scale-[0.98]' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/logo.jpg" className="h-19 w-19" alt="Logo"/>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-wider exo">Digital Express<sup className="text-xs">®</sup></span>
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
                      onClick={(e) => {
                        if (item.hasDropdown) {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === item.title ? null : item.title);
                          setActiveService(null);
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

                    {/* SERVICES DROPDOWN - 80vh HEIGHT */}
                    {item.hasDropdown && activeDropdown === item.title && (
                      <div 
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[90vw] max-w-[1200px] bg-white shadow-2xl rounded-2xl border border-gray-200 z-[100] overflow-hidden"
                        style={{ height: '80vh' }}
                        onMouseEnter={() => handleMouseEnter(item.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Header - Fixed */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h2 className="text-xl font-bold">All Services</h2>
                              <p className="text-blue-100 text-sm mt-1">Browse our complete range of digital solutions</p>
                            </div>
                            <button 
                              onClick={() => setActiveDropdown(null)}
                              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Main Content - Scrollable */}
                        <div className="h-[calc(80vh-73px)] overflow-y-auto">
                          <div className="p-6">
                            {/* Services in COMPACT 4-COLUMN LAYOUT */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                              {item.subServices.map((service, serviceIndex) => (
                                <div 
                                  key={service.id} 
                                  className={`bg-gray-50 rounded-lg border ${activeService === service.id ? 'border-blue-300 shadow-md' : 'border-gray-200'} hover:shadow-lg transition-all duration-200 p-4`}
                                  onMouseEnter={() => handleServiceMouseEnter(service.id)}
                                  onMouseLeave={handleServiceMouseLeave}
                                >
                                  {/* Service Header */}
                                  <div className="mb-3">
                                    <div className="flex items-start mb-2">
                                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mr-3 flex-shrink-0">
                                        <span className="text-white text-xs font-bold">{serviceIndex + 1}</span>
                                      </div>
                                      <div>
                                        <h3 className="text-sm font-bold text-gray-900 leading-tight">{service.name}</h3>
                                        <p className="text-gray-600 text-xs mt-1 line-clamp-2">{service.description}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Subservices - COMPACT LIST */}
                                  {service.subservices && service.subservices.length > 0 && (
                                    <div className="mt-3">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-xs font-semibold text-gray-700">Subservices</h4>
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                          {service.subservices.length}
                                        </span>
                                      </div>
                                      
                                      <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1">
                                        {service.subservices.map((subservice) => (
                                          <a
                                            key={subservice.id}
                                            href={`/services/${service.id}/${subservice.id}`}
                                            className="flex items-start p-2 hover:bg-blue-50 rounded transition-colors group/subitem"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              handleSubserviceLinkClick(service.id, subservice.id, e);
                                            }}
                                          >
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 mr-2 flex-shrink-0"></div>
                                            <div className="flex-1 min-w-0">
                                              <span className="block text-xs font-medium text-gray-800 group-hover/subitem:text-blue-600 truncate">
                                                {subservice.name}
                                              </span>
                                              <span className="block text-gray-500 text-xs truncate">
                                                {subservice.description}
                                              </span>
                                            </div>
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* View Details */}
                                  <div className="mt-3 pt-3 border-t border-gray-200">
                                    <a
                                      href={`/services/${service.id}`}
                                      className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleServiceLinkClick(service.id, e);
                                      }}
                                    >
                                      View details
                                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Combo Services - Compact */}
                            {item.subServices.find(service => service.id === 8) && (
                              <div className="mb-6">
                                <a
                                  href="/services/8"
                                  className="block p-4 bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 transition-all duration-300 rounded-xl border border-yellow-300 hover:border-yellow-400"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleServiceLinkClick(8, e);
                                  }}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center mr-3">
                                        <span className="text-white text-sm font-bold">C</span>
                                      </div>
                                      <div>
                                        <h3 className="text-sm font-bold text-gray-900">COMBO PACKAGES</h3>
                                        <p className="text-gray-600 text-xs">Save up to 30% with bundled services</p>
                                      </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded text-xs font-bold whitespace-nowrap">
                                      SAVE 30%
                                    </div>
                                  </div>
                                </a>
                              </div>
                            )}

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                              <div className="bg-blue-50 rounded-lg p-3 text-center">
                                <div className="text-2xl font-bold text-blue-700">{item.subServices.length}+</div>
                                <div className="text-xs text-blue-600 font-medium">Main Services</div>
                              </div>
                              <div className="bg-green-50 rounded-lg p-3 text-center">
                                <div className="text-2xl font-bold text-green-700">
                                  {item.subServices.reduce((total, service) => total + (service.subservices?.length || 0), 0)}+
                                </div>
                                <div className="text-xs text-green-600 font-medium">Subservices</div>
                              </div>
                              <div className="bg-purple-50 rounded-lg p-3 text-center">
                                <div className="text-2xl font-bold text-purple-700">24/7</div>
                                <div className="text-xs text-purple-600 font-medium">Support</div>
                              </div>
                            </div>

                            {/* CTA Buttons - Compact */}
                            <div className="flex flex-col sm:flex-row gap-3">
                              <button 
                                onClick={() => setActiveDropdown(null)}
                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                              >
                                Get Free Quote
                              </button>
                              <a
                                href={item.href}
                                className="flex-1 px-4 py-2 bg-white hover:bg-gray-50 text-blue-600 text-sm font-medium rounded-lg border border-blue-200 transition-colors inline-flex items-center justify-center"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleViewAllClick(item.href, e);
                                }}
                              >
                                View All Services
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

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

      <div className="h-24"></div>

      {/* Fullscreen Menu Overlay - MOBILE VIEW */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 hidden items-end justify-end px-4"
      >
        <div 
          className="relative h-[70vh] w-full lg:h-[80vh] lg:w-[45vw] bg-white rounded-4xl overflow-hidden shadow-2xl transform-gpu mb-35 lg:mb-0 overflow-y-auto"
          style={{
            transformOrigin: 'bottom right'
          }}
        >
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

          <button 
            onClick={handleMenuClick}
            className="absolute top-8 right-8 close-btn z-50 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-300"
          >
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                  {/* Services in Mobile Overlay */}
                  {item.hasDropdown && activeOverlayItem === item.title && (
                    <div className="submenu overflow-hidden pl-6 mt-4">
                      <div className="border-l-2 border-gray-300 pl-6 pb-6">
                        <h4 className="text-black font-bold text-2xl mb-4">Our Services</h4>
                        
                        {/* Mobile Services List - Compact */}
                        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                          {item.subServices.map((service) => (
                            <div key={service.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <div 
                                className="cursor-pointer mb-2"
                                onClick={(e) => handleServiceLinkClick(service.id, e)}
                              >
                                <div className="flex items-center mb-1">
                                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                                  <h5 className="text-black font-bold text-sm flex-1">{service.name}</h5>
                                </div>
                                <p className="text-gray-600 text-xs ml-4 mb-2 line-clamp-2">{service.description}</p>
                              </div>
                              
                              {/* Subservices Grid for Mobile - Compact */}
                              {service.subservices && service.subservices.length > 0 && (
                                <div className="ml-4">
                                  <div className="grid grid-cols-2 gap-1.5">
                                    {service.subservices.map((subservice) => (
                                      <div
                                        key={subservice.id}
                                        className="cursor-pointer p-1.5 bg-white hover:bg-blue-50 rounded border border-gray-200 hover:border-blue-300"
                                        onClick={(e) => handleSubserviceLinkClick(service.id, subservice.id, e)}
                                      >
                                        <div className="flex items-start">
                                          <div className="w-1 h-1 rounded-full bg-blue-500 mt-1 mr-1 flex-shrink-0"></div>
                                          <span className="block text-black font-medium text-xs truncate">
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

                        {/* Combo Services Mobile - Compact */}
                        {item.subServices.find(service => service.id === 8) && (
                          <div className="mt-4">
                            <div 
                              className="cursor-pointer p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                              onClick={(e) => handleServiceLinkClick(8, e)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-6 h-6 rounded-full bg-yellow-500 mr-2 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">C</span>
                                  </div>
                                  <div>
                                    <h5 className="text-black font-bold text-xs">COMBO SERVICES</h5>
                                    <p className="text-gray-700 text-xs">Save up to 30%</p>
                                  </div>
                                </div>
                                <div className="bg-yellow-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                                  SAVE
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* View All Button Mobile */}
                        <div
                          className="cursor-pointer inline-flex items-center text-blue-600 hover:text-blue-700 font-bold text-sm mt-4 group/viewall"
                          onClick={(e) => handleViewAllClick(item.href, e)}
                        >
                          <span className="mr-2">View All Services</span>
                          <span className="transform group-hover/viewall:translate-x-1 transition-transform">→</span>
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