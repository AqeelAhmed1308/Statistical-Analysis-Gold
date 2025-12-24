import { motion } from 'framer-motion';
import { Heart, TrendingUp, ShieldCheck, CheckCircle } from 'lucide-react';
import goldBarBg from '../assets/images/gold-bars-1.png';

const AnimatedTitle = ({ text }: { text: string }) => (
  <span className="inline-block font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-700 to-amber-500 bg-[length:200%_auto] animate-pulse">
    {text}
  </span>
);

const RecCard = ({ title, icon: Icon, items, color, delay }: any) => {
  const colors: any = {
    rose: {
      border: 'border-rose-300', icon: 'text-rose-600', iconBg: 'bg-rose-100',
      title: 'text-rose-900', glow: 'from-rose-400 to-pink-600', bullet: 'text-rose-600'
    },
    blue: {
      border: 'border-blue-300', icon: 'text-blue-600', iconBg: 'bg-blue-100',
      title: 'text-blue-900', glow: 'from-blue-400 to-indigo-600', bullet: 'text-blue-600'
    },
    amber: {
      border: 'border-amber-300', icon: 'text-amber-600', iconBg: 'bg-amber-100',
      title: 'text-amber-900', glow: 'from-amber-400 to-orange-600', bullet: 'text-amber-600'
    }
  };

  const c = colors[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 } as any}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 } as any}
      viewport={{ once: false, amount: 0.3 } as any}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 80 } as any}
      whileHover={{ y: -8, scale: 1.02 } as any}
      style={{ transformStyle: "preserve-3d" } as any}
      className={`relative flex-1 flex flex-col bg-white/80 backdrop-blur-xl border-[3px] ${c.border} rounded-[2.5rem] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden group transition-all will-change-transform`}
    >
      {/* Background Gold Bar Watermark - MORE BLUR */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url(${goldBarBg})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)'
        }}
      />

      {/* Top Highlight Line with Glow */}
      <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${c.glow}`} />
      <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${c.glow} blur-sm animate-pulse`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <motion.div
            className={`p-4 rounded-3xl ${c.iconBg} ${c.icon} shadow-md border-2 border-white mb-3`}
            whileHover={{ scale: 1.1, rotate: 5 } as any}
          >
            <Icon size={40} strokeWidth={2.5} />
          </motion.div>
          <h3 className={`text-3xl font-black ${c.title} uppercase tracking-tight`}>{title}</h3>
        </div>

        {/* List Items */}
        <div className="flex-1 flex flex-col justify-center space-y-5">
          {items.map((item: any, i: number) => (
            <motion.div
              key={i}
              className="flex gap-3"
              initial={{ opacity: 0, x: -20 } as any}
              whileInView={{ opacity: 1, x: 0 } as any}
              viewport={{ once: false } as any}
              transition={{ delay: delay + (i * 0.1) } as any}
            >
              <div className={`mt-1 shrink-0 p-1 rounded-full ${c.iconBg}`}>
                <CheckCircle size={20} className={c.bullet} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-800 leading-tight mb-1">{item.head}</h4>
                <p className="text-base text-slate-600 font-medium leading-snug">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const StrategicRecommendations = () => {
  return (
    <div className="min-h-screen bg-[#fdfcf8] relative overflow-hidden flex flex-col py-12 font-sans">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[60vw] h-[60vw] bg-amber-100/30 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-[95%] max-w-[1800px] mx-auto flex-1 flex flex-col">

        {/* Header */}
        <div className="text-center mb-8">

          <motion.h2
            initial={{ opacity: 0, y: 20 } as any}
            whileInView={{ opacity: 1, y: 0 } as any}
            viewport={{ once: false } as any}
            transition={{ duration: 0.6 } as any}
            className="text-5xl lg:text-7xl font-black text-slate-800 leading-none"
          >
            STRATEGIC <AnimatedTitle text="RECOMMENDATIONS" />
          </motion.h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 pb-6">

          {/* For Weddings */}
          <RecCard
            title="For Weddings"
            icon={Heart}
            color="rose"
            delay={0.1}
            items={[
              {
                head: "Best Time to Buy",
                desc: "Buy in Jan/Feb. Rates are usually much cheaper in these months compared to Oct-Nov wedding season."
              },
              {
                head: "Plan 12 Months Ahead",
                desc: "If wedding is in December, buy gold in January. Save more than Rs 50,000 per tola by buying early."
              },
              {
                head: "Avoid Peak Season",
                desc: "Never buy in October & November. Prices are at yearly highs due to wedding demand."
              }
            ]}
          />

          {/* For Traders */}
          <RecCard
            title="For Traders"
            icon={TrendingUp}
            color="blue"
            delay={0.2}
            items={[
              {
                head: "Simple Profit Strategy",
                desc: "Buy when cheap in January, sell when expensive in October. This cycle repeats every year."
              },
              {
                head: "Protect Your Money",
                desc: "Use Stop-Loss. Market is risky and can drop 5% in one day. Always set limits."
              },
              {
                head: "Watch the News",
                desc: "Price changes instantly based on political news, IMF deals, and Dollar rate. Stay alert."
              }
            ]}
          />

          {/* Universal Advice */}
          <RecCard
            title="Universal Advice"
            icon={ShieldCheck}
            color="amber"
            delay={0.3}
            items={[
              {
                head: "Don't Store Cash",
                desc: "Gold increased 268%, Rupee lost value. Cash in cupboard is the worst way to save."
              },
              {
                head: "Expect Big Changes",
                desc: "Stable days are gone. Be ready for price swings of 1 Lakh Rupees within a year."
              },
              {
                head: "Have Patience (Sabar)",
                desc: "Short-term drops happen, but 6-year data shows it always goes up. Hold 3+ years for best profit."
              }
            ]}
          />
        </div>
      </div>

      {/* Smooth Transition to Final Slide */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#fdfcf8] z-30 pointer-events-none" />
    </div>
  );
};

export default StrategicRecommendations;