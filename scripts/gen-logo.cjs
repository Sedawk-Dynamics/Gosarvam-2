// Gosarvam Global — Logo Asset Generator
// Run: node scripts/gen-logo.cjs
//
// Derives the web-ready logo assets from the master PNG (cream art on a solid
// black plate). Alpha is taken from luminance rather than a colour key, so the
// antialiased edges of the knotwork survive the knockout cleanly.
'use strict';

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const SRC    = 'C:\\Users\\yokes\\Downloads\\logo png.png';
const PUBIMG = path.join(__dirname, '../public/images');
const APP    = path.join(__dirname, '../app');

const THRESH = 28;   // luma above this counts as artwork, not plate
const INK    = 0x11; // favicon plate — matches --bg-dark

(async () => {
  const { data, info } = await sharp(SRC).ensureAlpha().raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;

  // ── Luminance map + brand colour sample ─────────────────────────────────────
  const luma = new Uint8Array(W * H);
  let cream = [255, 255, 255], best = -1;
  for (let i = 0, p = 0; i < W * H; i++, p += 4) {
    const l = (data[p] * 299 + data[p + 1] * 587 + data[p + 2] * 114) / 1000;
    luma[i] = l;
    if (l > best) { best = l; cream = [data[p], data[p + 1], data[p + 2]]; }
  }
  console.log('brand cream:', '#' + cream.map(v => v.toString(16).padStart(2, '0')).join(''));

  const bbox = (y0, y1) => {
    let x1 = W, y1b = H, x2 = -1, y2 = -1;
    for (let y = y0; y < y1; y++) for (let x = 0; x < W; x++) {
      if (luma[y * W + x] > THRESH) {
        if (x < x1) x1 = x; if (x > x2) x2 = x;
        if (y < y1b) y1b = y; if (y > y2) y2 = y;
      }
    }
    return { left: x1, top: y1b, width: x2 - x1 + 1, height: y2 - y1b + 1 };
  };

  // ── Split emblem from wordmark at the widest blank row-run ──────────────────
  const rows = [];
  for (let y = 0; y < H; y++) {
    let on = false;
    for (let x = 0; x < W; x++) if (luma[y * W + x] > THRESH) { on = true; break; }
    rows.push(on);
  }
  const first = rows.indexOf(true), last = rows.lastIndexOf(true);
  let split = last, run = 0, bestRun = 0;
  for (let y = first; y <= last; y++) {
    if (!rows[y]) { run++; if (run > bestRun) { bestRun = run; split = Math.round(y - run / 2); } }
    else run = 0;
  }
  console.log(`art rows ${first}-${last}; gutter ${bestRun}px at y=${split}`);

  const emblem = bbox(first, split);
  const lockup = bbox(first, last + 1);
  console.log('emblem:', emblem, '\nlockup:', lockup);

  // ── Knock out the plate: keep the cream, alpha from luma ────────────────────
  const art = Buffer.alloc(W * H * 4);
  for (let i = 0, p = 0; i < W * H; i++, p += 4) {
    art[p] = cream[0]; art[p + 1] = cream[1]; art[p + 2] = cream[2];
    art[p + 3] = Math.min(255, Math.round(luma[i] * 1.06)); // push solids to full opacity
  }
  const base = () => sharp(art, { raw: { width: W, height: H, channels: 4 } });

  // Pad the emblem crop to a square so it centres predictably at any CSS size.
  const side = Math.max(emblem.width, emblem.height);
  const lr = Math.round((side - emblem.width) / 2);
  const tb = Math.round((side - emblem.height) / 2);
  const pad = { left: lr, right: side - emblem.width - lr, top: tb, bottom: side - emblem.height - tb };
  const clear = { r: 0, g: 0, b: 0, alpha: 0 };
  const squareEmblem = () => base().extract(emblem).extend({ ...pad, background: clear });

  // 1 — transparent emblem for nav + footer
  await squareEmblem().resize(512, 512).png({ compressionLevel: 9 })
    .toFile(path.join(PUBIMG, 'logo-mark.png'));

  // 2 — transparent full lockup (emblem above wordmark)
  await base().extract(lockup).resize({ width: 1024 }).png({ compressionLevel: 9 })
    .toFile(path.join(PUBIMG, 'logo-lockup.png'));

  // 3 — favicons: emblem on an ink plate, so it reads in light and dark tab bars
  const plate = async (size, inset) => {
    const mark = await squareEmblem().resize(size - inset * 2, size - inset * 2).png().toBuffer();
    return sharp({ create: { width: size, height: size, channels: 4,
      background: { r: INK, g: INK, b: INK, alpha: 1 } } })
      .composite([{ input: mark, top: inset, left: inset }])
      .png({ compressionLevel: 9 });
  };
  await (await plate(512, 54)).toFile(path.join(APP, 'icon.png'));
  await (await plate(180, 19)).toFile(path.join(APP, 'apple-icon.png'));

  // 4 — favicon.ico, so /favicon.ico still resolves for crawlers and old clients.
  // Entries are PNG-encoded, which every browser since IE11 reads.
  const sizes = [16, 32, 48, 256];
  const pngs = [];
  for (const s of sizes) pngs.push(await (await plate(s, Math.max(1, Math.round(s * 0.105)))).toBuffer());
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
  const dir = Buffer.alloc(16 * sizes.length);
  let offset = 6 + dir.length;
  sizes.forEach((s, i) => {
    const o = i * 16;
    dir[o] = s === 256 ? 0 : s;      // 0 means 256 in the ICO spec
    dir[o + 1] = s === 256 ? 0 : s;
    dir[o + 4] = 1;                   // colour planes
    dir.writeUInt16LE(32, o + 6);     // bits per pixel
    dir.writeUInt32LE(pngs[i].length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += pngs[i].length;
  });
  fs.writeFileSync(path.join(APP, 'favicon.ico'), Buffer.concat([header, dir, ...pngs]));

  console.log('\nwrote:');
  for (const f of [[PUBIMG, 'logo-mark.png'], [PUBIMG, 'logo-lockup.png'],
                   [APP, 'icon.png'], [APP, 'apple-icon.png']]) {
    const m = await sharp(path.join(...f)).metadata();
    console.log(`  ${f[1].padEnd(18)} ${m.width}x${m.height}`);
  }
  console.log(`  favicon.ico        ${sizes.join('/')} @ ${fs.statSync(path.join(APP, 'favicon.ico')).size}b`);
})();
