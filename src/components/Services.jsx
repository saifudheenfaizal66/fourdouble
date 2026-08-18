import React, { useState } from 'react';
import { Smartphone, Monitor, Code, Image, Layout, Layers, BarChart3, Video, Film, ArrowRight, MessageSquare, Sparkles, FileText, ShoppingCart, ShieldCheck } from 'lucide-react';

export default function Services({ onOpenQuote }) {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'branding', label: 'Brand Strategy' },
    { id: 'web', label: 'Web & Mobile' },
    { id: 'software', label: 'POS & Systems' },
    { id: 'ai-video', label: 'AI Video & Media' },
  ];

  const serviceData = [
    {
      id: 'ai-video-gen',
      category: 'ai-video',
      categoryName: 'Custom AI Media & Production',
      title: 'Client-Tailored AI Video Production',
      desc: 'We generate custom, high-impact AI videos, photorealistic avatars, commercial product ads, and social media reels crafted precisely to your unique client requirements, script, and brand guidelines.',
      icon: Video,
      accentColor: 'from-purple-500/15 via-rose-500/15 to-indigo-500/15',
      borderColor: 'group-hover:border-purple-400',
      items: [
        { icon: Sparkles, title: 'Custom AI Avatars & Voiceovers', detail: 'Tailored AI presenters, multi-language voice synthesis & lip-syncing built to client specifications.' },
        { icon: Film, title: 'Bespoke Commercial & Product Ads', detail: 'Cinematic product showcases, 3D motion graphics, and video promos crafted for your brand.' },
        { icon: Video, title: 'Reels & Short-Form Production', detail: 'Custom YouTube Shorts, Instagram Reels, animated captions & viral hooks based on client goals.' },
      ]
    },
    {
      id: 'brand-strategy',
      category: 'branding',
      categoryName: 'Brand Strategy & Design',
      title: 'Brand Strategy & Visual Identity',
      desc: 'Crafting memorable visual identities, logo design systems, print collateral, and brand positioning that elevate your business above competitors.',
      icon: Image,
      accentColor: 'from-blue-500/15 to-[#0077B6]/15',
      borderColor: 'group-hover:border-[#0077B6]',
      items: [
        { icon: Image, title: 'Brand Identity & Logo Systems', detail: 'Complete logo suite, color schemes, typography & brand guidelines.' },
        { icon: Layout, title: 'Flex Banners & Large Prints', detail: 'High-resolution outdoor shop flex banners, event posters & flyers.' },
        { icon: Layers, title: 'UI/UX Design Systems', detail: 'Interactive Figma wireframes, component systems, and design tokens.' },
      ]
    },
    {
      id: 'web-mobile',
      category: 'web',
      categoryName: 'Web & Mobile Engineering',
      title: 'Next-Gen Web & Mobile Apps',
      desc: 'High-performance web platforms and cross-platform iOS & Android mobile apps engineered with modern, lightning-fast tech stacks.',
      icon: Monitor,
      accentColor: 'from-cyan-500/15 to-blue-600/15',
      borderColor: 'group-hover:border-cyan-400',
      items: [
        { icon: Smartphone, title: 'Mobile App Development', detail: 'Cross-platform React Native apps with native performance & push alerts.' },
        { icon: Monitor, title: 'Web Platforms & Next.js', detail: 'SEO-optimized, responsive web applications and landing pages.' },
        { icon: Code, title: 'Custom API & Backend Architecture', detail: 'Scalable cloud databases, auth systems, and serverless APIs.' },
      ]
    },
    {
      id: 'pos-software',
      category: 'software',
      categoryName: 'Custom Business Software',
      title: 'POS Billing & Enterprise Systems',
      desc: 'Specialized desktop and cloud POS billing software with GST invoicing, barcode scanning, live inventory tracking, and sales analytics.',
      icon: ShoppingCart,
      accentColor: 'from-emerald-500/15 to-teal-500/15',
      borderColor: 'group-hover:border-emerald-400',
      items: [
        { icon: ShoppingCart, title: 'Offline/Online Billing POS', detail: 'Fast checkout billing, Thermal print integration, and offline sync.' },
        { icon: BarChart3, title: 'Inventory & Sales Analytics', detail: 'Real-time stock alerts, profit margins, and GST export reports.' },
        { icon: FileText, title: 'AI ATS CV Generator Engine', detail: 'Automated resume parser, ATS compatibility scoring & instant PDF exports.' },
      ]
    }
  ];

  const filteredServices = activeTab === 'all'
    ? serviceData
    : serviceData.filter(s => s.category === activeTab);

  return (
    <section id="services" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-white">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#0077B6]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#00B4D8]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: "What We Do" */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0077B6] border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3.5 sm:mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Capabilities</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 text-[#0A192F] leading-tight">
            Comprehensive <span className="text-gradient-electric">Digital Solutions</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
            Tailored digital engineering and brand strategy built to elevate startups, local enterprises, and high-growth businesses.
          </p>
        </div>

        {/* Mobile Swipeable / Desktop Wrapped Filter Tabs */}
        <div className="flex items-center sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-2.5 pb-2 sm:pb-0 mb-10 sm:mb-14 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 touch-active ${
                activeTab === cat.id
                  ? 'bg-gradient-to-r from-[#0A192F] via-[#0077B6] to-[#00B4D8] text-white shadow-[0_4px_20px_rgba(0,119,182,0.35)] scale-105'
                  : 'bg-slate-100/80 text-slate-700 hover:text-[#0077B6] hover:bg-slate-200/60 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 4 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const MainIcon = service.icon;
            const whatsappMsg = encodeURIComponent(`Hi FourDouble Solutions, I am interested in inquiring about your ${service.title} service.`);

            return (
              <div
                key={service.id}
                className={`group p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 relative flex flex-col justify-between bg-[#F8FAFC] border-slate-200/90 shadow-sm hover:shadow-xl sm:hover:shadow-2xl hover:-translate-y-1 ${service.borderColor}`}
              >
                {/* Background Glow */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${service.accentColor} rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity`} />

                <div>
                  {/* Card Header */}
                  <div className="flex items-start sm:items-center justify-between mb-5 sm:mb-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border bg-white border-blue-200 text-[#0077B6] shadow-2xs group-hover:scale-105 transition-all shrink-0">
                        <MainIcon className="w-5 h-5 sm:w-6.5 sm:h-6.5 text-[#0077B6]" />
                      </div>
                      <div>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0077B6] block mb-0.5">
                          {service.categoryName}
                        </span>
                        <h3 className="text-lg xs:text-xl sm:text-2xl font-extrabold transition-colors text-[#0A192F] group-hover:text-[#0077B6] leading-snug">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 text-slate-600 font-medium">
                    {service.desc}
                  </p>

                  {/* Feature Breakdown Items */}
                  <div className="space-y-3 sm:space-y-3.5 mb-6 sm:mb-8">
                    {service.items.map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={idx} className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border flex items-start gap-3 sm:gap-3.5 bg-white border-slate-200/80 shadow-2xs">
                          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-blue-50 text-[#0077B6] shrink-0 mt-0.5 border border-blue-100">
                            <ItemIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-[#0A192F]">
                              {item.title}
                            </h4>
                            <p className="text-[11px] sm:text-xs mt-0.5 text-slate-500 font-normal">{item.detail}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-4 sm:pt-6 border-t flex items-center justify-between border-slate-200/90 gap-2">
                  <span className="text-[11px] sm:text-xs font-bold flex items-center gap-1.5 text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                    <span className="truncate">Agency Quality</span>
                  </span>

                  <div className="flex items-center gap-2 shrink-0">
                    {service.id === 'ai-video-gen' && (
                      <a
                        href="https://drive.google.com/file/d/1K9pSVmYKVTvGMflamO6bL6RbkYactPL8/view?usp=drivesdk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 sm:px-3.5 py-2 rounded-full border border-purple-200 transition-all touch-active"
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>Watch Demo</span>
                      </a>
                    )}
                    <button
                      onClick={onOpenQuote}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0077B6] bg-blue-50 hover:bg-blue-100 px-3.5 sm:px-4 py-2 rounded-full border border-blue-200 transition-all touch-active"
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                      href={`https://wa.me/919562896069?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all touch-active"
                      title="Direct Chat on WhatsApp"
                      aria-label="Direct Chat on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

