'use client';

import { motion } from 'framer-motion';

export type ServiceItem = { title: string; desc: string; img: string; time: string };

const DEFAULT_SERVICES: ServiceItem[] = [
  { title: 'Sunday Worship', desc: "Join us every Sunday morning for a powerful time of worship, praise, and the preaching of God's Word.", img: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=700&auto=format&fit=crop', time: 'Sundays 9:00 AM' },
  { title: 'Midweek Service', desc: 'Recharge your spirit midweek with prayer, Bible study, and fellowship with other believers.', img: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=700&auto=format&fit=crop', time: 'Wednesdays 7:00 PM' },
  { title: 'Friday Prayer Meeting', desc: "A dedicated time of intercessory prayer and spiritual warfare to seek God's face together.", img: 'https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=700&auto=format&fit=crop', time: 'Fridays 7:00 PM' },
  { title: "Women's Fellowship", desc: 'Building strong women of faith through fellowship, Bible reading, and mutual encouragement.', img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=700&auto=format&fit=crop', time: 'Wednesdays after Service' },
  { title: 'Youth Ministry', desc: 'Raising the next generation of Spirit-filled leaders through dynamic worship and mentorship.', img: 'https://images.unsplash.com/photo-1523803326055-9729b9e02e5a?q=80&w=700&auto=format&fit=crop', time: 'Saturdays 4:00 PM' },
  { title: 'Special Programs', desc: 'Weddings, conventions, revival meetings, and special celebrations throughout the year.', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=700&auto=format&fit=crop', time: 'As Announced' },
];

const Services = ({ items }: { items?: ServiceItem[] }) => {
  const SERVICES = items && items.length > 0 ? items : DEFAULT_SERVICES;
  return (
    <section className="services" id="services">
      <div className="services-head">
        <span className="section-label">Join Us for Worship</span>
        <h2 className="section-title">Services & Ministries</h2>
      </div>

      <div className="services-grid">
        {SERVICES.map((service, i) => (
          <motion.article
            key={service.title}
            className="service-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div
              className="service-card-img"
              style={{ backgroundImage: `url(${service.img})` }}
            >
              <span className="service-card-time">{service.time}</span>
            </div>
            <div className="service-card-body">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <span className="service-card-link">
                Learn More <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Services;
