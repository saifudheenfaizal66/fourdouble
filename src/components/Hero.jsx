import React from 'react';
import { MessageSquare, ArrowDown, Sparkles, Code2, Palette, TrendingUp, ShieldCheck, Zap, Laptop, ArrowRight, Video } from 'lucide-react';

export default function Hero({ onOpenQuote }) {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-24 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9]">
      
      {/* Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#0077B6]/12 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-[#00B4D8]/10 blur-[130px] pointer-events-none" />
      
      {/* Background Subtle Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Primary CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-6 text-[#0077B6] bg-blue-50/90 border border-blue-200/90 shadow-sm animate-pulse-slow">
              <Sparkles className="w-4 h-4 text-[#0077B6]" />
              <span className="text-[#0A192F] font-bold">#LetsGrowTogether</span>
              <span className="h-3 w-[1px] bg-blue-300" />
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#0077B6]/15 text-[#0077B6] font-extrabold uppercase tracking-wider">
                Digital & Tech Agency
              </span>
            </div>

            {/* Headline matching Figma style */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 text-[#0A192F]">
              Transforming <span className="text-gradient-electric">Digital Brands</span> & Modern Enterprises
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mb-8 text-slate-600">
              We transform visions into digital realities. We're more than just a digital agency — engineering high-performance web apps, cross-platform mobile solutions, brand strategy, and custom AI video production at smart freelance rates.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#0A192F] via-[#0077B6] to-[#00B4D8] text-white font-bold text-base flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,119,182,0.35)] hover:shadow-[0_15px_40px_rgba(0,119,182,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
              >
                <Sparkles className="w-5 h-5 text-cyan-200 animate-spin-slow" />
                <span>Get Instant Quote</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/919562896069"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base border flex items-center justify-center gap-2.5 transition-all duration-300 bg-white text-[#0A192F] border-slate-300 hover:border-[#0077B6] hover:bg-blue-50/60 shadow-md group"
              >
                <MessageSquare className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Quick Feature Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#0077B6] border border-blue-100">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#0A192F]">Ultra Fast</p>
                  <p className="text-[11px] text-slate-500">Quick Delivery</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#0A192F]">Agency Quality</p>
                  <p className="text-[11px] text-slate-500">Freelance Rates</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Code2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#0A192F]">Custom Tech</p>
                  <p className="text-[11px] text-slate-500">Modern Stacks</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                  <Palette className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#0A192F]">UI/UX Perfection</p>
                  <p className="text-[11px] text-slate-500">Stunning Visuals</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Figma-style Laptop Mockup & Floating Glass Card */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0077B6] to-[#00B4D8] opacity-20 blur-3xl rounded-full" />

            {/* Main Showcase Laptop Frame */}
            <div className="relative w-full max-w-lg p-6 rounded-3xl border bg-white/95 backdrop-blur-xl border-blue-100 shadow-[0_20px_60px_-15px_rgba(0,119,182,0.2)]">
              
              {/* Laptop Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-400 truncate max-w-[140px] sm:max-w-none">fourdoublesolutions.com</span>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50/90 text-[#0077B6] border border-blue-200/80 flex items-center gap-1.5 shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Live Agency Platform</span>
                </span>
              </div>

              {/* Central Visual: Lighter Minimal Blue Gradient Theme */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#EFF6FF] via-[#E0F2FE] to-[#DBEAFE] border border-blue-200/60 overflow-hidden shadow-sm flex flex-col items-center justify-center text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,119,182,0.12)_0,transparent_75%)] pointer-events-none" />

                <div className="relative z-10 my-2">
                  <img
                    src="/assets/logos/3D logo.png"
                    alt="FourDouble Solutions 3D Logo"
                    className="w-36 h-36 sm:w-44 sm:h-44 object-contain filter drop-shadow-[0_12px_24px_rgba(0,119,182,0.22)] hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="relative z-10 mt-3">
                  <p className="text-sm sm:text-base font-extrabold tracking-wider uppercase text-[#0A192F]">
                    FourDouble Solutions
                  </p>
                  <p className="text-xs sm:text-sm text-[#0077B6] mt-1 font-semibold">
                    Smart Digital Agency & Tech Partner
                  </p>
                </div>
              </div>

              {/* Interactive Pills */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="p-2.5 rounded-xl bg-white border border-blue-100/90 shadow-xs flex items-center gap-2 hover:border-blue-300 transition-all">
                  <Laptop className="w-4 h-4 text-[#0077B6] shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">Web & Apps</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-blue-100/90 shadow-xs flex items-center gap-2 hover:border-blue-300 transition-all">
                  <Video className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">AI Video Gen</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-blue-100/90 shadow-xs flex items-center gap-2 hover:border-blue-300 transition-all">
                  <Palette className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">Branding & UI</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-blue-100/90 shadow-xs flex items-center gap-2 hover:border-blue-300 transition-all">
                  <Code2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">POS Billing</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-blue-100/90 shadow-xs flex items-center gap-2 sm:col-span-2 hover:border-blue-300 transition-all">
                  <TrendingUp className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">ATS Resume AI</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

