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
    bgImage: "/Shiv.png"
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
    bgImage: "/PowerCrusies.png"
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
    bgImage: "/Venus.png"
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
    bgImage: "/quick.png"
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
    bgImage: "/Mahesh.png"
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
    bgImage: "/Mosaic.png"
  }
];

// Desktop के लिए pairs में group करें
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
      className="group relative overflow-hidden rounded-2xl h-full block"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={project.bgImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full p-6 flex flex-col justify-between z-10">
        {/* Top Section - Title and Year */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <p className="text-gray-300">{project.subtitle}</p>
            </div>
            <span className="text-white/70 text-sm">{project.year}</span>
          </div>
          
          <p className="text-gray-300 mt-4 text-sm line-clamp-2">{project.description}</p>
        </div>

        {/* Bottom Section - Results and Tech */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tech.slice(0, 3).map((tech, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">
                {tech}
              </span>
            ))}
          </div>
          <p className="text-white font-medium">{project.results}</p>
        </div>

        {/* Hover Arrow */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

// Desktop Pair Card Component - FIXED VERSION
const DesktopProjectPair = ({ i, pair, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0]);

  return (
    <motion.div 
      style={{ 
        scale, 
        opacity,
        position: "sticky",
        top: "20vh",
        marginTop: `${i === 0 ? 0 : -50}vh`
      }}
      className="flex justify-center items-center mb-[50vh]"
    >
      <div className="flex gap-8 w-[1100px] h-[400px]">
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
  );
};

const Skiper = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div id="work" className="bg-black min-h-screen">
      {/* Page Header */}
      <div className="px-6 lg:px-15 pt-20 lg:pt-30 pb-10">
        <h1 className='bebas-neue-regular text-6xl lg:text-9xl text-white font-semibold text-center lg:text-left'>
          CLIENT WORK
        </h1>
        <p className="text-gray-400 mt-2 text-lg text-center lg:text-left">
          {allProjects.length} featured projects for global brands
        </p>
      </div>

      <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
        <main
          ref={container}
          className="relative min-h-[300vh]"
        >
          {/* MOBILE VIEW - All 6 projects in vertical stack */}
          <div className="lg:hidden w-full max-w-4xl mx-auto space-y-6 px-4">
            {allProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="h-[300px] w-full"
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW - 3 pairs of cards with sticky effect */}
          <div className="hidden lg:block relative">
            {desktopProjectPairs.map((pair, i) => {
              const targetScale = 1 - (i * 0.1); // Scale gradually decreases
              const rangeStart = i * (1 / desktopProjectPairs.length);
              const rangeEnd = rangeStart + (1 / desktopProjectPairs.length);
              
              return (
                <DesktopProjectPair
                  key={pair.id}
                  i={i}
                  pair={pair}
                  progress={scrollYProgress}
                  range={[rangeStart, rangeEnd]}
                  targetScale={targetScale}
                />
              );
            })}
            
            {/* Spacer for scrolling */}
            <div className="h-[100vh]" />
          </div>

          {/* Projects Counter - Optional */}
          <div className="fixed bottom-10 right-10 z-50">
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
              <p className="text-white text-sm">
                {allProjects.length} Projects
              </p>
            </div>
          </div>
        </main>
      </ReactLenis>
    </div>
  );
};

export default Skiper;