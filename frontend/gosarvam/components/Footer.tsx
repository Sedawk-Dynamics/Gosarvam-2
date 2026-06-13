'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSent(true); setEmail(''); }
  };

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">

          {/* Brand */}
          <div className="foot-brand">
            <div className="logo">
              <span className="m" />
              Gosarvam Global
            </div>
            <p>
              Connecting India&apos;s soil with the world&apos;s future. A trusted export
              house of premium Indian agri &amp; eco products since 2026.
            </p>
            <p className="small" style={{marginTop:'16px',color:'rgba(255,255,255,0.25)'}}>
              Gosarvam Global LLP<br />
              Registered Office · Assam, India
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/certifications">Certifications</Link></li>
              <li><Link href="/blog">News</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h5>Products</h5>
            <ul>
              <li><Link href="/products/assam-tea">Assam Tea</Link></li>
              <li><Link href="/products/jute">Jute Products</Link></li>
              <li><Link href="/products/fox-nuts">Fox Nuts</Link></li>
              <li><Link href="/products/jaggery">Jaggery</Link></li>
              <li><Link href="/products/moringa">Moringa</Link></li>
              <li><Link href="/products/cow-dung">Eco Solutions</Link></li>
              <li><Link href="/products/essentials">Food Essentials</Link></li>
            </ul>
          </div>

          {/* Trade */}
          <div>
            <h5>Trade</h5>
            <ul>
              <li><Link href="/catalogue">Catalogue</Link></li>
              <li><Link href="/logistics">Logistics</Link></li>
              <li><Link href="/logistics#payment">Payment Terms</Link></li>
              <li><Link href="/rfq">Request Quote</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h5>Direct</h5>
            <ul style={{marginBottom:'28px'}}>
              <li>
                <a href="mailto:trade@gosarvamglobal.com">trade@gosarvamglobal.com</a>
              </li>
              <li>
                <a href="tel:+919999999999">+91 99999 99999</a>
              </li>
            </ul>
            <h5>Stay Updated</h5>
            <div className="foot-newsletter">
              {sent ? (
                <p style={{fontSize:'13px',color:'rgba(255,255,255,0.55)',paddingTop:'8px'}}>
                  Thank you — we&apos;ll be in touch.
                </p>
              ) : (
                <form onSubmit={handleNewsletter}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit">Subscribe</button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="foot-bottom">
          <span>© 2026 Gosarvam Global LLP. All rights reserved.</span>
          <div className="socials">
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                <path d="M4 4h4v16H4zM6 2a2 2 0 110 4 2 2 0 010-4zM10 8h4v2h.05a4 4 0 016.95 2.5V20h-4v-6.4c0-1.5-.6-2.4-2-2.4s-2 .9-2 2.4V20h-4z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                <path d="M18 2h3l-7.5 8.6L22 22h-6.8l-5.3-6.6L4 22H1l8-9.2L1.5 2h7l4.8 6L18 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
