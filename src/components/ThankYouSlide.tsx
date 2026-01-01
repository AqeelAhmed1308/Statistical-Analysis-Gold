import React from 'react';
import { motion } from 'framer-motion';
import FallingText from '../components/FallingText.jsx';

const ThankYouSlide = () => {
  return (
    <div className="h-screen w-full bg-white relative flex flex-col items-center justify-center overflow-hidden font-sans">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-amber-50 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gray-50 rounded-full blur-[120px] pointer-events-none opacity-50" />

      {/* === PHYSICS LAYER (Full Screen, On Top) === */}
      {/* z-50 ensures it's on top. pointer-events-none lets you click through empty space if needed */}
      <div className="absolute inset-0 z-50 pointer-events-none">
          <div className="w-full h-full flex flex-col items-center justify-center">
              
              {/* === SPACER ADJUSTMENT === */}
              {/* Increased to h-52 (approx 13rem/208px) to push text down significantly */}
              {/* This solves the "pt 32 is not enough" issue */}
              <div className="h-52 shrink-0" /> 
              
              {/* Falling Text Component Wrapper */}
              {/* pointer-events-auto ensures the text receives the CLICK to start falling */}
              <div className="w-full h-full relative pointer-events-auto">
                  <FallingText
                      text="THANK YOU"
                      highlightWords={[]}
                      trigger="click"
                      backgroundColor="transparent"
                      wireframes={false}
                      gravity={0.6}
                      fontSize="9rem" // Big Bold Text
                      mouseConstraintStiffness={0.9}
                  />
              </div>
          </div>
      </div>

      {/* === STATIC VISUAL LAYER (Behind) === */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        
        {/* 1. Animated Checkmark */}
        {/* Kept mb-60 to maintain the gap between Tick and Text */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-24 h-24 mb-80 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-200"
        >
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        {/* 2. Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay:0.4, duration: 0.3 }}
          className="text-xl lg:text-2xl font-medium text-slate-500 mt-8"
        >
          For your attention and time.
        </motion.p>

        {/* Helper Text */}
        
      </div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-center z-10"
      >
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
            © 2025 All Rights Reserved - Made by WebdDou 💻 
        </p>
      </motion.div>

    </div>
  );
};

export default ThankYouSlide;