import React from "react";
import Navbar from "./Navbar";

function Home() {


  return (
    <div className="w-full max-h-screen lg:h-[120vh]  lg:py-4 lg:px-4 ">
      <div
        className="rounded-b-4xl lg:rounded-2xl w-full h-full  flex flex-col relative overflow-hidden bg-black"
       
      >
       

        {/* Transparent Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>
        
        {/* Three Column Layout */}
        <div className="flex flex-1 relative z-10 text-white ">
          {/* Left Column - 20% width */}
          <div className="w-[10%] flex items-center justify-center">
            <div className="text-white text-center">
              <p className="exo font-semibold text-lg">Left Section</p>
              <p className="text-sm mt-2">20% width</p>
            </div>
          </div>

          {/* Middle Column - 60% width */}
         <div className="w-[75%] flex flex-col justify-center items-center big">
  <div className=" w-full h-full flex flex-col">
    
    {/* Top Row - 40% height */}
    <div className="h-[40%] flex items-end justify-center pb-4 ">
      <h1 className="text-5xl md:text-9xl leading-tight md:leading-[4.5rem]  font-bold text-white drop-shadow-2xl">
       SHAPING THE
      </h1>
    </div>
    
    {/* Middle Row - 30% height */}
    <div className="h-[25%] flex items-center justify-center ">
       <h1 className="text-5xl md:text-9xl leading-tight lg:leading-[4.5rem]  font-bold text-white drop-shadow-2xl">
    FUTURE WITH
      </h1>
    </div>
    
    {/* Bottom Row - 30% height */}
    <div className="h-[35%] flex items-start justify-center pt-4">
      <h1 className="text-5xl md:text-9xl leading-tight lg:leading-[4.5rem]  font-bold text-white drop-shadow-2xl">
      SMART SOLUTIONS
      </h1>
    </div>
    
  </div>
</div>
          {/* Right Column - 20% width */}
         <div className="w-[15%] flex items-end justify-center pb-8">
  <div className="relative">
    {/* Simple Circular Text Rotate Button */}
    <button className="group w-20 h-20 rounded-full border border-gray-600/40 overflow-hidden relative hover:border-blue-500/50 transition-all duration-300 hover:scale-110">
      
      {/* Rotating Text Ring - "GET FREE CONSULTATION" */}
      <div className="absolute inset-0 animate-spin-slow opacity-80">
        <div className="relative w-full h-full">
          {/* Circularly arranged text for "GET FREE CONSULTATION" */}
          <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400 text-[7px] font-bold">•</span>
          <span className="absolute top-1/8 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">G</span>
          <span className="absolute top-1/4 left-[85%] transform -translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">E</span>
          <span className="absolute top-[38%] left-[90%] transform -translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">T</span>
          <span className="absolute top-1/2 left-[92%] transform -translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">F</span>
          <span className="absolute top-[62%] left-[90%] transform -translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">R</span>
          <span className="absolute top-3/4 left-[85%] transform -translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">E</span>
          <span className="absolute top-[87%] left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">E</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-blue-400 text-[7px] font-bold">•</span>
          <span className="absolute top-[87%] left-1/4 transform translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">C</span>
          <span className="absolute top-3/4 left-[15%] transform translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">O</span>
          <span className="absolute top-[62%] left-[10%] transform translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">N</span>
          <span className="absolute top-1/2 left-[8%] transform translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">S</span>
          <span className="absolute top-[38%] left-[10%] transform translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">U</span>
          <span className="absolute top-1/4 left-[15%] transform translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">L</span>
          <span className="absolute top-1/8 left-1/4 transform translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold">T</span>
        </div>
      </div>
      
      {/* Center Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
          <span className="text-white text-sm">✓</span>
        </div>
      </div>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-[8px] font-bold bg-black/50 px-1 py-0.5 rounded">FREE</span>
      </div>
    </button>
    
    {/* Label Below */}
    <div className="text-center mt-3">
      <p className="text-gray-300 text-xs font-medium">Consult Now</p>
    </div>
  </div>
</div>
        </div>

       
      </div>
    </div>
  );
}

export default Home;