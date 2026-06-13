import Link from 'next/link';

const products = [
  {slug:'assam-tea',grad:'green',img:'/images/assam-tea.png',tag:'Premium Tea',name:'Assam Orthodox Tea',desc:'Hand-plucked black tea from the misty estates of Upper Assam. Available in whole leaf, broken, fannings & dust grades.',cats:['Tea','Organic','Beverages']},
  {slug:'jute',grad:'earth',img:'/images/jute-products.png',tag:'Eco Fibre',name:'Jute Products',desc:'Biodegradable jute bags, sacks, carpet backing, and handicrafts — the golden fibre of Bengal.',cats:['Eco','Textiles','Packaging']},
  {slug:'fox-nuts',grad:'cream',img:'/images/fox-nuts.png',tag:'Superfood Snack',name:'Fox Nuts (Makhana)',desc:'Hand-roasted lotus seeds — protein-rich, gluten-free, vegan. Available plain, flavoured, and as flour.',cats:['Superfood','Snacks','Organic']},
  {slug:'jaggery',grad:'amber',img:'/images/jaggery.png',tag:'Natural Sweetener',name:'Organic Jaggery',desc:'Unrefined sugarcane jaggery — mineral-rich, chemical-free, available in block, powder, and liquid forms.',cats:['Organic','Sweetener','Food']},
  {slug:'moringa',grad:'moss',img:'/images/moringa.png',tag:'Superfood',name:'Moringa Powder',desc:'The miracle leaf, sun-dried and stone-milled. Certified organic. Rich in iron, calcium, and protein.',cats:['Superfood','Organic','Health']},
  {slug:'cow-dung',grad:'earth',img:'/images/cow-dung.png',tag:'Sacred Eco',name:'Cow Dung Eco Solutions',desc:'Vedic incense cakes, organic manure, eco-pots, and dhoop sticks — ancestral materials reimagined for global markets.',cats:['Eco','Organic','Wellness']},
  {slug:'essentials',grad:'spice',img:'/images/food-essentials.png',tag:'Pantry Staples',name:'Food Essentials',desc:'Pulses, spices, grains, cold-pressed oils — the everyday Indian pantry, graded for export quality.',cats:['Food','Spices','Grains']},
];

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
            {products.map((p,i) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className={`product-card${i===0||i===4?' span6':''}`} data-grad={p.grad}>
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
              </Link>
            ))}
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
