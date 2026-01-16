import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'

const Door = (props) => {
    const currentPath = useLocation().pathname
    const doorLeftRef = useRef(null)
    const doorRightRef = useRef(null)
    const pageRef = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: {
                ease: "power3.inOut"
            }
        })

        // Doors visible
        tl.set([doorLeftRef.current, doorRightRef.current], {
            display: 'flex'
        })

        // Door opening animation
        tl.to(doorLeftRef.current, {
            x: '-100%',
            rotationY: -30,
            duration: 1.5,
            transformOrigin: "right center",
            ease: "power3.out"
        }, 0)
        
        tl.to(doorRightRef.current, {
            x: '100%',
            rotationY: 30,
            duration: 1.5,
            transformOrigin: "left center",
            ease: "power3.out"
        }, 0)

        // Hide doors
        tl.to([doorLeftRef.current, doorRightRef.current], {
            display: 'none',
            duration: 0
        }, "+=0.3")

        // Show content
        tl.fromTo(pageRef.current,
            {
                opacity: 0,
                filter: "blur(10px)"
            },
            {
                opacity: 1,
                filter: "blur(0px)",
                duration: 1
            },
            "-=0.5"
        )

    }, [currentPath])

    return (
        <div className="relative w-full min-h-screen overflow-x-hidden">
            {/* Wooden Left Door */}
            <div 
                ref={doorLeftRef} 
                className="fixed top-0 left-0 w-1/2 h-screen z-50 hidden items-center justify-end pr-8"
                style={{
                    perspective: '1200px',
                    transformStyle: 'preserve-3d'
                }}
            >
                <div className="relative w-full h-full bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 shadow-2xl border-r-4 border-amber-600">
                    {/* Wood texture effect */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20"></div>
                    
                    {/* Door panels */}
                    <div className="absolute top-1/4 left-4 right-4 h-64 border-4 border-amber-600 rounded-lg"></div>
                    
                    {/* Door handle */}
                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                        <div className="w-4 h-16 bg-amber-300 rounded-full shadow-lg"></div>
                        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-amber-400 rounded-full"></div>
                    </div>
                </div>
            </div>
            
            {/* Wooden Right Door */}
            <div 
                ref={doorRightRef} 
                className="fixed top-0 right-0 w-1/2 h-screen z-50 hidden items-center justify-start pl-8"
                style={{
                    perspective: '1200px',
                    transformStyle: 'preserve-3d'
                }}
            >
                <div className="relative w-full h-full bg-gradient-to-l from-amber-900 via-amber-800 to-amber-700 shadow-2xl border-l-4 border-amber-600">
                    {/* Wood texture effect */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20"></div>
                    
                    {/* Door panels */}
                    <div className="absolute top-1/4 left-4 right-4 h-64 border-4 border-amber-600 rounded-lg"></div>
                    
                    {/* Door handle */}
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                        <div className="w-4 h-16 bg-amber-300 rounded-full shadow-lg"></div>
                        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-amber-400 rounded-full"></div>
                    </div>
                </div>
            </div>
            
            {/* Middle Line (Door gap) */}
            <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-2 h-screen bg-gradient-to-b from-yellow-600 via-yellow-500 to-transparent z-40 pointer-events-none"></div>
            
            {/* Content */}
            <div ref={pageRef} className="w-full h-full">
                {props.children}
            </div>
        </div>
    )
}

export default Door