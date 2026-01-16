import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function Navbar({ isHomePage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const menuOverlayRef = useRef(null);
  const servicesCardRef = useRef(null);

  // Services data
  const services = [
    { title: 'GOOGLE ADS' },
    { title: 'WEBSITE DEVELOPMENT' },
    { title: 'APP DEVELOPMENT' },
    { title: 'CRM SOFTWARE' },
    { title: 'VIDEO EDITING' },
    { title: 'CELEBRITY AWARD' },
    { title: 'COMBO PACKAGE' },
    { title: 'SOCIAL MEDIA' }
  ];

  // Scroll detection for navbar style change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Services card animation
  useEffect(() => {
    if (servicesCardRef.current) {
      if (showServices) {
        gsap.set(servicesCardRef.current, {
          display: 'block',
          opacity: 0,
          y: -10
        });
        
        gsap.to(servicesCardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(servicesCardRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.2,
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

  // Handle menu click
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (menuOverlayRef.current) {
      if (!isMenuOpen) {
        menuOverlayRef.current.style.display = 'block';
        gsap.fromTo(menuOverlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        );
      } else {
        gsap.to(menuOverlayRef.current, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            if (menuOverlayRef.current) {
              menuOverlayRef.current.style.display = 'none';
            }
          }
        });
      }
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md bg-white' : 'bg-white'}`}
      >
        <div className="w-full py-4 px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo/Brand Section */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <div className="flex flex-col">
                <span className="text-black font-bold text-lg tracking-wider">UNUSUALLY</span>
                <span className="text-gray-600 text-xs">STUDIO</span>
              </div>
            </div>
            
            <div className='flex items-center gap-4'>
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-6 text-lg relative">
                <a href="#" className="text-black font-medium hover:text-gray-700 transition-colors duration-300">
                  HOME
                </a>
                <a href="#" className="text-black font-medium hover:text-gray-700 transition-colors duration-300">
                  STUDIO
                </a>
                <a href="#" className="text-black font-medium hover:text-gray-700 transition-colors duration-300">
                  PROJECTS
                </a>
                
                {/* Services with dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setShowServices(true)}
                  onMouseLeave={() => setShowServices(false)}
                >
                  <a 
                    href="#" 
                    className="text-black font-medium hover:text-gray-700 transition-colors duration-300 flex items-center gap-1 cursor-pointer"
                  >
                    SERVICES
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Services Card Dropdown - Simple Column */}
              <div 
                ref={servicesCardRef}
                className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 hidden bg-white shadow-lg rounded-lg border border-gray-200 py-3"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
                style={{ minWidth: '200px' }}
              >
                <div className="px-4 py-2">
                  <h3 className="text-black font-bold text-sm mb-2 border-b pb-2">OUR SERVICES</h3>
                  <div className="space-y-1">
                    {services.map((service, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block text-black text-sm py-2 px-2 hover:bg-gray-100 rounded transition-colors duration-200"
                      >
                        {service.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Menu Button */}
              <button 
                onClick={handleMenuClick}
                className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
              >
                {isMenuOpen ? "CLOSE" : "MENU"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer div */}
      <div className="h-20"></div>

      {/* Simple Menu Overlay */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 hidden"
      >
        <div className="h-full flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-black">Menu</h2>
              <button 
                onClick={handleMenuClick}
                className="text-black hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <a href="#" className="block text-black text-xl font-medium hover:text-gray-700 py-2">
                HOME
              </a>
              <a href="#" className="block text-black text-xl font-medium hover:text-gray-700 py-2">
                STUDIO
              </a>
              <a href="#" className="block text-black text-xl font-medium hover:text-gray-700 py-2">
                PROJECTS
              </a>
              <a href="#" className="block text-black text-xl font-medium hover:text-gray-700 py-2">
                SERVICES
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;