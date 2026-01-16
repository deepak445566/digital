import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function Navbar({ isHomePage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOverlayRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
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

      // Mobile menu animation
      if (mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4 }
        );
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
              {navMenuItems.slice(0, 4).map((item, index) => (
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
              className="px-5 py-2  text-white text-sm font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl relative z-50"
            >
              {isMenuOpen ? '✕ CLOSE' : '☰ MENU'}
            </button>
            
            {/* Mobile Menu Button (Hamburger) */}
            
          </div>
        </div>

      </nav>

      {/* Fullscreen Menu Overlay */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0  z-40 hidden items-end justify-end px-4 rounded-2xl "
      >
        {/* Menu Container - Image के according simple design */}
        <div 
          className="relative h-[70vh] w-[90vw] lg:h-[70vh] lg:w-[45vw] bg-white  rounded-4xl overflow-hidden shadow-2xl transform-gpu mb-28 lg:mb-0 "
          style={{
            transformOrigin: 'bottom right'
          }}
        >
          {/* Simple Header with Brand */}
          <div className="absolute top-8 left-8">
            <div className="flex items-center space-x-3">
             
              <div>
               
              </div>
            </div>
          </div>

         

          {/* Main Content Area - Center aligned like image */}
          <div className="h-full flex flex-col justify-center items-center px-4 lg:px-12 ">
            {/* Menu Items - Single Column, Large text like image */}
            <div className="w-full  space-y-2">
              {menuOverlayItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="menu-item group relative block w-full"
                >
                  <div className="flex items-center justify-between">
                    {/* Title - Left side */}
                    <div className="relative overflow-hidden py-4 lg:p-0.5">
                      <h3 className="text-black font-extrabold text-5xl lg:text-7xl  exo tracking-tight opacity-90  group-hover:opacity-100 transition-all duration-500">
                        {item.title}
                      </h3>
                      {/* Underline animation */}
                     
                    </div>
                    
                    {/* Number in parentheses - Right side */}
                    <div className="text-gray-500 text-3xl lg:text-4xl font-light group-hover:text-white transition-colors duration-500">
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