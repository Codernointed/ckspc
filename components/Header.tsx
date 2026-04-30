'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: isHome ? '#about' : '/#about', label: 'About' },
    { href: '/ministries', label: 'Ministries' },
    { href: '/leadership', label: 'Leadership' },
    { href: '/media', label: 'Media' },
    { href: isHome ? '#branches' : '/#branches', label: 'Branches' },
    { href: isHome ? '#contact' : '/#contact', label: 'Contact' },
  ];

  const showTransparent = isHome && !scrolled;

  return (
    <>
      <header className={`header ${showTransparent ? 'header--transparent' : 'header--solid'}`}>
        <Link href="/" className="header-logo" onClick={() => setMenuOpen(false)}>
          <img
            src="/ckspc-photos/97b65d_fa0183fb8a1540678bd6cff25460d971.jpg"
            alt="CKSPC Logo"
            className="header-logo-img"
          />
          <div className="header-logo-text">
            <span className="header-logo-name">Christ Kingdom Salvation</span>
            <span className="header-logo-tagline">Pentecostal Church</span>
          </div>
        </Link>

        <nav className="header-nav">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/visit" className="header-nav-cta">
            Plan Your Visit
          </Link>
        </nav>

        <button
          className="menu-btn"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link href="/visit" onClick={() => setMenuOpen(false)} className="btn-gold">
          Plan Your Visit
        </Link>
      </div>
    </>
  );
};

export default Header;
