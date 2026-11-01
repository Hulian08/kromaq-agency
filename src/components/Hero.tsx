import React from 'react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreWork }) => {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background radial ambient glows and grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Top Badge matching Verdant SaaS style */}
        <div 
          onClick={onOpenBooking}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0e1626]/90 border border-cyan-500/30 text-xs text-slate-300 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(0,242,254,0.15)] group hover:border-cyan-400/60 transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold text-white tracking-wide uppercase text-[11px]">Kromaq Motion 2.0</span>
          <span className="text-slate-500">•</span>
          <span className="text-cyan-300 font-medium text-[11px]">Next-Gen Social Media Engine</span>
          <ArrowRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Hero Title with Verdant-style bold typography and italic glowing accent */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white max-w-5xl mx-auto leading-[1.08] mb-6">
          Social media in{' '}
          <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,242,254,0.45)]">
            motion.
          </span>
          <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-200 mt-2 font-display">
            Data-driven SMM for high-end brands.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          We combine cinema-grade motion creative, proprietary AI trend telemetry, and ruthless paid acquisition to build dominant cultural authority for scaling leaders.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-[0_0_30px_rgba(0,242,254,0.5)] hover:shadow-[0_0_45px_rgba(0,242,254,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Schedule Strategy Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onExploreWork}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-medium text-slate-200 bg-[#0d1424]/80 hover:bg-[#131d33] border border-slate-700/60 hover:border-cyan-500/40 backdrop-blur-md transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
            <span>Explore Case Studies</span>
          </button>
        </div>

        {/* Trust Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Guaranteed ROAS & Reach SLAs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>14-Day Velocity Onboarding</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Bespoke Creative Production</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Real-Time AI Performance Radar</span>
          </div>
        </div>
      </div>
    </section>
  );
};
