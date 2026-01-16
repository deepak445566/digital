import React, { useEffect, useState, useRef } from 'react';

const ModernAchievement = () => {
  const [counters, setCounters] = useState({
    clients: 0,
    products: 0,
    customers: 0,
    awards: 0
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const targetValues = {
    clients: 777,
    products: 478,
    customers: 637,
    awards: 10
  };

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1800;
    const steps = 60;
    
    const stepValues = {};
    Object.keys(targetValues).forEach(key => {
      stepValues[key] = targetValues[key] / steps;
    });

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      
      const newValues = {};
      Object.keys(targetValues).forEach(key => {
        const currentValue = stepValues[key] * currentStep;
        newValues[key] = currentStep >= steps ? targetValues[key] : Math.floor(currentValue);
      });

      setCounters(newValues);

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isVisible]);

  const achievements = [
    {
      id: 1,
      title: "Clients and Brands",
      count: counters.clients,
      suffix: "+",
      description: "Trusting partners across industries",
      delay: "delay-0"
    },
    {
      id: 2,
      title: "Products Delivered",
      count: counters.products,
      suffix: "+",
      description: "Successful project completions",
      delay: "delay-100"
    },
    {
      id: 3,
      title: "Happy Customers",
      count: counters.customers,
      suffix: "+",
      description: "Satisfied client relationships",
      delay: "delay-200"
    },
    {
      id: 4,
      title: "Award Wins",
      count: counters.awards,
      suffix: "+",
      description: "Industry recognition & excellence",
      delay: "delay-300"
    }
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-white text-black p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 pt-12">
          <div className="inline-block mb-6">
            <div className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
              Our Journey in Numbers
            </div>
            <div className="h-px w-16 bg-black mx-auto"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 exo">
            What We <span className="font-medium">Achieve</span>
          </h1>
          
          <p className="text-lg exo text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Years of excellence and trust reflected in our growing numbers. 
            Over a decade of delivering exceptional results across India and beyond.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 exo">
          {achievements.map((item) => (
            <div 
              key={item.id}
              className={`group transition-all duration-500 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${item.delay}`}
            >
              <div className="relative overflow-hidden">
                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></div>
                
                <div className="p-8">
                  <div className="flex items-baseline mb-4">
                    <span className="text-5xl md:text-6xl font-light tracking-tight">
                      {item.count}
                    </span>
                    <span className="text-2xl font-light ml-2">{item.suffix}</span>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="h-px bg-gray-200 mb-6"></div>
              <div className="text-sm text-gray-500 uppercase tracking-widest mb-2">
                Performance Metrics
              </div>
              <div className="text-2xl font-light">
                Consistent growth across all parameters
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-light mb-1">10+</div>
                <div className="text-sm text-gray-600">Years Excellence</div>
              </div>
              <div>
                <div className="text-3xl font-light mb-1">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="h-px bg-gray-200 absolute top-1/2 left-0 right-0 transform -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { year: '2013', event: 'Company Founded', desc: 'Started our journey' },
              { year: '2016', event: '100+ Clients', desc: 'Major milestone reached' },
              { year: '2019', event: 'Award Wins', desc: 'Industry recognition' },
              { year: '2023', event: '777+ Clients', desc: 'Current achievement' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-full mb-4 relative z-10">
                  <span className="font-medium">{item.year}</span>
                </div>
                <div className="font-medium mb-1">{item.event}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-24 text-center">
          <div className="inline-block px-8 py-4 border border-gray-300 rounded-full">
            <div className="text-sm text-gray-600">
              Building lasting relationships since 2013 • Pan-India presence • Global partnerships
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModernAchievement;