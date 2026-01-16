import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { services } from '../components/data/data';

const ServiceSubservices = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const service = services.find(s => s.id === parseInt(serviceId));

  useEffect(() => {
    if (service) {
      // Animation for page elements
      gsap.from('.subservice-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });

      gsap.from('.service-header', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
      });
    }
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubserviceClick = (subserviceId) => {
    navigate(`/subservice/${serviceId}/detail/${subserviceId}`);
  };

  // Default images if not available
  const getServiceImage = (service) => {
    return service.image || '/images/default-service.png';
  };

  const getSubserviceImage = (subservice) => {
    return subservice.image || '/images/default-subservice.png';
  };

  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-black transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </button>
        </div>

        {/* Service Header */}
        <div className="mb-12 service-header">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mr-6">
              <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">
                  {service.name.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                {service.name}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                {service.description}
              </p>
            </div>
          </div>
          
          {/* Subservices Count */}
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-8">
            <span className="text-gray-700 font-medium">
              {service.subservices.length} Subservices Available
            </span>
          </div>
        </div>

        {/* Debug: Check if subservices exist */}
        {service.subservices && service.subservices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.subservices.map((subservice, index) => (
              <div 
                key={subservice.id}
                className="subservice-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group border border-gray-200"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleSubserviceClick(subservice.id)}
              >
                {/* Subservice Icon */}
                <div className={`w-20 h-20 rounded-xl mb-6 flex items-center justify-center transition-all duration-300 ${hoveredIndex === index ? 'scale-110' : ''}`}
                     style={{
                       background: hoveredIndex === index 
                         ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                         : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                     }}>
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-700">
                      {subservice.name.charAt(0)}
                    </span>
                  </div>
                </div>
                
                {/* Subservice Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {subservice.name}
                </h3>
                
                {/* Subservice Description */}
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {subservice.description}
                </p>
                
                {/* View Details Button */}
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    View Details →
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${hoveredIndex === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Subservices Available</h3>
            <p className="text-gray-600 mb-6">This service doesn't have any subservices yet.</p>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Services
            </button>
          </div>
        )}

        {/* Debug Info - Remove in production */}
        <div className="mt-12 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Debug Information:</h4>
          <p className="text-sm text-gray-600">Service ID: {serviceId}</p>
          <p className="text-sm text-gray-600">Service Name: {service.name}</p>
          <p className="text-sm text-gray-600">Subservices Count: {service.subservices?.length || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceSubservices;