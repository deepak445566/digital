import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Door = (props) => {
    const location = useLocation()
    const currentPath = location.pathname
    
    const stairParentRef = useRef(null)
    const pageRef = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: {
                ease: "power2.inOut"
            }
        })
        
        tl.set(stairParentRef.current, {
            display: 'block',
        })
        tl.from('.stair', {
            height: 0,
            stagger: {
                amount: -0.2,
                from: "end"
            }
        })
        tl.to('.stair', {
            y: '100%',
            stagger: {
                amount: -0.25,
                from: "end"
            }
        })
        tl.to(stairParentRef.current, {
            display: 'none',
            duration: 0
        })
        tl.to('.stair', {
            y: '0%',
            stagger: {
                amount: 0.1
            }
        })

        tl.fromTo(pageRef.current, {
            opacity: 0,
            scale: 1.2
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.8
        }, "-=0.5")

    }, [currentPath])

    return (
        <div className="relative">
            {/* Stair Animation Overlay */}
            <div 
                ref={stairParentRef} 
                className='h-screen w-full fixed z-50 top-0 left-0 pointer-events-none hidden'
            >
                <div className='h-full w-full flex'>
                    <div className='stair h-full w-1/5 bg-[#80D9CF]'></div>
                    <div className='stair h-full w-1/5 bg-[#80D9CF]'></div>
                    <div className='stair h-full w-1/5 bg-[#80D9CF]'></div>
                    <div className='stair h-full w-1/5 bg-[#80D9CF]'></div>
                    <div className='stair h-full w-1/5 bg-[#80D9CF]'></div>
                </div>
            </div>
            
            {/* Main Content */}
            <div ref={pageRef} className="page-content">
                {props.children}
            </div>
        </div>
    )
}

export default Door;