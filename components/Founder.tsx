'use client';

import { motion } from 'framer-motion';

export type FounderData = {
  name: string;
  role: string;
  imageUrl?: string;
  bio1: string;
  bio2?: string;
  bio3?: string;
  quote?: string;
};

const DEFAULT_FOUNDER: FounderData = {
  name: "Prophetess Beatrice Esther Afua Agyapomaa",
  role: "Founder & Leader (1929 – 2014)",
  imageUrl: "/ckspc-photos/97b65d_898e5de6fb484e80a4b783c59d8bc950.jpg",
  bio1: "Born on February 8, 1929 at Kwahu Tafo, Prophetess Beatrice Esther Afua Agyapomaa was converted to a saving knowledge of our Lord Jesus Christ and received a divine calling to ministry through Prophetess Paulina Agyekumwaa.",
  bio2: "By 1983, she had begun winning souls for Jesus Christ, starting with 37 converts. Through her unwavering faith and dedication, the Lord used her mightily for the conversion of souls and the outpouring of miracles. On March 20, 1994, God fulfilled His prophecy by giving the church its present name — Christ Kingdom Salvation Pentecostal Church.",
  bio3: "Under her guidance, the church witnessed immense growth spiritually and physically, expanding to multiple branches across Ghana. She faithfully served the Lord until her call to eternity on December 8, 2014.",
  quote: "“Nyame som yɛ kyen kyen soo soo” — The call to serve God is to suffer before gain.",
};

const Founder = ({ data }: { data?: FounderData }) => {
  const f = data ?? DEFAULT_FOUNDER;
  return (
    <section className="founder" id="founder">
      <motion.div className="founder-inner" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.8 }}>
        <motion.div className="founder-photo-wrap" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
          <img src={f.imageUrl || "/ckspc-photos/97b65d_898e5de6fb484e80a4b783c59d8bc950.jpg"} alt={f.name} className="founder-photo" />
          <div className="founder-photo-frame" />
        </motion.div>
        <motion.div className="founder-text" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.25 }}>
          <span className="section-label">Our Founder</span>
          <h3>{f.name}</h3>
          <span className="founder-role">{f.role}</span>
          <p>{f.bio1}</p>
          {f.bio2 && <p>{f.bio2}</p>}
          {f.bio3 && <p>{f.bio3}</p>}
          {f.quote && <div className="founder-quote"><p>{f.quote}</p></div>}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Founder;
