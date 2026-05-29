'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
  { icon: '✝', title: 'Spirit-Filled Worship', desc: 'Pentecostal praise & prayer' },
  { icon: '📖', title: 'Biblical Teaching', desc: 'Grounded in God\'s Word' },
  { icon: '🤝', title: 'Community Service', desc: 'Impacting lives with love' },
  { icon: '🌍', title: 'Church Planting', desc: 'Spreading the Gospel globally' },
];

type WelcomeContent = { label?: string; title?: string; body?: string };

const Welcome = ({ content }: { content?: WelcomeContent }) => {
  const label = content?.label ?? 'Welcome to CKSPC';
  const title = content?.title ?? 'Bringing All People to the Saving Knowledge of Christ';
  const body =
    content?.body ??
    "Christ Kingdom Salvation Pentecostal Church is a non-profit Pentecostal church headquartered in Accra, Ghana. We exist to bring all people everywhere to the saving knowledge of our Lord Jesus Christ through the proclamation of the gospel, the planting of churches and the equipping of believers for every God-glorifying service.";
  return (
    <section className="welcome" id="about">
      <div className="welcome-inner">
        <motion.div
          className="welcome-media"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop"
            alt="Church worship"
            className="welcome-img-main"
          />
          <img
            src="/ckspc-photos/97b65d_933ca15b1db34bb6aaa5f1251e79cb77.jpg"
            alt="Church leaders"
            className="welcome-img-accent"
          />
          <div className="welcome-badge">
            <div className="welcome-badge-number">30+</div>
            <div className="welcome-badge-text">Years of<br />Ministry</div>
          </div>
        </motion.div>

        <motion.div
          className="welcome-text"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
          <p className="welcome-desc">{body}</p>
          <div className="welcome-features">
            {features.map((f) => (
              <div key={f.title} className="welcome-feature">
                <div className="welcome-feature-icon">{f.icon}</div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="#founder" className="btn-cta">
            Our Story
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Welcome;
