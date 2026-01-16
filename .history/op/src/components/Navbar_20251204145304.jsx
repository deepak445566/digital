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
      // OPEN MENU ANIMATION - Ultra smooth packet animation
      if (menuOverlayRef.current) {
        menuOverlayRef.current.style.display = 'flex';
        
        // Create smooth overlay backdrop
        gsap.fromTo(menuOverlayRef.current,
          { 
            opacity: 0,
            backdropFilter: 'blur(0px)'
          },
          { 
            opacity: 1,
            backdropFilter: 'blur(10px)',
            duration: 0.5,
            ease: 'power2.out'
          }
        );

        // Menu container animation - Very smooth packet unfold
        if (menuContainerRef.current) {
          // Save final dimensions
          const finalWidth = '45vw';
          const finalHeight = '70vh';
          
          // Initial tiny state at bottom-right
          gsap.set(menuContainerRef.current, {
            width: '0px',
            height: '0px',
            borderRadius: '50%',
            x: window.innerWidth - 60,
            y: window.innerHeight - 60,
            opacity: 0,
            scale: 0.1,
            rotation: 0,
            transformOrigin: 'bottom right'
          });

          // Create timeline for smooth sequence
          const tl = gsap.timeline({
            defaults: { ease: "power3.out" }
          });

          // Step 1: Fade in and grow a bit
          tl.to(menuContainerRef.current, {
            opacity: 1,
            scale: 0.3,
            duration: 0.3
          })
          // Step 2: Expand to circle
          .to(menuContainerRef.current, {
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            x: window.innerWidth - 100,
            y: window.innerHeight - 100,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)"
          })
          // Step 3: Expand to final rectangle
          .to(menuContainerRef.current, {
            width: finalWidth,
            height: finalHeight,
            borderRadius: '2rem',
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.4)"
          })
          // Step 4: Add shadow and final polish
          .to(menuContainerRef.current, {
            boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.7)',
            duration: 0.2
          });

          // Menu items animation - Smooth staggered entrance
          setTimeout(() => {
            const menuItems = menuContainerRef.current.querySelectorAll('.menu-item');
            gsap.fromTo(menuItems,
              {
                opacity: 0,
                x: -30,
                scale: 0.95
              },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.5,
                stagger: {
                  amount: 0.3,
                  from: "start",
                  ease: "power2.out"
                },
                ease: "back.out(1.2)"
              }
            );
          }, 500);

          // Background elements animation
          setTimeout(() => {
            const bgElements = menuContainerRef.current.querySelectorAll('.bg-element');
            gsap.fromTo(bgElements,
              {
                opacity: 0,
                scale: 0.5
              },
              {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "elastic.out(1, 0.5)"
              }
            );
          }, 600);
        }
      }

      // Mobile menu animation
      if (mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    } else {
      // CLOSE MENU ANIMATION - Ultra smooth packet close
      if (menuOverlayRef.current) {
        // Menu items exit animation
        if (menuContainerRef.current) {
          const menuItems = menuContainerRef.current.querySelectorAll('.menu-item');
          gsap.to(menuItems,
            {
              opacity: 0,
              x: 20,
              scale: 0.95,
              duration: 0.3,
              stagger: {
                amount: 0.2,
                from: "end",
                ease: "power2.in"
              }
            }
          );

          // Background elements exit
          const bgElements = menuContainerRef.current.querySelectorAll('.bg-element');
          gsap.to(bgElements,
            {
              opacity: 0,
              scale: 0.5,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.in"
            }
          );

          // Create timeline for smooth close sequence
          const tl = gsap.timeline({
            defaults: { ease: "power3.in" },
            onComplete: () => {
              if (menuOverlayRef.current) {
                menuOverlayRef.current.style.display = 'none';
              }
            }
          });

          // Step 1: Remove shadow
          tl.to(menuContainerRef.current, {
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            duration: 0.2
          })
          // Step 2: Shrink to circle
          .to(menuContainerRef.current, {
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            x: window.innerWidth - 100,
            y: window.innerHeight - 100,
            duration: 0.5,
            ease: "back.in(1.2)"
          })
          // Step 3: Shrink to tiny dot
          .to(menuContainerRef.current, {
            width: '0px',
            height: '0px',
            opacity: 0,
            scale: 0.1,
            x: window.innerWidth - 60,
            y: window.innerHeight - 60,
            duration: 0.3
          });
        }

        // Overlay fade out
        gsap.to(menuOverlayRef.current, {
          opacity: 0,
          backdropFilter: 'blur(0px)',
          duration: 0.4,
          delay: 0.2,
          ease: "power2.in"
        });
      }

      // Mobile menu exit animation
      if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
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

      {/* Menu Overlay with backdrop blur */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 z-40 hidden items-end justify-end p-4"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        {/* Menu Container - Ultra smooth design */}
        <div 
          ref={menuContainerRef}
          className="relative bg-gradient-to-br from-[#0A0A0F] via-[#0F0F15] to-[#0A0A0F] overflow-hidden transform-gpu"
          style={{
            width: '45vw',
            height: '70vh',
            borderRadius: '2rem',
            boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.7)'
          }}
        >
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated gradient waves */}
            <div className="absolute top-0 right-0 w-full h-full bg-element">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent rounded-full"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/10 via-transparent to-transparent rounded-full"></div>
            </div>
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-3 bg-element">
              <div className="w-full h-full" style={{
                backgroundImage: `linear-gradient(to right, #ffffff 0.5px, transparent 0.5px),
                                 linear-gradient(to bottom, #ffffff 0.5px, transparent 0.5px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative h-full flex flex-col justify-center items-center px-10 py-14">
            {/* Menu Items with smooth hover */}
            <div className="w-full space-y-6">
              {menuOverlayItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="menu-item group relative block w-full py-4 px-8 rounded-xl transition-all duration-500 hover:bg-gradient-to-r hover:from-white/3 hover:via-white/1 hover:to-transparent"
                >
                  <div className="flex items-center justify-between">
                    {/* Title with smooth underline */}
                    <div className="relative">
                      <h3 className="text-white font-extrabold text-5xl lg:text-6xl exo tracking-tight opacity-95 group-hover:opacity-100 transition-opacity duration-500">
                        {item.title}
                      </h3>
                      <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:w-full transition-all duration-700 ease-out rounded-full"></div>
                    </div>
                    
                    {/* Number with smooth transition */}
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-500 text-3xl lg:text-4xl font-light group-hover:text-white transition-all duration-500 group-hover:scale-110">
                        ({item.number})
                      </div>
                      <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        <svg className="w-7 h-7 text-gray-400 group-hover:text-white transform group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Smooth Close Button */}
            <div className="absolute bottom-8 left-0 right-0 px-10">
              <button
                onClick={handleMenuClick}
                className="close-btn w-full py-4 bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-lg text-white text-lg font-medium rounded-full transition-all duration-500 hover:from-white/12 hover:to-white/6 hover:scale-[1.02] hover:shadow-lg border border-white/10 hover:border-white/20 transform active:scale-95"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>CLOSE</span>
                  <span className="transform transition-transform duration-500 hover:rotate-90">✕</span>
                </span>
              </button>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-6 right-6 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400/30 to-transparent bg-element"></div>
          <div className="absolute top-6 left-6 w-4 h-4 rounded-full bg-gradient-to-br from-purple-400/30 to-transparent bg-element"></div>
          <div className="absolute bottom-6 left-6 w-4 h-4 rounded-full bg-gradient-to-tr from-blue-400/30 to-transparent bg-element"></div>
          <div className="absolute bottom-6 right-6 w-4 h-4 rounded-full bg-gradient-to-tr from-purple-400/30 to-transparent bg-element"></div>
        </div>
      </div>
    </>
  );
}

export default Navbar;