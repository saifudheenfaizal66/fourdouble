import React from 'react';
import { Rocket, Store, UserCheck, DollarSign, Award, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

export default function About({ onOpenQuote }) {
  const stats = [
    { value: '8+', label: 'Projects Delivered', desc: 'Web platforms & apps' },
    { value: '12+', label: 'Happy Partners', desc: 'Startups & founders' },
    { value: '99%', label: 'Satisfaction', desc: 'Quality milestones' },
  ];

  const pillars = [
    {
      icon: Rocket,
      title: 'Startups & Founders',
      desc: 'Rapid MVP development, scalable web platforms, and modern brand identities engineered to win early users and market traction.',
      badge: 'Scalable MVPs',
      gradient: 'from-blue-500/15 to-cyan-500/15',
    },
    {
      icon: Store,
      title: 'Retail & Enterprises',
      desc: 'Custom offline/cloud POS billing software, GST export reports, targeted local Meta/Google ads, and shop flex banner designs.',
      badge: 'Growth Engine',
      gradient: 'from-emerald-500/15 to-teal-500/15',
    },
    {
      icon: UserCheck,
      title: 'Creators & Pros',
      desc: 'AI ATS-friendly CV generator, high-impact personal portfolio web apps, short-form video reels, and digital brand collateral.',
      badge: 'Personal Brand',
      gradient: 'from-purple-500/15 to-indigo-500/15',
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-white">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#0077B6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Header & Studio Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-20">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0077B6] border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3.5 sm:mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About FourDouble Solutions</span>
            </div>
            
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 sm:mb-6 text-[#0A192F]">
              Transforming Brands, <span className="text-gradient-electric">Elevating Standards</span>
            </h2>
            
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 mb-6 sm:mb-8 font-normal">
              We are a high-performing digital agency bridging the gap between overpriced software firms and solo freelancers. By combining deep engineering expertise, aesthetic UI design, and custom media production, we deliver enterprise-quality results at rates tailored for ambitious businesses.
            </p>

            {/* Stat Counters Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-5 sm:pt-6 border-t border-slate-200">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8FAFC] sm:bg-transparent border sm:border-0 border-slate-200/80 shadow-2xs sm:shadow-none text-center sm:text-left">
                  <span className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#0077B6] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-[#0A192F] mt-0.5 sm:mt-1 truncate">
                    {stat.label}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 hidden xs:block truncate">
                    {stat.desc}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Visual Box */}
          <div className="lg:col-span-5 w-full">
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F8FAFC] border border-blue-100 shadow-[0_20px_50px_-10px_rgba(0,119,182,0.12)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-200">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#0077B6] border border-blue-100">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0A192F]">Agency-Grade Engineering</h4>
                  <p className="text-xs text-slate-500">FourDouble Solutions Studio</p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs sm:text-sm font-bold text-slate-800">100% On-Time Delivery</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-600 font-bold">Verified</span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <Award className="w-4 h-4 text-[#0077B6]" />
                    <span className="text-xs sm:text-sm font-bold text-slate-800">Senior Developers</span>
                  </div>
                  <span className="text-xs font-mono text-blue-600 font-bold">Direct</span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs sm:text-sm font-bold text-slate-800">Freelance Pricing</span>
                  </div>
                  <span className="text-xs font-mono text-slate-600 font-bold">Transparent</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between hover:-translate-y-1"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.gradient} rounded-full blur-2xl pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border bg-white border-blue-100 text-[#0077B6]">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0077B6]" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border bg-white text-slate-700 border-slate-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold mb-2 sm:mb-3 text-[#0A192F]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 text-slate-600">
                    {pillar.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold pt-4 border-t text-[#0077B6] border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="truncate">Growth Strategy Included</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

