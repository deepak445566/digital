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