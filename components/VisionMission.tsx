'use client';

import { motion } from 'framer-motion';

const VisionMission = () => {
  return (
    <section className="vision">
      <div
        className="vision-bg"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1920&auto=format&fit=crop)',
        }}
      />
      <div className="vision-content">
        <motion.div
          className="vision-block"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8 }}
        >
          <span className="vision-block-label">Our Vision</span>
          <h3>
            A Global Pentecostal Church That Is Culturally Relevant
          </h3>
          <p>
            To become a global Pentecostal church that is culturally relevant in vibrant
            evangelism, church planting, discipleship and holistic ministry.
          </p>
        </motion.div>

        <motion.div
          className="vision-block"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="vision-block-label">Our Mission</span>
          <h3>
            Establishing Responsible &amp; Self-Sustaining Churches
          </h3>
          <p>
            We exist to establish responsible and self-sustaining churches filled with
            committed, Spirit-filled Christians of character, who will impact their communities.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;
