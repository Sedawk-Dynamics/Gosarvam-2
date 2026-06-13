export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>Legal</span></div>
          <h1 className="r-up">Privacy <span className="italic-serif">Policy</span></h1>
          <p className="lead r-up mt-m" style={{maxWidth:'52ch'}}>Last updated: January 2025</p>
        </div>
      </section>
      <section>
        <div className="wrap" style={{maxWidth:'720px'}}>
          {[
            ['Information We Collect','We collect information you provide directly — such as your name, company, email, phone number, and trade requirements — when you submit an RFQ, contact form, or otherwise communicate with us.'],
            ['How We Use Your Information','We use the information you submit to: respond to your enquiries and quotation requests; prepare proforma invoices and trade documentation; communicate about your orders and shipments; and send relevant product updates (only with your consent).'],
            ['Data Sharing','We do not sell, rent, or share your personal data with third parties for marketing purposes. We may share data with: our freight forwarders and shipping agents strictly to fulfil your orders; government authorities when required by Indian export law; and third-party lab testing services for quality verification.'],
            ['Data Retention','We retain your information for as long as your trade relationship with us is active, and for a further period of 7 years as required by Indian tax and customs regulations.'],
            ['Your Rights','You may request access to, correction of, or deletion of your personal data at any time by contacting trade@gosarvamglobal.com. We will respond within 30 days.'],
            ['Cookies','This website uses minimal cookies — only those necessary for the website to function (theme preference, session state). No advertising or third-party tracking cookies are used.'],
            ['Security','We use HTTPS encryption and restrict access to personal data to employees who need it to respond to your enquiries.'],
            ['Contact','For any privacy-related questions, contact: trade@gosarvamglobal.com · Gosarvam Global LLP, Assam, India.'],
          ].map(([title, body]) => (
            <div key={title} style={{marginBottom:'2.5rem'}}>
              <h3 style={{fontFamily:'var(--serif)',marginBottom:'0.75rem'}}>{title}</h3>
              <p style={{lineHeight:1.8,opacity:0.8}}>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
