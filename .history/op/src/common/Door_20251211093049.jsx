import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import React, { useRef as useReactRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "lenis/react";

// Door Component - Page Transition के लिए
const Door = ({ children }) => {
    const location = useLocation();
    const doorLeftRef = useRef(null);
    const doorRightRef = useRef(null);
    const pageRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(true);

    useGSAP(() => {
        if (!doorLeftRef.current || !doorRightRef.current) return;
        
        const tl = gsap.timeline({
            defaults: {
                ease: "power2.inOut"
            },
            onComplete: () => {
                setIsAnimating(false);
            }
        });

        // Reset state
        setIsAnimating(true);

        // दरवाजे दिखाएं
        tl.set([doorLeftRef.current, doorRightRef.current], {
            display: 'block',
            opacity: 1
        });

        // दरवाजे खोलना
        tl.fromTo(doorLeftRef.current,
            { 
                x: '0%', 
                rotationY: 0 
            },
            { 
                x: '-100%', 
                rotationY: -20,
                duration: 1.2,
                transformOrigin: "right center"
            }
        )
        .fromTo(doorRightRef.current,
            { 
                x: '0%', 
                rotationY: 0 
            },
            { 
                x: '100%', 
                rotationY: 20,
                duration: 1.2,
                transformOrigin: "left center"
            },
            "<"
        )

        // दरवाजे हटाएं
        tl.to([doorLeftRef.current, doorRightRef.current], {
            display: 'none',
            opacity: 0,
            duration: 0
        }, "-=0.3")

        // Content show करें
        tl.fromTo(pageRef.current,
            {
                opacity: 0,
                y: -50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            },
            "-=0.4"
        );

        // Cleanup function
        return () => {
            tl.kill();
        };
    }, [location.pathname]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Left Door */}
            <div 
                ref={doorLeftRef} 
                className="fixed top-0 left-0 w-1/2 h-screen bg-gradient-to-r from-black to-gray-900 z-[9999] hidden"
                style={{
                    perspective: '1000px',
                    backfaceVisibility: 'hidden'
                }}
            />
            
            {/* Right Door */}
            <div 
                ref={doorRightRef} 
                className="fixed top-0 right-0 w-1/2 h-screen bg-gradient-to-l from-black to-gray-900 z-[9999] hidden"
                style={{
                    perspective: '1000px',
                    backfaceVisibility: 'hidden'
                }}
            />
            
            {/* Content - Animation complete होने के बाद ही scroll animation enable करें */}
            <div 
                ref={pageRef} 
                className={`w-full h-full ${isAnimating ? 'pointer-events-none' : ''}`}
            >
                {children}
            </div>
        </div>
    );
};

// Skiper Component - Projects Section
const Skiper = () => {
    const container = useReactRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    // All Projects Data
    const allProjects = [
        {
            id: 1,
            title: "Shiv Gauri",
            subtitle: "Infrastructure Services",
            description: "Shiv Gauri Infra Project provides reliable Fabrication, O&M, and R&M services.",
            results: "Reliable Infra Services",
            year: "2024",
            tech: ["React", "Node.js", "MongoDB", "Stripe"],
            link: "https://shivgauriinfra.com/",
            bgImage: "/Shiv.png"
        },
        // ... बाकी projects
    ];

    const desktopProjectPairs = [
        { id: 1, left: allProjects[0], right: allProjects[1] },
        { id: 2, left: allProjects[2], right: allProjects[3] },
        { id: 3, left: allProjects[4], right: allProjects[5] }
    ];

    // Project Card Component
    const ProjectCard = ({ project }) => {
        return (
            <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl h-full block"
            >
                <div className="absolute inset-0">
                    <img 
                        src={project.bgImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                </div>

                <div className="relative h-full p-6 flex flex-col justify-between z-10">
                    <div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                <p className="text-gray-300">{project.subtitle}</p>
                            </div>
                            <span className="text-white/70 text-sm">{project.year}</span>
                        </div>
                        <p className="text-gray-300 mt-4 text-sm">{project.description}</p>
                    </div>

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

    // Desktop Project Pair Component - FIXED VERSION
    const DesktopProjectPair = ({ i, pair, progress, range, targetScale }) => {
        const scale = useTransform(progress, range, [1, targetScale]);
        const opacity = useTransform(progress, [range[0], range[1] - 0.1], [1, 0]);

        return (
            <motion.div 
                style={{ 
                    scale, 
                    opacity,
                    position: "sticky",
                    top: "20vh",
                    marginTop: i === 0 ? "0" : "-30vh"
                }}
                className="flex justify-center items-center mb-[40vh]"
            >
                <div className="flex gap-8 w-full max-w-[1100px] h-[400px] px-4">
                    <div className="flex-1 h-full">
                        <ProjectCard project={pair.left} />
                    </div>
                    <div className="flex-1 h-full">
                        <ProjectCard project={pair.right} />
                    </div>
                </div>
            </motion.div>
        );
    };

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

            <ReactLenis root options={{ lerp: 0.05, smoothWheel: true, syncTouch: true }}>
                <main
                    ref={container}
                    className="relative min-h-[300vh]"
                >
                    {/* MOBILE VIEW */}
                    <div className="lg:hidden w-full max-w-4xl mx-auto space-y-6 px-4">
                        {allProjects.map((project) => (
                            <div key={project.id} className="h-[300px] w-full">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>

                    {/* DESKTOP VIEW */}
                    <div className="hidden lg:block relative">
                        {desktopProjectPairs.map((pair, i) => {
                            const targetScale = 1 - (i * 0.1);
                            const rangeStart = i * 0.25;
                            const rangeEnd = Math.min(rangeStart + 0.35, 1);
                            
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
                        
                        {/* Scroll spacer */}
                        <div className="h-[100vh]" />
                    </div>

                    {/* Projects Counter */}
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

// Main App Component
const App = () => {
    return (
        <Door>
            <Skiper />
        </Door>
    );
};

export default App;