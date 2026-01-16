import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import AnimatedButton from './v1/AnimatedButton';
import TextRoll from './v1/TextRoll';

function Navbar({ isHomePage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const [activeMainService, setActiveMainService] = useState(null);
  const [activeSubService, setActiveSubService] = useState(null);
  
  const menuOverlayRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const servicesCardRef = useRef(null);
  const servicesButtonRef = useRef(null);
  const servicesTimeoutRef = useRef(null);
  const subServicesRef = useRef(null);
  const subSubServicesRef = useRef(null);

  // Complete nested services structure
  const servicesData = {
    'GOOGLE': {
      subServices: {
        'GOOGLE LISTING': [
          'Listing SEO',
          'Listing Reviews',
          'Phone Number Listing',
          'Business Profile Optimization'
        ],
        'GOOGLE ADS': [
          'Call Ads',
          'Website Leads Ads',
          'Performance Ads',
          'Store View Ads',
          'Product Sale Ads'
        ]
      }
    },
    'WEBSITE DEVELOPMENT': {
      subServices: {
        'STATIC WEBSITE': [
          'Landing Pages',
          'Portfolio Sites',
          'Brochure Websites',
          'Corporate Sites'
        ],
        'DYNAMIC WEBSITE': [
          'CMS Websites',
          'Blog Platforms',
          'News Portals',
          'Membership Sites'
        ],
        'E-COMMERCE': [
          'WooCommerce',
          'Shopify',
          'Magento',
          'Custom E-commerce'
        ],
        'OTHER': [
          'Web Applications',
          'Admin Panels',
          'API Development',
          'Custom Solutions'
        ]
      }
    },
    'APP DEVELOPMENT': {
      subServices: {
        'ANDROID': [
          'Native Android (Kotlin/Java)',
          'Android UI/UX',
          'Play Store Deployment',
          'Maintenance & Support'
        ],
        'iOS': [
          'Native iOS (Swift)',
          'iPhone/iPad Apps',
          'App Store Deployment',
          'Apple Guidelines Compliance'
        ],
        'FLUTTER': [
          'Cross-Platform Apps',
          'Single Codebase',
          'Firebase Integration',
          'Rapid Development'
        ]
      }
    },
    'CRM SOFTWARE': {
      subServices: {
        'MLM SOFTWARE': [
          'Binary MLM',
          'Matrix MLM',
          'Unilevel MLM',
          'Hybrid MLM Systems'
        ],
        'CUSTOMIZED SOFTWARE': [
          'Business Process Automation',
          'Custom Workflows',
          'Integration Services',
          'Legacy System Migration'
        ],
        'CRM SOFTWARE': [
          'Sales CRM',
          'Support CRM',
          'Marketing Automation',
          'Analytics & Reporting'
        ],
        'OTHER': [
          'ERP Solutions',
          'Inventory Management',
          'Accounting Software',
          'Project Management'
        ]
      }
    },
    'VIDEO EDITING': {
      subServices: {
        'SHORT VIDEO': [
          'Social Media Reels',
          'YouTube Shorts',
          'TikTok Videos',
          'Instagram Stories'
        ],
        'OUTDOOR VIDEO': [
          'Event Coverage',
          'Product Shoots',
          'Documentary Films',
          'Corporate Videos'
        ],
        '360 VIRTUAL TOUR': [
          'Real Estate Tours',
          'Hotel Virtual Tours',
          'Museum Virtual Tours',
          'Industrial Facility Tours'
        ],
        'OTHER': [
          '2D/3D Animation',
          'Motion Graphics',
          'Explainer Videos',
          'Training Videos'
        ]
      }
    },
    'CELEBRITY AWARD': {
      subServices: {
        'WITH ACTRESS': [
          'Film Award Shows',
          'Fashion Award Events',
          'Television Awards',
          'Digital Media Awards'
        ],
        'WITH ACTOR': [
          'Sports Awards',
          'Business Awards',
          'Social Awards',
          'Lifetime Achievement'
        ]
      }
    },
    'COMBO PACKAGE': {
      subServices: {
        'LEAD GENERATION': [
          'Google Ads + Website',
          'Social Media + CRM',
          'SEO + Content Marketing',
          'Full Funnel Marketing'
        ]
      }
    },
    'SOCIAL MEDIA': {
      subServices: {
        'CONTENT MANAGEMENT': [
          'Content Strategy',
          'Post Scheduling',
          'Community Management',
          'Analytics & Reporting'
        ]
      }
    }
  };

  // Main services list (for top level)
  const mainServices = Object.keys(servicesData);

  // Scroll detection for navbar style change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
        gsap.set(servicesCardRef.current, {
          display: 'flex',
          opacity: 0,
          y: 10
        });
        
        gsap.to(servicesCardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out'
        });
      } else {
        gsap.to(servicesCardRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.15,
          ease: 'power2.in',
          onComplete: () => {
            if (servicesCardRef.current) {
              servicesCardRef.current.style.display = 'none';
            }
            // Reset all active states
            setActiveMainService(null);
            setActiveSubService(null);
          }
        });
      }
    }
  }, [showServices]);

  // Sub-services animation
  useEffect(() => {
    if (subServicesRef.current) {
      if (activeMainService) {
        gsap.set(subServicesRef.current, {
          display: 'block',
          opacity: 0,
          x: -10
        });
        
        gsap.to(subServicesRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.2,
          ease: 'power2.out'
        });
      } else {
        gsap.to(subServicesRef.current, {
          opacity: 0,
          x: -10,
          duration: 0.15,
          ease: 'power2.in',
          onComplete: () => {
            if (subServicesRef.current) {
              subServicesRef.current.style.display = 'none';
            }
          }
        });
      }
    }
  }, [activeMainService]);

  // Sub-sub-services animation
  useEffect(() => {
    if (subSubServicesRef.current) {
      if (activeSubService) {
        gsap.set(subSubServicesRef.current, {
          display: 'block',
          opacity: 0,
          x: -10
        });
        
        gsap.to(subSubServicesRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.2,
          ease: 'power2.out'
        });
      } else {
        gsap.to(subSubServicesRef.current, {
          opacity: 0,
          x: -10,
          duration: 0.15,
          ease: 'power2.in',
          onComplete: () => {
            if (subSubServicesRef.current) {
              subSubServicesRef.current.style.display = 'none';
            }
          }
        });
      }
    }
  }, [activeSubService]);

  // Handle hover on SERVICES button
  const handleServicesMouseEnter = () => {
    clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => {
      setShowServices(true);
      setServicesHover(true);
    }, 100);
  };

  const handleServicesMouseLeave = () => {
    clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => {
      if (!servicesHover) {
        setShowServices(false);
      }
    }, 150);
  };

  // Handle hover on services card
  const handleServicesCardMouseEnter = () => {
    clearTimeout(servicesTimeoutRef.current);
    setServicesHover(true);
  };

  const handleServicesCardMouseLeave = () => {
    clearTimeout(servicesTimeoutRef.current);
    setServicesHover(false);
    servicesTimeoutRef.current = setTimeout(() => {
      setShowServices(false);
    }, 100);
  };

  // Handle main service hover
  const handleMainServiceHover = (service) => {
    setActiveMainService(service);
    setActiveSubService(null);
  };

  // Handle sub-service hover
  const handleSubServiceHover = (subService) => {
    setActiveSubService(subService);
  };

  // Handle main service leave
  const handleMainServiceLeave = () => {
    setTimeout(() => {
      if (!activeSubService) {
        setActiveMainService(null);
      }
    }, 100);
  };

  // Handle sub-service leave
  const handleSubServiceLeave = () => {
    setTimeout(() => {
      setActiveSubService(null);
    }, 100);
  };

  // Calculate dropdown position
  const updateDropdownPosition = () => {
    if (servicesButtonRef.current && servicesCardRef.current) {
      const buttonRect = servicesButtonRef.current.getBoundingClientRect();
      const card = servicesCardRef.current;
      
      card.style.left = `${buttonRect.left}px`;
      card.style.top = `${buttonRect.bottom + 5}px`;
      card.style.minWidth = '800px';
    }
  };

  // Update position when services card is shown
  useEffect(() => {
    if (showServices) {
      updateDropdownPosition();
      const handleResize = () => updateDropdownPosition();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [showServices]);

  // Menu items for navbar
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
        }
      }
    } else {
      if (menuOverlayRef.current) {
        const menuContainer = menuOverlayRef.current.querySelector('.relative');
        
        if (menuContainer) {
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
        }
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
                      ref={item.hasDropdown ? servicesButtonRef : null}
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

              {/* Multi-Level Services Dropdown */}
              <div 
                ref={servicesCardRef}
                className="fixed z-50 hidden bg-white rounded-xl  shadow-2xl overflow-hidden border border-gray-300"
                onMouseEnter={handleServicesCardMouseEnter}
                onMouseLeave={handleServicesCardMouseLeave}
                style={{ 
                  position: 'fixed',
                  zIndex: 9999,
                  display: 'flex',
                  height: '500px'
                }}
              >
                {/* Main Services Column */}
                <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
                  <div className="p-4 bg-black">
                    <h3 className="text-white font-bold text-lg">ALL SERVICES</h3>
                  </div>
                  <div className="py-2">
                    {mainServices.map((service, index) => (
                      <div
                        key={index}
                        className={`px-4 py-3 cursor-pointer transition-colors duration-200 border-l-4 ${activeMainService === service ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-transparent hover:bg-gray-100 text-gray-700'}`}
                        onMouseEnter={() => handleMainServiceHover(service)}
                        onMouseLeave={handleMainServiceLeave}
                      >
                        <div className="font-medium flex items-center justify-between">
                          {service}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-Services Column */}
                <div 
                  ref={subServicesRef}
                  className="w-64 bg-white border-r border-gray-200 overflow-y-auto hidden"
                >
                  {activeMainService && servicesData[activeMainService] && (
                    <>
                      <div className="p-4 bg-gray-100">
                        <h3 className="text-gray-800 font-bold">{activeMainService}</h3>
                      </div>
                      <div className="py-2">
                        {Object.keys(servicesData[activeMainService].subServices).map((subService, index) => (
                          <div
                            key={index}
                            className={`px-4 py-3 cursor-pointer transition-colors duration-200 border-l-4 ${activeSubService === subService ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-transparent hover:bg-gray-100 text-gray-700'}`}
                            onMouseEnter={() => handleSubServiceHover(subService)}
                            onMouseLeave={handleSubServiceLeave}
                          >
                            <div className="font-medium flex items-center justify-between">
                              {subService}
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Sub-Sub-Services Column */}
                <div 
                  ref={subSubServicesRef}
                  className="flex-1 bg-gray-50 overflow-y-auto hidden"
                >
                  {activeSubService && activeMainService && (
                    <>
                      <div className="p-4 bg-gray-100">
                        <h3 className="text-gray-800 font-bold">{activeSubService}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {activeMainService} → {activeSubService}
                        </p>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 gap-2">
                          {servicesData[activeMainService].subServices[activeSubService].map((item, index) => (
                            <a
                              key={index}
                              href="#"
                              className="block px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                            >
                              <div className="font-medium text-gray-800">{item}</div>
                              <div className="text-sm text-gray-500 mt-1">Click for more details</div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Empty State */}
                {!activeMainService && (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="text-4xl mb-4">👆</div>
                      <h3 className="text-gray-700 font-bold mb-2">Select a Service</h3>
                      <p className="text-gray-500 text-sm">Hover over any service to see sub-categories</p>
                    </div>
                  </div>
                )}
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

      {/* Spacer div */}
      <div className="h-24"></div>
    </>
  );
}

export default Navbar;