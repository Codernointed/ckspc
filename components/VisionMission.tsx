'use client';

import { motion } from 'framer-motion';

type VisionMissionContent = {
  visionLabel?: string;
  visionTitle?: string;
  visionBody?: string;
  missionLabel?: string;
  missionTitle?: string;
  missionBody?: string;
};

const VisionMission = ({ content }: { content?: VisionMissionContent }) => {
  const visionLabel = content?.visionLabel ?? 'Our Vision';
  const visionTitle = content?.visionTitle ?? 'A Global Pentecostal Church That Is Culturally Relevant';
  const visionBody =
    content?.visionBody ??
    'To become a global Pentecostal church that is culturally relevant in vibrant evangelism, church planting, discipleship and holistic ministry.';
  const missionLabel = content?.missionLabel ?? 'Our Mission';
  const missionTitle = content?.missionTitle ?? 'Establishing Responsible & Self-Sustaining Churches';
  const missionBody =
    content?.missionBody ??
    'We exist to establish responsible and self-sustaining churches filled with committed, Spirit-filled Christians of character, who will impact their communities.';
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
          <span className="vision-block-label">{visionLabel}</span>
          <h3>{visionTitle}</h3>
          <p>{visionBody}</p>
        </motion.div>

        <motion.div
          className="vision-block"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="vision-block-label">{missionLabel}</span>
          <h3>{missionTitle}</h3>
          <p>{missionBody}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;
