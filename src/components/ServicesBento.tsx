import React from 'react';
import {
  PanelsTopLeft,
  Target,
  Video,
  Search,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

interface ServicesBentoProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Market Reality Callout (subtle, clean bento strip above services) */}
        <div className="mb-16 p-7 sm:p-10 rounded-3xl bg-[#090e1a]/90 border border-slate-800/90 relative overflow-hidden shadow-xl">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[11px] font-semibold uppercase tracking-wider">
                The Market Reality
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white leading-tight tracking-tight">
                Great service, yet growth still depends on word-of-mouth?
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Most local and B2B businesses lose clients daily to competitors—not because their offer is weaker, but because they are invisible or hard to choose online. A slow site, unfocused social media, or guesswork ads mean burned budget. At <strong className="text-white">Kromaq</strong>, we connect design, video, and paid traffic into one system that puts qualified inquiries straight into your calendar.
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-1 gap-3">
              <div className="p-4 rounded-2xl bg-[#06090f] border border-slate-800/90 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-300">
                  No more depending on luck or unpredictable referrals
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[#06090f] border border-slate-800/90 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-300">
                  Clear positioning that instantly separates your offer
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[#06090f] border border-slate-800/90 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-300">
                  Consistent, qualified quote requests every single week
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Conversion-Driven Solutions
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mb-4">
            Your complete client acquisition{' '}
            <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              ecosystem.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every component is built to work together for one objective: turning online attention into booked appointments and measurable revenue. Zero vanity metrics.
          </p>
        </div>

        {/* 4 Core Services Bento Grid (2x2 clean premium layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Card 1: Web Design & Conversion Landing Pages */}
          <div className="p-7 rounded-3xl bg-[#0c1220]/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <PanelsTopLeft className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 text-cyan-300 border border-slate-800">
                  01 / WEB ARCHITECTURE
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-3">
                Web Design &amp; Conversion Landing Pages
              </h3>
              <div className="space-y-2.5 text-sm leading-relaxed mb-5">
                <p className="text-slate-300">
                  <span className="font-semibold text-white">What we do: </span>
                  We build fast, modern websites structured psychologically to turn visitors into quote requests and booked calls.
                </p>
                <p className="text-slate-400">
                  <span className="font-semibold text-cyan-300">Your result: </span>
                  Stop losing traffic to an outdated site or clunky mobile experience. Every page has one clear job: generating a qualified contact.
                </p>
              </div>
            </div>

            <div>
              {/* Visual Mini Graphic */}
              <div className="my-4 p-4 rounded-2xl bg-[#06090f] border border-slate-800/80 relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                  <div className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                    Visitor Intent
                  </div>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/40 via-sky-400 to-cyan-400" />
                  <div className="px-2.5 py-1.5 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">
                    Booked Lead
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Mobile-First Conversion UX</span>
                  <span className="text-cyan-400 font-mono font-bold">Sub-1.2s Load</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectService('Web Design & Conversion Landing Pages')}
                className="mt-2 w-full py-2.5 px-4 rounded-xl bg-slate-800/50 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-300 border border-slate-700 hover:border-cyan-500/40 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Build My Conversion Site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Meta Ads (Facebook & Instagram Lead Gen) */}
          <div className="p-7 rounded-3xl bg-[#0c1220]/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 text-cyan-300 border border-slate-800">
                  02 / PAID ACQUISITION
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-3">
                Meta Ads (Facebook &amp; Instagram Lead Gen)
              </h3>
              <div className="space-y-2.5 text-sm leading-relaxed mb-5">
                <p className="text-slate-300">
                  <span className="font-semibold text-white">What we do: </span>
                  We create and optimize paid campaigns targeted strictly at decision-makers and ready buyers in your local or B2B market.
                </p>
                <p className="text-slate-400">
                  <span className="font-semibold text-cyan-300">Your result: </span>
                  A steady stream of qualified leads with transparent cost per acquisition—so you always know what every euro invested brings back.
                </p>
              </div>
            </div>

            <div>
              {/* Visual Mini Graphic: Glowing Wave Lead Surge */}
              <div className="my-4 p-4 rounded-2xl bg-[#06090f] border border-slate-800/80 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-slate-400 font-mono">Qualified Lead Volume</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                    ↑ Transparent CPL
                  </span>
                </div>
                <svg className="w-full h-12" viewBox="0 0 200 50">
                  <defs>
                    <linearGradient id="paid-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0 42 Q 40 38 70 28 T 140 22 T 200 6 L 200 50 L 0 50 Z" fill="url(#paid-glow)" />
                  <path d="M 0 42 Q 40 38 70 28 T 140 22 T 200 6" fill="none" stroke="#00F2FE" strokeWidth="2.5" />
                  <circle cx="200" cy="6" r="3.5" fill="#FFFFFF" />
                </svg>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Daily Campaign Optimization</span>
                  <span className="text-cyan-400 font-mono font-bold">100% Trackable ROI</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectService('Meta Ads (Facebook & Instagram Lead Gen)')}
                className="mt-2 w-full py-2.5 px-4 rounded-xl bg-slate-800/50 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-300 border border-slate-700 hover:border-cyan-500/40 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Launch Paid Lead Campaigns</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Short-Form Video Production (Reels & TikTok) */}
          <div className="p-7 rounded-3xl bg-[#0c1220]/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Video className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 text-cyan-300 border border-slate-800">
                  03 / VIDEO AUTHORITY
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-3">
                Short-Form Video Production (Reels &amp; TikTok)
              </h3>
              <div className="space-y-2.5 text-sm leading-relaxed mb-5">
                <p className="text-slate-300">
                  <span className="font-semibold text-white">What we do: </span>
                  Concept, scripting, filming (on-site or guided remotely) and dynamic editing for short clips that build authority and trust before a client even calls.
                </p>
                <p className="text-slate-400">
                  <span className="font-semibold text-cyan-300">Your result: </span>
                  Stand out instantly from competitors posting generic stock photos and become the #1 choice in your customer&apos;s mind.
                </p>
              </div>
            </div>

            <div>
              {/* Visual Mini Graphic: Production pipeline converging */}
              <div className="my-4 p-4 rounded-2xl bg-[#06090f] border border-slate-800/80 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1.5">
                    <div className="px-2 py-0.5 rounded bg-slate-800/80 text-[10px] text-slate-300 font-mono border border-slate-700">
                      Hooks &amp; Scripts
                    </div>
                    <div className="px-2 py-0.5 rounded bg-slate-800/80 text-[10px] text-slate-300 font-mono border border-slate-700">
                      Filming &amp; Pacing
                    </div>
                    <div className="px-2 py-0.5 rounded bg-slate-800/80 text-[10px] text-slate-300 font-mono border border-slate-700">
                      Dynamic Edit
                    </div>
                  </div>
                  <div className="flex-1 px-3">
                    <svg className="w-full h-11" viewBox="0 0 100 40">
                      <path d="M 0 8 Q 50 14 100 20" stroke="#00F2FE" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                      <path d="M 0 20 Q 50 20 100 20" stroke="#38BDF8" strokeWidth="1.5" fill="none" />
                      <path d="M 0 32 Q 50 26 100 20" stroke="#818CF8" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                    </svg>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.45)]">
                    <Video className="w-5 h-5 text-slate-950" />
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Done-For-You Creative Direction</span>
                  <span className="text-cyan-400 font-mono font-bold">Reels • TikTok • Shorts</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectService('Short-Form Video Production (Reels & TikTok)')}
                className="mt-2 w-full py-2.5 px-4 rounded-xl bg-slate-800/50 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-300 border border-slate-700 hover:border-cyan-500/40 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Produce Authority Video Content</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Social Media Management & Local SEO */}
          <div className="p-7 rounded-3xl bg-[#0c1220]/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 text-cyan-300 border border-slate-800">
                  04 / ORGANIC &amp; LOCAL DOMINANCE
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-3">
                Social Media Management &amp; Local SEO
              </h3>
              <div className="space-y-2.5 text-sm leading-relaxed mb-5">
                <p className="text-slate-300">
                  <span className="font-semibold text-white">What we do: </span>
                  We manage your consistent social media presence and optimize your Google Business Profile to dominate local searches in your city.
                </p>
                <p className="text-slate-400">
                  <span className="font-semibold text-cyan-300">Your result: </span>
                  When someone searches for your services in your area, you are the first result they see—and the business they trust.
                </p>
              </div>
            </div>

            <div>
              {/* Visual Mini Graphic: Local Search & Maps Ranking */}
              <div className="my-4 p-4 rounded-2xl bg-[#06090f] border border-slate-800/80 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>Google Business &amp; Map Pack</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold">
                    #1 Local Visibility
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 w-11/12" />
                  <div className="h-2 rounded-full bg-slate-800 w-3/4" />
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Consistent Channel Publishing</span>
                  <span className="text-cyan-400 font-mono font-bold">High-Intent Search</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectService('Social Media Management & Local SEO')}
                className="mt-2 w-full py-2.5 px-4 rounded-xl bg-slate-800/50 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-300 border border-slate-700 hover:border-cyan-500/40 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Dominate Local Search &amp; Social</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Industries served strip */}
        <div className="p-6 rounded-2xl bg-[#080d17] border border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-sm font-semibold text-white">Built for Proven Local &amp; B2B Businesses:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
              Clinics &amp; Medical
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
              Automotive &amp; Detailing
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
              Salons &amp; Aesthetics
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
              Real Estate &amp; HoReCa
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
              Service-Based B2B
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
