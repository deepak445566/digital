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
  const servicesRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const accordionItemsRef = useRef([]);

  useEffect(() => {
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

  // Handle accordion click with animation
  const handleAccordionClick = (index) => {
    const wasExpanded = expandedIndex === index;
    setExpandedIndex(wasExpanded ? null : index);

    // Animate content
    const content = accordionItemsRef.current[index]?.querySelector('.accordion-content');
    if (content) {
      if (wasExpanded) {
        // Close animation
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut'
        });
      } else {
        // Open animation
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
      title: 'MOBILE APP DEVELOPMENT',
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
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Title */}
          <div className="mb-12">
            <h1 
              ref={titleRef}
              className="text-8xl lg:text-9xl font-black tracking-tighter leading-none"
            >
              <TextRoll className="text-black">
                SERVICES
              </TextRoll>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-20 max-w-3xl">
            <p 
              ref={subtitleRef}
              className="text-2xl lg:text-3xl text-gray-700 font-medium tracking-wide"
            >
              BRINGING CREATIVE DESIGN, STRATEGY, AND TECH TOGETHER TO ELEVATE YOUR BRAND ONLINE.
            </p>
          </div>

          {/* Separator Line */}
          <div className="relative h-px bg-gray-300 mb-20">
            <div className="absolute left-0 top-1/2 w-32 h-0.5 bg-black transform -translate-y-1/2"></div>
          </div>

          {/* Accordion Services */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <div 
                key={service.id}
                ref={(el) => (accordionItemsRef.current[index] = el)}
                className="accordion-item border-b border-gray-200"
              >
                {/* Accordion Header - Clickable */}
                <button
                  onClick={() => handleAccordionClick(index)}
                  className="w-full py-8 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300 group"
                >
                  <div className="flex items-start w-full">
                    {/* Service Number */}
                    <div className="w-16 flex-shrink-0">
                      <span className="text-sm font-medium text-gray-500 tracking-widest">
                        {service.id.toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Service Info */}
                    <div className="flex-1 text-left">
                      {/* Main Service Title */}
                      <h3 className="text-4xl lg:text-5xl font-bold mb-2 tracking-tight">
                        <TextRoll>
                          {service.title}
                        </TextRoll>
                      </h3>

                      {/* Service Subtitle */}
                      <div className="mb-2">
                        <p className="text-xl lg:text-2xl font-light text-gray-600 tracking-wide">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Expand/Collapse Icon */}
                    <div className="w-12 flex-shrink-0 flex items-center justify-center">
                      <div className={`w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-300 group-hover:border-black ${expandedIndex === index ? 'bg-black border-black' : ''}`}>
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

                {/* Accordion Content - Hidden by default */}
                <div 
                  className="accordion-content overflow-hidden"
                  style={{ height: expandedIndex === index ? 'auto' : '0' }}
                >
                  <div className="pb-12 pl-16">
                    {/* Description */}
                    <div className="mb-8 max-w-3xl">
                      <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="mb-10">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">
                        Key Features
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {service.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                      <button className="px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors duration-300">
                        Learn More
                      </button>
                      <button className="px-6 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:border-black hover:text-black transition-colors duration-300">
                        View Case Study
                      </button>
                    </div>
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