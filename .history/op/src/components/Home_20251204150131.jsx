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
         <div className="w-[15%] flex items-end justify-center pb-12">
  <div className="relative">
    {/* Professional Circular Text Button */}
    <div className="group relative cursor-pointer">
      {/* Outer Circle Container */}
      <div className="relative w-32 h-32 rounded-full border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm overflow-hidden hover:border-blue-600/30 transition-all duration-500 hover:scale-105 shadow-xl">
        
        {/* Animated Border Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500/50 border-r-purple-500/50 animate-spin-slow"></div>
        
        {/* Circular Rotating Text - "TOTAL ANIMATOR" */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="relative w-full h-full">
            {/* T O T A L */}
            <span className="absolute top-2 left-1/2 transform -translate-x-1/2 text-blue-400 text-xs font-bold">T</span>
            <span className="absolute top-6 left-[70%] text-white text-xs font-bold">O</span>
            <span className="absolute top-12 left-[80%] text-white text-xs font-bold">T</span>
            <span className="absolute top-18 left-[85%] text-white text-xs font-bold">A</span>
            <span className="absolute top-24 left-[80%] text-white text-xs font-bold">L</span>
            
            {/* A N I M A T O R */}
            <span className="absolute top-24 left-[20%] text-white text-xs font-bold">A</span>
            <span className="absolute top-18 left-[15%] text-white text-xs font-bold">N</span>
            <span className="absolute top-12 left-[10%] text-white text-xs font-bold">I</span>
            <span className="absolute top-6 left-[15%] text-white text-xs font-bold">M</span>
            <span className="absolute top-2 left-[25%] text-white text-xs font-bold">A</span>
            <span className="absolute top-6 left-[35%] text-white text-xs font-bold">T</span>
            <span className="absolute top-12 left-[40%] text-white text-xs font-bold">O</span>
            <span className="absolute top-18 left-[35%] text-white text-xs font-bold">R</span>
          </div>
        </div>
        
        {/* Center Professional Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-gray-700/50 flex items-center justify-center group-hover:from-blue-900/40 group-hover:to-purple-900/40 transition-all duration-500">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 to-black border border-gray-700 flex items-center justify-center shadow-inner">
              <span className="text-white text-2xl font-bold tracking-tighter">TA</span>
            </div>
          </div>
        </div>
        
        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
            <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
          </div>
        </div>
        
        {/* Corner Accents */}
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-500/50"></div>
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-purple-500/50"></div>
        <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-blue-500/50"></div>
        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-purple-500/50"></div>
      </div>
      
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      
      {/* Tooltip/Label */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-400 text-xs font-medium tracking-wider">TOTAL ANIMATOR</p>
        <p className="text-gray-500 text-[10px]">Professional Solutions</p>
      </div>
    </div>
  </div>
</div>
        </div>

       
      </div>
    </div>
  );
}

export default Home;