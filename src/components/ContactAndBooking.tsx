import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, Clock, CheckCircle2, ArrowRight, ShieldCheck, Mail, User, Building, Send } from 'lucide-react';
import { KromaqIcon } from './KromaqLogo';

import { saveNewLead } from '../utils/leadStore';

interface ContactAndBookingProps {
  initialTier?: string;
  initialBudget?: number;
}

export const ContactAndBooking: React.FC<ContactAndBookingProps> = ({
  initialTier = '',
  initialBudget,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [brandName, setBrandName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(
    initialBudget ? `$${initialBudget.toLocaleString()}/mo` : '$5,000 — $10,000/mo'
  );
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow, 2:00 PM EST');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const timeSlots = [
    'Tomorrow, 11:00 AM EST',
    'Tomorrow, 2:00 PM EST',
    'Thursday, 10:30 AM EST',
    'Thursday, 3:30 PM EST',
    'Friday, 1:00 PM EST',
  ];

  const budgetOptions = [
    '$3,500 — $5,000/mo',
    '$5,000 — $10,000/mo',
    '$10,000 — $25,000/mo',
    '$25,000+/mo',
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Please provide your full name.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid work email address.';
    }
    if (!brandName.trim()) errs.brandName = 'Please provide your brand or company name.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Save lead to Kromaq Lead Store
    saveNewLead({
      fullName,
      email,
      brandName,
      socialHandle,
      budget: selectedBudget,
      selectedSlot,
      message,
      tier: initialTier,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00F2FE', '#3B82F6', '#8B5CF6', '#FFFFFF'],
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-[#070b13]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Large Verdant-style Card Container ("Ready to grow?") */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-transparent shadow-2xl">
          <div className="rounded-[22px] bg-[#090d18] border border-slate-800 p-6 sm:p-12">
            
            {/* Top header of CTA card */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_25px_rgba(0,242,254,0.3)]">
                <KromaqIcon size={32} />
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mb-4">
                Ready to take <br className="hidden sm:inline" />
                <span className="italic font-light bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                  motion?
                </span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Join forward-thinking brands commanding market attention with Kromaq. Schedule your bespoke 30-minute growth roadmap audit today.
              </p>
            </div>

            {isSubmitted ? (
              /* Success View */
              <div className="max-w-xl mx-auto p-8 rounded-2xl bg-[#060910] border border-cyan-400/40 text-center space-y-5 animate-fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center border border-cyan-400/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-white">Strategy Session Confirmed!</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{fullName}</span>. We've reserved your 30-minute private strategy session with the Kromaq growth team for:
                </p>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-cyan-400" /> Date & Time:</span>
                    <span className="text-white font-semibold">{selectedSlot}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-cyan-400" /> Brand:</span>
                    <span className="text-white font-semibold">{brandName}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-cyan-400" /> Confirmation Sent To:</span>
                    <span className="text-cyan-300 font-mono">{email}</span>
                  </div>
                  {initialTier && (
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Selected Tier:</span>
                      <span className="text-emerald-400 font-semibold">{initialTier}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-400">
                  Our team is already analyzing your public social handles. You will receive an email calendar invite and direct private link shortly.
                </p>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              /* Booking / Contact Form */
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                {initialTier && (
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 flex items-center justify-between">
                    <span>Inquiring about: <strong className="text-white">{initialTier}</strong></span>
                    <span className="text-[11px] font-mono text-cyan-400">Pre-Configured</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="contact-full-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Full Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="contact-full-name"
                        type="text"
                        placeholder="e.g. Marcus Vance"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#060910] border text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                          errors.fullName ? 'border-rose-500' : 'border-slate-800'
                        }`}
                      />
                    </div>
                    {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Work Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Work Email <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="marcus@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#060910] border text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                          errors.email ? 'border-rose-500' : 'border-slate-800'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                  </div>

                  {/* Brand / Company Name */}
                  <div>
                    <label htmlFor="contact-brand" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Brand / Organization <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="contact-brand"
                        type="text"
                        placeholder="e.g. Apex Apparel"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#060910] border text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                          errors.brandName ? 'border-rose-500' : 'border-slate-800'
                        }`}
                      />
                    </div>
                    {errors.brandName && <p className="text-[11px] text-rose-400 mt-1">{errors.brandName}</p>}
                  </div>

                  {/* Primary Social Handle */}
                  <div>
                    <label htmlFor="contact-handle" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Primary Handle or Website
                    </label>
                    <input
                      id="contact-handle"
                      type="text"
                      placeholder="@apexbrand / apex.com"
                      value={socialHandle}
                      onChange={(e) => setSocialHandle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#060910] border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                {/* Monthly Budget Selector */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Estimated Monthly Marketing / Content Budget
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedBudget(opt)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          selectedBudget === opt
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                            : 'bg-[#060910] text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Session Preferred Time Slot */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Select Desired 30-Min Strategy Call Time
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Zoom / Google Meet</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {timeSlots.slice(0, 3).map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          selectedSlot === slot
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-400'
                            : 'bg-[#060910] text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message / Objectives */}
                <div>
                  <label htmlFor="contact-goals" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Current Challenges or Campaign Objectives (Optional)
                  </label>
                  <textarea
                    id="contact-goals"
                    rows={3}
                    placeholder="Tell us what you want to achieve (e.g. increase TikTok Shop ROAS, scale organic reels, founder authority)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#060910] border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-[0_0_25px_rgba(0,242,254,0.45)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Securing Strategy Slot...' : 'Lock In Your Strategy Audit'}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Strict NDA included. No spam. You will speak directly with an agency lead.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
