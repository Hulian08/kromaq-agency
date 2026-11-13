import React, { useState } from 'react';
import { Search, Wrench, TrendingUp, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProcessTimelineProps {
  onOpenBooking?: () => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onOpenBooking }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 0,
      stepNumber: '01',
      title: 'Audit & Strategy',
      subtitle: 'Diagnose Bottlenecks & Map Fastest ROI',
      timeframe: 'Week 1',
      icon: Search,
      shortDesc: 'We analyze your business, competitors, and conversion leaks.',
      fullDesc:
        'We inspect your current digital presence, local competition, and where inquiries are slipping away. We pinpoint which channels—Web, Meta Ads, Video, or Local SEO—will generate the fastest return and lock in clear KPIs.',
      highlights: [
        'Full audit of website, social pages & ad history',
        'Local & B2B competitor breakdown',
        'Channel priority plan (Web, Ads, Video, SEO)',
        'Clear lead & cost-per-acquisition KPIs',
      ],
      metric: 'Week 1 Growth Roadmap',
    },
    {
      id: 1,
      stepNumber: '02',
      title: 'Build & Launch',
      subtitle: 'Conversion Infrastructure & Creative Production',
      timeframe: 'Weeks 2 — 3',
      icon: Wrench,
      shortDesc: 'We build your site, shoot/edit videos, and set up paid campaigns.',
      fullDesc:
        'We assemble the full acquisition engine under one roof: optimizing or building your website for conversions, scripting and editing high-retention short-form videos, optimizing Google Business SEO, and configuring your Meta Ads.',
      highlights: [
        'Modern conversion-first website / landing page',
        'Short-form video scripts, hooks & dynamic editing',
        'Meta Ads lead generation funnel & pixel tracking',
        'Google Business Profile & local search setup',
      ],
      metric: '14-Day System Go-Live',
    },
    {
      id: 2,
      stepNumber: '03',
      title: 'Optimize & Scale',
      subtitle: 'Daily CPL Control & Transparent Reporting',
      timeframe: 'Ongoing',
      icon: TrendingUp,
      shortDesc: 'Cut what wastes budget, double down on what brings real clients.',
      fullDesc:
        'We monitor cost per lead and inquiry quality every day. Underperforming creatives get cut immediately, budget scales into top-converting angles, and you get clear, jargon-free reports showing real calls and quote requests.',
      highlights: [
        'Daily cost-per-lead & lead quality monitoring',
        'Continuous creative testing & ad optimization',
        '24/7 direct access to your real ad accounts & data',
        'Jargon-free reporting focused on revenue & bookings',
      ],
      metric: 'Predictable Weekly Leads',
    },
  ];

  const currentStep = steps[activeStep];
  const StepIcon = currentStep.icon;

  return (
    <section id="how-we-work" className="py-20 md:py-28 relative bg-[#06090e] border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Structured Implementation
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mb-4">
            How we go from discussion to{' '}
            <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              results in 3 steps.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            No corporate bureaucracy or months of waiting. Everything moves from audit to live client acquisition cleanly and fast.
          </p>
        </div>

        {/* 3 Connected Interactive Step Nodes */}
        <div className="relative mb-12">
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
                  <div className="relative mb-5">
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

                  <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                    {step.timeframe}
                  </div>
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
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono font-bold">
                  STEP {currentStep.stepNumber} // {currentStep.timeframe.toUpperCase()}
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
                  PHASE MILESTONE
                </span>
                <div className="text-xl sm:text-2xl font-black font-display text-white mt-1">
                  {currentStep.metric}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 max-w-xs">
                Direct communication, rapid execution, and full 24/7 visibility into your accounts.
              </p>
              {onOpenBooking && (
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-500/15 hover:bg-cyan-400 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Book Your Free Audit Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
