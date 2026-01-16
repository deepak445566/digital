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
import Footer from './components/Footer';

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
        <Route path="/projects" element={<Skiper/>}/>
        {/* Corrected Service Routes */}
        <Route path="/subservice/:serviceId/subservices" element={<ServiceSubservices />} />
        <Route path="/subservice/:serviceId/detail/:subserviceId" element={<ServiceDetail />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;