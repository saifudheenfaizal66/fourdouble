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
    { name: 'AI Video Generation & Commercials', est: 'Starting ₹500+' },
    { name: 'Graphic Design & Brand Collateral', est: 'Starting ₹700+' },
    { name: 'Video Reel Creation', est: 'Starting ₹1,500+' },
    { name: 'General CV Resume Formatting', est: 'Starting ₹100' },
    { name: 'ATS CV Resume Optimization', est: 'Starting ₹250' },
    { name: 'Digital Invitation Card', est: 'Starting ₹400' },
    { name: 'Web Application Development (Mainly Web Pages)', est: 'Starting ₹5,000+' },
    { name: 'Custom Billing POD & POS Software', est: 'Starting ₹5,000+' },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 transition-colors bg-white border-slate-200 text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full transition-all bg-slate-100 hover:bg-slate-200 text-slate-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#00B4D8] to-[#0077B6] text-white shadow-[0_0_15px_rgba(0,180,216,0.3)]">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0077B6]">
                Interactive Estimator
              </span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-300">
                Instant Response
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#0A192F]">Get a Customized Project Quote</h3>
          </div>
        </div>

        <form onSubmit={handleSendQuote} className="space-y-6">
          
          {/* Step 1: Select Service */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-3 text-slate-700">
              1. Select Primary Service Needed
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {services.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSelectedService(item.name)}
                  className={`p-3 rounded-xl text-left border text-xs transition-all flex justify-between items-center ${
                    selectedService === item.name
                      ? 'bg-blue-50 border-[#0077B6] text-[#0A192F] font-bold shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="truncate pr-2">{item.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded border shrink-0 text-[#0077B6] bg-white border-slate-200 font-bold">
                    {item.est}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Timeline & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700">
                2. Expected Timeline
              </label>
              <select
                value={selectedTimeline}
                onChange={(e) => setSelectedTimeline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0077B6]"
              >
                {timelines.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700">
                3. Estimated Budget
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0077B6]"
              >
                {budgets.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* Step 3: Contact info & notes */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-700">
                Your Name / Organization
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Saif / FourDouble Tech"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0077B6]"
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
                className="w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none resize-none bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0077B6]"
              />
            </div>
          </div>

          {/* Summary Box & WhatsApp Trigger Button */}
          <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 border-slate-200">
            <div className="text-xs flex items-center gap-2 text-slate-600 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Direct WhatsApp quote line (+91 9562896069)</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold text-white text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:scale-105 transition-all"
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
