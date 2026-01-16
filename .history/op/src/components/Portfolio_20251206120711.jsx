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
          
          {/* Left Card - Grid Pattern */}
          <a 
            href={leftProject.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 group relative bg-black overflow-hidden"
          >
            {/* Grid Pattern */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-px p-px">
              {Array.from({ length: 16 }).map((_, idx) => (
                <div 
                  key={idx}
                  className="bg-white/5 group-hover:bg-white/10 transition-all duration-500"
                  style={{ transitionDelay: `${idx * 20}ms` }}
                ></div>
              ))}
            </div>

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col justify-between">
              {/* Top Left - Number */}
              <div className="text-white text-2xl font-bold">
                {(i * 2 + 1).toString().padStart(2, '0')}
              </div>

              {/* Center Content */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-4xl lg:text-5xl font-bold

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