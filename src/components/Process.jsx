import React from 'react';
import { Search, Palette, Code, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Process({ onOpenQuote }) {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Strategy',
      desc: 'Deep-dive into your business goals, target audience analysis, tech stack selection, and strategic roadmap.',
      icon: Search,
      badge: 'Step 1',
      color: 'bg-blue-500/10 text-[#0077B6] border-blue-200',
    },
    {
      num: '02',
      title: 'Design & Prototyping',
      desc: 'Crafting interactive Figma wireframes, brand design systems, visual assets, and high-fidelity UI/UX prototypes.',
      icon: Palette,
      badge: 'Step 2',
      color: 'bg-purple-500/10 text-purple-600 border-purple-200',
    },
    {
      num: '03',
      title: 'Agile Development',
      desc: 'Clean production-grade code, fast APIs, database optimization, GST/POS logic, and multi-device QA testing.',
      icon: Code,
      badge: 'Step 3',
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    },
    {
      num: '04',
      title: 'Launch & Continuous Scale',
      desc: 'Seamless cloud deployment, performance tuning, SEO indexing, social campaign launch & 24/7 client support.',
      icon: Rocket,
      badge: 'Step 4',
      color: 'bg-amber-500/10 text-amber-600 border-amber-200',
    },
  ];

  return (
    <section id="process" className="py-24 relative overflow-hidden bg-[#F8FAFC]">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#0077B6]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Figma Header Style: "How We Work" */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0077B6] border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Our Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 text-[#0A192F]">
            How We <span className="text-gradient-electric">Work</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            A structured, transparent 4-step execution framework to take your project from concept to launch with speed and precision.
          </p>
        </div>

        {/* 4-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-300 group-hover:text-[#0077B6] transition-colors">
                      {step.num}
                    </span>
                    <div className={`p-3 rounded-2xl border ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-[#0077B6] mb-2">
                    {step.badge}
                  </span>

                  <h3 className="text-xl font-extrabold text-[#0A192F] mb-3 group-hover:text-[#0077B6] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Milestone Verified
                  </span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-300 hidden lg:block group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </div>
            );
          })}

        </div>

        {/* Process CTA Footer */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#0A192F] via-[#0077B6] to-[#00B4D8] text-white font-bold text-sm shadow-[0_10px_30px_rgba(0,119,182,0.3)] hover:shadow-xl hover:scale-105 transition-all"
          >
            <span>Start Your Project With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
