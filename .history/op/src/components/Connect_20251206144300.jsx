import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const paragraphRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // GSAP Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: leftSectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Text reveal animations
    tl.fromTo(headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo('.divider',
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(subheadingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(paragraphRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.4"
    );

    // Form section animation
    gsap.fromTo(formRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Input focus animations
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      input.addEventListener('blur', () => {
        gsap.to(input, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Button hover animation
    const button = document.querySelector('.submit-btn');
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });

  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8 md:px-8 md:py-16">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 xl:gap-24">
        
        {/* LEFT SECTION - Text Content */}
        <div ref={leftSectionRef} className="lg:w-1/2">
          <h1 
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 tracking-tight"
          >
            LET'S WORK TOGETHER
          </h1>
          
          <div className="divider w-24 h-[2px] bg-gradient-to-r from-black to-gray-400 mb-8"></div>
          
          <h2 
            ref={subheadingRef}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            LET'S COMMENT!
          </h2>
          
          <p 
            ref={paragraphRef}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed"
          >
            FEELING GOOD ABOUT A NEW PROJECT? WRITE ME WHAT'S IN YOUR MIND AND LET'S TALK ABOUT IT!
          </p>
        </div>
        
        {/* RIGHT SECTION - Contact Form */}
        <div ref={rightSectionRef} className="lg:w-1/2">
          <div ref={formRef} className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100 transform transition-all duration-300 hover:shadow-3xl">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-700">Touch</span>
            </h3>
            
            <form className="space-y-6">
              <div className="relative group">
                <label className="block text-gray-700 mb-3 font-medium text-sm uppercase tracking-wide">
                  Name
                </label>
                <input 
                  type="text" 
                  className="w-full px-5 py-4 border-0 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 placeholder-gray-400"
                  placeholder="Your name"
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-700 group-hover:w-full transition-all duration-500"></div>
              </div>
              
              <div className="relative group">
                <label className="block text-gray-700 mb-3 font-medium text-sm uppercase tracking-wide">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full px-5 py-4 border-0 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 placeholder-gray-400"
                  placeholder="your.email@example.com"
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-700 group-hover:w-full transition-all duration-500"></div>
              </div>
              
              <div className="relative group">
                <label className="block text-gray-700 mb-3 font-medium text-sm uppercase tracking-wide">
                  Message
                </label>
                <textarea 
                  rows="5"
                  className="w-full px-5 py-4 border-0 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 placeholder-gray-400 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-700 group-hover:w-full transition-all duration-500"></div>
              </div>
              
              <button 
                type="submit"
                className="submit-btn w-full bg-black text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 transform active:scale-95 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  SEND MESSAGE
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                    />
                  </svg>
                </span>
              </button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm">
                I typically respond within <span className="font-bold text-black">24 hours</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;