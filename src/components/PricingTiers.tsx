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
      name: 'Launch Accelerator',
      tagline: 'Predictable viral reach and organic brand authority.',
      basePrice: 3800,
      popular: false,
      features: [
        '12 Bespoke Short-Form Reels / TikToks per month',
        'Custom 3D kinetic typography & brand motion styling',
        'Algorithmic audio matching & sound design',
        'Bi-weekly AI trend & hook intelligence reports',
        'Dedicated Slack channel & review portal',
        'Turnaround: 48-72 hours per asset batch',
      ],
      notIncluded: ['Paid media ad management', 'Custom AI model fine-tuning'],
    },
    {
      name: 'Motion & Performance',
      tagline: 'Full-stack organic engine plus ruthless paid acquisition.',
      basePrice: 6900,
      popular: true,
      features: [
        '24 Cinema-Grade Motion Assets per month',
        'Paid media management on Meta & TikTok (up to $50k/mo ad spend)',
        'Multi-variant hook split testing (4 variations per asset)',
        'Full access to Live Kromaq Intelligence Terminal',
        'AI Trend Radar 24/7 scraping for your exact niche',
        'Weekly video growth & attribution strategy calls',
        'Priority Slack response (< 2 hours)',
      ],
      notIncluded: [],
    },
    {
      name: 'Enterprise Bespoke',
      tagline: 'Dedicated creative production cell and executive prestige.',
      basePrice: 12500,
      popular: false,
      features: [
        '40+ High-Throughput Motion & Video Deliverables',
        'Full omnichannel scaling (Reels, TikTok, YouTube, LinkedIn, X)',
        'Uncapped paid media ad spend management',
        'Custom fine-tuned Brand Voice AI Model & Sentiment Engine',
        'Founder & C-Suite executive ghostwriting & video editing',
        'Dedicated creative director & senior motion designer',
        '24/7 VIP escalation line & custom SLA guarantees',
      ],
      notIncluded: [],
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
            Invest in momentum. <br className="hidden sm:inline" />
            <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              No hidden fees.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            Select the tier aligned with your current scale. All partnerships include our 14-day velocity onboarding and SLA guarantees.
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
              Monthly Retainer
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
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Most Selected Partner Tier</span>
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
                      ${calculatedPrice.toLocaleString()}
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

        {/* Guarantee Banner */}
        <div className="p-6 rounded-2xl bg-[#080d17] border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <div className="text-sm font-bold text-white font-display">The Kromaq 30-Day Growth Guarantee</div>
              <p className="text-xs text-slate-400">
                If we do not out-perform your historical organic retention benchmarks within 30 days, we work the following 30 days free.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-800/40 whitespace-nowrap">
            SLA Backed
          </span>
        </div>
      </div>
    </section>
  );
};
