import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    align: 'right', // Desktop/Tablet right-aligned
    badgeTheme: {
      bg: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300',
      dot: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
    },
    // State 01: [entryStart, enterSettle, exitStart, exitComplete]
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
    align: 'left', // State 02: Alternates to Left side for dynamic visual rhythm
    badgeTheme: {
      bg: 'bg-sky-500/15 border-sky-400/30 text-sky-300',
      dot: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
    },
    // Separation Gap 1: 0.28 to 0.34
    // State 02: 0.34 to 0.63
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
    align: 'right', // State 03: Returns to Right for the grand finale
    badgeTheme: {
      bg: 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-300/40 text-cyan-200',
      dot: 'bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]'
    },
    // State 03 / Final Summit State: Settles smoothly and holds through sequence completion
    timeline: [0.70, 0.77, 0.96, 1.00],
    cta: 'Start Your Journey'
  }
];

// Helper: Calculate mathematical interpolation for opacity, translate, scale & blur
function calculateStageMotion(stage, progress, isMobile, staggerDelay = 0) {
  const [start, enterSettle, exitStart, end] = stage.timeline;

  // Stagger shifts start and enterSettle slightly for child elements (badge -> heading -> subheading -> CTA)
  const effStart = Math.min(enterSettle - 0.01, start + staggerDelay);
  const effEnter = Math.min(exitStart, enterSettle + staggerDelay);
  const effExitStart = Math.max(effEnter, exitStart + staggerDelay * 0.4);
  const effEnd = Math.min(1.0, end + staggerDelay * 0.4);

  if (progress < effStart || progress > effEnd) {
    return {
      opacity: 0,
      transform: 'translate3d(0, 18px, 0) scale(0.97)',
      filter: 'blur(3px)',
      visibility: 'hidden',
      pointerEvents: 'none'
    };
  }

  let opacity = 0;
  let tX = 0;
  let tY = 0;
  let scale = 1;
  let blur = 0;

  // Responsive translation distances: restrained on mobile, spacious on desktop
  const isLeft = stage.align === 'left';
  const baseHorizontalDist = isMobile ? (isLeft ? -12 : 12) : (isLeft ? -36 : 36);
  const baseVerticalDist = isMobile ? 12 : 16;

  if (progress < effEnter) {
    // 1. Entry Phase (smooth cubic ease-out)
    const span = effEnter - effStart;
    const rawT = span > 0 ? (progress - effStart) / span : 1;
    const t = Math.max(0, Math.min(1, rawT));
    const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic

    opacity = ease;
    tX = (1 - ease) * baseHorizontalDist;
    tY = (1 - ease) * baseVerticalDist;
    scale = 0.97 + 0.03 * ease;
    blur = (1 - ease) * 3;
  } else if (progress > effExitStart && effEnd < 1.0) {
    // 2. Exit Phase (smooth cubic ease-in)
    const span = effEnd - effExitStart;
    const rawT = span > 0 ? (progress - effExitStart) / span : 1;
    const t = Math.max(0, Math.min(1, rawT));
    const ease = Math.pow(t, 3); // easeInCubic

    opacity = 1 - ease;
    const exitX = isLeft ? 20 : -20;
    tX = ease * (isMobile ? exitX * 0.5 : exitX);
    tY = -ease * (isMobile ? 10 : 14);
    scale = 1 - 0.02 * ease;
    blur = ease * 3;
  } else {
    // 3. Steady Dominant Phase
    opacity = 1;
    tX = 0;
    tY = 0;
    scale = 1;
    blur = 0;
  }

  return {
    opacity: Math.max(0, Math.min(1, opacity)),
    transform: `translate3d(${tX.toFixed(2)}px, ${tY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`,
    filter: blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : 'none',
    visibility: opacity > 0.005 ? 'visible' : 'hidden',
    pointerEvents: opacity > 0.7 ? 'auto' : 'none',
    willChange: 'opacity, transform, filter'
  };
}

export default function Hero({ onOpenQuote }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const fallbackImgRef = useRef(null);
  const imagesRef = useRef({});
  const lastValidImageRef = useRef(null);
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const animFrameIdRef = useRef(null);
  const isMobileRef = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const loadingQueueRef = useRef(new Set());

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isMobileState, setIsMobileState] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [canvasReady, setCanvasReady] = useState(false);

  // Dynamic asset path resolver based on mobile (9:16 portrait) vs desktop (16:9 webview)
  const getFramePath = useCallback((index, isMob) => {
    const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(index)));
    const pad = String(clamped).padStart(3, '0');
    const folder = isMob ? 'mobile_view' : 'webview';
    return `/assets/heroscection/${folder}/ezgif-frame-${pad}.png`;
  }, []);

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
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
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

    // 4. If still nothing available, check fallback image element
    if (!img || !img.complete || img.naturalWidth === 0) {
      if (fallbackImgRef.current && fallbackImgRef.current.complete && fallbackImgRef.current.naturalWidth > 0) {
        img = fallbackImgRef.current;
      } else {
        return; // Retain current canvas content without clearing to prevent blank flicker
      }
    }

    lastValidImageRef.current = img;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Fill solid dark background to prevent any white canvas flash, border gaps, or transparency leaks
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, width, height);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

    // Cover math ensuring zero stretching and full screen presence
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

    if (!canvasReady) {
      setCanvasReady(true);
    }
  }, [canvasReady]);

  // Load a single frame with memory caching and deduplication
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

  // Progressive Preloading Engine (Multi-Tier Architecture)
  useEffect(() => {
    let isCancelled = false;
    const isMob = window.innerWidth < 768;
    isMobileRef.current = isMob;
    setIsMobileState(isMob);
    imagesRef.current = {};
    loadingQueueRef.current.clear();

    // Tier 0: Immediate load of first frame for instant first paint
    loadSingleFrame(1, isMob, (img) => {
      if (isCancelled) return;
      lastValidImageRef.current = img;
      renderFrame(1);
    });

    // Tier 1: Preload sparse keyframes (every 8 frames) for smooth initial scrubbing
    const keyframes = [];
    for (let i = 8; i <= TOTAL_FRAMES; i += 8) {
      keyframes.push(i);
    }

    keyframes.forEach((idx) => {
      if (isCancelled) return;
      loadSingleFrame(idx, isMob);
    });

    // Tier 2: Sequentially preload remaining intermediate frames in micro-batches
    const loadRemaining = async () => {
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) break;
        if (imagesRef.current[i]) continue;

        loadSingleFrame(i, isMob);

        if (i % 6 === 0) {
          await new Promise((res) => setTimeout(res, 20));
        }
      }
    };

    const timeoutId = setTimeout(loadRemaining, 80);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [loadSingleFrame, renderFrame, isMobileState]);

  // Proximity preloader: Preloads ±15 frames around current scroll target with high priority
  const preloadProximityFrames = useCallback((centerFrame, isMob) => {
    const start = Math.max(1, centerFrame - 15);
    const end = Math.min(TOTAL_FRAMES, centerFrame + 15);
    for (let i = start; i <= end; i++) {
      if (!imagesRef.current[i]) {
        loadSingleFrame(i, isMob);
      }
    }
  }, [loadSingleFrame]);

  // Smooth lerp frame interpolation loop (60fps / 120fps)
  useEffect(() => {
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.02) {
        currentFrameRef.current += diff * 0.18;
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

  // Window resize handler with breakpoint switch check
  useEffect(() => {
    const handleResize = () => {
      const isMob = window.innerWidth < 768;
      if (isMob !== isMobileRef.current) {
        isMobileRef.current = isMob;
        setIsMobileState(isMob);
      }
      renderFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Universal scroll listener & active stage tracking
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

      // Preload surrounding frames for seamless scrubbing
      preloadProximityFrames(targetFrame, isMobileRef.current);

      // Determine active milestone index for HUD badge
      let activeIdx = 0;
      for (let i = 0; i < HERO_STAGES.length; i++) {
        const [start, , , end] = HERO_STAGES[i].timeline;
        if (progress >= start && progress <= end) {
          activeIdx = i;
          break;
        } else if (progress > end) {
          activeIdx = i;
        }
      }
      setActiveStageIndex(activeIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [preloadProximityFrames]);

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative w-full bg-slate-950 h-[380vh] sm:h-[400vh] lg:h-[420vh]"
    >
      {/* Pinned Sticky Viewport: 100vh canvas animation with zero layout shifts and solid dark background */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-slate-950">
        
        {/* Tier 0 Fallback Image: Guarantees 0ms immediate paint before canvas/JS initializes */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 pointer-events-none bg-slate-950">
          <picture className="w-full h-full object-cover">
            <source media="(max-width: 767.98px)" srcSet="/assets/heroscection/mobile_view/ezgif-frame-001.png" />
            <img
              ref={fallbackImgRef}
              src="/assets/heroscection/webview/ezgif-frame-001.png"
              alt="FourDouble Solutions Hero"
              className="w-full h-full object-cover select-none"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onLoad={() => {
                if (!canvasReady) renderFrame(1);
              }}
            />
          </picture>
        </div>

        {/* High-Performance 240-Frame 3D Sequence Canvas */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 pointer-events-none gpu-layer bg-slate-950">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover bg-slate-950"
          />
        </div>

        {/* Cinematic Vignette & Ambient Gradient Overlays for High Text Legibility */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60 pointer-events-none z-10" />
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(2,6,23,0.7)_0%,_rgba(2,6,23,0.2)_45%,_transparent_75%)] pointer-events-none z-10" />
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(2,6,23,0.65)_0%,_rgba(2,6,23,0.18)_45%,_transparent_75%)] pointer-events-none z-10" />
        
        {/* Extra bottom gradient protection for mobile portrait readability */}
        <div className="md:hidden absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none z-10" />

        {/* Minimalist Top Scroll Progress Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 h-[2.5px] bg-white/10 overflow-hidden pointer-events-none">
          <div 
            className="h-full bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-cyan-300 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(0,180,216,0.9)]"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>

        {/* Bottom-Center/Left Desktop Scroll HUD */}
        <div 
          className="hidden md:flex absolute z-20 items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/65 backdrop-blur-md border border-white/10 text-xs text-white/90 pointer-events-none select-none bottom-[5%] left-[5%] lg:bottom-[6%] lg:left-[6%] shadow-xl"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="font-mono text-[11px] tracking-wider text-cyan-300 font-semibold uppercase">
            {scrollProgress >= 0.90 ? 'Summit Reached' : `Step ${activeStageIndex + 1} of 3`}
          </span>
          <span className="text-white/30">•</span>
          <span className="text-[11px] text-slate-300 font-medium flex items-center gap-1">
            {scrollProgress >= 0.90 ? 'Explore Capabilities' : 'Scroll to explore'}
            {scrollProgress >= 0.90 ? (
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            ) : (
              <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            )}
          </span>
        </div>

        {/* Mobile Minimal Step Badge */}
        <div className="md:hidden absolute top-[68px] left-4 z-20 pointer-events-none select-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/15 text-[10px] text-cyan-300 font-mono font-bold shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>0{activeStageIndex + 1} / 03</span>
          </div>
        </div>

        {/* 
          ========================================================================
          PREMIUM TYPOGRAPHY STORYTELLING SYSTEM
          Spatial Choreography:
          - State 01: Right-aligned (Desktop/Tablet) | Safe lower area (Mobile)
          - State 02 / Gap 1: Visual separation buffer
          - State 03: Left-aligned (Desktop/Tablet)  | Safe lower area (Mobile)
          - State 04 / Final State: Right-aligned with CTA (Desktop/Tablet/Mobile)
          ========================================================================
        */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none">
          {HERO_STAGES.map((stage, idx) => {
            const isLeft = stage.align === 'left';
            const Icon = stage.icon;

            // Staggered motion solvers for micro-reveal effect
            const badgeMotion = calculateStageMotion(stage, scrollProgress, isMobileState, 0.00);
            const headingMotion = calculateStageMotion(stage, scrollProgress, isMobileState, 0.015);
            const descMotion = calculateStageMotion(stage, scrollProgress, isMobileState, 0.03);
            const ctaMotion = calculateStageMotion(stage, scrollProgress, isMobileState, 0.045);

            // Responsive spatial positioning classes
            const positionClasses = isLeft
              ? 'left-4 sm:left-8 md:left-[5%] lg:left-[7%] xl:left-[8%] bottom-6 sm:bottom-[8%] md:bottom-[9%] lg:bottom-[11%] items-start text-left'
              : 'right-4 sm:right-8 md:right-[5%] lg:right-[7%] xl:right-[8%] bottom-6 sm:bottom-[8%] md:bottom-[9%] lg:bottom-[11%] items-end text-right';

            return (
              <div
                key={stage.id}
                className={`absolute flex flex-col max-w-[92vw] sm:max-w-xl md:max-w-xl lg:max-w-2xl xl:max-w-3xl transition-none ${positionClasses}`}
                aria-hidden={activeStageIndex !== idx}
              >
                {/* 1. Category Pill Badge */}
                <div 
                  style={badgeMotion}
                  className="mb-1.5 sm:mb-2.5 inline-block"
                >
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full border backdrop-blur-md text-[9.5px] sm:text-[11px] font-mono font-bold tracking-wider uppercase shadow-lg ${stage.badgeTheme.bg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${stage.badgeTheme.dot}`} />
                    <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>{stage.category}</span>
                  </div>
                </div>

                {/* 2. Main Bold Headline */}
                <div style={headingMotion} className="w-full">
                  <h1 className="text-[1.4rem] xs:text-2xl sm:text-4xl md:text-[2.6rem] lg:text-[3.25rem] font-black text-white tracking-tight leading-[1.14] sm:leading-[1.12] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                    {stage.heading}
                  </h1>
                </div>

                {/* 3. Subheading / Narrative Description */}
                <div style={descMotion} className="w-full mt-1 sm:mt-2.5">
                  <p className="text-[11.5px] xs:text-xs sm:text-base lg:text-lg font-normal text-slate-200/95 leading-snug sm:leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] max-w-sm sm:max-w-lg lg:max-w-xl">
                    {stage.subheading}
                  </p>
                </div>

                {/* 4. Interactive CTA Button (State 03 / Final Summit State) */}
                {stage.cta && (
                  <div style={ctaMotion} className="mt-3.5 sm:mt-5 pointer-events-auto">
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




