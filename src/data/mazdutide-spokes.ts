/**
 * Mazdutide silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/mazdutide-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * SLUG CONVENTION — copied verbatim from the live /compound-guides index:
 *   where-to-buy-X-uk / cheapest-X-uk / X-price-comparison-uk /
 *   buy-X-online-uk / X-uk-supplier / best-X-peptide
 * Mazdutide is a GLP-1 class compound, so the GLP-1 modifier set applies
 * (same pattern as retatrutide, tirzepatide and semaglutide):
 *   1. /compound-guides/where-to-buy-mazdutide-uk
 *   2. /compound-guides/cheapest-mazdutide-uk
 *   3. /compound-guides/mazdutide-price-comparison-uk
 *   4. /compound-guides/buy-mazdutide-online-uk
 *   5. /compound-guides/mazdutide-uk-supplier
 *   6. /compound-guides/best-mazdutide-peptide
 *
 * MOLECULAR IDENTITY — verified, not inherited (PubChem REST, checked 2026-10-26):
 *   PubChem CID 167312357. Synonym list includes Mazdutide, IBI362, IBI-362,
 *   LY3305677, LY-3305677, GLXC-26803 and CAS 2259884-03-0.
 *   Formula C207H317N45O65 · MW 4476 g/mol.
 *   NOTE: compounds.json carries cas "2382627-17-8" and molarMass "~4400 g/mol"
 *   for this slug. 2382627-17-8 does NOT resolve in PubChem (PUGREST.NotFound)
 *   while 2259884-03-0 resolves to CID 167312357. Those compounds.json fields
 *   are therefore NOT used anywhere in this silo, and no CAS number is
 *   published on any mazdutide spoke. compounds.json is out of scope for this
 *   build and was deliberately left untouched — see the build report.
 *   Page copy quotes the PubChem formula and MW only.
 *
 * PMIDs — every one below was resolved through NCBI E-utilities esearch +
 * esummary and each title/journal/volume/page was checked against the summary
 * record. None drafted from memory.
 *
 * CLINICAL FACTS used in this silo, each traceable to the cited record:
 *   - GLP-1 and glucagon receptor dual agonist, once-weekly, subcutaneous in
 *     the trials (PMID 36247927, 38092790).
 *   - Developed by Innovent Biologics with Eli Lilly (PMID 41028652).
 *   - First approval June 2025 in China (brand Xinermei) for long-term weight
 *     management; September 2025 for glycaemic control in type 2 diabetes
 *     (PMID 41028652).
 *   - Phase 2 24-week up to 6mg: weight change -6.7% (3mg), -10.4% (4.5mg),
 *     -11.3% (6mg), +1.0% placebo; n=248 (PMID 38092790).
 *   - Phase 1b 9mg cohort: -11.7% at week 12 vs -1.8% placebo; 10mg cohort
 *     -9.5% at week 16 vs -3.3% (PMID 36247927).
 *   - GLORY-1, once-weekly mazdutide in Chinese adults with obesity or
 *     overweight, NEJM 2025;392(22):2215-2225 (PMID 40421736).
 *   - GLORY-2, 9mg, JAMA 2026;336(5):377-388 (PMID 42251595).
 *   - DREAMS-1 and DREAMS-2 vs placebo / vs dulaglutide in T2D, Nature 2026
 *     (PMID 41407859, 41407860).
 *   - US-based phase 2 in adults with obesity or overweight, Lancet Diabetes
 *     Endocrinol 2026 (PMID 42628555).
 *
 * Everything is written as research-use-only. There are no human-use claims,
 * no dosing instructions and no testimonials anywhere in this file. Trial
 * results are cited as published findings about a licensed medicine, never as
 * product specifications for a research vial.
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
  /** <title> — 60-70 chars, no brand suffix, contains focus keyword. */
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

const MAZ_PUBCHEM: SpokeSource = {
  label:
    "PubChem CID 167312357 — Mazdutide (IBI362, LY3305677), formula C207H317N45O65, MW 4476",
  url: "https://pubchem.ncbi.nlm.nih.gov/compound/167312357",
};

const MAZ_FIRST_APPROVAL: SpokeSource = {
  label:
    "Mazdutide: First Approval (Drugs, 2025;85(12):1621-1627) — PMID 41028652",
  url: "https://pubmed.ncbi.nlm.nih.gov/41028652/",
};

export const spokes: Spoke[] = [
  /* ─────────────────────────── 1 ─────────────────────────── */
  {
    slug: "where-to-buy-mazdutide-uk",
    title: "Where to Buy Mazdutide UK: Verified Suppliers Guide 2026 Now",
    description:
      "Where to buy mazdutide UK — compare live prices from every UK research supplier we track, then check pack size, verification and live stock before you order.",
    h1: "Where to Buy Mazdutide UK",
    focusKeyword: "where to buy mazdutide uk",
    intro: [
      "If you are searching for where to buy mazdutide UK, the first thing worth establishing is what the compound actually is, because the market describes it in several different ways. Mazdutide is a once-weekly dual agonist at the glucagon-like peptide-1 receptor and the glucagon receptor. It was developed by Innovent Biologics with Eli Lilly and carries the development codes IBI362 and LY3305677. On UK supplier sites it appears as Mazdutide, IBI362, IBI-362, LY3305677 and occasionally as a \"GLP-1/glucagon dual agonist\" with no drug name at all — four labels for one molecule, and a fifth that requires you to read the description to know what you are looking at.",
      "That naming sprawl matters practically. A comparison table that searches one term under-reports the market badly, and one that folds all the terms together without checking pack sizes will happily rank a 5mg vial against a 10mg vial and present the smaller number as better value. This page does not do that. Below is a live table of every mazdutide listing from the UK research suppliers ViralPeps tracks, showing the pack label, the headline price, the cost per milligram wherever the pack states a milligram figure, stock status, verification state and a direct link to the supplier's own product page. It is regenerated from our recurring price sweep, so the figures reflect those listing pages at the most recent check.",
      "The documentation trail behind mazdutide is unusually rich for a research reagent. It has a phase 1b dose-escalation programme, a phase 2 trial in Chinese adults with overweight or obesity published in Nature Communications, the GLORY-1 and GLORY-2 trials in the New England Journal of Medicine and JAMA respectively, and two phase 3 type 2 diabetes trials reported in Nature. It received its first approval in China in June 2025 for long-term weight management, and a second in September 2025 for glycaemic control in type 2 diabetes. That body of literature is genuinely useful for anyone auditing the market — and it is also why so many storefronts borrow clinical language so freely, treating a licensed medicine's trial results as though they were specifications for an unapproved vial.",
      "Every listing on this page is a research-use-only reagent sold to laboratories, and nothing here is medical advice. Mazdutide is not licensed for human use in the UK, the research vials sold online are not pharmacy stock, and they are not the approved product. If you are auditing the market rather than buying a specific vial today, the [**mazdutide price comparison hub →**](/compounds/mazdutide) is the better starting point.",
    ],
    sections: [
      {
        title: "Where to Buy Mazdutide UK — The Questions That Decide It",
        body: "The phrase \"where to buy\" hides a more useful question: which supplier can you actually verify? Mazdutide is exposed on this front more than most peptides because the compound has a licensed identity. There is an approved medicine with a brand name, a manufacturer and a published trial programme, and there is a research reagent sold in vials by companies with no connection to either. Those two things compete for the same search results, and the storefronts that blur the line between them are the ones least likely to publish documentation.\n\nOur supplier audit applies the same checklist to every listing we track, and it is worth being explicit about what each item catches. A Certificate of Analysis from a named laboratory referencing a specific batch number establishes that the material was independently tested and that the test can be tied to the vial you receive; a generic certificate naming no batch establishes only that some material, somewhere, was tested once. A contact route that replies, tested before you order rather than after. Unambiguous research-use-only labelling throughout, with no weight-management marketing and no dosing guidance. A registered business identity behind the storefront. And confirmed control of the domain they sell from, which is what the TrustScore badge verifies — a supplier who installs it on their own site is proving they operate that domain, which rules out the throwaway storefronts that characterise the bottom of this market.\n\nFor mazdutide specifically, two further checks carry more weight than they do for a standard single-agonist peptide. The first is pack size, because mazdutide vials are sold in two common formats — 5mg and 10mg — and a handful of listings publish a price with no milligram figure at all. Those cannot be compared honestly, and our table shows them with an explicit dash rather than an invented quantity. The second is pack count: some vendors publish a single vial, some publish a multi-vial bundle at a bundle price, and comparing the two on headline price tells you nothing. Both are expanded into their real per-pack rows below so the comparison stays on one basis.",
        list: [
          "A Certificate of Analysis from a named third-party laboratory referencing a specific batch number — the single most decisive signal a buyer can check.",
          "A working contact route: an email that replies or a phone that connects, tested before you order.",
          "Research-use-only labelling throughout, with no weight-management, dosing or therapeutic marketing.",
          "A stated pack quantity in milligrams, so the listing can be compared honestly on cost per mg.",
          "A stated pack count — one vial or a bundle — because bundle pricing is not comparable to single-vial pricing.",
          "Confirmed domain ownership, which is what the TrustScore badge verifies.",
        ],
      },
      {
        title: "The Names Mazdutide Is Sold Under in the UK",
        body: "Search one term and you will under-report this market substantially. Fold every term together without checking what each one refers to and you will mis-price it. The table below maps the labels you will actually encounter onto what they describe.\n\nMazdutide, IBI362, IBI-362 and LY3305677 are all the same molecule — the first is the international non-proprietary name, the second is Innovent's internal code and the third is Eli Lilly's, reflecting the joint development programme. PubChem lists all of them as synonyms against a single record, along with the CAS number and the code GLXC-26803. If you see two of these names at different prices, you are looking at two listings of the same peptide, not two products.\n\nThe consequential distinctions are formats and pack counts rather than names. A 5mg vial and a 10mg vial of the same peptide are the same material in different quantities, and the smaller one usually costs more per milligram for a mundane reason: the glass, stopper, label, packing and per-batch testing cost the same regardless of how much powder is inside. A multi-vial bundle is the same effect in reverse. None of this is a scam; the problem is only that a price table treating all of them as one product will mislead you.",
        table: {
          header: ["Name you will see", "What it actually is"],
          rows: [
            ["Mazdutide", "The INN — the compound's internationally recognised name"],
            ["IBI362 / IBI-362", "Innovent Biologics' development code for the same molecule"],
            ["LY3305677 / LY-3305677", "Eli Lilly's development code for the same molecule"],
            ["GLXC-26803", "A further synonym listed against the same PubChem record"],
            ["GLP-1/glucagon dual agonist", "A mechanism description, not a name — check it is mazdutide"],
            ["Retatrutide / Tirzepatide", "Different compounds with different receptor profiles. Not interchangeable"],
            ["5mg vs 10mg vial", "Same material, different quantity; the smaller is usually dearer per mg"],
            ["Multi-vial bundle", "Several vials at one price — cheaper per mg, larger commitment"],
          ],
        },
      },
      {
        title: "What the UK Mazdutide Market Looks Like Right Now",
        body: "The UK mazdutide market is narrower than the retatrutide or tirzepatide markets and considerably narrower than PT-141's. That is typical of a compound at this stage: it is well documented in the literature, it has a licensed identity in another jurisdiction, and it has not yet become a default stock item for every reseller. The practical consequence is a shorter table with less price dispersion, and fewer listings competing on the same pack size.\n\nThe dominant article is the 10mg lyophilised vial, which accounts for the clear majority of listings we track. A smaller number of suppliers stock 5mg, and at least one publishes both sizes. The headline price band across the listings on this page spans roughly fourfold from the cheapest 10mg vial to the most expensive, and most of that spread is explained by vendor overhead rather than by the molecule — UK warehousing, commissioned third-party testing, printed batch-linked certificates and staff who answer email all cost money, and a bare-bones reseller drop-shipping from overseas carries none of it.\n\nThe remaining part of the spread is informational, and it is the part buyers most often miss. Some listings publish no usable milligram figure, which means they cannot enter a per-milligram ranking at all. Our table keeps them, because they are a real part of the market and pretending otherwise would understate it, but it shows the pack label explicitly and ranks per milligram only where a real figure exists. A visible gap is more honest than an invented comparison, and it is why the per-mg columns are not populated for every row.",
      },
      {
        title: "Dual Agonism — Why It Changes What You Are Buying",
        body: "Mazdutide is not a GLP-1 agonist with an extra effect bolted on; the glucagon component is deliberate and it is the reason this compound is grouped separately from semaglutide in the literature.\n\nGLP-1 receptor agonism is the well-known half: it increases glucose-dependent insulin secretion, slows gastric emptying and reduces appetite signalling. Glucagon receptor agonism does something close to the opposite on glucose handling — glucagon promotes hepatic glucose output — while increasing energy expenditure. Combining the two is an attempt to keep the appetite and glucose effects of GLP-1 while adding a component that raises energy expenditure, and the balance between the two is what the dose-finding programme was largely about. The published phase 2 work reports body-weight change at 24 weeks of -6.7% at 3mg, -10.4% at 4.5mg and -11.3% at 6mg against +1.0% for placebo in Chinese adults with overweight or obesity, which is a dose-response consistent with the mechanism being engaged at each step.\n\nFor anyone buying a research vial, the practical implication is simple: mazdutide is not interchangeable with a GLP-1 selective peptide in an experimental design, and a certificate that confirms identity by mass spectrometry should report a molecular weight consistent with the full dual-agonist sequence rather than a GLP-1 analogue. PubChem lists the formula as C207H317N45O65 with a molecular weight of 4476 g/mol, which is a useful sanity check against any certificate quoting a figure in the 3,000-4,000 range in either direction. If a certificate's stated mass does not match the compound, stop there — that is a mismatch no amount of purity percentage can repair.",
      },
    ],
    faq: [
      {
        question: "Where can I buy mazdutide in the UK?",
        answer:
          "ViralPeps compares mazdutide listings from UK research-chemical suppliers, who sell the lyophilised peptide strictly for laboratory use under research-use-only terms. We track only suppliers whose verification signals — COA, contact, compliance and domain ownership — we can independently confirm, and the live table on this page shows every one we currently track.",
      },
      {
        question: "Is mazdutide the same as IBI362?",
        answer:
          "Yes. Mazdutide is the international non-proprietary name; IBI362 is Innovent Biologics' development code and LY3305677 is Eli Lilly's. PubChem lists all of them as synonyms against a single record (CID 167312357), so a listing using any of these names is describing the same molecule.",
      },
      {
        question: "Is mazdutide legal to buy in the UK?",
        answer:
          "Mazdutide is not licensed for human use in the UK. Research suppliers sell the peptide under research-use-only terms intended for laboratory and educational purposes. Using an unlicensed research chemical for human consumption falls outside those terms, and this page is presented for reference only, not as guidance.",
      },
      {
        question: "Why do mazdutide prices vary between UK suppliers?",
        answer:
          "Pack size is the main driver — a 5mg vial usually costs more per milligram than a 10mg vial because the glassware, labelling and per-batch testing cost the same regardless of fill — followed by vendor overheads such as warehousing, testing and support. A price far below the market is worth interrogating rather than celebrating.",
      },
      {
        question: "Does every UK supplier publish a Certificate of Analysis for mazdutide?",
        answer:
          "No, and that is the most useful filter available. Suppliers publishing a named-laboratory certificate with a batch number are demonstrating that their material was independently tested and is traceable. Suppliers publishing none, or a generic certificate with no batch reference, cannot show that the material you receive is the material that was tested.",
      },
    ],
    sources: [
      {
        label:
          "Once-Weekly Mazdutide in Chinese Adults with Obesity or Overweight — GLORY-1 (N Engl J Med, 2025;392(22):2215-2225) — PMID 40421736",
        url: "https://pubmed.ncbi.nlm.nih.gov/40421736/",
      },
      {
        label:
          "A phase 2 randomised controlled trial of mazdutide in Chinese overweight adults or adults with obesity (Nat Commun, 2023;14:8289) — PMID 38092790",
        url: "https://pubmed.ncbi.nlm.nih.gov/38092790/",
      },
      MAZ_FIRST_APPROVAL,
      MAZ_PUBCHEM,
    ],
    tableMode: "price",
    tableHeading: "Mazdutide UK Suppliers — Live Prices",
    rowLimit: 12,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-mazdutide-uk",
    title: "Cheapest Mazdutide UK: The Lowest Verified Price Per mg 2026",
    description:
      "Cheapest mazdutide UK — the lowest verified cost per milligram from UK suppliers, sorted live weekly, plus the traps that make a cheap peptide price misleading.",
    h1: "Cheapest Mazdutide UK",
    focusKeyword: "cheapest mazdutide uk",
    intro: [
      "The cheapest mazdutide UK listing and the best-value mazdutide UK listing are frequently not the same page, and the gap between them is where buyers lose money. The reason is structural: mazdutide is sold in at least two vial sizes, 5mg and 10mg, some vendors publish multi-vial bundles, and a minority of listings carry a headline price with no milligram figure at all. Sorting those by price ranks a bundle above a single vial and calls it more expensive, which it is, and ranks a 5mg vial above a 10mg vial and calls it cheaper, which it may not be on the measure that matters.",
      "This page ranks by cost per milligram instead, which is the only comparison that survives different pack sizes. Every figure is computed from the live price data in our tracker rather than transcribed by hand, and rows whose listing states no milligram figure are excluded from the ranking rather than assigned a guessed quantity — they still appear in the full table on the [mazdutide price comparison page](/compound-guides/mazdutide-price-comparison-uk), just not in a per-mg leaderboard where they would be comparing an unknown against a known.",
      "Cheap is also a relative term in a market with no enforced floor. Mazdutide has a licensed identity outside the UK but no UK authorisation for human use, and every listing on this page is a research reagent sold for laboratory work. A supplier selling a 10mg vial at the very bottom of the range has usually declined to pay for per-batch third-party testing, because that testing costs a fixed amount per batch regardless of batch size and cannot be absorbed on a thin margin. That does not make the material automatically bad, but it does mean the price difference you are looking at is a difference in documentation as much as in peptide.",
      "The practical method is to find the two or three lowest cost-per-milligram listings, then check each against the verification signals on the [mazdutide UK supplier page](/compound-guides/mazdutide-uk-supplier) before buying. A marginally higher price from a supplier who publishes a batch-linked certificate is usually the cheaper purchase in the end.",
    ],
    sections: [
      {
        title: "Why Cost Per Milligram Beats Headline Price",
        body: "A headline price tells you what you will be charged. It tells you nothing about what you will receive, and mazdutide is sold in pack sizes that differ by a factor of two within the same supplier, let alone across the market. Ranking by headline price therefore ranks partly by pack size, not by value.\n\nThe arithmetic is simple once you have two real numbers. If a 10mg vial costs £60 and a 5mg vial costs £45, the 10mg vial is cheaper per milligram at £6.00/mg against £9.00/mg, even though it carries the larger headline price. That is the entire purpose of a per-mg column, and it is why our table computes it from the pack label rather than from a summary field. Where a label describes a multi-vial bundle the figure is multiplied out so a bundle is compared on its total material, not on the contents of one vial.\n\nThe rows that frustrate this comparison are the ones with no milligram figure at all. In the UK mazdutide market that is a real minority of listings, and they are not all careless — some have simply never had the field populated. Either way they cannot enter a per-mg ranking honestly. We show them in the full table with an explicit \"—\" and exclude them here, which is why the leaderboard below is shorter than the market.",
      },
      {
        title: "What a Low Mazdutide Price Usually Means",
        body: "There are four legitimate reasons a mazdutide listing can be cheap, and one illegitimate one, and they are distinguishable if you know what to look for.\n\nThe legitimate reasons: a larger pack, because manufacturing cost per milligram falls with scale; a bundle, which is the same effect concentrated; a promotional price on a new listing, which is real but temporary and will not survive the next sweep; and a lower vendor overhead, such as a supplier operating from a single site without paid support staff. None of these implies poor material, and a per-mg ranking is exactly the tool for spotting them.\n\nThe illegitimate reason is material that has not been tested, or has been tested once and is sold indefinitely on the strength of that single certificate. This is where the price gap gets wide. Commissioning an HPLC purity run with a mass-spec identity confirmation from a named laboratory costs a fixed amount per batch, so a supplier selling a handful of vials a month at the market floor cannot absorb that cost on every batch and still be the cheapest. When you see a price that undercuts the rest of the market by a wide margin, the question to ask is not \"how is it so cheap\" but \"what was skipped\".\n\nA third pattern is worth flagging because it looks like a bargain and is not. Some vendors list a dual-agonist product alongside retatrutide or tirzepatide under similar naming. Those are different molecules with different receptor profiles — mazdutide is a GLP-1 and glucagon dual agonist, retatrutide adds GIP receptor activity, and tirzepatide pairs GLP-1 with GIP. Comparing them per milligram is comparing two products, and the cheaper number does not tell you which of them you should want.",
      },
      {
        title: "The Pack Sizes You Will Actually See",
        body: "Mazdutide pack sizes in the UK cluster around two formats with a thin tail. Knowing the pattern makes a price table readable at a glance.\n\nThe 10mg lyophilised vial is the standard article and the clear majority of listings. It is the size most suppliers stock, the size most often certified, and the size against which everything else should be judged. The 5mg vial appears with a minority of suppliers and almost always costs more per milligram, which is expected and not a red flag — a 5mg vial uses the same glass, stopper, label and testing as a 10mg vial for half the material. Where one supplier publishes both, the two figures form a useful internal check on whether their own pricing scales sensibly.\n\nAbove these, multi-vial bundles appear occasionally and are where the lowest per-milligram figures in our data can appear. That is arithmetically correct rather than a marketing trick: the supplier amortises one testing run across more material. The trade-off is commitment — a bundle is a lot of peptide to hold, and lyophilised powder has a shelf life and a storage requirement. Buying several vials to save a percentage per milligram is a good trade only if your work will consume them inside their stability window.\n\nUnlike PT-141 or semaglutide, mazdutide has no significant nasal or pen presentation in the UK research market we track, so there is less risk of comparing a device against a vial. The comparison problem here is almost entirely about milligram figures and pack counts.",
        table: {
          header: ["Pack format", "Typical position in the market", "Comparable per mg?"],
          rows: [
            ["10mg lyophilised vial", "The default article — most listings, most certifications", "Yes"],
            ["5mg lyophilised vial", "Minority of suppliers; higher cost per mg, same overhead per vial", "Yes"],
            ["Multi-vial bundle", "Occasional; can be the lowest cost per mg; larger commitment", "Yes (total mg)"],
            ["Listing with no mg figure", "Real but uncomparable; sorted to the bottom of the table", "No"],
          ],
        },
      },
      {
        title: "Cheapest Is Not the Same as Safest to Buy From",
        body: "Once you have the per-mg ranking, the next question is whether the cheapest row is a supplier you would actually order from, and that is a separate test with a separate answer.\n\nThe checks that matter, in order: a Certificate of Analysis from a named laboratory that references the specific batch, not a generic document; a contact route that replies before you have paid; research-use-only language throughout, with no weight-management or dosing claims anywhere on the site; and a business identity you can find. A supplier failing the first of those is failing the only check that speaks to what is inside the vial. Everything else is about what happens if something goes wrong.\n\nThis is also where the cheapest listing often loses. A per-milligram saving of a few percent, set against a supplier who cannot produce a batch-linked certificate, is not a saving; it is a discount on the only assurance you were buying. Our recommendation when the two conflict is consistent: take the cheapest listing among suppliers who pass verification, not the cheapest listing overall. The difference is usually small, and it is the difference between a price and a price with a certificate behind it.\n\nFor a fuller treatment of what each of those checks catches in practice, the [mazdutide UK supplier guide](/compound-guides/mazdutide-uk-supplier) walks through the verification process we run on every listing we track.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest mazdutide per mg in the UK?",
        answer:
          "The per-mg leaderboard on this page is computed from live supplier prices each time it renders, so the cheapest figure changes as listings are updated. The pattern is stable: 10mg vials and multi-vial bundles beat 5mg vials on cost per milligram, and listings with no milligram figure cannot be compared on that basis at all.",
      },
      {
        question: "Why is mazdutide sold so much cheaper by some UK suppliers?",
        answer:
          "Legitimate reasons are larger packs, bundles, temporary promotions and lower vendor overheads. The illegitimate reason is skipped per-batch testing, which has a fixed cost regardless of batch size and cannot be absorbed on material sold at the very bottom of the market. A price that undercuts the market widely is worth interrogating rather than celebrating.",
      },
      {
        question: "Should I buy a 5mg or a 10mg mazdutide vial?",
        answer:
          "A 10mg vial is usually cheaper per milligram because the glassware, labelling and per-batch testing cost the same as for a 5mg vial. A 5mg vial makes sense only where your work needs a smaller quantity and would otherwise leave material unused past its stability window under correct lyophilised storage.",
      },
      {
        question: "Does the cheapest mazdutide listing include a Certificate of Analysis?",
        answer:
          "Not reliably. Per-batch third-party testing is a fixed cost, so the listings priced at the absolute floor of the market are the least likely to carry a batch-linked certificate. Always check before ordering — a marginal saving against an untested vial is not a saving.",
      },
      {
        question: "Is mazdutide the same as retatrutide or tirzepatide?",
        answer:
          "No. Mazdutide is a GLP-1 and glucagon receptor dual agonist. Tirzepatide pairs GLP-1 with GIP receptor activity and retatrutide adds GIP and glucagon to GLP-1. They are different molecules with different receptor profiles and are not interchangeable in a comparison or an experiment.",
      },
    ],
    sources: [
      {
        label:
          "A phase 2 randomised controlled trial of mazdutide in Chinese overweight adults or adults with obesity (Nat Commun, 2023;14:8289) — PMID 38092790",
        url: "https://pubmed.ncbi.nlm.nih.gov/38092790/",
      },
      {
        label:
          "Efficacy and Safety of the Dual GLP-1 and Glucagon Receptor Agonist Mazdutide: A Systematic Review and Meta-Analysis (Diabetes Obes Metab, 2026;28(10):8777-8794) — PMID 42410325",
        url: "https://pubmed.ncbi.nlm.nih.gov/42410325/",
      },
      MAZ_FIRST_APPROVAL,
      MAZ_PUBCHEM,
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest Mazdutide UK — Ranked by Cost Per mg",
    rowLimit: 12,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "mazdutide-price-comparison-uk",
    title: "Mazdutide Price Comparison UK: Every UK Supplier, Live Today",
    description:
      "Mazdutide price comparison UK — every UK research supplier in one live table, with pack size, cost per mg, stock status and a direct link to each listing page.",
    h1: "Mazdutide Price Comparison UK",
    focusKeyword: "mazdutide price comparison uk",
    intro: [
      "A mazdutide price comparison UK buyers can actually use has to do one thing most comparison pages do not: show the whole market at once, including the listings that are inconvenient. Mazdutide is stocked by a smaller set of UK research suppliers than the older GLP-1 compounds, the prices span roughly fourfold across pack sizes, and a minority of listings state a price without stating a quantity. A comparison that quietly drops those rows is not a comparison; it is a filtered view that flatters whoever assembles it.",
      "This page is the full table. Every mazdutide listing from every UK supplier ViralPeps tracks, sorted by cost per milligram where a milligram figure exists and shown with an explicit dash where it does not, alongside the pack label, the headline price, stock status and a direct link to the supplier's own product page. Nothing is hardcoded: the rows are computed at build time from the same price data that feeds the [mazdutide hub](/compounds/mazdutide), so the table and the hub cannot drift apart.",
      "The compound being compared is mazdutide, a dual agonist at the GLP-1 and glucagon receptors with the molecular formula C207H317N45O65 and a molecular weight of 4476 g/mol as listed in PubChem. It is sold in the UK as a research reagent, and separately exists as an approved medicine in China that is not available through any of these listings. That distinction is the most important thing a price table can make clear, because the two appear in the same search results as though they were the same purchase at different prices.",
      "All prices shown are the suppliers' own listed prices at the most recent sweep, and all listings are research-use-only reagents intended for laboratory work. Nothing on this page is medical advice, and a lower price here does not indicate a suitable or licensed product for any human purpose.",
    ],
    sections: [
      {
        title: "How to Read This Mazdutide Price Comparison",
        body: "The table is sorted by cost per milligram, which is the only ordering that remains meaningful across 5mg vials, 10mg vials and bundles. Each row carries several pieces of information and each one exists because of a specific way a headline price can mislead.\n\nThe pack label tells you what the price buys. Where the label describes a bundle the cost per milligram is computed across the total material, not the contents of a single vial, so a bundle is not disadvantaged by being a bundle. Where the label is missing, the row is not assigned a guess; it keeps its price, shows a dash in the per-mg column and sorts to the bottom. That is deliberate. An invented quantity is worse than an acknowledged gap, because it makes an uncomparable listing look comparable.\n\nStock status matters because a competitive price on a permanently out-of-stock item is not a price you can act on. We record it alongside the price and leave the row in place, since removing it would understate the market, but a buyer scanning the top rows should note which are actually orderable today. The direct link takes you to the supplier's own product page, not to a wrapper of ours, so what you see is their listing as they published it.\n\nThe supplier count is the number of distinct vendors represented by the rows, not the number of rows. One vendor with two pack sizes contributes two rows and one supplier, and conflating the two is the easiest way to inflate a comparison.",
      },
      {
        title: "What Drives the Spread Between Suppliers",
        body: "Four things explain almost all of the price difference between mazdutide listings, and only one of them is about the peptide.\n\nThe first is pack size, discussed above. The second is vendor overhead: UK-based warehousing, staffed support, and a per-batch testing programme all cost money that a drop-shipper does not spend. The third is the certificate. A supplier commissioning HPLC purity plus mass-spec identity confirmation for every batch is paying a fixed cost that must be recovered somewhere, and it shows up in the price. The fourth is positioning: a supplier who publishes clinical-sounding copy about weight management is often pricing to a consumer audience rather than a laboratory one, and that audience tolerates a higher price.\n\nNotably absent from that list is the molecule. Mazdutide in a vial from one supplier is the same sequence as mazdutide from another, assuming both are what they say they are. The price spread therefore cannot be read as a quality gradient. It is a spread in overheads and documentation, and the only way to tell which is which is to check what each supplier publishes.\n\nThat is also why the cheapest row is rarely the best row and the most expensive is rarely the best either. The useful question is which supplier can show you a batch-linked certificate at a price near the bottom of the range, and that is a narrow band in most compounds we track.",
      },
      {
        title: "Reading a Mazdutide Certificate Against the Compound",
        body: "A certificate is only useful if you check it against the compound it claims to describe. For mazdutide there are three figures that should agree, and a certificate where they do not is a stop signal rather than a detail to note.\n\nPubChem lists mazdutide as CID 167312357 with the formula C207H317N45O65 and a molecular weight of 4476 g/mol. A certificate for mazdutide reporting a mass-spectrometry result should be consistent with a molecule of that size. A certificate quoting a figure typical of a small GLP-1 analogue is describing something else, and a certificate quoting no mass figure at all is only doing half the job — purity by HPLC tells you what proportion of the chromatogram is the main peak, not that the main peak is mazdutide. Identity confirmation by mass spectrometry is the part that answers the second question.\n\nThe batch number is the third figure. It should appear on the certificate and it should match the batch on the vial you receive. A certificate with no batch reference cannot be tied to any particular vial, which means it cannot tell you anything about the material in your hands, however good the chromatography looks.\n\nOne further point applies across this market. Several suppliers list mazdutide alongside other dual agonists, and certificates occasionally get attached to the wrong product page. If the compound name on the certificate does not match the listing, that is not a typographical error worth ignoring — it means the document was not checked before publication, and it tells you something about how the rest of the page was assembled.",
      },
      {
        title: "Why Live Prices Beat Published Price Lists",
        body: "Peptide prices in the UK move more than most retail pricing, for three reasons that are structural to the market rather than seasonal.\n\nFirst, stock is irregular. A supplier who restocks a popular compound may reprice it the same week; one who has sold out of 5mg and restocked only 10mg removes a row from the comparison entirely. Second, the market is small and competitive enough that suppliers watch each other; a single move on a widely-stocked compound tends to be matched within a short window. Third, and most relevant here, several suppliers run temporary promotions on newer compounds to build search visibility, which appear and disappear between checks.\n\nA published price list in a blog post is therefore out of date the moment it is indexed. That is why this page computes its table from the tracker at build time and refreshes hourly rather than transcribing figures into prose. The prose here is about how to read the market; the numbers live in the table, and they are the suppliers' numbers rather than ours.",
      },
    ],
    faq: [
      {
        question: "How much does mazdutide cost in the UK?",
        answer:
          "The live table on this page shows every current listing with its headline price and cost per milligram, computed from supplier data at build time. Prices move as suppliers restock and reprice, so the table rather than any figure quoted in prose is the authoritative view.",
      },
      {
        question: "Why is there such a spread in mazdutide prices?",
        answer:
          "Pack size explains most of it: a 5mg vial costs nearly as much to make, fill, label and test as a 10mg vial. The rest is vendor overhead and documentation — warehousing, support and per-batch third-party testing all cost money that a drop-shipper does not spend.",
      },
      {
        question: "Does ViralPeps sell mazdutide?",
        answer:
          "No. ViralPeps is a price comparison site. We do not stock, sell or ship any compound, and we take no responsibility for any order placed with a supplier listed here. Every price links out to the supplier's own product page.",
      },
      {
        question: "Are all these mazdutide listings the same product?",
        answer:
          "They are all offered as mazdutide, the GLP-1 and glucagon receptor dual agonist, but they differ in pack size, pack count and documentation. Whether a given vial contains what its label claims is exactly what the certificate of analysis is for, and it is the only artefact that speaks to the contents.",
      },
      {
        question: "How often is this comparison updated?",
        answer:
          "The price data is refreshed on a recurring scrape and the page revalidates hourly, so the table reflects the suppliers' listing pages at their most recent check rather than at the time this text was written.",
      },
    ],
    sources: [
      MAZ_PUBCHEM,
      {
        label:
          "Mazdutide versus placebo in Chinese adults with type 2 diabetes — DREAMS-1 (Nature, 2026;652(8108):174-180) — PMID 41407859",
        url: "https://pubmed.ncbi.nlm.nih.gov/41407859/",
      },
      {
        label:
          "Mazdutide versus dulaglutide in Chinese adults with type 2 diabetes — DREAMS-2 (Nature, 2026;652(8108):181-188) — PMID 41407860",
        url: "https://pubmed.ncbi.nlm.nih.gov/41407860/",
      },
      MAZ_FIRST_APPROVAL,
    ],
    tableMode: "full",
    tableHeading: "Mazdutide UK — Full Price Comparison",
    rowLimit: 0,
  },
  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-mazdutide-online-uk",
    title: "Buy Mazdutide Online UK: Ordering and Delivery Guide for 2026",
    description:
      "Buy mazdutide online UK — how ordering actually works with UK research suppliers, what payment and delivery to expect, and the checks to run before you pay.",
    h1: "Buy Mazdutide Online UK",
    focusKeyword: "buy mazdutide online uk",
    intro: [
      "To buy mazdutide online UK buyers are usually making two decisions at once, and only one of them is about price. The first is which supplier, which is a verification question. The second is what actually happens between paying and receiving a vial, which is a logistics question, and it is the one that produces most of the complaints in this market. Payment clears, a dispatch email arrives, and then the tracking stalls — or the parcel arrives with no cold pack, or with a label that names nothing recognisable, or not at all.",
      "This page is about that second decision. It covers how ordering from a UK research supplier actually works, what payment methods are genuinely available rather than promised, what delivery looks like for a lyophilised peptide, and the checks worth running before you hand over card details rather than after. The live table below shows current mazdutide listings with a direct link to each supplier's own product page so you can see their terms yourself rather than taking a summary's word for it.",
      "One point needs stating plainly at the top, because it is the thing most pages in this search results set avoid. Mazdutide has a licensed identity in China, where it was approved in June 2025 for long-term weight management and in September 2025 for glycaemic control in type 2 diabetes. It is not licensed in the UK. The vials sold by the suppliers on this page are research reagents sold under research-use-only terms for laboratory work, and they are not the approved medicine, not pharmacy stock, and not authorised for human use. Nothing on this page is medical advice or purchasing guidance for human consumption.",
      "If you already know which supplier you want and are checking the price, the [mazdutide price comparison](/compound-guides/mazdutide-price-comparison-uk) is the shorter route. This page is for the part before that.",
    ],
    sections: [
      {
        title: "What Happens Between Paying and Receiving a Vial",
        body: "The order flow at a UK research supplier is usually short and largely automated, which is worth understanding because the automation is where problems appear.\n\nYou place an order, a payment processor authorises the card, and a picking note is generated. The vial is packed from stock, usually with a desiccant and often with a cold pack depending on the supplier and the season, and a label is applied. Then it enters a courier network — Royal Mail Tracked 24 is common, as are next-day courier services for higher-value orders — and the tracking number is emailed. Most UK suppliers advertising \"same-day dispatch\" mean dispatch before a stated cut-off on a working day, not same-day delivery, and the distinction is frequently blurred in marketing copy.\n\nThe failure points are consistent across the market. Cut-off times advertised as later than the courier actually collects. Cold packs that are adequate in winter and not in a heatwave. Discreet packaging that is so anonymous the parcel cannot be identified if it is held. And dispatch confirmations generated automatically when a label is printed, regardless of whether the material is in stock — which produces the specific frustration of a tracking number that never moves.\n\nThe practical defence is to place a small first order and watch what actually happens before committing to a larger one. A supplier's dispatch and support behaviour on a £60 order tells you what to expect on a larger one, and it is a cheaper experiment than the alternative.",
      },
      {
        title: "Payment Methods and What They Tell You",
        body: "Payment method is a proxy for how much of a real business sits behind a storefront, so it is worth reading rather than just clicking through.\n\nCard payment through a mainstream processor is the strongest signal, because those accounts carry chargeback exposure and require a registered business identity to obtain. A supplier offering card payment through a recognised processor has, by definition, passed a basic identity and risk check. PayPal carries similar weight for the same reason. Bank transfer and cryptocurrency are cheaper for the merchant and offer the buyer almost no recourse — if a bank transfer goes to a supplier who then stops replying, there is no chargeback and very little practical remedy.\n\nNone of this is a reason to refuse a supplier who only takes bank transfer, but it is a reason to run the other checks harder. A supplier who is unverified, publishes no batch-linked certificate, and accepts only bank transfer is asking you to extend three forms of trust at once with nothing behind them. Conversely, a supplier who publishes certificates and offers card payment is giving you documentation and a dispute route, which is the combination worth paying a little more for.\n\nOne specific caution applies to this market. Research-use-only suppliers frequently use payment descriptions that do not obviously name the storefront, sometimes deliberately for discretion. Check that the name on your statement matches the supplier before you assume a charge is fraudulent — and confirm it in their terms before ordering so you are not surprised.",
      },
      {
        title: "Delivery, Packaging and the Stability Question",
        body: "Lyophilised mazdutide is a freeze-dried powder, which is the more stable form of the peptide and the reason it is the standard article in this market. Stability is not the same as indestructibility, and the things that degrade it are heat, moisture and light.\n\nThat has practical consequences for delivery. A vial travelling by tracked courier inside the UK for a day or two in temperate weather is not an obvious risk. A vial sitting in a sorting depot over a summer weekend, or shipped internationally in July, is. Suppliers who ship with a cold pack and who state a policy for resending heat-affected material are demonstrating that they have thought about the problem; suppliers who ship bare in a padded envelope may still be fine, but they have no story about what happens if they are not.\n\nOn arrival, the checks are simple and worth doing immediately rather than later. The vial should be intact with a secure crimp and no visible cracks. The powder should be a lyophilised cake or plug, not a melted mess at the bottom — a collapsed cake is a sign it got hot. The label should name the compound, the quantity and, ideally, a batch number that matches a certificate you can look up. Photograph the vial and label on arrival, before opening, because a dispute about condition six weeks later is much harder to resolve without it.\n\nStorage for mazdutide follows the standard convention for lyophilised peptides: desiccated, protected from light, and refrigerated or frozen for anything beyond short-term holding. A dedicated peptide storage guide covers the detail; the delivery-relevant point is that the storage window starts when it lands, not when you open it.",
      },
      {
        title: "The Checks to Run Before You Pay",
        body: "Ordering a research peptide online is a small transaction with an asymmetric risk profile: the amount at stake is modest, but what you are actually buying is the assurance that the powder is what the label says. These are the checks that address that, in the order they are worth doing.\n\nFind the certificate of analysis and confirm three things: it comes from a named laboratory that is not the supplier's own brand, it references a batch number, and the stated molecular weight is consistent with mazdutide rather than a smaller GLP-1 analogue. PubChem lists mazdutide as CID 167312357 with formula C207H317N45O65 and a molecular weight of 4476 g/mol, so a certificate quoting a figure in the low thousands is describing something else.\n\nSend an email with a real question before ordering. A substantive reply within a working day is the strongest single indicator that a supplier is a functioning business rather than a storefront with an inbox attached. This is also the moment to ask which batch you would receive and whether a certificate for that batch exists.\n\nRead the site for claims. A research supplier should describe the compound in laboratory terms. Weight-management claims, dosing guidance, patient testimonials and before-and-after framing are all signals that the site is aimed at consumers rather than laboratories, and in this market those are the sites least likely to publish batch documentation.\n\nFinally, check the domain. The TrustScore badge we display is not awarded by us — a supplier installs it on their own site, which proves they control that domain. That single check eliminates the throwaway storefronts that appear and vanish, which is the failure mode with no remedy at all.",
      },
    ],
    faq: [
      {
        question: "Can I buy mazdutide online in the UK?",
        answer:
          "Mazdutide is sold online in the UK by research-chemical suppliers as a laboratory reagent under research-use-only terms. It is not licensed for human use in the UK and is not available as a medicine. ViralPeps compares listings and links out to suppliers; it does not sell the compound.",
      },
      {
        question: "How long does UK delivery of mazdutide take?",
        answer:
          "Most UK suppliers dispatch by tracked next-day or 24-hour service on working days, with a stated cut-off. Delivery terms are set by each supplier and change, so check the current terms on the supplier's own product page rather than relying on a summary.",
      },
      {
        question: "What payment methods do UK peptide suppliers accept?",
        answer:
          "Commonly card payments through a mainstream processor, sometimes PayPal, and frequently bank transfer or cryptocurrency. Card and PayPal offer the buyer a dispute route; bank transfer and crypto generally do not. Payment options are a useful signal of how established a supplier is.",
      },
      {
        question: "How should mazdutide be stored on arrival?",
        answer:
          "Lyophilised mazdutide should be kept desiccated, protected from light, and refrigerated or frozen beyond short-term holding. Check the vial on arrival for an intact crimp and an uncollapsed powder cake, since a melted cake indicates heat exposure in transit.",
      },
      {
        question: "What should I do if a mazdutide order does not arrive?",
        answer:
          "Contact the supplier first through their stated support route and keep the correspondence. If you paid by card or PayPal, those channels have dispute processes. Bank transfers and cryptocurrency have very little practical recourse, which is the main reason to weigh payment method before ordering rather than afterwards.",
      },
    ],
    sources: [
      {
        label:
          "Mazdutide reduces body weight in adults with overweight or obesity: a high-dose phase 1 trial (Diabetes Obes Metab, 2025;27(11):6460-6469) — PMID 40832785",
        url: "https://pubmed.ncbi.nlm.nih.gov/40832785/",
      },
      {
        label:
          "Safety and efficacy of mazdutide (IBI362) 9mg and 10mg: a phase 1b trial (EClinicalMedicine, 2022;54:101691) — PMID 36247927",
        url: "https://pubmed.ncbi.nlm.nih.gov/36247927/",
      },
      MAZ_FIRST_APPROVAL,
      MAZ_PUBCHEM,
    ],
    tableMode: "price",
    tableHeading: "Buy Mazdutide Online UK — Current Listings",
    rowLimit: 12,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "mazdutide-uk-supplier",
    title: "Mazdutide UK Supplier: How to Verify One Before Ordering Today",
    description:
      "Mazdutide UK supplier — which suppliers actually stock it, the four verification signals that matter, and how to check a certificate against that molecule.",
    h1: "Mazdutide UK Supplier",
    focusKeyword: "mazdutide uk supplier",
    intro: [
      "Choosing a mazdutide UK supplier is a verification exercise, not a shopping one. The compound is the same molecule wherever it is sold, assuming it is what the label claims; what differs between suppliers is whether they can demonstrate that, and whether there is a functioning business behind the storefront if something goes wrong. That is the whole of the decision, and it is the part most buyers skip because price is easier to compare than documentation.",
      "This page sets out the verification process we run on every mazdutide listing we track, in the order that makes sense. It is deliberately specific about what each check catches, because a checklist that says \"check the COA\" without saying what a bad one looks like is not much use. The live table at the bottom ranks suppliers by TrustScore rather than price, which is the ordering that reflects who documents their product rather than who sells it cheapest.",
      "Some context on the compound matters here. Mazdutide is a dual agonist at the GLP-1 and glucagon receptors, developed by Innovent Biologics with Eli Lilly, and it holds two approvals in China — one from June 2025 for long-term weight management and one from September 2025 for glycaemic control in type 2 diabetes. It is not licensed in the UK. A supplier who understands that distinction will describe a research reagent in laboratory terms; a supplier who markets to consumers will borrow the clinical language and skip the certificates, and that difference is readable from the site.",
      "Everything on this page is research-use-only. These are laboratory reagents, not medicines, and nothing here is medical advice.",
    ],
    sections: [
      {
        title: "The Four Signals That Actually Predict a Good Supplier",
        body: "Supplier verification online tends to drown in checklists. In practice, four signals carry almost all of the predictive weight, and the rest is supporting detail.\n\nThe first is the certificate of analysis. It should come from a named third-party laboratory, not the supplier's own brand, and it should reference a specific batch number. A certificate failing either of those tests cannot tell you anything about the vial you receive: a generic document proves only that some material was tested at some point. This is the only signal that speaks to what is inside the vial, which is why it comes first.\n\nThe second is responsiveness. Email a real question — which batch is shipping, what the certificate says, what the storage recommendation is — before you order. A substantive reply within a working day is worth more than any badge. It tells you a human is present, and that the address works, which is not a given.\n\nThe third is compliance posture. Research-use-only labelling on the product page, the checkout and the packaging, with no weight-management claims, no dosing guidance and no consumer-oriented marketing. A supplier serving laboratories does not need to explain what a peptide does to a body.\n\nThe fourth is domain control, which is what the TrustScore badge verifies. A supplier installs it on their own site, which proves they operate that domain. That eliminates the throwaway storefront that appears, collects orders and vanishes — the failure mode with no remedy.\n\nEverything else — site polish, review counts, social presence, a slick checkout — is easy to fake and weakly correlated with the things that matter.",
        list: [
          "Certificate of analysis from a named laboratory, referencing a specific batch number.",
          "A substantive email reply within a working day, tested before ordering.",
          "Research-use-only labelling throughout, with no consumer or weight-management marketing.",
          "Confirmed domain ownership via the TrustScore badge.",
          "A stated pack size in milligrams, so the listing can be compared honestly.",
          "A payment method that gives the buyer a dispute route — card or PayPal rather than transfer only.",
        ],
      },
      {
        title: "Reading a Mazdutide Certificate Against the Compound",
        body: "A certificate is only worth checking if you know what a correct one looks like for this specific molecule, and mazdutide has a distinctive profile that makes mismatches visible.\n\nPubChem lists mazdutide as CID 167312357, formula C207H317N45O65, molecular weight 4476 g/mol, with synonyms including IBI362 and LY3305677. It is a large peptide. A certificate reporting a mass-spectrometry identity result should be consistent with a molecule of that size. If the mass figure on a \"mazdutide\" certificate looks like a small GLP-1 analogue, the document is describing a different compound — and in a market where suppliers stock several dual agonists, certificates do occasionally get attached to the wrong product page.\n\nPurity and identity answer different questions and a certificate needs both. HPLC purity tells you what proportion of the chromatogram is accounted for by the main peak; it does not tell you that the main peak is mazdutide. A sample that is 99% pure something else reports 99% purity. Mass spectrometry is what addresses identity, and a certificate without it is only half a document.\n\nThe batch number is what ties the document to your vial. If the certificate has no batch reference, it cannot be matched to anything you receive. If it has one, it should match the batch printed on the vial — check on arrival, not later.\n\nFinally, the date. A certificate is a point-in-time test of a specific batch. A supplier shipping material against a certificate older than the batch could plausibly be is worth asking about, and a supplier who cannot tell you which batch is currently shipping has not thought about the question.",
      },
      {
        title: "Who Stocks Mazdutide in the UK",
        body: "The UK mazdutide market is smaller than the market for the older GLP-1 compounds, and smaller again than PT-141's. A modest number of UK research suppliers list it, most in a single 10mg format, at least one in both 5mg and 10mg, with the occasional bundle.\n\nThat thinness has an upside and a downside for a buyer. The upside is that the comparison is short enough to do properly — you can verify every listing in an afternoon rather than triaging twenty. The downside is that thin markets are easier for a bad actor to enter, because there are fewer legitimate listings to be compared against and less accumulated community knowledge about which suppliers are reliable.\n\nIt also means stock is less predictable. A supplier who lists a compound that only a handful of their customers buy may restock rarely and may not hold depth, which is why some listings on our table show as out of stock. That is not a criticism of the supplier; it is a fact about a newish compound in a small market, and it is the reason a live table showing stock status is more useful than a static list of who sells what.\n\nWhere a supplier stocks both 5mg and 10mg, that is mildly reassuring — it suggests a real purchasing relationship rather than a single opportunistic line item. Where a supplier stocks mazdutide alongside a broad catalogue of unrelated compounds at uniform prices, ask harder questions about how each is tested.",
      },
      {
        title: "Red Flags Specific to This Market",
        body: "Some signals are generic to online retail and some are specific to research peptides in general. A few are specific to mazdutide and to the dual-agonist category, and those are worth naming.\n\nThe most common is clinical borrowing. Mazdutide has an unusually strong literature for a compound at this stage — a Nature Communications phase 2, GLORY-1 in the New England Journal of Medicine, GLORY-2 in JAMA, and two phase 3 diabetes trials in Nature. That literature is a legitimate thing to cite when describing the compound's research background. It is not legitimate to present trial outcomes as product specifications, and a supplier whose marketing implies their vial delivers the trial results is misrepresenting both the trial and the vial.\n\nA second is category blur. Mazdutide is frequently listed next to retatrutide, tirzepatide and semaglutide as if they were interchangeable variants of the same product. They are different molecules with different receptor profiles — mazdutide pairs GLP-1 with glucagon, tirzepatide pairs GLP-1 with GIP, retatrutide adds both GIP and glucagon. A supplier who does not distinguish them clearly is not paying close attention to what they are shipping.\n\nA third is the missing quantity. A listing that names a compound and a price but never states a milligram figure is not necessarily dishonest — the field may simply be unpopulated — but it means the listing cannot be compared or checked, and our table renders it as a dash rather than guessing.\n\nA fourth, and the one with the worst consequences, is a supplier whose only payment route is bank transfer or cryptocurrency, who publishes no batch-linked certificate, and whose domain is new. Each of those is survivable on its own. Together they describe a business with no verifiable presence, and there is no recovery route if it goes wrong.",
      },
    ],
    faq: [
      {
        question: "Which UK suppliers stock mazdutide?",
        answer:
          "A small number of UK research-chemical suppliers list mazdutide, most commonly as a 10mg lyophilised vial with some offering 5mg. The live table on this page shows every supplier we currently track along with their verification state and TrustScore, ranked by TrustScore rather than price.",
      },
      {
        question: "How do I verify a mazdutide supplier?",
        answer:
          "Four checks carry most of the weight: a certificate of analysis from a named laboratory with a batch number; a substantive reply to an email sent before ordering; research-use-only labelling throughout with no consumer marketing; and confirmed domain ownership via the TrustScore badge.",
      },
      {
        question: "What should a mazdutide certificate of analysis contain?",
        answer:
          "A named testing laboratory, a specific batch number, an HPLC purity figure, and an identity confirmation by mass spectrometry consistent with mazdutide's molecular weight of 4476 g/mol as listed in PubChem. A certificate with purity but no identity data does not confirm the compound.",
      },
      {
        question: "Are UK mazdutide suppliers selling an approved medicine?",
        answer:
          "No. Mazdutide holds approvals in China but is not licensed in the UK. UK research suppliers sell it as a laboratory reagent under research-use-only terms. It is not pharmacy stock and is not authorised for human use in the UK.",
      },
      {
        question: "Why do some suppliers show mazdutide as out of stock?",
        answer:
          "Mazdutide is stocked by fewer UK suppliers and in less depth than the older GLP-1 compounds, so restocking is less frequent. Our table records stock status rather than dropping the row, so you can see the full market and which listings are orderable today.",
      },
    ],
    sources: [
      MAZ_FIRST_APPROVAL,
      {
        label:
          "Efficacy and safety of mazdutide in adults with obesity or overweight: a US-based phase 2 randomised controlled trial (Lancet Diabetes Endocrinol, 2026;14(11):879-893) — PMID 42628555",
        url: "https://pubmed.ncbi.nlm.nih.gov/42628555/",
      },
      {
        label:
          "Efficacy and Safety of Mazdutide in Chinese Patients With Type 2 Diabetes: a phase 2 trial (Diabetes Care, 2024;47(1):160-168) — PMID 37943529",
        url: "https://pubmed.ncbi.nlm.nih.gov/37943529/",
      },
      MAZ_PUBCHEM,
    ],
    tableMode: "trust",
    tableHeading: "Mazdutide UK Suppliers — Ranked by TrustScore",
    rowLimit: 15,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-mazdutide-peptide",
    title: "Best Mazdutide Peptide UK: Ranked by TrustScore Guide 2026 Now",
    description:
      "Best mazdutide peptide — ranked by independent TrustScore, documentation and price, plus what the published trial data does and does not tell you about it.",
    h1: "Best Mazdutide Peptide",
    focusKeyword: "best mazdutide peptide",
    intro: [
      "The best mazdutide peptide is not a single product, because every supplier on this page is selling the same molecule. What differs is the documentation behind the vial, the reliability of the seller, and the price per milligram — and those are the only three things a ranking can honestly compare. Any page that ranks mazdutide listings by anything else is ranking marketing.",
      "This page ranks by TrustScore, which is computed from observable signals on each supplier's own site: whether the domain is live, whether a certificate of analysis is published, whether research-use-only language is present, whether there is a working review and contact route, whether shipping terms are stated. It is a measure of how a supplier presents and documents itself, not of the contents of any vial. We are explicit about that because the distinction matters — a high TrustScore means a supplier is verifiable, not that their powder is good. The certificate is the only artefact that speaks to the material.",
      "It is worth being clear about what mazdutide is before ranking anyone who sells it. It is a once-weekly dual agonist at the GLP-1 and glucagon receptors, developed by Innovent Biologics with Eli Lilly under the codes IBI362 and LY3305677. Its clinical programme is genuinely extensive for a compound at this stage: a phase 1b dose-escalation study, a phase 2 trial in Nature Communications, GLORY-1 in the New England Journal of Medicine, GLORY-2 in JAMA, and two phase 3 type 2 diabetes trials in Nature, with a first approval in China in June 2025 and a second in September 2025. None of that makes a research vial a medicine, and the suppliers on this page are selling laboratory reagents under research-use-only terms.",
      "All listings compared here are research-use-only reagents for laboratory work. Nothing on this page is medical advice, and no ranking here should be read as an endorsement of human use.",
    ],
    sections: [
      {
        title: "How This Ranking Is Built",
        body: "TrustScore is a weighted count of observable signals, and the weights reflect how much each one tells you about whether a supplier is a real, verifiable business.\n\nThe largest weight goes to a published certificate of analysis, because it is the only signal that speaks to the material rather than to the website. Next come the presence of a working contact route and a stated research-use-only position, then a claimed review mechanism, stated shipping terms and a live domain with a real title. A supplier who installs the badge on their own site is proving domain control, which is how the check is verified rather than asserted.\n\nWhat the score deliberately does not measure: price, because cheap and verifiable are independent; site design, because it is trivially purchased; volume of reviews, because it is trivially inflated; and stock depth, because it changes weekly. Those are visible in the table as separate columns where they exist, which is the honest way to present them.\n\nThe ranking is therefore a starting order for verification rather than a conclusion. The top row is the supplier whose documentation is easiest to check, not the one you should necessarily buy from. In practice the useful move is to take the top three or four rows, open their certificates, and pick the cheapest among those whose certificates actually reference a batch.",
      },
      {
        title: "What the Published Data Does and Does Not Tell You",
        body: "Mazdutide's literature is strong enough that it is frequently misused, so it is worth stating precisely what it establishes and where the boundary sits.\n\nThe phase 2 trial published in Nature Communications randomised 248 Chinese adults with overweight or obesity to 3mg, 4.5mg, 6mg or placebo for 24 weeks and reported mean body-weight change of -6.7%, -10.4%, -11.3% and +1.0% respectively, with all doses well tolerated and the most common adverse events being diarrhoea, nausea and upper respiratory tract infection. The phase 1b study reported -11.7% at week 12 in the 9mg cohort against -1.8% for placebo. GLORY-1 reported once-weekly mazdutide in Chinese adults with obesity or overweight in the New England Journal of Medicine, and GLORY-2 examined the 9mg dose in JAMA. The two DREAMS phase 3 trials in Nature compared mazdutide against placebo and against dulaglutide in type 2 diabetes.\n\nWhat that establishes is that a specific formulation of mazdutide, manufactured to pharmaceutical standards, administered subcutaneously under clinical supervision to a defined population, produced measurable effects and a defined safety profile. That is a statement about a medicine.\n\nWhat it does not establish is anything at all about a research vial. The vial has a different manufacturer, a different manufacturing standard, no guarantee of dose accuracy, no sterility assurance for injection, and no clinical oversight. Trial results are published about a licensed product; they are not specifications for an unapproved one, and the gap between the two is not a technicality. A supplier who elides that gap in their marketing is the clearest available signal about how they treat accuracy.",
      },
      {
        title: "The Criteria That Separate the Top of This Table",
        body: "Among the suppliers who appear here, the differences that matter are narrow and specific. Four criteria do most of the work.\n\nA batch-linked certificate from a named external laboratory. This is the dividing line in the whole market. A supplier who publishes a certificate naming the laboratory, the batch, an HPLC purity figure and a mass-spectrometry identity result has done the thing that costs money and can be checked. Everyone else is asking you to take their word for it.\n\nA certificate whose mass figure is consistent with mazdutide. PubChem lists the compound at CID 167312357 with formula C207H317N45O65 and a molecular weight of 4476 g/mol. Because dual agonists are frequently stocked side by side, certificates occasionally get attached to the wrong product page, and a mass figure that does not fit is the fastest way to catch it.\n\nA stated pack size in milligrams. This is a small thing with a large effect: a listing that names a milligram figure can be compared on cost per milligram and checked on arrival, and one that does not cannot be either. Our table renders the gap rather than filling it in.\n\nA support route that replies. Tested before ordering. This is the criterion most often skipped and the one that determines what happens when something goes wrong, which is precisely when a supplier is least able to fake competence.",
      },
      {
        title: "Is the Best Mazdutide Peptide the Most Expensive One?",
        body: "No, and the correlation is weak enough that price is close to useless as a quality proxy in this market.\n\nA high price on a mazdutide listing can reflect several things: a larger pack, a bundle, a device format, a supplier paying for per-batch testing, or simply a supplier pricing to a consumer audience that is less price-sensitive than a laboratory. Only one of those — the testing — is a quality signal, and you cannot tell which is operating from the price alone.\n\nA low price has the same ambiguity in reverse. It can reflect a genuine efficiency, a promotion, a smaller vendor overhead, or skipped testing. The last is the one that matters and it is invisible in the price.\n\nThe useful approach is to work from the certificate outwards. Find the suppliers publishing batch-linked documentation — there are usually a handful in any compound's UK market — and then take the cheapest among them. That single reframing usually produces a price in the middle of the range, attached to a supplier whose material you can actually check, which is a better outcome than either extreme.\n\nThe practical corollary: do not chase the floor. A few pounds per vial saved against a supplier with no batch-linked certificate is a discount on the only thing you were buying.",
      },
    ],
    faq: [
      {
        question: "What is the best mazdutide peptide in the UK?",
        answer:
          "Every supplier on this page sells the same molecule, so the useful question is which has the best documentation. The ranking here is by TrustScore — published certificates, contact routes, compliance posture and domain control — rather than price.",
      },
      {
        question: "Is the most expensive mazdutide the best?",
        answer:
          "No. A high price can reflect a larger pack, a bundle, extra testing, or simply positioning to a consumer audience. Price correlates weakly with documentation and not at all with the compound. Judge the certificate, not the price point.",
      },
      {
        question: "What purity should a mazdutide certificate report?",
        answer:
          "Research-grade certificates commonly report HPLC purity in the high nineties, but that figure describes the proportion of the chromatogram in the main peak, not the identity of the compound. A useful certificate pairs purity with mass-spectrometry identity confirmation and cites a batch number.",
      },
      {
        question: "Does a high TrustScore mean the mazdutide is good?",
        answer:
          "No. TrustScore measures observable site signals — whether documentation is published, whether a contact route works, whether the domain is verified. It tells you a supplier is verifiable, not that the contents of a vial are what the label claims. The batch-linked certificate is the only artefact that addresses that.",
      },
      {
        question: "How does mazdutide differ from semaglutide and tirzepatide?",
        answer:
          "Mazdutide is a dual agonist at the GLP-1 and glucagon receptors. Semaglutide is GLP-1 selective. Tirzepatide pairs GLP-1 with GIP receptor activity, and retatrutide adds GIP and glucagon to GLP-1. They are different molecules with different receptor profiles and should not be treated as interchangeable.",
      },
    ],
    sources: [
      {
        label:
          "A phase 2 randomised controlled trial of mazdutide in Chinese overweight adults or adults with obesity (Nat Commun, 2023;14:8289) — PMID 38092790",
        url: "https://pubmed.ncbi.nlm.nih.gov/38092790/",
      },
      {
        label:
          "Once-Weekly Mazdutide in Chinese Adults with Obesity or Overweight — GLORY-1 (N Engl J Med, 2025;392(22):2215-2225) — PMID 40421736",
        url: "https://pubmed.ncbi.nlm.nih.gov/40421736/",
      },
      {
        label:
          "Treatment With 9-mg Mazdutide for Weight Reduction in Chinese Adults With Obesity — GLORY-2 (JAMA, 2026;336(5):377-388) — PMID 42251595",
        url: "https://pubmed.ncbi.nlm.nih.gov/42251595/",
      },
      MAZ_FIRST_APPROVAL,
      MAZ_PUBCHEM,
    ],
    tableMode: "trust",
    tableHeading: "Best Mazdutide Peptide — Ranked by TrustScore",
    rowLimit: 15,
  }
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
