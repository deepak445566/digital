import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Skiper from './components/Portfolio';
import ModernAchievement from './components/AchievementShowcase';
import Reviews from './components/Reviews';
import Connect from './components/Connect';
import ServiceDetail from './pages/ServiceDetail';
import ServiceSubservices from './pages/ServiceSubservices';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CareerPage from './components/CareerPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* === PUBLIC ROUTES (No authentication required) === */}
        
        {/* Main Homepage Route */}
        <Route path="/" element={
          <>
            <Navbar isHomePage={true} />
            <Home />
            <About />
            <Services />
            <Skiper />
            <ModernAchievement />
            <Reviews />
            <Connect />
            <Footer />
          </>
        } />
        
        {/* Individual Pages */}
        <Route path="/projects" element={
          <>
            <Navbar isHomePage={false} />
            <Skiper />
            <Footer />
          </>
        }/>
        
        <Route path="/contact" element={
          <>
            <Navbar isHomePage={false} />
            <Contact />
            <Footer />
          </>
        }/>
        
        <Route path="/term" element={
          <>
            <Navbar isHomePage={false} />
            <Terms />
            <Footer />
          </>
        }/>
        
        <Route path="/privacy" element={
          <>
            <Navbar isHomePage={false} />
            <Privacy />
            <Footer />
          </>
        }/>
        
        <Route path="/refund" element={
          <>
            <Navbar isHomePage={false} />
            <Refund />
            <Footer />
          </>
        }/>
        
        {/* Career Page */}
        <Route path="/careers" element={
          <>
            <Navbar isHomePage={false} />
            <CareerPage />
            <Footer />
          </>
        }/>
        
        {/* Service Routes */}
        <Route path="/subservice/:serviceId/subservices" element={
          <>
            <Navbar isHomePage={false} />
            <ServiceSubservices />
            <Footer />
          </>
        } />
        
        <Route path="/subservice/:serviceId/detail/:subserviceId" element={
          <>
            <Navbar isHomePage={false} />
            <ServiceDetail />
            <Footer />
          </>
        } />
        
        {/* === ADMIN ROUTES (Authentication required) === */}
        
        {/* Admin Login Page */}
        <Route path="/admin/login" element={
          !isAuthenticated ? 
          <Login setIsAuthenticated={handleLogin} /> : 
          <Navigate to="/admin/dashboard" />
        } />
        
        {/* Admin Dashboard (Protected) */}
        <Route path="/admin/dashboard" element={
          isAuthenticated ? 
          <Dashboard setIsAuthenticated={setIsAuthenticated} onLogout={handleLogout} /> : 
          <Navigate to="/admin/login" />
        } />
        
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;