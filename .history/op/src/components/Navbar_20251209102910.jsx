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

  // Handle overlay menu click - FIXED
  const handleOverlayItemClick = (item) => {
    if (item.hasDropdown) {
      setActiveOverlayItem(activeOverlayItem === item.title ? null : item.title);
    } else {
      // Navigate to the page if it's not a dropdown item
      window.location.href = item.href;
      handleMenuClick(); // Close menu
    }
  };

  // Handle overlay menu link click - NEW FUNCTION
  const handleOverlayLinkClick = (e, item) => {
    e.stopPropagation();
    if (!item.hasDropdown) {
      window.location.href = item.href;
      handleMenuClick(); // Close menu
    }
  };

  // Handle submenu item click in overlay
  const handleSubmenuItemClick = (e, serviceId) => {
    e.stopPropagation();
    window.location.href = `/services/${serviceId}`;
    handleMenuClick();
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

  // ... (rest of the code remains same until return statement)

  return (
    <>
      {/* Main Navbar - No changes needed here */}
      <nav 
        className={`fixed top-4 lg:top-4 left-2 right-2 lg:left-4 lg:right-4 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl bg-black backdrop-blur-sm rounded-full' : ''}`}
      >
        {/* ... (navbar code remains same) ... */}
      </nav>

      {/* Spacer div */}
      <div className="h-24"></div>

      {/* Fullscreen Menu Overlay - FIXED */}
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
            {/* Menu Items - FIXED NAVIGATION */}
            <div className="w-full space-y-1">
              {menuItems.map((item, index) => (
                <div 
                  key={index}
                  className="menu-item group relative block w-full"
                >
                  {/* Clickable title for non-dropdown items */}
                  {!item.hasDropdown ? (
                    <a
                      href={item.href}
                      className="flex items-center justify-between cursor-pointer no-underline"
                      onClick={(e) => handleOverlayLinkClick(e, item)}
                    >
                      {/* Title - Left side */}
                      <div className="relative overflow-hidden py-3 lg:p-0.5">
                        <h3 className="text-black font-extrabold text-4xl lg:text-6xl exo tracking-tight opacity-90 group-hover:opacity-100 transition-all duration-500 flex items-center">
                          <span>{item.title}</span>
                        </h3>
                      </div>
                      
                      {/* Number in parentheses - Right side */}
                      <div className="text-gray-500 text-2xl lg:text-3xl font-light group-hover:text-black transition-colors duration-500">
                        ({item.number})
                      </div>
                    </a>
                  ) : (
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleOverlayItemClick(item)}
                    >
                      {/* Title - Left side */}
                      <div className="relative overflow-hidden py-3 lg:p-0.5">
                        <h3 className="text-black font-extrabold text-4xl lg:text-6xl exo tracking-tight opacity-90 group-hover:opacity-100 transition-all duration-500 flex items-center">
                          <span>{item.title}</span>
                          <span className={`ml-4 text-2xl transform transition-transform duration-300 ${activeOverlayItem === item.title ? 'rotate-90' : ''}`}>
                            ›
                          </span>
                        </h3>
                      </div>
                      
                      {/* Number in parentheses - Right side */}
                      <div className="text-gray-500 text-2xl lg:text-3xl font-light group-hover:text-black transition-colors duration-500">
                        ({item.number})
                      </div>
                    </div>
                  )}

                  {/* Submenu for SERVICES in overlay */}
                  {item.hasDropdown && activeOverlayItem === item.title && (
                    <div className="submenu overflow-hidden pl-6">
                      <div className="border-l-2 border-gray-300 pl-4 my-2 space-y-2">
                        {item.subServices.map((service, serviceIndex) => (
                          <div key={service.id} className="group">
                            {/* Service item - make it clickable */}
                            {!service.subservices || service.subservices.length === 0 ? (
                              <a
                                href={`/services/${service.id}`}
                                className="flex items-center justify-between cursor-pointer py-3 text-gray-700 hover:text-black text-xl lg:text-2xl font-medium exo transition-all duration-300 hover:pl-4 no-underline"
                                onClick={(e) => handleSubmenuItemClick(e, service.id)}
                              >
                                <span>• {service.name.toUpperCase()}</span>
                              </a>
                            ) : (
                              <div 
                                className="flex items-center justify-between cursor-pointer py-3 text-gray-700 hover:text-black text-xl lg:text-2xl font-medium exo transition-all duration-300 hover:pl-4"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Toggle subservices visibility
                                }}
                              >
                                <span>• {service.name.toUpperCase()}</span>
                                <span className="text-lg transform transition-transform duration-300">›</span>
                              </div>
                            )}
                            
                            {/* Nested items in overlay - Show subservices */}
                            {service.subservices && service.subservices.length > 0 && (
                              <div 
                                className="nested-menu ml-6 pl-4 border-l border-gray-200 space-y-1"
                                onWheel={handleSubDropdownWheel}
                              >
                                {service.subservices.map((subservice, subIndex) => (
                                  <a
                                    key={subservice.id}
                                    href={`/subservice/${service.id}/detail/${subservice.id}`}
                                    className="block py-2 text-lg text-gray-600 hover:text-black transition-colors duration-200 pl-4 no-underline"
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
                          className="block py-3 text-yellow-600 hover:text-yellow-800 text-lg lg:text-xl font-bold exo transition-all duration-300 mt-2 no-underline"
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