/**
 * Sermorelin silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/sermorelin-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — autocomplete evidence pulled live from Google UK (2026-10-21):
 *   1. where-to-buy-sermorelin-uk     → `where to buy sermorelin uk` = 0 UK hits → substituted
 *                                       `where can i buy sermorelin` (exact #1, also `...sermorelin peptide`)
 *   2. cheapest-sermorelin-uk         → `cheapest sermorelin uk` = 0 → substituted `cheapest sermorelin`
 *                                       (exact #1, also `cheapest sermorelin peptide`, `sermorelin cheapest price`)
 *   3. sermorelin-price-comparison-uk → `sermorelin price comparison uk` = 0 → substituted
 *                                       `sermorelin price uk` (exact #1, also `sermorelin peptide uk price`,
 *                                       `sermorelin 10mg uk price`)
 *   4. buy-sermorelin-online-uk       → `buy sermorelin online uk` = 0 → substituted `buy sermorelin uk`
 *                                       (exact #1, also `buy sermorelin nasal spray uk`, corroborated by
 *                                       `buy sermorelin online` / `sermorelin buy uk`)
 *   5. sermorelin-for-sale-uk         → `sermorelin uk supplier` = 0 (also `sermorelin suppliers uk`) →
 *                                       substituted `sermorelin for sale uk` (close hit `sermorelin peptide
 *                                       for sale uk` #1, plus `sermorelin buy uk`)
 *   6. best-sermorelin-peptide        → exact match #1 (`best sermorelin peptide`) — passed
 *
 * Note: Sermorelin is not a GLP-1, so the GLP-1 modifier set does not transfer —
 * the same substitution pattern seen on Semax, Selank, Ipamorelin and MOTS-c.
 * Corroborating hits: `sermorelin uk peptides`, `sermorelin uk legal`, `sermorelin uk dosage`,
 * `sermorelin uk prescription`, `sermorelin uk nasal spray`, `sermorelin peptide buy uk`.
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
    slug: "where-to-buy-sermorelin-uk",
    title: "Where to Buy Sermorelin UK: Verified Suppliers",
    description:
      "Where to buy Sermorelin UK — compare live prices from every UK research supplier we track, then check the COA, pack size, purity and stock before ordering.",
    h1: "Where to Buy Sermorelin UK",
    focusKeyword: "where to buy sermorelin uk",
    intro: [
      "Looking for where to buy Sermorelin UK means navigating a compound that changes name depending on who is selling it. Sermorelin is the generic name for growth hormone-releasing factor 1-29, usually abbreviated GRF(1-29), and it appears on UK supplier sites as sermorelin acetate, sermorelin (GRF 1-29), GRF 1-29, or simply sermorelin. In clinical reference material it is also written as GHRH(1-29)NH2 — the amide form of the first twenty-nine amino acids of human growth hormone-releasing hormone. All of those labels describe the same 29-residue peptide with the sequence YADAIFTNSYRKVLGQLSARKLLQDILSR, capped at the C-terminus by an amide group.",
      "That naming sprawl has a practical cost when you are trying to buy. Two listings that look like separate products are often the same molecule, while two listings with near-identical names can be selling materially different articles: a lyophilised research vial, a pre-mixed injection pen, a multi-vial bundle, or a combined sermorelin and ipamorelin product. This page does not try to argue which is better in the abstract. It shows you a live table of every Sermorelin listing from UK suppliers that ViralPeps tracks, with the pack label, headline price, cost per milligram where the pack states a milligram figure, stock status, verification state and a direct link to the supplier's own product page.",
      "Sermorelin has an unusually long and unusually legitimate research history for a compound sold as a research reagent. It was developed in the 1980s as a truncated analogue of GHRH, precisely because the full 44-amino-acid hormone was unstable and difficult to manufacture. The 1-29 fragment retains the receptor-binding region and the biological activity while being far easier to synthesise, which is why it became the standard laboratory tool for probing somatotroph function. It was later approved in the United States as Geref for diagnostic use and for treating growth hormone deficiency in children, and it has been studied in healthy older adults, in immune function in ageing, and as a comparator in growth hormone secretagogue research more broadly. The papers at the foot of this page are real and checkable.",
      "One boundary needs stating plainly. Every listing on this page is a research-use-only reagent sold to laboratories, and nothing here is medical advice. Sermorelin is not a licensed medicine in the UK, is not authorised for human use, and a research vial is not the same article as a regulated pharmaceutical product even when the peptide sequence is identical. If you are auditing the market rather than buying today, the [**Sermorelin price comparison hub →**](/compounds/sermorelin) is the better starting point.",
    ],
    sections: [
      {
        title: "Where to Buy Sermorelin UK — The Questions That Actually Decide It",
        body: "The phrase \"where to buy\" hides a more useful question: which supplier can you verify? Sermorelin is exposed on this front in a way that GLP-1 compounds are not. Because it has a genuine clinical history — a former prescription product, decades of published endocrinology, a recognised role in growth hormone testing — it attracts buyers who assume a research listing is a close substitute for the original medicine. That assumption is exactly what the least careful storefronts trade on. A site that leans on trial language, GH-axis claims and before-and-after framing while publishing no batch documentation is telling you something about how it operates.\n\nOur supplier audit applies the same checklist to every listing we track. A Certificate of Analysis from a named laboratory referencing a specific batch number. A contact route that genuinely replies to a question, tested before you order rather than after. Unambiguous research-use-only labelling throughout, with no marketing implying human or therapeutic use. A registered business identity behind the storefront. And confirmed control of the domain they sell from, which is what the TrustScore badge verifies: a supplier who installs it on their own site is proving they control that domain, which rules out the throwaway storefronts that characterise the lower end of this market.\n\nFor Sermorelin specifically, two further checks matter more than they do for most peptides. The first is pack quantity. A meaningful share of UK Sermorelin listings quote a price and a product name with no milligram figure at all, sometimes because the source page is vague, sometimes because the vendor sells several pack sizes and has not broken them out. A listing that will not tell you how much material you are buying cannot be compared with one that will. The second is format. Sermorelin is sold as a plain lyophilised vial, as a pre-mixed pen, and as a combined product with ipamorelin; those are three different articles with three different handling requirements, and a price comparison that does not distinguish them is comparing apples to cartridges.",
        list: [
          "A Certificate of Analysis from a named third-party laboratory referencing a specific batch number — the single most decisive signal available to a buyer.",
          "A working contact route: an email that replies or a phone that connects, tested before you order.",
          "Research-use-only labelling throughout, with no marketing implying human, therapeutic or performance use.",
          "A stated pack quantity in milligrams, so the listing can be compared honestly on cost per mg.",
          "A clearly identified format — plain vial, pre-mixed pen, or combination product — so you know what you are actually handling.",
          "Confirmed domain ownership, which is what the TrustScore badge verifies.",
        ],
      },
      {
        title: "The Names Sermorelin Is Sold Under in the UK",
        body: "If you only search one term you will under-report the market substantially. The table below maps the names you will encounter to the single molecule they describe, so you can fold them into one comparison instead of treating them as separate products.\n\nSermorelin acetate is the salt form used in almost every commercial preparation. The acetate counter-ion is a manufacturing and stability choice, not a different peptide, so a listing titled \"sermorelin acetate 5mg\" and one titled \"sermorelin 5mg\" are very likely the same article. GRF(1-29) and GHRH(1-29) are the structural names, and some suppliers — particularly those who buy from European or Chinese contract manufacturers — print those rather than the generic name. Geref was the former US brand name and appears mainly in older literature and secondhand listings, so treat any current UK listing using it as a signal that the vendor is recycling marketing copy rather than describing their own stock.\n\nThe most consequential naming distinction is not a name at all but a blend. Sermorelin is frequently sold alongside ipamorelin, a synthetic growth hormone secretagogue that acts on a different receptor, and the combined product is priced as one item. A combined product is not a cheaper way to buy Sermorelin; it is a different article. If your research requires a single defined compound at a known concentration, buy the single-compound vial and add the second compound deliberately — otherwise you cannot attribute an effect or a result to either component.",
        table: {
          header: ["Name you will see", "What it actually is"],
          rows: [
            ["Sermorelin", "Generic name for GRF(1-29); standard label on most UK research listings"],
            ["Sermorelin acetate", "The acetate salt of the same peptide — same sequence, standard commercial form"],
            ["GRF(1-29) / GHRH(1-29)", "Structural names describing the same 29-residue fragment"],
            ["GHRH(1-29)NH2", "The C-terminally amidated form found in the literature; the amide is part of the native analogue"],
            ["Geref", "Former US brand name — historical; rarely the correct label for current stock"],
            ["Sermorelin + Ipamorelin", "A blend of two distinct compounds acting on different receptors — a different article"],
          ],
        },
      },
      {
        title: "What the UK Market Looks Like Right Now",
        body: "The Sermorelin market in the UK is broad but uneven. It is stocked by generalist peptide suppliers and by a smaller number of vendors who specialise in the growth hormone axis, and the price band is wide. Some of that spread is legitimate: pack size is the dominant driver, because a 10mg vial carries a materially lower cost per milligram than a 2mg vial, and a pre-mixed pen costs more than a bare vial of the same quantity because it includes the device and the diluent. Some of the spread reflects vendor overheads — UK warehousing, commissioned testing, printed batch-linked COAs and responsive support all cost money, and a bare-bones reseller drop-shipping from overseas does not carry any of it.\n\nThe remaining part of the spread is informational rather than economic, and it is the part buyers most often miss. A listing with no stated pack size cannot be priced at all, yet it sits in the same search results as listings that can. A listing quoting a range rather than a single figure is usually a page covering several pack sizes without breaking them out, which means the headline number is not a price you can actually pay. Our table handles both cases by showing the pack label explicitly and ranking where a real milligram figure exists. We would rather show a row with a visible gap than invent a comparison that is not there.\n\nA note on stock. Availability is recorded next to price rather than in a footnote because Sermorelin listings go out of stock routinely: it is a longer peptide to synthesise than a four-residue fragment, and UK-held inventory is thinner than the listing count suggests. When Sermorelin is genuinely held in UK inventory, delivery is typically a matter of days. When it is drop-shipped, the quoted window frequently slips and import handling becomes your problem. Checking the stock column before you shortlist is worth more than a few pounds of headline saving.\n\nUnusually low prices deserve a question rather than a celebration. In a market where the same material carries several names and where some listings will not state a quantity, the cheapest entry is frequently the one with the least information attached to it. If you want the per-milligram view specifically, the [cheapest Sermorelin guide](/compound-guides/cheapest-sermorelin-uk) ranks on exactly that basis; if you want the growth hormone context that explains why this compound is bought at all, the [Ipamorelin hub](/compounds/ipamorelin) covers the secretagogue side of the same axis.",
      },
      {
        title: "Formats: Vial, Pen and Blend",
        body: "Sermorelin is sold in three formats in the UK, and choosing between them is a decision about what your research needs rather than about price.\n\nA lyophilised vial is the standard research article. You receive the peptide as a dry powder, which is the most stable form for storage and transport, and you reconstitute it yourself with a diluent such as bacteriostatic water. This is the format with the clearest documentation trail: batch numbers, COAs and purity figures usually refer to the powder as supplied, and the reconstitution step is yours, so there is no ambiguity about what was in the vial. If your work requires a defined concentration, this is the format that gives you control over it.\n\nA pre-mixed pen is a device-based format that arrives with the peptide already in solution. It is convenient and it removes the reconstitution variable, but it introduces two others: the concentration is fixed by the manufacturer rather than by you, and stability in solution is a real constraint for a peptide with a short circulating half-life. A pen is a reasonable choice when you need a delivered volume and have no reason to vary concentration; it is a poor choice when you need a defined molar quantity for an assay.\n\nA sermorelin and ipamorelin blend is a third article entirely. It is sold as one product at one price, and the marketing tends to frame it as a value proposition, but the two components act through different mechanisms: Sermorelin is a GHRH receptor agonist that signals through the somatotroph, while ipamorelin is a ghrelin-receptor secretagogue with a different selectivity profile. If a result comes out of a blend, you cannot attribute it to either component. For most laboratory work, single-compound vials analysed separately are the more useful purchase, and they are also easier to document.",
      },
    ],
    faq: [
      {
        question: "Where can I buy Sermorelin in the UK?",
        answer:
          "ViralPeps compares Sermorelin listings from UK research-chemical suppliers, who sell the lyophilised peptide strictly for laboratory use under research-use-only terms. We list only suppliers whose verification signals — COA, contact, compliance and domain ownership — we can independently confirm, and the live table above shows every one we currently track.",
      },
      {
        question: "Is Sermorelin the same as GRF 1-29?",
        answer:
          "Yes. Sermorelin is the generic name for growth hormone-releasing factor 1-29, the first twenty-nine amino acids of human GHRH with an amide cap at the C-terminus. UK suppliers list it as sermorelin, sermorelin acetate, GRF(1-29) or GHRH(1-29)NH2, and all of those describe the same peptide.",
      },
      {
        question: "Is Sermorelin legal in the UK?",
        answer:
          "Sermorelin is not a licensed medicine in the UK and is not authorised for human use. It is sold as a research reagent under research-use-only terms intended for laboratory and educational purposes. Supplying it for human consumption would engage medicines regulation, which is why reputable UK vendors label and market it strictly as a research chemical. We present this information for reference only.",
      },
      {
        question: "Why do Sermorelin prices vary so much between UK suppliers?",
        answer:
          "Pack size is the main driver — a 10mg vial carries a much lower cost per milligram than a 2mg vial — followed by format (a pre-mixed pen costs more than a bare vial) and vendor overheads such as UK warehousing, commissioned testing, printed COAs and support. Some of the spread also reflects listings that publish a range rather than a single price, or no pack quantity at all.",
      },
      {
        question: "Should I buy a Sermorelin pen or a lyophilised vial?",
        answer:
          "A vial gives you control over reconstitution and concentration and comes with the clearest batch documentation; a pre-mixed pen fixes the concentration for you and adds solution-stability considerations. For assay work where a defined molar quantity matters, the vial is generally the more useful article.",
      },
    ],
    sources: [
      { label: "Sermorelin: a better approach to management of adult-onset growth hormone insufficiency? (Clin Interv Aging 2006)", url: "https://pubmed.ncbi.nlm.nih.gov/18046908/" },
      { label: "Sermorelin: a review of its use in the diagnosis and treatment of children with idiopathic growth hormone deficiency (BioDrugs 1999)", url: "https://pubmed.ncbi.nlm.nih.gov/18031173/" },
      { label: "The history of an effective, specific and sensitive diagnostic test: the GHRH test in clinical practice (Rev Endocr Metab Disord 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39681762/" },
      { label: "Hypothalamic GHRH (Rev Endocr Metab Disord 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39913072/" },
      { label: "The emerging landscape of performance-enhancing peptides modulating the GH-IGF1 axis (Front Endocrinol 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42395176/" },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy Sermorelin UK — Live Supplier Prices",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-sermorelin-uk",
    title: "Cheapest Sermorelin UK: Lowest Price Per mg",
    description:
      "Cheapest Sermorelin UK — the lowest verified price per milligram from every UK supplier we track, ranked per mg not per vial so pack sizes compare honestly.",
    h1: "Cheapest Sermorelin UK",
    focusKeyword: "cheapest sermorelin uk",
    intro: [
      "Finding the cheapest Sermorelin UK listing is not the same as finding the best value, and the gap between those two things is wider for Sermorelin than for most of the market we track. The compound is sold in 2mg, 5mg and 10mg vials, as a pre-mixed pen, and as a blend with ipamorelin, under at least four different names — sermorelin, sermorelin acetate, GRF(1-29) and GHRH(1-29)NH2. A headline price on a search-results page therefore tells you almost nothing about what you are buying. A £10 listing and a £55 listing can both be selling the same peptide in wildly different quantities.",
      "This page is the short answer to the price question. It ranks every UK Sermorelin listing we track by cost per milligram rather than by headline price, because a per-mg figure is the only comparison that stays honest across pack sizes. The table below shows the lowest per-mg options first and flags the best value at the top, with the pack label printed next to every row so you can see exactly what the figure is divided by.",
      "Three caveats run through everything that follows. First, a low price is a data point, not a recommendation; in a market where the same material is relabelled under four names and where some listings quote no pack quantity at all, the cheapest entry is frequently the one with the least information attached to it. Second, a blended product is not a cheap source of Sermorelin — it is a different article, and its price per milligram of Sermorelin cannot be read off the pack label. Third, prices move. Sermorelin is synthesised on demand by most UK vendors and restocked in batches, so a ranking today is not a ranking next month.",
      "Prices on this page come live from the same dataset that powers the [**Sermorelin price comparison hub →**](/compounds/sermorelin) and are refreshed weekly. Nothing here is a fixed quote, and if a listing is out of stock its price is still shown because availability is tracked separately rather than folded into the number.",
    ],
    sections: [
      {
        title: "How Cost Per mg Exposes the Real Spread",
        body: "Headline prices in the UK Sermorelin market look chaotic until you divide by milligrams. A 2mg vial at £15 and a 10mg vial at £50 are only a factor of three apart on price, but the 10mg vial is a factor of five cheaper per milligram. That pattern holds across the market we track, and it means the single most common buying mistake — sorting by the headline number — systematically steers buyers toward the smallest packs and the worst value.\n\nThe reason is manufacturing economics. Peptide synthesis is charged partly by the number of coupling steps and partly by the cost of the resin and reagents consumed, and a 29-residue peptide like Sermorelin requires twenty-nine sequential couplings with purification afterwards. The fixed cost of setting up a synthesis and purifying the product is large relative to the marginal cost of making more of the same sequence in the same batch. Vendors who commission a larger batch spread that fixed cost over more vials, and the per-milligram figure falls accordingly. A vendor selling 2mg vials is not necessarily profiteering; they may simply be buying in small quantities from a reseller rather than commissioning their own batch.\n\nThere is a limit to how far this argument stretches. Once you are past the pack sizes a vendor actually holds, the per-mg saving stops and the risk starts: a large vial that sits in a drawer for a year is not cheaper than several small vials used promptly, particularly for a peptide whose stability in solution is measured in days rather than weeks. The useful discipline is to compare per milligram at the pack size you will actually consume within a reasonable period, not at the largest pack the market offers.",
      },
      {
        title: "Why the Cheapest Listing Is Often the Least Informative",
        body: "Across the listings we track, there is a weak but real inverse relationship between how cheap a Sermorelin product is and how much information the vendor publishes about it. That is not a coincidence. Producing a batch-linked Certificate of Analysis from a named laboratory costs money per batch, and a vendor pricing at the floor of the market has usually decided not to spend it. The result is a listing that tells you a price and a compound name and nothing else.\n\nThis matters more for Sermorelin than for a compound whose identity is self-evident on the label. There are at least four plausible names for the same molecule in circulation, and a vendor recycling marketing copy from an overseas supplier may not themselves know which form they are selling. A batch-linked COA resolves that ambiguity in a way no amount of marketing copy can: it names the laboratory, the batch, the purity figure and usually the analytical method. If you are choosing between two listings that differ by a few pounds, the one with the COA is the cheaper article in any sense that matters.\n\nThe same logic applies to a listing that quotes a price range. A page that says £29.00 to £45.00 is telling you it covers several pack sizes without breaking them out, which means the headline figure is not a price you can pay. Our table takes the low end of a range so the row is comparable, but it also flags ranges explicitly rather than letting a fictional number masquerade as a quote. If you want the full verification checklist we apply, the [where to buy Sermorelin guide](/compound-guides/where-to-buy-sermorelin-uk) sets it out in order.",
        table: {
          header: ["What the listing shows", "What it means for value"],
          rows: [
            ["Single price + stated mg", "Directly comparable — divide and rank honestly"],
            ["Price range + no pack sizes", "Not a real quote; low end used here, flagged in data"],
            ["No milligram figure at all", "Cannot be compared; treated as a question, not a bargain"],
            ["Blend (sermorelin + ipamorelin)", "Different article; per-mg of sermorelin is unknown"],
            ["Pre-mixed pen", "Includes device and diluent; higher per mg is expected"],
            ["Out of stock but cheap", "Price is real, availability is not — delivery will slip"],
          ],
        },
      },
      {
        title: "Verified Versus Unverified: What the Tick Actually Means",
        body: "The green tick beside a supplier in the table is not a rating of their peptide. It records that we have independently confirmed the vendor exists as a business, that their site resolves, and that the signals we check — a contact route, compliance language, a published COA or a link to a testing laboratory — are present. It is a floor, not a ceiling. A ticked supplier can still be more expensive than an unticked one, and frequently is, because doing those things costs money.\n\nWhat the tick is useful for is screening out the class of supplier that should not be on your shortlist at all. Storefronts that appear and disappear within a quarter, sites with no contact route beyond a form that never replies, vendors whose entire presence is a social media page: those are the listings a ticked supplier is being distinguished from. When you are sorting by price and the cheapest entry has no tick, the question to ask is not \"why is it cheaper\" but \"what would I do if the product arrived wrong or did not arrive at all\".\n\nWe also track a TrustScore for suppliers where the underlying signals are available, and that score feeds the ranking on the [best Sermorelin peptide guide](/compound-guides/best-sermorelin-peptide). Price and trust are two different axes, and the useful listings sit where they intersect rather than at the extreme of either. A supplier at the bottom of the price table with a full COA set and a working support line is a better buy than one at the same price with neither, and the reverse is also true: the cheapest listing in the market is only cheapest if it arrives.",
      },
      {
        title: "Where Sermorelin Sits Against the Rest of the GH Axis",
        body: "Sermorelin is one of several compounds in the growth hormone secretagogue category, and it is not the cheapest of them per milligram. That is expected rather than suspicious. Sermorelin is a 29-residue GHRH analogue, while the compounds it is usually compared with are considerably shorter: ipamorelin is a five-residue pentapeptide, and GHRP-6 and GHRP-2 are six-residue hexapeptides. A longer sequence costs more to synthesise and purify, and the per-milligram price reflects the work rather than the vendor's margin.\n\nThe comparison that actually matters is between Sermorelin and other GHRH analogues of similar length. Tesamorelin is a 44-residue stabilised GHRH analogue and prices considerably higher per milligram for the same reason; CJC-1295 sits between the two. If your research compares GHRH receptor agonists at matched molar doses, those are the comparisons worth running, and we track live prices on the [Tesamorelin hub](/compounds/tesamorelin) and the [CJC-1295 hub](/compounds/cjc-1295) on the same per-milligram basis used here.\n\nOne practical note on interpretation. A per-milligram comparison across different compounds tells you about cost of goods, not about potency or equivalence. Sermorelin's receptor affinity and half-life differ from those of a tetrahydropyridine-stabilised analogue, and the literature does not support treating them as interchangeable on a milligram-for-milligram basis. Use the price table to understand the market; use the papers at the foot of this page to understand the pharmacology. If you are buying a blend of Sermorelin and ipamorelin because the combined price looks attractive, read the format notes first — a blended product cannot be priced per milligram of either component.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest Sermorelin in the UK?",
        answer:
          "The lowest per-milligram listing changes as suppliers restock and reprice, so we rank it live rather than quoting a fixed figure. The table above shows every UK Sermorelin listing we track, ordered by cost per milligram with the best value flagged at the top.",
      },
      {
        question: "Is a bigger Sermorelin vial always cheaper per mg?",
        answer:
          "Per milligram, yes, up to the pack sizes a vendor actually holds — the fixed cost of synthesising and purifying a 29-residue peptide is spread over more material. But a large vial that sits unused for a long period is not a saving, particularly since peptide stability in solution is measured in days. Compare per milligram at the pack size you will actually consume promptly.",
      },
      {
        question: "Why is Sermorelin more expensive per mg than ipamorelin?",
        answer:
          "Length. Sermorelin is a 29-residue GHRH analogue requiring twenty-nine sequential couplings and purification; ipamorelin is a five-residue pentapeptide. The per-milligram price reflects synthesis work rather than vendor margin, and the two are not interchangeable on a milligram-for-milligram basis.",
      },
      {
        question: "Does the green tick mean the peptide is good?",
        answer:
          "No. The tick records that we independently confirmed the vendor as a business and that the verification signals we check — contact route, compliance language, published COA or testing-lab link — are present. It is a floor for screening out disreputable storefronts, not an endorsement of any particular batch.",
      },
    ],
    sources: [
      { label: "Effects of single nightly injections of growth hormone-releasing hormone (GHRH 1-29) in healthy elderly men (Metabolism 1997)", url: "https://pubmed.ncbi.nlm.nih.gov/9005976/" },
      { label: "Endocrine and metabolic effects of long-term administration of [Nle27]GHRH-(1-29)-NH2 in age-advanced men and women (JCEM 1997)", url: "https://pubmed.ncbi.nlm.nih.gov/9141536/" },
      { label: "The Somatotrope GHRH/GH/IGF-1 Axis in Immunoregulation and Immunosenescence (Front Horm Res 2017)", url: "https://pubmed.ncbi.nlm.nih.gov/28245459/" },
      { label: "Growth hormone secretagogues: prospects and potential pitfalls — review context via Sermorelin: a better approach to management of adult-onset GH insufficiency (Clin Interv Aging 2006)", url: "https://pubmed.ncbi.nlm.nih.gov/18046908/" },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest Sermorelin UK — Ranked By Cost Per mg",
    rowLimit: 0,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "sermorelin-price-comparison-uk",
    title: "Sermorelin Price Comparison UK: Every Supplier",
    description:
      "Sermorelin price comparison UK — every UK supplier we track in one table, with pack size, cost per mg, stock and verification so vials compare like for like.",
    h1: "Sermorelin Price Comparison UK",
    focusKeyword: "sermorelin price comparison uk",
    intro: [
      "A proper Sermorelin price comparison UK table has to solve one problem before it can show you anything useful: the listings are not like for like. Sermorelin is sold in 2mg, 5mg and 10mg vials, as a pre-mixed pen, as a sermorelin and ipamorelin blend, and under at least four names — sermorelin, sermorelin acetate, GRF(1-29) and GHRH(1-29)NH2. Put all of those in a column sorted by price and the result is a list of numbers that cannot be compared, which is what most price pages actually publish.",
      "This page is the full picture instead of the summary. The table below contains every UK Sermorelin listing ViralPeps tracks — not a top ten, the whole set — with the pack label shown explicitly, cost per milligram calculated wherever a milligram figure exists, stock status recorded next to the price, and verification state marked so you can see at a glance which rows have a documented supplier behind them.",
      "The data comes live from compounds.json, the same dataset the scraper refreshes weekly, and every row links through to the supplier's own product page rather than to a page on our site. Nothing here is sponsored placement: rows are ordered by price, and the only editorial intervention is the verification tick and the TrustScore column where one exists.",
      "One framing point before the numbers. Sermorelin is a research-use-only reagent in the UK, not a licensed medicine, and this table is presented for laboratory and educational reference. For the buying-decision context — what to check, which format to choose, which names to fold together — start with the [**Sermorelin comparison hub →**](/compounds/sermorelin) and then come back here for the full data.",
    ],
    sections: [
      {
        title: "Reading the Sermorelin Price Comparison UK Table",
        body: "Five columns carry the meaning, and each one solves a specific way the market misleads.\n\nThe supplier column shows the trading name as it appears on the vendor's site, with a green tick where we have independently confirmed the business, its contact route and its compliance signals. The tick is a floor rather than a rating — it screens out storefronts nobody can verify, but it does not tell you a given batch was well made.\n\nThe pack column is the one that changes the interpretation of every other column. A row that says 10mg and a row that says 5mg at the same price are not the same offer; the 10mg row is half the cost per milligram. Where a vendor publishes no pack quantity, the column shows a dash, and that dash is meaningful: without a milligram figure there is nothing to divide, and the row cannot be ranked on value at all.\n\nThe price column shows the figure the vendor publishes, normalised to two decimal places. Where a vendor publishes a range rather than a single price — typically because their page covers several pack sizes — we use the low end so the row remains comparable, and our data layer flags the row as a range rather than presenting a fictional midpoint as a quote.\n\nThe per-mg column is the only column that ranks honestly across pack sizes, and it is blank where no milligram figure exists. Finally, the compare link goes directly to the supplier's product page, which is the only way to confirm the listing is still live, still priced as shown and still in stock at the landing page rather than only in an aggregator.",
        table: {
          header: ["Column", "What it tells you", "What it cannot tell you"],
          rows: [
            ["Supplier + tick", "Vendor confirmed as a real business with contact and compliance signals", "Batch-level quality of the specific vial"],
            ["Pack", "The quantity the price applies to", "Whether the vendor's pack is accurately labelled"],
            ["Price", "Published figure, normalised; low end used for ranges", "Whether the price is still live at checkout"],
            ["Per mg", "The only cross-pack comparison that ranks honestly", "Anything at all where pack is a dash"],
            ["Compare", "Link to the supplier's own product page", "Whether stock will survive to your order"],
          ],
        },
      },
      {
        title: "The Price Bands You Will See",
        body: "Sermorelin prices in the UK cluster into recognisable bands, and knowing the bands makes an outlier easy to spot.\n\nAt the bottom of the market sit 2mg vials and clearance-priced small packs, generally from vendors reselling rather than commissioning their own batches. These are the cheapest headline numbers and the most variable per-milligram figures, because a 2mg vial carries the full fixed cost of a synthesis with very little material to spread it over. Expect a per-milligram figure here to be several times the market's best.\n\nThe middle band is where most 5mg vials sit, and it is where the bulk of UK listings live. This is the band where comparison actually works: pack size is consistent across vendors, so the per-milligram figure varies mainly with vendor overheads and batch economics rather than with the arithmetic artifact of pack size. If you are trying to establish what Sermorelin costs in the UK, the 5mg band is the honest answer.\n\nThe upper band covers 10mg vials and pre-mixed pens. A 10mg vial should be the cheapest per milligram in the market and usually is, unless the vendor is pricing a premium brand or has bought a small batch. A pre-mixed pen sits highest in absolute terms because the price includes the device, the diluent and the assembly work, and its per-milligram figure will look poor against a bare vial of the same quantity. That does not make the pen bad value; it makes it a different article, which is why the pack column matters more than the price column here.\n\nOutside all three bands sit the rows with no pack figure. Those are not cheap and not expensive; they are unpriced in any meaningful sense. Treat them as a prompt to visit the supplier's page and find out what is actually being sold before you rank them against anything.",
      },
      {
        title: "What Drives the Spread Between UK Suppliers",
        body: "Once pack size is accounted for, four factors explain almost all the remaining variation.\n\nBatch economics is the largest. A vendor who commissions a synthesis of several grams and sells it across hundreds of vials has a fundamentally lower cost of goods than one buying fifty vials at a time from a European or Chinese contract manufacturer. The larger vendor's per-milligram price can be half the smaller vendor's for identical material, and the difference is procurement rather than quality.\n\nTesting and documentation is the second. A batch-linked Certificate of Analysis from a named UK or EU laboratory costs money per batch, and a vendor who publishes one for every batch has priced that in. A vendor who publishes a single undated certificate, or none, has not. On a per-milligram basis the difference is usually small; on a risk basis it is the largest single variable in the table.\n\nFormat and presentation is the third. A pre-mixed pen, a kit with diluent and syringes, or a blend with ipamorelin all carry additional components and additional assembly work. None of those make the Sermorelin inside better, but all of them cost more to produce, and a comparison that ignores that will misrank those rows.\n\nThe fourth factor is simply stock position. A vendor holding UK inventory has already paid for import, duty and storage and prices accordingly; a drop-shipper has not, which is why some of the cheapest rows are also the rows most likely to slip on delivery. Availability is in the table for that reason — the [buy Sermorelin online guide](/compound-guides/buy-sermorelin-online-uk) covers how that affects the ordering experience, and the [where to buy guide](/compound-guides/where-to-buy-sermorelin-uk) covers the verification side.",
      },
      {
        title: "How to Use This Table Well",
        body: "Three passes will get you what you need.\n\nFirst, filter by pack size. Decide what quantity your work requires before you look at any price, then read only the rows that match. Comparing across pack sizes is the single most common error on pages like this, and it is the error our per-mg column exists to correct — but even with per-mg you are usually better off choosing a size and comparing within it, because the smallest packs will always look expensive and the largest will always look cheap.\n\nSecond, check the pack column for dashes before you trust a ranking. A row with no milligram figure will sink to the bottom of a per-mg sort, and that is the correct behaviour — it is not a cheap listing that got missed, it is an unpriceable one. Visit the supplier page and confirm what the pack actually contains.\n\nThird, confirm the link. Every compare link goes to the supplier's own product page, and the price in our table is what the scraper last recorded. Vendors reprice, restock and occasionally delist; a quick click costs seconds and saves the frustration of ordering against a stale number. If a price in the table disagrees with the product page, the product page wins — and it is worth telling us, because a repeated mismatch usually means a scraper mapping needs correcting. If you would rather see only the winners rather than the whole field, the [cheapest Sermorelin guide](/compound-guides/cheapest-sermorelin-uk) ranks the same rows by per-milligram cost and the [best Sermorelin peptide guide](/compound-guides/best-sermorelin-peptide) ranks them by verification and TrustScore instead.",
      },
    ],
    faq: [
      {
        question: "How many UK Sermorelin suppliers does ViralPeps track?",
        answer:
          "The exact figure is shown in the stats strip above the table and updates automatically as suppliers are added or delisted — it is computed live from the dataset rather than written into the page. The table itself lists every tracked listing, not a curated subset.",
      },
      {
        question: "Why are some Sermorelin rows missing a per-mg price?",
        answer:
          "Because the listing publishes no milligram figure. Without a stated quantity there is nothing to divide the price by, so the row cannot be ranked on cost per milligram and is shown with a dash. Those rows are a prompt to visit the supplier page and confirm what the pack contains.",
      },
      {
        question: "Is the Sermorelin price comparison UK table sponsored?",
        answer:
          "No. Rows are ordered by price and every listing from every tracked supplier appears. The only editorial marks are the verification tick, which records an independently confirmed business and its compliance signals, and the TrustScore column where that data exists.",
      },
      {
        question: "How often are Sermorelin prices updated?",
        answer:
          "The scraper refreshes weekly and the table reads live from that dataset, so figures are always at most a week old. Suppliers can reprice between refreshes, which is why every row links to the vendor's own product page — if the two disagree, the product page is authoritative.",
      },
      {
        question: "Why does Sermorelin cost more per mg than ipamorelin or GHRP-6?",
        answer:
          "Sequence length. Sermorelin is a 29-residue GHRH analogue; ipamorelin is a five-residue pentapeptide and the GHRP compounds are six-residue hexapeptides. Twenty-nine sequential couplings plus purification is materially more synthesis work, and the per-milligram price reflects that rather than vendor margin.",
      },
    ],
    sources: [
      { label: "The history of an effective, specific and sensitive diagnostic test: the GHRH test in clinical practice (Rev Endocr Metab Disord 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39681762/" },
      { label: "Hypothalamic GHRH (Rev Endocr Metab Disord 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39913072/" },
      { label: "Sermorelin: a review of its use in the diagnosis and treatment of children with idiopathic growth hormone deficiency (BioDrugs 1999)", url: "https://pubmed.ncbi.nlm.nih.gov/18031173/" },
      { label: "Growth hormone-releasing factor analogue (hGRF1-29NH2): immunoreactive-GRF plasma levels after intravenous and subcutaneous administration (J Endocrinol 1985)", url: "https://pubmed.ncbi.nlm.nih.gov/2866222/" },
    ],
    tableMode: "full",
    tableHeading: "Sermorelin Price Comparison UK — Every Tracked Listing",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-sermorelin-online-uk",
    title: "Buy Sermorelin Online UK: Ordering & Delivery",
    description:
      "Buy Sermorelin online UK — what UK research vendors sell, how payment and delivery actually work, and the checks to run before your first order goes through.",
    h1: "Buy Sermorelin Online UK",
    focusKeyword: "buy sermorelin online uk",
    intro: [
      "To buy Sermorelin online UK is a straightforward transaction with an unusually long list of things to check before you click. The compound is sold by a broad range of British research-chemical vendors, almost all of them small businesses running on hosted storefronts, and the difference between a good and a bad purchase is rarely visible on the product page itself. It is visible in how the vendor handles documentation, contact, payment and delivery — four things that are cheap to get right and therefore informative when they are wrong.",
      "This page is about the transaction rather than the pharmacology. It covers what a UK Sermorelin order actually consists of, how the variants differ — a lyophilised vial, a pre-mixed pen, or a sermorelin and ipamorelin blend — how payment and delivery typically work across the suppliers we track, and which checks are worth running before you place a first order. The live price table below shows current listings with stock status, because availability is the single most common reason an order fails to complete.",
      "Everything here is presented for laboratory and educational reference. Sermorelin is sold in the UK as a research-use-only reagent; it is not a licensed medicine and is not authorised for human use. A vendor marketing it with therapeutic claims, dosing schedules framed around personal use or before-and-after imagery is not describing a research reagent, and that mismatch is itself a reason to shop elsewhere.",
      "If you already know what you want and only need to compare figures, the [**Sermorelin price comparison hub →**](/compounds/sermorelin) is the faster route. If you are still deciding what to buy, read on.",
    ],
    sections: [
      {
        title: "What You Are Actually Ordering",
        body: "A UK Sermorelin order is one of three articles, and they are not interchangeable.\n\nThe default is a lyophilised vial: the peptide supplied as a dry powder in a sealed glass vial, usually 2mg, 5mg or 10mg. This is the most stable form for storage and transport, and it is what most published research on the compound assumes. You will need a diluent to reconstitute it — bacteriostatic water is the standard choice for laboratory work, and we track it with live prices on the [bacteriostatic water hub](/compounds/bacteriostatic-water) because sourcing it is a separate purchase most first-time buyers forget to plan for.\n\nA pre-mixed pen is the second article. The peptide arrives already in solution inside a device. It removes the reconstitution step and fixes the concentration, which is either convenient or a constraint depending on your work. Peptide stability in solution is the issue here: Sermorelin has a short circulating half-life and is not a compound you want sitting in aqueous form for long periods, so a pen is best bought when you will use it promptly.\n\nThe third article is a blend with ipamorelin. It is sold as one SKU, priced as one item, and frequently marketed as better value. It is not a cheaper way to buy Sermorelin; it is a product containing two compounds that act on different receptors, at a ratio the vendor chose. If you need a defined quantity of one compound, buy the single-compound vial.",
      },
      {
        title: "How Ordering and Delivery Work Across UK Vendors",
        body: "Almost every supplier we track runs on a hosted ecommerce platform — Shopify and WooCommerce dominate — and the ordering flow is the familiar one: basket, checkout, card or bank transfer, confirmation email. The variation sits in the details, and the details are what tell you how the vendor operates.\n\nPayment is the first tell. Card payment through a mainstream processor is the norm for established UK vendors, and it matters because it gives you a chargeback route if the order does not arrive. Bank transfer is common among smaller vendors because it avoids card fees, but it removes that route entirely; if a vendor offers only bank transfer and has no verifiable trading history, treat the absence of a card option as a signal rather than a convenience.\n\nDelivery is the second. Vendors holding UK stock typically dispatch within one to two working days and deliver in two to four, often with a tracked service and occasionally free above a threshold. Vendors who drop-ship from overseas quote longer windows, and those windows are estimates rather than commitments — a fortnight is optimistic when a shipment passes through customs. If a delivery estimate is significantly longer than its competitors', that is usually the reason.\n\nPackaging and paperwork are the third. A well-run research vendor sends the vial in protective packaging with an invoice and a batch reference, and — importantly — an unambiguous research-use-only label. Documentation that travels with the goods is the easiest thing in the whole transaction to verify and one of the most commonly skipped. Our [where to buy Sermorelin guide](/compound-guides/where-to-buy-sermorelin-uk) covers the vendor-side checks in full; the[for-sale guide](/compound-guides/sermorelin-for-sale-uk) covers how to read stock status accurately before you commit.",
        table: {
          header: ["Check", "What good looks like", "What should make you pause"],
          rows: [
            ["Payment method", "Card via a mainstream processor, giving a chargeback route", "Bank transfer only, with no verifiable trading history"],
            ["Dispatch time", "1–2 working days from UK stock", "Vague windows, or estimates that stretch past two weeks"],
            ["Tracking", "Tracked service provided or available at checkout", "No tracking offered on a paid domestic order"],
            ["Paperwork in parcel", "Invoice plus batch reference and RUO labelling", "No batch reference anywhere on or in the parcel"],
            ["Contact before purchase", "Email or phone that replies within a day", "Contact form only, with no reply to a polite question"],
            ["VAT / invoicing", "Registered business details shown", "No company identity anywhere on the site"],
          ],
        },
      },
      {
        title: "Before Your First Order: Five Checks",
        body: "None of these take more than a few minutes, and together they screen out almost every vendor that would waste your money.\n\nFirst, email a question before you order. Ask something specific and slightly technical — what batch the current vial is from, or whether the COA on the product page refers to the batch in stock. A vendor who answers precisely within a day is a vendor who knows their own stock. A vendor who answers vaguely, or not at all, has told you what their after-sales support will be like.\n\nSecond, find the Certificate of Analysis. Not a marketing page claiming \"third-party tested\", but a document naming a laboratory, a batch number and a purity result. If it exists for the batch currently in stock, that is the strongest single signal available. If it does not exist at all, ask why before you pay.\n\nThird, read the product page for certainty about the pack. A listing that does not state milligrams is not a listing you can price or compare. This is common enough in the Sermorelin market that it is worth treating as normal rather than scandalous — but it does mean you have to ask.\n\nFourth, check the company. A UK-registered company number or a trading address on the site is easy to publish and informative when absent. Cross-check against Companies House if the sum involved is meaningful.\n\nFifth, decide on format before you check out. Vial, pen or blend determines what you will need alongside it — a diluent, sterile handling supplies, a defined protocol — and buying in the wrong format is the most common expensive mistake in this market. If you want the ranking view rather than the transaction view, the [best Sermorelin peptide guide](/compound-guides/best-sermorelin-peptide) sorts suppliers by verification and TrustScore.",
        list: [
          "Email a specific technical question and judge the reply, before you spend anything.",
          "Locate a batch-linked Certificate of Analysis from a named laboratory, not a marketing claim.",
          "Confirm the pack quantity in milligrams — if it is not stated, ask.",
          "Verify the business: company number or trading address on the site, cross-checked if the sum is large.",
          "Choose the format deliberately: vial, pen, or blend, with the consumables each one requires.",
        ],
      },
      {
        title: "After the Order Arrives",
        body: "What you do on receipt determines whether the documentation trail survives.\n\nCheck the parcel against the order first: compound name, pack size, batch reference. Sermorelin is sold under several names, and a vial labelled GRF(1-29) against an order for sermorelin acetate is almost certainly correct — but a vial with no batch reference at all is a problem, because you cannot tie it to any certificate.\n\nStorage then matters more than most buyers expect. Lyophilised peptide is stable for extended periods when kept cold, dry and protected from light; once reconstituted, the clock is much shorter and the compound should be treated as perishable. If you are not going to use a vial promptly, leave it lyophilised. Our [MOTS-c hub](/compounds/mots-c) is a useful comparison point if you work across several short-half-life peptides, because the storage discipline is the same regardless of sequence.\n\nKeep the COA, the invoice and the batch reference together. If a result looks anomalous later, the batch is the only handle you have on whether the material or the method is responsible. And if something arrives wrong — wrong pack, no documentation, a broken seal — raise it with the vendor in writing immediately rather than after you have opened and reconstituted. The vendors worth buying from will replace or refund; the ones that will not are the ones you now know to avoid, which is exactly what the [cheapest Sermorelin guide](/compound-guides/cheapest-sermorelin-uk) warns about when it ranks on price alone.",
      },
    ],
    faq: [
      {
        question: "Can I buy Sermorelin online in the UK?",
        answer:
          "Yes — Sermorelin is sold online by UK research-chemical suppliers as a research-use-only reagent for laboratory and educational use. It is not a licensed medicine in the UK and is not authorised for human use, so reputable vendors label and market it strictly as a research compound.",
      },
      {
        question: "Do I need a prescription to buy Sermorelin in the UK?",
        answer:
          "Not for a research-use-only reagent, because that is not a medicine. Sermorelin as a licensed medicine is not available in the UK, and any site offering it with therapeutic framing and human dosing is not describing a research product — which is itself a reason to avoid that vendor.",
      },
      {
        question: "How long does Sermorelin delivery take in the UK?",
        answer:
          "Vendors holding UK stock typically dispatch within one to two working days and deliver in two to four, often tracked. Vendors who drop-ship from overseas quote longer, less reliable windows. If a delivery estimate is much longer than competitors', that usually indicates where the stock physically is.",
      },
      {
        question: "What else do I need to order alongside a Sermorelin vial?",
        answer:
          "A diluent — bacteriostatic water is the standard choice for laboratory reconstitution — plus appropriate sterile handling supplies. A lyophilised vial is the powder only. Pre-mixed pens do not need a diluent, which is part of why they cost more.",
      },
      {
        question: "Should I buy a Sermorelin and ipamorelin blend online?",
        answer:
          "Only if your work genuinely requires both compounds at a fixed ratio. A blend is one product containing two agents acting on different receptors, at a ratio chosen by the vendor, so results cannot be attributed to either component. For single-compound work, buy the single vial.",
      },
    ],
    sources: [
      { label: "The effect of intravenous, subcutaneous, and intranasal GH-RH analog [Nle27]GHRH(1-29)-NH2 on GH secretion in normal men: dose-response relationships (Clin Pharmacol Ther 1986)", url: "https://pubmed.ncbi.nlm.nih.gov/3096623/" },
      { label: "Growth hormone-releasing factor analogue (hGRF1-29NH2): immunoreactive-GRF plasma levels after intravenous and subcutaneous administration (J Endocrinol 1985)", url: "https://pubmed.ncbi.nlm.nih.gov/2866222/" },
      { label: "Incorporation of D-Ala2 in GHRH-(1-29)-NH2 increases the half-life and decreases metabolic clearance in normal men (JCEM 1994)", url: "https://pubmed.ncbi.nlm.nih.gov/7962295/" },
      { label: "The emerging landscape of performance-enhancing peptides modulating the GH-IGF1 axis (Front Endocrinol 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42395176/" },
    ],
    tableMode: "price",
    tableHeading: "Buy Sermorelin Online UK — Current Listings & Stock",
    rowLimit: 20,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "sermorelin-for-sale-uk",
    title: "Sermorelin for Sale UK: Who Actually Has Stock",
    description:
      "Sermorelin for sale UK — which UK suppliers genuinely hold stock, how to read a listing that claims in stock, and what to verify before you rely on it at all.",
    h1: "Sermorelin for Sale UK",
    focusKeyword: "sermorelin for sale uk",
    intro: [
      "Sermorelin for sale UK is a search that returns plenty of listings and rather less certainty, because in this market \"for sale\" and \"in stock\" are two different claims and only one of them is usually true. A product page can exist for years after the last vial left the shelf. A price can be published against material the vendor has not yet received. And an availability badge can mean anything from \"we have it on the shelf in Manchester\" to \"our supplier says it will ship eventually\". This page is about telling those apart.",
      "The compound itself is well established. Sermorelin is the generic name for growth hormone-releasing factor 1-29, a 29-residue GHRH analogue whose amide form appears throughout the endocrinology literature as GHRH(1-29)NH2. It was developed specifically because the full 44-residue hormone was difficult to manufacture and unstable, and the truncated fragment retained biological activity while being practical to synthesise — which is why it became the standard laboratory tool for stimulating somatotrophs and later a licensed diagnostic in the United States. None of that history guarantees that a given UK listing has stock today.",
      "What follows is a stock-and-verification view of the market rather than a price view; the table above shows live listings with the availability state we last recorded, sorted so you can see the field rather than just the cheapest row. If price per milligram is what you need, the [cheapest Sermorelin guide](/compound-guides/cheapest-sermorelin-uk) ranks on that basis instead, and the [full price comparison](/compound-guides/sermorelin-price-comparison-uk) shows every tracked listing.",
      "Everything on this page concerns research-use-only reagents sold to laboratories. Sermorelin is not a licensed medicine in the UK and is not authorised for human use; a UK for-sale listing is a research-chemical listing, and vendor language suggesting otherwise is a warning sign rather than a feature.",
    ],
    sections: [
      {
        title: "What \"In Stock\" Actually Means in This Market",
        body: "There is no standard, so the honest answer is that it means whatever the vendor's platform is configured to say. Three distinct realities sit behind the same badge.\n\nThe first is genuine held inventory: the vials are in a UK facility, the vendor has them, and an order placed today will dispatch tomorrow. This is the only meaning that matters to a buyer, and it correlates with something you can check — a real dispatch estimate in working days, a tracked service, and a batch number available on request. Vendors want to keep such stock but only a subset do.\n\nThe second is backorder-by-default: the platform says available because the vendor can always order more from their supplier, and the listing silently becomes a two-to-four week wait once you have paid. The tell is a delivery estimate expressed in weeks, or one expressed in business rather than working days.\n\nThe third is stale listing: the page is up, the product has not been stocked for months, and an order will either be refunded or quietly ignored. The tell here is subtle but checkable — a product page that has not been updated since a pricing change elsewhere on the site, a batch or COA reference that predates the last two restocks, or a category page where several items all show the same low stock figure.\n\nThe practical rule is that the badge is a hypothesis and the compare link is the test. Clicking through to the supplier's own product page, and then emailing a one-line question about current batch and dispatch, resolves all three cases in under a day.",
        table: {
          header: ["What the badge might mean", "How to tell", "What to do"],
          rows: [
            ["Genuine held UK stock", "Dispatch quoted in working days; batch number on request", "Order — this is the case you want"],
            ["Backorder by default", "Delivery estimate in weeks, or no dispatch estimate at all", "Ask directly before paying; expect the wait"],
            ["Stale listing", "Old COA references, no recent price change, no batch on request", "Avoid; the order will likely be refunded"],
            ["Third-party fulfilled", "Vendor deflects questions about their own stock", "Treat delivery promises as provisional"],
          ],
        },
      },
      {
        title: "Which Packs You Will Find on Sale",
        body: "Sermorelin is offered in three pack bands in the UK, and availability differs between them.\n\nA 2mg vial is the smallest standard pack. It appears regularly at the bottom of the market and is frequently the first thing to come back into stock after a restock, because a vendor commissioning a batch can split it into more small vials than large ones. Its per-milligram price is high, but for a small piece of work it is the right size, and it is often the only size available when the market is thin.\n\nA 5mg vial is the workhorse of the UK market and the pack most vendors hold. If you need a reliable buy at a predictable price, this is the band where competition is real and where comparison across vendors is meaningful. The overwhelming majority of available listings sit here.\n\nA 10mg vial is the largest single-vial pack and the cheapest per milligram when it is available. It is also the first to disappear when a batch runs low, because it consumes a tenth of a gram per sale and vendors rarely commission enough to keep it on the shelf. If you need 10mg specifically, expect to check several suppliers rather than one, and check them close together — a batch that exists at 09:00 may be gone by the afternoon.\n\nBeyond the vials sit pre-mixed pens and sermorelin and ipamorelin blends. Pens are produced in smaller runs and move faster than the plain vials because they are a single SKU covering the whole kit; blends are vendor-specific and appear and disappear with individual product lines. Neither should be counted on for a repeat purchase in the way a plain 5mg vial can be.",
      },
      {
        title: "Verification Before You Rely on Any Listing",
        body: "Stock is a necessary condition for a good purchase, not a sufficient one. Four checks settle the rest, and each takes minutes.\n\nA batch-linked Certificate of Analysis from a named laboratory. Not a logo on a product page, not a claim of \"third-party tested\", but a document naming the laboratory, the batch, the analytical method and a purity figure. For Sermorelin this matters more than the market's average, because the peptide has several plausible names and a reseller may not know precisely which form they have. A certificate naming the peptide and the batch resolves that.\n\nA reachable supplier. Email a question and time the reply. A vendor with genuine held stock will answer precisely, because the answer is on their shelf. A vendor drop-shipping will answer vaguely, if at all.\n\nDomain control. The TrustScore badge verifies that a supplier controls the domain they sell from, which sounds trivial until you consider how much of this market consists of storefronts cloned and abandoned. A badge on their own site is evidence of identity that a screenshot on someone else's aggregator is not.\n\nRegulatory discipline. Research-use-only labelling throughout, no therapeutic claims, no human dosing schedules, no before-and-after imagery. A vendor selling a research reagent will describe a research reagent. A vendor selling something else — or pretending to — will not, and that mismatch is the cheapest warning signal available. The [where to buy Sermorelin guide](/compound-guides/where-to-buy-sermorelin-uk) applies these checks to every vendor we track.",
        list: [
          "Batch-linked COA naming laboratory, batch, method and purity — not a marketing claim.",
          "A supplier who answers a specific stock question precisely and quickly.",
          "Confirmed domain ownership, which is what the TrustScore badge evidences.",
          "Research-use-only labelling with no therapeutic, dosing or result claims anywhere.",
          "A dispatch estimate in working days, which distinguishes stock from backorder.",
        ],
      },
      {
        title: "Why Sermorelin Availability Is Volatile",
        body: "Sermorelin goes out of stock more often than the shorter secretagogues for a structural reason: it is a 29-residue peptide.\n\nManufacturing a 29-amino-acid sequence means twenty-nine sequential coupling steps, each with its own yield loss, followed by cleavage from the resin and chromatographic purification. The overall yield from a batch is materially lower than for a hexapeptide, and the cycle time is longer. A vendor cannot simply reorder overnight; the practical lead time between deciding to restock and having vials on the shelf is measured in weeks, not days.\n\nOn the demand side, Sermorelin sits at the intersection of several research interests. It is the standard GHRH-receptor tool, so it appears in somatotroph work, in ageing and body-composition studies, and in the immunosenescence literature where GHRH(1-29) administration has been examined in older adults. It is also a common comparator in secretagogue studies, which means demand is not confined to one research community. A compound that several fields need and only a handful of vendors stock will run dry.\n\nThe result is that availability clusters: when a batch lands, several vendors have stock simultaneously and prices fall slightly; when it runs out, the whole market thins at once and the remaining listings carry a premium. Knowing this is useful. If you are planning work that needs a defined quantity, buying a pack size larger than your immediate need while the market is well stocked is rational — whereas panic-buying the last 10mg vial at a premium is not. The [best Sermorelin peptide guide](/compound-guides/best-sermorelin-peptide) ranks suppliers on verification and TrustScore, which is the more useful axis when choice is scarce and you need to pick well rather than cheaply.",
      },
      {
        title: "What a Fair Price Looks Like When Stock Is Thin",
        body: "When availability tightens, prices distort, and it helps to know what the market looks like when it is functioning normally so you can recognise the opposite.\n\nIn a well-stocked market, 5mg Sermorelin vials trade in a fairly narrow band per milligram across the mid-market vendors, with the cheapest entries belonging to vendors who commission larger batches. When the market thins, that band widens sharply at the top: the remaining listings are often held by vendors who bought small quantities at a premium and price accordingly. A price 50 to 100 per cent above the range you saw a month earlier is almost always a scarcity signal rather than a quality signal.\n\nThe exception is a vendor selling a verified, batch-documented vial with a working support line. That is worth more than the cheapest listing, and it is the one case where paying above the market's floor is straightforwardly sensible. What is not sensible is paying a scarcity premium for an unverified listing with no pack size published — which is precisely the listing that survives longest in a thin market, because nobody buys it.\n\nOne last note on blends and pens. When vials are scarce, blends and pens often remain available because a vendor's mixed stock is not fully sold through. A pen at a premium is still a pen, and a blend is still two compounds you did not choose to combine. Neither is an emergency substitute for the vial you actually wanted. If you want to watch the market rather than buy into a spike, the [full price comparison](/compound-guides/sermorelin-price-comparison-uk) is refreshed weekly and will show the band contracting again when batches land.",
      },
    ],
    faq: [
      {
        question: "Is Sermorelin for sale in the UK?",
        answer:
          "Yes — it is sold by UK research-chemical suppliers as a research-use-only reagent for laboratory and educational use, most often as 2mg, 5mg and 10mg lyophilised vials, with some vendors offering pre-mixed pens and sermorelin plus ipamorelin blends. It is not a licensed medicine in the UK.",
      },
      {
        question: "Can I trust a listing that says Sermorelin is in stock?",
        answer:
          "Treat the badge as a hypothesis. It can mean genuine held UK stock, a backorder that will silently become a multi-week wait, or a stale page for material the vendor no longer carries. A dispatch estimate in working days plus a batch number available on request distinguishes the first case from the other two.",
      },
      {
        question: "Why is Sermorelin often out of stock in the UK?",
        answer:
          "It is a 29-residue peptide, so manufacturing requires twenty-nine sequential couplings and purifying the product, with lower yields and longer cycle times than a short secretagogue. Combined with demand across several research fields, restocks arrive in waves and the market periodically thins across all vendors at once.",
      },
      {
        question: "Should I buy a larger vial when Sermorelin is available?",
        answer:
          "If you need a defined quantity of material, buying while the market is well stocked is rational, and a larger vial is cheaper per milligram. But a large vial sitting unused is not a saving — peptide stability once reconstituted is limited, so keep it lyophilised and cold if it will not be used promptly.",
      },
      {
        question: "Is a Sermorelin pen a good substitute when vials are out of stock?",
        answer:
          "Only if a fixed-concentration, already-in-solution product suits your work. A pen is a different article: the concentration is set by the manufacturer and solution stability is a real constraint. It is not a drop-in replacement for a lyophilised vial you intended to reconstitute yourself.",
      },
    ],
    sources: [
      { label: "Effects of single nightly injections of growth hormone-releasing hormone (GHRH 1-29) in healthy elderly men (Metabolism 1997)", url: "https://pubmed.ncbi.nlm.nih.gov/9005976/" },
      { label: "Effects of [norleucine27]GHRH(1-29)-NH2 administration on the immune system of aging men and women (JCEM 1997)", url: "https://pubmed.ncbi.nlm.nih.gov/9360512/" },
      { label: "Once daily subcutaneous growth hormone-releasing hormone therapy accelerates growth in GH-deficient children (JCEM 1996)", url: "https://pubmed.ncbi.nlm.nih.gov/8772599/" },
      { label: "The history of an effective, specific and sensitive diagnostic test: the GHRH test in clinical practice (Rev Endocr Metab Disord 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39681762/" },
    ],
    tableMode: "trust",
    tableHeading: "Sermorelin for Sale UK — Verified Suppliers & Availability",
    rowLimit: 0,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-sermorelin-peptide",
    title: "Best Sermorelin Peptide: Ranked UK Suppliers",
    description:
      "Best Sermorelin peptide ranked by independently verified TrustScore, COA evidence and price, so you can tell a documented UK supplier from a bare storefront.",
    h1: "Best Sermorelin Peptide",
    focusKeyword: "best sermorelin peptide",
    intro: [
      "Asking which is the best Sermorelin peptide is really three questions wearing one coat. Is the material what the label says? Is the supplier a business you can hold to account? And is the price sane for the quantity? No single number answers all three, which is why this page does not publish a shopping list ranked by price and call it a verdict. It ranks by verification evidence first and price second, and it explains what each ranking signal is actually measuring.",
      "Sermorelin — growth hormone-releasing factor 1-29, the amide form of the first twenty-nine residues of human GHRH — is a compound where supplier quality varies more than the molecule does. The sequence is fixed and public. Any competent contract manufacturer can synthesise it. What differs between UK vendors is whether they test the batch they sell, whether they publish what they found, whether they exist as an accountable business, and whether they control the site they trade from. Those are the things that decide whether your research rests on a known material or an unknown one.",
      "The ranking below draws on TrustScore, our composite of independently observable supplier signals: whether the site is live and resolves, whether a Certificate of Analysis is published, whether research-use-only labelling is present, whether there is a working review or contact route, whether shipping terms are stated, and whether the business identity is verifiable. Vendors with a higher score appear first; price breaks ties. The live table above shows the result.",
      "All of this concerns research-use-only reagents sold to laboratories. Sermorelin is not a licensed medicine in the UK and is not authorised for human use. \"Best\" here means best documented and best priced for laboratory work — it is not a health claim, and nothing on this page should be read as one.",
    ],
    sections: [
      {
        title: "What the Best Sermorelin Peptide Actually Means",
        body: "Peptide quality has two separate dimensions and it is worth keeping them apart.\n\nIdentity is the first: is the material in the vial the 29-residue sequence it claims to be? For Sermorelin this is a genuine question rather than a formality, because the compound circulates under at least four names and because the market contains blends — sermorelin with ipamorelin — that can be mistaken for single-compound products. A batch-linked Certificate of Analysis resolves identity, usually by mass spectrometry plus chromatographic purity. Without one you are trusting a label.\n\nConsistency is the second: is the vial you receive the same as the one that was tested? This is a documentation question rather than a chemistry one. A certificate tied to a batch number is the mechanism that makes consistency checkable; a certificate with no batch reference is a marketing artefact. When a vendor publishes a COA with a batch number that matches the vial in your parcel, all three links in the chain are closed, and that is the highest standard a UK research supplier can practically meet.\n\nEverything else — price, packaging, delivery speed, website polish — is secondary. A cheaper vial with closed documentation is the better buy. A more expensive vial without it is not a safer one; it is simply more expensive.",
      },
      {
        title: "How TrustScore Is Built",
        body: "TrustScore is a 100-point composite assembled from signals that anyone can observe independently. It is not a review score and it is not bought. Its purpose is to make supplier comparison possible where no regulator is doing it.\n\nThe components are deliberately boring. A live site that resolves, because a supplier who cannot keep a domain up should not be trusted with a batch record. A published Certificate of Analysis, weighted heavily because it is the single most informative artefact in the market. Research-use-only labelling, because its presence shows regulatory awareness and its absence shows the opposite. A review or contact route, because a supplier you cannot reach is a supplier you cannot resolve a problem with. Shipping terms, because vagueness about delivery correlates with vagueness about everything else. Verifiable business identity, because a company number on a website is easy to publish and conspicuous when missing.\n\nWhat TrustScore cannot do is tell you about a specific batch. It describes the supplier, not the vial. That is why the table shows both the score and the verification tick, and why the certificate itself — which you should request before ordering — remains the only artefact that speaks to the material you will actually receive. Vendors scoring in the upper band have the signals in place; confirming the current batch certificate is a two-minute email that closes the gap.",
        table: {
          header: ["Signal", "Weight", "Why it is weighted that way"],
          rows: [
            ["Published Certificate of Analysis", "High", "The only artefact that speaks to material identity and purity"],
            ["Live, resolving site", "Moderate", "Basic operational competence; its absence predicts everything else"],
            ["Research-use-only labelling", "Moderate", "Shows regulatory awareness and filters therapeutic marketing"],
            ["Review or contact route", "Moderate", "Determines whether a problem can be resolved"],
            ["Shipping terms stated", "Low", "Vagueness about delivery correlates with wider vagueness"],
            ["Verifiable business identity", "Low–moderate", "Easy to publish; conspicuous when missing"],
          ],
        },
      },
      {
        title: "Verified Versus Unverified, Side by Side",
        body: "The practical difference between a verified and an unverified Sermorelin listing is not the price; it is what you can do when something is wrong.\n\nA verified supplier has a reachable contact route, a published certificate, a stated shipping policy and an identifiable business. If the parcel is wrong, missing or undocumented, there is a route to resolution: an email that gets read, a company to name, and in most cases a card processor to escalate to. That route is what you are paying for when a verified listing is a few pounds more expensive, and it is not a small thing.\n\nAn unverified listing is not automatically fraudulent, but it removes every one of those routes at once. There is often no company identity, no published certificate, and a contact form that terminates in silence. When the order goes wrong — and in a market with volatile stock and drop-shipped product, orders do go wrong — you have no lever. The cost of that is not the price of the vial; it is the price of the vial plus the probability of loss.\n\nThis is why our ranking puts verification first and price second even though buyers search for price first. The [cheapest Sermorelin guide](/compound-guides/cheapest-sermorelin-uk) deliberately does the opposite ordering, and reading both is more useful than reading either: a listing that appears high in both rankings is the purchase worth making, and a listing that appears only at the top of the price ranking is exactly the profile described above.",
      },
      {
        title: "Where Sermorelin Sits Against Other GH Secretagogues",
        body: "Sermorelin is one of several compounds in the growth hormone secretagogue space, and knowing where it sits helps you judge whether a premium listing is asking a fair price for the wrong molecule.\n\nThe distinguishing feature is mechanism. Sermorelin is a GHRH receptor agonist: it binds the receptor on the anterior pituitary somatotroph and drives growth hormone synthesis and release through that pathway. Ipamorelin is a ghrelin-receptor secretagogue, acting on a different receptor entirely with a notably selective profile; GHRP-6 and GHRP-2 are in the same family with different selectivities. Because the pathways differ, the compounds are not substitutes for one another, and a vendor selling a sermorelin and ipamorelin blend as a single product is combining two mechanisms into one un-analysable article.\n\nLength matters for value too. Sermorelin is a 29-residue peptide, ipamorelin is a five-residue pentapeptide, and the per-milligram prices differ for reasons of synthesis economics rather than efficacy. Among GHRH analogues, Tesamorelin is a longer stabilised analogue and CJC-1295 sits between the two; we track live prices on the [Tesamorelin hub](/compounds/tesamorelin) and the [CJC-1295 hub](/compounds/cjc-1295) on the same basis used here, and the [Ipamorelin hub](/compounds/ipamorelin) for the secretagogue side. If your work requires a GHRH receptor agonist at a defined molar concentration, Sermorelin from a documented supplier is the article to buy, and the ranking above tells you which suppliers meet that bar.",
      },
      {
        title: "A Practical Shortlist Method",
        body: "Four steps, and you will not need to repeat them often.\n\nStart with the top of this ranking rather than the top of a price list. Take the first three or four suppliers that carry a verification tick and a TrustScore in the upper band, and check which of them currently have the pack size you need in stock. Availability will usually eliminate one or two immediately, because Sermorelin stock clusters and vendors run dry together.\n\nThen email each of the remaining two or three the same question: what batch is the current vial from, and can you send the certificate for that batch. The quality of the answers is the most informative comparison available anywhere in this market. A precise reply with a document attached wins over a friendly reply without one, every time.\n\nThen compare price per milligram within your chosen pack size, using the [cheapest Sermorelin guide](/compound-guides/cheapest-sermorelin-uk) and the [full price comparison](/compound-guides/sermorelin-price-comparison-uk) for the figures. At this point the differences will be small, because you have already filtered out the outliers on both ends.\n\nFinally, place a small order first if the supplier is new to you. A single vial tests packaging, dispatch time, paperwork and follow-up at low cost, and tells you more about a repeat purchase than any amount of reading. The [for-sale guide](/compound-guides/sermorelin-for-sale-uk) explains how to read availability before you commit, and the [buy online guide](/compound-guides/buy-sermorelin-online-uk) covers the transaction itself.",
        list: [
          "Shortlist from the verification ranking, not from a sorted price list.",
          "Eliminate on current stock, because availability clusters and thins by the week.",
          "Ask every remaining supplier for the current batch certificate — the reply is the comparison.",
          "Compare per milligram only within the pack size you actually need.",
          "Place one small order before committing to a repeat purchase from an unfamiliar vendor.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the best Sermorelin peptide in the UK?",
        answer:
          "The best documented one you can verify. Since the 29-residue sequence is fixed and any competent manufacturer can synthesise it, the meaningful differences are supplier-side: a batch-linked Certificate of Analysis from a named laboratory, a reachable contact route, research-use-only labelling and a verifiable business. The ranking above puts those signals first and price second.",
      },
      {
        question: "What is TrustScore and can suppliers buy it?",
        answer:
          "TrustScore is a 100-point composite of independently observable supplier signals — live site, published COA, RUO labelling, contact route, shipping terms and business identity. It is not a review score, it is not purchasable, and it describes the supplier rather than any specific batch.",
      },
      {
        question: "Does a higher price mean better Sermorelin?",
        answer:
          "Not inherently. Price correlates with pack size, format and vendor overheads far more than with quality. A 10mg vial is cheaper per milligram than a 2mg vial for manufacturing reasons, and a pre-mixed pen costs more because of the device, not the peptide. The quality question is answered by the batch certificate, not the price.",
      },
      {
        question: "Why do some best-Sermorelin lists rank by price only?",
        answer:
          "Because price is easy to scrape and verification is not. A price-only ranking systematically rewards the listings with the least published information, which in this market is the wrong direction. We publish both orderings — verification-led here and price-led in the cheapest guide — so you can see which suppliers survive both.",
      },
      {
        question: "Is Sermorelin a GHRH analogue or a secretagogue?",
        answer:
          "Both descriptions are used, but precisely it is a GHRH receptor agonist — the amide form of GHRH residues 1 to 29. Ipamorelin and the GHRP compounds are ghrelin-receptor secretagogues acting on a different receptor. They are related in effect on GH release but are not interchangeable compounds.",
      },
    ],
    sources: [
      { label: "Sermorelin: a better approach to management of adult-onset growth hormone insufficiency? (Clin Interv Aging 2006)", url: "https://pubmed.ncbi.nlm.nih.gov/18046908/" },
      { label: "Endocrine and metabolic effects of long-term administration of [Nle27]GHRH-(1-29)-NH2 in age-advanced men and women (JCEM 1997)", url: "https://pubmed.ncbi.nlm.nih.gov/9141536/" },
      { label: "The Somatotrope GHRH/GH/IGF-1 Axis in Immunoregulation and Immunosenescence (Front Horm Res 2017)", url: "https://pubmed.ncbi.nlm.nih.gov/28245459/" },
      { label: "Beyond the androgen receptor: the role of growth hormone secretagogues in the modern management of body composition (Transl Androl Urol 2020)", url: "https://pubmed.ncbi.nlm.nih.gov/32257855/" },
      { label: "Therapeutic Peptides in Orthopaedics: Applications, Challenges, and Future Directions (JAAOS Glob Res Rev 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/41490200/" },
    ],
    tableMode: "trust",
    tableHeading: "Best Sermorelin Peptide — Ranked By TrustScore",
    rowLimit: 0,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}

/** Hub tile manifest — derived from the spokes so titles never drift. */
export const SERMORELIN_SPOKE_COUNT = spokes.length;
