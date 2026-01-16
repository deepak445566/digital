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
    {/* Circular Text Button with Asterisk */}
    <div className="group relative cursor-pointer">
      {/* Main Circle */}
      <div className="relative w-36 h-36 rounded-full border-2 border-gray-800/70 bg-gradient-to-br from-gray-900 to-black overflow-hidden hover:border-blue-700/40 transition-all duration-700 hover:scale-110 shadow-2xl">
        
        {/* Animated Ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-600/60 border-r-purple-600/60 animate-spin-slow opacity-70"></div>
        
        {/* Circular Text Rotation - "TOTAL*ANIMATOR" */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="relative w-full h-full">
            {/* T O T A L * */}
            <span className="absolute top-3 left-1/2 transform -translate-x-1/2 text-blue-400 text-sm font-bold">T</span>
            <span className="absolute top-8 left-[65%] text-white text-sm font-bold">O</span>
            <span className="absolute top-14 left-[75%] text-white text-sm font-bold">T</span>
            <span className="absolute top-20 left-[80%] text-white text-sm font-bold">A</span>
            <span className="absolute top-26 left-[75%] text-white text-sm font-bold">L</span>
            <span className="absolute top-30 left-[65%] text-blue-500 text-lg font-bold">*</span>
            
            {/* A N I M A T O R */}
            <span className="absolute top-30 left-[35%] text-white text-sm font-bold">A</span>
            <span className="absolute top-26 left-[25%] text-white text-sm font-bold">N</span>
            <span className="absolute top-20 left-[20%] text-white text-sm font-bold">I</span>
            <span className="absolute top-14 left-[25%] text-white text-sm font-bold">M</span>
            <span className="absolute top-8 left-[35%] text-white text-sm font-bold">A</span>
            <span className="absolute top-3 left-[45%] text-white text-sm font-bold">T</span>
            <span className="absolute top-8 left-[55%] text-white text-sm font-bold">O</span>
            <span className="absolute top-14 left-[60%] text-white text-sm font-bold">R</span>
          </div>
        </div>
        
        {/* Center Design */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 flex items-center justify-center">
            {/* Inner Rings */}
            <div className="absolute inset-0 rounded-full border border-gray-600/30 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full border border-gray-500/20"></div>
            
            {/* Center Text */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center shadow-inner">
              <div className="text-center">
                <div className="text-blue-400 text-xs font-bold tracking-widest">TOTAL</div>
                <div className="text-purple-400 text-xs font-bold tracking-widest">ANIMATOR</div>
              </div>
            </div>
            
            {/* Center Dot with Asterisk */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-bold">*</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-blue-500 animate-ping"></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-purple-500 animate-ping" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      {/* Bottom Label */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-300 text-sm font-bold tracking-wider">TOTAL ANIMATOR</p>
        <p className="text-gray-500 text-xs">Premium Animation</p>
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