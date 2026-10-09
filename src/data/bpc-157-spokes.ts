/**
 * BPC-157 silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/bpc-157-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — autocomplete evidence pulled live from Google UK (2026-10-09):
 *   1. where to buy bpc-157 uk   → exact/high match (`where to buy bpc-157 uk` → `bpc 157 where to buy uk online`)
 *   2. cheapest bpc-157 uk       → 0 UK results — substituted `cheapest bpc 157` (exact #1)
 *   3. bpc-157 price comparison uk → 0 UK results — substituted `bpc 157 price uk` (real UK hit)
 *   4. buy bpc-157 online uk     → real UK hits (`bpc 157 online uk`, `best place to buy bpc 157 uk online`)
 *   5. bpc-157 uk supplier       → exact match #1 (`bpc 157 uk supplier`)
 *   6. best bpc-157 peptide      → exact match #1
 */

export interface SpokeSection {
  title: string;
  body: string;
  table?: { header: string[]; rows: string[][] };
  list?: string[];
}

export interface SpokeFaq {
  question: string;
  answer: string;
}

export interface SpokeSource {
  label: string;
  url: string;
}

export interface Spoke {
  slug: string;
  /** <title> — under 70 chars, no brand suffix, contains focus keyword. */
  title: string;
  /** Meta description — 155-160 chars, contains the exact keyword. */
  description: string;
  /** H1 — the keyword phrase used naturally. */
  h1: string;
  focusKeyword: string;
  /** Intro paragraphs; paragraph 1 contains the focus keyword verbatim. */
  intro: string[];
  sections: SpokeSection[];
  faq: SpokeFaq[];
  sources: SpokeSource[];
  /** Which live table to render. */
  tableMode: "price" | "perMg" | "trust" | "full";
  tableHeading: string;
  /** How many rows (0 = all). */
  rowLimit: number;
}

export const spokes: Spoke[] = [
  /* ─────────────────────────── 1 ─────────────────────────── */
  {
    slug: "where-to-buy-bpc-157-uk",
    title: "Where to Buy BPC-157 UK: Verified Suppliers Compared",
    description:
      "Where to buy BPC-157 UK — compare live prices from every verified UK research supplier, then check Certificate of Analysis, stock and shipping before ordering.",
    h1: "Where to Buy BPC-157 UK",
    focusKeyword: "where to buy bpc-157 uk",
    intro: [
      "The search for where to buy BPC-157 UK lands you in the most crowded corner of the UK research-peptide market. BPC-157 — Body Protection Compound 157, also catalogued as PL 14736 and pentadecapeptide BPC 157 — is a synthetic fifteen-amino-acid sequence derived from a fragment of human gastric juice protein, and it is one of the most researched peptides in the regenerative literature. That research pedigree has produced an unusually deep supplier pool, and an unusually uneven one.",
      "This page answers the question with evidence rather than adjectives: a live table of every UK supplier ViralPeps tracks for BPC-157, showing pack size, headline price, cost per milligram, stock status, verification state and a direct link to the supplier's own product page. The table is rebuilt from suppliers' published pages on a weekly cycle, so the figures reflect their most recent state rather than a snapshot taken months ago.",
      "BPC-157's research history is why it attracts both serious suppliers and opportunists. First characterised by the Zagreb research group and studied across gastrointestinal, tendon, ligament and vascular models, it has a real body of published work behind it — including trials in inflammatory bowel disease under the PL 14736 designation. A compound with genuine scientific credibility, a memorable name and a research audience that cannot easily verify what arrives in a vial is exactly the profile that counterfeit listings target.",
      "Everything on this page is presented for laboratory and educational reference. BPC-157 is not a licensed medicine in the UK and is not authorised for human use; research suppliers sell it under research-use-only terms. For the compound's full research profile and market overview, start with the [**BPC-157 price comparison hub →**](/compounds/bpc-157).",
    ],
    sections: [
      {
        title: "Where to Buy BPC-157 UK — What Actually Matters",
        body: "The phrase \"where to buy\" hides a more useful question: which supplier can you verify? Every storefront in this market can take a card payment. Very few can show a batch number tied to an independent HPLC result, because commissioning that testing costs money and running an operation to support it costs more.\n\nWhen we audit UK suppliers we apply an identical checklist every time. A Certificate of Analysis from a named laboratory referencing a specific batch. A contact route that genuinely replies to a question. Unambiguous research-use-only labelling. A registered business identity behind the storefront. And confirmed control of the domain they sell from — which is exactly why the TrustScore badge exists: a supplier who installs it on their own site is proving they control that domain, ruling out the throwaway storefronts that characterise the lower end of this market.",
        list: [
          "A Certificate of Analysis from a named third-party laboratory referencing a specific batch number — the single most decisive signal available to a buyer.",
          "A working contact route: an email that replies or a phone that connects, tested before you order rather than after.",
          "Research-use-only labelling throughout, with no marketing implying human or medical use.",
          "A registered business behind the storefront — a limited company or verifiable sole trader.",
          "Confirmed domain ownership, which is what the TrustScore badge verifies.",
        ],
      },
      {
        title: "How We Verify UK BPC-157 Suppliers",
        body: "Every supplier in the table above has been checked against the same standard. We fetch their homepage and confirm it resolves, scan secondary pages for shipping, contact and compliance language, and look for a Certificate of Analysis either hosted on-site or linked from a testing laboratory. Suppliers that fail the basics are excluded rather than listed behind a caveat.\n\nThe process is deliberately conservative and narrower than the raw market. We would rather track fewer suppliers honestly than pad a table with storefronts nobody can verify. When a supplier you know of is absent, that is usually the reason: not an editorial judgement, but a simple absence of verifiable signals.\n\nWe also re-run those checks rather than treating verification as a one-off award. A supplier who published batch-linked COAs last quarter but has quietly stopped is a materially different proposition from one who has always published them, and the underlying data is refreshed rather than archived.",
        table: {
          header: ["Signal", "Why it matters"],
          rows: [
            ["Named-lab COA with batch number", "Proves the material was independently tested and traceable"],
            ["Working contact route", "A supplier you can reach is one you can resolve a problem with"],
            ["Full RUO labelling", "Shows compliance awareness; unlicensed human use is a legal risk"],
            ["Registered business identity", "A real entity behind the storefront, not an anonymous page"],
            ["Domain ownership confirmed", "Rules out throwaway storefronts built to disappear"],
          ],
        },
      },
      {
        title: "What Affects the Price You Pay in the UK",
        body: "BPC-157 pricing in the UK varies by a factor of several between the cheapest and most expensive listings, and the spread is not random. Pack size is the biggest single driver — larger vials almost always carry a lower cost per milligram, which is why a per-mg comparison tells you more than a headline price. A BPC-157 5mg listing and a 10mg listing tell opposite stories depending on whether you divide them.\n\nVendor overhead is the second factor. A supplier running verified warehousing, commissioned lab testing, printed COAs and responsive support charges for that service. A bare-bones reseller drop-shipping from overseas does not, which is how a listing can appear dramatically cheaper while offering materially less.\n\nStock status matters too, and it is the most commonly overlooked. A listing can show a competitive price and be permanently out of stock, which is why availability is recorded alongside price here rather than assumed. When BPC-157 is genuinely held in UK inventory, delivery is typically a matter of days. When it is drop-shipped, the quoted window frequently slips and import handling becomes the buyer's problem.\n\nThe practical takeaway is to compare on a per-mg basis at the pack size you actually need, and to treat an unusually low price as a question rather than a bargain. In an unregulated market the cheapest listing is often a smaller quantity than advertised, or material with no testing behind it at all. If your research pairs BPC-157 with its most common companion peptide, our [TB-500 comparison hub](/compounds/tb-500) follows the same method.",
      },
    ],
    faq: [
      {
        question: "Where can I buy BPC-157 in the UK?",
        answer:
          "ViralPeps compares BPC-157 listings from UK research-chemical suppliers, who sell the compound strictly for laboratory use under research-use-only terms. We list only suppliers whose verification signals — COA, contact, compliance and domain ownership — we can independently confirm, and the live table above shows every one we currently track.",
      },
      {
        question: "Is BPC-157 legal in the UK?",
        answer:
          "BPC-157 is not a licensed medicine in the UK and is not authorised for human use or general retail sale. Research suppliers operate under research-use-only terms intended for laboratory and educational purposes. Obtaining it for personal human use falls outside those terms, and we present this information for reference only.",
      },
      {
        question: "Why do BPC-157 prices vary so much between UK suppliers?",
        answer:
          "Pack size is the main driver — larger vials carry a much lower cost per milligram — followed by vendor overheads such as warehousing, commissioned testing, printed COAs and support. Genuinely low prices sometimes indicate a smaller quantity than advertised or untested material, so compare per mg and verify the supplier.",
      },
      {
        question: "How often is the BPC-157 supplier data updated?",
        answer:
          "Prices, pack sizes and stock status are refreshed from supplier listing pages on a weekly cycle. Verification signals are re-checked as part of the same sweep, so a supplier that has changed its COA or compliance language is reflected in the table rather than frozen at the date it was first added.",
      },
    ],
    sources: [
      { label: "BPC-157 — PubChem compound summary (CAS 137525-51-0)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/9941957" },
      { label: "Stable gastric pentadecapeptide BPC 157 in trials for inflammatory bowel disease — Surg Today 2007 (PMID 17713731)", url: "https://pubmed.ncbi.nlm.nih.gov/17713731/" },
      { label: "Stable Gastric Pentadecapeptide BPC 157 and Wound Healing — Front Pharmacol 2021 (PMID 34267654)", url: "https://pubmed.ncbi.nlm.nih.gov/34267654/" },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy BPC-157 UK — Live Supplier Prices",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-bpc-157-uk",
    title: "Cheapest BPC-157 UK: Lowest Price Per mg From Live Data",
    description:
      "Cheapest BPC-157 UK — the lowest verified price per milligram across every UK supplier we track, ranked from live weekly supplier data and compared per pack.",
    h1: "Cheapest BPC-157 UK",
    focusKeyword: "cheapest bpc-157 uk",
    intro: [
      "Finding the cheapest BPC-157 UK listing is easy; finding the genuinely cheapest one is not. The headline price on a supplier page tells you almost nothing on its own, because BPC-157 is sold in everything from a 5mg vial to a 10mg vial to a 20mg vial to a multi-vial kit, and the number that matters is the cost per milligram at the quantity you actually need. A £12 listing of 5mg costs £2.40 per mg. A £16 listing of 10mg costs £1.60 per mg. The second is cheaper per milligram while looking almost twice as expensive at a glance.",
      "This page does that division for you. Below is a live table ranked by price per milligram across every UK BPC-157 listing ViralPeps tracks, rebuilt weekly from suppliers' own product pages. The cheapest row by that measure is highlighted, and the table shows you what you are actually paying for each milligram of material rather than what the storefront has chosen to put in large type.",
      "There is a genuine tension here that a purely mechanical comparison would hide. The lowest cost per milligram does not always come from the supplier with the strongest verification signals, and a research budget saved on untested material is not saved at all. The ranking below is a starting point, not a verdict — use it to narrow a long list of suppliers down to a short one, then check each of those against the verification criteria before committing.",
      "All figures are presented for laboratory and educational reference only. BPC-157 is not licensed for human use in the UK and is sold by research suppliers under research-use-only terms. The full market view, including the highest-priced listings and the overall spread, is on the [**BPC-157 price comparison hub →**](/compounds/bpc-157).",
    ],
    sections: [
      {
        title: "Why the Cheapest Headline Price Is Rarely the Cheapest BPC-157",
        body: "Pack size is the dominant variable in BPC-157 pricing. Suppliers price larger vials at a lower unit cost because their own cost per milligram of material falls as quantity rises — synthesis, purification and testing are largely fixed per batch. That means the cheapest listing by headline price is very often one of the most expensive per milligram, and the reverse is just as common.\n\nA worked example from typical UK data makes the point. A 5mg BPC-157 vial at £12.00 works out at £2.40 per mg. A 10mg vial at £16.00 works out at £1.60 per mg. A 20mg vial at £28.00 works out at £1.40 per mg. The most expensive-looking of the three is the cheapest of the three per milligram — and if your protocol needs 40mg of material, that difference compounds across every subsequent order rather than being a one-off.\n\nThe second force is vendor overhead. A supplier running verified warehousing, commissioned HPLC testing and printed batch COAs has real costs the drop-shipper does not, and those costs appear in the unit price. A listing that undercuts the market by a wide margin is usually signalling one of two things: a smaller quantity than advertised, or material with no independent testing behind it.",
      },
      {
        title: "How We Calculate BPC-157 Price Per mg",
        body: "We take the published price, strip currency formatting, and divide by the milligram figure stated in the pack size. Rows without a usable mg figure are excluded from the per-mg ranking rather than estimated, because an inferred quantity is worse than an honest gap. That is why some listings appear in the full comparison table but not here.\n\nMulti-vial kits are divided by their total milligram content, not by the number of vials, so a three-vial 30mg kit is compared against a single 30mg vial on equal terms. Where a supplier publishes a bundle price, the bundle is treated as one row at its own per-mg rate — the same way a buyer would experience it.\n\nThe inputs come from supplier product pages and are refreshed on a weekly cycle. Prices move, stock moves, and packs are discontinued without notice in this market, which is why the table is rebuilt rather than cached. If you are comparing a figure here against a page you have open in another tab, the difference is almost always a change the supplier made between scrapes.\n\nBPC-157 is overwhelmingly supplied as the acetate salt, lyophilised as a white powder for reconstitution. A minority of listings describe a capsule or liquid format, which carries different handling requirements — do not compare those on price alone, because they are not interchangeable in a protocol.",
        table: {
          header: ["Pack size", "Typical UK price band", "Implied cost per mg"],
          rows: [
            ["5mg", "£9–£18", "£1.80–£3.60/mg"],
            ["10mg", "£14–£30", "£1.40–£3.00/mg"],
            ["20mg", "£25–£55", "£1.25–£2.75/mg"],
            ["Multi-vial kit", "£45+", "varies by total mg"],
          ],
        },
      },
      {
        title: "When the Cheapest Option Is the Wrong Choice",
        body: "There is a real case for knowingly paying more. A listing at the very bottom of the per-mg ranking with no verifiable COA, no reachable contact and an overseas dispatch address is not a bargain — it is an unhedged bet on material nobody has tested. In a market where purity can vary materially between batches from the same supplier, the cheapest listing is the one where a bad batch is most likely to go undetected.\n\nThe sensible use of this ranking is as a filter rather than a decision. Drop any listing more than a modest margin above the best per-mg figure, then verify the survivors. The gap between the cheapest verified supplier and the cheapest unverified one is usually small enough that the verification premium is trivial against the risk it removes.\n\nIt is also worth checking whether a low headline price reflects a smaller included quantity. A 10mg listing at what looks like a 20mg price is not cheaper at all, and several storefronts present the pack size inconsistently enough that the confusion is easy to fall into. Where the milligram figure is ambiguous, treat the listing as unpriced and move on.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest BPC-157 in the UK?",
        answer:
          "The cheapest BPC-157 by price per milligram is highlighted at the top of the live table above, which is rebuilt weekly from every UK supplier ViralPeps tracks. Because pack sizes differ, the cheapest headline price and the cheapest price per milligram are frequently different listings.",
      },
      {
        question: "Is cheaper BPC-157 lower quality?",
        answer:
          "Not automatically — larger pack sizes genuinely cost less per milligram and are a legitimate way to reduce unit cost. However, a listing that undercuts the entire market by a wide margin is more often a smaller quantity than advertised or untested material, so verify the supplier before assuming the price reflects a genuine saving.",
      },
      {
        question: "How does ViralPeps calculate price per milligram?",
        answer:
          "We divide the published price by the total milligram content of the pack. Multi-vial kits are divided by their total mg rather than their vial count so they compare like-for-like with single vials. Listings without a clear mg figure are excluded from the ranking rather than estimated.",
      },
    ],
    sources: [
      { label: "BPC-157 — PubChem compound summary (CAS 137525-51-0)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/9941957" },
      { label: "BPC 157 and Standard Angiogenic Growth Factors — Curr Pharm Des 2018 (PMID 29998800)", url: "https://pubmed.ncbi.nlm.nih.gov/29998800/" },
      { label: "Therapeutic potential of pro-angiogenic BPC157 is associated with VEGFR2 activation and up-regulation — J Mol Med 2017 (PMID 27847966)", url: "https://pubmed.ncbi.nlm.nih.gov/27847966/" },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest BPC-157 UK — Ranked by Price Per mg",
    rowLimit: 10,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "bpc-157-price-comparison-uk",
    title: "BPC-157 Price Comparison UK: Every Supplier, Every Price",
    description:
      "BPC-157 price comparison UK — the complete side-by-side table of every UK supplier we track, showing pack size, price, cost per mg, stock status and TrustScore.",
    h1: "BPC-157 Price Comparison UK",
    focusKeyword: "bpc-157 price comparison uk",
    intro: [
      "A BPC-157 price comparison UK buyers can actually use has to show the whole market, not a curated top ten. This page does exactly that: every UK supplier ViralPeps tracks for BPC-157, in one table, with pack size, headline price, cost per milligram, stock status, verification state and TrustScore. Nothing is filtered out for being expensive, and nothing is hidden for being inconvenient.",
      "The reasoning is simple. A comparison that shows only the cheapest listings tells you where the floor is, but it does not tell you the shape of the market — whether there is a tight cluster of well-priced suppliers or a handful of outliers surrounded by noise. Seeing the full spread makes it possible to judge whether any given price is genuinely competitive or merely average, which is the question a buyer actually has.",
      "The table below is generated live from the same data source that powers every other page in this silo, and it is refreshed from suppliers' own product pages on a weekly cycle. Because pack sizes differ across suppliers, the per-mg column is the honest comparison axis — a 5mg vial and a 20mg vial are only comparable once you divide.",
      "All figures are presented for laboratory and educational reference only. BPC-157 is not licensed for human use in the UK and is supplied by research vendors under research-use-only terms. For the narrative explanation of the market, see the [**BPC-157 hub →**](/compounds/bpc-157).",
    ],
    sections: [
      {
        title: "How to Read a BPC-157 Price Comparison Properly",
        body: "Three numbers matter in any peptide price table, and they answer different questions. The headline price tells you the minimum cash commitment to acquire material at all. The price per milligram tells you the unit economics and is the only figure that is comparable across pack sizes. The stock status tells you whether either of the other two is actionable today.\n\nA fourth figure — the TrustScore — tells you nothing about price but a great deal about whether the listing is worth considering at any price. It is worth reading the table column by column rather than row by row: scan the per-mg column to find the competitive band, then scan the TrustScore column to see which of those suppliers has demonstrated the verifiable signals, then check stock on the intersection.\n\nBe careful with the extremes at both ends. The single cheapest listing is often a small pack, a clearance batch, or material with no testing behind it, and the single most expensive is often a bundle rather than a single vial. Neither is necessarily a problem, but neither should be read as a market benchmark either.",
        table: {
          header: ["Column", "What it tells you", "How to use it"],
          rows: [
            ["Pack size", "How much material the listing contains", "Match it to your required quantity"],
            ["Price", "Minimum cash commitment", "Use only to judge entry cost"],
            ["Price per mg", "Unit economics", "The only cross-pack comparison axis"],
            ["Stock", "Whether the price is actionable", "Ignore out-of-stock listings"],
            ["TrustScore", "Verification signals demonstrated", "Filter the shortlist"],
          ],
        },
      },
      {
        title: "Why the UK BPC-157 Market Is So Deep",
        body: "Unlike the mitochondrial peptides, where a handful of suppliers carry a thin range, the BPC-157 market is both deep and wide. Dozens of UK suppliers each carry multiple pack sizes of the same compound, which produces a long table with a wide spread between the cheapest and most expensive listings — and a per-mg band that is often tighter than the headline prices suggest.\n\nThis depth is a direct function of the compound's research profile. BPC-157 has a large published literature, a well-known sequence and a durable research audience, so it earns shelf space in almost every serious UK peptide catalogue. Suppliers stock it as a core line rather than an experiment, which means the market has enough competition to keep per-mg pricing honest at the competitive end.\n\nFor a buyer, depth cuts both ways. It means more choice and more price competition, but it also means a longer list of suppliers to verify, and a correspondingly greater chance of running into a low-quality outlier. That is the context in which the TrustScore column earns its place: in a deep market where many listings look similar, the observable quality signals are the only reliable differentiator.",
      },
      {
        title: "Pack Sizes, Formats and What They Cost",
        body: "BPC-157 is sold almost exclusively as a lyophilised powder in a sealed vial, typically as the acetate salt. The common pack sizes in the UK are 5mg, 10mg and 20mg, with occasional multi-vial kits appearing at the top end. The price per milligram falls as the pack size rises, though not proportionally — the curve flattens between 10mg and 20mg, which is worth knowing when planning quantity.\n\nA minority of suppliers describe alternative formats. Where these appear, treat them as separate products rather than substitutes: a capsule listing is not interchangeable with a lyophilised vial, and comparing them on headline price is misleading because the delivered quantity of peptide differs. The table above includes format in the pack label wherever suppliers state it, so the distinction is visible rather than buried.\n\nStorage requirements are uniform across formats: lyophilised BPC-157 should be kept cold, dry and protected from light, and any reconstituted material has a much shorter working life. Suppliers who ship in sealed, batch-labelled vials and who publish storage guidance are providing a small but genuine operational signal, and it is one worth noticing when reading the table.",
      },
    ],
    faq: [
      {
        question: "How many UK suppliers sell BPC-157?",
        answer:
          "The exact number changes as suppliers launch, rotate their catalogue or stop stocking the compound, but the live table above lists every supplier ViralPeps currently tracks and is rebuilt weekly. The BPC-157 market is deep and competitive, with many suppliers carrying multiple pack sizes.",
      },
      {
        question: "What is a normal price for BPC-157 in the UK?",
        answer:
          "The most useful benchmark is price per milligram rather than headline price, because pack sizes differ. The table above shows the current spread; judging a supplier means comparing its per-mg figure against that band and then checking its TrustScore rather than looking at the headline price alone.",
      },
      {
        question: "Why do some BPC-157 listings not show a price per mg?",
        answer:
          "Those listings do not state a clear milligram figure in the pack size, so no honest per-mg value can be calculated. Rather than estimate, we leave the column blank and exclude the row from the per-mg ranking. They still appear in the full comparison table above.",
      },
      {
        question: "Does the price comparison include out-of-stock suppliers?",
        answer:
          "Yes — the table shows every tracked supplier so the market is visible in full, with stock status displayed per row. Out-of-stock listings are not actionable but they still inform you about what a supplier charges when they do have material, which is useful context for judging the market.",
      },
    ],
    sources: [
      { label: "BPC-157 — PubChem compound summary (CAS 137525-51-0)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/9941957" },
      { label: "Multifunctionality and Possible Medical Application of the BPC 157 Peptide — Pharmaceuticals 2025 (PMID 40005999)", url: "https://pubmed.ncbi.nlm.nih.gov/40005999/" },
      { label: "BPC-157 as an Investigational Peptide Therapeutic — Pharmaceutics 2026 (PMID 42198317)", url: "https://pubmed.ncbi.nlm.nih.gov/42198317/" },
    ],
    tableMode: "full",
    tableHeading: "BPC-157 Price Comparison UK — Every Tracked Supplier",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-bpc-157-online-uk",
    title: "Buy BPC-157 Online UK: Ordering, Payment & Delivery",
    description:
      "Buy BPC-157 online UK — how ordering, payment and delivery work with UK research suppliers, what to check before checkout, and live prices from every vendor.",
    h1: "Buy BPC-157 Online UK",
    focusKeyword: "buy bpc-157 online uk",
    intro: [
      "To buy BPC-157 online UK researchers have a lot of choice and very little standardisation. Unlike a regulated retail product, there is no common checkout experience, no consistent labelling requirement and no consumer protection framework specific to research peptides. That makes the ordering process itself worth understanding before you place an order, because the decisions you make at checkout — which supplier, which pack, which payment method — determine most of the risk you carry afterwards.",
      "This page covers how the purchase process actually works with UK suppliers: what the checkout flow looks like, how payment is typically handled, what delivery timing to expect, and what to check in the minutes before you commit. It sits alongside a live table of every UK BPC-157 listing ViralPeps tracks, showing price, pack size, stock and a direct link to each vendor's own product page.",
      "The theme running through all of it is verifiability. The UK research-peptide market is legal-but-unregulated: suppliers can operate openly under research-use-only terms, but nothing forces them to test their material or publish the results. The buyer's job is therefore to substitute the missing regulation with their own checks, and the ordering stage is where those checks are cheapest to perform.",
      "All content is educational and presented for research reference only. BPC-157 is not approved for human use in the UK and is supplied under research-use-only terms. Full market context is on the [**BPC-157 price comparison hub →**](/compounds/bpc-157).",
    ],
    sections: [
      {
        title: "What Ordering BPC-157 Online Actually Involves",
        body: "Most UK research suppliers run a straightforward e-commerce flow: browse a product page, choose a pack size, add to basket and check out. The variations matter more than the similarities. Some suppliers offer guest checkout and others require an account; some apply a minimum order value; some restrict which regions they ship to; and a few require an age or research-use declaration before accepting an order.\n\nShipping is where the biggest practical differences appear. A supplier holding UK stock will typically dispatch within one to two working days and quote a domestic carrier, so delivery is a matter of days. A supplier drop-shipping from overseas will quote a longer window, and the shipment may attract customs handling that is billed to the recipient rather than absorbed by the vendor. That distinction is not always highlighted on the product page, but it is usually visible in the shipping information.\n\nIt is worth checking the shipping terms on the supplier's own site rather than trusting a marketplace summary, because delivery terms change and a cached figure from a comparison site can be months out of date. Where a supplier does not publish shipping information at all, that is itself a signal worth weighing.",
        list: [
          "Confirm the supplier holds UK stock, or accept that delivery will be slower and may involve customs.",
          "Check for a minimum order value or a research-use declaration before checkout.",
          "Read the shipping terms on the supplier's own site rather than a third-party summary.",
          "Note the quoted dispatch window — a long one often indicates drop-shipping rather than local inventory.",
          "Confirm the returns and problem-resolution policy exists before you need it.",
        ],
      },
      {
        title: "Payment, Protections and Compliance",
        body: "Payment handling is one of the clearest dividing lines between well-run UK suppliers and the rest. Established suppliers typically accept mainstream card payments through a processor, which gives the buyer a degree of chargeback protection if the goods never arrive or are materially not as described. They issue a proper invoice or order confirmation and a tracking reference.\n\nA supplier that will only accept bank transfer, cryptocurrency or an irrecoverable payment method is asking you to accept all of the counterparty risk. That is not automatically fraudulent — some legitimate operations prefer bank transfer for cost reasons — but it removes the remedy you have if something goes wrong, and it is a materially worse position to be in with a supplier you have not used before.\n\nCompliance is the second signal. A competent research supplier states clearly that its products are for laboratory and educational use, are not medicines, and are not for human consumption. That language is not marketing boilerplate; it is the regulatory posture under which these sales take place, and its absence is a warning. A supplier whose product page reads like a wellness advertisement, complete with dosing advice for people, is signalling something about how it understands — or chooses to ignore — its own obligations.",
      },
      {
        title: "What to Check in the Minutes Before You Buy",
        body: "Before completing an order, four checks take less than five minutes and remove most of the avoidable risk. First, confirm the supplier has a batch-linked Certificate of Analysis from a named laboratory. If it does not, decide whether you are comfortable with that, because nothing else substitutes for it.\n\nSecond, send a question to the supplier's contact address and note whether a reply arrives. Responsiveness before a sale predicts responsiveness after one, and a supplier that ignores a pre-sale enquiry will rarely handle a problem well.\n\nThird, confirm the company behind the storefront is identifiable — a limited company number, a trading address, or at minimum a consistent business identity. Fourth, verify the domain. A storefront built on a domain registered weeks ago with no history is a different proposition from one that has been operating for years, and the TrustScore badge in the table above exists precisely to make that distinction checkable.\n\nNone of these checks establish that the material is pure — nobody can establish that without a laboratory — but together they establish whether the supplier is the kind of operation that makes purity checkable. That is the realistic standard in this market, and it is the one worth holding to.",
      },
    ],
    faq: [
      {
        question: "Can I buy BPC-157 online in the UK?",
        answer:
          "Yes — BPC-157 is sold by UK research-chemical suppliers under research-use-only terms, and the live table above links to each supplier's own product page. It is not a licensed medicine and is not authorised for human use, so purchases are for laboratory and educational reference only.",
      },
      {
        question: "How long does BPC-157 delivery take in the UK?",
        answer:
          "Suppliers holding UK stock typically dispatch within one to two working days and deliver domestically within a few days. Suppliers who drop-ship from overseas quote longer windows and may involve customs handling billed to the recipient. Always check the shipping terms on the supplier's own site.",
      },
      {
        question: "Is it safe to pay by bank transfer for BPC-157?",
        answer:
          "Bank transfer removes the chargeback protection that card payments provide, so with a supplier you have not used before it materially increases your risk. Some legitimate suppliers prefer it, but a card payment through a mainstream processor gives you a remedy if the order goes wrong.",
      },
      {
        question: "What should I check before ordering BPC-157 online?",
        answer:
          "Four checks: that the supplier publishes a batch-linked Certificate of Analysis from a named laboratory; that their contact address actually replies to an enquiry; that the business behind the storefront is identifiable; and that the domain is established. Together these establish whether the supplier makes quality checkable.",
      },
    ],
    sources: [
      { label: "BPC-157 — PubChem compound summary (CAS 137525-51-0)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/9941957" },
      { label: "Stable Gastric Pentadecapeptide BPC 157 and Wound Healing — Front Pharmacol 2021 (PMID 34267654)", url: "https://pubmed.ncbi.nlm.nih.gov/34267654/" },
      { label: "BPC 157 Rescued NSAID-cytotoxicity Via Stabilizing Intestinal Permeability — Curr Pharm Des 2020 (PMID 32445447)", url: "https://pubmed.ncbi.nlm.nih.gov/32445447/" },
    ],
    tableMode: "full",
    tableHeading: "Buy BPC-157 Online UK — Live Supplier Listings",
    rowLimit: 20,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "bpc-157-uk-supplier",
    title: "BPC-157 UK Supplier: Who Stocks It & How to Verify Them",
    description:
      "BPC-157 UK supplier guide — which UK suppliers stock BPC-157, how to read a supplier listing for stock and quantity, and every vendor ranked by TrustScore.",
    h1: "BPC-157 UK Supplier",
    focusKeyword: "bpc-157 uk supplier",
    intro: [
      "Choosing a BPC-157 UK supplier is the decision that determines everything downstream. The compound itself is well characterised and widely studied; the variable that changes between one order and the next is not the molecule but the vendor, and specifically whether that vendor can show you what is in the vial. Two suppliers can both list \"BPC-157 10mg\" at similar prices while differing in whether the material is held in the UK or drop-shipped, whether the pack contains what the label claims, whether a Certificate of Analysis exists for the batch, and whether anyone tested anything at all.",
      "This page lists every UK supplier ViralPeps currently tracks for BPC-157, ranked by TrustScore, with the live price, pack size and stock status for each. The ranking reflects verification signals rather than price, because in an unregulated market the question of whether a listing is real matters more than whether it is cheap.",
      "BPC-157's position in the market is what makes supplier scrutiny non-optional. As one of the most researched peptides in the regenerative literature — studied across gastrointestinal, tendon, ligament and vascular models for decades — it carries a strong pull on buyers and a correspondingly high counterfeit risk. That combination of a compelling mechanism and a buyer base that cannot easily verify material is precisely the condition in which misleading listings flourish.",
      "All content is presented for laboratory and educational reference. BPC-157 is not licensed for human use in the UK and is sold under research-use-only terms. The full market overview is on the [**BPC-157 price comparison hub →**](/compounds/bpc-157).",
    ],
    sections: [
      {
        title: "What a BPC-157 Supplier Listing Should Tell You",
        body: "A complete BPC-157 listing states five things: the compound and its salt form, the milligram content of the pack, the price, the stock status, and a route to the batch documentation. Listings missing any of these are not necessarily dishonest, but they are incomplete, and incompleteness in a market like this is worth treating as a caution rather than a neutral fact.\n\nThe salt form matters more than it appears. BPC-157 is normally supplied as the acetate salt in a lyophilised vial, and a listing that is precise about this is speaking to a research audience. A listing that describes the compound only in vague promotional terms is doing the opposite, and the difference in tone usually tracks the difference in operational seriousness.\n\nThe stock statement is the most frequently misleading element. A green availability indicator can mean the material is on a shelf in the UK, or it can mean the supplier believes they can obtain it. The two are indistinguishable at the point of sale and become very distinguishable afterwards, when the dispatch window quietly extends. Where a supplier publishes a restocking date or a dispatch estimate, that information is worth more than the availability dot.",
      },
      {
        title: "How We Score a BPC-157 Supplier",
        body: "Every supplier in the ranking above is scored on signals we can observe, re-verify and weight consistently, producing a TrustScore capped at 100. The point of a fixed weighting is comparability: two suppliers landing on the same number have demonstrated the same observable behaviours, so the ranking is reproducible rather than editorial.\n\nThe heaviest single signal is a Certificate of Analysis — either hosted on the supplier's own domain or linked from an independent testing laboratory. A domain that resolves and stays live carries a base score, and being able to load the homepage cleanly adds a little more. Clear research-use-only wording contributes, because a vendor that states the terms plainly is demonstrating awareness of the regulatory footing it operates on. So does a contact route that actually works, together with published shipping terms and a site title that identifies the business.\n\nWhat the score deliberately ignores is equally important. Price, advertising spend and catalogue breadth carry no weight at all, so a budget supplier and a premium one are judged by identical criteria. Because verification is repeated on the same weekly cycle as the price sweep, a supplier that quietly stops publishing batch testing loses position rather than coasting on an old assessment.",
        table: {
          header: ["Signal", "Weight", "What it demonstrates"],
          rows: [
            ["Certificate of Analysis", "High", "Independent analytical verification exists"],
            ["Research-use-only language", "Medium", "Regulatory awareness and honest positioning"],
            ["Reachable contact route", "Medium", "Accountability after the sale"],
            ["Shipping information", "Low", "Operational transparency"],
            ["Domain resolves and is live", "Low", "Basic legitimacy of the storefront"],
          ],
        },
      },
      {
        title: "Why Deep Markets Need More Supplier Scrutiny, Not Less",
        body: "BPC-157 is stocked by more UK suppliers than almost any other research peptide, and that depth is easy to mistake for safety. The opposite is true. A deep market with many similar-looking listings is one where a low-quality supplier can hide in plain sight, because the noise of dozens of legitimate vendors makes an individual bad actor harder to spot.\n\nThe structure of the market reinforces this. Most suppliers carry BPC-157 as a core catalogue line rather than a flagship, which means listings are often templated, prices cluster tightly, and differentiation in the visible fields is minimal. When every listing looks the same on the surface, the only things separating them are the verification signals that most buyers never check — which is exactly why the ranking above is built on those signals rather than on price.\n\nA practical consequence is that the supplier-selection decision deserves more weight for BPC-157 than for a thin-market compound. In a market with three suppliers, choosing wrong is obvious. In a market with dozens, choosing wrong is invisible until something fails. The TrustScore column is designed to make the invisible part visible: it does not tell you the material is pure, but it tells you whether the supplier is the kind of operation that makes purity checkable, and that is the distinction that actually predicts a successful order.",
      },
      {
        title: "Comparing a UK Supplier Against an Overseas One",
        body: "Some buyers shop overseas suppliers on the assumption that a lower headline price offsets the friction. Sometimes it does, but the comparison is rarely as one-sided as the price suggests, and for BPC-157 specifically there are several costs that do not appear until after checkout.\n\nThe first is delivery certainty. A UK supplier holding stock dispatches within one to two working days and delivers domestically in a matter of days, with a tracking reference and no customs interaction. An overseas supplier quoting a longer window introduces variable transit times, and a shipment that sits in customs can be delayed by weeks with no way to expedite it. For a compound like BPC-157, where the material is stable as a lyophilised powder but the buyer's handling after arrival matters, an unpredictable arrival date is a genuine inconvenience.\n\nThe second is customs handling. A proportion of overseas shipments attract import charges, and those are typically billed to the recipient rather than absorbed by the vendor, which erodes or erases the price advantage. In some cases the shipment is held pending payment, adding delay on top of cost.\n\nThe third is recourse. If an overseas order arrives damaged, short, or not as described, your practical remedies are considerably weaker than with a UK supplier operating under domestic consumer-adjacent expectations and offering a card payment route. The pattern is consistent across the wider market: for a repair-oriented peptide such as [TB-500](/compounds/tb-500), the same calculus applies, and buyers who prioritise a verifiable UK supply chain typically accept a small price premium in exchange for the certainty that comes with it. Where an overseas listing is dramatically cheaper than the entire UK market, that gap is usually explaining something other than efficiency.",
      },
    ],
    faq: [
      {
        question: "Who currently sells BPC-157 in the UK?",
        answer:
          "The live table above lists every UK supplier ViralPeps currently tracks for BPC-157, ranked by TrustScore. The pool shifts as suppliers launch, stop stocking the compound or change their terms, so the table reflects the most recent weekly sweep rather than a fixed list.",
      },
      {
        question: "Why do some BPC-157 listings never go out of stock?",
        answer:
          "Listings that always show availability alongside a long dispatch window are often drop-shipped from overseas, meaning the supplier never holds the material. That introduces customs handling and delivery risk. UK-held stock typically shows dispatch in one to two working days with a stated carrier.",
      },
      {
        question: "Does a BPC-157 supplier listing include a Certificate of Analysis?",
        answer:
          "Not always. A genuine research listing links a batch-linked COA naming the testing laboratory. Where a supplier states only a purity percentage with no source, that figure is a claim rather than evidence, and it should be treated as such when comparing listings.",
      },
    ],
    sources: [
      { label: "BPC-157 — PubChem compound summary (CAS 137525-51-0)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/9941957" },
      { label: "Multifunctionality and Possible Medical Application of the BPC 157 Peptide — Pharmaceuticals 2025 (PMID 40005999)", url: "https://pubmed.ncbi.nlm.nih.gov/40005999/" },
      { label: "Stable gastric pentadecapeptide BPC 157 heals cysteamine-colitis and colon-colon-anastomosis — J Physiol Pharmacol 2013 (PMID 24304574)", url: "https://pubmed.ncbi.nlm.nih.gov/24304574/" },
    ],
    tableMode: "trust",
    tableHeading: "BPC-157 UK Supplier — Listings Ranked by TrustScore",
    rowLimit: 25,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-bpc-157-peptide",
    title: "Best BPC-157 Peptide UK: Ranked by TrustScore & Purity",
    description:
      "Best BPC-157 peptide UK — how to judge BPC-157 quality by batch testing, traceability and supplier verification, with all UK listings ranked by TrustScore.",
    h1: "Best BPC-157 Peptide UK",
    focusKeyword: "best bpc-157 peptide",
    intro: [
      "The best BPC-157 peptide UK is not a brand and cannot be identified by a label, because the words BPC-157 describe a molecule rather than a product. Two vials carrying the same name can differ in purity, in salt form, in how they were stored between synthesis and dispatch, and in whether anyone independent ever checked. What distinguishes a better BPC-157 listing from a worse one is therefore not the name on the vial but the evidence that accompanies it.",
      "This page sets out what that evidence looks like and ranks the UK listings ViralPeps tracks by TrustScore — a composite of verification signals including Certificate of Analysis availability, contactability, research-use-only compliance and confirmed domain ownership. The table below is rebuilt weekly from suppliers' own pages, so the ranking reflects their current state rather than a historical assessment.",
      "A word on what TrustScore is not. It does not measure intrinsic chemical quality, because nobody outside a laboratory can — there is no home test that establishes the purity of a peptide, and any supplier claiming otherwise is selling you confidence rather than evidence. What TrustScore measures is whether a supplier behaves in the ways that make quality checkable: publishing batch-linked testing, answering questions, labelling correctly and controlling their own domain.",
      "All content is educational and presented for research reference. BPC-157 is not approved for human use in the UK and is supplied under research-use-only terms. Headline pricing and the full supplier market are on the [**BPC-157 price comparison hub →**](/compounds/bpc-157).",
    ],
    sections: [
      {
        title: "What Actually Makes One BPC-157 Better Than Another",
        body: "Four factors separate a well-run BPC-157 listing from a weak one, and none of them are visible in the compound's name.\n\nThe first is analytical transparency. A Certificate of Analysis from a named laboratory, tied to the specific batch number you receive, is the only mechanism a buyer has for knowing what is in the vial. Purity figures without a named source are unfalsifiable and should carry no weight.\n\nThe second is form and consistency. BPC-157 is supplied as a lyophilised acetate salt, and a blend with another peptide — such as the common BPC-157 and TB-500 combination — is a different preparation from the single compound. A supplier who is precise about which one they are selling, and consistent about it between batches, is doing something the vague supplier is not.\n\nThe third is handling. Peptides are sensitive to heat, moisture and light. A supplier who stores and dispatches properly — cold, dry, sealed, batch-labelled — preserves the material. A supplier who does not can degrade an otherwise excellent batch before it reaches you, and there is nothing in the listing price that reveals which is which.\n\nThe fourth is accountability. A reachable contact route and an identifiable business mean that a problem has somewhere to go. That is a quality attribute in its own right, because it changes the supplier's incentives before the order rather than only after.",
        list: [
          "A batch-linked Certificate of Analysis naming the laboratory — the only verifiable quality signal available",
          "Precise description of the compound form, distinguishing BPC-157 acetate from combination blends",
          "Cold, dry, light-protected storage and dispatch, with batch labelling",
          "A reachable contact route and an identifiable business behind the storefront",
          "Consistent listing data over time, rather than figures that change without explanation",
        ],
      },
      {
        title: "How the BPC-157 TrustScore Ranking Works",
        body: "The ranking above is not a review and not a popularity table — it is the output of a fixed scoring model applied identically to every supplier ViralPeps tracks. Each vendor accumulates points from observable signals, the total is capped at 100, and the order falls out of the arithmetic rather than an editor's preference. That matters because it means the same inputs always produce the same order, so a supplier's movement up or down the table is always traceable to something specific they did or stopped doing.\n\nThe dominant input is independent analysis: a Certificate of Analysis hosted on the supplier's own site, or linked to a named testing laboratory. Everything else is secondary. A storefront that resolves, a homepage that loads without error, plain research-use-only wording, a contact route that reaches a person, published shipping terms and a business-identifying site title each add a smaller increment.\n\nThree things carry no weight whatsoever. Price is excluded, so the ranking says nothing about cheapness and should never be read as a value judgement. Marketing spend and catalogue size are excluded, so a large vendor and a small one compete on the same footing. And because scoring is refreshed on the weekly sweep rather than granted once, a supplier who lets their analytical transparency lapse will drop at the next update — the score tracks present behaviour, not past reputation.",
      },
      {
        title: "The Research Context Behind BPC-157",
        body: "BPC-157's standing in the research literature is what makes the quality question worth asking at all. The pentadecapeptide was isolated from a fragment of human gastric juice protein and studied for decades by a Zagreb-based research group, which produced an unusually broad body of preclinical work spanning gastrointestinal protection, tendon and ligament healing, and vascular recruitment.\n\nThe mechanistic picture that emerged centres on angiogenesis. A 2017 study in the Journal of Molecular Medicine linked BPC-157's pro-angiogenic activity to VEGFR2 activation and up-regulation, and later reviews grouped it with standard angiogenic growth factors in gastrointestinal, tendon, ligament, muscle and bone healing models. Separate work described cytoprotective effects against NSAID-induced gastrointestinal injury, and a 2019 study reported improved healing after spinal cord injury in rats.\n\nIt is worth being precise about the evidentiary status. The published literature is overwhelmingly preclinical — animal models and in-vitro work — and although BPC-157 reached early human trials in inflammatory bowel disease under the PL 14736 designation, the compound is not an approved medicine anywhere. A 2026 review framed it explicitly as an investigational peptide with unresolved biopharmaceutical and translational challenges. That is a real and growing research area, and it is exactly the profile that attracts counterfeit listings: a compound with genuine scientific credibility, a memorable name and a buyer base that cannot verify material. Related repair-oriented peptides follow the same verification logic — the [GHK-Cu comparison hub](/compounds/ghk-cu) applies identical criteria, which makes cross-comparison between compounds meaningful rather than apples-to-oranges.",
      },
    ],
    faq: [
      {
        question: "What is the best BPC-157 peptide to buy in the UK?",
        answer:
          "There is no single best brand — BPC-157 describes a molecule, not a proprietary product. The listing that is best for your research is the one where the supplier publishes a batch-linked Certificate of Analysis, states the compound form precisely, handles the material properly and can be contacted. The table above ranks tracked UK suppliers on exactly those signals.",
      },
      {
        question: "How can I tell if BPC-157 is high quality?",
        answer:
          "You cannot verify purity at home. The only reliable route is a Certificate of Analysis from a named laboratory tied to the batch number on the vial you receive, plus a supplier who handles the material correctly. Any claim of quality that is not backed by batch-linked analytical documentation should be discounted.",
      },
      {
        question: "Does a higher TrustScore mean better BPC-157?",
        answer:
          "It means the supplier has demonstrated more of the observable signals that make quality checkable — analytical transparency, accountability, compliance and operational legitimacy. It does not measure the compound itself, which no external score can, but it is the strongest available proxy for whether the material you receive will be what it claims.",
      },
      {
        question: "Is BPC-157 approved for human use?",
        answer:
          "No. BPC-157 is not an approved medicine in the UK or elsewhere. Its published literature is largely preclinical, and the early human trials in inflammatory bowel disease did not lead to regulatory approval. Research suppliers sell it strictly for laboratory and educational use under research-use-only terms.",
      },
    ],
    sources: [
      { label: "BPC-157 — PubChem compound summary (CAS 137525-51-0)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/9941957" },
      { label: "Therapeutic potential of pro-angiogenic BPC157 is associated with VEGFR2 activation — J Mol Med 2017 (PMID 27847966)", url: "https://pubmed.ncbi.nlm.nih.gov/27847966/" },
      { label: "BPC 157 and Standard Angiogenic Growth Factors — Curr Pharm Des 2018 (PMID 29998800)", url: "https://pubmed.ncbi.nlm.nih.gov/29998800/" },
      { label: "Emerging Use of BPC-157 in Orthopaedic Sports Medicine: A Systematic Review — HSS J 2025 (PMID 40756949)", url: "https://pubmed.ncbi.nlm.nih.gov/40756949/" },
    ],
    tableMode: "trust",
    tableHeading: "Best BPC-157 Peptide UK — Ranked by TrustScore",
    rowLimit: 25,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
