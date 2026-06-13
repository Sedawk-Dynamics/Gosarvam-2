'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const a = (href: string) => pathname === href ? 'active' : '';

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Outer wrapper — transparent, full-width, just for fixed positioning */}
      <nav className="nav-wrap" aria-label="Main navigation">
        {/* Inner pill — the visible frosted-glass element */}
        <div className={`nav-pill${scrolled ? ' scrolled' : ''}`}>

          <Link className="nav-brand" href="/">
            <span className="nav-mark" />
            <b>Gosarvam Global</b>
          </Link>

          <div className="nav-links">
            <Link href="/"          className={a('/')}>Home</Link>
            <Link href="/about"     className={a('/about')}>About</Link>
            <Link href="/products"  className={a('/products')}>Products</Link>
            <Link href="/catalogue" className={a('/catalogue')}>Catalogue</Link>
            <Link href="/logistics" className={a('/logistics')}>Logistics</Link>
            <Link href="/blog"      className={a('/blog')}>News</Link>
            <Link href="/contact"   className={a('/contact')}>Contact</Link>
          </div>

          <Link href="/rfq" className="nav-cta">
            Request Quote
            <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 13 13 3M6 3h7v7"/>
            </svg>
          </Link>

          <button className="nav-burger" aria-label="Open menu" onClick={() => setOpen(!open)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              {open
                ? <path d="M6 18 18 6M6 6l12 12"/>
                : <path d="M4 7h16M4 12h16M4 17h16"/>}
            </svg>
          </button>

        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/products">Products</Link>
        <Link href="/catalogue">Catalogue</Link>
        <Link href="/logistics">Logistics</Link>
        <Link href="/blog">News</Link>
        <Link href="/rfq">Request Quote</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </>
  );
}
