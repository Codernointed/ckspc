'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export type VideoItem = { title: string; label: string; imageUrl: string; videoUrl?: string };
export type GalleryPhoto = { imageUrl: string; alt: string; category: string };

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] } }) };
const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, visible: (i: number) => ({ opacity: 1, scale: 1, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }) };

const PlayButton = () => (
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 72, height: 72, borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,6,102,0.15)', zIndex: 3 }}>
    <svg width="24" height="28" viewBox="0 0 24 28" fill="none"><path d="M22 14L2 26V2L22 14Z" fill="var(--primary)" /></svg>
  </div>
);

export default function MediaView({ videos, gallery }: { videos: VideoItem[]; gallery: GalleryPhoto[] }) {
  const [filter, setFilter] = useState<'All' | 'Worship' | 'Community'>('All');
  const filtered = filter === 'All' ? gallery : gallery.filter((g) => g.category === filter.toLowerCase());

  // Auto grid areas for masonry
  const gridAreas = ['1 / 1 / 3 / 2', '1 / 2 / 2 / 3', '1 / 3 / 2 / 4', '2 / 2 / 3 / 4', '3 / 1 / 4 / 2', '3 / 2 / 4 / 4'];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Header />
      <main>
        {/* Header */}
        <section style={{ background: 'linear-gradient(180deg, #f4fafd 0%, rgba(224,224,255,0.5) 100%)', paddingTop: '10rem', paddingBottom: 'var(--space-5xl)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'var(--primary)', opacity: 0.03, filter: 'blur(100px)', pointerEvents: 'none' }} />
          <motion.div initial="hidden" animate="visible" style={{ maxWidth: 800, margin: '0 auto', padding: '0 var(--space-xl)', position: 'relative', zIndex: 1 }}>
            <motion.span variants={fadeUp} custom={0} style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: 'var(--space-lg)', position: 'relative', paddingLeft: '3rem' }}>
              <span style={{ position: 'absolute', left: 0, top: '50%', width: '2rem', height: 2, background: 'var(--secondary)' }} />Our Media
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, color: 'var(--primary)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 'var(--space-xl)' }}>Media & Gallery</motion.h1>
            <motion.p variants={fadeUp} custom={2} style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--on-surface-variant)', lineHeight: 1.7, maxWidth: 580, margin: '0 auto' }}>A visual journey through our moments of worship, fellowship, and community.</motion.p>
          </motion.div>
        </section>

        {/* Videos */}
        {videos.length > 0 && (
          <section style={{ padding: 'var(--space-5xl) var(--space-xl)', background: 'var(--white)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                <motion.div variants={fadeUp} custom={0}>
                  <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: 'var(--space-sm)', position: 'relative', paddingLeft: '3rem' }}>
                    <span style={{ position: 'absolute', left: 0, top: '50%', width: '2rem', height: 2, background: 'var(--secondary)' }} />Watch
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600, color: 'var(--primary)', lineHeight: 1.2 }}>Video Highlights</h2>
                </motion.div>
              </motion.div>
              {/* Featured */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0} style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 'var(--space-xl)', cursor: 'pointer', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ width: '100%', height: 520, backgroundImage: `url(${videos[0].imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,6,102,0.75) 0%, rgba(0,6,102,0.1) 50%, transparent 100%)', pointerEvents: 'none' }} />
                <PlayButton />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'var(--space-2xl)', zIndex: 2 }}>
                  <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--secondary-light)', background: 'rgba(0,6,102,0.5)', backdropFilter: 'blur(8px)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-sm)' }}>{videos[0].label}</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.3, marginTop: 'var(--space-sm)' }}>{videos[0].title}</h3>
                </div>
              </motion.div>
              {/* Secondary */}
              {videos.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-xl)' }}>
                  {videos.slice(1).map((v, i) => (
                    <motion.div key={v.title + i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={scaleIn} custom={i} style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', cursor: 'pointer', boxShadow: 'var(--shadow-soft)' }}>
                      <div style={{ width: '100%', height: 300, backgroundImage: `url(${v.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,6,102,0.7) 0%, transparent 60%)', pointerEvents: 'none' }} />
                      <PlayButton />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'var(--space-xl)', zIndex: 2 }}>
                        <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--secondary-light)', background: 'rgba(0,6,102,0.5)', backdropFilter: 'blur(8px)', padding: '0.25rem 0.7rem', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-xs)' }}>{v.label}</span>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.3, marginTop: 'var(--space-xs)' }}>{v.title}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Photo Gallery */}
        {gallery.length > 0 && (
          <section style={{ padding: 'var(--space-5xl) var(--space-xl)', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
                <motion.span variants={fadeUp} custom={0} style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: 'var(--space-sm)' }}>Gallery</motion.span>
                <motion.h2 variants={fadeUp} custom={1} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600, color: 'var(--primary)', lineHeight: 1.2, marginBottom: 'var(--space-xl)' }}>Photo Gallery</motion.h2>
                <motion.div variants={fadeUp} custom={2} style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                  {(['All', 'Worship', 'Community'] as const).map((f) => (
                    <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.82rem', fontWeight: 600, border: '1.5px solid', borderColor: filter === f ? 'var(--primary)' : 'var(--outline-variant)', background: filter === f ? 'var(--primary)' : 'transparent', color: filter === f ? 'var(--white)' : 'var(--on-surface-variant)', cursor: 'pointer', transition: 'all 0.3s ease' }}>{f}</button>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: 220, gap: 'var(--space-lg)' }}>
                {filtered.map((img, i) => (
                  <motion.div key={img.imageUrl + i} variants={scaleIn} custom={i} layout style={{ gridArea: gridAreas[i % gridAreas.length], position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer', boxShadow: 'var(--shadow-soft)' }}>
                    <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.6 }} style={{ width: '100%', height: '100%', backgroundImage: `url(${img.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.35 }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,6,102,0.6) 0%, transparent 50%)', display: 'flex', alignItems: 'flex-end', padding: 'var(--space-xl)' }}>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, color: '#ffffff' }}>{img.alt}</span>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
