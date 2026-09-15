import React, { useState } from 'react';
import { ArrowRight, TrendingUp, Sparkles, Compass, Check, ArrowUpRight, Activity } from 'lucide-react';

// Nexora Interactive Simulator
function NexoraSimulator() {
  const [interval, setInterval] = useState('1D');
  const [price, setPrice] = useState('$94,820.50');
  const [change, setChange] = useState('+4.25%');

  const chartPaths = {
    '1H': 'M 10 70 Q 60 40, 110 65 T 210 30 T 310 20',
    '1D': 'M 10 75 Q 80 85, 140 40 T 230 55 T 310 15',
    '1W': 'M 10 80 Q 70 20, 130 60 T 220 30 T 310 10',
  };

  const handleSelect = (e, i) => {
    e.stopPropagation();
    setInterval(i);
    if (i === '1H') {
      setPrice('$94,310.20');
      setChange('+1.12%');
    } else if (i === '1D') {
      setPrice('$94,820.50');
      setChange('+4.25%');
    } else {
      setPrice('$98,140.00');
      setChange('+8.90%');
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'rgba(5, 7, 10, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '0.9rem',
        marginBottom: '1.4rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-faint)' }}>BTC/USD TICKER</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>{price}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#10b981', fontWeight: 600 }}>{change}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '3px' }}>
          {['1H', '1D', '1W'].map((t) => (
            <button
              key={t}
              onClick={(e) => handleSelect(e, t)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                padding: '0.2rem 0.45rem',
                borderRadius: '4px',
                border: '1px solid',
                borderColor: interval === t ? 'var(--rim-amber)' : 'rgba(255, 255, 255, 0.06)',
                background: interval === t ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                color: interval === t ? '#ffffff' : 'var(--text-dim)',
                cursor: 'pointer',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <svg width="100%" height="55" viewBox="0 0 320 85" fill="none" style={{ overflow: 'visible' }}>
        <path d={chartPaths[interval]} stroke="url(#amberGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="50%" stopColor="#e2b170" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Mindful Interactive Simulator
function MindfulSimulator() {
  const [phase, setPhase] = useState('INHALE');

  const cyclePhase = (e) => {
    e.stopPropagation();
    setPhase((p) => (p === 'INHALE' ? 'HOLD' : p === 'HOLD' ? 'EXHALE' : 'INHALE'));
  };

  return (
    <div
      onClick={cyclePhase}
      style={{
        background: 'rgba(5, 7, 10, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '0.9rem',
        marginBottom: '1.4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
      title="Click to advance breathing rhythm"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--key-cyan) 0%, transparent 70%)',
            boxShadow: '0 0 16px rgba(45, 212, 191, 0.4)',
            animation: 'pulseLight 3s infinite ease-in-out',
          }}
        />
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-faint)' }}>BIOMETRIC PACER</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--key-cyan)' }}>
            {phase} [4s RHYTHM]
          </div>
        </div>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)', padding: '0.2rem 0.5rem', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '4px' }}>
        TAP TO ADVANCE
      </span>
    </div>
  );
}

// Roamia Interactive Simulator
function RoamiaSimulator() {
  const [activeCity, setActiveCity] = useState('ZURICH');

  const cities = [
    { name: 'TOKYO', km: '0 KM', cost: '$0' },
    { name: 'ZURICH', km: '9,560 KM', cost: '$680' },
    { name: 'REYKJAVIK', km: '12,240 KM', cost: '$940' },
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'rgba(5, 7, 10, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '0.9rem',
        marginBottom: '1.4rem',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-faint)', marginBottom: '0.5rem' }}>
        MULTIMODAL ROUTE SYNTHESIZER
      </div>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {cities.map((c) => (
          <button
            key={c.name}
            onClick={(e) => {
              e.stopPropagation();
              setActiveCity(c.name);
            }}
            style={{
              flex: 1,
              padding: '0.4rem 0.2rem',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: activeCity === c.name ? '#ec4899' : 'rgba(255, 255, 255, 0.07)',
              background: activeCity === c.name ? 'rgba(236, 72, 153, 0.15)' : 'rgba(255, 255, 255, 0.02)',
              color: activeCity === c.name ? '#ffffff' : 'var(--text-dim)',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', fontWeight: 700 }}>{c.name}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: activeCity === c.name ? '#ec4899' : 'var(--text-faint)', marginTop: '2px' }}>
              {c.cost}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

const projects = [
  {
    id: '01',
    code: 'SYS.NEXORA',
    categoryFilter: 'REACT',
    name: 'NEXORA',
    subtitle: 'High-Throughput Financial Analytics Engine',
    description: 'Ultra-low latency market visualization terminal built with React 19 and WebSockets. Features sub-frame candlestick updates, client-side portfolio rebalancing simulator, and custom canvas charting.',
    tags: ['React 19', 'TypeScript', 'WebSockets', 'Canvas Charting', 'Tailwind'],
    category: 'Full-Stack Architecture',
    metrics: [
      { label: 'RENDER LATENCY', val: '< 16ms' },
      { label: 'TYPE COVERAGE', val: '100% Strict' },
      { label: 'LIGHTHOUSE', val: '99 Score' },
    ],
    accent: 'var(--rim-amber)',
    icon: TrendingUp,
    renderSimulator: () => <NexoraSimulator />,
  },
  {
    id: '02',
    code: 'SYS.MINDFUL',
    categoryFilter: 'INTERACTION',
    name: 'MINDFUL',
    subtitle: 'Cognitive Health & Biometric Tracking Platform',
    description: 'Evidence-based psychiatric reflection app engineered with tokenized design ergonomics. Combines guided journaling workflows with smooth SVG micro-physics and strict WCAG 2.1 AA accessibility compliance.',
    tags: ['UI/UX Ergonomics', 'React', 'Framer Physics', 'Node.js', 'Design Tokens'],
    category: 'Ergonomic Interface Design',
    metrics: [
      { label: 'A11Y AUDIT', val: 'WCAG 2.1 AA' },
      { label: 'ANIMATION', val: '120 FPS' },
      { label: 'USER RATING', val: '4.95 / 5' },
    ],
    accent: 'var(--key-cyan)',
    icon: Sparkles,
    renderSimulator: () => <MindfulSimulator />,
  },
  {
    id: '03',
    code: 'SYS.ROAMIA',
    categoryFilter: 'DISTRIBUTED',
    name: 'ROAMIA',
    subtitle: 'Geospatial Travel & Itinerary Engine',
    description: 'Dynamic multimodal route synthesis engine integrating Mapbox GL, Next.js App Router, and relational trip graph storage. Features instant multi-city budget calculation and offline itinerary sync.',
    tags: ['Next.js 15', 'REST APIs', 'PostgreSQL', 'Mapbox GL', 'Edge Functions'],
    category: 'Distributed Applications',
    metrics: [
      { label: 'ROUTE CACHING', val: 'Edge ISR' },
      { label: 'CLS SHIFT', val: '0.000' },
      { label: 'DATA INTEGRATION', val: 'REST & GraphQL' },
    ],
    accent: '#ec4899',
    icon: Compass,
    renderSimulator: () => <RoamiaSimulator />,
  },
];

export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('ALL');

  const filteredProjects = filter === 'ALL' 
    ? projects 
    : projects.filter((p) => p.categoryFilter === filter);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleFilterClick = (f) => {
    setFilter(f);
  };

  return (
    <section id="work" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div className="eyebrow-micro">
              <span style={{ color: 'var(--key-cyan)' }}>SYS.02</span>
              <span>/</span>
              <span>ENGINEERED CASE STUDIES</span>
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
              Designing impact through{' '}
              <span className="font-serif gradient-text-amber" style={{ fontWeight: 400 }}>
                meaningful solutions.
              </span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: 'ALL [3]' },
              { id: 'REACT', label: 'REACT 19' },
              { id: 'INTERACTION', label: 'MOTION & CANVAS' },
              { id: 'DISTRIBUTED', label: 'DISTRIBUTED APIS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterClick(tab.id)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: filter === tab.id ? 'var(--rim-gold)' : 'rgba(255, 255, 255, 0.08)',
                  background: filter === tab.id ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: filter === tab.id ? '#ffffff' : 'var(--text-dim)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Case Studies Grid with Live Interactive Widgets */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.2rem',
          }}
        >
          {filteredProjects.map((proj) => {
            const IconComp = proj.icon;
            return (
              <article
                key={proj.id}
                className="spotlight-card"
                onMouseMove={handleMouseMove}
                onClick={() => {
                  if (onSelectProject) onSelectProject(proj);
                }}
                style={{
                  padding: '2.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                data-cursor="SPEC"
              >
                {/* Micro Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.2rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: proj.accent,
                      letterSpacing: '0.15em',
                      fontWeight: 600,
                    }}
                  >
                    {proj.code}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      color: 'var(--text-faint)',
                    }}
                  >
                    {proj.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.35rem',
                  }}
                >
                  {proj.name}
                </h3>
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--rim-gold)',
                    fontWeight: 500,
                    marginBottom: '1.2rem',
                  }}
                >
                  {proj.subtitle}
                </div>

                {/* Live Interactive Simulator Widget */}
                {proj.renderSimulator()}

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.86rem',
                    color: 'var(--text-dim)',
                    lineHeight: 1.6,
                    marginBottom: '1.6rem',
                    flexGrow: 1,
                  }}
                >
                  {proj.description}
                </p>

                {/* Metric Telemetry Badges */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.6rem',
                    padding: '0.85rem 0.6rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.025)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    marginBottom: '1.6rem',
                  }}
                >
                  {proj.metrics.map((m, idx) => (
                    <div key={idx} style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.58rem',
                          color: 'var(--text-faint)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {m.label}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: '#ffffff',
                          marginTop: '0.15rem',
                        }}
                      >
                        {m.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Row: Tech Tags + Detail Trigger */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '1.4rem',
                    marginTop: 'auto',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', maxWidth: '80%' }}>
                    {proj.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.64rem',
                          color: 'var(--text-dim)',
                          background: 'rgba(255, 255, 255, 0.03)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(255, 255, 255, 0.07)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      transition: 'all 0.3s ease',
                    }}
                    className="arrow-circle-trigger"
                  >
                    <ArrowRight size={15} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .spotlight-card:hover .arrow-circle-trigger {
          background: var(--rim-amber) !important;
          color: #06070a !important;
          transform: rotate(-45deg);
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.5);
        }
      `}</style>
    </section>
  );
}
