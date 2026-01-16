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
          <div className="w-[10%] flex items-center justify-center">
  <div className="text-white text-center">
    {/* Social Media Icons - White Version */}
    <div className="flex flex-col items-center gap-6">
      {/* WhatsApp */}
      <a 
        href="https://wa.me/yournumber" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative"
      >
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/30 group-hover:shadow-lg">
          <i className="fab fa-whatsapp text-lg text-white"></i>
        </div>
        <span className="absolute left-full ml-3 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          WhatsApp
        </span>
      </a>
      
      {/* Instagram */}
      <a 
        href="https://instagram.com/yourprofile" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative"
      >
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/30 group-hover:shadow-lg">
          <i className="fab fa-instagram text-lg text-white"></i>
        </div>
        <span className="absolute left-full ml-3 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Instagram
        </span>
      </a>
      
      {/* Facebook */}
      <a 
        href="https://facebook.com/yourprofile" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative"
      >
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/30 group-hover:shadow-lg">
          <i className="fab fa-facebook-f text-lg text-white"></i>
        </div>
        <span className="absolute left-full ml-3 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Facebook
        </span>
      </a>
      
      {/* Fourth Icon - LinkedIn */}
      <a 
        href="https://linkedin.com/in/yourprofile" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative"
      >
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/30 group-hover:shadow-lg">
          <i className="fab fa-linkedin-in text-lg text-white"></i>
        </div>
        <span className="absolute left-full ml-3 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          LinkedIn
        </span>
      </a>
    </div>
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