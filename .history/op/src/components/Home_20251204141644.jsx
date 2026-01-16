import React from "react";
import Navbar from "./Navbar";

function Home() {
  return (
    <div className="w-full min-h-screen lg:h-[120vh] lg:py-4 lg:px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="rounded-b-4xl lg:rounded-2xl w-full h-full flex flex-col relative overflow-hidden">
        {/* Navbar */}
        <div className="relative z-20 px-4 pt-4">
          <Navbar isHomePage={true} />
        </div>
        
        {/* Main Content */}
        <div className="flex flex-1 relative z-10">
          {/* Left Column */}
          <div className="w-[10%] hidden lg:flex items-center justify-center">
            <div className="text-gray-800 text-center">
              <p className="exo font-semibold text-lg">Innovation</p>
              <p className="text-sm mt-2">Since 2020</p>
            </div>
          </div>

          {/* Middle Column */}
          <div className="w-full lg:w-[75%] flex flex-col justify-center items-center px-4">
            <div className="w-full h-full flex flex-col justify-center">
              {/* Top Row */}
              <div className="h-[40%] flex items-end justify-center pb-4">
                <h1 className="text-5xl md:text-7xl lg:text-9xl leading-tight font-bold text-gray-900 drop-shadow-lg">
                 SHAPING THE
                </h1>
              </div>
              
              {/* Middle Row */}
              <div className="h-[25%] flex items-center justify-center">
                <h1 className="text-5xl md:text-7xl lg:text-9xl leading-tight font-bold text-gray-900 drop-shadow-lg">
                  FUTURE WITH
                </h1>
              </div>
              
              {/* Bottom Row */}
              <div className="h-[35%] flex items-start justify-center pt-4">
                <h1 className="text-5xl md:text-7xl lg:text-9xl leading-tight font-bold text-gray-900 drop-shadow-lg">
                  SMART SOLUTIONS
                </h1>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-[15%] hidden lg:flex items-center justify-center">
            <div className="text-gray-800 text-center">
              <p className="exo font-semibold text-lg">Excellence</p>
              <p className="text-sm mt-2">Award Winning</p>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mr-40 -mb-40"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -ml-40 -mt-40"></div>
      </div>
    </div>
  );
}

export default Home;