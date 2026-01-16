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
          <Route path="/service/:serviceId/subservices" element={<ServiceSubservices />} />
        {/* Service Detail Route */}
      <Route path="/subservice/:serviceId/detail/:subserviceId" element={<ServiceDetail />} />
        <Route path="/services/google-services" element={<ServiceSubservices serviceId="1" />} />
        <Route path="/services/google-ads" element={<ServiceSubservices serviceId="2" />} />
        <Route path="/services/website-development" element={<ServiceSubservices serviceId="3" />} />
        <Route path="/services/app-development" element={<ServiceSubservices serviceId="4" />} />
        <Route path="/services/crm-software" element={<ServiceSubservices serviceId="5" />} />
        <Route path="/services/video-editing" element={<ServiceSubservices serviceId="6" />} />
        <Route path="/services/celebrity-award" element={<ServiceSubservices serviceId="7" />} />
        <Route path="/services/combo-services" element={<ServiceSubservices serviceId="8" />} />
      </Routes>
    </Router>
  );
}

export default App;