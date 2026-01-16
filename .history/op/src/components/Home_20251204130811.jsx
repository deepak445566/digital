import React from "react";
import Navbar from "./Navbar";

function Home() {
  // Single background image
  const backgroundImage = "/images/ma2.jpg";

  return (
    <div className="w-full h-[100vh] lg:h-[120vh] bg-[#F6F7F9] lg:py-4 lg:px-4">
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
        
        {/* Centered Content Section */}
        <div className="flex flex-col justify-center items-center flex-1 relative z-10 px-4">
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-5xl md:text-7xl leading-tight md:leading-[4.5rem] exo font-bold text-white mb-8 drop-shadow-2xl">
              Shaped by Heat,<br />
              Defined by <span className="text-orange-400">Strength.</span>
            </h1>
            
            <a 
              href="tel:8506811747"
              className="bg-white text-gray-900 px-10 py-5 lg:px-14 lg:py-5 rounded-3xl hover:bg-orange-500 hover:text-white transition-all duration-500 font-semibold uppercase exo mb-10 text-center shadow-2xl hover:shadow-orange-500/25 hover:scale-105 transform inline-block text-lg md:text-xl"
            >
              Get Started Now
            </a>
            
            <div className="exo text-xl md:text-2xl text-white font-semibold space-y-3 drop-shadow-lg">
              <p>At <span className="text-orange-300">"Ishaan Forging India Private Limited"</span></p>
              <p>we are dedicated to forging</p>
              <p>a stronger future</p>
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