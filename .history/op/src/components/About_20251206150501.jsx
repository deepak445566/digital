import React, { useEffect, useRef } from 'react'
import AnimatedButton from "./v1/AnimatedButton"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);
function About() {
    const navigate = useNavigate();
   const goToContact = () => {
    navigate("/Contact");
  };
   const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Wrap each character in a span
    const text = textRef.current.innerText;
    textRef.current.innerHTML = text
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");

    const chars = textRef.current.querySelectorAll("span");

    gsap.fromTo(
      chars,
      { color: "#999999" }, // initial color
      {
        color: "#000000", // final color
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
        stagger: 0.5, // slight delay between characters
      }
    );
  }, []);

  return (
    <section  className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-30 max-md:px-4 mt-15 lg:mt-20 mont" id='about'>
      
    
                <div className="relative   rounded-2xl overflow-hidden shrink-0 -mt-5 lg:mt-0">
                    
                    <img className=" w-80 object-cover h-80 lg:h-100 rounded-2xl "
                        src="/main.avif"
                        alt="" />
                    <div className="flex items-center gap-1 max-w-72 absolute bottom-5 left-8 bg-white p-1.5 rounded-xl">
                        <div className="flex -space-x-4 shrink-0">
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-1" />
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[2]" />
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                                alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[3]" />
                            <div
                                className="flex items-center justify-center text-xs  text-white size-9 rounded-full border-[3px] border-white bg-black hover:-translate-y-1 transition z-[4]">
                                10+
                            </div>
                        </div>
                        <p className="text-sm font-medium text-slate-800">Connect And Build</p>
                    </div>
                </div>
                <div className="text-sm text-slate-600 max-w-xl ">
                    <h1 className=" relative group  text-4xl  uppercase font-semibold  alan hidden lg:block text-slate-700">ABOUT US
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#63D0C4] transition-all group-hover:w-40"></span>
                    </h1>
                    
                    <p ref={textRef} className="mt-5 font-semibold alan text-xl lg:text-2xl  ">Digita is a digital agency crafting innovative designs, powerful brands, 
                  and user-focused experiences. We turn ideas into impactful solutions throughcreativity, strategy, and technology — helping businesses grow and audiences connect.</p>
                    <button      onClick={goToContact} className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-white text-black  py-3 px-8 rounded-3xl  border-2 border-black text-lg"   >
                      
                         <AnimatedButton text="ENQUIRY"  />
                       
                    </button>
                </div>
            </section>
  )
}

export default About