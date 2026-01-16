import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function Navbar({ isHomePage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const [activeMainService, setActiveMainService] = useState(null);
  const [activeSubService, setActiveSubService] = useState(null);
  
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

  // Main services list
  const mainServices = Object.keys(servicesData);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Services dropdown animation
  useEffect(() => {
    if (servicesCardRef.current) {
      if (showServices) {
        gsap.set(servicesCardRef.current, {
          display: 'flex',
          opacity: 0,
          y: 15,
          scale: 0.95
        });
        
        gsap.to(servicesCardRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power3.out'
        });
      } else {
        gsap.to(servicesCardRef.current, {
          opacity: 0,
          y: 15,
          scale: 0.95,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            if (servicesCardRef.current) {
              servicesCardRef.current.style.display = 'none';
            }
            setActiveMainService(null);
            setActiveSubService(null);
          }
        });
      }
    }
  }, [showServices]);

  // Sub-services animation
  useEffect(() => {
    if (subServicesRef.current && activeMainService) {
      gsap.set(subServicesRef.current, {
        opacity: 0,
        x: -20
      });
      
      gsap.to(subServicesRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.25,
        ease: 'power3.out'
      });
    }
  }, [activeMainService]);

  // Sub-sub-services animation
  useEffect(() => {
    if (subSubServicesRef.current && activeSubService) {
      gsap.set(subSubServicesRef.current, {
        opacity: 0,
        x: -20
      });
      
      gsap.to(subSubServicesRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.25,
        ease: 'power3.out'
      });
    }
  }, [activeSubService]);

  // Handle hover on SERVICES button
  const handleServicesMouseEnter = () => {
    clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => {
      setShowServices(true);
      setServicesHover(true);
    }, 150);
  };

  const handleServicesMouseLeave = () => {
    clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => {
      if (!servicesHover) {
        setShowServices(false);
      }
    }, 200);
  };

  // Handle hover on dropdown
  const handleDropdownMouseEnter = () => {
    clearTimeout(servicesTimeoutRef.current);
    setServicesHover(true);
  };

  const handleDropdownMouseLeave = () => {
    clearTimeout(servicesTimeoutRef.current);
    setServicesHover(false);
    servicesTimeoutRef.current = setTimeout(() => {
      setShowServices(false);
    }, 150);
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

  // Calculate dropdown position - Thoda left mein
  const updateDropdownPosition = () => {
    if (servicesButtonRef.current && servicesCardRef.current) {
      const buttonRect = servicesButtonRef.current.getBoundingClientRect();
      const card = servicesCardRef.current;
      const viewportWidth = window.innerWidth;
      
      // Position dropdown - thoda left align
      let leftPosition = buttonRect.left - 50; // 50px left mein
      
      // Ensure it doesn't go off screen on left
      if (leftPosition < 20) leftPosition = 20;
      
      // Ensure it doesn't go off screen on right
      const cardWidth = 850; // Approximate width
      if (leftPosition + cardWidth > viewportWidth - 20) {
        leftPosition = viewportWidth - cardWidth - 20;
      }
      
      card.style.left = `${leftPosition}px`;
      card.style.top = `${buttonRect.bottom + 8}px`; // 8px gap
    }
  };

  // Update position
  useEffect(() => {
    if (showServices) {
      updateDropdownPosition();
      const handleResize = () => updateDropdownPosition();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [showServices]);

  return (
    <>
      {/* Main Navbar - Unchanged */}
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
                <a href="#" className="text-gray-300 font-medium tracking-wide hover:text-white magnet transition-colors duration-300 bg-[#383838] px-5 py-2 rounded-full inline-flex items-center justify-center min-w-[100px]">
                  HOME
                </a>
                
                
                {/* SERVICES Button */}
                <div 
                  ref={servicesButtonRef}
                  className="relative"
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                >
                  <a 
                    href="#" 
                    className="text-gray-300 font-medium tracking-wide hover:text-white magnet transition-colors duration-300 bg-[#383838] px-5 py-2 rounded-full inline-flex items-center justify-center min-w-[100px]"
                  >
                    SERVICES
                    <svg className="w-4 h-4 ml-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Modern Multi-Level Dropdown */}
              <div 
                ref={servicesCardRef}
                className="fixed z-[9999] hidden bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
                style={{ 
                  width: '850px',
                  height: '480px',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}
              >
                {/* Main Services Column - Modern Design */}
                <div className="w-64 bg-gradient-to-b from-gray-50 to-white border-r border-gray-100 overflow-y-auto">
                  <div className="p-5 bg-gradient-to-r from-blue-600 to-purple-600">
                    <h3 className="text-white font-bold text-lg tracking-wide">SERVICES</h3>
                    <p className="text-blue-100 text-sm mt-1">Select a category</p>
                  </div>
                  <div className="py-3">
                    {mainServices.map((service, index) => (
                      <div
                        key={index}
                        className={`mx-3 my-1 px-4 py-3 cursor-pointer rounded-xl transition-all duration-300 ${activeMainService === service ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm' : 'hover:bg-gray-50'}`}
                        onMouseEnter={() => handleMainServiceHover(service)}
                      >
                        <div className="font-medium text-gray-800 flex items-center justify-between">
                          <span className="truncate">{service}</span>
                          {activeMainService === service && (
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-Services Column */}
                <div 
                  ref={subServicesRef}
                  className={`w-64 bg-white border-r border-gray-100 overflow-y-auto transition-opacity duration-300 ${activeMainService ? 'opacity-100' : 'opacity-0'}`}
                >
                  {activeMainService && servicesData[activeMainService] && (
                    <>
                      <div className="p-5 bg-gradient-to-r from-gray-100 to-white">
                        <h3 className="text-gray-800 font-bold text-lg">{activeMainService}</h3>
                        <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Sub Categories</div>
                      </div>
                      <div className="py-3">
                        {Object.keys(servicesData[activeMainService].subServices).map((subService, index) => (
                          <div
                            key={index}
                            className={`mx-3 my-1 px-4 py-3 cursor-pointer rounded-xl transition-all duration-300 ${activeSubService === subService ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm' : 'hover:bg-gray-50'}`}
                            onMouseEnter={() => handleSubServiceHover(subService)}
                          >
                            <div className="font-medium text-gray-800 flex items-center justify-between">
                              <span className="truncate">{subService}</span>
                              {activeSubService === subService && (
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

              
                {/* Empty State - Modern Design */}
                {!activeMainService && (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center max-w-md">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Explore Our Services</h3>
                      <p className="text-gray-600 mb-6">
                        Hover over any service category to browse our extensive range of solutions
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span>Interactive navigation</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="px-2 lg:px-5 py-2 text-white text-md font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl magnet"
              >
                {isMenuOpen ? "CLOSE" : "☰ MENU"}
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