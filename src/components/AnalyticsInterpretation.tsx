import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import Papa from 'papaparse';
import {
  TrendingUp, Calendar, AlertTriangle, ArrowUp, ChevronDown,
  Shield, Zap, Target, Clock, Ban, DollarSign,Flame
} from 'lucide-react';
// Make sure to add this with your other imports
import GoldBg from "../assets/images/gold-bars-1.png"; // Adjust path if needed

// --- Animated Title ---
const AnimatedTitle = ({ text }: { text: string }) => (
  <span className="inline-block font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-700 to-amber-500 bg-[length:200%_auto] animate-pulse">
    {text}
  </span>
);

// --- Reusable Insight Card (3D Effect + Golden Line) ---
const InsightCard = ({ icon: Icon, title, text, color = "amber", delay = 0 }: any) => {
  const colors: any = {
    green: { bg: 'bg-green-50', border: 'border-green-200', iconBg: 'bg-green-100', iconText: 'text-green-700', line: 'bg-green-500' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-100', iconText: 'text-blue-700', line: 'bg-blue-500' },
    red: { bg: 'bg-red-50', border: 'border-red-200', iconBg: 'bg-red-100', iconText: 'text-red-700', line: 'bg-red-500' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-amber-100', iconText: 'text-amber-700', line: 'bg-amber-500' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', iconBg: 'bg-purple-100', iconText: 'text-purple-700', line: 'bg-purple-500' },
  };
  const c = colors[color] || colors.amber;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, type: "spring", stiffness: 50 }} // Smoother animation
      className={`relative ${c.bg} backdrop-blur-2xl border ${c.border} rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all group overflow-hidden`}
    >
      {/* Golden Highlight Line */}
      <div className={`absolute top-0 left-0 w-full h-1.5 ${c.line}`} />

      <div className="flex items-start gap-5">
        <div className={`p-4 rounded-2xl ${c.iconBg} border-2 ${c.border} shrink-0 shadow-inner`}>
          <Icon className={`w-8 h-8 ${c.iconText}`} />
        </div>
        <div className="flex-1">
          <h4 className="text-xl lg:text-2xl font-black text-slate-800 mb-3 leading-tight">{title}</h4>
          <p className="text-base lg:text-lg text-slate-600 leading-relaxed font-medium">{text}</p>
        </div>
      </div>
    </motion.div>
  );
};

const AnalyticsInterpretation = () => {
  const [yearlyStats, setYearlyStats] = useState<any[]>([]);
  const [monthlyAvg, setMonthlyAvg] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse("/data/gold_price_data.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        const data = results.data
          .filter((row: any) => row.Date && typeof row.Integer_price === 'number' && !isNaN(row.Integer_price))
          .map((row: any) => {
            const parts = row.Date.split('/');
            return {
              date: row.Date,
              price: Number(row.Integer_price),
              year: parseInt(parts[2]),
              month: parseInt(parts[1])
            };
          });

        if (data.length > 0) {
          // --- Yearly Analysis ---
          const years = [...new Set(data.map((d: any) => d.year))].sort();
          let prevAvg = 0;
          const yearlyData = years.map((year: any) => {
            const yearPrices = data.filter((d: any) => d.year === year).map((d: any) => d.price);
            const avg = Math.round(yearPrices.reduce((a: number, b: number) => a + b, 0) / yearPrices.length);
            const highest = Math.max(...yearPrices);
            const lowest = Math.min(...yearPrices);
            let growth = 0;
            if (prevAvg > 0) growth = ((avg - prevAvg) / prevAvg) * 100;
            prevAvg = avg;

            return {
              year: year.toString(),
              average: avg,
              highest,
              lowest,
              range: highest - lowest,
              growth: parseFloat(growth.toFixed(1))
            };
          });
          setYearlyStats(yearlyData);

          // --- Monthly Analysis ---
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const monthlyData = Array.from({ length: 12 }, (_, i) => {
            const monthPrices = data.filter((d: any) => d.month === i + 1).map((d: any) => d.price);
            const avg = monthPrices.length > 0 ? Math.round(monthPrices.reduce((a: number, b: number) => a + b, 0) / monthPrices.length) : 0;
            return { name: monthNames[i], value: avg };
          });
          setMonthlyAvg(monthlyData);
          setLoading(false);
        }
      }
    });
  }, []);

  const CustomTooltip = ({ active, payload, label, suffix = "" }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur border-l-4 border-amber-500 p-3 rounded-xl shadow-2xl text-sm z-50">
          <p className="font-extrabold text-slate-700 text-base mb-1">{label}</p>
          <p className="text-amber-600 font-black text-xl">
            {payload[0].value.toLocaleString()}{suffix}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#fdfcf8] relative overflow-hidden font-sans">

      {/* === BACKGROUND IMAGE LAYER (Base Layer) === */}
      {/* Replace '/assets/images/hero-bg.png' with your actual Slide 1 image path */}
      <div
        className="fixed inset-0 w-full h-full z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/images/gold-m-bg.png')`, // Assumed path, matches your theme
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)'
        }}
      />

      {/* Additional Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-amber-300/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* ================= PART A: ANALYTICS ================= */}
      <section className="relative min-h-screen flex flex-col items-center justify-center py-16 z-10 w-full">

        {/* Container: Increased Width to 95% for wider look */}
        <div className="w-[95%] max-w-[1800px]">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-5xl lg:text-7xl font-black text-slate-800 leading-none drop-shadow-sm">
              ANALYTICS & <AnimatedTitle text="INTERPRETATION" />
            </h2>
          </div>

          {/* Future Projections Card (Original Layout - Optimized Height) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            // CHANGED: Reduced padding (p-6), reduced margin (mb-6), tighter border radius
            className="bg-white/80 backdrop-blur-xl border-[3px] border-amber-300 rounded-[2.5rem] p-2 lg:p-8 mb-6 shadow-xl border-l-[8px] border-l-blue-600 relative overflow-hidden"
          >
            {/* Decorative Background Shape - Scaled down */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-bl-[100%] -z-10" />

            {/* Header Section - Tighter margins */}
            <div className="mb-6">
              <h3 className="text-2xl lg:text-3xl font-black text-blue-900 mb-2">Projected Future Prices</h3>
              <p className="text-lg lg:text-xl text-slate-700 leading-relaxed max-w-5xl">
                Based on the historical growth rate (CAGR) observed from 2020-2025, the gold market in Pakistan shows a steady upward trend. Below are the projected milestones:
              </p>
            </div>

            {/* Grid Section - Tighter gaps (gap-6 instead of gap-10) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* 2026 */}
              <div className="flex items-start gap-4">
                {/* Smaller Icon Container */}
                <div className="p-2.5 bg-blue-100 rounded-xl text-blue-700 shrink-0 mt-1 shadow-inner"><TrendingUp size={24} /></div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-black text-slate-900 mb-1">2026: Rs 587,486</h4>
                  <p className="text-lg lg:text-x text-slate-700 leading-snug pl-4 border-l-2 border-blue-200">
                    Anticipated continuation of the bullish trend. This marks a likely <span className="font-black text-green-600 bg-green-50 px-1 rounded">12-15% increase</span> from current levels.
                  </p>
                </div>
              </div>
              {/* 2027 */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-100 rounded-xl text-blue-700 shrink-0 mt-1 shadow-inner"><TrendingUp size={24} /></div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-black text-slate-900 mb-1">2027: Rs 757,218</h4>
                  <p className="text-lg lg:text-x text-slate-700 leading-snug pl-4 border-l-2 border-blue-200">
                    A significant milestone where prices may solidify new support levels. Driven by growing international demand.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Charts Grid - Wider & Better Plotting */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

            {/* Yearly Growth Chart */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/80 backdrop-blur-xl border-2 border-amber-200 rounded-[3rem] p-8 shadow-2xl h-[350px] flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-amber-100">
                <div className="p-3 bg-green-100 rounded-2xl text-green-700"><TrendingUp size={28} /></div>
                <h4 className="text-2xl lg:text-3xl font-black text-slate-800">Yearly Growth Analysis</h4>
              </div>
              <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyStats} barSize={60}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 14, fill: '#475569', fontWeight: 800 }}
                      axisLine={false} tickLine={false} dy={10}
                    />
                    <YAxis
                      tick={{ fontSize: 14, fill: '#475569', fontWeight: 800 }}
                      axisLine={false} tickLine={false}
                      tickFormatter={(v: any) => `${v}%`}
                      width={45}
                    />
                    <Tooltip content={<CustomTooltip suffix="%" />} />
                    <Bar dataKey="growth" name="Growth %" radius={[12, 12, 0, 0]}>
                      {yearlyStats.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.growth >= 0 ? '#10b981' : '#ef4444'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Monthly Patterns Chart */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/80 backdrop-blur-xl border-2 border-amber-200 rounded-[3rem] p-8 shadow-2xl h-[350px] flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-amber-100">
                <div className="p-3 bg-blue-100 rounded-2xl text-blue-700"><Calendar size={28} /></div>
                <h4 className="text-2xl lg:text-3xl font-black text-slate-800">Monthly Patterns (Avg)</h4>
              </div>
              <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyAvg}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: '#475569', fontWeight: 800 }}
                      axisLine={false} tickLine={false} dy={10}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#475569', fontWeight: 800 }}
                      axisLine={false} tickLine={false}
                      tickFormatter={(v: any) => `${Math.round(v / 1000)}k`}
                      domain={['auto', 'auto']} // FIX: Ensures graph isn't flat
                      width={40}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#eab308"
                      strokeWidth={5}
                      dot={{ r: 6, fill: '#eab308', stroke: 'white', strokeWidth: 3 }}
                      activeDot={{ r: 9 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* High/Low Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            // Removed 'bg-white/80' and 'backdrop-blur' from here to control layers manually
            // Kept all layout/border/shadow/padding classes EXACTLY the same
            className="relative border-2 border-amber-200 rounded-[3rem] p-8 lg:p-10 shadow-2xl overflow-hidden"
          >
            {/* === BACKGROUND LAYER === */}
            {/* 1. The Blurred Image */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${GoldBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(12px)', // Blurs the background
                transform: 'scale(1.1)' // Scales up slightly to hide blur edges
              }}
            />
            {/* 2. White Overlay (Ensures text visibility on top of gold image) */}
            <div className="absolute inset-0 z-0 bg-white/85" />

            {/* === CONTENT LAYER (Relative z-10 to sit on top) === */}
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-amber-100">
                <div className="p-3 bg-orange-100 rounded-2xl text-orange-700"><Target size={28} /></div>
                <h4 className="text-2xl lg:text-3xl font-black text-slate-800">High & Low Points by Year</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-slate-500 font-black uppercase tracking-wider border-b-2 border-amber-100 text-lg">
                      <th className="py-4 px-6 text-left">Year</th>
                      <th className="py-4 px-6 text-right text-green-700">Highest</th>
                      <th className="py-4 px-6 text-right text-red-700">Lowest</th>
                      <th className="py-4 px-6 text-right text-amber-700">Range</th>
                    </tr>
                  </thead>
                  <tbody className="text-lg lg:text-xl">
                    {yearlyStats.map((stat: any, i: number) => (
                      <motion.tr
                        key={stat.year}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-amber-50 hover:bg-amber-50/50 transition-colors"
                      >
                        <td className="py-4 px-6 font-black text-slate-800">{stat.year}</td>
                        <td className="py-4 px-6 text-right font-bold text-green-600">Rs {stat.highest.toLocaleString()}</td>
                        <td className="py-4 px-6 text-right font-bold text-red-600">Rs {stat.lowest.toLocaleString()}</td>
                        <td className="py-4 px-6 text-right font-bold text-amber-600">Rs {stat.range.toLocaleString()}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* --- CONNECTED SEPARATOR ANIMATION --- */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#fdfcf8] z-20 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
          >
            <ChevronDown className="w-8 h-8 text-amber-500 animate-bounce" />
          </motion.div>
        </div>
      </section>


      {/* ================= PART B: INSIGHTS (9 Card Grid) ================= */}
      <section className="relative min-h-screen flex flex-col items-center justify-center py-20 bg-gradient-to-b from-[#fdfcf8] to-amber-50/50 z-10 w-full">
        <div className="w-[95%] max-w-[1800px]">

          {/* Header */}
          <div className="text-center mb-10">
  
            <h2 className="text-5xl lg:text-7xl font-black text-slate-800 mb-4">
              💡 KEY <AnimatedTitle text="INSIGHTS" />
            </h2>
          </div>

          {/* 9-Card Grid (3x3 Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* --- ROW 1: GROWTH & VALUE --- */}
            <InsightCard
              icon={TrendingUp}
              title="4x Price Growth"
              text="Prices jumped from 104k in 2020 to 383k in 2025. This is huge growth in just 5 years."
              color="green"
              delay={0.1}
            />
            <InsightCard
              icon={Zap}
              title="Biggest Year"
              text="2024 saw a record 47% price jump in a single year. The market moved faster than ever."
              color="green"
              delay={0.15}
            />
            <InsightCard
              icon={Shield}
              title="Better Than Cash"
              text="Gold kept its value while the rupee lost value. It is the safest way to store wealth."
              color="blue"
              delay={0.2}
            />

            {/* --- ROW 2: PATTERNS --- */}
            <InsightCard
              icon={ArrowUp}
              title="Buy in Jan & Feb"
              text="History shows these are usually the cheapest months to buy gold."
              color="blue"
              delay={0.25}
            />
            <InsightCard
              icon={Flame}
              title="Sell in Oct & Nov"
              text="These months often have the highest prices. Good for selling, bad for buying."
              color="amber"
              delay={0.3}
            />
            <InsightCard
              icon={Calendar}
              title="Wedding Season"
              text="Prices go up by 15-20% when wedding season starts due to high demand."
              color="purple"
              delay={0.35}
            />

            {/* --- ROW 3: RISKS --- */}
            <InsightCard
              icon={AlertTriangle}
              title="Hard to Predict"
              text="The market is much more unstable now than it was in 2021."
              color="red"
              delay={0.4}
            />
            <InsightCard
              icon={Target}
              title="Daily Swings"
              text="Prices can change by 5% in just one day. This is risky for short-term traders."
              color="red"
              delay={0.45}
            />
            <InsightCard
              icon={Ban}
              title="Huge Price Gaps"
              text="The gap between low and high prices in a single year is now over Rs 145k."
              color="amber"
              delay={0.5}
            />

          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsInterpretation;