import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Eye } from 'lucide-react';

export default function Navbar({ isCinemaMode, setIsCinemaMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: '1.2rem',
        left: 0,
        width: '100%',
        zIndex: 100,
        pointerEvents: 'none',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        opacity: isCinemaMode ? 0 : 1,
        transform: isCinemaMode ? 'translateY(-20px)' : 'translateY(0)',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Floating Island Pill */}
        <div
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '1140px',
            padding: '0.65rem 1.4rem',
            background: scrolled ? 'rgba(7, 9, 12, 0.82)' : 'rgba(7, 9, 12, 0.58)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            border: '1px solid rgba(255, 255, 255, 0.09)',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.75), 0 0 20px rgba(245, 158, 11, 0.04)',
            transition: 'all 0.35s ease',
          }}
        >
          {/* Brand Monogram & Title */}
          <a
            href="#home"
            onClick={(e) => scrollTo(e, 'home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              color: '#ffffff',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(45, 212, 191, 0.2))',
                border: '1px solid rgba(226, 177, 112, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(245, 158, 11, 0.25)',
              }}
            >
              <span style={{ fontWeight: 800, fontSize: '0.75rem', color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
                TL
              </span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                }}
              >
                THARA LAKSHMI
              </div>
              <div
                style={{
                  fontSize: '0.62rem',
                  color: 'var(--rim-gold)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.14em',
                  fontWeight: 500,
                }}
              >
                B.VOC WEB TECHNOLOGY
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2rem',
            }}
            className="navbar-desktop-links"
          >
            <a href="#home" onClick={(e) => scrollTo(e, 'home')} className="nav-item">
              HOME
            </a>
            <a href="#work" onClick={(e) => scrollTo(e, 'work')} className="nav-item">
              WORK
            </a>
            <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="nav-item">
              SYSTEMS
            </a>
            <a href="#process" onClick={(e) => scrollTo(e, 'process')} className="nav-item">
              PROCESS
            </a>
            <a href="#testimonials" onClick={(e) => scrollTo(e, 'testimonials')} className="nav-item">
              PEERS
            </a>
          </nav>

          {/* Right Action Runway: Cinema + Connect */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Cinema Mode Quick Toggle */}
            <button
              onClick={() => setIsCinemaMode(true)}
              className="navbar-utility-btn"
              title="Inspect 240-frame sequence in Cinema Mode"
              aria-label="Cinema Mode"
            >
              <Eye size={13} color="var(--key-cyan)" />
              <span style={{ display: 'none' }} className="utility-label">
                CINEMA
              </span>
            </button>

            {/* Connect Pill */}
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, 'contact')}
              className="nav-cta-btn"
            >
              <span>CONNECT</span>
              <ArrowUpRight size={13} />
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="navbar-mobile-toggle"
              aria-label="Toggle Navigation"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '0.3rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            pointerEvents: 'auto',
            margin: '0.8rem 1.5rem 0 1.5rem',
            padding: '1.4rem',
            background: 'rgba(8, 10, 14, 0.95)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
          }}
        >
          <a href="#home" onClick={(e) => scrollTo(e, 'home')} className="nav-item">HOME</a>
          <a href="#work" onClick={(e) => scrollTo(e, 'work')} className="nav-item">WORK</a>
          <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="nav-item">SYSTEMS</a>
          <a href="#process" onClick={(e) => scrollTo(e, 'process')} className="nav-item">PROCESS</a>
          <a href="#testimonials" onClick={(e) => scrollTo(e, 'testimonials')} className="nav-item">PEERS</a>
          <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="btn-magnetic-primary" style={{ textAlign: 'center' }}>
            CONNECT WITH THARA
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .navbar-desktop-links { display: flex !important; }
          .utility-label { display: inline !important; }
          .navbar-mobile-toggle { display: none !important; }
        }
        .nav-item {
          color: var(--text-dim);
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          transition: color 0.25s ease;
          position: relative;
        }
        .nav-item:hover {
          color: #ffffff;
        }
        .navbar-utility-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.09);
          color: var(--text-dim);
          padding: 0.45rem 0.75rem;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .navbar-utility-btn:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.08);
        }
        .nav-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(226, 177, 112, 0.08);
          border: 1px solid rgba(226, 177, 112, 0.3);
          color: #ffffff;
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          font-family: var(--font-display);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-cta-btn:hover {
          background: rgba(245, 158, 11, 0.2);
          border-color: rgba(245, 158, 11, 0.6);
          box-shadow: 0 0 14px rgba(245, 158, 11, 0.35);
          transform: translateY(-1px);
        }
      `}</style>
    </header>
  );
}
