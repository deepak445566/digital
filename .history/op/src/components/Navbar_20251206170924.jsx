import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import AnimatedButton from './v1/AnimatedButton';
import TextRoll from './v1/TextRoll';

function Navbar({ isHomePage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const menuOverlayRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const servicesCardRef = useRef(null);
  const servicesButtonRef = useRef(null);
  const servicesTimeoutRef = useRef(null);

  // Services data - Simple text only
  const services = [
    'GOOGLE ADS',
    'WEBSITE DEVELOPMENT',
    'APP DEVELOPMENT',
    'CRM SOFTWARE',
    'VIDEO EDITING',
    'CELEBRITY AWARD',
    'COMBO PACKAGE',
    'SOCIAL MEDIA'
  ];

  // Scroll detection for navbar style change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
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

  // Services card animation
  useEffect(() => {
    if (servicesCardRef.current && servicesButtonRef.current) {
      if (showServices) {
        // Show services card
        gsap.set(servicesCardRef.current, {
          display: 'block',
          opacity: 0,
          y: 10
        });
        
        gsap.to(servicesCardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out'
        });
      } else {
        // Hide services card
        gsap.to(servicesCardRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.15,
          ease: 'power2.in',
          onComplete: () => {
            if (servicesCardRef.current) {
              servicesCardRef.current.style.display = 'none';
            }
          }
        });
      }
    }
  }, [showServices]);

  // Handle hover on SERVICES button
  const handleServicesMouseEnter = () => {
    clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => {
      setShowServices(true);
      setServicesHover(true);
    }, 100);
  };

  const handleServicesMouseLeave = () => {
    clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => {
      if (!servicesHover) {
        setShowServices(false);
      }
    }, 150);
  };

  // Handle hover on services card
  const handleServicesCardMouseEnter = () => {
    clearTimeout(servicesTimeoutRef.current);
    setServicesHover(true);
  };

  const handleServicesCardMouseLeave = () => {
    clearTimeout(servicesTimeoutRef.current);
    setServicesHover(false);
    servicesTimeoutRef.current = setTimeout(() => {
      setShowServices(false);
    }, 100);
  };

  // Calculate dropdown position
  const updateDropdownPosition = () => {
    if (servicesButtonRef.current && servicesCardRef.current) {
      const buttonRect = servicesButtonRef.current.getBoundingClientRect();
      const card = servicesCardRef.current;
      
      // Position card right below the button
      card.style.left = `${buttonRect.left}px`;
      card.style.top = `${buttonRect.bottom + 5}px`; // 5px gap
      card.style.minWidth = `${buttonRect.width}px`;
      card.style.transform = 'translateX(0)'; // Remove center transform
    }
  };

  // Update position when services card is shown
  useEffect(() => {
    if (showServices) {
      updateDropdownPosition();
      
      // Also update on window resize
      const handleResize = () => updateDropdownPosition();
      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [showServices]);

  // Menu items data for the menu overlay
  const menuOverlayItems = [
    { title: 'HOME', number: '01' },
    { title: 'ABOUT', number: '02' },
    { title: 'PROJECTS', number: '03' },
    { title: 'SERVICES', number: '04' },
  ];

  // Menu items for navbar links
  const navMenuItems = [
    { title: 'HOME', color: 'from-blue-500 to-cyan-400' },
    { title: 'STUDIO', color: 'from-purple-500 to-pink-500' },
    { title: 'PROJECTS', color: 'from-green-500 to-emerald-400' },
    { title: 'SERVICES', color: 'from-yellow-500 to-orange-500', hasDropdown: true },
  ];

  // Initialize menu as hidden
  useEffect(() => {
    if (menuOverlayRef.current) {
      menuOverlayRef.current.style.display = 'none';
    }
    if (servicesCardRef.current) {
      servicesCardRef.current.style.display = 'none';
    }
  }, []);

  const handleMenuClick = () => {
    const wasOpen = isMenuOpen;
    setIsMenuOpen(!wasOpen);

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

          gsap.fromTo(menuOverlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4 }
          );

          const menuItems = menuContainer.querySelectorAll('.menu-item');
          gsap.fromTo(menuItems,
            { opacity: 0, y: 40 },
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

      if (mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4 }
        );
      }
    } else {
      // CLOSE MENU ANIMATION
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

      if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3
        });
      }
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-4 lg:top-4 left-2 right-2 lg:left-4 lg:right-4 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl bg-black backdrop-blur-sm rounded-full' : ''}`}
      >
        <div className={`w-full py-4 lg:px-8 lg:py-4 ${isHomePage ? 'bg-transparent' : 'bg-black'} rounded-full transition-all duration-300 ${isScrolled ? 'scale-[0.98]' : ''}`}>
          <div className="flex items-center justify-between">
            {/* Logo/Brand Section */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">U®</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-wider">UNUSUALLY<sup className="text-xs">®</sup></span>
                <span className="text-gray-300 text-xs tracking-widest">OS SUR</span>
              </div>
            </div>
            
            <div className='flex items-center gap-5'>
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-5 text-lg big relative">
                {navMenuItems.slice(0, 4).map((item, index) => (
                  <div 
                    key={index}
                    className={`relative ${item.hasDropdown ? 'group' : ''}`}
                    onMouseEnter={item.hasDropdown ? handleServicesMouseEnter : undefined}
                    onMouseLeave={item.hasDropdown ? handleServicesMouseLeave : undefined}
                  >
                    <a 
                      ref={item.hasDropdown ? servicesButtonRef : null}
                      href="#" 
                      className={`text-gray-300 font-medium tracking-wide hover:text-white magnet transition-colors duration-300 bg-[#383838] px-5 py-2 rounded-full ${item.title === 'HOME' ? 'text-white' : ''} inline-flex items-center justify-center min-w-[100px]`}
                    >
                      <TextRoll className="text-center">
                        {item.title}
                      </TextRoll>
                      {item.hasDropdown && (
                        <svg className="w-4 h-4 ml-2 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </a>
                  </div>
                ))}
              </div>

              {/* Services Card Dropdown - POSITIONED BELOW BUTTON */}
              <div 
                ref={servicesCardRef}
                className="fixed z-50 hidden bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-300"
                onMouseEnter={handleServicesCardMouseEnter}
                onMouseLeave={handleServicesCardMouseLeave}
                style={{ 
                  position: 'fixed',
                  zIndex: 9999
                }}
              >
                {/* Services List - Simple Column */}
                <div className="py-2">
                  {services.map((service, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-6 py-3 text-gray-800 hover:bg-gray-100 border-b border-gray-100 last:border-b-0 transition-colors duration-200 font-medium whitespace-nowrap"
                    >
                      {service}
                    </a>
                  ))}
                </div>
              </div>

              {/* Menu Button */}
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

      {/* Spacer div to push content below fixed navbar */}
      <div className="h-24"></div>

      {/* Fullscreen Menu Overlay */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 hidden items-end justify-end px-4"
      >
        {/* Menu Container */}
        <div 
          className="relative h-[60vh] w-full lg:h-[70vh] lg:w-[45vw] bg-white rounded-4xl overflow-hidden shadow-2xl transform-gpu mb-35 lg:mb-0"
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
          <div className="h-full flex flex-col justify-center items-center px-4 lg:px-12">
            {/* Menu Items */}
            <div className="w-full space-y-2">
              {menuOverlayItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="menu-item group relative block w-full"
                >
                  <div className="flex items-center justify-between">
                    <div className="relative overflow-hidden py-3 lg:p-0.5">
                      <h3 className="text-black font-extrabold text-5xl lg:text-7xl exo tracking-tight opacity-90 group-hover:opacity-100 transition-all duration-500">
                        <TextRoll>{item.title}</TextRoll>
                      </h3>
                    </div>
                    
                    <div className="text-gray-500 text-3xl lg:text-4xl font-light group-hover:text-black transition-colors duration-500">
                      ({item.number})
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;