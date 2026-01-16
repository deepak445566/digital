import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "lenis/react";

// Projects Data - हर box में 2 अलग-अलग projects, कोई box title नहीं
const projectBoxes = [
  {
    id: 1,
    // कोई box title नहीं
    leftProject: {
      title: "NIKE GLOBAL",
      subtitle: "E-COMMERCE PLATFORM",
      description: "Complete redesign of Nike's global online store",
      results: "+42% conversion rate",
      year: "2023",
      tech: ["React", "Next.js", "GraphQL"],
      link: "https://nike.com"
    },
    rightProject: {
      title: "APPLE DEVELOPER",
      subtitle: "PORTAL REDESIGN",
      description: "Redesigned developer portal with enhanced documentation",
      results: "+65% satisfaction",
      year: "2023",
      tech: ["Vue.js", "Node.js", "MongoDB"],
      link: "https://developer.apple.com"
    }
  },
  {
    id: 2,
    // कोई box title नहीं
    leftProject: {
      title: "SPOTIFY ARTIST",
      subtitle: "ANALYTICS DASHBOARD",
      description: "Real-time analytics dashboard for artists",
      results: "2M+ active users",
      year: "2024",
      tech: ["React Native", "Firebase"],
      link: "https://artists.spotify.com"
    },
    rightProject: {
      title: "AIRBNB HOST",
      subtitle: "MANAGEMENT TOOL",
      description: "Property management dashboard for Airbnb hosts",
      results: "4.8★ rating",
      year: "2024",
      tech: ["React", "TypeScript", "AWS"],
      link: "https://airbnb.com/host"
    }
  },
  {
    id: 3,
    // कोई box title नहीं
    leftProject: {
      title: "GOOGLE CLOUD",
      subtitle: "DASHBOARD UI",
      description: "Cloud management dashboard redesign",
      results: "-38% support tickets",
      year: "2024",
      tech: ["Angular", "D3.js", "Google Cloud"],
      link: "https://cloud.google.com"
    },
    rightProject: {
      title: "NETFLIX STUDIO",
      subtitle: "CONTENT MANAGEMENT",
      description: "Studio content management system",
      results: "+57% efficiency",
      year: "2024",
      tech: ["React", "Python", "PostgreSQL"],
      link: "https://netflix.com"
    }
  }
];

const ProjectBox = ({ i, box, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky -top-[10vh] lg:-top-30 flex items-center justify-center">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 20 + 250}px)` }}
        className="relative -top-1/4 origin-top flex rounded-2xl w-[90vw] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] lg:w-[1100px]"
      >
        {/* Box Container - बिना title के */}
        <div className="w-full h-full flex gap-4 lg:gap-8">
          
          {/* Left Project - Simple Card */}
          <a 
            href={box.leftProject.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 group relative bg-black border border-gray-800 rounded-xl hover:border-gray-600 transition-all duration-300 overflow-hidden"
          >
            {/* Content */}
            <div className="h-full p-6 lg:p-8 flex flex-col">
              {/* Title Section */}
              <div className="mb-4">
                <h3 className="text-white text-2xl lg:text-3xl font-bold mb-1">
                  {box.leftProject.title}
                </h3>
                <p className="text-gray-400 text-lg">
                  {box.leftProject.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm lg:text-base mb-6 flex-1">
                {box.leftProject.description}
              </p>

              {/* Results & Tech */}
              <div className="space-y-4">
                {/* Results */}
                <div>
                  <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                    Results
                  </div>
                  <div className="text-green-400 text-lg font-semibold">
                    {box.leftProject.results}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {box.leftProject.tech.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Year Badge */}
              <div className="absolute top-4 right-4">
                <span className="text-gray-500 text-sm">
                  {box.leftProject.year}
                </span>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </a>

          {/* Right Project - Simple Card */}
          <a 
            href={box.rightProject.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 group relative bg-black border border-gray-800 rounded-xl hover:border-gray-600 transition-all duration-300 overflow-hidden"
          >
            {/* Content */}
            <div className="h-full p-6 lg:p-8 flex flex-col">
              {/* Title Section */}
              <div className="mb-4">
                <h3 className="text-white text-2xl lg:text-3xl font-bold mb-1">
                  {box.rightProject.title}
                </h3>
                <p className="text-gray-400 text-lg">
                  {box.rightProject.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm lg:text-base mb-6 flex-1">
                {box.rightProject.description}
              </p>

              {/* Results & Tech */}
              <div className="space-y-4">
                {/* Results */}
                <div>
                  <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                    Results
                  </div>
                  <div className="text-green-400 text-lg font-semibold">
                    {box.rightProject.results}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {box.rightProject.tech.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Year Badge */}
              <div className="absolute top-4 right-4">
                <span className="text-gray-500 text-sm">
                  {box.rightProject.year}
                </span>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
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
        {/* Page Title */}
        <div className="px-6 lg:px-15 mt-10 lg:mt-15 mb-10">
          <h1 className='bebas-neue-regular text-4xl lg:text-6xl big text-black'>
            OUR WORK
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Selected client projects showcasing our expertise
          </p>
        </div>

        <ReactLenis root>
          <main
            ref={container}
            className="relative flex w-full flex-col items-center justify-center pb-[30vh] lg:pb-[60vh] pt-[10vh] -mt-[20vh] lg:-mt-[30vh]"
          >
            {projectBoxes.map((box, i) => {
              const targetScale = Math.max(0.5, 1 - (projectBoxes.length - i - 1) * 0.1);
              return (
                <ProjectBox
                  key={box.id}
                  i={i}
                  box={box}
                  progress={scrollYProgress}
                  range={[i * 0.25, 1]}
                  targetScale={targetScale}
                />
              );
            })}

            {/* View More Button */}
            <div className="mt-20 text-center">
              <button className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors duration-300">
                View All Projects →
              </button>
            </div>
          </main>
        </ReactLenis>
      </div>
    </>
  );
};

export default Skiper;