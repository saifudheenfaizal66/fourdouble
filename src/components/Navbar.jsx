import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, PhoneCall, Home, Layers, Briefcase, HelpCircle, User, MessageSquare } from 'lucide-react';

export default function Navbar({ onOpenQuote }) {
  const [heroComplete, setHeroComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home', icon: Home },
    { name: 'Services', href: '#services', id: 'services', icon: Layers },
    { name: 'Portfolio', href: '#portfolio', id: 'portfolio', icon: Briefcase },
    { name: 'About', href: '#about', id: 'about', icon: User },
    { name: 'Process', href: '#process', id: 'process', icon: HelpCircle },
    { name: 'Contact', href: '#contact', id: 'contact', icon: MessageSquare },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 20);

          const heroEl = document.getElementById('home');
          if (heroEl) {
            const isComplete = scrollY >= heroEl.offsetHeight - 140;
            setHeroComplete(isComplete);
          } else {
            setHeroComplete(scrollY > 600);
          }

          // Active Section Spy
          const sections = ['home', 'services', 'portfolio', 'about', 'process', 'contact'];
          const scrollPosition = scrollY + 220;

          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el && scrollPosition >= el.offsetTop) {
              setActiveSection(sections[i]);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
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

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none py-2.5 sm:py-3.5 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        
        {/* Floating Luminous Glass Capsule Bar */}
        <div
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-2 rounded-full transition-all duration-500 ${
            heroComplete
              ? 'bg-white/92 backdrop-blur-2xl border border-slate-200/90 shadow-[0_10px_35px_-5px_rgba(0,119,182,0.12),0_0_0_1px_rgba(255,255,255,0.9)_inset]'
              : 'bg-white/85 hover:bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_10px_35px_rgba(0,0,0,0.18),0_0_0_1px_rgba(255,255,255,0.85)_inset]'
          }`}
        >
          
          {/* 1. Brand Logo & Title Pod */}
          <a
            href="#home"
            className="flex items-center gap-2.5 sm:gap-3 py-0.5 group shrink-0 select-none focus:outline-none"
            aria-label="FourDouble Solutions - Home"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-[#0077B6] via-[#00B4D8] to-[#1E6091] group-hover:scale-105 transition-transform duration-300 shadow-sm shrink-0">
              <div className="w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden bg-white">
                <img
                  src="/assets/logos/main logo.png"
                  alt="FourDouble Solutions Logo"
                  className="w-6 h-6 sm:w-6.5 sm:h-6.5 object-contain transition-transform duration-300 group-hover:rotate-6"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xs xs:text-sm sm:text-base tracking-tight leading-tight text-[#0A192F] transition-colors duration-300">
                FourDouble <span className="text-[#0077B6] group-hover:text-[#00B4D8] transition-colors">Solutions</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-widest uppercase font-bold text-slate-500 transition-colors duration-300">
                Digital & Tech Agency
              </span>
            </div>
          </a>

          {/* 2. Desktop & Tablet Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-0.5 lg:gap-1 px-1 py-0.5"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-bold rounded-full transition-all duration-200 relative group/nav ${
                    isActive
                      ? 'text-[#0077B6] bg-blue-50/90 font-extrabold shadow-xs'
                      : 'text-slate-700 hover:text-[#0077B6] hover:bg-blue-50/60'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-[#0077B6]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* 3. Action Group: Desktop/Tablet Quick WhatsApp + "Get a Quote" CTA */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/919562896069"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 lg:p-2.5 rounded-full transition-all duration-300 touch-active hover:scale-105 active:scale-95 bg-emerald-50 text-emerald-600 border border-emerald-200/90 hover:bg-emerald-100 hover:border-emerald-300 shadow-2xs"
              title="Chat directly on WhatsApp"
              aria-label="Direct WhatsApp line"
            >
              <PhoneCall className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </a>

            <button
              onClick={onOpenQuote}
              className="relative group overflow-hidden rounded-full p-[1px] font-semibold text-xs lg:text-sm focus:outline-none touch-active shadow-[0_4px_16px_rgba(0,119,182,0.25)] hover:shadow-[0_6px_22px_rgba(0,119,182,0.4)] transition-all hover:scale-[1.02] active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-cyan-400 rounded-full group-hover:opacity-100 opacity-90 transition-opacity duration-300"></span>
              <span className="relative px-3.5 py-1.5 lg:px-4.5 lg:py-2 rounded-full flex items-center gap-1.5 lg:gap-2 transition-all duration-300 backdrop-blur-md bg-white/95 group-hover:bg-white text-[#0A192F]">
                <Sparkles className="w-3.5 h-3.5 text-[#0077B6] animate-pulse" />
                <span className="font-bold text-xs lg:text-sm whitespace-nowrap">Get a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#0077B6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* 4. Mobile Island Controls: Menu Toggle */}
          <div className="flex md:hidden items-center shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full focus:outline-none touch-active active:scale-95 transition-all text-slate-800 hover:text-black bg-slate-100/90 border border-slate-200"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

        </div>

        {/* 5. Mobile Fullscreen / Drawer Overlay Menu */}
        {mobileMenuOpen && (
          <div 
            className="pointer-events-auto md:hidden fixed inset-0 top-[54px] sm:top-[60px] bg-slate-950/60 backdrop-blur-xl z-50 flex flex-col justify-between p-3.5 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMobileMenuOpen(false);
            }}
          >
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/80 p-4 sm:p-5 shadow-2xl space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0077B6]">Navigation</span>
                <span className="text-[11px] font-semibold text-slate-400">#LetsGrowTogether</span>
              </div>

              {/* Navigation Links with generous tap targets */}
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link) => {
                  const LinkIcon = link.icon;
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-3.5 py-3 text-sm font-bold rounded-2xl transition-all active:scale-[0.98] ${
                        isActive
                          ? 'text-[#0077B6] bg-blue-50/90 font-extrabold border border-blue-100'
                          : 'text-slate-800 hover:text-[#0077B6] hover:bg-slate-50'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${
                        isActive ? 'bg-[#0077B6] text-white' : 'bg-blue-50 text-[#0077B6]'
                      }`}>
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
              className="py-3 text-center text-xs text-white/80 font-medium cursor-pointer"
            >
              Tap anywhere outside to close
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


