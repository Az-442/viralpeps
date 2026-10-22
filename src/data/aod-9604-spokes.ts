/**
 * AOD-9604 silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/aod-9604-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — autocomplete evidence pulled live from Google UK (2026-10-22).
 * AOD-9604 is not a GLP-1, so the GLP-1 modifier set does not transfer (same
 * pattern as Semax, Selank, Ipamorelin, MOTS-c, BPC-157 and SS-31). The
 * hyphenated form barely autocompletes at all; the spaced form (`aod 9604`)
 * carries the real UK signal, so both forms were harvested.
 *
 *   1. where-to-buy-aod-9604-uk  → `where to buy aod 9604 uk` = 0 → substituted
 *                                  `aod 9604 where to buy` (real hits: `aod 9604 peptide where to buy`,
 *                                  `aod 9604 where to buy online`) + UK-form `aod 9604 uk ` lists
 *                                  `aod 9604 uk research vial 10mg` and `aod 9604 peptide buy uk`
 *   2. cheapest-aod-9604-uk      → `cheapest aod 9604 uk` = 0 → substituted `cheapest aod 9604`
 *                                  (exact #1) + `aod 9604 uk price` (#1 under `aod 9604 uk `)
 *   3. aod-9604-price-comparison-uk → `aod 9604 price comparison uk` = 0 → substituted
 *                                  `aod 9604 price` (real hits incl. `aod 9604 peptide price`,
 *                                  `aod-9604 5mg price`) + UK-form `aod 9604 uk price`
 *   4. buy-aod-9604-online-uk    → `buy aod 9604 online uk` = 0 → substituted `buy aod 9604 uk`
 *                                  (real hit under `buy aod 9604 `) + `aod 9604 buy uk` (real hit
 *                                  under `aod 9604 uk `) + `aod 9604 peptide buy uk`
 *   5. aod-9604-for-sale-uk       → `aod 9604 uk supplier` = 0 (also `aod 9604 supplier uk`, `aod 9604
 *                                  suppliers uk`, `aod9604 supplier uk`). `aod 9604 uk stockists` was
 *                                  also tested and returned 0. Substituted `aod 9604 for sale uk`, whose
 *                                  UK-form hit is `aod 9604 peptide buy uk` (#1 under that probe),
 *                                  backed by the real base term `aod 9604 for sale` (exact #1) plus
 *                                  `aod 9604 peptide for sale`, `aod 9604 10mg for sale`,
 *                                  `aod 9604 capsules for sale`, `aod 9604 oral for sale`.
 *                                  Note `aod 9604 supplier` (bare, non-UK) is a real hit, which is why
 *                                  a supplier-intent page is still justified — it is only the UK form
 *                                  that does not autocomplete.
 *   6. best-aod-9604-peptide     → exact match #1 (`best aod 9604 peptide`) — passed
 *
 * Corroborating hits: `aod9604 uk`, `aod 9604 uk peptides`, `aod 9604 uk research vial 10mg`,
 * `aod 9604 uk price`, `aod 9604 peptide pen uk`, `aod 9604 tablets uk`, `aod 9604 oral uk`,
 * `aod 9604 nasal spray uk`, `aod 9604 buy uk`, `aod9604 buy uk`, `aod9604 peptide uk`,
 * `aod 9604 peptide buy uk`, `aod 9604 peptide uk price`.
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
    slug: "where-to-buy-aod-9604-uk",
    title: "Where to Buy AOD-9604 UK: Verified Suppliers",
    description:
      "Where to buy AOD-9604 UK — compare live prices from every UK research supplier we track, then check the COA, vial size, purity and live stock before ordering.",
    h1: "Where to Buy AOD-9604 UK",
    focusKeyword: "where to buy aod 9604 uk",
    intro: [
      "Searching for where to buy AOD-9604 UK is a short question with an unusually long answer, because AOD-9604 is one of the most heavily relabelled compounds in the UK research market. The molecule sold under that name is a sixteen-residue fragment of human growth hormone, written in the literature as hGH(176-191) or hGH(177-191) depending on whether you count the added tyrosine, and it appears on UK supplier sites as AOD-9604, AOD9604, AOD 9604, HGH Fragment 176-191, hGH Frag 176-191, or simply \"the fat-burning fragment\". All of those labels describe the same peptide with the sequence YLRIVQCRSVEGSCGF, held in a loop by an intramolecular disulfide bridge between the two cysteine residues, with a molecular weight of about 1815 g/mol.",
      "That naming sprawl has a practical cost when you are trying to buy. Two listings that look like different products are frequently the same article, while two listings with near-identical names can be materially different purchases: a lyophilised research vial, a pre-filled pen, a ten-vial kit, an oral capsule, or a blend with a GLP-1 compound. This page does not argue which of those is better in the abstract. It shows you a live table of every AOD-9604 listing from the UK suppliers ViralPeps tracks, with the pack label, headline price, cost per milligram where the pack states a milligram figure, stock status, verification state and a direct link to the supplier's own product page.",
      "AOD-9604 also has an unusually chequered research history for a peptide sold as a reagent. It was developed in Australia in the 1990s as a deliberate attempt to separate the lipolytic action of growth hormone from its growth-promoting and insulin-antagonising effects, went through phase 2 clinical development for obesity in the mid-2000s, and then had that programme discontinued on efficacy grounds rather than safety grounds. The published animal work is substantial and the human trial programme was real. Both facts matter to a buyer, and neither is a licence to read a research vial as a medicine. The papers linked at the foot of this page are real and checkable.",
      "One boundary needs stating plainly. Every listing on this page is a research-use-only reagent sold to laboratories, and nothing here is medical advice. AOD-9604 is not a licensed medicine in the UK, is not authorised for human use, and a research vial is not the same article as a regulated pharmaceutical product even when the peptide sequence is identical. If you are auditing the market rather than buying today, the [**AOD-9604 price comparison hub →**](/compounds/aod-9604) is the better starting point.",
    ],
    sections: [
      {
        title: "Where to Buy AOD-9604 UK — The Questions That Actually Decide It",
        body: "The phrase \"where to buy\" hides a more useful question: which supplier can you verify? AOD-9604 is exposed on this front in a way that GLP-1 compounds are not. Because it has a real clinical development history — a named developer, published phase 2 obesity trials, a public discontinuation — it attracts buyers who assume a research listing is a close substitute for the medicine that was tested. That assumption is what the least careful storefronts trade on. A site that leans on clinical language, obesity claims and before-and-after framing while publishing no batch documentation is telling you something about how it operates.\n\nOur supplier audit applies the same checklist to every listing we track. A Certificate of Analysis from a named laboratory referencing a specific batch number. A contact route that genuinely replies to a question, tested before you order rather than after. Unambiguous research-use-only labelling throughout, with no marketing implying human or therapeutic use. A registered business identity behind the storefront. And confirmed control of the domain they sell from, which is what the TrustScore badge verifies: a supplier who installs it on their own site is proving they control that domain, which rules out the throwaway storefronts that characterise the lower end of this market.\n\nFor AOD-9604 specifically, two further checks matter more than they do for most peptides. The first is pack quantity. AOD-9604 is overwhelmingly sold in 5mg vials, with 10mg and 20mg vials and the occasional multi-vial kit also in circulation, and a meaningful share of UK listings quote a price and a product name with no milligram figure at all. A listing that will not tell you how much material you are buying cannot be compared with one that will. The second is format. AOD-9604 is sold as a plain lyophilised vial, as a pre-filled pen, and in oral presentations; those are different articles with different handling requirements, and the price difference between them is explained by the device and the fill, not by the peptide.\n\nA third check is specific to this compound. AOD-9604 is a modified fragment, and the modification matters: the disulfide bridge between the two cysteines is part of what gives the peptide its stability, and a supplier who cannot tell you what sequence they are selling, or who describes the material as \"growth hormone\" rather than naming the fragment, is not in a position to give you a documented article.",
        list: [
          "A Certificate of Analysis from a named third-party laboratory referencing a specific batch number — the single most decisive signal available to a buyer.",
          "A working contact route: an email that replies or a phone that connects, tested before you order.",
          "Research-use-only labelling throughout, with no marketing implying human, therapeutic or performance use.",
          "A stated pack quantity in milligrams, so the listing can be compared honestly on cost per mg.",
          "A stated format — plain vial, pre-filled pen, kit or oral — so you know what you are actually handling.",
          "Confirmed domain ownership, which is what the TrustScore badge verifies.",
        ],
      },
      {
        title: "The Names AOD-9604 Is Sold Under in the UK",
        body: "If you only search one term you will under-report the market substantially. The table below maps the names you will encounter to the single molecule they describe, so you can fold them into one comparison instead of treating them as separate products.\n\nAOD-9604 and AOD9604 are the same label with and without a hyphen, and UK autocomplete reveals that the spaced form — \"aod 9604\" — is how most people actually type it. HGH Fragment 176-191 and hGH Frag 176-191 are the structural names, describing the fragment as residues 176 to 191 of the 191-amino-acid growth hormone sequence. hGH(177-191) and \"Tyr-hGH(177-191)\" appear in analytical and anti-doping literature, where the added N-terminal tyrosine is counted explicitly; that tyrosine is part of the synthetic construct, not a numbering error. All of them resolve to the same sixteen-residue peptide.\n\nThe most consequential naming distinction is not a name at all but a blend or a format. AOD-9604 is sold as a capsule or oral drops by some vendors, which is a different article from a lyophilised vial: the manufacturing, the excipients and the handling requirements all differ, and an oral listing cannot be compared per milligram with a vial. It is also occasionally bundled with a GLP-1 compound; a combined product is not a cheaper way to buy AOD-9604, it is a different article. If your research requires a single defined compound at a known concentration, buy the single-compound vial and add anything else deliberately.",
        table: {
          header: ["Name you will see", "What it actually is"],
          rows: [
            ["AOD-9604 / AOD9604", "Marketing name; the same 16-residue hGH fragment"],
            ["HGH Fragment 176-191", "Structural name — residues 176-191 of human growth hormone"],
            ["hGH Frag 176-191", "Common abbreviation of the structural name"],
            ["hGH(177-191) / Tyr-hGH(177-191)", "Analytical name; counts the added N-terminal tyrosine"],
            ["AOD 9604", "Spaced form — the phrasing most UK searches actually use"],
            ["Capsules / oral drops", "A different article from a lyophilised vial — not comparable per mg"],
          ],
        },
      },
      {
        title: "What the UK Market Looks Like Right Now",
        body: "The AOD-9604 market in the UK is broad and, by peptide standards, relatively standardised on pack size. The 5mg lyophilised vial is the default article and accounts for the majority of listings we track, with 10mg and 20mg vials taking most of the remainder and a small number of multi-vial kits at the top of the price range. The headline price band is wide — roughly £19 to £142 across the listings on this page — and almost all of that spread is explained by pack size rather than by quality, because a 20mg vial costs several times what a 2mg vial costs to manufacture.\n\nSome of the remaining spread reflects vendor overheads. UK warehousing, commissioned third-party testing, printed batch-linked COAs and responsive support all cost money, and a bare-bones reseller drop-shipping from overseas does not carry any of it. A supplier selling a 5mg vial at the floor of the market has usually made a decision not to pay for per-batch testing, and that decision is worth knowing about before you buy rather than after.\n\nThe final part of the spread is informational rather than economic, and it is the part buyers most often miss. A dozen of the AOD-9604 listings we track publish no milligram figure at all, so they cannot be priced per milligram and cannot be compared honestly with the rest. Our table keeps them — they are a real part of the market — but shows the pack label explicitly and ranks on per-mg only where a real figure exists. We would rather show a row with a visible gap than invent a comparison that is not there.",
      },
      {
        title: "Formats: Vial, Pen, Kit and Oral",
        body: "AOD-9604 is sold in four formats in the UK, and choosing between them is a decision about what your research needs rather than about price.\n\nA lyophilised vial is the standard research article. You receive the peptide as a dry powder, which is the most stable form for storage and transport, and you reconstitute it yourself with a diluent such as [bacteriostatic water](/compound-guides/where-to-buy-bacteriostatic-water-uk). This is the format with the clearest documentation trail: batch numbers, COAs and purity figures usually refer to the powder as supplied, and the reconstitution step is yours, so there is no ambiguity about what was in the vial. If your work requires a defined concentration, this is the format that gives you control over it.\n\nA pre-filled pen is a device-based format. It is convenient and removes the reconstitution variable, but it introduces two others: the concentration is fixed by the manufacturer rather than by you, and stability in solution is a real constraint for a peptide whose circulating half-life is measured in tens of minutes. A pen is a reasonable choice when you need a delivered volume and have no reason to vary concentration; it is a poor choice when you need a defined molar quantity for an assay.\n\nA multi-vial kit is simply several vials bundled at one price, usually ten. It works out cheaper per milligram than buying the same vials individually, for the same manufacturing-economics reason that larger single vials do, but it only makes sense if your work will consume the material within its stability window. An oral capsule or drop is a fourth article entirely: the material is formulated rather than lyophilised, the excipients vary, and the per-milligram comparison against a vial is not meaningful. If you are shopping by cost per milligram, compare vials with vials and kits with kits.",
      },
    ],
    faq: [
      {
        question: "Where can I buy AOD-9604 in the UK?",
        answer:
          "ViralPeps compares AOD-9604 listings from UK research-chemical suppliers, who sell the lyophilised peptide strictly for laboratory use under research-use-only terms. We list only suppliers whose verification signals — COA, contact, compliance and domain ownership — we can independently confirm, and the live table above shows every one we currently track.",
      },
      {
        question: "Is AOD-9604 the same as HGH Fragment 176-191?",
        answer:
          "Yes. AOD-9604 is the marketing name for the synthetic sixteen-residue fragment of human growth hormone corresponding to residues 176-191 (or 177-191 once the added N-terminal tyrosine is counted). UK suppliers list it under both names, sometimes both at once, and they describe the same peptide.",
      },
      {
        question: "Is AOD-9604 legal in the UK?",
        answer:
          "AOD-9604 is not a licensed medicine in the UK and is not authorised for human use. It is sold as a research reagent under research-use-only terms intended for laboratory and educational purposes. Supplying it for human consumption would engage medicines regulation, which is why reputable UK vendors label and market it strictly as a research chemical. We present this information for reference only.",
      },
      {
        question: "Why do AOD-9604 prices vary so much between UK suppliers?",
        answer:
          "Pack size is the main driver — a 20mg vial carries a far lower cost per milligram than a 2mg vial — followed by format (a pen or a multi-vial kit costs more than a bare vial) and vendor overheads such as UK warehousing, commissioned testing, printed COAs and support. Some of the spread also reflects listings that publish no pack quantity at all.",
      },
      {
        question: "Should I buy an AOD-9604 vial or a pen?",
        answer:
          "A vial gives you control over reconstitution and concentration and comes with the clearest batch documentation; a pre-filled pen fixes the concentration for you and adds solution-stability considerations. For assay work where a defined molar quantity matters, the vial is generally the more useful article.",
      },
    ],
    sources: [
      { label: "Metabolic studies of a synthetic lipolytic domain (AOD9604) of human growth hormone (Horm Res 2000)", url: "https://pubmed.ncbi.nlm.nih.gov/11146367/" },
      { label: "Increase of fat oxidation and weight loss in obese mice caused by chronic treatment with hGH or a modified C-terminal fragment (Int J Obes 2001)", url: "https://pubmed.ncbi.nlm.nih.gov/11673763/" },
      { label: "The effects of human GH and its lipolytic fragment (AOD9604) on lipid metabolism in obese mice (Endocrinology 2001)", url: "https://pubmed.ncbi.nlm.nih.gov/11713213/" },
      { label: "Detection and in vitro metabolism of AOD9604 (Drug Test Anal 2015)", url: "https://pubmed.ncbi.nlm.nih.gov/25208511/" },
      { label: "The emerging landscape of performance-enhancing peptides modulating the GH-IGF1 axis (Front Endocrinol 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42395176/" },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy AOD-9604 UK — Live Supplier Prices",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-aod-9604-uk",
    title: "Cheapest AOD-9604 UK: Lowest Price Per mg",
    description:
      "Cheapest AOD-9604 UK — the lowest verified price per milligram from every UK supplier we track, ranked per mg, not per vial, so pack sizes compare honestly.",
    h1: "Cheapest AOD-9604 UK",
    focusKeyword: "cheapest aod 9604 uk",
    intro: [
      "Finding the cheapest AOD-9604 UK listing is not the same as finding the best value, and the gap between those two things is wider for AOD-9604 than for most of the market we track. The compound is sold in 2mg, 5mg, 10mg and 20mg vials, as a pre-filled pen, as a ten-vial kit, and in oral capsules, under at least six different names. A headline price on a search-results page therefore tells you almost nothing about what you are buying. A £19 listing and a £142 listing are both plausible prices for AOD-9604, and the difference between them is mostly arithmetic rather than quality.",
      "This page is the short answer to the price question. It ranks every UK AOD-9604 listing we track by cost per milligram rather than by headline price, because a per-mg figure is the only comparison that stays honest across pack sizes. The table below shows the lowest per-mg options first, with the pack label printed next to every row so you can see exactly what the figure is divided by.",
      "Three caveats run through everything that follows. First, a low price is a data point, not a recommendation; in a market where the same material is relabelled under six names and where a dozen listings quote no pack quantity at all, the cheapest entry is sometimes the one with the least information attached to it. Second, a multi-vial kit is not a cheap source of AOD-9604 in the same sense as a single vial — the per-mg figure is genuine, but only if your work will consume ten vials inside their stability window. Third, prices move. AOD-9604 is restocked in batches and the floor of the market shifts by a few pounds between refreshes.",
      "Prices on this page come live from the same dataset that powers the [**AOD-9604 price comparison hub →**](/compounds/aod-9604) and are refreshed weekly. Nothing here is a fixed quote, and if a listing is out of stock its price is still shown because availability is tracked separately rather than folded into the number.",
    ],
    sections: [
      {
        title: "How Cost Per mg Exposes the Real Spread",
        body: "Headline prices in the UK AOD-9604 market look chaotic until you divide by milligrams. A 2mg vial at £23 and a 10mg vial at £35 are far apart on price but roughly ten times apart on value: the 10mg vial works out at about £3.50 per milligram against £11.45 for the small vial. That pattern holds across the market we track, and it means the single most common buying mistake — sorting by the headline number — systematically steers buyers toward the smallest packs and the worst value.\n\nThe reason is manufacturing economics. AOD-9604 is a sixteen-residue peptide with a disulfide bridge that has to be formed and confirmed, which makes it less trivial to produce than its length suggests. Synthesis is charged partly by the number of coupling steps, partly by the cost of the resin and reagents consumed, and partly by the purification and folding work afterwards. A vendor who commissions a larger batch spreads those fixed costs over more vials, and the per-milligram figure falls accordingly. A vendor selling 2mg vials is not necessarily profiteering; they may simply be buying in small quantities from a reseller rather than commissioning their own batch.\n\nThere is a limit to how far this argument stretches, and AOD-9604 hits it sooner than most compounds. A ten-vial kit is the cheapest route per milligram on this page by a wide margin, but it is only cheaper if you use it. A peptide sitting in a drawer for a year is not cheaper than the vial you actually needed, and the disulfide-bridged fragment has a defined stability window once reconstituted — the useful discipline is to compare per milligram at the pack size your work will actually consume in a reasonable period, not at the largest pack the market offers.",
      },
      {
        title: "Why the Cheapest Listing Is Often the Least Informative",
        body: "Across the AOD-9604 listings we track, there is a weak but real inverse relationship between how cheap a product is and how much information the vendor publishes about it. That is not a coincidence. Producing a batch-linked Certificate of Analysis from a named laboratory costs money per batch, and a vendor pricing at the floor of the market has usually decided not to spend it. The result is a listing that tells you a price and a compound name and nothing else — sometimes not even the pack size.\n\nThis matters more for AOD-9604 than for a compound whose identity is self-evident on the label. There are at least six plausible names for the same molecule in circulation, plus an oral format and a pen format that are different articles entirely, and a vendor recycling marketing copy from an overseas supplier may not themselves know which form they are selling. A batch-linked COA resolves that ambiguity in a way no amount of marketing copy can: it names the laboratory, the batch, the purity figure and usually the analytical method. If you are choosing between two listings that differ by a few pounds, the one with the COA is the cheaper article in any sense that matters.\n\nThe same logic applies to a listing with no milligram figure. A page that quotes a price and a product name but no pack size is not telling you a price you can compare; it is telling you that the vendor has not thought about how a buyer evaluates their product. Our table keeps those rows and ranks them below everything with a real figure, rather than silently dropping them or inventing a pack size. If you want the full verification checklist we apply, the [where to buy AOD-9604 guide](/compound-guides/where-to-buy-aod-9604-uk) sets it out in order.",
        table: {
          header: ["What the listing shows", "What it means for value"],
          rows: [
            ["Single price + stated mg", "Directly comparable — divide and rank honestly"],
            ["No milligram figure at all", "Cannot be compared; treated as a question, not a bargain"],
            ["Multi-vial kit (e.g. 5mg × 10)", "Genuinely cheaper per mg — but only if you use ten vials"],
            ["Pre-filled pen", "Includes device and diluent; a higher per mg is expected"],
            ["Oral capsules or drops", "Different article and different excipients — not a like-for-like per mg"],
            ["Out of stock but cheap", "Price is real, availability is not — delivery will slip"],
          ],
        },
      },
      {
        title: "Verified Versus Unverified: What the Tick Actually Means",
        body: "The green tick beside a supplier in the table is not a rating of their peptide. It records that we have independently confirmed the vendor exists as a business, that their site resolves, and that the signals we check — a contact route, compliance language, a published COA or a link to a testing laboratory — are present. It is a floor, not a ceiling. A ticked supplier can still be more expensive than an unticked one, and frequently is, because doing those things costs money.\n\nWhat the tick is useful for is screening out the class of supplier that should not be on your shortlist at all. Storefronts that appear and disappear within a quarter, sites with no contact route beyond a form that never replies, vendors whose entire presence is a social media page: those are the listings a ticked supplier is being distinguished from. When you are sorting by price and the cheapest entry has no tick, the question to ask is not \"why is it cheaper\" but \"what would I do if the product arrived wrong or did not arrive at all\".\n\nWe also track a TrustScore for suppliers where the underlying signals are available, and that score feeds the ranking on the [best AOD-9604 peptide guide](/compound-guides/best-aod-9604-peptide). Price and trust are two different axes, and the useful listings sit where they intersect rather than at the extreme of either. A supplier at the bottom of the price table with a full COA set and a working support line is a better buy than one at the same price with neither, and the reverse is also true: the cheapest listing in the market is only cheapest if it arrives.",
      },
      {
        title: "The Kit Question: When Ten Vials Is Not a Bargain",
        body: "The lowest cost per milligram on this page is a ten-vial kit, and it is worth explaining why we rank it honestly rather than burying it. Bundled vials are cheaper per milligram for the same reason larger single vials are: one manufacturing batch, one lot of documentation, one set of fixed costs spread over more material. There is nothing suspicious about the economics, and for a laboratory that runs AOD-9604 work continuously, it is the rational purchase.\n\nFor everyone else it is a question about consumption rather than price. A lyophilised peptide is stable for a long time in dry form, but the moment you reconstitute a vial you are working against a clock, and a kit of ten vials pushed to the back of a fridge is ten small vials of risk rather than one large saving. The rule we apply is simple: buy the pack size you will actually consume within the period your own protocol defines, and compare per milligram only within that band.\n\nIt is also worth noting that a kit is a single line item on a COA. If the vendor cannot produce a certificate covering the batch those ten vials came from, the bundle is not one product with one documentation trail — it is ten vials of unknown provenance sold at a discount. Ask for the batch number before you buy the kit, not after.",
        list: [
          "Kits cut cost per milligram for manufacturing reasons, not because they are lower grade.",
          "A kit is only cheaper if your work consumes all ten vials inside their stability window.",
          "Ask for the batch number and its COA before buying a kit — one batch, one certificate.",
          "If a kit has no batch documentation, it is a discount on uncertainty rather than on peptide.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the cheapest AOD-9604 in the UK?",
        answer:
          "The table above ranks every AOD-9604 listing we track by cost per milligram, which is the only comparison that stays honest across 2mg, 5mg, 10mg and 20mg vials and multi-vial kits. The cheapest per milligram is currently a ten-vial kit, but a kit is only cheaper if your work consumes the material within its stability window. The lowest headline price belongs to a different, much smaller listing.",
      },
      {
        question: "Why is a 10mg vial cheaper per mg than a 5mg vial?",
        answer:
          "Manufacturing economics. AOD-9604 is a sixteen-residue disulfide-bridged peptide, so the fixed cost of synthesis, folding and purification is large relative to the marginal cost of more material from the same batch. Vendors who commission larger batches spread that fixed cost over more milligrams, and the per-mg figure falls accordingly.",
      },
      {
        question: "Should I buy the cheapest AOD-9604 listing available?",
        answer:
          "Not on price alone. Across the listings we track there is a weak inverse relationship between how cheap a product is and how much documentation the vendor publishes, and a dozen listings quote no pack size at all. A listing with a batch-linked Certificate of Analysis that costs a few pounds more is the better buy, because it is a known article.",
      },
      {
        question: "Do AOD-9604 prices include delivery?",
        answer:
          "Not consistently. Some UK suppliers include standard UK delivery in the price, others add it at checkout and others charge it separately for cold-chain or signed-for options. The table shows the listed product price only. Check the delivery terms before comparing two listings that look close in price.",
      },
      {
        question: "How often are the prices on this page updated?",
        answer:
          "The figures are read live from the same dataset that powers the AOD-9604 comparison hub and are refreshed by our weekly price pass. Nothing here is a fixed quote, and a price can change between the refresh and your order, so always confirm on the supplier's own page before buying.",
      },
    ],
    sources: [
      { label: "Metabolic studies of a synthetic lipolytic domain (AOD9604) of human growth hormone (Horm Res 2000)", url: "https://pubmed.ncbi.nlm.nih.gov/11146367/" },
      { label: "Exploring the beneficial effects of the lipolytic hGH fragment in metabolic research (Int J Obes 2001)", url: "https://pubmed.ncbi.nlm.nih.gov/11673763/" },
      { label: "Effect of intra-articular injection of AOD9604 with or without hyaluronic acid in a rabbit osteoarthritis model (Ann Clin Lab Sci 2015)", url: "https://pubmed.ncbi.nlm.nih.gov/26275694/" },
      { label: "The emerging landscape of performance-enhancing peptides modulating the GH-IGF1 axis (Front Endocrinol 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42395176/" },
      { label: "Regulation of glycogen synthase activity in muscle by a C-terminal part sequence of human growth hormone (Arch Biochem Biophys 1983)", url: "https://pubmed.ncbi.nlm.nih.gov/6307153/" },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest AOD-9604 UK — Ranked By Cost Per mg",
    rowLimit: 15,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "aod-9604-price-comparison-uk",
    title: "AOD-9604 Price Comparison UK: Every Supplier",
    description:
      "AOD-9604 price comparison UK — every UK listing we track in a single table, with pack sizes, cost per mg, stock status and TrustScore, so nothing is hidden.",
    h1: "AOD-9604 Price Comparison UK",
    focusKeyword: "aod 9604 price comparison uk",
    intro: [
      "A complete AOD-9604 price comparison UK table is harder to build than it looks, and the reason is not the number of suppliers. It is that AOD-9604 listings are not one product. They are 2mg, 5mg, 10mg and 20mg vials, pre-filled pens, ten-vial kits, and oral formats, sold under six names, and roughly a fifth of the listings we track publish no pack size at all. A table that simply sorts those by price produces a number that looks authoritative and means almost nothing.",
      "This page does something different. It shows every AOD-9604 listing we track — all of them, not a top ten — with the pack label exactly as the supplier publishes it, the headline price, the resulting cost per milligram where a milligram figure exists, stock status, verification state and TrustScore. Where a listing will not state a pack size, the table says so instead of guessing. Where a supplier publishes the same vial twice under different URLs, we show it once.",
      "The purpose is to let you see the shape of the market rather than a single winner. AOD-9604 in the UK runs from under £19 to £142 across the listings below, and almost all of that range is explained by quantity rather than quality. Once you fold the range into a per-milligram figure the spread collapses dramatically, which is the single most useful thing a comparison can tell you.",
      "Every figure here is read live from the dataset behind the [**AOD-9604 hub →**](/compounds/aod-9604) and refreshed weekly by our price pass. Nothing is a fixed quote. The prices are product prices only — delivery is not included and varies by supplier.",
    ],
    sections: [
      {
        title: "How to Read This Table",
        body: "The table is ordered by headline price so the full range is visible first, before any ranking is applied. That is deliberate. A price table sorted cheapest-first invites you to read the top row and stop, which is exactly the mistake the [cheapest AOD-9604 page](/compound-guides/cheapest-aod-9604-uk) is built to correct. Here the ordering is neutral: the low end shows you what a 2mg or 5mg vial costs, the middle shows the standard 5mg market, and the top shows what a 20mg vial or a ten-vial kit costs.\n\nThe pack column is reproduced as the supplier publishes it, including the inconsistencies. Some write \"5mg\", some write \"5 mg\", one writes \"10 mg vial\", and one sells \"5mg×10vials\". We normalise only for the per-mg arithmetic — a kit is multiplied out to its total milligram content — and never for display, because rewriting a supplier's own label is how a comparison table becomes fiction.\n\nThe per-mg column is blank with an em dash wherever the supplier states no milligram figure. There are a dozen such rows in the AOD-9604 data. They are real listings from real vendors, and dropping them would under-report the market, but ranking them would be inventing a comparison that the supplier has not given us the information to make. They appear at the bottom of the per-mg ordering for that reason, not because they are bad value.",
        table: {
          header: ["Table column", "What it shows", "What it does not show"],
          rows: [
            ["Pack", "The supplier's own pack label, verbatim", "Whether that pack is in stock today"],
            ["Price", "Listed product price", "Delivery, VAT treatment or cold-chain fees"],
            ["Per mg", "Price divided by the stated milligram content", "Anything at all when no pack size is published"],
            ["Stock", "The supplier's listed status at last refresh", "Real-time warehouse availability"],
            ["Verified", "Our audit of business identity and compliance signals", "The quality of any specific batch"],
            ["TrustScore", "Composite of observable supplier signals", "The quality of any specific batch"],
          ],
        },
      },
      {
        title: "What the Range Actually Says",
        body: "Across the full table the headline prices span roughly £19 to £142, a factor of about seven. That looks like a chaotic market until you break it down by pack size. The 2mg vials sit at the very bottom, the 5mg vials cluster in a wide band through the middle, the 10mg vials sit above them, and the single 20mg vial and the ten-vial kit occupy the top.\n\nOnce you divide by milligrams the picture inverts in the way it always does. The cheaper small vials become the most expensive per milligram, and the larger packs become the cheapest. A 2mg vial in the low twenties works out several times more expensive per milligram than a 10mg vial in the mid thirties. There is nothing unusual about AOD-9604 here — it is the same fixed-cost economics that shape every peptide market we track — but the effect is steeper than usual because the 5mg vial is the industry default and small packs are therefore relatively over-priced.\n\nThe remaining variation within a single pack size is the interesting part. Two suppliers selling a 5mg vial at £25 and £50 are not describing different peptides; they are describing different businesses. One may be testing per batch and warehousing in the UK, the other drop-shipping from overseas. A price comparison cannot tell you which is which, but the verification and TrustScore columns can, and reading them next to the price is the whole point of a table like this.",
      },
      {
        title: "Duplicate Listings: Why the Row Count Is Lower Than You Might Expect",
        body: "AOD-9604 is one of the compounds in our dataset where the same physical listing appears more than once in the source data. Express Peptides, for example, sells an AOD-9604 vial and an AOD-9604 pen, and both appear on the master compound entry and again on dedicated child entries with a different product URL. A de-duplication key built on the URL never collapses those pairs, and the result is a table where one vendor seems to sell the same pen twice at the same price.\n\nThis page de-duplicates on supplier, price and pack instead. Two listings at the same price in the same pack from the same supplier are one listing, whatever URL they arrived on; two listings at different prices or different pack sizes are both kept, because a 5mg vial and a 5mg pen are genuinely different articles. That is why the row count here is slightly lower than a raw count of the source data would suggest, and why you will not find the same supplier and price repeated in the table.\n\nWhen a supplier is folded this way, the row links to the listing we consider canonical. The other URL still exists and the supplier may still fulfil from it, so if you cannot find a product on the linked page, check the supplier's own catalogue rather than concluding it has been withdrawn.\n\nOne more data point matters for anyone auditing the market. A handful of sources in the raw data carry a price with no figure at all — a dash where a number should be. Those rows are dropped from this table entirely rather than shown as free or as zero. A listing with no price is not a cheap listing; it is a listing with no price.",
      },
      {
        title: "AOD-9604 Against the Rest of the Market",
        body: "It helps to place AOD-9604 against the compounds people most often compare it with, because the price bands only make sense in context.\n\nAOD-9604 is a sixteen-residue fragment and usually sells in 5mg vials. Semaglutide and Tirzepatide are longer, more expensive peptides sold in smaller milligram quantities, and their per-milligram figures reflect that: the [Semaglutide hub](/compounds/semaglutide) and the [Tirzepatide hub](/compounds/tirzepatide) both show markets where a few milligrams cost what five milligrams of AOD-9604 costs. That is a manufacturing difference, not a statement about relative merit.\n\nWithin the metabolic-research space specifically, the nearest comparison is the growth-hormone secretagogue family. Tesamorelin is a longer stabilised GHRH analogue and prices materially higher per milligram; Ipamorelin is a five-residue peptide and prices lower. The [Tesamorelin hub](/compounds/tesamorelin) and the [Ipamorelin hub](/compounds/ipamorelin) show those markets on the same basis used here. A researcher choosing between them is buying three genuinely different mechanisms, and the price per milligram is the least informative part of the comparison — but it is the part this page can show you honestly, so it does.\n\nA final note on dosage labels. The AOD-9604 entry in our dataset lists research dosages in the 300-500 microgram per day range and 500 micrograms twice daily, which is the range the animal and early human work used. Those are research figures from published work, not a recommendation, and they are not something this page computes against price. The pack sizes on sale — 5mg and up — are orders of magnitude larger than a single day's research quantity, which is why per-milligram comparisons are the meaningful ones and per-vial price is so misleading here.",
      },
    ],
    faq: [
      {
        question: "How much does AOD-9604 cost in the UK?",
        answer:
          "Across the listings we track, headline prices run from roughly £19 for a small vial to £142 for a ten-vial kit, with the 5mg vial — the industry default — clustering in a wide band through the middle. The most useful figure is cost per milligram, which collapses most of the apparent spread.",
      },
      {
        question: "Why does this table show fewer rows than the number of listings?",
        answer:
          "Because some suppliers, Express Peptides among them, list the same vial or pen twice under different product URLs in the source data. This page de-duplicates on supplier, price and pack, so one physical listing appears once. A 5mg vial and a 5mg pen at different prices are still shown as two rows, because they are different articles.",
      },
      {
        question: "Why do some rows show a dash for price per mg?",
        answer:
          "Because the supplier publishes no milligram figure for that listing. Roughly a fifth of the AOD-9604 listings we track are in that position. They are kept in the table because they are part of the market, and they rank below everything with a real figure rather than being given an invented pack size.",
      },
      {
        question: "Does the price include delivery?",
        answer:
          "No. The figures are listed product prices only. UK suppliers differ on delivery — some include standard postage, some add it at checkout and some charge separately for signed-for or cold-chain options. Compare delivery terms before treating two close prices as equivalent.",
      },
      {
        question: "How current is this comparison?",
        answer:
          "It reads live from the dataset behind the AOD-9604 hub and is refreshed by a weekly price pass. Stock and price can both change between that refresh and your order, so confirm on the supplier's own product page before buying.",
      },
    ],
    sources: [
      { label: "Metabolic studies of a synthetic lipolytic domain (AOD9604) of human growth hormone (Horm Res 2000)", url: "https://pubmed.ncbi.nlm.nih.gov/11146367/" },
      { label: "Increase of fat oxidation and weight loss in obese mice caused by chronic treatment with hGH or a modified C-terminal fragment (Int J Obes 2001)", url: "https://pubmed.ncbi.nlm.nih.gov/11673763/" },
      { label: "Effects of oral administration of a synthetic fragment of human growth hormone on lipid metabolism (Am J Physiol Endocrinol Metab 2000)", url: "https://pubmed.ncbi.nlm.nih.gov/10950816/" },
      { label: "Potential role of new therapies in modifying cardiovascular risk in overweight patients with metabolic risk factors (Obesity 2006)", url: "https://pubmed.ncbi.nlm.nih.gov/16931496/" },
      { label: "AOD-9604 does not influence the WADA hGH isoform immunoassay (Drug Test Anal 2013)", url: "https://pubmed.ncbi.nlm.nih.gov/24124033/" },
    ],
    tableMode: "full",
    tableHeading: "AOD-9604 Price Comparison UK — Every Listing We Track",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-aod-9604-online-uk",
    title: "Buy AOD-9604 Online UK: Ordering & Delivery",
    description:
      "Buy AOD-9604 online UK — how UK research suppliers actually transact, what payment routes to expect, dispatch and delivery times, and what arrives in the box.",
    h1: "Buy AOD-9604 Online UK",
    focusKeyword: "buy aod 9604 online uk",
    intro: [
      "To buy AOD-9604 online UK you are dealing with a research-chemical market, not a pharmacy, and almost all the friction people hit comes from that difference. There is no prescription step, no consultation and no dispensing pharmacist. There is a supplier's website, a checkout, a payment processor and a parcel — and the quality of the transaction depends entirely on which supplier you picked, which is why this page is about the mechanics of ordering rather than about the molecule.",
      "That distinction matters for AOD-9604 specifically because the compound is sold in more formats than most: a plain lyophilised vial, a pre-filled pen, a multi-vial kit and oral capsules. Each has a different dispatch profile. A vial is small, light and travels at ambient temperature; a pen adds a device and sometimes a diluent cartridge; a kit is a heavier parcel. If you order assuming every AOD-9604 product arrives the same way, you will be surprised by at least one of them.",
      "The table on this page shows the live listings from UK suppliers we track, sorted by headline price with pack size, cost per milligram where it is stated, stock status and verification. What follows explains what happens after you click buy — payment, dispatch, delivery expectations, and what to check the moment the parcel arrives.",
      "The usual boundary applies. AOD-9604 is a research-use-only reagent, not a licensed medicine, and nothing on this page is medical advice. Buying a research vial is not the same transaction as filling a prescription, and the consumer protections you might expect from a pharmacy do not automatically apply.",
    ],
    sections: [
      {
        title: "What the Checkout Looks Like on a UK Peptide Site",
        body: "A UK research-chemical checkout is simpler than a pharmacy checkout and less forgiving. Most sites run on Shopify, WooCommerce or a custom storefront, and the flow is a standard e-commerce flow: add to cart, enter an address, choose a delivery option, pay. There is no age verification beyond an attestation, no professional-use declaration in most cases, and no human reviewing your order before it ships.\n\nThat is precisely why the due-diligence work has to happen before the checkout rather than during it. A site will take your money whether or not it has the product in stock, whether or not it has a COA for the batch, and whether or not it intends to answer an email afterwards. We publish a [verification guide for AOD-9604 suppliers](/compound-guides/where-to-buy-aod-9604-uk) that sets out what to check in the five minutes before you order, because those five minutes are the only point in the transaction where you have leverage.\n\nOne practical detail worth knowing: several UK suppliers sell AOD-9604 under more than one listing, for example a vial and a pen, on different URLs. Make sure the item in your cart is the format you actually want, because the names on a cart line are often shorter than the names on the product page and the pen and vial prices can be close enough that the mistake is easy to make.",
      },
      {
        title: "Payment: Cards, Banks and the Friction You Should Expect",
        body: "Payment is the part of the transaction where the research-peptide market differs most visibly from ordinary e-commerce, and it is the part buyers are least prepared for. Many UK peptide suppliers accept debit and credit cards through standard processors; others do not, because card networks and acquiring banks treat research chemicals as a higher-risk category. Some route card payments through a third-party gateway, some offer bank transfer only, and a smaller number accept cryptocurrency.\n\nNone of those is a red flag on its own, but the pattern is informative. A supplier who accepts cards has passed an underwriter's review, which is a weak but real business check. A supplier who accepts bank transfer only is asking you to give up the chargeback route, which means the only recourse if a parcel does not arrive is a conversation with the vendor. If you are buying from a supplier you have not used before, that difference in recourse is worth more than a few pounds of price.\n\nOne caution that applies across the whole category: never send payment to a bank detail that arrives by email after you have placed an order. Invoice-redirection fraud is a known problem in small-supplier e-commerce, and a supplier whose payment details change mid-transaction is telling you that either their systems or their email has been compromised. Confirm payment details on the site itself, not in an email thread.",
        table: {
          header: ["Payment route", "What it tells you", "What you lose if it goes wrong"],
          rows: [
            ["Card through a standard processor", "Passed an acquiring bank's risk review", "Nothing much — chargeback available"],
            ["Card through a third-party gateway", "Acquirer would not take the risk directly", "Some chargeback clarity, usually still covered"],
            ["Bank transfer only", "No card processor involved at all", "The chargeback route — recourse is the vendor"],
            ["Cryptocurrency", "Deliberately off the regulated rails", "Every consumer protection route"],
          ],
        },
      },
      {
        title: "Dispatch and Delivery: What to Expect in the UK",
        body: "For UK-held stock, delivery on AOD-9604 is usually a matter of days rather than weeks. Standard Royal Mail or a courier service is the norm, with a tracked option on most sites and next-day available from some. A lyophilised vial is a small, light, non-perishable parcel, so there is no genuine cold-chain requirement before reconstitution and no reason for dispatch to be slow.\n\nThe picture changes if the supplier is drop-shipping from overseas, which a meaningful minority of UK-facing peptide sites do. In that case the quoted window is frequently optimistic, the parcel may pass through customs, and import handling becomes your problem — including any charges and any delay. A supplier's delivery page will usually tell you where they ship from if you read it carefully; the phrase \"dispatch from our UK warehouse\" and the absence of that phrase are not the same thing.\n\nThere are two things to check on arrival, and both are easier to do immediately. First, confirm the format and pack size match your order — a 5mg vial where you expected 10mg is the most common fulfilment error in this market. Second, check that the batch number on the vial matches the batch number on the Certificate of Analysis you were sent or that is published on the supplier's site. That second check is the one that closes the documentation chain, and it takes ten seconds if the vial is labelled.\n\nA note on packaging. A lyophilised peptide should arrive as a sealed vial, ideally with a crimped aluminium cap and a rubber septum, packed so it cannot rattle. A vial that arrives loose, unsealed or unlabelled is not a shipping accident; it is a control failure, and it should be photographed before you contact the supplier.",
      },
      {
        title: "What Arrives, and What It Does Not",
        body: "A standard AOD-9604 order arrives as one or more lyophilised vials, and that is all. It does not arrive as a ready-to-use solution. If your research requires the peptide in solution, you will need a diluent such as [bacteriostatic water](/compound-guides/buy-bacteriostatic-water-online-uk), which is sold separately by most of the same suppliers and is not included in the vial price. Many first-time buyers do not realise this until the parcel arrives, and the resulting second order is one of the more common reasons a project slips a week.\n\nYou should also expect the vial not to include a COA in the box. Most UK suppliers publish the certificate on the website, against the batch number, rather than printing it per order. That is a reasonable practice, but it puts the onus on you to find the certificate for your specific batch rather than the generic one the supplier has on their homepage. If there is no certificate against your batch number, ask for it — a supplier who tests per batch can produce it in minutes and a supplier who does not cannot produce it at all.\n\nWhat a research vial definitively does not include is any indication, dosing schedule, or instruction for human use. Those are absent because the product is not authorised for that purpose, and the absence is the compliance position rather than an oversight. Anything that arrives with a suggested protocol for human use is telling you the supplier is marketing outside the research category.\n\nA practical point on the pen format. A pre-filled AOD-9604 pen includes a device and, depending on the product, an already-reconstituted solution. That means it has a shorter usable window than a dry vial and it cannot be stored the same way. If you have chosen a pen, confirm the concentration and the fill date before ordering, because those two numbers determine whether the product is useful to you at all.",
        list: [
          "Sealed lyophilised vials — nothing else is in the box unless you ordered it.",
          "No diluent: bacteriostatic water is a separate purchase on almost every UK site.",
          "No printed COA in the parcel — the certificate lives on the site, keyed to your batch number.",
          "No dosing or human-use instructions, by design and by law.",
          "A pen carries a device and often a pre-mixed solution — a much shorter usable window.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I buy AOD-9604 online in the UK without a prescription?",
        answer:
          "UK research suppliers sell AOD-9604 as a research-use-only laboratory reagent, not as a medicine, so there is no prescription step. That is a statement about how the product is regulated and sold, not permission to use it: AOD-9604 is not authorised for human use in the UK, and buying a research vial is a different transaction from filling a prescription.",
      },
      {
        question: "How long does AOD-9604 delivery take in the UK?",
        answer:
          "For UK-held stock, typically a few days by Royal Mail or courier, with tracked and next-day options on many sites. A lyophilised vial needs no cold chain before reconstitution, so there is no reason for dispatch to be slow. If the supplier is drop-shipping from overseas, expect the quoted window to slip and budget for customs handling.",
      },
      {
        question: "Does AOD-9604 come with bacteriostatic water?",
        answer:
          "Almost never. The vial contains lyophilised peptide only. If your work needs the peptide in solution you must buy a diluent separately, and buying it from the same supplier at the same time is usually cheaper than a second order. Check the pack contents before you assume otherwise.",
      },
      {
        question: "What should I check when my AOD-9604 order arrives?",
        answer:
          "Three things. That the pack size and format match your order, since a 5mg-for-10mg mix-up is the most common fulfilment error. That the vial is sealed, capped and labelled. And that the batch number on the vial matches the batch number on the Certificate of Analysis, which is the check that closes the documentation chain.",
      },
      {
        question: "Is it safe to pay a UK peptide supplier by bank transfer?",
        answer:
          "It is common, and it removes your chargeback route — if the parcel does not arrive, your only recourse is the vendor. Card payment through a standard processor is preferable when available. Never send payment to bank details that arrive by email after ordering, since invoice-redirection fraud is a known problem in small-supplier e-commerce.",
      },
    ],
    sources: [
      { label: "Detection and in vitro metabolism of AOD9604 (Drug Test Anal 2015)", url: "https://pubmed.ncbi.nlm.nih.gov/25208511/" },
      { label: "Analytical approaches for the detection of emerging therapeutics and non-approved drugs in human doping controls (J Pharm Biomed Anal 2014)", url: "https://pubmed.ncbi.nlm.nih.gov/24906629/" },
      { label: "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance (Sports Med 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/41966639/" },
      { label: "The emerging landscape of performance-enhancing peptides modulating the GH-IGF1 axis (Front Endocrinol 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42395176/" },
      { label: "Metabolic studies of a synthetic lipolytic domain (AOD9604) of human growth hormone (Horm Res 2000)", url: "https://pubmed.ncbi.nlm.nih.gov/11146367/" },
    ],
    tableMode: "price",
    tableHeading: "Buy AOD-9604 Online UK — Live Listings",
    rowLimit: 20,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "aod-9604-for-sale-uk",
    title: "AOD-9604 for Sale UK: Who Actually Has Stock",
    description:
      "AOD-9604 for sale UK — which UK suppliers actually list stock, what the listed formats are, and how to tell a real listing from a recycled one before you buy.",
    h1: "AOD-9604 for Sale UK",
    focusKeyword: "aod 9604 for sale uk",
    intro: [
      "When people search for AOD-9604 for sale UK, what they usually want to know is simpler than the phrase suggests: who actually has it, in what format, and at what price right now. That is a different question from how to choose a supplier, and a different question again from which listing is cheapest per milligram. It is a question about the current state of the listings, and it is the one this page answers.",
      "The answer for AOD-9604 is more encouraging than for most of the peptide market we track. The compound is stocked by a large number of UK-facing suppliers — we currently list dozens of live AOD-9604 listings across dozens of vendors — and the dominant article is a straightforward 5mg lyophilised vial. Unlike steroids or scheduled medicines, there is no legitimate-prescription route that a buyer might be trying to substitute for; unlike some research peptides, there is no chronic supply problem. What varies is not whether AOD-9604 is available but whether it is available from a supplier whose listing is documented.",
      "That distinction is the whole point of this page. A listing that exists is not the same as a listing you should buy from. AOD-9604 is an easy compound for a reseller to list and a hard one to document: the peptide is short enough to be cheap to synthesise, the name is well-known, and the accompanying marketing practically writes itself. The result is a market where supply is plentiful and verification is uneven, and where the useful question is not \"can I find it\" but \"can I verify this particular listing\".",
      "Everything below is drawn from live listing data, not from supplier claims. The table shows what is currently listed, in what format, at what price and with what verification state. As always, every listing is a research-use-only reagent sold for laboratory work, and nothing here is medical advice.",
    ],
    sections: [
      {
        title: "What \"For Sale\" Actually Means in This Market",
        body: "In a normal product market, \"for sale\" means the item is in stock and can be bought. In the UK research-peptide market it means something narrower: a listing exists on a supplier's website and the supplier will take payment for it. Those are not the same thing.\n\nA good proportion of peptide sites list products they do not hold. Some operate a made-to-order or batch-on-demand model, where an order triggers a purchase from an overseas manufacturer and the quoted dispatch time is an optimistic estimate rather than a schedule. Others list a much wider catalogue than they can support so that they appear in searches for every compound, then quietly refund orders they cannot fill. Neither is necessarily fraudulent — the made-to-order model is a legitimate business — but both mean that \"for sale\" does not guarantee \"available this week\".\n\nThe practical test is the same one we apply across the market. Look at whether the listing publishes a pack size, a batch-linked certificate and a shipping estimate, and whether the supplier answers a question sent before you order. A listing with all four is far more likely to be real inventory than a listing with none. The [where to buy AOD-9604 guide](/compound-guides/where-to-buy-aod-9604-uk) walks through that checklist in the order we apply it, and the [price comparison table](/compound-guides/aod-9604-price-comparison-uk) shows what the whole market currently looks like.",
        table: {
          header: ["Listing type", "What it usually means", "How to test it"],
          rows: [
            ["Stated mg + COA + dispatch estimate", "Likely real UK-held inventory", "Ask for the current batch certificate"],
            ["Stated mg, no COA", "Could be either; documentation is the gap", "Ask which lab tested it and when"],
            ["No pack size stated", "Description is recycled or incomplete", "Ask what is actually in the vial"],
            ["Catalogue of hundreds, all compounds", "Often a drop-ship or made-to-order front", "Ask where it ships from, in writing"],
            ["Price listed, product page empty", "Listing is stale", "Do not order; check the catalogue directly"],
          ],
        },
      },
      {
        title: "The Formats Currently on Sale",
        body: "AOD-9604 is available in the UK in four distinct formats, and knowing which is which before you search will save you from comparing things that cannot be compared.\n\nThe dominant format is the lyophilised vial, overwhelmingly at 5mg, with 10mg and 20mg vials and a small number of 2mg vials also listed. This is the standard research article: dry powder, reconstituted by the purchaser, and the format for which batch documentation is most commonly available. If you are buying AOD-9604 for laboratory work and have no other constraint, this is the format to look for.\n\nA notable minority of listings are multi-vial kits — typically ten 5mg vials in one box. These are genuinely cheaper per milligram, and the per-milligram ranking on our [cheapest AOD-9604 page](/compound-guides/cheapest-aod-9604-uk) reflects that. They are a sensible purchase for a laboratory running continuous work and a poor one for anyone who will not consume ten vials inside their stability window.\n\nPre-filled pens and oral presentations are the other two. A pen bundles the peptide with a device and sometimes a pre-mixed solution; an oral capsule or drop is a formulated article with excipients. Both are legitimate products in the sense that they are really sold, but neither is comparable per milligram with a bare vial, and an oral listing in particular tells you the supplier is pursuing a consumer-adjacent market rather than a laboratory one. For research purposes, the vial remains the article with the clearest documentation trail.",
      },
      {
        title: "Stock versus Documentation: The Real Divide",
        body: "The AOD-9604 market has a large supply side and an uneven documentation side, and the gap between them is the most useful thing to understand about buying this compound.\n\nOn supply, the picture is genuinely healthy. AOD-9604 is short, cheap to synthesise and popular, so there is no shortage of suppliers willing to sell it. We track dozens of live listings across dozens of suppliers — more coverage than most compounds get — and the prices cluster in a range that reflects pack size rather than scarcity. If you simply want to buy AOD-9604 from someone, you will have no difficulty doing so today.\n\nOn documentation, the picture is patchier. A meaningful share of the suppliers we track publish a Certificate of Analysis, and a smaller share publish one that is tied to a specific batch rather than a generic sample. Those two things are not the same, and the difference is the whole verification question: a generic certificate proves that at some point the supplier's manufacturer produced a compliant batch; a batch-linked certificate proves that the vial in your hand came from a batch that was tested. Only the second closes the chain.\n\nThat is why this page does not rank by availability alone. A listing that is in stock and undocumented is less useful to a researcher than one that is in stock and documented, and the verification column in the table above is there to make that difference visible. If you want the ranking that puts documentation first and price second, the [best AOD-9604 peptide page](/compound-guides/best-aod-9604-peptide) is built on exactly that ordering.",
      },
      {
        title: "Red Flags Specific to AOD-9604 Listings",
        body: "Because AOD-9604 is cheap to produce and easy to market, it attracts a particular kind of listing. These are the patterns we see most often when auditing the market, and each is easy to check.\n\nThe first is a listing that describes the product as growth hormone rather than as a fragment. AOD-9604 is a sixteen-residue piece of the growth hormone sequence, not the hormone itself, and a vendor who blurs that distinction is either confused about what they are selling or deliberately trading on the association. Either way, they are not a vendor to buy a documented peptide from.\n\nThe second is a listing that offers dosage guidance for human use. This is not a grey area. AOD-9604 is not authorised for human use in the UK, and a supplier who publishes an injection protocol, a titration schedule or an outcome timeline has moved from selling a research reagent to marketing a medicine. That is a compliance failure and a reliable signal about how the rest of their operation is run.\n\nThe third is a listing with no fixed pack size. It is surprising how common this is with AOD-9604 specifically — a price, a name and nothing else — and it usually means the vendor has copied a description from an overseas supplier without checking their own inventory. You cannot verify a product whose quantity the vendor will not state.\n\nThe fourth is a price that is far outside the market band in either direction. A 5mg vial at a third of the going rate usually reflects a small batch with no testing; a 5mg vial at three times the rate usually reflects marketing rather than quality. In a market this well-supplied, neither is a signal worth following. The fifth, and the one we weight most heavily, is a supplier who will not answer a pre-sale email. Every other red flag can be a mistake; silence is a decision.",
        list: [
          "Calls the product \"growth hormone\" rather than naming the fragment.",
          "Publishes human-use dosing, protocols or outcome timelines.",
          "Quotes a price with no pack size stated.",
          "Prices far outside the market band in either direction.",
          "Will not answer a straightforward pre-sale question.",
        ],
      },
    ],
    faq: [
      {
        question: "Where can I find AOD-9604 for sale in the UK?",
        answer:
          "AOD-9604 is widely listed by UK research-chemical suppliers, and the live table above shows every listing we currently track with pack size, price, stock status and verification state. Availability is not the constraint in this market; documenting a specific listing is, so check the COA and batch number before buying.",
      },
      {
        question: "Is AOD-9604 in stock in the UK?",
        answer:
          "In practice, yes — the market is well supplied and dozens of listings are live at any time. But a listing existing is not the same as inventory being held: some suppliers run a made-to-order model and quote an optimistic dispatch window. Check where a supplier ships from and whether they publish a dispatch estimate before ordering.",
      },
      {
        question: "Does AOD-9604 for sale come as a vial or a pen?",
        answer:
          "Both, plus multi-vial kits and oral capsules. The 5mg lyophilised vial is the dominant article and the one with the clearest batch documentation. A pre-filled pen bundles a device and sometimes a pre-mixed solution, and oral products are a different article again. For laboratory work the vial is usually the most useful purchase.",
      },
      {
        question: "Why do some AOD-9604 listings have no pack size?",
        answer:
          "Usually because the description was copied from an overseas supplier without checking the actual inventory. A listing with a price but no milligram figure cannot be verified or compared honestly, and we treat its absence as a documentation signal rather than a formatting quirk.",
      },
      {
        question: "Are AOD-9604 listings in the UK legal?",
        answer:
          "Selling AOD-9604 as a research-use-only laboratory reagent is how the UK market operates, and reputable vendors label it that way throughout. It is not a licensed medicine and is not authorised for human use, so a listing that markets it for human consumption is operating outside the research category. Nothing on this page is medical advice.",
      },
    ],
    sources: [
      { label: "The emerging landscape of performance-enhancing peptides modulating the GH-IGF1 axis (Front Endocrinol 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42395176/" },
      { label: "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance (Sports Med 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/41966639/" },
      { label: "Detection and in vitro metabolism of AOD9604 (Drug Test Anal 2015)", url: "https://pubmed.ncbi.nlm.nih.gov/25208511/" },
      { label: "Therapeutic Peptides in Orthopaedics: Applications, Challenges, and Future Directions (JAAOS Glob Res Rev 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/41490200/" },
      { label: "Metabolic studies of a synthetic lipolytic domain (AOD9604) of human growth hormone (Horm Res 2000)", url: "https://pubmed.ncbi.nlm.nih.gov/11146367/" },
    ],
    tableMode: "trust",
    tableHeading: "AOD-9604 for Sale UK — Listed Stock By Verification",
    rowLimit: 25,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-aod-9604-peptide",
    title: "Best AOD-9604 Peptide: Ranked By Evidence",
    description:
      "Best AOD-9604 peptide ranked by independently verified TrustScore, batch COA evidence and price, so you can tell a documented UK supplier from a storefront.",
    h1: "Best AOD-9604 Peptide",
    focusKeyword: "best aod 9604 peptide",
    intro: [
      "Asking which is the best AOD-9604 peptide is really three questions wearing one coat. Is the material what the label says? Is the supplier a business you can hold to account? And is the price sane for the quantity? No single number answers all three, which is why this page does not publish a shopping list ranked by price and call it a verdict. It ranks by verification evidence first and price second, and it explains what each ranking signal is actually measuring.",
      "AOD-9604 — the sixteen-residue fragment of human growth hormone written hGH(176-191) — is a compound where supplier quality varies more than the molecule does. The sequence is fixed and public, the disulfide bridge is a known structural feature, and any competent contract manufacturer can synthesize it. What differs between UK vendors is whether they test the batch they sell, whether they publish what they found, whether they exist as an accountable business, and whether they control the site they trade from. Those are the things that decide whether your research rests on a known material or an unknown one.",
      "The ranking below draws on TrustScore, our composite of independently observable supplier signals: whether the site is live and resolves, whether a Certificate of Analysis is published, whether research-use-only labelling is present, whether there is a working review or contact route, whether shipping terms are stated, and whether the business identity is verifiable. Suppliers with a higher score appear first; price breaks ties. The live table above shows the result across every AOD-9604 listing we track.",
      "One thing this page cannot do is tell you that AOD-9604 works. The published record is a mixed one — substantial animal evidence, a human development programme that was discontinued — and a good supplier is a good supplier regardless of whether the compound turns out to be interesting. Section three below summarises what the literature actually shows, because a ranking that ignores it would be flattering the market rather than describing it. Everything here concerns research-use-only reagents sold to laboratories; AOD-9604 is not a licensed medicine in the UK and is not authorised for human use.",
    ],
    sections: [
      {
        title: "What the Best AOD-9604 Peptide Actually Means",
        body: "Peptide quality has two separate dimensions and it is worth keeping them apart.\n\nIdentity is the first: is the material in the vial the sixteen-residue sequence it claims to be? For AOD-9604 this is a genuine question rather than a formality, because the compound circulates under at least six names, because some listings describe it as growth hormone rather than as a fragment, and because the disulfide bridge that defines the structure can be present or absent. A batch-linked Certificate of Analysis resolves identity, usually by mass spectrometry plus chromatographic purity, and a certificate reporting a mass near 1815 daltons is confirming the intact, bridged peptide rather than a scrambled or truncated product.\n\nConsistency is the second: is the vial you receive the same as the one that was tested? This is a documentation question rather than a chemistry one. A certificate tied to a batch number is the mechanism that makes consistency checkable; a certificate with no batch reference is a marketing artefact. When a vendor publishes a COA with a batch number that matches the vial in your parcel, all three links in the chain are closed, and that is the highest standard a UK research supplier can practically meet.\n\nEverything else — price, packaging, delivery speed, website polish — is secondary. A cheaper vial with closed documentation is the better buy. A more expensive vial without it is not a safer one; it is simply more expensive.",
      },
      {
        title: "How TrustScore Is Built",
        body: "TrustScore is a 100-point composite assembled from signals that anyone can observe independently. It is not a review score and it is not bought. Its purpose is to make supplier comparison possible where no regulator is doing it.\n\nThe components are deliberately boring. A live site that resolves, because a supplier who cannot keep a domain up should not be trusted with a batch record. A published Certificate of Analysis, weighted heavily because it is the single most informative artefact in the market. Research-use-only labelling, because its presence shows regulatory awareness and its absence shows the opposite. A review or contact route, because a supplier you cannot reach is a supplier you cannot resolve a problem with. Shipping terms, because vagueness about delivery correlates with vagueness about everything else. Verifiable business identity, because a company number on a website is easy to publish and conspicuous when missing.\n\nWhat TrustScore cannot do is tell you about a specific batch. It describes the supplier, not the vial. That is why the table shows both the score and the verification tick, and why the certificate itself — which you should request before ordering — remains the only artefact that speaks to the material you will actually receive. Among the suppliers we track for AOD-9604, a good number publish a certificate of analysis on their site; a smaller number tie it to a batch. Prefer the second group, and if the certificate is generic, ask for the batch version before you buy. Vendors scoring in the upper band have the signals in place; confirming the current batch certificate is a two-minute email that closes the gap.",
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
        title: "What the Research Actually Shows",
        body: "A ranking page that avoids the literature is doing the reader a disservice, because AOD-9604's evidence base is genuinely mixed and the mix matters to anyone deciding what to buy and how much to trust the surrounding marketing.\n\nThe animal work is substantial and dates back decades. AOD-9604 emerged from a research programme into the C-terminal region of growth hormone, and the published papers through the 1980s and 1990s establish that fragments of that region — particularly residues 177-191 — affect glucose and lipid metabolism in isolated cells and in rodents. The papers linked on this page include work on antilipogenic action in rat adipocytes, on glycogen synthase regulation in muscle, and on the metabolic studies of the synthetic lipolytic domain itself. In obese mice, chronic treatment with the fragment increased fat oxidation and reduced weight gain in several studies, and the effect was reported to be absent in beta-3 adrenergic receptor knockout animals — a result that points at a specific mechanism rather than a general one.\n\nThe human programme is where the story becomes less flattering, and it is worth stating plainly because it is frequently omitted from supplier marketing. AOD-9604 progressed into phase 2 clinical trials for obesity in the early to mid 2000s, and that programme was discontinued. The reason reported publicly was efficacy rather than safety: the weight loss observed in the trials was not sufficient to justify continuing development. Contemporaneous reviews of obesity drugs in clinical development list AOD-9604 among the compounds that did not progress. A buyer reading a supplier's page would not learn this, and should.\n\nTwo further pieces of literature are relevant to how the compound is used in practice today. A 2015 study characterised the detection and in vitro metabolism of AOD9604, which matters for anyone working in an anti-doping context — the compound is on the WADA Prohibited List as a growth hormone fragment, prohibited at all times, and a 2013 paper established that it does not interfere with the hGH isoform immunoassay, meaning its presence has to be detected by its own analytical methods rather than masked by a growth hormone test. And a 2015 rabbit study examined intra-articular AOD9604 with and without hyaluronic acid in an osteoarthritis model, which is the origin of the cartilage-repair interest that some current listings lean on. That is a single animal study, not a body of clinical evidence, and it should be read as such.\n\nNone of this tells you whether to buy. It tells you what you are buying into: a well-characterised fragment with a real and partly disappointing research history, sold in a market where the documentation varies far more than the molecule.",
        list: [
          "Animal evidence is substantial: lipolysis, fat oxidation and reduced weight gain in obese rodent models.",
          "The beta-3 receptor knockout result points at a specific mechanism rather than a general metabolic effect.",
          "The human phase 2 obesity programme was discontinued on efficacy grounds, not safety.",
          "Anti-doping relevance is real: WADA lists growth hormone fragments as prohibited at all times.",
          "The cartilage interest rests on a single 2015 rabbit study, not on clinical data.",
        ],
      },
      {
        title: "Verified Versus Unverified, Side by Side",
        body: "The practical difference between a verified and an unverified AOD-9604 listing is not the price; it is what you can do when something is wrong.\n\nA verified supplier has a reachable contact route, a published certificate, a stated shipping policy and an identifiable business. If the parcel is wrong, missing or undocumented, there is a route to resolution: an email that gets read, a company to name, and in most cases a card processor to escalate to. That route is what you are paying for when a verified listing is a few pounds more expensive, and it is not a small thing.\n\nAn unverified listing is not automatically fraudulent, but it removes every one of those routes at once. There is often no company identity, no published certificate, and a contact form that terminates in silence. When the order goes wrong — and in a market with volatile stock and drop-shipped product, orders do go wrong — you have no lever. The cost of that is not the price of the vial; it is the price of the vial plus the probability of loss.\n\nThis is why our ranking puts verification first and price second even though buyers search for price first. The [cheapest AOD-9604 guide](/compound-guides/cheapest-aod-9604-uk) deliberately does the opposite ordering, and reading both is more useful than reading either: a listing that appears high in both rankings is the purchase worth making, and a listing that appears only at the top of the price ranking is exactly the profile described above. The [for-sale guide](/compound-guides/aod-9604-for-sale-uk) covers the availability side, because a verified supplier with no stock is still no use today.",
      },
      {
        title: "A Practical Shortlist Method",
        body: "Four steps, and you will not need to repeat them often.\n\nStart with the top of this ranking rather than the top of a price list. Take the first three or four suppliers that carry a verification tick and a TrustScore in the upper band, and check which of them currently have the 5mg vial in stock — the default pack, and the one most likely to be held. Availability will usually eliminate one or two immediately, because AOD-9604 stock clusters around the 5mg size.\n\nThen email each of the remaining two or three the same question: what batch is the current vial from, and can you send the certificate for that batch. The quality of the answers is the most informative comparison available anywhere in this market. A precise reply with a document attached wins over a friendly reply without one, every time.\n\nThen compare price per milligram within your chosen pack size, using the [cheapest AOD-9604 guide](/compound-guides/cheapest-aod-9604-uk) and the [full price comparison](/compound-guides/aod-9604-price-comparison-uk) for the figures. At this point the differences will be small, because you have already filtered out the outliers on both ends. Do not let a 5mg vial be compared with a ten-vial kit; they are different purchases.\n\nFinally, place a small order first if the supplier is new to you. A single vial tests packaging, dispatch time, paperwork and follow-up at low cost, and tells you more about a repeat purchase than any amount of reading. The [buy online guide](/compound-guides/buy-aod-9604-online-uk) covers the transaction itself, including what should and should not be in the box when it arrives.",
        list: [
          "Shortlist from the verification ranking, not from a sorted price list.",
          "Eliminate on current stock of the 5mg vial, which is the size vendors actually hold.",
          "Ask every remaining supplier for the current batch certificate — the reply is the comparison.",
          "Compare per milligram only within the pack size you actually need.",
          "Place one small order before committing to a repeat purchase from an unfamiliar vendor.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the best AOD-9604 peptide in the UK?",
        answer:
          "The best documented one you can verify. Since the sixteen-residue sequence is fixed and any competent manufacturer can synthesize it, the meaningful differences are supplier-side: a batch-linked Certificate of Analysis from a named laboratory, a reachable contact route, research-use-only labelling and a verifiable business. The ranking above puts those signals first and price second.",
      },
      {
        question: "Does AOD-9604 actually work?",
        answer:
          "The animal evidence is substantial — increased fat oxidation and reduced weight gain in obese rodent models, with a mechanism linked to beta-3 adrenergic signalling. The human picture is much weaker: the phase 2 obesity development programme was discontinued on efficacy grounds in the mid 2000s. A supplier's page will rarely mention the latter, which is why we summarise the literature here.",
      },
      {
        question: "What is TrustScore and can suppliers buy it?",
        answer:
          "TrustScore is a 100-point composite of independently observable supplier signals — live site, published COA, RUO labelling, contact route, shipping terms and business identity. It is not a review score, it is not purchasable, and it describes the supplier rather than any specific batch.",
      },
      {
        question: "Does a higher price mean better AOD-9604?",
        answer:
          "Not inherently. Price correlates with pack size, format and vendor overheads far more than with quality. A 20mg vial is cheaper per milligram than a 2mg vial for manufacturing reasons, and a multi-vial kit is cheaper still. The quality question is answered by the batch certificate, not the price.",
      },
      {
        question: "Is AOD-9604 the same as growth hormone?",
        answer:
          "No. AOD-9604 is a sixteen-residue fragment of the human growth hormone sequence, corresponding to residues 176-191, with a disulfide bridge between two cysteines and a molecular weight of about 1815 g/mol. It is a piece of the hormone, not the hormone, and a supplier who describes it as growth hormone is not describing their product accurately.",
      },
    ],
    sources: [
      { label: "Metabolic studies of a synthetic lipolytic domain (AOD9604) of human growth hormone (Horm Res 2000)", url: "https://pubmed.ncbi.nlm.nih.gov/11146367/" },
      { label: "The effects of human GH and its lipolytic fragment (AOD9604) on lipid metabolism in obese mice and beta(3)-AR knock-out mice (Endocrinology 2001)", url: "https://pubmed.ncbi.nlm.nih.gov/11713213/" },
      { label: "Increase of fat oxidation and weight loss in obese mice caused by chronic treatment with hGH or a modified C-terminal fragment (Int J Obes 2001)", url: "https://pubmed.ncbi.nlm.nih.gov/11673763/" },
      { label: "Antilipogenic action of synthetic C-terminal sequence 177-191 of human growth hormone (Biochem Mol Biol Int 1993)", url: "https://pubmed.ncbi.nlm.nih.gov/8358331/" },
      { label: "Molecular and cellular actions of a structural domain of human growth hormone (AOD9401) on lipid metabolism in Zucker fatty rats (J Mol Endocrinol 2000)", url: "https://pubmed.ncbi.nlm.nih.gov/11116208/" },
      { label: "Obesity: a review of currently used antiobesity drugs and new compounds in clinical development (Postepy Hig Med Dosw 2007)", url: "https://pubmed.ncbi.nlm.nih.gov/17971763/" },
      { label: "Obesity drugs in clinical development (Curr Opin Investig Drugs 2006)", url: "https://pubmed.ncbi.nlm.nih.gov/16625817/" },
      { label: "Investigation of therapies in the treatment of obesity (Expert Opin Investig Drugs 2006)", url: "https://pubmed.ncbi.nlm.nih.gov/16859393/" },
      { label: "Potential role of new therapies in modifying cardiovascular risk in overweight patients with metabolic risk factors (Obesity 2006)", url: "https://pubmed.ncbi.nlm.nih.gov/16931496/" },
      { label: "Effect of intra-articular injection of AOD9604 with or without hyaluronic acid in a rabbit osteoarthritis model (Ann Clin Lab Sci 2015)", url: "https://pubmed.ncbi.nlm.nih.gov/26275694/" },
      { label: "AOD-9604 does not influence the WADA hGH isoform immunoassay (Drug Test Anal 2013)", url: "https://pubmed.ncbi.nlm.nih.gov/24124033/" },
      { label: "Detection and in vitro metabolism of AOD9604 (Drug Test Anal 2015)", url: "https://pubmed.ncbi.nlm.nih.gov/25208511/" },
    ],
    tableMode: "trust",
    tableHeading: "Best AOD-9604 Peptide — Ranked By TrustScore",
    rowLimit: 0,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}

/** Hub tile manifest — derived from the spokes so titles never drift. */
export const AOD_SPOKE_COUNT = spokes.length;
