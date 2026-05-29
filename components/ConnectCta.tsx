'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type ConnectCtaContent = {
  label?: string;
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

const ConnectCta = ({ content }: { content?: ConnectCtaContent }) => {
  const label = content?.label ?? "We'd Love to Meet You";
  const title = content?.title ?? 'Plan Your Visit to Christ Kingdom Salvation';
  const body =
    content?.body ??
    'Whether you are seeking a new church family or just exploring faith, our doors and hearts are open to you. Come experience the warmth of our community and the power of Spirit-filled worship.';
  const primaryLabel = content?.primaryLabel ?? 'Plan Your Visit';
  const primaryHref = content?.primaryHref ?? '/visit';
  const secondaryLabel = content?.secondaryLabel ?? 'Contact Us';
  const secondaryHref = content?.secondaryHref ?? '#contact';
  return (
    <section className="connect-cta" id="visit">
      <div className="connect-cta-pattern" />
      <motion.div
        className="connect-cta-inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-label">{label}</span>
        <h2 className="connect-cta-title">{title}</h2>
        <p className="connect-cta-text">{body}</p>
        <div className="connect-cta-buttons">
          <Link href={primaryHref} className="btn-gold">
            {primaryLabel}
          </Link>
          <Link href={secondaryHref} className="btn-white-outline">
            {secondaryLabel}
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default ConnectCta;
