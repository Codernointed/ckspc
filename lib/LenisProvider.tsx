'use client';

import { useEffect, useRef } from 'react';

type LenisInstance = { destroy: () => void; raf: (time: number) => void };

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const rafRef = useRef<number>(0);
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.2,
      });
      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }
      rafRef.current = requestAnimationFrame(raf);
    }).catch(() => {});

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
