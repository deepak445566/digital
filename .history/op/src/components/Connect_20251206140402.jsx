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
     
      ];
      
      const bottomOptions = [
        'Let\'s Connect • Follow Us • Stay in Touch • Join Our Community • ',
        'Contact Us • Get in Touch • Collaborate • Share Ideas • ',
        'Social Media • Networking • Partnerships • Opportunities • '
      ];
      
      const randomTopIndex = Math.floor(Math.random() * topOptions.length);
      const randomBottomIndex = Math.floor(Math.random() * bottomOptions.length);
      
      setTopText(topOptions[randomTopIndex]);
      setBottomText(bottomOptions[randomBottomIndex]);
    }, 8000); // Change text every 8 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg- overflow-hidden">
      <div className="h-screen flex flex-col">
        {/* Top Section - 50% height with marquee */}
        <div className="h-[40vh] relative overflow-hidden bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
          </div>
          
          {/* Marquee container - takes full height of section */}
          <div className="h-full flex items-center">
            <div className="marquee-container h-full w-full py-4">
              <div className="marquee-content h-full flex items-center">
                {/* We'll repeat the text multiple times for seamless loop */}
                {[...Array(6)].map((_, index) => (
                  <div key={`top-${index}`} className="inline-flex items-center h-full">
                    <span className="text-7xl md:text-8xl lg:text-[40vh] font-bold tracking-tighter whitespace-nowrap mx-8">
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
        <div className="h-[40vh] relative overflow-hidden bg-gradient-to-r from-emerald-900/30 to-cyan-900/30">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
          </div>
          
          {/* Marquee container - takes full height of section */}
          <div className="h-full flex items-center">
            <div className="marquee-container-reverse h-full w-full py-4">
              <div className="marquee-content-reverse h-full flex items-center">
                {/* We'll repeat the text multiple times for seamless loop */}
                {[...Array(6)].map((_, index) => (
                  <div key={`bottom-${index}`} className="inline-flex items-center h-full">
                    <span className="text-7xl md:text-8xl lg:text-[40vh] font-bold tracking-tighter whitespace-nowrap mx-8">
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
          
          {/* Connect button */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-full shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300 animate-pulse-slow">
              CONNECT NOW
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm p-4 rounded-lg max-w-xs">
        <p className="text-sm text-gray-300">
          This page has an 80vh height container with two 50% sections. Each section has a full-height marquee text that scrolls infinitely.
        </p>
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