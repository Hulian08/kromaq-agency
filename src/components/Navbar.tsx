import React, { useState, useEffect } from 'react';
import { KromaqLogo } from './KromaqLogo';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pb-2 transition-all duration-300 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating pill navigation shell matching Verdant inspiration */}
        <nav
          className={`w-full flex items-center justify-between px-4 sm:px-6 py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-[#080d17]/85 backdrop-blur-xl border border-cyan-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.6)] shadow-cyan-950/20'
              : 'bg-[#0b101c]/70 backdrop-blur-md border border-slate-700/40 shadow-lg'
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg"
            aria-label="Kromaq Home"
          >
            <KromaqLogo size="sm" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors relative group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-full" />
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenBooking}
              className="relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 text-xs font-semibold text-slate-950 rounded-full transition-all duration-300 bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:shadow-[0_0_28px_rgba(0,242,254,0.65)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-900" />
              <span>Book Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-800/60 rounded-full border border-slate-700/60"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-6xl mx-auto pointer-events-auto">
          <div className="p-5 rounded-2xl bg-[#0a0f1b]/95 backdrop-blur-2xl border border-cyan-500/20 shadow-2xl space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/40 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 rounded-xl shadow-lg"
              >
                <span>Book 30-Min Discovery Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
