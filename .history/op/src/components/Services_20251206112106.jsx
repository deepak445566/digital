import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextRoll from './v1/TextRoll';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Services = () => {
  const servicesRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

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

    // Service items animation
    gsap.utils.toArray('.service-item').forEach((item, index) => {
      gsap.fromTo(
        item,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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

  // Services data as per your screenshot
  const services = [
    {
      id: 1,
      title: 'WEBSITE DESIGNING',
      subtitle: 'WEBSITE DEVELOPMENT',
      description: 'Crafting visually stunning and highly functional websites that drive results. From concept to launch, we deliver exceptional digital experiences.'
    },
    {
      id: 2,
      title: 'MOBILE APP DEVELOPMENT',
      subtitle: 'iOS & ANDROID APPLICATIONS',
      description: 'Building intuitive and powerful mobile applications for both iOS and Android platforms with cutting-edge technologies.'
    },
    {
      id: 3,
      title: 'E-COMMERCE SOLUTIONS',
      subtitle: 'ONLINE STORE DEVELOPMENT',
      description: 'Creating scalable e-commerce platforms that provide seamless shopping experiences and drive conversions.'
    },
    {
      id: 4,
      title: 'DIGITAL MARKETING',
      subtitle: 'SEO & SOCIAL MEDIA MARKETING',
      description: 'Comprehensive digital marketing strategies to enhance your online presence and accelerate business growth.'
    },
    {
      id: 5,
      title: 'BRAND IDENTITY',
      subtitle: 'LOGO & VISUAL DESIGN',
      description: 'Developing cohesive brand identities that communicate your values and resonate with your target audience.'
    },
    {
      id: 6,
      title: 'UI/UX DESIGN',
      subtitle: 'USER EXPERIENCE CONSULTING',
      description: 'Creating intuitive user interfaces and seamless user experiences that engage and convert visitors.'
    },
    {
      id: 7,
      title: 'CONTENT STRATEGY',
      subtitle: 'COPYWRITING & CONTENT CREATION',
      description: 'Developing compelling content strategies that tell your brand story and connect with your audience.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black" ref={servicesRef}>
      {/* Hero Section - Exactly like screenshot */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Title - Big Bold Text */}
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

          {/* Subtitle - Smaller text below title */}
          <div className="mb-20 max-w-3xl">
            <p 
              ref={subtitleRef}
              className="text-2xl lg:text-3xl text-gray-700 font-medium tracking-wide"
            >
              BRINGING CREATIVE DESIGN, STRATEGY, AND TECH TOGETHER TO ELEVATE YOUR BRAND ONLINE.
            </p>
          </div>

          {/* Separator Line - Simple horizontal line */}
          <div className="relative h-px bg-gray-300 mb-20">
            <div className="absolute left-0 top-1/2 w-32 h-0.5 bg-black transform -translate-y-1/2"></div>
          </div>

          {/* Services Grid - Simple layout like screenshot */}
          <div className="space-y-16">
            {services.map((service) => (
              <div 
                key={service.id}
                className="service-item border-b border-gray-200 pb-16 last:border-b-0"
              >
                {/* Service Number - Small and subtle */}
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-500 tracking-widest">
                    {service.id.toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Main Service Title - Large and bold */}
                <h3 className="text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                  <TextRoll>
                    {service.title}
                  </TextRoll>
                </h3>

                {/* Service Subtitle - Smaller and lighter */}
                <div className="mb-8">
                  <p className="text-2xl lg:text-3xl font-light text-gray-600 tracking-wide">
                    {service.subtitle}
                  </p>
                </div>

                {/* Service Description - Regular text */}
                <div className="max-w-2xl">
                  <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Explore Button - Simple underline style */}
                <div className="mt-8">
                  <button className="group flex items-center gap-4 text-lg font-medium text-black hover:text-gray-600 transition-colors duration-300">
                    <span className="border-b-2 border-black group-hover:border-gray-600 pb-1 transition-colors duration-300">
                      Explore Service
                    </span>
                    <svg 
                      className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section - Simple at bottom */}
          <div className="mt-32 pt-20 border-t border-gray-300">
            <div className="max-w-3xl">
              <h3 className="text-4xl font-bold mb-8">
                Ready to start your project?
              </h3>
              <p className="text-xl text-gray-600 mb-10">
                Let's discuss how we can help bring your vision to life with our comprehensive services.
              </p>
              <button className="px-10 py-4 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-800 transition-colors duration-300">
                <TextRoll center>GET IN TOUCH</TextRoll>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="py-8 px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} UNUSUALLY®. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;