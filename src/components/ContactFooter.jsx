import React, { useState } from 'react';
import { Phone, Mail, Instagram, MessageSquare, Send, Sparkles, ArrowUpRight, CheckCircle2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function ContactFooter({ onOpenQuote }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Software Development',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const waText = `Hi FourDouble Solutions!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService Interested: ${formData.service}\nMessage: ${formData.message}`;
    const waUrl = `https://wa.me/919562896069?text=${encodeURIComponent(waText)}`;
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setFormSubmitted(false);
    }, 800);
  };

  return (
    <footer id="contact" className="relative pt-12 overflow-hidden bg-[#0A192F] text-white">
      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#0077B6]/20 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Figma CTA Banner: "Ready to Transform Your Brand?" */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl border border-blue-500/30 shadow-[0_20px_60px_-15px_rgba(0,119,182,0.3)] mb-20 text-center relative overflow-hidden bg-gradient-to-r from-[#0077B6] via-[#0096C7] to-[#00B4D8]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-6 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Grow</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto mb-6 text-white">
            Ready to Transform Your Brand?
          </h2>

          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium text-blue-100">
            Partner with FourDouble Solutions today for agency-quality web platforms, mobile apps, brand strategy, and AI media production.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#0A192F] font-bold text-base shadow-xl hover:bg-slate-100 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-[#0077B6]" />
              <span>Get Free Quote & Estimate</span>
            </button>

            <a
              href="https://wa.me/919562896069"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base border border-white/40 hover:border-white transition-all flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="w-full max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">
            
            {/* Left Column: Direct Contact Info Blocks */}
            <div className="w-full space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl p-0.5 bg-gradient-to-br from-[#0077B6] to-[#00B4D8]">
                    <div className="w-full h-full rounded-[10px] flex items-center justify-center bg-[#0A192F]">
                      <img src="/assets/logos/main logo.png" alt="FourDouble Logo" className="w-6 h-6 object-contain" />
                    </div>
                  </div>
                  <span className="font-extrabold text-2xl text-white">
                    FourDouble <span className="text-[#00B4D8]">Solutions</span>
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  Empowering businesses with smart, affordable digital solutions. High-impact tech engineering, UI/UX design, and AI media production at transparent freelance rates. #LetsGrowTogether
                </p>
              </div>

              {/* Direct Contact Cards */}
              <div className="space-y-4 w-full">
                
                {/* WhatsApp / Phone */}
                <a
                  href="https://wa.me/919562896069"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-5 rounded-2xl border border-slate-800 hover:border-emerald-500 bg-slate-900/80 backdrop-blur-xl shadow-sm flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-slate-400">
                        Phone / WhatsApp
                      </span>
                      <p className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                        +91 9562896069
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Email */}
                <a
                  href="mailto:fourdoublesolution@gmail.com"
                  className="w-full p-5 rounded-2xl border border-slate-800 hover:border-[#00B4D8] bg-slate-900/80 backdrop-blur-xl shadow-sm flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-[#00B4D8] border border-cyan-500/30">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-slate-400">
                        Email Address
                      </span>
                      <p className="text-base font-bold text-white group-hover:text-[#00B4D8] transition-colors">
                        fourdoublesolution@gmail.com
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-[#00B4D8] group-hover:translate-x-1 transition-all" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/fourdouble._"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-5 rounded-2xl border border-slate-800 hover:border-pink-500 bg-slate-900/80 backdrop-blur-xl shadow-sm flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/30">
                      <Instagram className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-slate-400">
                        Instagram Handle
                      </span>
                      <p className="text-base font-bold text-white group-hover:text-pink-400 transition-colors">
                        @fourdouble._
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                </a>

              </div>
            </div>

            {/* Right Column: Contact Message Form */}
            <div className="w-full bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
              <h3 className="text-2xl font-extrabold text-white mb-2">
                Send Us a Direct Message
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill out your details below to generate an instant inquiry on WhatsApp & email.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <div className="w-full">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-700 text-white text-sm focus:border-[#00B4D8] focus:outline-none bg-slate-800/80"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9562896069"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-700 text-white text-sm focus:border-[#00B4D8] focus:outline-none bg-slate-800/80"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <div className="w-full">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-700 text-white text-sm focus:border-[#00B4D8] focus:outline-none bg-slate-800/80"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Service Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-700 text-white text-sm focus:border-[#00B4D8] focus:outline-none bg-slate-800/80"
                    >
                      <option className="bg-slate-900">Brand Strategy & Design</option>
                      <option className="bg-slate-900">Web & Mobile Apps</option>
                      <option className="bg-slate-900">POS Billing Software</option>
                      <option className="bg-slate-900">AI ATS Resume Builder</option>
                    </select>
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your project requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-700 text-white text-sm focus:border-[#00B4D8] focus:outline-none resize-none bg-slate-800/80"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold text-white text-base shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  {formSubmitted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 animate-bounce" />
                      <span>Opening WhatsApp Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit & Chat on WhatsApp</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Footer Sub-Bar */}
        <div className="pt-8 pb-12 border-t border-slate-800 text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <img src="/assets/logos/main logo.png" alt="FourDouble Logo" className="w-5 h-5 object-contain" />
            <span className="font-bold text-white">© FourDouble Solutions.</span>
            <span>All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-[#00B4D8] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#00B4D8] transition-colors">About</a>
            <a href="#services" className="hover:text-[#00B4D8] transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-[#00B4D8] transition-colors">Featured Work</a>
            <a href="#process" className="hover:text-[#00B4D8] transition-colors">Process</a>
            <a href="#contact" className="hover:text-[#00B4D8] transition-colors">Contact</a>
          </div>

          <div className="text-[#00B4D8] font-bold tracking-wide flex items-center gap-1.5">
            <span>#LetsGrowTogether</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

