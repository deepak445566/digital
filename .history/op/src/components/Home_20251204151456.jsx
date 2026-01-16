import React from "react";
import Navbar from "./Navbar";


function Home() {
  return (
    <div className="w-full max-h-screen lg:h-[120vh] lg:py-4 lg:px-4">
      <div className="rounded-b-4xl lg:rounded-2xl w-full h-full flex flex-col relative overflow-hidden bg-black">
        {/* Transparent Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Three Column Layout */}
        <div className="flex flex-1 relative z-10 text-white">
          {/* Left Column - 10% width */}
          <div className="w-[10%] flex items-center justify-center">
            <div className="text-white text-center">
              <p className="exo font-semibold text-lg">Left Section</p>
              <p className="text-sm mt-2">10% width</p>
            </div>
          </div>

          {/* Middle Column - 75% width */}
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

          {/* Right Column - 15% width */}
          <div className="w-[15%] flex flex-col items-center justify-center">
            {/* Vertical Circular Text */}
            <div className="relative h-full flex items-center justify-center">
              <CircularText
                text="INNOVATE • CREATE • DISRUPT • "
                spinDuration={30}
                onHover="speedUp"
                className="text-white/90 text-sm"
              />
              
              {/* Optional: Vertical text lines */}
              <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
              
              {/* Scroll indicator */}
              <div className="absolute bottom-8 flex flex-col items-center">
                <span className="text-xs text-white/60 mb-2">SCROLL</span>
                <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
              </div>
            </div>
            
            {/* Social Icons or Other Content */}
            <div className="absolute bottom-10 right-10 flex flex-col items-center gap-4">
              <div className="flex flex-col gap-3">
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <i className="fab fa-linkedin text-lg"></i>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <i className="fab fa-twitter text-lg"></i>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <i className="fab fa-github text-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;