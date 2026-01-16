import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextRoll from './v1/TextRoll';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ServicesPage = () => {
  const servicesRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Animation for title and subtitle
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 80%',
        }
      }
    );

    // Animation for service cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            y: 80,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      }
    });

    // Hover effect for service cards
    cardsRef.current.forEach((card) => {
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          card.removeEventListener('mouseenter', () => {});
          card.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  // Services data
  const services = [
    {
      id: 1,
      title: 'WEBSITE DESIGNING',
      description: 'Crafting visually stunning, user-friendly websites that reflect your brand identity and engage your audience effectively.',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-400',
      features: ['UI/UX Design', 'Responsive Design', 'Wireframing', 'Prototyping']
    },
    {
      id: 2,
      title: 'WEB DEVELOPMENT',
      description: 'Building robust, scalable, and high-performance web applications using modern technologies and best practices.',
      icon: '💻',
      color: 'from-purple-500 to-pink-500',
      features: ['Frontend Development', 'Backend Development', 'API Integration', 'Performance Optimization']
    },
    {
      id: 3,
      title: 'MOBILE APP DEVELOPMENT',
      description: 'Creating intuitive and powerful mobile applications for iOS and Android platforms.',
      icon: '📱',
      color: 'from-green-500 to-emerald-400',
      features: ['iOS Development', 'Android Development', 'Cross-Platform', 'App Store Deployment']
    },
    {
      id: 4,
      title: 'E-COMMERCE SOLUTIONS',
      description: 'Developing secure and scalable e-commerce platforms that drive sales and enhance customer experience.',
      icon: '🛒',
      color: 'from-yellow-500 to-orange-500',
      features: ['Shopify Development', 'Custom E-commerce', 'Payment Integration', 'Inventory Management']
    },
    {
      id: 5,
      title: 'DIGITAL MARKETING',
      description: 'Comprehensive digital marketing strategies to boost your online presence and drive business growth.',
      icon: '📈',
      color: 'from-red-500 to-rose-400',
      features: ['SEO Optimization', 'Social Media Marketing', 'Content Strategy', 'PPC Campaigns']
    },
    {
      id: 6,
      title: 'BRAND IDENTITY',
      description: 'Developing cohesive brand identities that communicate your values and resonate with your target audience.',
      icon: '✨',
      color: 'from-indigo-500 to-violet-400',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy']
    },
    {
      id: 7,
      title: 'UI/UX CONSULTING',
      description: 'Expert consultation to improve user experience and interface design for better engagement and conversions.',
      icon: '🎯',
      color: 'from-teal-500 to-cyan-400',
      features: ['User Research', 'Usability Testing', 'Design Systems', 'Product Strategy']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A1A2E] text-white" ref={servicesRef}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4 lg:px-8">
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Title */}
          <div className="mb-8">
            <h1 
              ref={titleRef}
              className="text-7xl lg:text-8xl font-bold mb-6"
            >
              <TextRoll className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SERVICES
              </TextRoll>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-16 max-w-3xl">
            <p 
              ref={subtitleRef}
              className="text-xl lg:text-2xl text-gray-300 leading-relaxed"
            >
              BRINGING CREATIVE DESIGN, STRATEGY, AND TECH TOGETHER TO ELEVATE YOUR BRAND ONLINE.
            </p>
          </div>

          {/* Separator */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mb-20">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 transition-all duration-500 hover:border-gray-500/50 overflow-hidden`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Service Icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {service.icon}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="relative z-10 text-2xl font-bold mb-4">
                  <TextRoll className="group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                    {service.title}
                  </TextRoll>
                </h3>

                {/* Service Description */}
                <p className="relative z-10 text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gray-800/50 rounded-full text-sm text-gray-300 border border-gray-700/50 group-hover:border-gray-600/50 transition-colors duration-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Button */}
                <div className="relative z-10">
                  <button className="w-full py-3 px-6 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl text-gray-300 font-medium group-hover:text-white group-hover:border-blue-500/50 group-hover:from-blue-900/20 group-hover:to-purple-900/20 transition-all duration-500 flex items-center justify-center gap-2">
                    <span>Learn More</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>

                {/* Number Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <div className="w-10 h-10 rounded-full bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:text-white group-hover:border-blue-500/50 transition-colors duration-500">
                    0{service.id}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-6">
                Ready to Transform Your Digital Presence?
              </h3>
              <p className="text-gray-400 mb-8">
                Let's discuss how we can bring your vision to life with our comprehensive services.
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <TextRoll center>START YOUR PROJECT</TextRoll>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '250+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '50+', label: 'Team Members' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;