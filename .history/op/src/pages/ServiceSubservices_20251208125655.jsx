import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { services } from '../components/data/data';

const ServiceSubservices = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, carousel, list
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);
  const particlesRef = useRef([]);
  const timelineRef = useRef(null);
  
  const service = services.find(s => s.id === parseInt(serviceId));

  // Categories from subservices
  const categories = service?.subservices ? 
    ['all', ...new Set(service.subservices.map(s => s.category || 'standard'))] : 
    ['all'];

  // Filter subservices
  const filteredSubservices = service?.subservices?.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || sub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Create floating particles
  useEffect(() => {
    particlesRef.current = [];
    const container = document.querySelector('.particles-container');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 rounded-full';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.background = getGradientColor(i % 6);
      particle.style.opacity = '0.3';
      particle.style.filter = 'blur(1px)';
      container.appendChild(particle);
      particlesRef.current.push(particle);
      
      // Animate particle
      gsap.to(particle, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        duration: 3 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  // GSAP animations on mount
  useEffect(() => {
    timelineRef.current = gsap.timeline();
    
    // Animate cards on load
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          scale: 0.8,
          rotation: -5,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)"
        });
      }
    });

    // Floating animation for service icon
    gsap.to('.floating-icon', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Pulse animation for CTA
    gsap.to('.pulse-cta', {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    return () => {
      timelineRef.current?.kill();
      particlesRef.current.forEach(p => p.remove());
    };
  }, [filteredSubservices]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center max-w-md px-6 relative">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-3xl"></div>
          
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 flex items-center justify-center animate-pulse">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-3">
              404
            </h1>
            <p className="text-gray-300 mb-8 text-lg">Service not in orbit</p>
            <button 
              onClick={() => navigate('/')}
              className="group relative px-8 py-4 bg-gradient-to-r from-gray-800 to-black rounded-2xl hover:rounded-3xl transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 text-white">
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return Home
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getGradientColor = (index) => {
    const gradients = [
      'linear-gradient(45deg, #667eea, #764ba2)',
      'linear-gradient(45deg, #f093fb, #f5576c)',
      'linear-gradient(45deg, #4facfe, #00f2fe)',
      'linear-gradient(45deg, #43e97b, #38f9d7)',
      'linear-gradient(45deg, #fa709a, #fee140)',
      'linear-gradient(45deg, #a8edea, #fed6e3)'
    ];
    return gradients[index % gradients.length];
  };

  const getCategoryColor = (category) => {
    const colors = {
      premium: 'from-purple-500 to-pink-500',
      standard: 'from-blue-500 to-cyan-500',
      basic: 'from-green-500 to-emerald-500',
      enterprise: 'from-orange-500 to-amber-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const handleCardClick = (subserviceId, index) => {
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        scale: 0.95,
        rotateY: 180,
        duration: 0.5,
        onComplete: () => {
          navigate(`/subservice/${serviceId}/detail/${subserviceId}`);
        }
      });
    }
  };

  const handleMouseMove = (e, index) => {
    if (!cardsRef.current[index]) return;
    
    const card = cardsRef.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;
    
    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      scale: 1.05,
      duration: 0.3
    });
  };

  const handleMouseLeave = (index) => {
    if (cardsRef.current[index]) {
      gsap.to(cardsRef.current[index], {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5
      });
    }
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    setScrollPosition(prev => Math.max(0, Math.min(prev + delta, 1000)));
    setDragStartX(e.clientX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 particles-container pointer-events-none"></div>
      
      {/* Interactive Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-blue-900/5 to-purple-900/5"></div>
      
      {/* Animated Grid Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #8882 1px, transparent 1px),
                           linear-gradient(to bottom, #8882 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 pt-24 pb-20">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">All Services</span>
            </button>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-xl p-1 border border-white/10">
              {['grid', 'carousel', 'list'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    viewMode === mode 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Service Header */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse"></span>
                <span className="text-sm font-medium text-cyan-300">Premium Service</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                  {service.name}
                </span>
                <span className="ml-4 inline-block floating-icon">✨</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
                {service.description}
              </p>
              
              {/* Interactive Stats */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="px-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {service.subservices?.length || 0}
                  </div>
                  <div className="text-sm text-gray-400">Solutions</div>
                </div>
                <div className="px-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    98%
                  </div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>
            
            {/* 3D Service Icon */}
            <div className="relative">
              <div className="floating-icon w-48 h-48 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 p-1 backdrop-blur-sm">
                <div 
                  className="w-full h-full rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center transform-gpu"
                  style={{
                    transform: 'perspective(1000px) rotateX(20deg) rotateY(-20deg)',
                    boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  <div className="w-32 h-32 rounded-2xl bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <span className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {service.icon || service.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold animate-bounce">
                NEW
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search solutions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 text-white placeholder-gray-500 transition-all group-hover:border-white/20"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  🔍
                </div>
              </div>
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105 ${
                    selectedCategory === category
                      ? `bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-lg`
                      : 'bg-black/30 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Subservices Display */}
        {filteredSubservices && filteredSubservices.length > 0 ? (
          <div className="max-w-7xl mx-auto px-6">
            {/* View Mode: Grid */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSubservices.map((subservice, index) => (
                  <div
                    key={subservice.id}
                    ref={el => cardsRef.current[index] = el}
                    className="relative group cursor-pointer transform-gpu"
                    style={{ perspective: '1000px' }}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    onClick={() => handleCardClick(subservice.id, index)}
                  >
                    {/* Card */}
                    <div className="relative h-full bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm rounded-3xl border border-white/10 p-8 overflow-hidden transition-all duration-500 hover:border-blue-500/50">
                      {/* 3D Effect Background */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: getGradientColor(index),
                          filter: 'blur(60px)'
                        }}
                      ></div>
                      
                      {/* Top Badge */}
                      <div className="flex justify-between items-start mb-8">
                        <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium">
                          #{String(index + 1).padStart(2, '0')}
                        </div>
                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(subservice.category)} text-white text-xs font-bold`}>
                          {subservice.category?.toUpperCase() || 'STANDARD'}
                        </div>
                      </div>
                      
                      {/* Icon */}
                      <div className="relative mb-8">
                        <div 
                          className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                          style={{
                            background: getGradientColor(index),
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          <div className="w-16 h-16 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-2xl font-bold">{subservice.icon || '⚡'}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-white transition-colors">
                        {subservice.name}
                      </h3>
                      
                      <p className="text-gray-400 mb-8 text-center line-clamp-2 leading-relaxed">
                        {subservice.description}
                      </p>
                      
                      {/* Features */}
                      <div className="mb-8 space-y-3">
                        {subservice.features?.slice(0, 2).map((feature, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                              <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-sm text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* CTA */}
                      <div className="text-center">
                        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 text-white font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300">
                          Explore Solution
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View Mode: Carousel */}
            {viewMode === 'carousel' && (
              <div 
                ref={carouselRef}
                className="relative overflow-hidden py-8"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                <div 
                  className="flex gap-8 transition-transform duration-300"
                  style={{ transform: `translateX(-${scrollPosition}px)` }}
                >
                  {filteredSubservices.map((subservice, index) => (
                    <div
                      key={subservice.id}
                      className="flex-shrink-0 w-80"
                      onClick={() => handleCardClick(subservice.id, index)}
                    >
                      <div className="relative h-96 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm rounded-3xl border border-white/10 p-8 overflow-hidden group cursor-pointer">
                        {/* Carousel specific styles */}
                        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"></div>
                        <h3 className="text-2xl font-bold mb-4">{subservice.name}</h3>
                        <p className="text-gray-400 mb-6">{subservice.description}</p>
                        <div className="absolute bottom-8 left-8 right-8">
                          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View Mode: List */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredSubservices.map((subservice, index) => (
                  <div
                    key={subservice.id}
                    className="group bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => handleCardClick(subservice.id, index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: getGradientColor(index) }}
                        >
                          <span className="text-lg font-bold">{subservice.icon || '●'}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">{subservice.name}</h4>
                          <p className="text-gray-400 text-sm">{subservice.description}</p>
                        </div>
                      </div>
                      <div className="text-blue-400 group-hover:translate-x-2 transition-transform">
                        →
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-6 text-center py-20">
            <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4">No Solutions Found</h3>
            <p className="text-gray-400 mb-8">
              Try adjusting your search criteria or browse all categories
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold hover:shadow-xl hover:shadow-blue-500/25 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-6 mt-24">
          <div className="relative rounded-3xl overflow-hidden pulse-cta">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
            <div className="relative backdrop-blur-sm bg-black/30 border border-white/10 rounded-3xl p-12 text-center">
              <h3 className="text-3xl font-bold mb-6">
                Need a <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Custom Solution</span>?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Our team specializes in creating tailored solutions that perfectly match your business requirements.
              </p>
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
                Request Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSubservices;