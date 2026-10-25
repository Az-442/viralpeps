/**
 * PT-141 (Bremelanotide) silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/pt-141-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — autocomplete evidence pulled live from Google UK (2026-10-25).
 * PT-141 is not a GLP-1, so the GLP-1 modifier set does not transfer (same
 * pattern as Semax, Selank, Ipamorelin, MOTS-c, BPC-157, AOD-9604 and SS-31).
 * Google resolves the hyphenated form `pt-141` for base probes but the spaced
 * form `pt 141` for every UK-modifier probe, so both forms were harvested.
 *
 *   1. where-to-buy-pt-141-uk → `where to buy pt-141 uk` = 0 AND
 *                               `where to buy pt 141 uk` = 0. Substituted the
 *                               real alternatives `where can i buy pt 141`
 *                               (#1: `where can i buy pt 141 peptide`) and
 *                               `best place to buy pt 141 peptide` (exact #1),
 *                               backed by the UK-form hit `where to buy pt-141
 *                               peptide` (under `pt 141 peptide uk `) and
 *                               `pt-141 peptide where to buy`.
 *   2. cheapest-pt-141-uk     → `cheapest pt-141 uk` = 0 / `cheapest pt 141 uk`
 *                               = 0. Substituted `pt 141 cheapest`, which
 *                               returns `pt 141 prices`, `pt 141 best price`
 *                               and **`cheapest pt 141`** (exact #3).
 *   3. pt-141-price-comparison-uk → `pt-141 price comparison uk` = 0 /
 *                               `pt 141 price comparison uk` = 0. Substituted
 *                               `pt-141 price`, which returns `pt 141 price`,
 *                               `pt 141 peptide price`, `pt 141 10mg price`,
 *                               `pt 141 bremelanotide price`.
 *   4. buy-pt-141-online-uk   → `buy pt-141 online uk` = 2 real hits including
 *                               **`pt 141 peptide buy online uk`** (exact) —
 *                               PASSED. Also `pt 141 buy uk` (exact #1) and
 *                               `pt 141 uk buy` (exact #1).
 *   5. pt-141-uk-supplier     → `pt-141 uk supplier` = 0 AND `pt 141 uk supplier`
 *                               = 0 AND `pt 141 supplier uk` = 0. Substituted
 *                               `pt 141 suppliers` (#1: `pt 141 suppliers`,
 *                               `pt 141 manufacturer`, `pt 141 vendors`,
 *                               `pt 141 providers`) — real supplier intent,
 *                               non-UK-qualified only, so the page keeps its
 *                               UK supplier focus and says so.
 *   6. best-pt-141-peptide    → `best pt-141 peptide` returns
 *                               **`best pt 141 peptide`** (exact #1) — PASSED.
 *                               Also `best pt 141 peptide nasal spray`,
 *                               `best pt 141 peptide for men`,
 *                               `pt 141 peptide best brand`.
 *
 * Corroborating hits: `pt 141 uk`, `pt 141 uk peptides`, `pt 141 uk buy`,
 * `pt 141 bremelanotide uk`, `pt 141 pen uk`, `pt 141 nasal uk`, `pt 141 spray uk`,
 * `pt 141 peptide buy uk`, `pt 141 peptide uk reddit`, `pt 141 peptide pen uk`,
 * `pt 141 peptide nasal spray uk`, `pt 141 for sale uk`, `pt 141 peptide for sale uk`,
 * `buy bremelanotide uk`, `bremelanotide for sale uk`, `bremelanotide nasal spray uk`.
 *
 * MOLECULAR IDENTITY — verified, not inherited (PubChem REST, 2026-10-25):
 *   Name: Bremelanotide (PT-141). CID 9941379.
 *   Formula C50H68N14O10 · MW 1025.2 · CAS 189691-06-3 (free base).
 *   Acetate salt: CID 91971505 · C52H72N14O12 · MW 1085.2 · CAS 1607799-13-2.
 *   Residue pattern (PubChem synonym): Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH,
 *   with the lactam bridge between the Asp side chain and the Lys side chain.
 *   PT-141 is the D-Phe epimer of Melanotan II's core; the ring closure is why
 *   Bremelanotide is more receptor-selective than the linear melanocortin peptides.
 *
 * PMIDs — every one below was resolved through NCBI E-utilities esummary,
 * never drafted from memory (the Semax/Selank/MOTS-c builds all caught wrong
 * IDs this way, and the first drafts for this build did too).
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
    slug: "where-to-buy-pt-141-uk",
    title: "Where to Buy PT-141 UK: Verified Suppliers 2026",
    description:
      "Where to buy PT-141 UK — compare live prices from every UK research supplier we track, then check the COA, vial size, salt form and live stock before ordering.",
    h1: "Where to Buy PT-141 UK",
    focusKeyword: "where to buy pt-141 uk",
    intro: [
      "If you are searching for where to buy PT-141 UK, the first thing worth knowing is that the compound has two names and they are not interchangeable in the way most listings imply. PT-141 is the development code that Cyto-Chem used for Bremelanotide, a cyclic heptapeptide melanocortin receptor agonist; Bremelanotide is the international non-proprietary name and the name on the licence. On UK supplier sites the molecule appears as PT-141, PT 141, PT141, Bremelanotide, Bremelanotide acetate and occasionally \\\"the tanning peptide's cousin\\\" — all of which are labels for the same cyclic peptide, and one of which (the acetate) is a different salt with a different molecular weight.",
      "That matters practically, because a table sorted purely by headline price will happily compare a 10mg vial of the free base against a multi-vial kit of the acetate sold at a bundle price and present the cheapest number as the best value. This page does not do that. Below is a live table of every PT-141 and Bremelanotide listing from the UK research suppliers ViralPeps tracks, showing the pack label, the headline price, the cost per milligram wherever the pack states a milligram figure, stock status, verification state and a direct link to the supplier's own product page. It is regenerated from our recurring price scrape, so the numbers reflect those suppliers' listing pages at the most recent check rather than at the time of writing.",
      "The compound itself is unusually well documented for something sold as a research reagent. Bremelanotide went through a full clinical development programme as a subcutaneous injection for hypoactive sexual desire disorder in premenopausal women, was licensed in the United States in 2019, and has a published phase 3 programme, a long-term safety extension and several subsequent reviews. It has also been sold as a nasal formulation at an earlier stage of development. That documentation trail is useful for anyone auditing the market, and it is also the reason the cheapest storefronts borrow clinical language so freely — a licensed medicine's trial results are treated as though they were product specifications for an unlicensed vial.",
      "Every listing on this page is a research-use-only reagent sold to laboratories, and nothing here is medical advice. Bremelanotide is a prescription medicine in the UK and the research vials sold online are not the licensed product, are not pharmacy stock, and are not authorised for human use. If you are auditing the market rather than buying a specific vial today, the [**PT-141 price comparison hub →**](/compounds/pt-141-bremelanotide) is the better starting point.",
    ],
    sections: [
      {
        title: "Where to Buy PT-141 UK — The Questions That Actually Decide It",
        body: "The phrase \"where to buy\" hides a more useful question: which supplier can you verify? PT-141 is exposed on this front more than most peptides because the licensed product is a prescription medicine, which means two very different populations of seller are competing for the same search results. One population sells research reagents and labels them as such. The other sells something it markets as equivalent to the medicine, using sexual-health claims, dosing advice and before-and-after framing. A storefront cannot comfortably do the second while publishing batch-linked documentation, so the documentation is usually the first thing to disappear.\n\nOur supplier audit applies the same checklist to every listing we track. A Certificate of Analysis from a named laboratory referencing a specific batch number, because a generic COA that names no batch cannot show that the material you receive is the material that was tested. A contact route that genuinely replies, tested before you order rather than after. Unambiguous research-use-only labelling throughout, with no marketing that implies human or therapeutic use. A registered business identity behind the storefront. And confirmed control of the domain they sell from, which is what the TrustScore badge verifies: a supplier who installs it on their own site is proving they operate that domain, which rules out the throwaway storefronts that characterise the bottom of this market.\n\nFor PT-141 specifically, three further checks carry more weight than they do for a standard GLP-1 peptide. The first is pack quantity. PT-141 is overwhelmingly sold in 10mg vials, with smaller vials and multi-vial kits also circulating, and a significant share of UK listings publish a price and a product name with no milligram figure at all — those listings cannot be compared honestly and our table shows them with an explicit gap rather than an invented figure. The second is format: a plain lyophilised vial, a pre-filled pen and a nasal spray are three different articles with different handling requirements, and a nasal presentation is not a cheaper way to buy the vial. The third is salt form, covered in more detail below, because free base and acetate are not the same mass.",
        list: [
          "A Certificate of Analysis from a named third-party laboratory referencing a specific batch number — the single most decisive signal a buyer can check.",
          "A working contact route: an email that replies or a phone that connects, tested before you order.",
          "Research-use-only labelling throughout, with no sexual-health, dosing or therapeutic marketing.",
          "A stated pack quantity in milligrams, so the listing can be compared honestly on cost per mg.",
          "A stated format and salt form — lyophilised vial, pen, nasal, free base or acetate.",
          "Confirmed domain ownership, which is what the TrustScore badge verifies.",
        ],
      },
      {
        title: "The Names PT-141 Is Sold Under in the UK",
        body: "If you search one term you will under-report the market substantially, and if you search all of them without folding them together you will pay more than you need to. The table below maps the labels you will encounter onto the single molecule they describe so the comparison can be run once.\n\nPT-141, PT 141, PT141 and \"Bremelanotide\" are the same cyclic heptapeptide. UK autocomplete shows the spaced form — \"pt 141\" — is how most people actually type it, which is why both forms are harvested for this silo. Bremelanotide acetate is the salt form that appears on certificates of analysis and in the licensed injection; it has a different molecular weight from the free base (1085.2 against 1025.2 g/mol) because the acetate counter-ions are part of the weighed mass. When two listings quote the same milligram figure for the free base and the acetate, they are not quoting the same amount of peptide.\n\nThe consequential distinctions are formats rather than names. A nasal spray is a formulated article with its own excipients and stability profile, and cannot be compared per milligram against a lyophilised vial. A pre-filled pen fixes the concentration for you. A multi-vial kit is several vials at one price and usually works out cheaper per milligram, but it is only sensible if your work consumes the material inside its stability window. None of these is a scam; the problem is only that a price table treating them as identical will mislead you.",
        table: {
          header: ["Name you will see", "What it actually is"],
          rows: [
            ["PT-141 / PT 141 / PT141", "Development code for Bremelanotide — the same cyclic heptapeptide"],
            ["Bremelanotide", "The INN. Same molecule as PT-141"],
            ["Bremelanotide acetate", "Acetate salt — C52H72N14O12, MW 1085.2 (free base is 1025.2)"],
            ["Melanotan II", "A different, linear peptide. Related pharmacology, not the same compound"],
            ["Nasal spray", "A formulated article — not comparable per mg against a vial"],
            ["Pre-filled pen", "Fixed concentration; different handling from a lyophilised vial"],
            ["Kit (e.g. 10mg×10)", "Bundle of vials at one price — cheaper per mg, larger commitment"],
          ],
        },
      },
      {
        title: "What the UK Market Looks Like Right Now",
        body: "The PT-141 market in the UK is one of the broadest of any research peptide, and by peptide standards unusually standardised on pack size. The 10mg lyophilised vial is the default article and accounts for the clear majority of listings we track, with a small number of multi-vial kits and pens taking most of the remainder, and a long tail of listings that publish no milligram figure whatsoever. The headline price band spans more than tenfold across the listings on this page, and most of that spread is explained by pack size and by the certificates that sit behind different listings rather than by the molecule, which is the same molecule everywhere.\n\nSome of the remaining spread is vendor overhead. UK warehousing, commissioned third-party testing, printed batch-linked COAs and staff who answer email all cost money; a bare-bones reseller drop-shipping from overseas carries none of it. A supplier listing a 10mg vial at the absolute floor of the market has usually made a decision not to pay for per-batch testing, and that decision is worth knowing before you buy rather than afterwards.\n\nThe final part of the spread is informational, and it is the part buyers most often miss. A meaningful minority of PT-141 listings we track publish no milligram figure, and a handful publish a price without a usable number at all. Our table keeps them, because they are a real part of the market and pretending otherwise would understate it, but it shows the pack label explicitly and ranks per milligram only where a real figure exists. A visible gap is more honest than an invented comparison.",
      },
      {
        title: "Free Base or Acetate — The Distinction Nobody Prices",
        body: "Most UK PT-141 listings do not state which salt form they are selling, and that is a gap worth understanding rather than a detail to skip past.\n\nThe free base is the peptide as drawn: C50H68N14O10, molecular weight 1025.2 g/mol, CAS 189691-06-3. The acetate is the same peptide with acetate counter-ions, C52H72N14O12, molecular weight 1085.2 g/mol, CAS 1607799-13-2. The peptide content of the acetate is lower by mass, not because anything is wrong with it but because the counter-ions weigh something. When a certificate of analysis reports purity by HPLC it is normally reporting peptide peak area, whereas a stated fill weight is the whole salt; the two figures are measuring different things, and a 10mg fill of acetate contains less peptide by mass than a 10mg fill of free base.\n\nFor most laboratory work this is a bookkeeping question, not a quality question, and the practical recommendation is simply to prefer a listing that tells you which form you are buying. The exception is quantitative work where you are calculating molar amounts — there, the salt form changes the arithmetic and an unstated form is a genuine obstacle. A supplier who cannot tell you whether their material is free base or acetate, or who has never been asked, is telling you something about how carefully the product page was assembled.",
      },
    ],
    faq: [
      {
        question: "Where can I buy PT-141 in the UK?",
        answer:
          "ViralPeps compares PT-141 and Bremelanotide listings from UK research-chemical suppliers, who sell the lyophilised peptide strictly for laboratory use under research-use-only terms. We list only suppliers whose verification signals — COA, contact, compliance and domain ownership — we can independently confirm, and the live table on this page shows every one we currently track.",
      },
      {
        question: "Is PT-141 the same as Bremelanotide?",
        answer:
          "Yes. PT-141 is the development code and Bremelanotide is the international non-proprietary name for the same cyclic heptapeptide. Bremelanotide acetate is the salt form used in the licensed injection, and it has a higher molecular weight (1085.2) than the free base (1025.2) because the acetate counter-ions are part of the mass.",
      },
      {
        question: "Is it legal to buy PT-141 in the UK?",
        answer:
          "Bremelanotide is a prescription medicine in the UK and is not licensed for general sale. Research suppliers sell the peptide under research-use-only terms intended for laboratory and educational purposes. Buying a prescription medicine for personal use falls outside those terms, and this page is presented for reference only, not as guidance.",
      },
      {
        question: "Why do PT-141 prices vary so much between UK suppliers?",
        answer:
          "Pack size is the main driver — the 10mg vial is standard and kits cost less per milligram — followed by vendor overheads such as warehousing, per-batch testing and support. Genuinely low prices sometimes indicate untested material or a listing that does not state what quantity you receive, so compare on a per-mg basis and verify the supplier first.",
      },
      {
        question: "Does every UK supplier publish a Certificate of Analysis for PT-141?",
        answer:
          "No, and that is the single most useful filter. Suppliers publishing a named-laboratory COA with a batch number are demonstrating that their material was independently tested and is traceable. Suppliers publishing none, or a generic COA with no batch reference, cannot show that the material you receive is the material that was tested.",
      },
    ],
    sources: [
      {
        label:
          "Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials (Obstetrics & Gynecology, 2019) — PMID 31599840",
        url: "https://pubmed.ncbi.nlm.nih.gov/31599840/",
      },
      {
        label:
          "Long-Term Safety and Efficacy of Bremelanotide for Hypoactive Sexual Desire Disorder (Obstetrics & Gynecology, 2019) — PMID 31599847",
        url: "https://pubmed.ncbi.nlm.nih.gov/31599847/",
      },
      {
        label:
          "Comprehensive characterization of bremelanotide acetate and its degradants by LC-HRMS/MS (Analytical Methods, 2026) — PMID 42485063",
        url: "https://pubmed.ncbi.nlm.nih.gov/42485063/",
      },
      {
        label:
          "PubChem CID 9941379 — Bremelanotide, formula C50H68N14O10, MW 1025.2",
        url: "https://pubchem.ncbi.nlm.nih.gov/compound/9941379",
      },
    ],
    tableMode: "price",
    tableHeading: "PT-141 UK Suppliers — Live Prices",
    rowLimit: 12,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-pt-141-uk",
    title: "Cheapest PT-141 UK: Lowest Price Per mg in 2026",
    description:
      "Cheapest PT-141 UK — the lowest verified cost per milligram from UK research suppliers, sorted live weekly, plus the traps that make a cheap price misleading.",
    h1: "Cheapest PT-141 UK",
    focusKeyword: "cheapest pt-141 uk",
    intro: [
      "The cheapest PT-141 UK listing and the best-value PT-141 UK listing are frequently not the same page, and the gap between them is where most buyers lose money. The reason is structural: PT-141 is sold in at least four pack formats — a 10mg lyophilised vial, smaller vials, pre-filled pens and multi-vial kits — and a large minority of UK listings publish a headline price with no milligram figure at all. Sorting those by price ranks a bundle of ten vials above a single vial and calls it cheaper, which it is, and below a 5mg vial which it may not be on any measure that matters.",
      "This page ranks by cost per milligram instead, which is the only comparison that survives different pack sizes. Every result is computed from the live price data in our tracker rather than transcribed by hand, and rows whose listing states no milligram figure are excluded from the ranking rather than assigned a guessed quantity — they still appear in the full table on the [PT-141 price comparison page](/compound-guides/pt-141-price-comparison-uk), just not in a per-mg leaderboard where they would be comparing an unknown against a known.",
      "Cheap is also a relative term in a market that has no enforced floor. PT-141 is a prescription medicine in the UK; the licensed product is not on general sale and the research listings on this page are reagents sold for laboratory use under research-use-only terms, not medicine. A supplier selling a 10mg vial at the very bottom of the range has usually declined to pay for per-batch third-party testing, because that testing costs more than the margin on a cheap vial. That does not make the material automatically bad, but it does mean the price difference you are looking at is a difference in documentation as much as in peptide.",
      "The practical method is to find the two or three lowest cost-per-milligram listings, then check each one against the verification signals on the [PT-141 UK supplier page](/compound-guides/pt-141-uk-supplier) before buying. A marginally higher price from a supplier who publishes a batch-linked certificate is usually the cheaper purchase in the end.",
    ],
    sections: [
      {
        title: "Why Cost Per Milligram Beats Headline Price",
        body: "A headline price tells you what you will be charged. It tells you nothing about what you will receive, and PT-141 is sold in pack sizes that differ by a factor of ten or more between the smallest vial and the largest kit. Ranking by headline price therefore ranks by pack size, not by value: the most expensive-looking number on the page is usually the kit, and the kit is usually the cheapest material per milligram.\n\nThe arithmetic is simple once you have two real numbers. If a 10mg vial costs £20 and a 5mg vial costs £15, the 10mg vial is cheaper per milligram at £2.00/mg against £3.00/mg, even though it carries the larger headline price. That is the entire purpose of a per-mg column, and it is why our table computes it from the pack label rather than from a summary field. Where a label describes a multi-vial kit — \"10mg×10vials\" — the figure is multiplied out so a kit is compared on its total material, not on the contents of one vial.\n\nThe rows that frustrate this comparison are the ones with no milligram figure at all. In the UK PT-141 market that is a substantial minority of listings, and they are not all careless: some are pens and sprays where the quantity is expressed in doses or millilitres, and some simply never state a weight. Either way they cannot enter a per-mg ranking honestly. We show them in the full table with an explicit \"—\" and exclude them here, which is why the leaderboard below is shorter than the market.",
      },
      {
        title: "What a Low PT-141 Price Usually Means",
        body: "There are four legitimate reasons a PT-141 listing can be cheap, and one illegitimate one, and they are distinguishable if you know what to look for.\n\nThe legitimate reasons: a larger pack, because manufacturing cost per milligram falls sharply with scale; a bulk kit, which is the same effect concentrated; a promotional price on a new listing, which is real but temporary and will not survive the next scrape; and a lower vendor overhead, such as a supplier operating from a single site without paid support staff. None of these implies poor material, and a per-mg ranking is exactly the tool for spotting them.\n\nThe illegitimate reason is material that has not been tested, or has been tested once and is sold indefinitely on the strength of that single certificate. This is where the price gap gets wide. Commissioning an HPLC purity run with a mass-spec identity confirmation from a named laboratory costs a fixed amount per batch regardless of how much material is in the batch, so a supplier selling fifty vials a month at the market floor cannot absorb that cost on every batch and still be the cheapest. When you see a price that undercuts the rest of the market by a wide margin, the question to ask is not \"how is it so cheap\" but \"what was skipped\".\n\nA third pattern is worth flagging because it looks like a bargain and is not. Some vendors price a \"PT-141\" listing that is actually a blend with a melanocortin-adjacent compound, or a nasal spray presented next to vials. Those are different articles. Comparing them per milligram against a lyophilised vial is comparing two products, and the cheaper number does not tell you which of them you should want.",
      },
      {
        title: "The Pack Sizes You Will Actually See",
        body: "PT-141 pack sizes in the UK cluster tightly around one default, with a long thin tail. Knowing the pattern makes a price table readable at a glance.\n\nThe 10mg lyophilised vial is the standard article and the clear majority of listings. It is the size most suppliers stock, it is the size most often certified, and it is the size against which everything else should be judged. Below it, smaller vials appear occasionally and almost always cost more per milligram, which is expected and not a red flag — a 5mg vial uses the same glass, stopper, label and testing as a 10mg vial for half the material.\n\nAbove it, multi-vial kits dominate the value end of the market. A ten-vial bundle is where the lowest per-milligram figures in our data appear, and that is arithmetically correct rather than a marketing trick: the supplier amortises one testing run across ten times the material. The trade-off is commitment — a kit is a lot of peptide to hold, and lyophilised powder has a shelf life and a storage requirement. Buying ten vials to save 20% per milligram is a good trade only if you will use ten vials inside their stability window.\n\nPre-filled pens sit outside the per-milligram comparison by nature: the concentration is fixed by the manufacturer and the price reflects device assembly as well as material. The same is true of nasal presentations. If your work needs a defined quantity of powder that you reconstitute yourself, compare vials with vials and kits with kits and leave the devices out of the ranking entirely.",
        table: {
          header: ["Pack format", "Typical position in the market", "Comparable per mg?"],
          rows: [
            ["10mg lyophilised vial", "The default article — most listings, most certifications", "Yes"],
            ["5mg / 2mg vial", "Occasional; higher cost per mg, same overhead per vial", "Yes"],
            ["10mg×10 multi-vial kit", "Usually the lowest cost per mg; larger commitment", "Yes (total mg)"],
            ["Pre-filled pen", "Fixed concentration; priced with device assembly", "No"],
            ["Nasal spray", "Formulated article; priced in doses or ml", "No"],
          ],
        },
      },
      {
        title: "Cheapest Is Not the Same as Safest to Buy From",
        body: "Once you have the per-mg ranking, the next question is whether the cheapest row is a supplier you would actually order from, and that is a separate test with a separate answer.\n\nThe checks that matter, in order: a Certificate of Analysis from a named laboratory that references the specific batch, not a generic document; a contact route that replies before you have paid; research-use-only language throughout, with no sexual-health or dosing claims anywhere on the site; and a business identity you can find. A supplier failing the first of those is failing the only check that speaks to what is inside the vial. Everything else is about what happens if something goes wrong.\n\nThis is also where the cheapest listing often loses. A per-milligram saving of a few percent, set against a supplier who cannot produce a batch-linked certificate, is not a saving; it is a discount on the only assurance you were buying. Our recommendation when the two conflict is consistent: take the cheapest listing among suppliers who pass verification, not the cheapest listing overall. The difference is usually small, and it is the difference between a price and a price with a certificate behind it.\n\nFor a fuller treatment of what each of those checks catches in practice, the [PT-141 UK supplier guide](/compound-guides/pt-141-uk-supplier) walks through the verification process we run on every listing we track.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest PT-141 per mg in the UK?",
        answer:
          "The per-mg leaderboard on this page is computed from live supplier prices each time it renders, so the cheapest figure changes as listings are updated. The pattern is stable: multi-vial kits and 10mg vials beat smaller vials on cost per milligram, while pens and nasal presentations cannot be compared on that basis at all.",
      },
      {
        question: "Why is PT-141 sold so much cheaper by some UK suppliers?",
        answer:
          "Legitimate reasons are larger packs, bulk kits, temporary promotions and lower vendor overheads. The illegitimate reason is skipped per-batch testing, which has a fixed cost regardless of batch size and cannot be absorbed on a material sold at the very bottom of the market. A price that undercuts the market widely is worth interrogating rather than celebrating.",
      },
      {
        question: "Should I buy a 10mg PT-141 vial or a kit?",
        answer:
          "A kit is cheaper per milligram because one testing run covers ten times the material, but it is only a good purchase if your work will consume it inside the peptide's stability window under correct lyophilised storage. For occasional laboratory use, the single 10mg vial is the more sensible buy even at a higher cost per mg.",
      },
      {
        question: "Does the cheapest PT-141 listing include a Certificate of Analysis?",
        answer:
          "Not reliably. Per-batch third-party testing is a fixed cost, so the listings priced at the absolute floor of the market are the least likely to carry a batch-linked certificate. Always check the COA before ordering — a marginal saving against an untested vial is not a saving.",
      },
      {
        question: "Can I compare the price of a PT-141 pen or nasal spray per mg?",
        answer:
          "No. A pen fixes the concentration during manufacture and a nasal spray is a formulated article, so neither is priced on the same basis as lyophilised powder. Compare vials with vials and kits with kits, and treat devices as a separate purchasing decision.",
      },
    ],
    sources: [
      {
        label:
          "Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials (Obstetrics & Gynecology, 2019) — PMID 31599840",
        url: "https://pubmed.ncbi.nlm.nih.gov/31599840/",
      },
      {
        label:
          "Prespecified and Integrated Subgroup Analyses from the RECONNECT Phase 3 Studies of Bremelanotide (Journal of Women's Health, 2022) — PMID 35230162",
        url: "https://pubmed.ncbi.nlm.nih.gov/35230162/",
      },
      {
        label:
          "Comprehensive characterization of bremelanotide acetate and its degradants by LC-HRMS/MS (Analytical Methods, 2026) — PMID 42485063",
        url: "https://pubmed.ncbi.nlm.nih.gov/42485063/",
      },
      {
        label:
          "PubChem CID 91971505 — Bremelanotide acetate, formula C52H72N14O12, MW 1085.2",
        url: "https://pubchem.ncbi.nlm.nih.gov/compound/91971505",
      },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest PT-141 UK — Ranked by Cost Per mg",
    rowLimit: 12,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "pt-141-price-comparison-uk",
    title: "PT-141 Price Comparison UK: Every Supplier, Live",
    description:
      "PT-141 price comparison UK — every UK research supplier we track in one live table, with pack size, cost per mg, stock status and a direct link to each listing.",
    h1: "PT-141 Price Comparison UK",
    focusKeyword: "pt-141 price comparison uk",
    intro: [
      "A PT-141 price comparison UK buyers can actually use has to do one thing that most comparison pages do not: show the whole market at once, including the listings that are inconvenient. PT-141 is stocked by more UK research suppliers than almost any other peptide we track, the prices span well over an order of magnitude, and a sizeable minority of listings state a price without stating a quantity. A comparison that quietly drops those rows is not a comparison; it is a filtered view that flatters whoever assembles it.",
      "This page is the full table. Every PT-141 and Bremelanotide listing from every UK supplier ViralPeps tracks, sorted by cost per milligram where a milligram figure exists and shown with an explicit dash where it does not, alongside the pack label, the headline price, stock status and a direct link to the supplier's own product page. Nothing is hardcoded: the rows are computed at build time from the same price data that feeds the [PT-141 hub](/compounds/pt-141-bremelanotide), so the table and the hub cannot drift apart.",
      "The compound being compared is Bremelanotide, a cyclic heptapeptide melanocortin receptor agonist with the free-base formula C50H68N14O10 and a molecular weight of 1025.2 g/mol. It is sold in the UK as a research reagent, and separately exists as a licensed prescription injection that is not available through any of these listings. That distinction is the single most important thing a price table can make clear, because the two are frequently presented in the same search results as though they were the same purchase at different prices.",
      "All prices shown are the suppliers' own listed prices at the most recent sweep, and all listings are research-use-only reagents intended for laboratory work. Nothing on this page is medical advice, and a lower price here does not indicate a suitable or licensed product for any human purpose.",
    ],
    sections: [
      {
        title: "How to Read This PT-141 Price Comparison",
        body: "The table is sorted by cost per milligram, which is the only ordering that remains meaningful across 10mg vials, 5mg vials and multi-vial kits. Each row carries five pieces of information and each one exists because of a specific way a headline price can mislead.\n\nThe pack label tells you what the price buys. Where the label describes a kit — \"10mg×10vials\" — the cost per milligram is computed across the total material, not the contents of a single vial, so a kit is not disadvantaged by being a bundle. Where the label is missing, the row is not assigned a guess; it keeps its price, shows a dash in the per-mg column and sorts to the bottom. That is deliberate. An invented quantity is worse than an acknowledged gap, because it makes an uncomparable listing look comparable.\n\nStock status matters because a competitive price on a permanently out-of-stock item is not a price you can act on. We record it alongside the price and leave the row in place, since removing it would understate the market, but a buyer scanning the top rows should note which of them are actually orderable today. The direct link takes you to the supplier's own product page, not to a redirect wrapper of ours, so what you see is their listing as they published it.\n\nSupplier count at the foot of the table is the number of distinct vendors represented by the rows, not the number of rows. One vendor with three pack sizes contributes three rows and one supplier, and conflating the two is the easiest way to inflate a comparison.",
      },
      {
        title: "What Explains the Spread in PT-141 Prices",
        body: "The spread in UK PT-141 pricing is wider than in most peptide categories, and it decomposes into four causes that behave very differently.\n\nPack size is the largest and the most boring. Manufacturing cost per milligram falls steeply with batch scale, so a 10mg vial is not twice the price of a 5mg vial but usually less than twice, and a ten-vial kit is dramatically cheaper per milligram still. Almost all of the apparent bargains at the top of a per-mg ranking are this effect and nothing else.\n\nTesting is the second and the most important. A per-batch HPLC purity run with mass-spec identity confirmation from a named laboratory is a fixed cost, and it does not scale with the size of the batch. A supplier who buys one large batch and certificates it once carries a much smaller testing cost per vial than a supplier certifying every small batch. This is legitimate — the material really is the same — and it is also the mechanism by which some suppliers end up selling uncertified material at the market floor, because the certificate is the first cost to cut when competing on price.\n\nVendor overhead is the third: UK warehousing, printed batch-linked documentation, support staff and payment processing all have a cost that an overseas drop-shipper does not carry. And format is the fourth: pens and nasal presentations are priced with device assembly or formulation work bundled in, so they sit outside a per-milligram comparison entirely rather than at the top or bottom of it.",
        table: {
          header: ["Cause of price difference", "Legitimate?", "How to spot it"],
          rows: [
            ["Larger pack or kit", "Yes", "Pack label states 10mg, 20mg or a ×N kit"],
            ["One certificated batch, many vials", "Yes", "COA cites a batch with a large batch size"],
            ["Lower vendor overhead", "Yes", "Smaller site, fewer services, still publishes COA"],
            ["No per-batch testing", "No", "No COA, or a COA with no batch reference"],
            ["Device or formulation cost", "N/A", "Pen or nasal spray — compare separately"],
          ],
        },
      },
      {
        title: "The Free Base / Acetate Problem in a Price Table",
        body: "Almost no UK PT-141 listing states whether the material is the free base or the acetate salt, and a price comparison that ignores this is comparing figures that are not quite the same thing.\n\nThe free base is C50H68N14O10 at 1025.2 g/mol. The acetate is C52H72N14O12 at 1085.2 g/mol, the difference being the counter-ions that are physically present in the vial and contribute to its mass. A 10mg fill of acetate therefore contains less peptide by mass than a 10mg fill of free base — roughly six percent less — before any question of purity arises.\n\nIn practice this rarely changes which listing is cheapest, because the salt difference is small next to the pack-size effect. It does change what you should expect from a certificate. A COA reporting purity by HPLC is reporting the peptide peak as a proportion of the chromatogram, while a stated fill weight is the whole salt. Both can be simultaneously accurate and still not give you the same number, and suppliers who report both are the ones worth trusting on the point.\n\nOur table shows what each listing states and does not infer the rest. Where a supplier publishes a salt form, it appears in the pack label or the certificate; where they do not, the honest position is that the form is unknown from the listing alone. The [where to buy PT-141 UK guide](/compound-guides/where-to-buy-pt-141-uk) covers the salt question in more detail.",
      },
      {
        title: "Comparing PT-141 Against the Rest of the Market",
        body: "A price table is only useful in context, and PT-141's context is unusual because it sits in a category — melanocortin agonists — where most of what is sold online is not what the label says.\n\nMelanotan II is the clearest example. It is a linear melanocortin agonist sold heavily as a tanning peptide, and it shares a pharmacological family with Bremelanotide without being the same molecule; the ring structure of Bremelanotide is precisely what differentiates its receptor profile. Vendors occasionally use the family resemblance as a selling point, and buyers occasionally treat the two as interchangeable on price. They are not comparable and a per-milligram comparison between them means nothing.\n\nWithin PT-141 itself, the useful comparison is against the market's own distribution rather than against a single competitor. If you know that the bulk of certified 10mg vials sit in a particular band, a listing far below that band is a question and a listing far above it is usually a kit in disguise. Our per-mg column exists to make that distribution visible at a glance rather than requiring you to calculate it row by row.\n\nFor the longer-term view — which suppliers consistently hold their position, and which drift — the [PT-141 UK supplier guide](/compound-guides/pt-141-uk-supplier) covers verification and the [best PT-141 peptide page](/compound-guides/best-pt-141-peptide) ranks by TrustScore rather than by price.",
      },
    ],
    faq: [
      {
        question: "How many UK suppliers sell PT-141?",
        answer:
          "The supplier count at the foot of the live table is generated from our price data each time the page renders, so it reflects the current market rather than a fixed figure. PT-141 is one of the most widely stocked research peptides we track, and the table lists every vendor currently represented in our data.",
      },
      {
        question: "Why do some PT-141 rows show a dash instead of a price per mg?",
        answer:
          "Because the listing states a price without stating a milligram quantity, or states a quantity in doses or millilitres rather than milligrams. Those rows cannot be compared per milligram honestly, so they keep their headline price, show a dash and sort to the bottom rather than being assigned a guessed figure.",
      },
      {
        question: "Is the price in this table the price I will pay?",
        answer:
          "It is the supplier's own listed price at our most recent sweep, and listings change without notice. Treat the table as a reliable map of the market's shape and check the supplier's product page for the current figure before ordering. We re-run the sweep on a weekly cycle.",
      },
      {
        question: "Do these listings include the licensed Bremelanotide medicine?",
        answer:
          "No. Every listing in this table is a research-use-only reagent sold to laboratories. Bremelanotide as a licensed medicine is a prescription injection that is not distributed through any of these suppliers, and a research vial is not a substitute for it.",
      },
      {
        question: "Can I compare PT-141 prices with Melanotan II prices?",
        answer:
          "Not meaningfully. They are different molecules with different structures and different receptor profiles, sold in different pack conventions. A per-milligram comparison between them tells you nothing about either, and their prices move independently.",
      },
    ],
    sources: [
      {
        label:
          "Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials (Obstetrics & Gynecology, 2019) — PMID 31599840",
        url: "https://pubmed.ncbi.nlm.nih.gov/31599840/",
      },
      {
        label:
          "Melanocortin receptor agonists in the treatment of male and female sexual dysfunctions (Expert Opinion on Investigational Drugs, 2014) — PMID 25096243",
        url: "https://pubmed.ncbi.nlm.nih.gov/25096243/",
      },
      {
        label:
          "Comprehensive characterization of bremelanotide acetate and its degradants by LC-HRMS/MS (Analytical Methods, 2026) — PMID 42485063",
        url: "https://pubmed.ncbi.nlm.nih.gov/42485063/",
      },
      {
        label:
          "PubChem CID 9941379 — Bremelanotide, formula C50H68N14O10, MW 1025.2",
        url: "https://pubchem.ncbi.nlm.nih.gov/compound/9941379",
      },
    ],
    tableMode: "full",
    tableHeading: "PT-141 Price Comparison UK — Every Listing We Track",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-pt-141-online-uk",
    title: "Buy PT-141 Online UK: Payment, Delivery and Vetting",
    description:
      "Buy PT-141 online UK — what actually happens once you order, from payment methods and delivery windows through to the vial checks worth running on arrival.",
    h1: "Buy PT-141 Online UK",
    focusKeyword: "buy pt-141 online uk",
    intro: [
      "To buy PT-141 online UK buyers face a purchasing process that looks like any other ecommerce checkout and is not one, because the article being bought is an unlicensed research reagent rather than a consumer product. That difference shows up in three places: what the seller is willing to tell you before you pay, how the payment is processed, and what you can realistically do if the vial that arrives is not what the listing described. This page covers that process end to end rather than repeating a price table.",
      "The shortlist below is drawn from the same live supplier data that powers the rest of this silo, ordered by trust signals rather than by price. It is not a recommendation to buy: PT-141, or Bremelanotide, is a prescription medicine in the UK and every listing here is a laboratory reagent sold under research-use-only terms. What follows is a description of how the market operates, written for someone auditing it or completing a laboratory purchase, not advice for personal use.",
      "The compound itself deserves one line of context because it affects how sellers present it. Bremelanotide is a cyclic heptapeptide melanocortin receptor agonist — C50H68N14O10, 1025.2 g/mol in the free-base form — that was developed through a full clinical programme and licensed as a subcutaneous injection. Because that history is public, listings borrow vocabulary from it freely, and a buyer has to know which claims belong to the licensed medicine and which belong to the vial they are actually ordering.",
      "Everything below is written for research and educational reference. For the market as a whole, start at the [PT-141 price comparison hub](/compounds/pt-141-bremelanotide); for a straight supplier ranking rather than a process guide, the [best PT-141 peptide page](/compound-guides/best-pt-141-peptide) is the shorter route.",
    ],
    sections: [
      {
        title: "Before You Order — The Five-Minute Check",
        body: "Five checks, none of which takes more than a minute, catch most of the ways an online PT-141 order disappoints.\n\nFirst, find the Certificate of Analysis. It should be a document, not a badge, it should name the laboratory that ran the test rather than the supplier's own trading name, and it should reference a batch number that also appears on the vial you receive. A site that shows a COA image with no batch reference has shown you a sample, not a certificate.\n\nSecond, send one email before ordering and see what happens. The question does not matter — ask whether the material is free base or acetate, which is a legitimate and unusually revealing question. A supplier who answers within a working day, accurately, is a different counterparty from one who does not answer at all, and you have learned that while it is still free.\n\nThird, read the site's own language for what it is not saying. Research-use-only notices should be present and unambiguous. If the same site also carries dosing guidance, human-use testimonials or before-and-after imagery, those two things are in direct tension, and the compliance language is decorative.\n\nFourth, establish who you are buying from. A UK registered company number, a trading address and a domain that has existed for more than a few months are all checkable in minutes, and a storefront with none of them is a storefront that can disappear with your money. Fifth, confirm the pack quantity in milligrams before paying — a listing that will not state it cannot be compared and probably will not be resolved if there is a dispute about what arrived.",
        list: [
          "COA names a third-party laboratory and a specific batch number.",
          "One pre-sale email answered accurately within a working day.",
          "Research-use-only language present, with no human-use or dosing claims alongside it.",
          "A checkable business identity and a domain with real history.",
          "Pack quantity stated in milligrams before payment.",
        ],
      },
      {
        title: "How Payment Actually Works for Research Peptides",
        body: "Payment is where the research-peptide market diverges most sharply from ordinary ecommerce, and the divergence is not a design choice by the sellers.\n\nMainstream card processors — the ones behind most UK retail checkouts — treat research chemicals as a restricted category, and many accounts that begin processing peptide orders are closed once the merchant category becomes clear. The visible consequence is that a supplier's payment options change, sometimes abruptly, and that a site offering \"card payment\" may route you through an unrelated merchant descriptor or a third-party gateway you have never heard of. That is not automatically a red flag, but it is why the payment page often looks different from the shop.\n\nBank transfer is common and is the option with the least recourse: once a transfer settles, recovering it depends on the recipient choosing to cooperate. Cryptocurrency is increasingly common as well, for the same reason sellers like irreversible payment, and it offers a buyer no protection at all. Some suppliers use specialist high-risk processors, which is legitimate and usually disclosed.\n\nThe practical guidance is unromantic. Prefer a payment method that leaves you a route to dispute, understand that most in this market do not, and treat the absence of any consumer protection as part of the cost of the purchase rather than as a temporary inconvenience. If you would not send the money to a supplier you had not verified, do not send it because the checkout looked normal.",
      },
      {
        title: "Delivery Expectations and Import Reality",
        body: "Delivery from a UK-held stock supplier is usually a matter of a few working days, dispatched by a domestic courier with tracking. That is the simple case, and it is the majority of listings on our table.\n\nA meaningful minority of UK-facing suppliers are drop-shippers: the storefront is British, the material ships from overseas, and the quoted delivery window reflects international post rather than a domestic van. Two things follow. The first is that quoted windows slip, routinely, and a listing that promises three days from a warehouse it does not own is promising something it cannot control. The second is that import handling becomes your problem — customs delays, and in some cases a parcel that is examined and not released. Whether that risk applies to you is usually knowable before ordering: check the shipping page for the dispatch location, and if it is not stated, assume overseas.\n\nThe packaging itself is usually unremarkable and deliberately so. Lyophilised peptide vials ship at ambient temperature in padded packaging, which is appropriate for a dry powder; cold-chain shipping is unnecessary for lyophilised material, though it is sometimes offered as a premium. What matters more is that the vial arrives intact, sealed, and labelled with the same batch number as the certificate.",
      },
      {
        title: "When the Vial Arrives — What to Check",
        body: "The arrival check is the last point at which a problem is cheap to resolve, and it is worth two minutes.\n\nConfirm the vial is intact and the stopper is not compromised. Check that the batch number on the label matches the Certificate of Analysis you were shown before ordering — if it does not, you have received material from a batch that was not the one certified, and that is a question for the supplier before you use it for anything. Lyophilised peptide should appear as a white to off-white cake or powder; a discoloured plug or a vial with visible moisture is worth photographing immediately, because resolution depends on evidence gathered at the moment of opening.\n\nStorage is the next consideration. Lyophilised powder is stable for extended periods at cool ambient temperature and longer under refrigeration, protected from light and humidity. Once reconstituted, stability is measured in weeks rather than months, which is the practical argument against buying a ten-vial kit if your work is occasional. Record the reconstitution date on the vial; it is the single most useful note you can keep.\n\nIf something is wrong, the supplier's documented contact route — the one you tested before ordering — is where to start, and it is worth doing so in writing. A supplier who replaces a mislabelled vial without argument is demonstrating the thing you were actually paying for.",
      },
    ],
    faq: [
      {
        question: "Can I buy PT-141 online in the UK?",
        answer:
          "PT-141 as a licensed medicine — Bremelanotide — is a prescription product and is not sold online through research suppliers. What is sold online is a research-use-only peptide reagent supplied to laboratories, and every listing compared on this site falls into that category. This page is reference material, not advice to purchase for personal use.",
      },
      {
        question: "What payment methods do UK PT-141 suppliers accept?",
        answer:
          "Bank transfer is common, card processing is inconsistent because mainstream processors restrict research chemicals, and cryptocurrency is increasingly offered. The practical difference is recourse: transfers and crypto offer essentially none, which is why verifying the supplier before paying matters more here than in ordinary retail.",
      },
      {
        question: "How long does PT-141 delivery take in the UK?",
        answer:
          "UK-held stock typically arrives in a few working days with tracking. Drop-shipped listings quote longer windows, slip more often, and can involve customs handling. Check the shipping page for the dispatch location rather than relying on the delivery promise on the product page.",
      },
      {
        question: "What should I check when a PT-141 vial arrives?",
        answer:
          "The batch number on the label against the Certificate of Analysis you were shown, the physical condition of the powder and stopper, and the packaging integrity. Photograph anything wrong immediately — resolution is far easier with evidence gathered at the point of opening.",
      },
      {
        question: "Does PT-141 need cold-chain shipping?",
        answer:
          "Lyophilised peptide powder does not require cold-chain transport and ships at ambient temperature in padded packaging. Once reconstituted, storage and stability requirements change substantially, and the reconstitution date should be recorded on the vial.",
      },
    ],
    sources: [
      {
        label:
          "Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials (Obstetrics & Gynecology, 2019) — PMID 31599840",
        url: "https://pubmed.ncbi.nlm.nih.gov/31599840/",
      },
      {
        label:
          "Long-Term Safety and Efficacy of Bremelanotide for Hypoactive Sexual Desire Disorder (Obstetrics & Gynecology, 2019) — PMID 31599847",
        url: "https://pubmed.ncbi.nlm.nih.gov/31599847/",
      },
      {
        label:
          "Peptides in urology and sexual medicine: clinical effectiveness, dosing, indications, and safety (Sexual Medicine Reviews, 2026) — PMID 42862021",
        url: "https://pubmed.ncbi.nlm.nih.gov/42862021/",
      },
      {
        label:
          "Comprehensive characterization of bremelanotide acetate and its degradants by LC-HRMS/MS (Analytical Methods, 2026) — PMID 42485063",
        url: "https://pubmed.ncbi.nlm.nih.gov/42485063/",
      },
    ],
    tableMode: "trust",
    tableHeading: "PT-141 Suppliers — Ranked by Verification, Not Price",
    rowLimit: 10,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "pt-141-uk-supplier",
    title: "PT-141 UK Supplier Guide: How to Verify Before Buying",
    description:
      "Looking for a PT-141 UK supplier? The five checks that separate a verified UK vendor from a storefront, and the red flags visible on the site before you pay.",
    h1: "PT-141 UK Supplier",
    focusKeyword: "pt-141 uk supplier",
    intro: [
      "Choosing a PT-141 UK supplier is a different exercise from choosing a peptide supplier generally, because PT-141 sits at the intersection of two markets with very different standards: the research-reagent trade and the grey-market sexual-health trade. Suppliers drawn toward the second group tend to reveal themselves quickly — in their marketing language, in their dosing content, and in the absence of the documentation the first group depends on. This page is about reading those signals before money changes hands.",
      "What follows is the verification framework we apply to every supplier in our tracker, the specific red flags that appear most often in this category, and a live ranking of PT-141 listings ordered by verification state and TrustScore rather than by price. It deliberately does not lead with cost: the cheapest supplier who cannot show you a batch-linked certificate is not a cheaper option, they are a different product category wearing the same label.",
      "The compound's own profile makes the category unusually prone to overclaiming. Bremelanotide — PT-141 — is a cyclic heptapeptide melanocortin agonist that went through randomised phase 3 trials and was licensed as a prescription injection. Every one of those facts is public and verifiable, and every one of them describes the licensed medicine rather than a lyophilised research vial. A supplier who imports the framing without the distinction is telling you how they treat accuracy.",
      "Every supplier discussed here sells research-use-only reagents to laboratories. Nothing on this page is medical advice, and the verification framework below is about commercial and documentary reliability — not about whether any product is appropriate for any human use, which no page on this site addresses.",
    ],
    sections: [
      {
        title: "The Five Checks That Actually Separate Suppliers",
        body: "Our framework is short because in practice five signals do most of the work, and because any framework longer than five stops being applied.\n\nThe first and most important is a batch-linked Certificate of Analysis from a named third-party laboratory. Not a COA badge, not a stock image of a chromatogram, not a document naming the supplier's own brand — a certificate naming the analytical lab and the batch, with a purity figure and an identity confirmation. This is the only check that speaks to the contents of the vial rather than to the shopping experience.\n\nThe second is a working contact route. An email address that replies within a working day, or a phone that a human answers. Tested before you order. A supplier who is unreachable before payment is not going to become reachable after it.\n\nThe third is compliance language. Research-use-only notices should be prominent and consistent, and there should be no dosing guides, human-use testimonials or efficacy claims anywhere on the site. In this category specifically, that tension is the most common tell.\n\nThe fourth is a verifiable business identity: a registered company, a trading address, a domain with a few years of history rather than a few weeks.\n\nThe fifth is domain control, which is what our TrustScore badge verifies. A supplier who installs the badge on their own site is proving they operate that domain, which rules out the cloned and disposable storefronts that characterise the bottom of this market.",
        list: [
          "Batch-linked COA from a named third-party lab — the decisive signal.",
          "A contact route that replies before you pay.",
          "Consistent research-use-only language with no dosing or human-use claims.",
          "A verifiable registered business and a domain with real history.",
          "Confirmed domain ownership — what the TrustScore badge proves.",
        ],
      },
      {
        title: "Red Flags Specific to PT-141 Suppliers",
        body: "The generic red flags — no COA, no address, a domain registered last month — apply here as everywhere. But PT-141 has three category-specific ones that are more informative, because they are harder to fake and easier to spot.\n\nThe first is clinical framing used as product copy. A supplier describing a 10mg research vial in the language of a licensed injection, complete with references to trial endpoints and licensed indications, is borrowing authority that does not transfer. The licensed medicine and the reagent are different articles with different regulatory status; conflating them is not a harmless stylistic choice.\n\nThe second is dosing content. Any dosing guidance aimed at a reader, whether in a blog post, a product tab or an FAQ, indicates a site oriented toward human use. Research suppliers that sell to laboratories do not need to tell anyone how much to take, and the ones that do are selling to a different customer than the one their compliance notice describes.\n\nThe third is inconsistency between the certificate and the listing. A certificate for a batch of 5mg vials offered against a listing for 10mg vials; a certificate dated before the vendor existed; a certificate naming a compound with a different molecular weight from the one in the product title. These are cheap to check and disproportionately revealing, because a supplier publishing genuine certificates has no reason to be sloppy about the correspondence between them and the listing.",
        table: {
          header: ["Red flag", "What it indicates"],
          rows: [
            ["Clinical-trial framing on a research vial", "Borrowed authority; licensed medicine conflated with reagent"],
            ["Dosing guidance aimed at readers", "Site oriented to human use, not laboratory supply"],
            ["COA batch does not match the listing", "Certificates are decorative rather than functional"],
            ["No named analytical laboratory", "In-house or stock documentation, not third-party testing"],
            ["Payment only by transfer or crypto", "No recourse by design — verify harder before paying"],
          ],
        },
      },
      {
        title: "How Our TrustScore Is Calculated",
        body: "TrustScore is a composite we compute from observable signals on each supplier's site, and it is deliberately mechanical so that it cannot be talked up by a supplier's marketing.\n\nThe components are: whether the domain resolves and returns a successful response; whether a Certificate of Analysis is present anywhere on the site, on the homepage or a linked page; whether research-use-only language appears; whether a review mechanism exists; whether shipping information is published; whether a contact route is available; and whether the site has structured title metadata at all, which is a rough proxy for whether anyone maintains it. A separate flag records whether the domain is live.\n\nWhat the score does not measure is anything about the material itself. It cannot verify a certificate, only that one is published. It cannot tell you whether the batch number on the vial matches the batch number on the PDF. It is a first filter that reduces a long list to a short one, and the five manual checks above are what you run on the shortlist.\n\nWe publish the score because a mechanical number is more useful than an editorial impression, and because suppliers can see exactly what it rewards and respond to it. A supplier who publishes a batch-linked COA, keeps a contact route open and maintains their site is doing the things the score measures, and those are the things that correlate with a transaction going well.",
      },
      {
        title: "Reading the Live Supplier Table",
        body: "The table below ranks PT-141 suppliers by verification state and TrustScore rather than price, and it is worth understanding what each column tells you before scanning it.\n\nThe verified flag means the supplier appears in our vendor registry as a verified vendor, which is a status conferred after the checks above rather than a claim about any individual batch. The TrustScore column is the composite described in the previous section. The price and pack columns show the supplier's cheapest current listing so the ranking is anchored to something concrete, and the link goes to the supplier's own product page rather than through a wrapper.\n\nWhat the table cannot do is substitute for the manual checks. A high score with no batch-linked certificate is still a supplier with no batch-linked certificate. Our recommendation for anyone buying in this category is consistent: use the ranking to build a shortlist of three, then email all three with the same question and see which one answers accurately. That single test eliminates more suppliers than any score.\n\nFor the wider market shape — what the price distribution looks like and why — the [PT-141 price comparison page](/compound-guides/pt-141-price-comparison-uk) is the companion to this one, and the [PT-141 hub](/compounds/pt-141-bremelanotide) carries the compound's research overview.",
      },
    ],
    faq: [
      {
        question: "How do I verify a PT-141 UK supplier?",
        answer:
          "Five checks: a batch-linked Certificate of Analysis from a named third-party laboratory; a contact route that replies before you pay; consistent research-use-only language with no dosing claims; a verifiable registered business and domain history; and confirmed domain ownership, which the TrustScore badge demonstrates.",
      },
      {
        question: "What is TrustScore and what does it measure?",
        answer:
          "TrustScore is a mechanical composite of observable site signals — domain liveness, published COA, research-use-only language, published shipping and contact information, and basic site maintenance. It is a first filter, not a quality certification, and it cannot verify that a certificate is genuine.",
      },
      {
        question: "Why do some PT-141 suppliers show clinical trial language?",
        answer:
          "Because Bremelanotide was developed through randomised phase 3 trials and licensed as a prescription injection, and that public history is easy to borrow. It describes the licensed medicine, not the research reagent a supplier is selling, and a supplier who blurs the two is using borrowed authority.",
      },
      {
        question: "Is a high TrustScore enough to order from a supplier?",
        answer:
          "No. It confirms published signals exist, not that the material is what it claims. Run the manual checks on any shortlist: read the certificate for a batch number and a named laboratory, and send one pre-sale question to see whether the answer is accurate and prompt.",
      },
      {
        question: "Should I choose the cheapest verified PT-141 supplier?",
        answer:
          "Among suppliers who pass verification, cost per milligram is a reasonable tie-breaker. Among all suppliers, it is the wrong first question — a cheaper listing without batch-linked documentation is a different proposition, not a better price.",
      },
    ],
    sources: [
      {
        label:
          "Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials (Obstetrics & Gynecology, 2019) — PMID 31599840",
        url: "https://pubmed.ncbi.nlm.nih.gov/31599840/",
      },
      {
        label:
          "An evaluation of bremelanotide injection for the treatment of hypoactive sexual desire disorder (Expert Opinion on Pharmacotherapy, 2023) — PMID 36242769",
        url: "https://pubmed.ncbi.nlm.nih.gov/36242769/",
      },
      {
        label:
          "Comprehensive characterization of bremelanotide acetate and its degradants by LC-HRMS/MS (Analytical Methods, 2026) — PMID 42485063",
        url: "https://pubmed.ncbi.nlm.nih.gov/42485063/",
      },
      {
        label:
          "PubChem CID 9941379 — Bremelanotide, formula C50H68N14O10, MW 1025.2",
        url: "https://pubchem.ncbi.nlm.nih.gov/compound/9941379",
      },
    ],
    tableMode: "trust",
    tableHeading: "PT-141 UK Suppliers — Ranked by Verification",
    rowLimit: 12,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-pt-141-peptide",
    title: "Best PT-141 Peptide UK: Ranked by TrustScore",
    description:
      "The best PT-141 peptide UK ranking — scored on certificates, contact, compliance and domain control rather than price, with the criteria behind each score.",
    h1: "Best PT-141 Peptide",
    focusKeyword: "best pt-141 peptide",
    intro: [
      "Any page claiming to name the best PT-141 peptide UK buyers can trust is making a judgement, and the only honest way to make it is to say what the judgement is based on. Ours is based on verifiability rather than price or marketing. A supplier who publishes a batch-linked certificate from a named laboratory, answers a question before payment, and operates the domain they sell from is a better supplier than one who does none of those things, whatever the cost per milligram.",
      "This page explains the criteria, applies them in a live ranking drawn from our supplier tracker, and — just as importantly — explains what the ranking cannot tell you. It cannot tell you whether the material in any particular vial is what the certificate says, because no third-party page can. It cannot tell you that any product is appropriate for any human use, since every listing here is a research reagent supplied to laboratories under research-use-only terms. And it cannot be permanent: suppliers change, certificates lapse, domains are abandoned, and the ranking is re-run from current data rather than preserved as an editorial opinion.",
      "The compound in question is Bremelanotide, sold as PT-141 — a cyclic heptapeptide melanocortin receptor agonist with the free-base formula C50H68N14O10 and a molecular weight of 1025.2 g/mol. It has a genuine clinical history: randomised phase 3 trials, a long-term safety extension, and a licence as a subcutaneous injection. That history raises the stakes on supplier quality, because a market with a public clinical backdrop attracts sellers who borrow the clinical framing without carrying any of the discipline.",
      "Nothing below is medical advice. For the market-wide view of what things cost and why, the [PT-141 price comparison page](/compound-guides/pt-141-price-comparison-uk) is the companion to this ranking, and the [PT-141 hub](/compounds/pt-141-bremelanotide) carries the research overview of the compound itself.",
    ],
    sections: [
      {
        title: "What Best Actually Means Here",
        body: "In a regulated market, \"best\" would mean something like efficacy, safety record and licensed indication. None of those apply to a research reagent, and importing them would be a category error. So the criteria have to be ones that a buyer can actually observe before spending money, and they have to be ones that a supplier cannot fake cheaply.\n\nWe weight four things. Documentary evidence comes first, because a batch-linked certificate from a named analytical laboratory is the only artefact in this market that speaks to what is inside the vial. Responsiveness comes second, because an unreachable supplier turns a small problem into an unrecoverable one. Compliance posture comes third — consistent research-use-only language and the absence of dosing claims — because it is the clearest available proxy for whether a supplier understands what it is selling. Domain control comes fourth, because it distinguishes an operating business from a storefront built to be abandoned.\n\nPrice appears nowhere in the weighting, which will read oddly on a site built around price comparison. The reason is that price is already handled: every row carries a cost per milligram, and within a group of verified suppliers it is a perfectly good tie-breaker. It is only a bad primary criterion, because the market's cheapest listing is reliably its least documented one, and recommending that would be recommending the thing we spend every other page warning about.",
        table: {
          header: ["Criterion", "Weight", "What we look for"],
          rows: [
            ["Documentary evidence", "Highest", "Batch-linked COA naming a third-party laboratory"],
            ["Responsiveness", "High", "Contact route that answers before payment"],
            ["Compliance posture", "High", "RUO language throughout; no dosing or human-use claims"],
            ["Domain control", "Medium", "Operator proves they run the domain they sell from"],
            ["Price per mg", "Tie-breaker", "Used only within a group of verified suppliers"],
          ],
        },
      },
      {
        title: "The Live Ranking and How to Read It",
        body: "The table below is generated from our supplier tracker each time the page renders. Vendors with a verified status appear first, ordered by TrustScore; within equal scores the cheaper listing comes first as a tie-breaker. Every row links to the supplier's own product page rather than to a redirect of ours.\n\nThe verified flag is a registry status, not a per-batch claim. It means the supplier has passed our checks — a resolvable domain, published compliance language, a contact route and, most importantly, a published Certificate of Analysis. It does not mean the certificate covers the vial you will receive, which is why the manual check at the end of this page still matters even for a top-ranked supplier.\n\nThe TrustScore column is a mechanical composite of observable site signals, described in detail on the [PT-141 UK supplier page](/compound-guides/pt-141-uk-supplier). It rewards published documentation and penalises abandonment. It is deliberately not a quality score, and a supplier with a perfect score can still ship a mislabelled vial; the score tells you whether they are likely to fix it.\n\nWhat is absent from the table is equally deliberate. We do not include listings that fail verification, we do not rank by headline price, and we do not carry sponsored positions in this particular table. Sponsorship exists elsewhere on the site and is labelled where it appears.",
      },
      {
        title: "Judging Purity Claims Without a Laboratory",
        body: "Purity claims are the most-quoted and least-checkable numbers in this market, and a buyer without a laboratory can still do a reasonable job of assessing them.\n\nThe first thing to understand is what a purity figure means. An HPLC purity of 98% describes the proportion of the chromatogram accounted for by the main peptide peak. It says nothing about identity — a vial of the wrong peptide can be 99% pure — which is why a certificate that reports purity without an identity confirmation by mass spectrometry is only half a certificate. The certificates worth trusting report both, and name the instrument or method used.\n\nThe second is the difference between a certificate and a batch. If a certificate cites no batch number, or cites one that does not appear on the vial, it is documentation of something but not of your purchase. If a supplier shows one certificate from 2019 against listings created in 2025, the certificate is decorative.\n\nThe third is internal consistency. A certificate's stated molecular weight should match the compound — 1025.2 for the PT-141 free base, 1085.2 for the acetate. A certificate showing a different figure against a PT-141 listing is either a different compound or a copy-paste error, and either is disqualifying. This is a thirty-second check and it catches a surprising number of listings, which is exactly why the identity figures are printed on every page of this silo.",
      },
      {
        title: "A Shortlist Method That Beats Any Ranking",
        body: "Rankings are a starting point, and the method that consistently produces a good outcome is simpler than reading one.\n\nTake the top three suppliers from the table below. Send each of them the same single question — for example, whether their PT-141 is the free base or the acetate salt, and what the batch number of current stock is. Then judge the answers. A reply that is accurate, prompt and specific is worth more than any score we can compute, because it demonstrates the thing you are actually buying: a counterparty who knows their own product.\n\nThen check the certificates against the listings as described above, and confirm the pack quantity in milligrams before ordering. Three suppliers, one question, two minutes of certificate checking. This method outperforms price sorting consistently, and it costs nothing.\n\nFinally, keep the record. Note the supplier, batch and reconstitution date, and if a problem appears you will have the only thing that makes resolution possible — evidence gathered at the right time. That habit is worth more than the difference between the cheapest and second-cheapest verified listing, which is usually a few pounds.",
      },
    ],
    faq: [
      {
        question: "What is the best PT-141 peptide in the UK?",
        answer:
          "The ranking on this page is computed from current supplier data and weighted toward verifiability — batch-linked certificates, responsiveness, compliance posture and domain control — rather than price. The top of the table reflects who documents their product, not who sells it cheapest.",
      },
      {
        question: "Is the most expensive PT-141 the best?",
        answer:
          "No. Price correlates weakly with documentation and not at all with the compound, which is the same molecule everywhere. A high price can reflect a large kit, a device format or simply a supplier testing the market. Judge certificates, not price points.",
      },
      {
        question: "What purity should a PT-141 certificate report?",
        answer:
          "Most research-grade certificates report an HPLC purity in the high nineties, but the figure means the proportion of chromatogram accounted for by the main peak, not proof of identity. A certificate should pair purity with an identity confirmation by mass spectrometry, and should cite a batch number.",
      },
      {
        question: "How do I check a PT-141 certificate is genuine?",
        answer:
          "Check for internal consistency: the molecular weight should be 1025.2 for the free base or 1085.2 for the acetate, the compound name and batch must match the listing, the date must be plausible, and the laboratory should be named independently of the supplier's own brand.",
      },
      {
        question: "Does a top TrustScore mean the material is good?",
        answer:
          "No. TrustScore measures observable site signals, not the contents of a vial. It tells you whether a supplier publishes documentation and keeps a contact route open. The batch-linked certificate is the only artefact that speaks to the material itself.",
      },
    ],
    sources: [
      {
        label:
          "Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials (Obstetrics & Gynecology, 2019) — PMID 31599840",
        url: "https://pubmed.ncbi.nlm.nih.gov/31599840/",
      },
      {
        label:
          "Long-Term Safety and Efficacy of Bremelanotide for Hypoactive Sexual Desire Disorder (Obstetrics & Gynecology, 2019) — PMID 31599847",
        url: "https://pubmed.ncbi.nlm.nih.gov/31599847/",
      },
      {
        label:
          "Clinical trial evidence on emerging pharmacological therapies for hypoactive sexual desire disorder in women (Frontiers in Medicine, 2026) — PMID 42254382",
        url: "https://pubmed.ncbi.nlm.nih.gov/42254382/",
      },
      {
        label:
          "Comprehensive characterization of bremelanotide acetate and its degradants by LC-HRMS/MS (Analytical Methods, 2026) — PMID 42485063",
        url: "https://pubmed.ncbi.nlm.nih.gov/42485063/",
      },
    ],
    tableMode: "trust",
    tableHeading: "Best PT-141 Peptide — Ranked by TrustScore",
    rowLimit: 15,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
