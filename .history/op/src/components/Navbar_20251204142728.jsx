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
  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 hidden items-end justify-end p-4"
>
  {/* Menu Container with 70% height and 30% width */}
  <div 
    className="relative h-[70vh] w-[30vw] min-h-[500px] min-w-[350px] max-h-[90vh] max-w-[40vw] bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 transform-gpu"
    style={{
      transformOrigin: 'bottom right'
    }}
  >
    {/* Header with Gradient */}
    <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-r from-gray-800/80 to-black/80 backdrop-blur-lg border-b border-gray-700/50 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">U®</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wider">
              UNUSUALLY<sup className="text-xs">®</sup>
            </h2>
            <p className="text-gray-400 text-xs tracking-widest">NAVIGATION MENU</p>
          </div>
        </div>
        <button
          onClick={handleMenuClick}
          className="close-btn w-8 h-8 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center transition-colors duration-300 border border-gray-600/50"
        >
          <span className="text-white text-lg">×</span>
        </button>
      </div>
    </div>

    {/* Scrollable Content Area */}
    <div className="h-full pt-20 pb-24 px-6 overflow-y-auto scrollbar-hide">
      {/* Main Menu Items - Single Column */}
      <div className="space-y-3 mb-8">
        <h3 className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-4 ml-1">
          Main Pages
        </h3>
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`menu-item group relative flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-800/70 hover:to-gray-900/70 transition-all duration-300 hover:translate-x-2 border-l-4 border-transparent hover:border-blue-500`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-white tracking-wide">
                  {item.title}
                </span>
                <span className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore {item.title.toLowerCase()} section
                </span>
              </div>
            </div>
            <div className="text-gray-500 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* Quick Links - Single Column */}
      <div className="pt-6 border-t border-gray-700/50">
        <h3 className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-4 ml-1">
          Quick Links
        </h3>
        <div className="space-y-2">
          {[
            { name: 'About Company', icon: '👥', color: 'text-blue-400' },
            { name: 'Our Services', icon: '⚙️', color: 'text-purple-400' },
            { name: 'Portfolio', icon: '📁', color: 'text-green-400' },
            { name: 'Testimonials', icon: '🌟', color: 'text-yellow-400' },
            { name: 'Careers', icon: '💼', color: 'text-red-400' },
            { name: 'Blog', icon: '📝', color: 'text-pink-400' }
          ].map((link, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/30 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3">
                <span className={`text-xl ${link.color}`}>{link.icon}</span>
                <span className="text-gray-300 group-hover:text-white text-sm font-medium">
                  {link.name}
                </span>
              </div>
              <span className="text-gray-500 text-xs group-hover:text-gray-300">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>

    {/* Contact/Footer Section - Fixed at Bottom */}
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent border-t border-gray-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-blue-300">📧</span>
          </div>
          <div>
            <p className="text-gray-300 text-sm">Contact Us</p>
            <p className="text-gray-400 text-xs">info@unusually.com</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
          Get Quote
        </button>
      </div>
    </div>

    {/* Decorative Corner Elements */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full"></div>
  </div>
</div>
    </>
  );
}

export default Navbar;