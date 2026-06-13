/* Shared chrome — injects nav, footer, mobile drawer, ambient layers, quick actions.
   Loads BEFORE main.js so main.js can hook into the nav. */
(() => {
  const active = (document.body.dataset.page || '').toLowerCase();
  const is = k => active === k ? 'active' : '';

  const navHTML = `
    <div class="ambient-bg"></div>
    <div class="grain"></div>
    <nav class="nav">
      <a class="nav-brand" href="index.html">
        <span class="nav-mark"></span>
        <b>Gosarvam Global</b>
      </a>
      <div class="nav-links">
        <a class="${is('home')}"     href="index.html">Home</a>
        <a class="${is('about')}"    href="about.html">About</a>
        <a class="${is('products')}" href="products.html">Products</a>
        <a class="${is('catalogue')}"href="catalogue.html">Catalogue</a>
        <a class="${is('logistics')}"href="logistics.html">Logistics</a>
        <a class="${is('blog')}"     href="blog.html">Journal</a>
        <a class="${is('contact')}"  href="contact.html">Contact</a>
      </div>
      <button class="theme-toggle" aria-label="Toggle dark mode" title="Toggle theme">
        <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      </button>
      <a href="rfq.html" class="nav-cta btn-magnetic">
        Request Quote
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 13 13 3M6 3h7v7"/></svg>
      </a>
      <button class="nav-burger" aria-label="Menu">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </nav>
    <div class="mobile-drawer">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="products.html">Products</a>
      <a href="catalogue.html">Catalogue</a>
      <a href="logistics.html">Logistics</a>
      <a href="certifications.html">Certifications</a>
      <a href="blog.html">Journal</a>
      <a href="rfq.html">RFQ</a>
      <a href="contact.html">Contact</a>
    </div>`;

  const footerHTML = `
    <footer class="foot">
      <div class="wrap">
        <div class="foot-grid">
          <div class="foot-brand">
            <div class="logo"><span class="m"></span> Gosarvam Global</div>
            <p>Connecting India's soil with the world's future. A trusted export house of premium Indian agri &amp; eco products since 2025.</p>
            <p class="small mt-m">Gosarvam Global LLP<br/>Registered Office · Assam, India</p>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="about.html#vision">Vision &amp; Mission</a></li>
              <li><a href="certifications.html">Certifications</a></li>
              <li><a href="blog.html">Journal</a></li>
            </ul>
          </div>
          <div>
            <h5>Trade</h5>
            <ul>
              <li><a href="products.html">All Products</a></li>
              <li><a href="catalogue.html">Catalogue</a></li>
              <li><a href="logistics.html">Logistics</a></li>
              <li><a href="logistics.html#payment">Payment Terms</a></li>
              <li><a href="rfq.html">RFQ</a></li>
            </ul>
          </div>
          <div>
            <h5>Legal</h5>
            <ul>
              <li><a href="privacy.html">Privacy</a></li>
              <li><a href="terms.html">Terms</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5>Direct</h5>
            <ul>
              <li><a href="mailto:trade@gosarvamglobal.com">trade@gosarvamglobal.com</a></li>
              <li><a href="tel:+919999999999">+91 99999 99999</a></li>
              <li><a href="https://wa.me/919999999999" target="_blank" rel="noopener">WhatsApp · Sales</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div class="foot-bottom">
          <span>© 2025 Gosarvam Global LLP. All rights reserved.</span>
          <div class="socials">
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4v16H4zM6 2a2 2 0 110 4 2 2 0 010-4zM10 8h4v2h.05a4 4 0 016.95 2.5V20h-4v-6.4c0-1.5-.6-2.4-2-2.4s-2 .9-2 2.4V20h-4z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
            <a href="#" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h3l-7.5 8.6L22 22h-6.8l-5.3-6.6L4 22H1l8-9.2L1.5 2h7l4.8 6L18 2z"/></svg></a>
            <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2A4 4 0 0020 4H4a4 4 0 00-3 3.2A40 40 0 001 12c0 1.5.2 3.2.5 4.8A4 4 0 004 20h16a4 4 0 003-3.2A40 40 0 0023 12c0-1.5-.2-3.2-.5-4.8zM10 15.5v-7l6 3.5z"/></svg></a>
          </div>
        </div>
      </div>
    </footer>
    <div class="quick-actions">
      <a class="qa-chip wa" href="https://wa.me/919999999999" target="_blank" rel="noopener" aria-label="WhatsApp">
        <span class="qa-tip">WhatsApp</span>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 002 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4A10 10 0 1012 2zm5.4 14c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-1.7-.1-.4-.1-1-.3-1.6-.6-2.9-1.2-4.8-4.2-4.9-4.4-.1-.2-1.2-1.6-1.2-3 0-1.4.7-2.1 1-2.4.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.3.5c-.1.2-.2.3-.1.5.2.3.7 1.2 1.6 2 1.1.9 2 1.2 2.2 1.3.2.1.4.1.5-.1.2-.2.6-.7.8-1 .2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.5.3.1.2.1.7-.1 1.4z"/></svg>
      </a>
      <a class="qa-chip" href="tel:+919999999999" aria-label="Call">
        <span class="qa-tip">Call sales</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1A19.5 19.5 0 015.1 12.8 19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.6a16 16 0 006.4 6.4l1.2-1.2a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6a2 2 0 011.7 1.9z"/></svg>
      </a>
      <a class="qa-chip" href="rfq.html" aria-label="RFQ">
        <span class="qa-tip">Request Quote</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8"/></svg>
      </a>
    </div>`;

  const preloaderHTML = `
    <div class="preloader">
      <div class="preloader-orbit"></div>
      <div class="preloader-inner">
        <div class="preloader-logo">
          <span class="ch">G</span><span class="ch">O</span><span class="ch">S</span><span class="ch">A</span><span class="ch">R</span><span class="ch">V</span><span class="ch">A</span><span class="ch">M</span>
        </div>
        <div class="preloader-sub">Harvesting heritage · Exporting trust</div>
        <div class="preloader-bar"><span></span></div>
        <div class="preloader-pct">000 %</div>
      </div>
    </div>`;

  // Inject — preloader and nav at top of body, footer at end (before any final scripts).
  if (!document.querySelector('.preloader') && document.body.dataset.preloader !== 'false') {
    document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
  }
  if (!document.querySelector('.nav')) {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }
  if (!document.querySelector('.foot')) {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
})();
