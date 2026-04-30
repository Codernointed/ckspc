'use client';

import { motion } from 'framer-motion';

const BRANCHES = [
  {
    name: 'Madina Central',
    address: 'Baba Yara, Madina',
    area: 'Accra, Ghana',
    service: 'Sun Service: 8:00 AM - 11:30 AM',
    phone: '+233 24 647 3136',
    isHQ: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR3xXNOQG1gBkSQxbkVQGCLs0bzmt4AjqSOsWzpiI-LlzfzyLcPbcOR_XEJFY7RxkWmgqTFQPY5x-IlNGFEv5Z1n_cHKaLryYitYuZlc4TBWPwvxmbbtN0L6t5f3Hs7JTjQ67xYvH5I30IUBHJzUx-RybRlL_gZu2j2Io4IALqOi3gHL909KCZZuG5Sg2tWgtcWw6kFjkvFlPK-gOgwDUhG7Zl74YHlTcoWtKHjEP2XGQ5gzuCIFanCBXoxHrN_4eSz3fg6wzj_Hw',
  },
  {
    name: 'Danfa Assembly',
    address: 'Danfa Main Road',
    area: 'Near the New Market',
    service: 'Sun Service: 8:30 AM - 11:30 AM',
    phone: '+233 55 987 6543',
    isHQ: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrVl3CICPWzC_eO2LEJWlyVzqtAfHsIeEc9FtDdOGOOrCVWlTiJcqTqDB1ZEBTaibtjALovcUEGA8ZVvVrBMTibj4UWmtBkNHUFKNNyCotgjctubURSJYs_jg438rbPh72ZH3h8SMLcKqQTcM7XFp_hZ_5ifyVrIZzQTduf1EiMFqnN3NuGcEC3C8mc4SrUGjsfRWoIoDK7ijh88a3qxgEi4Nin115qAxBPwSdJ9fE706i1fdDZmdWR8-zy_C-2NIsVIp2Omlhlkk',
  },
  {
    name: 'Abonya Sanctuary',
    address: 'Abonya Hills Estate',
    area: 'Valley View, Accra',
    service: 'Sun Service: 9:00 AM - 12:00 PM',
    phone: '+233 20 456 7890',
    isHQ: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcETN_K746-hhGfqa78RkAOabyld1XiKAbt0TmzVS7AzQf3w8rNzPrxk_88_SUu3_17CY7E8fggVfx3Sn2RciVEsc9b_myO6GJrL4bVl5hj16OvlXmb9cEaODxQkRfo4Busa9OVhjRzKbXtW-lJaDu_J_ogdQ4ZBHpE8lJbF6i6NXEENMf_9-FC0cJPF-MKI5ATwwd94zmV3n8hfCyej0wXRDPfI0wlkbOpM8Z1p9ObLV0c-m-HlZOuMOU8D9gjuELH95WnLSZEs8',
  },
  {
    name: 'Tema Community',
    address: 'Community 9',
    area: 'Near the Roundabout, Tema',
    service: 'Sun Service: 8:00 AM - 11:30 AM',
    phone: '+233 27 111 2222',
    isHQ: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKr3KLXBzToe5IN9eIZ7lS1A9ZR24wX81zJJGBbH59LHPLk6Hnlri4ybhyajU3x51KFGbW5SHzq-Ei-AI-BzXzI9IXDwf9fApA5tX9oNSNjmfqNJNFAoAiauiAwJ4xQcKJIXP4bYSSR7nMKjfzUg8Tb74nCA8OnWSoyeTGrutbW8FYkVHrqWJAZm2C1zvT_pvlfk1KP7XlPWif3b6Xvvn2tg160mRsyNY--M4UhRGtj8hzJSZc2mS1wE6n2v1tSgBSbzyJe8KwIDA',
  },
  {
    name: 'Kasoa Tabernacle',
    address: 'Kasoa Toll Booth Road',
    area: 'Opposite the new Mall',
    service: 'Sun Service: 8:30 AM - 12:00 PM',
    phone: '+233 54 333 4444',
    isHQ: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb8ezlHgDnPD66fCB9KE0Zq398UdiVDIArpbQcHriuvmEisPT40PDgJjNDbNEkRSWQlUBArQYcAZMMNGKNxskfJD2xn9PTXLRmmZK6lVyB94pLH5dr8wNYlDuktrco1CbP2jMWsvfw5DB-7jGUky_ZfywcF0qITtvjdvrIdKOult5PF1HE_5EJcT-oQLjFT5kOqF3HOUp-UkIkLdPrytXtSRJrMS064xeAFD5py_ZJN-ziJnPZH9LNXmEpR_3tRueSPoEs8B6b870',
  },
  {
    name: 'Bawaleshie Center',
    address: 'East Legon Extension',
    area: 'Bawaleshie Junction',
    service: 'Sun Service: 9:00 AM - 12:00 PM',
    phone: '+233 26 555 6666',
    isHQ: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgWsaHifNmfT_YPmzV6G0URnz6P4MgIfAe1u-jHyB2n4VaZ5p183TNlMjuZBrVG2YnUQqmZ6FvKM9x4b8vmd4WFBIQWUV-VlEBljXLR6mbaeD24k8xgORMuWWTPvR87iLGOm8J1WjNeV0zoeqZNEfOhKTC6HRy3y0rVbNfLWgYdCR4G5hflKaGNmcFe1LcFVCtfz1HpJWRlHU87Os8w6XeoWc7XSCGRH5MyogHLH8ueZaLQxPgOfqdH0MltHYgjWj7eefKcaVbJ70',
  },
];

const Branches = () => {
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
        {BRANCHES.map((branch, i) => (
          <motion.div
            key={branch.name}
            className="branch-card"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="branch-card-img">
              <img src={branch.img} alt={branch.name} />
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

              <a href="#" className="branch-card-btn">
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
