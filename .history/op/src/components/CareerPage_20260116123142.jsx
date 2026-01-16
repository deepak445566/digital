import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMapPin, FiBriefcase, FiClock, FiFilter, FiX, FiChevronRight, FiDollarSign, FiCalendar, FiCheckCircle, FiSend } from 'react-icons/fi';
import { MdWork, MdLocationOn, MdBusiness, MdAccessTime, MdEmail, MdPhone } from 'react-icons/md';

const CareerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    department: 'all',
    type: 'all',
    location: 'all'
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [hoveredJob, setHoveredJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data.data);
    } catch (err) {
      setError('Failed to load job openings. Please try again later.');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const departments = [...new Set(jobs.map(job => job.department))];
  const jobTypes = [...new Set(jobs.map(job => job.type))];
  const locations = [...new Set(jobs.map(job => job.location))];

  const filteredJobs = jobs.filter(job => {
    if (filters.department !== 'all' && job.department !== filters.department) return false;
    if (filters.type !== 'all' && job.type !== filters.type) return false;
    if (filters.location !== 'all' && job.location !== filters.location) return false;
    return true;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      department: 'all',
      type: 'all',
      location: 'all'
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getJobTypeColor = (type) => {
    switch(type) {
      case 'Full-time': return 'bg-emerald-900 text-emerald-100 border border-emerald-700';
      case 'Part-time': return 'bg-blue-900 text-blue-100 border border-blue-700';
      case 'Contract': return 'bg-purple-900 text-purple-100 border border-purple-700';
      case 'Internship': return 'bg-amber-900 text-amber-100 border border-amber-700';
      case 'Remote': return 'bg-cyan-900 text-cyan-100 border border-cyan-700';
      default: return 'bg-gray-800 text-gray-100 border border-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      {/* Hero Section - Dark Theme */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
        <div className="relative px-4 py-24 md:py-32 lg:py-40">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Dream Team</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Build the future with us. Discover opportunities that match your passion and ambition.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#job-openings" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30">
                Explore Opportunities
              </a>
              <button className="px-8 py-4 border-2 border-cyan-500/50 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500/10 transition-all duration-300 backdrop-blur-sm">
                <span className="flex items-center">
                  <MdPhone className="mr-2" /> Contact HR
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-gray-950" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,0 L0,100 Q500,80 1000,100 L1000,0 Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section - Dark Cards */}
      <div className="relative -mt-8 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: MdWork, label: 'Open Positions', value: jobs.length, color: 'cyan' },
            { icon: MdLocationOn, label: 'Locations', value: locations.length, color: 'emerald' },
            { icon: MdBusiness, label: 'Departments', value: departments.length, color: 'purple' }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
            >
              <div className="flex items-center">
                <div className={`p-3 bg-${stat.color}-900/30 rounded-xl mr-4 group-hover:bg-${stat.color}-900/50 transition-all duration-300`}>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12" id="job-openings">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Dark Theme */}
          <div className="lg:w-1/4">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-2xl p-6 sticky top-6 hidden lg:block">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <FiFilter className="mr-2 text-cyan-400" /> Filters
                </h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Clear All
                </button>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: 'Department', key: 'department', options: departments },
                  { label: 'Job Type', key: 'type', options: jobTypes },
                  { label: 'Location', key: 'location', options: locations }
                ].map((filter) => (
                  <div key={filter.key}>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">{filter.label}</label>
                    <select 
                      value={filters[filter.key]}
                      onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                    >
                      <option value="all" className="bg-gray-800">All {filter.label}s</option>
                      {filter.options.map(option => (
                        <option key={option} value={option} className="bg-gray-800">{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Active Filters */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Active Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.department !== 'all' && (
                    <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full text-sm border border-cyan-700/50">
                      {filters.department}
                    </span>
                  )}
                  {filters.type !== 'all' && (
                    <span className="px-3 py-1 bg-emerald-900/50 text-emerald-300 rounded-full text-sm border border-emerald-700/50">
                      {filters.type}
                    </span>
                  )}
                  {filters.location !== 'all' && (
                    <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm border border-purple-700/50">
                      {filters.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden w-full py-3 bg-gray-900 border border-gray-800 text-white rounded-xl shadow-lg flex items-center justify-center font-medium mb-6 hover:bg-gray-800 transition-colors"
            >
              <FiFilter className="mr-2 text-cyan-400" /> Filter Jobs
            </button>
          </div>

          {/* Jobs Section - Dark Cards */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">Current Openings</h2>
                <p className="text-gray-400 mt-2">
                  <span className="text-cyan-400 font-semibold">{filteredJobs.length}</span> position{filteredJobs.length !== 1 ? 's' : ''} available
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Sorted by: <span className="font-semibold text-gray-300">Newest</span>
                </span>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                <p className="mt-4 text-gray-400">Loading opportunities...</p>
              </div>
            ) : error ? (
              <div className="bg-red-900/20 border border-red-800/50 rounded-2xl p-8 text-center backdrop-blur-sm">
                <p className="text-red-300 mb-4">{error}</p>
                <button 
                  onClick={fetchJobs}
                  className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700">
                  <FiBriefcase className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No matching positions</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters or check back later.</p>
                <button 
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-lg hover:from-cyan-700 hover:to-blue-800 transition-colors font-medium"
                >
                  View All Opportunities
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map(job => (
                  <div 
                    key={job._id}
                    className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-cyan-500/50 overflow-hidden transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                    onMouseEnter={() => setHoveredJob(job._id)}
                    onMouseLeave={() => setHoveredJob(null)}
                    onClick={() => setSelectedJob(job)}
                  >
                    {/* Hover Gradient Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 transition-opacity duration-500 ${hoveredJob === job._id ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    <div className="relative p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getJobTypeColor(job.type)}`}>
                            {job.type}
                          </span>
                          <h3 className="text-xl font-bold text-white mt-3 group-hover:text-cyan-300 transition-colors">
                            {job.title}
                          </h3>
                        </div>
                        <FiChevronRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transform group-hover:translate-x-1 transition-all" />
                      </div>
                      
                      <p className="text-gray-400 mb-5 line-clamp-2">{job.description.substring(0, 120)}...</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-5">
                        <div className="flex items-center text-gray-300">
                          <MdBusiness className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm">{job.department}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <FiMapPin className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <FiBriefcase className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm">{job.experience}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <MdAccessTime className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm">{formatDate(job.postedDate)}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-5 border-t border-gray-800">
                        <div>
                          {job.salary && (
                            <div className="flex items-center text-cyan-300 font-semibold">
                              <FiDollarSign className="w-4 h-4 mr-1" />
                              <span>{job.salary.currency} {job.salary.min} - {job.salary.max}</span>
                            </div>
                          )}
                        </div>
                        <button className="px-4 py-2 bg-cyan-900/30 text-cyan-300 font-medium rounded-lg hover:bg-cyan-900/50 transition-colors text-sm border border-cyan-700/50">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal - Dark Theme */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-gray-900 border-l border-gray-800 shadow-2xl">
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Filters</h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6 flex-1 overflow-y-auto">
                {[
                  { label: 'Department', key: 'department', options: departments },
                  { label: 'Job Type', key: 'type', options: jobTypes },
                  { label: 'Location', key: 'location', options: locations }
                ].map((filter) => (
                  <div key={filter.key}>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">{filter.label}</label>
                    <select 
                      value={filters[filter.key]}
                      onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl"
                    >
                      <option value="all" className="bg-gray-800">All {filter.label}s</option>
                      {filter.options.map(option => (
                        <option key={option} value={option} className="bg-gray-800">{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-800">
                <div className="flex gap-3">
                  <button 
                    onClick={clearFilters}
                    className="flex-1 py-3 border-2 border-gray-700 text-gray-300 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-xl font-medium hover:from-cyan-700 hover:to-blue-800 transition-all"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Detail Modal - Dark Theme */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="sticky top-0 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{selectedJob.title}</h2>
              <button 
                onClick={() => setSelectedJob(null)}
                className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="p-6">
                {/* Job Header */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className={`px-4 py-2 rounded-full font-bold ${getJobTypeColor(selectedJob.type)}`}>
                    {selectedJob.type}
                  </span>
                  <span className="px-4 py-2 bg-cyan-900/50 text-cyan-300 rounded-full font-bold border border-cyan-700/50">
                    {selectedJob.department}
                  </span>
                  <span className="px-4 py-2 bg-purple-900/50 text-purple-300 rounded-full font-bold border border-purple-700/50">
                    <FiMapPin className="inline w-4 h-4 mr-1" /> {selectedJob.location}
                  </span>
                  {selectedJob.salary && (
                    <span className="px-4 py-2 bg-emerald-900/50 text-emerald-300 rounded-full font-bold border border-emerald-700/50">
                      <FiDollarSign className="inline w-4 h-4 mr-1" />
                      {selectedJob.salary.currency} {selectedJob.salary.min} - {selectedJob.salary.max}
                    </span>
                  )}
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-800/30 rounded-xl border border-gray-800">
                  <div>
                    <p className="text-sm text-gray-400">Experience</p>
                    <p className="font-semibold text-white">{selectedJob.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Posted Date</p>
                    <p className="font-semibold text-white">{formatDate(selectedJob.postedDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <div className="flex items-center">
                      <FiCheckCircle className="w-4 h-4 text-emerald-400 mr-1" />
                      <span className="font-semibold text-emerald-400">Active</span>
                    </div>
                  </div>
                  {selectedJob.applicationDeadline && (
                    <div>
                      <p className="text-sm text-gray-400">Deadline</p>
                      <p className="font-semibold text-amber-300">{formatDate(selectedJob.applicationDeadline)}</p>
                    </div>
                  )}
                </div>

                {/* Job Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="w-1 h-6 bg-cyan-500 mr-3 rounded-full"></span>
                    Job Description
                  </h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-300 leading-relaxed">{selectedJob.description}</p>
                  </div>
                </div>

                {/* Requirements */}
                {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="w-1 h-6 bg-cyan-500 mr-3 rounded-full"></span>
                      Requirements
                    </h3>
                    <ul className="space-y-3">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <FiChevronRight className="w-5 h-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Responsibilities */}
                {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="w-1 h-6 bg-emerald-500 mr-3 rounded-full"></span>
                      Responsibilities
                    </h3>
                    <ul className="space-y-3">
                      {selectedJob.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start">
                          <FiChevronRight className="w-5 h-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Application CTA */}
                <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl p-6 mb-6 border border-cyan-800/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Ready to Apply?</h3>
                      <p className="text-gray-300">Submit your application today and join our team!</p>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=thisdigitalexpressindia30@gmail.com&su=Job Application for ${encodeURIComponent(selectedJob.title)}&body=Hello Team,%0D%0A%0D%0AI want to apply for the position of ${encodeURIComponent(selectedJob.title)}.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0ARegards`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded-xl hover:from-cyan-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 flex items-center"
                      >
                        <FiSend className="mr-2" /> Apply Now
                      </a>
                      <button 
                        onClick={() => setSelectedJob(null)}
                        className="px-8 py-3 border-2 border-gray-700 text-gray-300 font-bold rounded-xl hover:bg-gray-800/50 hover:border-gray-600 transition-colors"
                      >
                        Save for Later
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section - Dark Theme */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Not Finding the Right Fit?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=thisdigitalexpressindia30@gmail.com&su=Resume Submission&body=Hello Team,%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0ARegards"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded-xl hover:from-cyan-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 inline-flex items-center justify-center"
            >
              <MdEmail className="mr-2" /> Submit Your Resume
            </a>
            <button className="px-8 py-4 border-2 border-cyan-500/50 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500/10 transition-all duration-300 backdrop-blur-sm">
              Contact Talent Team
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black border-t border-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 Digital Express. All rights reserved.</p>
          <p className="mt-2 text-gray-600">Building the future, one career at a time.</p>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;