// Gosarvam Global — Logo Asset Generator
// Run: npm run gen:logo   (node scripts/gen-logo.cjs)
//
// Derives every web logo asset from the full-colour master in
// public/images/logo-master.png.
//
// Why a flood fill and not a colour key: white is a FUNCTIONAL colour in this
// mark — the gap inside the yellow frame, the octagram, and the counters of the
// green knot are all white. Keying out white would punch holes through the
// middle of the emblem and let the dark nav show through. So instead we flood
// fill inward from the image border and clear only background that is actually
// reachable from outside, which leaves every interior white intact.
'use strict';

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const PUB    = path.join(__dirname, '../public');
const PUBIMG = path.join(PUB, 'images');
const APP    = path.join(__dirname, '../app');
const SRC    = path.join(PUBIMG, 'logo-master.png');

const BG_MIN = 244;  // channel value at or above which a pixel counts as background
const PLATE  = '#ffffff';  // favicon plate — the mark is drawn for white

(async () => {
  const { data, info } = await sharp(SRC)
    .flatten({ background: PLATE })   // master has an alpha channel; settle it on white
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const px = Buffer.from(data);

  const isBg = i => px[i * 4] >= BG_MIN && px[i * 4 + 1] >= BG_MIN && px[i * 4 + 2] >= BG_MIN;

  // ── Clear background reachable from the border, preserving interior white ───
  const outside = new Uint8Array(W * H);
  const stack = [];
  for (let x = 0; x < W; x++) { stack.push(x, (H - 1) * W + x); }
  for (let y = 0; y < H; y++) { stack.push(y * W, y * W + W - 1); }
  while (stack.length) {
    const i = stack.pop();
    if (outside[i] || !isBg(i)) continue;
    outside[i] = 1;
    const x = i % W, y = (i - x) / W;
    if (x > 0)     stack.push(i - 1);
    if (x < W - 1) stack.push(i + 1);
    if (y > 0)     stack.push(i - W);
    if (y < H - 1) stack.push(i + W);
  }
  let cleared = 0;
  for (let i = 0; i < W * H; i++) if (outside[i]) { px[i * 4 + 3] = 0; cleared++; }
  console.log(`cleared ${(cleared / (W * H) * 100).toFixed(1)}% as background; interior white preserved`);

  // ── Bounding boxes: emblem above the gutter, wordmark below ────────────────
  const rowHasArt = y => {
    for (let x = 0; x < W; x++) if (!outside[y * W + x]) return true;
    return false;
  };
  const rows = [];
  for (let y = 0; y < H; y++) rows.push(rowHasArt(y));
  const first = rows.indexOf(true), last = rows.lastIndexOf(true);
  let split = last, run = 0, bestRun = 0;
  for (let y = first; y <= last; y++) {
    if (!rows[y]) { run++; if (run > bestRun) { bestRun = run; split = Math.round(y - run / 2); } }
    else run = 0;
  }
  console.log(`art rows ${first}-${last}; gutter ${bestRun}px at y=${split}`);

  const bbox = (y0, y1) => {
    let x1 = W, y1b = H, x2 = -1, y2 = -1;
    for (let y = y0; y < y1; y++) for (let x = 0; x < W; x++) {
      if (!outside[y * W + x]) {
        if (x < x1) x1 = x; if (x > x2) x2 = x;
        if (y < y1b) y1b = y; if (y > y2) y2 = y;
      }
    }
    return { left: x1, top: y1b, width: x2 - x1 + 1, height: y2 - y1b + 1 };
  };
  const emblem = bbox(first, split);
  const lockup = bbox(first, last + 1);
  console.log('emblem:', emblem, '\nlockup:', lockup);

  const base = () => sharp(px, { raw: { width: W, height: H, channels: 4 } });
  const clear = { r: 0, g: 0, b: 0, alpha: 0 };

  // Pad the emblem crop to a square so it centres predictably at any CSS size.
  // This must be materialised to a buffer before any resize: sharp applies
  // extend AFTER resize within one pipeline, which would pad the scaled image
  // and make the result non-square.
  const side = Math.max(emblem.width, emblem.height);
  const lr = Math.round((side - emblem.width) / 2);
  const tb = Math.round((side - emblem.height) / 2);
  const squareBuf = await base().extract(emblem)
    .extend({
      left: lr, right: side - emblem.width - lr,
      top: tb, bottom: side - emblem.height - tb,
      background: clear,
    })
    .png().toBuffer();
  {
    const m = await sharp(squareBuf).metadata();
    if (m.width !== m.height) throw new Error(`square emblem is ${m.width}x${m.height}`);
    console.log(`square emblem: ${m.width}x${m.height}`);
  }
  const squareEmblem = () => sharp(squareBuf);

  // 1 — transparent colour emblem for nav + footer
  await squareEmblem().resize(512, 512).png({ compressionLevel: 9 })
    .toFile(path.join(PUBIMG, 'logo-mark.png'));

  // 2 — transparent full lockup (emblem above wordmark)
  await base().extract(lockup).resize({ width: 1024 }).png({ compressionLevel: 9 })
    .toFile(path.join(PUBIMG, 'logo-lockup.png'));

  // 3 — icons on a white plate: the mark is drawn for white, and a white tile
  //     stays legible in both light and dark browser chrome.
  const plate = async (size, inset) => {
    const mark = await squareEmblem().resize(size - inset * 2, size - inset * 2).png().toBuffer();
    return sharp({ create: { width: size, height: size, channels: 4, background: PLATE } })
      .composite([{ input: mark, top: inset, left: inset }])
      .png({ compressionLevel: 9 });
  };
  await (await plate(512, 26)).toFile(path.join(APP, 'icon.png'));
  await (await plate(180, 10)).toFile(path.join(APP, 'apple-icon.png'));

  // Manifest icons — Google reads these for the search-result icon, Android for
  // the home-screen icon. Both want square 192 and 512.
  await (await plate(192, 10)).toFile(path.join(PUB, 'icon-192.png'));
  await (await plate(512, 26)).toFile(path.join(PUB, 'icon-512.png'));

  // 4 — favicon.ico so /favicon.ico still resolves for crawlers and old clients.
  const sizes = [16, 32, 48, 256];
  const pngs = [];
  for (const s of sizes) pngs.push(await (await plate(s, Math.max(1, Math.round(s * 0.05)))).toBuffer());
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
  for (const [d, f] of [[PUBIMG,'logo-mark.png'], [PUBIMG,'logo-lockup.png'],
                        [APP,'icon.png'], [APP,'apple-icon.png'],
                        [PUB,'icon-192.png'], [PUB,'icon-512.png']]) {
    const m = await sharp(path.join(d, f)).metadata();
    console.log(`  ${f.padEnd(18)} ${m.width}x${m.height}`);
  }
  console.log(`  favicon.ico        ${sizes.join('/')} @ ${fs.statSync(path.join(APP,'favicon.ico')).size}b`);
})();
