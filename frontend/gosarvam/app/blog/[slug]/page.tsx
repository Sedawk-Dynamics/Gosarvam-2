import Link from 'next/link';

const articles: Record<string, {title:string; cat:string; time:string; date:string; img:string; body:string}> = {
  'assam-second-flush': {
    title: "Why Assam's second flush tea is the world's most coveted brew",
    cat: 'Origin', time: '6 min read', date: 'January 2025',
    img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1600&q=90',
    body: `The second flush harvest — plucked from late May through July across the Brahmaputra valley — represents the pinnacle of Assam tea. If the first flush is the spring awakening, the second flush is the full voice of summer: muscatel, malty, amber, and boldly characterful.

## The Science of the Season

During the second flush, the Assam tea bush (Camellia sinensis var. assamica) has had months to develop complex polyphenols. The heat and humidity of the valley trigger a natural stress response in the leaf, concentrating flavour compounds — particularly theaflavins and thearubigins — that produce the characteristic Assam "briskness."

Elevation plays a role too. Estates at higher altitude experience greater diurnal temperature variation during this period, which slows cell development and allows even finer flavour concentration.

## What SFTGFOP1 Actually Means

The grading nomenclature for whole-leaf Assam tea is a legacy of British classification, and it directly predicts cup quality:

- **SFTGFOP1** — Super Fine Tippy Golden Flowery Orange Pekoe, Grade 1. The finest grade, with the highest proportion of golden tips (the unopened bud, richest in theaflavins). Less than 5% of second flush production achieves this grade.
- **FTGFOP** — Fine Tippy Golden Flowery Orange Pekoe. Excellent cup quality, reliable briskness.
- **TGFOP** — The entry point for the premium whole-leaf category. Still full-flavoured and worth seeking.

## From the Estate to the Chest

After plucking, second flush leaves go through orthodox processing — withering (16–24 hours in warm air), rolling (to rupture cell walls and trigger enzymatic oxidation), controlled oxidation (2–4 hours, critical for flavour development), and firing (to halt oxidation and reduce moisture to ~3%).

The result is then hand-graded by experienced sorters, tested at the Tea Research Association lab in Jorhat, and packed in airtight 20-kg aluminium-foil-lined ply chests for export.

## For Buyers

Second flush lots from Gosarvam Global are available from July through September. We maintain single-estate traceability and can provide full processing records, auction records, and laboratory analysis per consignment.

Minimum order: 1 MT. Packaging: standard 20-kg ply chests or custom retail packaging. Documentation: APEDA Certificate of Origin, Phytosanitary, CoA.`,
  },
  'makhana-boom': {
    title: 'The makhana boom: how Indian fox nuts are conquering global pantries',
    cat: 'Trade', time: '8 min read', date: 'February 2025',
    img: 'https://images.unsplash.com/photo-1559656914-a30970c1affd?w=1600&q=90',
    body: `Fox nuts — Makhana in Hindi, Euryale ferox in Latin — have been cultivated in the wetlands of Bihar for centuries. They were a religious offering, a festival snack, a monastery staple. They are now a $400M global health-food market growing at 14% annually.

## What Changed?

Three converging trends drove the Makhana moment: the plant-based protein movement, the gluten-free mainstream, and the premium snack category's explosive growth in the US, UK, Germany, and Australia.

Makhana checks every box: 9.7g of protein per 100g, 0.1g of fat, zero gluten, low glycaemic index, and a naturally mild flavour that takes seasoning beautifully. It outperforms popcorn on almost every nutritional metric while carrying a heritage story that resonates with conscious consumers.

## The Bihar Supply Chain

India grows over 85% of the world's Makhana, almost entirely in the Mithila region of North Bihar. The cultivation process is uniquely labour-intensive: seeds are harvested from prickly aquatic plants by hand, then roasted in iron pans and hand-popped — a skill that takes years to master.

The artisanal nature of production means supply is constrained, quality varies by producer, and the premium for well-processed, consistently-sized nuts is significant.

## What Gosarvam Sources

We work directly with five producer cooperatives in Darbhanga and Madhubani districts. Our supply team is on the ground during peak season (October–December) to oversee grading, moisture testing, and packaging.

We supply: plain (whole, sizes Suta/Lawa/Samanya), pre-roasted, flavoured (multiple seasoning options), and as Makhana flour for industrial bakers.`,
  },
  'fcl-vs-lcl': {
    title: 'FCL vs LCL: choosing the right shipping mode for agri-exports',
    cat: 'Logistics', time: '5 min read', date: 'March 2025',
    img: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&q=90',
    body: `For most agri-product importers — especially those buying from India for the first time — the choice between FCL (Full Container Load) and LCL (Less than Container Load) is one of the first decisions that affects cost, lead time, and risk.

## FCL: When You Fill the Box

An FCL shipment means you are booking an entire container — typically a 20-foot (20-tonne capacity) or 40-foot (26-tonne) unit. Your goods are the only goods inside, which means:

- **Lower risk of contamination** — critical for food products like tea and spices
- **Lower per-unit freight cost** at scale
- **Simpler documentation** — one bill of lading, one customs entry
- **Faster turnaround** at destination — no deconsolidation needed

FCL makes sense above approximately 10–12 CBM (cubic metres) or above 8–10 MT, depending on commodity.

## LCL: Flexibility for Smaller Volumes

LCL means your goods share a container with other shippers' cargo. A freight consolidator (NVOCC) manages the stuffing and destuffing at a Container Freight Station. For agri products, this means:

- **Higher risk of cross-contamination** if cargo types are not segregated — always confirm segregation in writing
- **Higher per-unit freight cost** (you pay by CBM)
- **Longer transit at destination** — deconsolidation adds 3–5 days typically
- **Good for trial or sample-scale orders** (2–5 MT)

## Our Recommendation

For first-time orders, use LCL to minimise commitment. Once you have validated the product quality and your market demand, move to FCL for cost efficiency. For sensitive products (tea, Makhana), we always recommend FCL segregation even at LCL scale — ask your freight forwarder to specify "agricultural cargo only" in the same container.

Gosarvam can connect you with our preferred freight forwarders on both the Indian and destination ends.`,
  },
};

const fallback = {
  title: 'Article',
  cat: 'Journal', time: '5 min read', date: '2025',
  img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1600&q=90',
  body: 'This article is coming soon. Check back shortly.',
};

export async function generateStaticParams() {
  return Object.keys(articles).map(slug => ({ slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = articles[params.slug] ?? { ...fallback, title: params.slug };
  const paragraphs = a.body.split('\n\n');

  return (
    <>
      {/* HERO */}
      <section style={{position:'relative',minHeight:'55vh',display:'flex',alignItems:'flex-end',paddingBottom:'5rem',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:`url('${a.img}')`,backgroundSize:'cover',backgroundPosition:'center',filter:'brightness(0.35)'}} />
        <div className="wrap" style={{position:'relative',zIndex:1,maxWidth:'800px'}}>
          <div className="section-tag" style={{color:'rgba(253,251,246,0.6)'}}><span className="dot" /><span>{a.cat} · {a.time}</span></div>
          <h1 style={{color:'var(--cream)',fontFamily:'var(--serif)',fontSize:'clamp(1.8rem,4vw,3rem)',lineHeight:1.15,marginTop:'1rem'}}>{a.title}</h1>
          <p style={{color:'rgba(253,251,246,0.6)',marginTop:'1rem',fontSize:'0.875rem'}}>Gosarvam Global · {a.date}</p>
        </div>
      </section>

      {/* BODY */}
      <section>
        <div className="wrap" style={{maxWidth:'720px'}}>
          <div style={{fontSize:'1.05rem',lineHeight:1.85,color:'var(--text)'}}>
            {paragraphs.map((p, i) => {
              if (p.startsWith('## ')) {
                return <h2 key={i} style={{fontFamily:'var(--serif)',fontSize:'1.6rem',margin:'2.5rem 0 1rem',color:'var(--ink)'}}>{p.slice(3)}</h2>;
              }
              if (p.startsWith('- **')) {
                const items = p.split('\n').filter(Boolean);
                return (
                  <ul key={i} className="list" style={{margin:'1rem 0'}}>
                    {items.map((item, j) => {
                      const cleaned = item.replace(/^- /, '');
                      const parts = cleaned.split('**');
                      return (
                        <li key={j}>
                          {parts.map((part, k) => k % 2 === 1 ? <strong key={k}>{part}</strong> : part)}
                        </li>
                      );
                    })}
                  </ul>
                );
              }
              const parts = p.split(/\*\*(.*?)\*\*/g);
              return (
                <p key={i} style={{marginBottom:'1.25rem'}}>
                  {parts.map((part, k) => k % 2 === 1 ? <strong key={k}>{part}</strong> : part)}
                </p>
              );
            })}
          </div>

          <div style={{marginTop:'4rem',paddingTop:'3rem',borderTop:'1px solid var(--border)',display:'flex',gap:'1rem',flexWrap:'wrap'}}>
            <Link href="/blog" className="btn btn-ghost btn-magnetic">← All Articles</Link>
            <Link href="/rfq" className="btn btn-primary btn-magnetic">
              Request Quotation
              <svg className="btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13 13 3M6 3h7v7"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
