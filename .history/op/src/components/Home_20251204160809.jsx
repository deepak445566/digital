import React from "react";
import Navbar from "./Navbar";
import CircularText from "./CircularText";

function Home() {
  return (
    <div className="w-full h-[100vh] lg:py-4 lg:px-4">
      <div className="rounded-b-4xl lg:rounded-2xl w-full h-full flex flex-col relative overflow-hidden bg-black">
        {/* Transparent Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Three Column Layout */}
        <div className="flex flex-1 relative z-10 text-white flex-col-reverse lg:flex-row">
          {/* Left Column - Social Icons (Mobile में ऊपर, Desktop में left) */}
          <div className="lg:w-[8%] w-full lg:py-0 py-6 flex lg:items-center lg:justify-center justify-center">
            <div className="text-white lg:mt-20 mt-0 relative">
              <div className="flex lg:flex-col flex-row items-center gap-8">
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/yournumber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
                    <i className="fab fa-whatsapp text-white text-2xl"></i>
                  </div>
                </a>
                
                {/* Instagram */}
                <a 
                  href="https://instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
                    <i className="fab fa-instagram text-white text-2xl"></i>
                  </div>
                </a>
                
                {/* Facebook */}
                <a 
                  href="https://facebook.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
                    <i className="fab fa-facebook-f text-white text-2xl"></i>
                  </div>
                </a>
                
                {/* YouTube - Fourth Icon */}
                <a 
                  href="https://youtube.com/yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
                    <i className="fab fa-youtube text-white text-2xl"></i>
                  </div>
                </a>
              </div>
              
              {/* Vertical Line (Desktop only) */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent transform -translate-x-1/2"></div>
              
              {/* Horizontal Line (Mobile only) */}
              <div className="lg:hidden absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          </div>

          {/* Middle Column - Main Content */}
          <div className="lg:w-[77%] w-full flex flex-col justify-center items-center px-4 lg:px-0">
            <div className="w-full h-full flex flex-col justify-center">
              {/* Top Row */}
              <div className="lg:h-[40%] h-auto flex items-end justify-center lg:pb-4 pb-2">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-center leading-tight lg:leading-[4.5rem] font-bold text-white drop-shadow-2xl">
                  SHAPING THE
                </h1>
              </div>

              {/* Middle Row */}
              <div className="lg:h-[25%] h-auto flex items-center justify-center lg:py-0 py-2">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-center leading-tight lg:leading-[4.5rem] font-bold text-white drop-shadow-2xl">
                  FUTURE WITH
                </h1>
              </div>

              {/* Bottom Row */}
              <div className="lg:h-[35%] h-auto flex items-start justify-center lg:pt-4 pt-2">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-center leading-tight lg:leading-[4.5rem] font-bold text-white drop-shadow-2xl">
                  SMART SOLUTIONS
                </h1>
              </div>
            </div>
          </div>

          {/* Right Column - Circular Text (Mobile में hidden) */}
          <div className="lg:w-[15%] hidden lg:flex flex-col justify-center">
            <div className="relative h-full">
              <button className="">
                <CircularText
                  text="INNOVATE • CREATE • DISRUPT • "
                  spinDuration={30}
                  onHover="speedUp"
                  className="text-white/90 big font-light text-xs"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;