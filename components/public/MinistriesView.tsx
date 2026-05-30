'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export type MinistryItem = {
  title: string;
  description: string;
  imageUrl?: string;
  label?: string;
  buttonText?: string;
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({ opacity: 1, scale: 1, transition: { duration: 0.7, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
};

const DefaultIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 0 1 5 5c0 2.76-5 8-5 8S7 9.76 7 7a5 5 0 0 1 5-5z" />
    <circle cx="12" cy="7" r="1.5" />
    <path d="M9 17l-3 4h12l-3-4" />
  </svg>
);

const ImageCard = ({ item, index, big }: { item: MinistryItem; index: number; big: boolean }) => (
  <motion.div custom={index} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
    whileHover={{ y: -6, boxShadow: '0 12px 48px -12px rgba(0,6,102,0.18)' }}
    className={big ? 'ministry-card-big' : ''}
    style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', minHeight: big ? '420px' : '300px', boxShadow: '0 20px 40px rgba(0,6,102,0.06)', border: '1px solid var(--outline-variant)', gridColumn: big ? 'span 2' : 'span 1' }}
  >
    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,6,102,0.15) 0%, rgba(0,6,102,0.78) 100%)' }} />
    <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--white)' }}>
      {item.label && (
        <span style={{ alignSelf: 'flex-start', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--secondary-light)', padding: '0.25rem 1rem', border: '1px solid rgba(233,195,73,0.35)', borderRadius: '9999px', marginBottom: '1rem' }}>{item.label}</span>
      )}
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem' }}>{item.title}</h3>
      <p style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', lineHeight: 1.7, opacity: 0.9, maxWidth: '480px', marginBottom: item.buttonText ? '1.5rem' : 0 }}>{item.description}</p>
      {item.buttonText && (
        <a href="#contact" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem', background: 'var(--white)', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', borderRadius: '9999px', textDecoration: 'none', boxShadow: '0 8px 30px rgba(0,6,102,0.12)' }}>{item.buttonText} <span>→</span></a>
      )}
    </div>
  </motion.div>
);

const LightCard = ({ item, index }: { item: MinistryItem; index: number }) => (
  <motion.div custom={index} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
    whileHover={{ y: -6, boxShadow: '0 12px 48px -12px rgba(0,6,102,0.08)' }}
    style={{ background: 'var(--white)', borderRadius: '1.5rem', padding: 'clamp(1.5rem, 3vw, 2.5rem)', boxShadow: '0 20px 40px rgba(0,6,102,0.04)', border: '1px solid var(--outline-variant)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px', gridColumn: 'span 1' }}
  >
    <div style={{ width: '56px', height: '56px', borderRadius: '0.75rem', background: 'var(--primary-fixed)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}><DefaultIcon /></div>
    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 700, color: 'var(--primary)', lineHeight: 1.25, marginBottom: '0.75rem' }}>{item.title}</h3>
    <p style={{ fontSize: '0.92rem', color: 'var(--on-surface-variant)', lineHeight: 1.7, margin: 0 }}>{item.description}</p>
  </motion.div>
);

export default function MinistriesView({ items }: { items: MinistryItem[] }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Header />
      <main>
        <section style={{ position: 'relative', paddingTop: 'clamp(10rem, 18vh, 14rem)', paddingBottom: 'clamp(4rem, 8vh, 6rem)', paddingLeft: 'var(--space-xl)', paddingRight: 'var(--space-xl)', background: 'var(--primary)', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--primary-container)', filter: 'blur(120px)', opacity: 0.3, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto' }}>
            <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6 }} style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--secondary-light)', marginBottom: '1.5rem', padding: '0.25rem 1.5rem', border: '1px solid rgba(233,195,73,0.3)', borderRadius: '9999px' }}>Serve &middot; Grow &middot; Belong</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay: 0.1 }} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--white)', marginBottom: '1.5rem' }}>Our Ministries</motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay: 0.2 }} style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', lineHeight: 1.7, color: 'var(--white)', opacity: 0.85, maxWidth: '560px', margin: '0 auto' }}>Discover your place in our spiritual family. Every ministry is a doorway to deeper faith, meaningful fellowship, and Kingdom impact.</motion.p>
          </div>
        </section>

        <section style={{ padding: 'clamp(3rem, 6vw, 5rem) var(--space-xl)', background: 'var(--surface)' }}>
          <div className="ministries-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {items.map((item, i) =>
              item.imageUrl ? (
                <ImageCard key={item.title + i} item={item} index={i} big={i === 0} />
              ) : (
                <LightCard key={item.title + i} item={item} index={i} />
              )
            )}
          </div>
          <style>{`
            @media (max-width: 900px) { .ministries-grid { grid-template-columns: repeat(2, 1fr) !important; } .ministries-grid > * { grid-column: span 1 !important; } }
            @media (max-width: 600px) { .ministries-grid { grid-template-columns: 1fr !important; } .ministries-grid > * { grid-column: span 1 !important; } }
          `}</style>
        </section>

        <section style={{ padding: 'clamp(4rem, 8vw, 6rem) var(--space-xl)', background: 'var(--white)', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem' }}>Get Involved</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--primary)', lineHeight: 1.2, marginBottom: '1rem' }}>Find Your Calling</h2>
            <p style={{ fontSize: '1.02rem', color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: '2rem' }}>Whether you&apos;re a seasoned servant or exploring for the first time, there&apos;s a place for you here. Take the next step.</p>
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 3rem', background: 'var(--primary)', color: 'var(--white)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.05em', borderRadius: '9999px', textDecoration: 'none', boxShadow: '0 8px 30px rgba(0,6,102,0.12)' }}>Connect With Us <span>→</span></a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
