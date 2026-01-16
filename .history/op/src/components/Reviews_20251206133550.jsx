import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Reviews = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const highlightsRef = useRef([]);

  const testimonials = [
    {
      id: 1,
      company: "AODEX",
      name: "Lena Morales",
      position: "Co-Founder",
      quote: "He asked thoughtful, strategic questions that helped us clarify our message and visual identity. The result was a digital presence that feels alive, intuitive, and deeply aligned with our values.",
      highlight: "feels alive, intuitive, and deeply aligned"
    },
    {
      id: 2,
      company: "HER/MS",
      name: "Jasper Kwon",
      position: "Creative Director",
      quote: "His grasp of UI/UX principles is sophisticated, and he approaches every project with equal parts logic and imagination. What impressed me most was his ability to think like designer.",
      highlight: "equal parts logic and imagination"
    },
    {
      id: 3,
      company: "Rogental",
      name: "D. Robins",
      position: "Head of Marketing",
      quote: "Antoine is the kind of designer every marketing team dreams of working with. He listens deeply, understands the brand voice instantly, and brings ideas to life with clarity and creativity.",
      highlight: "listens deeply, understands instantly"
    }
  ];

  useEffect(() => {
    // Title reveal animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        }
      }
    );

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 80,
            scale: 0.95 
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            }
          }
        );
      }
    });

    // Highlight text animation
    highlightsRef.current.forEach((highlight, index) => {
      if (highlight) {
        gsap.fromTo(highlight,
          { width: 0 },
          {
            width: '100%',
            duration: 1.5,
            delay: index * 0.3 + 0.8,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: highlight,
              start: 'top 85%',
            }
          }
        );
      }
    });
  }, []);

  const handleCardHover = (index, isHovering) => {
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        y: isHovering ? -12 : 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white" ref={sectionRef}>
      <section className=" lg:py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Title Section */}
          <div className="text-center mb-20 lg:mb-28">
            <div ref={titleRef} className="inline-block">
              <div className="relative mb-5">
               
                <h1 className="text-6xl exo lg:text-7xl font-bold relative z-10 tracking-tight">
                  REVIEWS
                </h1>
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-white/30"></div>
                <span className="text-white/60 text-sm uppercase tracking-widest">Client Testimonials</span>
                <div className="h-px w-12 bg-white/30"></div>
              </div>
              
              <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto">
                What industry leaders say about our collaboration
              </p>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-24">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Card */}
                <div className="relative h-full p-8 lg:p-10 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500">
                  {/* Company logo indicator */}
                  <div className="absolute top-6 right-6 text-white/20 text-4xl font-bold">
                    0{testimonial.id}
                  </div>
                  
                  {/* Quote */}
                  <div className="mb-8">
                    <div className="text-white/30 text-5xl font-serif mb-6">
                      "
                    </div>
                    <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Highlight underline */}
                  <div className="mb-10 overflow-hidden">
                    <div 
                      ref={(el) => (highlightsRef.current[index] = el)}
                      className="h-px bg-gradient-to-r from-white/0 via-white to-white/0"
                    ></div>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-medium text-white/50 uppercase tracking-widest mb-2">
                        {testimonial.company}
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{testimonial.name}</h3>
                      <p className="text-white/70">{testimonial.position}</p>
                    </div>
                    
                    {/* Hover arrow */}
                    <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {[
              { value: "100%", label: "Client Satisfaction", sublabel: "across all projects" },
              { value: "4.9", label: "Average Rating", sublabel: "out of 5.0" },
              { value: "50+", label: "Repeat Clients", sublabel: "long-term partners" },
              { value: "24/7", label: "Support", sublabel: "always available" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-white/90 font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-white/50 uppercase tracking-widest">{stat.sublabel}</div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button className="group relative px-8 py-4 overflow-hidden rounded-full border border-white/20 hover:border-white transition-all duration-300">
              <div className="relative z-10 flex items-center gap-3">
                <span className="text-lg font-medium">View All Testimonials</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              {/* Hover background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Reviews;