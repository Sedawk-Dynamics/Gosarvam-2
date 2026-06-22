'use client';
import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// All canvas/heavy components are below the fold — lazy load them to keep
// the initial JS bundle small and avoid parsing Three.js / react-simple-maps on load.
const FloatingGeo    = dynamic(() => import('@/components/canvas/FloatingGeo'),    { ssr: false });
const WorldMap       = dynamic(() => import('@/components/canvas/WorldMap'),       { ssr: false });
const FlowLines      = dynamic(() => import('@/components/canvas/FlowLines'),      { ssr: false });
const MorphGlobe     = dynamic(() => import('@/components/canvas/MorphGlobe'),     { ssr: false });
const ProductCoverflow = dynamic(() => import('@/components/ProductCoverflow'),     { ssr: false });

const PRODUCTS = [
  {
    num: '01',
    slug: 'assam-tea',
    name: 'Assam Orthodox Tea',
    sub: 'Premium Tea · Single Origin · APEDA Certified',
    desc: 'Hand-plucked black tea from elevation estates along the Brahmaputra valley. Available in first flush, second flush, and blending grades. Full estate traceability on every consignment.',
    points: ['SFTGFOP1, FTGFOP, TGFOP, BOP, Fannings, Dust grades', 'Min. order 1 MT per grade · Orthodox whole-leaf processing', 'FSSAI, ISO 22000, APEDA certified'],
  },
  {
    num: '02',
    slug: 'jute',
    name: 'Jute Products',
    sub: 'Eco Fibre · Golden Fibre · Carbon-Negative',
    desc: '100% biodegradable jute across bags, sacks, carpet backing, rugs, and bespoke handicrafts. The most versatile natural fibre on the planet, sourced from Bengal and Assam estates.',
    points: ['TD3 to TD6 fibre grades · Mestia grade available', 'Min. order 500 pieces or 1 MT fibre', 'Jute Mark, OEKO-TEX certified'],
  },
  {
    num: '03',
    slug: 'fox-nuts',
    name: 'Fox Nuts (Makhana)',
    sub: 'Superfood · Vegan · Gluten-Free',
    desc: 'Puffed lotus seeds from Bihar — protein-rich, gluten-free, low in fat. Global health-food markets are surging. We supply plain, roasted, flavoured, and as flour.',
    points: ['Suta (6mm+), Lawa (5–6mm), Samanya (4–5mm) grades', 'Min. order 500 kg · Retail pouches to bulk sacks', 'FSSAI, Organic India, APEDA certified'],
  },
  {
    num: '04',
    slug: 'jaggery',
    name: 'Organic Jaggery',
    sub: 'Natural Sweetener · No Chemicals',
    desc: 'Boiled in iron pans from pure sugarcane juice without additives. Deep caramel-molasses profile, naturally rich in iron, calcium and potassium. Block, granule, powder, and liquid forms.',
    points: ['A Grade Golden · B Grade Dark · Powder · Liquid Kakvi', 'Min. order 1 MT · 5 kg / 25 kg / 50 kg packaging', 'FSSAI, Organic India, USDA Organic (select lots)'],
  },
  {
    num: '05',
    slug: 'moringa',
    name: 'Moringa Powder',
    sub: 'Superfood · Certified Organic',
    desc: 'Shade-dried Moringa oleifera leaves stone-milled to preserve maximum nutritional value. 27g protein per 100g dry weight. Leaf powder, seed oil, capsules, and extract available.',
    points: ['A Grade bright green · seed oil cold-pressed', 'Min. order 200 kg · 1 kg to 25 kg craft bags', 'FSSAI, USDA Organic, EU Organic certified'],
  },
  {
    num: '06',
    slug: 'cow-dung',
    name: 'Cow Dung Eco Solutions',
    sub: 'Sacred Eco · Vedic Products',
    desc: 'Vedic tradition meets modern sustainability. Incense cakes, organic fertiliser, biodegradable pots, and ritual dhoop sticks — each crafted by artisan cooperatives across Assam and Gujarat.',
    points: ['Premium incense cakes · Dhoop sticks · Eco-pots', 'Min. order 500 units / 200 kg manure', 'Organic India, FSSAI certified'],
  },
  {
    num: '07',
    slug: 'essentials',
    name: 'Food Essentials',
    sub: 'Pantry Staples · Export Grade',
    desc: 'Turmeric from Erode. Basmati from Punjab. Coconut oil from Kerala. The full depth of the Indian pantry — spices, pulses, grains, and cold-pressed oils — graded for global export.',
    points: ['Turmeric, Cumin, Coriander, Basmati, Toor Dal, Mustard Oil', 'Min. order 500 kg per SKU · retail to IBC packaging', 'FSSAI, AGMARK, Spices Board certified'],
  },
];

export default function Home() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <header className="hero">
        <div className="hero-bg">
          {/* Hero video — nature/tea garden footage */}
          <video
            autoPlay muted loop playsInline
            preload="metadata"
            style={{
              position:'absolute', inset:0, width:'100%', height:'100%',
              objectFit:'cover', objectPosition:'center',
              zIndex:1,
            }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-veil" />
        </div>

        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow r-fade" style={{color:'rgba(255,255,255,0.5)',justifyContent:'center',marginBottom:'28px'}}>
                Indian Export House &nbsp;·&nbsp; Est. 2023
              </div>
              <h1 className="hero-title">
                <span className="line"><span className="word">Moving</span></span>
                <span className="line">
                  <span className="word">India&apos;s </span>{' '}
                  <span className="word accent">Finest,</span>
                </span>
                <span className="line"><span className="word">Building Trust.</span></span>
              </h1>
              <p className="hero-sub">
                Gosarvam Global is an India-based export house supplying{' '}
                premium agri-products to buyers across 30+ countries —{' '}
                sourced ethically, packed meticulously, shipped worldwide.
              </p>

              <div className="export-strip">
                <span className="lbl">What we export</span>
                {[['assam-tea','Assam Tea'],['jute','Jute'],['fox-nuts','Fox Nuts'],['jaggery','Jaggery'],['moringa','Moringa'],['cow-dung','Eco Solutions'],['essentials','Food Essentials']].map(([s,n]) => (
                  <Link key={s} href={`/products/${s}`} className="export-chip">
                    <span className="dot" />{n}
                  </Link>
                ))}
              </div>

              <div className="hero-meta" style={{justifyContent:'center'}}>
                <div className="stat">
                  <span className="num"><span data-count="30">30</span>+</span>
                  <span className="lbl">Countries Served</span>
                </div>
                <div className="stat">
                  <span className="num"><span data-count="7">7</span></span>
                  <span className="lbl">Export Categories</span>
                </div>
                <div className="stat">
                  <span className="num"><span data-count="100">100</span>%</span>
                  <span className="lbl">Sourced In India</span>
                </div>
              </div>

              <div style={{marginTop:'40px',display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
                <Link href="/rfq" className="btn btn-gold">
                  Request a Quotation
                  <svg className="btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13 13 3M6 3h7v7"/></svg>
                </Link>
                <Link href="/products" className="btn btn-ghost" style={{color:'rgba(255,255,255,0.8)',borderColor:'rgba(255,255,255,0.25)'}}>
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </div>


      </header>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <div className="marquee">
        <div className="marquee-track">
          {['Assam Tea','Jute Products','Fox Nuts','Jaggery','Moringa Powder','Eco Solutions','Food Essentials',
            'Assam Tea','Jute Products','Fox Nuts','Jaggery','Moringa Powder','Eco Solutions','Food Essentials'].map((t, i) => (
            <span key={i} className={`marquee-item${i%2===1?' it':''}`}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── WHO WE ARE ───────────────────────────────────────── */}
      <section id="story">
        <div className="wrap">
          <div className="story-grid">
            <div>
              <div className="section-tag"><span className="dot" /><span>Who We Are</span></div>
              <h2 className="r-up">
                A house built on <span className="italic-serif">heritage</span>,<br/>
                sustained by trust.
              </h2>
              <p className="lead r-up" style={{marginTop:'24px'}}>
                Gosarvam Global was founded on a simple promise — to share the authentic
                essence of India with the world. Rooted in a deep appreciation for
                India&apos;s rich agricultural heritage, we export products that carry the
                story of their origin and the dedication of the communities behind them.
              </p>
              <p className="r-up text-mute" style={{marginTop:'16px',fontSize:'15px',lineHeight:1.7}}>
                We work hand-in-hand with farmer cooperatives and family-run producers,
                paying fair, supporting sustainability, and ensuring the journey from
                farm to ship is as honest as the harvest itself.
              </p>
              <div style={{marginTop:'32px'}}>
                <Link href="/about" className="arrow-link">
                  More about us
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13 13 3M6 3h7v7"/></svg>
                </Link>
              </div>
            </div>
            <div className="story-image r-fade">
              <img
                src="/images/food-essentials-heritage.png"
                alt="Gosarvam Global — Indian agri heritage"
                loading="lazy"
                decoding="async"
              />
              <div className="cap">
                <span>Est. 2023</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section style={{padding:'0', position:'relative', overflow:'hidden'}}>
        <FloatingGeo />
        <div className="stats-bar" style={{position:'relative',zIndex:1}}>
          {[
            ['30+','Countries Reached'],
            ['2400+','Tonnes Shipped (yr)'],
            ['450+','Farmer Partners'],
            ['99.6%','On-Time Delivery'],
          ].map(([n,l]) => (
            <div key={l} className="stat-cell">
              <div className="num" style={{fontSize:'clamp(36px,5vw,72px)'}}>{n}</div>
              <div className="lbl">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT WE EXPORT (accordion) ───────────────────────── */}
      <section id="products" style={{background:'var(--bg)'}}>
        <div className="wrap">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',alignItems:'end',marginBottom:'48px'}}>
            <div>
              <div className="section-tag"><span className="dot" /><span>What We Export</span></div>
              <h2 className="r-up">Seven categories.<br/><span className="italic-serif">Endless possibilities.</span></h2>
            </div>
            <div>
              <p className="lead r-up">
                Every product is sourced directly from origin, processed to export standards,
                and shipped with full documentation. MOQ, pricing and packaging are flexible.
              </p>
              <div style={{marginTop:'24px'}}>
                <Link href="/products" className="arrow-link">
                  View all products
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13 13 3M6 3h7v7"/></svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="accordion">
            {PRODUCTS.map((p, i) => (
              <div key={p.slug} className={`accordion-item${openIdx === i ? ' open' : ''}`}>
                <button className="accordion-trigger" onClick={() => toggle(i)}>
                  <span className="accordion-num">{p.num}</span>
                  <span className="accordion-title">{p.name}</span>
                  <span className="accordion-sub">{p.sub}</span>
                  <span className="accordion-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 1v12M1 7h12"/>
                    </svg>
                  </span>
                </button>
                <div className="accordion-body">
                  <p className="accordion-desc">{p.desc}</p>
                  <ul className="accordion-points">
                    {p.points.map((pt, j) => <li key={j}>{pt}</li>)}
                    <li style={{paddingTop:'18px',borderBottom:'none'}}>
                      <Link href={`/products/${p.slug}`} className="arrow-link">
                        Full specifications
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13 13 3M6 3h7v7"/></svg>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT COVERFLOW ────────────────────────────────── */}
      <ProductCoverflow />

      {/* ── THE JOURNEY ──────────────────────────────────────── */}
      <section style={{background:'var(--bg)', position:'relative', overflow:'hidden'}}>
        <FlowLines />
        <div className="wrap" style={{position:'relative',zIndex:1}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',alignItems:'end',marginBottom:'56px'}}>
            <div>
              <div className="section-tag"><span className="dot" /><span>Our Process</span></div>
              <h2 className="r-up">From soil to ship —<br/><span className="italic-serif">every step, by design.</span></h2>
            </div>
            <p className="lead r-up">
              Three pillars define every consignment we dispatch — origin integrity,
              farmer partnership, and export-grade quality from the first mile to the last.
            </p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',borderTop:'1px solid var(--line)'}}>
            {[
              {num:'CHAPTER 01',title:'The Garden.',desc:'Our Assam estates sit between the Brahmaputra and the Himalayas — a microclimate producing legendary tea for over 180 years.',points:['Hand-plucked — only two leaves and a bud.','Orthodox processing — withered, rolled, oxidised.','Single-origin lots — full estate traceability.']},
              {num:'CHAPTER 02',title:'Farmer-First.',desc:'Over 450 farming families form the backbone of every shipment. We pay above-market premium and fund agronomy training annually.',points:['Above-market fair-trade pricing.','Annual agronomy and organic-conversion training.','Shared warehouses, dryers, and grading lines.']},
              {num:'CHAPTER 03',title:'Export-Grade.',desc:'Every consignment passes triple-quality inspection — at farm, at processing, and at the port. It is the only grade we ship.',points:['Triple QC — farm, processing, port.','HACCP & FSSAI compliant facilities.','FCL / LCL / Air — global logistics.']},
            ].map((ch,i) => (
              <div key={i} style={{padding:'clamp(32px,3.5vw,52px) clamp(24px,3vw,40px)',borderLeft:i>0?'1px solid var(--line)':'none'}}>
                <span style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.30em',color:'var(--mute)',display:'block',marginBottom:'16px',textTransform:'uppercase'}}>{ch.num}</span>
                <h3 className="r-up" style={{marginBottom:'14px',fontSize:'clamp(20px,2vw,28px)'}}>{ch.title}</h3>
                <p style={{fontSize:'14px',lineHeight:1.7,color:'var(--ink-soft)',marginBottom:'24px'}}>{ch.desc}</p>
                <ul style={{listStyle:'none',padding:0,margin:0}}>
                  {ch.points.map((pt,j) => (
                    <li key={j} style={{padding:'11px 0',borderBottom:'1px solid var(--line)',display:'flex',gap:'14px',alignItems:'flex-start',fontSize:'13px',lineHeight:1.6}}>
                      <span style={{color:'var(--gold)',flexShrink:0}}>→</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL REACH ─────────────────────────────────────── */}
      <section className="world-section" style={{paddingTop:'clamp(60px,8vw,120px)'}}>
        <div className="wrap">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'end',marginBottom:'40px'}}>
            <div>
              <div className="section-tag"><span className="dot" /><span>Global Presence</span></div>
              <h2 className="r-up">
                One country at the centre —<br/>
                <span className="italic-serif">a network across the world.</span>
              </h2>
            </div>
            <p className="lead r-up">
              Active trade lanes across the Americas, Europe, Middle East, and Asia-Pacific.
            </p>
          </div>
          <div className="world-stage r-fade">
            <WorldMap />
          </div>
          <div className="world-list">
            {[['🇺🇸','United States'],['🇬🇧','United Kingdom'],['🇩🇪','Germany'],['🇦🇪','UAE'],['🇯🇵','Japan'],['🇰🇷','South Korea'],['🇦🇺','Australia'],['🇸🇬','Singapore'],['🇨🇦','Canada'],['🇫🇷','France'],['🇳🇱','Netherlands'],['🇷🇺','Russia']].map(([flag,name])=>(
              <div key={name} className="world-pill"><span className="flag">{flag}</span>{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ───────────────────────────────────── */}
      <section id="certs">
        <div className="wrap">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'end',marginBottom:'48px'}}>
            <div>
              <div className="section-tag"><span className="dot" /><span>Compliance</span></div>
              <h2 className="r-up">Certified by institutions <span className="italic-serif">that matter.</span></h2>
            </div>
            <p className="lead r-up">Each shipment includes phytosanitary certificate, CoO, CoA, and product-specific licenses.</p>
          </div>
          <div className="cert-grid">
            {[
              ['FSSAI Certified','Food Safety · India'],
              ['APEDA Member','Agri Export Authority'],
              ['IEC Registered','DGFT · India'],
              ['ISO 22000','Food Safety Mgmt.'],
              ['HACCP','Hazard Analysis'],
              ['USDA Organic','Selected Lots'],
            ].map(([title,sub])=>(
              <div key={title} className="cert-card r-up">
                <div className="seal">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <h4>{title}</h4><span>{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{padding:'0',position:'relative',overflow:'hidden'}}>
        <MorphGlobe />
        <div className="cta-band" style={{position:'relative',zIndex:1,textAlign:'center'}}>
          <div>
            <div className="section-tag" style={{color:'rgba(255,255,255,0.30)',justifyContent:'center',marginBottom:'24px'}}>
              <span className="dot" /><span>Let&apos;s Begin</span>
            </div>
            <h2 style={{maxWidth:'16ch',margin:'0 auto'}}>
              Build your next <i>shipment</i> with us.
            </h2>
            <p className="lead" style={{color:'rgba(255,255,255,0.55)',maxWidth:'50ch',margin:'20px auto 0',textAlign:'center'}}>
              Tell us what you need — volumes, ports, packaging, payment terms — and
              we&apos;ll respond within 24 business hours with a transparent proposal.
            </p>
            <div style={{marginTop:'36px',display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
              <Link href="/rfq" className="btn btn-gold">
                Request a Quotation
                <svg className="btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13 13 3M6 3h7v7"/></svg>
              </Link>
              <Link href="/contact" className="btn btn-ghost" style={{color:'rgba(255,255,255,0.75)',borderColor:'rgba(255,255,255,0.20)'}}>
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
