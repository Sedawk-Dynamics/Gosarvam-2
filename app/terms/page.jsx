export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="section-tag"><span className="dot" /><span>Legal</span></div>
          <h1 className="r-up">Terms &amp; <span className="italic-serif">Conditions</span></h1>
          <p className="lead r-up mt-m" style={{maxWidth:'52ch'}}>Last updated: January 2025</p>
        </div>
      </section>
      <section>
        <div className="wrap" style={{maxWidth:'720px'}}>
          {[
            ['Acceptance','By submitting an RFQ, placing an order, or otherwise engaging with Gosarvam Global LLP, you agree to these terms. If you do not agree, do not use our services.'],
            ['Quotations','All quotations issued by Gosarvam Global LLP are valid for 7 days unless otherwise stated in writing. Prices are subject to change based on commodity market fluctuations, exchange rates, and shipping costs.'],
            ['Orders','A binding contract is formed only upon: (a) our written acceptance of your Purchase Order; and (b) receipt of the agreed advance payment or LC as stipulated in the proforma invoice.'],
            ['Quality & Specifications','All products are shipped to the grade and specification stated in the confirmed proforma invoice. Minor variations (±2–3%) in moisture, size, and colour are inherent to agricultural products and do not constitute a breach. Third-party pre-shipment inspection is available at buyer\'s cost.'],
            ['Delivery & Incoterms','Risk of loss transfers per the Incoterm specified in the proforma invoice. Gosarvam\'s liability ends at the agreed delivery point. We are not liable for delays caused by shipping lines, port congestion, force majeure, or customs at the destination.'],
            ['Payment','All payments are due as specified in the proforma invoice. Gosarvam Global LLP reserves the right to cancel any order for which payment is not received as agreed.'],
            ['Dispute Resolution','These terms are governed by the laws of India. Any disputes shall first be attempted through good-faith negotiation, and failing that, shall be referred to arbitration in Guwahati, Assam, under the Arbitration and Conciliation Act, 1996.'],
            ['Limitation of Liability','Gosarvam\'s total liability for any claim shall not exceed the invoice value of the goods in question. We are not liable for indirect, consequential, or loss-of-profit damages.'],
            ['Contact','For any legal or contractual queries, contact: trade@gosarvamglobal.com · Gosarvam Global LLP, Assam, India.'],
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
