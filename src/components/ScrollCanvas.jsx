import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Eye, EyeOff, Play, Pause, RotateCcw } from 'lucide-react';

const TOTAL_FRAMES = 240;

function getFrameUrl(index) {
  const paddedIndex = String(index + 1).padStart(4, '0');
  return `/frames/frame_${paddedIndex}.jpg`;
}

export default function ScrollCanvas({ scrollProgress, isCinemaMode, setIsCinemaMode, onManualScrub }) {
  const canvasRef = useRef(null);
  const timelineRailRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES));
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastRenderedFrameRef = useRef(-1);
  const isDraggingScrubber = useRef(false);

  const [loadPercent, setLoadPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFrameDisplay, setActiveFrameDisplay] = useState(0);

  // Update target frame when page scroll progress changes (if not dragging timeline)
  useEffect(() => {
    if (!isDraggingScrubber.current) {
      targetFrameRef.current = Math.min(TOTAL_FRAMES - 1, Math.max(0, scrollProgress * (TOTAL_FRAMES - 1)));
    }
  }, [scrollProgress]);

  // Render image covering canvas with high DPI & zero distortion
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Search nearest available loaded frame
    const frames = imagesRef.current;
    let img = frames[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = index - 1; i >= 0; i--) {
        if (frames[i] && frames[i].complete && frames[i].naturalWidth !== 0) {
          img = frames[i];
          break;
        }
      }
      if (!img) {
        for (let i = index + 1; i < TOTAL_FRAMES; i++) {
          if (frames[i] && frames[i].complete && frames[i].naturalWidth !== 0) {
            img = frames[i];
            break;
          }
        }
      }
    }

    if (!img || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);

    const nw = Math.ceil(iw * ratio);
    const nh = Math.ceil(ih * ratio);
    const nx = Math.floor((cw - nw) / 2);
    const ny = Math.floor((ch - nh) / 2);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, iw, ih, nx, ny, nw, nh);
  };

  // Handle Resize with High DPI Retina scaling
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    renderFrame(Math.round(currentFrameRef.current));
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    let isMounted = true;
    let loadedCount = 0;

    const preload = async () => {
      // 1. Immediately load frame 0
      const firstImg = new Image();
      firstImg.src = getFrameUrl(0);
      imagesRef.current[0] = firstImg;

      try {
        await firstImg.decode();
      } catch {
        await new Promise((res) => {
          firstImg.onload = res;
          firstImg.onerror = res;
        });
      }

      if (!isMounted) return;
      handleResize();
      renderFrame(0);
      loadedCount++;
      setLoadPercent(Math.round((loadedCount / TOTAL_FRAMES) * 100));

      // 2. Concurrency pool for remaining frames
      const CONCURRENCY = 16;
      let nextIndex = 1;

      const worker = async () => {
        while (nextIndex < TOTAL_FRAMES && isMounted) {
          const idx = nextIndex++;
          const img = new Image();
          img.src = getFrameUrl(idx);
          imagesRef.current[idx] = img;

          try {
            await img.decode();
          } catch {
            await new Promise((res) => {
              img.onload = res;
              img.onerror = res;
            });
          }

          if (!isMounted) return;
          loadedCount++;
          const p = Math.round((loadedCount / TOTAL_FRAMES) * 100);
          setLoadPercent(p);
        }
      };

      const workers = [];
      for (let i = 0; i < CONCURRENCY; i++) {
        workers.push(worker());
      }

      await Promise.all(workers);
      if (isMounted) {
        setIsLoaded(true);
      }
    };

    preload();

    // Smooth RAF Lerp loop
    let animId;
    let lastHudUpdate = 0;

    const animate = (time) => {
      const delta = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(delta) > 0.0005) {
        currentFrameRef.current += delta * 0.14;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameToRender = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameRef.current)));
      if (frameToRender !== lastRenderedFrameRef.current) {
        renderFrame(frameToRender);
        lastRenderedFrameRef.current = frameToRender;

        if (time - lastHudUpdate > 35) {
          setActiveFrameDisplay(frameToRender);
          lastHudUpdate = time;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Escape key exits Cinema Mode
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isCinemaMode) {
        toggleCinema();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(animId);
    };
  }, [isCinemaMode]);

  // Handle Drag & Click on Timeline Scrub Rail
  const handleTimelineScrub = useCallback((clientX) => {
    const rail = timelineRailRef.current;
    if (!rail) return;
    const rect = rail.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const targetIdx = frac * (TOTAL_FRAMES - 1);
    targetFrameRef.current = targetIdx;

    if (onManualScrub) {
      onManualScrub(frac);
    }
  }, [onManualScrub]);

  const onTimelineMouseDown = (e) => {
    isDraggingScrubber.current = true;
    handleTimelineScrub(e.clientX);

    const onMouseMove = (moveEvent) => {
      if (isDraggingScrubber.current) {
        handleTimelineScrub(moveEvent.clientX);
      }
    };

    const onMouseUp = () => {
      isDraggingScrubber.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const toggleCinema = () => {
    const nextState = !isCinemaMode;
    setIsCinemaMode(nextState);
  };

  const paddedFrame = String(activeFrameDisplay + 1).padStart(3, '0');
  const percentScrubbed = ((activeFrameDisplay / (TOTAL_FRAMES - 1)) * 100).toFixed(1);

  return (
    <>
      {/* Top preloader hairline */}
      <div className={`loader-track ${isLoaded ? 'loaded' : ''}`}>
        <div className="loader-bar" style={{ width: `${loadPercent}%` }} />
      </div>

      {/* Fixed Fullscreen Canvas */}
      <div className={`fixed-canvas-container ${isCinemaMode ? 'cinema-active' : ''}`}>
        <canvas ref={canvasRef} id="scroll-canvas" />
      </div>

      {/* Exit Cinema Mode Floating Top Button */}
      {isCinemaMode && (
        <div
          style={{
            position: 'fixed',
            top: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <button
            onClick={toggleCinema}
            className="btn-magnetic-primary"
            style={{
              padding: '0.65rem 1.4rem',
              fontSize: '0.78rem',
              boxShadow: '0 0 30px rgba(245, 158, 11, 0.6)',
            }}
          >
            <EyeOff size={15} />
            <span>EXIT CINEMA VIEW [ ESC ]</span>
          </button>
        </div>
      )}

      {/* Interactive Telemetry HUD & Timeline Scrub Rail */}
      <aside className="telemetry-hud interactive-hud" aria-label="Timeline Telemetry & Scrub Controller">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <span className="hud-dot" />
          <span style={{ color: '#f8fafc', fontWeight: 600 }}>TIMELINE</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>/</span>
          <span>[{paddedFrame}&thinsp;/&thinsp;{TOTAL_FRAMES}]</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>/</span>
          <span style={{ color: 'var(--rim-gold)', minWidth: '42px' }}>{percentScrubbed}%</span>
        </div>

        {/* Interactive Scrub Rail */}
        <div
          ref={timelineRailRef}
          onMouseDown={onTimelineMouseDown}
          className="timeline-rail"
          title="Click or drag to scrub 3D sequence"
          data-cursor="DRAG"
        >
          <div
            className="timeline-rail-fill"
            style={{ width: `${(activeFrameDisplay / (TOTAL_FRAMES - 1)) * 100}%` }}
          />
          <div
            className="timeline-rail-thumb"
            style={{ left: `${(activeFrameDisplay / (TOTAL_FRAMES - 1)) * 100}%` }}
          />
        </div>

        {/* Cinema Mode Toggle */}
        <button
          onClick={toggleCinema}
          className="hud-cinema-toggle"
          title={isCinemaMode ? 'Exit Cinema Mode (Esc)' : 'Enter Cinema Mode (Hide cards)'}
          aria-label="Toggle Cinema View"
        >
          {isCinemaMode ? <EyeOff size={13} /> : <Eye size={13} />}
          <span>{isCinemaMode ? 'EXIT' : 'CINEMA'}</span>
        </button>
      </aside>

      <style>{`
        .interactive-hud {
          pointer-events: auto !important;
          display: flex;
          align-items: center;
          gap: 1.2rem;
          padding: 0.55rem 1.1rem;
          transition: all 0.3s ease;
        }

        .timeline-rail {
          position: relative;
          width: 140px;
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          cursor: ew-resize;
          display: flex;
          align-items: center;
          transition: height 0.2s ease, width 0.2s ease;
        }
        .timeline-rail:hover {
          height: 10px;
          background: rgba(255, 255, 255, 0.15);
        }

        .timeline-rail-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--key-cyan), var(--rim-amber));
          border-radius: 9999px;
          pointer-events: none;
        }

        .timeline-rail-thumb {
          position: absolute;
          top: 50%;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 10px var(--rim-amber);
          transform: translate(-50%, -50%);
          pointer-events: none;
          transition: transform 0.1s ease;
        }
        .timeline-rail:hover .timeline-rail-thumb {
          transform: translate(-50%, -50%) scale(1.25);
        }

        .hud-cinema-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--text-dim);
          padding: 0.3rem 0.65rem;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .hud-cinema-toggle:hover {
          color: #ffffff;
          border-color: var(--rim-gold);
          background: rgba(245, 158, 11, 0.15);
        }

        @media (max-width: 768px) {
          .timeline-rail {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
