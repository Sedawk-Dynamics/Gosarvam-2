import Link from 'next/link';
import { posts } from '@/lib/blog';

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
            {posts.map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="blog-card">
                <div className="ph" style={{backgroundImage:`url('${a.img}')`}} />
                <div className="bd">
                  <div className="ct">{a.cat} · {a.time} read</div>
                  <h3>{a.cardTitle}</h3>
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
