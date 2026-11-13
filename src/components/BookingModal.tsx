import React, { useState } from 'react';
import { X, CheckCircle2, User, Mail, Building, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { KromaqIcon } from './KromaqLogo';
import { saveNewLead } from '../utils/leadStore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: string;
  suggestedBudget?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedTier = '',
  suggestedBudget,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [brandName, setBrandName] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow, 11:00 AM');
  const [goal, setGoal] = useState('More clients via Meta Ads');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !brandName.trim()) {
      setError('Please fill in your name, email, and business name.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    saveNewLead({
      fullName,
      email,
      brandName,
      budget: suggestedBudget ? `€${suggestedBudget.toLocaleString()}/mo` : '20-Min Strategy Audit',
      selectedSlot,
      message: goal,
      tier: selectedTier,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#00F2FE', '#3B82F6', '#8B5CF6'],
        });
      } catch (err) {
        // fallback
      }
    }, 600);
  };

  const handleClose = () => {
    setIsDone(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#080d17] border border-cyan-500/40 p-6 sm:p-8 rounded-3xl shadow-[0_0_50px_rgba(0,242,254,0.2)] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {isDone ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center border border-cyan-400/40">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white">Google Meet Reserved!</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              Thank you, <span className="text-white font-semibold">{fullName}</span>. We reserved your 20-minute strategy call for{' '}
              <span className="text-cyan-300 font-semibold">{selectedSlot}</span>. Your Meet link will be sent to{' '}
              <span className="text-white font-mono">{email}</span>.
            </p>
            <div className="p-3 rounded-xl bg-[#05080e] border border-slate-800 text-xs text-slate-400 text-left space-y-1">
              <div>Business: <strong className="text-white">{brandName}</strong></div>
              <div>Primary Goal: <strong className="text-cyan-300">{goal}</strong></div>
              {selectedTier && <div>Selected Plan: <strong className="text-cyan-400">{selectedTier}</strong></div>}
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <KromaqIcon size={24} />
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Strategy Session (20 Min)
              </span>
            </div>
            <h3 className="text-2xl font-bold font-display text-white mb-1">
              Schedule a Google Meet
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Pick a preferred slot and share your details so we can audit your current presence and send the Google Meet link.
            </p>

            {selectedTier && (
              <div className="mb-4 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 flex justify-between items-center">
                <span>Selected Plan: <strong>{selectedTier}</strong></span>
                {suggestedBudget && <span className="font-mono text-slate-300">€{suggestedBudget.toLocaleString()}/mo</span>}
              </div>
            )}

            {error && (
              <div className="mb-4 p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Andrei Popescu"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#060910] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Work Email <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="you@business.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#060910] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Business / Website or Instagram <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="yourbusiness.com / @handle"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#060910] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Primary Objective
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#060910] border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="More clients via Meta Ads">More clients via Meta Ads</option>
                  <option value="New Website / Conversion Landing Page">New Website / Conversion Landing Page</option>
                  <option value="Short-Form Video (Reels / TikTok) & Social Media">Short-Form Video (Reels / TikTok) &amp; Social Media</option>
                  <option value="Complete 4-in-1 System (Web + Ads + Video + Local SEO)">Complete 4-in-1 System (Web + Ads + Video + Local SEO)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#060910] border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="Tomorrow, 11:00 AM">Tomorrow, 11:00 AM</option>
                  <option value="Tomorrow, 2:00 PM">Tomorrow, 2:00 PM</option>
                  <option value="Thursday, 10:30 AM">Thursday, 10:30 AM</option>
                  <option value="Thursday, 4:00 PM">Thursday, 4:00 PM</option>
                  <option value="Friday, 1:00 PM">Friday, 1:00 PM</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-300 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-[0_0_20px_rgba(0,242,254,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Confirming...' : 'Confirm Strategy Call'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
