import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Join Our Team</h1>
          <p style={styles.heroSubtitle}>
            Be part of something amazing. Explore exciting career opportunities with us.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.sidebar}>
          <h3 style={styles.filterTitle}>Filter Jobs</h3>
          
          <div style={styles.filterSection}>
            <h4 style={styles.filterLabel}>Department</h4>
            <select 
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterSection}>
            <h4 style={styles.filterLabel}>Job Type</h4>
            <select 
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Types</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterSection}>
            <h4 style={styles.filterLabel}>Location</h4>
            <select 
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={() => setFilters({ department: 'all', type: 'all', location: 'all' })}
            style={styles.clearBtn}
          >
            Clear Filters
          </button>
        </div>

        <div style={styles.jobsSection}>
          <div style={styles.jobsHeader}>
            <h2 style={styles.jobsTitle}>Current Openings</h2>
            <p style={styles.jobsCount}>
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {loading ? (
            <div style={styles.loading}>
              <div style={styles.spinner}></div>
              <p>Loading job openings...</p>
            </div>
          ) : error ? (
            <div style={styles.errorBox}>
              <p>{error}</p>
              <button onClick={fetchJobs} style={styles.retryBtn}>Retry</button>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div style={styles.noJobs}>
              <p>No job openings match your filters.</p>
              <button 
                onClick={() => setFilters({ department: 'all', type: 'all', location: 'all' })}
                style={styles.viewAllBtn}
              >
                View All Jobs
              </button>
            </div>
          ) : (
            <div style={styles.jobsList}>
              {filteredJobs.map(job => (
                <div 
                  key={job._id} 
                  style={styles.jobCard}
                  onClick={() => setSelectedJob(job)}
                >
                  <div style={styles.jobCardHeader}>
                    <h3 style={styles.jobTitle}>{job.title}</h3>
                    <span style={styles.jobType}>{job.type}</span>
                  </div>
                  
                  <div style={styles.jobDetails}>
                    <div style={styles.jobDetail}>
                      <span style={styles.detailIcon}>📍</span>
                      <span>{job.location}</span>
                    </div>
                    <div style={styles.jobDetail}>
                      <span style={styles.detailIcon}>🏢</span>
                      <span>{job.department}</span>
                    </div>
                    <div style={styles.jobDetail}>
                      <span style={styles.detailIcon}>💼</span>
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  <div style={styles.jobFooter}>
                    <span style={styles.postedDate}>
                      Posted: {formatDate(job.postedDate)}
                    </span>
                    <button 
                      style={styles.viewBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div style={styles.modalOverlay} onClick={() => setSelectedJob(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeBtn}
              onClick={() => setSelectedJob(null)}
            >
              ×
            </button>
            
            <div style={styles.modalHeader}>
              <h2>{selectedJob.title}</h2>
              <div style={styles.modalBadges}>
                <span style={styles.modalBadge}>{selectedJob.department}</span>
                <span style={styles.modalBadge}>{selectedJob.type}</span>
                <span style={styles.modalBadge}>{selectedJob.location}</span>
              </div>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.modalSection}>
                <h3>Job Description</h3>
                <p>{selectedJob.description}</p>
              </div>

              {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                <div style={styles.modalSection}>
                  <h3>Responsibilities</h3>
                  <ul style={styles.list}>
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div style={styles.modalSection}>
                  <h3>Requirements</h3>
                  <ul style={styles.list}>
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={styles.modalSection}>
                <h3>Experience</h3>
                <p>{selectedJob.experience}</p>
              </div>

              {selectedJob.salary && (
                <div style={styles.modalSection}>
                  <h3>Salary Range</h3>
                  <p>
                    {selectedJob.salary.currency} {selectedJob.salary.min} - {selectedJob.salary.max}
                  </p>
                </div>
              )}

              {selectedJob.applicationDeadline && (
                <div style={styles.modalSection}>
                  <h3>Application Deadline</h3>
                  <p>{formatDate(selectedJob.applicationDeadline)}</p>
                </div>
              )}
            </div>

            <div style={styles.modalFooter}>
              <button 
                style={styles.applyBtn}
                onClick={() => alert(`Application process for ${selectedJob.title} would start here.`)}
              >
                Apply Now
              </button>
              <button 
                style={styles.closeModalBtn}
                onClick={() => setSelectedJob(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Can't find what you're looking for?</h2>
        <p style={styles.ctaText}>
          Send us your resume anyway! We're always looking for talented people.
        </p>
        <button 
          style={styles.ctaBtn}
          onClick={() => alert('Resume upload functionality would go here.')}
        >
          Submit Resume
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '80px 20px',
    textAlign: 'center'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6
  },
  mainContent: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '0 20px',
    gap: '30px'
  },
  sidebar: {
    flex: '0 0 250px',
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    height: 'fit-content',
    position: 'sticky',
    top: '20px'
  },
  filterTitle: {
    marginBottom: '25px',
    color: '#2c3e50'
  },
  filterSection: {
    marginBottom: '20px'
  },
  filterLabel: {
    marginBottom: '8px',
    color: '#555',
    fontSize: '14px'
  },
  filterSelect: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px'
  },
  clearBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '14px'
  },
  jobsSection: {
    flex: 1
  },
  jobsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  jobsTitle: {
    color: '#2c3e50',
    fontSize: '2rem'
  },
  jobsCount: {
    color: '#7f8c8d',
    fontSize: '14px'
  },
  loading: {
    textAlign: 'center',
    padding: '50px'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px'
  },
  errorBox: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '30px',
    borderRadius: '8px',
    textAlign: 'center'
  },
  retryBtn: {
    marginTop: '15px',
    padding: '10px 25px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  noJobs: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  viewAllBtn: {
    marginTop: '15px',
    padding: '10px 25px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  jobsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  jobCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
    }
  },
  jobCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px'
  },
  jobTitle: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    margin: 0,
    flex: 1
  },
  jobType: {
    backgroundColor: '#e8f4fd',
    color: '#3498db',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  jobDetails: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '20px'
  },
  jobDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#7f8c8d',
    fontSize: '14px'
  },
  detailIcon: {
    fontSize: '16px'
  },
  jobFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '15px',
    borderTop: '1px solid #eee'
  },
  postedDate: {
    fontSize: '12px',
    color: '#95a5a6'
  },
  viewBtn: {
    padding: '8px 20px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '10px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative'
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    color: '#7f8c8d',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  modalHeader: {
    padding: '30px 30px 20px 30px',
    borderBottom: '1px solid #eee'
  },
  modalBadges: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    flexWrap: 'wrap'
  },
  modalBadge: {
    backgroundColor: '#e8f4fd',
    color: '#3498db',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '14px'
  },
  modalBody: {
    padding: '30px'
  },
  modalSection: {
    marginBottom: '25px'
  },
  list: {
    paddingLeft: '20px',
    lineHeight: 1.8
  },
  modalFooter: {
    padding: '20px 30px',
    borderTop: '1px solid #eee',
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-end'
  },
  applyBtn: {
    padding: '12px 30px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  closeModalBtn: {
    padding: '12px 30px',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  ctaSection: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '60px 20px',
    textAlign: 'center',
    marginTop: '60px'
  },
  ctaTitle: {
    fontSize: '2rem',
    marginBottom: '20px'
  },
  ctaText: {
    fontSize: '1.1rem',
    maxWidth: '600px',
    margin: '0 auto 30px',
    opacity: 0.9
  },
  ctaBtn: {
    padding: '15px 40px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

// Add CSS animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default CareerPage;