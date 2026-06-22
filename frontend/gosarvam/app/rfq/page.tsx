'use client';
import { useState, FormEvent } from 'react';

const products = ['Assam Orthodox Tea','Jute Products','Fox Nuts (Makhana)','Organic Jaggery','Moringa Powder','Cow Dung Eco Solutions','Food Essentials','Multiple / Custom'];
const quantities = ['< 1 MT','1–5 MT','5–20 MT','20–100 MT','100+ MT'];
const incoterms = ['FOB','CIF','CFR','EXW','Not Sure'];
const payments = ['70% Advance + 30% on B/L','LC at Sight (Irrevocable)','Discuss'];

export default function RFQPage() {
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value ?? '';
    const data = {
      name: get('name'), company: get('company'), email: get('email'), phone: get('phone'),
      country: get('country'), product: get('product'), quantity: get('quantity'),
      incoterm: get('incoterm'), port: get('port'), payment: get('payment'),
      packaging: get('packaging'), notes: get('notes'),
    };
    try {
      const res = await fetch('http://localhost:3001/api/rfq', {
        method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('err');
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>Request for Quotation</span></div>
          <h1 className="r-up">Tell us what you <span className="italic-serif">need.</span></h1>
          <p className="lead r-up mt-m" style={{maxWidth:'52ch'}}>
            Fill in your requirements below and our trade team will respond with a detailed proforma invoice within 24 business hours.
            First-time buyers receive complimentary samples.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap" style={{maxWidth:'860px',margin:'0 auto'}}>
          {status === 'ok' ? (
            <div style={{padding:'4rem 2rem',border:'1px solid var(--border)',borderRadius:'16px',background:'var(--card-bg)',textAlign:'center'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="56" height="56" style={{color:'var(--gold)',margin:'0 auto 1.5rem',display:'block'}}>
                <path d="M5 13l4 4L19 7"/>
              </svg>
              <h2 style={{fontFamily:'var(--serif)',marginBottom:'0.75rem'}}>RFQ Received</h2>
              <p className="lead text-mute">
                Thank you! Our trade team will review your requirements and respond within 24 business hours with a detailed proforma invoice.
              </p>
              <p className="text-mute" style={{marginTop:'0.5rem',fontSize:'0.875rem'}}>
                Reference: Your email confirmation is on its way. Check your spam folder if not received within 10 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
              {/* BUYER INFO */}
              <fieldset style={{border:'1px solid var(--border)',borderRadius:'12px',padding:'1.5rem 2rem',background:'var(--card-bg)'}}>
                <legend style={{fontFamily:'var(--mono)',fontSize:'0.75rem',letterSpacing:'0.1em',textTransform:'uppercase',padding:'0 0.75rem',opacity:0.6}}>Buyer Information</legend>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginTop:'0.5rem'}}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" required placeholder="Your name" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company *</label>
                    <input id="company" name="company" type="text" required placeholder="Company name" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Business Email *</label>
                    <input id="email" name="email" type="email" required placeholder="you@company.com" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone / WhatsApp *</label>
                    <input id="phone" name="phone" type="tel" required placeholder="+1 555 000 0000" className="form-control" />
                  </div>
                  <div className="form-group" style={{gridColumn:'1/-1'}}>
                    <label htmlFor="country">Destination Country *</label>
                    <input id="country" name="country" type="text" required placeholder="e.g. United States" className="form-control" />
                  </div>
                </div>
              </fieldset>

              {/* PRODUCT */}
              <fieldset style={{border:'1px solid var(--border)',borderRadius:'12px',padding:'1.5rem 2rem',background:'var(--card-bg)'}}>
                <legend style={{fontFamily:'var(--mono)',fontSize:'0.75rem',letterSpacing:'0.1em',textTransform:'uppercase',padding:'0 0.75rem',opacity:0.6}}>Product Requirements</legend>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginTop:'0.5rem'}}>
                  <div className="form-group">
                    <label htmlFor="product">Product Category *</label>
                    <select id="product" name="product" required className="form-control">
                      <option value="">Select product</option>
                      {products.map(p=><option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantity">Approximate Quantity *</label>
                    <select id="quantity" name="quantity" required className="form-control">
                      <option value="">Select range</option>
                      {quantities.map(q=><option key={q} value={q}>{q}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="incoterm">Preferred Incoterm</label>
                    <select id="incoterm" name="incoterm" className="form-control">
                      <option value="">Select Incoterm</option>
                      {incoterms.map(i=><option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="port">Destination Port</label>
                    <input id="port" name="port" type="text" placeholder="e.g. Port of Los Angeles" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="payment">Payment Term</label>
                    <select id="payment" name="payment" className="form-control">
                      <option value="">Select payment term</option>
                      {payments.map(p=><option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="packaging">Packaging Preference</label>
                    <input id="packaging" name="packaging" type="text" placeholder="e.g. 20 kg bags, retail pouches" className="form-control" />
                  </div>
                  <div className="form-group" style={{gridColumn:'1/-1'}}>
                    <label htmlFor="notes">Additional Notes / Grade / Certification Requirement</label>
                    <textarea id="notes" name="notes" rows={5} className="form-control" style={{resize:'vertical'}} placeholder="Any specific grades, certifications (organic, USDA, etc.), or other requirements..." />
                  </div>
                </div>
              </fieldset>

              {status === 'err' && (
                <p style={{color:'#c0392b',fontSize:'0.875rem'}}>Something went wrong. Please try again or email trade@gosarvamglobal.com directly.</p>
              )}

              <button type="submit" className="btn btn-primary btn-magnetic" style={{alignSelf:'flex-start',padding:'1rem 2.5rem'}} disabled={status==='sending'}>
                {status === 'sending' ? 'Submitting…' : 'Submit RFQ'}
                <svg className="btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13 13 3M6 3h7v7"/></svg>
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
