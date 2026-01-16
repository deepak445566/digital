import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Reviews = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const testimonialsRef = useRef([]);
  const cardsRef = useRef([]);

  const testimonials = [
    {
      id: 1,
      company: "AODEX",
      name: "Lena Morales",
      position: "Co-Founder",
      quote: "He asked thoughtful, strategic questions that helped us clarify our message and visual identity. The result was a digital presence that feels alive, intuitive, and deeply aligned with our values.",
      highlight: "digital presence that feels alive"
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
    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        }
      }
    );

    // Testimonial cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            }
          }
        );
      }
    });

    // Testimonial text animation
    testimonialsRef.current.forEach((text, index) => {
      if (text) {
        gsap.fromTo(text,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            delay: index * 0.2 + 0.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: text,
              start: 'top 90%',
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
        y: isHovering ? -10 : 0,
        scale: isHovering ? 1.02 : 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black" ref={sectionRef}>
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Title Section */}
          <div className="text-center mb-20 lg:mb-24">
            <div ref={titleRef} className="inline-block">
              <h1 className="text-6xl lg:text-8xl font-black tracking-tight mb-6">
                REVIEW
              </h1>
              <div className="h-px w-24 bg-black mx-auto mb-8"></div>
              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                What clients say about working together
              </p>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group cursor-pointer"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
              >
                {/* Testimonial Card */}
                <div className="h-full flex flex-col">
                  {/* Quote Container */}
                  <div className="flex-1 p-8 lg:p-10 border border-gray-200 rounded-2xl bg-white transition-all duration-300 group-hover:border-gray-300 group-hover:shadow-lg">
                    {/* Quote mark */}
                    <div className="text-5xl lg:text-6xl font-serif text-gray-300 mb-6 -mt-2">
                      "
                    </div>
                    
                    {/* Quote Text */}
                    <div 
                      ref={(el) => (testimonialsRef.current[index] = el)}
                      className="mb-8"
                    >
                      <p className="text-lg lg:text-xl text-gray-800 leading-relaxed">
                        {testimonial.quote.split(testimonial.highlight).map((part, i, arr) => (
                          <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && (
                              <span className="font-semibold text-black">
                                {testimonial.highlight}
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>

                    {/* Client Info */}
                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">
                            {testimonial.company}
                          </div>
                          <h3 className="text-xl lg:text-2xl font-bold mb-1">
                            {testimonial.name}
                          </h3>
                          <p className="text-gray-600">
                            {testimonial.position}
                          </p>
                        </div>
                        
                        {/* Hover Arrow */}
                        <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-24 lg:mt-32 pt-12 border-t border-gray-200">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "100+", label: "Projects Completed" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "4.9/5", label: "Average Rating" },
                { value: "50+", label: "Repeat Clients" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-light mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 text-center">
            <div className="inline-block px-8 py-4 border border-gray-300 rounded-full group cursor-pointer transition-all duration-300 hover:bg-black hover:border-black">
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium transition-colors duration-300 group-hover:text-white">
                  Read more client stories
                </span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Reviews;