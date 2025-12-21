import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp } from 'lucide-react';
// Adjust path if needed
import goldBarBg from "../assets/images/gold-bars-1.png";

const AnimatedTitle = ({ text }: { text: string }) => (
  <span className="inline-block font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-700 to-amber-500 bg-[length:200%_auto] animate-pulse">
    {text}
  </span>
);

const InfoCard = ({ title, icon: Icon, text, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 } as any}
    whileInView={{ opacity: 1, y: 0, scale: 1 } as any}
    viewport={{ once: false } as any}
    transition={{ delay, duration: 0.5, type: "spring", stiffness: 120 } as any}
    whileHover={{ y: -5, scale: 1.02 } as any}
    // Added h-full to ensure equal height
    className="h-full relative bg-gradient-to-br from-amber-50 to-yellow-50 backdrop-blur-xl rounded-[2rem] border-[3px] border-amber-300 shadow-[0_10px_40px_rgba(217,119,6,0.2)] p-6 flex flex-col items-center text-center group overflow-hidden"
  >
    {/* Top Golden Line */}
    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-400 to-orange-500" />
    
    {/* Icon */}
    <motion.div 
      className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300 shadow-md mb-4"
      whileHover={{ scale: 1.1, rotate: 5 } as any}
    >
      <Icon className="w-8 h-8 text-amber-700" strokeWidth={2.5} />
    </motion.div>
    
    {/* Title */}
    <h3 className="font-black text-gray-900 text-lg uppercase leading-tight mb-3 tracking-wide">
      {title}
    </h3>
    
    {/* Content */}
    <p className="text-gray-700 text-base font-medium leading-snug">
      {text}
    </p>
  </motion.div>
);

const FinalVerdict = () => {
  return (
    <div className="h-screen bg-[#fdfcf8] relative overflow-hidden flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Background with Gold Bars - Heavy Blur */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${goldBarBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(15px)',
          opacity: 0.08
        }}
      />
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-0" />

      {/* Glow Effect */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-amber-200/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Content - One Screen View */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col h-full justify-center gap-6 py-4">
        
        {/* Header */}
        <div className="text-center mb-2 shrink-0">
          <motion.div 
            initial={{ scale: 0, opacity: 0 } as any}
            whileInView={{ scale: 1, opacity: 1 } as any}
            viewport={{ once: false } as any}
            transition={{ duration: 0.3, type: "spring" } as any}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-amber-200 text-amber-700 text-[0.7rem] font-black uppercase tracking-[0.3em] mb-3 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Final Verdict
          </motion.div>
          
          <motion.h4 
            initial={{ opacity: 0, y: 15 } as any}
            whileInView={{ opacity: 1, y: 0 } as any}
            className="text-gray-700 uppercase tracking-[0.2em] text-sm font-bold mb-1"
          >
            Gold Market in Pakistan
          </motion.h4>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 } as any}
            whileInView={{ opacity: 1, y: 0 } as any}
            transition={{ delay: 0.1 } as any}
            className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight drop-shadow-sm"
          >
            Beyond Just a '<AnimatedTitle text="Safe" />' Asset
          </motion.h1>
        </div>

        {/* 2 Info Cards - Row 1 (Equal Height) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
          <InfoCard
            title="Evolution of The Market"
            icon={Shield}
            text="Gold is no longer just a passive safety net. It has transformed into a dynamic, high-growth, and high-volatility financial arena."
            delay={0.2}
          />

          <InfoCard
            title="The Strategic Shift"
            icon={Zap}
            text="Success now demands smart timing, immense patience, and meticulous strategic planning."
            delay={0.3}
          />
        </div>

        {/* Dashboard + Conclusion - Row 2 (Equal Height) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
          
          {/* Key Metrics Dashboard - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 } as any}
            whileInView={{ opacity: 1, x: 0 } as any}
            viewport={{ once: false } as any}
            transition={{ delay: 0.4, duration: 0.5 } as any}
            className="h-full bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-xl rounded-[2rem] border-3 border-green-300 shadow-xl overflow-hidden flex flex-col"
          >
            <div className="bg-emerald-100 py-3 text-center border-b-2 border-green-300 shrink-0">
              <h3 className="text-green-900 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" /> Key Metrics Dashboard
              </h3>
            </div>

            <div className="p-6 flex justify-around items-center flex-1">
              {/* Metric 1 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-yellow-50 rounded-full border-4 border-yellow-300 flex flex-col items-center justify-center shadow-lg mb-2">
                  <span className="text-[0.6rem] font-bold text-gray-500 uppercase">Total</span>
                  <span className="text-2xl font-black text-green-700">+268%</span>
                </div>
                <span className="text-[0.7rem] font-bold text-gray-600 text-center">(Returns)</span>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full border-4 border-blue-300 flex flex-col items-center justify-center shadow-lg mb-2">
                  <span className="text-[0.6rem] font-bold text-gray-500 uppercase">Period</span>
                  <span className="text-2xl font-black text-blue-700">6 Yrs</span>
                </div>
                <span className="text-[0.7rem] font-bold text-gray-600 text-center">(View)</span>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-purple-50 rounded-full border-4 border-purple-300 flex flex-col items-center justify-center shadow-lg mb-2">
                  <span className="text-[0.6rem] font-bold text-gray-500 uppercase">Data</span>
                  <span className="text-xl font-black text-purple-700">2,175</span>
                </div>
                <span className="text-[0.7rem] font-bold text-gray-600 text-center">(Analysis)</span>
              </div>
            </div>
          </motion.div>

          {/* Conclusion - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 } as any}
            whileInView={{ opacity: 1, x: 0 } as any}
            viewport={{ once: false } as any}
            transition={{ delay: 0.4, duration: 0.5 } as any}
            className="h-full bg-white/95 backdrop-blur-md rounded-[2rem] border-l-8 border-green-500 p-8 text-center shadow-xl flex flex-col justify-center items-center"
          >
            <h3 className="text-gray-900 font-black text-xl uppercase mb-4 tracking-wide">
              🎯 Conclusion
            </h3>
            <p className="text-gray-800 text-lg font-semibold leading-relaxed">
              To thrive, investors must adapt to this new reality of rapid changes and substantial opportunities. 
              <br/>
              <span className="text-green-600 font-black text-2xl block mt-2">Plan wisely & act strategically.</span>
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default FinalVerdict;