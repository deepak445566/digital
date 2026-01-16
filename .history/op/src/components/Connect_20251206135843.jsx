import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Connect = () => {
  const leftTrackRef = useRef(null);
  const rightTrackRef = useRef(null);
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Infinite marquee animations
    gsap.to(leftTrackRef.current, {
      x: '-50%',
      duration: 20,
      ease: 'none',
      repeat: -1
    });

    gsap.to(rightTrackRef.current, {
      x: '50%',
      duration: 20,
      ease: 'none',
      repeat: -1
    });

    // Button hover animation
    const button = buttonRef.current;
    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.08,
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

    // Text animation on load
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
      }
    );

    return () => {
      gsap.killTweensOf([leftTrackRef.current, rightTrackRef.current]);
    };
  }, []);

  return (
    <div className="relative w-full bg-black overflow-hidden h-[100vh] flex flex-col">
      
      {/* Top Half - 50% Height */}
      <div className="h-1/2 flex items-end pb-8 relative">
        {/* Top row - moving left */}
        <div className="relative overflow-hidden w-full">
          <div ref={leftTrackRef} className="flex whitespace-nowrap">
            {Array(8).fill(0).map((_, i) => (
              <div key={`top-${i}`} className="mx-8 flex items-center">
                <span className="text-[55vh] font-black text-white opacity-10 leading-none">Let's Connect</span>
                <svg className="w-12 h-12 ml-6 text-white opacity-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-40"></div>
        <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black to-transparent z-40"></div>
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-black to-transparent z-40"></div>
      </div>

      {/* Center Button */}
      <div ref={textRef} className="relative z-50 flex items-center justify-center h-0">
        <button
          ref={buttonRef}
          className="group bg-white text-black px-16 py-6 rounded-full flex items-center gap-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 absolute"
        >
          <span className="text-2xl font-bold tracking-wide">Let's Contact</span>
          <svg 
            className="w-8 h-8 transform -rotate-45 group-hover:translate-x-2 transition-transform duration-300"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Bottom Half - 50% Height */}
      <div className="h-1/2 flex items-start pt-8 relative">
        {/* Bottom row - moving right */}
        <div className="relative overflow-hidden w-full">
          <div ref={rightTrackRef} className="flex whitespace-nowrap">
            {Array(8).fill(0).map((_, i) => (
              <div key={`bottom-${i}`} className="mx-8 flex items-center">
                <span className="text-[25vh] font-black text-white opacity-10 leading-none">Let's Connect</span>
                <svg className="w-12 h-12 ml-6 text-white opacity-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-40"></div>
        <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black to-transparent z-40"></div>
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-black to-transparent z-40"></div>
      </div>

    </div>
  );
};

export default Connect;