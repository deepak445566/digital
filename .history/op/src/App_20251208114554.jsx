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
      <Route path="/subservice/:serviceId/detail/:subserviceId" element={<SubserviceDetail />} />
      </Routes>
    </Router>
  );
}

export default App;