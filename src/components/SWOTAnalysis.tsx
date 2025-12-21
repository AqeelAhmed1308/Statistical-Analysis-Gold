import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck, AlertOctagon, Target, Zap,
    TrendingUp, Activity, Anchor, Globe
} from 'lucide-react';

// --- Animated Title (Standard Component) ---
const AnimatedTitle = ({ text }: { text: string }) => (
    <span className="inline-block font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-700 to-amber-500 bg-[length:200%_auto] animate-pulse">
        {text}
    </span>
);

// --- SWOT Card Component ---
const SWOTCard = ({ title, icon: Icon, items, type, delay }: any) => {
    // Color Themes
    const themes: any = {
        strength: {
            main: 'border-green-400', bg: 'bg-green-50/50',
            text: 'text-green-800', icon: 'text-green-600',
            highlight: 'bg-gradient-to-r from-green-400 to-emerald-600',
            bullet: 'text-green-600'
        },
        weakness: {
            main: 'border-red-400', bg: 'bg-red-50/50',
            text: 'text-red-800', icon: 'text-red-600',
            highlight: 'bg-gradient-to-r from-red-400 to-rose-600',
            bullet: 'text-red-600'
        },
        opportunity: {
            main: 'border-blue-400', bg: 'bg-blue-50/50',
            text: 'text-blue-800', icon: 'text-blue-600',
            highlight: 'bg-gradient-to-r from-blue-400 to-cyan-600',
            bullet: 'text-blue-600'
        },
        threat: {
            main: 'border-amber-400', bg: 'bg-amber-50/50',
            text: 'text-amber-800', icon: 'text-amber-600',
            highlight: 'bg-gradient-to-r from-amber-400 to-orange-600',
            bullet: 'text-amber-600'
        }
    };

    const t = themes[type];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5, type: "spring" }}
            className={`relative h-full flex flex-col backdrop-blur-xl bg-white/80 border-[3px] px-6 py-1 ${t.main} rounded-[2.5rem] p-8 shadow-xl overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
        >
            {/* Top Highlight Line */}
            <div className={`absolute top-0 left-0 w-full h-2 ${t.highlight}`} />

            {/* Header */}
            <div className="flex items-center gap-4 mb-1 mt-2 z-10">
                <div className={`p-3 rounded-2xl ${t.bg} ${t.icon} shadow-inner`}>
                    <Icon size={32} strokeWidth={2.5} />
                </div>
                <h3 className={`text-3xl font-black ${t.text} tracking-tight`}>{title}</h3>
            </div>

            {/* List Items */}
            <ul className="space-y-4 flex-1">
                {items.map((item: any, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                        <span className={`mt-1.5 font-black text-2xl ${t.bullet}`}>
                            {type === 'strength' || type === 'opportunity' ? '✓' : '✗'}
                        </span>
                        <div>
                            <strong className="block text-slate-800 font-bold text-lg">{item.head}</strong>
                            <span className="text-slate-600 font-medium text-lg leading-snug">{item.desc}</span>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Background Decor Icon (Faded) */}
            <Icon className={`absolute -bottom-8 -right-8 w-48 h-48 opacity-[0.03] ${t.icon} pointer-events-none`} />
        </motion.div>
    );
};

const SWOTAnalysis = () => {
    return (
        <div className="min-h-screen bg-[#fdfcf8] relative overflow-hidden flex flex-col py-10 font-sans">

           
            {/* Ambient Glows */}
            <div className="fixed top-0 left-0 w-[50vw] h-[50vw] bg-green-100/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[50vw] h-[50vw] bg-red-100/20 rounded-full blur-[120px] pointer-events-none" />

            {/* === MAIN CONTENT === */}
            <div className="relative z-10 w-[95%] max-w-[1800px] mx-auto flex-1 flex flex-col justify-center">

                {/* Header */}
                <div className="text-center mb-2 lg:mb-4">
                    <h2 className="text-5xl lg:text-7xl font-black text-slate-800 leading-none drop-shadow-sm">
                        SWOT <AnimatedTitle text="ANALYSIS" />
                    </h2>

                </div>

                {/* 2x2 GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full h-full">

                    {/* 1. STRENGTHS (Green) */}
                    <SWOTCard
                        type="strength"
                        title="Strengths"
                        icon={ShieldCheck}
                        delay={0.1}
                        items={[
                            { head: "4x Growth", desc: "Prices increased from 86k to 455k in just 6 years." },
                            { head: "Strong Recovery", desc: "Prices recover very fast after any drop or slow period." },
                            { head: "Inflation Shield", desc: "The best way to save your money against the falling Rupee." },
                            { head: "Consistent Demand", desc: "People buy it even at high prices because of its cultural value." }
                        ]}
                    />

                    {/* 2. WEAKNESSES (Red) */}
                    <SWOTCard
                        type="weakness"
                        title="Weaknesses"
                        icon={AlertOctagon}
                        delay={0.2}
                        items={[
                            { head: "High Volatility", desc: "Market is 10x more unstable than 2021. Ranges have expanded drastically." },
                            { head: "Sudden Drops:", desc: "Price can fall up to 5.5% in just two weeks, shocking the traders." },
                            { head: "Hard to Predict", desc: "Prices move very fast now, so it is difficult to time your trade perfectly." },
                            { head: "Selling in Fear", desc: "Small investors get scared and sell when rates drop, making the price fall even more." }
                        ]}
                    />

                    {/* 3. OPPORTUNITIES (Blue) */}
                    <SWOTCard
                        type="opportunity"
                        title="Opportunities"
                        icon={Target}
                        delay={0.3}
                        items={[
                            { head: "Seasonal Trading", desc: "Clear pattern: Buy in Jan/Feb lows and sell in Oct/Nov highs." },
                            { head: "Big Profit Chance", desc: "The Rs 145k difference in yearly rates offers huge profit for traders." },
                            { head: "Long-term Hold", desc: "Holding for 3 years or more gives the highest returns." },
                            { head: "Best Security", desc: "The safest option compared to keeping unstable local currency." }
                        ]}
                    />

                    {/* 4. THREATS (Amber) */}
                    <SWOTCard
                        type="threat"
                        title="Threats"
                        icon={Zap}
                        delay={0.4}
                        items={[
                            { head: "Market Might Slow Down", desc: "After rising 47% in 2024, the prices might stop jumping and settle down." },
                            { head: "Very Sensitive:", desc: "Any political or economic news affects the price immediately." },
                            { head: "Out of Range", desc: "Prices are so high that normal people might not be able to buy anymore." },
                            { head: "Depends on Dollar & World", desc: "The price relies totally on the International Dollar rate and global situation." }
                        ]}
                    />

                </div>
            </div>
        </div>
    );
};

export default SWOTAnalysis;