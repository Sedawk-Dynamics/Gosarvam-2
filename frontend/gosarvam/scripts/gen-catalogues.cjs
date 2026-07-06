// Gosarvam Global — Catalogue PDF Generator
// Run: node scripts/gen-catalogues.cjs
'use strict';

const PDFDocument = require('pdfkit');
const fs          = require('fs');
const path        = require('path');

// Require sharp if available for image downsizing; fall back to raw embed
let sharp;
try { sharp = require('sharp'); } catch { sharp = null; }

const OUT    = path.join(__dirname, '../public/catalogues');
const IMGS   = 'C:\\Users\\yokes\\Downloads';
const PUBIMG = path.join(__dirname, '../public/images');

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
  {
    file:    'makhana-catalogue.pdf',
    img:     path.join(PUBIMG, 'fox-nuts.png'),
    title:   'Fox Nuts (Makhana)',
    subtitle:'Superfood Snack · Vegan · Gluten-Free',
    tag:     'PRODUCT CATALOGUE · 2025',
    origin:  'Bihar, India',
    about:
      'Makhana — the puffed lotus seed — is a nutritional powerhouse. Low in fat, high in ' +
      'protein and magnesium, it is taking global health-food markets by storm. Hand-sorted ' +
      'and polished for a bright, uniform appearance, we supply plain, roasted, flavoured, ' +
      'and flour forms.',
    specs: [
      ['Origin',         'Bihar, India'],
      ['Varieties',      'Plain, Roasted, Flavoured, Flour'],
      ['Protein',        '~9.7 g per 100g'],
      ['Moisture',       'Max 12%'],
      ['Min. Order',     '500 kg'],
      ['Packaging',      '5 kg / 10 kg / 25 kg bags; retail pouches'],
      ['Shelf Life',     '12 months sealed'],
    ],
    grades: [
      ['Suta (Extra Large)', '6+ mm — premium size, exceptional puff'],
      ['Lawa (Large)',       '5–6 mm — popular retail size'],
      ['Samanya (Medium)',   '4–5 mm — everyday grade'],
      ['Tikhi (Small)',      'Broken/small grade — used in flour & snacks'],
    ],
    certs: ['FSSAI License', 'Organic India Certified', 'APEDA Certified', 'Quality Analysis Report', 'Phytosanitary Certificate'],
    accent: '#9C7A3C',
  },
  {
    file:    'jute-catalogue.pdf',
    img:     path.join(PUBIMG, 'jute-products.png'),
    title:   'Jute Products',
    subtitle:'Eco Fibre · Biodegradable · OEKO-TEX Certified',
    tag:     'PRODUCT CATALOGUE · 2025',
    origin:  'West Bengal & Assam, India',
    about:
      'Jute is nature\'s own fibre — 100% biodegradable, carbon-negative, and incredibly ' +
      'versatile. Our jute range covers bags, sacks, carpet backing, rugs, and bespoke ' +
      'handicrafts for retail and industrial buyers worldwide.',
    specs: [
      ['Origin',         'West Bengal & Assam, India'],
      ['Fibre Grade',    'TD3 to TD6, Mestia'],
      ['Products',       'Shopping bags, sacks, rugs, carpet backing, handicrafts'],
      ['Min. Order',     '500 pieces or 1 MT fibre'],
      ['Packaging',      'Bale / custom retail'],
      ['Shelf Life',     '36 months stored dry'],
    ],
    grades: [
      ['TD3',     'Fine grade fibre, premium finish'],
      ['TD4',     'Standard fine grade'],
      ['TD5',     'Medium coarse grade'],
      ['TD6',     'Coarse grade, industrial use'],
      ['Mestia',  'Bulk grade for sacking & carpet backing'],
    ],
    certs: ['FSSAI License', 'Jute Mark Certificate', 'OEKO-TEX Certified', 'Phytosanitary Certificate', 'Quality Inspection Report'],
    accent: '#7A5C3E',
  },
  {
    file:    'jaggery-catalogue.pdf',
    img:     path.join(PUBIMG, 'jaggery.png'),
    title:   'Organic Jaggery',
    subtitle:'Natural Sweetener · No Chemicals · Mineral Rich',
    tag:     'PRODUCT CATALOGUE · 2025',
    origin:  'Maharashtra & Uttar Pradesh, India',
    about:
      'Made by the age-old tradition of boiling sugarcane juice in iron pans without any ' +
      'chemicals, our jaggery retains its natural minerals and carries a deep, ' +
      'caramel-molasses profile that refined sugar cannot replicate.',
    specs: [
      ['Origin',         'Maharashtra & UP, India'],
      ['Forms',          'Block, Granule, Powder, Liquid'],
      ['Sucrose',        '65% – 85%'],
      ['Minerals',       'Iron, Calcium, Potassium, Magnesium'],
      ['Min. Order',     '1 MT'],
      ['Packaging',      '5 kg / 25 kg / 50 kg bags'],
      ['Shelf Life',     '12 months'],
    ],
    grades: [
      ['A Grade',        'Golden colour, premium quality, low impurities'],
      ['B Grade',        'Dark colour, robust flavour'],
      ['Powdered',       'Free-flowing granulated jaggery'],
      ['Liquid (Kakvi)', 'Syrup form, used in confectionery'],
    ],
    certs: ['FSSAI License', 'Organic India Certified', 'USDA Organic (select lots)', 'Sugar Analysis Report', 'Phytosanitary Certificate'],
    accent: '#A8721E',
  },
  {
    file:    'moringa-catalogue.pdf',
    img:     path.join(PUBIMG, 'moringa.png'),
    title:   'Moringa Powder',
    subtitle:'Superfood · Certified Organic · Nutrient Dense',
    tag:     'PRODUCT CATALOGUE · 2025',
    origin:  'Andhra Pradesh & Tamil Nadu, India',
    about:
      'The drumstick tree — Moringa oleifera — is one of the most nutrient-dense plants on ' +
      'earth. Our moringa leaves are shade-dried at low temperature and stone-milled to ' +
      'preserve maximum nutritional value.',
    specs: [
      ['Origin',         'Andhra Pradesh & Tamil Nadu, India'],
      ['Forms',          'Leaf powder, Seed oil, Capsules, Extract'],
      ['Protein',        '~27 g per 100g (dry)'],
      ['Iron',           '~28 mg per 100g'],
      ['Min. Order',     '200 kg'],
      ['Packaging',      '1 kg / 5 kg / 25 kg craft bags; capsule packs'],
      ['Shelf Life',     '24 months'],
    ],
    grades: [
      ['A Grade',   'Bright green colour, premium leaf powder'],
      ['B Grade',   'Standard grade leaf powder'],
      ['Seed Oil',  'Cold pressed, pharmaceutical/cosmetic grade'],
    ],
    certs: ['FSSAI License', 'USDA Organic', 'EU Organic Certified', 'Heavy Metals Report', 'Microbiology Report'],
    accent: '#4A6741',
  },
  {
    file:    'cow-dung-catalogue.pdf',
    img:     path.join(PUBIMG, 'cow-dung.png'),
    title:   'Cow Dung Eco Solutions',
    subtitle:'Sacred Eco · Vedic Products · Sustainable Sourcing',
    tag:     'PRODUCT CATALOGUE · 2025',
    origin:  'Assam & Gujarat, India',
    about:
      'Rooted in Vedic tradition and reimagined for modern sustainability, our cow dung ' +
      'product range covers natural incense, organic fertiliser, biodegradable pots, and ' +
      'ritual dhoop sticks — each crafted by artisan cooperatives.',
    specs: [
      ['Origin',         'Assam & Gujarat, India'],
      ['Products',       'Incense cakes, Dhoop sticks, Organic manure, Eco-pots, Sambhrani cups'],
      ['Min. Order',     '500 units / 200 kg manure'],
      ['Packaging',      'Retail-ready or bulk'],
      ['Shelf Life',     '24+ months (incense/manure)'],
    ],
    grades: [
      ['Premium Incense Cakes',        'Hand-rolled, slow burning, natural fragrance'],
      ['Dhoop Sticks',                 'Assorted fragrances, traditional recipes'],
      ['Organic Granular Manure',      'Nutrient-rich soil conditioner'],
      ['Biodegradable Nursery Pots',   'Eco-friendly planting pots'],
    ],
    certs: ['FSSAI License', 'Organic India Certified', 'Heavy Metals Report', 'Phytosanitary Certificate (manure)'],
    accent: '#6B4423',
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
