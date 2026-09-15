import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only activate on pointer devices (desktop / trackpad / mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check contextual hover target
      const target = e.target.closest('button, a, .spotlight-card, [data-cursor]');
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
        } else if (target.closest('.spotlight-card')) {
          setCursorText('VIEW');
        } else if (target.tagName === 'BUTTON' || target.tagName === 'A') {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth spring trailing ring animation
    let animId;
    const animateRing = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;

      ringPos.current.x += dx * 0.18;
      ringPos.current.y += dy * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(animateRing);
    };
    animId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  // Don't render on touchscreens
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Spring Trailing Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovered ? 'hovered' : ''} ${cursorText ? 'has-text' : ''}`}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </div>

      <style>{`
        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--rim-amber);
          box-shadow: 0 0 10px var(--rim-amber);
          pointer-events: none;
          z-index: 99999;
          margin-top: -3px;
          margin-left: -3px;
          transition: opacity 0.3s ease, transform 0.05s linear;
          will-change: transform;
        }

        .custom-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(226, 177, 112, 0.45);
          background: rgba(226, 177, 112, 0.03);
          pointer-events: none;
          z-index: 99998;
          margin-top: -18px;
          margin-left: -18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s ease,
                      background 0.3s ease,
                      opacity 0.3s ease;
          will-change: transform;
        }

        .custom-cursor-ring.hovered {
          width: 52px;
          height: 52px;
          margin-top: -26px;
          margin-left: -26px;
          border-color: var(--rim-amber);
          background: rgba(245, 158, 11, 0.08);
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.15);
        }

        .custom-cursor-ring.has-text {
          width: 64px;
          height: 64px;
          margin-top: -32px;
          margin-left: -32px;
          background: rgba(8, 10, 14, 0.85);
          border-color: var(--rim-gold);
          backdrop-filter: blur(8px);
        }

        .cursor-label {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          color: var(--rim-gold);
          letter-spacing: 0.12em;
          user-select: none;
        }

        @media (pointer: coarse) {
          .custom-cursor-dot,
          .custom-cursor-ring {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
