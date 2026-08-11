// Flat-file store for form submissions, carried over from the old Express backend.
//
// IMPORTANT: this only persists where the filesystem is writable — i.e. local
// development. On Vercel (and most serverless hosts) the deployment is read-only,
// so writes are skipped and submissions survive only as the notification email
// sent by lib/mailer.js. The /admin dashboard will therefore look empty in
// production. Move to a real database (Postgres, Mongo, Sheets) before relying
// on it there.
import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'submissions.json');
const EMPTY = { rfqs: [], contacts: [] };

function readDb() {
  try {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    return { rfqs: db.rfqs ?? [], contacts: db.contacts ?? [] };
  } catch {
    return { ...EMPTY };
  }
}

// Returns false when the filesystem is read-only rather than throwing —
// a failed write must not cost the user their submission.
function writeDb(data) {
  try {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.warn('[db] not persisted (read-only filesystem?):', err.message);
    return false;
  }
}

function nextId(arr) {
  return arr.length > 0 ? Math.max(...arr.map(r => r.id)) + 1 : 1;
}

function save(bucket, data) {
  const db = readDb();
  const id = nextId(db[bucket]);
  db[bucket].unshift({ id, ...data, created_at: new Date().toISOString() });
  writeDb(db);
  return id;
}

export const saveRFQ = data => save('rfqs', data);
export const saveContact = data => save('contacts', data);
export const getRFQs = () => readDb().rfqs;
export const getContacts = () => readDb().contacts;
