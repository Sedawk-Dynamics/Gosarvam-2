const nodemailer = require('nodemailer');

function getTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

async function sendRFQEmail(data) {
  const t = getTransporter();
  if (!t) return;
  await t.sendMail({
    from: `"Gosarvam RFQ System" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
    subject: `New RFQ — ${data.full_name} / ${data.company} (${data.country})`,
    html: `
      <h2 style="font-family:sans-serif;">New RFQ Received</h2>
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
        <tr><td><b>Name</b></td><td>${data.full_name}</td></tr>
        <tr><td><b>Company</b></td><td>${data.company}</td></tr>
        <tr><td><b>Email</b></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td><b>Phone</b></td><td>${data.phone}</td></tr>
        <tr><td><b>Country</b></td><td>${data.country}</td></tr>
        <tr><td><b>Destination Port</b></td><td>${data.destination_port || '—'}</td></tr>
        <tr><td><b>Products</b></td><td>${data.products}</td></tr>
        <tr><td><b>Quantity</b></td><td>${data.quantity || '—'}</td></tr>
        <tr><td><b>Shipping Mode</b></td><td>${data.shipping_mode}</td></tr>
        <tr><td><b>Incoterm</b></td><td>${data.incoterm}</td></tr>
        <tr><td><b>Payment Terms</b></td><td>${data.payment_terms}</td></tr>
        <tr><td><b>Required By</b></td><td>${data.required_by || '—'}</td></tr>
        <tr><td><b>Frequency</b></td><td>${data.order_frequency}</td></tr>
        <tr><td><b>Notes</b></td><td>${data.notes || '—'}</td></tr>
      </table>
    `,
  });
}

async function sendContactEmail(data) {
  const t = getTransporter();
  if (!t) return;
  await t.sendMail({
    from: `"Gosarvam Contact" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
    subject: `Contact from ${data.name}${data.company ? ' / ' + data.company : ''} (${data.country || 'unknown'})`,
    html: `
      <h2 style="font-family:sans-serif;">New Contact Message</h2>
      <p style="font-family:sans-serif;"><b>From:</b> ${data.name} &lt;<a href="mailto:${data.email}">${data.email}</a>&gt;</p>
      <p style="font-family:sans-serif;"><b>Company:</b> ${data.company || '—'}</p>
      <p style="font-family:sans-serif;"><b>Country:</b> ${data.country || '—'}</p>
      <p style="font-family:sans-serif;"><b>Message:</b></p>
      <blockquote style="font-family:sans-serif;border-left:4px solid #c9a063;padding-left:16px;">${data.message.replace(/\n/g, '<br>')}</blockquote>
    `,
  });
}

module.exports = { sendRFQEmail, sendContactEmail };
