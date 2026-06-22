import Link from 'next/link';

export default function LogisticsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>Logistics &amp; Trade</span></div>
          <h1 className="r-up">From Indian farm to <span className="italic-serif">your warehouse.</span></h1>
          <p className="lead r-up mt-m" style={{maxWidth:'52ch'}}>
            We handle every step of the export chain — sourcing, quality testing, packaging, documentation, freight, and customs clearance.
            Your team receives a single point of contact throughout.
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section>
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>Export Process</span></div>
          <h2 className="r-up" style={{maxWidth:'20ch',marginBottom:'3rem'}}>Eight steps, <span className="italic-serif">zero surprises.</span></h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1.5rem'}}>
            {[
              ['01','RFQ & Quotation','Submit your requirements. We respond with a detailed quotation within 24 hours.'],
              ['02','Sample Approval','We dispatch free samples for your quality team to approve before any commitment.'],
              ['03','Purchase Order','Issue a PO with agreed Incoterm, port, payment term, and packaging specs.'],
              ['04','Sourcing & Grading','We procure from our farmer network, grade to spec, and arrange third-party testing.'],
              ['05','Packaging','Custom packaging — retail-ready or bulk — at our processing unit.'],
              ['06','Pre-shipment Inspection','Third-party inspection (SGS/Bureau Veritas on request) before container stuffing.'],
              ['07','Shipping & Documentation','We book freight, prepare all documents, and handle customs at origin.'],
              ['08','Delivery & After-sale','Track your shipment. Our team follows up on arrival and handles any post-shipment queries.'],
            ].map(([num,title,desc]) => (
              <div key={num} style={{padding:'1.5rem',border:'1px solid var(--border)',borderRadius:'10px',background:'var(--card-bg)'}}>
                <div style={{fontFamily:'var(--mono)',fontSize:'0.7rem',letterSpacing:'0.1em',opacity:0.5,marginBottom:'0.75rem'}}>{num}</div>
                <h4 style={{marginBottom:'0.5rem'}}>{title}</h4>
                <p style={{fontSize:'0.82rem',opacity:0.7,lineHeight:1.6}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCOTERMS */}
      <section id="payment" style={{background:'linear-gradient(180deg, var(--ivory), var(--cream-soft))'}}>
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>Trade Terms</span></div>
          <h2 className="r-up" style={{maxWidth:'20ch',marginBottom:'3rem'}}>Incoterms &amp; <span className="italic-serif">Payment Options</span></h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'2rem'}}>
            <div className="cert-card r-up" style={{padding:'2.5rem'}}>
              <h3 style={{fontFamily:'var(--serif)',marginBottom:'1.5rem'}}>Incoterms We Offer</h3>
              {[['FOB','Free On Board — most common for sea freight. Risk transfers when goods cross ship rail.'],['CIF','Cost Insurance Freight — we arrange shipping and insurance to destination port.'],['CFR','Cost and Freight — we arrange freight; buyer arranges insurance.'],['EXW','Ex Works — available for large buyers with their own freight forwarder.']].map(([t,d]) => (
                <div key={t} style={{marginBottom:'1.25rem',paddingBottom:'1.25rem',borderBottom:'1px solid var(--border)'}}>
                  <div style={{fontFamily:'var(--mono)',fontSize:'0.75rem',fontWeight:600,color:'var(--gold)',marginBottom:'0.25rem'}}>{t}</div>
                  <p style={{fontSize:'0.82rem',opacity:0.7,lineHeight:1.6}}>{d}</p>
                </div>
              ))}
            </div>
            <div className="cert-card r-up" style={{padding:'2.5rem'}}>
              <h3 style={{fontFamily:'var(--serif)',marginBottom:'1.5rem'}}>Payment Methods</h3>
              {[['70% Advance + 30% on B/L','Standard term: 70% advance payment with Purchase Order; remaining 30% against copy of Bill of Lading before release.'],['LC at Sight (Irrevocable)','Irrevocable Letter of Credit at sight via SWIFT — we do not accept Usance / deferred-payment LCs.'],['No Credit Terms','We do not extend open credit or deferred-payment arrangements under any circumstances.']].map(([t,d]) => (
                <div key={t} style={{marginBottom:'1.25rem',paddingBottom:'1.25rem',borderBottom:'1px solid var(--border)'}}>
                  <div style={{fontFamily:'var(--mono)',fontSize:'0.75rem',fontWeight:600,color:'var(--gold)',marginBottom:'0.25rem'}}>{t}</div>
                  <p style={{fontSize:'0.82rem',opacity:0.7,lineHeight:1.6}}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTS */}
      <section>
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>Shipping Ports</span></div>
          <h2 className="r-up" style={{maxWidth:'18ch',marginBottom:'2rem'}}>We ship from <span className="italic-serif">all major Indian ports.</span></h2>
          <div className="cert-grid">
            {[['JNPT (Mumbai)','Maharashtra · Primary hub for all categories'],['Kolkata / Haldia','West Bengal · Primary for tea, jute, fox nuts'],['Chennai','Tamil Nadu · Moringa, spices, essentials'],['Mundra','Gujarat · Cow dung products, bulk grains'],['Visakhapatnam','Andhra Pradesh · Moringa, grains'],['Cochin','Kerala · Spices, coconut products']].map(([port,sub]) => (
              <div key={port} className="cert-card r-up">
                <div className="seal">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>
                </div>
                <h4>{port}</h4><span>{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cta-band" style={{gridTemplateColumns:'1fr',textAlign:'center'}}>
            <div>
              <h2 className="r-up">Ready to place your first order?</h2>
              <p className="r-up lead mt-s" style={{textAlign:'center',margin:'16px auto 0',maxWidth:'48ch'}}>Fill in your RFQ and our trade team will send a detailed proforma within 24 hours.</p>
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
