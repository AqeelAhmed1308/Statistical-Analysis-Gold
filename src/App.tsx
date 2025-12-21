// src/App.jsx
import React from 'react';
import HeroSection from './components/HeroSection';
import DataDashboard from './components/DataDashboard';
// @ts-ignore
import DataVisualization from './components/DataVisualization'; // Check file name carefully!
import AnalyticsInterpretation from './components/AnalyticsInterpretation.tsx';
import SWOTAnalysis from './components/SWOTAnalysis';
import StrategicRecommendations from './components/StrategicRecommendations';

import ThankYouSlide from './components/ThankYouSlide';
import './App.css'; // Import your CSS file here

function App() {
  return (
    <div className="bg-luxury-cream min-h-screen relative font-sans text-slate-800 overflow-x-hidden selection:bg-amber-200">
      
      {/* ❌ REMOVED THE GLOBAL GLOW DIV FROM HERE 
         This was causing the "fog" shadow on Slides 1, 2, and 3.
         Your individual components now handle their own backgrounds perfectly.
      */}

      <HeroSection />
      <DataDashboard />
      <DataVisualization />
      <AnalyticsInterpretation />
      <SWOTAnalysis />
      <StrategicRecommendations />
      <ThankYouSlide />
    </div>
  );
}

export default App;