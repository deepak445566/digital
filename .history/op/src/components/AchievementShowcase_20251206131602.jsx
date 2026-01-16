import React, { useEffect, useState } from 'react';

const AchievementShowcase = () => {
  const [counters, setCounters] = useState({
    clients: 0,
    products: 0,
    customers: 0,
    awards: 0
  });

  const targetValues = {
    clients: 777,
    products: 478,
    customers: 637,
    awards: 10
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepValues = {};
    
    // Calculate increment per step for each counter
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
  }, []);

  const achievements = [
    {
      id: 1,
      title: "Clients and Brands",
      count: counters.clients,
      suffix: "+",
      icon: "👥",
      color: "from-blue-500 to-cyan-500",
      description: "विश्वास करने वाले ग्राहक"
    },
    {
      id: 2,
      title: "Products Delivered",
      count: counters.products,
      suffix: "+",
      icon: "📦",
      color: "from-green-500 to-emerald-500",
      description: "सफलतापूर्वक वितरित"
    },
    {
      id: 3,
      title: "Happy Customers",
      count: counters.customers,
      suffix: "+",
      icon: "😊",
      color: "from-yellow-500 to-amber-500",
      description: "मुस्कुराए हुए ग्राहक"
    },
    {
      id: 4,
      title: "Award Wins",
      count: counters.awards,
      suffix: "+",
      icon: "🏆",
      color: "from-purple-500 to-pink-500",
      description: "पुरस्कारों से सम्मानित"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black p-6 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            What We <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Achieve</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Years of excellence and trust reflected in our growing numbers
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((item) => (
            <div 
              key={item.id}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`text-3xl p-3 rounded-xl bg-gradient-to-br ${item.color} text-white`}>
                  {item.icon}
                </div>
                <span className="text-sm font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  Growing
                </span>
              </div>
              
              <div className="mb-2">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                    {item.count}
                  </span>
                  <span className="text-2xl font-bold text-gray-700 ml-1">{item.suffix}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mt-2">{item.title}</h3>
              </div>
              
              <p className="text-gray-600 text-sm">{item.description}</p>
              
              {/* Progress indicator */}
              <div className="mt-4">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                    style={{ width: `${(item.count / targetValues[item.title.toLowerCase().split(' ')[0]]) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline and Description Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold mb-4">एक दशक की यात्रा</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                For over a decade, we've been delivering exceptional results and building lasting relationships with our clients across India and beyond.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-blue-600 font-bold text-lg">10+</div>
                  <div className="text-gray-600">Years of Excellence</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-green-600 font-bold text-lg">Pan-India</div>
                  <div className="text-gray-600">Presence</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-purple-600 font-bold text-lg">Global</div>
                  <div className="text-gray-600">Reach Beyond</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-300 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-300 rounded-full opacity-20"></div>
                <div className="relative bg-white p-6 rounded-2xl shadow-lg border">
                  <h3 className="font-bold text-xl mb-3">Our Growth Timeline</h3>
                  <div className="space-y-4">
                    {['2013: Founded', '2016: 100+ Clients', '2019: Award Wins', '2023: 777+ Clients'].map((milestone, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                        <span>{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="text-center py-8">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-gray-200">
            <span className="text-gray-700 font-medium">
              <span className="font-bold text-blue-600">1.5K+</span> Successful Projects | 
              <span className="font-bold text-green-600"> 98%</span> Client Satisfaction | 
              <span className="font-bold text-purple-600"> 24/7</span> Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementShowcase;