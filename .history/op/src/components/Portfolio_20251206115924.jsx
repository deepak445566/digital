import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "lenis/react";

// Projects data - हर card में 2 projects
const projectCards = [
  {
    id: 1,
    leftProject: {
      title: "GROCERY APP",
      src: "../img1.png",
      link: "https://gro-livid.vercel.app/",
      description: "E-commerce grocery platform"
    },
    rightProject: {
      title: "EDUCATION PORTAL",
      src: "../image.png",
      link: "https://despaclasses.vercel.app/",
      description: "Online learning platform"
    }
  },
  {
    id: 2,
    leftProject: {
      title: "REAL ESTATE",
      src: "../img2.jpg",
      link: "https://viswakarma-developers.netlify.app/",
      description: "Property listing website"
    },
    rightProject: {
      title: "FITNESS APP",
      src: "../fitness.jpg",
      link: "#",
      description: "Health & fitness tracker"
    }
  },
  {
    id: 3,
    leftProject: {
      title: "SAAS DASHBOARD",
      src: "../saas1.jpg",
      link: "#",
      description: "Business analytics dashboard"
    },
    rightProject: {
      title: "TRAVEL BLOG",
      src: "../travel.jpg",
      link: "#",
      description: "Travel experiences platform"
    }
  }
];

const StickyCard_001 = ({ i, leftProject, rightProject, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky -top-[10vh] lg:-top-30 flex items-center justify-center">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 20 + 250}px)` }}
        className="
          relative -top-1/4 origin-top flex overflow-hidden rounded-2xl
          w-[90vw] h-[200px]          /* mobile default */
          sm:h-[250px]               /* small devices */
          md:h-[300px]               /* tablets */
          lg:h-[350px] lg:w-[1100px] /* large screens */
        "
      >
        {/* Card Container */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 lg:p-8 flex flex-col">
          
          {/* Card Header */}
          <div className="mb-4 lg:mb-6">
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm font-medium">
                PROJECT CARD {i + 1}
              </span>
              <span className="text-white/50 text-xs">
                Scroll for more →
              </span>
            </div>
          </div>

          {/* Two Projects Side by Side */}
          <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-8">
            
            {/* Left Project */}
            <a 
              href={leftProject.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 group"
            >
              <div className="h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                {/* Project Image */}
                <div className="h-2/3 overflow-hidden">
                  <img 
                    src={leftProject.src} 
                    alt={leftProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Project Info */}
                <div className="h-1/3 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg lg:text-xl mb-1">
                      {leftProject.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {leftProject.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 text-xs font-medium">
                      View Project
                    </span>
                    <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent my-4"></div>

            {/* Right Project */}
            <a 
              href={rightProject.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 group"
            >
              <div className="h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                {/* Project Image */}
                <div className="h-2/3 overflow-hidden">
                  <img 
                    src={rightProject.src} 
                    alt={rightProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Project Info */}
                <div className="h-1/3 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg lg:text-xl mb-1">
                      {rightProject.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {rightProject.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 text-xs font-medium">
                      View Project
                    </span>
                    <svg className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

          </div>

          {/* Card Footer */}
          <div className="mt-4 lg:mt-6 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between text-white/50 text-sm">
              <span>Dual Project Showcase</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Active Projects
              </span>
            </div>
          </div>
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
        <h1 className='relative group bebas-neue-regular text-4xl lg:text-6xl ml-5 lg:ml-15 big lg:mt-10'>
          OUR CREATIONS
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-25"></span>
        </h1>

        <ReactLenis root>
          <main
            ref={container}
            className="relative flex w-full flex-col items-center justify-center pb-[30vh] lg:pb-[60vh] pt-[10vh] -mt-[30vh] lg:-mt-[40vh]"
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
          </main>
        </ReactLenis>
      </div>
    </>
  );
};

export default Skiper;