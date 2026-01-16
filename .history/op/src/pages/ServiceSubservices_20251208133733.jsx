import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../components/data/data';

const ServiceSubservices = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const service = services.find(s => s.id === parseInt(serviceId));

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Filter subservices based on search
  const filteredSubservices = service.subservices?.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubserviceClick = (subserviceId) => {
    navigate(`/subservice/${serviceId}/detail/${subserviceId}`);
  };

  // Color palette for cards
  const cardColors = [
    'bg-blue-50 border-blue-200',
    'bg-green-50 border-green-200',
    'bg-purple-50 border-purple-200',
    'bg-amber-50 border-amber-200',
    'bg-cyan-50 border-cyan-200',
    'bg-rose-50 border-rose-200'
  ];

  const getCardColor = (index) => cardColors[index % cardColors.length];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <span>←</span>
              <span>All Services</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">{service.name}</h1>
              <p className="text-sm text-gray-500">{service.subservices?.length || 0} solutions</p>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Service Info */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {service.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {service.description}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search solutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Subservices Grid */}
        {filteredSubservices && filteredSubservices.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Solutions ({filteredSubservices.length})
              </h2>
              <p className="text-gray-600 mt-2">Choose from our expert solutions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubservices.map((subservice, index) => (
                <div 
                  key={subservice.id}
                  className={`group border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    getCardColor(index)
                  } ${
                    hoveredCard === index ? 'scale-[1.02]' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleSubserviceClick(subservice.id)}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        index % 6 === 0 ? 'bg-blue-100 text-blue-600' :
                        index % 6 === 1 ? 'bg-green-100 text-green-600' :
                        index % 6 === 2 ? 'bg-purple-100 text-purple-600' :
                        index % 6 === 3 ? 'bg-amber-100 text-amber-600' :
                        index % 6 === 4 ? 'bg-cyan-100 text-cyan-600' :
                        'bg-rose-100 text-rose-600'
                      }`}>
                        <span className="text-xl font-bold">
                          {subservice.name.charAt(0)}
                        </span>
                      </div>
                      <div className="px-3 py-1 bg-white rounded-full text-xs font-medium border">
                        #{index + 1}
                      </div>
                    </div>
                    
                    <span className={`text-lg ${
                      hoveredCard === index ? 'translate-x-1' : ''
                    } transition-transform`}>
                      →
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {subservice.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {subservice.description}
                  </p>

                  {/* Features */}
                  {subservice.features && subservice.features.length > 0 && (
                    <div className="mb-6 space-y-2">
                      {subservice.features.slice(0, ).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-green-600 text-sm">
                            ✓
                          </span>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="pt-4 border-t border-gray-200">
                    <button className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Solutions Found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm 
                ? `No solutions matching "${searchTerm}" found. Try a different search term.`
                : 'No solutions available for this service at the moment.'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </main>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gray-900 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Custom Solution?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our team can create a tailored solution specifically for your business needs.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-8 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Request Custom Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSubservices;