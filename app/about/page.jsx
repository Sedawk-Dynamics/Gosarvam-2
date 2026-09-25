
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero" style={{textAlign:'center'}}>
        <div className="wrap">
          <div className="section-tag" style={{justifyContent:'center'}}><span className="dot" /><span>About Us</span></div>
          <h1 className="r-up">A house built on <span className="italic-serif">soil</span>,<br/>shaped by <span className="italic-serif">trust.</span></h1>
          <p className="lead r-up mt-m" style={{maxWidth:'52ch',margin:'16px auto 0'}}>
            Gosarvam Global is an Indian export house founded on a single belief: that the world deserves to know the real taste,
            texture, and heritage of authentic Indian agri-products — not diluted versions, not compromises.
          </p>
        </div>
      </section>

      {/* FOUNDING STORY */}
      <section style={{paddingTop:'clamp(40px,4vw,60px)'}}>
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>The Founding</span></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',alignItems:'start',margin:'24px 0 0'}}>
            <h2 className="r-up">Born from a love of <span className="italic-serif">the land.</span></h2>
            <div>
              <p className="lead r-up">
                Our founders grew up watching India&apos;s finest produce — premium Assam teas, hand-processed fox nuts, cold-pressed
                jaggery — disappear into local supply chains at a fraction of their true worth. Gosarvam was born to change that.
              </p>
              <p className="r-up mt-s text-mute">
                The name Gosarvam (Sanskrit: सर्वम् · all things good of the earth) captures our mission perfectly —
                to bring all that is genuine, nourishing, and heritage-rooted in India to buyers who value quality over commodity.
              </p>
              <p className="r-up mt-s text-mute">
                Registered in 2023 and headquartered in Assam, with a sub-office in Dholera, Gujarat, we operate with a lean, expert team that combines deep agricultural knowledge with global trade expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section id="founder">
        <div className="wrap">
          <div className="story-grid">
            <div className="story-image r-up">
              <Image
                src="/images/founder-nilutpal.png"
                alt="Nilutpal, Managing Partner & Marketing Head, Gosarvam Global LLP"
                fill
                sizes="(max-width: 980px) 100vw, 50vw"
                style={{objectPosition:'center top'}}
              />
              <div className="cap"><span>Nilutpal</span><span>Managing Partner</span></div>
            </div>
            <div>
              <div className="section-tag"><span className="dot" /><span>Meet the Founder</span></div>
              <h2 className="r-up">From sales executive to <span className="italic-serif">entrepreneur.</span></h2>
              <p className="lead r-up mt-m">
                My career began in 2015 on the frontlines of sales. Across years in the private sector, I learned that sustainable
                growth isn&apos;t just about hitting targets — it&apos;s about building trust, understanding customer needs, and
                delivering genuine value.
              </p>
              <p className="r-up mt-s text-mute">
                In 2022, driven by a vision to build something with lasting impact, I co-founded Gosarvam Global LLP alongside my
                brother. Our goal is simple: connect India&apos;s agricultural heritage with global demand.
              </p>
              <p className="r-up mt-s text-mute">
                Today, we create international opportunities for local farmers and rural producers by exporting premium natural products:
              </p>
              <ul className="r-up mt-s text-mute" style={{paddingLeft:'1.2rem',lineHeight:1.9}}>
                <li>Tea &amp; Mushrooms</li>
                <li>Fox Nuts (Makhana)</li>
                <li>Moringa Powder</li>
                <li>Value-Added Agricultural Products</li>
              </ul>
              <blockquote className="r-up mt-m" style={{borderLeft:'2px solid var(--gold)',paddingLeft:'1.25rem',margin:'32px 0 0'}}>
                <p style={{fontFamily:'var(--font-serif)',fontStyle:'italic',fontSize:'1.2rem',lineHeight:1.5}}>
                  &ldquo;Success is not just about earning profits. It is about creating opportunities, building trust, and making a
                  positive impact on society.&rdquo;
                </p>
                <footer className="mt-s">
                  <strong>— Nilutpal</strong>
                  <span className="text-mute" style={{display:'block',fontSize:'0.85rem'}}>Managing Partner &amp; Marketing Head, Gosarvam Global LLP</span>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* VISION MISSION */}
      <section id="vision" style={{background:'var(--bg-alt)'}}>
        <div className="wrap">
          <div className="products-head">
            <div>
              <div className="section-tag"><span className="dot" /><span>Purpose</span></div>
              <h2 className="r-up" style={{maxWidth:'20ch'}}>Vision &amp; <span className="italic-serif">Mission</span></h2>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'2rem',marginTop:'2rem'}}>
            <div className="cert-card r-up" style={{padding:'2.5rem'}}>
              <div className="seal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg>
              </div>
              <h3 style={{fontFamily:'var(--serif)',marginBottom:'1rem'}}>Our Vision</h3>
              <p className="lead">
                To make India the world&apos;s most trusted source of premium agri and eco products — and to see every exporting farmer
                earn what their craft truly deserves.
              </p>
            </div>
            <div className="cert-card r-up" style={{padding:'2.5rem'}}>
              <div className="seal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
              </div>
              <h3 style={{fontFamily:'var(--serif)',marginBottom:'1rem'}}>Our Mission</h3>
              <p className="lead">
                To source, process, certify, and ship India&apos;s finest agri-products with full traceability, fair farmer payments,
                eco-conscious packaging, and uncompromising quality — delivered on time, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{background:'var(--bg)'}}>
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>What We Stand For</span></div>
          <h2 className="r-up" style={{maxWidth:'20ch'}}>Six principles that <span className="italic-serif">guide every shipment.</span></h2>
          <div className="cert-grid" style={{marginTop:'3rem'}}>
            {[
              ['Traceability','Full farm-to-port audit trail on every consignment.'],
              ['Fair Trade','Above-market pricing for every farmer partner.'],
              ['Zero Compromise','One quality standard — export grade — for every market.'],
              ['Eco Packaging','Biodegradable, jute-based, and FSC-certified materials.'],
              ['On-Time Delivery','99.6% on-time shipment record since inception.'],
              ['Compliance First','FSSAI, APEDA, IEC, HACCP certified across all product lines.'],
            ].map(([t,d]) => (
              <div key={t} className="cert-card r-up">
                <div className="seal">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <h4>{t}</h4><span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="wrap">
          <div className="cta-band" style={{gridTemplateColumns:'1fr',textAlign:'center'}}>
            <div>
              <h2 className="r-up">Ready to source from <i>India?</i></h2>
              <p className="r-up lead mt-s" style={{textAlign:'center',margin:'16px auto 0',maxWidth:'48ch'}}>Send us your requirements and our trade team responds within 24 hours.</p>
              <div style={{marginTop:'32px',display:'flex',justifyContent:'center',gap:'14px',flexWrap:'wrap'}}>
                <Link href="/rfq" className="btn btn-gold btn-magnetic">
                  Request a Quotation
                  <svg className="btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13 13 3M6 3h7v7"/></svg>
                </Link>
                <Link href="/contact" className="btn btn-ghost btn-magnetic">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
