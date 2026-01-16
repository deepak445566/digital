import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "lenis/react";

// Projects data with design as per screenshot
const projectCards = [
  {
    id: 1,
    leftProject: {
      title: "SPACE",
      subtitle: "DESIGN",
      src: "../img1.png",
      link: "https://gro-livid.vercel.app/",
      category: "UI/UX",
      year: "2024"
    },
    rightProject: {
      title: "MOBILE",
      subtitle: "IDENTITY",
      src: "../image.png",
      link: "https://despaclasses.vercel.app/",
      category: "BRANDING",
      year: "2024"
    }
  },
  {
    id: 2,
    leftProject: {
      title: "WEB",
      subtitle: "DEVELOPMENT",
      src: "../img2.jpg",
      link: "https://viswakarma-developers.netlify.app/",
      category: "DEVELOPMENT",
      year: "2024"
    },
    rightProject: {
      title: "DIGITAL",
      subtitle: "MARKETING",
      src: "../digital.jpg",
      link: "#",
      category: "MARKETING",
      year: "2024"
    }
  },
  {
    id: 3,
    leftProject: {
      title: "BRAND",
      subtitle: "STRATEGY",
      src: "../brand.jpg",
      link: "#",
      category: "STRATEGY",
      year: "2024"
    },
    rightProject: {
      title: "CONTENT",
      subtitle: "CREATION",
      src: "../content.jpg",
      link: "#",
      category: "CONTENT",
      year: "2024"
    }
  }
];

const StickyCard_001 = ({ i, leftProject, rightProject, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky -top-[10vh] lg:-top-30 flex items-center justify-center">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 20 + 250}px)` }}
        className="relative -top-1/4 origin-top flex rounded-2xl w-[90vw] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] lg:w-[1100px]"
      >
        <div className="w-full h-full flex flex-col lg:flex-row gap-4 lg:gap-8">
          
          {/* Left Card - Line Art */}
          <a 
            href={leftProject.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 group relative bg-black overflow-hidden"
          >
            {/* Line Art Background */}
            <div className="absolute inset-0">
              {/* Horizontal Lines */}
              <div className="absolute top-1/4 left-0 right-0 h-px bg-white/10"></div>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
              <div className="absolute top-3/4 left-0 right-0 h-px bg-white/10"></div>
              {/* Vertical Lines */}
              <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/10"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10"></div>
              <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/10"></div>
            </div>

            {/* Animated Border */}
            <div className="absolute inset-0 border border-white/20 group-hover:border-white/40 transition-all duration-700">
              <div className="absolute top-0 left-0 w-0 group-hover:w-full h-px bg-white transition-all duration-1000"></div>
              <div className="absolute top-0 right-0 h-0 group-hover:h-full w-px bg-white transition-all duration-1000 delay-300"></div>
              <div className="absolute bottom-0 right-0 w-0 group-hover:w-full h-px bg-white transition-all duration-1000 delay-600"></div>
              <div className="absolute bottom-0 left-0 h-0 group-hover:h-full w-px bg-white transition-all duration-1000 delay-900"></div>
            </div>

            <div className="relative h-full p-6 lg:p-8 flex flex-col justify-center items-center">
              {/* Title in Circle */}
              <div className="relative">
                <div className="absolute inset-0 border border-white/20 rounded-full animate-spin-slow"></div>
                <div className="w-40 h-40 flex flex-col items-center justify-center">
                  <h3 className="text-white text-3xl font-bold text-center">
                    {leftProject.title}
                  </h3>
                  <div className="w-8 h-px bg-white my-2"></div>
                  <h3 className="text-white text-3xl font-bold text-center">
                    {leftProject.subtitle}
                  </h3>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-6 left-6 text-white/60 text-xs uppercase tracking-widest">
                {leftProject.category}
              </div>
              <div className="absolute bottom-6 right-6 text-white text-xs">
                → 
              </div>
            </div>
          </a>

          {/* Right Card */}
          <a 
            href={rightProject.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 group relative bg-black overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-0 right-0 h-px bg-white/10"></div>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
              <div className="absolute top-3/4 left-0 right-0 h-px bg-white/10"></div>
              <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/10"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10"></div>
              <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/10"></div>
            </div>

            <div className="absolute inset-0 border border-white/20 group-hover:border-white/40 transition-all duration-700">
              <div className="absolute top-0 left-0 w-0 group-hover:w-full h-px bg-white transition-all duration-1000"></div>
              <div className="absolute top-0 right-0 h-0 group-hover:h-full w-px bg-white transition-all duration-1000 delay-300"></div>
              <div className="absolute bottom-0 right-0 w-0 group-hover:w-full h-px bg-white transition-all duration-1000 delay-600"></div>
              <div className="absolute bottom-0 left-0 h-0 group-hover:h-full w-px bg-white transition-all duration-1000 delay-900"></div>
            </div>

            <div className="relative h-full p-6 lg:p-8 flex flex-col justify-center items-center">
              <div className="relative">
                <div className="absolute inset-0 border border-white/20 rounded-full animate-spin-slow reverse"></div>
                <div className="w-40 h-40 flex flex-col items-center justify-center">
                  <h3 className="text-white text-3xl font-bold text-center">
                    {rightProject.title}
                  </h3>
                  <div className="w-8 h-px bg-white my-2"></div>
                  <h3 className="text-white text-3xl font-bold text-center">
                    {rightProject.subtitle}
                  </h3>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 text-white/60 text-xs uppercase tracking-widest">
                {rightProject.category}
              </div>
              <div className="absolute bottom-6 right-6 text-white text-xs">
                → 
              </div>
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

const Skiper = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <div id="work">
        {/* Header - Simple like screenshot */}
        <div className="px-6 lg:px-15 mt-10 lg:mt-15 mb-10">
          <h1 className='bebas-neue-regular text-4xl lg:text-6xl big text-black'>
            OUR WORK
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Selected projects showcasing our design and development expertise
          </p>
        </div>

        <ReactLenis root>
          <main
            ref={container}
            className="relative flex w-full flex-col items-center justify-center pb-[30vh] lg:pb-[60vh] pt-[10vh] -mt-[20vh] lg:-mt-[30vh]"
          >
            {projectCards.map((card, i) => {
              const targetScale = Math.max(0.5, 1 - (projectCards.length - i - 1) * 0.1);
              return (
                <StickyCard_001
                  key={card.id}
                  i={i}
                  leftProject={card.leftProject}
                  rightProject={card.rightProject}
                  progress={scrollYProgress}
                  range={[i * 0.25, 1]}
                  targetScale={targetScale}
                />
              );
            })}

            {/* View More Button */}
            <div className="mt-20 text-center">
              <button className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors duration-300">
                View All Projects
              </button>
            </div>
          </main>
        </ReactLenis>
      </div>
    </>
  );
};

export default Skiper;