import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(5, 6, 9, 0.88)',
        backdropFilter: 'blur(20px)',
        padding: '3.5rem 0 2.5rem 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--rim-amber), var(--key-cyan))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  color: '#06070a',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                TL
              </div>
              <span
                className="font-display"
                style={{ fontWeight: 700, fontSize: '0.98rem', letterSpacing: '0.04em', color: '#ffffff' }}
              >
                THARA LAKSHMI
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
              B.Voc Web Technology • Modern Frontend & Systems Architect
            </p>
          </div>

          {/* Quick Nav Links */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <a href="#home" className="footer-link-item">HOME</a>
            <a href="#work" className="footer-link-item">WORK</a>
            <a href="#services" className="footer-link-item">SYSTEMS</a>
            <a href="#process" className="footer-link-item">PROCESS</a>
            <a href="#testimonials" className="footer-link-item">EVALS</a>
            <a href="#contact" className="footer-link-item">CONTACT</a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="btn-magnetic-ghost"
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>TOP</span>
            <ArrowUp size={13} />
          </button>
        </div>

        {/* Bottom Colophon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1.8rem',
            flexWrap: 'wrap',
            gap: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-faint)',
          }}
        >
          <div>
            © 2026 THARA LAKSHMI. ENGINEERED WITH REACT 19, VITE & 120 FPS DUAL-LERP CANVAS PHYSICS.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>NO TEMPLATES</span>
            <span>NO AI SLOP</span>
            <span>PROPRIETARY CRAFT</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link-item {
          color: var(--text-dim);
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          transition: color 0.2s ease;
        }
        .footer-link-item:hover {
          color: var(--rim-gold);
        }
      `}</style>
    </footer>
  );
}
