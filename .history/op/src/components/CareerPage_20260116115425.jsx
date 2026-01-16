import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FiMapPin, FiBriefcase, FiClock, FiFilter, FiX, FiChevronRight, 
  FiDollarSign, FiCalendar, FiCheckCircle, FiUser, FiMail, 
  FiPhone, FiFileText, FiUpload, FiLinkedin, FiGithub 
} from 'react-icons/fi';
import { MdWork, MdLocationOn, MdBusiness, MdAccessTime } from 'react-icons/md';

const CareerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    jobTitle: '',
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    coverLetter: '',
    resume: null
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [filters, setFilters] = useState({
    department: 'all',
    type: 'all',
    location: 'all'
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
      case 'Full-time': return 'bg-green-100 text-green-800';
      case 'Part-time': return 'bg-blue-100 text-blue-800';
      case 'Contract': return 'bg-purple-100 text-purple-800';
      case 'Internship': return 'bg-yellow-100 text-yellow-800';
      case 'Remote': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle Apply Now Button Click
  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setApplicationData(prev => ({
      ...prev,
      jobTitle: job.title
    }));
    setShowApplicationForm(true);
  };

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should be less than 5MB');
        return;
      }
      setApplicationData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  // Handle Form Submission to w3forms
  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!applicationData.fullName || !applicationData.email || !applicationData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    if (!applicationData.resume) {
      alert('Please upload your resume');
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append('access_key', 'ba2c15d0-aced-4c33-a33d-b0cc04c7d17b'); // Replace with your w3forms access key
    formData.append('subject', `Job Application: ${applicationData.jobTitle}`);
    formData.append('from_name', applicationData.fullName);
    formData.append('email', applicationData.email);
    formData.append('job_title', applicationData.jobTitle);
    formData.append('full_name', applicationData.fullName);
    formData.append('email_address', applicationData.email);
    formData.append('phone_number', applicationData.phone);
    formData.append('linkedin_url', applicationData.linkedin || 'Not provided');
    formData.append('github_url', applicationData.github || 'Not provided');
    formData.append('cover_letter', applicationData.coverLetter || 'Not provided');
    formData.append('resume', applicationData.resume);
    formData.append('botcheck', ''); // For spam protection

    try {
      // Submit to w3forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setShowApplicationForm(false);
          setFormSubmitted(false);
          setApplicationData({
            jobTitle: '',
            fullName: '',
            email: '',
            phone: '',
            linkedin: '',
            github: '',
            coverLetter: '',
            resume: null
          });
        }, 3000);
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Download resume template
  const downloadResumeTemplate = () => {
    const templateContent = `
    Job Application Resume Template
    
    Personal Information:
    - Full Name: 
    - Email: 
    - Phone: 
    - LinkedIn: 
    - GitHub: 
    
    Professional Summary:
    [Write a brief summary about your professional background]
    
    Work Experience:
    - Company: [Company Name]
      Position: [Your Position]
      Duration: [Start Date - End Date]
      Responsibilities: [Key responsibilities and achievements]
    
    Education:
    - Degree: [Your Degree]
      Institution: [University/College]
      Year: [Graduation Year]
    
    Skills:
    - [Skill 1]
    - [Skill 2]
    - [Skill 3]
    
    Certifications (if any):
    - [Certification 1]
    - [Certification 2]
    `;
    
    const blob = new Blob([templateContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Resume_Template.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Same as before */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative px-4 py-24 md:py-32 lg:py-40">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Growing Team</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Shape the future with us. Discover opportunities that match your passion and skills.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#job-openings" className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                View Open Positions
              </a>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300">
                Why Join Us?
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-white" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,0 L0,100 Q250,50 500,100 Q750,0 1000,100 L1000,0 Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section - Same as before */}
      <div className="relative -mt-6 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl mr-4">
                <MdWork className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500">Open Positions</p>
                <p className="text-3xl font-bold text-gray-800">{jobs.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl mr-4">
                <MdLocationOn className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500">Locations</p>
                <p className="text-3xl font-bold text-gray-800">{locations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl mr-4">
                <MdBusiness className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500">Departments</p>
                <p className="text-3xl font-bold text-gray-800">{departments.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Same as before */}
      <div className="max-w-7xl mx-auto px-4 py-12" id="job-openings">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 hidden lg:block">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiFilter className="mr-2" /> Filters
                </h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear All
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <select 
                    value={filters.department}
                    onChange={(e) => handleFilterChange('department', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                  <select 
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  >
                    <option value="all">All Types</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <select 
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  >
                    <option value="all">All Locations</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Active Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.department !== 'all' && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {filters.department}
                    </span>
                  )}
                  {filters.type !== 'all' && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {filters.type}
                    </span>
                  )}
                  {filters.location !== 'all' && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {filters.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden w-full py-3 bg-white rounded-xl shadow-lg flex items-center justify-center font-medium mb-6"
            >
              <FiFilter className="mr-2" /> Filter Jobs
            </button>
          </div>

          {/* Jobs Section */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Current Openings</h2>
                <p className="text-gray-600 mt-2">
                  {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} available
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Sorted by: <span className="font-semibold">Newest</span>
                </span>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Loading job openings...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={fetchJobs}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <FiBriefcase className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No matching positions</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or check back later for new opportunities.</p>
                <button 
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View All Jobs
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map(job => (
                  <div 
                    key={job._id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getJobTypeColor(job.type)}`}>
                            {job.type}
                          </span>
                          <h3 className="text-xl font-bold text-gray-800 mt-2 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                        </div>
                        <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{job.description.substring(0, 120)}...</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MdBusiness className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm">{job.department}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FiMapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FiBriefcase className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm">{job.experience}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MdAccessTime className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm">{formatDate(job.postedDate)}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div>
                          {job.salary && (
                            <div className="flex items-center text-gray-700 font-medium">
                              <span>{job.salary.currency} {job.salary.min} - {job.salary.max}</span>
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedJob(job);
                          }}
                          className="px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors text-sm"
                        >
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

      {/* Job Detail Modal */}
      {selectedJob && !showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{selectedJob.title}</h2>
              <button 
                onClick={() => setSelectedJob(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="p-6">
                {/* Job Header */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className={`px-4 py-2 rounded-full font-semibold ${getJobTypeColor(selectedJob.type)}`}>
                    {selectedJob.type}
                  </span>
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                    {selectedJob.department}
                  </span>
                  <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-semibold">
                    <FiMapPin className="inline w-4 h-4 mr-1" /> {selectedJob.location}
                  </span>
                  {selectedJob.salary && (
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                      <FiDollarSign className="inline w-4 h-4 mr-1" /> {selectedJob.salary.currency} {selectedJob.salary.min} - {selectedJob.salary.max}
                    </span>
                  )}
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-semibold">{selectedJob.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Posted Date</p>
                    <p className="font-semibold">{formatDate(selectedJob.postedDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="flex items-center">
                      <FiCheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span className="font-semibold text-green-600">Active</span>
                    </div>
                  </div>
                  {selectedJob.applicationDeadline && (
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="font-semibold">{formatDate(selectedJob.applicationDeadline)}</p>
                    </div>
                  )}
                </div>

                {/* Job Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Job Description</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                  </div>
                </div>

                {/* Requirements */}
                {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Requirements</h3>
                    <ul className="space-y-3">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <FiChevronRight className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Responsibilities */}
                {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Responsibilities</h3>
                    <ul className="space-y-3">
                      {selectedJob.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start">
                          <FiChevronRight className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Application CTA */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Apply?</h3>
                      <p className="text-gray-600">Submit your application today and join our team!</p>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                      <button 
                        onClick={() => handleApplyNow(selectedJob)}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                      >
                        Apply Now
                      </button>
                      <button 
                        onClick={() => setSelectedJob(null)}
                        className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
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

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Apply for {applicationData.jobTitle}</h2>
                <p className="text-sm text-gray-600 mt-1">Please fill in your details below</p>
              </div>
              <button 
                onClick={() => {
                  setShowApplicationForm(false);
                  setFormSubmitted(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {formSubmitted ? (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Application Submitted!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for applying. We have received your application and will review it shortly.
                  </p>
                  <p className="text-sm text-gray-500">This window will close automatically...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FiUser className="inline w-4 h-4 mr-1" /> Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={applicationData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FiMail className="inline w-4 h-4 mr-1" /> Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={applicationData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="john@example.com"
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FiPhone className="inline w-4 h-4 mr-1" /> Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={applicationData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+1 (123) 456-7890"
                          required
                        />
                      </div>

                      {/* LinkedIn */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FiLinkedin className="inline w-4 h-4 mr-1" /> LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          value={applicationData.linkedin}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>

                      {/* GitHub */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FiGithub className="inline w-4 h-4 mr-1" /> GitHub Profile
                        </label>
                        <input
                          type="url"
                          name="github"
                          value={applicationData.github}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://github.com/username"
                        />
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FiFileText className="inline w-4 h-4 mr-1" /> Cover Letter (Optional)
                      </label>
                      <textarea
                        name="coverLetter"
                        value={applicationData.coverLetter}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us why you're interested in this position..."
                      />
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FiUpload className="inline w-4 h-4 mr-1" /> Resume *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                        <input
                          type="file"
                          id="resume"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label htmlFor="resume" className="cursor-pointer">
                          <div className="flex flex-col items-center">
                            <FiUpload className="w-10 h-10 text-gray-400 mb-3" />
                            <p className="text-gray-700 mb-1">
                              {applicationData.resume ? applicationData.resume.name : 'Click to upload resume'}
                            </p>
                            <p className="text-sm text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                            <button
                              type="button"
                              onClick={downloadResumeTemplate}
                              className="mt-4 text-sm text-blue-600 hover:text-blue-800"
                            >
                              Download Resume Template
                            </button>
                          </div>
                        </label>
                      </div>
                      {applicationData.resume && (
                        <p className="mt-2 text-sm text-green-600">
                          ✓ Resume uploaded: {applicationData.resume.name}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          type="button"
                          onClick={() => setShowApplicationForm(false)}
                          className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                        >
                          Submit Application
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-4">
                        By submitting this form, you agree to our privacy policy. Your information will be sent via w3forms.
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Not Finding the Right Fit?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => alert('General application form would open here')}
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Submit Your Resume
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-gray-900 transition-colors">
              Contact Talent Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;