'use client';

import { motion } from 'framer-motion';

const stats = [
  { number: '1994', label: 'Founded' },
  { number: '5+', label: 'Branches' },
  { number: '30+', label: 'Years of Ministry' },
  { number: '1000+', label: 'Members' },
];

const StatsStrip = () => {
  return (
    <section className="stats-strip">
      <div className="stats-strip-inner">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;
