import Link from 'next/link';

const catalog: Record<string, {
  name: string; tag: string; desc: string; img: string;
  specs: [string,string][]; grades: string[]; docs: string[];
  catalogue?: string;
}> = {
  'assam-tea': {
    name: 'Assam Orthodox Tea',
    tag: 'Premium Tea · Single Origin',
    desc: 'Hand-plucked from elevation estates along the Brahmaputra valley, our Assam tea carries the classic malty, full-bodied character that has made this region legendary. Available in first flush, second flush, and blending grades.',
    img: '/images/assam-tea.png',
    specs: [['Origin','Upper Assam, India'],['Harvest','March–November'],['Processing','Orthodox (whole leaf)'],['Grades','SFTGFOP1, FTGFOP, TGFOP, BOP, BP, BOPF, PF, D'],['Min. Order','1 MT per grade'],['Packaging','20 kg ply bags / chest / custom'],['Shelf Life','24 months sealed'],['Certifications','FSSAI, ISO 22000, APEDA']],
    grades: ['SFTGFOP1 (Super Fine)','FTGFOP (Fine)','TGFOP (Whole Leaf)','BOP (Broken)','BP (Broken Pekoe)','Fannings','Dust'],
    docs: ['Phytosanitary Certificate','Certificate of Origin (APEDA)','Quality Analysis Report','FSSAI Compliance'],
    catalogue: '/catalogues/assam-tea-catalogue.pdf',
  },
  'jute': {
    name: 'Jute Products',
    tag: 'Eco Fibre · Golden Fibre',
    desc: 'Jute is nature\'s own fibre — 100% biodegradable, carbon-negative, and incredibly versatile. Our jute range covers bags, sacks, carpet backing, rugs, and bespoke handicrafts for retail and industrial buyers worldwide.',
    img: '/images/jute-products.png',
    specs: [['Origin','West Bengal & Assam, India'],['Fibre Grade','TD3 to TD6, Mestia'],['Products','Shopping bags, sacks, rugs, carpet backing, handicrafts'],['Min. Order','500 pieces or 1 MT fibre'],['Packaging','Bale / custom retail'],['Shelf Life','36 months stored dry'],['Certifications','FSSAI, Jute Mark, OEKO-TEX'],],
    grades: ['TD3 (Fine)','TD4','TD5','TD6 (Coarse)','Mestia Grade'],
    docs: ['Jute Mark Certificate','Phytosanitary Certificate','Quality Inspection Report'],
  },
  'fox-nuts': {
    name: 'Fox Nuts (Makhana)',
    tag: 'Superfood · Vegan · Gluten-Free',
    desc: 'Makhana — the puffed lotus seed — is a nutritional powerhouse. Low in fat, high in protein and magnesium, it is taking global health-food markets by storm. We supply plain, roasted, flavoured, and as flour.',
    img: '/images/fox-nuts.png',
    specs: [['Origin','Bihar, India'],['Varieties','Plain, Roasted, Flavoured, Flour'],['Protein','~9.7g per 100g'],['Fat','~0.1g per 100g'],['Min. Order','500 kg'],['Packaging','5 kg / 10 kg / 25 kg bags; retail pouches'],['Shelf Life','12 months sealed'],['Certifications','FSSAI, Organic India, APEDA'],],
    grades: ['Suta (Extra Large — 6+ mm)','Lawa (Large — 5–6 mm)','Samanya (Medium — 4–5 mm)','Tikhi (Small)'],
    docs: ['FSSAI License','Organic Certificate','Quality Analysis Report','Phytosanitary'],
    catalogue: '/catalogues/makhana-catalogue.pdf',
  },
  'jaggery': {
    name: 'Organic Jaggery',
    tag: 'Natural Sweetener · No Chemicals',
    desc: 'Made by the age-old tradition of boiling sugarcane juice in iron pans without any chemicals, our jaggery retains its natural minerals and carries a deep, caramel-molasses profile that refined sugar cannot replicate.',
    img: '/images/jaggery.png',
    specs: [['Origin','Maharashtra & UP, India'],['Forms','Block, Granule, Powder, Liquid'],['Sucrose','~65–85%'],['Minerals','Iron, Calcium, Potassium, Magnesium'],['Min. Order','1 MT'],['Packaging','5 kg / 25 kg / 50 kg bags'],['Shelf Life','12 months'],['Certifications','FSSAI, Organic India, USDA Organic (select lots)'],],
    grades: ['A Grade (Golden)','B Grade (Dark)','Powdered','Liquid (Kakvi)'],
    docs: ['Organic Certificate','FSSAI License','Sugar Analysis Report','Phytosanitary'],
  },
  'moringa': {
    name: 'Moringa Powder',
    tag: 'Superfood · Certified Organic',
    desc: 'The drumstick tree — Moringa oleifera — is one of the most nutrient-dense plants on earth. Our moringa leaves are shade-dried at low temperature and stone-milled to preserve maximum nutritional value.',
    img: '/images/moringa.png',
    specs: [['Origin','Andhra Pradesh & Tamil Nadu, India'],['Forms','Leaf powder, Seed oil, Capsules, Extract'],['Protein','~27g per 100g (dry)'],['Iron','~28mg per 100g'],['Min. Order','200 kg'],['Packaging','1 kg / 5 kg / 25 kg craft bags; capsule packs'],['Shelf Life','24 months'],['Certifications','FSSAI, USDA Organic, EU Organic'],],
    grades: ['A Grade (Bright Green)','B Grade','Seed Oil (Cold Pressed)'],
    docs: ['Organic Certificate (USDA & EU)','Heavy Metals Report','Microbiology Report','FSSAI License'],
  },
  'cow-dung': {
    name: 'Cow Dung Eco Solutions',
    tag: 'Sacred Eco · Vedic Products',
    desc: 'Rooted in Vedic tradition and reimagined for modern sustainability, our cow dung product range covers natural incense, organic fertiliser, biodegradable pots, and ritual dhoop sticks — each crafted by artisan cooperatives.',
    img: '/images/cow-dung.png',
    specs: [['Origin','Assam & Gujarat, India'],['Products','Incense cakes, Dhoop sticks, Organic manure, Eco-pots, Sambhrani cups'],['Min. Order','500 units / 200 kg manure'],['Packaging','Retail-ready or bulk'],['Shelf Life','24+ months (incense/manure)'],['Certifications','FSSAI, Organic India'],],
    grades: ['Premium Incense Cakes','Dhoop Sticks (assorted)','Organic Granular Manure','Biodegradable Nursery Pots'],
    docs: ['Organic Certificate','Heavy Metals Report','Phytosanitary (manure)'],
  },
  'essentials': {
    name: 'Food Essentials',
    tag: 'Pantry Staples · Export Grade',
    desc: 'From the turmeric fields of Erode to the basmati plains of Punjab, our food essentials range brings the full depth of the Indian pantry to global buyers — spices, pulses, grains, and cold-pressed oils.',
    img: '/images/food-essentials.png',
    specs: [['Products','Turmeric, Cumin, Coriander, Basmati Rice, Toor Dal, Chana Dal, Mustard Oil, Coconut Oil'],['Origin','Pan-India sourcing by region'],['Grades','Export Premium / AGMARK'],['Min. Order','500 kg per SKU'],['Packaging','Retail pouch / bulk bag / IBC'],['Shelf Life','Product dependent (6–24 months)'],['Certifications','FSSAI, AGMARK, Spices Board'],],
    grades: ['Premium Export Grade','AGMARK Grade A','Organic Grade (select items)'],
    docs: ['AGMARK Certificate','Spices Board License','Phytosanitary Certificate','FSSAI License'],
    catalogue: '/catalogues/turmeric-catalogue.pdf',
  },
};

export async function generateStaticParams() {
  return Object.keys(catalog).map(slug => ({ slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = catalog[slug] ?? catalog['assam-tea'];

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
              <div className="row mt-m">
                <Link href="/rfq" className="btn btn-primary btn-magnetic">
                  Request Quotation
                  <svg className="btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13 13 3M6 3h7v7"/></svg>
                </Link>
              </div>

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
            {Object.entries(catalog).filter(([s]) => s !== slug).map(([s, prod]) => (
              <Link key={s} href={`/products/${s}`} className="export-chip" style={{padding:'0.6rem 1.2rem'}}>
                {prod.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
