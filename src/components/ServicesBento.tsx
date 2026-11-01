import React, { useState } from 'react';
import { Film, TrendingUp, Radar, Sparkles, Check, ArrowUpRight, Zap, Target, Users } from 'lucide-react';

interface ServicesBentoProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'video' | 'paid' | 'ai'>('video');

  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mb-4">
            Designed for velocity. <br className="hidden sm:inline" />
            <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Engineered for conversion.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We replace bloated traditional agency retainers with a high-throughput content engine and algorithmic media architecture.
          </p>
        </div>

        {/* 3 Core Bento Cards (modeled directly on Verdant's section 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: The Motion Engine */}
          <div className="p-7 rounded-3xl bg-[#0c1220]/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Film className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">Cinema-Grade Motion</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Turn passive scrollers into obsessed buyers with 3D product motion, dynamic typography, and psychological hook frameworks.
              </p>
            </div>

            {/* Interactive Visual Graphic: Input sources converging to Kromaq Engine */}
            <div className="my-4 p-4 rounded-2xl bg-[#06090f] border border-slate-800/80 relative overflow-hidden">
              <div className="flex items-center justify-between">
                {/* Left sources */}
                <div className="flex flex-col gap-2">
                  <div className="px-2 py-1 rounded bg-slate-800/80 text-[10px] text-slate-300 font-mono border border-slate-700">
                    4K Studio Film
                  </div>
                  <div className="px-2 py-1 rounded bg-slate-800/80 text-[10px] text-slate-300 font-mono border border-slate-700">
                    3D Render Assets
                  </div>
                  <div className="px-2 py-1 rounded bg-slate-800/80 text-[10px] text-slate-300 font-mono border border-slate-700">
                    Audio & SFX
                  </div>
                </div>

                {/* Connecting Lines */}
                <div className="flex-1 px-3">
                  <svg className="w-full h-12" viewBox="0 0 100 40">
                    <path d="M 0 10 Q 50 15 100 20" stroke="#00F2FE" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                    <path d="M 0 20 Q 50 20 100 20" stroke="#38BDF8" strokeWidth="1.5" fill="none" />
                    <path d="M 0 30 Q 50 25 100 20" stroke="#818CF8" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                  </svg>
                </div>

                {/* Destination Hub */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.5)]">
                  <Sparkles className="w-6 h-6 text-slate-950" />
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Hook Retention Target</span>
                <span className="text-cyan-400 font-mono font-bold">82.5% Avg</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectService('Cinema-Grade Motion Creative')}
              className="mt-2 w-full py-2.5 px-4 rounded-xl bg-slate-800/50 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-300 border border-slate-700 hover:border-cyan-500/40 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Explore Motion Workflows</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Algorithmic Paid Media */}
          <div className="p-7 rounded-3xl bg-[#0c1220]/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">Algorithmic Paid Media</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Scale customer acquisition across Meta, TikTok, and YouTube with rapid-fire creative iteration and real-time ROAS optimization.
              </p>
            </div>

            {/* Interactive Visual Graphic: Glowing Wave ROAS Surge */}
            <div className="my-4 p-4 rounded-2xl bg-[#06090f] border border-slate-800/80 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-slate-400 font-mono">Blended Ad Efficiency</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                  ↑ 4.8x ROAS
                </span>
              </div>
              <svg className="w-full h-16" viewBox="0 0 200 60">
                <defs>
                  <linearGradient id="paid-glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0 50 Q 40 45 70 35 T 140 28 T 200 8 L 200 60 L 0 60 Z" fill="url(#paid-glow)" />
                <path d="M 0 50 Q 40 45 70 35 T 140 28 T 200 8" fill="none" stroke="#00F2FE" strokeWidth="2.5" />
                <circle cx="200" cy="8" r="4" fill="#00F2FE" className="animate-ping" />
                <circle cx="200" cy="8" r="3.5" fill="#FFFFFF" />
              </svg>
              <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>CAC Reduction: -38%</span>
                <span className="text-cyan-400 font-mono font-bold">$1.8M Managed</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectService('Algorithmic Paid Media')}
              className="mt-2 w-full py-2.5 px-4 rounded-xl bg-slate-800/50 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-300 border border-slate-700 hover:border-cyan-500/40 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Explore Paid Scaling</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: AI Trend Radar & Intelligence */}
          <div className="p-7 rounded-3xl bg-[#0c1220]/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Radar className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">AI Trend Radar</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Proprietary AI scraping cross-platform audio shifts, virality signals, and comment sentiment 72 hours before competitors catch on.
              </p>
            </div>

            {/* Interactive Visual Graphic: Concentric Radar Rings */}
            <div className="my-4 p-4 rounded-2xl bg-[#06090f] border border-slate-800/80 flex flex-col items-center justify-center relative">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-slate-800" />
                <div className="absolute inset-2 rounded-full border border-cyan-500/20" />
                <div className="absolute inset-4 rounded-full border border-cyan-500/40 animate-pulse" />
                <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00F2FE]" />
                </div>
                {/* Orbiting blips */}
                <span className="absolute top-1 right-3 w-1.5 h-1.5 rounded-full bg-cyan-300" />
                <span className="absolute bottom-2 left-3 w-2 h-2 rounded-full bg-indigo-400" />
                <span className="absolute top-4 left-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="mt-2 text-center">
                <div className="text-[11px] font-bold text-white font-mono">14 Emerging Sound Signals Active</div>
                <div className="text-[10px] text-cyan-400">Continuous 24/7 Scraping</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectService('AI Trend Radar & Intelligence')}
              className="mt-2 w-full py-2.5 px-4 rounded-xl bg-slate-800/50 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-300 border border-slate-700 hover:border-cyan-500/40 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Explore AI Telemetry</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Supporting specialized service chips */}
        <div className="p-6 rounded-2xl bg-[#080d17] border border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-sm font-semibold text-white">Full-Stack Deliverables Included:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
              3D Kinetic Typography
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
              Founder Ghostwriting & LinkedIn Scaling
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
              UGC Creator Direction & Vetting
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
              Meta & TikTok Ad Account Audits
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
              Dedicated Slack Channel
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
