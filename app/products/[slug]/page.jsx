import Link from 'next/link';
import { getProduct, productSlugs, productHref, isWordPressPage } from '@/lib/products';

export async function generateStaticParams() {
  return productSlugs.map(slug => ({ slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = getProduct(slug) ?? getProduct('assam-tea');

  return (
    <>
      {/* HERO */}
      <section className="page-hero" style={{minHeight:'50vh',display:'flex',alignItems:'flex-end',paddingBottom:'4rem',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:`url('${p.img}')`,backgroundSize:'cover',backgroundPosition:'center',filter:'brightness(0.4)'}} />
        <div className="wrap" style={{position:'relative',zIndex:1}}>
          <div className="section-tag" style={{color:'rgba(253,251,246,0.7)'}}><span className="dot" /><span>{p.tag}</span></div>
          <h1 className="r-up" style={{color:'var(--cream)'}}>{p.name}</h1>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section>
        <div className="wrap">
          <div className="story-grid">
            <div>
              <div className="section-tag"><span className="dot" /><span>Overview</span></div>
              <h2 className="r-up" style={{maxWidth:'20ch'}}>{p.name}</h2>
              <p className="lead r-up mt-m">{p.desc}</p>

              {/* GRADES */}
              <div style={{marginTop:'2.5rem'}}>
                <h4 style={{marginBottom:'1rem',fontFamily:'var(--mono)',fontSize:'0.8rem',letterSpacing:'0.1em',textTransform:'uppercase',opacity:0.6}}>Available Grades</h4>
                <div style={{display:'flex',flexWrap:'wrap',gap:'0.5rem'}}>
                  {p.grades.map(g => (
                    <span key={g} className="export-chip">{g}</span>
                  ))}
                </div>
              </div>

              {/* DOCS */}
              <div style={{marginTop:'2rem'}}>
                <h4 style={{marginBottom:'1rem',fontFamily:'var(--mono)',fontSize:'0.8rem',letterSpacing:'0.1em',textTransform:'uppercase',opacity:0.6}}>Shipping Documents</h4>
                <ul className="list">
                  {p.docs.map(d => <li key={d}>{d}</li>)}
                </ul>
              </div>
            </div>

            {/* SPECS */}
            <div>
              <div style={{background:'var(--card-bg)',border:'1px solid var(--border)',borderRadius:'12px',overflow:'hidden'}}>
                <div style={{padding:'1.25rem 1.5rem',borderBottom:'1px solid var(--border)',fontFamily:'var(--mono)',fontSize:'0.75rem',letterSpacing:'0.1em',textTransform:'uppercase',opacity:0.6}}>
                  Product Specifications
                </div>
                {p.specs.map(([k,v]) => (
                  <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'0.9rem 1.5rem',borderBottom:'1px solid var(--border)',gap:'1rem'}}>
                    <span style={{opacity:0.6,fontSize:'0.85rem',flexShrink:0}}>{k}</span>
                    <span style={{textAlign:'right',fontSize:'0.85rem',fontWeight:500}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE DOWNLOAD */}
      <section style={{background:'var(--bg-alt,#f7f4ef)'}}>
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>Catalogue</span></div>
          <h2 className="r-up" style={{maxWidth:'22ch',marginBottom:'2rem'}}>
            Download the full <span className="italic-serif">product catalogue.</span>
          </h2>
          <div style={{
            display:'flex', alignItems:'center', gap:'2rem', flexWrap:'wrap',
            background:'var(--bg)', border:'1px solid var(--line)',
            borderRadius:'16px', padding:'2rem 2.5rem',
            boxShadow:'0 4px 24px rgba(0,0,0,0.06)',
          }}>
            {/* PDF icon */}
            <div style={{
              width:72, height:72, borderRadius:14, flexShrink:0,
              background: p.catalogue
                ? 'linear-gradient(135deg,#c05a2a,#8b2000)'
                : 'linear-gradient(135deg,#c9a063,#8b6a2a)',
              display:'grid', placeItems:'center',
              boxShadow: p.catalogue
                ? '0 8px 24px rgba(192,90,42,0.3)'
                : '0 8px 24px rgba(201,160,99,0.25)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" width="32" height="32">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="9" y1="13" x2="15" y2="13"/>
                <line x1="9" y1="17" x2="13" y2="17"/>
              </svg>
            </div>

            <div style={{flex:1, minWidth:200}}>
              <p style={{
                fontFamily:'var(--font-mono)', fontSize:'10px',
                letterSpacing:'0.18em', textTransform:'uppercase',
                opacity:0.5, marginBottom:'6px',
              }}>PDF · Product Catalogue</p>
              <h3 style={{fontSize:'1.15rem', fontWeight:600, marginBottom:'6px'}}>
                {p.name} — Full Catalogue
              </h3>
              <p style={{fontSize:'0.88rem', opacity:0.6, lineHeight:1.5}}>
                {p.catalogue
                  ? 'Grades, packaging options, certifications, pricing tiers, and export documentation — all in one document.'
                  : 'Catalogue coming soon. Request a copy directly and our team will send it within 24 hours.'}
              </p>
            </div>

            {p.catalogue ? (
              <a
                href={p.catalogue}
                download
                className="btn btn-primary btn-magnetic"
                style={{flexShrink:0}}
              >
                Download PDF
                <svg className="btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3v8M5 8l3 3 3-3M3 13h10"/>
                </svg>
              </a>
            ) : (
              <Link href="/rfq" className="btn btn-primary btn-magnetic" style={{flexShrink:0}}>
                Request Catalogue
                <svg className="btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 13 13 3M6 3h7v7"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* MORE PRODUCTS */}
      <section style={{background:'linear-gradient(180deg, var(--ivory), var(--cream-soft))'}}>
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>Also Available</span></div>
          <h2 className="r-up" style={{maxWidth:'18ch'}}>Explore our other <span className="italic-serif">export categories.</span></h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:'1rem',marginTop:'2rem'}}>
            {productSlugs.filter(s => s !== slug).map(s => {
              const prod = getProduct(s);
              return isWordPressPage(s) ? (
                <a key={s} href={productHref(s)} className="export-chip" style={{padding:'0.6rem 1.2rem'}}>
                  {prod.name}
                </a>
              ) : (
                <Link key={s} href={productHref(s)} className="export-chip" style={{padding:'0.6rem 1.2rem'}}>
                  {prod.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
