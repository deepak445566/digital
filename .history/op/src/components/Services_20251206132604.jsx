import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextRoll from './v1/TextRoll';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});
  const servicesRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const accordionItemsRef = useRef([]);
  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageTimelineRef = useRef(null);

  // Service images with higher quality Unsplash images
  const serviceImages = [
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
  ];

  // Preload images
  useEffect(() => {
    serviceImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageLoaded(prev => ({ ...prev, [index]: true }));
      };
    });
  }, []);

  useEffect(() => {
    // Create image animation timeline
    imageTimelineRef.current = gsap.timeline({ paused: true });
    
    // Title animation
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

    // Subtitle animation
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

  // Handle hover with smooth image animation
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    
    if (imageRef.current && imageContainerRef.current) {
      // Kill any existing animations
      gsap.killTweensOf([imageRef.current, imageContainerRef.current]);
      
      // Fade in and scale up smoothly
      gsap.to(imageContainerRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        onStart: () => {
          // Update image source
          const img = imageRef.current.querySelector('img');
          if (img) {
            // Add loading animation
            img.style.opacity = '0';
            img.src = serviceImages[index];
            
            // Fade in image after load
            img.onload = () => {
              gsap.to(img, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
              });
            };
          }
        }
      });

      // Smooth scale animation
      gsap.fromTo(imageContainerRef.current,
        { scale: 0.95, rotateY: -5 },
        {
          scale: 1,
          rotateY: 0,
          duration: 0.4,
          ease: 'back.out(1.7)'
        }
      );
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    
    if (imageContainerRef.current) {
      // Smooth fade out and scale down
      gsap.to(imageContainerRef.current, {
        opacity: 0,
        scale: 0.95,
        rotateY: -5,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  };

  // Handle accordion click with smooth animation
  const handleAccordionClick = (index) => {
    const wasExpanded = expandedIndex === index;
    setExpandedIndex(wasExpanded ? null : index);

    // Animate content
    const content = accordionItemsRef.current[index]?.querySelector('.accordion-content');
    if (content) {
      if (wasExpanded) {
        // Smooth close animation
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut'
        });
      } else {
        // Smooth open animation
        gsap.fromTo(content,
          { height: 0, opacity: 0 },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            onStart: () => {
              // Scroll into view smoothly
              setTimeout(() => {
                content.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'nearest' 
                });
              }, 100);
            }
          }
        );
      }
    }
  };

  // Services data
  const services = [
    {
      id: 1,
      title: 'WEBSITE DESIGNING',
      subtitle: 'WEBSITE DEVELOPMENT',
      description: 'Crafting visually stunning and highly functional websites that drive results. From concept to launch, we deliver exceptional digital experiences that engage users and convert visitors. Our process includes wireframing, prototyping, UI/UX design, and development.',
      features: [
        'Responsive Web Design',
        'UI/UX Prototyping',
        'Frontend Development',
        'Performance Optimization'
      ]
    },
    {
      id: 2,
      title: 'APP DEVELOPMENT',
      subtitle: 'iOS & ANDROID APPLICATIONS',
      description: 'Building intuitive and powerful mobile applications for both iOS and Android platforms with cutting-edge technologies. We create apps that provide seamless user experiences and drive business growth.',
      features: [
        'Native iOS & Android',
        'Cross-Platform Apps',
        'App Store Deployment',
        'API Integration'
      ]
    },
    {
      id: 3,
      title: 'E-COMMERCE SOLUTIONS',
      subtitle: 'ONLINE STORE DEVELOPMENT',
      description: 'Creating scalable e-commerce platforms that provide seamless shopping experiences and drive conversions. We build secure, fast, and user-friendly online stores.',
      features: [
        'Custom E-commerce',
        'Payment Integration',
        'Inventory Management',
        'Order Processing'
      ]
    },
    {
      id: 4,
      title: 'DIGITAL MARKETING',
      subtitle: 'SEO & SOCIAL MEDIA MARKETING',
      description: 'Comprehensive digital marketing strategies to enhance your online presence and accelerate business growth. We use data-driven approaches to maximize ROI.',
      features: [
        'SEO Optimization',
        'Social Media Strategy',
        'Content Marketing',
        'PPC Campaigns'
      ]
    },
    {
      id: 5,
      title: 'BRAND IDENTITY',
      subtitle: 'LOGO & VISUAL DESIGN',
      description: 'Developing cohesive brand identities that communicate your values and resonate with your target audience. We create memorable brand experiences.',
      features: [
        'Logo Design',
        'Brand Guidelines',
        'Visual Identity',
        'Brand Strategy'
      ]
    },
    {
      id: 6,
      title: 'UI/UX DESIGN',
      subtitle: 'USER EXPERIENCE CONSULTING',
      description: 'Creating intuitive user interfaces and seamless user experiences that engage and convert visitors. We focus on user-centered design principles.',
      features: [
        'User Research',
        'Wireframing',
        'Prototyping',
        'Usability Testing'
      ]
    },
    {
      id: 7,
      title: 'CONTENT STRATEGY',
      subtitle: 'COPYWRITING & CONTENT CREATION',
      description: 'Developing compelling content strategies that tell your brand story and connect with your audience. We create content that drives engagement.',
      features: [
        'Content Planning',
        'Copywriting',
        'Blog Writing',
        'Content Distribution'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black" ref={servicesRef}>
      {/* Hero Section */}
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
              BRINGING CREATIVE DESIGN, STRATEGY, AND TECH TOGETHER TO ELEVATE YOUR BRAND ONLINE.
            </p>
          </div>

          {/* Separator Line */}
          <div className="relative h-px bg-gray-300 mb-20">
            <div className="absolute left-0 top-1/2 w-32 h-0.5 bg-black transform -translate-y-1/2"></div>
          </div>

          {/* Floating Image Container with Smooth Animations */}
          <div 
            ref={imageContainerRef}
            className="fixed top-1/2 right-8 lg:right-16 w-[280px] h-[280px] lg:w-[320px] lg:h-[320px] z-40 pointer-events-none opacity-0 scale-95 hidden lg:block"
            style={{
              transform: 'translateY(-50%) perspective(1000px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div 
              ref={imageRef}
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
              style={{
                transform: 'translateZ(20px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              {hoveredIndex !== null && (
                <>
                  {/* Blurred background for loading */}
                  <div 
                    className="absolute inset-0 bg-gray-100 blur-xl scale-110"
                    style={{
                      backgroundImage: hoveredIndex !== null ? `url(${serviceImages[hoveredIndex]})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: 0.5
                    }}
                  ></div>
                  
                  {/* Main image with smooth transition */}
                  <img 
                    src={serviceImages[hoveredIndex]} 
                    alt={services[hoveredIndex]?.title}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    style={{ 
                      opacity: imageLoaded[hoveredIndex] ? 1 : 0 
                    }}
                    onLoad={() => {
                      setImageLoaded(prev => ({ ...prev, [hoveredIndex]: true }));
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Content overlay with animation */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform transition-transform duration-300">
                      <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                        {services[hoveredIndex]?.title}
                      </h3>
                      <p className="text-sm text-white/90 font-light">
                        {services[hoveredIndex]?.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
                </>
              )}
            </div>
          </div>

          {/* Custom animation for shine effect */}
          <style jsx>{`
            @keyframes shine {
              0% { transform: translateX(-100%) rotate(45deg); }
              100% { transform: translateX(100%) rotate(45deg); }
            }
            .animate-shine {
              animation: shine 2s ease-in-out infinite;
              transform-origin: center;
            }
          `}</style>

          {/* Accordion Services */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <div 
                key={service.id}
                ref={(el) => (accordionItemsRef.current[index] = el)}
                className="accordion-item border-b border-gray-200"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => handleAccordionClick(index)}
                  className="w-full py-4 lg:py-8 flex items-center justify-between hover:bg-gray-50/50 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Animated hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  
                  {/* Hover indicator */}
                  <div className={`absolute inset-y-0 left-0 w-1 bg-black transform transition-all duration-300 ${hoveredIndex === index ? 'scale-y-100' : 'scale-y-0'}`}></div>
                  
                  <div className="flex items-start w-full relative z-10">
                    {/* Service Number */}
                    <div className="w-12 flex-shrink-0">
                      <span className="text-sm font-medium text-gray-500 tracking-widest transition-colors duration-300 group-hover:text-black">
                        {service.id.toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Service Info */}
                    <div className="flex-1 text-left">
                      {/* Main Service Title */}
                      <h3 className="text-2xl big lg:text-5xl font-bold mb-2 transition-all duration-300 group-hover:translate-x-1">
                        <TextRoll>
                          {service.title}
                        </TextRoll>
                      </h3>

                      {/* Service Subtitle */}
                      <div className="mb-2">
                        <p className="text-md lg:text-2xl exo font-light text-gray-600 tracking-wide transition-colors duration-300 group-hover:text-gray-800">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Expand/Collapse Icon */}
                    <div className="mr-2 w-12 flex-shrink-0 flex items-center justify-center">
                      <div className={`h-8 w-8 lg:w-12 lg:h-12 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-300 group-hover:border-black group-hover:scale-110 ${expandedIndex === index ? 'bg-black border-black scale-110' : ''}`}>
                        <svg 
                          className={`w-4 h-4 transition-all duration-300 ${expandedIndex === index ? 'rotate-180 text-white scale-110' : 'text-gray-500 group-hover:text-black'}`}
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
                    {/* Description with fade in */}
                    <div className="mb-8 max-w-3xl">
                      <p className="text-lg lg:text-xl text-gray-700 leading-relaxed transform transition-all duration-500 opacity-0 animate-fadeIn">
                        {service.description}
                      </p>
                    </div>

                    {/* Features List with staggered animation */}
                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:bg-gray-200 cursor-default opacity-0 animate-slideUp"
                            style={{ animationDelay: `${idx * 100}ms` }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 opacity-0 animate-fadeIn" style={{ animationDelay: '400ms' }}>
                      <button className="px-6 py-2 bg-black text-white text-md font-medium rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95">
                        View Details
                      </button>
                      <button className="px-6 py-2 border border-black text-black text-md font-medium rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95">
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Services;