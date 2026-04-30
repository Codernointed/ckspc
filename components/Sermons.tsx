'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  {
    text: 'We believe that the door to salvation is always open and so are the doors to our church. Our mission is to be fully devoted to Jesus by opening our arms to those in search of the truth.',
    source: 'Church Mission Statement',
  },
  {
    text: 'We show God\'s love and concern for our fellow man at every opportunity. Through works of charity and opening our doors to listen and love, we feel that we are walking in the footsteps of Jesus Christ.',
    source: 'CKSPC Values',
  },
  {
    text: '"Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him, and will sup with him, and he with me."',
    source: 'Revelation 3:20',
  },
  {
    text: '"Precious in the sight of the Lord is the death of His saints." We honor those who have gone before us, walking faithfully in the path of righteousness.',
    source: 'Psalms 116:15',
  },
];

const Sermons = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % MESSAGES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length);

  return (
    <section className="sermons">
      <div className="sermons-head">
        <span className="section-label">From the Word</span>
        <h2 className="section-title">Messages &amp; Inspiration</h2>
      </div>

      <div className="sermons-slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="sermon-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sermon-quote-mark">&ldquo;</div>
            <p>{MESSAGES[current].text}</p>
            <footer>&mdash; {MESSAGES[current].source}</footer>
          </motion.div>
        </AnimatePresence>

        <div className="sermon-nav">
          <button
            className="sermon-nav-btn"
            onClick={prev}
            aria-label="Previous message"
          >
            &#8592;
          </button>
          <button
            className="sermon-nav-btn"
            onClick={next}
            aria-label="Next message"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sermons;
