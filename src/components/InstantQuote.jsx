import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Video, 
  Palette, 
  Film, 
  FileText, 
  Award, 
  Globe, 
  TrendingUp, 
  CreditCard,
  Plus,
  Check,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export default function InstantQuote({ onOpenQuote }) {
  const quoteServices = [
    {
      id: 'ai-video',
      name: 'AI Video Generation',
      price: 500,
      priceLabel: '₹500',
      period: 'per video',
      category: 'media',
      icon: Video,
      badge: 'Popular',
      color: 'from-purple-500 to-indigo-600',
      bgLight: 'bg-purple-50',
      borderLight: 'border-purple-200',
      textAccent: 'text-purple-600',
      desc: 'High-impact AI avatars, scripted product promos, and cinematic digital video ads.'
    },
    {
      id: 'graphic-design',
      name: 'Graphic Design',
      price: 700,
      priceLabel: '₹700',
      period: 'starting',
      category: 'branding',
      icon: Palette,
      badge: 'Bestseller',
      color: 'from-blue-500 to-cyan-500',
      bgLight: 'bg-blue-50',
      borderLight: 'border-blue-200',
      textAccent: 'text-blue-600',
      desc: 'Logos, flex banners, corporate brochures, social posts, and brand identity kits.'
    },
    {
      id: 'video-reel',
      name: 'Video Reel Creation',
      price: 1500,
      priceLabel: '₹1,500',
      period: 'starting',
      category: 'media',
      icon: Film,
      badge: 'Trending',
      color: 'from-rose-500 to-pink-600',
      bgLight: 'bg-rose-50',
      borderLight: 'border-rose-200',
      textAccent: 'text-rose-600',
      desc: 'Viral Instagram Reels, YouTube Shorts, dynamic editing, and custom motion graphics.'
    },
    {
      id: 'general-cv',
      name: 'General CV',
      price: 100,
      priceLabel: '₹100',
      period: 'flat rate',
      category: 'career',
      icon: FileText,
      badge: 'Affordable',
      color: 'from-slate-600 to-slate-800',
      bgLight: 'bg-slate-50',
      borderLight: 'border-slate-200',
      textAccent: 'text-slate-700',
      desc: 'Clean, professional resume formatting designed for fast application turnarounds.'
    },
    {
      id: 'ats-cv',
      name: 'ATS CV',
      price: 250,
      priceLabel: '₹250',
      period: 'flat rate',
      category: 'career',
      icon: Award,
      badge: 'HR Optimized',
      color: 'from-emerald-600 to-teal-700',
      bgLight: 'bg-emerald-50',
      borderLight: 'border-emerald-200',
      textAccent: 'text-emerald-700',
      desc: 'HR filter-compliant, keyword-optimized ATS resume tailored for top interview calls.'
    },
    {
      id: 'web-apps',
      name: 'Web Application Development',
      price: 5000,
      priceLabel: '₹5,000',
      period: 'starting from',
      category: 'tech',
      icon: Globe,
      badge: 'Enterprise',
      color: 'from-sky-500 to-blue-700',
      bgLight: 'bg-sky-50',
      borderLight: 'border-sky-200',
      textAccent: 'text-sky-600',
      desc: 'High-performance web pages, React/Next.js web portals, custom admin dashboards, and PWAs.'
    },
    {
      id: 'custom-billing',
      name: 'Custom Billing POD & POS Software',
      price: 5000,
      priceLabel: '₹5,000',
      period: 'starting from',
      category: 'tech',
      icon: CreditCard,
      badge: 'Software',
      color: 'from-indigo-600 to-purple-700',
      bgLight: 'bg-indigo-50',
      borderLight: 'border-indigo-200',
      textAccent: 'text-indigo-600',
      desc: 'Tailored offline/cloud GST billing POS software, POD solutions, inventory tracker, and thermal receipts.'
    },
    {
      id: 'digital-invitation',
      name: 'Digital Invitation Card',
      price: 400,
      priceLabel: '₹400',
      period: 'starting',
      category: 'tech',
      icon: Sparkles,
      badge: 'Interactive',
      color: 'from-pink-500 to-rose-600',
      bgLight: 'bg-pink-50',
      borderLight: 'border-pink-200',
      textAccent: 'text-pink-600',
      desc: 'Interactive event & wedding web invitations, RSVP management, and venue map links.'
    }
  ];

  const [selectedIds, setSelectedIds] = useState(['ai-video']);
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'media', label: 'Video & Reels' },
    { id: 'branding', label: 'Design & Graphics' },
    { id: 'tech', label: 'Web & Billing' },
    { id: 'career', label: 'CV & Resume' },
  ];

  const filteredServices = activeTab === 'all'
    ? quoteServices
    : quoteServices.filter(s => s.category === activeTab);

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(item => item !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedServices = quoteServices.filter(s => selectedIds.includes(s.id));
  const estimatedTotal = selectedServices.reduce((sum, item) => sum + item.price, 0);

  const handleInstantWhatsAppQuote = () => {
    const serviceListStr = selectedServices.map(s => `• ${s.name} (${s.priceLabel})`).join('\n');
    const message = `Hello FourDouble Solutions!\n\nI would like an instant quote for the following service(s):\n\n${serviceListStr}\n\n💰 Estimated Starting Total: ₹${estimatedTotal.toLocaleString('en-IN')}\n\nPlease share further details and process to get started.`;
    
    const waUrl = `https://wa.me/919562896069?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="quote" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F1F5F9]">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0077B6]/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0077B6] border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Calculator className="w-4 h-4 text-[#0077B6]" />
            <span>Transparent Pricing & Instant Quotes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 text-[#0A192F]">
            Get <span className="text-gradient-electric">Instant Quote</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Select services below to calculate your estimated starting cost in real-time and send an instant quote directly to our WhatsApp team.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === cat.id
                  ? 'bg-[#0A192F] text-white shadow-md scale-105'
                  : 'bg-white text-slate-600 hover:text-[#0077B6] border border-slate-200/90'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 8 Instant Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            const isSelected = selectedIds.includes(service.id);
            const itemWaMsg = encodeURIComponent(
              `Hi FourDouble Solutions, I want an instant quote for ${service.name} starting at ${service.priceLabel}.`
            );

            return (
              <div
                key={service.id}
                onClick={() => toggleSelect(service.id)}
                className={`group relative rounded-3xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#0077B6] shadow-xl ring-2 ring-[#0077B6]/20 -translate-y-1'
                    : 'bg-white/80 backdrop-blur-md border-slate-200/90 hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {/* Selection indicator pill */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 rounded-2xl ${service.bgLight} ${service.textAccent} border ${service.borderLight}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {service.badge}
                    </span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>

                {/* Card Title & Desc */}
                <div className="mb-6">
                  <h3 className="text-lg font-extrabold text-[#0A192F] mb-2 group-hover:text-[#0077B6] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {service.desc}
                  </p>
                </div>

                {/* Pricing Tag & WhatsApp Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-[#0A192F]">
                      {service.priceLabel}
                    </span>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {service.period}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/919562896069?text=${itemWaMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-500 hover:text-white transition-all shadow-xs"
                    title={`Inquire about ${service.name}`}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Interactive Instant Estimate Builder Banner */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-[#0A192F] via-[#0E2A47] to-[#0077B6] text-white shadow-2xl overflow-hidden border border-blue-900/50">
          {/* Subtle Ambient Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left side: Selected summary */}
            <div className="space-y-3 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin-slow" />
                <span>Instant Estimator Summary</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Selected ({selectedServices.length}) Service{selectedServices.length > 1 ? 's' : ''}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
                {selectedServices.map(s => (
                  <span key={s.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{s.name} ({s.priceLabel})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right side: Estimated Total & WhatsApp Trigger */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/15 shrink-0 w-full lg:w-auto">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-cyan-200 uppercase tracking-widest block mb-0.5">
                  Est. Starting Price
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  ₹{estimatedTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={handleInstantWhatsAppQuote}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 font-extrabold text-white text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Quote on WhatsApp</span>
                </button>

                <button
                  onClick={onOpenQuote}
                  className="px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Custom Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
