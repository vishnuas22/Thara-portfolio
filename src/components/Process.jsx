import React from 'react';
import { Compass, Target, Code, Cpu, ShieldCheck } from 'lucide-react';

const steps = [
  {
    num: '01',
    phase: 'PHASE.DISCOVERY',
    title: 'USER MODELING',
    desc: 'Uncovering mental models, mapping critical interaction friction, and scoping technical feasibility.',
    icon: Compass,
    accent: 'var(--key-cyan)',
  },
  {
    num: '02',
    phase: 'PHASE.SPECS',
    title: 'SYSTEM ARCHITECTURE',
    desc: 'Structuring modular component trees, state boundaries, data pipelines, and database entity schemas.',
    icon: Target,
    accent: 'var(--rim-gold)',
  },
  {
    num: '03',
    phase: 'PHASE.TOKENS',
    title: 'DESIGN ERGONOMICS',
    desc: 'Establishing unified Figma design tokens, spatial spacing grids, typographic rhythm, and motion curves.',
    icon: Cpu,
    accent: '#ec4899',
  },
  {
    num: '04',
    phase: 'PHASE.BUILD',
    title: 'REACT IMPLEMENTATION',
    desc: 'Writing clean, type-safe React 19 code with sub-frame render optimizations and 120 FPS canvas scrubbers.',
    icon: Code,
    accent: 'var(--rim-amber)',
  },
  {
    num: '05',
    phase: 'PHASE.VERIFY',
    title: 'AUDITS & DEPLOY',
    desc: 'Automating CI/CD pipelines, WCAG 2.1 AA accessibility audits, and sub-100ms Core Web Vitals tuning.',
    icon: ShieldCheck,
    accent: '#10b981',
  },
];

export default function Process() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="process" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 5rem auto' }}>
          <div className="eyebrow-micro" style={{ justifyContent: 'center' }}>
            <span style={{ color: 'var(--key-cyan)' }}>SYS.04</span>
            <span>/</span>
            <span>HUMAN-CENTERED METHODOLOGY</span>
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.12,
              color: '#ffffff',
            }}
          >
            A disciplined approach to{' '}
            <span className="font-serif gradient-text-amber" style={{ fontWeight: 400 }}>
              digital craftsmanship.
            </span>
          </h2>
        </div>

        {/* 5-Step Laser Architectural Runway */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.4rem',
            position: 'relative',
          }}
        >
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="spotlight-card"
                onMouseMove={handleMouseMove}
                style={{
                  padding: '2.2rem 1.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {/* Node Indicator */}
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
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComp size={18} color={step.accent} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: step.accent,
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--text-faint)',
                    letterSpacing: '0.12em',
                    marginBottom: '0.4rem',
                  }}
                >
                  {step.phase}
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                    marginBottom: '0.8rem',
                  }}
                >
                  {step.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
