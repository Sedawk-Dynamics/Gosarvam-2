// Email notifications for form submissions.
// No-ops silently when SMTP credentials are absent, so local development and
// preview deploys work without a mailbox configured.
import nodemailer from 'nodemailer';

function getTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

// Values land in an HTML email, so escape anything the sender controls.
function esc(v) {
  if (v === undefined || v === null || v === '') return '—';
  return String(v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export async function sendRFQEmail(data) {
  const t = getTransporter();
  if (!t) return;
  // Field names must match the payload built in app/rfq/page.jsx.
  const rows = [
    ['Name', data.name], ['Company', data.company], ['Email', data.email],
    ['Phone', data.phone], ['Country', data.country], ['Destination Port', data.port],
    ['Product', data.product], ['Quantity', data.quantity],
    ['Incoterm', data.incoterm], ['Payment Terms', data.payment],
    ['Packaging', data.packaging], ['Notes', data.notes],
  ];
  await t.sendMail({
    from: `"Gosarvam RFQ System" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
    replyTo: data.email,
    subject: `New RFQ — ${data.name} / ${data.company} (${data.country})`,
    html: `
      <h2 style="font-family:sans-serif;">New RFQ Received</h2>
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
        ${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`).join('')}
      </table>
    `,
  });
}

export async function sendContactEmail(data) {
  const t = getTransporter();
  if (!t) return;
  await t.sendMail({
    from: `"Gosarvam Contact" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
    replyTo: data.email,
    subject: `Contact from ${data.name}${data.company ? ' / ' + data.company : ''} (${data.country || 'unknown'})`,
    html: `
      <h2 style="font-family:sans-serif;">New Contact Message</h2>
      <p style="font-family:sans-serif;"><b>From:</b> ${esc(data.name)} &lt;${esc(data.email)}&gt;</p>
      <p style="font-family:sans-serif;"><b>Company:</b> ${esc(data.company)}</p>
      <p style="font-family:sans-serif;"><b>Country:</b> ${esc(data.country)}</p>
      <p style="font-family:sans-serif;"><b>Subject:</b> ${esc(data.subject)}</p>
      <p style="font-family:sans-serif;"><b>Message:</b></p>
      <blockquote style="font-family:sans-serif;border-left:4px solid #c9a063;padding-left:16px;">${esc(data.message).replace(/\n/g, '<br>')}</blockquote>
    `,
  });
}
