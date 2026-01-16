import React from "react";
import Navbar from "./Navbar";
import CircularText from "./CircularText";

function Home() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {/* Navbar */}
      <div className="relative z-20 px-4 lg:px-8 pt-4">
        <Navbar isHomePage={true} />
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="flex h-[calc(100vh-80px)] w-full px-4 lg:px-8">
        
        {/* Left Column - Social Media Icons (10%) */}
        <div className="hidden lg:flex w-[10%] h-full items-center justify-center">
          <div className="flex flex-col items-center gap-10">
            {/* Vertical Line */}
            <div className="h-32 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent mb-4"></div>
            
            {/* WhatsApp */}
            <a 
              href="https://wa.me/yournumber"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
                <i className="fab fa-whatsapp text-white text-xl"></i>
              </div>
              <span className="absolute left-full ml-3 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
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
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
                <i className="fab fa-instagram text-white text-xl"></i>
              </div>
              <span className="absolute left-full ml-3 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
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
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
                <i className="fab fa-facebook-f text-white text-xl"></i>
              </div>
              <span className="absolute left-full ml-3 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Facebook
              </span>
            </a>
            
            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:scale-110">
                <i className="fab fa-linkedin-in text-white text-xl"></i>
              </div>
              <span className="absolute left-full ml-3 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                LinkedIn
              </span>
            </a>
            
            {/* Vertical Line */}
            <div className="h-32 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent mt-4"></div>
          </div>
        </div>

        {/* Mobile Social Icons - Bottom Center */}
        <div className="lg:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex gap-6">
            <a href="#" className="text-white/70 hover:text-white">
              <i className="fab fa-whatsapp text-xl"></i>
            </a>
            <a href="#" className="text-white/70 hover:text-white">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-white/70 hover:text-white">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="#" className="text-white/70 hover:text-white">
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
          </div>
        </div>

        {/* Middle Column - Main Text (70%) */}
        <div className="w-full lg:w-[70%] h-full flex flex-col justify-center items-center">
          <div className="w-full max-w-6xl mx-auto">
            
            {/* Top Line - SHAPING THE */}
            <div className="h-1/3 flex items-end justify-center lg:justify-start mb-4 lg:mb-0">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-tight tracking-tight">
                SHAPING THE
              </h1>
            </div>
            
            {/* Middle Line - FUTURE WITH */}
            <div className="h-1/3 flex items-center justify-center lg:justify-start">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#6BD3C7] leading-tight tracking-tight">
                FUTURE WITH
              </h1>
            </div>
            
            {/* Bottom Line - SMART SOLUTIONS */}
            <div className="h-1/3 flex items-start justify-center lg:justify-start mt-4 lg:mt-0">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-tight tracking-tight">
                SMART SOLUTIONS
              </h1>
            </div>
            
            {/* Tagline - Centered for mobile, left for desktop */}
            <div className="mt-8 lg:mt-12 text-center lg:text-left">
              <p className="text-white/80 text-lg lg:text-xl font-light italic">
                Dreamed by You - Designed by Us
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Circular Text (20%) */}
        <div className="hidden lg:flex w-[20%] h-full items-center justify-center relative">
          <div className="relative h-full flex flex-col items-center justify-between py-20">
            
            {/* Top Scroll Indicator */}
            <div className="flex flex-col items-center">
              <span className="text-white/60 text-xs tracking-widest rotate-90 mb-4">SCROLL</span>
              <div className="w-px h-24 bg-gradient-to-b from-white/60 to-transparent"></div>
            </div>
            
            {/* Circular Text - Centered */}
            <div className="relative mx-auto">
              <CircularText
                text="INNOVATE • CREATE • DISRUPT • "
                spinDuration={25}
                onHover="speedUp"
                className="text-white/80"
                circleSize={120}
                fontSize="text-xs"
              />
            </div>
            
            {/* Bottom Content */}
            <div className="flex flex-col items-center">
              <div className="text-white/60 text-xs mb-2">EXPLORE</div>
              <div className="w-px h-24 bg-gradient-to-t from-white/60 to-transparent"></div>
            </div>
            
            {/* Contact Email */}
            <div className="absolute bottom-10 right-0 transform rotate-90 origin-right">
              <a 
                href="mailto:contact@example.com" 
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                contact@craftoweb.com
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Circular Text - Bottom Right */}
        <div className="lg:hidden absolute bottom-8 right-4 z-10">
          <div className="scale-75">
            <CircularText
              text="INNOVATE • "
              spinDuration={20}
              onHover="speedUp"
              className="text-white/80"
              circleSize={80}
              fontSize="text-[10px]"
            />
          </div>
        </div>

      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
    </div>
  );
}

export default Home;