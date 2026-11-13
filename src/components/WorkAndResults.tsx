import React, { useState } from 'react';
import {
  ArrowUpRight,
  Award,
  CheckCircle,
  BarChart3,
  Zap,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface CaseStudy {
  id: string;
  brand: string;
  category: 'clinics' | 'auto' | 'realestate' | 'b2b';
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'clinics' | 'auto' | 'realestate' | 'b2b'>('all');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const standards = [
    {
      icon: BarChart3,
      title: 'Focus on Revenue, Not "Likes"',
      desc: 'We never brag about empty reach. We measure calls, bookings, and qualified quote requests landing in your calendar.',
    },
    {
      icon: Zap,
      title: 'Everything Under One Roof',
      desc: 'Stop coordinating a web developer, videographer, and ads buyer separately. We connect all four disciplines into one engine.',
    },
    {
      icon: Clock,
      title: 'Speed & Agility',
      desc: 'Zero corporate bureaucracy or waiting weeks for a quick revision. Direct communication and fast implementation.',
    },
    {
      icon: ShieldCheck,
      title: 'Total Transparency',
      desc: '24/7 access to your real ad accounts and live performance data. You know exactly where every euro invested goes.',
    },
  ];

  const caseStudies: CaseStudy[] = [
    {
      id: 'dental',
      brand: 'Urban Dental & Aesthetics',
      category: 'clinics',
      categoryLabel: 'Medical & Aesthetic Clinics',
      tagline: 'Consistent Patient Bookings Without Depending on Referrals',
      summary:
        'Replaced a slow brochure website with a mobile-first treatment landing page, authority doctor Reels, and hyper-local Meta Ads targeting high-intent treatments.',
      heroMetric: '+148%',
      heroMetricLabel: 'Qualified Patient Inquiries',
      metrics: [
        { label: 'First Leads After Launch', value: '8 Days' },
        { label: 'Mobile Conversion Rate', value: '6.4%' },
        { label: 'Local Maps Visibility', value: 'Top 3' },
      ],
      framework: [
        'Conversion-Focused Treatment Landing Page',
        'Short-Form Trust Reels (Doctor Q&A)',
        'Geo-Targeted Meta Ads + Google Business SEO',
      ],
      duration: '60 Days',
      clientQuote:
        'Patients now mention our videos when they walk into the clinic. Our reception calendar stays filled without guesswork.',
      author: 'Dr. Andrei M.',
      authorRole: 'Clinic Founder',
    },
    {
      id: 'auto',
      brand: 'Apex Auto Detailing & PPF',
      category: 'auto',
      categoryLabel: 'Automotive Services',
      tagline: 'Turned Scroll-Stopping Reels & Meta Ads Into High-Ticket Bookings',
      summary:
        'Combined crisp before/after vertical video production with local lead-gen Meta Ads and Google Business optimization to dominate city searches.',
      heroMetric: '3.9x',
      heroMetricLabel: 'Return on Local Ad Spend',
      metrics: [
        { label: 'Time to First Bookings', value: '10 Days' },
        { label: 'Monthly Quote Requests', value: '65+ Leads' },
        { label: 'Google Maps Calls', value: '+210%' },
      ],
      framework: [
        'Hook-Driven Short-Form Video Production',
        'Meta Ads Lead Qualification Funnel',
        'Google Business Profile Optimization',
      ],
      duration: '45 Days',
      clientQuote:
        'We used to post random car photos with zero bookings. Kromaq rebuilt our offer online and now prospects reach out already sold.',
      author: 'Bogdan R.',
      authorRole: 'Managing Partner',
    },
    {
      id: 'estate',
      brand: 'Nordic Living Developments',
      category: 'realestate',
      categoryLabel: 'Real Estate & Architecture',
      tagline: 'High-Intent Viewing Requests via Video Walkthroughs & Landing Pages',
      summary:
        'Designed a sleek property conversion funnel paired with dynamic video tours and buyer-targeted Meta Ads replacing generic portal listings.',
      heroMetric: '-42%',
      heroMetricLabel: 'Cost Per Qualified Viewing',
      metrics: [
        { label: 'Landing Page Speed', value: '0.9s' },
        { label: 'Qualified Viewings / Mo', value: '38 Booked' },
        { label: 'Lead Data Visibility', value: '24/7 Live' },
      ],
      framework: [
        'Dedicated Property Conversion Landing Page',
        'Dynamic Short-Form Walkthrough Reels',
        'Buyer-Intent Meta Ads Retargeting',
      ],
      duration: '60 Days',
      clientQuote:
        'Everything was connected—site, video, and ads—by one team that understood what actually drives a real estate inquiry.',
      author: 'Elena V.',
      authorRole: 'Sales Director',
    },
    {
      id: 'b2b',
      brand: 'ProConstruct B2B Systems',
      category: 'b2b',
      categoryLabel: 'B2B Services & Contractors',
      tagline: 'Predictable Commercial Quote Pipeline Beyond Word-of-Mouth',
      summary:
        'Built an authority-driven digital presence combining clear B2B web messaging, decision-maker Meta campaigns, and local search dominance.',
      heroMetric: '14 Days',
      heroMetricLabel: 'To Full System Launch',
      metrics: [
        { label: 'Weekly Quote Requests', value: '12–18' },
        { label: 'Tracking Transparency', value: '100%' },
        { label: 'Channels Integrated', value: '4-in-1' },
      ],
      framework: [
        'Clear Offer & Conversion Web Architecture',
        'Decision-Maker Paid Lead Generation',
        'Local SEO & Authority Social Content',
      ],
      duration: '90 Days',
      clientQuote:
        'No fluff, no confusing agency jargon—just clear numbers, fast updates, and real commercial inquiries arriving every week.',
      author: 'Cristian T.',
      authorRole: 'Managing Director',
    },
  ];

  const filteredStudies =
    activeFilter === 'all'
      ? caseStudies
      : caseStudies.filter((item) => item.category === activeFilter);

  return (
    <section id="work" className="py-20 md:py-28 relative bg-[#06090f]/90 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Why Kromaq / The Kromaq Standard (from reference site) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-20 mb-20 border-b border-slate-800/80">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
              The Kromaq Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight mb-4 leading-tight">
              Why work with us instead of a{' '}
              <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                traditional agency?
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-7">
              Big agencies sell rigid retainers and reports packed with technical jargon. We operate as your direct growth partner: fast, transparent, and 100% focused on the profitability of your campaigns.
            </p>
            <button
              type="button"
              onClick={onBookNow}
              className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-300 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-[0_0_20px_rgba(0,242,254,0.35)] inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Talk Directly With Our Team</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {standards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-[#090e18] border border-slate-800 hover:border-cyan-500/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-display text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Case Studies Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              Industry Playbooks &amp; Results
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
              Real businesses. <br className="hidden sm:inline" />
              <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                Measurable pipeline.
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0a0f1d] border border-slate-800 overflow-x-auto">
            {(
              [
                { id: 'all', label: 'All Niches' },
                { id: 'clinics', label: 'Clinics' },
                { id: 'auto', label: 'Auto' },
                { id: 'realestate', label: 'Real Estate' },
                { id: 'b2b', label: 'B2B' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter.label}
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
                  <span className="text-xs text-slate-400 font-mono">{study.duration} Window</span>
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
                    <span className="text-3xl font-extrabold font-display text-cyan-400">
                      {study.heroMetric}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">{study.metrics[0].label}</span>
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
              Want a predictable acquisition system for your business?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Free 20-minute Google Meet audit of your website, social channels &amp; local competitors. Zero pressure.
            </p>
          </div>
          <button
            type="button"
            onClick={onBookNow}
            className="shrink-0 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-300 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all cursor-pointer"
          >
            Request Your Free Audit
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
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                aria-label="Close Case Study Details"
              >
                ✕
              </button>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">System Deployed</h4>
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
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Core Deliverables</h4>
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
              <p className="text-xs italic text-slate-300">&quot;{selectedStudy.clientQuote}&quot;</p>
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
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer"
            >
              Book 20-Min Strategy Call
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
