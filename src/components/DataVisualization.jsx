import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import Papa from 'papaparse';
import { TrendingUp, BarChart2, PieChart as PieChartIcon, Activity, Info } from 'lucide-react';

// --- Animated Title ---
const AnimatedTitle = ({ text }) => (
  <span className="inline-block font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-700 to-amber-500 bg-[length:200%_auto] animate-pulse">
    {text}
  </span>
);

const DataVisualization = () => {
  const [trendData, setTrendData] = useState([]);
  const [histData, setHistData] = useState([]);
  const [yearlyGrowthData, setYearlyGrowthData] = useState([]);
  const [frequencyData, setFrequencyData] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse("/data/gold_price_data.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const clean = results.data
          .filter(r => typeof r.Integer_price === 'number' && !isNaN(r.Integer_price) && r.Date)
          .map(r => {
            const dateParts = r.Date.split('/');
            const dateObj = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
            return {
              fullDate: r.Date,
              monthYear: dateObj.toLocaleString('default', { month: 'short', year: 'numeric' }),
              timestamp: dateObj.getTime(),
              price: Number(r.Integer_price),
              year: parseInt(dateParts[2]),
            };
          })
          .sort((a, b) => a.timestamp - b.timestamp);

        // 1. Trend Data
        setTrendData(clean.filter((_, i) => i % 5 === 0));

        // 2. Histogram
        const prices = clean.map(d => d.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const bins = 12;
        const width = (max - min) / bins;
        const hist = Array.from({ length: bins }, (_, i) => {
            const start = min + i * width;
            const end = min + (i + 1) * width;
            return {
                range: `${Math.floor(start/1000)}k`,
                count: prices.filter(p => p >= start && p < end).length,
                fullRange: `${Math.floor(start).toLocaleString()} - ${Math.floor(end).toLocaleString()}`
            };
        });
        setHistData(hist);

        // 3. Yearly Growth
        const years = [...new Set(clean.map(d => d.year))].sort();
        let prevAvg = 0;
        const growthStats = years.map(year => {
            const yearPrices = clean.filter(d => d.year === year).map(d => d.price);
            const avgPrice = Math.round(yearPrices.reduce((a, b) => a + b, 0) / yearPrices.length);
            let growthPct = 0;
            if (prevAvg !== 0) growthPct = ((avgPrice - prevAvg) / prevAvg) * 100;
            prevAvg = avgPrice;
            return {
                name: year.toString(),
                value: avgPrice,
                growth: growthPct.toFixed(1)
            };
        });
        setYearlyGrowthData(growthStats);

        // 4. Frequency Density
        const fineBins = 40; 
        const fineWidth = (max - min) / fineBins;
        const density = Array.from({ length: fineBins }, (_, i) => {
             const start = min + i * fineWidth;
             const end = min + (i + 1) * fineWidth;
             const count = prices.filter(p => p >= start && p < end).length;
             return {
                 price: Math.round((start + end) / 2), 
                 count: count,
                 label: `${Math.round(start/1000)}k-${Math.round(end/1000)}k`
             };
        });
        setFrequencyData(density);

        setLoading(false);
      }
    });
  }, []);

  const pieColors = ['#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#78350f'];

  const ChartCard = ({ title, icon: Icon, info, children }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col w-full h-full bg-white/60 backdrop-blur-xl rounded-[1.5rem] border border-amber-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-amber-300 transition-all overflow-hidden p-4"
    >
        <div className="flex items-center justify-between mb-1 shrink-0 border-b border-amber-50 pb-2 z-10 relative">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-100 rounded-lg text-amber-700"><Icon size={20} /></div>
                <h3 className="text-lg lg:text-xl font-black text-slate-800 tracking-tight">{title}</h3>
            </div>
            {info && (
                <div className="group relative">
                    <Info size={18} className="text-slate-400 cursor-help" />
                    <div className="absolute right-0 top-6 w-56 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none font-medium">
                        {info}
                    </div>
                </div>
            )}
        </div>
        <div className="flex-1 w-full min-h-0 relative z-0">
            {children}
        </div>
    </motion.div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur border-l-4 border-amber-500 p-3 rounded shadow-xl text-sm z-50">
           {data.monthYear ? (
              // Graph 1
              <>
                <p className="font-bold text-slate-600 text-base">{data.monthYear}</p>
                <p className="text-xs text-slate-400 mb-1">{data.fullDate}</p>
                <p className="text-amber-600 font-black text-lg">Rs {payload[0].value.toLocaleString()}</p>
              </>
           ) : data.growth !== undefined ? (
              // Graph 3
              <>
                <p className="font-bold text-slate-600 text-base">Year {data.name}</p>
                <p className="text-amber-600 font-bold">Avg: Rs {data.value.toLocaleString()}</p>
                <p className={`font-black ${Number(data.growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                   {Number(data.growth) >= 0 ? '▲' : '▼'} {data.growth}% Growth
                </p>
              </>
           ) : data.label !== undefined ? (
               // Graph 4
               <>
                 <p className="font-bold text-slate-600 text-base">Range: {data.label}</p>
                 <p className="text-amber-600 font-black text-lg">{data.count.toLocaleString()} Times</p>
                 <p className="text-[10px] text-green-600 mt-1">This price repeated this often</p>
               </>
           ) : (
              // Graph 2
              <>
                <p className="font-extrabold text-slate-600 text-base">{label}</p>
                <p className="text-amber-600 font-black text-lg">{payload[0].value.toLocaleString()} Records</p>
                {data.fullRange && <p className="text-xs text-slate-400 mt-1">{data.fullRange}</p>}
              </>
           )}
        </div>
      );
    }
    return null;
  };

  if (loading) return null;

  return (
    <section className="h-screen w-full bg-[#fdfcf8] overflow-hidden flex flex-col py-2 lg:py-3 relative">
        
        {/* FIX 1: Added z-0 to push background blur behind everything */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-amber-200/20 rounded-full blur-[120px] pointer-events-none z-0" />

        {/* FIX 2: Added relative & z-10 to Header to sit ON TOP of fog */}
        <div className="text-center shrink-0 mb-2 px-4 relative z-10">
            <h2 className="text-4xl mb-5 mt-5 lg:text-6xl font-black text-slate-800 leading-none">
                DATA <AnimatedTitle text="VISUALIZATION" />
            </h2>
        </div>

        {/* FIX 3: Added relative & z-10 to Grid to sit ON TOP of fog */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-3 lg:gap-4 w-full max-w-[95%] lg:max-w-[1600px] mx-auto min-h-0 px-2 pb-4 relative z-10">
            
            {/* 1. Price Trends */}
            <ChartCard title="Price Trends" icon={TrendingUp} info="Hover for monthly details.">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData} margin={{top:10, right:10, left:0, bottom:0}}>
                        <defs>
                            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.6}/>
                                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="monthYear" tick={{fontSize:12, fill:'#475569', fontWeight:700}} tickLine={false} axisLine={false} minTickGap={50} />
                        <YAxis tick={{fontSize:12, fill:'#475569', fontWeight:700}} tickFormatter={(val)=>`${val/1000}k`} tickLine={false} axisLine={false} domain={['auto', 'auto']} width={40} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="price" stroke="#d97706" strokeWidth={3} fill="url(#goldGrad)" activeDot={{r:6, stroke:'white', strokeWidth:2}} />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* 2. Histogram */}
            <ChartCard title="Price Distribution" icon={BarChart2} info="Frequency of prices.">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={histData} barCategoryGap={4}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/>
                        <XAxis dataKey="range" tick={{fontSize:12, fill:'#475569', fontWeight:700}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize:12, fill:'#475569', fontWeight:700}} axisLine={false} tickLine={false} width={30} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" radius={[6,6,0,0]}>
                            {histData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#f59e0b' : '#fbbf24'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* 3. Yearly Growth */}
            <ChartCard title="Yearly Avg & Growth" icon={PieChartIcon} info="Slice = Avg Price. Hover for Growth %.">
                <div className="flex w-full h-full items-center">
                    {/* LEFT: Legend */}
                    <div className="flex flex-col justify-center gap-2 pr-4 border-r border-amber-100 min-w-[80px] shrink-0 py-2 h-full overflow-y-auto custom-scrollbar">
                        {yearlyGrowthData.map((d, i) => (
                            <div key={d.name} className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{backgroundColor: pieColors[i % pieColors.length]}}></span>
                                <span className="text-xs font-black text-slate-600">{d.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* RIGHT: Circle */}
                    <div className="flex-1 h-full relative flex items-center justify-center overflow-visible">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={yearlyGrowthData} 
                                    innerRadius="45%" 
                                    outerRadius="95%" 
                                    cx="45%" 
                                    cy="50%" 
                                    paddingAngle={2} 
                                    dataKey="value"
                                >
                                    {yearlyGrowthData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} stroke="white" strokeWidth={2} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </ChartCard>

            {/* 4. Price Frequency Density */}
            <ChartCard title="Price Frequency Density" icon={Activity} info="Shows exactly how often specific prices repeated. Peaks = High Repetition.">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={frequencyData} margin={{top:10, right:0, left:0, bottom:0}}>
                        <defs>
                            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>
                        <XAxis 
                            dataKey="price" 
                            type="number"
                            domain={['dataMin', 'dataMax']} 
                            tickFormatter={(val)=>`${Math.round(val/1000)}k`}
                            tick={{fontSize:12, fill:'#475569', fontWeight:700}} 
                            axisLine={false} tickLine={false}
                            interval="preserveStartEnd"
                            label={{ value: 'Price (PKR)', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#94a3b8' }}
                        />
                        <YAxis 
                            dataKey="count"
                            tick={{fontSize:12, fill:'#475569', fontWeight:700}} 
                            axisLine={false} tickLine={false} 
                            width={40}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="count" stroke="#059669" strokeWidth={4} fill="url(#greenGrad)" activeDot={{r:6}} />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>
    </section>
  );
};

export default DataVisualization;