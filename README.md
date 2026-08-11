# Gosarvam Global

Export house website for Gosarvam Global LLP — built with Next.js 16 (App Router,
Turbopack) in plain JavaScript.

## Running it

```bash
npm install
cp .env.example .env.local   # optional, only needed for email + /admin
npm run dev
```

Open <http://localhost:3000>. There is no separate backend server — the form
endpoints run inside Next.js as route handlers.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload on :3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run gen:logo` | Regenerate logo assets + favicons from the master PNG |
| `npm run gen:catalogues` | Regenerate the product catalogue PDFs |

## Layout

```
app/              Pages, API route handlers, and components
  api/            POST /api/rfq, /api/contact · GET /api/admin/*
  components/     Nav, Footer, 3D canvases, product coverflow
  products/       Grid + [slug] detail pages
lib/              Data and server helpers, shared across pages
  products.js     Product catalogue + WordPress page links
  mailer.js       Nodemailer notifications
  db.js           Flat-file store for submissions
  auth.js         Admin key check
public/           Images, videos, catalogue PDFs
scripts/          One-off asset generators (logo, catalogue PDFs)
```

## Linking products to WordPress

Product content lives in [`lib/products.js`](lib/products.js). To serve a product
from a WordPress page instead of the built-in detail page, put its URL in
`wpPages`:

```js
export const wpPages = {
  'assam-tea': 'https://yoursite.com/assam-tea',   // now links to WordPress
  'jute': '',                                       // still uses /products/jute
  ...
};
```

Every link to that product — the `/products` grid and the "Also Available" strip
on each detail page — follows the WordPress URL automatically, rendering a plain
`<a>` instead of a client-side `next/link`. Leave an entry as `''` to keep using
the local page, so products can be migrated one at a time.

## Forms and the admin dashboard

`/rfq` and `/contact` POST to route handlers under `app/api/`. Each submission is
written to `data/submissions.json` and emailed via `lib/mailer.js`.

**The flat-file store only persists where the filesystem is writable — i.e. local
development.** On Vercel and similar hosts the deployment is read-only, so writes
are skipped (the submission still emails) and `/admin` will appear empty. Swap
`lib/db.js` for a real database before depending on it in production.

`/admin` is gated by `ADMIN_KEY`. It is a shared password sent as a query
parameter, which is fine for an internal dashboard but is not real
authentication — don't put anything sensitive behind it.
