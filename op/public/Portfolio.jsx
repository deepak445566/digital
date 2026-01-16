import React from 'react';

const Portfolio = () => {
  const portfolioProjects = [
    {
  id: 1,
  title: "Shiv Gauri",
  description: "Shiv Gauri Infra Project provides reliable Fabrication, O&M, and R&M services with precision, efficiency, and long-term infrastructure support.",
  image: "/images/Shiv.png",
  category: "Web Development",
  technologies: ["React", "Node.js", "MongoDB", "Stripe"],
  liveUrl: "https://shivgauriinfra.com/",
  featured: true
},

    {
      id: 2,
      title: "Power Crusies",
      description: "Power Cruises brings you unforgettable ocean journeys with luxury comfort and world-class travel experiences",
      image: "/images/PowerCrusies.png",
      category: "Web Development",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://powercruiseholidays.netlify.app/",
      featured: true
    },
    {
      id: 3,
      title: "Venus Geyser Service",
      description: "Venus Geyser Service provides fast, reliable, and expert geyser installation and repair solutions for your home and business.",
      image: "/images/Venus.png",
      category: "Web Development",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://venus-geyser-service.netlify.app/",
      featured: false
    },
    {
      id: 4,
      title: "Stellar Serve",
      description: "StellarServe provides fast and reliable indexing solutions to help blogs and websites get discovered quickly on search engines.",
      image: "/images/quick.png",
      category: "Web Development",
      technologies: ["Flutter", "Firebase", "Google Maps API"],
      liveUrl: "https://dapper-druid-feb24d.netlify.app/",
      featured: true
    },
    {
      id: 5,
      title: "Mahesh Painter",
      description: "Mahesh Painter delivers expert, high-quality residential and commercial painting services with a commitment to precision and perfection.",
      image: "/images/Mahesh.png",
      category: "Web Development",
      technologies: ["Vue.js", "Laravel", "MySQL"],
      liveUrl: "https://maheshpainter.in/",
      featured: false
    },
    {
      id: 6,
      title: "Mosaic Nature Stays",
      description: "Mosaic Nature Stays — a peaceful hotel retreat blending comfort, nature, and unforgettable hospitality.",
      image: "/images/Mosaic.png",
      category: "Web Development",
      technologies: ["React", "Python", "PostgreSQL"],
      liveUrl: "https://mosaicnaturestays.in/",
      featured: true
    },
    {
      id: 7,
      title: "Vivek Mehndi Artist",
      description: "Vivek Mehndi Artist – Bringing vibrant Haldi celebration artistry and stunning mehndi designs to make your special moments unforgettable.",
      image: "/images/Vivek.png",
      category: "Mobile App",
      technologies: ["Swift", "Kotlin", "Firebase"],
      liveUrl: "https://vivekmehndiartist.in/",
      featured: false
    },
    {
      id: 8,
      title: "pujacleanservice",
      description: "Ever since the inception of our company, we have delivered professional deep cleaning services, Pest Control and also Painting Services in Nellore to our clients based on their domestic as well as industrial requirements.",
      image: "/images/Puja.png",
      category: "Web Application",
      technologies: ["Angular", "Node.js", "MongoDB"],
      liveUrl: "https://pujacleanservice.in/",
      featured: true
    }
  ];

  const categories = ["All", "Web Development", "Mobile App", "Web Design", "Web Application"];

  const [activeCategory, setActiveCategory] = React.useState("All");
  const [visibleProjects, setVisibleProjects] = React.useState(6);

  const filteredProjects = activeCategory === "All" 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeCategory);

  const displayedProjects = filteredProjects.slice(0, visibleProjects);

  const handleProjectClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const loadMore = () => {
    setVisibleProjects(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF2D8] via-[#A7C5FF] to-[#7CA6FF] relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-400/20 rounded-full blur-2xl animate-float-slow"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-white/40 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/60 shadow-2xl mb-6">
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
            <span className="text-gray-900 font-bold text-lg tracking-wide">
              Our Portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Creative <span className="text-indigo-700">Portfolio</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Explore our latest projects and see how we transform ideas into digital reality
          </p>
        </div>

        {/* Category Filters */}
        

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.liveUrl)}
              className="group bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/60 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-semibold">Click to Visit →</span>
                </div>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Featured
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {project.category}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105 flex items-center space-x-2">
                    <span>Visit Website</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                  
                  <div className="text-gray-500 text-sm">
                    Live Demo
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/60 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Load More Projects
            </button>
          </div>
        )}

        {/* Stats Section */}
        {/* <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/60 shadow-2xl mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-indigo-700 mb-2">{portfolioProjects.length}+</div>
              <div className="text-gray-700 font-semibold">Projects</div>
            </div>
            <div>
              <div className="text-4xl font-black text-indigo-700 mb-2">{new Set(portfolioProjects.map(p => p.category)).size}</div>
              <div className="text-gray-700 font-semibold">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-black text-indigo-700 mb-2">100%</div>
              <div className="text-gray-700 font-semibold">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-black text-indigo-700 mb-2">50+</div>
              <div className="text-gray-700 font-semibold">Technologies</div>
            </div>
          </div>
        </div> */}

        {/* CTA Section */}
        {/* <div className="text-center mt-16">
          <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-12 border border-white/60 shadow-2xl">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
              Let's create something amazing together. Your next project could be featured here!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 transform transition-all duration-300">
                Start Your Project
              </button>
              <button className="bg-white/90 hover:bg-white text-indigo-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl border border-white/60 hover:scale-105 transform transition-all duration-300">
                View Case Studies
              </button>
            </div>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 10s ease-in-out infinite 2s;
        }
        .animate-float-slow {
          animation: float 12s ease-in-out infinite 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;