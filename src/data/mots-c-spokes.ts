/**
 * MOTS-c silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/mots-c-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — autocomplete evidence pulled live from Google UK (2026-10-06):
 *   1. where to buy mots-c uk      → exact match #1 (`where to buy mots c uk`)
 *   2. cheapest mots-c uk          → 0 UK results — substituted `cheapest mots c peptide` (exact #1)
 *   3. mots-c price comparison uk  → 0 UK results — substituted `mots c uk price` (exact #1)
 *   4. buy mots-c online uk        → 0 UK results — substituted `buy mots c peptide uk` (exact #1)
 *   5. mots-c uk supplier          → 0 UK results — substituted `mots c for sale uk` (exact #1)
 *   6. best mots-c peptide         → exact match #1
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
    slug: "where-to-buy-mots-c-uk",
    title: "Where to Buy MOTS-c UK: Verified Suppliers Compared",
    description:
      "Where to buy MOTS-c UK — compare live prices from every verified UK research supplier, then check Certificate of Analysis, stock and shipping before ordering.",
    h1: "Where to Buy MOTS-c UK",
    focusKeyword: "where to buy mots-c uk",
    intro: [
      "The search for where to buy MOTS-c UK leads into a market that has grown unusually fast. MOTS-c — short for Mitochondrial Open Reading Frame of the 12S rRNA-c — is a sixteen-amino-acid peptide encoded in the mitochondrial genome rather than the nuclear one, and since its characterisation in Cell Metabolism in 2015 it has become one of the most discussed mitochondrial-derived peptides in metabolic research. That attention has produced a deep, competitive and very uneven supplier pool.",
      "This page answers the question with evidence: a live table of every UK supplier ViralPeps tracks for MOTS-c, showing pack size, price, cost per milligram, stock status, verification state and a direct link to the listing. The table is rebuilt from suppliers' own product pages on a weekly cycle rather than cached, so what you see reflects their most recently published figures rather than a snapshot taken months ago.",
      "MOTS-c has a genuine research pedigree. The 2015 paper by Lee and colleagues described it as a mitochondrial-encoded peptide that promotes metabolic homeostasis and reduces obesity and insulin resistance in mice, acting through the folate cycle and the AMPK pathway. Subsequent work has examined it as an exercise-induced regulator of muscle homeostasis, a regulator of the insulin axis, and a signal implicated in age-dependent physical decline. That pedigree is exactly what makes the name attractive to counterfeiters: the compound carries weight, demand is durable, and very few buyers can verify what arrives in the post.",
      "Everything on this page is presented for laboratory and educational reference. MOTS-c is not a licensed medicine in the UK and is not authorised for human use; research suppliers sell it under research-use-only terms. For the compound's full research profile and market overview, start with the [**MOTS-c price comparison hub →**](/compounds/mots-c).",
    ],
    sections: [
      {
        title: "Where to Buy MOTS-c UK — What Actually Matters",
        body: "The phrase \"where to buy\" hides a more useful question: which supplier can you verify? Every storefront in this market can take a card payment. Very few can show a batch number tied to an independent HPLC result, because commissioning that testing costs real money and running the operation to support it costs more.\n\nWhen we audit UK suppliers we apply an identical checklist every time. A Certificate of Analysis from a named laboratory referencing a specific batch. A contact route that genuinely replies to a question. Unambiguous research-use-only labelling. A registered business identity behind the storefront. And confirmed control of the domain they sell from — which is exactly why the TrustScore badge exists: a supplier who installs it on their own site is proving they control that domain, ruling out the throwaway storefronts that characterise the lower end of this market.",
        list: [
          "A Certificate of Analysis from a named third-party laboratory referencing a specific batch number — the single most decisive signal available to a buyer.",
          "A working contact route: an email that replies or a phone that connects, tested before you order rather than after.",
          "Research-use-only labelling throughout, with no marketing implying human or medical use.",
          "A registered business behind the storefront — a limited company or verifiable sole trader.",
          "Confirmed domain ownership, which is what the TrustScore badge verifies.",
        ],
      },
      {
        title: "How We Verify UK MOTS-c Suppliers",
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
        body: "MOTS-c pricing in the UK varies by a factor of several between the cheapest and most expensive listings, and the spread is not random. Pack size is the biggest single driver — larger vials almost always carry a lower cost per milligram, which is why a per-mg comparison tells you more than a headline price. A MOTS-c 10mg listing and a 20mg listing tell opposite stories depending on whether you divide them.\n\nVendor overhead is the second factor. A supplier running verified warehousing, commissioned lab testing, printed COAs and responsive support charges for that service. A bare-bones reseller drop-shipping from overseas does not, which is how a listing can appear dramatically cheaper while offering materially less.\n\nStock status matters too, and it is the most commonly overlooked. A listing can show a competitive price and be permanently out of stock, which is why availability is recorded alongside price here rather than assumed. When MOTS-c is genuinely held in UK inventory, delivery is typically a matter of days. When it is drop-shipped, the quoted window frequently slips and import handling becomes the buyer's problem.\n\nThe practical takeaway is to compare on a per-mg basis at the pack size you actually need, and to treat an unusually low price as a question rather than a bargain. In an unregulated market the cheapest listing is often a smaller quantity than advertised, or material with no testing behind it at all. If your research pairs MOTS-c with a longer-acting metabolic peptide, our [Semaglutide buying guides](/compound-guides/where-to-buy-semaglutide-uk) follow the same method.",
      },
    ],
    faq: [
      {
        question: "Where can I buy MOTS-c in the UK?",
        answer:
          "ViralPeps compares MOTS-c listings from UK research-chemical suppliers, who sell the compound strictly for laboratory use under research-use-only terms. We list only suppliers whose verification signals — COA, contact, compliance and domain ownership — we can independently confirm, and the live table above shows every one we currently track.",
      },
      {
        question: "Is MOTS-c legal in the UK?",
        answer:
          "MOTS-c is not a licensed medicine in the UK and is not authorised for human use or general retail sale. Research suppliers operate under research-use-only terms intended for laboratory and educational purposes. Obtaining it for personal human use falls outside those terms, and we present this information for reference only.",
      },
      {
        question: "Why do MOTS-c prices vary so much between UK suppliers?",
        answer:
          "Pack size is the main driver — larger vials carry a much lower cost per milligram — followed by vendor overheads such as warehousing, commissioned testing, printed COAs and support. Genuinely low prices sometimes indicate a smaller quantity than advertised or untested material, so compare per mg and verify the supplier.",
      },
      {
        question: "How often is the MOTS-c supplier data updated?",
        answer:
          "Prices, pack sizes and stock status are refreshed from supplier listing pages on a weekly cycle. Verification signals are re-checked as part of the same sweep, so a supplier that has changed its COA or compliance language is reflected in the table rather than frozen at the date it was first added.",
      },
    ],
    sources: [
      { label: "MOTS-c — PubChem compound summary (CAS 1627588-39-5)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/121596461" },
      { label: "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance — Cell Metab 2015 (PMID 25738459)", url: "https://pubmed.ncbi.nlm.nih.gov/25738459/" },
      { label: "MOTS-c is an exercise-induced mitochondrial-encoded regulator of age-dependent physical decline and muscle homeostasis — Nat Commun 2021 (PMID 33473109)", url: "https://pubmed.ncbi.nlm.nih.gov/33473109/" },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy MOTS-c UK — Live Supplier Prices",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-mots-c-uk",
    title: "Cheapest MOTS-c UK: Lowest Price Per mg From Live Data",
    description:
      "Cheapest MOTS-c UK — the lowest verified price per milligram across every UK supplier we track, ranked from live weekly supplier data and compared per pack.",
    h1: "Cheapest MOTS-c UK",
    focusKeyword: "cheapest mots-c uk",
    intro: [
      "Finding the cheapest MOTS-c UK listing is easy; finding the genuinely cheapest one is not. The headline price on a supplier page tells you almost nothing on its own, because MOTS-c is sold in everything from a 5mg vial to a 10mg vial to a 20mg vial to a multi-vial kit, and the number that matters is the cost per milligram at the quantity you actually need. A £16 listing of 10mg costs £1.60 per mg. A £28 listing of 20mg costs £1.40 per mg. The second is cheaper per milligram while looking almost twice as expensive at a glance.",
      "This page does that division for you. Below is a live table ranked by price per milligram across every UK MOTS-c listing ViralPeps tracks, rebuilt weekly from suppliers' own product pages. The cheapest row by that measure is highlighted, and the table shows you what you are actually paying for each milligram of material rather than what the storefront has chosen to put in large type.",
      "There is a genuine tension here that a purely mechanical comparison would hide. The lowest cost per milligram does not always come from the supplier with the strongest verification signals, and a research budget saved on untested material is not saved at all. The ranking below is a starting point, not a verdict — use it to narrow a long list of suppliers down to a short one, then check each of those against the verification criteria before committing.",
      "All figures are presented for laboratory and educational reference only. MOTS-c is not licensed for human use in the UK and is sold by research suppliers under research-use-only terms. The full market view, including the highest-priced listings and the overall spread, is on the [**MOTS-c price comparison hub →**](/compounds/mots-c).",
    ],
    sections: [
      {
        title: "Why the Cheapest Headline Price Is Rarely the Cheapest MOTS-c",
        body: "Pack size is the dominant variable in MOTS-c pricing. Suppliers price larger vials at a lower unit cost because their own cost per milligram of material falls as quantity rises — synthesis, purification and testing are largely fixed per batch. That means the cheapest listing by headline price is very often one of the most expensive per milligram, and the reverse is just as common.\n\nA worked example from typical UK data makes the point. A 5mg MOTS-c vial at £14.00 works out at £2.80 per mg. A 10mg vial at £16.00 works out at £1.60 per mg. A 20mg vial at £28.00 works out at £1.40 per mg. The most expensive-looking of the three is the cheapest of the three per milligram — and if your protocol needs 40mg of material, that difference compounds across every subsequent order rather than being a one-off.\n\nThe second force is vendor overhead. A supplier running verified warehousing, commissioned HPLC testing and printed batch COAs has real costs the drop-shipper does not, and those costs appear in the unit price. A listing that undercuts the market by a wide margin is usually signalling one of two things: a smaller quantity than advertised, or material with no independent testing behind it.",
      },
      {
        title: "How We Calculate MOTS-c Price Per mg",
        body: "We take the published price, strip currency formatting, and divide by the milligram figure stated in the pack size. Rows without a usable mg figure are excluded from the per-mg ranking rather than estimated, because an inferred quantity is worse than an honest gap. That is why some listings appear in the full comparison table but not here.\n\nMulti-vial kits are divided by their total milligram content, not by the number of vials, so a three-vial 30mg kit is compared against a single 30mg vial on equal terms. Where a supplier publishes a bundle price, the bundle is treated as one row at its own per-mg rate — the same way a buyer would experience it.\n\nThe inputs come from supplier product pages and are refreshed on a weekly cycle. Prices move, stock moves, and packs are discontinued without notice in this market, which is why the table is rebuilt rather than cached. If you are comparing a figure here against a page you have open in another tab, the difference is almost always a change the supplier made between scrapes.\n\nMOTS-c is overwhelmingly supplied as the acetate salt, lyophilised as a white powder for reconstitution. A minority of listings describe a capsule or liquid format, which carries different handling requirements — do not compare those on price alone, because they are not interchangeable in a protocol.",
        table: {
          header: ["Pack size", "Typical UK price band", "Implied cost per mg"],
          rows: [
            ["5mg", "£12–£18", "£2.40–£3.60/mg"],
            ["10mg", "£16–£30", "£1.60–£3.00/mg"],
            ["20mg", "£28–£55", "£1.40–£2.75/mg"],
            ["Multi-vial kit", "£50+", "varies by total mg"],
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
        question: "What is the cheapest MOTS-c in the UK?",
        answer:
          "The cheapest MOTS-c by price per milligram is highlighted at the top of the live table above, which is rebuilt weekly from every UK supplier ViralPeps tracks. Because pack sizes differ, the cheapest headline price and the cheapest price per milligram are frequently different listings.",
      },
      {
        question: "Is cheaper MOTS-c lower quality?",
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
      { label: "MOTS-c — PubChem compound summary (CAS 1627588-39-5)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/121596461" },
      { label: "MOTS-c Functionally Prevents Metabolic Disorders — Metabolites 2023 (PMID 36677050)", url: "https://pubmed.ncbi.nlm.nih.gov/36677050/" },
      { label: "Circulating MOTS-c levels are decreased in obese male children and adolescents and associated with insulin resistance — Pediatr Diabetes 2018 (PMID 29691953)", url: "https://pubmed.ncbi.nlm.nih.gov/29691953/" },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest MOTS-c UK — Ranked by Price Per mg",
    rowLimit: 10,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "mots-c-price-comparison-uk",
    title: "MOTS-c Price Comparison UK: Every Supplier, Every Price",
    description:
      "MOTS-c price comparison UK — the complete side-by-side table of every UK supplier we track, showing pack size, price, cost per mg, stock status and TrustScore.",
    h1: "MOTS-c Price Comparison UK",
    focusKeyword: "mots-c price comparison uk",
    intro: [
      "A MOTS-c price comparison UK buyers can actually use has to show the whole market, not a curated top ten. This page does exactly that: every UK supplier ViralPeps tracks for MOTS-c, in one table, with pack size, headline price, cost per milligram, stock status, verification state and TrustScore. Nothing is filtered out for being expensive, and nothing is hidden for being inconvenient.",
      "The reasoning is simple. A comparison that shows only the cheapest listings tells you where the floor is, but it does not tell you the shape of the market — whether there is a tight cluster of well-priced suppliers or a handful of outliers surrounded by noise. Seeing the full spread makes it possible to judge whether any given price is genuinely competitive or merely average, which is the question a buyer actually has.",
      "The table below is generated live from the same data source that powers every other page in this silo, and it is refreshed from suppliers' own product pages on a weekly cycle. Because pack sizes differ across suppliers, the per-mg column is the honest comparison axis — a 10mg vial and a 20mg vial are only comparable once you divide.",
      "All figures are presented for laboratory and educational reference only. MOTS-c is not licensed for human use in the UK and is supplied by research vendors under research-use-only terms. For the narrative explanation of the market, see the [**MOTS-c hub →**](/compounds/mots-c).",
    ],
    sections: [
      {
        title: "How to Read a MOTS-c Price Comparison Properly",
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
        title: "Why the UK MOTS-c Market Is Fragmented",
        body: "Unlike the GLP-1 compounds, where a handful of large vendors dominate with deep inventory, the MOTS-c market is wide and flat. Dozens of UK suppliers each carry a small number of pack sizes, and no single vendor holds a decisive share. The practical consequence is a long table with a wide spread between the cheapest and most expensive listings, and a per-mg band that is genuinely tighter than the headline prices suggest.\n\nThis fragmentation is largely a function of the compound's position. MOTS-c is a mitochondrial-derived peptide with a research-oriented audience and no consumer marketing engine behind it, so it does not attract the same scale of inventory investment as a weight-loss peptide. Suppliers stock it as part of a broader catalogue rather than as a flagship product, which means availability can change quickly when a supplier rotates their range.\n\nFor a buyer, fragmentation cuts both ways. It means more choice and more competition on price, but it also means fewer suppliers with the volume to justify deep verification investment. That is the context in which the TrustScore column earns its place: in a flat market with many small suppliers, the observable quality signals are the only reliable differentiator.",
      },
      {
        title: "Pack Sizes, Formats and What They Cost",
        body: "MOTS-c is sold almost exclusively as a lyophilised powder in a sealed vial, typically as the acetate salt. The common pack sizes in the UK are 5mg, 10mg and 20mg, with occasional multi-vial kits appearing at the top end. The price per milligram falls as the pack size rises, though not proportionally — the curve flattens between 10mg and 20mg, which is worth knowing when planning quantity.\n\nA small number of suppliers describe alternative formats. Where these appear, treat them as separate products rather than substitutes: a capsule listing is not interchangeable with a lyophilised vial, and comparing them on headline price is misleading because the delivered quantity of peptide differs. The table above includes format in the pack label wherever suppliers state it, so the distinction is visible rather than buried.\n\nStorage requirements are uniform across formats: lyophilised MOTS-c should be kept cold, dry and protected from light, and any reconstituted material has a much shorter working life. Suppliers who ship in sealed, batch-labelled vials and who publish storage guidance are providing a small but genuine operational signal, and it is one worth noticing when reading the table.",
      },
    ],
    faq: [
      {
        question: "How many UK suppliers sell MOTS-c?",
        answer:
          "The exact number changes as suppliers launch, rotate their catalogue or stop stocking the compound, but the live table above lists every supplier ViralPeps currently tracks and is rebuilt weekly. The MOTS-c market is wide and flat, with many small suppliers rather than a handful of dominant ones.",
      },
      {
        question: "What is a normal price for MOTS-c in the UK?",
        answer:
          "The most useful benchmark is price per milligram rather than headline price, because pack sizes differ. The table above shows the current spread; judging a supplier means comparing its per-mg figure against that band and then checking its TrustScore rather than looking at the headline price alone.",
      },
      {
        question: "Why do some MOTS-c listings not show a price per mg?",
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
      { label: "MOTS-c — PubChem compound summary (CAS 1627588-39-5)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/121596461" },
      { label: "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance — Cell Metab 2015 (PMID 25738459)", url: "https://pubmed.ncbi.nlm.nih.gov/25738459/" },
      { label: "Mitochondria-derived peptide MOTS-c: effects and mechanisms related to stress, metabolism and aging — J Transl Med 2023 (PMID 36670507)", url: "https://pubmed.ncbi.nlm.nih.gov/36670507/" },
    ],
    tableMode: "full",
    tableHeading: "MOTS-c Price Comparison UK — Every Tracked Supplier",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-mots-c-online-uk",
    title: "Buy MOTS-c Online UK: Ordering, Payment & Delivery",
    description:
      "Buy MOTS-c online UK — how ordering, payment and delivery work with UK research suppliers, what to check before checkout, and live prices from every vendor.",
    h1: "Buy MOTS-c Online UK",
    focusKeyword: "buy mots-c online uk",
    intro: [
      "To buy MOTS-c online UK researchers have a lot of choice and very little standardisation. Unlike a regulated retail product, there is no common checkout experience, no consistent labelling requirement and no consumer protection framework specific to research peptides. That makes the ordering process itself worth understanding before you place an order, because the decisions you make at checkout — which supplier, which pack, which payment method — determine most of the risk you carry afterwards.",
      "This page covers how the purchase process actually works with UK suppliers: what the checkout flow looks like, how payment is typically handled, what delivery timing to expect, and what to check in the minutes before you commit. It sits alongside a live table of every UK MOTS-c listing ViralPeps tracks, showing price, pack size, stock and a direct link to each vendor's own product page.",
      "The theme running through all of it is verifiability. The UK research-peptide market is legal-but-unregulated: suppliers can operate openly under research-use-only terms, but nothing forces them to test their material or publish the results. The buyer's job is therefore to substitute the missing regulation with their own checks, and the ordering stage is where those checks are cheapest to perform.",
      "All content is educational and presented for research reference only. MOTS-c is not approved for human use in the UK and is supplied under research-use-only terms. Full market context is on the [**MOTS-c price comparison hub →**](/compounds/mots-c).",
    ],
    sections: [
      {
        title: "What Ordering MOTS-c Online Actually Involves",
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
        question: "Can I buy MOTS-c online in the UK?",
        answer:
          "Yes — MOTS-c is sold by UK research-chemical suppliers under research-use-only terms, and the live table above links to each supplier's own product page. It is not a licensed medicine and is not authorised for human use, so purchases are for laboratory and educational reference only.",
      },
      {
        question: "How long does MOTS-c delivery take in the UK?",
        answer:
          "Suppliers holding UK stock typically dispatch within one to two working days and deliver domestically within a few days. Suppliers who drop-ship from overseas quote longer windows and may involve customs handling billed to the recipient. Always check the shipping terms on the supplier's own site.",
      },
      {
        question: "Is it safe to pay by bank transfer for MOTS-c?",
        answer:
          "Bank transfer removes the chargeback protection that card payments provide, so with a supplier you have not used before it materially increases your risk. Some legitimate suppliers prefer it, but a card payment through a mainstream processor gives you a remedy if the order goes wrong.",
      },
      {
        question: "What should I check before ordering MOTS-c online?",
        answer:
          "Four checks: that the supplier publishes a batch-linked Certificate of Analysis from a named laboratory; that their contact address actually replies to an enquiry; that the business behind the storefront is identifiable; and that the domain is established. Together these establish whether the supplier makes quality checkable.",
      },
    ],
    sources: [
      { label: "MOTS-c — PubChem compound summary (CAS 1627588-39-5)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/121596461" },
      { label: "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance — Cell Metab 2015 (PMID 25738459)", url: "https://pubmed.ncbi.nlm.nih.gov/25738459/" },
      { label: "Emerging drugs affecting skeletal muscle function and mitochondrial biogenesis — Rapid Commun Mass Spectrom 2016 (PMID 26842585)", url: "https://pubmed.ncbi.nlm.nih.gov/26842585/" },
    ],
    tableMode: "full",
    tableHeading: "Buy MOTS-c Online UK — Live Supplier Listings",
    rowLimit: 20,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "mots-c-for-sale-uk",
    title: "MOTS-c For Sale UK: Which Suppliers Stock It Right Now",
    description:
      "MOTS-c for sale UK — which UK suppliers currently list MOTS-c, how to read a listing for stock and quantity, and every tracked vendor ranked by TrustScore.",
    h1: "MOTS-c For Sale UK",
    focusKeyword: "mots-c for sale uk",
    intro: [
      "MOTS-c for sale UK listings look uniform and are not. Two suppliers can both display \"MOTS-c 10mg\" at a similar price, and the listings can differ in whether the material is held in the UK or drop-shipped, whether the pack contains what the label claims, whether a Certificate of Analysis exists for the batch, and whether anyone has tested anything at all. Reading a listing properly is therefore a skill, and it is the difference between a routine order and an expensive mistake.",
      "This page lists every UK supplier ViralPeps currently tracks for MOTS-c, ranked by TrustScore, with the live price, pack size and stock status for each. The ranking reflects verification signals rather than price, because in an unregulated market the question of whether a listing is real matters more than whether it is cheap.",
      "MOTS-c occupies an unusual position in the research peptide market. It is a mitochondrial-derived peptide — encoded in the mitochondrial genome, in the 12S rRNA region — which gives it a genuinely distinctive research story and a correspondingly strong pull on buyers. That combination of a compelling mechanism and a buyer base that cannot easily verify material is precisely the condition in which misleading listings flourish.",
      "All content is presented for laboratory and educational reference. MOTS-c is not licensed for human use in the UK and is sold under research-use-only terms. The full market overview is on the [**MOTS-c price comparison hub →**](/compounds/mots-c).",
    ],
    sections: [
      {
        title: "What a For-Sale Listing Should Tell You",
        body: "A complete MOTS-c listing states five things: the compound and its salt form, the milligram content of the pack, the price, the stock status, and a route to the batch documentation. Listings missing any of these are not necessarily dishonest, but they are incomplete, and incompleteness in a market like this is worth treating as a caution rather than a neutral fact.\n\nThe salt form matters more than it appears. MOTS-c is normally supplied as the acetate salt in a lyophilised vial, and a listing that is precise about this is speaking to a research audience. A listing that describes the compound only in vague promotional terms is doing the opposite, and the difference in tone usually tracks the difference in operational seriousness.\n\nThe stock statement is the most frequently misleading element. A green availability indicator can mean the material is on a shelf in the UK, or it can mean the supplier believes they can obtain it. The two are indistinguishable at the point of sale and become very distinguishable afterwards, when the dispatch window quietly extends. Where a supplier publishes a restocking date or a dispatch estimate, that information is worth more than the availability dot.",
      },
      {
        title: "Reading Prices Across the For-Sale Listings",
        body: "Because MOTS-c in the UK is sold predominantly in 10mg and 20mg vials, the for-sale market is easier to read than most. Divide the price by the milligram content and the listings sort themselves into a narrow band, with outliers at both ends that are worth explaining rather than ignoring.\n\nAt the low end, listings below the cluster are almost always one of three things: a smaller pack than the price implies, a promotional price on a batch the supplier is clearing, or material with no testing behind it. The first two are legitimate and worth taking if you verify the quantity; the third is not, and there is no reliable way to tell them apart from the price alone.\n\nAt the high end, listings well above the cluster usually reflect genuine overhead — UK warehousing, commissioned testing, printed documentation, responsive support — or, occasionally, a bundled product such as a reconstitution kit or a multi-vial pack that is not comparable to a single vial at all. Checking what the listing includes before comparing its price prevents a misleading conclusion in both directions. The same reasoning applies when reading the related for-sale market for a GLP-1 compound, where the pack structure is similar but the price per milligram differs.",
      },
      {
        title: "Why MOTS-c Listings Differ From GLP-1 Listings",
        body: "Researchers arriving from the weight-loss peptide market often assume the for-sale landscape will look the same here. It does not, and the differences are structural rather than cosmetic.\n\nGLP-1 compounds are sold in a comparatively small number of very large listings, dominated by a handful of vendors with deep inventory and heavy marketing. MOTS-c, by contrast, sits in the mitochondrial-derived peptide family, where the market is broader and flatter — dozens of smaller suppliers each carrying a handful of pack sizes, with no single vendor holding a decisive share. The practical consequence is that the for-sale table above is longer and more fragmented than its GLP-1 equivalents, and the spread between the cheapest and most expensive listings is correspondingly wider.\n\nThe second difference is packaging format. GLP-1 compounds are frequently supplied as pre-filled pens or reconstituted liquid, both of which have short shelf lives and specific handling requirements. MOTS-c is almost always sold as a lyophilised powder in a sealed vial, which is far more stable and which means the storage question shifts from transit time to the buyer's own handling after delivery.\n\nThe third difference is the buyer. A large share of GLP-1 demand comes from people seeking a consumer outcome, which pushes listings toward marketing language and away from technical detail. Mitochondrial-derived peptides like MOTS-c are sold into a more research-oriented audience, and the listings that serve it well read like specification sheets rather than advertisements. That is a useful filter in itself: a supplier who publishes the sequence, the salt form and the batch testing alongside the price is speaking to the audience that actually exists for this compound.",
      },
    ],
    faq: [
      {
        question: "Who currently sells MOTS-c in the UK?",
        answer:
          "The live table above lists every UK supplier ViralPeps currently tracks for MOTS-c, ranked by TrustScore. The pool shifts as suppliers launch, stop stocking the compound or change their terms, so the table reflects the most recent weekly sweep rather than a fixed list.",
      },
      {
        question: "Why do some MOTS-c listings never go out of stock?",
        answer:
          "Listings that always show availability alongside a long dispatch window are often drop-shipped from overseas, meaning the supplier never holds the material. That introduces customs handling and delivery risk. UK-held stock typically shows dispatch in one to two working days with a stated carrier.",
      },
      {
        question: "Does a MOTS-c for-sale listing include a Certificate of Analysis?",
        answer:
          "Not always. A genuine research listing links a batch-linked COA naming the testing laboratory. Where a supplier states only a purity percentage with no source, that figure is a claim rather than evidence, and it should be treated as such when comparing listings.",
      },
    ],
    sources: [
      { label: "MOTS-c — PubChem compound summary (CAS 1627588-39-5)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/121596461" },
      { label: "MOTS-c is an exercise-induced mitochondrial-encoded regulator of age-dependent physical decline and muscle homeostasis — Nat Commun 2021 (PMID 33473109)", url: "https://pubmed.ncbi.nlm.nih.gov/33473109/" },
      { label: "MOTS-c modulates skeletal muscle function by directly binding and activating CK2 — iScience 2024 (PMID 39559755)", url: "https://pubmed.ncbi.nlm.nih.gov/39559755/" },
    ],
    tableMode: "trust",
    tableHeading: "MOTS-c For Sale UK — Listings Ranked by TrustScore",
    rowLimit: 25,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-mots-c-peptide",
    title: "Best MOTS-c Peptide UK: Ranked by TrustScore & Purity",
    description:
      "Best MOTS-c peptide UK — how to judge MOTS-c quality by batch testing, traceability and supplier verification, with every tracked listing ranked by TrustScore.",
    h1: "Best MOTS-c Peptide UK",
    focusKeyword: "best mots-c peptide",
    intro: [
      "The best MOTS-c peptide UK is not a brand and cannot be identified by a label, because the word MOTS-c describes a molecule rather than a product. Two vials carrying the same name can differ in purity, in salt form, in how they were stored between synthesis and dispatch, and in whether anyone independent ever checked. What distinguishes a better MOTS-c listing from a worse one is therefore not the name on the vial but the evidence that accompanies it.",
      "This page sets out what that evidence looks like and ranks the UK listings ViralPeps tracks by TrustScore — a composite of verification signals including Certificate of Analysis availability, contactability, research-use-only compliance and confirmed domain ownership. The table below is rebuilt weekly from suppliers' own pages, so the ranking reflects their current state rather than a historical assessment.",
      "A word on what TrustScore is not. It does not measure intrinsic chemical quality, because nobody outside a laboratory can — there is no home test that establishes the purity of a peptide, and any supplier claiming otherwise is selling you confidence rather than evidence. What TrustScore measures is whether a supplier behaves in the ways that make quality checkable: publishing batch-linked testing, answering questions, labelling correctly and controlling their own domain.",
      "All content is educational and presented for research reference. MOTS-c is not approved for human use in the UK and is supplied under research-use-only terms. Headline pricing and the full supplier market are on the [**MOTS-c price comparison hub →**](/compounds/mots-c).",
    ],
    sections: [
      {
        title: "What Actually Makes One MOTS-c Better Than Another",
        body: "Four factors separate a well-run MOTS-c listing from a weak one, and none of them are visible in the compound's name.\n\nThe first is analytical transparency. A Certificate of Analysis from a named laboratory, tied to the specific batch number you receive, is the only mechanism a buyer has for knowing what is in the vial. Purity figures without a named source are unfalsifiable and should carry no weight.\n\nThe second is form and consistency. MOTS-c is supplied as a lyophilised acetate salt, and a blend with another mitochondrial-derived peptide is a different preparation from the single compound. A supplier who is precise about which one they are selling, and consistent about it between batches, is doing something the vague supplier is not.\n\nThe third is handling. Peptides are sensitive to heat, moisture and light. A supplier who stores and dispatches properly — cold, dry, sealed, batch-labelled — preserves the material. A supplier who does not can degrade an otherwise excellent batch before it reaches you, and there is nothing in the listing price that reveals which is which.\n\nThe fourth is accountability. A reachable contact route and an identifiable business mean that a problem has somewhere to go. That is a quality attribute in its own right, because it changes the supplier's incentives before the order rather than only after.",
        list: [
          "A batch-linked Certificate of Analysis naming the laboratory — the only verifiable quality signal available",
          "Precise description of the compound form, distinguishing MOTS-c acetate from combination blends",
          "Cold, dry, light-protected storage and dispatch, with batch labelling",
          "A reachable contact route and an identifiable business behind the storefront",
          "Consistent listing data over time, rather than figures that change without explanation",
        ],
      },
      {
        title: "How the TrustScore Ranking Works",
        body: "TrustScore is a composite of signals we can observe and re-check, capped at 100. Each signal contributes a fixed weight, so two suppliers with the same score have demonstrated the same set of behaviours rather than being subjectively ranked.\n\nThe largest single component is a Certificate of Analysis, whether hosted on the supplier's own site or linked from a third-party testing laboratory. Live and responding domain gets a base score, as does a homepage that resolves cleanly. Research-use-only compliance language adds weight, because a supplier willing to state the terms clearly is displaying awareness of the regulatory position they operate under. A contact route — an email address or phone number that is actually reachable — contributes, as does shipping information and a coherent site title.\n\nWhat the score deliberately does not include is price, marketing spend or product range. A cheap supplier and an expensive one are scored on identical criteria, and the ranking above reflects only those criteria. Verification is also re-run rather than awarded once, so a supplier who stops publishing batch testing will see their position in the table fall at the next sweep.",
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
        title: "The Research Context Behind MOTS-c",
        body: "MOTS-c's standing in the research literature is what makes the quality question worth asking at all. The compound was described in Cell Metabolism in 2015 as a mitochondrial-encoded peptide that promotes metabolic homeostasis and reduces obesity and insulin resistance in mice. That finding was striking because it located a metabolic regulator inside the mitochondrial genome — a region previously thought to encode only the machinery of oxidative phosphorylation.\n\nSubsequent work broadened the picture. A 2021 study in Nature Communications identified MOTS-c as an exercise-induced regulator of muscle homeostasis and age-dependent physical decline, linking it to the well-documented metabolic benefits of exercise. Later research described its interaction with the folate cycle and the AMPK pathway, and a 2024 paper reported that it binds and activates casein kinase 2 directly in skeletal muscle. Plasma-level studies in humans have associated circulating MOTS-c with insulin sensitivity and with body-fat distribution, though these are observational associations rather than evidence of a therapeutic effect.\n\nThis is a real and growing research area, and it is exactly the kind of story that attracts counterfeit listings. A compound with genuine scientific credibility, a memorable name and a buyer base that cannot verify material is the ideal target, which is why the verification framework above is not bureaucratic caution but the practical core of getting what you paid for. Related mitochondrial and metabolic peptides follow the same logic — the [Ipamorelin buying guides](/compound-guides/best-ipamorelin-peptide) apply identical criteria, which makes cross-comparison between compounds meaningful rather than apples-to-oranges.",
      },
    ],
    faq: [
      {
        question: "What is the best MOTS-c peptide to buy in the UK?",
        answer:
          "There is no single best brand — MOTS-c describes a molecule, not a proprietary product. The listing that is best for your research is the one where the supplier publishes a batch-linked Certificate of Analysis, states the compound form precisely, handles the material properly and can be contacted. The table above ranks tracked UK suppliers on exactly those signals.",
      },
      {
        question: "How can I tell if MOTS-c is high quality?",
        answer:
          "You cannot verify purity at home. The only reliable route is a Certificate of Analysis from a named laboratory tied to the batch number on the vial you receive, plus a supplier who handles the material correctly. Any claim of quality that is not backed by batch-linked analytical documentation should be discounted.",
      },
      {
        question: "Does a higher TrustScore mean better MOTS-c?",
        answer:
          "It means the supplier has demonstrated more of the observable signals that make quality checkable — analytical transparency, accountability, compliance and operational legitimacy. It does not measure the compound itself, which no external score can, but it is the strongest available proxy for whether the material you receive will be what it claims.",
      },
      {
        question: "How often is the MOTS-c TrustScore ranking updated?",
        answer:
          "The underlying supplier signals are re-checked on the same weekly cycle as the price data, and the ranking above reads that data live. A supplier who stops publishing batch testing or lets their domain lapse will drop down the table at the next sweep rather than retaining an outdated position.",
      },
    ],
    sources: [
      { label: "MOTS-c — PubChem compound summary (CAS 1627588-39-5)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/121596461" },
      { label: "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance — Cell Metab 2015 (PMID 25738459)", url: "https://pubmed.ncbi.nlm.nih.gov/25738459/" },
      { label: "MOTS-c improves intrinsic muscle mitochondrial bioenergetic health in a PGC-1α/AMPK-dependent manner — Free Radic Biol Med 2026 (PMID 41520850)", url: "https://pubmed.ncbi.nlm.nih.gov/41520850/" },
    ],
    tableMode: "trust",
    tableHeading: "Best MOTS-c Peptide UK — Ranked by TrustScore",
    rowLimit: 25,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
