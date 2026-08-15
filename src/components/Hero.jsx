import React, { useState, useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 240;

const HERO_STAGES = [
  {
    id: 'step-1',
    stepNumber: '01 / 03',
    category: 'VISION & PURPOSE',
    heading: 'Every Journey Begins with a Bold Step',
    subheading: 'Transforming initial ideas into clear market direction.',
    range: [0, 0.30]
  },
  {
    id: 'step-2',
    stepNumber: '02 / 03',
    category: 'RESILIENCE & DISTINCTION',
    heading: 'Navigating the Uncharted',
    subheading: 'Standing out from the crowd and walking your own path to innovation.',
    range: [0.30, 0.70]
  },
  {
    id: 'step-3',
    stepNumber: '03 / 03',
    category: 'MARKET LEADERSHIP',
    heading: 'Scaling to the Summit',
    subheading: 'Turning relentless ambition into enduring digital leadership and market dominance.',
    range: [0.70, 1.0]
  }
];

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef({});
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const animFrameIdRef = useRef(null);
  const isMobileRef = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);

  // Helper to resolve dynamic asset path based on mobile vs desktop
  const getFramePath = useCallback((index, isMob) => {
    const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(index)));
    const pad = String(clamped).padStart(3, '0');
    const folder = isMob ? 'mobile_view' : 'webview';
    return `/assets/heroscection/${folder}/ezgif-frame-${pad}.png`;
  }, []);

  // High-DPI canvas frame rendering with cover/fill layout
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retrieve cached image or closest available keyframe
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

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

    // Full cover math for completely visible, unobstructed background
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

  // Progressive Preloading Engine (Mobile vs Webview aware)
  useEffect(() => {
    let isCancelled = false;
    const isMob = window.innerWidth < 768;
    isMobileRef.current = isMob;
    setIsMobileState(isMob);
    imagesRef.current = {};

    // 1. Load initial frame immediately for instant first paint
    const frame1 = new Image();
    frame1.src = getFramePath(1, isMob);
    frame1.onload = () => {
      if (isCancelled) return;
      imagesRef.current[1] = frame1;
      renderFrame(1);
    };

    // 2. Preload sparse keyframes for responsive scrubbing
    const keyframes = [];
    for (let i = 4; i <= TOTAL_FRAMES; i += 4) {
      keyframes.push(i);
    }

    keyframes.forEach((idx) => {
      const img = new Image();
      img.src = getFramePath(idx, isMob);
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[idx] = img;
      };
    });

    // 3. Sequentially load all remaining intermediate frames in micro-batches
    const loadRemaining = async () => {
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) break;
        if (imagesRef.current[i]) continue;

        const img = new Image();
        img.src = getFramePath(i, isMob);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[i] = img;
        };

        if (i % 8 === 0) {
          await new Promise((res) => setTimeout(res, 25));
        }
      }
    };

    const timeout = setTimeout(loadRemaining, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [getFramePath, renderFrame, isMobileState]);

  // Smooth lerp frame interpolation loop (60fps / 120fps)
  useEffect(() => {
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.03) {
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

  // Universal scroll listener
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

      // Determine active stage based on scroll progress milestones
      let activeIdx = 0;
      for (let i = 0; i < HERO_STAGES.length; i++) {
        const [start, end] = HERO_STAGES[i].range;
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
  }, []);

  // Helper to calculate seamless fade & subtle slide for each stage's typography
  const getStageTransitionStyle = (stageIndex) => {
    const [start, end] = HERO_STAGES[stageIndex].range;
    const fadeBuffer = 0.06;

    let opacity = 0;
    let translateY = 18;

    if (scrollProgress >= start - fadeBuffer && scrollProgress <= end + fadeBuffer) {
      if (scrollProgress < start) {
        // Entering from below as user scrolls down
        const progress = Math.max(0, Math.min(1, (scrollProgress - (start - fadeBuffer)) / fadeBuffer));
        // Smooth sine ease in
        opacity = Math.sin((progress * Math.PI) / 2);
        translateY = (1 - progress) * 18;
      } else if (scrollProgress > end) {
        // Exiting upward as user continues scrolling
        const progress = Math.max(0, Math.min(1, ((end + fadeBuffer) - scrollProgress) / fadeBuffer));
        opacity = Math.sin((progress * Math.PI) / 2);
        translateY = (1 - progress) * -18;
      } else {
        opacity = 1;
        translateY = 0;
      }
    }

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      transform: `translateY(${translateY.toFixed(2)}px)`,
      visibility: opacity > 0.01 ? 'visible' : 'hidden'
    };
  };

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative w-full bg-slate-950 h-[360vh] sm:h-[380vh] lg:h-[400vh]"
    >
      {/* Pinned Sticky Viewport: 100vh canvas animation with zero foreground blocking cards */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden">
        
        {/* Unobstructed High-Performance 240-Frame 3D Sequence Canvas */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 pointer-events-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 100% Full-Viewport Seamless Gradient Shade Overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/55 pointer-events-none z-10" />
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(2,6,23,0.7)_0%,_rgba(2,6,23,0.25)_45%,_transparent_75%)] pointer-events-none z-10" />

        {/* Minimal Top Scroll Progress Line */}
        <div className="absolute top-0 left-0 right-0 z-30 h-[2px] bg-white/10 overflow-hidden pointer-events-none">
          <div 
            className="h-full bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-cyan-300 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(0,180,216,0.8)]"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>

        {/* Bottom-Left Minimalist Scroll Indicator (Hidden on mobile devices) */}
        <div 
          className="hidden md:flex absolute z-20 items-center gap-2.5 text-xs text-white/80 pointer-events-none select-none bottom-[8%] left-[6%]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[11px] sm:text-xs tracking-wider text-cyan-300 font-semibold uppercase">
            Step {activeStageIndex + 1} of 3
          </span>
          <span className="text-white/40">•</span>
          <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Scroll to explore</span>
        </div>

        {/* Scroll-Linked Typography: Positioned lower towards bottom on mobile */}
        <div 
          className="absolute z-20 text-right w-full max-w-[92vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl pointer-events-none select-none bottom-3.5 sm:bottom-[8%] right-3.5 sm:right-[6%]"
        >
          <div className="relative min-h-[85px] sm:min-h-[130px] lg:min-h-[150px] flex flex-col justify-end items-end">
            {HERO_STAGES.map((stage, idx) => {
              const isCurrent = activeStageIndex === idx;
              const style = getStageTransitionStyle(idx);

              return (
                <div
                  key={stage.id}
                  style={style}
                  className={`w-full flex flex-col items-end gap-1 sm:gap-2.5 ${
                    isCurrent ? 'relative' : 'absolute bottom-0 right-0'
                  }`}
                >
                  {/* Main Bold Headline */}
                  <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.35rem] font-black text-white tracking-tight leading-[1.18] sm:leading-[1.15] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] max-w-2xl">
                    {stage.heading}
                  </h1>

                  {/* Subheading */}
                  <p className="text-[11.5px] xs:text-xs sm:text-base lg:text-lg font-normal leading-snug sm:leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-sm sm:max-w-lg lg:max-w-xl text-slate-200 mt-0.5 sm:mt-1">
                    {stage.subheading}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
