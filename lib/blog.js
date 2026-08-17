// Journal content — the single source of truth for both the /blog index and the
// /blog/[slug] article pages. Add a post here and it appears in both places.
//
// Fields
//   slug      URL segment
//   cardTitle short title for the grid card
//   title     full headline on the article page
//   cat       category label
//   time      read time, rendered as "{time} read"
//   date      byline date
//   img       grid card image
//   hero      article page hero image (falls back to img)
//   desc      card blurb
//   body      article text. Blank line separates blocks. "## " starts a heading,
//             "- **" starts a bullet list, **bold** works inline.
//
// Order here is the order shown on /blog — newest first.

export const posts = [
  {
    slug: 'isabgol-market-outlook',
    cardTitle: 'Isabgol: Market Outlook',
    title: 'Isabgol market outlook: why psyllium demand keeps outrunning supply',
    cat: 'Global Trade', time: '3 min', date: 'August 2026',
    img: '/images/psyllium-husk.png',
    desc: 'India supplies most of the world\'s psyllium from a single short season — which is why the fibre market watches the rabi crop so closely.',
    body: `Psyllium sits in an unusual position among Indian agri-exports: India supplies the overwhelming majority of world demand, and it does so from one narrow harvest window in one arid belt. Plantago ovata is sown in November and December across North Gujarat and Rajasthan and cut in March and April. There is no second crop and no meaningful alternative origin at scale, so a single season's weather sets the tone for the year — and untimely rain near maturity does not merely cut yield, it stains husk and lowers swell volume, damaging quality and volume together.

Demand, meanwhile, has been broadening rather than merely growing. Bulk-laxative use remains the anchor, but the faster movement is in nutraceutical fibre supplements, in gluten-free bakery where psyllium has become the binder of choice, and in functional foods formulated around blood sugar and cholesterol. Each of these channels wants tighter specifications than commodity trade historically supplied: lot-level swell volume, documented pesticide residue against destination limits, and increasingly organic certification. That pulls buyers toward mills that can actually evidence a grade rather than assert one.

The practical consequence for buyers is that psyllium rewards planning far more than opportunism. Contract ahead of the March–April harvest rather than buying spot, specify purity and swell volume together, and treat organic volumes as something to commit to early in the season because allocation is genuinely limited. Buyers who arrive after harvest asking for certified organic 99.5% at short notice generally discover the year's allocation went to someone who asked in October.

This is an evergreen market view rather than a dated news bulletin — verify current crop and price conditions before relying on it commercially.`,
  },
  {
    slug: 'isabgol-health-benefits',
    cardTitle: 'The Fibre That Earned a Health Claim',
    title: 'Health benefits of Isabgol: the fibre that earned a regulated health claim',
    cat: 'Health & Wellness', time: '2 min', date: 'August 2026',
    img: '/images/psyllium-husk.png',
    desc: 'Psyllium husk does something most fibres cannot — it forms a gel. That single property explains nearly every benefit attached to it.',
    body: `Most dietary fibres either dissolve or pass through largely unchanged. Psyllium husk does neither: on contact with water it swells into a clear, cohesive gel, and almost every benefit attributed to isabgol follows from that one physical property rather than from any exotic nutrient.

The gel is what makes psyllium the most-studied bulk-forming laxative available. It adds volume and holds water in the stool, easing constipation — and because it forms a gel instead of fermenting rapidly, it also firms loose stools rather than worsening them. Very few fibres help at both ends of that spectrum, which is why psyllium remains a first-line recommendation. The same viscosity slows gastric emptying and glucose absorption, blunting the post-meal blood sugar rise, and it binds bile acids in the gut so the liver draws on circulating cholesterol to replace them. That LDL effect is well enough established that the US FDA authorises a specific health claim connecting soluble fibre from psyllium seed husk to reduced risk of coronary heart disease — a rare thing for any food ingredient. Because it absorbs many times its weight in water and expands in the stomach, it also prolongs fullness on almost no calories.

Two practical points matter more than any of the above. Psyllium works mechanically rather than pharmacologically, so it is not habit-forming and suits long-term daily use. And it must be taken with enough water — the gel that makes it effective is the same gel that causes problems when it forms without sufficient liquid. Naturally gluten-free, it has become the default binder in gluten-free baking almost by accident.`,
  },
  {
    slug: 'makhana-global-superfood-boom',
    cardTitle: 'The Global Superfood Boom',
    title: 'The global superfood boom: flavoured makhana enters Western markets',
    cat: 'Global Trade', time: '3 min', date: 'August 2026',
    img: '/images/blog/makhana.png',
    desc: 'Indian foxnut exports surge as health-conscious buyers in North America, Europe and the Middle East replace popcorn with roasted makhana.',
    body: `Indian foxnut exports are climbing, and the clearest evidence sits on supermarket shelves in Toronto, Berlin and Dubai — a bag of roasted makhana where a bag of popcorn used to be. Health-conscious buyers across North America, Europe and the Middle East are moving away from fried and extruded snacks toward something puffed, light and recognisably whole-food. Makhana fits that brief almost exactly: vegan by default, naturally gluten-free, low in calories, and mild enough to carry any seasoning a market asks for.

The growth is concentrated in value-added product rather than raw seed. Flavoured lines — Peri-Peri, Himalayan salt, cheese, and increasingly profiles built for one specific market — are what retail chains are listing. A plain pouch competes on price; a well-seasoned one competes on category, earning space beside premium snacking instead of in the world-foods aisle. That shift changes what an exporter has to bring to the table: food-grade seasoning capability, nitrogen-flushed packaging, retail-ready artwork, and consistency across a twelve-month repeat cycle.

The practical lesson is that quality has to be visible, not asserted. Export-grade sizing, hygienic processing under FSSAI-compliant conditions and documented moisture control are what turn a quoted price into a signed order. Buyers auditing a new supplier are not only asking what a tonne costs — they want to know whether shipment nine will match shipment one. Suppliers who answer with records, lab reports and a sample library tend to win the listing; those who answer with reassurance tend to stay at sample stage. Custom flavour development, offered early, is often the strongest differentiator on the table.`,
  },
  {
    slug: 'mithila-makhana-gi-tag',
    cardTitle: 'Mithila Makhana & the GI Upgrade',
    title: 'Processing and GI tagging: how Mithila makhana is upgrading its supply chain',
    cat: 'Sourcing & Quality', time: '4 min', date: 'July 2026',
    img: '/images/fox-nuts.png',
    desc: 'Government initiatives and modernisation projects are empowering local growers and processors across North Bihar.',
    body: `The GI tag granted to Mithila Makhana did more than protect a name. It gave North Bihar's growers and processors a reason — and a route to funding — to modernise a supply chain that had run on hand-popping and household-scale drying for generations. Specialised processing units, machine-popping lines and direct-from-farm collection are now spreading through Darbhanga and Madhubani, and the effect on export quality is measurable.

Two gains matter most to overseas buyers. The first is moisture control: mechanised roasting and controlled drying hold the seed at a stable moisture level, which is what prevents the soft, stale texture that ruins a shipment three weeks into transit. The second is uniform sizing. Machine grading sorts by diameter far more consistently than hand sorting, so a buyer ordering Suta grade receives Suta grade across every bag in the container rather than an average of it. Direct farm lines also compress the gap between harvest and processing, cutting the quality loss that used to occur during aggregation.

For corporate buyers, GI origin certification and mechanised sorting are worth asking about by name. Together they answer the question that stalls most bulk negotiations — can you hold this specification at volume, repeatedly? A supplier able to show GI provenance, grading records and moisture logs per lot is offering something a spot-market trader cannot. Ask for the GI registration reference, a recent grading report and the moisture specification in writing before the first order — three documents that cost a legitimate supplier nothing to produce, and which tell you most of what you need to know. That is the shift underway in Mithila: from a regional speciality sold on trust to an export commodity sold on documentation.`,
  },
  {
    slug: 'makhana-nutrition-science',
    cardTitle: 'The Nutrition Case for Makhana',
    title: 'Nutrition science: why fitness buyers are switching to gorgon nut',
    cat: 'Health & Wellness', time: '2 min', date: 'July 2026',
    img: '/images/blog/makhana.png',
    desc: 'High protein, low glycaemic index and a rich antioxidant profile make foxnuts a dominant player in smart snacking.',
    body: `Makhana's rise in the fitness market is not a branding accident — it is a macro profile that reads well on a label. At roughly 9.7g of protein and 0.1g of fat per 100g, gorgon nut offers a protein-to-calorie ratio that fried potato and corn snacks cannot approach. It carries no trans fats, sits low on the glycaemic index, and brings useful magnesium and potassium alongside the antioxidants that have earned it attention in anti-ageing coverage.

That combination is why nutritionists and fitness channels now recommend it as a default swap rather than an exotic alternative. A snack that is filling, low-GI and genuinely low-fat addresses the specific problem of evening grazing, and it does so without the processing story consumers increasingly read on the back of a pack. Puffed rather than fried, single-ingredient in its plain form, and recognisable as a seed — the product survives label scrutiny. The format helps as well: makhana is light enough to keep freight economical per retail unit, stable enough to hold its texture through long transit when moisture is controlled, and naturally suited to the small portion packs that dominate impulse purchase.

For exporters, the commercial implication is straightforward: publish the numbers. Nutritional infographics printed alongside product packaging, and a current certificate of analysis available on request, do more to build trust than adjectives. Buyers in the health-food channel are used to substantiating claims to their own regulators, and a supplier who arrives with protein, fat, moisture and heavy-metal figures already documented shortens their approval cycle. Making the nutrition legible is, in practice, a sales function rather than a packaging afterthought.`,
  },
  {
    slug: 'shipping-and-logistics',
    cardTitle: 'Shipping & Logistics Essentials',
    title: 'Shipping and logistics: getting Indian agri-cargo to your port intact',
    cat: 'Logistics', time: '3 min', date: 'June 2026',
    img: '/images/blog/fcl-lcl.png',
    desc: 'Container choice, stuffing plan and paperwork decide whether a correctly graded consignment arrives that way.',
    body: `Most quality problems in agri-exports are not sourcing problems — they are transit problems. A consignment that leaves Kolkata or Nhava Sheva correctly graded can still arrive with caked jaggery, damp makhana or flattened jute if the container, the stuffing plan and the paperwork were not built around the commodity. Getting logistics right is therefore part of the product specification, not an afterthought bolted on once price is agreed.

Four decisions carry most of the risk. Container choice comes first: dry containers suit fibre and most pantry staples, while moisture-sensitive lots benefit from ventilated equipment and desiccant liners. Stuffing comes second — pallet configuration, dunnage and load height determine whether a bag at the bottom of the stack survives a six-week rotation. Documentation comes third, and it is the one that strands cargo at destination: phytosanitary certificates, certificates of origin, fumigation records, and a bill of lading whose description matches the invoice exactly. Marine insurance is the fourth and the cheapest — cover invoice value plus freight, and check whether the policy extends to inherent-vice claims, which is precisely where agri cargo tends to fall outside a standard certificate.

Lead time deserves the same scrutiny as freight cost. Port congestion, festival-season trucking shortages in India, and deconsolidation queues at destination routinely add more days than a cheaper freight rate saves. We plan shipments backwards from the date cargo is needed on your floor, confirm segregation for food-grade lots in writing, and share tracking and documentation as each milestone clears — so the first time you see a problem is never when the container is opened.`,
  },
  {
    slug: 'jaggery-story',
    cardTitle: 'The Jaggery Renaissance',
    title: 'The jaggery renaissance: why unrefined sweeteners are back',
    cat: 'Origin', time: '3 min', date: 'May 2026',
    img: '/images/blog/jaggery.png',
    desc: 'The global wellness shift is driving a boom in traditional sweeteners. Here is why Indian jaggery is at the front of that wave.',
    body: `Jaggery never left India, but it is returning to the world's shelves for reasons that have little to do with nostalgia. As buyers move away from refined white sugar, they are looking for sweeteners that arrive with their minerals and character intact. Jaggery — sugarcane juice boiled down in open iron pans without sulphur, chemicals or bleaching — delivers exactly that: a deep caramel-molasses profile, and the iron, calcium, potassium and magnesium that refining strips out.

The category's advantage is also its complication. Because jaggery is made rather than manufactured, colour, hardness and moisture vary between producers, seasons and even batches. Golden A-grade block, darker B-grade, powdered and liquid kakvi all behave differently in a bakery, a beverage line and a retail pack. Buyers who specify only "jaggery" tend to be surprised; buyers who specify form, sucrose range, colour band and moisture get consistency. Powder is the fastest-growing line precisely because it dissolves predictably and ships without the breakage blocks suffer.

What makes jaggery exportable at scale is discipline on the unglamorous details. Chemical-free processing has to be verifiable rather than claimed. Moisture has to be held low enough that a 25kg bag does not cake in humid transit. Packaging has to protect a product that is hygroscopic by nature. Where organic certification is in place — USDA and EU on select lots — it opens retail channels unaudited jaggery cannot reach. Specify tightly, ask for the analysis, and jaggery becomes one of the most straightforward premium categories India exports.`,
  },
  {
    slug: 'moringa-science',
    cardTitle: 'Moringa Science',
    title: 'Moringa science: which claims actually hold up',
    cat: 'Nutrition', time: '3 min', date: 'May 2026',
    img: '/images/blog/moringa-science.png',
    desc: 'A clear-eyed look at the nutritional evidence behind the miracle leaf, and which claims stand up to scrutiny.',
    body: `Moringa oleifera earned the "miracle tree" label honestly enough — the leaf is genuinely nutrient-dense — but the marketing around it has outrun the evidence in places, and serious buyers now ask which claims survive scrutiny. The defensible ones are compositional. Dried moringa leaf is high in protein for a plant material, a meaningful source of iron, calcium, potassium and vitamin A, and rich in the polyphenols and isothiocyanates that are well documented in the literature.

Less settled is the leap from composition to clinical outcome. Studies on blood-sugar and lipid effects are promising but small, and claims about curing conditions are not supportable in any regulated market. The commercially important point is that moringa does not need the overclaim: as a nutrient-dense green powder for blends, capsules and functional beverages, its compositional case is strong on its own — and it survives the label review that inflated claims fail.

Processing is where quality is won or lost. Nutrient retention depends on drying temperature: shade-drying and low-temperature drying preserve far more vitamin and polyphenol content than high-heat alternatives, and stone-milling avoids the heat fast industrial grinding generates. Colour is a useful proxy — bright green powder indicates careful handling, while dull olive suggests heat or age. Because moringa is grown in soil that varies, heavy-metal and microbiological testing per lot is not optional for buyers selling into the EU or US. Particle size is worth specifying too — an 80–100 mesh powder disperses smoothly into beverages, while coarser grinds settle out and read as gritty. Ask for both reports plus the drying method, and the difference between grades becomes obvious.`,
  },
  {
    slug: 'sustainable-jute',
    cardTitle: 'Sustainable Jute Packaging',
    title: 'Sustainable jute packaging: the case for the golden fibre',
    cat: 'Sustainability', time: '3 min', date: 'April 2026',
    img: '/images/blog/jute-packaging.png',
    desc: 'Carbon-negative, biodegradable and stronger than cotton — why jute belongs in every sustainability-conscious supply chain.',
    body: `Jute has an unusual advantage in the sustainability conversation: it does not need a caveat. The plant grows in roughly a hundred days with little irrigation and minimal pesticide, absorbs a substantial amount of CO2 as it grows, and returns to the soil at end of life without leaving microplastics behind. Where most "eco" packaging is a trade-off against durability or cost, jute is simply a fibre that happens to be strong, cheap and biodegradable at the same time.

For buyers under packaging regulation — EU single-use plastic rules, extended producer responsibility schemes, retailer sustainability mandates — that combination does real commercial work. Jute shopping bags, sacks, carpet backing and rugs substitute directly for woven polypropylene in most applications, with better tensile strength than cotton and a texture retail brands actively want. The fibre grades from fine TD3 through coarse TD6, and getting the grade right matters more than buyers expect: a bag specified in TD6 to save cost will feel like a bag specified to save cost.

The practical cautions are moisture and finish. Jute is hygroscopic, so storage and container choice decide whether goods arrive clean or mildewed, and dry stowage with proper ventilation is worth insisting on. For food-contact and retail use, ask about the batching oil used in spinning — mineral-oil batching can carry an odour that transfers, while food-grade alternatives do not. Jute Mark certification and OEKO-TEX testing cover most retailer requirements. Specify grade, finish and stowage, and the golden fibre earns its place on merit rather than sentiment.`,
  },
  {
    slug: 'cow-dung-eco-solutions',
    cardTitle: 'The Cow Dung Economy',
    title: 'Cow dung eco solutions: an ancestral material finds a modern market',
    cat: 'Sustainability', time: '3 min', date: 'March 2026',
    img: '/images/cow-dung.png',
    desc: 'Dhoop, composted manure and biodegradable eco-pots — three distinct buyers, three pack formats, three regulatory routes.',
    body: `Of everything India exports, cow dung products are the category that most often surprises new buyers — and then makes immediate sense. Dung has been a construction material, fuel, fertiliser and ritual substance on the subcontinent for millennia. What is new is the export demand: diaspora households buying dhoop and incense cakes for observance, organic growers buying composted manure, and sustainability-minded retailers buying eco-pots and biodegradable planters that decompose into the soil they are planted in. Nothing about the raw material has changed; what has changed is that a substance long treated as purely domestic now has a documented, certifiable export form.

The range splits into three commercial groups, and they behave differently. Ritual and wellness items — dhoop sticks, incense cakes, sacred ash — sell on provenance and are typically retail-packed. Agricultural inputs — composted and vermicomposted manure — sell on nutrient analysis and pathogen-free processing. Household and horticultural goods — eco-pots, seedling trays, decorative pieces — sell on the biodegradability story and on dimensional consistency. Each has a different buyer, a different pack format, and a different regulatory route.

That regulatory route is the part to plan around first. Animal by-product rules govern imports of dung-derived goods in many markets, and requirements vary sharply: some jurisdictions demand heat treatment or sterilisation certificates, some restrict raw manure entirely, and some treat finished ritual items differently from agricultural inputs. None of this is difficult, but it is unforgiving of assumption. Confirm the import classification for your destination before ordering, and specify processing method, moisture and packaging in the contract. Handled properly, it is a genuinely differentiated category with very little competition.`,
  },
  {
    slug: 'food-essentials-export-grade',
    cardTitle: 'Export Grade Explained',
    title: 'Food essentials: what export grade actually means for pulses, spices and grains',
    cat: 'Sourcing & Quality', time: '3 min', date: 'February 2026',
    img: '/images/food-essentials.png',
    desc: 'On staples there is no story to sell — only a specification. Here is what the phrase "export grade" has to contain.',
    body: `Pulses, spices, grains and cold-pressed oils are the least glamorous part of an Indian export catalogue and the most exacting. There is no story to sell here — a buyer purchasing turmeric or toor dal is purchasing a specification, and the negotiation reduces to whether the delivered lot matches it. "Export grade" is the usual shorthand, but it is worth unpacking, because the phrase on its own guarantees very little.

In practice, export grade means four measurable things. Purity and admixture — the permitted percentage of foreign matter, broken grain and off-colour material. Moisture — held low enough to prevent mould and insect activity through a long humid transit. Residues — pesticide levels within the destination market's maximum residue limits, which are stricter in the EU than in most of the world and are the single most common reason a food consignment is rejected. And for spices specifically, active-compound content: curcumin percentage in turmeric, capsaicin in chilli, volatile oil in cumin. A price quoted without these figures is not a comparable price.

The buyer-side discipline is to specify before quoting and verify before shipping. Ask for a pre-shipment certificate of analysis against your own destination's limits rather than a generic one, confirm the sampling method behind it, and agree the tolerance for each parameter in writing. Where volumes justify it, a third-party inspection at load port converts all of this from trust into evidence for a small fraction of container value. Sortex-cleaned, machine-graded and lab-tested material costs more per tonne than field-run product — and dramatically less than a container held at the border. On staples, that arithmetic is the whole argument.`,
  },
  {
    slug: 'assam-second-flush',
    cardTitle: "Assam's Second Flush Tea",
    title: "Why Assam's second flush tea is the world's most coveted brew",
    cat: 'Origin', time: '6 min', date: 'January 2025',
    img: '/images/blog/assam-tea.png',
    hero: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1600&q=90',
    desc: 'A study in micro-climate, leaf chemistry, and a 180-year-old tradition that is reshaping specialty tea markets globally.',
    body: `The second flush harvest — plucked from late May through July across the Brahmaputra valley — represents the pinnacle of Assam tea. If the first flush is the spring awakening, the second flush is the full voice of summer: muscatel, malty, amber, and boldly characterful.

## The Science of the Season

During the second flush, the Assam tea bush (Camellia sinensis var. assamica) has had months to develop complex polyphenols. The heat and humidity of the valley trigger a natural stress response in the leaf, concentrating flavour compounds — particularly theaflavins and thearubigins — that produce the characteristic Assam "briskness."

Elevation plays a role too. Estates at higher altitude experience greater diurnal temperature variation during this period, which slows cell development and allows even finer flavour concentration.

## What SFTGFOP1 Actually Means

The grading nomenclature for whole-leaf Assam tea is a legacy of British classification, and it directly predicts cup quality:

- **SFTGFOP1** — Super Fine Tippy Golden Flowery Orange Pekoe, Grade 1. The finest grade, with the highest proportion of golden tips (the unopened bud, richest in theaflavins). Less than 5% of second flush production achieves this grade.
- **FTGFOP** — Fine Tippy Golden Flowery Orange Pekoe. Excellent cup quality, reliable briskness.
- **TGFOP** — The entry point for the premium whole-leaf category. Still full-flavoured and worth seeking.

## From the Estate to the Chest

After plucking, second flush leaves go through orthodox processing — withering (16–24 hours in warm air), rolling (to rupture cell walls and trigger enzymatic oxidation), controlled oxidation (2–4 hours, critical for flavour development), and firing (to halt oxidation and reduce moisture to ~3%).

The result is then hand-graded by experienced sorters, tested at the Tea Research Association lab in Jorhat, and packed in airtight 20-kg aluminium-foil-lined ply chests for export.

## For Buyers

Second flush lots from Gosarvam Global are available from July through September. We maintain single-estate traceability and can provide full processing records, auction records, and laboratory analysis per consignment.

Minimum order: 1 MT. Packaging: standard 20-kg ply chests or custom retail packaging. Documentation: APEDA Certificate of Origin, Phytosanitary, CoA.`,
  },
  {
    slug: 'makhana-boom',
    cardTitle: 'The Makhana Boom (Fox Nuts)',
    title: 'The makhana boom: how Indian fox nuts are conquering global pantries',
    cat: 'Trade', time: '8 min', date: 'February 2025',
    img: '/images/blog/makhana.png',
    hero: 'https://images.unsplash.com/photo-1559656914-a30970c1affd?w=1600&q=90',
    desc: 'From a regional religious offering to a $400M global health-food market — the extraordinary rise of Makhana.',
    body: `Fox nuts — Makhana in Hindi, Euryale ferox in Latin — have been cultivated in the wetlands of Bihar for centuries. They were a religious offering, a festival snack, a monastery staple. They are now a $400M global health-food market growing at 14% annually.

## What Changed?

Three converging trends drove the Makhana moment: the plant-based protein movement, the gluten-free mainstream, and the premium snack category's explosive growth in the US, UK, Germany, and Australia.

Makhana checks every box: 9.7g of protein per 100g, 0.1g of fat, zero gluten, low glycaemic index, and a naturally mild flavour that takes seasoning beautifully. It outperforms popcorn on almost every nutritional metric while carrying a heritage story that resonates with conscious consumers.

## The Bihar Supply Chain

India grows over 85% of the world's Makhana, almost entirely in the Mithila region of North Bihar. The cultivation process is uniquely labour-intensive: seeds are harvested from prickly aquatic plants by hand, then roasted in iron pans and hand-popped — a skill that takes years to master.

The artisanal nature of production means supply is constrained, quality varies by producer, and the premium for well-processed, consistently-sized nuts is significant.

## What Gosarvam Sources

We work directly with five producer cooperatives in Darbhanga and Madhubani districts. Our supply team is on the ground during peak season (October–December) to oversee grading, moisture testing, and packaging.

We supply: plain (whole, sizes Suta/Lawa/Samanya), pre-roasted, flavoured (multiple seasoning options), and as Makhana flour for industrial bakers.`,
  },
  {
    slug: 'fcl-vs-lcl',
    cardTitle: 'FCL vs LCL Shipping',
    title: 'FCL vs LCL: choosing the right shipping mode for agri-exports',
    cat: 'Logistics', time: '5 min', date: 'March 2025',
    img: '/images/blog/fcl-lcl.png',
    hero: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&q=90',
    desc: 'A practical, buyer-side guide to volumes, lead times, consolidation, and cost implications for agri product imports.',
    body: `For most agri-product importers — especially those buying from India for the first time — the choice between FCL (Full Container Load) and LCL (Less than Container Load) is one of the first decisions that affects cost, lead time, and risk.

## FCL: When You Fill the Box

An FCL shipment means you are booking an entire container — typically a 20-foot (20-tonne capacity) or 40-foot (26-tonne) unit. Your goods are the only goods inside, which means:

- **Lower risk of contamination** — critical for food products like tea and spices
- **Lower per-unit freight cost** at scale
- **Simpler documentation** — one bill of lading, one customs entry
- **Faster turnaround** at destination — no deconsolidation needed

FCL makes sense above approximately 10–12 CBM (cubic metres) or above 8–10 MT, depending on commodity.

## LCL: Flexibility for Smaller Volumes

LCL means your goods share a container with other shippers' cargo. A freight consolidator (NVOCC) manages the stuffing and destuffing at a Container Freight Station. For agri products, this means:

- **Higher risk of cross-contamination** if cargo types are not segregated — always confirm segregation in writing
- **Higher per-unit freight cost** (you pay by CBM)
- **Longer transit at destination** — deconsolidation adds 3–5 days typically
- **Good for trial or sample-scale orders** (2–5 MT)

## Our Recommendation

For first-time orders, use LCL to minimise commitment. Once you have validated the product quality and your market demand, move to FCL for cost efficiency. For sensitive products (tea, Makhana), we always recommend FCL segregation even at LCL scale — ask your freight forwarder to specify "agricultural cargo only" in the same container.

Gosarvam can connect you with our preferred freight forwarders on both the Indian and destination ends.`,
  },
];

export const postsBySlug = Object.fromEntries(posts.map(p => [p.slug, p]));
