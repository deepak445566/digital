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
  {/* Simple Circular Text Rotate Button */}
  <div className="relative">
    {/* Circular Text Container */}
    <div className="w-24 h-24 rounded-full border border-gray-700/50 overflow-hidden relative group cursor-pointer hover:border-blue-500/50 transition-all duration-500">
      
      {/* Rotating Text Circle */}
      <div className="absolute inset-0 animate-spin-slow">
        {/* Text arranged in circle */}
        <div className="relative w-full h-full">
          <span className="text-white text-[10px] font-bold absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">•</span>
          <span className="text-white text-[10px] font-bold absolute top-1/4 left-full transform -translate-x-1/2 -translate-y-1/2">C</span>
          <span className="text-white text-[10px] font-bold absolute top-1/2 left-full transform -translate-x-1/2 -translate-y-1/2">O</span>
          <span className="text-white text-[10px] font-bold absolute top-3/4 left-full transform -translate-x-1/2 -translate-y-1/2">N</span>
          <span className="text-white text-[10px] font-bold absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">•</span>
          <span className="text-white text-[10px] font-bold absolute top-3/4 left-0 transform translate-x-1/2 -translate-y-1/2">T</span>
          <span className="text-white text-[10px] font-bold absolute top-1/2 left-0 transform translate-x-1/2 -translate-y-1/2">A</span>
          <span className="text-white text-[10px] font-bold absolute top-1/4 left-0 transform translate-x-1/2 -translate-y-1/2">C</span>
        </div>
      </div>
      
      {/* Center Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
          <span className="text-white font-bold text-lg">→</span>
        </div>
      </div>
    </div>
    
    {/* Label Below */}
    <div className="text-center mt-4">
      <p className="text-gray-400 text-sm">Click Here</p>
    </div>
  </div>
</div>
        </div>

       
      </div>
    </div>
  );
}

export default Home;