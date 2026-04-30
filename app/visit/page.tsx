'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] },
  }),
};

const serviceSchedule = [
  {
    day: 'SUNDAY WORSHIP',
    icon: '☀️',
    times: [
      { time: '9:00 AM', label: 'Traditional Service' },
      { time: '11:00 AM', label: 'Contemporary Flow' },
    ],
  },
  {
    day: 'WEDNESDAY NIGHT',
    icon: '📖',
    times: [{ time: '7:00 PM', label: 'Bible Study & Prayer' }],
  },
  {
    day: 'FRIDAY',
    icon: '🙏',
    times: [{ time: '7:00 PM', label: 'Prayer Meeting' }],
  },
  {
    day: 'YOUTH MINISTRY',
    icon: '⚡',
    times: [{ time: 'Saturdays 4:00 PM', label: '' }],
  },
];

const subjectOptions = [
  'General Inquiry',
  'Plan a Visit',
  'Prayer Request',
  'Join a Ministry',
];

export default function VisitPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface)' }}>
      <Header />

      <main style={{ paddingTop: '5rem' }}>
        {/* ─── Hero Section ─── */}
        <section
          style={{
            position: 'relative',
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--primary)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'var(--primary-container)',
              opacity: 0.15,
              filter: 'blur(100px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-20%',
              left: '-5%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'var(--secondary-container)',
              opacity: 0.08,
              filter: 'blur(80px)',
              pointerEvents: 'none',
            }}
          />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              color: 'var(--white)',
              padding: 'var(--space-4xl) var(--space-xl)',
              maxWidth: '800px',
            }}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              style={{
                display: 'inline-block',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase' as const,
                color: 'var(--secondary-light)',
                marginBottom: 'var(--space-lg)',
                padding: 'var(--space-xs) var(--space-lg)',
                border: '1px solid rgba(233, 195, 73, 0.3)',
                borderRadius: 'var(--radius-full)',
              }}
            >
              Plan Your Visit
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: 'var(--space-xl)',
              }}
            >
              Welcome Home.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                fontWeight: 400,
                lineHeight: 1.8,
                opacity: 0.85,
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              Whether it&apos;s your first time or you&apos;re finding your way back,
              there&apos;s a place for you here. Come as you are &mdash; you belong.
            </motion.p>
          </motion.div>

          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '80px',
              background: 'linear-gradient(to top, var(--surface), transparent)',
              pointerEvents: 'none',
            }}
          />
        </section>

        {/* ─── Bento Grid: Service Times + Location ─── */}
        <section
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'var(--space-5xl) var(--space-xl)',
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-4xl)' }}
          >
            <motion.span className="section-label visit-section-label" variants={fadeUp} custom={0}
              style={{ paddingLeft: 0 }}
            >
              Join Us
            </motion.span>
            <motion.h2 className="section-title" variants={fadeUp} custom={1}>
              Find Your Time &amp; Place
            </motion.h2>
          </motion.div>

          <div
            className="visit-bento-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '5fr 7fr',
              gap: 'var(--space-xl)',
              alignItems: 'stretch',
            }}
          >
            {/* Service Times Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={scaleIn}
              custom={0}
              style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-2xl)',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--outline-variant)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-lg)',
              }}
            >
              <div style={{ marginBottom: 'var(--space-sm)' }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase' as const,
                    color: 'var(--secondary)',
                  }}
                >
                  Service Times
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    marginTop: 'var(--space-xs)',
                  }}
                >
                  Gather With Us
                </h3>
              </div>

              {serviceSchedule.map((svc, idx) => (
                <motion.div
                  key={svc.day}
                  variants={fadeUp}
                  custom={idx * 0.5}
                  style={{
                    padding: 'var(--space-md) var(--space-lg)',
                    background: idx === 0 ? 'var(--primary-fixed)' : 'var(--surface)',
                    borderRadius: 'var(--radius-lg)',
                    borderLeft: idx === 0 ? '3px solid var(--primary)' : '3px solid transparent',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-sm)',
                      marginBottom: svc.times[0].label ? 'var(--space-sm)' : 0,
                    }}
                  >
                    <span style={{ fontSize: '1rem' }}>{svc.icon}</span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase' as const,
                        color: 'var(--primary)',
                      }}
                    >
                      {svc.day}
                    </span>
                  </div>
                  {svc.times.map((t) => (
                    <div
                      key={t.time}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-md)',
                        paddingLeft: '1.75rem',
                        marginTop: 'var(--space-xs)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontWeight: 700,
                          fontSize: '0.92rem',
                          color: 'var(--primary)',
                          minWidth: t.label ? '90px' : 'auto',
                        }}
                      >
                        {t.time}
                      </span>
                      {t.label && (
                        <>
                          <span
                            style={{
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              background: 'var(--secondary)',
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: '0.85rem',
                              color: 'var(--on-surface-variant)',
                            }}
                          >
                            {t.label}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </motion.div>
              ))}
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={scaleIn}
              custom={1}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                minHeight: '480px',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'url(/ckspc-photos/97b65d_898e5de6fb484e80a4b783c59d8bc950.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,6,102,0.1) 0%, rgba(0,6,102,0.65) 70%, rgba(0,6,102,0.85) 100%)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'var(--space-2xl)',
                  zIndex: 1,
                  color: 'var(--white)',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    padding: 'var(--space-xs) var(--space-md)',
                    borderRadius: 'var(--radius-full)',
                    marginBottom: 'var(--space-md)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                  }}
                >
                  <span style={{ fontSize: '0.65rem' }}>📍</span>
                  Main Campus
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  Baba Yara, Madina
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    opacity: 0.8,
                    marginBottom: 'var(--space-xl)',
                  }}
                >
                  Accra, Ghana
                </p>

                <a
                  href="https://maps.google.com/?q=Baba+Yara+Madina+Accra+Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    padding: 'var(--space-md) var(--space-2xl)',
                    background: 'var(--white)',
                    color: 'var(--primary)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    borderRadius: 'var(--radius-full)',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 8px 30px rgba(0,6,102,0.15)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,6,102,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,6,102,0.15)';
                  }}
                >
                  Get Directions
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Thread Connector ─── */}
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            height: '100px',
            position: 'relative',
            overflow: 'visible',
          }}
          aria-hidden="true"
        >
          <svg
            preserveAspectRatio="none"
            viewBox="0 0 1000 100"
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              height: '100%',
            }}
          >
            <path
              d="M 0,10 C 200,90 400,10 500,50 C 600,90 800,10 1000,90"
              stroke="var(--outline-variant)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="10 10"
              opacity="0.4"
            />
            <circle cx="500" cy="50" r="4" fill="var(--secondary)" opacity="0.5" />
          </svg>
        </div>

        {/* ─── Contact / Reach Out Section ─── */}
        <section
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'var(--space-4xl) var(--space-xl) var(--space-5xl)',
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-4xl)' }}
          >
            <motion.span className="section-label visit-section-label" variants={fadeUp} custom={0}
              style={{ paddingLeft: 0 }}
            >
              Get In Touch
            </motion.span>
            <motion.h2 className="section-title" variants={fadeUp} custom={1}>
              Reach Out
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              style={{
                fontSize: '1.02rem',
                color: 'var(--on-surface-variant)',
                lineHeight: 1.7,
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              Have questions or want to know more before your visit? We&apos;d love to hear from you.
            </motion.p>
          </motion.div>

          <div
            className="visit-contact-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-2xl)',
              alignItems: 'start',
            }}
          >
            {/* Contact Form */}
            <motion.form
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={scaleIn}
              custom={0}
              onSubmit={handleSubmit}
              style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-2xl)',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--outline-variant)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-lg)',
              }}
            >
              <div className="visit-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                  <label
                    htmlFor="firstName"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase' as const,
                      color: 'var(--on-surface-variant)',
                    }}
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    style={{
                      padding: 'var(--space-md)',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--outline-variant)',
                      fontSize: '0.92rem',
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--on-surface)',
                      background: 'var(--surface)',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,6,102,0.08)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--outline-variant)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    placeholder="John"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                  <label
                    htmlFor="lastName"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase' as const,
                      color: 'var(--on-surface-variant)',
                    }}
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    style={{
                      padding: 'var(--space-md)',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--outline-variant)',
                      fontSize: '0.92rem',
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--on-surface)',
                      background: 'var(--surface)',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,6,102,0.08)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--outline-variant)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <label
                  htmlFor="email"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    color: 'var(--on-surface-variant)',
                  }}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    padding: 'var(--space-md)',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--outline-variant)',
                    fontSize: '0.92rem',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--on-surface)',
                    background: 'var(--surface)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,6,102,0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--outline-variant)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  placeholder="john@example.com"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <label
                  htmlFor="subject"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    color: 'var(--on-surface-variant)',
                  }}
                >
                  Subject
                </label>
                <select
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    padding: 'var(--space-md)',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--outline-variant)',
                    fontSize: '0.92rem',
                    fontFamily: 'var(--font-sans)',
                    color: formData.subject ? 'var(--on-surface)' : 'var(--outline)',
                    background: 'var(--surface)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none' as const,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23767683' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '2.5rem',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,6,102,0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--outline-variant)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <option value="" disabled>
                    Select a subject...
                  </option>
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <label
                  htmlFor="message"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    color: 'var(--on-surface-variant)',
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    padding: 'var(--space-md)',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--outline-variant)',
                    fontSize: '0.92rem',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--on-surface)',
                    background: 'var(--surface)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    outline: 'none',
                    resize: 'vertical' as const,
                    minHeight: '120px',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,6,102,0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--outline-variant)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="btn-cta"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: 'var(--space-lg) var(--space-2xl)',
                  fontSize: '0.88rem',
                  marginTop: 'var(--space-sm)',
                }}
              >
                {submitted ? '✓  Message Sent!' : 'Send Message'}
                {!submitted && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
                  </svg>
                )}
              </button>
            </motion.form>

            {/* Right: Image + Direct Contact Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={scaleIn}
              custom={1}
              style={{ position: 'relative' }}
            >
              <div
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  height: '100%',
                  minHeight: '540px',
                  position: 'relative',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                      'url(/ckspc-photos/97b65d_933ca15b1db34bb6aaa5f1251e79cb77.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(135deg, rgba(0,6,102,0.3) 0%, rgba(0,6,102,0.15) 50%, rgba(0,6,102,0.4) 100%)',
                  }}
                />
              </div>

              {/* Floating Direct Contact Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 'var(--space-xl)',
                  left: 'var(--space-xl)',
                  right: 'var(--space-xl)',
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-xl)',
                  boxShadow: '0 20px 60px rgba(0,6,102,0.12)',
                  border: '1px solid rgba(255,255,255,0.6)',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    marginBottom: 'var(--space-lg)',
                  }}
                >
                  Direct Contact
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <a
                    href="tel:+233246473136"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-md)',
                      textDecoration: 'none',
                      color: 'var(--on-surface)',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--on-surface)'; }}
                  >
                    <span
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--primary-fixed)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    </span>
                    <div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--on-surface-variant)', marginBottom: '2px' }}>
                        Phone
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>
                        +233 24 647 3136
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:info@ckspc.org"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-md)',
                      textDecoration: 'none',
                      color: 'var(--on-surface)',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--on-surface)'; }}
                  >
                    <span
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--primary-fixed)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                      </svg>
                    </span>
                    <div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--on-surface-variant)', marginBottom: '2px' }}>
                        Email
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>
                        info@ckspc.org
                      </div>
                    </div>
                  </a>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-md)',
                    }}
                  >
                    <span
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--primary-fixed)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </span>
                    <div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--on-surface-variant)', marginBottom: '2px' }}>
                        Office Hours
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--on-surface)' }}>
                        Mon &ndash; Fri: 9 AM &ndash; 5 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .visit-bento-grid {
            grid-template-columns: 1fr !important;
          }
          .visit-contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .visit-name-row {
            grid-template-columns: 1fr !important;
          }
        }
        .visit-section-label::before {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
