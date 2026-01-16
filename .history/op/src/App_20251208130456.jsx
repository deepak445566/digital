import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Skiper from './components/Portfolio';
import ModernAchievement from './components/AchievementShowcase';
import Reviews from './components/Reviews';
import Connect from './components/Connect';
import ServiceDetail from './pages/ServiceDetail';
import ServiceSubservices from './pages/ServiceSubservices';
import AllServices from './pages/AllServices'; // Create this page

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Homepage Route */}
        <Route path="/" element={
          <>
            <Home/>
            <About/>
            <Services/>
            <Skiper/>
            <ModernAchievement/>
            <Reviews/>
            <Connect/>
          </>
        } />
        
        {/* All Services Page */}
        <Route path="/services" element={<AllServices />} />
        
        {/* Service Category Page */}
        <Route path="/service/:serviceId/subservices" element={<ServiceSubservices />} />
        
        {/* Service Detail Route */}
        <Route path="/service/:serviceId/detail/:subserviceId" element={<ServiceDetail />} />
        
        {/* Individual Service Category Routes (Optional - for direct access) */}
        <Route path="/services/google-services" element={<ServiceSubservices serviceId="1" />} />
        <Route path="/services/google-ads" element={<ServiceSubservices serviceId="2" />} />
        <Route path="/services/website-development" element={<ServiceSubservices serviceId="3" />} />
        <Route path="/services/app-development" element={<ServiceSubservices serviceId="4" />} />
        <Route path="/services/crm-software" element={<ServiceSubservices serviceId="5" />} />
        <Route path="/services/video-editing" element={<ServiceSubservices serviceId="6" />} />
        <Route path="/services/celebrity-award" element={<ServiceSubservices serviceId="7" />} />
        <Route path="/services/combo-services" element={<ServiceSubservices serviceId="8" />} />
        
        {/* Catch all route - 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;