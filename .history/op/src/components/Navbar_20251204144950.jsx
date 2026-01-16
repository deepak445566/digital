import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function Navbar({ isHomePage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOverlayRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuContainerRef = useRef(null);
  
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
      // OPEN MENU ANIMATION - Smooth packet-like animation
      if (menuOverlayRef.current) {
        menuOverlayRef.current.style.display = 'flex';
        
        // Background fade in
        gsap.fromTo(menuOverlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );

        // Menu container animation - like a packet opening from bottom-right
        if (menuContainerRef.current) {
          // Initial state - small circle at bottom-right corner
          gsap.set(menuContainerRef.current, {
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            x: window.innerWidth - 100,
            y: window.innerHeight - 100,
            opacity: 0,
            scale: 0.3,
            transformOrigin: 'bottom right'
          });

          // Expand animation - like a packet opening
          const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
          
          tl.to(menuContainerRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.4
          })
          .to(menuContainerRef.current, {
            width: '45vw',
            height: '70vh',
            borderRadius: '2rem',
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'back.out(1.2)'
          }, '-=0.2')
          .to(menuContainerRef.current, {
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            duration: 0.3
          });

          // Menu items animation - staggered entrance
          const menuItems = menuContainerRef.current.querySelectorAll('.menu-item');
          gsap.fromTo(menuItems,
            {
              opacity: 0,
              x: 50,
              scale: 0.8
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.15,
              delay: 0.6,
              ease: 'back.out(1.4)'
            }
          );

          // Background elements animation
          const bgElements = menuContainerRef.current.querySelectorAll('.bg-element');
          gsap.fromTo(bgElements,
            {
              opacity: 0,
              scale: 0
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
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
      // CLOSE MENU ANIMATION - Smooth packet-like closing
      if (menuOverlayRef.current) {
        // Menu items exit animation
        if (menuContainerRef.current) {
          const menuItems = menuContainerRef.current.querySelectorAll('.menu-item');
          gsap.to(menuItems,
            {
              opacity: 0,
              x: -30,
              scale: 0.9,
              duration: 0.3,
              stagger: 0.08,
              ease: 'power2.in'
            }
          );

          // Background elements exit
          const bgElements = menuContainerRef.current.querySelectorAll('.bg-element');
          gsap.to(bgElements,
            {
              opacity: 0,
              scale: 0,
              duration: 0.3,
              stagger: 0.05,
              ease: 'power2.in'
            }
          );

          // Menu container shrink to bottom-right corner
          const tl = gsap.timeline({ 
            defaults: { ease: 'expo.in' },
            onComplete: () => {
              if (menuOverlayRef.current) {
                menuOverlayRef.current.style.display = 'none';
              }
            }
          });
          
          tl.to(menuContainerRef.current, {
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            duration: 0.2
          })
          .to(menuContainerRef.current, {
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            x: window.innerWidth - 100,
            y: window.innerHeight - 100,
            duration: 0.6,
            ease: 'back.in(1.2)'
          }, '-=0.1')
          .to(menuContainerRef.current, {
            opacity: 0,
            scale: 0.3,
            duration: 0.3
          });
        }

        // Background fade out
        gsap.to(menuOverlayRef.current, {
          opacity: 0,
          duration: 0.4,
          delay: 0.2
        });
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
            {navMenuItems.map((item, index) => (
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

      {/* Menu Overlay */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden items-end justify-end p-4"
      >
        {/* Menu Container - Packet-like design */}
        <div 
          ref={menuContainerRef}
          className="relative bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] overflow-hidden transform-gpu"
          style={{
            width: '45vw',
            height: '70vh',
            borderRadius: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Corner gradient */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-bl from-blue-500/10 via-transparent to-transparent rounded-full blur-xl bg-element"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-purple-500/10 via-transparent to-transparent rounded-full blur-xl bg-element"></div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                                 linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative h-full flex flex-col justify-center items-center px-8 py-12">
            {/* Menu Items */}
            <div className="w-full space-y-4">
              {menuOverlayItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="menu-item group relative block w-full py-3 hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent rounded-xl transition-all duration-300 px-6"
                >
                  <div className="flex items-center justify-between">
                    {/* Title - Left side */}
                    <div className="relative overflow-hidden">
                      <h3 className="text-white font-extrabold text-5xl lg:text-6xl exo tracking-tight opacity-90 group-hover:opacity-100 transition-all duration-500">
                        {item.title}
                      </h3>
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-700"></div>
                    </div>
                    
                    {/* Number - Right side */}
                    <div className="flex items-center">
                      <div className="text-gray-400 text-3xl lg:text-4xl font-light group-hover:text-white transition-colors duration-500">
                        ({item.number})
                      </div>
                      <div className="ml-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-500">
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Close Button - Bottom Center */}
            <div className="absolute bottom-8 left-0 right-0 px-8">
              <button
                onClick={handleMenuClick}
                className="close-btn w-full py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg text-white text-lg font-medium rounded-full hover:from-white/20 hover:to-white/10 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-[1.02] transform"
              >
                CLOSE ✕
              </button>
            </div>
          </div>

          {/* Corner Decorative Circles */}
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-blue-500/30 bg-element"></div>
          <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-purple-500/30 bg-element"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-blue-500/30 bg-element"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-purple-500/30 bg-element"></div>
        </div>
      </div>
    </>
  );
}

export default Navbar;