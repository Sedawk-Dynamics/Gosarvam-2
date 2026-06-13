import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";

export const metadata: Metadata = {
  title: "Gosarvam Global  — Harvesting Heritage, Exporting Trust",
  description:
    "Gosarvam Global  exports authentic, sustainable, premium Indian products — Assam Tea, Jute, Fox Nuts, Jaggery, Moringa, Cow Dung Eco Solutions, and Food Essentials — to buyers across 30+ countries.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#111111" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}})();` }} />
      </head>
      <body>
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <a className="qa-chip wa" href="https://wa.me/919999999999" target="_blank" rel="noopener" aria-label="WhatsApp" style={{position:'fixed',right:'22px',bottom:'22px',zIndex:100,width:'54px',height:'54px',borderRadius:'50%',display:'grid',placeItems:'center',background:'#25D366',color:'white',boxShadow:'0 4px 20px rgba(37,211,102,0.4)',transition:'transform .3s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'24px',height:'24px'}}><path d="M12 2A10 10 0 002 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4A10 10 0 1012 2zm5.4 14c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-1.7-.1-.4-.1-1-.3-1.6-.6-2.9-1.2-4.8-4.2-4.9-4.4-.1-.2-1.2-1.6-1.2-3 0-1.4.7-2.1 1-2.4.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.3.5c-.1.2-.2.3-.1.5.2.3.7 1.2 1.6 2 1.1.9 2 1.2 2.2 1.3.2.1.4.1.5-.1.2-.2.6-.7.8-1 .2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.5.3.1.2.1.7-.1 1.4z"/></svg>
        </a>

        {/* Reveal animation — IntersectionObserver adds .in class, no GSAP needed */}
        <Script id="reveal-observer" strategy="afterInteractive">{`
          (function(){
            var io = new IntersectionObserver(function(entries){
              entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
            }, { threshold: 0.12 });
            function observe(){
              document.querySelectorAll('.r-up,.r-fade,.r-clip,.split-line').forEach(function(el){ io.observe(el); });
            }
            if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', observe); } else { observe(); }
            // Re-run on route change for Next.js
            var mo = new MutationObserver(function(){ observe(); });
            mo.observe(document.body, { childList: true, subtree: true });
          })();
        `}</Script>
        <Script src="https://cdn.jsdelivr.net/npm/lenis@1.0.42/dist/lenis.min.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
