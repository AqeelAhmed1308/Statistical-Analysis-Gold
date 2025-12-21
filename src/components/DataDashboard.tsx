import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Papa from 'papaparse';
import {
  Hash, Calculator, TrendingUp, BarChart3, Sigma, Activity,
  ChevronLeft, ChevronRight, Coins
} from 'lucide-react';
import {
  calculateMean, calculateMedian, calculateMode, calculateStdDev, calculateVariance,
  formatCurrency, isValidNumber
} from '../utils/statistics';
import StatCard from './StatCard';
// FIX 1: Corrected image name to singular 'bar' matching your assets
import goldBarImage from "../assets/images/gold-bars-1.png";

const AnimatedTitle = ({ text, className }: { text: string, className?: string }) => (
  <span className={`inline-block font-black tracking-tighter text-transparent bg-clip-text bg-shimmer-gold animate-shimmer-text bg-[length:200%_auto] ${className}`}>
    {text}
  </span>
);

const DataRow = ({ date, price, year }: any) => (
  <motion.tr
    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
    className="border-b-2 border-gold-100/50 last:border-0 hover:bg-gold-50 transition-colors group"
  >
    {/* FIX 2: Ensure date is rendered as a string */}
    <td className="py-4 pl-6 font-mono text-slate-600 font-bold text-lg group-hover:text-gold-700 transition-colors">{date}</td>
    <td className="py-4 text-right font-black text-slate-800 text-xl group-hover:text-gold-600 transition-colors">{formatCurrency(price)}</td>
    <td className="py-4 pr-6 text-right">
      <span className="px-3 py-1 bg-white text-gold-700 text-xs font-extrabold rounded-lg border border-gold-200 shadow-sm">{year}</span>
    </td>
  </motion.tr>
);

const DataDashboard = () => {
  const [stats, setStats] = useState({ count: "0", mean: "0", median: "0", mode: "0", stdDev: "0", variance: "0" });
  const [yearlyData, setYearlyData] = useState<any>({});
  const [years, setYears] = useState<number[]>([]);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);

  useEffect(() => {
    Papa.parse("/data/gold_price_data.csv", {
      download: true, header: true, dynamicTyping: true, skipEmptyLines: true,
      complete: (results: any) => {
        const cleanData = results.data
          .filter((row: any) => isValidNumber(Number(row.Integer_price)) && row.Date)
          .map((row: any) => ({
            ...row,
            price: Number(row.Integer_price),
            year: parseInt(row.Date.split('/')[2]),
            // FIX 3: Explicitly map the CSV Date column to lowercase 'date'
            date: row.Date 
          }));

        const prices = cleanData.map((d: any) => d.price);
        if (prices.length > 0) {
          const mean = calculateMean(prices);
          const varianceVal = calculateVariance(prices, mean);
          setStats({
            count: prices.length.toLocaleString(),
            mean: formatCurrency(Math.round(mean)),
            median: formatCurrency(Math.round(calculateMedian(prices))),
            mode: formatCurrency(Math.round(calculateMode(prices))),
            stdDev: "±" + Math.round(calculateStdDev(varianceVal)).toLocaleString(),
            variance: Math.round(varianceVal).toLocaleString()
          });
          const grouped = cleanData.reduce((acc: any, row: any) => {
            if (!acc[row.year]) acc[row.year] = []; acc[row.year].push(row); return acc;
          }, {});
          setYearlyData(grouped); setYears(Object.keys(grouped).map(Number).sort());
        }
      }
    });
  }, []);

  const currentYear = years[currentYearIndex];
  const firstThree = yearlyData[currentYear]?.slice(0, 3) || [];
  const lastThree = yearlyData[currentYear]?.slice(-3) || [];

  const statConfig = [
    { label: "Records", value: stats.count, icon: Hash, colorClass: "text-blue-600" },
    { label: "Mean Price", value: stats.mean, icon: Calculator, colorClass: "text-emerald-600" },
    { label: "Median", value: stats.median, icon: TrendingUp, colorClass: "text-violet-600" },
    { label: "Mode", value: stats.mode, icon: Activity, colorClass: "text-pink-600" },
    { label: "Std Dev", value: stats.stdDev, icon: Sigma, colorClass: "text-amber-600" },
    { label: "Variance", value: stats.variance, icon: BarChart3, colorClass: "text-cyan-600" },
  ];

  return (
    // FIX 4: Removed '/90' opacity and 'backdrop-blur' to fix the "Fog" issue
    // Using solid 'bg-luxury-cream' hides the global App.js glow that was leaking through
    <section className="relative min-h-screen bg-luxury-cream px-6 lg:px-12 flex flex-col items-center justify-center overflow-hidden py-8">
      
      {/* ADDED: Local ambient glow just for this slide (Optional, replaces global fog) */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-gold-200/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-[1600px] flex flex-col h-full relative z-10">

        {/* Header */}
        <div className="text-center mb-6 shrink-0 relative z-10">
          <div className="flex justify-center items-center gap-3 drop-shadow-sm">
            <h2 className="text-5xl lg:text-7xl font-black text-slate-800">STATISTICAL</h2>
            <h2 className="text-5xl lg:text-7xl"><AnimatedTitle text="SUMMARY" /></h2>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6 shrink-0 relative z-20">
          {statConfig.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        {/* Main Data Container */}
        <div className="relative w-full flex-1 min-h-0 bg-white/60 border-[4px] border-white ring-2 ring-gold-200/50 rounded-[3.5rem] p-8 shadow-[0_20px_60px_-15px_rgba(217,119,6,0.3)] flex flex-col z-20 backdrop-blur-xl overflow-hidden">

          {/* Subtle Background Watermark */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <img src={goldBarImage} className="w-[70%]" alt="watermark" />
          </div>

          <div className="flex justify-between items-center mb-6 relative z-20 border-b-2 border-gold-100/80 pb-4 shrink-0">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3 drop-shadow-sm">
              <div className="bg-gold-100 p-2 rounded-xl border border-gold-200"><Coins className="text-gold-600 w-6 h-6" /></div> Data Explorer
            </h3>
            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border-2 border-gold-100 shadow-sm">
              <button onClick={() => currentYearIndex > 0 && setCurrentYearIndex(p => p - 1)} disabled={currentYearIndex === 0} className="p-2.5 rounded-xl hover:bg-gold-50 text-gold-600 disabled:opacity-30 border border-transparent hover:border-gold-200 transition-all"><ChevronLeft /></button>
              <span className="text-xl font-black text-slate-500 tracking-[0.2em] px-4">FY {currentYear}</span>
              <button onClick={() => currentYearIndex < years.length - 1 && setCurrentYearIndex(p => p + 1)} disabled={currentYearIndex === years.length - 1} className="p-2.5 rounded-xl hover:bg-gold-50 text-gold-600 disabled:opacity-30 border border-transparent hover:border-gold-200 transition-all"><ChevronRight /></button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-20 min-h-0">
            {/* Left Table */}
            <div className="bg-white/70 rounded-[2.5rem] p-6 border-2 border-gold-100 shadow-inner flex flex-col overflow-hidden group hover:border-gold-300 transition-colors">
              <h4 className="text-xs font-black text-gold-700 uppercase tracking-widest mb-4 shrink-0 flex items-center gap-3"><span className="h-1 w-8 bg-gold-400 rounded-full"></span>Opening Records</h4>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-2">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-white/90 z-10 backdrop-blur-md">
                    <tr className="text-[0.7rem] font-extrabold text-slate-400 uppercase border-b-2 border-gold-200">
                      <th className="pb-3 pl-6 tracking-wider">Date</th>
                      <th className="pb-3 text-right tracking-wider">Price (PKR)</th>
                      <th className="pb-3 text-right pr-4 tracking-wider">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="wait">
                      {firstThree.map((row: any, i: number) => <DataRow key={`l-${i}-${currentYear}`} date={row.date} price={row.price} year={row.year} />)}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Table */}
            <div className="bg-white/70 rounded-[2.5rem] p-6 border-2 border-gold-100 shadow-inner flex flex-col overflow-hidden group hover:border-gold-300 transition-colors">
              <h4 className="text-xs font-black text-gold-700 uppercase tracking-widest mb-4 text-right shrink-0 flex items-center justify-end gap-3">Closing Records<span className="h-1 w-8 bg-gold-400 rounded-full"></span></h4>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-2">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-white/90 z-10 backdrop-blur-md">
                    <tr className="text-[0.7rem] font-extrabold text-slate-400 uppercase border-b-2 border-gold-200">
                      <th className="pb-3 pl-6 tracking-wider">Date</th>
                      <th className="pb-3 text-right tracking-wider">Price (PKR)</th>
                      <th className="pb-3 text-right pr-4 tracking-wider">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="wait">
                      {lastThree.map((row: any, i: number) => <DataRow key={`r-${i}-${currentYear}`} date={row.date} price={row.price} year={row.year} />)}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataDashboard;