'use client';
import { useState, FormEvent } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data),
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
          <div className="section-tag"><span className="dot" /><span>Get In Touch</span></div>
          <h1 className="r-up">Let&apos;s start a <span className="italic-serif">conversation.</span></h1>
          <p className="lead r-up mt-m" style={{maxWidth:'52ch'}}>
            Our trade team is based in Assam, India and responds within 24 business hours.
            For urgent enquiries, reach us on WhatsApp.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="story-grid">
            {/* FORM */}
            <div>
              <div className="section-tag"><span className="dot" /><span>Send a Message</span></div>
              <h2 className="r-up" style={{maxWidth:'20ch',marginBottom:'2rem'}}>Write to our <span className="italic-serif">trade team.</span></h2>

              {status === 'ok' ? (
                <div style={{padding:'2rem',border:'1px solid var(--border)',borderRadius:'12px',background:'var(--card-bg)',textAlign:'center'}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48" style={{color:'var(--gold)',margin:'0 auto 1rem',display:'block'}}>
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                  <h3 style={{fontFamily:'var(--serif)',marginBottom:'0.5rem'}}>Message Sent</h3>
                  <p className="text-mute">Thank you for reaching out. We will respond within 24 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input id="name" name="name" type="text" required placeholder="Your name" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company *</label>
                      <input id="company" name="company" type="text" required placeholder="Company / Organisation" className="form-control" />
                    </div>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                    <div className="form-group">
                      <label htmlFor="email">Business Email *</label>
                      <input id="email" name="email" type="email" required placeholder="you@company.com" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone / WhatsApp</label>
                      <input id="phone" name="phone" type="tel" placeholder="+1 555 000 0000" className="form-control" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input id="subject" name="subject" type="text" required placeholder="e.g. Enquiry about Assam Tea pricing" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea id="message" name="message" required rows={6} placeholder="Tell us what you need..." className="form-control" style={{resize:'vertical'}} />
                  </div>
                  {status === 'err' && (
                    <p style={{color:'#c0392b',fontSize:'0.875rem'}}>Something went wrong. Please try again or email us directly.</p>
                  )}
                  <button type="submit" className="btn btn-primary btn-magnetic" style={{alignSelf:'flex-start'}} disabled={status==='sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                    <svg className="btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13 13 3M6 3h7v7"/></svg>
                  </button>
                </form>
              )}
            </div>

            {/* CONTACT INFO */}
            <div>
              <div className="section-tag"><span className="dot" /><span>Direct Contact</span></div>
              <h2 className="r-up" style={{maxWidth:'18ch',marginBottom:'2rem'}}>Reach us <span className="italic-serif">directly.</span></h2>
              <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
                {[
                  {icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6"/></svg>,label:'Email',val:'trade@gosarvamglobal.com',href:'mailto:trade@gosarvamglobal.com'},
                  {icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1A19.5 19.5 0 015.1 12.8 19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7 19 19 0 00.5 2.6 2 2 0 01-.5 2.1L8 9.6a16 16 0 006.4 6.4l1.2-1.2a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6a2 2 0 011.7 1.9z"/></svg>,label:'Phone',val:'+91 99999 99999',href:'tel:+919999999999'},
                  {icon:<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2A10 10 0 002 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4A10 10 0 1012 2zm5.4 14c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-1.7-.1-.4-.1-1-.3-1.6-.6-2.9-1.2-4.8-4.2-4.9-4.4-.1-.2-1.2-1.6-1.2-3 0-1.4.7-2.1 1-2.4.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.3.5c-.1.2-.2.3-.1.5.2.3.7 1.2 1.6 2 1.1.9 2 1.2 2.2 1.3.2.1.4.1.5-.1.2-.2.6-.7.8-1 .2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.5.3.1.2.1.7-.1 1.4z"/></svg>,label:'WhatsApp',val:'+91 99999 99999 (Sales)',href:'https://wa.me/919999999999'},
                  {icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,label:'Address',val:'Gosarvam Global LLP, Assam, India',href:''},
                ].map(({icon,label,val,href}) => (
                  <div key={label} style={{display:'flex',gap:'1rem',alignItems:'flex-start'}}>
                    <div style={{width:'40px',height:'40px',borderRadius:'8px',background:'var(--card-bg)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:'var(--gold)'}}>{icon}</div>
                    <div>
                      <div style={{fontSize:'0.75rem',opacity:0.5,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.2rem'}}>{label}</div>
                      {href ? <a href={href} target={href.startsWith('http')?'_blank':undefined} rel="noopener" style={{color:'var(--ink)',fontWeight:500}}>{val}</a> : <span style={{fontWeight:500}}>{val}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'2.5rem',padding:'1.5rem',background:'var(--card-bg)',border:'1px solid var(--border)',borderRadius:'10px'}}>
                <h5 style={{marginBottom:'0.5rem'}}>Business Hours</h5>
                <p style={{fontSize:'0.85rem',opacity:0.7,lineHeight:1.6}}>
                  Monday – Saturday: 9:00 AM – 6:00 PM IST<br/>
                  Sunday: Closed<br/>
                  WhatsApp enquiries responded within 2 hours on business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
