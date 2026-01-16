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
          <div className="w-[15%] flex flex-col items-center justify-center">
  {/* Circular Text Animation Button */}
  <div className="mt-auto mb-20">
    <button className="group relative w-32 h-32 rounded-full bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 hover:border-blue-500/30 transition-all duration-500 hover:scale-110 overflow-hidden">
      {/* Animated Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin-slow opacity-50"></div>
      
      {/* Circular Text Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-28 h-28 rounded-full overflow-hidden">
          {/* Rotating Text */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-white text-xs font-bold absolute" style={{transform: 'rotate(0deg) translateY(-42px)'}}>•</span>
              <span className="text-white text-xs font-bold absolute" style={{transform: 'rotate(45deg) translateY(-42px)'}}>GET</span>
              <span className="text-white text-xs font-bold absolute" style={{transform: 'rotate(90deg) translateY(-42px)'}}>IN</span>
              <span className="text-white text-xs font-bold absolute" style={{transform: 'rotate(135deg) translateY(-42px)'}}>TOUCH</span>
              <span className="text-white text-xs font-bold absolute" style={{transform: 'rotate(180deg) translateY(-42px)'}}>•</span>
              <span className="text-white text-xs font-bold absolute" style={{transform: 'rotate(225deg) translateY(-42px)'}}>CONTACT</span>
              <span className="text-white text-xs font-bold absolute" style={{transform: 'rotate(270deg) translateY(-42px)'}}>US</span>
              <span className="text-white text-xs font-bold absolute" style={{transform: 'rotate(315deg) translateY(-42px)'}}>•</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Center Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-500 group-hover:scale-110">
          <span className="text-white text-xl font-bold transform group-hover:rotate-45 transition-transform duration-500">
            ↓
          </span>
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
    </button>
    
    {/* Label */}
    <div className="text-center mt-4">
      <p className="text-gray-400 text-sm font-medium">Get in Touch</p>
      <p className="text-gray-500 text-xs">Circular Button</p>
    </div>
  </div>
</div>
        </div>

       
      </div>
    </div>
  );
}

export default Home;