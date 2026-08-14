import React from 'react';
import { Rocket, Store, UserCheck, ShieldCheck, DollarSign, Clock, Award, CheckCircle2, TrendingUp, Users, Sparkles, Building2 } from 'lucide-react';

export default function About({ onOpenQuote }) {
  const stats = [
    { value: '8+', label: 'Projects Delivered', desc: 'Web platforms, apps & brand suites' },
    { value: '12+', label: 'Happy Clients / Partners', desc: 'Startups & local business leaders' },
    { value: '99%', label: 'Client Satisfaction', desc: 'On-time delivery & quality support' },
  ];

  const pillars = [
    {
      icon: Rocket,
      title: 'Startups & Tech Founders',
      desc: 'Rapid MVP development, scalable web platforms, and modern brand identities engineered to win investors and early adopters.',
      badge: 'Scalable MVPs',
      gradient: 'from-blue-500/15 to-cyan-500/15',
    },
    {
      icon: Store,
      title: 'Local Retail & Enterprise',
      desc: 'Custom offline/cloud POS billing software, GST export reports, targeted local Meta/Google ads, and shop flex banner designs.',
      badge: 'Growth Engine',
      gradient: 'from-emerald-500/15 to-teal-500/15',
    },
    {
      icon: UserCheck,
      title: 'Creators & Professionals',
      desc: 'AI ATS-friendly CV generator, high-impact personal portfolio web apps, short-form video reels, and digital brand collateral.',
      badge: 'Personal Brand',
      gradient: 'from-purple-500/15 to-indigo-500/15',
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#F8FAFC]">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0077B6]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Figma Header: "Transforming Brands, Elevating Standards" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0077B6] border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About FourDouble Solutions</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6 text-[#0A192F]">
              Transforming Brands, <span className="text-gradient-electric">Elevating Standards</span>
            </h2>
            
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 mb-8 font-normal">
              We are a high-performing digital agency bridging the gap between overpriced software firms and solo freelancers. By combining deep engineering expertise, aesthetic UI design, and custom media production, we deliver enterprise-quality results at rates tailored for ambitious businesses.
            </p>

            {/* Stat Counters Grid (3-column layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#0077B6] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs font-bold text-[#0A192F] mt-1">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    {stat.desc}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Visual Box */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-white border border-blue-100 shadow-[0_20px_50px_-10px_rgba(0,119,182,0.12)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <Building2 className="w-6 h-6 text-[#0077B6]" />
                <div>
                  <h4 className="text-sm font-bold text-[#0A192F]">Agency-Grade Engineering</h4>
                  <p className="text-xs text-slate-500">FourDouble Solutions Studio</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-slate-800">100% On-Time Milestones</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-600 font-bold">Verified</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-[#0077B6]" />
                    <span className="text-xs font-bold text-slate-800">Direct Senior Developers</span>
                  </div>
                  <span className="text-xs font-mono text-blue-600 font-bold">No Middlemen</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-800">Smart Freelance Pricing</span>
                  </div>
                  <span className="text-xs font-mono text-slate-600 font-bold">Transparent</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between hover:-translate-y-1"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.gradient} rounded-full blur-2xl pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl border bg-blue-50/80 border-blue-100 text-[#0077B6]">
                      <Icon className="w-6 h-6 text-[#0077B6]" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full border bg-slate-100 text-slate-700 border-slate-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold mb-3 text-[#0A192F]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed mb-6 text-slate-600">
                    {pillar.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold pt-4 border-t text-[#0077B6] border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Tailored Growth Strategy Included</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

