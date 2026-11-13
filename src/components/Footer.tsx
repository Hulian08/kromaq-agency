import React from 'react';
import { KromaqLogo } from './KromaqLogo';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#04060a] text-slate-400 text-xs border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <KromaqLogo size="md" showTagline={true} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mt-3">
              KROMAQ Agency is a digital growth partner for local and B2B businesses—connecting conversion web design, Meta Ads, short-form video production, and local SEO into one predictable client acquisition system.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-emerald-400 font-medium">
                Booking free 20-min strategy audits on Google Meet
              </span>
            </div>
            <div className="text-[11px] text-slate-500 pt-1">
              Leadership: <span className="text-slate-300 font-semibold">Iulian Chirila</span> — Founder &amp; Creative Director
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Agency
            </div>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Services</a></li>
              <li><a href="#how-we-work" className="hover:text-cyan-400 transition-colors">How We Work</a></li>
              <li><a href="#work" className="hover:text-cyan-400 transition-colors">Results</a></li>
              <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Core Services
            </div>
            <ul className="space-y-2">
              <li><span className="text-slate-300">Web Design &amp; Landing Pages</span></li>
              <li><span className="text-slate-300">Meta Ads Lead Gen</span></li>
              <li><span className="text-slate-300">Short-Form Video (Reels / TikTok)</span></li>
              <li><span className="text-slate-300">Social Media &amp; Local SEO</span></li>
            </ul>
          </div>

          {/* Direct Contact & Booking Callout */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Partner With Us
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Let&apos;s look at where leads are slipping away today and map your growth system.
            </p>
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white font-medium text-xs transition-all border border-slate-700 cursor-pointer"
            >
              <span>Book Free 20-Min Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {currentYear} KROMAQ Agency. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Book Audit</a>
            <a href="#services" className="hover:text-cyan-400 transition-colors">4-in-1 System</a>
            <a href="#how-we-work" className="hover:text-cyan-400 transition-colors">Process</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
