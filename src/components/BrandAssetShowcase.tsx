import React, { useState } from 'react';
import { KromaqIcon, KromaqLogo } from './KromaqLogo';
import { Sparkles, Maximize2, ShieldCheck, Palette, ArrowRight, Eye, CheckCircle2, Flame, Award, X } from 'lucide-react';

export const BrandAssetShowcase: React.FC = () => {
  const [comparisonMode, setComparisonMode] = useState<'kromaq' | 'traditional'>('kromaq');
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);

  const colorPalette = [
    { name: 'Electric Cyan', hex: '#00F2FE', role: 'Primary Energy & Kinetic Accents', bg: 'bg-[#00F2FE]' },
    { name: 'Neon Sapphire', hex: '#2563EB', role: 'Performance & Data Architecture', bg: 'bg-[#2563EB]' },
    { name: 'Royal Violet', hex: '#8B5CF6', role: 'Luxury Aesthetic & AI Intelligence', bg: 'bg-[#8B5CF6]' },
    { name: 'Midnight Obsidian', hex: '#06090E', role: 'Editorial Contrast & Depth', bg: 'bg-[#06090E]' },
  ];

  return (
    <section id="brand" className="py-20 md:py-28 relative overflow-hidden bg-[#070b13] border-y border-slate-800/80">
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The Kromaq Standard
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mb-5">
            Motion that commands <br className="hidden sm:inline" />
            <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-purple-300 bg-clip-text text-transparent">
              unrivaled attention.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            In an era of relentless algorithmic saturation, static content is invisible. Kromaq was engineered by <span className="text-white font-semibold">Iulian Chirila</span> to bring cinema-grade motion and mathematical virality to high-end brands.
          </p>
        </div>

        {/* Interactive Before vs. After Creative Standard Comparison */}
        <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-slate-900 shadow-2xl mb-14">
          <div className="rounded-[22px] bg-[#090e18] border border-slate-800 p-6 sm:p-10">
            
            {/* Toggle header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-8">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
                  CREATIVE CALIBER BENCHMARK
                </span>
                <h3 className="text-xl font-bold font-display text-white">
                  {comparisonMode === 'kromaq' ? 'The Kromaq Kinetic Motion Standard' : 'Typical Agency Output (Static / Generic)'}
                </h3>
              </div>

              {/* Mode Switcher */}
              <div className="inline-flex items-center p-1 rounded-full bg-[#05080e] border border-slate-800">
                <button
                  type="button"
                  onClick={() => setComparisonMode('traditional')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    comparisonMode === 'traditional'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Standard Agency
                </button>
                <button
                  type="button"
                  onClick={() => setComparisonMode('kromaq')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    comparisonMode === 'kromaq'
                      ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Kromaq Motion Standard</span>
                </button>
              </div>
            </div>

            {/* Comparison Display Body */}
            {comparisonMode === 'kromaq' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual Preview */}
                <div className="lg:col-span-6 p-6 rounded-2xl bg-gradient-to-br from-[#0b1424] to-[#070b13] border-2 border-cyan-500/40 relative overflow-hidden shadow-2xl group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-cyan-300 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                      3D KINETIC MOTION ENGINE
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      +412% Retention Lift
                    </span>
                  </div>

                  {/* 3D Crystal Visual Emblem */}
                  <div className="h-56 rounded-xl bg-[#050912] border border-cyan-500/20 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                    <div className="w-24 h-24 relative flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
                      <KromaqIcon size={80} className="relative z-10 drop-shadow-[0_0_25px_rgba(0,242,254,0.8)]" />
                    </div>
                    <div className="mt-4 text-center z-10">
                      <div className="text-xs font-bold text-white tracking-widest font-display">
                        KROMAQ CRYSTALLINE DYNAMICS
                      </div>
                      <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                        60 FPS • Spatial Sound Design • Dynamic Subtitle Hooks
                      </div>
                    </div>
                  </div>

                  {/* Metrics bar */}
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Avg. Watch Time</div>
                      <div className="text-sm font-bold text-cyan-300 font-display">84.2%</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Viral Coefficient</div>
                      <div className="text-sm font-bold text-cyan-300 font-display">3.8x</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">ROAS Multiplier</div>
                      <div className="text-sm font-bold text-emerald-400 font-display">5.2x</div>
                    </div>
                  </div>
                </div>

                {/* Explanation & Deliverables */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    Why High-End Brands Choose Kromaq
                  </div>
                  <h4 className="text-2xl font-bold font-display text-white">
                    Bespoke Visual Distinction Engineered for High Conversion
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    We don’t outsource to junior editors or use cookie-cutter Canva templates. Every video asset is custom-architected with 3D CGI product renders, kinetic typography, psychology-backed pacing, and custom color grading that elevates brand prestige.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Cinema-grade 3D product motion and particle physics</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Proprietary sound design tuned to algorithmic viral frequencies</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Rapid multi-variant hook split testing (4 variations per drop)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual Preview for Traditional */}
                <div className="lg:col-span-6 p-6 rounded-2xl bg-[#090b10] border border-rose-500/30 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-rose-400 px-2.5 py-0.5 rounded-full bg-rose-950/40 border border-rose-500/20">
                      CONVENTIONAL AGENCY RETINUE
                    </span>
                    <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded-full">
                      High Drop-off Rate
                    </span>
                  </div>

                  <div className="h-56 rounded-xl bg-[#06080e] border border-slate-800 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-500 mb-3">
                      📄
                    </div>
                    <div className="text-xs font-semibold text-slate-400">
                      Static Stock Imagery & Generic Slide Decks
                    </div>
                    <div className="text-[10px] text-slate-600 mt-1 max-w-xs">
                      Viewer scrolls past in less than 1.8 seconds. Algorithmic distribution drops to near zero.
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Avg. Watch Time</div>
                      <div className="text-sm font-bold text-rose-400 font-display">14.8%</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Viral Reach</div>
                      <div className="text-sm font-bold text-slate-400 font-display">Flat</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">ROAS Multiplier</div>
                      <div className="text-sm font-bold text-rose-400 font-display">1.2x — 1.6x</div>
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    The Cost of Invisibility
                  </div>
                  <h4 className="text-2xl font-bold font-display text-white">
                    Why Traditional Agencies Waste Brand Capital
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Most agencies charge $8k/mo to post static graphics that generate polite likes from company employees. Without kinetic short-form motion and algorithmic hook calibration, you are effectively paying to be ignored.
                  </p>
                  <button
                    type="button"
                    onClick={() => setComparisonMode('kromaq')}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer"
                  >
                    Switch to Kromaq Standard
                  </button>
                </div>
              </div>
            )}

            {/* Founder Vision & Identity Assets Bar */}
            <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-sm uppercase shadow-lg">
                  IC
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-display">
                    "Social media without motion is invisible; motion without math is vanity."
                  </div>
                  <div className="text-xs text-slate-400">
                    <span className="text-cyan-400 font-semibold">Iulian Chirila</span> — Founder & Creative Director, Kromaq
                  </div>
                </div>
              </div>

              {/* Button to view the master visual identity sheet */}
              <button
                type="button"
                onClick={() => setIsAssetModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 hover:border-cyan-500/40 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Master Identity Suite</span>
              </button>
            </div>
          </div>
        </div>

        {/* Color Chromatics bar */}
        <div className="p-6 rounded-2xl bg-[#080d18] border border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white tracking-wide uppercase font-display">
                Official Kromaq Color Chromatics
              </h4>
            </div>
            <span className="text-xs text-slate-400 font-mono">Precision calibrated for OLED screens & high contrast</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {colorPalette.map((color) => (
              <div key={color.hex} className="p-3.5 rounded-xl bg-[#05080f] border border-slate-800/80">
                <div className={`h-12 w-full rounded-lg ${color.bg} mb-3 shadow-md flex items-center justify-center`}>
                  <span className="text-[11px] font-mono font-bold text-slate-900 bg-white/90 px-2 py-0.5 rounded shadow">
                    {color.hex}
                  </span>
                </div>
                <div className="text-xs font-semibold text-white">{color.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{color.role}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Master Brand Assets */}
      {isAssetModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsAssetModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#080d17] border border-cyan-500/40 p-4 sm:p-6 rounded-3xl shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <KromaqIcon size={22} />
                <span className="text-sm font-bold font-display text-white">
                  Kromaq Master Visual Identity & Stationery Registry
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsAssetModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto max-h-[75vh] rounded-xl bg-slate-950 flex items-center justify-center p-2">
              <img
                src="/assets/aistudio/1._Kromaq_identitate_vizuala__1dad45bf.png"
                alt="Kromaq Master Visual Identity Full Preview"
                className="w-full h-auto object-contain max-h-[70vh] rounded-lg"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>Stationery, Mockups, Letterhead & App Interface</span>
              <span className="text-cyan-400 font-mono">Designed for Kromaq Agency</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
