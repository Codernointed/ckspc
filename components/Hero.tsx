'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

export type HeroSlide = {
  bg: string;
  label: string;
  title: string;
  subtitle: string;
};

const DEFAULT_SLIDES: HeroSlide[] = [
  { bg: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1920&auto=format&fit=crop', label: 'Welcome Home', title: 'Christ Kingdom\nSalvation Church', subtitle: 'A non-profit Pentecostal church bringing all people to the saving knowledge of our Lord Jesus Christ.' },
  { bg: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1920&auto=format&fit=crop', label: 'Join Us for Worship', title: 'Experience the\nPower of God', subtitle: 'Every Sunday we gather to worship, praise, and grow together in the Spirit.' },
  { bg: '/ckspc-photos/3rdhero.png', label: 'Growing Together', title: 'Building Faith,\nTransforming Lives', subtitle: 'We exist to establish responsible, self-sustaining churches filled with committed, Spirit-filled Christians.' },
];

const Hero = ({ slides }: { slides?: HeroSlide[] }) => {
  const SLIDES = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((idx: number) => {
    setActive(idx);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const content = contentRef.current;
    if (!content) return;

    let cleanup: (() => void) | undefined;

    import('@/lib/gsap').then(({ gsap }) => {
      gsap.fromTo(
        content.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
      );
    }).catch(() => {});

    return () => cleanup?.();
  }, [active]);

  return (
    <section className="hero" id="hero">
      <div className="hero-slides">
        {SLIDES.map((slide, i) => (
          <div key={i} className={`hero-slide ${i === active ? 'active' : ''}`}>
            <div
              className="hero-slide-bg"
              style={{ backgroundImage: `url(${slide.bg})` }}
            />
          </div>
        ))}
      </div>

      <div className="hero-overlay" />

      <div className="hero-content" ref={contentRef} key={active}>
        <span className="hero-label">{SLIDES[active].label}</span>
        <h1 className="hero-title">
          {SLIDES[active].title.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </h1>
        <p className="hero-subtitle">{SLIDES[active].subtitle}</p>
        <div className="hero-buttons">
          <Link href="/visit" className="btn-primary">
            Plan Your Visit
          </Link>
          <Link href="#about" className="btn-outline">
            Learn More
          </Link>
        </div>
      </div>

      <div className="hero-indicators">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === active ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
