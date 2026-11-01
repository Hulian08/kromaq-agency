import React from 'react';
import { KromaqLogo } from './KromaqLogo';
import { ArrowUpRight, Sparkles, Shield, Heart } from 'lucide-react';

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
              KROMAQ is a next-generation social media & performance agency combining cinema-grade kinetic motion, proprietary AI trend telemetry, and aggressive paid media scaling.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-emerald-400 font-medium">
                All AI trend pipelines & studio render nodes operational
              </span>
            </div>
            <div className="text-[11px] text-slate-500 pt-1">
              Leadership: <span className="text-slate-300 font-semibold">Iulian Chirila</span> — Founder & Creative Director
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Agency
            </div>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Services</a></li>
              <li><a href="#work" className="hover:text-cyan-400 transition-colors">Case Studies</a></li>
              <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing & Tiers</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Platform Expertise */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Platforms
            </div>
            <ul className="space-y-2">
              <li><span className="text-slate-300">Instagram Reels</span></li>
              <li><span className="text-slate-300">TikTok & TikTok Shop</span></li>
              <li><span className="text-slate-300">YouTube Shorts</span></li>
              <li><span className="text-slate-300">LinkedIn Executive</span></li>
              <li><span className="text-slate-300">Meta Paid Media</span></li>
            </ul>
          </div>

          {/* Direct Contact & Booking Callout */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Partner With Us
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accepting 2 new brand partners for the upcoming scaling cycle.
            </p>
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white font-medium text-xs transition-all border border-slate-700 cursor-pointer"
            >
              <span>Schedule 30-Min Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {currentYear} KROMAQ Agency. All rights reserved. Registered trademark.
          </div>
          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">SLA Framework</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
