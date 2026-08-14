import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, Calculator } from 'lucide-react';

export default function QuoteEstimatorModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [selectedService, setSelectedService] = useState('Web & Mobile App');
  const [selectedTimeline, setSelectedTimeline] = useState('Standard (2-3 Weeks)');
  const [selectedBudget, setSelectedBudget] = useState('Growth Project (₹15,000 - ₹40,000)');
  const [clientName, setClientName] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  const services = [
    { name: 'AI Video Generation & Commercials', est: '₹500+' },
    { name: 'Graphic Design & Brand Collateral', est: '₹700+' },
    { name: 'Video Reel Creation', est: '₹1,500+' },
    { name: 'General CV Resume Formatting', est: '₹100' },
    { name: 'ATS CV Resume Optimization', est: '₹250' },
    { name: 'Digital Invitation Card', est: '₹400' },
    { name: 'Web Application Development', est: '₹5,000+' },
    { name: 'Custom Billing POS Software', est: '₹5,000+' },
  ];

  const timelines = [
    'Express (< 1 Week)',
    'Standard (2-3 Weeks)',
    'Flexible / Milestone Based'
  ];

  const budgets = [
    'Starter / Micro Project (Under ₹5,000)',
    'Growth Project (₹5,000 - ₹25,000)',
    'Enterprise / Custom Scale (₹30,000+)'
  ];

  const handleSendQuote = (e) => {
    e.preventDefault();
    const message = `Hello FourDouble Solutions!\n\nI would like an official quote for my project:\n\n👤 Name: ${clientName || 'Valued Client'}\n🛠 Service: ${selectedService}\n⏱ Timeline: ${selectedTimeline}\n💰 Budget Category: ${selectedBudget}\n📝 Details: ${clientNotes || 'N/A'}\n\nPlease get in touch with me.`;
    
    const waUrl = `https://wa.me/919562896069?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl sm:rounded-3xl border shadow-2xl p-4 sm:p-8 transition-colors bg-white border-slate-200 text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 p-2 rounded-full transition-all bg-slate-100 hover:bg-slate-200 text-slate-600 active:scale-95 touch-active z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-200 pr-8">
          <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#00B4D8] to-[#0077B6] text-white shadow-[0_0_15px_rgba(0,180,216,0.3)] shrink-0">
            <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0077B6]">
                Estimator
              </span>
              <span className="px-2 py-0.5 text-[9px] sm:text-[10px] rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-300">
                Instant Response
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-[#0A192F] leading-tight">Get a Customized Project Quote</h3>
          </div>
        </div>

        <form onSubmit={handleSendQuote} className="space-y-4 sm:space-y-6">
          
          {/* Step 1: Select Service */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2.5 text-slate-700">
              1. Select Primary Service Needed
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {services.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSelectedService(item.name)}
                  className={`p-2.5 sm:p-3 rounded-xl text-left border text-xs transition-all flex justify-between items-center gap-2 touch-active ${
                    selectedService === item.name
                      ? 'bg-blue-50 border-[#0077B6] text-[#0A192F] font-bold shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="truncate pr-1 text-xs">{item.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded border shrink-0 text-[#0077B6] bg-white border-slate-200 font-bold">
                    {item.est}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Timeline & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">
                2. Expected Timeline
              </label>
              <select
                value={selectedTimeline}
                onChange={(e) => setSelectedTimeline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-xs focus:outline-none bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0077B6]"
              >
                {timelines.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">
                3. Estimated Budget
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-xs focus:outline-none bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0077B6]"
              >
                {budgets.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* Step 3: Contact info & notes */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-700">
                Your Name / Organization *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Saif / FourDouble Tech"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-xs focus:outline-none bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0077B6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-700">
                Project Overview (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Briefly describe your requirements or features..."
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border text-base sm:text-xs focus:outline-none resize-none bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0077B6]"
              />
            </div>
          </div>

          {/* Summary Box & WhatsApp Trigger Button */}
          <div className="pt-3.5 sm:pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-slate-200">
            <div className="text-[11px] sm:text-xs flex items-center gap-1.5 text-slate-600 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Direct WhatsApp quote line (+91 9562896069)</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold text-white text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] active:scale-[0.98] transition-all touch-active"
            >
              <Send className="w-4 h-4" />
              <span>Send Quote Request on WhatsApp</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
