// Gosarvam Global — Catalogue PDF Generator
// Run: node scripts/gen-catalogues.cjs
'use strict';

const PDFDocument = require('pdfkit');
const fs          = require('fs');
const path        = require('path');

// Require sharp if available for image downsizing; fall back to raw embed
let sharp;
try { sharp = require('sharp'); } catch { sharp = null; }

const OUT  = path.join(__dirname, '../public/catalogues');
const IMGS = 'C:\\Users\\yokes\\Downloads';

// ── Gold palette ───────────────────────────────────────────────────────────────
const GOLD      = '#C9A063';
const GOLD_DEEP = '#7A5020';
const INK       = '#111111';
const INK_SOFT  = '#555555';
const BG_LIGHT  = '#F8F5EF';
const WHITE     = '#FFFFFF';

// ── Catalogue definitions ─────────────────────────────────────────────────────
const CATALOGUES = [
  {
    file:    'assam-tea-catalogue.pdf',
    img:     path.join(IMGS, 'assam tea.png'),
    title:   'Assam Orthodox Tea',
    subtitle:'Premium Tea · Single Origin · APEDA Certified',
    tag:     'PRODUCT CATALOGUE · 2025',
    origin:  'Upper Assam, India',
    about:
      'Hand-plucked from misty elevation estates along the Brahmaputra valley, ' +
      'Gosarvam\'s Assam tea carries the classic malty, full-bodied character that ' +
      'has made this region legendary for over 180 years. Available in first flush, ' +
      'second flush and blending grades with full estate traceability.',
    specs: [
      ['Origin',         'Upper Assam, India'],
      ['Harvest',        'March – November'],
      ['Processing',     'Orthodox (whole leaf)'],
      ['Grades',         'SFTGFOP1, FTGFOP, TGFOP, BOP, BP, BOPF, PF, Dust'],
      ['Min. Order',     '1 MT per grade'],
      ['Packaging',      '20 kg ply bags / chest / custom'],
      ['Shelf Life',     '24 months sealed'],
    ],
    grades: [
      ['SFTGFOP1', 'Super Fine Tippy Golden Flowery — highest grade, exceptional cup'],
      ['FTGFOP',   'Fine Tippy Golden Flowery — premium whole-leaf, golden tips'],
      ['TGFOP',    'Tippy Golden Flowery Orange Pekoe — classic whole-leaf grade'],
      ['BOP',      'Broken Orange Pekoe — strong, full-bodied cup'],
      ['Fannings', 'Used in tea bags, fast infusion'],
      ['Dust',     'Finest grade, used in specialty tea bags'],
    ],
    certs: ['FSSAI License', 'ISO 22000 : 2018', 'APEDA Certified', 'Phytosanitary Certificate', 'Certificate of Origin'],
    accent: '#3B5730',
  },
  {
    file:    'turmeric-catalogue.pdf',
    img:     path.join(IMGS, 'ter.png'),
    title:   'Turmeric (Haldi)',
    subtitle:'Premium Spice · Export Grade · AGMARK Certified',
    tag:     'PRODUCT CATALOGUE · 2025',
    origin:  'Erode & Salem, Tamil Nadu, India',
    about:
      'Erode, the "Turmeric City", produces some of the world\'s finest Curcuma longa. ' +
      'Gosarvam sources directly from farm cooperatives in the Erode and Salem belts, ' +
      'ensuring premium colour value (curcumin content), clean processing, and ' +
      'zero-adulteration export-grade quality in every consignment.',
    specs: [
      ['Origin',        'Erode & Salem, Tamil Nadu, India'],
      ['Variety',       'Erode Local, Alleppey Finger, Rajapuri'],
      ['Curcumin',      '2.5% – 5.0% (grade dependent)'],
      ['Moisture',      'Max 10% (export grade)'],
      ['Forms',         'Whole finger, Sliced, Powder, Extract'],
      ['Min. Order',    '500 kg per SKU'],
      ['Packaging',     '25 kg / 50 kg PP bags, retail pouches'],
      ['Shelf Life',    '24 months (sealed, cool & dry)'],
    ],
    grades: [
      ['Erode Finger',     'Premium variety, deep orange, high curcumin 3–5%'],
      ['Alleppey Finger',  'Bright yellow, mild aroma, curcumin 2.5–4%'],
      ['Rajapuri',         'Bold flavour, popular in culinary exports'],
      ['Turmeric Powder',  'Machine-ground, 100 mesh, export-packed'],
      ['Curcumin Extract', '95% concentrate, pharmaceutical/nutraceutical grade'],
    ],
    certs: ['FSSAI License', 'AGMARK Grade A', 'Spices Board License', 'APEDA Certified', 'Phytosanitary Certificate', 'Organic Certificate (select lots)'],
    accent: '#C07830',
  },
];

// ── PDF helpers ───────────────────────────────────────────────────────────────
function hexToRGB(hex) {
  const n = hex.replace('#', '');
  return [parseInt(n.slice(0,2),16), parseInt(n.slice(2,4),16), parseInt(n.slice(4,6),16)];
}

async function resizeForPDF(imgPath) {
  // Downscale to 1400px wide JPEG at 82% quality — good enough for A4 print, ~10× smaller
  if (!sharp) return imgPath;
  const buf = await sharp(imgPath).resize(1400).jpeg({ quality: 82 }).toBuffer();
  return buf;
}

async function makePDF(cfg) {
  const imgData = await resizeForPDF(cfg.img);
  const doc = new PDFDocument({ size: 'A4', margin: 0, info: { Title: cfg.title + ' — Gosarvam Global', Author: 'Gosarvam Global LLP' } });
  const W = doc.page.width;   // 595
  const H = doc.page.height;  // 842

  // ── PAGE 1: Cover ──────────────────────────────────────────────────────────
  // Full-bleed image (crop to A4 proportions)
  doc.image(imgData, 0, 0, { width: W, height: H, cover: [W, H] });

  // Dark gradient overlay so text is readable
  doc.rect(0, 0, W, H)
     .fill([0,0,0], 'even-odd')
     .opacity(0.55);

  // Thin gold top bar
  doc.opacity(1).rect(0, 0, W, 4).fill(GOLD);

  // Tag line (top-left)
  doc.font('Helvetica').fontSize(7).fillColor(GOLD)
     .text(cfg.tag, 36, 24, { characterSpacing: 2 });

  // Brand logo block (bottom area)
  const logoY = H - 220;
  doc.fontSize(8).fillColor('rgba(255,255,255,0.45)').font('Helvetica')
     .text('GOSARVAM GLOBAL', 36, logoY, { characterSpacing: 3 });

  // Product title
  doc.font('Helvetica-Bold').fontSize(38).fillColor(WHITE)
     .text(cfg.title, 36, logoY + 18, { width: W - 72 });

  // Subtitle
  const titleH = doc.heightOfString(cfg.title, { width: W - 72, fontSize: 38 });
  doc.font('Helvetica').fontSize(12).fillColor(GOLD)
     .text(cfg.subtitle, 36, logoY + 22 + titleH, { width: W - 72 });

  // Gold divider line
  doc.moveTo(36, H - 80).lineTo(W - 36, H - 80).stroke(GOLD).lineWidth(0.5).opacity(0.5);

  // Origin bottom-right
  doc.opacity(1).font('Helvetica').fontSize(8).fillColor('rgba(255,255,255,0.5)')
     .text('ORIGIN', W - 180, H - 70, { align: 'right', width: 144, characterSpacing: 1 });
  doc.font('Helvetica-Bold').fontSize(10).fillColor(WHITE)
     .text(cfg.origin, W - 180, H - 57, { align: 'right', width: 144 });

  // Page number (bottom-left)
  doc.font('Helvetica').fontSize(7).fillColor('rgba(255,255,255,0.3)')
     .text('01', 36, H - 30);

  // ── PAGE 2: Specifications ─────────────────────────────────────────────────
  doc.addPage();
  const [ar, ag, ab] = hexToRGB(cfg.accent);

  // Left colour strip
  doc.rect(0, 0, 4, H).fill(cfg.accent);

  // Background
  doc.rect(4, 0, W - 4, H).fill(BG_LIGHT);

  // Header band
  doc.rect(4, 0, W - 4, 90).fill(INK);

  // Brand in header
  doc.font('Helvetica').fontSize(7).fillColor(GOLD)
     .text('GOSARVAM GLOBAL', 36, 24, { characterSpacing: 3 });
  doc.font('Helvetica-Bold').fontSize(18).fillColor(WHITE)
     .text(cfg.title, 36, 36);
  doc.font('Helvetica').fontSize(9).fillColor('rgba(255,255,255,0.5)')
     .text('PRODUCT SPECIFICATIONS', W - 200, 24, { characterSpacing: 2, width: 160, align: 'right' });
  doc.font('Helvetica').fontSize(9).fillColor(GOLD)
     .text(cfg.subtitle, 36, 60, { width: W - 72 });

  let y = 112;

  // About
  doc.font('Helvetica-Bold').fontSize(8).fillColor(cfg.accent)
     .text('ABOUT', 36, y, { characterSpacing: 2 });
  y += 14;
  doc.font('Helvetica').fontSize(9.5).fillColor(INK_SOFT)
     .text(cfg.about, 36, y, { width: W - 72, lineGap: 3 });
  y += doc.heightOfString(cfg.about, { width: W - 72, lineGap: 3 }) + 18;

  // Divider
  doc.moveTo(36, y).lineTo(W - 36, y).stroke('#E0D8CC').lineWidth(0.5);
  y += 18;

  // Specs table (two-column layout)
  doc.font('Helvetica-Bold').fontSize(8).fillColor(cfg.accent)
     .text('SPECIFICATIONS', 36, y, { characterSpacing: 2 });
  y += 16;

  const colW = (W - 72 - 20) / 2;
  cfg.specs.forEach(([k, v], i) => {
    const col = i % 2;
    const xOff = col === 0 ? 36 : 36 + colW + 20;
    const rowY = y + Math.floor(i / 2) * 38;

    // Row background
    doc.rect(xOff, rowY, colW, 34).fill('#F0EBE1').stroke('#E5DDD0').lineWidth(0.3);

    doc.font('Helvetica').fontSize(7).fillColor(INK_SOFT)
       .text(k.toUpperCase(), xOff + 10, rowY + 7, { characterSpacing: 0.5 });
    doc.font('Helvetica-Bold').fontSize(9).fillColor(INK)
       .text(v, xOff + 10, rowY + 18, { width: colW - 20 });
  });

  y += Math.ceil(cfg.specs.length / 2) * 38 + 18;
  doc.moveTo(36, y).lineTo(W - 36, y).stroke('#E0D8CC').lineWidth(0.5);
  y += 18;

  // Grades
  doc.font('Helvetica-Bold').fontSize(8).fillColor(cfg.accent)
     .text('AVAILABLE GRADES', 36, y, { characterSpacing: 2 });
  y += 16;

  cfg.grades.forEach(([grade, desc]) => {
    if (y > H - 180) return; // guard — move to next page if needed
    // Gold dot
    doc.circle(40, y + 4.5, 3).fill(GOLD);
    doc.font('Helvetica-Bold').fontSize(9).fillColor(INK)
       .text(grade, 50, y, { continued: true })
       .font('Helvetica').fillColor(INK_SOFT)
       .text('  —  ' + desc, { width: W - 86 });
    y += doc.heightOfString('x', {}) + 8;
  });

  y += 10;
  doc.moveTo(36, y).lineTo(W - 36, y).stroke('#E0D8CC').lineWidth(0.5);
  y += 18;

  // Certifications
  doc.font('Helvetica-Bold').fontSize(8).fillColor(cfg.accent)
     .text('CERTIFICATIONS & DOCUMENTS', 36, y, { characterSpacing: 2 });
  y += 14;

  const certCols = 3;
  const certW    = (W - 72 - (certCols - 1) * 10) / certCols;
  cfg.certs.forEach((cert, i) => {
    const col = i % certCols;
    const row = Math.floor(i / certCols);
    const cx  = 36 + col * (certW + 10);
    const cy  = y + row * 34;
    doc.rect(cx, cy, certW, 28).fill(WHITE).stroke('#E0D8CC').lineWidth(0.3);
    // Check icon
    doc.moveTo(cx + 9, cy + 14).lineTo(cx + 12, cy + 18).lineTo(cx + 19, cy + 10)
       .stroke(cfg.accent).lineWidth(1.5);
    doc.font('Helvetica').fontSize(7.5).fillColor(INK)
       .text(cert, cx + 24, cy + 9, { width: certW - 30 });
  });

  y += Math.ceil(cfg.certs.length / certCols) * 34 + 16;

  // Footer
  doc.rect(0, H - 48, W, 48).fill(INK);
  doc.rect(0, H - 48, 4, 48).fill(cfg.accent);

  doc.font('Helvetica-Bold').fontSize(9).fillColor(WHITE)
     .text('Gosarvam Global LLP', 36, H - 35);
  doc.font('Helvetica').fontSize(8).fillColor('rgba(255,255,255,0.45)')
     .text('trade@gosarvamglobal.com  ·  gosarvamglobal.com  ·  Assam, India', 36, H - 21);
  doc.font('Helvetica').fontSize(7).fillColor('rgba(255,255,255,0.25)')
     .text('02', W - 44, H - 21);

  // ── PAGE 3: Contact & Request ──────────────────────────────────────────────
  doc.addPage();
  doc.rect(0, 0, W, H).fill(INK);
  doc.rect(0, 0, W, 4).fill(GOLD);
  doc.rect(0, 0, 4, H).fill(cfg.accent);

  // Large subtle brand watermark
  doc.font('Helvetica-Bold').fontSize(80).fillColor('rgba(255,255,255,0.04)')
     .text('GG', 60, H / 2 - 60);

  doc.font('Helvetica').fontSize(8).fillColor(GOLD)
     .text('GOSARVAM GLOBAL', 36, 36, { characterSpacing: 3 });

  doc.font('Helvetica-Bold').fontSize(28).fillColor(WHITE)
     .text('Ready to Order?', 36, 72, { width: W - 72 });
  doc.font('Helvetica').fontSize(13).fillColor('rgba(255,255,255,0.55)')
     .text('Tell us your volume, destination port, and packaging needs.\nWe respond within 24 business hours with a full proposal.', 36, 118, { width: W - 72, lineGap: 4 });

  // CTA box
  const ctaY = 200;
  doc.rect(36, ctaY, W - 72, 120).fill('#1A1A1A').stroke(cfg.accent).lineWidth(0.8);

  doc.font('Helvetica-Bold').fontSize(9).fillColor(GOLD)
     .text('HOW TO PLACE AN ORDER', 54, ctaY + 20, { characterSpacing: 1.5 });

  const steps = [
    'Submit an RFQ at gosarvamglobal.com/rfq',
    'Receive a proposal with pricing, MOQ & lead times',
    'Confirm — we begin sourcing & documentation',
  ];
  steps.forEach((step, i) => {
    doc.circle(54, ctaY + 50 + i * 26 + 4.5, 9).fill(cfg.accent);
    doc.font('Helvetica-Bold').fontSize(9).fillColor(WHITE)
       .text(String(i + 1), 50.5, ctaY + 46 + i * 26, { width: 8, align: 'center' });
    doc.font('Helvetica').fontSize(10).fillColor('rgba(255,255,255,0.7)')
       .text(step, 72, ctaY + 44 + i * 26, { width: W - 120 });
  });

  // Contact details grid
  const infoY = ctaY + 148;
  doc.font('Helvetica-Bold').fontSize(8).fillColor('rgba(255,255,255,0.35)')
     .text('CONTACT', 36, infoY, { characterSpacing: 2 });

  const contacts = [
    ['Email',   'trade@gosarvamglobal.com'],
    ['Website', 'gosarvamglobal.com'],
    ['Phone',   '+91 99999 99999'],
    ['Address', 'Gosarvam Global LLP, Assam, India'],
  ];
  contacts.forEach(([label, val], i) => {
    const cx = i < 2 ? 36 : (W / 2) + 18;
    const cy = infoY + 18 + (i % 2) * 36;
    doc.font('Helvetica').fontSize(7).fillColor('rgba(255,255,255,0.4)')
       .text(label.toUpperCase(), cx, cy, { characterSpacing: 1 });
    doc.font('Helvetica-Bold').fontSize(10).fillColor(WHITE)
       .text(val, cx, cy + 11, { width: W / 2 - 54 });
  });

  // Gold CTA button-style box
  const btnY = H - 160;
  doc.rect(36, btnY, W - 72, 52).fill(GOLD);
  doc.font('Helvetica-Bold').fontSize(12).fillColor(INK)
     .text('REQUEST A QUOTATION →  gosarvamglobal.com/rfq', 36, btnY + 16, { align: 'center', width: W - 72, characterSpacing: 0.5 });

  // Footer
  doc.rect(0, H - 70, W, 70).fill('#090909');
  doc.moveTo(36, H - 70).lineTo(W - 36, H - 70).stroke(cfg.accent).lineWidth(0.5).opacity(0.4);
  doc.opacity(1).font('Helvetica').fontSize(7).fillColor('rgba(255,255,255,0.2)')
     .text('This catalogue is for trade reference only. Prices and availability subject to change. © 2025 Gosarvam Global LLP', 36, H - 52, { width: W - 72, align: 'center' });
  doc.font('Helvetica').fontSize(7).fillColor('rgba(255,255,255,0.15)')
     .text('03', W - 44, H - 25);

  return doc;
}

// ── Generate ──────────────────────────────────────────────────────────────────
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  for (const cfg of CATALOGUES) {
    const outPath = path.join(OUT, cfg.file);
    const doc = await makePDF(cfg);
    await new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(outPath);
      doc.pipe(stream);
      doc.end();
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`✓ ${cfg.file}  (${kb} KB)`);
  }
})();
