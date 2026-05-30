'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export interface Leader {
  name: string;
  title: string;
  initials: string;
  imageSrc?: string;
  branch?: string;
  description?: string;
}

export interface LeadershipTier {
  label: string;
  leaders: Leader[];
}

const tierAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const cardAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const connectorAnimation = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: 'easeInOut' } },
};

const ThreadSVG = () => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
    style={{ width: '100%', maxWidth: '600px', margin: '0 auto', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <svg viewBox="0 0 600 110" style={{ width: '100%', height: '100%', overflow: 'visible' }} preserveAspectRatio="xMidYMid meet">
      <motion.path d="M 300 0 C 300 28, 270 52, 190 62 C 120 70, 98 86, 98 110" fill="none" stroke="var(--outline-variant)" strokeWidth="1.5" strokeDasharray="6 6" variants={connectorAnimation} />
      <motion.path d="M 300 0 C 305 40, 295 70, 300 110" fill="none" stroke="var(--secondary)" strokeWidth="1.5" strokeDasharray="6 6" variants={connectorAnimation} style={{ opacity: 0.6 }} />
      <motion.path d="M 300 0 C 300 28, 330 52, 410 62 C 480 70, 502 86, 502 110" fill="none" stroke="var(--outline-variant)" strokeWidth="1.5" strokeDasharray="6 6" variants={connectorAnimation} />
      <motion.circle cx="300" cy="0" r="4" fill="var(--secondary)" variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }} />
      <motion.circle cx="300" cy="110" r="3" fill="var(--primary)" variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: 0.8 } } }} />
    </svg>
  </motion.div>
);

const PresidingLeadersSection = ({ leaders }: { leaders: Leader[] }) => (
  <motion.section
    initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={tierAnimation}
    style={{ padding: '6rem 1.5rem 4rem', background: 'linear-gradient(180deg, var(--primary) 0%, #0a1080 100%)', position: 'relative', overflow: 'hidden' }}
  >
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
    <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <motion.div variants={cardAnimation} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--secondary-light)', marginBottom: '1rem' }}>Presiding Leaders</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, color: 'var(--white)', lineHeight: 1.15, margin: 0 }}>Shepherds of the Flock</h1>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', marginTop: '1rem', maxWidth: '500px', margin: '1rem auto 0', lineHeight: 1.7 }}>Called and anointed to lead the body of Christ with integrity, wisdom, and love.</p>
      </motion.div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', alignItems: 'stretch' }}>
        {leaders.map((leader, i) => {
          const isCenter = i === 0;
          return (
            <motion.div key={leader.name + i} variants={cardAnimation}
              style={{ flex: isCenter ? '1 1 100%' : '1 1 calc(50% - 2rem)', maxWidth: isCenter ? '980px' : '560px', borderRadius: '1.5rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: isCenter ? '0 30px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)' : '0 20px 40px rgba(0,0,0,0.2)' }}
            >
              <div style={{ position: 'relative', width: '100%', height: isCenter ? '520px' : '420px' }}>
                {leader.imageSrc ? (
                  <img src={leader.imageSrc} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(1.05) contrast(1.02)' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>{leader.initials}</span>
                  </div>
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)' }} />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', width: isCenter ? '84px' : '72px', height: isCenter ? '84px' : '72px', borderRadius: '50%', background: isCenter ? 'linear-gradient(135deg, var(--secondary), var(--secondary-light))' : 'linear-gradient(135deg, var(--primary-light), var(--primary-tint))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isCenter ? '0 8px 24px rgba(115,92,0,0.4)' : '0 8px 24px rgba(0,6,102,0.3)', border: isCenter ? '2px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: isCenter ? '1.55rem' : '1.25rem', fontWeight: 700, color: isCenter ? 'var(--primary)' : 'var(--white)' }}>{leader.initials}</span>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isCenter ? '1.5rem 1.75rem' : '1.25rem 1.5rem', borderLeft: '4px solid var(--secondary-light)', background: 'rgba(0,0,0,0.12)', backdropFilter: 'blur(10px)' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: isCenter ? '2rem' : '1.5rem', fontWeight: 600, color: 'var(--white)', margin: 0, lineHeight: 1.25 }}>{leader.name}</h3>
                  <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--secondary-light)', marginTop: '0.45rem' }}>{leader.title}</span>
                </div>
              </div>
              {leader.description && (
                <div style={{ padding: isCenter ? '2rem' : '1.75rem', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderTop: 'none' }}>
                  <p style={{ fontSize: '0.98rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0 }}>{leader.description}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  </motion.section>
);

const PhotoFlowSection = ({ leaders, label, headline, background }: { leaders: Leader[]; label: string; headline: string; background: string }) => (
  <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={tierAnimation} style={{ padding: '4.5rem 1.5rem', background, position: 'relative', overflow: 'hidden' }}>
    <div aria-hidden="true" style={{ position: 'absolute', top: '-180px', left: '-220px', width: '520px', height: '520px', borderRadius: '50%', background: 'var(--primary-fixed)', filter: 'blur(80px)', opacity: 0.35, pointerEvents: 'none' }} />
    <div aria-hidden="true" style={{ position: 'absolute', bottom: '-220px', right: '-240px', width: '560px', height: '560px', borderRadius: '50%', background: 'var(--secondary-container)', filter: 'blur(90px)', opacity: 0.18, pointerEvents: 'none' }} />
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <motion.div variants={cardAnimation} style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '0.75rem' }}>{label}</span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 600, color: 'var(--primary)', margin: 0 }}>{headline}</h2>
      </motion.div>
      <div className="leadership-flow-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        {leaders.map((leader, idx) => {
          const pattern = [
            { span: 6, h: 520, tilt: -1.0, y: 0 }, { span: 6, h: 560, tilt: 0.9, y: 20 },
            { span: 4, h: 500, tilt: -0.6, y: 10 }, { span: 4, h: 470, tilt: 0.6, y: 30 },
            { span: 4, h: 510, tilt: -0.8, y: 12 }, { span: 6, h: 550, tilt: 0.8, y: 18 },
          ];
          const p = pattern[idx % pattern.length];
          return (
            <motion.div key={leader.name + idx} variants={cardAnimation} whileHover={{ y: -4, boxShadow: '0 12px 48px -12px rgba(0,6,102,0.08)' }}
              style={{ gridColumn: `span ${p.span}`, background: 'var(--white)', border: '1px solid var(--outline-variant)', borderRadius: '1.5rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 40px -12px rgba(0,6,102,0.04)', transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)', transform: `translateY(${p.y}px) rotate(${p.tilt}deg)` }}
            >
              <div style={{ position: 'relative', width: '100%', height: `${p.h}px`, background: 'var(--surface)' }}>
                {leader.imageSrc ? (
                  <img src={leader.imageSrc} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary)' }}>{leader.initials}</span>
                  </div>
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.52) 100%)' }} />
                <div style={{ position: 'absolute', left: '1rem', bottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.75rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.35)', color: 'var(--primary)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{leader.title}</div>
              </div>
              <div style={{ padding: '1.25rem 1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--primary)', margin: 0, lineHeight: 1.3 }}>{leader.name}</h3>
                {leader.branch && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 600, color: 'var(--secondary)', marginTop: '0.1rem', letterSpacing: '0.02em' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    {leader.branch}
                  </span>
                )}
                {leader.description && <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>{leader.description}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
    <style jsx>{`
      @media (max-width: 980px) { .leadership-flow-grid { grid-template-columns: repeat(2, 1fr) !important; } .leadership-flow-grid > * { grid-column: span 1 !important; transform: none !important; } }
      @media (max-width: 640px) { .leadership-flow-grid { grid-template-columns: 1fr !important; } .leadership-flow-grid > * { grid-column: span 1 !important; transform: none !important; } }
    `}</style>
  </motion.section>
);

const ChipSection = ({ leaders, label, headline, background, size }: { leaders: Leader[]; label: string; headline: string; background: string; size: 'lg' | 'sm' }) => (
  <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={tierAnimation} style={{ padding: size === 'lg' ? '4rem 1.5rem' : '4rem 1.5rem 6rem', background, position: 'relative' }}>
    <div style={{ maxWidth: size === 'lg' ? '900px' : '800px', margin: '0 auto' }}>
      <motion.div variants={cardAnimation} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '0.75rem' }}>{label}</span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: size === 'lg' ? 'clamp(1.3rem, 2.5vw, 1.8rem)' : 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 600, color: 'var(--primary)', margin: 0 }}>{headline}</h2>
      </motion.div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: size === 'lg' ? '1rem' : '0.75rem' }}>
        {leaders.map((leader, i) => (
          <motion.div key={leader.name + i} variants={cardAnimation}
            style={{ display: 'flex', alignItems: 'center', gap: size === 'lg' ? '0.75rem' : '0.5rem', padding: size === 'lg' ? '0.7rem 1.25rem 0.7rem 0.7rem' : '0.5rem 1rem 0.5rem 0.5rem', background: size === 'lg' ? 'var(--white)' : 'var(--surface)', borderRadius: '9999px', border: '1px solid var(--outline-variant)', cursor: 'default' }}
          >
            <div style={{ width: size === 'lg' ? '36px' : '28px', height: size === 'lg' ? '36px' : '28px', borderRadius: '50%', background: size === 'lg' ? 'var(--primary)' : 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: size === 'lg' ? '0.75rem' : '0.6rem', fontWeight: 700, color: 'var(--white)' }}>{leader.initials}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: size === 'lg' ? '0.88rem' : '0.8rem', fontWeight: size === 'lg' ? 600 : 500, color: size === 'lg' ? 'var(--on-surface)' : 'var(--on-surface-variant)', whiteSpace: 'nowrap' }}>{leader.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

function tierByLabel(tiers: LeadershipTier[], label: string): Leader[] {
  return tiers.find((t) => t.label === label)?.leaders ?? [];
}

export default function LeadershipView({ tiers }: { tiers: LeadershipTier[] }) {
  const presiding = tierByLabel(tiers, 'Presiding Leaders');
  const branchPastors = tierByLabel(tiers, 'Branch Pastors');
  const pastors = tierByLabel(tiers, 'Pastors');
  const elders = tierByLabel(tiers, 'Elders');
  const deacons = tierByLabel(tiers, 'Deacons & Deaconesses');

  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ padding: '4rem 1.5rem 2rem', background: 'var(--surface)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'var(--primary)', opacity: 0.02, pointerEvents: 'none' }} />
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '0.75rem', padding: '0.3rem 1.2rem', border: '1px solid var(--outline-variant)', borderRadius: '9999px' }}>Our Leadership</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--primary)', margin: '0 0 0.75rem', lineHeight: 1.2 }}>Sacred Lineage of Service</motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} style={{ fontSize: '1rem', color: 'var(--on-surface-variant)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>From our founding apostle to every faithful servant, each leader is called to shepherd, equip, and empower the body of Christ.</motion.p>
        </motion.section>

        {presiding.length > 0 && <PresidingLeadersSection leaders={presiding} />}
        {branchPastors.length > 0 && (
          <>
            <div style={{ background: 'var(--white)', paddingTop: '1rem' }}><ThreadSVG /></div>
            <PhotoFlowSection leaders={branchPastors} label="Branch Pastors" headline="Serving Across Our Branches" background="var(--white)" />
          </>
        )}
        {pastors.length > 0 && (
          <>
            <div style={{ background: 'var(--surface)', paddingTop: '1rem' }}><ThreadSVG /></div>
            <PhotoFlowSection leaders={pastors} label="Pastors" headline="Equipping the Church for Ministry" background="var(--surface)" />
          </>
        )}
        {elders.length > 0 && (
          <>
            <div style={{ background: 'var(--white)', paddingTop: '1rem' }}><ThreadSVG /></div>
            <ChipSection leaders={elders} label="Elders" headline="Pillars of Wisdom & Counsel" background="var(--surface)" size="lg" />
          </>
        )}
        {deacons.length > 0 && (
          <>
            <div style={{ background: 'var(--white)', paddingTop: '1rem' }}><ThreadSVG /></div>
            <ChipSection leaders={deacons} label="Deacons & Deaconesses" headline="Hands & Feet of Service" background="var(--white)" size="sm" />
          </>
        )}

        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ padding: '4rem 1.5rem', background: 'var(--primary)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 500, color: 'var(--white)', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.5, fontStyle: 'italic' }}>&ldquo;And He gave some, apostles; and some, prophets; and some, pastors and teachers; for the perfecting of the saints.&rdquo;</p>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--secondary-light)', letterSpacing: '0.05em' }}>Ephesians 4:11-12</span>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
