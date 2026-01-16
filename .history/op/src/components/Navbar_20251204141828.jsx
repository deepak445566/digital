import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function Navbar({ isHomePage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOverlayRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  // Menu items data
  const menuItems = [
    { title: 'HOME', color: 'from-blue-500 to-cyan-400' },
    { title: 'STUDIO', color: 'from-purple-500 to-pink-500' },
    { title: 'PROJECTS', color: 'from-green-500 to-emerald-400' },
    { title: 'SERVICES', color: 'from-yellow-500 to-orange-500' },
    { title: 'ABOUT', color: 'from-red-500 to-rose-400' },
    { title: 'CONTACT', color: 'from-indigo-500 to-blue-400' },
  ];

  // Initialize menu as hidden
  useEffect(() => {
    if (menuOverlayRef.current) {
      menuOverlayRef.current.style.display = 'none';
    }
  }, []);

  const handleMenuClick = () => {
    const wasOpen = isMenuOpen;
    setIsMenuOpen(!wasOpen);

    if (!wasOpen) {
      // OPEN MENU ANIMATION
      if (menuOverlayRef.current) {
        menuOverlayRef.current.style.display = 'flex';
        
        // Background overlay animation
        gsap.fromTo(menuOverlayRef.current,
          {
            opacity: 0,
            scale: 0.8,
            borderRadius: '100%',
            x: window.innerWidth - 100,
            y: window.innerHeight - 100,
            transformOrigin: 'bottom right'
          },
          {
            opacity: 1,
            scale: 1,
            borderRadius: '0%',
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'power3.out'
          }
        );

        // Menu items animation (staggered)
        const menuItems = menuOverlayRef.current.querySelectorAll('.menu-item');
        gsap.fromTo(menuItems,
          {
            opacity: 0,
            y: 50,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3,
            ease: 'back.out(1.7)'
          }
        );

        // Close button animation
        const closeBtn = menuOverlayRef.current.querySelector('.close-btn');
        if (closeBtn) {
          gsap.fromTo(closeBtn,
            {
              opacity: 0,
              rotation: -180,
              scale: 0
            },
            {
              opacity: 1,
              rotation: 0,
              scale: 1,
              duration: 0.5,
              delay: 0.8,
              ease: 'elastic.out(1, 0.5)'
            }
          );
        }
      }

      // Mobile menu animation
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
        // Menu items exit animation
        const menuItems = menuOverlayRef.current.querySelectorAll('.menu-item');
        gsap.to(menuItems,
          {
            opacity: 0,
            y: -30,
            scale: 0.8,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.in'
          }
        );

        // Background overlay exit animation
        gsap.to(menuOverlayRef.current,
          {
            opacity: 0,
            scale: 0.8,
            borderRadius: '100%',
            x: window.innerWidth - 100,
            y: window.innerHeight - 100,
            duration: 0.6,
            delay: 0.2,
            ease: 'power3.in',
            onComplete: () => {
              if (menuOverlayRef.current) {
                menuOverlayRef.current.style.display = 'none';
              }
            }
          }
        );
      }

      // Mobile menu exit animation
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
        className={`w-full px-6 py-4 lg:px-8 lg:py-4 ${isHomePage ? 'bg-transparent' : 'bg-[#0E0E0E]'} rounded-full relative z-50`}
      >
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
            <div className="hidden md:flex items-center space-x-5 exo text-md">
              {menuItems.slice(0, 4).map((item, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`text-gray-300 font-medium tracking-wide hover:text-white transition-colors duration-300 bg-[#383838] px-5 py-1 rounded-full ${item.title === 'HOME' ? 'text-white' : ''}`}
                >
                  {item.title}
                </a>
              ))}
            </div>

            {/* Menu Button */}
            <button 
              onClick={handleMenuClick}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl relative z-50"
            >
              {isMenuOpen ? '✕ CLOSE' : '☰ MENU'}
            </button>
            
            {/* Mobile Menu Button (Hamburger) */}
            <button 
              onClick={handleMenuClick}
              className="ml-4 md:hidden relative z-50"
            >
              <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          ref={mobileMenuRef}
          className="md:hidden mt-4 pt-4 border-t border-gray-800 overflow-hidden"
          style={{ height: '0px' }}
        >
          <div className="flex flex-col space-y-4">
            {menuItems.map((item, index) => (
              <a 
                key={index}
                href="#" 
                className={`text-gray-300 font-medium py-2 hover:text-white transition-colors ${item.title === 'HOME' ? 'text-white' : ''}`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-40 hidden items-center justify-center p-8"
      >
        <div className="max-w-6xl w-40">
          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`menu-item group relative overflow-hidden rounded-2xl p-8 ${item.color} bg-gradient-to-br transform transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl font-bold text-white mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {item.title}
                  </div>
                  <div className="text-gray-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to explore →
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-0 group-hover:opacity-10 rounded-full transition-all duration-500 group-hover:scale-150"></div>
              </a>
            ))}
          </div>

          {/* Close Button (Center Bottom) */}
          <div className="text-center mt-12">
            <button
              onClick={handleMenuClick}
              className="close-btn px-8 py-3 bg-white/10 backdrop-blur-lg text-white text-lg font-medium rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              ✕ CLOSE MENU
            </button>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </>
  );
}

export default Navbar;