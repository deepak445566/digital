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
          <div className="w-[15%] flex flex-col items-center justify-center relative">
  {/* Circular Text Animation Button - Bottom Center */}
  <div className="absolute bottom-10">
    <div className="relative group cursor-pointer">
      {/* Outer Ring with Animated Border */}
      <div className="relative w-40 h-40 rounded-full border-2 border-gray-700/50 hover:border-blue-500/30 transition-all duration-500 group-hover:scale-110 group-hover:border-blue-500/50">
        {/* Animated Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-purple-500 animate-spin-slow"></div>
        
        {/* Rotating Text Circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Circular Text Path */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <path
                  id="textCircle"
                  d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="fill-white text-xs font-bold">
                <textPath
                  href="#textCircle"
                  startOffset="0%"
                  className="animate-rotate-text"
                >
                  • GET IN TOUCH • CONTACT US • LET'S TALK • 
                </textPath>
              </text>
            </svg>
          </div>
        </div>
        
        {/* Center Circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-500 group-hover:scale-105 shadow-lg group-hover:shadow-xl">
            <div className="relative">
              {/* Pulsing Effect */}
              <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
              {/* Main Icon */}
              <span className="relative text-white font-bold text-lg">
                → 
              </span>
            </div>
          </div>
        </div>
        
        {/* Floating Dots */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400 animate-float"></div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400 animate-float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-purple-400 animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Tooltip on Hover */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-gray-900/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-gray-700">
          Click to contact us
        </div>
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