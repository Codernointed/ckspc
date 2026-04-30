'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-name">
            Christ Kingdom Salvation
          </div>
          <p className="footer-brand-desc">
            Embracing the Sacred Flow. A community dedicated to timeless
            truth and spiritual growth since 1994.
          </p>
          <div className="footer-social">
            <a
              href="https://www.facebook.com/ckspc.hq.madina/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              f
            </a>
            <a href="mailto:info@ckspc.org" aria-label="Email">
              @
            </a>
            <a href="tel:+233246473136" aria-label="Phone">
              &#9742;
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link href="/#about">About Us</Link>
          <Link href="/ministries">Ministries</Link>
          <Link href="/leadership">Leadership</Link>
          <Link href="/media">Media</Link>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <Link href="/visit">Plan Your Visit</Link>
          <Link href="/#branches">Branches</Link>
          <Link href="/#services">Service Times</Link>
          <Link href="/#contact">Prayer Request</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href="tel:+233246473136">+233 24 647 3136</a>
          <a href="mailto:info@ckspc.org">info@ckspc.org</a>
          <span style={{ display: 'block', opacity: 0.6, padding: 'var(--space-xs) 0', fontSize: '0.88rem' }}>
            Baba Yara, Madina<br />
            Accra, Ghana
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Christ Kingdom Salvation Pentecostal Church. All Rights Reserved.</p>
        <p>
          <Link href="/#founder">History</Link>
          {' · '}
          <Link href="/leadership">Founders</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
