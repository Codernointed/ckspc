'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
  }),
};

const FUNDS = [
  { id: 'tithe', label: 'Tithe', icon: '🌾', note: 'Honouring God with the first tenth' },
  { id: 'offering', label: 'Offering', icon: '🤲', note: 'A freewill gift of worship' },
  { id: 'building', label: 'Building Fund', icon: '🏛️', note: 'Raising houses of worship' },
  { id: 'missions', label: 'Missions & Souls', icon: '🌍', note: 'Soul-winning & church planting' },
  { id: 'welfare', label: 'Welfare', icon: '❤️', note: 'Caring for those in need' },
];

const PRESETS = [20, 50, 100, 200, 500, 1000];

const METHODS = [
  { id: 'momo', label: 'Mobile Money', sub: 'MTN · Telecel · AirtelTigo' },
  { id: 'card', label: 'Card', sub: 'Visa · Mastercard' },
  { id: 'bank', label: 'Bank Transfer', sub: 'Direct deposit' },
];

export default function GivePage() {
  const [fund, setFund] = useState('tithe');
  const [amount, setAmount] = useState<number | ''>(100);
  const [custom, setCustom] = useState('');
  const [method, setMethod] = useState('momo');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const effectiveAmount = custom ? Number(custom) : amount || 0;
  const selectedFund = FUNDS.find((f) => f.id === fund)!;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!effectiveAmount || effectiveAmount <= 0) return;
    setProcessing(true);
    // Demo: simulate a payment gateway round-trip
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 1800);
  };

  const reset = () => {
    setDone(false);
    setAmount(100);
    setCustom('');
    setName('');
    setPhone('');
    setEmail('');
    setRecurring(false);
  };

  const inputStyle: React.CSSProperties = {
    padding: 'var(--space-md)',
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--outline-variant)',
    fontSize: '0.92rem',
    fontFamily: 'var(--font-sans)',
    color: 'var(--on-surface)',
    background: 'var(--surface)',
    outline: 'none',
    width: '100%',
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface)' }}>
      <Header />

      <main style={{ paddingTop: '5rem' }}>
        {/* ─── Hero ─── */}
        <section
          style={{
            position: 'relative',
            minHeight: '52vh',
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
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
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
              background: 'var(--secondary-container)',
              opacity: 0.12,
              filter: 'blur(100px)',
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
              maxWidth: '760px',
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
                textTransform: 'uppercase',
                color: 'var(--secondary-light)',
                marginBottom: 'var(--space-lg)',
                padding: 'var(--space-xs) var(--space-lg)',
                border: '1px solid rgba(233, 195, 73, 0.3)',
                borderRadius: 'var(--radius-full)',
              }}
            >
              Give &amp; Sow
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.6rem, 7vw, 5rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: 'var(--space-lg)',
              }}
            >
              Giving is Worship.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.12rem)',
                lineHeight: 1.8,
                opacity: 0.85,
                maxWidth: '540px',
                margin: '0 auto',
              }}
            >
              &ldquo;Each one must give as he has decided in his heart, not reluctantly or under
              compulsion, for God loves a cheerful giver.&rdquo; &mdash; 2 Corinthians 9:7
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
            }}
          />
        </section>

        {/* ─── Giving Card ─── */}
        <section
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: 'var(--space-5xl) var(--space-xl)',
          }}
        >
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-4xl) var(--space-2xl)',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--outline-variant)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    background: 'var(--primary-fixed)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--space-xl)',
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.9rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    marginBottom: 'var(--space-md)',
                  }}
                >
                  Thank you for your gift.
                </h2>
                <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: 'var(--space-xl)' }}>
                  Your {recurring ? 'monthly ' : ''}gift of{' '}
                  <strong style={{ color: 'var(--primary)' }}>₵{effectiveAmount.toLocaleString('en-GH')}</strong> toward{' '}
                  <strong style={{ color: 'var(--primary)' }}>{selectedFund.label}</strong> has been received.
                  A receipt will be sent to you. The Lord bless you and keep you. 🙏
                </p>
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--on-surface-variant)',
                    background: 'var(--surface)',
                    padding: 'var(--space-xs) var(--space-md)',
                    borderRadius: 'var(--radius-full)',
                    marginBottom: 'var(--space-xl)',
                  }}
                >
                  Demo mode · No real payment was charged
                </div>
                <div>
                  <button onClick={reset} className="btn-cta" style={{ justifyContent: 'center' }}>
                    Give Again
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={scaleIn}
                onSubmit={handleSubmit}
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-2xl)',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--outline-variant)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2xl)',
                }}
              >
                {/* Fund */}
                <div>
                  <SectionLabel>Where would you like to give?</SectionLabel>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                    {FUNDS.map((f) => {
                      const active = fund === f.id;
                      return (
                        <button
                          type="button"
                          key={f.id}
                          onClick={() => setFund(f.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-sm)',
                            padding: 'var(--space-sm) var(--space-md)',
                            borderRadius: 'var(--radius-full)',
                            border: active ? '1.5px solid var(--primary)' : '1.5px solid var(--outline-variant)',
                            background: active ? 'var(--primary-fixed)' : 'var(--surface)',
                            color: active ? 'var(--primary)' : 'var(--on-surface-variant)',
                            fontWeight: active ? 700 : 500,
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          <span>{f.icon}</span>
                          {f.label}
                        </button>
                      );
                    })}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--on-surface-variant)', marginTop: 'var(--space-sm)', fontStyle: 'italic' }}>
                    {selectedFund.note}
                  </p>
                </div>

                {/* Amount */}
                <div>
                  <SectionLabel>Amount (GHS)</SectionLabel>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 'var(--space-sm)',
                      marginBottom: 'var(--space-md)',
                    }}
                  >
                    {PRESETS.map((p) => {
                      const active = !custom && amount === p;
                      return (
                        <button
                          type="button"
                          key={p}
                          onClick={() => { setAmount(p); setCustom(''); }}
                          style={{
                            padding: 'var(--space-md)',
                            borderRadius: 'var(--radius-md)',
                            border: active ? '1.5px solid var(--primary)' : '1.5px solid var(--outline-variant)',
                            background: active ? 'var(--primary-fixed)' : 'var(--surface)',
                            color: active ? 'var(--primary)' : 'var(--on-surface)',
                            fontWeight: 700,
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.05rem',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          ₵{p}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: 'var(--space-md)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 700,
                        color: 'var(--on-surface-variant)',
                      }}
                    >
                      ₵
                    </span>
                    <input
                      type="number"
                      min="1"
                      inputMode="decimal"
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      placeholder="Enter another amount"
                      style={{ ...inputStyle, paddingLeft: '2rem' }}
                    />
                  </div>
                </div>

                {/* Method */}
                <div>
                  <SectionLabel>Payment method</SectionLabel>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-sm)' }}>
                    {METHODS.map((m) => {
                      const active = method === m.id;
                      return (
                        <button
                          type="button"
                          key={m.id}
                          onClick={() => setMethod(m.id)}
                          style={{
                            padding: 'var(--space-md)',
                            borderRadius: 'var(--radius-md)',
                            border: active ? '1.5px solid var(--primary)' : '1.5px solid var(--outline-variant)',
                            background: active ? 'var(--primary-fixed)' : 'var(--surface)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: '0.86rem', color: active ? 'var(--primary)' : 'var(--on-surface)' }}>
                            {m.label}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--on-surface-variant)', marginTop: '2px' }}>
                            {m.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Donor details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <SectionLabel>Your details</SectionLabel>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name (optional)"
                    style={inputStyle}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }} className="give-detail-row">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={method === 'momo' ? 'Mobile money number' : 'Phone'}
                      required={method === 'momo'}
                      style={inputStyle}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email for receipt"
                      style={inputStyle}
                    />
                  </div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-sm)',
                      fontSize: '0.88rem',
                      color: 'var(--on-surface-variant)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={recurring}
                      onChange={(e) => setRecurring(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                    Make this a monthly recurring gift
                  </label>
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    className="btn-cta"
                    disabled={processing || !effectiveAmount}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: 'var(--space-lg) var(--space-2xl)',
                      fontSize: '0.95rem',
                      opacity: processing || !effectiveAmount ? 0.7 : 1,
                    }}
                  >
                    {processing
                      ? 'Processing…'
                      : `Give ₵${(effectiveAmount || 0).toLocaleString('en-GH')}${recurring ? ' / month' : ''}`}
                  </button>
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: '0.74rem',
                      color: 'var(--on-surface-variant)',
                      marginTop: 'var(--space-md)',
                    }}
                  >
                    🔒 Demo mode — no real payment is processed. Secured giving via your church&apos;s gateway.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 560px) {
          .give-detail-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--primary)',
        marginBottom: 'var(--space-md)',
      }}
    >
      {children}
    </div>
  );
}
