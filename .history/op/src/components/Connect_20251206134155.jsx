import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Connect = () => {
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Create infinite horizontal animation for top text (left to right)
    const topAnimation = gsap.to(topTextRef.current, {
      x: '100%',
      duration: 20,
      ease: 'none',
      repeat: -1
    });

    // Create infinite horizontal animation for bottom text (right to left)
    const bottomAnimation = gsap.to(bottomTextRef.current, {
      x: '-100%',
      duration: 20,
      ease: 'none',
      repeat: -1
    });

    // Button hover animation
    const buttonEnter = () => {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const buttonLeave = () => {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Add hover event listeners
    if (buttonRef.current) {
      buttonRef.current.addEventListener('mouseenter', buttonEnter);
      buttonRef.current.addEventListener('mouseleave', buttonLeave);
    }

    // Container entry animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
      }
    );

    return () => {
      topAnimation.kill();
      bottomAnimation.kill();
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('mouseenter', buttonEnter);
        buttonRef.current.removeEventListener('mouseleave', buttonLeave);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" ref={containerRef}>
      <div className="relative h-screen flex flex-col items-center justify-center px-6">
        
        {/* Top Moving Text - Left to Right */}
        <div className="absolute top-20 lg:top-32 left-0 w-full overflow-hidden">
          <div 
            ref={topTextRef}
            className="whitespace-nowrap text-7xl md:text-9xl lg:text-[180px] font-black uppercase tracking-tighter opacity-10"
          >
            {Array(8).fill("$ CONNECT AND L ").join("")}
          </div>
        </div>

        

        {/* Bottom Moving Text - Right to Left */}
        <div className="absolute bottom-20 lg:bottom-32 left-0 w-full overflow-hidden">
          <div 
            ref={bottomTextRef}
            className="whitespace-nowrap text-7xl md:text-9xl lg:text-[180px] font-black uppercase tracking-tighter opacity-10"
          >
            {Array(8).fill("D LET $ CONNECT ").join("")}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5"></div>

      </div>
    </div>
  );
};

export default Connect;