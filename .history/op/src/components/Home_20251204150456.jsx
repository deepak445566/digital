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
    {/* Simple Circular Text Only */}
    <div className="relative w-24 h-24 rounded-full border border-gray-700/50 overflow-hidden hover:border-blue-500/40 transition-all duration-300">
      <CircularText 
        text="•TOTAL ANIMATOR•"
        spinDuration={30}
        onHover="pause"
        className="!h-24 !w-24"
      />
      
      {/* Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-gray-800/80 border border-gray-600/50 flex items-center justify-center">
          <span className="text-white text-sm font-bold">✱</span>
        </div>
      </div>
    </div>
    
    <div className="text-center mt-3">
      <p className="text-gray-300 text-xs">Animation Studio</p>
    </div>
  </div>
</div>
        </div>

       
      </div>
    </div>
  );
}

export default Home;