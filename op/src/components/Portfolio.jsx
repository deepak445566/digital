import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "lenis/react";

// सभी 6 Projects अलग-अलग array में
const allProjects = [
  {
    id: 1,
    title: "Shiv Gauri",
    subtitle: "Infrastructure Services",
    description:
      "Shiv Gauri Infra Project provides reliable Fabrication, O&M, and R&M services with precision, efficiency, and long-term infrastructure support.",
    results: "Reliable Infra Services",
    year: "2024",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://shivgauriinfra.com/",
    bgImage:
      "/Shiv.png"
  },
  {
    id: 2,
    title: "Power Crusies",
    subtitle: "Luxury Cruise Travel",
    description:
      "Power Cruises brings you unforgettable ocean journeys with luxury comfort and world-class travel experiences.",
    results: "Premium Travel UI",
    year: "2024",
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://powercruiseholidays.netlify.app/",
    bgImage:
      "/PowerCrusies.png"
  },
  {
    id: 3,
    title: "Venus Geyser Service",
    subtitle: "Home Service Platform",
    description:
      "Venus Geyser Service provides fast, reliable, and expert geyser installation and repair solutions for homes and businesses.",
    results: "Local Service Website",
    year: "2024",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://venus-geyser-service.netlify.app/",
    bgImage:
      "/Venus.png"
  },
  {
    id: 4,
    title: "Stellar Serve",
    subtitle: "Fast URL Indexing Tool",
    description:
      "StellarServe provides fast and reliable indexing solutions to help blogs and websites get discovered quickly on search engines.",
    results: "Indexing API Integration",
    year: "2024",
    tech: ["Flutter", "Firebase", "Google Maps API"],
    link: "https://dapper-druid-feb24d.netlify.app/",
    bgImage:
      "/quick.png"
  },
  {
    id: 5,
    title: "Mahesh Painter",
    subtitle: "Building Painting Service",
    description:
      "Mahesh Painter delivers expert, high-quality residential and commercial painting services with a commitment to precision and perfection.",
    results: "Professional Services Website",
    year: "2024",
    tech: ["Vue.js", "Laravel", "MySQL"],
    link: "https://maheshpainter.in/",
    bgImage:
      "/Mahesh.png"
  },
  {
    id: 6,
    title: "Mosaic Nature Stays",
    subtitle: "Luxury Nature Resort",
    description:
      "Mosaic Nature Stays — a peaceful hotel retreat blending comfort, nature, and unforgettable hospitality.",
    results: "Luxury Resort UI",
    year: "2024",
    tech: ["React", "Python", "PostgreSQL"],
    link: "https://mosaicnaturestays.in/",
    bgImage:
      "/Mosaic.png"
  }
];

// Desktop के लिए pairs में group करें (optional)
const desktopProjectPairs = [
  { id: 1, left: allProjects[0], right: allProjects[1] },
  { id: 2, left: allProjects[2], right: allProjects[3] },
  { id: 3, left: allProjects[4], right: allProjects[5] }
];

// Single Project Card Component
const ProjectCard = ({ project, index }) => {
  return (
    <a 
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl h-full rounded-2xl"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 ">
        <img 
          src={project.bgImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-4xl"
        />
        {/* Dark Overlay for text readability */}
      
      </div>

      {/* Content Container */}
      <div className="relative h-full p-6 flex flex-col justify-between">
        {/* Top Section - Title and Year */}
        <div>
        

        
        </div>

        {/* Bottom Section - Results */}
        

        {/* Hover Arrow - Desktop only */}
        <div className="hidden lg:block absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
};

// Desktop Pair Card Component
const DesktopProjectPair = ({ i, pair, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky -top-[10vh] lg:-top-30 flex items-center justify-center">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 20 + 250}px)` }}
        className="relative -top-1/4 origin-top flex rounded-2xl 
          w-[90vw] h-[400px]           /* mobile height */
          lg:h-[400px] lg:w-[1100px]   /* desktop */
        "
      >
        {/* Desktop: Two cards side by side */}
        <div className="hidden lg:flex w-full h-full gap-8">
          {/* Left Card */}
          <div className="flex-1">
            <ProjectCard project={pair.left} />
          </div>
          
          {/* Right Card */}
          <div className="flex-1">
            <ProjectCard project={pair.right} />
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
      <div id="work" className="bg-black rounded-3xl lg:rounded-[10vh]">
        {/* Page Header */}
        <div className="px-6 lg:px-15 mt-10 lg:mt-15 mb-10">
          <h1 className='bebas-neue-regular text-6xl lg:text-9xl big text-white py-20 font-semibold text-center lg:text-left'>
            CLIENT WORK
          </h1>
          <p className="text-gray-400 mt-2 text-lg text-center lg:text-left">
            {allProjects.length} featured projects for global brands
          </p>
        </div>

        <ReactLenis root>
          <main
            ref={container}
            className="relative flex w-full flex-col items-center justify-center 
              pb-[10vh] lg:pb-[60vh] 
              pt-[10vh] 
              -mt-[20vh] lg:-mt-[50vh]
            "
          >
            {/* MOBILE VIEW - All 6 projects in vertical stack */}
            <div className="lg:hidden w-full max-w-4xl space-y-6 px-4">
              {allProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="h-[300px] w-full" // Mobile पर हर card की height
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW - 3 pairs of cards with sticky effect */}
            <div className="hidden lg:block">
              {desktopProjectPairs.map((pair, i) => {
                const targetScale = Math.max(0.5, 1 - (desktopProjectPairs.length - i - 1) * 0.1);
                return (
                  <DesktopProjectPair
                    key={pair.id}
                    i={i}
                    pair={pair}
                    progress={scrollYProgress}
                    range={[i * 0.25, 1]}
                    targetScale={targetScale}
                  />
                );
              })}
            </div>

            {/* Projects Counter */}
           
          </main>
        </ReactLenis>
      </div>
    </>
  );
};

export default Skiper;