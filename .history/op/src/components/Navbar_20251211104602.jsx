import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
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
  const timeoutRef = useRef(null);
  const subTimeoutRef = useRef(null);

  const servicesData = {
    title: 'SERVICES',
    number: '03',
    href: '/services',
    hasDropdown: true,
    subServices: services
  };

  const menuItems = [
    { 
      title: 'HOME', 
      number: '01',
      href: '/'
    },
    { 
      title: 'PROJECTS', 
      number: '02',
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
      navigate(item.href);
    }
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
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
    if (e) e.stopPropagation();
    handleMenuClick();
    navigate(`/subservice/${serviceId}/subservices`);
  };

  const handleSubserviceLinkClick = (serviceId, subserviceId, e) => {
    if (e) e.stopPropagation();
    handleMenuClick();
    navigate(`/subservice/${serviceId}/detail/${subserviceId}`);
  };

  const handleDesktopServicesClick = (e, item) => {
    if (item.hasDropdown) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === item.title ? null : item.title);
      setActiveSubDropdown(null);
    }
  };

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleMobileClickOutside = (event) => {
      if (isMenuOpen && menuOverlayRef.current && 
          !menuOverlayRef.current.contains(event.target) &&
          !event.target.closest('button')) {
        handleMenuClick();
      }
    };

    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        handleMenuClick();
      }
    };

    document.addEventListener('mousedown', handleMobileClickOutside);
    document.addEventListener('touchstart', handleMobileClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleMobileClickOutside);
      document.removeEventListener('touchstart', handleMobileClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${isScrolled ? 'shadow-xl bg-black backdrop-blur-sm' : ''}`}
      >
        <div className={`w-full py-3 px-4 ${isHomePage ? 'bg-transparent' : 'bg-black'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/logo.jpg" className="h-10 w-10 rounded-full" alt="Logo"/>
              <div className="flex flex-col ml-2">
                <span className="text-white font-bold text-sm tracking-wider">Digital Express<sup className="text-xs">®</sup></span>
                <span className="text-gray-300 text-xs tracking-widest">India</span>
              </div>
            </div>
            
            <div className='flex items-center gap-3 relative' ref={dropdownRef}>
              {/* Desktop Navigation - Hidden on mobile */}
              <div className="hidden md:flex items-center space-x-4">
                {menuItems.map((item, index) => (
                  <div 
                    key={index}
                    className="relative"
                    onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a 
                      href={item.href} 
                      className={`text-gray-300 font-medium hover:text-white transition-colors duration-300 px-4 py-2 rounded-full ${item.title === 'HOME' ? 'text-white' : ''}`}
                      onClick={(e) => handleDesktopServicesClick(e, item)}
                    >
                      <span className="text-center">
                        {item.title}
                        {item.hasDropdown && (
                          <span className="ml-1 text-xs">▼</span>
                        )}
                      </span>
                    </a>

                    {/* SERVICES DROPDOWN - Desktop Only */}
                    {item.hasDropdown && activeDropdown === item.title && (
                      <div 
                        className="fixed top-16 left-0 right-0 h-[80vh] z-[9998]"
                        onMouseEnter={() => handleMouseEnter(item.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="absolute top-0 right-0 h-full w-full max-w-[1000px] bg-white shadow-2xl">
                          <button 
                            onClick={() => setActiveDropdown(null)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>

                          <div className="h-full overflow-y-auto py-6 px-6">
                            <div className="flex gap-6">
                              {/* Services List */}
                              <div className="w-1/3">
                                <div className="space-y-2">
                                  {item.subServices.map((service, index) => (
                                    <div 
                                      key={service.id}
                                      className={`p-3 rounded-lg cursor-pointer ${activeSubDropdown === service.id ? 'bg-blue-50 border-l-2 border-blue-500' : 'bg-gray-50 hover:bg-gray-100'}`}
                                      onMouseEnter={() => handleSubMouseEnter(service.id)}
                                      onClick={(e) => handleServiceLinkClick(service.id, e)}
                                    >
                                      <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-3 ${index % 5 === 0 ? 'bg-blue-500' : index % 5 === 1 ? 'bg-green-500' : index % 5 === 2 ? 'bg-purple-500' : index % 5 === 3 ? 'bg-orange-500' : 'bg-pink-500'}`}></div>
                                        <h3 className="text-base font-bold text-gray-900">{service.name}</h3>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Subservices */}
                              <div className="w-2/3">
                                {activeSubDropdown ? (() => {
                                  const service = item.subServices.find(s => s.id === activeSubDropdown);
                                  if (!service || !service.subservices || service.subservices.length === 0) {
                                    return (
                                      <div className="h-full flex items-center justify-center">
                                        <div className="text-center">
                                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                          </div>
                                          <h3 className="text-lg font-bold text-gray-900 mb-2">Select a Service</h3>
                                          <p className="text-gray-600">Hover over a service to see its subservices</p>
                                        </div>
                                      </div>
                                    );
                                  }

                                  return (
                                    <div>
                                      <div className="mb-4">
                                        <div className="flex items-center mb-2">
                                          <div className={`w-4 h-4 rounded-full ${item.subServices.findIndex(s => s.id === activeSubDropdown) % 5 === 0 ? 'bg-blue-500' : item.subServices.findIndex(s => s.id === activeSubDropdown) % 5 === 1 ? 'bg-green-500' : item.subServices.findIndex(s => s.id === activeSubDropdown) % 5 === 2 ? 'bg-purple-500' : item.subServices.findIndex(s => s.id === activeSubDropdown) % 5 === 3 ? 'bg-orange-500' : 'bg-pink-500'} mr-3`}></div>
                                          <h2 className="text-xl font-bold text-gray-900">{service.name}</h2>
                                        </div>
                                        <p className="text-gray-600 ml-7">{service.description}</p>
                                      </div>

                                      <div className="mb-6">
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                          {service.subservices.map((subservice) => (
                                            <a
                                              key={subservice.id}
                                              href={`/services/${service.id}/${subservice.id}`}
                                              className="bg-gray-50 hover:bg-blue-50 p-3 rounded-lg border border-gray-200 hover:border-blue-300"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handleSubserviceLinkClick(service.id, subservice.id, e);
                                              }}
                                            >
                                              <div className="flex items-start mb-1">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></div>
                                                <h4 className="text-sm font-semibold text-gray-900">
                                                  {subservice.name}
                                                </h4>
                                              </div>
                                              <p className="text-gray-600 text-xs ml-4 line-clamp-2">
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
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                      </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Hover Over Services</h3>
                                    <p className="text-gray-600 max-w-md">
                                      Hover over any service on the left to view its subservices
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

              {/* Mobile Menu Button */}
              <button 
                onClick={handleMenuClick}
                className="md:hidden px-4 py-2 text-white text-sm font-medium bg-[#383838] rounded-full"
              >
                {isMenuOpen ? "CLOSE" : "MENU"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Space for navbar */}
      <div className="h-16"></div>

      {/* SIMPLE MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div 
          ref={menuOverlayRef}
          className="fixed inset-0 z-[9998] bg-black/90"
        >
          <div className="h-full flex flex-col">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center">
                <img src="/logo.jpg" className="h-8 w-8 rounded-full" alt="Logo"/>
                <span className="text-white font-bold text-sm ml-2">Digital Express</span>
              </div>
              <button 
                onClick={handleMenuClick}
                className="text-white text-xl p-2"
              >
                ✕
              </button>
            </div>

            {/* Menu Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">
                {menuItems.map((item, index) => (
                  <div key={index}>
                    <div 
                      className="flex items-center justify-between py-3 px-2 border-b border-gray-800 cursor-pointer"
                      onClick={() => handleOverlayItemClick(item)}
                    >
                      <div className="flex items-center">
                        <span className="text-gray-400 text-xs mr-3">({item.number})</span>
                        <h3 className="text-white font-bold text-lg">
                          {item.title}
                        </h3>
                      </div>
                      {item.hasDropdown && (
                        <span className={`text-white transform ${activeOverlayItem === item.title ? 'rotate-90' : ''}`}>
                          ›
                        </span>
                      )}
                    </div>

                    {/* Mobile Services Dropdown */}
                    {item.hasDropdown && activeOverlayItem === item.title && (
                      <div className="pl-6 pr-2 py-3 bg-gray-900/50 rounded-lg mt-1 mb-2">
                        <div className="space-y-3">
                          {item.subServices.map((service, index) => (
                            <div key={service.id}>
                              {/* Service Header */}
                              <div 
                                className="py-2 border-b border-gray-700 cursor-pointer"
                                onClick={(e) => handleServiceLinkClick(service.id, e)}
                              >
                                <div className="flex items-center mb-1">
                                  <div className={`w-2 h-2 rounded-full ${index % 5 === 0 ? 'bg-blue-500' : index % 5 === 1 ? 'bg-green-500' : index % 5 === 2 ? 'bg-purple-500' : index % 5 === 3 ? 'bg-orange-500' : 'bg-pink-500'} mr-2`}></div>
                                  <h5 className="text-white font-bold text-base flex-1">{service.name}</h5>
                                </div>
                                <p className="text-gray-400 text-xs ml-4 mb-2">{service.description}</p>
                              </div>
                              
                              {/* Subservices */}
                              {service.subservices && service.subservices.length > 0 && (
                                <div className="ml-4 mt-2">
                                  <div className="grid grid-cols-1 gap-2">
                                    {service.subservices.map((subservice) => (
                                      <div
                                        key={subservice.id}
                                        className="py-2 px-3 bg-gray-800 rounded border border-gray-700 cursor-pointer"
                                        onClick={(e) => handleSubserviceLinkClick(service.id, subservice.id, e)}
                                      >
                                        <div className="flex items-center">
                                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2"></div>
                                          <span className="text-white text-sm font-medium">
                                            {subservice.name}
                                          </span>
                                        </div>
                                        {subservice.description && (
                                          <p className="text-gray-400 text-xs mt-1 ml-3 truncate">
                                            {subservice.description}
                                          </p>
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
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Button */}
              <div className="mt-6 pt-4 border-t border-gray-700">
                <button 
                  onClick={() => {
                    handleMenuClick();
                    navigate('/contact');
                  }}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg text-base"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;