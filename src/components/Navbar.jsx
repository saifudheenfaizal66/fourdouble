import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, PhoneCall, Home, Layers, Briefcase, HelpCircle, User, MessageSquare, Send } from 'lucide-react';

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-blue-100/80 py-2.5 sm:py-3 shadow-[0_10px_30px_rgba(0,119,182,0.08)]'
          : 'bg-transparent py-3.5 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Brand Logo & Name */}
          <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-[#0077B6] via-[#00B4D8] to-[#1E6091] group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(0,119,182,0.25)] shrink-0">
              <div className="w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden bg-white">
                <img
                  src="/assets/logos/main logo.png"
                  alt="FourDouble Solutions Logo"
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform duration-300 group-hover:rotate-6"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-[#0A192F] group-hover:text-[#0077B6] transition-colors leading-tight">
                FourDouble <span className="text-[#0077B6]">Solutions</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold text-slate-500 group-hover:text-blue-700 transition-colors">
                Digital & Tech Agency
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-slate-100 shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 lg:px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0077B6] hover:bg-blue-50/80 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right CTA Button & Quick WhatsApp Icon (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/919562896069"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 hover:bg-emerald-500/20 hover:scale-105 transition-all duration-300 touch-active"
              title="Quick WhatsApp Chat"
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenQuote}
              className="relative group overflow-hidden rounded-full p-[1px] font-semibold text-sm focus:outline-none touch-active"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0077B6] to-[#00B4D8] rounded-full group-hover:opacity-100 opacity-90 transition-opacity duration-300"></span>
              <span className="relative px-5 py-2.5 rounded-full bg-white text-[#0A192F] group-hover:bg-opacity-95 flex items-center gap-2 transition-all duration-300">
                <Sparkles className="w-4 h-4 text-[#0077B6] animate-pulse" />
                <span className="font-bold">Get a Quote</span>
                <ArrowUpRight className="w-4 h-4 text-[#0077B6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Actions: Quote Pill & Menu Toggle */}
          <div className="md:hidden flex items-center gap-1.5 xs:gap-2">
            <button
              onClick={onOpenQuote}
              className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white font-bold shadow-sm shadow-[#0077B6]/30 flex items-center gap-1.5 touch-active active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>Quote</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-800 hover:text-black bg-white/90 border border-slate-200/90 focus:outline-none touch-active active:scale-95 shadow-xs"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen / Drawer Overlay Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[56px] sm:top-[60px] bottom-0 bg-slate-900/60 backdrop-blur-md z-50 flex flex-col justify-between p-3.5 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white/98 backdrop-blur-2xl rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xl space-y-4 max-h-[calc(100vh-85px)] overflow-y-auto">
              
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
              className="py-2.5 text-center text-xs text-white/80 font-medium cursor-pointer"
            >
              Tap anywhere outside to close
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
