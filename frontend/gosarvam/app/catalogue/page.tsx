import Link from 'next/link';

export default function CataloguePage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>Downloads</span></div>
          <h1 className="r-up">Product <span className="italic-serif">Catalogue</span></h1>
          <p className="lead r-up mt-m" style={{maxWidth:'52ch'}}>
            Download our complete product catalogue with specifications, packaging options, certifications, and trade terms.
            Available in PDF format. Updated quarterly.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'2rem'}}>

            {/* MAIN CATALOGUE */}
            <div className="cert-card r-up" style={{padding:'2.5rem',textAlign:'center'}}>
              <div className="seal" style={{marginBottom:'1.5rem'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8"/></svg>
              </div>
              <h3 style={{fontFamily:'var(--serif)',marginBottom:'0.5rem'}}>Full Product Catalogue</h3>
              <p className="text-mute" style={{marginBottom:'1.5rem',fontSize:'0.875rem'}}>
                All 7 product categories · Specifications · Pricing guide · Certifications<br/>
                <b>PDF · 4.2 MB · Updated Jan 2025</b>
              </p>
              <a href="/catalogue.pdf" className="btn btn-primary btn-magnetic" download>
                Download PDF
                <svg className="btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v8M5 7l3 3 3-3M3 13h10"/></svg>
              </a>
            </div>

            {/* TEA CATALOGUE */}
            <div className="cert-card r-up" style={{padding:'2.5rem',textAlign:'center'}}>
              <div className="seal" style={{marginBottom:'1.5rem'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 8h1a4 4 0 010 8h-1 M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4z M6 2v4 M10 2v4 M14 2v4"/></svg>
              </div>
              <h3 style={{fontFamily:'var(--serif)',marginBottom:'0.5rem'}}>Tea Catalogue</h3>
              <p className="text-mute" style={{marginBottom:'1.5rem',fontSize:'0.875rem'}}>
                All Assam tea grades · Tasting notes · Sample policy<br/>
                <b>PDF · 1.8 MB · Updated Dec 2024</b>
              </p>
              <a href="/tea-catalogue.pdf" className="btn btn-ghost btn-magnetic" download>
                Download PDF
                <svg className="btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v8M5 7l3 3 3-3M3 13h10"/></svg>
              </a>
            </div>

            {/* ECO CATALOGUE */}
            <div className="cert-card r-up" style={{padding:'2.5rem',textAlign:'center'}}>
              <div className="seal" style={{marginBottom:'1.5rem'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 C8 6, 8 10, 12 14 C16 10, 16 6, 12 2 z M12 14 v8"/></svg>
              </div>
              <h3 style={{fontFamily:'var(--serif)',marginBottom:'0.5rem'}}>Eco & Wellness Catalogue</h3>
              <p className="text-mute" style={{marginBottom:'1.5rem',fontSize:'0.875rem'}}>
                Jute, Moringa, Cow Dung · Sustainability specs<br/>
                <b>PDF · 2.1 MB · Updated Nov 2024</b>
              </p>
              <a href="/eco-catalogue.pdf" className="btn btn-ghost btn-magnetic" download>
                Download PDF
                <svg className="btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v8M5 7l3 3 3-3M3 13h10"/></svg>
              </a>
            </div>
          </div>

          {/* REQUEST PHYSICAL */}
          <div className="cta-band" style={{marginTop:'4rem',gridTemplateColumns:'1fr',textAlign:'center'}}>
            <div>
              <h2 className="r-up">Need a physical sample kit?</h2>
              <p className="r-up lead mt-s" style={{textAlign:'center',margin:'16px auto 0',maxWidth:'48ch'}}>We ship free product samples to qualified buyers. Submit an RFQ and mention samples in your note.</p>
              <div style={{marginTop:'32px',display:'flex',justifyContent:'center'}}>
                <Link href="/rfq" className="btn btn-gold btn-magnetic">
                  Request Samples
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
