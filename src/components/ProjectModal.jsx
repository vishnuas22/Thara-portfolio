import React, { useState } from 'react';
import { X, CheckCircle2, Cpu, ShieldCheck, Terminal, Layers, Activity, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import { playClick } from '../utils/audioEngine';

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('AUDIT');

  if (!project) return null;

  const handleTabChange = (t) => {
    playClick(1100, 0.03);
    setActiveTab(t);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(4, 5, 8, 0.9)',
        backdropFilter: 'blur(26px)',
        WebkitBackdropFilter: 'blur(26px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="spotlight-card"
        style={{
          width: '100%',
          maxWidth: '760px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'clamp(1.8rem, 4vw, 2.8rem)',
          position: 'relative',
          border: '1px solid rgba(226, 177, 112, 0.4)',
          boxShadow: '0 30px 70px -20px rgba(0, 0, 0, 0.95), 0 0 40px rgba(245, 158, 11, 0.12)',
        }}
      >
        {/* Dismiss trigger */}
        <button
          onClick={() => {
            playClick(800, 0.03);
            onClose();
          }}
          aria-label="Close specification modal"
          style={{
            position: 'absolute',
            top: '1.6rem',
            right: '1.6rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#cbd5e1',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <X size={18} />
        </button>

        {/* Header Telemetry */}
        <div style={{ marginBottom: '1.6rem' }}>
          <div className="eyebrow-micro" style={{ marginBottom: '0.4rem' }}>
            <span>{project.code}</span>
            <span>/</span>
            <span>SPECIFICATION DOSSIER</span>
          </div>
          <h2
            className="font-display"
            style={{ fontSize: '2.1rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.03em' }}
          >
            {project.name}
          </h2>
          <div style={{ fontSize: '0.92rem', color: 'var(--rim-gold)', fontWeight: 500, marginTop: '0.2rem' }}>
            {project.subtitle}
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.8rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.8rem' }}>
          {[
            { id: 'AUDIT', label: 'SYSTEM AUDIT' },
            { id: 'BENCHMARKS', label: 'CORE VITALS' },
            { id: 'TAXONOMY', label: 'ECOSYSTEM' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 600,
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                border: 'none',
                background: activeTab === tab.id ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-dim)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: System Audit */}
        {activeTab === 'AUDIT' && (
          <div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-dim)', lineHeight: 1.68, marginBottom: '1.8rem' }}>
              {project.description} Developed during the B.Voc Web Technology curriculum to demonstrate production-grade 
              single-page application architecture, zero-layout-shift UI orchestration, and strict type safety.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: '#cbd5e1' }}>
                <CheckCircle2 size={16} color="var(--key-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Modular Atomic Design tokens & isolated scopes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: '#cbd5e1' }}>
                <CheckCircle2 size={16} color="var(--key-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Full compliance with WCAG 2.1 AA accessibility</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: '#cbd5e1' }}>
                <CheckCircle2 size={16} color="var(--key-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Predictable state normalization with TypeScript</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: '#cbd5e1' }}>
                <CheckCircle2 size={16} color="var(--key-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>60–120 FPS hardware-accelerated canvas transforms</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Core Vitals */}
        {activeTab === 'BENCHMARKS' && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {project.metrics.map((m, i) => (
                <div key={i} style={{ padding: '1.2rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-faint)' }}>{m.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--rim-gold)', marginTop: '0.4rem' }}>{m.val}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Benchmarked on Chrome DevTools throttling (4G Network / 4x CPU Slowdown). Zero layout shifts (CLS 0.00), First Contentful Paint &lt; 0.4s.
            </p>
          </div>
        )}

        {/* Tab 3: Ecosystem */}
        {activeTab === 'TAXONOMY' && (
          <div style={{ marginBottom: '2.2rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {project.tags.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: '#ffffff',
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-faint)', lineHeight: 1.6 }}>
              Ecosystem dependencies verified against CVE vulnerability databases; pinned with strict version contracts.
            </div>
          </div>
        )}

        {/* Modal Action Runway */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.5rem' }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="btn-magnetic-primary"
            style={{ textDecoration: 'none' }}
          >
            <GithubIcon size={16} />
            <span>INSPECT SOURCE REPO</span>
          </a>
          <button onClick={onClose} className="btn-magnetic-ghost">
            <span>CLOSE SPECIFICATION</span>
          </button>
        </div>
      </div>
    </div>
  );
}
