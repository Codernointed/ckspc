'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
  }),
};

interface ImageCardProps {
  title: string;
  description: string;
  image: string;
  label?: string;
  buttonText?: string;
  gridColumn: string;
  gridRow: string;
  minHeight: string;
  index: number;
}

const ImageCard = ({
  title,
  description,
  image,
  label,
  buttonText,
  gridColumn,
  gridRow,
  minHeight,
  index,
}: ImageCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{
        gridColumn,
        gridRow,
        position: 'relative',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        minHeight,
        boxShadow: '0 20px 40px rgba(0,6,102,0.04)',
        border: '1px solid var(--outline-variant)',
        cursor: 'pointer',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}
      whileHover={{ y: -6, boxShadow: '0 12px 48px -12px rgba(0,6,102,0.08)' }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.7s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,6,102,0.15) 0%, rgba(0,6,102,0.75) 100%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          color: 'var(--white)',
        }}
      >
        {label && (
          <span
            style={{
              alignSelf: 'flex-start',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
              color: 'var(--secondary-light)',
              padding: '0.25rem 1rem',
              border: '1px solid rgba(233,195,73,0.35)',
              borderRadius: '9999px',
              marginBottom: '1rem',
            }}
          >
            {label}
          </span>
        )}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '0.75rem',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            lineHeight: 1.7,
            opacity: 0.9,
            maxWidth: '480px',
            marginBottom: buttonText ? '1.5rem' : 0,
          }}
        >
          {description}
        </p>
        {buttonText && (
          <button
            style={{
              alignSelf: 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 2rem',
              background: 'var(--white)',
              color: 'var(--primary)',
              fontSize: '0.8rem',
              fontWeight: 700,
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.05em',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
              boxShadow: '0 8px 30px rgba(0,6,102,0.12)',
            }}
          >
            {buttonText}
            <span style={{ fontSize: '1rem', transition: 'transform 0.3s ease' }}>→</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

interface LightCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gridColumn: string;
  gridRow: string;
  index: number;
}

const LightCard = ({ title, description, icon, gridColumn, gridRow, index }: LightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{
        gridColumn,
        gridRow,
        background: 'var(--white)',
        borderRadius: '1.5rem',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        boxShadow: '0 20px 40px rgba(0,6,102,0.04)',
        border: '1px solid var(--outline-variant)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}
      whileHover={{ y: -6, boxShadow: '0 12px 48px -12px rgba(0,6,102,0.08)' }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '0.75rem',
          background: 'var(--primary-fixed)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          marginBottom: '1.25rem',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
          fontWeight: 700,
          color: 'var(--primary)',
          lineHeight: 1.25,
          marginBottom: '0.75rem',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '0.92rem',
          color: 'var(--on-surface-variant)',
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {description}
      </p>
    </motion.div>
  );
};

const Ministries = () => {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-40px' });

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Header />

      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          style={{
            position: 'relative',
            paddingTop: 'clamp(10rem, 18vh, 14rem)',
            paddingBottom: 'clamp(4rem, 8vh, 6rem)',
            paddingLeft: 'var(--space-xl)',
            paddingRight: 'var(--space-xl)',
            background: 'var(--primary)',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {/* Dot pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none',
            }}
          />

          {/* Decorative blobs */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'var(--primary-container)',
              filter: 'blur(120px)',
              opacity: 0.3,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-30%',
              left: '-5%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'var(--secondary)',
              filter: 'blur(120px)',
              opacity: 0.08,
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto' }}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{
                display: 'inline-block',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase' as const,
                color: 'var(--secondary-light)',
                marginBottom: '1.5rem',
                padding: '0.25rem 1.5rem',
                border: '1px solid rgba(233,195,73,0.3)',
                borderRadius: '9999px',
              }}
            >
              Serve &middot; Grow &middot; Belong
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--white)',
                marginBottom: '1.5rem',
              }}
            >
              Our Ministries
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'var(--white)',
                opacity: 0.85,
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              Discover your place in our spiritual family. Every ministry is a doorway to
              deeper faith, meaningful fellowship, and Kingdom impact.
            </motion.p>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section
          style={{
            padding: 'clamp(3rem, 6vw, 5rem) var(--space-xl)',
            background: 'var(--surface)',
          }}
        >
          {/* Desktop grid */}
          <div
            className="ministries-bento-grid"
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gridAutoRows: 'minmax(220px, auto)',
              gap: '1.5rem',
            }}
          >
            {/* Youth Ministry — 8 cols, 2 rows */}
            <ImageCard
              title="Youth Ministry"
              description="Empowering the next generation to lead with faith, compassion, and unwavering purpose."
              image="https://images.unsplash.com/photo-1523803326055-9729b9e02e5a?q=80&w=1200&auto=format&fit=crop"
              label="NEXT GEN"
              buttonText="Join the Movement"
              gridColumn="1 / span 8"
              gridRow="1 / span 2"
              minHeight="460px"
              index={0}
            />

            {/* Women of Grace — 4 cols, 1 row */}
            <ImageCard
              title="Women of Grace"
              description="Cultivating strength, sisterhood, and spiritual depth."
              image="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop"
              gridColumn="9 / span 4"
              gridRow="1 / span 1"
              minHeight="220px"
              index={1}
            />

            {/* Men of Valor — 4 cols, 1 row */}
            <ImageCard
              title="Men of Valor"
              description="Building steadfast leaders grounded in Biblical truth."
              image="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=800&auto=format&fit=crop"
              gridColumn="9 / span 4"
              gridRow="2 / span 1"
              minHeight="220px"
              index={2}
            />

            {/* Children's Ministry — 6 cols, 1 row */}
            <LightCard
              title="Children's Ministry"
              description="Planting seeds of faith in a safe, joyous environment."
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a5 5 0 0 1 5 5c0 2.76-5 8-5 8S7 9.76 7 7a5 5 0 0 1 5-5z" />
                  <circle cx="12" cy="7" r="1.5" />
                  <path d="M9 17l-3 4h12l-3-4" />
                </svg>
              }
              gridColumn="1 / span 6"
              gridRow="3 / span 1"
              index={3}
            />

            {/* Worship & Arts — 6 cols, 1 row */}
            <LightCard
              title="Worship & Arts"
              description="Expressing devotion through music, media, and creative arts."
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              }
              gridColumn="7 / span 6"
              gridRow="3 / span 1"
              index={4}
            />
          </div>

          {/* Mobile fallback: stacked layout */}
          <style>{`
            @media (max-width: 768px) {
              .ministries-bento-grid {
                display: flex !important;
                flex-direction: column !important;
                gap: 1.25rem !important;
              }
              .ministries-bento-grid > * {
                grid-column: unset !important;
                grid-row: unset !important;
              }
            }
          `}</style>
        </section>

        {/* Bottom CTA */}
        <section
          style={{
            padding: 'clamp(4rem, 8vw, 6rem) var(--space-xl)',
            background: 'var(--white)',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{ maxWidth: '600px', margin: '0 auto' }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase' as const,
                color: 'var(--secondary)',
                marginBottom: '1rem',
              }}
            >
              Get Involved
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--primary)',
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}
            >
              Find Your Calling
            </h2>
            <p
              style={{
                fontSize: '1.02rem',
                color: 'var(--on-surface-variant)',
                lineHeight: 1.7,
                marginBottom: '2rem',
              }}
            >
              Whether you&apos;re a seasoned servant or exploring for the first time,
              there&apos;s a place for you here. Take the next step.
            </p>
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 3rem',
                background: 'var(--primary)',
                color: 'var(--white)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                borderRadius: '9999px',
                textDecoration: 'none',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: '0 8px 30px rgba(0,6,102,0.12)',
              }}
            >
              Connect With Us
              <span>→</span>
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Ministries;
