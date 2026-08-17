import React, { useEffect, useRef, useCallback } from 'react';
import { ArrowDown, ArrowUpRight, Compass, ShieldCheck, Trophy, ChevronDown, Sparkles } from 'lucide-react';

const TOTAL_FRAMES = 240;

// Premium Typography Storytelling Stages with Dedicated Spatial & Timeline Choreography
const HERO_STAGES = [
  {
    id: 'step-1',
    stepNumber: '01 / 03',
    stepLabel: 'Step 1 of 3',
    category: 'VISION & PURPOSE',
    icon: Compass,
    heading: 'Every Journey Begins with a Bold Step',
    subheading: 'Transforming initial ideas into clear digital direction and scalable market presence.',
    align: 'right',
    badgeTheme: {
      bg: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300',
      dot: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
    },
    timeline: [0.00, 0.05, 0.22, 0.28]
  },
  {
    id: 'step-2',
    stepNumber: '02 / 03',
    stepLabel: 'Step 2 of 3',
    category: 'RESILIENCE & DISTINCTION',
    icon: ShieldCheck,
    heading: 'Navigating the Uncharted',
    subheading: 'Standing out from the crowd and walking your own path to disruptive innovation and excellence.',
    align: 'left',
    badgeTheme: {
      bg: 'bg-sky-500/15 border-sky-400/30 text-sky-300',
      dot: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
    },
    timeline: [0.34, 0.40, 0.58, 0.64]
  },
  {
    id: 'step-3',
    stepNumber: '03 / 03',
    stepLabel: 'Step 3 of 3',
    category: 'MARKET LEADERSHIP',
    icon: Trophy,
    heading: 'Scaling to the Summit',
    subheading: 'Turning relentless ambition into enduring digital leadership, peak efficiency, and market dominance.',
    align: 'right',
    badgeTheme: {
      bg: 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-300/40 text-cyan-200',
      dot: 'bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]'
    },
    timeline: [0.70, 0.77, 0.96, 1.00],
    cta: 'Start Your Journey'
  }
];

export default function Hero({ onOpenQuote }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const fallbackImgRef = useRef(null);
  const progressBarRef = useRef(null);
  const hudBadgeRef = useRef(null);
  const hudActionRef = useRef(null);
  const mobileBadgeRef = useRef(null);
  const stageRefs = useRef([]);

  const imagesRef = useRef({});
  const lastValidImageRef = useRef(null);
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const animFrameIdRef = useRef(null);
  const isLoopRunningRef = useRef(false);
  const isMobileRef = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const loadingQueueRef = useRef(new Set());

  // Dynamic asset path resolver with WebP priority
  const getFramePath = useCallback((index, isMob) => {
    const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(index)));
    const pad = String(clamped).padStart(3, '0');
    const folder = isMob ? 'mobile_view' : 'webview';
    return `/assets/heroscection/${folder}/ezgif-frame-${pad}.webp`;
  }, []);

  // Frame loader with memory caching, deduplication & PNG fallback
  const loadSingleFrame = useCallback((index, isMob, onLoaded) => {
    if (imagesRef.current[index]?.complete && imagesRef.current[index]?.naturalWidth > 0) {
      if (onLoaded) onLoaded(imagesRef.current[index]);
      return;
    }

    const path = getFramePath(index, isMob);
    if (loadingQueueRef.current.has(path)) return;

    loadingQueueRef.current.add(path);
    const img = new Image();
    img.src = path;
    img.onload = () => {
      loadingQueueRef.current.delete(path);
      imagesRef.current[index] = img;
      if (onLoaded) onLoaded(img);
    };
    img.onerror = () => {
      loadingQueueRef.current.delete(path);
    };
  }, [getFramePath]);

  // High-DPI canvas frame rendering with cover math and fallback safety
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetCanvasW = Math.round(width * dpr);
    const targetCanvasH = Math.round(height * dpr);

    if (canvas.width !== targetCanvasW || canvas.height !== targetCanvasH) {
      canvas.width = targetCanvasW;
      canvas.height = targetCanvasH;
    }

    // 1. Retrieve exact frame if ready
    let img = imagesRef.current[frameIndex];

    // 2. If exact frame is not ready, search outward for closest loaded frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < 25; offset++) {
        const prevIdx = frameIndex - offset;
        if (prevIdx >= 1 && imagesRef.current[prevIdx]?.complete && imagesRef.current[prevIdx]?.naturalWidth > 0) {
          img = imagesRef.current[prevIdx];
          break;
        }
        const nextIdx = frameIndex + offset;
        if (nextIdx <= TOTAL_FRAMES && imagesRef.current[nextIdx]?.complete && imagesRef.current[nextIdx]?.naturalWidth > 0) {
          img = imagesRef.current[nextIdx];
          break;
        }
      }
    }

    // 3. Fallback to last valid rendered image or frame 1
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = lastValidImageRef.current || imagesRef.current[1];
    }

    // 4. Fallback element check
    if (!img || !img.complete || img.naturalWidth === 0) {
      if (fallbackImgRef.current && fallbackImgRef.current.complete && fallbackImgRef.current.naturalWidth > 0) {
        img = fallbackImgRef.current;
      } else {
        return;
      }
    }

    lastValidImageRef.current = img;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Solid dark background to prevent blank flicker
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, width, height);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

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

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  // Proximity preloader around current target
  const preloadProximityFrames = useCallback((centerFrame, isMob) => {
    const start = Math.max(1, centerFrame - 15);
    const end = Math.min(TOTAL_FRAMES, centerFrame + 15);
    for (let i = start; i <= end; i++) {
      if (!imagesRef.current[i]) {
        loadSingleFrame(i, isMob);
      }
    }
  }, [loadSingleFrame]);

  // Smooth lerp frame interpolation loop (Idles automatically when settled)
  const startAnimLoop = useCallback(() => {
    if (isLoopRunningRef.current) return;
    isLoopRunningRef.current = true;

    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.22;
        renderFrame(Math.round(currentFrameRef.current));
        animFrameIdRef.current = requestAnimationFrame(loop);
      } else {
        currentFrameRef.current = targetFrameRef.current;
        renderFrame(Math.round(currentFrameRef.current));
        isLoopRunningRef.current = false;
        animFrameIdRef.current = null;
      }
    };

    animFrameIdRef.current = requestAnimationFrame(loop);
  }, [renderFrame]);

  // Direct DOM Updates for Zero-Lag Scroll Performance
  const updateDOMOnScroll = useCallback((progress) => {
    // 1. Minimal Top Progress Bar
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    }

    // 2. Stage Typography Animations
    const isMob = isMobileRef.current;
    let activeIdx = 0;

    HERO_STAGES.forEach((stage, idx) => {
      const el = stageRefs.current[idx];
      if (!el) return;

      const [start, enterSettle, exitStart, end] = stage.timeline;

      if (progress < start || progress > end) {
        el.style.opacity = '0';
        el.style.transform = 'translate3d(0, 16px, 0) scale(0.97)';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
        return;
      }

      if (progress >= start && progress <= end) {
        activeIdx = idx;
      }

      let opacity = 1;
      let tY = 0;
      let scale = 1;

      if (progress < enterSettle) {
        const t = Math.max(0, Math.min(1, (progress - start) / (enterSettle - start)));
        const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
        opacity = ease;
        tY = (1 - ease) * (isMob ? 12 : 16);
        scale = 0.97 + 0.03 * ease;
      } else if (progress > exitStart && end < 1.0) {
        const t = Math.max(0, Math.min(1, (progress - exitStart) / (end - exitStart)));
        const ease = Math.pow(t, 3); // easeInCubic
        opacity = 1 - ease;
        tY = -ease * (isMob ? 10 : 14);
        scale = 1 - 0.02 * ease;
      }

      el.style.opacity = opacity.toFixed(3);
      el.style.transform = `translate3d(0, ${tY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
      el.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
      el.style.pointerEvents = opacity > 0.7 ? 'auto' : 'none';
    });

    // 3. Desktop HUD Updates
    if (hudBadgeRef.current) {
      hudBadgeRef.current.textContent = progress >= 0.90 ? 'Summit Reached' : `Step ${activeIdx + 1} of 3`;
    }
    if (hudActionRef.current) {
      hudActionRef.current.textContent = progress >= 0.90 ? 'Explore Capabilities' : 'Scroll to explore';
    }

    // 4. Mobile HUD Badge
    if (mobileBadgeRef.current) {
      mobileBadgeRef.current.textContent = `0${activeIdx + 1} / 03`;
    }
  }, []);

  // Progressive Preloading Engine (Multi-Tier Architecture)
  useEffect(() => {
    let isCancelled = false;
    const isMob = window.innerWidth < 768;
    isMobileRef.current = isMob;
    imagesRef.current = {};
    loadingQueueRef.current.clear();

    // Tier 0: Immediate load of first frame
    loadSingleFrame(1, isMob, (img) => {
      if (isCancelled) return;
      lastValidImageRef.current = img;
      renderFrame(1);
    });

    // Tier 1: Preload sparse keyframes (every 10 frames)
    for (let i = 10; i <= TOTAL_FRAMES; i += 10) {
      if (isCancelled) break;
      loadSingleFrame(i, isMob);
    }

    // Tier 2: Micro-batched background preloading
    const loadRemaining = async () => {
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) break;
        if (imagesRef.current[i]) continue;

        loadSingleFrame(i, isMob);

        if (i % 8 === 0) {
          await new Promise((res) => setTimeout(res, 20));
        }
      }
    };

    const timeoutId = setTimeout(loadRemaining, 60);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [loadSingleFrame, renderFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const isMob = window.innerWidth < 768;
      if (isMob !== isMobileRef.current) {
        isMobileRef.current = isMob;
      }
      renderFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // High-Performance Passive Scroll Listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
          if (totalScrollable <= 0) {
            ticking = false;
            return;
          }

          const scrolled = -rect.top;
          const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

          const targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + progress * (TOTAL_FRAMES - 1))));
          targetFrameRef.current = targetFrame;

          preloadProximityFrames(targetFrame, isMobileRef.current);
          updateDOMOnScroll(progress);
          startAnimLoop();

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [preloadProximityFrames, updateDOMOnScroll, startAnimLoop]);

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative w-full bg-slate-950 h-[380vh] sm:h-[400vh] lg:h-[420vh]"
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-slate-950">
        
        {/* Tier 0 Fallback Image */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 pointer-events-none bg-slate-950">
          <picture className="w-full h-full object-cover">
            <source media="(max-width: 767.98px)" srcSet="/assets/heroscection/mobile_view/ezgif-frame-001.webp" type="image/webp" />
            <source media="(min-width: 768px)" srcSet="/assets/heroscection/webview/ezgif-frame-001.webp" type="image/webp" />
            <img
              ref={fallbackImgRef}
              src="/assets/heroscection/webview/ezgif-frame-001.webp"
              alt="FourDouble Solutions Hero"
              className="w-full h-full object-cover select-none"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onLoad={() => renderFrame(1)}
            />
          </picture>
        </div>

        {/* High-Performance 240-Frame 3D Sequence Canvas */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 pointer-events-none gpu-layer bg-slate-950">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover bg-slate-950 will-change-transform"
          />
        </div>

        {/* Ambient Gradient Overlays for Legibility */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60 pointer-events-none z-10" />
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(2,6,23,0.7)_0%,_rgba(2,6,23,0.2)_45%,_transparent_75%)] pointer-events-none z-10" />
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(2,6,23,0.65)_0%,_rgba(2,6,23,0.18)_45%,_transparent_75%)] pointer-events-none z-10" />
        <div className="md:hidden absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none z-10" />

        {/* Minimalist Top Scroll Progress Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 h-[2.5px] bg-white/10 overflow-hidden pointer-events-none">
          <div 
            ref={progressBarRef}
            className="h-full w-full origin-left bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-cyan-300 shadow-[0_0_12px_rgba(0,180,216,0.9)] will-change-transform"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Desktop Scroll HUD */}
        <div 
          className="hidden md:flex absolute z-20 items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/65 backdrop-blur-md border border-white/10 text-xs text-white/90 pointer-events-none select-none bottom-[5%] left-[5%] lg:bottom-[6%] lg:left-[6%] shadow-xl"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span ref={hudBadgeRef} className="font-mono text-[11px] tracking-wider text-cyan-300 font-semibold uppercase">
            Step 1 of 3
          </span>
          <span className="text-white/30">•</span>
          <span className="text-[11px] text-slate-300 font-medium flex items-center gap-1">
            <span ref={hudActionRef}>Scroll to explore</span>
            <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
          </span>
        </div>

        {/* Mobile Minimal Step Badge */}
        <div className="md:hidden absolute top-[68px] left-4 z-20 pointer-events-none select-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/15 text-[10px] text-cyan-300 font-mono font-bold shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span ref={mobileBadgeRef}>01 / 03</span>
          </div>
        </div>

        {/* Direct DOM Controlled Staged Storytelling System */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none">
          {HERO_STAGES.map((stage, idx) => {
            const isLeft = stage.align === 'left';
            const Icon = stage.icon;

            const positionClasses = isLeft
              ? 'left-4 sm:left-8 md:left-[5%] lg:left-[7%] xl:left-[8%] bottom-6 sm:bottom-[8%] md:bottom-[9%] lg:bottom-[11%] items-start text-left'
              : 'right-4 sm:right-8 md:right-[5%] lg:right-[7%] xl:right-[8%] bottom-6 sm:bottom-[8%] md:bottom-[9%] lg:bottom-[11%] items-end text-right';

            return (
              <div
                key={stage.id}
                ref={(el) => (stageRefs.current[idx] = el)}
                className={`absolute flex flex-col max-w-[92vw] sm:max-w-xl md:max-w-xl lg:max-w-2xl xl:max-w-3xl will-change-[transform,opacity] ${positionClasses}`}
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  transform: 'translate3d(0, 0, 0) scale(1)',
                  visibility: idx === 0 ? 'visible' : 'hidden'
                }}
              >
                {/* 1. Category Pill Badge */}
                <div className="mb-1.5 sm:mb-2.5 inline-block">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full border backdrop-blur-md text-[9.5px] sm:text-[11px] font-mono font-bold tracking-wider uppercase shadow-lg ${stage.badgeTheme.bg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${stage.badgeTheme.dot}`} />
                    <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>{stage.category}</span>
                  </div>
                </div>

                {/* 2. Main Bold Headline */}
                <div className="w-full">
                  <h1 className="text-[1.4rem] xs:text-2xl sm:text-4xl md:text-[2.6rem] lg:text-[3.25rem] font-black text-white tracking-tight leading-[1.14] sm:leading-[1.12] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                    {stage.heading}
                  </h1>
                </div>

                {/* 3. Subheading / Narrative Description */}
                <div className="w-full mt-1 sm:mt-2.5">
                  <p className="text-[11.5px] xs:text-xs sm:text-base lg:text-lg font-normal text-slate-200/95 leading-snug sm:leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] max-w-sm sm:max-w-lg lg:max-w-xl">
                    {stage.subheading}
                  </p>
                </div>

                {/* 4. Interactive CTA Button */}
                {stage.cta && (
                  <div className="mt-3.5 sm:mt-5 pointer-events-auto">
                    <button
                      onClick={onOpenQuote}
                      className="group relative inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#0077B6] via-[#0096C7] to-[#00B4D8] text-white text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(0,180,216,0.45)] hover:shadow-[0_0_35px_rgba(0,180,216,0.75)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                      <span>{stage.cta}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
