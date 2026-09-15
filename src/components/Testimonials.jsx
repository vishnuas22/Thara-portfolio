import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    code: 'EVAL.01',
    quote:
      'Thara combines deep frontend engineering discipline with a rare sensitivity for interaction physics. Her mastery of modern React state patterns and WCAG accessibility sets a benchmark in our vocational technology cohort.',
    name: 'Dr. Radhika Menon',
    role: 'Head of Web Technology Dept, Vocational Studies',
    dept: 'Academic Supervision',
    accent: 'var(--rim-amber)',
  },
  {
    quote:
      'Working alongside Thara during our university hackathon platform build was seamless. She architected our client components with zero layout shift and 60 FPS motion. An exceptional technical talent.',
    name: 'Arjun Varma',
    role: 'Lead Engineer & Hackathon Mentor',
    dept: 'Technical Collaboration',
    accent: 'var(--key-cyan)',
  },
  {
    quote:
      'Her ability to translate complex Figma design systems into pixel-perfect, accessible React code is world-class. She understands both the human psychology and the underlying DOM render tree.',
    name: 'Sneha Pillai',
    role: 'Product Designer, Roamia Project',
    dept: 'Interface Design',
    accent: '#ec4899',
  },
];

export default function Testimonials() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="testimonials" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '4rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div className="eyebrow-micro">
              <span style={{ color: 'var(--key-cyan)' }}>SYS.05</span>
              <span>/</span>
              <span>PEER & MENTOR EVALUATIONS</span>
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
              Stories from collaborators{' '}
              <span className="font-serif gradient-text-amber" style={{ fontWeight: 400 }}>
                I've built with.
              </span>
            </h2>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-faint)',
              letterSpacing: '0.1em',
            }}
          >
            [ VERIFIED VOCATIONAL & INDUSTRY REVIEWS ]
          </div>
        </div>

        {/* 3 Editorial Pull-Quote Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.2rem',
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="spotlight-card"
              onMouseMove={handleMouseMove}
              style={{
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.8rem',
                  }}
                >
                  <Quote size={24} color={t.accent} />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.64rem',
                      color: 'var(--text-faint)',
                    }}
                  >
                    {t.code}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#e2e8f0',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                    marginBottom: '2.2rem',
                  }}
                >
                  "{t.quote}"
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '1.4rem',
                }}
              >
                <div
                  className="font-display"
                  style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}
                >
                  {t.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--rim-gold)', marginTop: '0.2rem' }}>
                  {t.role}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.64rem',
                    color: 'var(--text-faint)',
                    marginTop: '0.25rem',
                  }}
                >
                  {t.dept}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
