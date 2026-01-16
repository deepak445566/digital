import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../components/data/data';
import { 
  Sparkles, Rocket, Zap, Target, 
  TrendingUp, Shield, Clock, Users,
  ChevronLeft, Star, ExternalLink,
  PlayCircle, Grid3x3, Filter,
  BookOpen, ArrowRight
} from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ServiceSubservices = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPreview, setShowPreview] = useState(null);
  const [stats, setStats] = useState({
    projects: 0,
    successRate: 0,
    clients: 0,
    hours: 0
  });
  
  const service = services.find(s => s.id === parseInt(serviceId));
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Animated counters
  useEffect(() => {
    if (service) {
      const interval = setInterval(() => {
        setStats(prev => ({
          projects: Math.min(prev.projects + 25, 1500),
          successRate: Math.min(prev.successRate + 0.5, 98.7),
          clients: Math.min(prev.clients + 10, 850),
          hours: Math.min(prev.hours + 100, 24000)
        }));
      }, 20);
      
      return () => clearInterval(interval);
    }
  }, [service]);

  // GSAP Animations
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 50,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });
    }

    // Floating particles effect
    const particles = document.querySelectorAll('.floating-particle');
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: Math.random() * 40 - 20,
        x: Math.random() * 30 - 15,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [service]);

  // Filter subservices
  const filteredSubservices = service?.subservices?.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sub.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || sub.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="text-center max-w-md px-6">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-2xl opacity-20"></div>
            <div className="relative w-full h-full rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
          <p className="text-gray-300 mb-8">The service you're looking for has been moved or doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ChevronLeft className="w-5 h-5" />
              Return Home
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    );
  }

  const getGradient = (index) => {
    const gradients = [
      'from-blue-500 via-cyan-500 to-teal-500',
      'from-purple-500 via-pink-500 to-rose-500',
      'from-green-500 via-emerald-500 to-teal-500',
      'from-orange-500 via-amber-500 to-yellow-500',
      'from-indigo-500 via-purple-500 to-pink-500',
      'from-teal-500 via-cyan-500 to-blue-500'
    ];
    return gradients[index % gradients.length];
  };

  const getCategoryColor = (category) => {
    const colors = {
      premium: 'from-purple-500 to-pink-500',
      standard: 'from-blue-500 to-cyan-500',
      basic: 'from-green-500 to-emerald-500',
      custom: 'from-orange-500 to-amber-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute w-1 h-1 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">All Services</span>
            </button>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium">Premium</span>
              </div>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all hover:shadow-lg hover:shadow-blue-500/25">
                <BookOpen className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div ref={containerRef} className="pt-20 pb-32">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="relative z-10">
            {/* Service Icon with Glow */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className={`absolute inset-0 bg-gradient-to-r ${getGradient(service.id)} rounded-3xl blur-3xl opacity-30`}></div>
              <div className={`relative w-full h-full rounded-3xl bg-gradient-to-r ${getGradient(service.id)} flex items-center justify-center shadow-2xl`}>
                <div className="w-24 h-24 rounded-2xl bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    {service.icon || service.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm mb-6">
                <Rocket className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">
                  {service.category || 'Professional Service'}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent">
                  {service.name}
                </span>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  .
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
                {service.description}
              </p>

              {/* Animated Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { icon: <Target className="w-5 h-5" />, value: `${stats.projects}+`, label: 'Projects' },
                  { icon: <TrendingUp className="w-5 h-5" />, value: `${stats.successRate}%`, label: 'Success Rate' },
                  { icon: <Users className="w-5 h-5" />, value: `${stats.clients}+`, label: 'Happy Clients' },
                  { icon: <Clock className="w-5 h-5" />, value: `${stats.hours}+`, label: 'Hours' }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                        <div className="text-cyan-400">
                          {stat.icon}
                        </div>
                      </div>
                      <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Controls Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search subservices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>
            
            <div className="flex gap-2">
              {['all', 'premium', 'standard', 'basic'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    activeFilter === filter
                      ? `bg-gradient-to-r ${getCategoryColor(filter)} text-white shadow-lg`
                      : 'bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
              <button className="p-2 rounded-xl bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our Solutions
              </span>
              <span className="ml-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                ({filteredSubservices?.length || 0})
              </span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Grid3x3 className="w-4 h-4" />
              <span>Grid View</span>
            </div>
          </div>
        </section>

        {/* Subservices Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSubservices && filteredSubservices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSubservices.map((subservice, index) => (
                <div
                  key={subservice.id}
                  ref={el => cardsRef.current[index] = el}
                  className="group relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => navigate(`/subservice/${serviceId}/detail/${subservice.id}`)}
                >
                  {/* Card */}
                  <div className="relative h-full bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-3xl border border-gray-800 p-8 overflow-hidden transition-all duration-500 hover:border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer">
                    {/* Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Top Badge */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(subservice.category)} text-white text-xs font-bold`}>
                          {subservice.category?.toUpperCase() || 'STANDARD'}
                        </div>
                        <div className="px-2 py-1 rounded-full bg-gray-800 text-gray-400 text-xs font-medium">
                          #{index + 1}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-gradient-to-r group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-colors">
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${getGradient(index)} p-0.5`}>
                        <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                          <div className="text-3xl">
                            {subservice.icon || subservice.name.charAt(0)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                      {subservice.name}
                    </h3>
                    
                    <p className="text-gray-400 mb-8 line-clamp-3 leading-relaxed">
                      {subservice.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8 space-y-2">
                      {subservice.features?.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-cyan-400" />
                          </div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                      <div>
                        <span className="text-sm text-gray-400">Starting from</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">${subservice.price || 'Custom'}</span>
                          <span className="text-sm text-gray-400">/project</span>
                        </div>
                      </div>
                      
                      <button className="group/btn relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative px-6 py-3 rounded-xl bg-gray-800 group-hover/btn:bg-transparent transition-colors duration-300">
                          <span className="flex items-center gap-2 font-medium">
                            Explore
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Hover Effect Line */}
                    <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="max-w-md mx-auto">
                <div className="relative w-32 h-32 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-20"></div>
                  <div className="relative w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Zap className="w-16 h-16" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4">No Subservices Found</h3>
                <p className="text-gray-400 mb-8">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/25 transition-all"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10"></div>
            <div className="relative backdrop-blur-sm bg-gray-900/50 border border-gray-800 rounded-3xl p-12 text-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 mb-6">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">Premium Support</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Our team can create a tailored solution specifically for your business needs.
              </p>
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/25 transition-all overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  Request Custom Quote
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Helper components
const Search = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Check = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export default ServiceSubservices;