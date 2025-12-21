import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, colorClass = "text-gold-600" }: any) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    // FIX: Added 'shadow-[inset_0_0_30px_rgba(251,191,36,0.15)]' for inner glow
    // FIX: Added 'border-y-2 border-gold-300' for the golden lines at top and bottom
    className="relative bg-white/90 backdrop-blur-xl border-x border-gold-100 border-y-4 border-y-gold-300/50 p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-glass hover:shadow-glow-text hover:border-y-gold-400 group overflow-hidden z-20 transition-all duration-300 shadow-[inset_0_0_20px_rgba(251,191,36,0.1)]"
  >
    {/* Moving Shine Effect */}
    <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-gold-100/40 to-transparent group-hover:left-[200%] transition-all duration-1000 ease-in-out skew-x-12"></div>
    
    <div className={`p-3 rounded-full mb-2 bg-gradient-to-br from-white to-gold-50 border border-gold-100 shadow-sm relative z-10 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-6 h-6 ${colorClass} drop-shadow-sm`} />
    </div>
    <h3 className="text-[0.65rem] font-extrabold text-slate-500 uppercase tracking-widest mb-1">{label}</h3>
    <p className={`text-xl lg:text-2xl font-black ${colorClass} drop-shadow-sm break-all`}>{value}</p>
  </motion.div>
);

export default StatCard;