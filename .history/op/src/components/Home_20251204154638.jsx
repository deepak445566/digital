import React from "react";
import Navbar from "./Navbar";
import CircularText from "./CircularText";


function Home() {
  return (
    <div className="w-full max-h-screen lg:h-[120vh] lg:py-4 lg:px-4">
      <div className="rounded-b-4xl lg:rounded-2xl w-full h-full flex flex-col relative overflow-hidden bg-black">
        {/* Transparent Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Three Column Layout */}
        <div className="flex flex-1 relative z-10 text-white">
          {/* Left Column - 10% width */}
          <div className="w-[10%] flex items-center justify-center ">
  <div className="text-white">
    <div className="flex flex-col items-center gap-8">
      {/* WhatsApp */}
      <a 
        href="https://wa.me/yournumber"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
          <i className="fab fa-whatsapp text-white text-3xl"></i>
        </div>
      </a>
      
      {/* Instagram */}
      <a 
        href="https://instagram.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="w-10 h-10 rounded-full  flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
          <i className="fab fa-instagram text-white text-3xl"></i>
        </div>
      </a>
      
      {/* Facebook */}
      <a 
        href="https://facebook.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="w-10 h-10 rounded-full  flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
          <i className="fab fa-facebook-f text-white text-3xl"></i>
        </div>
      </a>
      
      {/* YouTube - Fourth Icon */}
      <a 
        href="https://youtube.com/yourchannel"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="w-10 h-10 rounded-full  flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
          <i className="fab fa-youtube text-white text-3xl"></i>
        </div>
      </a>
    </div>
    
    {/* Vertical Line connecting icons */}
    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent transform -translate-x-1/2"></div>
  </div>
</div>

          {/* Middle Column - 75% width */}
          <div className="w-[75%] flex flex-col justify-center items-center big">
            <div className="w-full h-full flex flex-col">
              {/* Top Row - 40% height */}
              <div className="h-[40%] flex items-end justify-center pb-4">
                <h1 className="text-5xl md:text-9xl leading-tight md:leading-[4.5rem] font-bold text-white drop-shadow-2xl">
                  SHAPING THE
                </h1>
              </div>

              {/* Middle Row - 30% height */}
              <div className="h-[25%] flex items-center justify-center">
                <h1 className="text-5xl md:text-9xl leading-tight lg:leading-[4.5rem] font-bold text-white drop-shadow-2xl">
                  FUTURE WITH
                </h1>
              </div>

              {/* Bottom Row - 30% height */}
              <div className="h-[35%] flex items-start justify-center pt-4">
                <h1 className="text-5xl md:text-9xl leading-tight lg:leading-[4.5rem] font-bold text-white drop-shadow-2xl">
                  SMART SOLUTIONS
                </h1>
              </div>
            </div>
          </div>

          {/* Right Column - 15% width */}
          <div className="w-[15%] flex flex-col justify-center  ">
            {/* Vertical Circular Text */}
            <div className="relative h-full  ">
              <button className="">
              <CircularText
                text="INNOVATE • CREATE • DISRUPT • "
                spinDuration={30}
                onHover="speedUp"
                className="text-white/90  big font-light text-xs mt-55 "
              />
              </button>
              
              
              {/* Scroll indicator */}
            
            </div>
            
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;