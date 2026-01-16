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

  const getServiceGridCols = (serviceId) => {
    // Return appropriate grid columns based on service ID or number of subservices
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
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

                    {/* FULL SCREEN SERVICES DROPDOWN */}
                    {item.hasDropdown && activeDropdown === item.title && (
                      <div 
                        className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-white z-[9999] overflow-hidden"
                        onMouseEnter={() => handleMouseEnter(item.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Header */}
                        <div className="bg-gray-900 text-white p-6">
                          <div className="container mx-auto">
                            <div className="flex justify-between items-center">
                              <div>
                                <h1 className="text-3xl font-bold">Our Services</h1>
                                <p className="text-gray-300 mt-2">Choose from our wide range of digital solutions</p>
                              </div>
                              <button 
                                onClick={() => setActiveDropdown(null)}
                                className="text-white hover:text-gray-300 text-2xl"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Main Content - Everything in one screen */}
                        <div className="h-[calc(100vh-120px)] overflow-y-auto">
                          <div className="container mx-auto p-6">
                            {/* Services Grid - ALL SERVICES IN ONE VIEW */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                              {item.subServices.map((service, serviceIndex) => (
                                <div 
                                  key={service.id} 
                                  className={`bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ${activeService === service.id ? 'ring-2 ring-blue-500' : ''}`}
                                  onMouseEnter={() => handleServiceMouseEnter(service.id)}
                                  onMouseLeave={handleServiceMouseLeave}
                                >
                                  {/* Service Card */}
                                  <div className="p-5">
                                    <div className="flex items-start mb-4">
                                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mr-4">
                                        <span className="text-white font-bold text-sm">{serviceIndex + 1}</span>
                                      </div>
                                      <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{service.name}</h3>
                                        <p className="text-gray-600 text-sm">{service.description}</p>
                                      </div>
                                    </div>

                                    {/* ALL Subservices visible at once */}
                                    {service.subservices && service.subservices.length > 0 && (
                                      <div className="mt-4">
                                        <div className="flex items-center justify-between mb-3">
                                          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Subservices</h4>
                                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                            {service.subservices.length} services
                                          </span>
                                        </div>
                                        
                                        {/* Subservices Grid - ALL SUBITEMS VISIBLE */}
                                        <div className={`grid ${getServiceGridCols(service.id)} gap-3`}>
                                          {service.subservices.map((subservice) => (
                                            <a
                                              key={subservice.id}
                                              href={`/services/${service.id}/${subservice.id}`}
                                              className="bg-gray-50 hover:bg-blue-50 rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-all duration-200 group/subitem"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handleSubserviceLinkClick(service.id, subservice.id, e);
                                              }}
                                            >
                                              <div className="flex items-start">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></div>
                                                <div className="flex-1">
                                                  <h5 className="text-sm font-medium text-gray-900 group-hover/subitem:text-blue-600 mb-1">
                                                    {subservice.name}
                                                  </h5>
                                                  <p className="text-xs text-gray-600 line-clamp-2">
                                                    {subservice.description}
                                                  </p>
                                                </div>
                                              </div>
                                            </a>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* View Service Button */}
                                    <div className="mt-5 pt-4 border-t border-gray-100">
                                      <a
                                        href={`/services/${service.id}`}
                                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group/viewservice"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleServiceLinkClick(service.id, e);
                                        }}
                                      >
                                        <span>View Service Details</span>
                                        <svg className="w-4 h-4 ml-2 group-hover/viewservice:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Combo Services - Full Width */}
                            {item.subServices.find(service => service.id === 8) && (
                              <div className="mb-8">
                                <a
                                  href="/services/8"
                                  className="block p-6 bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 hover:from-yellow-100 hover:via-orange-100 hover:to-yellow-100 transition-all duration-300 rounded-xl border-2 border-yellow-300 hover:border-yellow-400 group/combo"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleServiceLinkClick(8, e);
                                  }}
                                >
                                  <div className="flex flex-col md:flex-row items-center justify-between">
                                    <div className="flex items-center mb-4 md:mb-0">
                                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center mr-4 animate-pulse">
                                        <span className="text-white font-bold text-lg">✓</span>
                                      </div>
                                      <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">COMBO SERVICES PACKAGE</h3>
                                        <p className="text-gray-700">Get multiple services together at specially discounted prices. Perfect for growing businesses.</p>
                                      </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg">
                                      SAVE UP TO 30%
                                    </div>
                                  </div>
                                </a>
                              </div>
                            )}

                            {/* CTA Section */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
                              <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help Choosing?</h3>
                                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                                  Our experts can help you select the perfect services for your business needs.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                  <button 
                                    onClick={() => setActiveDropdown(null)}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
                                  >
                                    Schedule Free Consultation
                                  </button>
                                  <a
                                    href={item.href}
                                    className="px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 font-medium rounded-lg border border-blue-200 transition-colors duration-300 inline-flex items-center justify-center group/viewall"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleViewAllClick(item.href, e);
                                    }}
                                  >
                                    <span className="mr-2">Browse All Services</span>
                                    <svg className="w-5 h-5 group-hover/viewall:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </a>
                                </div>
                              </div>
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
                        
                        {/* Mobile Services List */}
                        <div className="space-y-4">
                          {item.subServices.map((service) => (
                            <div key={service.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <div 
                                className="cursor-pointer mb-3"
                                onClick={(e) => handleServiceLinkClick(service.id, e)}
                              >
                                <div className="flex items-center mb-2">
                                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></div>
                                  <h5 className="text-black font-bold text-base">{service.name}</h5>
                                </div>
                                <p className="text-gray-600 text-sm ml-6 mb-3">{service.description}</p>
                              </div>
                              
                              {/* Subservices Grid for Mobile */}
                              {service.subservices && service.subservices.length > 0 && (
                                <div className="ml-6">
                                  <div className="grid grid-cols-2 gap-2">
                                    {service.subservices.map((subservice) => (
                                      <div
                                        key={subservice.id}
                                        className="cursor-pointer p-2 bg-white hover:bg-blue-50 rounded border border-gray-200 hover:border-blue-300"
                                        onClick={(e) => handleSubserviceLinkClick(service.id, subservice.id, e)}
                                      >
                                        <div className="flex items-start">
                                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 mr-1"></div>
                                          <div>
                                            <span className="block text-black font-medium text-xs mb-0.5">
                                              {subservice.name}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Combo Services Mobile */}
                        {item.subServices.find(service => service.id === 8) && (
                          <div className="mt-6">
                            <div 
                              className="cursor-pointer p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
                              onClick={(e) => handleServiceLinkClick(8, e)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="text-black font-bold text-base mb-1">COMBO SERVICES</h5>
                                  <p className="text-gray-700 text-sm">Save up to 30%</p>
                                </div>
                                <div className="bg-yellow-500 text-white px-3 py-1 rounded text-xs font-bold">
                                  SAVE
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* View All Button Mobile */}
                        <div
                          className="cursor-pointer inline-flex items-center text-blue-600 hover:text-blue-700 font-bold text-base mt-6 group/viewall"
                          onClick={(e) => handleViewAllClick(item.href, e)}
                        >
                          <span className="mr-2">View All Services</span>
                          <span className="transform group-hover/viewall:translate-x-2 transition-transform">→</span>
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