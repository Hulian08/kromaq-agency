import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface PricingTiersProps {
  onSelectTier: (tierName: string) => void;
}

export const PricingTiers: React.FC<PricingTiersProps> = ({ onSelectTier }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  const discountMultiplier = billingCycle === 'quarterly' ? 0.85 : 1;

  const tiers = [
    {
      name: 'Conversion Presence',
      tagline: 'Fix your digital foundation: high-converting web & local search visibility.',
      basePrice: 950,
      popular: false,
      features: [
        'Conversion-focused Website or High-Intent Landing Page',
        'Mobile-first UX & offer messaging clarity',
        'Google Business Profile optimization & Local SEO setup',
        'Meta Pixel & conversion event tracking installation',
        'Direct communication channel & rapid updates',
        'Turnaround: launched within 14 days',
      ],
    },
    {
      name: '4-in-1 Growth System',
      tagline: 'Everything under one roof: Web, Meta Ads, Short-Form Video & Local SEO.',
      basePrice: 1850,
      popular: true,
      features: [
        'Conversion Landing Page / Website Optimization',
        'Meta Ads (Facebook & Instagram) Lead Gen management',
        'Short-Form Video Production (Reels & TikTok scripting + dynamic edit)',
        'Social Media Management & Google Business Local SEO',
        'Daily cost-per-lead monitoring & ad optimization',
        '24/7 direct access to ad accounts & transparent ROI data',
        'Bi-weekly performance review & scaling calls',
      ],
    },
    {
      name: 'Full-Scale Partner',
      tagline: 'High-volume creative production & multi-campaign scaling for ambitious brands.',
      basePrice: 3200,
      popular: false,
      features: [
        'Full Multi-Page Conversion Website + Dedicated Offer Funnels',
        'Aggressive Meta Ads scaling & multi-angle split testing',
        'Full-month Short-Form Video batch (on-site in Cluj or guided remote)',
        'Complete Social Media & Local SEO city dominance',
        'Priority creative & landing page iteration (< 24h)',
        'Direct executive Slack/WhatsApp line with agency lead',
        'Custom KPI & pipeline attribution dashboard',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent Partnerships
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mb-4">
            Invest in qualified clients. <br className="hidden sm:inline" />
            <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Zero hidden fees.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            Choose the engagement aligned with your growth stage. Ad spend is paid directly to Meta so you stay 100% in control of your budget.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#090e18] border border-slate-800">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Partnership
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('quarterly')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Quarterly Sprint</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-900/80 text-cyan-300 font-mono">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          {tiers.map((tier) => {
            const calculatedPrice = Math.round(tier.basePrice * discountMultiplier);

            return (
              <div
                key={tier.name}
                className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                  tier.popular
                    ? 'bg-gradient-to-b from-[#0e1627] via-[#090f1d] to-[#070b13] border-2 border-cyan-400/80 shadow-[0_0_50px_rgba(0,242,254,0.25)] lg:-translate-y-2'
                    : 'bg-[#090e18]/90 border border-slate-800 hover:border-slate-700 shadow-xl'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Complete 4-in-1 System</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold font-display text-white">{tier.name}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed min-h-[36px]">{tier.tagline}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 pb-6 border-b border-slate-800/80 mb-6">
                    <span className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight">
                      €{calculatedPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-medium text-slate-400">/ month</span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                      Deliverables Included:
                    </div>
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTier(tier.name)}
                  className={`w-full py-3.5 px-6 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-cyan-300 to-sky-400 hover:from-cyan-200 hover:to-sky-300 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.4)]'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>Select {tier.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Guarantee / Transparency Banner */}
        <div className="p-6 rounded-2xl bg-[#080d17] border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <div className="text-sm font-bold text-white font-display">100% Ownership &amp; Direct Ad Account Transparency</div>
              <p className="text-xs text-slate-400">
                Your website, creatives, and ad accounts stay under your full ownership 24/7. No rigid lock-in contracts or hidden agency markups.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-800/40 whitespace-nowrap">
            Direct Partner Model
          </span>
        </div>
      </div>
    </section>
  );
};
