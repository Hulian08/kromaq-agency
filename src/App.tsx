import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesBento } from './components/ServicesBento';
import { WorkAndResults } from './components/WorkAndResults';
import { PricingTiers } from './components/PricingTiers';
import { Testimonials } from './components/Testimonials';
import { ContactAndBooking } from './components/ContactAndBooking';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FounderLeadsDashboard } from './components/FounderLeadsDashboard';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeTier, setActiveTier] = useState<string>('');
  const [activeBudget, setActiveBudget] = useState<number | undefined>(undefined);

  // Check secret URL: /dashboard or #/dashboard
  const isDashboardRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname;
    const hash = window.location.hash;
    return path === '/dashboard' || path.startsWith('/dashboard/') || hash === '#/dashboard';
  };

  // Default to true so user sees the dashboard directly in AI Studio preview as requested
  const [isLeadsOpen, setIsLeadsOpen] = useState<boolean>(true);

  useEffect(() => {
    const handleLocationChange = () => {
      if (isDashboardRoute()) {
        setIsLeadsOpen(true);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Founder keyboard shortcut: Ctrl+Shift+D or Cmd+Shift+D to toggle dashboard
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsLeadsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseDashboard = () => {
    setIsLeadsOpen(false);
    if (typeof window !== 'undefined' && window.location.hash === '#/dashboard') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleOpenBooking = (tierName: string = '', budget?: number) => {
    setActiveTier(tierName);
    setActiveBudget(budget);
    setIsBookingOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTierFromPricing = (tierName: string) => {
    setActiveTier(tierName);
    handleScrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-white">
      {/* Completely public navigation without any visible admin or leads buttons */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreWork={() => handleScrollToSection('work')}
        />

        {/* Services Bento Grid */}
        <ServicesBento
          onSelectService={(service) => {
            setActiveTier(service);
            handleScrollToSection('contact');
          }}
        />

        {/* Verified Case Studies */}
        <WorkAndResults onBookNow={() => handleOpenBooking('Custom Case Study Strategy')} />

        {/* Pricing Packages */}
        <PricingTiers onSelectTier={handleSelectTierFromPricing} />

        {/* Testimonials */}
        <Testimonials />

        {/* Interactive Contact & Discovery Booking */}
        <ContactAndBooking initialTier={activeTier} initialBudget={activeBudget} />

        {/* FAQ */}
        <FAQ />
      </main>

      {/* Clean Public Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Global Booking Modal for Visitors */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedTier={activeTier}
        suggestedBudget={activeBudget}
      />

      {/* Founder Portal / Agency Dashboard: Opens by default in preview */}
      <FounderLeadsDashboard
        isOpen={isLeadsOpen}
        onClose={handleCloseDashboard}
        onNavigateToSection={handleScrollToSection}
      />

      {/* Floating Studio Preview Switcher - Always available in preview so user never gets locked out */}
      <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 p-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-2xl shadow-cyan-500/20 text-xs text-slate-300">
        <button
          onClick={() => setIsLeadsOpen(false)}
          className={`px-3 py-1.5 rounded-full font-medium transition-all ${
            !isLeadsOpen
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Switch to Live Public Website"
        >
          🌐 Site Public
        </button>
        <button
          onClick={() => setIsLeadsOpen(true)}
          className={`px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 transition-all ${
            isLeadsOpen
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Open Founder Dashboard"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          ⚡ Dashboard Fondator
        </button>
      </div>
    </div>
  );
}
