import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, PhoneCall, Home, Layers, Briefcase, HelpCircle, User, MessageSquare } from 'lucide-react';

export default function Navbar({ onOpenQuote }) {
  const [heroComplete, setHeroComplete] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('home');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // The hero container pins for the duration of the 240-frame sequence.
        // Once rect.bottom <= window.innerHeight + 30, the sequence has finished scrubbing.
        const isComplete = rect.bottom <= window.innerHeight + 30;
        setHeroComplete(isComplete);
      } else {
        setHeroComplete(window.scrollY > 600);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'What We Do', href: '#services', icon: Layers },
    { name: 'Featured Work', href: '#portfolio', icon: Briefcase },
    { name: 'Process', href: '#process', icon: HelpCircle },
    { name: 'About', href: '#about', icon: User },
    { name: 'Contact', href: '#contact', icon: MessageSquare },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none py-3 sm:py-4 transition-all duration-500 bg-transparent border-none shadow-none">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* 1. Left Island: Glassmorphism Logo Pod with White "FourDouble" Text */}
          <a
            href="#home"
            className={`pointer-events-auto flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 group shrink-0 ${
              heroComplete
                ? 'bg-[#0A192F]/85 hover:bg-[#0A192F]/95 backdrop-blur-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,119,182,0.18)]'
                : 'bg-transparent border border-transparent shadow-none hover:bg-white/10 hover:backdrop-blur-md'
            }`}
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-[#0077B6] via-[#00B4D8] to-[#1E6091] group-hover:scale-105 transition-transform duration-300 shadow-sm shrink-0">
              <div className="w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden bg-white/95 backdrop-blur-sm">
                <img
                  src="/assets/logos/main logo.png"
                  alt="FourDouble Solutions Logo"
                  className="w-6 h-6 sm:w-7 sm:h-7 object-contain transition-transform duration-300 group-hover:rotate-6"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm sm:text-base lg:text-lg tracking-tight text-white leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                FourDouble <span className="text-[#00B4D8] font-black group-hover:text-cyan-300 transition-colors">Solutions</span>
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] tracking-widest uppercase font-bold text-slate-300 group-hover:text-white transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Digital & Tech Agency
              </span>
            </div>
          </a>

          {/* 2. Center Island: Desktop Navigation Links (Glassmorphic Light Theme when sequence complete, transparent during sequence) */}
          <nav
            className={`pointer-events-auto hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full transition-all duration-300 ${
              heroComplete
                ? 'bg-white/80 hover:bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(0,119,182,0.12)]'
                : 'bg-transparent border border-transparent shadow-none'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 lg:px-4 py-1.5 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 ${
                  heroComplete
                    ? 'text-slate-800 hover:text-[#0077B6] hover:bg-blue-50/80'
                    : 'text-white/90 hover:text-white hover:bg-white/15 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* 3. Right Island: Desktop CTA "Get a Quote" + Quick WhatsApp (Glassmorphic Light Theme when sequence complete, transparent during sequence) */}
          <div
            className={`pointer-events-auto hidden md:flex items-center gap-2 p-1 sm:p-1.5 rounded-full transition-all duration-300 ${
              heroComplete
                ? 'bg-white/80 hover:bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(0,119,182,0.12)]'
                : 'bg-transparent border border-transparent shadow-none'
            }`}
          >
            <a
              href="https://wa.me/919562896069"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 backdrop-blur-md shadow-2xs touch-active hover:scale-105 ${
                heroComplete
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/80 hover:bg-emerald-100'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 hover:bg-emerald-500/30'
              }`}
              title="Quick WhatsApp Chat"
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenQuote}
              className="relative group overflow-hidden rounded-full p-[1px] font-semibold text-sm focus:outline-none touch-active shadow-[0_4px_15px_rgba(0,119,182,0.25)] hover:shadow-[0_6px_20px_rgba(0,119,182,0.35)] transition-all hover:scale-[1.02]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0077B6] to-[#00B4D8] rounded-full group-hover:opacity-100 opacity-90 transition-opacity duration-300"></span>
              <span
                className={`relative px-4.5 py-1.5 sm:px-5 sm:py-2 rounded-full flex items-center gap-2 transition-all duration-300 backdrop-blur-md ${
                  heroComplete
                    ? 'bg-white/95 group-hover:bg-white text-[#0A192F]'
                    : 'bg-slate-950/85 group-hover:bg-slate-900 text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#0077B6] animate-pulse" />
                <span className="font-bold text-xs sm:text-sm">Get a Quote</span>
                <ArrowUpRight className="w-4 h-4 text-[#0077B6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* 4. Mobile Island: Quote Pill & Menu Toggle */}
          <div
            className={`pointer-events-auto md:hidden flex items-center gap-1.5 xs:gap-2 px-2 py-1 rounded-full transition-all duration-300 ${
              heroComplete
                ? 'bg-white/80 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(0,119,182,0.12)]'
                : 'bg-transparent border border-transparent shadow-none'
            }`}
          >
            <button
              onClick={onOpenQuote}
              className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white font-bold shadow-sm shadow-[#0077B6]/30 flex items-center gap-1.5 touch-active active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>Quote</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 sm:p-2 rounded-xl focus:outline-none touch-active active:scale-95 shadow-xs transition-all ${
                heroComplete
                  ? 'text-slate-800 hover:text-black bg-blue-50/80 backdrop-blur-md border border-blue-100'
                  : 'text-white hover:text-cyan-300 bg-white/10 backdrop-blur-md border border-white/20'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className={`w-5 h-5 ${heroComplete ? 'text-slate-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-5 h-5 ${heroComplete ? 'text-slate-900' : 'text-white'}`} />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Fullscreen / Drawer Overlay Menu */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden fixed inset-x-0 top-[56px] sm:top-[60px] bottom-0 bg-slate-900/40 backdrop-blur-md z-50 flex flex-col justify-between p-3.5 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/80 p-4 sm:p-5 shadow-2xl space-y-4 max-h-[calc(100vh-85px)] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0077B6]">Navigation</span>
                <span className="text-[11px] font-semibold text-slate-400">#LetsGrowTogether</span>
              </div>

              {/* Navigation Links with large tap areas */}
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3.5 px-4 py-3 text-sm font-bold text-slate-800 hover:text-[#0077B6] hover:bg-blue-50/80 rounded-2xl transition-all active:bg-blue-100/70"
                    >
                      <div className="p-2 rounded-xl bg-blue-50 text-[#0077B6]">
                        <LinkIcon className="w-4 h-4" />
                      </div>
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-4 h-4 ml-auto text-slate-400" />
                    </a>
                  );
                })}
              </div>

              {/* Drawer Action Buttons */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0A192F] via-[#0077B6] to-[#00B4D8] font-bold text-sm text-white flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(0,119,182,0.35)] active:scale-[0.98] transition-transform"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Get Instant Quote</span>
                </button>

                <a
                  href="https://wa.me/919562896069"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-2xl bg-emerald-500/10 text-emerald-700 font-bold text-sm border border-emerald-500/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Chat on WhatsApp (+91 9562896069)</span>
                </a>
              </div>

            </div>

            {/* Tap outside dismiss prompt */}
            <div 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-center text-xs text-white/90 font-medium cursor-pointer"
            >
              Tap anywhere outside to close
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
