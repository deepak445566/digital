import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "lenis/react";

// Projects Data with Background Images
const projectBoxes = [
  {
    id: 1,
    leftProject: {
      title: "NIKE",
      subtitle: "GLOBAL E-COMMERCE",
      description: "Redesigned Nike's global online store with enhanced shopping experience",
      results: "+42% conversion",
      year: "2023",
      tech: ["React", "Next.js", "GraphQL"],
      link: "https://nike.com",
      bgImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    rightProject: {
      title: "APPLE",
      subtitle: "DEVELOPER PORTAL",
      description: "Redesigned Apple Developer portal with improved documentation",
      results: "+65% satisfaction",
      year: "2023",
      tech: ["Vue.js", "Node.js", "Swift"],
      link: "https://developer.apple.com",
      bgImage: "https://images.unsplash.com/phone-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  },
  {
    id: 2,
    leftProject: {
      title: "SPOTIFY",
      subtitle: "ARTIST DASHBOARD",
      description: "Real-time analytics dashboard for Spotify artists",
      results: "2M+ active users",
      year: "2024",
      tech: ["React Native", "Firebase", "D3.js"],
      link: "https://artists.spotify.com",
      bgImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    rightProject: {
      title: "AIRBNB",
      subtitle: "HOST PLATFORM",
      description: "Property management dashboard for Airbnb hosts",
      results: "4.8★ rating",
      year: "2024",
      tech: ["React", "TypeScript", "AWS"],
      link: "https://airbnb.com/host",
      bgImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  },
  {
    id: 3,
    leftProject: {
      title: "GOOGLE",
      subtitle: "CLOUD DASHBOARD",
      description: "Cloud management dashboard redesign for Google Cloud",
      results: "-38% support tickets",
      year: "2024",
      tech: ["Angular", "D3.js", "Google Cloud"],
      link: "https://cloud.google.com",
      bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    rightProject: {
      title: "NETFLIX",
      subtitle: "STUDIO CMS",
      description: "Content management system for Netflix Studio",
      results: "+57% efficiency",
      year: "2024",
      tech: ["React", "Python", "PostgreSQL"],
      link: "https://netflix.com",
      bgImage: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  }
];

const ProjectBox = ({ i, box, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky -top-[10vh] lg:-top-30 flex items-center justify-center">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 20 + 250}px)` }}
        className="relative -top-1/4 origin-top flex rounded-2xl 
          w-[90vw] h-[500px]           /* mobile: taller for single card */
          lg:h-[400px] lg:w-[1100px]   /* desktop: normal height */
        "
      >
        {/* Container - Mobile: vertical, Desktop: horizontal */}
        <div className="w-full h-full flex flex-col lg:flex-row gap-4 lg:gap-8">
          
          {/* Left Project Card - Mobile पर full width, Desktop पर half */}
          <a 
            href={box.leftProject.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full h-full          /* mobile: full width and height */
              lg:flex-1             /* desktop: half width */
              group relative overflow-hidden rounded-xl
            "
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img 
                src={box.leftProject.bgImage}
                alt={box.leftProject.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Content Container */}
            <div className="relative h-full p-6 lg:p-8 flex flex-col justify-between">
              {/* Top Section */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white text-3xl lg:text-4xl font-bold mb-1">
                      {box.leftProject.title}
                    </h3>
                    <p className="text-gray-300 text-lg">
                      {box.leftProject.subtitle}
                    </p>
                  </div>
                  <span className="text-white/60 text-sm">
                    {box.leftProject.year}
                  </span>
                </div>

                {/* Description - Mobile पर छोटा */}
                <p className="text-gray-200 text-sm lg:text-base mb-6 line-clamp-3 lg:line-clamp-none">
                  {box.leftProject.description}
                </p>
              </div>

              {/* Results - Mobile पर bottom में */}
              <div className="mt-4 lg:mt-0">
                <div className="text-white/80 text-sm mb-1">Results</div>
                <div className="text-green-400 text-xl font-semibold">
                  {box.leftProject.results}
                </div>
              </div>

              {/* Hover Arrow - Mobile पर hidden */}
              <div className="hidden lg:block absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </a>

          {/* Right Project Card - Mobile पर hidden, Desktop पर visible */}
          <a 
            href={box.rightProject.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden               /* mobile: hidden */
              lg:flex lg:flex-1   /* desktop: visible and half width */
              group relative overflow-hidden rounded-xl
            "
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img 
                src={box.rightProject.bgImage}
                alt={box.rightProject.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Content Container */}
            <div className="relative h-full p-8 flex flex-col justify-between">
              {/* Top Section */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white text-4xl font-bold mb-1">
                      {box.rightProject.title}
                    </h3>
                    <p className="text-gray-300 text-lg">
                      {box.rightProject.subtitle}
                    </p>
                  </div>
                  <span className="text-white/60 text-sm">
                    {box.rightProject.year}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-200 text-base mb-6">
                  {box.rightProject.description}
                </p>
              </div>

              {/* Results */}
              <div>
                <div className="text-white/80 text-sm mb-1">Results</div>
                <div className="text-green-400 text-xl font-semibold">
                  {box.rightProject.results}
                </div>
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
      <div id="work" className="bg-black rounded-[10vh]">
        {/* Page Header */}
        <div className="px-6 lg:px-15 mt-10 lg:mt-15 mb-10">
          <h1 className='bebas-neue-regular text-4xl lg:text-9xl big text-white py-20 font-semibold'>
            CLIENT WORK
          </h1>
          <p className="text-gray-400 mt-2 text-lg text-center lg:text-left">
            Featured projects for global brands
          </p>
        </div>

        <ReactLenis root>
          <main
            ref={container}
            className="relative flex w-full flex-col items-center justify-center 
              pb-[30vh] lg:pb-[60vh] 
              pt-[10vh] 
              -mt-[20vh] lg:-mt-[50vh]
            "
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

            {/* Mobile Indicator - सिर्फ mobile पर दिखे */}
            <div className="lg:hidden mt-8 text-center">
              <div className="text-gray-400 text-sm">
                ← Swipe to see more projects →
              </div>
            </div>

          </main>
        </ReactLenis>
      </div>
    </>
  );
};

export default Skiper;