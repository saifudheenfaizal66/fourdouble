import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import SpecialProducts from './components/SpecialProducts';
import About from './components/About';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import ContactFooter from './components/ContactFooter';
import ProductDemos from './components/ProductDemos';
import QuoteEstimatorModal from './components/QuoteEstimatorModal';
import { ArrowUp, MessageSquare } from 'lucide-react';

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#0077B6] selection:text-white">
      
      {/* Animated Constellation Particle Background */}
      <ParticleBackground />

      {/* Navigation Header */}
      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenQuote={() => setIsQuoteOpen(true)} />
        <Services onOpenQuote={() => setIsQuoteOpen(true)} />
        <SpecialProducts onOpenDemo={(demoId) => setActiveDemo(demoId)} />
        <About onOpenQuote={() => setIsQuoteOpen(true)} />
        <Process onOpenQuote={() => setIsQuoteOpen(true)} />
        <Testimonials />
        <ContactFooter onOpenQuote={() => setIsQuoteOpen(true)} />
      </main>

      {/* Interactive Modals */}
      <QuoteEstimatorModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

      <ProductDemos
        activeDemo={activeDemo}
        onClose={() => setActiveDemo(null)}
      />

      {/* Floating Action Buttons: Scroll-To-Top & Floating WhatsApp */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-2.5 sm:gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-2.5 sm:p-3 rounded-full bg-white border border-blue-200 text-[#0077B6] hover:text-slate-950 hover:border-blue-400 shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 touch-active"
            title="Scroll to Top"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}

        <a
          href="https://wa.me/919562896069"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 sm:p-3.5 rounded-full bg-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group touch-active"
          title="Direct WhatsApp Chat"
          aria-label="Chat directly with FourDouble Solutions on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
        </a>
      </div>

    </div>
  );
}
