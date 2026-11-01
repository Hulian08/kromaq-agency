import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, TrendingUp, Award, ExternalLink, CheckCircle } from 'lucide-react';

interface CaseStudy {
  id: string;
  brand: string;
  category: 'ecommerce' | 'saas' | 'luxury' | 'fintech';
  categoryLabel: string;
  tagline: string;
  summary: string;
  heroMetric: string;
  heroMetricLabel: string;
  metrics: { label: string; value: string }[];
  framework: string[];
  duration: string;
  clientQuote: string;
  author: string;
  authorRole: string;
}

export const WorkAndResults: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ecommerce' | 'saas' | 'luxury' | 'fintech'>('all');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 'apex',
      brand: 'Apex Apparel Co.',
      category: 'ecommerce',
      categoryLabel: 'E-Commerce & Streetwear',
      tagline: 'From Stagnant Ads to 8.4M Viral Views in 45 Days',
      summary: 'Replaced static product photo ads with high-energy 3D kinetic video hooks and micro-storytelling across TikTok & Instagram Reels.',
      heroMetric: '+614%',
      heroMetricLabel: 'Organic Reach Surge',
      metrics: [
        { label: 'Blended ROAS', value: '5.2x' },
        { label: 'TikTok Shop Revenue', value: '$420,000+' },
        { label: 'Creative Assets Delivered', value: '42 Videos' },
      ],
      framework: [
        '3D Cloth Simulation Teasers',
        'Algorithmic Audio Pairing',
        'Rapid Creator Seed Campaigns',
      ],
      duration: '45 Days',
      clientQuote: 'Kromaq completely transformed our brand perception. We went from burning ad spend to having customers tag each other in our motion drops.',
      author: 'Marcus Vance',
      authorRole: 'Head of Growth, Apex Apparel',
    },
    {
      id: 'solstice',
      brand: 'Solstice Intelligence',
      category: 'saas',
      categoryLabel: 'Enterprise AI & SaaS',
      tagline: 'Generating $2.4M Enterprise Pipeline via Short-Form Motion',
      summary: 'Turned complex AI database architecture into captivating 30-second explainer reels and founder-led thought leadership on LinkedIn & YouTube.',
      heroMetric: '+320%',
      heroMetricLabel: 'Inbound Demo Surge',
      metrics: [
        { label: 'Pipeline Generated', value: '$2.4M' },
        { label: 'LinkedIn Impressions', value: '3.6M' },
        { label: 'Customer Acquisition Cost', value: '-38%' },
      ],
      framework: [
        'Technical Hook Reverse-Engineering',
        'Executive Ghostwriting & Motion',
        'B2B Retargeting Funnels',
      ],
      duration: '90 Days',
      clientQuote: 'They did what three previous marketing agencies failed to do: made enterprise data software feel exciting, sleek, and urgent.',
      author: 'Elena Rostova',
      authorRole: 'CMO, Solstice Intelligence',
    },
    {
      id: 'lumina',
      brand: 'Lumina Studio & Acoustics',
      category: 'luxury',
      categoryLabel: 'Luxury Audio & Tech',
      tagline: 'Sold Out Flagship Headphones Launch in 96 Hours',
      summary: 'Crafted a cinematic pre-launch teaser campaign focusing on acoustic frequencies visualized as shimmering 3D crystalline particles.',
      heroMetric: '14.2M',
      heroMetricLabel: 'Total Pre-Launch Impressions',
      metrics: [
        { label: 'Sell-Out Time', value: '96 Hours' },
        { label: 'Waitlist Subscribers', value: '28,400' },
        { label: 'Average Watch-Through', value: '88.4%' },
      ],
      framework: [
        'Crystalline 3D Acoustic Visuals',
        'Exclusive VIP Drop Sequences',
        'High-Aesthetic Audio Design',
      ],
      duration: '30 Days',
      clientQuote: 'Kromaq doesn’t produce content; they produce cultural momentum. The aesthetic caliber matched our European acoustic design flawlessly.',
      author: 'Henrik Lindqvist',
      authorRole: 'Founder & Design Director, Lumina',
    },
    {
      id: 'horizon',
      brand: 'Horizon Capital',
      category: 'fintech',
      categoryLabel: 'FinTech & Wealth',
      tagline: 'Decimating Paid Acquisition Cost by 44%',
      summary: 'Built high-trust educational hooks breaking down macroeconomic shifts into digestible, visually arresting mobile financial graphics.',
      heroMetric: '4.4x',
      heroMetricLabel: 'High-Net-Worth Lead Conversion',
      metrics: [
        { label: 'Acquisition Cost (CAC)', value: '-44%' },
        { label: 'Assets Under Custody Driven', value: '$38M+' },
        { label: 'Compliance Approval Rate', value: '100%' },
      ],
      framework: [
        'FinTech Compliance Pre-Clearance',
        'High-Trust Chart Animations',
        'Algorithmic Lead Qualification',
      ],
      duration: '60 Days',
      clientQuote: 'FinTech social media is usually boring or risky. Kromaq struck the perfect balance of prestige authority and virality.',
      author: 'Julian Sterling',
      authorRole: 'Managing Partner, Horizon Capital',
    },
  ];

  const filteredStudies = activeFilter === 'all'
    ? caseStudies
    : caseStudies.filter((item) => item.category === activeFilter);

  return (
    <section id="work" className="py-20 md:py-28 relative bg-[#06090f]/90 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              Verified Case Studies
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
              Real brands. <br className="hidden sm:inline" />
              <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                Undeniable momentum.
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0a0f1d] border border-slate-800 overflow-x-auto">
            {(['all', 'ecommerce', 'saas', 'luxury', 'fintech'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter === 'all' ? 'All Niches' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="p-7 rounded-3xl bg-[#090e18] border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800/80 text-cyan-300 border border-slate-700">
                    {study.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{study.duration} Campaign</span>
                </div>

                <h3 className="text-2xl font-bold font-display text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {study.brand}
                </h3>
                <p className="text-sm font-semibold text-slate-200 mb-3">{study.tagline}</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{study.summary}</p>

                {/* Big Metric Banner */}
                <div className="p-4 rounded-2xl bg-[#05080f] border border-slate-800/80 flex items-center justify-between mb-6">
                  <div>
                    <span className="text-[11px] text-slate-400 block">{study.heroMetricLabel}</span>
                    <span className="text-3xl font-extrabold text-white font-display text-cyan-400">
                      {study.heroMetric}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Blended Return</span>
                    <span className="text-xl font-bold text-white font-mono">{study.metrics[0].value}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Client Quote & Action */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white">{study.author}</div>
                  <div className="text-[11px] text-slate-400">{study.authorRole}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStudy(study)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-300 border border-slate-700 hover:border-cyan-400/50 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Read Breakdown</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0c1424] via-[#09101d] to-[#070b13] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg sm:text-xl font-bold font-display text-white mb-1">
              Want similar results engineered for your brand?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              We audit your competitors and deliver your custom 90-day motion roadmap in 48 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={onBookNow}
            className="shrink-0 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-300 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all cursor-pointer"
          >
            Request Your Brand Audit
          </button>
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedStudy && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedStudy(null)}
        >
          <div
            className="relative max-w-xl w-full bg-[#090d16] border border-cyan-500/40 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">{selectedStudy.categoryLabel}</span>
                <h3 className="text-2xl font-bold font-display text-white">{selectedStudy.brand}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudy(null)}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
                aria-label="Close Case Study Details"
              >
                ✕
              </button>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Campaign Strategy</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedStudy.summary}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#05080e] border border-slate-800">
              {selectedStudy.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-lg font-bold text-cyan-300 font-display">{m.value}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tactical Framework Deployed</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedStudy.framework.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
              <p className="text-xs italic text-slate-300">"{selectedStudy.clientQuote}"</p>
              <div className="mt-2 text-[11px] font-semibold text-cyan-300">
                — {selectedStudy.author}, {selectedStudy.authorRole}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedStudy(null);
                onBookNow();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110"
            >
              Book Strategy Session For Your Brand
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
