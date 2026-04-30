'use client';

import { motion } from 'framer-motion';

const Founder = () => {
  return (
    <section className="founder" id="founder">
      <motion.div
        className="founder-inner"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="founder-photo-wrap"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <img
            src="/ckspc-photos/97b65d_898e5de6fb484e80a4b783c59d8bc950.jpg"
            alt="Prophetess Beatrice Esther Afua Agyapomaa"
            className="founder-photo"
          />
          <div className="founder-photo-frame" />
        </motion.div>

        <motion.div
          className="founder-text"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <span className="section-label">Our Founder</span>
          <h3>Prophetess Beatrice Esther Afua Agyapomaa</h3>
          <span className="founder-role">Founder & Leader (1929 &ndash; 2014)</span>
          <p>
            Born on February 8, 1929 at Kwahu Tafo, Prophetess Beatrice Esther Afua Agyapomaa
            was converted to a saving knowledge of our Lord Jesus Christ and received a divine
            calling to ministry through Prophetess Paulina Agyekumwaa.
          </p>
          <p>
            By 1983, she had begun winning souls for Jesus Christ, starting with 37 converts.
            Through her unwavering faith and dedication, the Lord used her mightily for the
            conversion of souls and the outpouring of miracles. On March 20, 1994, God fulfilled
            His prophecy by giving the church its present name &mdash; Christ Kingdom Salvation
            Pentecostal Church.
          </p>
          <p>
            Under her guidance, the church witnessed immense growth spiritually and physically,
            expanding to multiple branches across Ghana. She faithfully served the Lord until
            her call to eternity on December 8, 2014.
          </p>

          <div className="founder-quote">
            <p>
              &ldquo;Nyame som y&#603; kyen kyen soo soo&rdquo; &mdash; The call to serve God
              is to suffer before gain.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Founder;
