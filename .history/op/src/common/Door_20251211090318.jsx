import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Door = (props) => {
    const location = useLocation()
    const currentPath = location.pathname
    
    const doorLeftRef = useRef(null)
    const doorRightRef = useRef(null)
    const pageRef = useRef(null)
    
    // State to track initial load
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [previousPath, setPreviousPath] = useState(currentPath)

    useEffect(() => {
        // After first render, mark initial load as false
        setIsInitialLoad(false)
    }, [])

    useEffect(() => {
        // Update previous path when current path changes
        setPreviousPath(currentPath)
    }, [currentPath])

    useGSAP(() => {
        // Skip animation on initial load (page refresh)
        if (isInitialLoad) {
            // Immediately show content without animation
            gsap.set(pageRef.current, {
                opacity: 1,
                scale: 1
            })
            return
        }

        // Skip if same path (prevent animation on re-renders)
        if (previousPath === currentPath) {
            return
        }

        const tl = gsap.timeline({
            defaults: {
                ease: "power2.inOut"
            }
        })

        // दरवाजे दिखाएं
        tl.set([doorLeftRef.current, doorRightRef.current], {
            display: 'block'
        })

        // दरवाजे बंद से खोलना (middle से open)
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
            "<" // Same time as left door
        )

        // दरवाजे हटाएं
        tl.to([doorLeftRef.current, doorRightRef.current], {
            display: 'none',
            duration: 0
        })

        // Content show करें
        tl.fromTo(pageRef.current,
            {
                opacity: 0,
                scale: 0.95
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8
            },
            "-=0.5" // Overlap with door animation
        )

    }, [currentPath, isInitialLoad, previousPath])

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Left Door - Only show on non-initial loads */}
            {!isInitialLoad && (
                <div 
                    ref={doorLeftRef} 
                    className="fixed top-0 left-0 w-1/2 h-screen bg-gradient-to-r from-black to-gray-900 z-50 hidden shadow-2xl"
                    style={{
                        perspective: '1000px',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                        <div className="w-3 h-12 bg-yellow-500 rounded-full"></div>
                    </div>
                </div>
            )}
            
            {/* Right Door - Only show on non-initial loads */}
            {!isInitialLoad && (
                <div 
                    ref={doorRightRef} 
                    className="fixed top-0 right-0 w-1/2 h-screen bg-gradient-to-l from-black to-gray-900 z-50 hidden shadow-2xl"
                    style={{
                        perspective: '1000px',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                        <div className="w-3 h-12 bg-yellow-500 rounded-full"></div>
                    </div>
                </div>
            )}
            
            {/* Content - Always show */}
            <div 
                ref={pageRef} 
                className="w-full h-full"
                style={isInitialLoad ? { opacity: 1 } : {}}
            >
                {props.children}
            </div>
        </div>
    )
}

export default Door