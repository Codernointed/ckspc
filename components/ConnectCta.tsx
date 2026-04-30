'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const ConnectCta = () => {
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
        <span className="section-label">We&apos;d Love to Meet You</span>
        <h2 className="connect-cta-title">
          Plan Your Visit to<br />
          Christ Kingdom Salvation
        </h2>
        <p className="connect-cta-text">
          Whether you are seeking a new church family or just exploring faith,
          our doors and hearts are open to you. Come experience the warmth of
          our community and the power of Spirit-filled worship.
        </p>
        <div className="connect-cta-buttons">
          <Link href="/visit" className="btn-gold">
            Plan Your Visit
          </Link>
          <Link href="#contact" className="btn-white-outline">
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default ConnectCta;
