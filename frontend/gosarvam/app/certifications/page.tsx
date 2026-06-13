import Link from 'next/link';

const certs = [
  {id:'fssai',title:'FSSAI Certified',sub:'Food Safety and Standards Authority of India',desc:'All edible products comply with FSSAI regulations governing food safety, labelling, and quality standards for Indian food businesses.'},
  {id:'apeda',title:'APEDA Member',sub:'Agricultural and Processed Food Products Export Development Authority',desc:'Registered exporter under APEDA — the nodal body for all Indian agri-product exports, enabling GI-tagged and certified exports.'},
  {id:'iec',title:'IEC Registered',sub:'Import Export Code · Directorate General of Foreign Trade',desc:'Active IEC code issued by DGFT, enabling all export transactions and customs clearance for Gosarvam Global LLP.'},
  {id:'iso',title:'ISO 22000:2018',sub:'Food Safety Management System',desc:'Our processing and quality management operations are aligned with ISO 22000 — the international standard for food safety management.'},
  {id:'haccp',title:'HACCP Compliance',sub:'Hazard Analysis and Critical Control Points',desc:'All processing facilities follow HACCP principles — identifying biological, chemical, and physical hazards and controlling them at critical points.'},
  {id:'organic',title:'Organic Certification',sub:'USDA Organic · EU Organic · India Organic',desc:'Select product lines (Moringa, Fox Nuts, Jaggery) are certified organic under USDA NOP, EU 834/2007, and NPOP (India Organic) standards.'},
  {id:'spices',title:'Spices Board',sub:'Ministry of Commerce, Government of India',desc:'Registered with the Spices Board of India for the export of all spices, seasonings, and flavour-related products.'},
  {id:'agmark',title:'AGMARK',sub:'Agricultural Produce (Grading and Marking) Act',desc:'Grains, pulses, and edible oils carry AGMARK grading — the Government of India quality certification for agricultural produce.'},
];

export default function CertificationsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>Compliance</span></div>
          <h1 className="r-up">Certified by every <span className="italic-serif">institution that matters.</span></h1>
          <p className="lead r-up mt-m" style={{maxWidth:'52ch'}}>
            Every shipment from Gosarvam Global is backed by the documentation your customs authority, quality team, and end-customer requires.
            We maintain active certifications across all relevant bodies.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cert-grid">
            {certs.map(c => (
              <div key={c.id} className="cert-card r-up">
                <div className="seal">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <h4>{c.title}</h4>
                <span style={{display:'block',marginBottom:'0.75rem'}}>{c.sub}</span>
                <p style={{fontSize:'0.8rem',opacity:0.7,lineHeight:1.6}}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* DOCUMENTATION */}
          <div style={{marginTop:'5rem'}}>
            <div className="section-tag"><span className="dot" /><span>Per-Shipment Documents</span></div>
            <h2 className="r-up" style={{maxWidth:'22ch',marginBottom:'2rem'}}>
              Full documentation <span className="italic-serif">standard with every consignment.</span>
            </h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1.5rem'}}>
              {[
                ['Phytosanitary Certificate','Issued by PPQS, ensures produce is free from pests and diseases.'],
                ['Certificate of Origin','APEDA / Chamber of Commerce CoO for preferential duty claims.'],
                ['Certificate of Analysis','Lab-tested nutritional and safety profile from accredited labs.'],
                ['Bill of Lading','Shipping document issued by the carrier on behalf of Gosarvam.'],
                ['Commercial Invoice','Full details of shipment, HS codes, value, and Incoterm.'],
                ['Packing List','Detailed container/pallet breakdown for customs and receiving.'],
                ['Insurance Certificate','Cargo insurance covering CIF or agreed Incoterm.'],
                ['MSDS (if applicable)','Material Safety Data Sheet for relevant product categories.'],
              ].map(([t,d]) => (
                <div key={t} style={{padding:'1.5rem',border:'1px solid var(--border)',borderRadius:'10px',background:'var(--card-bg)'}}>
                  <h5 style={{marginBottom:'0.5rem'}}>{t}</h5>
                  <p style={{fontSize:'0.82rem',opacity:0.7,lineHeight:1.6}}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cta-band" style={{gridTemplateColumns:'1fr',textAlign:'center'}}>
            <div>
              <h2 className="r-up">Need specific compliance documentation?</h2>
              <p className="r-up lead mt-s" style={{textAlign:'center',margin:'16px auto 0',maxWidth:'48ch'}}>Our compliance team can prepare country-specific documentation packages on request.</p>
              <div style={{marginTop:'32px',display:'flex',justifyContent:'center'}}>
                <Link href="/contact" className="btn btn-gold btn-magnetic">
                  Speak to Compliance
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
