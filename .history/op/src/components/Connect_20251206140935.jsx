import React, { useState, useEffect } from 'react';

const Connect = () => {
  // State for the top marquee text
  const [topText, setTopText] = useState('Let\'s Connect • Let\'s Connect •Let\'s Connect •Let\'s Connect •Let\'s Connect •Let\'s Connect •Let\'s Connect •');
  
  // State for the bottom marquee text
  const [bottomText, setBottomText] = useState('Let\'s Connect • Let\'s Connect •Let\'s Connect •Let\'s Connect •Let\'s Connect •Let\'s Connect •Let\'s Connect •');

  // Effect to update marquee text periodically (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate through different text options
      const topOptions = [
     'Let\'s Connect • Let\'s Connect •Let\'s Connect •Let\'s Connect •Let\'s Connect •Let\'s Connect •Let\'s Connect •'
      ];
      
      const bottomOptions = [
       'Let\'s Connect • Let\'s Connect •Let\'s Connect •Let\'s Connect •Let\'s Connect •Let\'s Connect •Let\'s Connect •'
      ];
      
      const randomTopIndex = Math.floor(Math.random() * topOptions.length);
      const randomBottomIndex = Math.floor(Math.random() * bottomOptions.length);
      
      setTopText(topOptions[randomTopIndex]);
      setBottomText(bottomOptions[randomBottomIndex]);
    }, 10000); // Change text every 8 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[100vh] bg-black text-gray-500 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Top Section - 50% height with marquee */}
        <div className="h-[44vh] relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64  rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64  rounded-full blur-3xl"></div>
          </div>
          
          {/* Marquee container - takes full height of section */}
          <div className="h-full flex items-center">
            <div className="marquee-container h-full w-full py-4">
              <div className="marquee-content h-full flex items-center">
                {/* We'll repeat the text multiple times for seamless loop */}
                {[...Array(6)].map((_, index) => (
                  <div key={`top-${index}`} className="inline-flex items-center h-full">
                    <span className="text-7xl md:text-8xl lg:text-[50vh] big  font-extrabold tracking-tighter whitespace-nowrap mx-8 uppercase">
                      {topText}
                    </span>
                    {/* Separator icon */}
                    <span className="text-6xl mx-8">✦</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Section label */}
          <div className="absolute top-4 left-4 text-sm font-medium tracking-wider opacity-70">
            TOP SECTION
          </div>
        </div>

        {/* Bottom Section - 50% height with marquee */}
        <div className="h-[44vh] relative overflow-hidden ">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full blur-3xl"></div>
          </div>
          
          {/* Marquee container - takes full height of section */}
          <div className="h-full flex items-center">
            <div className="marquee-container-reverse h-full w-full py-4">
              <div className="marquee-content-reverse h-full flex items-center">
                {/* We'll repeat the text multiple times for seamless loop */}
                {[...Array(6)].map((_, index) => (
                  <div key={`bottom-${index}`} className="inline-flex items-center h-full">
                    <span className="text-7xl md:text-8xl lg:text-[50vh] big uppercase font-bold tracking-tighter whitespace-nowrap mx-8">
                      {bottomText}
                    </span>
                    {/* Separator icon */}
                    <span className="text-6xl mx-8">❖</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Section label */}
          <div className="absolute bottom-4 right-4 text-sm font-medium tracking-wider opacity-70">
            BOTTOM SECTION
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
          animation: marquee 30s linear infinite;
          white-space: nowrap;
        }
        
        /* Marquee animation for bottom section (reverse direction) */
        .marquee-container-reverse {
          overflow: hidden;
          position: relative;
        }
        
        .marquee-content-reverse {
          animation: marquee-reverse 25s linear infinite;
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
        
        /* Slow pulse animation for button */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .marquee-content, .marquee-content-reverse {
            animation-duration: 20s;
          }
        }
      `}</style>
    </div>
  );
};

export default Connect;