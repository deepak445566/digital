import React from "react";
import Navbar from "./Navbar";

function Home() {
  return (
    <div 
      className="w-full max-h-screen lg:h-[120vh] lg:py-4 lg:px-4"
      style={{
        transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
        transformStyle: 'preserve-3d'
      }}
    >
      <div
        className="rounded-b-4xl lg:rounded-2xl w-full h-full flex flex-col relative overflow-hidden"
        style={{
          transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Transparent Navbar */}
        <div 
          className="relative z-20"
          style={{
            transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          <Navbar />
        </div>
        
        {/* Three Column Layout */}
        <div 
          className="flex flex-1 relative z-10"
          style={{
            transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Left Column - 20% width */}
          <div 
            className="w-[10%] flex items-center justify-center bg-white"
            style={{
              transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="text-white text-center">
              <p className="exo font-semibold text-lg">Left Section</p>
              <p className="text-sm mt-2">20% width</p>
            </div>
          </div>

          {/* Middle Column - 60% width */}
          <div 
            className="w-[75%] flex flex-col justify-center items-center big"
            style={{
              transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div 
              className="w-full h-full flex flex-col"
              style={{
                transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Top Row - 40% height */}
              <div 
                className="h-[40%] flex items-end justify-center pb-4"
                style={{
                  transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <h1 
                  className="text-5xl md:text-9xl leading-tight md:leading-[4.5rem] font-bold text-black drop-shadow-2xl"
                  style={{
                    transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  SHAPING THE
                </h1>
              </div>
              
              {/* Middle Row - 30% height */}
              <div 
                className="h-[25%] flex items-center justify-center"
                style={{
                  transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <h1 
                  className="text-5xl md:text-9xl leading-tight lg:leading-[4.5rem] font-bold text-black drop-shadow-2xl"
                  style={{
                    transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  FUTURE WITH
                </h1>
              </div>
              
              {/* Bottom Row - 30% height */}
              <div 
                className="h-[35%] flex items-start justify-center pt-4"
                style={{
                  transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <h1 
                  className="text-5xl md:text-9xl leading-tight lg:leading-[4.5rem] font-bold text-black drop-shadow-2xl"
                  style={{
                    transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  SMART SOLUTIONS
                </h1>
              </div>
            </div>
          </div>

          {/* Right Column - 20% width */}
          <div 
            className="w-[15%] flex items-center justify-center bg-white"
            style={{
              transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="text-white text-center">
              <p className="exo font-semibold text-lg">Right Section</p>
              <p className="text-sm mt-2">20% width</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;