import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, PhoneCall } from 'lucide-react';

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'What We Do', href: '#services' },
    { name: 'Featured Work', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-blue-100/80 py-3 shadow-[0_10px_30px_rgba(0,119,182,0.08)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-[#0077B6] via-[#00B4D8] to-[#1E6091] group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(0,119,182,0.25)]">
              <div className="w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden bg-white">
                <img
                  src="/assets/logos/main logo.png"
                  alt="FourDouble Solutions Logo"
                  className="w-8 h-8 object-contain transition-transform duration-300 group-hover:rotate-6"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0A192F] group-hover:text-[#0077B6] transition-colors">
                FourDouble <span className="text-[#0077B6]">Solutions</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500 group-hover:text-blue-700 transition-colors">
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
                className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0077B6] hover:bg-blue-50/80 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right CTA Button & Quick WhatsApp Icon */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/919562896069"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 hover:bg-emerald-500/20 hover:scale-105 transition-all duration-300"
              title="Quick WhatsApp Chat"
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenQuote}
              className="relative group overflow-hidden rounded-full p-[1px] font-semibold text-sm focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0077B6] to-[#00B4D8] rounded-full group-hover:opacity-100 opacity-90 transition-opacity duration-300"></span>
              <span className="relative px-5 py-2.5 rounded-full bg-white text-[#0A192F] group-hover:bg-opacity-95 flex items-center gap-2 transition-all duration-300">
                <Sparkles className="w-4 h-4 text-[#0077B6] animate-pulse" />
                <span className="font-bold">Get a Quote</span>
                <ArrowUpRight className="w-4 h-4 text-[#0077B6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="text-xs px-3.5 py-1.5 rounded-full bg-[#0077B6]/15 text-[#0077B6] border border-[#0077B6]/30 font-bold"
            >
              Quote
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-800 hover:text-black bg-white border border-slate-300 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 px-4 rounded-2xl bg-white/98 backdrop-blur-2xl border border-slate-200 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-semibold text-slate-800 hover:text-[#0077B6] hover:bg-blue-50 rounded-xl transition-all"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-2 border-t border-slate-200 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0A192F] via-[#0077B6] to-[#00B4D8] font-bold text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,119,182,0.3)]"
              >
                <Sparkles className="w-5 h-5" />
                <span>Get Instant Quote</span>
              </button>

              <a
                href="https://wa.me/919562896069"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-500/15 text-emerald-700 font-bold border border-emerald-500/30 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 9562896069)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

