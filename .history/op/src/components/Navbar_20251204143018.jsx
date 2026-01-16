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
    </>
  );
}

export default Navbar;