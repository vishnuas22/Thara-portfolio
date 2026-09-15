import React from 'react';
import { ArrowUpRight, Terminal, Eye } from 'lucide-react';

export default function Hero({ onEnterCinema }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        paddingTop: 'clamp(8rem, 16vh, 12rem)',
        paddingBottom: '3.5rem',
      }}
    >
      <div className="container" style={{ position: 'relative', width: '100%' }}>
        {/* Main Editorial Hero Block */}
        <div style={{ maxWidth: '840px' }}>
          {/* Swiss Eyebrow Micro-Label */}
          <div className="eyebrow-micro">
            <span style={{ color: 'var(--key-cyan)' }}>SYS.01</span>
            <span>/</span>
            <span>B.VOC WEB TECHNOLOGY & FRONTEND ARCHITECTURE</span>
          </div>

          {/* Headline with High-Contrast Editorial Display */}
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.8rem, 6.2vw, 5.2rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              marginBottom: '1.8rem',
              color: '#ffffff',
            }}
          >
            I build digital experiences that feel like{' '}
            <span className="font-serif gradient-text-amber" style={{ paddingRight: '0.15em', fontWeight: 400 }}>
              the future.
            </span>
          </h1>

          {/* Technical Thesis */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.35vw, 1.2rem)',
              color: 'var(--text-dim)',
              lineHeight: 1.65,
              fontWeight: 400,
              maxWidth: '640px',
              marginBottom: '2.8rem',
            }}
          >
            Merging engineering rigor with human-centered empathy. Specializing in modern React architecture, 
            sub-millisecond interaction physics, and accessible, production-grade web systems.
          </p>

          {/* Action Runway */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => scrollTo('work')}
              className="btn-magnetic-primary"
              data-cursor="EXPLORE"
            >
              <span>EXPLORE CASE STUDIES</span>
              <ArrowUpRight size={16} />
            </button>

            <button
              onClick={() => scrollTo('services')}
              className="btn-magnetic-ghost"
              data-cursor="INSPECT"
            >
              <span>SYSTEM ARCHITECTURE</span>
              <Terminal size={15} color="var(--rim-gold)" />
            </button>

            {/* Cinema Mode Direct Trigger */}
            <button
              onClick={() => {
                if (onEnterCinema) onEnterCinema();
              }}
              className="btn-magnetic-ghost"
              style={{
                borderColor: 'rgba(45, 212, 191, 0.25)',
                color: '#ffffff',
              }}
              title="Inspect 240-frame sequence in pure Cinema Mode"
              data-cursor="CINEMA"
            >
              <Eye size={14} color="var(--key-cyan)" />
              <span>CINEMA VIEW</span>
            </button>
          </div>
        </div>
      </div>

      {/* Docked Perimeter Telemetry Ribbon */}
      <div className="container" style={{ marginTop: 'auto', paddingTop: '3rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '1.6rem',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--rim-gold)', letterSpacing: '0.14em', marginBottom: '0.2rem' }}>
              ACADEMIC SPECIALIZATION
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
              B.Voc Web Technology
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.15rem' }}>
              UGC NSQF Level 7 • Distinction
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--key-cyan)', letterSpacing: '0.14em', marginBottom: '0.2rem' }}>
              INTERACTION ENGINE
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
              60–120 FPS Dual-Lerp
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.15rem' }}>
              240-Frame Canvas Sequence
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: '#ec4899', letterSpacing: '0.14em', marginBottom: '0.2rem' }}>
              ENGINEERING RIGOR
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
              WCAG 2.1 AA • 0ms CLS
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.15rem' }}>
              Lighthouse 99 • Production-Grade
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
