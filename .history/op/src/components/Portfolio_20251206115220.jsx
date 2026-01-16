import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {ReactLenis} from "lenis/react";



const projects = [
  { title: "Project 1", src: "../img1.png", link: "https://gro-livid.vercel.app/" },
  { title: "Project 2", src: "../image.png", link: "https://despaclasses.vercel.app/" },
  { title: "Project 3", src: "../img2.jpg", link: "https://viswakarma-developers.netlify.app/" },
];



const StickyCard_001 = ({ i, title, src, progress, range, targetScale ,link}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    
    <div className="sticky -top-[10vh] lg:-top-30 flex items-center justify-center">
         <a href={link} target="_blank" rel="noopener noreferrer">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 20 + 250}px)` }}
        className="
          relative -top-1/4 origin-top flex flex-col overflow-hidden rounded-2xl
          w-[330px] h-[200px]          /* mobile default */
          sm:h-[250px] sm:w-[95%]    /* small devices */
          md:h-[300px] md:w-[80%]    /* tablets */
          lg:h-[350px] lg:w-[1100px]  /* large screens */
        "
      >
         
        <img src={src} alt={title} className="h-full w-full object-cover border-3 border-black rounded-2xl" />
      </motion.div></a>
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
  <h1 className='relative group bebas-neue-regular text-4xl lg:text-6xl ml-5 lg:ml-15 big   lg:mt-10 '>OUR CREATIONS
       <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-25"></span>
  </h1>

    <ReactLenis root>
      <main
        ref={container}
        className=" relative flex w-full flex-col items-center justify-center pb-[30vh] lg:pb-[60vh] pt-[10vh] -mt-[30vh] lg:-mt-[40vh]"
      >
       {projects.map((project, i) => {
  const targetScale = Math.max(0.5, 1 - (projects.length - i - 1) * 0.1);
  return (
    <StickyCard_001
      key={i}
      i={i}
      title={project.title}
      src={project.src}
      link={project.link}
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
