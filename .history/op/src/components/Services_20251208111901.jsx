import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextRoll from './v1/TextRoll';
import { useNavigate } from 'react-router-dom';
import { services } from './data/data';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showSubservices, setShowSubservices] = useState(null);
  const navigate = useNavigate();
  const servicesRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const accordionItemsRef = useRef([]);
  const imageContainerRef = useRef(null);

  // Service images
  const serviceImages = [
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  ];

  useEffect(() => {
    // Animations
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 90%',
        }
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 85%',
        }
      }
    );

    // Accordion items animation
    gsap.utils.toArray('.accordion-item').forEach((item, index) => {
      gsap.fromTo(
        item,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          }
        }
      );
    });
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    
    if (imageContainerRef.current) {
      gsap.set(imageContainerRef.current, {
        scale: 0.3,
        opacity: 0,
        width: '100px',
        height: '100px'
      });
      
      gsap.to(imageContainerRef.current, {
        opacity: 1,
        scale: 1,
        width: '300px',
        height: '300px',
        duration: 0.6,
        ease: 'back.out(1.7)',
        onStart: () => {
          const img = imageContainerRef.current.querySelector('img');
          if (img) {
            img.src = serviceImages[index];
          }
        }
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        opacity: 0,
        scale: 0.3,
        width: '100px',
        height: '100px',
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(imageContainerRef.current, { opacity: 0 });
        }
      });
    }
  };

  const handleAccordionClick = (index) => {
    const wasExpanded = expandedIndex === index;
    setExpandedIndex(wasExpanded ? null : index);

    const content = accordionItemsRef.current[index]?.querySelector('.accordion-content');
    if (content) {
      if (wasExpanded) {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut'
        });
      } else {
        gsap.fromTo(content,
          { height: 0, opacity: 0 },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          }
        );
      }
    }
  };

  const handleCheckClick = (serviceId, e) => {
    e.stopPropagation(); // Prevent accordion toggle
    if (showSubservices === serviceId) {
      setShowSubservices(null);
    } else {
      setShowSubservices(serviceId);
    }
  };

  const handleSubserviceClick = (serviceId, subserviceId) => {
    navigate(`/service/${serviceId}/detail/${subserviceId}`);
  };

  return (
    <div className="min-h-screen bg-white text-black" ref={servicesRef}>
      <section className="pt-32 pb-20 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Main Title */}
          <div className="mb-12 px-6">
            <h1 
              ref={titleRef}
              className="text-7xl lg:text-9xl font-black tracking-tighter leading-none"
            >
              <TextRoll className="text-black big">
                SERVICES
              </TextRoll>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-20 max-w-3xl px-6">
            <p 
              ref={subtitleRef}
              className="text-xl exo lg:text-3xl text-gray-700 font-medium tracking-wide"
            >
              COMPLETE DIGITAL SOLUTIONS FOR YOUR BUSINESS GROWTH
            </p>
          </div>

          {/* Separator Line */}
          <div className="relative bg-gray-300 mb-20">
            <div className="absolute left-0 top-1/2 w-32 h-0.5 bg-black transform -translate-y-1/2"></div>
          </div>

          {/* Floating Image */}
          <div 
            ref={imageContainerRef}
            className="fixed top-1/2 right-28 z-40 pointer-events-none opacity-0 hidden lg:block"
            style={{
              transform: 'translateY(-50%) scale(0.3)',
              width: '100px',
              height: '100px',
              transformOrigin: 'center center'
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={serviceImages[0]}
                alt="Service"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Services Accordion */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <div 
                key={service.id}
                ref={(el) => (accordionItemsRef.current[index] = el)}
                className="accordion-item border-b border-gray-200"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Service Header */}
                <button
                  onClick={() => handleAccordionClick(index)}
                  className="w-full py-4 lg:py-8 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300 group relative"
                >
                  <div className={`absolute inset-y-0 left-0 w-1 bg-black transform transition-transform duration-300 ${hoveredIndex === index ? 'scale-y-100' : 'scale-y-0'}`}></div>
                  
                  <div className="flex items-start w-full">
                    {/* Service Number */}
                    <div className="w-12 flex-shrink-0">
                      <span className="text-sm font-medium text-gray-500 tracking-widest">
                        {service.id.toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Service Info */}
                    <div className="flex-1 text-left">
                      <h3 className="text-2xl big lg:text-4xl font-bold mb-2">
                        <TextRoll>
                          {service.name}
                        </TextRoll>
                      </h3>

                      <div className="mb-2">
                        <p className="text-md lg:text-xl exo font-light text-gray-600 tracking-wide">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Expand Icon */}
                    <div className="mr-2 w-12 flex-shrink-0 flex items-center justify-center">
                      <div className={`h-8 w-8 lg:w-12 lg:h-12 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-300 group-hover:border-black ${expandedIndex === index ? 'bg-black border-black' : ''}`}>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180 text-white' : 'text-gray-500 group-hover:text-black'}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Accordion Content */}
                <div 
                  className="accordion-content overflow-hidden"
                  style={{ height: expandedIndex === index ? 'auto' : '0' }}
                >
                  <div className="pb-12 pl-10">
                    <div className="mb-8 max-w-3xl">
                      <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                        Comprehensive digital solutions tailored for your business needs. 
                        We provide end-to-end services with dedicated support.
                      </p>
                    </div>

                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.subservices.slice(0, 3).map((subservice) => (
                          <span
                            key={subservice.id}
                            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                          >
                            {subservice.name}
                          </span>
                        ))}
                        {service.subservices.length > 3 && (
                          <span className="px-4 py-2 bg-gray-200 text-gray-600 rounded-full text-sm font-medium">
                            +{service.subservices.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button 
                        onClick={(e) => handleCheckClick(service.id, e)}
                        className="px-6 py-3 bg-black text-white text-md font-medium rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center"
                      >
                        View All Subservices
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>

                    {/* Subservices Grid - Shows when "Check" is clicked */}
                    {showSubservices === service.id && (
                      <div className="mt-8 p-6 bg-gray-50 rounded-2xl animate-fadeIn">
                        <h4 className="text-2xl font-bold mb-6">Available Subservices</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {service.subservices.map((subservice) => (
                            <div 
                              key={subservice.id}
                              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                              onClick={() => handleSubserviceClick(service.id, subservice.id)}
                            >
                              <div className="mb-4">
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                  <img 
                                    src={subservice.image} 
                                    alt={subservice.name}
                                    className="w-10 h-10 object-contain"
                                  />
                                </div>
                                <h5 className="text-lg font-bold text-gray-800 mb-2">
                                  {subservice.name}
                                </h5>
                                <p className="text-gray-600 text-sm">
                                  {subservice.description}
                                </p>
                              </div>
                              <div className="flex items-center justify-between mt-4">
                                <span className="text-sm text-blue-600 font-medium">
                                  Get Quote →
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;