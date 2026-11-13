import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Iulian Chirila',
      role: 'Founder & Visionary, Kromaq',
      quote:
        'Most great businesses lose clients online not because their service is weaker, but because their digital presence is fragmented. At Kromaq, we connect conversion web design, video authority, Meta Ads, and local SEO into one predictable system.',
      highlight: 'Agency Philosophy',
      isFounder: true,
    },
    {
      name: 'Dr. Andrei M.',
      role: 'Founder, Urban Dental & Aesthetics',
      quote:
        'Before Kromaq, we relied almost entirely on word-of-mouth. Within two weeks of launching our new landing page, Reels, and local Meta Ads, patients started booking directly after seeing our videos.',
      highlight: '+148% Inquiries',
      isFounder: false,
    },
    {
      name: 'Cristian T.',
      role: 'Managing Director, ProConstruct B2B',
      quote:
        'Everything under one roof makes all the difference. No coordinating separate freelancers, no agency jargon—just clear numbers, fast execution, and qualified quote requests landing in our calendar every week.',
      highlight: '4-in-1 Execution',
      isFounder: false,
    },
  ];

  return (
    <section className="py-20 md:py-28 relative bg-[#070a12] border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Built On Real Outcomes
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mb-4">
            Tested by founders. <br className="hidden sm:inline" />
            <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Proven by booked clients.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            How local and B2B business owners turn fragmented marketing into predictable client acquisition with Kromaq.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className={`p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                rev.isFounder
                  ? 'bg-gradient-to-br from-[#0c1424] to-[#070b14] border-2 border-cyan-500/40 shadow-[0_0_35px_rgba(0,242,254,0.15)]'
                  : 'bg-[#090e18]/80 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {rev.highlight}
                  </span>
                </div>

                <Quote className="w-7 h-7 text-cyan-500/30 mb-3" />
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  &quot;{rev.quote}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-xs uppercase shadow">
                  {rev.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    {rev.isFounder && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 font-mono">
                        FOUNDER
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
