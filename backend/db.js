const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'gosarvam.db.json');

function readDb() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    return { rfqs: [], contacts: [] };
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function initDb() {
  const db = readDb();
  if (!db.rfqs) db.rfqs = [];
  if (!db.contacts) db.contacts = [];
  writeDb(db);
  console.log('[DB] Initialized — gosarvam.db.json');
}

function nextId(arr) {
  return arr.length > 0 ? Math.max(...arr.map(r => r.id)) + 1 : 1;
}

function saveRFQ(data) {
  const db = readDb();
  const id = nextId(db.rfqs);
  db.rfqs.unshift({ id, ...data, created_at: new Date().toISOString() });
  writeDb(db);
  return id;
}

function saveContact(data) {
  const db = readDb();
  const id = nextId(db.contacts);
  db.contacts.unshift({ id, ...data, created_at: new Date().toISOString() });
  writeDb(db);
  return id;
}

function getRFQs()     { return readDb().rfqs; }
function getContacts() { return readDb().contacts; }

module.exports = { initDb, saveRFQ, saveContact, getRFQs, getContacts };
