import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Connect = () => {
  const leftTrackRef = useRef(null);
  const rightTrackRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Infinite marquee animations
    gsap.to(leftTrackRef.current, {
      x: '-50%',
      duration: 15,
      ease: 'none',
      repeat: -1
    });

    gsap.to(rightTrackRef.current, {
      x: '50%',
      duration: 15,
      ease: 'none',
      repeat: -1
    });

    // Button animation
    const button = buttonRef.current;
    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }

    return () => {
      gsap.killTweensOf([leftTrackRef.current, rightTrackRef.current]);
    };
  }, []);

  const MarqueeRow = ({ direction = 'left' }) => {
    const items = Array(14).fill(null);
    
    return (
      <div className={`flex ${direction === 'right' ? 'justify-end' : ''}`}>
        {items.map((_, i) => (
          <div key={i} className="mx-6 flex items-center">
            <span className="text-2xl lg:text-[20vh] font-bold text-white">Let's Connect</span>
            <svg 
              className="w-6 h-6 ml-3 text-white"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative w-full bg-black overflow-hidden py-20">
      
      {/* Top Marquee - Moving Left */}
      <div className="relative overflow-hidden mb-8">
        <div 
          ref={leftTrackRef}
          className="flex whitespace-nowrap"
        >
          <MarqueeRow direction="left" />
          <MarqueeRow direction="left" />
        </div>
      </div>

      {/* Bottom Marquee - Moving Right */}
      <div className="relative overflow-hidden">
        <div 
          ref={rightTrackRef}
          className="flex whitespace-nowrap"
        >
          <MarqueeRow direction="right" />
          <MarqueeRow direction="right" />
        </div>
      </div>

      {/* Center CTA Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          ref={buttonRef}
          className="group relative bg-white text-black px-12 py-4 rounded-full flex items-center gap-4 hover:bg-gray-100 transition-colors duration-300"
        >
          <span className="text-xl font-bold">Let's Contact</span>
          <div className="relative w-8 h-8">
            <svg 
              className="absolute w-8 h-8 transform -rotate-45 group-hover:translate-x-1 transition-transform duration-300"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </button>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

    </div>
  );
};

export default Connect;