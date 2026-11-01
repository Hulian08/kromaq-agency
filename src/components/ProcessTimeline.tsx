import React, { useState } from 'react';
import { Search, Film, Rocket, Sparkles, CheckCircle2, ArrowRight, Clock, ShieldCheck, Zap } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1); // Default to Step 2 (Analyze / Produce) like Verdant

  const steps = [
    {
      id: 0,
      stepNumber: '1',
      title: 'Connect & Ingest',
      subtitle: 'Algorithmic Audit & Creative Intelligence',
      timeframe: 'Days 1 — 3',
      icon: Search,
      shortDesc: 'Link your channel metrics and ad accounts with zero-friction integrations.',
      fullDesc: 'We reverse-engineer your brand voice, historical retention curves, and competitor blind spots using our proprietary AI Trend Radar.',
      highlights: [
        'Creative fatigue and hook drop-off diagnosis',
        'Top 10 competitor content reverse-engineering',
        '90-day content architecture roadmap',
        'Brand asset ingestion & style guide syncing',
      ],
      metric: '72-Hour Audit Delivery',
    },
    {
      id: 1,
      stepNumber: '2',
      title: 'Analyze & Produce',
      subtitle: 'Kinetic Motion & Viral Hook Testing',
      timeframe: 'Days 4 — 10',
      icon: Film,
      shortDesc: 'Our AI and studio crew craft bespoke cinema-grade motion creative.',
      fullDesc: 'Our dedicated production cell animates 3D kinetic typography, luxury aesthetic cuts, dynamic hooks, and sound design engineered for algorithmic retention.',
      highlights: [
        '16 to 32 polished motion video deliverables',
        'Multi-variant hook split testing (4 hooks per asset)',
        '3D crystalline particle & typography animations',
        'Audio fingerprint matching with rising viral sounds',
      ],
      metric: '82.5% Avg Retention',
    },
    {
      id: 2,
      stepNumber: '3',
      title: 'Scale & Dominate',
      subtitle: 'Paid Amplification & AI Attribution',
      timeframe: 'Days 11 & Beyond',
      icon: Rocket,
      shortDesc: 'Deploy insights directly to high-converting paid and organic funnels.',
      fullDesc: 'We funnel ad spend into verified organic winners, automate real-time bid adjustments, and provide continuous executive reporting via the Kromaq Terminal.',
      highlights: [
        'Live 24/7 Kromaq Intelligence Hub access',
        'Continuous ROAS optimization & creative refresh',
        'Omnichannel distribution (Reels, TikTok, Shorts, LinkedIn)',
        'Weekly video growth & attribution strategy calls',
      ],
      metric: '4.8x Avg ROAS Lift',
    },
  ];

  const currentStep = steps[activeStep];
  const StepIcon = currentStep.icon;

  return (
    <section id="approach" className="py-20 md:py-28 relative bg-[#06090e] border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header matching Verdant exact layout */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The Kromaq Motion Framework
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mb-4">
            Designed for simplicity.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Get up and running in days, not months. Our motion engine seamlessly integrates with your existing channels.
          </p>
        </div>

        {/* 3 Connected Interactive Step Nodes (Verdant Style) */}
        <div className="relative mb-12">
          {/* Subtle connecting horizontal line behind the circles */}
          <div className="absolute top-8 left-16 right-16 h-[1.5px] bg-slate-800 hidden md:block z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <button
                  key={step.stepNumber}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center text-center cursor-pointer group focus:outline-none"
                  aria-pressed={isActive}
                >
                  {/* Circle Node with glowing dot on active */}
                  <div className="relative mb-5">
                    {/* Glowing active indicator dot above the node (Verdant signature) */}
                    {isActive && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#00F2FE] animate-pulse" />
                    )}

                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#0b1322] border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.4)] text-cyan-300 scale-105'
                          : 'bg-[#0a0f1b] border border-slate-800 text-slate-400 group-hover:border-slate-700 group-hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <div className="text-sm font-bold font-display text-white mb-1 transition-colors group-hover:text-cyan-300">
                    {step.stepNumber}. {step.title}
                  </div>
                  <p className="text-xs text-slate-400 max-w-[240px] leading-relaxed">
                    {step.shortDesc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card for the Active Step */}
        <div className="p-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-slate-800/40 to-blue-500/20 shadow-2xl">
          <div className="p-6 sm:p-8 rounded-[22px] bg-[#080d17] border border-slate-800/90 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Description & Highlights */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono font-bold">
                  PHASE 0{currentStep.stepNumber} // {currentStep.timeframe}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs font-semibold text-slate-300">{currentStep.subtitle}</span>
              </div>

              <h3 className="text-2xl font-bold font-display text-white">
                {currentStep.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentStep.fullDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {currentStep.highlights.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Key Metric Callout */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#05080f] border border-cyan-500/20 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <StepIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                  KEY PERFORMANCE TARGET
                </span>
                <div className="text-2xl font-black font-display text-white mt-1">
                  {currentStep.metric}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 max-w-xs">
                Guaranteed by Kromaq velocity agreements with weekly performance checks.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
