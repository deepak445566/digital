import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar
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
import Door from './common/Door';

function App() {
  return (
    <Door>
    <Router>
      <Routes>
        {/* Main Homepage Route - Navbar Home में ही रहेगा */}
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
        
        {/* Individual Pages - यहाँ अलग से Navbar add करें */}
        <Route path="/projects" element={
          <>
            <Navbar isHomePage={false} />
            <Skiper/>
           
          </>
        }/>
        
        <Route path="/contact" element={
         
            <Contact/>
          
        }/>
        
        <Route path="/term" element={
          <>
            <Navbar isHomePage={false} />
            <Terms/>
          
          </>
        }/>
        
        <Route path="/privacy" element={
          <>
            <Navbar isHomePage={false} />
            <Privacy/>
          
          </>
        }/>
        
        <Route path="/refund" element={
          <>
            <Navbar isHomePage={false} />
            <Refund/>
         
          </>
        }/>
        
        {/* Service Routes */}
        <Route path="/subservice/:serviceId/subservices" element={
          <>
            <Navbar isHomePage={false} />
            <ServiceSubservices />
           
          </>
        } />
        
        <Route path="/subservice/:serviceId/detail/:subserviceId" element={
          <>
            <Navbar isHomePage={false} />
            <ServiceDetail />
            
          </>
        } />
      </Routes>
      <Footer/>
    </Router>
    </Door>
  );
}

export default App;