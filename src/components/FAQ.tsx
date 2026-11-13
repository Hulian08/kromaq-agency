import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does it take to see concrete results?',
      a: 'For Meta Ads campaigns and conversion landing pages, your first quote requests and leads typically start coming in within 7–14 days after launch. For Local SEO and organic growth via short-form video, momentum compounds strongly over 30–60 days.',
    },
    {
      q: 'What ad budget do I need alongside your services?',
      a: 'For local and B2B businesses, we recommend a minimum testing ad budget of €300–€500/month paid directly to Meta (Facebook/Instagram), giving the algorithm enough data to optimize your cost per lead effectively.',
    },
    {
      q: 'Do I have to handle filming or writing scripts myself?',
      a: 'No. We provide the scripts, hooks, and full creative direction. If you are in the Cluj-Napoca area, our team handles filming on-site; if you are located elsewhere, we give you clear step-by-step filming guidance and handle all editing and post-production.',
    },
    {
      q: 'Do you only work with specific industries?',
      a: 'We partner with local businesses (medical & aesthetic clinics, automotive services, salons, real estate, HoReCa) and B2B companies that already have a validated service and want a predictable client acquisition system—without relying solely on referrals.',
    },
    {
      q: 'Why work with Kromaq instead of a traditional agency?',
      a: 'Large agencies lock you into rigid contracts and send reports filled with vanity metrics. We work as a direct growth partner: fast, transparent, everything under one roof (Web, Meta Ads, Video & Local SEO), and 100% focused on bookings and profitability.',
    },
    {
      q: 'What happens during the free 20-minute Google Meet audit?',
      a: 'We look live at your website, social channels, and local market competition to spot exactly where potential customers are slipping away and map out how an integrated acquisition system would work for your business. Zero obligation, zero aggressive sales pitches.',
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
            Everything you need to know{' '}
            <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              before we start.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Clear, direct answers about timelines, budgets, filming, and how we deliver results.
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
