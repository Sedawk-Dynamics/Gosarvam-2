'use client';
import { useState } from 'react';

type RFQ = { id: string; name: string; company: string; email: string; phone: string; country: string; product: string; quantity: string; incoterm: string; port: string; payment: string; packaging: string; notes: string; createdAt: string };
type Contact = { id: string; name: string; company: string; email: string; phone: string; subject: string; message: string; createdAt: string };

const API = 'http://localhost:3001/api/admin';

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<'rfqs'|'contacts'>('rfqs');
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function login() {
    setLoading(true); setError('');
    try {
      const [r1, r2] = await Promise.all([
        fetch(`${API}/rfqs?key=${key}`),
        fetch(`${API}/contacts?key=${key}`),
      ]);
      if (!r1.ok || !r2.ok) throw new Error('Invalid key');
      setRfqs(await r1.json());
      setContacts(await r2.json());
      setAuthed(true);
    } catch {
      setError('Invalid admin key. Access denied.');
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    setLoading(true);
    try {
      const [r1, r2] = await Promise.all([
        fetch(`${API}/rfqs?key=${key}`),
        fetch(`${API}/contacts?key=${key}`),
      ]);
      setRfqs(await r1.json());
      setContacts(await r2.json());
    } finally {
      setLoading(false);
    }
  }

  if (!authed) {
    return (
      <section style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:'100%',maxWidth:'400px',padding:'2.5rem',border:'1px solid var(--border)',borderRadius:'16px',background:'var(--card-bg)'}}>
          <h2 style={{fontFamily:'var(--serif)',marginBottom:'0.5rem',textAlign:'center'}}>Admin Access</h2>
          <p className="text-mute" style={{textAlign:'center',marginBottom:'2rem',fontSize:'0.875rem'}}>Enter your admin key to view submissions.</p>
          <div className="form-group" style={{marginBottom:'1rem'}}>
            <label htmlFor="adminkey">Admin Key</label>
            <input
              id="adminkey" type="password" value={key}
              onChange={e => setKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              placeholder="Enter admin key" className="form-control"
            />
          </div>
          {error && <p style={{color:'#c0392b',fontSize:'0.875rem',marginBottom:'1rem'}}>{error}</p>}
          <button onClick={login} disabled={loading || !key} className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>
            {loading ? 'Authenticating…' : 'Access Dashboard'}
          </button>
        </div>
      </section>
    );
  }

  const fmt = (d: string) => new Date(d).toLocaleString('en-IN', {dateStyle:'medium',timeStyle:'short'});

  return (
    <section>
      <div className="wrap">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem',flexWrap:'wrap',gap:'1rem'}}>
          <div>
            <div className="section-tag"><span className="dot" /><span>Admin Dashboard</span></div>
            <h1 style={{fontFamily:'var(--serif)',fontSize:'2rem'}}>Submissions</h1>
          </div>
          <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
            <button onClick={refresh} className="btn btn-ghost" disabled={loading}>{loading?'Refreshing…':'Refresh'}</button>
            <button onClick={() => setAuthed(false)} className="btn btn-ghost">Sign Out</button>
          </div>
        </div>

        {/* TABS */}
        <div style={{display:'flex',gap:'1rem',marginBottom:'2rem',borderBottom:'1px solid var(--border)',paddingBottom:'0'}}>
          {(['rfqs','contacts'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding:'0.75rem 1.5rem',background:'none',border:'none',cursor:'pointer',
              fontFamily:'var(--mono)',fontSize:'0.8rem',letterSpacing:'0.05em',textTransform:'uppercase',
              borderBottom:`2px solid ${tab===t?'var(--gold)':'transparent'}`,
              color: tab===t?'var(--gold)':'var(--text)',
              transition:'color 0.2s,border-color 0.2s',
            }}>
              {t === 'rfqs' ? `RFQs (${rfqs.length})` : `Contact (${contacts.length})`}
            </button>
          ))}
        </div>

        {/* RFQs */}
        {tab === 'rfqs' && (
          rfqs.length === 0 ? (
            <p className="text-mute" style={{textAlign:'center',padding:'4rem'}}>No RFQ submissions yet.</p>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
              {[...rfqs].reverse().map(r => (
                <div key={r.id} style={{border:'1px solid var(--border)',borderRadius:'12px',background:'var(--card-bg)',overflow:'hidden'}}>
                  <div style={{padding:'1rem 1.5rem',background:'rgba(201,160,99,0.08)',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'0.5rem'}}>
                    <div>
                      <strong>{r.name}</strong> · {r.company}
                      <span className="text-mute" style={{marginLeft:'1rem',fontSize:'0.8rem'}}>{r.email}</span>
                    </div>
                    <span className="text-mute" style={{fontSize:'0.78rem'}}>{fmt(r.createdAt)}</span>
                  </div>
                  <div style={{padding:'1.25rem 1.5rem',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'0.75rem 1.5rem'}}>
                    {[['Product',r.product],['Quantity',r.quantity],['Incoterm',r.incoterm],['Port',r.port],['Payment',r.payment],['Country',r.country],['Phone',r.phone],['Packaging',r.packaging]].map(([k,v]) => v && (
                      <div key={k}>
                        <div style={{fontSize:'0.7rem',opacity:0.5,textTransform:'uppercase',letterSpacing:'0.08em'}}>{k}</div>
                        <div style={{fontWeight:500,fontSize:'0.875rem'}}>{v}</div>
                      </div>
                    ))}
                    {r.notes && (
                      <div style={{gridColumn:'1/-1'}}>
                        <div style={{fontSize:'0.7rem',opacity:0.5,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'0.25rem'}}>Notes</div>
                        <div style={{fontSize:'0.875rem',opacity:0.85,lineHeight:1.6,whiteSpace:'pre-wrap'}}>{r.notes}</div>
                      </div>
                    )}
                  </div>
                  <div style={{padding:'0.75rem 1.5rem',borderTop:'1px solid var(--border)',display:'flex',gap:'0.75rem'}}>
                    <a href={`mailto:${r.email}?subject=Re: Your RFQ – ${r.product}&body=Dear ${r.name},%0D%0A%0D%0AThank you for your enquiry regarding ${r.product}.`} className="btn btn-ghost" style={{fontSize:'0.8rem',padding:'0.4rem 1rem'}}>Reply by Email</a>
                    {r.phone && <a href={`https://wa.me/${r.phone.replace(/\D/g,'')}`} target="_blank" rel="noopener" className="btn btn-ghost" style={{fontSize:'0.8rem',padding:'0.4rem 1rem'}}>WhatsApp</a>}
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* CONTACTS */}
        {tab === 'contacts' && (
          contacts.length === 0 ? (
            <p className="text-mute" style={{textAlign:'center',padding:'4rem'}}>No contact submissions yet.</p>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
              {[...contacts].reverse().map(c => (
                <div key={c.id} style={{border:'1px solid var(--border)',borderRadius:'12px',background:'var(--card-bg)',overflow:'hidden'}}>
                  <div style={{padding:'1rem 1.5rem',background:'rgba(201,160,99,0.08)',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'0.5rem'}}>
                    <div>
                      <strong>{c.name}</strong> · {c.company}
                      <span className="text-mute" style={{marginLeft:'1rem',fontSize:'0.8rem'}}>{c.email}</span>
                    </div>
                    <span className="text-mute" style={{fontSize:'0.78rem'}}>{fmt(c.createdAt)}</span>
                  </div>
                  <div style={{padding:'1.25rem 1.5rem'}}>
                    <div style={{marginBottom:'0.75rem'}}>
                      <div style={{fontSize:'0.7rem',opacity:0.5,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'0.2rem'}}>Subject</div>
                      <div style={{fontWeight:600}}>{c.subject}</div>
                    </div>
                    <div>
                      <div style={{fontSize:'0.7rem',opacity:0.5,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'0.2rem'}}>Message</div>
                      <div style={{fontSize:'0.875rem',lineHeight:1.7,whiteSpace:'pre-wrap',opacity:0.85}}>{c.message}</div>
                    </div>
                  </div>
                  <div style={{padding:'0.75rem 1.5rem',borderTop:'1px solid var(--border)',display:'flex',gap:'0.75rem'}}>
                    <a href={`mailto:${c.email}?subject=Re: ${c.subject}`} className="btn btn-ghost" style={{fontSize:'0.8rem',padding:'0.4rem 1rem'}}>Reply by Email</a>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </section>
  );
}
