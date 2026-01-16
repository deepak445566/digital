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
  const servicesTimeoutRef = useRef(null);

  // Services data
  const services = [
    { 
      title: 'GOOGLE ADS', 
      description: 'Targeted advertising campaigns',
      icon: '🔍',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'WEBSITE DEVELOPMENT', 
      description: 'Custom responsive websites',
      icon: '💻',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'APP DEVELOPMENT', 
      description: 'iOS & Android applications',
      icon: '📱',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      title: 'CRM SOFTWARE', 
      description: 'Customer relationship management',
      icon: '📊',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      title: 'VIDEO EDITING', 
      description: 'Professional video production',
      icon: '🎬',
      color: 'from-red-500 to-rose-500'
    },
    { 
      title: 'CELEBRITY AWARD', 
      description: 'Award shows & events',
      icon: '🏆',
      color: 'from-indigo-500 to-violet-500'
    },
    { 
      title: 'COMBO PACKAGE', 
      description: 'Complete digital solution',
      icon: '🎁',
      color: 'from-amber-500 to-yellow-500'
    },
    { 
      title: 'SOCIAL MEDIA', 
      description: 'Content & management',
      icon: '📱',
      color: 'from-teal-500 to-cyan-500'
    }
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
    if (servicesCardRef.current) {
      if (showServices) {
        // Show services card
        gsap.set(servicesCardRef.current, {
          display: 'block',
          opacity: 0,
          scale: 0.8,
          y: 20
        });
        
        gsap.to(servicesCardRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'back.out(1.2)'
        });
      } else {
        // Hide services card
        gsap.to(servicesCardRef.current, {
          opacity: 0,
          scale: 0.8,
          y: 20,
          duration: 0.3,
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

  // Handle hover with delay for better UX
  const handleServicesMouseEnter = () => {
    clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => {
      setShowServices(true);
      setServicesHover(true);
    }, 200);
  };

  const handleServicesMouseLeave = () => {
    clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => {
      if (!servicesHover) {
        setShowServices(false);
      }
    }, 300);
  };

  const handleServicesCardMouseEnter = () => {
    clearTimeout(servicesTimeoutRef.current);
    setServicesHover(true);
  };

  const handleServicesCardMouseLeave = () => {
    clearTimeout(servicesTimeoutRef.current);
    setServicesHover(false);
    servicesTimeoutRef.current = setTimeout(() => {
      setShowServices(false);
    }, 200);
  };

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

              {/* Services Card Dropdown */}
              <div 
                ref={servicesCardRef}
                className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 hidden"
                onMouseEnter={handleServicesCardMouseEnter}
                onMouseLeave={handleServicesCardMouseLeave}
                style={{ width: '90vw', maxWidth: '1000px' }}
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <h3 className="text-2xl font-bold text-white text-center">OUR SERVICES</h3>
                    <p className="text-blue-100 text-center mt-2">Comprehensive digital solutions for your business</p>
                  </div>
                  
                  {/* Services Grid */}
                  <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {services.map((service, index) => (
                      <div 
                        key={index}
                        className={`bg-gradient-to-br ${service.color} rounded-xl p-4 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                            {service.icon}
                          </div>
                          <h4 className="font-bold text-lg mb-2">{service.title}</h4>
                          <p className="text-sm opacity-90 group-hover:opacity-100">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Card Footer */}
                  <div className="bg-gray-50 p-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="text-gray-600 text-sm">
                        <span className="font-bold">8</span> premium services available
                      </div>
                      <button className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300">
                        View All Services
                      </button>
                    </div>
                  </div>
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