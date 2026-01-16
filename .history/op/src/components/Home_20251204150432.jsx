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
    {/* Circular Text Button using your Component */}
    <div className="group relative">
      {/* Outer Container */}
      <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:scale-105">
        
        {/* Circular Text Component */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32">
            <CircularText 
              text="TOTAL • ANIMATOR • "
              spinDuration={25}
              onHover="slowDown"
              className="!h-32 !w-32"
            />
          </div>
        </div>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-gray-600/50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-blue-400 text-xs font-bold tracking-wider">TA</div>
                <div className="text-white text-[8px]">PRO</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 rounded-full bg-white/90 animate-pulse"></div>
          </div>
        </div>
        
        {/* Corner Dots */}
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-500/60"></div>
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-purple-500/60"></div>
        <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-blue-500/60"></div>
        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-purple-500/60"></div>
      </div>
      
      {/* Bottom Label */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-300 text-sm font-bold tracking-wider">ANIMATOR</p>
        <p className="text-gray-500 text-xs">Professional Tools</p>
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