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
        className="
          relative -top-1/4 origin-top flex rounded-2xl
          w-[90vw] h-[200px]          /* mobile default */
          sm:h-[250px]               /* small devices */
          md:h-[300px]               /* tablets */
          lg:h-[350px] lg:w-[1100px] /* large screens */
        "
      >
        {/* Two Projects Container with spacing */}
        <div className="w-full h-full flex flex-col lg:flex-row gap-4 lg:gap-8">
          
          {/* Left Project Card */}
          <a 
            href={leftProject.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 group relative overflow-hidden rounded-2xl"
          >
            {/* Image Container */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={leftProject.src} 
                alt={leftProject.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </div>

            {/* Content Overlay - Bottom Left */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              {/* Category & Year */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/80 text-xs font-medium tracking-widest uppercase">
                  {leftProject.category}
                </span>
                <span className="text-white/60 text-xs">
                  {leftProject.year}
                </span>
              </div>

              {/* Title in two lines - Exactly like screenshot */}
              <div className="space-y-1">
                <h3 className="text-white text-3xl lg:text-4xl font-black tracking-tight leading-none">
                  {leftProject.title}
                </h3>
                <h3 className="text-white text-3xl lg:text-4xl font-black tracking-tight leading-none">
                  • {leftProject.subtitle}
                </h3>
              </div>

              {/* Hover Indicator */}
              <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium">View Project</span>
                <div className="w-0 group-hover:w-16 h-px bg-white transition-all duration-500"></div>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            {/* Border on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-500"></div>
          </a>

          {/* Right Project Card */}
          <a 
            href={rightProject.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 group relative overflow-hidden rounded-2xl"
          >
            {/* Image Container */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={rightProject.src} 
                alt={rightProject.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </div>

            {/* Content Overlay - Bottom Left */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              {/* Category & Year */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/80 text-xs font-medium tracking-widest uppercase">
                  {rightProject.category}
                </span>
                <span className="text-white/60 text-xs">
                  {rightProject.year}
                </span>
              </div>

              {/* Title in two lines - Exactly like screenshot */}
              <div className="space-y-1">
                <h3 className="text-white text-3xl lg:text-4xl font-black tracking-tight leading-none">
                  {rightProject.title}
                </h3>
                <h3 className="text-white text-3xl lg:text-4xl font-black tracking-tight leading-none">
                  • {rightProject.subtitle}
                </h3>
              </div>

              {/* Hover Indicator */}
              <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium">View Project</span>
                <div className="w-0 group-hover:w-16 h-px bg-white transition-all duration-500"></div>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            {/* Border on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-500"></div>
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