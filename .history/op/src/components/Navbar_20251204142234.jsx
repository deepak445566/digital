import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function Navbar({ isHomePage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOverlayRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuContainerRef = useRef(null);
  
  // Menu items data - image में दिखाए गए items
  const menuItems = [
    { title: 'HOME', number: '01' },
    { title: 'STUDIO', number: '02' },
    { title: 'PROJECTS', number: '03' },
    { title: 'CONTACT', number: '04' },
    { title: 'ABOUT', number: '02' },
    { title: 'SERVICES', number: '04' },
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
        
        // Background overlay animation (from bottom-right)
        gsap.fromTo(menuOverlayRef.current,
          {
            opacity: 0,
            width: '200px',
            height: '200px',
            borderRadius: '100%',
            x: window.innerWidth - 250,
            y: window.innerHeight - 250,
            transformOrigin: 'bottom right'
          },
          {
            opacity: 1,
            width: '100vw',
            height: '100vh',
            borderRadius: '0%',
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'expo.out'
          }
        );

        // Menu container animation
        if (menuContainerRef.current) {
          gsap.fromTo(menuContainerRef.current,
            {
              opacity: 0,
              y: 100
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.4,
              ease: 'power3.out'
            }
          );
        }

        // Menu items animation (staggered from bottom)
        const menuItems = menuContainerRef.current?.querySelectorAll('.menu-item');
        if (menuItems) {
          gsap.fromTo(menuItems,
            {
              opacity: 0,
              y: 60,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.12,
              delay: 0.5,
              ease: 'back.out(1.4)'
            }
          );
        }

        // Brand text animation
        const brandText = menuContainerRef.current?.querySelector('.brand-text');
        if (brandText) {
          gsap.fromTo(brandText,
            {
              opacity: 0,
              y: -30
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.3,
              ease: 'power3.out'
            }
          );
        }

        // Subtitle animation
        const subtitle = menuContainerRef.current?.querySelector('.subtitle');
        if (subtitle) {
          gsap.fromTo(subtitle,
            {
              opacity: 0,
              y: -20
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.4,
              ease: 'power3.out'
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
        const menuItems = menuContainerRef.current?.querySelectorAll('.menu-item');
        if (menuItems) {
          gsap.to(menuItems,
            {
              opacity: 0,
              y: 40,
              scale: 0.9,
              duration: 0.4,
              stagger: 0.08,
              ease: 'power2.in'
            }
          );
        }

        // Brand and subtitle exit
        const brandText = menuContainerRef.current?.querySelector('.brand-text');
        const subtitle = menuContainerRef.current?.querySelector('.subtitle');
        if (brandText) {
          gsap.to(brandText, {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: 'power2.in'
          });
        }
        if (subtitle) {
          gsap.to(subtitle, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power2.in'
          });
        }

        // Menu container exit
        if (menuContainerRef.current) {
          gsap.to(menuContainerRef.current, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            ease: 'power2.in'
          });
        }

        // Background overlay exit animation (to bottom-right)
        gsap.to(menuOverlayRef.current,
          {
            opacity: 0,
            width: '200px',
            height: '200px',
            borderRadius: '100%',
            x: window.innerWidth - 250,
            y: window.innerHeight - 250,
            duration: 0.7,
            delay: 0.2,
            ease: 'expo.in',
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

      {/* Fullscreen Menu Overlay - Image के design के according */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] z-40 hidden items-center justify-center p-8 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)' }}
      >
        <div 
          ref={menuContainerRef}
          className="max-w-6xl w-full h-full flex flex-col justify-center items-center"
        >
          {/* Brand Section - Image के top left की तरह */}
          <div className="absolute top-12 left-12">
            <div className="flex items-center mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">U®</span>
              </div>
              <div>
                <h1 className="brand-text text-4xl font-bold text-white tracking-tight">
                  UNUSUALLY<sup className="text-sm">®</sup>
                </h1>
                <p className="subtitle text-gray-400 text-sm tracking-widest mt-1">
                  BRANDING STUDIO
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items Grid - Image के center की तरह */}
          <div className="flex-1 flex flex-col justify-center items-center w-full">
            {/* Two Columns Layout - Image के according */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 max-w-5xl">
              {/* Left Column - First set of menu items */}
              <div className="space-y-12">
                {menuItems.slice(0, 3).map((item, index) => (
                  <div key={index} className="menu-item group cursor-pointer">
                    <div className="flex items-baseline space-x-6">
                      <div className="text-5xl lg:text-6xl font-bold text-gray-700 group-hover:text-blue-500 transition-colors duration-500">
                        ({item.number})
                      </div>
                      <div className="relative overflow-hidden">
                        <h2 className="text-6xl lg:text-7xl font-bold text-white tracking-tight">
                          {item.title}
                        </h2>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-700"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column - Second set of menu items */}
              <div className="space-y-12 mt-12 lg:mt-0">
                {menuItems.slice(3, 6).map((item, index) => (
                  <div key={index + 3} className="menu-item group cursor-pointer">
                    <div className="flex items-baseline space-x-6">
                      <div className="text-5xl lg:text-6xl font-bold text-gray-700 group-hover:text-purple-500 transition-colors duration-500">
                        ({item.number})
                      </div>
                      <div className="relative overflow-hidden">
                        <h2 className="text-6xl lg:text-7xl font-bold text-white tracking-tight">
                          {item.title}
                        </h2>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-700"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Close Button */}
            <div className="absolute bottom-12 right-12">
              <button
                onClick={handleMenuClick}
                className="close-btn px-8 py-4 bg-white/5 backdrop-blur-lg text-white text-lg font-medium rounded-full hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/30 hover:scale-105 transform"
              >
                CLOSE ✕
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                               linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          {/* Corner Gradients */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl"></div>
          
          {/* Animated Floating Circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-white/5 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-white/5 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </>
  );
}

export default Navbar;