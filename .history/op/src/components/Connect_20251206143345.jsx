import React, { useState, useEffect } from 'react';

const Connect = () => {
    useEffect(() => {
      if (window.Shery && window.gsap) {
        window.Shery.makeMagnet(".magnet", {
          duration: 1,
        });
      }
    }, []);
  
  // State for the top marquee text
  const [topText, setTopText] = useState('Let\'s Connect • ');
  
  // State for the bottom marquee text
  const [bottomText, setBottomText] = useState('Let\'s Connect • ');

  // Effect to update marquee text periodically (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate through different text options
      const topOptions = [
        'Let\'s Connect • ',
        'Let\'s Work Together • ',
        'Collaborate • ',
        'Connect Now • '
      ];
      
      const bottomOptions = [
        'Let\'s Connect • ',
        'Start a Project • ',
        'Get in Touch • ',
        'Contact Us • '
      ];
      
      const randomTopIndex = Math.floor(Math.random() * topOptions.length);
      const randomBottomIndex = Math.floor(Math.random() * bottomOptions.length);
      
      setTopText(topOptions[randomTopIndex]);
      setBottomText(bottomOptions[randomBottomIndex]);
    }, 8000); // Change text every 8 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#292929] overflow-hidden relative">
      <div className="h-screen flex flex-col">
        {/* Top Section */}
        <div className="h-2/5 sm:h-5/12 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full blur-2xl sm:blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full blur-2xl sm:blur-3xl"></div>
          </div>
          
          {/* Marquee container */}
          <div className="h-full flex items-center">
            <div className="marquee-container h-full w-full">
              <div className="marquee-content h-full flex items-center">
                {/* We'll repeat the text multiple times for seamless loop */}
                {[...Array(8)].map((_, index) => (
                  <div key={`top-${index}`} className="inline-flex items-center h-full">
                    <span className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10vh] 2xl:text-[12vh] big font-extrabold tracking-tighter whitespace-nowrap mx-4 sm:mx-6 md:mx-8 uppercase">
                      {topText}
                    </span>
                    {/* Separator icon */}
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mx-4 sm:mx-6 md:mx-8">✦</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section with Button */}
        <div className="h-1/5 sm:h-2/12 flex items-center justify-center relative z-10">
          {/* Center Button */}
          <button className="fixed-button px-6 py-4 xs:px-8 xs:py-5 sm:px-10 sm:py-5 md:px-12 md:py-6 bg-[#111111] text-white exo text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:text-black hover:bg-white transition-all duration-500 font-medium rounded-full border-2 border-transparent hover:border-white shadow-lg hover:shadow-2xl">
            Let's Contact
          </button>
        </div>

        {/* Bottom Section */}
        <div className="h-2/5 sm:h-5/12 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-1/3 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full blur-2xl sm:blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full blur-2xl sm:blur-3xl"></div>
          </div>
          
          {/* Marquee container */}
          <div className="h-full flex items-center">
            <div className="marquee-container-reverse h-full w-full">
              <div className="marquee-content-reverse h-full flex items-center">
                {/* We'll repeat the text multiple times for seamless loop */}
                {[...Array(8)].map((_, index) => (
                  <div key={`bottom-${index}`} className="inline-flex items-center h-full">
                    <span className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10vh] 2xl:text-[12vh] big uppercase font-bold tracking-tighter whitespace-nowrap mx-4 sm:mx-6 md:mx-8">
                      {bottomText}
                    </span>
                    {/* Separator icon */}
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mx-4 sm:mx-6 md:mx-8">❖</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Marquee animation for top section */
        .marquee-container {
          overflow: hidden;
          position: relative;
        }
        
        .marquee-content {
          animation: marquee 20s linear infinite;
          white-space: nowrap;
        }
        
        /* Marquee animation for bottom section (reverse direction) */
        .marquee-container-reverse {
          overflow: hidden;
          position: relative;
        }
        
        .marquee-content-reverse {
          animation: marquee-reverse 20s linear infinite;
          white-space: nowrap;
        }
        
        /* Keyframes for marquee animations */
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        /* Button styles */
        .fixed-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          animation: pulse-button 2s infinite;
        }
        
        @keyframes pulse-button {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.4);
          }
        }
        
        /* Responsive breakpoints */
        
        /* Extra small devices (phones, less than 400px) */
        @media (max-width: 400px) {
          .marquee-content, .marquee-content-reverse {
            animation-duration: 25s;
          }
          
          .fixed-button {
            padding: 0.75rem 1.5rem;
            font-size: 1.125rem;
            min-width: 180px;
          }
        }
        
        /* Small devices (phones, 400px and up) */
        @media (min-width: 400px) and (max-width: 640px) {
          .marquee-content, .marquee-content-reverse {
            animation-duration: 22s;
          }
          
          .fixed-button {
            padding: 1rem 2rem;
            font-size: 1.25rem;
            min-width: 200px;
          }
        }
        
        /* Medium devices (tablets, 640px to 768px) */
        @media (min-width: 640px) and (max-width: 768px) {
          .marquee-content, .marquee-content-reverse {
            animation-duration: 18s;
          }
          
          .fixed-button {
            padding: 1.25rem 2.5rem;
            font-size: 1.5rem;
            min-width: 240px;
          }
        }
        
        /* Large devices (desktops, 768px and up) */
        @media (min-width: 768px) {
          .marquee-content, .marquee-content-reverse {
            animation-duration: 15s;
          }
          
          @keyframes pulse-button {
            0%, 100% {
              box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
            }
            50% {
              box-shadow: 0 0 60px rgba(255, 255, 255, 0.6);
            }
          }
        }
        
        /* Extra large devices (large desktops, 1280px and up) */
        @media (min-width: 1280px) {
          .marquee-content, .marquee-content-reverse {
            animation-duration: 12s;
          }
        }
        
        /* Prevent text selection on button */
        .fixed-button {
          user-select: none;
          -webkit-user-select: none;
        }
        
        /* Smooth transitions */
        * {
          transition: all 0.3s ease;
        }
        
        /* Touch-friendly button */
        @media (hover: none) and (pointer: coarse) {
          .fixed-button {
            padding: 1rem 2rem;
            min-height: 60px;
          }
          
          .fixed-button:active {
            transform: translate(-50%, -50%) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
};

export default Connect;