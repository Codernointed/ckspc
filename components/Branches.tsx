'use client';

import { motion } from 'framer-motion';

export type BranchItem = {
  name: string;
  address: string;
  area: string;
  service: string;
  phone: string;
  isHQ: boolean;
  img: string;
  mapsHref: string;
};

const DEFAULT_BRANCHES: BranchItem[] = [
  {
    name: 'Madina Central',
    address: 'Baba Yara, Madina',
    area: 'Accra, Ghana',
    service: 'Sun Service: 8:00 AM - 11:30 AM',
    phone: '+233 24 647 3136',
    isHQ: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR3xXNOQG1gBkSQxbkVQGCLs0bzmt4AjqSOsWzpiI-LlzfzyLcPbcOR_XEJFY7RxkWmgqTFQPY5x-IlNGFEv5Z1n_cHKaLryYitYuZlc4TBWPwvxmbbtN0L6t5f3Hs7JTjQ67xYvH5I30IUBHJzUx-RybRlL_gZu2j2Io4IALqOi3gHL909KCZZuG5Sg2tWgtcWw6kFjkvFlPK-gOgwDUhG7Zl74YHlTcoWtKHjEP2XGQ5gzuCIFanCBXoxHrN_4eSz3fg6wzj_Hw',
    mapsHref: 'https://www.google.com/maps/search/?api=1&query=Madina+Central',
  },
];

const Branches = ({ items }: { items?: BranchItem[] }) => {
  const list = items && items.length > 0 ? items : DEFAULT_BRANCHES;

  return (
    <section className="branches" id="branches">
      <div className="branches-head">
        <span className="section-label">Our Locations</span>
        <h2 className="section-title">Our Branches</h2>
        <p>
          Find a Christ Kingdom Salvation branch near you. Join our growing community of
          faith across the region, where every location embodies our shared commitment
          to spiritual growth and fellowship.
        </p>
      </div>

      <div className="branches-grid">
        {list.map((branch, i) => (
          <motion.div
            key={branch.name + i}
            className="branch-card"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="branch-card-img">
              {branch.img ? (
                <img src={branch.img} alt={branch.name} />
              ) : (
                <div
                  aria-hidden="true"
                  style={{
                    width: '100%',
                    height: '100%',
                    background:
                      'linear-gradient(135deg, #061168 0%, #000666 60%, #00033a 100%)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 40,
                  }}
                >
                  ✦
                </div>
              )}
              {branch.isHQ && (
                <span className="branch-hq-badge">
                  &#9733; Headquarters
                </span>
              )}
            </div>

            <div className="branch-card-body">
              <h3>{branch.name}</h3>

              <div className="branch-detail">
                <span className="branch-detail-icon">&#9906;</span>
                <div>
                  <div>{branch.address}</div>
                  <div style={{ opacity: 0.7 }}>{branch.area}</div>
                </div>
              </div>

              <div className="branch-detail">
                <span className="branch-detail-icon">&#9201;</span>
                <span>{branch.service}</span>
              </div>

              <div className="branch-detail">
                <span className="branch-detail-icon">&#9742;</span>
                <span>{branch.phone}</span>
              </div>

              <a
                href={branch.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="branch-card-btn"
              >
                Get Directions <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Branches;
