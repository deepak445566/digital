import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function Navbar({ isHomePage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOverlayRef = useRef(null);
  
  // Menu items data for the menu overlay
  const menuOverlayItems = [
    { title: 'HOME', number: '01' },
    { title: 'ABOUT', number: '02' },
    { title: 'PROJECTS', number: '03' },
    { title: 'SERVICES', number: '04' },
  ];

  // Simple navigation links for desktop
  const desktopNavLinks = [
    { title: 'WORK', href: '#' },
    { title: 'ABOUT', href: '#' },
    { title: 'SERVICES', href: '#' },
    { title: 'CONTACT', href: '#' },
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
      // OPEN MENU ANIMATION - bottom-right से slide in
      if (menuOverlayRef.current) {
        menuOverlayRef.current.style.display = 'flex';
        
        // Get the menu container
        const menuContainer = menuOverlayRef.current.querySelector('.relative');
        
        if (menuContainer) {
          // Initial position - off screen bottom-right
          gsap.set(menuContainer, {
            x: '100%',
            y: '100%',
            opacity: 0,
            scale: 0.9,
            transformOrigin: 'bottom right'
          });

          // Animate to position
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
      // CLOSE MENU ANIMATION - bottom-right को slide out
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
            {/* Desktop Navigation Links - Laptop screen के लिए */}
            <div className="hidden lg:flex items-center space-x-6">
              {desktopNavLinks.map((item, index) => (
                <a 
                  key={index}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wide px-3 py-1.5 rounded-lg hover:bg-white/5"
                >
                  {item.title}
                </a>
              ))}
            </div>
            
            {/* Menu Button - Laptop & Desktop */}
            <button 
              onClick={handleMenuClick}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <span className="hidden md:inline">
                {isMenuOpen ? '✕ CLOSE MENU' : '☰ OPEN MENU'}
              </span>
              <span className="md:hidden">
                {isMenuOpen ? '✕' : '☰'}
              </span>
            </button>
            
            {/* Mobile Menu Button (Hamburger) - Only for small screens */}
            <button 
              onClick={handleMenuClick}
              className="lg:hidden relative z-50 ml-2"
            >
              <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - Only for small screens */}
        <div 
          className="lg:hidden mt-4 pt-4 border-t border-gray-800 overflow-hidden"
          style={{ 
            height: isMenuOpen ? 'auto' : '0px',
            opacity: isMenuOpen ? 1 : 0,
            transition: 'height 0.3s, opacity 0.3s'
          }}
        >
          <div className="flex flex-col space-y-4">
            {desktopNavLinks.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                className="text-gray-300 font-medium py-2 hover:text-white transition-colors text-center"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay - Large menu for desktop */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 z-40 hidden items-end justify-end px-4 py-4"
      >
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleMenuClick}
        ></div>
        
        {/* Menu Container */}
        <div 
          className="relative h-[70vh] w-[45vw] min-w-[500px] bg-white rounded-4xl overflow-hidden shadow-2xl"
          style={{
            transformOrigin: 'bottom right'
          }}
        >
          {/* Close Button */}
          <button 
            onClick={handleMenuClick}
            className="absolute top-6 right-6 z-50 close-btn p-3 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
          >
            <span className="text-2xl">✕</span>
          </button>

          {/* Brand Logo in Menu */}
          <div className="absolute top-8 left-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">U®</span>
              </div>
              <div className="flex flex-col">
                <span className="text-black font-bold text-sm tracking-wider">UNUSUALLY<sup className="text-[10px]">®</sup></span>
                <span className="text-gray-500 text-[10px] tracking-widest">OS SUR</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="h-full flex flex-col justify-center items-center px-12">
            {/* Menu Items - Single Column, Large text */}
            <div className="w-full space-y-4">
              {menuOverlayItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="menu-item group relative block w-full"
                  onClick={handleMenuClick}
                >
                  <div className="flex items-center justify-between">
                    {/* Title - Left side */}
                    <div className="relative overflow-hidden p-0.5">
                      <h3 className="text-black font-extrabold text-6xl lg:text-8xl exo tracking-tight opacity-90 group-hover:opacity-100 transition-all duration-500">
                        {item.title}
                      </h3>
                    </div>
                    
                    {/* Number in parentheses - Right side */}
                    <div className="text-gray-500 text-4xl lg:text-5xl font-light group-hover:text-black transition-colors duration-500">
                      ({item.number})
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Footer/Contact Info in Menu */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
              <div className="text-gray-500 text-sm">
                © 2024 UNUSUALLY. All rights reserved.
              </div>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-500 hover:text-black text-sm">Instagram</a>
                <a href="#" className="text-gray-500 hover:text-black text-sm">LinkedIn</a>
                <a href="#" className="text-gray-500 hover:text-black text-sm">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;