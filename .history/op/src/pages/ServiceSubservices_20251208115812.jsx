import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { services } from '../components/data/data';

const ServiceSubservices = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const service = services.find(s => s.id === parseInt(serviceId));


  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md px-6">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist or has been moved.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-8 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubserviceClick = (subserviceId) => {
    gsap.to('.subservice-card', {
      scale: 0.95,
      opacity: 0.5,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        navigate(`/subservice/${serviceId}/detail/${subserviceId}`);
      }
    });
  };

  // Generate gradient based on service ID
  const getGradient = (index) => {
    const gradients = [
      'from-blue-500 to-cyan-400',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-400',
      'from-orange-500 to-yellow-500',
      'from-red-500 to-pink-400',
      'from-indigo-500 to-purple-400'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-black  pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button - Floating */}
        <div className="fixed top-6 left-6 z-10">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg text-gray-700 hover:text-black transition-all duration-300 group border border-gray-200/50"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">All Services</span>
          </button>
        </div>

        {/* Service Header - Enhanced */}
        <div className="service-header mb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
            <div className="flex-1">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                Premium Service
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                {service.name}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-2">
                  .
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
                {service.description}
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${getGradient(service.id)} flex items-center justify-center shadow-xl`}>
                <div className="w-20 h-20 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {service.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl shadow-sm border border-gray-200">
              <span className="text-sm font-medium text-gray-500">Subservices</span>
              <span className="text-xl font-bold text-gray-900">{service.subservices.length}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl shadow-sm border border-gray-200">
              <span className="text-sm font-medium text-gray-500">Status</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-green-600 font-medium">Active</span>
              </span>
            </div>
          </div>
        </div>

        {/* Subservices Grid - Modern */}
        {service.subservices && service.subservices.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Subservices</h2>
              <p className="text-gray-600">Choose from our specialized offerings</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.subservices.map((subservice, index) => (
                <div 
                  key={subservice.id}
                  className="subservice-card group relative bg-white rounded-2xl p-7 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 overflow-hidden"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleSubserviceClick(subservice.id)}
                >
                  {/* Background Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Top Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                      #{index + 1}
                    </div>
                    {hoveredIndex === index && (
                      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-10 blur-md"></div>
                    )}
                  </div>
                  
                  {/* Icon with Animation */}
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 transform ${hoveredIndex === index ? 'scale-110 rotate-3' : ''}`}
                         style={{
                           background: hoveredIndex === index 
                             ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                             : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
                         }}>
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${hoveredIndex === index ? 'bg-white' : 'bg-white/80'}`}>
                        <span className={`text-2xl font-bold transition-all duration-500 ${hoveredIndex === index ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' : 'text-gray-700'}`}>
                          {subservice.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {subservice.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed">
                    {subservice.description}
                  </p>
                  
                  {/* Action Button */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <span className="relative">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-medium group-hover:opacity-0 transition-opacity duration-300">
                        Explore Details
                      </span>
                      <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                        Get Started →
                      </span>
                    </span>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 transform ${hoveredIndex === index ? 'scale-110 bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Coming Soon</h3>
              <p className="text-gray-600 mb-8 text-lg">
                We're currently developing subservices for this category. Stay tuned for updates!
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => navigate('/')}
                  className="px-8 py-3.5 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
                >
                  Browse Services
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3.5 bg-white text-gray-700 rounded-xl border border-gray-300 hover:border-gray-400 hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Get Notified
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="max-w-3xl mx-auto px-8 py-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl border border-blue-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Need Something Custom?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Don't see what you're looking for? Let's discuss your specific requirements.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-medium text-lg"
            >
              Request Custom Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSubservices;