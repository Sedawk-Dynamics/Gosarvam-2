import Link from 'next/link';
import { posts, postsBySlug } from '@/lib/blog';

const fallback = {
  title: 'Article',
  cat: 'Journal', time: '5 min', date: '2026',
  img: '/images/blog/assam-tea.png',
  body: 'This article is coming soon. Check back shortly.',
};

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export default async function ArticlePage({ params }) {
  // Next 16 passes params as a promise — it must be awaited before use.
  const { slug } = await params;
  const a = postsBySlug[slug] ?? { ...fallback, title: slug };
  const paragraphs = a.body.split('\n\n');

  return (
    <>
      {/* HERO */}
      <section style={{position:'relative',minHeight:'55vh',display:'flex',alignItems:'flex-end',paddingBottom:'5rem',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:`url('${a.hero ?? a.img}')`,backgroundSize:'cover',backgroundPosition:'center',filter:'brightness(0.35)'}} />
        <div className="wrap" style={{position:'relative',zIndex:1,maxWidth:'800px'}}>
          <div className="section-tag" style={{color:'rgba(253,251,246,0.6)'}}><span className="dot" /><span>{a.cat} · {a.time} read</span></div>
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
