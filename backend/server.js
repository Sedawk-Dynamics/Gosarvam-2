require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDb, saveRFQ, saveContact, getRFQs, getContacts } = require('./db');
const { sendRFQEmail, sendContactEmail } = require('./mailer');

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_KEY = process.env.ADMIN_KEY || 'gosarvam-admin-2025';

app.use(cors());
app.use(express.json());

initDb();

// ── Root & health check ──────────────────────────────────────
app.get('/', (req, res) => res.redirect('http://localhost:3000'));
app.get('/api', (req, res) => {
  res.json({ ok: true, service: 'Gosarvam Global API', version: '1.0.0' });
});

// ── RFQ submission ──────────────────────────────────────────
app.post('/api/rfq', async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.email) {
      return res.status(400).json({ ok: false, error: 'Name and email are required.' });
    }
    const id = saveRFQ(data);
    sendRFQEmail(data).catch(e => console.error('RFQ email failed:', e.message));
    console.log(`[RFQ] #${id} from ${data.name} <${data.email}>`);
    res.json({ ok: true, id });
  } catch (err) {
    console.error('[RFQ] Error:', err);
    res.status(500).json({ ok: false, error: 'Server error — please try again.' });
  }
});

// ── Contact submission ──────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.email || !data.message) {
      return res.status(400).json({ ok: false, error: 'Name, email, and message are required.' });
    }
    const id = saveContact(data);
    sendContactEmail(data).catch(e => console.error('Contact email failed:', e.message));
    console.log(`[Contact] #${id} from ${data.name} <${data.email}>`);
    res.json({ ok: true, id });
  } catch (err) {
    console.error('[Contact] Error:', err);
    res.status(500).json({ ok: false, error: 'Server error — please try again.' });
  }
});

// ── Admin — view all RFQs ───────────────────────────────────
app.get('/api/admin/rfqs', (req, res) => {
  if (req.query.key !== ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' });
  res.json(getRFQs());
});

// ── Admin — view all contacts ───────────────────────────────
app.get('/api/admin/contacts', (req, res) => {
  if (req.query.key !== ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' });
  res.json(getContacts());
});

app.listen(PORT, () => {
  console.log(`\n  Gosarvam Global — Backend API running`);
  console.log(`  API:   http://localhost:${PORT}/api`);
  console.log(`  Admin: http://localhost:3000/admin (Next.js)\n`);
});
