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

  const handleSubDropdownWheel = (e) => {
    const subDropdown = e.currentTarget;
    const isScrollable = subDropdown.scrollHeight > subDropdown.clientHeight;
    const isAtTop = subDropdown.scrollTop === 0;
    const isAtBottom = Math.abs(subDropdown.scrollTop + subDropdown.clientHeight - subDropdown.scrollHeight) < 1;
    
    if (isScrollable) {
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        return;
      }
      e.stopPropagation();
    }
  };

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

                    {/* SERVICES DROPDOWN - PW STYLE */}
                    {item.hasDropdown && activeDropdown === item.title && (
                      <div 
                        className="absolute top-full right-10 -translate-x-1/2 mt-2 w-[95vw] max-w-[1400px] bg-white shadow-2xl rounded-xl border border-gray-200 z-[100]"
                        style={{ height: '80vh' }}
                        onMouseEnter={() => handleMouseEnter(item.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Header - Clean Style */}
                        <div className="bg-white p-4 border-b border-gray-200">
                          <div className="flex justify-between items-center">
                           
                            <button 
                              onClick={() => setActiveDropdown(null)}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="h-[calc(80vh-81px)] overflow-y-auto">
                          <div className="p-6">
                            {/* Services Grid - 5 COLUMNS LIKE PW */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                              {item.subServices.map((service, serviceIndex) => (
                                <div 
                                  key={service.id} 
                                  className="relative"
                                  onMouseEnter={() => service.subservices && service.subservices.length > 0 && handleSubMouseEnter(service.id)}
                                  onMouseLeave={handleSubMouseLeave}
                                >
                                  {/* Service Card - Minimal Style */}
                                  <div className="group cursor-pointer p-4 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200">
                                    {/* Service Header */}
                                    <div 
                                      className="mb-3"
                                      onClick={(e) => handleServiceLinkClick(service.id, e)}
                                    >
                                      <div className="flex items-center mb-2">
                                        <div className={`w-3 h-3 rounded-full ${serviceIndex % 5 === 0 ? 'bg-blue-500' : serviceIndex % 5 === 1 ? 'bg-green-500' : serviceIndex % 5 === 2 ? 'bg-purple-500' : serviceIndex % 5 === 3 ? 'bg-orange-500' : 'bg-pink-500'} mr-3`}></div>
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600">
                                          {service.name}
                                        </h3>
                                      </div>
                                      <p className="text-gray-600 text-sm ml-6 line-clamp-2">
                                        {service.description}
                                      </p>
                                    </div>

                                    {/* Subservices List - Compact */}
                                    {service.subservices && service.subservices.length > 0 && (
                                      <div className="ml-6">
                                        <div className="space-y-1.5">
                                          {service.subservices.slice(0, 4).map((subservice) => (
                                            <div
                                              key={subservice.id}
                                              className="flex items-center py-1 px-2 hover:bg-blue-50 rounded transition-colors cursor-pointer group/subitem"
                                              onClick={(e) => handleSubserviceLinkClick(service.id, subservice.id, e)}
                                            >
                                              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2 group-hover/subitem:bg-blue-500"></div>
                                              <span className="text-sm text-gray-700 group-hover/subitem:text-blue-600 truncate">
                                                {subservice.name}
                                              </span>
                                            </div>
                                          ))}
                                          
                                          {service.subservices.length > 4 && (
                                            <button 
                                              className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium mt-1 text-left px-2 py-1 hover:bg-blue-50 rounded"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveSubDropdown(service.id);
                                              }}
                                            >
                                              View all {service.subservices.length} items →
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* SUBITEMS DROPDOWN - PW STYLE */}
                                  {activeSubDropdown === service.id && service.subservices && service.subservices.length > 0 && (
                                    <div 
                                      ref={subDropdownRef}
                                      className="absolute left-0 -top-20 mt-1 bg-white shadow-2xl rounded-lg border border-gray-200 z-[101] overflow-hidden min-w-[500px]"
                                      onMouseEnter={() => handleSubMouseEnter(service.id)}
                                      onMouseLeave={handleSubMouseLeave}
                                    >
                                      {/* Subdropdown Header */}
                                      <div className="bg-white p-4 border-b border-gray-200">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center">
                                            <div className={`w-3 h-3 rounded-full ${serviceIndex % 5 === 0 ? 'bg-blue-500' : serviceIndex % 5 === 1 ? 'bg-green-500' : serviceIndex % 5 === 2 ? 'bg-purple-500' : serviceIndex % 5 === 3 ? 'bg-orange-500' : 'bg-pink-500'} mr-3`}></div>
                                            <h5 className="text-lg font-bold text-gray-900">{service.name}</h5>
                                          </div>
                                          <button 
                                            onClick={() => setActiveSubDropdown(null)}
                                            className="text-gray-500 hover:text-gray-700"
                                          >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                          </button>
                                        </div>
                                        <p className="text-gray-600 text-sm ml-6 mt-1">{service.description}</p>
                                      </div>
                                      
                                      {/* Subservices Grid - 3 COLUMNS LIKE PW */}
                                      <div className="p-4 max-h-[400px] overflow-y-auto"
                                        onWheel={handleSubDropdownWheel}
                                      >
                                        <div className="grid grid-cols-3 gap-3">
                                          {service.subservices.map((subservice) => (
                                            <a
                                              key={subservice.id}
                                              href={`/services/${service.id}/${subservice.id}`}
                                              className="block p-3 bg-gray-50 hover:bg-blue-50 rounded border border-gray-200 hover:border-blue-300 transition-all duration-150"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handleSubserviceLinkClick(service.id, subservice.id, e);
                                              }}
                                            >
                                              <div className="flex flex-col">
                                                <div className="flex items-start mb-1">
                                                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 mr-2 flex-shrink-0"></div>
                                                  <span className="text-sm font-semibold text-gray-900 hover:text-blue-600 leading-tight">
                                                    {subservice.name}
                                                  </span>
                                                </div>
                                                <span className="text-gray-600 text-xs ml-4 line-clamp-2 mt-1">
                                                  {subservice.description}
                                                </span>
                                              </div>
                                            </a>
                                          ))}
                                        </div>
                                      </div>
                                      
                                      {/* View All Button */}
                                      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                                        <a 
                                          href={`/services/${service.id}`}
                                          className="text-blue-600 hover:text-blue-700 font-bold text-sm inline-flex items-center"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleViewAllClick(`/services/${service.id}`, e);
                                          }}
                                        >
                                          <span className="mr-2">View All {service.name} Services</span>
                                          <span className="transform hover:translate-x-1 transition-transform">→</span>
                                        </a>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Combo Services Section - Banner Style */}
                            {item.subServices.find(service => service.id === 8) && (
                              <div className="mt-8 mb-6">
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
                                  <div className="flex flex-col md:flex-row items-center justify-between">
                                    <div className="flex items-center mb-4 md:mb-0">
                                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                                        <span className="text-2xl">⚡</span>
                                      </div>
                                      <div>
                                        <h3 className="text-xl font-bold">COMBO PACKAGES</h3>
                                        <p className="text-yellow-100">Get multiple services together at special discounted rates</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                      <button 
                                        onClick={(e) => handleServiceLinkClick(8, e)}
                                        className="px-6 py-2 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                                      >
                                        View Packages
                                      </button>
                                      <div className="bg-white/20 px-4 py-2 rounded-lg text-center">
                                        <div className="text-lg font-bold">SAVE UP TO</div>
                                        <div className="text-2xl font-bold">30%</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Quick Links - Bottom Section */}
                            <div className="bg-gray-50 rounded-xl p-6 mt-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                  <h4 className="text-lg font-bold text-gray-900 mb-3">Popular Services</h4>
                                  <div className="space-y-2">
                                    {item.subServices.slice(0, 5).map((service) => (
                                      <a
                                        key={service.id}
                                        href={`/services/${service.id}`}
                                        className="block text-sm text-gray-600 hover:text-blue-600"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleServiceLinkClick(service.id, e);
                                        }}
                                      >
                                        • {service.name}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-lg font-bold text-gray-900 mb-3">Quick Stats</h4>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                      <span className="text-gray-600">Total Services</span>
                                      <span className="font-bold text-blue-600">{item.subServices.length}+</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-gray-600">Subservices</span>
                                      <span className="font-bold text-green-600">
                                        {item.subServices.reduce((total, service) => total + (service.subservices?.length || 0), 0)}+
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-gray-600">Support</span>
                                      <span className="font-bold text-purple-600">24/7</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-lg font-bold text-gray-900 mb-3">Need Help?</h4>
                                  <p className="text-gray-600 text-sm mb-4">
                                    Our experts are ready to help you choose the right services for your business.
                                  </p>
                                  <button 
                                    onClick={() => setActiveDropdown(null)}
                                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                  >
                                    Get Free Consultation
                                  </button>
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

      {/* MOBILE MENU OVERLAY */}
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

                  {/* Mobile Services Dropdown */}
                  {item.hasDropdown && activeOverlayItem === item.title && (
                    <div className="submenu overflow-hidden pl-6 mt-4">
                      <div className="border-l-2 border-gray-300 pl-6 pb-6">
                        <h4 className="text-black font-bold text-xl mb-4">Our Services</h4>
                        
                        {/* Mobile Services List - Clean Style */}
                        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                          {item.subServices.map((service, index) => (
                            <div key={service.id} className="pb-3 border-b border-gray-100 last:border-0">
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

                        {/* Combo Services Mobile */}
                        {item.subServices.find(service => service.id === 8) && (
                          <div className="mt-6">
                            <div 
                              className="cursor-pointer p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg text-white"
                              onClick={(e) => handleServiceLinkClick(8, e)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="text-white font-bold text-sm">COMBO SERVICES</h5>
                                  <p className="text-yellow-100 text-xs">Save up to 30%</p>
                                </div>
                                <div className="bg-white text-orange-600 px-3 py-1 rounded text-xs font-bold">
                                  SAVE
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* View All Button */}
                        <div
                          className="cursor-pointer inline-flex items-center text-blue-600 hover:text-blue-700 font-bold text-sm mt-6 group/viewall"
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