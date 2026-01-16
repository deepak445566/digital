import React from "react";
import Navbar from "./Navbar";

function Home() {
  return (
    <div className="w-full max-h-screen lg:h-[120vh] bg-[#F6F7F9] lg:py-4 lg:px-4">
      <div
        className="rounded-b-4xl lg:rounded-2xl w-full h-full flex flex-col relative overflow-hidden bg-[#f0f0f0]"
      >
        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-0"></div>
        
        {/* Additional Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 z-0"></div>

        {/* Transparent Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>
        
        {/* Three Column Layout */}
        <div className="flex flex-1 relative z-10">
          {/* Left Column - 10% width */}
          <div className="w-[10%] flex items-center justify-center bg-white">
            <div className="text-center">
              <p className="exo font-semibold text-lg">Left Section</p>
              <p className="text-sm mt-2">10% width</p>
            </div>
          </div>

          {/* Middle Column - 75% width */}
          <div className="w-[75%] flex flex-col justify-center items-center">
            <div className="w-full h-full flex flex-col">
              
              {/* Top Row - 40% height */}
              <div className="h-[40%] flex items-end justify-center pb-4">
                <h1 className="text-5xl md:text-9xl leading-tight md:leading-[4.5rem] font-bold text-black drop-shadow-2xl">
                  SHAPING THE
                </h1>
              </div>
              
              {/* Middle Row - 25% height */}
              <div className="h-[25%] flex items-center justify-center">
                <h1 className="text-5xl md:text-9xl leading-tight lg:leading-[4.5rem] font-bold text-black drop-shadow-2xl">
                  FUTURE WITH
                </h1>
              </div>
              
              {/* Bottom Row - 35% height */}
              <div className="h-[35%] flex items-start justify-center pt-4">
                <h1 className="text-5xl md:text-9xl leading-tight lg:leading-[4.5rem] font-bold text-black drop-shadow-2xl">
                  SMART SOLUTIONS
                </h1>
              </div>
              
            </div>
          </div>

          {/* Right Column - 15% width */}
          <div className="w-[15%] flex items-center justify-center bg-white">
            <div className="text-center">
              <p className="exo font-semibold text-lg">Right Section</p>
              <p className="text-sm mt-2">15% width</p>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent z-0"></div>
      </div>
    </div>
  );
}

export default Home;