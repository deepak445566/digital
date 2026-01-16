import React, { useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { gsap } from "gsap";

function Home() {
  const circularTextRef = useRef(null);

  useEffect(() => {
    if (!circularTextRef.current) return;

    const text = circularTextRef.current;
    const originalText = text.textContent || "CONTACT US • CONTACT US • ";
    text.textContent = "";

    // Create individual letter spans
    for (let i = 0; i < originalText.length; i++) {
      const span = document.createElement("span");
      span.textContent = originalText[i];
      span.style.position = "absolute";
      span.style.transformOrigin = "center";
      span.style.left = "50%";
      span.style.top = "50%";
      
      // Calculate angle for each character
      const angle = (i * 360) / originalText.length;
      span.style.transform = `
        translate(-50%, -50%) 
        rotate(${angle}deg) 
        translateY(-80px) 
        rotate(${-angle}deg)
      `;
      
      span.style.transformOrigin = "0 80px";
      text.appendChild(span);
    }

    // GSAP animation
    gsap.to(text, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });

    return () => {
      gsap.killTweensOf(text);
    };
  }, []);

  return (
    <div className="w-full max-h-screen lg:h-[120vh] lg:py-4 lg:px-4">
      <div className="rounded-b-4xl lg:rounded-2xl w-full h-full flex flex-col relative overflow-hidden bg-black">
        {/* Transparent Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Three Column Layout */}
        <div className="flex flex-1 relative z-10 text-white">
          {/* Left Column - 20% width */}
          <div className="w-[10%] flex items-center justify-center">
            <div className="text-white text-center">
              <p className="exo font-semibold text-lg">Left Section</p>
              <p className="text-sm mt-2">20% width</p>
            </div>
          </div>

          {/* Middle Column - 60% width */}
          <div className="w-[75%] flex flex-col justify-center items-center big">
            <div className="w-full h-full flex flex-col">
              {/* Top Row - 40% height */}
              <div className="h-[40%] flex items-end justify-center pb-4">
                <h1 className="text-5xl md:text-9xl leading-tight md:leading-[4.5rem] font-bold text-white drop-shadow-2xl">
                  SHAPING THE
                </h1>
              </div>

              {/* Middle Row - 30% height */}
              <div className="h-[25%] flex items-center justify-center">
                <h1 className="text-5xl md:text-9xl leading-tight lg:leading-[4.5rem] font-bold text-white drop-shadow-2xl">
                  FUTURE WITH
                </h1>
              </div>

              {/* Bottom Row - 30% height */}
              <div className="h-[35%] flex items-start justify-center pt-4">
                <h1 className="text-5xl md:text-9xl leading-tight lg:leading-[4.5rem] font-bold text-white drop-shadow-2xl">
                  SMART SOLUTIONS
                </h1>
              </div>
            </div>
          </div>

          {/* Right Column - Circular Text */}
          <div className="w-[15%] flex items-center justify-center relative">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Circular Text Container */}
              <div className="relative w-32 h-32">
                <div
                  ref={circularTextRef}
                  className="absolute inset-0 text-white text-sm font-semibold exo"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%"
                  }}
                >
                  CONTACT US • CONTACT US • 
                </div>
                
                {/* Center Dot or Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <span className="text-white text-xs font-bold exo">CLICK</span>
                  </div>
                </div>
              </div>
              
              {/* Optional: Additional decorative elements */}
              <div className="absolute inset-0 border border-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;