import React from 'react';
import { motion } from 'framer-motion';
// Use your actual path for the gold bar image
import goldBarImage from "../assets/images/gold-bars-1.png"; 


// Team Data
const TEAM_MEMBERS = [
  { name: "Aqeel Ahmed", image: "" }, 
  { name: "Farhan Ali", image: "" }, 
  { name: "Urooj Hanif", image: "" },
  { name: "Bilal ", image: "" }, 
  { name: "Rahat ", image: "" }
];

const AnimatedTitle = ({ text }: { text: string }) => (
  <motion.span 
    className="inline-block font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 bg-[length:200%_auto] animate-pulse"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.5 }}
    transition={{ duration: 0.6 }}
  >
    {text}
  </motion.span>
)
const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center px-6 lg:px-20 overflow-hidden py-8 bg-gray-50">
      
      {/* --- Floating Gold Image (Right Side) --- */}
      <motion.div 
        className="absolute top-1/2 right-[-5%] lg:right-[3%] w-[650px] z-0 pointer-events-none"
        initial={{ opacity: 0, x: 100, y: "-50%", rotateY: -30 }} 
        animate={{ 
          opacity: 1, 
          x: 0,
          y: ["-50%", "-55%", "-50%"],
          rotateY: [0, 5, 0]
        }}
        transition={{
          opacity: { duration: 1.2 },
          x: { duration: 1.2 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <img 
          src={goldBarImage} 
          alt="Gold Bars" 
          className="drop-shadow-2xl w-full h-auto object-contain" 
        />
      </motion.div>

      {/* --- Main Content --- */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        
        <div className="space-y-6">
          <div className="space-y-2">
            
            {/* Animated Divider */}
            <motion.div 
              initial={{ width: 0 }} 
              whileInView={{ width: "5rem" }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: "easeOut" }} 
              className="h-1.5 bg-amber-500 mb-4 rounded-full shadow-md" 
            />
            
            <p className="text-amber-700 tracking-[0.3em] font-extrabold text-xs uppercase">
              Probability & Statistics Project
            </p>
            
            {/* Heading 1 */}
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter drop-shadow-md">
                STATISTICAL
              </h1>
            </motion.div>

            {/* Heading 2 */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <h2 className="text-6xl lg:text-8xl leading-[0.85] pb-2">
                <AnimatedTitle text="ANALYSIS OF GOLD" />
              </h2>
            </motion.div>
          </div>

          {/* --- Team Card --- */}
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.9 }} 
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 100 }}
            className="bg-white/70 backdrop-blur-xl border-2 border-amber-100 p-6 rounded-[2rem] shadow-xl w-full max-w-2xl hover:border-amber-300 transition-colors"
          >
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4 border-b-2 border-amber-100 pb-2">
              Our Team Members
            </h3>
            
            <div className="flex justify-around gap-3">
              {TEAM_MEMBERS.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.5 + (i * 0.08), type: "spring", stiffness: 200 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full border-[3px] border-amber-300 bg-gradient-to-b from-white to-amber-100 shadow-lg flex items-center justify-center overflow-hidden group-hover:border-amber-500 transition-colors">
                    {m.image ? (
                      <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-extrabold text-amber-800">
                        {m.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    )}
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-700 group-hover:text-amber-700 transition-colors">
                    {m.name.split(" ")[0]}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Supervisor Badge */}
            <div className="mt-5 flex flex-col md:flex-row justify-between items-center bg-zinc-100/80 rounded-xl p-3 border border-zinc-200 gap-3">
              <span className="text-xs text-zinc-500 italic font-semibold">Fall 2025 Session</span>
              <div className="flex items-center space-x-2">
                <span className="text-[0.65rem] uppercase tracking-wide font-bold text-zinc-500">Guided By:</span>
                <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-xs font-bold shadow-md tracking-wider">
                  Miss Nazia Sultana
                </span>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;