import React from 'react';
import { Sparkles, FileText, ExternalLink, ArrowUpRight, Clock, Layers, Video, Wand2, Play } from 'lucide-react';

export default function SpecialProducts({ onOpenDemo }) {
  const featuredWork = [
    {
      id: 'ai-video-studio',
      title: 'Custom Client AI Video Production',
      subtitle: 'Tailored Video & Avatar Creation',
      badge: 'Interactive Demo',
      category: 'Client-Tailored AI Video',
      desc: 'We create customized 4K AI video commercials, photorealistic spokesperson avatars, product visualizers, and social media reels tailored strictly to your specific client requirements, script, and brand guidelines.',
      tags: ['Client Requirements', 'Custom AI Avatars', 'Brand Commercials', 'Tailored Reels'],
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80',
      actionType: 'demo',
      demoId: 'ai-video',
      buttonText: 'Preview AI Video Service',
    },
    {
      id: 'digital-invitation',
      title: 'Digital Invitation Card',
      subtitle: 'Interactive Event & Web Experience',
      badge: 'Live Site',
      category: 'Digital Web Experience',
      desc: 'Elegant, responsive digital invitation web app featuring interactive event details, venue location map, and instant guest RSVP handling.',
      tags: ['React', 'Tailwind CSS', 'Vercel', 'Live Web App'],
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      actionType: 'link',
      link: 'https://muhammedweds-aisha.vercel.app/',
      buttonText: 'Visit Live Site',
    },
    {
      id: 'ats-cv',
      title: 'ATS-Friendly CV',
      subtitle: 'HR Filter Optimizer',
      badge: 'View Resume',
      category: 'Career & Professional',
      desc: 'Professionally structured, HR-aligned ATS-compliant CV designed to pass corporate applicant tracking filters and highlight key tech capabilities.',
      tags: ['ATS Parser Ready', 'PDF Document', 'HR Filter Approved', 'Google Drive'],
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
      actionType: 'link',
      link: 'https://drive.google.com/file/d/1n7hZnB7yufkHnsryaiugEiJak2eeZrDm/view?usp=drivesdk',
      buttonText: 'View ATS CV',
    },
    {
      id: 'ecommerce-demo',
      title: 'E-Commerce Demo',
      subtitle: 'Online Storefront & Cart',
      badge: 'Updating Soon',
      category: 'E-Commerce Platform',
      desc: 'Modern online storefront and multi-category shopping portal with interactive cart management and streamlined checkout experience.',
      tags: ['E-Commerce', 'Online Shopping', 'Payment Suite', 'Coming Soon'],
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
      actionType: 'placeholder',
      statusBadge: 'Demo Adding Soon',
      buttonText: 'Updating Soon',
    },
    {
      id: 'smart-pos',
      title: 'Smart POS & Billing Suite',
      subtitle: 'Retail & Enterprise POS',
      badge: 'Updating Soon',
      category: 'Custom Software',
      desc: 'Complete offline & cloud POS billing solution with barcode scanning, GST invoicing, live inventory tracking, and sales analytics.',
      tags: ['POS Billing', 'Inventory System', 'GST Compliance', 'Coming Soon'],
      image: 'https://images.unsplash.com/photo-1556742049-0a67daf40955?auto=format&fit=crop&w=800&q=80',
      actionType: 'placeholder',
      statusBadge: 'Demo Adding Soon',
      buttonText: 'Updating Soon',
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden bg-white">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#0077B6]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0077B6] border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0077B6]" />
            <span>FourDouble Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 text-[#0A192F]">
            Featured <span className="text-gradient-electric">Projects & Demos</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            Explore our featured digital products, live applications, professional credentials, and upcoming software demos.
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredWork.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Project Image Preview Frame */}
                <div className="relative h-60 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                      project.actionType === 'placeholder' ? 'opacity-70 blur-[1px]' : 'opacity-90 group-hover:opacity-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent" />

                  {/* Top Left Badge */}
                  <div className="absolute top-4 left-4">
                    {project.actionType === 'placeholder' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/90 text-white backdrop-blur-md shadow-sm">
                        <Clock className="w-3.5 h-3.5" />
                        {project.badge}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-[#0A192F] backdrop-blur-md shadow-sm">
                        {project.badge}
                      </span>
                    )}
                  </div>

                  {/* Center Placeholder Overlay */}
                  {project.actionType === 'placeholder' && (
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center p-4">
                      <span className="px-4 py-2 rounded-full bg-white/90 text-[#0A192F] text-xs font-extrabold uppercase tracking-wider shadow-lg border border-white/50 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                        <span>{project.statusBadge}</span>
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-[#0A192F] mb-2 group-hover:text-[#0077B6] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {project.desc}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white text-slate-700 border border-slate-200/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 pt-0 flex items-center gap-3">
                {project.actionType === 'link' ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all bg-[#0077B6] hover:bg-[#005f92] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 group/btn"
                  >
                    {project.id === 'ats-cv' ? (
                      <FileText className="w-4 h-4 text-cyan-200" />
                    ) : (
                      <ExternalLink className="w-4 h-4 text-cyan-200" />
                    )}
                    <span>{project.buttonText}</span>
                    <ArrowUpRight className="w-4 h-4 text-cyan-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                ) : project.actionType === 'demo' ? (
                  <button
                    onClick={() => onOpenDemo(project.demoId)}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 group/btn"
                  >
                    <Wand2 className="w-4 h-4 text-purple-200 animate-pulse" />
                    <span>{project.buttonText}</span>
                    <ArrowUpRight className="w-4 h-4 text-purple-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                  >
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>{project.buttonText}</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


