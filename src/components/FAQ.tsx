import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Kromaq’s 14-day velocity onboarding work?',
      a: 'On Day 1, we conduct an exhaustive algorithmic audit of your brand, existing video retention drop-offs, and top 10 competitors. By Day 4, scripts and 3D kinetic storyboards are approved. By Day 10, your first high-throughput batch of 12-24 cinema-grade motion assets is rendered, captioned, and scheduled.',
    },
    {
      q: 'Do you manage paid ad spend or solely create organic video content?',
      a: 'We operate as an integrated full-funnel partner. While our Launch tier focuses on organic content volume, our Motion & Performance and Enterprise tiers manage paid media across Meta Ads, TikTok Shop, and YouTube, using real-time algorithmic attribution to funnel budget into winning hooks.',
    },
    {
      q: 'Who owns the creative assets and raw 3D render files?',
      a: 'You do. 100% of all scripts, 3D motion renders, project files, audio mixes, and copy produced during our partnership belong exclusively to your brand with full commercial rights in perpetuity.',
    },
    {
      q: 'What platforms do you support?',
      a: 'We specialize in short-form and high-retention video: Instagram Reels, TikTok, YouTube Shorts, and LinkedIn video. For paid media, we manage Meta (Instagram/Facebook), TikTok Ads Manager, and Google/YouTube video campaigns.',
    },
    {
      q: 'What is the Kromaq AI Trend Radar?',
      a: 'Unlike generic social listening tools that summarize past hashtags, our proprietary AI scrapers track velocity shifts in audio soundbites, emerging comment sentiment patterns, and hook retention curves across 200k+ viral videos daily. This lets our creators produce content on rising trends 48-72 hours before competitors notice.',
    },
    {
      q: 'How does collaboration work with our in-house marketing team?',
      a: 'We plug directly into your workflow via a dedicated private Slack channel, shared Notion dashboard, and the live Kromaq Terminal. We augment your internal team by removing the burden of ideation, scriptwriting, motion graphics, and video editing.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 relative bg-[#06090f]/95 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mb-4">
            Clarity on everything.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about working with Kromaq.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-[#090e18] border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/20 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold font-display text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-cyan-500/20 text-cyan-300' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
