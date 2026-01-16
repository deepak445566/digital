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
    <div className="h-[100vh] bg-black text-[#292929] overflow-hidden relative">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
      
      {/* Center Button - Positioned absolutely on top of everything */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="relative">
          {/* Button with glow effect */}
          <button className="relative px-20 py-10 bg-white text-black text-4xl font-black rounded-full hover:bg-gray-100 transition-all duration-300 uppercase tracking-widest z-50 border-4 border-white/30 shadow-2xl hover:shadow-white/40">
            LET'S CONNECT
            {/* Arrow indicator */}
            <span className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-white text-lg font-normal tracking-normal animate-bounce">
              ↓
            </span>
          </button>
          
          {/* Button glow effect */}
          <div className="absolute -inset-8 bg-white/20 rounded-full blur-2xl z-40 animate-pulse-slow"></div>
        </div>
      </div>

      {/* Top Marquee Section - Behind the button */}
      <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden">
        <div className="marquee-container h-full w-full">
          <div className="marquee-content h-full flex items-center">
            {[...Array(8)].map((_, index) => (
              <div key={`top-${index}`} className="inline-flex items-center h-full">
                <span className="text-[45vh] font-black tracking-tighter whitespace-nowrap mx-12 uppercase opacity-90">
                  {topText}
                </span>
                <span className="text-[20vh] mx-12 opacity-70">✦</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Overlay gradient at bottom of top section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      </div>

      {/* Bottom Marquee Section - Behind the button */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden">
        <div className="marquee-container-reverse h-full w-full">
          <div className="marquee-content-reverse h-full flex items-center">
            {[...Array(8)].map((_, index) => (
              <div key={`bottom-${index}`} className="inline-flex items-center h-full">
                <span className="text-[45vh] font-black tracking-tighter whitespace-nowrap mx-12 uppercase opacity-90">
                  {bottomText}
                </span>
                <span className="text-[20vh] mx-12 opacity-70">❖</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Overlay gradient at top of bottom section */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
      </div>

      {/* Decorative text elements like in reference image */}
      <div className="absolute top-8 left-8 z-30">
        <div className="text-white text-lg font-bold tracking-widest opacity-70">
          $ CONNECT
        </div>
      </div>
      
      <div className="absolute top-8 right-8 z-30">
        <div className="text-white text-lg font-bold tracking-widest opacity-70">
          AND L
        </div>
      </div>
      
      <div className="absolute bottom-8 left-8 z-30">
        <div className="text-white text-lg font-bold tracking-widest opacity-70">
          D LET
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8 z-30">
        <div className="text-white text-lg font-bold tracking-widest opacity-70">
          $ CONNECT
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
        
        /* Button glow animation */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        /* Bounce animation for arrow */
        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(10px);
          }
        }
        
        .animate-bounce {
          animation: bounce 1.5s ease-in-out infinite;
        }
        
        /* Button hover effects */
        button {
          transition: all 0.3s ease;
        }
        
        button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 60px rgba(255, 255, 255, 0.5);
        }
        
        /* Responsive adjustments */
        @media (max-width: 1024px) {
          button {
            padding: 16px 32px;
            font-size: 28px;
          }
          
          .marquee-content, .marquee-content-reverse {
            animation-duration: 25s;
          }
        }
        
        @media (max-width: 768px) {
          button {
            padding: 12px 24px;
            font-size: 22px;
          }
          
          .marquee-content, .marquee-content-reverse {
            animation-duration: 30s;
          }
        }
        
        @media (max-width: 480px) {
          button {
            padding: 10px 20px;
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default Connect;