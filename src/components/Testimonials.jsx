import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Rahman',
      role: 'Event Client',
      company: 'Digital Invitation',
      content: 'FourDouble Solutions created a stunning interactive digital invitation card for our wedding. The design was elegant, mobile-responsive, and allowed our guests to view event details and RSVP seamlessly. Absolutely top-class work!',
      rating: 5,
      service: 'Digital Invitation Card'
    },
    {
      name: 'Niyaz',
      role: 'Tech Professional',
      company: 'Career Development',
      content: 'The ATS-Friendly CV created by FourDouble Solutions made a huge difference in my job search. The layout is clean, HR-optimized, and passes automated resume scanners easily. Great quality and fast delivery!',
      rating: 5,
      service: 'ATS-Friendly CV'
    },
    {
      name: 'Ihsan',
      role: 'Operations Lead',
      company: 'Step Off',
      content: 'FourDouble Solutions delivered an outstanding custom billing software app for Step Off. It streamlined our daily checkout, invoice generation, and sales tracking effortlessly. Exceptional performance and support!',
      rating: 5,
      service: 'Billing Software App'
    }
  ];

  return (
    <section id="testimonials" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0077B6] border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3.5 sm:mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Reviews</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 text-[#0A192F] leading-tight">
            Client <span className="text-gradient-electric">Testimonials</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
            Hear directly from founders, creators, and leaders who experienced our custom apps and digital solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto gap-6 sm:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-200 text-slate-300'
                        }`}
                      />
                    ))}
                    <span className="text-[11px] sm:text-xs font-bold text-slate-500 ml-1.5">
                      {rev.rating}.0 / 5.0
                    </span>
                  </div>
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#0077B6]/20 shrink-0" />
                </div>

                <p className="text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 italic text-slate-700 font-normal">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t flex flex-col xs:flex-row xs:items-center justify-between border-slate-200 gap-2">
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#0A192F]">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {rev.role} • <span className="text-[#0077B6] font-bold">{rev.company}</span>
                  </p>
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold uppercase px-3 py-1 rounded-full border bg-blue-50 text-[#0077B6] border-blue-200 self-start xs:self-auto shrink-0">
                  {rev.service}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

