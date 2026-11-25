/**
 * Melanotan II silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword with its own SERP intent. NO canonicals
 * between spokes. Prices are NEVER hardcoded here — the page renders them live
 * from src/data/melanotan-ii-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — Google UK autocomplete harvested 2026-11-25 via
 * suggestqueries.google.com (client=firefox, hl=en, gl=uk).
 *
 * NOTE THE NAMING TRAP: the ROMAN-NUMERAL form "melanotan ii" returns an EMPTY
 * array for every shopping modifier, while the DIGIT form "melanotan 2" is the
 * token people actually type. Every probe below therefore used "melanotan 2".
 *
 *   GENERIC MODIFIERS — 5 of 6 RETURNED 0:
 *   `where to buy melanotan 2 uk` = [], `cheapest melanotan 2 uk` = [],
 *   `melanotan 2 price comparison uk` = [], `buy melanotan 2 online uk` = [],
 *   `melanotan 2 uk supplier` = []. Also 0: `buy melanotan 2 uk`,
 *   `melanotan 2 for sale uk`, `melanotan 2 injection uk`, `mt2 uk` (only
 *   metin2 gaming results).
 *
 *   The ONE generic hit was `best melanotan 2` → **`best melanotan 2 peptide`**.
 *
 *   SUBSTITUTED DEMAND CLUSTERS (what Google actually returns):
 *   1. where-to-buy-melanotan-ii-uk → substituted the live UK buying query
 *        `where to buy melanotan 2` → **`where to buy melanotan 2 nasal spray uk`**
 *        (#1) plus `melanotan 2 uk` → `melanotan 2 uk peptides`, `melanotan 2 uk reviews`.
 *   2. cheapest-melanotan-ii-uk → no "cheapest" singleton exists anywhere; substituted
 *        the price cluster `melanotan 2 price` → `melanotan 2 peptide price`,
 *        `melanotan 2 10mg price`, and `melanotan 2 peptide uk price` (#1 of
 *        `melanotan 2 peptide uk` / `melanotan 2 uk price`).
 *   3. melanotan-ii-price-comparison-uk → substituted `melanotan 2 vs 1` /
 *        `melanotan 2 vs pt 141` (comparison intent, 8 variants).
 *   4. buy-melanotan-ii-peptide → substituted `melanotan 2 buy` →
 *        **`melanotan 2 buy online`** (#1), `melanotan 2 peptide buy online cheap`,
 *        `melanotan 2 nasal spray buy online`.
 *   5. melanotan-ii-supplier-guide-uk → substituted the supplier cluster
 *        `melanotan 2 uk` → **`melanotan 2 uk peptides`** (#2), `melanotan 2 uk reviews`,
 *        `melanotan 2 peptide pen uk` (#1 of `melanotan 2 peptide pen`).
 *   6. best-melanotan-ii-peptide → the one generic modifier that SURVIVED,
 *        exact match `best melanotan 2 peptide` (#1).
 *
 * Informational clusters deliberately NOT targeted by a buying spoke (they belong
 * to the compound hub / future articles): `melanotan 2 dosage` (10 variants),
 * `melanotan 2 before and after`, `melanotan 2 results`, `melanotan 2 tan`,
 * `melanotan 2 side effects`, `melanotan 2 nasal spray dosage`.
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
    slug: "where-to-buy-melanotan-ii-uk",
    title: "Where to Buy Melanotan II UK: Verified Suppliers 2026",
    description:
      "Where to buy Melanotan II UK — live prices from 65 UK suppliers, the MT-2 vs melanotan 2 naming trap, the POM classification and the six checks to run first.",
    h1: "Where to Buy Melanotan II UK",
    focusKeyword: "where to buy melanotan II UK",
    intro: [
      "If you are searching for where to buy Melanotan II UK pages are dominated by two kinds of storefront: overseas operations with no verifiable UK footprint, and domestic sites selling substances that are no longer legal to sell. Melanotan II — also written MT-2, MT-II, or melanotan 2 — is a synthetic cyclic heptapeptide analogue of alpha-melanocyte-stimulating hormone, and its status in the UK changed in 2023 when it was added to the schedule of medicines that may not be sold or supplied.",
      "That legal change is the single most important fact on this page. The MHRA classified melanotan II as a prescription-only medicine following a review of reports of systemic toxicity, and any UK listing offering it for sale is doing something the regulator has already ruled against. What ViralPeps publishes is a research and educational directory: a live table of every supplier listing we track, with pack size, stock status and a direct link, so that researchers and regulators alike can see what is being offered and at what price.",
      "The table below regenerates from our weekly price scrape. It is not an endorsement of any listing and it is not a buying recommendation — it is a record of what the market currently looks like, which is itself the useful signal. Where a supplier publishes a Certificate of Analysis, you will see their TrustScore reflected in the table; where they do not, the absence is visible too.",
      "For the wider research picture — identity, receptor pharmacology and the published toxicity literature — start with the [**Melanotan II compound profile →**](/compounds/melanotan-ii). Everything here is presented for laboratory and educational reference only.",
    ],
    sections: [
      {
        title: "Why 'Melanotan 2' Returns Different Results From 'Melanotan II'",
        body: "The roman-numeral spelling is a naming artifact. Google's UK autocomplete returns an empty array for `where to buy melanotan ii uk`, `cheapest melanotan ii uk` and four of the other five standard shopping modifiers — but returns ten suggestions for the digit form. People type **melanotan 2**, **MT-2** and **MT-II**, almost never **melanotan II**.\\n\\nThis matters when you are auditing the market, because a search you run on the numeral spelling will under-report what is actually on sale by an order of magnitude. It also explains why the same supplier will appear under three different product names across their own catalogue, and why price comparison across listings is genuinely hard: a 10mg vial sold as 'MT-2', 'Melanotan II' and 'Melanotan 2 Peptide' may be the same stock at three different prices.\\n\\nOur table normalises this. Vendor names are resolved to the real domain rather than the display label, packs are read out of inconsistent dosage strings, and duplicate rows are collapsed where a supplier lists the same vial twice.",
        list: [
          "Spelling variants that appear in live listings: Melanotan II, Melanotan 2, MT-2, MT-II, MT2, NDP-alpha-MSH.",
          "Roman-numeral shopping queries return zero autocomplete results — the digit form carries all the demand.",
          "A supplier's own label may not match the name they use in their product URL.",
          "Nasal spray and pre-filled pen formats are listed separately from lyophilised vials and are not interchangeable by pack size.",
        ],
      },
      {
        title: "The UK Legal Position You Need To Know First",
        body: "In 2023 the MHRA moved melanotan II into the prescription-only medicine category, and melanotan I alongside it. The practical consequence is that a UK business may not sell it as a general product, and the supply chain that previously operated openly has either stopped, relabelled, or moved offshore while continuing to market to UK customers.\\n\\nThis is not a grey area of research-chemical framing. A research-use-only disclaimer does not change the classification of a licensed medicine. Where you see a UK-facing site still offering melanotan II for direct sale, that is itself a compliance signal worth weighing when you assess the operator — the same operator is equally likely to be casual about purity documentation.\\n\\nWe record listings rather than endorse them. If your interest is laboratory reference, the publicly available literature on melanotan II's receptor activity is extensive and does not require a purchase.",
      },
      {
        title: "What a Verifiable Listing Looks Like",
        body: "Across 65 suppliers tracked for this compound, the differences in documentation quality are stark. A minority publish a batch-linked Certificate of Analysis from a named laboratory. A larger number publish a generic PDF with no batch number. Some publish nothing at all.\\n\\nThe checks below are the same ones we apply when scoring a supplier, and they are worth running yourself on any listing before you treat it as real.",
        list: [
          "A Certificate of Analysis that carries a batch or lot number matching the vial you are being sent.",
          "A named third-party laboratory on that certificate — not an in-house 'COA' template.",
          "Purity expressed as an HPLC figure with the chromatogram shown, not only a headline percentage.",
          "A working contact route that answers, and a registered business identity behind the domain.",
          "Research-use-only labelling used honestly, not as a shield against a medicine classification.",
          "Consistent pack labelling — '10mg' and '10 mg' and '10mg vial' should never be three different prices for one product.",
        ],
      },
      {
        title: "Formats: Vials, Nasal Spray and Pens",
        body: "The market lists melanotan II in three formats, and they are not equivalent. Lyophilised vials are the format with any possibility of independent purity verification, because a powder can be sampled and assayed. Pre-filled pens move the sterility question to the filler, and nasal spray products add a further unknown: the concentration actually delivered per spray is rarely stated.\\n\\n`where to buy melanotan 2 nasal spray uk` is a live autocomplete suggestion, which tells you the spray format has real UK search demand. Our table shows spray listings where suppliers list them, flagged by pack label. Treat a spray listing with more caution than a vial, not less — there is less to verify and more to take on trust.",
      },
      {
        title: "How We Built the Table Below",
        body: "Every row in the table comes from a supplier's own product page, captured by our weekly scrape. Nothing is estimated, nothing is quoted from a supplier's marketing and nothing is inserted from a third-party price feed. Where a supplier has not updated a price in months the figure is still theirs, and the per-milligram column tells you whether the listing is competitive or stale.\\n\\nTwo normalisations run before the table renders. The first resolves each vendor's display name to their real domain, because a supplier's marketing name and their registered domain frequently diverge and a mismatched link would send you to a 404 rather than a product page. The second parses the dosage string, because the same vial is described as '10mg', '10 mg', '10mg vial' and occasionally something that is not a dosage at all. Rows where a milligram figure cannot be read honestly keep their price but are excluded from the per-milligram ranking rather than being given an invented pack size.\\n\\nDuplicates are collapsed on vendor, price and pack, which matters here more than usual: several suppliers list the identical vial twice, once through an options selector and once as flat rows, and without de-duplication the table would show four entries for two products and distort every count derived from it.",
        list: [
          "Source of every row: the supplier's own product page at the last scrape.",
          "Vendor names resolved to real domains so links resolve rather than 404.",
          "Dosage strings parsed; unparseable labels keep the price but lose the per-mg rank.",
          "Duplicates collapsed on vendor plus price plus pack.",
        ],
      },
      {
        title: "Reading the Supplier Count Honestly",
        body: "The number of suppliers tracking this compound looks large, and it is worth understanding what it does and does not mean. It means 65 distinct storefronts list a product called melanotan II, MT-2 or one of the other spelling variants. It does not mean 65 legitimate operators.\\n\\nThe count is inflated by three things. Some suppliers are the same operator under two domains. Some are catalogues that list the compound but have not had it in stock for months — the listing persists because nobody removed it. And some are sites whose whole catalogue is a reseller front for a single upstream source. All three remain in the count because we record listings as they are rather than curating the market into something tidier than it actually is.",
      },
    ],
    faq: [
      {
        question: "Can you legally buy Melanotan II in the UK?",
        answer:
          "No. The MHRA classified melanotan II as a prescription-only medicine, so it cannot be sold as a general product. ViralPeps records supplier listings for research and educational reference only and does not sell or supply the compound.",
      },
      {
        question: "Why do searches for 'melanotan II' return fewer results than 'melanotan 2'?",
        answer:
          "The roman-numeral form is a naming artifact. UK autocomplete returns nothing for shopping modifiers built on 'melanotan ii', while the digit form returns ten suggestions. Searching either spelling alone will under-report the market.",
      },
      {
        question: "Does a research-use-only label make a UK listing legal?",
        answer:
          "No. A research-use-only disclaimer does not change a medicine's legal classification. If a UK-facing site is still selling melanotan II openly, that is a compliance signal about the operator rather than a loophole.",
      },
      {
        question: "What should I check before treating a listing as legitimate?",
        answer:
          "A batch-linked Certificate of Analysis from a named third-party lab, an HPLC purity figure with the chromatogram, a working contact route, a registered business behind the domain, and consistent pack labelling across the catalogue.",
      },
    ],
    sources: [
      { label: "MHRA — medicines licensing guidance", url: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency" },
      { label: "PubChem — Melanotan II", url: "https://pubchem.ncbi.nlm.nih.gov/#query=melanotan%20II" },
    ],
    tableMode: "price",
    tableHeading: "Live UK supplier listings, lowest price first",
    rowLimit: 12,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-melanotan-ii-uk",
    title: "Cheapest Melanotan II UK: Lowest Price Per mg 2026",
    description:
      "Cheapest Melanotan II UK — lowest price per milligram across every UK listing we track, plus the pack-size, kit and range traps that skew the headline price.",
    h1: "Cheapest Melanotan II UK",
    focusKeyword: "cheapest Melanotan II UK",
    intro: [
      "Finding the cheapest Melanotan II UK price is harder than sorting a table by a number, because the headline figures in this market are not comparable. A £15 vial and a £24 vial may both be 10mg — or one may be 5mg, or a five-vial kit whose total content is 50mg. The number that actually matters is price per milligram, and half the listings in this category do not state a pack size at all.",
      "This page solves that by normalising every pack label we can parse and sorting by price per milligram rather than sticker price. Where a supplier has written something into the dosage field that is not a pack size — an image URL, a marketing phrase, a range like '5mg-10mg' — the row keeps its price but drops out of the per-mg ranking rather than being guessed at.",
      "The result is a live ranking, refreshed weekly. It is a record of the market, not a buying recommendation: melanotan II is a prescription-only medicine in the UK, and the cheapest listing in any category is very often the least documented one. Explaining that trade-off honestly is the point of the page. For the compound's research background see the [**Melanotan II profile →**](/compounds/melanotan-ii).",
    ],
    sections: [
      {
        title: "Why Price Per mg Is the Only Honest Comparison",
        body: "Melanotan II is sold almost universally as a lyophilised powder in a sealed vial. Two vials with the same label price can differ by a factor of two or more in actual content. Without normalising to milligrams you are comparing packaging, not product.\\n\\nThe exercise also exposes something else: the spread across 65 suppliers is enormous. The lowest per-milligram rate we track is a fraction of the highest, for what is nominally the same compound at the same stated purity. In a category where documentation is weak, a very low price is not automatically a bargain — it is a signal to look harder at the certificate, not less hard.",
        table: {
          header: ["What the label says", "What it actually means", "Per-mg treatment"],
          rows: [
            ["10mg", "A single 10mg vial", "Price ÷ 10"],
            ["5mg×10vials", "A kit — 50mg total across ten vials", "Price ÷ 50"],
            ["5mg-10mg", "A range, not a pack size", "Excluded from per-mg ranking"],
            ["(blank) or a URL", "No stated content", "Excluded from per-mg ranking"],
            ["10mg nasal spray", "10mg in a spray carrier", "Listed, flagged as spray"],
          ],
        },
      },
      {
        title: "The Kit-Pack Trap",
        body: "The single most common way a per-milligram ranking gets distorted is the multi-vial kit. A supplier listing '5mg×10vials' at £120 looks expensive against a £15 single vial, but the kit contains fifty milligrams at £2.40/mg while the single vial is £3.00/mg. Sorted by sticker price the kit looks worst; sorted by content it looks better.\\n\\nWe handle this by parsing the multiplier out of the label and treating kit packs as total content. The table flags them, because a researcher comparing a five-vial kit to a single vial is comparing storage and handling as well as price — ten vials means ten reconstitutions and ten expiry windows.",
        list: [
          "Kit packs are parsed to total milligrams, not per-vial milligrams.",
          "A range label ('5mg-10mg') is excluded from the per-mg ranking rather than guessed.",
          "A blank dosage field keeps the price but sinks to the bottom of the ranking.",
          "Nasal spray and pen formats are shown with their own pack label rather than converted to an assumed vial equivalent.",
        ],
      },
      {
        title: "Why the Cheapest Listing Is Rarely the Safest",
        body: "In every price scrape we run on this compound, the bottom of the per-milligram table correlates with the weakest documentation. That is not a coincidence and it is not a moral judgement — offering the lowest price in a category with near-zero enforcement of purity claims requires the least investment in testing.\\n\\nThe practical rule: use the per-mg table to find the realistic floor, then work upward from that floor until you reach a listing that publishes a batch-linked Certificate of Analysis with an HPLC chromatogram. That listing is your honest cheapest, whatever its sticker says.",
      },
      {
        title: "The Arithmetic That Actually Decides It",
        body: "Three worked examples make the normalisation concrete. A single 10mg vial at £30 is £3.00/mg. A 5mg vial at £15 is also £3.00/mg — the same product at the same rate, sold in a smaller pack, and a sticker-price sort would rank the second one as twice as cheap when it is identical. That is the first and most common distortion.\\n\\nA kit listed as '5mg×10vials' at £120 is 50mg total, so £2.40/mg — better value than either single vial, and worst on a sticker sort. The third case is the trap: a listing at £12 with a blank dosage field looks like the cheapest thing on the page, but with no milligram figure there is no rate to compute, and the £12 may be for a 2mg sample vial or for something that is not a vial at all.\\n\\nOnce you have run these three cases yourself, the per-milligram column stops being a technicality and becomes the only number you read.",
        list: [
          "10mg at £30 = £3.00/mg — the reference rate.",
          "5mg at £15 = £3.00/mg — identical rate, misleading sticker sort.",
          "5mg×10vials at £120 = 50mg = £2.40/mg — best value, worst sticker sort.",
          "£12 with no dosage = unrankable, however cheap it looks.",
        ],
      },
      {
        title: "Where the Per-Milligram Rate Still Misleads",
        body: "Normalising to milligrams fixes most of the problem but not all of it, and the remainder is worth stating. The rate assumes the stated content is the actual content. In a category where certificates are frequently missing and occasionally generic, a supplier advertising 10mg at £2.00/mg may simply be stating a larger figure than they ship. The per-milligram column is only as honest as the label it is derived from.\\n\\nIt also assumes a like-for-like format. A nasal spray advertised at 10mg is not directly comparable to a vial at 10mg, because the delivered dose per actuation is a different question from the total mass in the container. We show spray rows with their own label rather than folding them into the vial ranking, because a combined sort implies an equivalence that does not exist.\\n\\nFinally, the rate ignores the per-order costs that do not scale: shipping, minimum order values and any handling fee. A supplier whose rate is 5p/mg better but who charges £8 shipping is not cheaper for a single vial.",
      },
      {
        title: "Building Your Own Comparison From Raw Listings",
        body: "The table below does the normalisation for you, but it is worth being able to reproduce the arithmetic, because a supplier's own product page will not do it. Three steps. Read the pack label and extract a single milligram figure — if the label is a range, a kit multiplier or a blank, stop, because the listing cannot be compared on a per-milligram basis. Divide the stated price by that figure. Then sort the results rather than the stickers.\\n\\nTwo refinements matter in practice. Apply the same treatment to every listing in the same format, and do not mix spray rows into a vial sort. And add shipping to the price before dividing if you are comparing single-vial purchases, because a low rate from a supplier with a high flat shipping charge is frequently the more expensive option at small quantities and the cheaper one at large. Neither adjustment is complicated; both change the answer often enough to be worth the thirty seconds.",
        list: [
          "Extract one milligram figure from the pack label or abandon the comparison.",
          "Divide price by milligrams, then sort the rates rather than the stickers.",
          "Never mix spray and vial rows in one per-milligram sort.",
          "Add shipping before dividing when comparing single-vial orders.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the cheapest Melanotan II in the UK?",
        answer:
          "The live per-milligram ranking above reflects our most recent weekly scrape across 65 suppliers. It changes as listings change; the table is regenerated from compounds.json rather than quoted from a fixed figure.",
      },
      {
        question: "Why is a 10mg vial sometimes cheaper than a 5mg vial?",
        answer:
          "Because sticker price and content price are different comparisons. A larger vial usually has a lower per-milligram rate, so a 10mg vial at £24 can beat a 5mg vial at £15 once content is normalised.",
      },
      {
        question: "Are multi-vial kits cheaper per mg?",
        answer:
          "Usually, yes. A '5mg x 10 vials' kit is 50mg total and is priced accordingly. Kit packs are parsed to total content in our table and flagged, because they also multiply reconstitution and storage overhead.",
      },
      {
        question: "Why are some rows missing from the per-mg ranking?",
        answer:
          "Rows whose dosage field is blank, a URL, or a range like '5mg-10mg' cannot be converted to a single milligram figure honestly. They keep their sticker price but are excluded from the per-milligram sort.",
      },
    ],
    sources: [
      { label: "MHRA — prescription-only medicine classification", url: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency" },
    ],
    tableMode: "perMg",
    tableHeading: "Live UK listings ranked by price per mg",
    rowLimit: 14,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "melanotan-ii-price-comparison-uk",
    title: "Melanotan II Price Comparison UK: Full Side-by-Side Table",
    description:
      "Melanotan II price comparison UK — every supplier listing side by side on price, pack size, stock and TrustScore, refreshed weekly from live supplier pages.",
    h1: "Melanotan II Price Comparison UK",
    focusKeyword: "Melanotan II price comparison UK",
    intro: [
      "A proper Melanotan II price comparison UK table has to answer a question the individual listings do not: how does a given vial compare to its alternatives on every axis at once, not just cost. Price alone ranks a listing with no Certificate of Analysis above one that publishes a batch-linked HPLC result, which is an absurd ordering if you intend to use the comparison for anything.",
      "This page shows the full market side by side. Every row carries the vendor, the pack label exactly as the supplier states it, the sticker price, the price per milligram where a milligram figure can be parsed, stock status and the vendor's TrustScore. Nothing is hidden behind a filter and no supplier is promoted into a slot they did not earn on the data.",
      "The comparison also covers the format question, because melanotan II is listed as lyophilised vials, nasal spray and pre-filled pens, and those are not substitutable purchases. A spray comparison and a vial comparison are different exercises. Melanotan II is a prescription-only medicine in the UK; this is a market record for research and educational reference. The [**Melanotan II compound profile →**](/compounds/melanotan-ii) covers identity and pharmacology.",
    ],
    sections: [
      {
        title: "Reading the Comparison Table",
        body: "Five columns carry the analysis. Price is the sticker figure the supplier publishes, currency and all — no conversion, no estimation. Pack is the supplier's own label, sanitised only where it contains something that is not a pack size. Per-mg is price divided by the parsed milligram content, and the em-dash means the label could not honestly be converted. Stock is whatever the listing said at scrape time. TrustScore is the badge score for the vendor's own domain, which is zero for vendors who have not installed the badge and therefore cannot be independently confirmed as owning the domain they sell from.",
        list: [
          "Price — sticker figure, as published.",
          "Pack — the supplier's label, not a normalised guess.",
          "Per-mg — only shown where a milligram figure is parseable.",
          "Stock — a snapshot at the last scrape, not a live inventory API.",
          "TrustScore — badge verification of domain ownership, not a purity score.",
        ],
      },
      {
        title: "The TrustScore Column Explained",
        body: "TrustScore is widely misread as a purity rating, and it is not one. It measures whether a vendor has installed a small script on their own site that links back to their ViralPeps profile — which proves a specific, checkable fact: whoever runs that domain is the same party claiming the listing.\\n\\nThat single fact eliminates a large share of the fraud in this category, where listings are cloned from a real supplier's site onto a look-alike domain. It does not tell you the powder is what the label says. For that you need the Certificate of Analysis, and the comparison table cannot give it to you because most suppliers in this category do not publish one.",
      },
      {
        title: "Melanotan II vs Melanotan I: The Comparison That Actually Matters",
        body: "UK searchers compare melanotan II against melanotan I far more than they compare two suppliers, and the distinction is real. Melanotan I (afamelanotide) is a linear tridecapeptide analogue of alpha-MSH developed as a photoprotective agent and licensed in the EU as a subcutaneous implant for a rare photosensitivity condition. Melanotan II is a shorter cyclic heptapeptide with a lactam bridge, and it is the less selective of the two — the structural difference is what drives its broader receptor activity and its wider adverse-event record.\\n\\nComparing the two as 'tanning peptides' misses the point. One is a licensed medicine with a defined indication; the other is a prescription-only substance that was never licensed and which the MHRA acted against specifically because of reported harms. The published case literature on melanotan II toxicity is a better comparison source than any vendor page.",
        table: {
          header: ["", "Melanotan I (afamelanotide)", "Melanotan II"],
          rows: [
            ["Structure", "Linear tridecapeptide", "Cyclic heptapeptide, lactam bridge"],
            ["Receptor profile", "More alpha-MSH selective", "Broader, less selective"],
            ["UK status", "Prescription-only medicine", "Prescription-only medicine"],
            ["Licensed indication", "Implant for a rare photosensitivity disorder", "None"],
            ["Published record", "Clinical trial data", "Case reports of systemic toxicity"],
          ],
        },
      },
      {
        title: "What the Spread Tells You About the Market",
        body: "Across the listings compared here, the price range for a nominally identical 10mg vial spans a multiple, and the documentation published alongside those listings varies just as widely but in the opposite direction — the cheapest listings most often publish the least. That inverse relationship is the whole finding.\\n\\nA comparison table is only useful if it lets you see both axes at once, which is why the TrustScore and the pack label sit next to the price rather than being buried on a profile page.",
      },
      {
        title: "Comparing Stock Status Without Being Misled",
        body: "Stock is the column most often taken at face value and least often accurate. A supplier's product page shows a status at the moment it is rendered, and that status is frequently a hardcoded label rather than a live inventory number. A site showing 'in stock' across seventeen products, every day for six months, is not tracking inventory — it is displaying a string.\\n\\nWe record what the listing said at scrape time and nothing more. The practical use of the column is contradiction detection rather than availability checking: if a comparison shows a supplier's entire catalogue in stock and a second supplier showing a mix, the second is more likely to be reading a real system. Where a listing went from in stock to out of stock and back within a few weeks, that is also informative — it suggests someone is actually updating it.",
        list: [
          "Stock is a snapshot at scrape time, never a live inventory feed.",
          "A catalogue uniformly 'in stock' for months is probably a hardcoded label.",
          "Mixed status across a catalogue suggests a real system behind it.",
          "Status changes over time are more informative than any single reading.",
        ],
      },
      {
        title: "What a Comparison Table Cannot Do",
        body: "It cannot tell you what is in the vial, and any comparison in this category that implies otherwise is misleading. It also cannot tell you whether the supplier will still exist next month, whether the price you see will still be the price at checkout, or whether a certificate shown on a product page belongs to the batch you would receive.\\n\\nWhat it can do is strip out the three distortions that make the market unreadable otherwise. It removes the pack-size distortion by normalising to milligrams. It removes the naming distortion by resolving vendors to real domains rather than display labels, so the same supplier appearing under two names does not appear twice. And it removes the documentation blindness by putting TrustScore in the same row as the price, so a cheap listing with no verification is visible as exactly that. That is a narrower claim than 'this table tells you where to buy', and it is the claim the data actually supports.",
      },
      {
        title: "Why We Publish the Whole Market",
        body: "A curated shortlist would be easier to read and less useful. Publishing every listing we track — including the ones with no documentation, the ones that look like clones and the ones that have been out of stock for months — makes two things visible that a shortlist hides. The first is the shape of the market: how many operators there are, how concentrated the pricing is, and how quickly listings appear and vanish. The second is the documentation baseline, which in this category is poor enough that it should be seen rather than summarised.\\n\\nThe rows are not ranked to flatter anyone. Sorting is by price unless a mode says otherwise, the TrustScore is whatever the vendor has earned or not earned, and a listing's presence is a record of its existence rather than an endorsement. Given that melanotan II is a prescription-only medicine in the UK, the most useful thing this table can do is show how much of the market is operating casually.",
      },
    ],
    faq: [
      {
        question: "How often is this comparison updated?",
        answer:
          "Weekly. The table renders live from compounds.json, which is refreshed by our price scraper, so the figures reflect the suppliers' own listing pages at the most recent check rather than a stored snapshot.",
      },
      {
        question: "Is a high TrustScore the same as high purity?",
        answer:
          "No. TrustScore verifies that a vendor controls the domain they sell from, which rules out look-alike clones but says nothing about the contents of a vial. Purity requires a batch-linked Certificate of Analysis.",
      },
      {
        question: "What is the difference between Melanotan I and Melanotan II?",
        answer:
          "Melanotan I is a linear tridecapeptide with a licensed indication as an implant for a rare photosensitivity disorder. Melanotan II is a shorter cyclic heptapeptide, less receptor-selective, never licensed, and subject to a prescription-only classification in the UK.",
      },
      {
        question: "Should I compare nasal spray with vials?",
        answer:
          "Only separately. Spray and pen formats deliver a stated amount in a carrier and cannot be converted to a vial-equivalent per-milligram figure without assuming a concentration the listing usually does not publish.",
      },
    ],
    sources: [
      { label: "MHRA — medicines regulation", url: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency" },
      { label: "PubChem — afamelanotide", url: "https://pubchem.ncbi.nlm.nih.gov/#query=afamelanotide" },
    ],
    tableMode: "full",
    tableHeading: "Full UK market comparison — all tracked listings",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-melanotan-ii-peptide",
    title: "Buy Melanotan II Peptide: Ordering, Formats and Checks",
    description:
      "Buy Melanotan II peptide — what UK listings actually offer, vial versus spray versus pen, payment and delivery checks, plus the POM legal position first off.",
    h1: "Buy Melanotan II Peptide",
    focusKeyword: "buy Melanotan II peptide",
    intro: [
      "People searching buy Melanotan II peptide usually want a short answer about format and price. The honest answer starts with the legal position, because it changes what any UK listing actually is: melanotan II was reclassified by the MHRA as a prescription-only medicine, so a UK site offering it for direct purchase is not selling you a research chemical, it is selling a medicine outside the terms of its classification.",
      "That does not make the question go away, and it does not make the market disappear — 65 suppliers currently list this compound across the catalogues we track. What it does mean is that the 'buy' question is really an evaluation question: which listings are real businesses with documentation, which are clones, and which format is being sold. This page covers all three, with a live table of current listings underneath.",
      "The format distinction is the one most often missed. A lyophilised vial, a nasal spray and a pre-filled pen are three different products with three different verification stories, and a supplier who is excellent on vials may have no business selling spray. Everything here is research and educational reference; the [**Melanotan II compound profile →**](/compounds/melanotan-ii) has the underlying literature.",
    ],
    sections: [
      {
        title: "Three Formats, Three Different Purchases",
        body: "A lyophilised vial is a powder. It can be sampled, assayed and compared against a certificate, and the certificate can be tied to a batch number. This is the only format where independent purity verification is even conceptually possible.\\n\\nA nasal spray contains the compound in a carrier with preservatives, and the listing almost never states the delivered concentration per actuation — so even the total quantity is ambiguous. A pre-filled pen moves the sterility and accuracy question onto the device and the filler, and a pen bought from a supplier with no device documentation is harder to assess than a vial from the same supplier.\\n\\nIf you are comparing listings, compare within a format. A spray that looks like good value against a vial is not a like-for-like comparison.",
        table: {
          header: ["Format", "Verifiable by assay?", "Main unknown"],
          rows: [
            ["Lyophilised vial", "Yes — powder can be sampled", "Whether the certificate matches the batch"],
            ["Nasal spray", "Rarely — carrier interferes", "Delivered concentration per actuation"],
            ["Pre-filled pen", "Rarely — device sealed", "Device accuracy and the filler's sterility"],
          ],
        },
      },
      {
        title: "Payment and Delivery Signals",
        body: "The payment methods a UK-facing supplier accepts tell you something about how they see their own legal exposure. A supplier taking standard card payments for a prescription-only medicine is exposing a card processor to a transaction the processor has not approved, and those accounts are terminated routinely. Sites that take only bank transfer or cryptocurrency are not being sophisticated — they are building in the ability to vanish without a chargeback trail.\\n\\nOn delivery, the claims worth checking are the ones that are checkable: a stated dispatch window, a tracking number issued on dispatch rather than on request, and a returns policy that exists in writing. 'Fast UK delivery' with no tracking and no stated courier is marketing copy, not a fulfilment process.",
        list: [
          "Card payment for a POM indicates a processor relationship the supplier may not actually have.",
          "Bank-transfer-only or crypto-only is a reversibility problem for you, not a privacy feature.",
          "A stated dispatch window and a tracking number on dispatch are the two checkable delivery claims.",
          "A written returns policy is a business signal; a chat widget is not.",
        ],
      },
      {
        title: "Ordering Checks Before You Commit",
        body: "The same six checks apply to any listing in this category, and they are quick. Run them in order and stop at the first failure rather than averaging across the list.",
        list: [
          "Search the vendor's domain registration date — a storefront under a year old in this category warrants more scrutiny.",
          "Confirm the business identity behind the domain: a limited company number, or a verifiable sole trader.",
          "Ask for the Certificate of Analysis for the specific batch and check the batch number is on the vial you are sent.",
          "Check that the purity figure comes with a chromatogram, not just a percentage.",
          "Send one email to the published contact address and see whether it is answered.",
          "Check the pack label against the price — if the same vial is listed at two prices on one page, that is a data hygiene failure.",
        ],
      },
      {
        title: "What the Live Table Shows",
        body: "Below is every listing we currently track, with the format visible in the pack label and the per-milligram rate where it can be computed. It updates weekly from the suppliers' own pages. Note that a listing appearing here means it exists, not that we recommend it — and given the prescription-only classification, the strongest recommendation this page can make is to treat any UK listing with the documentation scrutiny it deserves.",
      },
      {
        title: "Reconstitution and Handling Supplies Are a Separate Purchase",
        body: "A lyophilised vial is not ready to use. It requires a solvent — bacteriostatic water is the usual choice — plus a syringe and a swab, and none of these are always included. Suppliers vary on whether they bundle a solvent, and a listing that shows a surprisingly low price often excludes it.\\n\\nThis is worth checking at the point of comparison rather than after arrival, because the solvent is a real cost and its absence changes the per-milligram arithmetic. Bacteriostatic water contains benzyl alcohol as a preservative and is the standard choice for multi-use vials; sterile water for injection has no preservative and is intended for single use. The two are not interchangeable, and a supplier substituting one for the other without saying so is a documentation problem as much as a supply problem.\\n\\nStorage matters equally. Lyophilised peptide is stable at room temperature for a period but is conventionally stored refrigerated and protected from light, and a reconstituted solution is less stable than the powder it came from. Suppliers who ship without any cold-chain consideration are not necessarily wrong, but they are not paying attention to the one handling variable that degrades product fastest.",
        list: [
          "Check whether a solvent is included, because a low sticker price often excludes it.",
          "Bacteriostatic water has a preservative and suits multi-use vials; sterile water does not.",
          "Lyophilised powder is stored refrigerated and protected from light.",
          "Reconstituted solution is less stable than the powder — plan around that.",
        ],
      },
      {
        title: "What a UK Listing Is Actually Selling You",
        body: "There is a structural oddity worth naming. The MHRA classification means a UK business may not sell melanotan II as a general product, so a UK-facing site offering it openly is either operating outside the classification, or is a front for an offshore supplier shipping into the UK, or has relabelled the substance as something else. All three patterns exist in the listings we track.\\n\\nThat is why the 'buy' question in this category cannot be answered with a link. The transaction you are entering into is not a normal retail purchase, and the party on the other side is not a normal retailer. Our position is to record what is on offer and be explicit about what that record does and does not mean. The compound profile linked above is the better starting point for anyone approaching melanotan II as a research subject.",
      },
    ],
    faq: [
      {
        question: "Can I buy Melanotan II peptide in the UK?",
        answer:
          "It is classed as a prescription-only medicine, so it cannot be sold as a general product. Any UK listing offering it for sale is operating outside that classification. ViralPeps records listings for reference and does not sell or supply the compound.",
      },
      {
        question: "Should I buy a vial, a nasal spray or a pen?",
        answer:
          "Only vials can be independently assayed, because a powder can be sampled. Sprays and pens obscure total content and sterility behind a carrier or device, and listings rarely publish the detail needed to assess them.",
      },
      {
        question: "Why do some suppliers only accept bank transfer or crypto?",
        answer:
          "Usually because card processors will not carry the transaction. It also removes your ability to reverse a payment, so it is a reversibility problem rather than a privacy feature.",
      },
      {
        question: "How do I check a Certificate of Analysis is real?",
        answer:
          "The certificate must name a third-party laboratory, carry a batch or lot number that matches the vial, and show an HPLC chromatogram rather than a headline percentage alone. A generic PDF with no batch number verifies nothing.",
      },
    ],
    sources: [
      { label: "MHRA — prescription-only medicines", url: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency" },
    ],
    tableMode: "price",
    tableHeading: "Current UK listings — check the pack label for format",
    rowLimit: 12,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "melanotan-ii-supplier-guide-uk",
    title: "Melanotan II Supplier Guide UK: How to Vet a Listing",
    description:
      "Melanotan II supplier guide UK — how to vet a listing properly: domain ownership, COA batch matching, pack-label consistency and the clone-storefront signature.",
    h1: "Melanotan II Supplier Guide UK",
    focusKeyword: "Melanotan II supplier guide UK",
    intro: [
      "A Melanotan II supplier guide UK buyers actually need is a vetting procedure, not a list of links. This category has a specific and well-defined failure mode: look-alike storefronts that copy a real supplier's catalogue, list the same products at a slightly lower price, take payment, and disappear. The compound's prescription-only status makes the whole category less accountable, not more, because legitimate operators have largely withdrawn and the space has been filled by those willing to ignore the classification.",
      "This page sets out the checks we run on every supplier before they enter the directory, explains what each check actually proves, and is explicit about what none of them prove — namely that the contents of a vial match its label. That last point is not a gap in our method, it is the state of the market, and pretending otherwise would be worse than saying so.",
      "We track 65 suppliers for this compound. Their documentation quality ranges from batch-linked third-party certificates to nothing at all, and the distribution is heavily skewed toward the latter. Everything here is research and educational reference; the [**Melanotan II compound profile →**](/compounds/melanotan-ii) covers identity and the published toxicity literature.",
    ],
    sections: [
      {
        title: "Check 1 — Domain Ownership",
        body: "The clone-storefront problem is solved by verifying one fact: does the party selling control the domain they sell from? A cloned site can copy a catalogue, a logo and even a certificate, but it cannot install a verification script on the original supplier's domain, because it does not control it.\\n\\nThat is exactly what the ViralPeps TrustScore badge does. The supplier installs a short script on their own site which links to their profile on ours, and we can confirm the link resolves from the domain in question. A supplier appearing in our table with a TrustScore above zero has passed this check. A supplier with no score has not installed the badge and therefore cannot be confirmed — which is not the same as being fraudulent, but it does mean the most decisive available check has not been run.",
        list: [
          "Domain registration date — a young domain in this category is a risk factor, not a disqualifier.",
          "WHOIS registrant details — privacy protection is normal, a mismatched country of operation is not.",
          "Badge installation — proves control of the domain, the single strongest check available.",
          "Business identity — a company number or verifiable sole trader behind the domain.",
        ],
      },
      {
        title: "Check 2 — Certificate of Analysis Discipline",
        body: "Most suppliers in this category publish something they call a COA. Very few publish one that would survive scrutiny. The distinguishing features are mechanical and easy to check once you know what they are.\\n\\nA real certificate names the third-party laboratory, states the batch or lot number, describes the analytical method (HPLC, with conditions), gives a purity figure derived from that method, and includes the chromatogram itself. A template with a supplier logo, a purity percentage and no batch number is a marketing asset, not a certificate. If the same certificate appears on three different products, it verifies nothing on any of them.",
        table: {
          header: ["Certificate feature", "Real", "Template"],
          rows: [
            ["Named third-party lab", "Yes", "Absent or in-house"],
            ["Batch / lot number", "Matches the vial", "Absent"],
            ["Method stated", "HPLC with conditions", "Unspecified"],
            ["Chromatogram shown", "Yes", "Percentage only"],
            ["Product specificity", "One product, one batch", "Reused across catalogue"],
          ],
        },
      },
      {
        title: "Check 3 — Pack-Label Consistency",
        body: "Catalogue hygiene is a surprisingly good proxy for operational competence. A supplier who lists the same 10mg vial three times at three prices under three names — 'Melanotan II', 'MT-2', 'Melanotan 2 Peptide' — is not maintaining a product database. That matters because the same laxity tends to show up in batch tracking, and a supplier who cannot keep a price list straight is unlikely to be able to tell you which batch a vial came from.\\n\\nWe normalise pack labels in our tables specifically so this inconsistency is visible. Where a supplier writes an image URL or a marketing phrase into their dosage field, our parser flags it rather than displaying it.",
        list: [
          "The same vial listed under multiple names at different prices.",
          "Dosage fields containing non-dosage content: image URLs, 'best seller', promotional text.",
          "Kits and single vials presented as if directly comparable.",
          "Stock status that never changes — a static 'in stock' across months is a hardcoded label.",
        ],
      },
      {
        title: "Check 4 — Contact and Compliance Signals",
        body: "Two further checks round out the picture, and both can be done in minutes. First, contact the supplier at the address they publish and see whether a person answers; in this category a non-responsive contact route is common enough that it should be treated as a finding. Second, look at how they describe the compound. The MHRA classification means any UK site marketing melanotan II for its tanning effect is advertising a medicine, and a site that appears relaxed about that is likely relaxed about other things too.",
        list: [
          "An email that is answered, from a domain that matches the storefront.",
          "A phone number that connects, if one is published.",
          "Research-use-only framing used honestly rather than as a disclaimer sticker.",
          "No therapeutic or cosmetic efficacy claims, which would breach the POM classification.",
        ],
      },
      {
        title: "What None of These Checks Prove",
        body: "None of the four checks above tells you what is in the vial. Not one. They establish that the seller is a real business controlling a real domain with some documentation discipline — a meaningful filter in a category where the baseline is very low — but purity requires an assay of the specific batch, and the only party who can give you that is a laboratory.\\n\\nThe honest summary of the supplier landscape for this compound is that a minority are verifiable businesses, a larger number are unverifiable but not obviously fraudulent, and some are clones. Sorting suppliers into those three groups is achievable. Certifying purity is not, and any guide that claims otherwise is selling confidence it does not have.",
      },
      {
        title: "The Clone Storefront Signature",
        body: "Cloned sites follow a recognisable pattern, and spotting it early saves the most time. The catalogue is copied wholesale — same products, same descriptions, often the same stock photographs including the original supplier's own brand mark in a corner. Prices are then set a few percent below the original to capture price-sensitive buyers. The domain is new, the registrant details are either hidden or in a different country from the operation, and there is no business identity published anywhere on the site.\\n\\nThree tells settle it quickly. First, search the exact product description text in quotes; if it appears on an older, established domain, you are on the copy. Second, look for the original supplier's logo or watermark in the product images. Third, check the domain registration date — a storefront claiming years of trading on a domain registered four months ago is not what it says it is. None of these require technical skill, and together they catch the majority of clones in this category.",
        list: [
          "Copied catalogue with identical descriptions and stock photography.",
          "Prices set just below the original to win the price-sensitive search.",
          "Young domain, hidden registrant, no published business identity.",
          "Original supplier's logo or watermark still visible in product images.",
        ],
      },
    ],
    faq: [
      {
        question: "How many UK suppliers stock Melanotan II?",
        answer:
          "We currently track 65 distinct suppliers for this compound. Documentation quality across them ranges from batch-linked third-party certificates to none, and the distribution is heavily skewed toward poor documentation.",
      },
      {
        question: "What is the single best check on a supplier?",
        answer:
          "Domain ownership. Installing the TrustScore badge proves the seller controls the domain they sell from, which is the one thing a cloned look-alike storefront cannot fake.",
      },
      {
        question: "Can a supplier be verified as selling pure Melanotan II?",
        answer:
          "Not by any directory check. Purity requires an assay of the specific batch by a laboratory. Our checks establish that a seller is a real, identifiable business, which is a different and much weaker claim than purity.",
      },
      {
        question: "Is it a red flag if a UK site advertises tanning effects?",
        answer:
          "Yes. Melanotan II is a prescription-only medicine in the UK, so promoting it for a cosmetic or therapeutic effect breaches that classification. A site that appears unconcerned about this is a poorer compliance risk overall.",
      },
    ],
    sources: [
      { label: "MHRA — regulatory guidance", url: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency" },
    ],
    tableMode: "trust",
    tableHeading: "Tracked suppliers ordered by TrustScore",
    rowLimit: 15,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-melanotan-ii-peptide",
    title: "Best Melanotan II Peptide UK: Ranked by Documentation",
    description:
      "Best Melanotan II peptide — ranked by TrustScore, documentation and price per mg, with a clear statement of what 'best' can and cannot mean in this category.",
    h1: "Best Melanotan II Peptide",
    focusKeyword: "best Melanotan II peptide",
    intro: [
      "The best Melanotan II peptide is a question that can only be answered partially, and the partial answer is worth stating precisely. In a category where the compound is a prescription-only medicine, where no supplier can demonstrate purity without an assay, and where the baseline documentation is poor, 'best' cannot mean 'safest'. What it can mean is: best documented, best verified as a real business, and best value once pack sizes are normalised. This page ranks on exactly those three things and says so on the table.",
      "Melanotan II — MT-2 — is a synthetic cyclic heptapeptide analogue of alpha-melanocyte-stimulating hormone, structurally distinct from the linear tridecapeptide melanotan I. Its published record includes case reports of systemic toxicity and rhabdomyolysis, which is part of why the MHRA acted on it. Anyone ranking suppliers for this compound has an obligation to put that context first rather than below a price table.",
      "The ranking below is live, sorted by vendor TrustScore with price per milligram as the tiebreak. TrustScore is verification of domain ownership, not purity, and the ranking is deliberately weighted toward it because a real business with a mediocre certificate is a better proposition than an anonymous storefront with a nice-looking one. See the [**Melanotan II compound profile →**](/compounds/melanotan-ii) for the research background.",
    ],
    sections: [
      {
        title: "How 'Best' Is Defined Here",
        body: "Three criteria, applied in order. First, TrustScore — has the vendor proven they control the domain they sell from. This eliminates clones, which are the most common outright fraud in the category. Second, per-milligram price — value once pack content is normalised, so a kit or a larger vial is not penalised for its sticker price. Third, documentation, which is visible in our supplier records but cannot be ranked as cleanly as a number.\\n\\nNo criterion here assesses whether the powder is what the label says. It could not. Independent purity certification is not available at this level of the market, and a ranking that implied otherwise would be the single most misleading thing this page could do.",
        list: [
          "TrustScore first — domain ownership is the only fully verifiable check.",
          "Price per mg second — sticker price misleads when pack sizes vary.",
          "Documentation third — batch-linked COAs with chromatograms outrank templates.",
          "Purity is not ranked, because it cannot be verified from a listing.",
        ],
      },
      {
        title: "Why the Top of This Ranking Is Small",
        body: "The number of suppliers with a non-zero TrustScore for this compound is a small fraction of the 65 we track. That is the finding, not a flaw in the ranking. Most vendors in this category have not installed the badge, which means the strongest available verification has not been performed on them — and in a market where clone storefronts are a known problem, an unverified vendor is an unpriced risk.\\n\\nThe practical read: the top of the table is short because verification is rare, not because the data is incomplete. A longer list of confidently-stated names would be a worse answer.",
      },
      {
        title: "Melanotan II Compared With Adjacent Compounds",
        body: "The closest comparator is PT-141 (bremelanotide), which is structurally related — PT-141 is the D-Phe epimer of the melanotan II core, cyclised through the same lactam bridge. Searchers frequently compare them, and the comparison is genuine rather than cosmetic. Beyond that, melanotan I is the other common comparator, discussed in detail on our [price comparison page](/compound-guides/melanotan-ii-price-comparison-uk).\\n\\nBoth comparisons point at the same conclusion: these are distinct molecules with distinct receptor profiles and distinct regulatory status, and treating them as interchangeable 'tanning peptides' is the fastest way to make a bad sourcing decision.",
        table: {
          header: ["", "Melanotan II", "PT-141 (bremelanotide)"],
          rows: [
            ["Structure", "Cyclic heptapeptide, lactam bridge", "D-Phe epimer of the same core"],
            ["Receptor profile", "Broader, less selective", "More MC4R-weighted"],
            ["UK status", "Prescription-only medicine", "Prescription-only medicine"],
            ["Licensed for", "Nothing", "A defined licensed indication"],
          ],
        },
      },
      {
        title: "The Honest Recommendation",
        body: "Given the prescription-only classification, the documented adverse events, and the fact that no listing can demonstrate purity, the strongest statement this page can make is a negative one: there is no supplier in this category that a directory can certify as safe, and any site telling you otherwise is overclaiming.\\n\\nIf your interest is academic or regulatory, the published literature is the better source and it is free. If your interest is comparative — understanding how the market is structured and what suppliers claim — the live table below is an accurate record. Both are legitimate uses of this page. A purchase recommendation is not one of them.",
      },
      {
        title: "What the Published Record Says About the Compound",
        body: "The case literature on melanotan II is the strongest argument for caution in this category, and it exists independently of any supplier. Reported adverse events in the clinical literature include systemic toxicity episodes and rhabdomyolysis following use of unregulated product, and the absence of batch certification in the consumer market is precisely what makes those reports difficult to generalise — nobody knows what the affected users actually received.\\n\\nThat is the point a ranking cannot escape. When the substance in circulation is unverifiable, adverse-event reports describe the market rather than the molecule, and a comparison of suppliers is a comparison of how much of that uncertainty each one removes. A supplier publishing a batch-linked third-party certificate removes some of it. Nobody in this category removes all of it.",
        list: [
          "Reported harms include systemic toxicity and rhabdomyolysis in the case literature.",
          "Because product is uncertified, reports describe the market as much as the compound.",
          "A batch-linked COA from a named lab is the only thing that reduces the uncertainty.",
          "No supplier in this category eliminates it entirely.",
        ],
      },
      {
        title: "How to Read the Ranking Without Overreading It",
        body: "Treat the table as a shortlist of businesses that have been checked, not a shortlist of products that have been verified. The TrustScore at the top of each row answers a narrow question — does this vendor control the domain they sell from — and that single fact is worth more than it sounds in a market full of clones. It is still not a purity claim.\\n\\nThe per-milligram figure next to it answers a different narrow question: what does this listing cost per unit of stated content, once pack sizes are normalised. Between the two you can tell which suppliers are real businesses and which listings are genuinely competitive rather than merely cheap-looking on the sticker. Neither column, alone or together, tells you whether the label is accurate. Read the ranking for what it measures and go elsewhere for what it does not, and you will be using it correctly.",
      },
      {
        title: "Where to Go Next",
        body: "Three pages on this site carry the rest of the analysis. The [price comparison page](/compound-guides/melanotan-ii-price-comparison-uk) shows the full market side by side without a row limit, including the listings that do not make the ranking for lack of verification. The [cheapest Melanotan II page](/compound-guides/cheapest-melanotan-ii-uk) works through the pack-size and kit arithmetic that turns a sticker price into a real rate. And the [supplier guide](/compound-guides/melanotan-ii-supplier-guide-uk) sets out the vetting procedure in full, including the clone-storefront signature.\\n\\nFor the compound's identity, receptor pharmacology and the published adverse-event literature, the [**Melanotan II compound profile →**](/compounds/melanotan-ii) is the hub these pages sit under. It is the better starting point for anyone approaching the compound as a research subject rather than a purchasing problem, and given the UK classification it is the more defensible starting point too.",
      },
    ],
    faq: [
      {
        question: "What is the best Melanotan II peptide brand in the UK?",
        answer:
          "Ranked here by TrustScore, then price per milligram. TrustScore verifies domain ownership rather than purity, so the ranking identifies verifiable businesses, not certified-safe products. No directory can certify purity in this category.",
      },
      {
        question: "Is Melanotan II the same as PT-141?",
        answer:
          "No. PT-141 (bremelanotide) is the D-Phe epimer of the melanotan II core, sharing the lactam bridge but with a more MC4R-weighted receptor profile and a licensed indication. Melanotan II is broader and less selective.",
      },
      {
        question: "Why are so few suppliers ranked highly?",
        answer:
          "Because few have installed the TrustScore badge, so domain ownership cannot be verified for them. Clone storefronts are a known problem in this category, which makes an unverified vendor a real risk rather than a neutral entry.",
      },
      {
        question: "Does a top ranking here mean the product is safe?",
        answer:
          "No. The ranking assesses whether a seller is a verifiable business and how their price compares once pack content is normalised. It makes no claim about the contents of a vial, and Melanotan II remains a prescription-only medicine with documented toxicity case reports.",
      },
    ],
    sources: [
      { label: "MHRA — regulatory action and classification", url: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency" },
      { label: "PubMed — Melanotan II toxicity reports", url: "https://pubmed.ncbi.nlm.nih.gov/?term=melanotan+II+toxicity" },
    ],
    tableMode: "trust",
    tableHeading: "Ranked by TrustScore, then price per mg",
    rowLimit: 15,
  },
];

/** Resolve a spoke by slug — used by the guide route. */
export function getSpoke(slug: string): Spoke | null {
  return spokes.find((s) => s.slug === slug) ?? null;
}
