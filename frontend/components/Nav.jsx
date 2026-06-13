'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      const resolved =
        stored ||
        (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
      setTheme(resolved);
    } catch (e) {}
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
    document.documentElement.dataset.theme = next;
  };

  const closeDrawer = () => setDrawerOpen(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/products', label: 'Products' },
    { href: '/catalogue', label: 'Catalogue' },
    { href: '/logistics', label: 'Logistics' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="nav">
        {/* Brand */}
        <Link href="/" className="nav-brand" onClick={closeDrawer}>
          <span className="nav-mark" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
              <circle cx="16" cy="16" r="6" fill="currentColor" />
              <line x1="16" y1="1" x2="16" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="24" x2="16" y2="31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="1" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="16" x2="31" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="nav-brand-text">Gosarvam Global</span>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links" role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={pathname === href ? 'active' : ''}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right-side controls */}
        <div className="nav-actions">
          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              /* Sun icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* CTA */}
          <Link href="/rfq" className="nav-cta">
            Request Quote
          </Link>

          {/* Burger */}
          <button
            className={`nav-burger${drawerOpen ? ' open' : ''}`}
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
          >
            {drawerOpen ? (
              /* X icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`mobile-drawer${drawerOpen ? ' open' : ''}`}
        aria-hidden={!drawerOpen}
      >
        <ul role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={pathname === href ? 'active' : ''}
                onClick={closeDrawer}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/rfq" className="nav-cta" onClick={closeDrawer}>
              Request Quote
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
