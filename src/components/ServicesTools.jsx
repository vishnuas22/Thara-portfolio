import React, { useState } from 'react';
import { Terminal, Layers, Cpu, Code2, Copy, Check, Sliders, Play } from 'lucide-react';
import { playClick } from '../utils/audioEngine';

const codeSnippets = {
  'useDualLerp.ts': `// Proprietary Dual-Damped RAF Lerp Engine
import { useRef, useEffect } from 'react';

export function useDualDampedLerp(target: number, damping = 0.14) {
  const current = useRef(0);
  const rafId = useRef<number>();

  useEffect(() => {
    const loop = () => {
      const delta = target - current.current;
      if (Math.abs(delta) > 0.0005) {
        current.current += delta * damping;
      } else {
        current.current = target;
      }
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId.current!);
  }, [target, damping]);

  return Math.round(current.current);
}`,
  'CanvasEngine.ts': `// High-DPI Sub-Frame Canvas Covering
export function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
  const { width: cw, height: ch } = ctx.canvas;
  const { naturalWidth: iw, naturalHeight: ih } = img;
  
  const ratio = Math.max(cw / iw, ch / ih);
  const nw = Math.ceil(iw * ratio);
  const nh = Math.ceil(ih * ratio);
  
  ctx.drawImage(img, (cw - nw) / 2, (ch - nh) / 2, nw, nh);
}`,
  'tokens.css': `/* UGC B.Voc Architectural Design Tokens */
:root {
  --obsidian-base: #050608;
  --amber-rim: #f59e0b;
  --cyan-key: #2dd4bf;
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
}`,
};

const capabilities = [
  {
    code: 'CAP.01',
    title: 'FRONTEND ARCHITECTURE',
    desc: 'Engineering resilient, scalable web applications with React 19, TypeScript, and clean unidirectional data streams. Strict attention to modular component lifecycles.',
    icon: Code2,
    badge: 'Production Core',
    color: 'var(--rim-amber)',
  },
  {
    code: 'CAP.02',
    title: 'INTERACTION PHYSICS',
    desc: 'Creating buttery 60–120 FPS hardware-accelerated canvas animations, scroll-driven dual-lerp momentum scrubbers, and tactile micro-interactions.',
    icon: Layers,
    badge: 'Motion & Canvas',
    color: 'var(--key-cyan)',
  },
  {
    code: 'CAP.03',
    title: 'DESIGN ERGONOMICS & A11Y',
    desc: 'Architecting design tokens, scalable typography scales, and keyboard-first accessibility (WCAG 2.1 AA) that bridge Figma fidelity with code execution.',
    icon: Sliders,
    badge: 'Design Systems',
    color: '#ec4899',
  },
  {
    code: 'CAP.04',
    title: 'FULL-STACK & DISTRIBUTED APIS',
    desc: 'Synthesizing robust RESTful endpoints, WebSocket channels, relational schemas, and serverless edge functions for rapid real-time applications.',
    icon: Cpu,
    badge: 'Cloud & Systems',
    color: 'var(--rim-gold)',
  },
];

const techRadar = [
  { name: 'React 19 / 18', domain: 'Frontend', status: 'Core Stack' },
  { name: 'TypeScript', domain: 'Language', status: 'Core Stack' },
  { name: 'Next.js App Router', domain: 'Framework', status: 'Production' },
  { name: 'Figma (Tokens/Auto-layout)', domain: 'Ergonomics', status: 'Design Core' },
  { name: 'Canvas API & RAF', domain: 'Graphics', status: 'Advanced' },
  { name: 'Node.js & Express', domain: 'Backend', status: 'Production' },
  { name: 'Tailwind / Vanilla CSS', domain: 'Styling', status: 'Core Stack' },
  { name: 'PostgreSQL / MongoDB', domain: 'Data Stores', status: 'Production' },
  { name: 'Git / GitHub CI', domain: 'DevOps', status: 'Workflow' },
  { name: 'Vite & Rolldown', domain: 'Build Tooling', status: 'Advanced' },
  { name: 'REST & WebSockets', domain: 'Networking', status: 'Production' },
  { name: 'WCAG 2.1 AA Standards', domain: 'Compliance', status: 'Standard' },
];

export default function ServicesTools() {
  const [activeSnippet, setActiveSnippet] = useState('useDualLerp.ts');
  const [copiedCode, setCopiedCode] = useState(false);
  const [dampingVal, setDampingVal] = useState(0.14);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const copyCode = () => {
    playClick(1200, 0.03);
    navigator.clipboard.writeText(codeSnippets[activeSnippet]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="services" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '800px', marginBottom: '4.5rem' }}>
          <div className="eyebrow-micro">
            <span style={{ color: 'var(--key-cyan)' }}>SYS.03</span>
            <span>/</span>
            <span>VOCATIONAL ARCHITECTURE & RADAR</span>
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.12,
              color: '#ffffff',
              marginBottom: '1.2rem',
            }}
          >
            End-to-end web engineering tailored to{' '}
            <span className="font-serif gradient-text-amber" style={{ fontWeight: 400 }}>
              modern standards.
            </span>
          </h2>
          <p style={{ fontSize: '0.98rem', color: 'var(--text-dim)', lineHeight: 1.65 }}>
            Rooted in the UGC B.Voc Web Technology curriculum (60% hands-on software engineering, 40% computer science foundation). 
            Producing zero boilerplate shortcuts and 100% intentional craftsmanship.
          </p>
        </div>

        {/* 4 Architectural Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.8rem',
            marginBottom: '4.5rem',
          }}
        >
          {capabilities.map((cap, idx) => {
            const IconComp = cap.icon;
            return (
              <div
                key={idx}
                className="spotlight-card"
                onMouseMove={handleMouseMove}
                style={{ padding: '2.2rem', display: 'flex', flexDirection: 'column' }}
                data-cursor="CAPABILITY"
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.6rem',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComp size={20} color={cap.color} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--text-faint)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {cap.code}
                  </span>
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                    marginBottom: '0.8rem',
                  }}
                >
                  {cap.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', lineHeight: 1.6, flexGrow: 1 }}>
                  {cap.desc}
                </p>

                <div
                  style={{
                    marginTop: '1.6rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.64rem',
                      color: cap.color,
                      letterSpacing: '0.1em',
                    }}
                  >
                    • {cap.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive macOS Code Playground Showcase */}
        <div
          className="spotlight-card"
          onMouseMove={handleMouseMove}
          style={{
            padding: '0',
            marginBottom: '4rem',
            overflow: 'hidden',
            border: '1px solid rgba(226, 177, 112, 0.3)',
          }}
        >
          {/* macOS Terminal Window Top Bar */}
          <div
            style={{
              padding: '0.85rem 1.4rem',
              background: 'rgba(5, 7, 10, 0.95)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                thara-core-engine / src / hooks /
              </span>
            </div>

            {/* File Switcher Tabs */}
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {Object.keys(codeSnippets).map((filename) => (
                <button
                  key={filename}
                  onClick={() => {
                    playClick(1000, 0.03);
                    setActiveSnippet(filename);
                  }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: activeSnippet === filename ? 'var(--rim-gold)' : 'rgba(255, 255, 255, 0.06)',
                    background: activeSnippet === filename ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                    color: activeSnippet === filename ? '#ffffff' : 'var(--text-dim)',
                    cursor: 'pointer',
                  }}
                >
                  {filename}
                </button>
              ))}

              <button
                onClick={copyCode}
                className="btn-magnetic-ghost"
                style={{ padding: '0.3rem 0.75rem', fontSize: '0.66rem', fontFamily: 'var(--font-mono)' }}
                title="Copy snippet"
              >
                {copiedCode ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copiedCode ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Damping Adjustment Bar */}
          {activeSnippet === 'useDualLerp.ts' && (
            <div
              style={{
                padding: '0.6rem 1.4rem',
                background: 'rgba(245, 158, 11, 0.04)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--rim-gold)' }}>
                  INTERACTIVE DAMPING FACTOR:
                </span>
                <input
                  type="range"
                  min="0.05"
                  max="0.30"
                  step="0.01"
                  value={dampingVal}
                  onChange={(e) => setDampingVal(parseFloat(e.target.value))}
                  style={{ accentColor: 'var(--rim-amber)', cursor: 'ew-resize' }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ffffff', fontWeight: 700 }}>
                  {dampingVal.toFixed(2)}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-faint)' }}>
                [ REAL-TIME CANVAS VELOCITY SENSITIVITY ]
              </span>
            </div>
          )}

          {/* Code Body */}
          <pre
            style={{
              margin: 0,
              padding: '1.6rem 1.8rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              lineHeight: 1.68,
              color: '#e2e8f0',
              overflowX: 'auto',
              background: 'rgba(4, 5, 8, 0.95)',
            }}
          >
            <code>{codeSnippets[activeSnippet]}</code>
          </pre>
        </div>

        {/* Technical Taxonomy Grid */}
        <div
          className="spotlight-card"
          onMouseMove={handleMouseMove}
          style={{ padding: 'clamp(2rem, 3.5vw, 3rem)' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--rim-gold)',
                  letterSpacing: '0.14em',
                }}
              >
                SYSTEM TAXONOMY & PROFICIENCY RADAR
              </div>
              <h4
                className="font-display"
                style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginTop: '0.3rem' }}
              >
                Validated Production Stack
              </h4>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--text-faint)',
              }}
            >
              [ UGC B.VOC CURRICULAR BENCHMARKS • VERIFIED STANDARDS ]
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            {techRadar.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem 1.2rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.86rem', color: '#ffffff' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', marginTop: '0.15rem' }}>
                    {item.domain}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--key-cyan)',
                    background: 'rgba(45, 212, 191, 0.08)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(45, 212, 191, 0.2)',
                  }}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
