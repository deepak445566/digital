import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'

const Door = (props) => {
    const currentPath = useLocation().pathname
    const doorRef = useRef(null)
    const pageRef = useRef(null)

    useGSAP(() => {
        const doors = document.querySelectorAll('.door-panel')
        
        const tl = gsap.timeline({
            defaults: {
                ease: "power2.inOut"
            }
        })

        // Show doors
        tl.set(doorRef.current, { display: 'block' })

        // Open doors from middle
        tl.to(doors, {
            scaleX: 0,
            stagger: 0.1,
            duration: 1,
            transformOrigin: "center center"
        })

        // Hide doors
        tl.to(doorRef.current, {
            display: 'none',
            duration: 0
        })

        // Show content
        tl.fromTo(pageRef.current,
            {
                clipPath: 'inset(0 50% 0 50%)'
            },
            {
                clipPath: 'inset(0 0% 0 0%)',
                duration: 1.2,
                ease: "power3.out"
            },
            "-=0.3"
        )

    }, [currentPath])

    return (
        <div className="relative w-full min-h-screen">
            {/* Door Container */}
            <div 
                ref={doorRef} 
                className="fixed inset-0 z-50 hidden flex"
            >
                {/* Left Door */}
                <div className="door-panel w-1/2 h-full bg-gradient-to-r from-gray-900 to-black"></div>
                
                {/* Right Door */}
                <div className="door-panel w-1/2 h-full bg-gradient-to-l from-gray-900 to-black"></div>
            </div>
            
            {/* Content with reveal effect */}
            <div 
                ref={pageRef}
                className="w-full h-full"
                style={{
                    clipPath: 'inset(0 0% 0 0%)'
                }}
            >
                {props.children}
            </div>
        </div>
    )
}

export default Door