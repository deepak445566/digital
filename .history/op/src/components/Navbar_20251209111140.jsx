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

  // ... (previous useEffect hooks remain same)

  const handleMouseEnter = (itemTitle) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemTitle);
    setActiveSubDropdown(null); // Reset sub-dropdown when entering main dropdown
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

  // ... (rest of the handlers remain same)

  const handleSubserviceLinkClick = (serviceId, subserviceId, e) => {
    e.stopPropagation();
    handleMenuClick();
    
    setTimeout(() => {
      navigate(`/services/${serviceId}/${subserviceId}`);
    }, 400);
  };

  // ... (other handlers remain same)

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

                    {/* Main Services Dropdown - SERVICES IN 2 COLUMNS */}
                    {item.hasDropdown && activeDropdown === item.title && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-[750px] bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-visible z-[100]"
                        onMouseEnter={() => handleMouseEnter(item.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="p-6">
                          {/* Dropdown Header */}
                          <div className="mb-6 pb-4 border-b border-gray-100">
                            <h4 className="text-black font-bold text-2xl mb-2">OUR SERVICES</h4>
                            <p className="text-gray-600 text-sm">Premium digital solutions for your business growth</p>
                          </div>
                          
                          {/* Services in 2 COLUMNS */}
                          <div className="grid grid-cols-2 gap-6">
                            {item.subServices.map((service, serviceIndex) => (
                              <div 
                                key={service.id} 
                                className="relative"
                                onMouseEnter={() => service.subservices && service.subservices.length > 0 && handleSubMouseEnter(service.id)}
                                onMouseLeave={handleSubMouseLeave}
                              >
                                {/* Service Column */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-blue-300 transition-all duration-200 group/service-col">
                                  {/* Service Header */}
                                  <div className="cursor-pointer">
                                    <div className="flex items-center mb-3">
                                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></div>
                                      <h5 className="text-black font-bold text-base uppercase tracking-wide group-hover/service-col:text-blue-600">
                                        {service.name}
                                      </h5>
                                      {service.subservices && service.subservices.length > 0 && (
                                        <span className="ml-2 text-xs text-gray-500">▶</span>
                                      )}
                                    </div>
                                    <p className="text-gray-600 text-sm ml-6 mb-3">{service.description}</p>
                                    
                                    {/* Subservices Preview (only show first 2) */}
                                    {service.subservices && service.subservices.length > 0 && (
                                      <div className="ml-6">
                                        <div className="flex flex-wrap gap-1 mb-2">
                                          {service.subservices.slice(0, 2).map((subservice) => (
                                            <span 
                                              key={subservice.id}
                                              className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200"
                                            >
                                              {subservice.name}
                                            </span>
                                          ))}
                                          {service.subservices.length > 2 && (
                                            <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded border border-blue-200">
                                              +{service.subservices.length - 2} more
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Subservices Dropdown - OPEN ON RIGHT SIDE IN ROWS */}
                                {activeSubDropdown === service.id && service.subservices && service.subservices.length > 0 && (
                                  <div 
                                    ref={subDropdownRef}
                                    className="absolute left-full top-0 ml-2 w-[500px] bg-white shadow-2xl rounded-2xl border border-gray-200 z-[101]"
                                    onMouseEnter={() => handleSubMouseEnter(service.id)}
                                    onMouseLeave={handleSubMouseLeave}
                                  >
                                    <div className="p-5">
                                      {/* Subdropdown Header */}
                                      <div className="mb-4 pb-3 border-b border-gray-100">
                                        <div className="flex items-center mb-2">
                                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                                          <h5 className="text-black font-bold text-lg">{service.name} - All Subservices</h5>
                                        </div>
                                        <p className="text-gray-600 text-sm ml-6">{service.description}</p>
                                      </div>
                                      
                                      {/* Subservices in ROWS (3 per row) */}
                                      <div className="max-h-[400px] overflow-y-auto pr-2"
                                        onWheel={handleSubDropdownWheel}
                                      >
                                        <div className="space-y-3">
                                          {(() => {
                                            const rows = [];
                                            for (let i = 0; i < service.subservices.length; i += 3) {
                                              const rowItems = service.subservices.slice(i, i + 3);
                                              rows.push(
                                                <div key={i} className="grid grid-cols-3 gap-3">
                                                  {rowItems.map((subservice) => (
                                                    <a
                                                      key={subservice.id}
                                                      href={`/services/${service.id}/${subservice.id}`}
                                                      className="block p-3 bg-gray-50 hover:bg-blue-50 transition-all duration-150 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm group/subitem"
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSubserviceLinkClick(service.id, subservice.id, e);
                                                      }}
                                                    >
                                                      <div className="flex flex-col h-full">
                                                        <div className="flex items-start mb-2">
                                                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 mr-2 flex-shrink-0"></div>
                                                          <span className="block text-black font-semibold text-sm group-hover/subitem:text-blue-600">
                                                            {subservice.name}
                                                          </span>
                                                        </div>
                                                        <span className="block text-gray-600 text-xs ml-3.5 line-clamp-3">
                                                          {subservice.description}
                                                        </span>
                                                      </div>
                                                    </a>
                                                  ))}
                                                </div>
                                              );
                                            }
                                            return rows;
                                          })()}
                                        </div>
                                      </div>
                                      
                                      {/* View All Subservices Link */}
                                      <div className="mt-4 pt-3 border-t border-gray-100">
                                        <a 
                                          href={`/services/${service.id}`}
                                          className="text-blue-600 hover:text-blue-700 font-bold text-sm inline-flex items-center group/viewallsub"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleViewAllClick(`/services/${service.id}`, e);
                                          }}
                                        >
                                          <span className="mr-2">View All {service.name} Services</span>
                                          <span className="transform group-hover/viewallsub:translate-x-2 transition-transform">→</span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {/* Combo Services - Full Width */}
                          {item.subServices.find(service => service.id === 8) && (
                            <div className="mt-8">
                              <a
                                href="/services/8"
                                className="block p-5 bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 hover:from-yellow-100 hover:via-orange-100 hover:to-yellow-100 transition-all duration-300 rounded-xl border-2 border-yellow-300 hover:border-yellow-400 group/combo"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleServiceLinkClick(8, e);
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-4 animate-pulse"></div>
                                    <div>
                                      <h5 className="text-black font-bold text-lg mb-1">COMBO SERVICES</h5>
                                      <p className="text-gray-700 text-sm">Get multiple services together at discounted price</p>
                                    </div>
                                  </div>
                                  <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                                    SAVE 20%
                                  </div>
                                </div>
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                          <a 
                            href={item.href}
                            className="text-blue-600 hover:text-blue-700 font-bold text-sm inline-flex items-center group/viewall"
                            onClick={(e) => {
                              e.preventDefault();
                              handleViewAllClick(item.href, e);
                            }}
                          >
                            <span className="mr-2">View All Services</span>
                            <span className="transform group-hover/viewall:translate-x-2 transition-transform">→</span>
                          </a>
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

      {/* Fullscreen Menu Overlay - Similar structure for mobile */}
      {/* ... (mobile overlay remains similar with 2 columns for services and sub-dropdowns) */}
    </>
  );
}

export default Navbar;