import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Home() {
  // Array of 5 background images - replace with your actual image paths
  const backgroundImages = [
    "/images/ma2.jpg",
    "/images/ma1.jpg",
    "/images/ma3.jpg",
    "/images/ma4.jpg",
    "/images/ma5.jpg",
      "/images/ma6.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

 
  return (
    <div className="w-full h-[100vh] lg:h-[120vh] bg-[#F6F7F9] lg:py-4 lg:px-4">
      <div
        className="rounded-b-4xl lg:rounded-2xl w-full h-full bg-cover bg-center bg-no-repeat flex flex-col relative overflow-hidden transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${backgroundImages[currentImageIndex]}')`,
          backgroundColor: "#f0f0f0",
        }}
      >
        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-0"></div>
        
        {/* Additional Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 z-0"></div>


        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-orange-500 scale-125' 
                  : 'bg-white/60 hover:bg-white/90'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Transparent Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>
        
        {/* Content Section */}
        <div className="flex flex-col md:flex-row flex-1 relative z-10 lg:mt-15">
          {/* Left column: heading + button */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-4 md:p-8 mt-35 lg:mt-0">
            <h1 className="text-5xl md:text-7xl leading-tight md:leading-[4.5rem] exo font-bold text-white mb-5 drop-shadow-2xl">
              Shaped by Heat,<br />
              Defined by <span className="text-orange-400">Strength.</span>
            </h1>
            
            <a 
              href="tel:8506811747"
              className="bg-white text-gray-900 px-8 py-4 lg:px-12 lg:py-4 rounded-3xl hover:bg-orange-500 hover:text-white transition-all duration-500 font-semibold uppercase exo mb-6 md:mb-0 text-center shadow-2xl hover:shadow-orange-500/25 hover:scale-105 transform inline-block"
            >
              Get Started Now
            </a>
            
            <div className="exo text-lg md:text-xl text-white mt-6 md:mt-8 font-semibold ml-3 space-y-2 drop-shadow-lg">
              <p>At <span className="text-orange-300">"Ishaan Forging India Private Limited"</span></p>
              <p>we are dedicated to forging</p>
              <p>a stronger future</p>
            </div>
          </div>

          {/* Right column: intentionally empty */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent z-0"></div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent z-0"></div>
      </div>
    </div>
  );
}

export default Home;