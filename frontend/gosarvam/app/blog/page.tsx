import Link from 'next/link';

const articles = [
  {slug:'assam-second-flush',cat:'Origin',time:'6 min',img:'/images/blog/assam-tea.png',title:"Assam's Second Flush Tea",desc:'A study in micro-climate, leaf chemistry, and a 180-year-old tradition that is reshaping specialty tea markets globally.'},
  {slug:'makhana-boom',cat:'Trade',time:'8 min',img:'/images/blog/makhana.png',title:'The Makhana Boom (Fox Nuts)',desc:'From a regional religious offering to a $400M global health-food market — the extraordinary rise of Makhana.'},
  {slug:'fcl-vs-lcl',cat:'Logistics',time:'5 min',img:'/images/blog/fcl-lcl.png',title:'FCL vs LCL Shipping',desc:'A practical, buyer-side guide to volumes, lead times, consolidation, and cost implications for agri product imports.'},
  {slug:'jaggery-story',cat:'Origin',time:'7 min',img:'/images/blog/jaggery.png',title:'The Jaggery Renaissance',desc:'The global wellness shift is driving a boom in traditional sweeteners. Here is why Indian jaggery is at the front of that wave.'},
  {slug:'moringa-science',cat:'Nutrition',time:'9 min',img:'/images/blog/moringa-science.png',title:'Moringa Science',desc:'A clear-eyed look at the nutritional evidence behind the miracle leaf, and which claims hold up to scrutiny.'},
  {slug:'sustainable-jute',cat:'Sustainability',time:'6 min',img:'/images/blog/jute-packaging.png',title:'Sustainable Jute Packaging',desc:'Carbon-negative, biodegradable, stronger than cotton — why jute should be in every sustainability-conscious buyer\'s supply chain.'},
];

export default function BlogPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>Journal</span></div>
          <h1 className="r-up">Notes from the <span className="italic-serif">field</span> and the trade.</h1>
          <p className="lead r-up mt-m" style={{maxWidth:'52ch'}}>
            Origin stories, trade intelligence, sustainability insights, and practical guides for import buyers — written by the Gosarvam team.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="blog-grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))'}}>
            {articles.map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="blog-card">
                <div className="ph" style={{backgroundImage:`url('${a.img}')`}} />
                <div className="bd">
                  <div className="ct">{a.cat} · {a.time} read</div>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                  <span className="rd">Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
