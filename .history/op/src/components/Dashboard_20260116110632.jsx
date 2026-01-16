import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ onLogout }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/jobs/admin/all', {
        headers: { 'x-auth-token': token }
      });
      setJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/admin/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
      
      <div style={styles.content}>
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <h3>Total Jobs</h3>
            <p style={styles.statNumber}>{jobs.length}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Active Jobs</h3>
            <p style={styles.statNumber}>
              {jobs.filter(job => job.isActive).length}
            </p>
          </div>
        </div>
        
        <div style={styles.jobsSection}>
          <h2>Job Listings</h2>
          {loading ? (
            <p>Loading jobs...</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job._id}>
                    <td>{job.title}</td>
                    <td>{job.department}</td>
                    <td>{job.location}</td>
                    <td>{job.type}</td>
                    <td>
                      <span style={{
                        color: job.isActive ? 'green' : 'red',
                        fontWeight: 'bold'
                      }}>
                        {job.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  },
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  content: {
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  stats: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    flex: 1,
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '10px 0'
  },
  jobsSection: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  },
  'table th': {
    backgroundColor: '#34495e',
    color: 'white',
    padding: '12px',
    textAlign: 'left'
  },
  'table td': {
    padding: '12px',
    borderBottom: '1px solid #ddd'
  },
  'table tr:hover': {
    backgroundColor: '#f5f5f5'
  }
};

export default Dashboard;