// Product catalogue — the single source of truth for both the /products grid
// and the /products/[slug] detail pages.
//
// WORDPRESS: `wpPages` maps a slug to the URL of the page you build in WP admin.
// Fill one in and every link to that product across the site points at WordPress
// instead of the built-in detail page. Leave it '' to keep using the local page,
// so you can move products over one at a time.
export const wpPages = {
  'assam-tea': '',
  'jute': '',
  'fox-nuts': '',
  'jaggery': '',
  'moringa': '',
  'cow-dung': '',
  'essentials': '',
  'psyllium-husk': '',
};

// Cards shown in the grid on /products.
export const productCards = [
  {slug:'assam-tea',grad:'green',img:'/images/assam-tea.png',tag:'Premium Tea',name:'Assam Orthodox Tea',desc:'Hand-plucked black tea from the misty estates of Upper Assam. Available in whole leaf, broken, fannings & dust grades.',cats:['Tea','Organic','Beverages']},
  {slug:'jute',grad:'earth',img:'/images/jute-products.png',tag:'Eco Fibre',name:'Jute Products',desc:'Biodegradable jute bags, sacks, carpet backing, and handicrafts — the golden fibre of Bengal.',cats:['Eco','Textiles','Packaging']},
  {slug:'fox-nuts',grad:'cream',img:'/images/fox-nuts.png',tag:'Superfood Snack',name:'Fox Nuts (Makhana)',desc:'Hand-roasted lotus seeds — protein-rich, gluten-free, vegan. Available plain, flavoured, and as flour.',cats:['Superfood','Snacks','Organic']},
  {slug:'jaggery',grad:'amber',img:'/images/jaggery.png',tag:'Natural Sweetener',name:'Organic Jaggery',desc:'Unrefined sugarcane jaggery — mineral-rich, chemical-free, available in block, powder, and liquid forms.',cats:['Organic','Sweetener','Food']},
  {slug:'moringa',grad:'moss',img:'/images/moringa.png',tag:'Superfood',name:'Moringa Powder',desc:'The miracle leaf, sun-dried and stone-milled. Certified organic. Rich in iron, calcium, and protein.',cats:['Superfood','Organic','Health']},
  {slug:'cow-dung',grad:'earth',img:'/images/cow-dung.png',tag:'Sacred Eco',name:'Cow Dung Eco Solutions',desc:'Vedic incense cakes, organic manure, eco-pots, and dhoop sticks — ancestral materials reimagined for global markets.',cats:['Eco','Organic','Wellness']},
  {slug:'essentials',grad:'spice',img:'/images/food-essentials.png',tag:'Pantry Staples',name:'Food Essentials',desc:'Pulses, spices, grains, cold-pressed oils — the everyday Indian pantry, graded for export quality.',cats:['Food','Spices','Grains']},
  {slug:'psyllium-husk',grad:'gold',img:'/images/psyllium-husk.png',tag:'Soluble Fibre',name:'Psyllium Husk (Isabgol)',desc:'The husk of Plantago ovata — the world\'s most concentrated source of gel-forming soluble fibre, milled to 98–99.5% purity.',cats:['Fibre','Pharma','Nutraceutical']},
];

// Full detail used by /products/[slug].
export const catalog = {
  'assam-tea': {
    name: 'Assam Orthodox Tea',
    tag: 'Premium Tea · Single Origin',
    desc: 'Hand-plucked from elevation estates along the Brahmaputra valley, our Assam tea carries the classic malty, full-bodied character that has made this region legendary. Available in first flush, second flush, and blending grades.',
    img: '/images/assam-tea.png',
    specs: [['Origin','Upper Assam, India'],['Harvest','March–November'],['Processing','Orthodox (whole leaf)'],['Grades','SFTGFOP1, FTGFOP, TGFOP, BOP, BP, BOPF, PF, D'],['Min. Order','1 MT per grade'],['Packaging','20 kg ply bags / chest / custom'],['Shelf Life','24 months sealed'],['Certifications','FSSAI, ISO 22000, APEDA']],
    grades: ['SFTGFOP1 (Super Fine)','FTGFOP (Fine)','TGFOP (Whole Leaf)','BOP (Broken)','BP (Broken Pekoe)','Fannings','Dust'],
    docs: ['Phytosanitary Certificate','Certificate of Origin (APEDA)','Quality Analysis Report','FSSAI Compliance'],
    catalogue: '/catalogues/assam-tea-catalogue.pdf',
  },
  'jute': {
    name: 'Jute Products',
    tag: 'Eco Fibre · Golden Fibre',
    desc: 'Jute is nature\'s own fibre — 100% biodegradable, carbon-negative, and incredibly versatile. Our jute range covers bags, sacks, carpet backing, rugs, and bespoke handicrafts for retail and industrial buyers worldwide.',
    img: '/images/jute-products.png',
    specs: [['Origin','West Bengal & Assam, India'],['Fibre Grade','TD3 to TD6, Mestia'],['Products','Shopping bags, sacks, rugs, carpet backing, handicrafts'],['Min. Order','500 pieces or 1 MT fibre'],['Packaging','Bale / custom retail'],['Shelf Life','36 months stored dry'],['Certifications','FSSAI, Jute Mark, OEKO-TEX'],],
    grades: ['TD3 (Fine)','TD4','TD5','TD6 (Coarse)','Mestia Grade'],
    docs: ['Jute Mark Certificate','Phytosanitary Certificate','Quality Inspection Report'],
    catalogue: '/catalogues/jute-catalogue.pdf',
  },
  'fox-nuts': {
    name: 'Fox Nuts (Makhana)',
    tag: 'Superfood · Vegan · Gluten-Free',
    desc: 'Makhana — the puffed lotus seed — is a nutritional powerhouse. Low in fat, high in protein and magnesium, it is taking global health-food markets by storm. We supply plain, roasted, flavoured, and as flour.',
    img: '/images/fox-nuts.png',
    specs: [['Origin','Bihar, India'],['Varieties','Plain, Roasted, Flavoured, Flour'],['Protein','~9.7g per 100g'],['Fat','~0.1g per 100g'],['Min. Order','500 kg'],['Packaging','5 kg / 10 kg / 25 kg bags; retail pouches'],['Shelf Life','12 months sealed'],['Certifications','FSSAI, Organic India, APEDA'],],
    grades: ['Suta (Extra Large — 6+ mm)','Lawa (Large — 5–6 mm)','Samanya (Medium — 4–5 mm)','Tikhi (Small)'],
    docs: ['FSSAI License','Organic Certificate','Quality Analysis Report','Phytosanitary'],
    catalogue: '/catalogues/makhana-catalogue.pdf',
  },
  'jaggery': {
    name: 'Organic Jaggery',
    tag: 'Natural Sweetener · No Chemicals',
    desc: 'Made by the age-old tradition of boiling sugarcane juice in iron pans without any chemicals, our jaggery retains its natural minerals and carries a deep, caramel-molasses profile that refined sugar cannot replicate.',
    img: '/images/jaggery.png',
    specs: [['Origin','Maharashtra & UP, India'],['Forms','Block, Granule, Powder, Liquid'],['Sucrose','~65–85%'],['Minerals','Iron, Calcium, Potassium, Magnesium'],['Min. Order','1 MT'],['Packaging','5 kg / 25 kg / 50 kg bags'],['Shelf Life','12 months'],['Certifications','FSSAI, Organic India, USDA Organic (select lots)'],],
    grades: ['A Grade (Golden)','B Grade (Dark)','Powdered','Liquid (Kakvi)'],
    docs: ['Organic Certificate','FSSAI License','Sugar Analysis Report','Phytosanitary'],
    catalogue: '/catalogues/jaggery-catalogue.pdf',
  },
  'moringa': {
    name: 'Moringa Powder',
    tag: 'Superfood · Certified Organic',
    desc: 'The drumstick tree — Moringa oleifera — is one of the most nutrient-dense plants on earth. Our moringa leaves are shade-dried at low temperature and stone-milled to preserve maximum nutritional value.',
    img: '/images/moringa.png',
    specs: [['Origin','Andhra Pradesh & Tamil Nadu, India'],['Forms','Leaf powder, Seed oil, Capsules, Extract'],['Protein','~27g per 100g (dry)'],['Iron','~28mg per 100g'],['Min. Order','200 kg'],['Packaging','1 kg / 5 kg / 25 kg craft bags; capsule packs'],['Shelf Life','24 months'],['Certifications','FSSAI, USDA Organic, EU Organic'],],
    grades: ['A Grade (Bright Green)','B Grade','Seed Oil (Cold Pressed)'],
    docs: ['Organic Certificate (USDA & EU)','Heavy Metals Report','Microbiology Report','FSSAI License'],
    catalogue: '/catalogues/moringa-catalogue.pdf',
  },
  'cow-dung': {
    name: 'Cow Dung Eco Solutions',
    tag: 'Sacred Eco · Vedic Products',
    desc: 'Rooted in Vedic tradition and reimagined for modern sustainability, our cow dung product range covers natural incense, organic fertiliser, biodegradable pots, and ritual dhoop sticks — each crafted by artisan cooperatives.',
    img: '/images/cow-dung.png',
    specs: [['Origin','Assam & Gujarat, India'],['Products','Incense cakes, Dhoop sticks, Organic manure, Eco-pots, Sambhrani cups'],['Min. Order','500 units / 200 kg manure'],['Packaging','Retail-ready or bulk'],['Shelf Life','24+ months (incense/manure)'],['Certifications','FSSAI, Organic India'],],
    grades: ['Premium Incense Cakes','Dhoop Sticks (assorted)','Organic Granular Manure','Biodegradable Nursery Pots'],
    docs: ['Organic Certificate','Heavy Metals Report','Phytosanitary (manure)'],
    catalogue: '/catalogues/cow-dung-catalogue.pdf',
  },
  'essentials': {
    name: 'Food Essentials',
    tag: 'Pantry Staples · Export Grade',
    desc: 'From the turmeric fields of Erode to the basmati plains of Punjab, our food essentials range brings the full depth of the Indian pantry to global buyers — spices, pulses, grains, and cold-pressed oils.',
    img: '/images/food-essentials.png',
    specs: [['Products','Turmeric, Cumin, Coriander, Basmati Rice, Toor Dal, Chana Dal, Mustard Oil, Coconut Oil'],['Origin','Pan-India sourcing by region'],['Grades','Export Premium / AGMARK'],['Min. Order','500 kg per SKU'],['Packaging','Retail pouch / bulk bag / IBC'],['Shelf Life','Product dependent (6–24 months)'],['Certifications','FSSAI, AGMARK, Spices Board'],],
    grades: ['Premium Export Grade','AGMARK Grade A','Organic Grade (select items)'],
    docs: ['AGMARK Certificate','Spices Board License','Phytosanitary Certificate','FSSAI License'],
    catalogue: '/catalogues/turmeric-catalogue.pdf',
  },

  'psyllium-husk': {
    name: 'Psyllium Husk (Isabgol)',
    tag: 'Soluble Fibre · Pharma & Nutraceutical Grade',
    desc: 'Isabgol is the husk of the Plantago ovata seed — the most concentrated source of gel-forming soluble fibre in commercial use. Grown across the arid belt of North Gujarat and Rajasthan and milled to 98–99.5% purity, with swell volume tested on every lot.',
    img: '/images/psyllium-husk.png',
    specs: [['Botanical Name','Plantago ovata Forsk.'],['Origin','North Gujarat & Rajasthan, India'],['Harvest','March–April (rabi crop)'],['Purity Grades','95%, 98%, 99%, 99.5%'],['Swell Volume','≥ 40 ml/g (99% purity)'],['Moisture','10% max'],['Min. Order','1 MT husk / 500 kg powder'],['Packaging','20–25 kg kraft bags, LDPE lined'],['Shelf Life','24 months, cool and dry'],['Certifications','FSSAI, ISO 22000, USDA & EU Organic (select lots)']],
    grades: ['99.5% Purity (Pharma)','99% Purity (Export Standard)','98% Purity (Food)','95% Purity (Industrial)','Husk Powder 40–100 Mesh','Whole Seed'],
    docs: ['Certificate of Analysis (purity & swell volume)','Phytosanitary Certificate','Heavy Metals & Pesticide Residue Report','FSSAI License'],
  },
};

export const productSlugs = Object.keys(catalog);

export function getProduct(slug) {
  return catalog[slug];
}

/** Where a product link should go — the WordPress page if set, else the local page. */
export function productHref(slug) {
  return wpPages[slug] || `/products/${slug}`;
}

/** True when this product is served from WordPress, so the link must be a plain <a>. */
export function isWordPressPage(slug) {
  return Boolean(wpPages[slug]);
}
