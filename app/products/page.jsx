import Link from 'next/link';
import { productCards, productHref, isWordPressPage } from '@/lib/products';

export default function ProductsPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>Our Products</span></div>
          <h1 className="r-up" style={{marginTop:'20px', marginBottom:'28px'}}>Seven categories.<br/><span className="italic-serif">Endless possibilities.</span></h1>
          <p className="lead r-up" style={{maxWidth:'52ch'}}>
            Every product we export is sourced directly from origin, processed to export standards, and shipped with full documentation.
            MOQ, pricing, and packaging are flexible to your requirements.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section style={{paddingTop:'60px'}}>
        <div className="wrap">
          <div className="products-grid">
            {productCards.map((p,i) => {
              const className = `product-card${i===0||i===4?' span6':''}`;
              const body = (
                <>
                  <div className="img" style={{backgroundImage:`url('${p.img}')`}} />
                  <div className="veil" />
                  <div className="arr">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13 13 3M6 3h7v7"/></svg>
                  </div>
                  <div className="meta" style={p.slug!=='jute'?{color:'white'}:undefined}>
                    <div className="tag">{p.tag}</div>
                    <h3 style={p.slug!=='jute'?{color:'white'}:undefined}>{p.name}</h3>
                    <p style={p.slug!=='jute'?{color:'rgba(255,255,255,0.85)'}:undefined}>{p.desc}</p>
                    <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginTop:'0.75rem'}}>
                      {p.cats.map(c=><span key={c} className="export-chip" style={{fontSize:'0.7rem',padding:'2px 8px'}}>{c}</span>)}
                    </div>
                  </div>
                </>
              );
              // A WordPress page is off-site, so it needs a plain anchor, not next/link.
              return isWordPressPage(p.slug)
                ? <a key={p.slug} href={productHref(p.slug)} className={className} data-grad={p.grad}>{body}</a>
                : <Link key={p.slug} href={productHref(p.slug)} className={className} data-grad={p.grad}>{body}</Link>;
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="wrap">
          <div className="cta-band" style={{gridTemplateColumns:'1fr',textAlign:'center'}}>
            <div>
              <h2 className="r-up">Need a custom product range?</h2>
              <p className="r-up lead mt-s" style={{textAlign:'center',margin:'16px auto 0',maxWidth:'48ch'}}>We can source, process and ship almost any Indian agri-product on request.</p>
              <div style={{marginTop:'32px',display:'flex',justifyContent:'center'}}>
                <Link href="/rfq" className="btn btn-gold btn-magnetic">
                  Request Quotation
                  <svg className="btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13 13 3M6 3h7v7"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
