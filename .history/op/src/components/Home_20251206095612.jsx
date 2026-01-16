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

        {/* Main Content Area - Center content on mobile */}
        <div className="flex-1 flex flex-col lg:flex-row relative z-10">
          {/* Desktop: Left Column - Social Icons */}
          <div className="hidden lg:flex lg:w-[10%] h-full flex-col items-center justify-start pt-30">
            <div className="flex flex-col items-center gap-8">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/yournumber"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:trans">
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
              
              {/* YouTube */}
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
            
            {/* Vertical Line connecting icons */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent transform -translate-x-1/2"></div>
          </div>

          {/* Middle Column - Main Content (Centered on mobile) */}
          <div className="flex-1 flex items-center justify-center px-4 lg:px-0 big">
            <div className="w-full max-w-6xl">
              <div className="flex flex-col items-center justify-center h-full">
                {/* Top Text */}
                <div className="h-1/3 flex items-end justify-center  lg:pb-8 w-full">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl  font-bold text-white text-center drop-shadow-2xl leading-tight lg:leading-[4.5rem]">
                    SHAPING THE
                  </h1>
                </div>

                {/* Middle Text */}
                <div className="h-1/3 flex items-center justify-center w-full">
                  <h1 className="text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-white text-center drop-shadow-2xl leading-tight lg:leading-[5rem]">
                    FUTURE WITH
                  </h1>
                </div>

                {/* Bottom Text */}
                <div className="h-1/3 flex items-start justify-center  lg:pt-8 w-full">
                  <h1 className="text-5xl md:text-6xl lg:text-8xl xl:text-9xl  font-bold text-white text-center drop-shadow-2xl leading-tight lg:leading-[5.0rem]">
                    SMART SOLUTIONS
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Right Column - Circular Text */}
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

        {/* Mobile: Social Icons at Bottom */}
        <div className="lg:hidden py-6 flex items-center justify-center">
          <div className="flex flex-row items-center gap-8">
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
            
            {/* YouTube */}
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
        </div>
      </div>
    </div>
  );
}

export default Home;