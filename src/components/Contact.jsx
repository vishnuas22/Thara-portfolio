import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, Check, Copy, Clock, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import { playClick } from '../utils/audioEngine';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [inquiryType, setInquiryType] = useState('Full-Time Role');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [liveTime, setLiveTime] = useState('');

  // Live IST Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setLiveTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyEmail = () => {
    playClick(1100, 0.03);
    navigator.clipboard.writeText('thara.lakshmi.webdev@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInquiryTypeSelect = (type) => {
    playClick(1000, 0.03);
    setInquiryType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    playClick(1200, 0.04);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="contact" style={{ padding: '7rem 0 9rem 0', position: 'relative' }}>
      <div className="container">
        {/* Large Architectural Split Terminal */}
        <div
          className="spotlight-card"
          onMouseMove={handleMouseMove}
          style={{
            padding: 'clamp(2rem, 5vw, 4rem)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
            gap: '4rem',
            position: 'relative',
          }}
          className="contact-split-grid"
        >
          {/* Left Column: Direct Inquiries & Telemetry */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="eyebrow-micro">
                <span style={{ color: 'var(--key-cyan)' }}>SYS.06</span>
                <span>/</span>
                <span>DIRECT INQUIRIES & AVAILABILITY</span>
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
                Let's build something{' '}
                <span className="font-serif gradient-text-amber" style={{ fontWeight: 400 }}>
                  meaningful together.
                </span>
              </h2>

              <p
                style={{
                  fontSize: '0.94rem',
                  color: 'var(--text-dim)',
                  lineHeight: 1.68,
                  marginBottom: '2.5rem',
                }}
              >
                Currently reviewing opportunities for full-time frontend engineering roles, B.Voc industrial 
                internships, and ambitious software collaborations.
              </p>

              {/* Direct Info Telemetry */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.8rem' }}>
                <div
                  onClick={copyEmail}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    padding: '0.75rem 1.2rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    width: 'fit-content',
                    transition: 'all 0.25s ease',
                  }}
                  className="email-pill-hover"
                  data-cursor="COPY"
                >
                  <Mail size={16} color="var(--rim-gold)" />
                  <span style={{ fontSize: '0.86rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                    thara.lakshmi.webdev@gmail.com
                  </span>
                  {copied ? (
                    <span style={{ fontSize: '0.68rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)' }}>
                      <Check size={12} /> COPIED
                    </span>
                  ) : (
                    <Copy size={13} color="var(--text-faint)" />
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: 'var(--text-dim)',
                    paddingLeft: '0.4rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={14} color="var(--key-cyan)" />
                    <span>Kerala, India</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={14} color="var(--rim-gold)" />
                    <span>{liveTime || 'IST (UTC +5:30)'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={14} color="#ec4899" />
                    <span>Remote / Hybrid</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="GitHub Profile"
                data-cursor="GITHUB"
              >
                <GithubIcon size={17} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="LinkedIn Profile"
                data-cursor="LINKEDIN"
              >
                <LinkedinIcon size={17} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="Twitter Profile"
                data-cursor="TWITTER"
              >
                <TwitterIcon size={17} />
              </a>
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <div
            style={{
              background: 'rgba(5, 7, 10, 0.75)',
              padding: 'clamp(1.8rem, 3vw, 2.5rem)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.07)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--key-cyan), var(--rim-amber))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.4rem auto',
                    boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)',
                  }}
                >
                  <Check size={28} color="#06070a" />
                </div>
                <h3
                  className="font-display"
                  style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}
                >
                  Transmission Confirmed
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: '360px', margin: '0 auto' }}>
                  Thank you, {formData.name}. Your note regarding <span style={{ color: 'var(--rim-gold)' }}>{inquiryType}</span> has been routed to Thara's primary inbox. Response expected within 24 hours.
                </p>
                <button
                  onClick={() => {
                    playClick(1000, 0.03);
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="btn-magnetic-ghost"
                  style={{ marginTop: '2rem' }}
                >
                  <span>TRANSMIT ANOTHER NOTE</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
                {/* Inquiry Type Pills */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.64rem',
                      fontWeight: 600,
                      color: 'var(--text-dim)',
                      letterSpacing: '0.1em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    INQUIRY CLASSIFICATION
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {['Full-Time Role', 'Internship', 'Project Collaboration', 'General Chat'].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => handleInquiryTypeSelect(t)}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          padding: '0.35rem 0.7rem',
                          borderRadius: '6px',
                          border: '1px solid',
                          borderColor: inquiryType === t ? 'var(--rim-gold)' : 'rgba(255, 255, 255, 0.08)',
                          background: inquiryType === t ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                          color: inquiryType === t ? '#ffffff' : 'var(--text-dim)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }} className="form-split-row">
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.66rem',
                        fontWeight: 600,
                        color: 'var(--text-dim)',
                        letterSpacing: '0.1em',
                        marginBottom: '0.45rem',
                      }}
                    >
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.66rem',
                        fontWeight: 600,
                        color: 'var(--text-dim)',
                        letterSpacing: '0.1em',
                        marginBottom: '0.45rem',
                      }}
                    >
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="elena@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      fontWeight: 600,
                      color: 'var(--text-dim)',
                      letterSpacing: '0.1em',
                      marginBottom: '0.45rem',
                    }}
                  >
                    INQUIRY / OPPORTUNITY DETAILS
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, engineering scope, or open role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-magnetic-primary"
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    justifyContent: 'center',
                    marginTop: '0.4rem',
                  }}
                  data-cursor="DISPATCH"
                >
                  {submitting ? (
                    <span>DISPATCHING...</span>
                  ) : (
                    <>
                      <span>DISPATCH INQUIRY</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .contact-split-grid {
            grid-template-columns: 1fr !important;
          }
          .form-split-row {
            grid-template-columns: 1fr !important;
          }
        }
        .form-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 10px;
          padding: 0.8rem 1rem;
          color: #ffffff;
          font-family: inherit;
          font-size: 0.86rem;
          transition: all 0.25s ease;
          outline: none;
        }
        .form-input:focus {
          border-color: var(--rim-gold);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.25);
        }
        .email-pill-hover:hover {
          background: rgba(255, 255, 255, 0.07) !important;
          border-color: rgba(226, 177, 112, 0.4) !important;
        }
        .social-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.09);
          display: flex;
          align-items: center;
          justifyContent: center;
          color: var(--text-dim);
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .social-btn:hover {
          color: #06070a;
          background: var(--rim-amber);
          border-color: var(--rim-amber);
          transform: translateY(-2px);
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.45);
        }
      `}</style>
    </section>
  );
}
