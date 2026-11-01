import React, { useState } from 'react';
import { 
  IndustryType, 
  PlatformFocus,
  INDUSTRY_MULTIPLIERS, 
  calculateGrowthProjections, 
  formatCompactNumber, 
  formatCurrency 
} from '../utils/calculator';
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  Layers, 
  Film, 
  Target, 
  DollarSign, 
  CheckCircle2,
  PieChart
} from 'lucide-react';

interface InteractiveCalculatorProps {
  onSelectTier: (tierName: string, calculatedBudget: number) => void;
}

export const InteractiveCalculator: React.FC<InteractiveCalculatorProps> = ({ onSelectTier }) => {
  const [industry, setIndustry] = useState<IndustryType>('ecommerce');
  const [platformFocus, setPlatformFocus] = useState<PlatformFocus>('omnichannel');
  const [monthlyBudget, setMonthlyBudget] = useState<number>(7000);
  const [currentReach, setCurrentReach] = useState<number>(150000);

  const results = calculateGrowthProjections({
    industry,
    monthlyBudget,
    currentReach,
    platformFocus,
  });

  const budgetPresets = [3800, 7000, 15000, 30000];

  const platforms: { id: PlatformFocus; label: string; icon: string }[] = [
    { id: 'omnichannel', label: 'Omnichannel Velocity', icon: '🌐' },
    { id: 'tiktok_reels', label: 'TikTok & Reels Focus', icon: '📱' },
    { id: 'youtube_shorts', label: 'YouTube Shorts Engine', icon: '▶️' },
    { id: 'linkedin_b2b', label: 'LinkedIn Executive B2B', icon: '💼' },
  ];

  return (
    <section id="calculator" className="py-20 md:py-28 relative overflow-hidden bg-[#06090e]">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Strategic Growth Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mb-4">
            Forecast your <br className="hidden sm:inline" />
            <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              90-day trajectory.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Select your niche, campaign objective, and scaling budget to simulate real-world organic reach, ROAS multiplier, and asset velocity.
          </p>
        </div>

        {/* The Matrix Box */}
        <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-slate-900 shadow-2xl">
          <div className="p-6 sm:p-10 rounded-[22px] bg-[#090d18] grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* 1. Niche Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                  1. Brand Category & Niche
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(Object.keys(INDUSTRY_MULTIPLIERS) as IndustryType[]).map((key) => {
                    const isSelected = industry === key;
                    const item = INDUSTRY_MULTIPLIERS[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setIndustry(key)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400 text-white shadow-md'
                            : 'bg-[#06090f] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold leading-snug">{item.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Platform Distribution Focus */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                  2. Primary Channel Objective
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map((p) => {
                    const isSelected = platformFocus === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPlatformFocus(p.id)}
                        className={`p-3 rounded-xl text-left border flex items-center gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300'
                            : 'bg-[#06090f] border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{p.icon}</span>
                        <span className="text-xs font-semibold">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Monthly Scaling Budget Slider & Presets */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="matrix-budget-slider" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    3. Monthly Growth & Media Budget
                  </label>
                  <span className="text-base font-bold font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-800/40">
                    {formatCurrency(monthlyBudget)}
                  </span>
                </div>

                <input
                  id="matrix-budget-slider"
                  type="range"
                  min="2500"
                  max="35000"
                  step="500"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mb-3"
                />

                {/* Quick Presets */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-mono">Presets:</span>
                  {budgetPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setMonthlyBudget(preset)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        monthlyBudget === preset
                          ? 'bg-cyan-400 text-slate-950 font-bold'
                          : 'bg-slate-800/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      {formatCurrency(preset)}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Current Organic Impressions Baseline */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="matrix-reach-slider" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    4. Current Monthly Reach Baseline
                  </label>
                  <span className="text-sm font-bold font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                    {formatCompactNumber(currentReach)} Views / Mo
                  </span>
                </div>
                <input
                  id="matrix-reach-slider"
                  type="range"
                  min="20000"
                  max="1500000"
                  step="20000"
                  value={currentReach}
                  onChange={(e) => setCurrentReach(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Capital Allocation Breakdown Bar */}
              <div className="p-4 rounded-xl bg-[#060a12] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <PieChart className="w-3.5 h-3.5 text-cyan-400" />
                    Capital Allocation Strategy
                  </span>
                  <span className="text-cyan-400 font-mono text-[11px]">100% Transparent</span>
                </div>
                
                {/* Horizontal progress bar */}
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div style={{ width: '50%' }} className="bg-cyan-400" title="50% 3D Motion Production" />
                  <div style={{ width: '35%' }} className="bg-blue-600" title="35% Paid Media Scaling" />
                  <div style={{ width: '15%' }} className="bg-purple-500" title="15% AI Trend Telemetry" />
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
                  <span className="text-cyan-300">● 50% Motion Creative</span>
                  <span className="text-blue-400">● 35% Paid Scale</span>
                  <span className="text-purple-400">● 15% AI Telemetry</span>
                </div>
              </div>

            </div>

            {/* Right Column: High-End Live Output Card */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#060910] border border-cyan-500/30 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                      KROMAQ FORECAST ALGORITHM
                    </span>
                    <h3 className="text-lg font-bold text-white font-display">90-Day Projected Output</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                    ACTIVE FIT
                  </span>
                </div>

                {/* Primary Metric: Projected Reach */}
                <div className="mb-6">
                  <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                    <span>Projected 90-Day Impressions</span>
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight flex items-baseline gap-2">
                    {formatCompactNumber(results.projectedReach)}
                    <span className="text-cyan-400 text-lg font-normal">views</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Baseline lift: <span className="text-emerald-400 font-bold">+{Math.round((results.projectedReach / (currentReach * 3)) * 100)}%</span> over 90 days
                  </div>
                </div>

                {/* Metric Quad Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Target ROAS</div>
                    <div className="text-2xl font-bold text-white font-display mt-0.5">{results.estimatedRoas}x</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Monthly Video Assets</div>
                    <div className="text-2xl font-bold text-white font-display mt-0.5">{results.monthlyAssetsCount} Videos</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 col-span-2">
                    <div className="text-[11px] text-slate-400">Est. Monthly Pipeline Lift</div>
                    <div className="text-xl font-bold text-emerald-400 font-display mt-0.5">
                      {formatCurrency(results.projectedRevenueLift)}
                    </div>
                  </div>
                </div>

                {/* Recommended Tier Pill */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/50 to-blue-950/40 border border-cyan-500/40 mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest">
                      RECOMMENDED TIER
                    </span>
                    <span className="text-xs font-bold text-white font-mono">{formatCurrency(results.tierPrice)} / mo</span>
                  </div>
                  <div className="text-base font-bold text-white font-display">{results.recommendedTier}</div>
                  <p className="text-xs text-slate-300 mt-1">{results.keyStrategyFocus}</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onSelectTier(results.recommendedTier, monthlyBudget)}
                className="w-full py-4 px-6 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-300 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-[0_0_20px_rgba(0,242,254,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Lock In This Strategic Trajectory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
