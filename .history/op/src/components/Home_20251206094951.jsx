import React from "react";
import Navbar from "./Navbar";
import CircularText from "./CircularText";

function Home() {
  return (
    <div className="w-full h-screen lg:h-[100vh] lg:py-4 lg:px-4">
      <div className="rounded-b-4xl lg:rounded-2xl w-full h-full flex flex-col relative overflow-hidden bg-black">
        {/* Transparent Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Three Column Layout */}
        <div className="flex flex-1 relative z-10 text-white flex-col lg:flex-row">
          {/* Left Column - Social Icons */}
          <div className="w-full lg:w-[10%] py-4 lg:py-0 lg:h-full flex lg:flex-col items-center justify-center lg:justify-start lg:pt-20">
            <div className="flex flex-row lg:flex-col items-center gap-6 lg:gap-8">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/yournumber"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
                  <i className="fab fa-whatsapp text-white text-xl lg:text-2xl"></i>
                </div>
              </a>
              
              {/* Instagram */}
              <a 
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
                  <i className="fab fa-instagram text-white text-xl lg:text-2xl"></i>
                </div>
              </a>
              
              {/* Facebook */}
              <a 
                href="https://facebook.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
                  <i className="fab fa-facebook-f text-white text-xl lg:text-2xl"></i>
                </div>
              </a>
              
              {/* YouTube - Fourth Icon */}
              <a 
                href="https://youtube.com/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
                  <i className="fab fa-youtube text-white text-xl lg:text-2xl"></i>
                </div>
              </a>
            </div>
            
            {/* Vertical Line connecting icons - Only on desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent transform -translate-x-1/2"></div>
          </div>

          {/* Middle Column - Main Content */}
          <div className="w-full lg:w-[75%] h-full flex items-center justify-center">
            <div className="w-full h-full flex flex-col items-center justify-center px-4 lg:px-0">
              {/* Top Row */}
              <div className="h-1/3 flex items-end justify-center pb-4 lg:pb-8 w-full">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white text-center drop-shadow-2xl leading-tight lg:leading-[4.5rem]">
                  SHAPING THE
                </h1>
              </div>

              {/* Middle Row */}
              <div className="h-1/3 flex items-center justify-center w-full">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white text-center drop-shadow-2xl leading-tight lg:leading-[4.5rem]">
                  FUTURE WITH
                </h1>
              </div>

              {/* Bottom Row */}
              <div className="h-1/3 flex items-start justify-center pt-4 lg:pt-8 w-full">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white text-center drop-shadow-2xl leading-tight lg:leading-[4.5rem]">
                  SMART SOLUTIONS
                </h1>
              </div>
            </div>
          </div>

          {/* Right Column - Circular Text (Hidden on mobile) */}
          <div className="hidden lg:flex lg:w-[15%] h-full flex-col items-center justify-center">
            <div className="relative h-full flex items-center justify-center">
              <button className="focus:outline-none">
                <CircularText
                  text="INNOVATE • CREATE • DISRUPT • "
                  spinDuration={30}
                  onHover="speedUp"
                  className="text-white/90 font-light text-xs"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Scroll Indicator (Optional) */}
        <div className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;