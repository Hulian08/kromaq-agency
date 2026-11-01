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

  // Check if current URL is the secret dashboard route (/dashboard or #/dashboard)
  const isDashboardRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (
      path === '/dashboard' ||
      path.endsWith('/dashboard') ||
      hash === '#/dashboard' ||
      hash === '#dashboard' ||
      hash.startsWith('#/dashboard')
    );
  };

  // Direct to public site by default when entering, unless /dashboard is explicitly accessed
  const [isLeadsOpen, setIsLeadsOpen] = useState<boolean>(() => isDashboardRoute());

  useEffect(() => {
    const handleLocationChange = () => {
      setIsLeadsOpen(isDashboardRoute());
    };

    // Check immediately on mount in case URL was updated
    if (isDashboardRoute()) {
      setIsLeadsOpen(true);
    }

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Founder keyboard shortcut (Ctrl+Shift+D or Cmd+Shift+D) as an extra secret shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsLeadsOpen((prev) => {
          const next = !prev;
          if (next) {
            window.history.pushState(null, '', '#/dashboard');
          } else {
            window.history.pushState(null, '', window.location.pathname || '/');
          }
          return next;
        });
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
    if (typeof window !== 'undefined') {
      if (window.location.hash.includes('dashboard')) {
        window.history.replaceState(null, '', window.location.pathname || '/');
      } else if (window.location.pathname.includes('/dashboard')) {
        window.history.replaceState(null, '', '/');
      }
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

      {/* Founder Portal / Agency Dashboard: Only opened when accessing /dashboard */}
      <FounderLeadsDashboard
        isOpen={isLeadsOpen}
        onClose={handleCloseDashboard}
        onNavigateToSection={handleScrollToSection}
      />
    </div>
  );
}
