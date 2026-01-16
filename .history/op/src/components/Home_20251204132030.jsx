import React from "react";
import Navbar from "./Navbar";

function Home() {
  // Single background image
  const backgroundImage = "/images/ma2.jpg";

  return (
    <div className="w-full max-h-screen lg:h-[120vh] bg-[#F6F7F9] lg:py-4 lg:px-4">
      <div
        className="rounded-b-4xl lg:rounded-2xl w-full h-full bg-cover bg-center bg-no-repeat flex flex-col relative overflow-hidden"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundColor: "#f0f0f0",
        }}
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
        <div className="flex flex-1 relative z-10 px-4 bg-red-300">
          {/* Left Column - 20% width */}
          <div className="w-1/5 flex items-center justify-center bg-white">
            <div className="text-white text-center">
              <p className="exo font-semibold text-lg">Left Section</p>
              <p className="text-sm mt-2">20% width</p>
            </div>
          </div>

          {/* Middle Column - 60% width */}
          <div className="w-3/5 flex flex-col justify-center items-center px-8">
            <div className="max-w-3xl w-full text-center">
             
             
             
            </div>
          </div>

          {/* Right Column - 20% width */}
          <div className="w-1/5 flex items-center justify-center bg-whi">
            <div className="text-white text-center">
              <p className="exo font-semibold text-lg">Right Section</p>
              <p className="text-sm mt-2">20% width</p>
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