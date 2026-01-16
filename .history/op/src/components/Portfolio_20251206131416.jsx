import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "lenis/react";

// सभी 6 Projects अलग-अलग array में
const allProjects = [
  {
    id: 1,
    title: "NIKE",
    subtitle: "GLOBAL E-COMMERCE",
    description: "Redesigned Nike's global online store with enhanced shopping experience",
    results: "+42% conversion",
    year: "2023",
    tech: ["React", "Next.js", "GraphQL"],
    link: "https://nike.com",
    bgImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "APPLE",
    subtitle: "DEVELOPER PORTAL",
    description: "Redesigned Apple Developer portal with improved documentation",
    results: "+65% satisfaction",
    year: "2023",
    tech: ["Vue.js", "Node.js", "Swift"],
    link: "https://developer.apple.com",
    bgImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "SPOTIFY",
    subtitle: "ARTIST DASHBOARD",
    description: "Real-time analytics dashboard for Spotify artists",
    results: "2M+ active users",
    year: "2024",
    tech: ["React Native", "Firebase", "D3.js"],
    link: "https://artists.spotify.com",
    bgImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "AIRBNB",
    subtitle: "HOST PLATFORM",
    description: "Property management dashboard for Airbnb hosts",
    results: "4.8★ rating",
    year: "2024",
    tech: ["React", "TypeScript", "AWS"],
    link: "https://airbnb.com/host",
    bgImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "GOOGLE",
    subtitle: "CLOUD DASHBOARD",
    description: "Cloud management dashboard redesign for Google Cloud",
    results: "-38% support tickets",
    year: "2024",
    tech: ["Angular", "D3.js", "Google Cloud"],
    link: "https://cloud.google.com",
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    title: "NETFLIX",
    subtitle: "STUDIO CMS",
    description: "Content management system for Netflix Studio",
    results: "+57% efficiency",
    year: "2024",
    tech: ["React", "Python", "PostgreSQL"],
    link: "https://netflix.com",
    bgImage: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
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
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-white text-2xl lg:text-4xl font-bold mb-1">
                {project.title}
              </h3>
              <p className="text-gray-300 text-base lg:text-lg">
                {project.subtitle}
              </p>
            </div>
            <span className="text-white/60 text-sm">
              {project.year}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-200 text-sm lg:text-base mb-6 line-clamp-2 lg:line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Bottom Section - Results */}
        <div>
          <div className="text-white/80 text-sm mb-1">Results</div>
          <div className="text-green-400 text-lg lg:text-xl font-semibold">
            {project.results}
          </div>
        </div>

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