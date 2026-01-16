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
    <div className="h-[100vh] bg-black text-[#292929] overflow-hidden">
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
        </div>

        {/* Middle Section with Button - 12vh height */}
        <div className="h-[12vh] relative z-100 flex items-center justify-center">
          {/* Center Button */}
          <button className="relative z-100 px-12 py-6 bg-white text-black text-2xl font-bold rounded-full hover:bg-gray-200 transition-all duration-300 shadow-2xl hover:shadow-white/50 transform hover:scale-105 uppercase tracking-wider">
            Connect Now
          </button>
        </div>

        {/* Bottom Section - 44% height with marquee */}
        <div className="h-[44vh] relative overflow-hidden">
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
        </div>
      </div>

      <style jsx>{`
        /* Marquee animation for top section */
        .marquee-container {
          overflow: hidden;
          position: relative;
        }
        
        .marquee-content {
          animation: marquee 15s linear infinite;
          white-space: nowrap;
        }
        
        /* Marquee animation for bottom section (reverse direction) */
        .marquee-container-reverse {
          overflow: hidden;
          position: relative;
        }
        
        .marquee-content-reverse {
          animation: marquee-reverse 15s linear infinite;
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
        
        /* Z-index for the button and middle section */
        .z-100 {
          z-index: 100;
        }
        
        /* Button animation */
        button {
          animation: pulse-button 2s ease-in-out infinite;
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
        }
        
        @keyframes pulse-button {
          0%, 100% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 60px rgba(255, 255, 255, 0.6);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .marquee-content, .marquee-content-reverse {
            animation-duration: 20s;
          }
          
          button {
            padding: 10px 20px;
            font-size: 18px;
          }
        }
        
        @media (max-width: 480px) {
          button {
            padding: 8px 16px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Connect;