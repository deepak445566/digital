import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../components/data/data';

const ServiceSubservices = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubservices, setFilteredSubservices] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const service = services.find(s => s.id === parseInt(serviceId));

  useEffect(() => {
    if (service?.subservices) {
      let filtered = service.subservices.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (activeFilter === 'monthly') {
        filtered = filtered.filter(sub => sub.price.includes('/month'));
      } else if (activeFilter === 'one-time') {
        filtered = filtered.filter(sub => !sub.price.includes('/month') && !sub.price.includes('Custom'));
      } else if (activeFilter === 'custom') {
        filtered = filtered.filter(sub => sub.price.includes('Custom'));
      }

      setFilteredSubservices(filtered);
    }
  }, [service, searchTerm, activeFilter]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors duration-200"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubserviceClick = (subserviceId) => {
    navigate(`/subservice/${serviceId}/detail/${subserviceId}`);
  };

  const getPriceType = (price) => {
    if (price.includes('/month')) return 'monthly';
    if (price.includes('Custom')) return 'custom';
    return 'one-time';
  };

  const priceTypeColors = {
    'monthly': 'bg-blue-100 text-blue-700',
    'one-time': 'bg-green-100 text-green-700',
    'custom': 'bg-purple-100 text-purple-700'
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">All Services</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900">{service.name}</h1>
              <p className="text-xs text-gray-500 mt-0.5">{service.subservices?.length} solutions available</p>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
              Premium Solutions
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {service.name} Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {service.description}
          </p>
        </div>

      

        {/* Solutions Grid */}
        {filteredSubservices.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Available Solutions
              </h2>
              <p className="text-gray-600">Select a solution to get detailed information and pricing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubservices.map((subservice, index) => (
                <div 
                  key={subservice.id}
                  className="group relative bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-gray-300 hover:scale-[1.01]"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleSubserviceClick(subservice.id)}
                >
                  {/* Price Type Badge */}
                  <div className="absolute top-6 right-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${priceTypeColors[getPriceType(subservice.price)]}`}>
                      {getPriceType(subservice.price).charAt(0).toUpperCase() + getPriceType(subservice.price).slice(1)}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border border-gray-200">
                      <span className="text-2xl font-bold text-gray-700">
                        {subservice.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {subservice.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                    {subservice.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-6 space-y-2.5">
                    {subservice.features?.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                          <svg className="w-full h-full text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 leading-tight">{feature}</span>
                      </div>
                    ))}
                    {subservice.features && subservice.features.length > 3 && (
                      <div className="text-sm text-gray-500 pl-8">
                        +{subservice.features.length - 3} more features
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  

                  {/* CTA Button */}
                  <div className="pt-6 border-t border-gray-100">
                    <button className="w-full py-3.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition-all duration-200 active:scale-95 group/btn">
                      <div className="flex items-center justify-center gap-2">
                        <span>View Details</span>
                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Solutions Found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm 
                ? `We couldn't find any solutions matching "${searchTerm}". Try searching with different keywords.`
                : 'No solutions available for this service category at the moment.'
              }
            </p>
            {searchTerm && (
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors duration-200"
                >
                  Clear Search
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Request Custom Solution
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8 md:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Our expert team can create a tailored solution specifically designed for your unique business requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                Request Custom Quote
              </button>
              <button 
                onClick={() => window.open('tel:+919667277348', '_blank')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors duration-200"
              >
                Call: +91 96672 77348
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} {service.name} Services. All rights reserved.
            </div>
            <div className="flex gap-6">
              <button 
                onClick={() => navigate('/')}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Back to Home
              </button>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSubservices;