import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  RotateCw,
  Code2,
  Palette,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Star
} from 'lucide-react';

const TOTAL_FRAMES = 240;

const CAPABILITIES = [
  {
    id: 'engineering',
    shortLabel: 'Web & Apps',
    badge: 'Full-Stack Web & App Engineering',
    icon: Code2,
    accentColor: 'text-[#0077B6]',
    badgeBg: 'bg-blue-50/90 text-[#0077B6] border-blue-200/90',
    title: 'High-Performance Platforms',
    description: 'Engineering scalable cloud web applications, robust APIs, and ultra-fast responsive platforms designed for maximum conversions and enterprise speed.',
  },
  {
    id: 'design',
    shortLabel: 'UI/UX Design',
    badge: 'UI/UX & Modern Brand Systems',
    icon: Palette,
    accentColor: 'text-purple-600',
    badgeBg: 'bg-purple-50/90 text-purple-700 border-purple-200/90',
    title: 'Captivating Digital Aesthetics',
    description: 'Crafting intuitive user interfaces, comprehensive design systems, and engaging visual identities that elevate modern enterprises.',
  },
  {
    id: 'growth',
    shortLabel: 'SEO Growth',
    badge: 'SEO & Organic Growth Architecture',
    icon: TrendingUp,
    accentColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/90',
    title: 'Data-Driven Search Dominance',
    description: 'Engineering technical SEO, Core Web Vitals optimization, and high-converting marketing funnels to scale organic revenue.',
  },
  {
    id: 'ai',
    shortLabel: 'AI Media',
    badge: 'Custom AI Media & Smart Automations',
    icon: Zap,
    accentColor: 'text-cyan-600',
    badgeBg: 'bg-cyan-50/90 text-[#0077B6] border-cyan-200/90',
    title: 'Next-Gen Generative Workflows',
    description: 'Delivering commercial AI video production, bespoke automation tools, and creative digital assets at smart, transparent freelance rates.',
  },
];

export default function Hero({ onOpenQuote }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef({});
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const animFrameIdRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [manualPhase, setManualPhase] = useState(null);

  // Determine active capability (scroll-linked with optional click override)
  const activeCapIndex = manualPhase !== null 
    ? manualPhase 
    : Math.min(CAPABILITIES.length - 1, Math.max(0, Math.floor(scrollProgress * CAPABILITIES.length)));
  const currentCap = CAPABILITIES[activeCapIndex];
  const IconComponent = currentCap.icon;

  // Helper to generate image path
  const getFramePath = useCallback((index) => {
    const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(index)));
    const pad = String(clamped).padStart(3, '0');
    return `/assets/heroscection/ezgif-frame-${pad}.png`;
  }, []);

  // Render a specific frame on canvas with high DPI & optimal aspect framing
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find the closest available image in cache
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset <= 30; offset++) {
        if (imagesRef.current[frameIndex - offset]?.complete && imagesRef.current[frameIndex - offset]?.naturalWidth > 0) {
          img = imagesRef.current[frameIndex - offset];
          break;
        }
        if (imagesRef.current[frameIndex + offset]?.complete && imagesRef.current[frameIndex + offset]?.naturalWidth > 0) {
          img = imagesRef.current[frameIndex + offset];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const imgRatio = img.naturalWidth / img.naturalHeight; // 1920 / 1080 = 1.7778
    const canvasRatio = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (width < 768) {
      // Mobile: Full immersive cover background with character centered behind the overlay text
      const baseScale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      drawWidth = img.naturalWidth * baseScale * 1.05;
      drawHeight = img.naturalHeight * baseScale * 1.05;
      
      // Center horizontally on character
      offsetX = (width - drawWidth) * 0.48;
      // Center vertically in viewport so character & 3D elements dynamically animate behind the text
      offsetY = (height - drawHeight) * 0.32;
    } else if (width < 1024) {
      // Tablet: Immersive backdrop cover
      const baseScale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      drawWidth = img.naturalWidth * baseScale * 1.05;
      drawHeight = img.naturalHeight * baseScale * 1.05;
      offsetX = (width - drawWidth) * 0.46;
      offsetY = (height - drawHeight) * 0.25;
    } else {
      // Desktop: Centered layout giving full view of character and orbiting elements
      if (canvasRatio > imgRatio) {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
        offsetY = 0;
      }
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  // Progressive Preloading Engine
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const updateLoadPercent = () => {
      loadedCount++;
      const percent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
      setLoadProgress(percent);
    };

    // 1. Load initial frame immediately for instant first render
    const frame1 = new Image();
    frame1.src = getFramePath(1);
    frame1.onload = () => {
      if (isCancelled) return;
      imagesRef.current[1] = frame1;
      renderFrame(1);
      updateLoadPercent();
    };

    // 2. Preload sparse keyframes for immediate responsive scrolling
    const keyframes = [];
    for (let i = 4; i <= TOTAL_FRAMES; i += 4) {
      keyframes.push(i);
    }

    keyframes.forEach((idx) => {
      const img = new Image();
      img.src = getFramePath(idx);
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[idx] = img;
        updateLoadPercent();
      };
    });

    // 3. Sequentially load all remaining frames in micro-batches
    const loadRemaining = async () => {
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) break;
        if (imagesRef.current[i]) continue;

        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[i] = img;
          updateLoadPercent();
        };
        img.onerror = () => {
          if (isCancelled) return;
          updateLoadPercent();
        };

        if (i % 8 === 0) {
          await new Promise((res) => setTimeout(res, 20));
        }
      }
    };

    const timeout = setTimeout(loadRemaining, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [getFramePath, renderFrame]);

  // Smooth lerp frame interpolation loop (60fps/120fps) on all viewports
  useEffect(() => {
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.04) {
        currentFrameRef.current += diff * 0.16;
        renderFrame(Math.round(currentFrameRef.current));
      } else if (Math.round(currentFrameRef.current) !== Math.round(targetFrameRef.current)) {
        currentFrameRef.current = targetFrameRef.current;
        renderFrame(Math.round(currentFrameRef.current));
      }
      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [renderFrame]);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      renderFrame(Math.round(currentFrameRef.current));
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Universal scroll position listener to update animation progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);

      const targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + progress * (TOTAL_FRAMES - 1))));
      targetFrameRef.current = targetFrame;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative w-full bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] h-[220vh] sm:h-[230vh] lg:h-[240vh]"
    >
      {/* Viewport Container: Pinned/Sticky throughout the Hero scroll height on Mobile & Desktop using dynamic viewport unit 100dvh */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 lg:pt-0 pb-3 xs:pb-4 sm:pb-6 lg:pb-0">
        
        {/* Background Ambient Glow & Grid Pattern */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] lg:w-[700px] h-[320px] sm:h-[550px] lg:h-[700px] rounded-full bg-[#0077B6]/10 blur-[90px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-5 sm:right-10 w-[240px] sm:w-[400px] lg:w-[500px] h-[240px] sm:h-[400px] lg:h-[500px] rounded-full bg-[#00B4D8]/10 blur-[80px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none" />

        {/* 3D Image Sequence Canvas: Fullscreen Dynamic Backdrop on Mobile & Desktop */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 pointer-events-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full filter drop-shadow-[0_15px_35px_rgba(0,119,182,0.12)]"
          />
        </div>

        {/* Subtle Ambient Vignettes for Contrast */}
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 lg:h-0 bg-gradient-to-t from-white/40 via-white/10 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-24 sm:h-28 lg:h-0 bg-gradient-to-b from-white/80 via-white/30 to-transparent pointer-events-none z-10" />

        {/* Top Progress Line Indicator */}
        <div className="relative z-20 w-full h-[3px] bg-slate-200/50 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-purple-600 transition-all duration-100 ease-out"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>

        {/* Top Floating Agency Badge & Frame Load Status */}
        <div className="absolute top-16 sm:top-20 lg:top-24 left-4 sm:left-10 z-20 flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-xs text-[11px] sm:text-xs font-semibold text-slate-700 pointer-events-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-[#0A192F]">FourDouble Solutions</span>
          <span className="h-3 w-[1px] bg-slate-200" />
          <span className="text-[#0077B6] font-semibold">Live Agency</span>
          {loadProgress < 100 && (
            <>
              <span className="h-3 w-[1px] bg-slate-200" />
              <div className="flex items-center gap-1 text-[10px] text-[#0077B6]">
                <RotateCw className="w-2.5 h-2.5 animate-spin" />
                <span>{loadProgress}%</span>
              </div>
            </>
          )}
        </div>

        {/* Desktop Bottom-Left 360 Scroll Badge */}
        <div className="hidden lg:flex absolute bottom-10 left-10 z-20 items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-[#0077B6] animate-pulse" />
          <span>Scroll to explore 360° stack</span>
          <span className="text-[11px] font-mono text-[#0077B6] font-bold bg-blue-50 px-2 py-0.5 rounded-full">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Unified Bottom Overlay Card: Merges Headline, Dynamic Capability, Timeline Pills & CTA Buttons Over Animation */}
        <div className="relative lg:absolute lg:bottom-10 xl:bottom-12 lg:right-8 xl:right-16 z-20 w-full lg:max-w-xl xl:max-w-2xl px-3.5 xs:px-4 sm:px-6 lg:px-0 pointer-events-auto mt-auto lg:mt-0 mb-2 xs:mb-3 sm:mb-4 lg:mb-0">
          <div className="flex flex-col gap-2.5 xs:gap-3 sm:gap-4 lg:gap-5 bg-white/80 sm:bg-white/85 lg:bg-white/40 backdrop-blur-xl lg:backdrop-blur-md border border-white/85 lg:border-white/60 rounded-2xl xs:rounded-3xl p-3.5 xs:p-4.5 sm:p-6 xl:p-7 shadow-[0_15px_35px_-5px_rgba(0,119,182,0.15)] lg:shadow-[0_10px_35px_-10px_rgba(0,119,182,0.08)]">
            
            {/* 1. Pill Row: Active Capability Badge & Mobile Scroll Progress */}
            <div className="flex items-center justify-between gap-2">
              <div className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10.5px] xs:text-[11px] sm:text-xs font-bold tracking-wide border shadow-2xs transition-all duration-300 ${currentCap.badgeBg}`}>
                <IconComponent className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate max-w-[200px] xs:max-w-[260px] sm:max-w-none">{currentCap.badge}</span>
              </div>

              {/* Mobile 360 Indicator */}
              <div className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-[10px] xs:text-[11px] font-bold text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0077B6] animate-pulse" />
                <span className="font-mono text-[#0077B6]">{Math.round(scrollProgress * 100)}%</span>
              </div>
            </div>

            {/* 2. Main Impactful Headline */}
            <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-[2.6rem] xl:text-[3rem] font-black tracking-tight leading-[1.18] lg:leading-[1.12] text-[#0A192F]">
              Transforming <span className="text-gradient-electric">Digital Brands</span> & Modern Enterprises
            </h1>

            {/* 3. Scroll-Linked Dynamic Description */}
            <p className="text-[11.5px] xs:text-xs sm:text-sm font-medium leading-relaxed text-slate-600 line-clamp-2 sm:line-clamp-none min-h-[34px] xs:min-h-[38px] sm:min-h-[44px] transition-opacity duration-300">
              {currentCap.description}
            </p>

            {/* 4. Interactive 4-Phase Stage Indicator Pills */}
            <div className="flex items-center gap-1.5 pt-0.5">
              {CAPABILITIES.map((cap, idx) => (
                <button
                  key={cap.id}
                  onClick={() => setManualPhase(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeCapIndex === idx 
                      ? 'w-7 xs:w-8 bg-gradient-to-r from-[#0077B6] to-[#00B4D8]' 
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={cap.badge}
                  aria-label={`Show ${cap.badge}`}
                />
              ))}
              <span className="ml-auto text-[10px] xs:text-[11px] text-slate-400 font-semibold hidden xs:inline">
                Step {activeCapIndex + 1} of 4
              </span>
            </div>

            {/* 5. Streamlined Dual CTA Action Buttons */}
            <div className="flex flex-row items-center gap-2 xs:gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={onOpenQuote}
                className="flex-1 px-3 xs:px-4 sm:px-6 py-2.5 xs:py-3 sm:py-3.5 lg:py-4 rounded-full bg-gradient-to-r from-[#0A192F] via-[#0077B6] to-[#00B4D8] text-white font-bold text-xs xs:text-[13px] sm:text-sm flex items-center justify-center gap-1.5 xs:gap-2 shadow-[0_10px_25px_-5px_rgba(0,119,182,0.35)] hover:shadow-[0_15px_30px_rgba(0,119,182,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer shrink-0"
              >
                <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-200 animate-spin-slow shrink-0" />
                <span className="whitespace-nowrap">Get Instant Quote</span>
                <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              <a
                href="https://wa.me/919562896069"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 xs:px-4 sm:px-6 py-2.5 xs:py-3 sm:py-3.5 lg:py-4 rounded-full font-bold text-xs xs:text-[13px] sm:text-sm border flex items-center justify-center gap-1.5 xs:gap-2 transition-all bg-white hover:bg-blue-50/50 text-[#0A192F] border-slate-300/90 hover:border-[#0077B6] shadow-2xs hover:shadow-xs active:scale-[0.98] group cursor-pointer shrink-0"
              >
                <MessageSquare className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-600 group-hover:scale-110 transition-transform shrink-0" />
                <span className="whitespace-nowrap">WhatsApp Direct</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}



