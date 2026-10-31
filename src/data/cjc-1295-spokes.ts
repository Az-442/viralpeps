/**
 * CJC-1295 silo spokes — content for /compound-guides/[slug].
 *
 * Six spokes, each targeting one modifier keyword. NO canonicals between spokes.
 * Prices are NEVER hardcoded — the page renders them live from
 * src/data/cjc-1295-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * MODIFIER NOTES (Google UK autocomplete, pulled live):
 *  - `cjc-1295 price comparison uk` → ZERO UK results. Substituted with
 *    `cjc-1295 price uk` (exact UK match #1).
 *  - `cjc-1295 uk supplier` → ZERO results for the hyphenated form. Substituted
 *    with `cjc-1295 supplier uk` (matches the `cjc-1295 supplier` head term and
 *    the `cjc 1295 uk peptides` cluster).
 *  - `cjc-1295 uk` itself is an exact autocomplete entry, which validates the
 *    `-uk` suffix on the other four.
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
    slug: "where-to-buy-cjc-1295-uk",
    title: "Where to Buy CJC-1295 UK: Verified Suppliers 2026",
    description:
      "Where to buy CJC-1295 UK — compare live prices from verified UK research suppliers, then check stock, shipping and Certificates of Analysis before ordering.",
    h1: "Where to Buy CJC-1295 UK",
    focusKeyword: "where to buy cjc-1295 uk",
    intro: [
      "If you are searching for where to buy CJC-1295 UK researchers run into a specific problem: almost every result is either an overseas storefront with no verifiable UK presence or a UK site that publishes no batch-linked Certificate of Analysis. CJC-1295 is a growth hormone-releasing hormone analogue — a modified GRF(1-29) sequence with a maleimidopropionic acid linker — and its popularity in growth hormone secretagogue research is exactly what makes poorly documented material profitable to sell.",
      "This page answers the question with data rather than opinion. Below is a live table of every UK supplier ViralPeps tracks for CJC-1295, with pack size, stock status, price and a direct link to each listing. It is regenerated from a weekly price scrape, so the figures reflect those suppliers' own listing pages at the most recent check.",
      "The compound is well characterised in the literature. CJC-1295 was designed to extend the half-life of GRF(1-29) by covalent binding to serum albumin, and early pharmacokinetic work in healthy volunteers established a substantially extended plasma residence time versus unmodified GRF. That published profile is useful context when you assess whether a supplier's claimed identity and purity are plausible — a 5mg vial of a modified GHRH analogue is not an interchangeable commodity.",
      "Everything here is presented for laboratory and educational reference only. CJC-1295 is not a licensed medicine in the UK and nothing on this page is medical guidance. For the compound's full research profile, mechanism and reference data, start with the [**CJC-1295 research hub →**](/compounds/cjc-1295).",
    ],
    sections: [
      {
        title: "How the table below is ordered",
        body:
          "Rows are sorted by price ascending, with ties broken alphabetically by vendor name for stable output. Every row carries a link straight to the supplier's own product page so you can verify the listing yourself rather than trusting a directory entry. Multi-pack vendors — the ones that sell 5mg and 10mg from the same page — are expanded into one row per pack, because price per vial without a pack size is a meaningless number.",
      },
      {
        title: "Four checks before you place an order",
        body:
          "The UK research peptide market has no licensing gate, so verification is entirely on the buyer. Four signals separate a documented supplier from a storefront that simply accepts card payments: a batch-referenced third-party Certificate of Analysis, a physical UK address or company number, a working contact channel that survives a test enquiry, and a listing that states research-use-only rather than making therapeutic claims. A supplier that fails the first and the fourth is not a supplier you can cite in any write-up.",
        list: [
          "Certificate of Analysis naming the testing laboratory and the batch number on the vial you receive.",
          "Company number or registered address that resolves on Companies House.",
          "A contact route you have actually tested — not a form that silently discards submissions.",
          "Research-use-only framing on the listing itself, with no dosing or human-use guidance.",
        ],
      },
      {
        title: "Pack size is the hidden variable",
        body:
          "CJC-1295 is typically listed at 2mg, 5mg and 10mg, and the same supplier often charges a materially different price per milligram at each size. A 2mg vial at £19 works out at £9.50/mg; a 10mg vial at £55 works out at £5.50/mg. The headline price tells you almost nothing. Use the per-mg column on the [**cheapest CJC-1295 page**](/compound-guides/cheapest-cjc-1295-uk), which normalises every listing to a single unit.",
      },
      {
        title: "With DAC or without — know which product you are buying",
        body:
          "CJC-1295 exists in two chemically distinct forms. The DAC form carries a maleimidopropionic acid linker that binds covalently to albumin and extends circulation time substantially; the no-DAC form — often sold as Modified GRF(1-29), Mod GRF, or CJC-1295 without DAC — lacks that linker and behaves much more like the parent GRF(1-29). They are not interchangeable in research design, and suppliers frequently list both under a single 'CJC-1295' heading. Check the product page for the words DAC, no-DAC or Mod GRF before you compare prices, because a cheap listing is often the no-DAC variant.",
      },
      {
        title: "What UK delivery actually looks like",
        body:
          "Most UK-listed suppliers dispatch from within the UK, which means one to three working days in transit for in-stock items. Overseas storefronts that rank for UK terms routinely quote seven to twenty-one days plus customs exposure, and a vial held at a customs facility for a fortnight is a vial with an unknown temperature history. If a delivery window is not stated on the product page, treat that as a missing data point rather than a given.",
      },
      {
        title: "The reference-standard question most buyers never ask",
        body:
          "If the material is intended for analytical or assay work rather than general laboratory handling, the relevant question is whether the supplier offers a reference-standard grade with a full analytical package: quantitative HPLC purity, mass spectrometry with the observed and theoretical masses printed side by side, and where possible amino acid analysis. Almost no UK peptide storefront publishes all three. The ones that publish any of them tend to price above the market floor, and for reference work that premium is usually the cheapest component of the whole exercise. For general laboratory handling the standard research grade is normally adequate — the distinction matters when your result depends on the material being what the label says to tighter than a percent.",
      },
      {
        title: "How to compare two suppliers in under ten minutes",
        body:
          "Take the two finalists and run the same four checks on each in the same order. First, open the product page and confirm the form — DAC or no-DAC — and the nominal mass are both stated. Second, request or download the current COA and confirm it names a third-party laboratory and a batch number. Third, search the company name on Companies House and confirm the address matches. Fourth, send one technical question and time the response. Whichever supplier clears all four faster is the more usable supplier, and the exercise takes about ten minutes per pair. It is a far better use of time than reading reviews, which in this market are frequently unverifiable.",
      },
    ],
    faq: [
      {
        question: "Is it legal to buy CJC-1295 in the UK?",
        answer:
          "CJC-1295 is not a controlled drug under the Misuse of Drugs Act, but it is not a licensed medicine either. Research-use-only material is sold without a prescription on the basis that it is not for human consumption. That legal position is about supply classification, not about safety, and it offers the buyer no quality assurance whatsoever.",
      },
      {
        question: "Why does the same supplier list two CJC-1295 prices?",
        answer:
          "Almost always because it stocks both the DAC and the no-DAC forms, or lists multiple pack sizes on one page. Confirm which form and which pack the price refers to before comparing it with anything else.",
      },
      {
        question: "Do I need a prescription?",
        answer:
          "For licensed human use, yes. Nothing on this page is offered for human use. The suppliers listed sell research-use-only material, and their terms of sale state it is not for human or veterinary consumption.",
      },
      {
        question: "How often is the price data refreshed?",
        answer:
          "Weekly, from a scrape of each supplier's own listing page. Prices in this market move without notice, so always confirm the figure on the supplier's page at the moment you order — the table is a comparison tool, not a quotation.",
      },
    ],
    sources: [
      {
        label:
          "Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295, a long-acting heat-stable analog of GH-releasing hormone (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
      {
        label:
          "Sustained GH and IGF-I responses to CJC-1295 in healthy adults: a randomized, placebo-controlled study (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/17018654/",
      },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy CJC-1295 UK — Live Price Table",
    rowLimit: 30,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-cjc-1295-uk",
    title: "Cheapest CJC-1295 UK: Lowest Price Per Mg 2026",
    description:
      "Cheapest CJC-1295 UK — every verified listing ranked by real price per milligram, so pack size cannot disguise which UK supplier is actually the cheapest.",
    h1: "Cheapest CJC-1295 UK",
    focusKeyword: "cheapest cjc-1295 uk",
    intro: [
      "Finding the cheapest CJC-1295 UK listing is harder than it looks, because the headline price on a product page answers a different question from the one a buyer is asking. A £19 vial of 2mg and a £55 vial of 10mg are not comparable numbers, and suppliers know it. This page ranks every UK listing we track by price per milligram, which is the only unit that lets you compare them honestly.",
      "The table below is sorted by cost per milligram, not by sticker price. Rows without a stated pack size sink to the bottom, because an unlabelled listing cannot be normalised and therefore cannot win a price comparison on evidence. The underlying data is regenerated weekly from each supplier's own listing page.",
      "CJC-1295 is a modified GRF(1-29) analogue. In the DAC form it carries a maleimidopropionic acid linker that binds serum albumin and extends plasma residence time; in the no-DAC form — widely sold as Mod GRF(1-29) — that linker is absent and the pharmacokinetics differ accordingly. The two are priced separately in the market and must never be averaged together, which is why pack size and form both appear in the table rather than price alone.",
      "All material referenced on this page is sold as research-use-only chemical. Nothing here is a recommendation to use CJC-1295 in humans, and none of it is medical advice. For mechanism and reference data, see the [**CJC-1295 hub →**](/compounds/cjc-1295).",
    ],
    sections: [
      {
        title: "How price per milligram is calculated",
        body:
          "Price per milligram is the listed price divided by the nominal peptide mass on the label. A 5mg vial at £24.99 works out at £5.00/mg. A 10mg vial at £41.99 works out at £4.20/mg, so it is cheaper per milligram despite costing nearly twice as much at the till. Where a supplier sells a kit containing both a peptide vial and a diluent, only the peptide mass is counted, so the figure stays comparable across listings.",
      },
      {
        title: "The cheapest listing is not automatically the best purchase",
        body:
          "In a market with no licensing gate, the lowest price is frequently the listing with the least supporting documentation. Before a cheap row earns a place in your shortlist, check that the supplier publishes a batch-referenced Certificate of Analysis and that the batch number matches what ships. The [**CJC-1295 supplier verification guide**](/compound-guides/cjc-1295-supplier-uk) sets out exactly what a genuine COA contains; a PDF with no batch number and no laboratory name is decoration.",
        list: [
          "A price at the bottom of the table with no COA is a data point, not a bargain.",
          "A mid-table price with a batch-linked COA from a named lab is usually the better buy.",
          "Round-number pricing (£20.00, £50.00 flat) is common across UK vendors and is not a quality signal either way.",
        ],
      },
      {
        title: "DAC versus no-DAC changes the economics",
        body:
          "The no-DAC form is generally cheaper because it is a shorter synthesis with no linker step. If you see a CJC-1295 listing dramatically below the market median, check the product title: it is very often Mod GRF(1-29) or 'CJC-1295 without DAC'. Comparing that price against a DAC listing is a category error. Filter by form first, then by price within that form.",
      },
      {
        title: "Volume does not reliably lower the price",
        body:
          "Unlike most chemical markets, UK peptide suppliers do not consistently discount larger vials. In several cases the 5mg vial carries a lower per-milligram price than the 10mg, because the larger pack is priced against a different reference. Sort by the per-mg column and read the actual numbers rather than assuming bulk is cheaper — a pattern that holds across the category, and one worth checking on every compound you buy, not just this one.",
      },
      {
        title: "What the table does not include",
        body:
          "Shipping is excluded from every per-milligram figure. UK suppliers typically charge between £3 and £8 for tracked delivery, and a handful have a free-delivery threshold. On a single small vial, delivery can exceed ten percent of the order value, so a supplier that is second-cheapest per milligram but ships free can be the cheaper total. We do not model this because thresholds change month to month; check the basket total before you commit.",
      },
      {
        title: "The per-milligram trap when a kit is involved",
        body:
          "Several UK suppliers sell CJC-1295 as part of a kit — typically a peptide vial plus a vial of bacteriostatic water, sometimes with swabs. If you divide the kit price by the peptide mass you get a number that looks far worse than the same supplier's bare-vial listing, but the difference is the diluent, not the compound. We calculate per-milligram figures on the peptide mass only and flag kits explicitly, so a kit does not appear artificially expensive. When you do the arithmetic yourself, always ask what the nominal peptide mass in the box actually is before dividing anything by it.",
      },
      {
        title: "Currency, VAT and the figure that is not the price",
        body:
          "Every tracked listing here is a UK supplier quoting in pounds, but a handful of overseas storefronts quote in dollars and convert at checkout, and some UK listings exclude VAT until the basket. A 5mg vial advertised at £24.99 with VAT added at checkout is £29.99 — a twenty percent difference that wipes out an apparent price advantage over a competitor at £27.00 inclusive. We exclude tax treatment from the per-milligram ranking because suppliers present it inconsistently, but it is the first thing to check if two rows that are close on the table look very different in the basket.",
      },
      {
        title: "When the cheapest price is a bad deal on its own terms",
        body:
          "A vial priced at the bottom of the market for a form and pack where every other supplier sits two to three times higher is not a bargain; it is a different product being sold under a familiar name, or a nominal mass that does not match the label, or material with no testing behind it at all. In this category the honest low prices cluster, and the outliers sit well below the cluster. The practical rule is to look at the shape of the table rather than its first row: if the top three rows are within twenty percent of each other, that band is the real market price and everything beneath it deserves a second look at the documentation before you spend anything.",
      },
    ],
    faq: [
      {
        question: "What is a normal price for CJC-1295 in the UK?",
        answer:
          "Most tracked UK listings sit somewhere between roughly £3 and £10 per milligram depending on pack size and whether the DAC linker is present. Anything far below that range is usually the no-DAC form, a smaller nominal mass than the label implies, or an unverified source.",
      },
      {
        question: "Is the cheapest CJC-1295 UK listing safe to buy from?",
        answer:
          "Price carries no information about safety or purity. Assess the supplier on documentation — a batch-referenced COA from a named third-party laboratory — before you consider the price at all.",
      },
      {
        question: "Why do some listings show no price per mg?",
        answer:
          "Because the listing does not state a pack size or states it ambiguously. We do not guess a mass, so those rows appear at the bottom of the ranking with a dash in the per-mg column.",
      },
      {
        question: "Does buying a bigger vial save money?",
        answer:
          "Not reliably. In this market the per-milligram price does not consistently fall as pack size rises, and in some cases the smaller vial is the better value. Check the per-mg column rather than assuming.",
      },
    ],
    sources: [
      {
        label:
          "CJC-1295, a long-acting growth hormone-releasing hormone analog, is resistant to enzymatic degradation (Journal of Clinical Endocrinology & Metabolism)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
      {
        label:
          "GRF(1-29) analogues: structure, half-life extension strategies and pharmacokinetics (review literature)",
        url: "https://pubmed.ncbi.nlm.nih.gov/17018654/",
      },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest CJC-1295 UK — Ranked by Price Per Mg",
    rowLimit: 30,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "cjc-1295-price-uk",
    title: "CJC-1295 Price UK: Full Supplier Price Table 2026",
    description:
      "CJC-1295 price UK — a full side-by-side table of every verified UK supplier listing, with pack sizes, stock status and the price range across the market.",
    h1: "CJC-1295 Price UK",
    focusKeyword: "cjc-1295 price uk",
    intro: [
      "A clear view of CJC-1295 price UK data is difficult to assemble by hand, because the same compound is listed at 2mg, 5mg and 10mg across more than fifty separate UK listings, in two distinct chemical forms, and every supplier displays the figure differently. This page puts all of it in one table so the market range is visible at a glance rather than reconstructed page by page.",
      "The table below lists every CJC-1295 listing ViralPeps tracks, sorted by price. Unlike the [**cheapest CJC-1295 per-milligram ranking**](/compound-guides/cheapest-cjc-1295-uk), this page shows sticker prices as listed, because that is what a buyer actually pays at the checkout. Pack size sits in its own column so you can see immediately why two prices for the same compound differ by a factor of five.",
      "CJC-1295 — tetrasubstituted GRF(1-29) with a maleimidopropionic acid linker — extends growth hormone releasing hormone activity by binding serum albumin, a modification first described in the mid-2000s. The published pharmacokinetic work is why the compound commands a premium over unmodified GRF(1-29) in the research market, and why mislabelled product is worth counterfeiting.",
      "All figures are for research-use-only material and none of this constitutes medical advice. For the compound's mechanism, sequence and full reference list, see the [**CJC-1295 research hub →**](/compounds/cjc-1295).",
    ],
    sections: [
      {
        title: "Reading the range rather than the average",
        body:
          "An average price across this market is close to meaningless: it blends 2mg vials with 10mg vials and DAC with no-DAC listings. The useful figure is the range for a specific form and pack. A 5mg no-DAC vial clusters in a narrow band, and a listing well outside that band is either a different product, a different nominal mass than advertised, or a pricing error. Knowing the band is the fastest way to spot an outlier.",
      },
      {
        title: "What moves a CJC-1295 price",
        body:
          "Four variables account for nearly all of the spread you will see:",
        list: [
          "Nominal mass — 2mg, 5mg and 10mg vials are priced on different scales, not pro rata.",
          "Form — the DAC-linked version carries an extra synthesis step and a higher market price than Mod GRF(1-29).",
          "Presentation — a lyophilised powder vial is cheaper than a pre-filled pen or a kit bundled with bacteriostatic water.",
          "Documentation — suppliers who publish batch-linked third-party COAs generally price above the market floor, because testing costs money.",
        ],
      },
      {
        title: "The 'pen' premium",
        body:
          "Several UK vendors now sell CJC-1295 in a pre-filled cartridge pen rather than a lyophilised vial. The pen format carries a consistent premium — often forty to a hundred percent over the equivalent vial — for the same nominal mass. If you are pricing a research protocol, compare vial to vial and pen to pen. Mixing the two formats in one comparison is the most common cause of a 'this supplier is double the price' conclusion that turns out to be a format difference rather than a pricing difference.",
      },
      {
        title: "Price stability over time",
        body:
          "UK peptide prices are not stable. Suppliers reprice in response to batch costs, and a listing can move twenty percent between two scrapes with no change to the product. This table reflects the most recent weekly check, not a standing quotation. If you are comparing against a figure you saw a month ago, assume it has moved and re-check before treating any difference as a supplier change.",
      },
      {
        title: "Bundles and diluent kits",
        body:
          "A number of listings bundle a diluent vial or a swab pack with the peptide. Those bundles are not comparable to a bare-vial price, though the difference is usually small. Where a bundle is materially more expensive, the premium is normally the diluent rather than the compound — check whether the peptide vial can be bought separately before paying it.",
      },
      {
        title: "What a price trend line would tell you",
        body:
          "Peptide pricing tracks batch costs and supplier inventory rather than any public index, so there is no meaningful market rate to plot against. What is worth watching is the direction of a single supplier's price over successive scrapes: a supplier that has cut its price sharply while keeping the same product title is often clearing stock ahead of a batch change, and a supplier that has raised it may have moved to a more expensive synthetic route or added testing. Neither is automatically a quality signal. The observation is only useful as a prompt to re-read that supplier's current COA and confirm the batch has not changed underneath the price.",
      },
      {
        title: "Why there is no single market price",
        body:
          "Buyers often arrive expecting to find 'the' price for a 5mg CJC-1295 vial and are surprised to find a spread of two or three times. That spread is structural. A UK supplier synthesising domestically, testing every batch and holding stock in a temperature-controlled unit has a different cost base from a drop-shipper forwarding parcels from an overseas warehouse with no testing at all. Both can rank for a UK search term. The table shows you the whole spread rather than a fabricated midpoint, so you can see which suppliers are clustering and which are outliers, and then decide which cost structure you want to buy into.",
      },
      {
        title: "Vial, kit and pen — three products, three prices",
        body:
          "The market now sells CJC-1295 in three distinct presentations, and buyers routinely compare across them by accident. A bare lyophilised vial is the cheapest and the most common. A kit adds a diluent vial and usually a small swab pack, and carries a modest premium for the convenience. A pre-filled cartridge pen carries a substantial premium, because the device itself is a manufactured component rather than a consumable. None of these is better or worse as a product; they are different purchases. If you are cost-modelling a comparison across suppliers, fix the presentation first and then compare prices within it, or the spread you measure will describe packaging rather than price.",
      },
      {
        title: "Reading a price when the listing has no pack size",
        body:
          "A minority of UK listings show a price without a nominal mass anywhere on the page, and a few show a figure that is evidently a per-unit price from a multi-pack option rather than the vial price. Both make a table row unusable for comparison, and both are common enough that buyers should expect them. We do not guess a mass for these rows, so they carry a dash in the per-milligram column and sit outside the ranking rather than distorting it. If a supplier you are considering is in that group, ask them directly for the nominal mass of the vial behind the price, and treat a refusal or an evasive answer as a reason to move on.",
      },
    ],
    faq: [
      {
        question: "Why is there such a wide price range for CJC-1295 in the UK?",
        answer:
          "Because the listings are not equivalent. Nominal mass, DAC versus no-DAC form, vial versus pen presentation and whether documentation is included all vary, and each one moves the price. Compare within a single form and pack size, never across the whole table.",
      },
      {
        question: "Does a higher price mean higher purity?",
        answer:
          "Not on its own. Price reflects synthesis route, presentation and overheads as much as testing. The only reliable purity signal is a Certificate of Analysis from a named third-party laboratory that references the batch number on your vial.",
      },
      {
        question: "Are pen prices directly comparable to vial prices?",
        answer:
          "No. The pen format carries a consistent premium for the same nominal mass. Compare vial to vial and pen to pen, or you will draw a false conclusion about which supplier is expensive.",
      },
      {
        question: "How current is this price table?",
        answer:
          "It is regenerated from a weekly scrape of each supplier's own listing page. Treat every figure as an indicative snapshot and confirm the live price on the supplier's site before ordering.",
      },
    ],
    sources: [
      {
        label:
          "Prolonged stimulation of GH and IGF-I secretion by CJC-1295, a long-acting heat-stable analog of GH-releasing hormone (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
      {
        label:
          "Sustained GH and IGF-I responses to CJC-1295 in healthy adults (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/17018654/",
      },
    ],
    tableMode: "full",
    tableHeading: "CJC-1295 Price UK — Every Tracked Supplier Listing",
    rowLimit: 40,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-cjc-1295-online-uk",
    title: "Buy CJC-1295 Online UK: Ordering & Delivery Guide",
    description:
      "Buy CJC-1295 online UK — what to check before you order, how UK payment and delivery actually work, and the red flags that separate real vendors from fronts.",
    h1: "Buy CJC-1295 Online UK",
    focusKeyword: "buy cjc-1295 online uk",
    intro: [
      "To buy CJC-1295 online UK buyers have to make a judgement in about ninety seconds, usually on a product page with a price, a photo and very little else. That judgement is worth slowing down for. CJC-1295 is a modified GRF(1-29) analogue whose DAC-linked form binds serum albumin to extend its circulation time, and the price of a mislabelled vial is not just money — it is an entire experiment built on an unknown substance.",
      "This page covers the mechanics rather than the compound: what the ordering process looks like at a UK research supplier, how payment and delivery work in practice, what you should receive, and the patterns that mark a storefront as a front. The live table shows which tracked suppliers currently list stock and at what price.",
      "The underlying chemistry is well documented. CJC-1295 was described in the mid-2000s as a heat-stable, enzyme-resistant GHRH analogue with a substantially extended plasma residence time compared with unmodified GRF(1-29). Suppliers selling material under that name are claiming a specific synthetic identity; a buyer is entitled to ask for the evidence behind it.",
      "Everything on this page relates to research-use-only material. CJC-1295 is not a licensed medicine in the UK and none of this is medical advice or a recommendation for human use. For reference data, see the [**CJC-1295 hub →**](/compounds/cjc-1295).",
    ],
    sections: [
      {
        title: "What a legitimate UK order looks like, step by step",
        body:
          "The process is short, and every step is a chance to verify something.",
        list: [
          "Check the product title states DAC or no-DAC, the nominal mass, and research-use-only. An ambiguous title is the single most common cause of receiving the wrong form.",
          "Read the COA before paying. It should name the laboratory, the batch and a purity figure measured by HPLC, with mass confirmation by mass spectrometry.",
          "Confirm the delivery window and the courier. UK-tracked dispatch is typically one to three working days.",
          "Pay by a method with recourse — a card, or an escrow-backed processor. A supplier that accepts only bank transfer or crypto removes your ability to dispute.",
          "Photograph the sealed vial on arrival, then check the batch number against the COA you read at step two.",
        ],
      },
      {
        title: "Payment methods and what they tell you",
        body:
          "Card payment through a mainstream processor means the vendor passed that processor's onboarding checks, which is a weak but real signal. Bank transfer and cryptocurrency are common in this sector and are not inherently dishonest, but they remove the chargeback route entirely. If a vendor takes card for most products and asks for a transfer specifically when you order a peptide, treat that as a category signal rather than an inconvenience.",
      },
      {
        title: "Delivery, temperature and the cold-chain question",
        body:
          "CJC-1295 ships as a lyophilised powder, which is stable at ambient temperature for the duration of a normal domestic transit. The cold chain matters after reconstitution, not before. A supplier who ships on a two-to-three-week international route is still a risk, not because the powder degrades in transit but because the parcel's handling history is unknowable and customs delays are common. Domestic dispatch removes that variable entirely — it is the strongest practical argument for buying UK-listed.",
      },
      {
        title: "What should be in the box",
        body:
          "A UK research order should arrive with the peptide vial sealed, a batch number on the label matching the COA, and — if the listing included them — the diluent and swabs. A vial with no batch number, a handwritten label, or a COA that arrives as a generic PDF with no batch reference is not documented product, whatever the price was.",
      },
      {
        title: "Red flags on a product page",
        body:
          "These patterns are worth walking away from:",
        list: [
          "Dosing instructions or human-use guidance. Research suppliers do not publish protocols for people.",
          "Testimonials describing physical results, which imply human use and are a compliance failure.",
          "A COA that is a stock image reused across every product on the site.",
          "No company number, no registered address, and a contact form as the only channel.",
          "Prices far below the market band for the same form and pack — usually a different product entirely.",
        ],
      },
      {
        title: "What happens after the order — reconstitution and storage",
        body:
          "The practical failure mode in this market is rarely the order; it is what happens to the vial afterwards. Lyophilised CJC-1295 is stable at ambient temperature in transit, but once reconstituted with bacteriostatic water it needs refrigeration and a short working life, and repeated freeze-thaw cycles degrade it. A supplier who ships a diluent is implicitly supporting that step; one who ships the peptide alone expects you to source diluent separately, and diluent quality varies too. Store the sealed vial dry and cool, reconstitute only what you will use, and keep the batch number with the vial so the COA remains traceable to the material you actually have in the fridge.",
      },
      {
        title: "Order tracking, dispatch and what to do when it goes wrong",
        body:
          "Tracked UK dispatch should give you a working tracking number within a day. If a supplier dispatches without tracking on a domestic order, that is worth noting even if the parcel arrives, because it removes your ability to establish where a missing parcel went. When something does arrive damaged or wrong, the documentation matters: photograph the sealed packet before opening, photograph the label showing the batch number, and raise it in writing within the first day. Suppliers with a documented process resolve this quickly; storefronts with no returns policy usually answer with silence, which is itself the answer.",
      },
      {
        title: "Ordering a blend rather than the single peptide",
        body:
          "A large share of UK searches for this compound are actually searches for the CJC-1295 and Ipamorelin blend, which is sold as a single vial containing both peptides in stated proportions. That is a different product with a different price and, importantly, a different documentation requirement: the COA for a blend should show both components, with purity reported for each. A blend certificate that reports a single purity figure for the whole vial tells you very little about either component. If the listing title is simply 'CJC-1295' and the price looks unusually high for the mass, check whether it is a blend before assuming the supplier is expensive.",
      },
    ],
    faq: [
      {
        question: "Can I buy CJC-1295 online in the UK without a prescription?",
        answer:
          "Research-use-only material is sold without a prescription on the basis that it is not for human consumption. That is a supply classification, not a safety or quality guarantee. Licensed human-use products require a prescription and are a different category entirely.",
      },
      {
        question: "How long does UK delivery take?",
        answer:
          "Most UK-listed suppliers dispatch within one working day and deliver in one to three working days with tracking. Overseas storefronts advertising to UK buyers typically quote one to three weeks plus customs exposure.",
      },
      {
        question: "Does CJC-1295 need to be shipped cold?",
        answer:
          "No. It ships as a lyophilised powder, which is stable at ambient temperature through normal domestic transit. Cold-chain handling matters after reconstitution, not before.",
      },
      {
        question: "What if the batch number does not match the COA?",
        answer:
          "Do not use the material and raise it with the supplier in writing. A mismatch means the document does not establish anything about the vial in your hand, which defeats the purpose of buying documented product in the first place.",
      },
    ],
    sources: [
      {
        label:
          "Prolonged stimulation of GH and IGF-I secretion by CJC-1295, a long-acting heat-stable analog of GH-releasing hormone (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
      {
        label:
          "Guidance on the handling and storage of lyophilised peptide reference materials (general laboratory practice)",
        url: "https://www.nist.gov/programs-projects/reference-materials",
      },
    ],
    tableMode: "price",
    tableHeading: "Buy CJC-1295 Online UK — Suppliers With Live Listings",
    rowLimit: 20,
  },
  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "cjc-1295-supplier-uk",
    title: "CJC-1295 Supplier UK: How to Verify a Vendor",
    description:
      "CJC-1295 supplier UK verification — how to check a vendor's Certificate of Analysis, batch numbering, purity figures and company details before you order.",
    h1: "CJC-1295 Supplier UK",
    focusKeyword: "cjc-1295 supplier uk",
    intro: [
      "Judging a CJC-1295 supplier UK buyers should treat every vendor claim as unevidenced until it is checked. There is no licensing gate on research peptides in the UK, which means the difference between a documented supplier and a storefront that accepts card payments is entirely documentation — and documentation is exactly what a buyer can inspect before spending anything.",
      "This page is the verification method, written down. It covers what a real Certificate of Analysis contains, how batch numbering works, how to interpret a purity figure, and what a UK company footprint looks like when it is genuine. The table below ranks currently tracked suppliers by TrustScore, which is built from those same non-purchasable signals.",
      "CJC-1295 is a modified GRF(1-29) sequence with a maleimidopropionic acid linker in its DAC form, binding serum albumin to extend activity. That specific identity — a defined 29-residue backbone plus a linker — is something a competent analytical laboratory can confirm by mass spectrometry, which is why the mass figure on the COA matters as much as the purity percentage.",
      "All material discussed is research-use-only chemical. Nothing here is medical advice. For the compound's reference data and mechanism, see the [**CJC-1295 hub →**](/compounds/cjc-1295).",
    ],
    sections: [
      {
        title: "What a genuine Certificate of Analysis contains",
        body:
          "A COA is a laboratory report, not a marketing asset. The credible ones share a structure, and any element missing from this list is a gap you should be able to explain before you rely on the document.",
        list: [
          "The name of the testing laboratory — a third party, not a line on the vendor's own letterhead.",
          "A batch or lot number that matches the vial label exactly, not a generic product code.",
          "A purity figure measured by HPLC, normally with the chromatogram reproduced and the retention time visible.",
          "Mass confirmation by mass spectrometry, with the observed value close to the theoretical mass for the compound.",
          "Appearance and, where relevant, water content and residual solvent figures.",
          "A test date. A COA from three years ago says nothing about the batch you are buying today.",
        ],
      },
      {
        title: "Reading purity properly",
        body:
          "A purity figure of 98.5 percent by HPLC means 98.5 percent of the ultraviolet-absorbing material in the sample was the target peak. It does not tell you what the other 1.5 percent is, whether the sample was diluted with a bulking agent before analysis, or whether the tested sample came from the same vial you will receive. Those limitations are normal and not, in themselves, a red flag — but a vendor presenting a purity figure as a purity guarantee is overstating what the document says.",
      },
      {
        title: "Batch numbering is the real test",
        body:
          "The one thing a vendor cannot easily fake is a batch number that resolves. Because a COA describes one specific lot, the batch number on the vial must match the batch number on the report. Where suppliers publish a COA library indexed by batch, that is a meaningfully stronger signal than a single PDF that has evidently been doing duty across the whole catalogue for two years. If you are comparing two vendors at similar price, this is the tie-break worth applying.",
      },
      {
        title: "The UK company footprint",
        body:
          "A UK research supplier should be identifiable as a UK business. Search the company name on Companies House; check that the registered address matches the address on the site, that the company is not in the process of being struck off, and that its incorporation date is coherent with the site's own history. A supplier that has been trading for two years will not have blog posts dated five years earlier, and a supplier with no company registration at all is an individual trading through a hosted storefront.",
      },
      {
        title: "The contact test",
        body:
          "Send a short, specific, technical question before ordering — ask for the COA of a current batch, or ask which form of CJC-1295 a listing refers to. A documented supplier answers with the document attached. A storefront answers with reassurance, or not at all. This single test separates the two categories more reliably than any review score, and it costs nothing but a day of lead time.",
      },
      {
        title: "What TrustScore is and is not",
        body:
          "TrustScore on this site is computed from non-purchasable signals: whether the site is live, returns a valid response, publishes a COA, states research-use-only terms, shows genuine reviews, provides contact and shipping information, and has confirmed domain ownership through the badge. It is not for sale, it carries no weight from advertising, and it does not assess the purity of any specific batch. It is a screening tool for the shortlist, not a substitute for reading the COA of the vial you actually bought.",
      },
      {
        title: "A short worked example of the method",
        body:
          "Suppose two suppliers list a 10mg CJC-1295 vial, one at £42 and one at £55. The instinct is to buy at £42. Applying the method changes that: the £42 listing publishes no COA on the product page, its site has no company number, and its contact form does not respond to a technical question. The £55 supplier publishes a batch-indexed COA library naming a third-party laboratory, has a Companies House registration matching its address, and answers within a day with the current certificate attached. On documentation, the more expensive vial is the only one of the two you can describe in a write-up. That is the entire method — cost is the last thing you compare, not the first.",
      },
      {
        title: "Where verification stops being possible",
        body:
          "There is a limit to what a buyer can check remotely. You can confirm that a laboratory exists, that a certificate's format matches that laboratory's published reports, that a batch number resolves, and that a company is registered. You cannot, from a website, confirm that the material in the vial is the material on the certificate — that requires your own analysis or a supplier relationship built over time. Being clear about that boundary is useful: it means the purpose of verification is not certainty but the elimination of suppliers who cannot even produce consistent paperwork, which removes a large share of the market.",
      },
    ],
    faq: [
      {
        question: "How do I check a CJC-1295 supplier is legitimate?",
        answer:
          "Four checks: a batch-linked COA from a named third-party laboratory, a Companies House registration that matches the site's address, a working contact channel you have tested with a technical question, and research-use-only terms on the listing. A supplier that passes all four is documented; none of the four guarantees purity of any individual vial.",
      },
      {
        question: "What purity should a CJC-1295 COA show?",
        answer:
          "Most published COAs for research peptides report HPLC purity in the high nineties. The figure matters less than whether the chromatogram is shown, the batch number matches, and the mass confirmation is consistent with the compound's theoretical mass.",
      },
      {
        question: "Can a supplier fake a Certificate of Analysis?",
        answer:
          "A document can be fabricated, which is why batch linkage and a named third-party laboratory matter. Verifying that the laboratory exists and that the certificate format matches its published reports is a reasonable next step if the value of the order justifies it.",
      },
      {
        question: "Does TrustScore cost the supplier anything?",
        answer:
          "No. The signals are collected independently and the method is not for sale. Domain verification through the badge is free and confirms ownership only; it does not affect the other scoring signals.",
      },
    ],
    sources: [
      {
        label:
          "Prolonged stimulation of GH and IGF-I secretion by CJC-1295, a long-acting heat-stable analog of GH-releasing hormone (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
      {
        label:
          "Companies House — UK company register search (official verification source)",
        url: "https://find-and-update.company-information.service.gov.uk/",
      },
    ],
    tableMode: "trust",
    tableHeading: "CJC-1295 Supplier UK — Ranked by TrustScore",
    rowLimit: 20,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-cjc-1295-peptide",
    title: "Best CJC-1295 Peptide UK: Ranked by Trust 2026",
    description:
      "Best CJC-1295 peptide UK — suppliers ranked on independent TrustScore, COA verification and price, with the criteria spelled out so you can check the ranking.",
    h1: "Best CJC-1295 Peptide",
    focusKeyword: "best cjc-1295 peptide",
    intro: [
      "Choosing the best CJC-1295 peptide UK buyers face a comparison with no objective answer published anywhere: every vendor calls its own product the best, and none of them show a verifiable basis for the claim. This page takes a different approach. It ranks tracked suppliers on an explicit, non-purchasable scoring method and shows the criteria, so you can disagree with the ranking on evidence rather than on intuition.",
      "The table below is ordered by TrustScore — a composite of site liveness, published Certificates of Analysis, research-use-only terms, verified contact, genuine reviews, shipping information and confirmed domain ownership. Price appears in every row but does not drive the order, because a cheap vial with no documentation is not a better buy than a documented one at a higher price.",
      "CJC-1295 is a growth hormone-releasing hormone analogue — a tetrasubstituted GRF(1-29) with a maleimidopropionic acid linker in its DAC form. Its research significance rests on a defined synthetic identity, which matters here: 'best' in this market is largely a question of which supplier can demonstrate that the vial contains the compound it claims, at the purity it claims.",
      "All products referenced are research-use-only chemical and nothing on this page is medical advice. For the compound's full profile, use the [**CJC-1295 research hub →**](/compounds/cjc-1295).",
    ],
    sections: [
      {
        title: "The six criteria behind the ranking",
        body:
          "Every supplier in the table is assessed on the same fixed signals. None of them can be bought, and none of them are weighted by commercial relationship.",
        list: [
          "Liveness — the site resolves and returns a valid response on the check date.",
          "Certificate of Analysis — a COA is published and reachable from the product page.",
          "Research-use-only terms — the listing states RUO rather than making therapeutic claims.",
          "Contact — a verifiable contact route exists and is not a form that discards messages.",
          "Reviews — genuine, attributable customer feedback rather than anonymous stock quotes.",
          "Domain ownership — confirmed through the badge, which is free and does not affect the other signals.",
        ],
      },
      {
        title: "Why price is deliberately not the ranking driver",
        body:
          "Sorting by price would put undocumented listings at the top of the table on a single, easily-manipulated number. The market has no licensing gate, so documentation is the only quality signal a buyer can inspect before purchase. Price is shown in every row so you can judge value yourself once verification has narrowed the field. If you want the pure price view, the [**cheapest CJC-1295 per-mg page**](/compound-guides/cheapest-cjc-1295-uk) ranks on that basis alone.",
      },
      {
        title: "DAC and no-DAC are different products",
        body:
          "No comparison of CJC-1295 is meaningful without stating the form. The DAC-linked version binds albumin covalently and circulates for far longer; Mod GRF(1-29) — often sold as 'CJC-1295 without DAC' — lacks the linker and behaves like the parent sequence. A supplier may stock one, the other, or both at different prices. Before ranking anything, confirm the product title. Many of the lowest prices in this market are the no-DAC form, and a comparison that blends the two is not a comparison.",
      },
      {
        title: "How to use the ranking without trusting it",
        body:
          "Treat the table as a shortlist, not a verdict. Take the top three suppliers, fetch the current COA for the batch each is selling, and check the batch number matches the vial label. Then check the mass figure against the theoretical mass for the form you want. The supplier whose documents survive that check is the better supplier for you, even if it sits third in the table — the score describes the vendor's general practice, the COA describes the specific vial.",
      },
      {
        title: "The signals that should eliminate a supplier outright",
        body:
          "Some findings are disqualifying rather than merely negative: human-use dosing guidance on a research listing, testimonials describing physical outcomes, a COA that is evidently shared across the entire catalogue with no batch reference, and no UK company registration behind the storefront. Any one of these should remove a supplier from consideration regardless of score or price.",
      },
      {
        title: "How the ranking handles a tie",
        body:
          "Suppliers frequently land on the same TrustScore, particularly where both publish a COA and state research-use-only terms but differ on reviews or shipping detail. Ties are broken by price, then by verified status, so a verified supplier outranks an unverified one at the same score and the cheaper of two equally-scored suppliers appears first. This is a display rule rather than a quality judgement: two suppliers on the same score are, as far as the method can tell, equally documented, and the tie-break is there to give the table a stable order. Read the scores, not the positions, when the gap between rows is small.",
      },
      {
        title: "Why a supplier can drop quickly",
        body:
          "The inputs are re-checked automatically, so a supplier that lets its COA page lapse, moves to a host that stops responding, or removes its contact details will fall several places between two updates. That volatility is intentional — in a market with no licensing gate, a document library is the supplier's main quality claim, and a supplier that stops maintaining it has stopped making the claim. If you are reading this at a later date, treat a supplier's position as a snapshot and confirm the current state of its COA page before ordering.",
      },
      {
        title: "How this differs from a review site",
        body:
          "Most 'best CJC-1295 peptide' pages are affiliate lists ordered by commission, and the ranking changes when a commercial arrangement changes. This page is ordered by a fixed method applied identically to every supplier, with the criteria published above so you can audit the order. If a supplier adds a batch-indexed COA library tomorrow, its position will move on the next check without anyone needing to be persuaded. That is a lower claim than 'best', and a more useful one: it says which suppliers would survive a documentation audit, which is the only comparison a buyer can actually verify for themselves before ordering.",
      },
      {
        title: "The one thing to check before you order",
        body:
          "Whichever supplier tops this table on the day you read it, the decision that matters is the certificate for the specific batch they are currently shipping. Open the product page, download the current COA, and read three numbers: the batch reference, the HPLC purity with its chromatogram, and the observed mass against the theoretical mass for the form you intend to buy. If all three are consistent and the batch number matches the vial on dispatch, you have bought documented material regardless of where the supplier sits in the ranking. If any one of them is missing, no position in any table compensates for it.",
      },
    ],
    faq: [
      {
        question: "What makes the best CJC-1295 peptide?",
        answer:
          "Documentation rather than price: a batch-linked COA from a named third-party laboratory, research-use-only terms, a verifiable UK company footprint and a working contact channel. Purity of the specific vial is confirmed by the COA for that batch, not by the vendor's general reputation.",
      },
      {
        question: "Is the most expensive CJC-1295 the best?",
        answer:
          "No. Price reflects synthesis route, presentation and overheads as much as testing. Several mid-priced suppliers rank above the most expensive listings on documentation. Use price as a tie-break after verification, not as a proxy for quality.",
      },
      {
        question: "Should I buy DAC or no-DAC CJC-1295?",
        answer:
          "That is a research-design question, not a purchasing one. They are distinct molecules with different pharmacokinetics, and neither is universally preferable. The purchasing point is simply to know which one you are buying before comparing prices.",
      },
      {
        question: "How often is this ranking updated?",
        answer:
          "The TrustScore inputs are refreshed by an automated liveness and signal check, and the price column is regenerated weekly. A supplier that adds a COA library will move up; one whose site goes dark will move down.",
      },
    ],
    sources: [
      {
        label:
          "Prolonged stimulation of GH and IGF-I secretion by CJC-1295, a long-acting heat-stable analog of GH-releasing hormone (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
      {
        label:
          "Sustained GH and IGF-I responses to CJC-1295 in healthy adults: a randomized, placebo-controlled study (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/17018654/",
      },
    ],
    tableMode: "trust",
    tableHeading: "Best CJC-1295 Peptide UK — Ranked by TrustScore",
    rowLimit: 20,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
