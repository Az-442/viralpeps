/**
 * TB-500 silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/tb-500-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — autocomplete evidence pulled live from Google UK (2026-10-12):
 *   1. where to buy tb-500 uk     → real UK hits (`buy tb 500 uk`, `where to buy tb 500`)
 *   2. cheapest tb-500 uk         → 0 UK results — substituted `tb 500 price uk` (exact #1)
 *   3. tb-500 price comparison uk → 0 UK results — substituted `tb 500 peptide uk price` (under `tb 500 peptide uk`)
 *   4. buy tb-500 online uk       → 0 UK results — substituted `buy tb 500 peptide uk` (exact #1)
 *   5. tb-500 uk supplier         → 0 UK results — substituted `tb 500 for sale uk` / `tb 500 buy uk` (exact #1)
 *   6. best tb-500 peptide        → exact match #1
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
    slug: "where-to-buy-tb-500-uk",
    title: "Where to Buy TB-500 UK: Verified Suppliers Compared",
    description:
      "Where to buy TB-500 UK — compare live prices from every verified UK research supplier, then check Certificate of Analysis, stock and shipping before ordering.",
    h1: "Where to Buy TB-500 UK",
    focusKeyword: "where to buy tb-500 uk",
    intro: [
      "Searching for where to buy TB-500 UK puts you into one of the largest supplier pools in the British research-peptide market, and one of the least standardised. TB-500 is the common trade name for a synthetic fragment of thymosin beta-4, a 43-amino-acid actin-binding protein found in almost every human cell. The fragment sold under the TB-500 name corresponds to the actin-binding domain of the parent protein, and it circulates in the research market as a lyophilised powder in 2mg, 5mg and 10mg vials — which means a single compound can appear at three very different price points before you have compared a single supplier.",
      "This page answers the question with evidence rather than adjectives: a live table of every UK supplier ViralPeps tracks for TB-500, showing pack size, headline price, cost per milligram, stock status and a direct link to the supplier's own product page. The table is rebuilt from suppliers' published pages on a weekly cycle, so the figures reflect their most recent state rather than a snapshot taken months ago.",
      "The reason TB-500 attracts so many listings — and so much variation between them — is that it sits at the meeting point of two markets. Thymosin beta-4 has a genuine and unusually broad research literature spanning actin regulation, cell migration, tissue repair, corneal and cardiac studies, and hair-follicle biology. It is also one of the peptides most frequently discussed alongside [BPC-157](/compounds/bpc-157) as a research pair, which keeps search demand high and makes the name worth associating with a listing even when the underlying product is thin.",
      "Everything on this page is presented for laboratory and educational reference. TB-500 is not a licensed medicine in the UK; research suppliers sell the lyophilised peptide under research-use-only terms intended for in-vitro work. If you are auditing the market rather than buying today, start with the [**TB-500 comparison hub →**](/compounds/tb-500).",
    ],
    sections: [
      {
        title: "Where to Buy TB-500 UK — What Actually Matters",
        body: "\"Where to buy\" hides a more useful question: which supplier can you verify? TB-500 is unusually exposed on this front for a structural reason. The parent protein thymosin beta-4 is expressed in human tissue and has been studied for decades, which gives the name a scientific pedigree that a reseller can borrow simply by printing it on a label. The gap between what the literature describes and what a listing contains is therefore wide, and it widens further at the cheap end of the market.\n\nWhen we audit UK suppliers we apply an identical checklist every time. A Certificate of Analysis from a named laboratory referencing a specific batch. A contact route that genuinely replies to a question. Unambiguous research-use-only labelling. A registered business identity behind the storefront. And confirmed control of the domain they sell from — which is exactly why the TrustScore badge exists: a supplier who installs it on their own site is proving they control that domain, ruling out the throwaway storefronts that characterise the lower end of this market.\n\nFor a compound where many suppliers stock identical pack sizes, one further check separates the credible from the opportunistic: does the listing quote a purity figure with a method? A research vial should say lyophilised powder and give an HPLC or mass-spectrometry purity percentage. Vague language — \"high purity\", \"pharmaceutical grade\" with no number — is not a description of a tested batch.",
        list: [
          "A Certificate of Analysis from a named third-party laboratory referencing a specific batch number — the single most decisive signal available to a buyer.",
          "A working contact route: an email that replies or a phone that connects, tested before you order rather than after.",
          "Research-use-only labelling throughout, with no marketing implying human or medical use.",
          "A stated form and purity: lyophilised powder with a quoted purity figure and the analytical method behind it.",
          "Confirmed domain ownership, which is what the TrustScore badge verifies.",
        ],
      },
      {
        title: "How We Verify UK TB-500 Suppliers",
        body: "Every supplier in the table above has been checked against the same standard. We fetch their homepage and confirm it resolves, scan secondary pages for shipping, contact and compliance language, and look for a Certificate of Analysis either hosted on-site or linked from a testing laboratory. Suppliers that fail the basics are excluded rather than listed behind a caveat.\n\nThe process is deliberately conservative and narrower than the raw market. We would rather track fewer suppliers honestly than pad a table with storefronts nobody can verify. When a supplier you know of is absent, that is usually the reason: not an editorial judgement, but a simple absence of verifiable signals.\n\nWe also re-run those checks rather than treating verification as a one-off award. A supplier who published batch-linked COAs last quarter but has quietly stopped is a materially different proposition from one who has always published them, and the underlying data is refreshed rather than archived.",
        table: {
          header: ["Signal", "Why it matters"],
          rows: [
            ["Named-lab COA with batch number", "Proves the material was independently tested and traceable"],
            ["Working contact route", "A supplier you can reach is one you can resolve a problem with"],
            ["Full RUO labelling", "Shows compliance awareness; unlicensed human use is a legal risk"],
            ["Form + purity stated", "Distinguishes tested lyophilisate from an unquantified powder"],
            ["Domain ownership confirmed", "Rules out throwaway storefronts built to disappear"],
          ],
        },
      },
      {
        title: "What Affects the Price You Pay in the UK",
        body: "TB-500 pricing in the UK varies widely between the cheapest and most expensive listings, but the spread is not random — and the clearest driver is the one that most often catches buyers out. The fragment is sold in 2mg, 5mg and 10mg research vials, so pack size is the biggest single driver of headline price: larger vials almost always carry a lower cost per milligram, which is why a per-mg comparison tells you more than a headline price. A 2mg listing and a 10mg listing tell opposite stories depending on whether you divide them.\n\nVendor overhead is the second factor. A supplier running verified warehousing, commissioned lab testing, printed COAs and responsive support charges for that service. A bare-bones reseller drop-shipping from overseas does not, which is how a listing can appear dramatically cheaper while offering materially less.\n\nStock status matters too, and it is the most commonly overlooked. A listing can show a competitive price and be permanently out of stock, which is why availability is recorded alongside price here rather than assumed. When TB-500 is genuinely held in UK inventory, delivery is typically a matter of days. When it is drop-shipped, the quoted window frequently slips and import handling becomes the buyer's problem.\n\nThe practical takeaway is to compare on a per-mg basis at the pack size you actually need, and to treat an unusually low price as a question rather than a bargain. If your research pairs TB-500 with the repair peptides it is most often studied alongside, our [BPC-157 comparison hub](/compounds/bpc-157) and [GHK-Cu comparison hub](/compounds/ghk-cu) follow the same method.",
      },
    ],
    faq: [
      {
        question: "Where can I buy TB-500 in the UK?",
        answer:
          "ViralPeps compares TB-500 listings from UK research-chemical suppliers, who sell the lyophilised peptide strictly for laboratory use under research-use-only terms. We list only suppliers whose verification signals — COA, contact, compliance and domain ownership — we can independently confirm, and the live table above shows every one we currently track.",
      },
      {
        question: "Is TB-500 legal in the UK?",
        answer:
          "TB-500 is not a licensed medicine in the UK and is not authorised for human use or general retail sale as a drug. It is sold as a research reagent under research-use-only terms intended for laboratory and educational purposes. We present this information for reference only and do not supply, recommend or endorse its use.",
      },
      {
        question: "Why do TB-500 prices vary so much between UK suppliers?",
        answer:
          "Pack size is the main driver — a 10mg vial carries a much lower cost per milligram than a 2mg vial — followed by vendor overheads such as warehousing, commissioned testing, printed COAs and support. Some of the spread also reflects untested powder being listed alongside documentation-backed material, which is why checking the stated form and purity matters.",
      },
      {
        question: "Is TB-500 the same as thymosin beta-4?",
        answer:
          "No. Thymosin beta-4 is the full-length 43-amino-acid protein. TB-500 is the trade name for a synthetic fragment corresponding to its actin-binding region. Suppliers sometimes use the two names interchangeably, which is itself a useful signal: a listing that is precise about which molecule it sells is more likely to be precise about everything else.",
      },
    ],
    sources: [
      { label: "Thymosin β4 and Actin: Binding Modes, Biological Functions and Clinical Applications (Curr Protein Pept Sci 2023)", url: "https://pubmed.ncbi.nlm.nih.gov/36464872/" },
      { label: "Thymosin β4 Promotes Dermal Healing (Vitam Horm 2016)", url: "https://pubmed.ncbi.nlm.nih.gov/27450738/" },
      { label: "Effects of BPC-157 and TB-500 on Achilles tendon healing in rats (Jt Dis Relat Surg 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42542926/" },
      { label: "Thymosin β4 and the anti-fibrotic switch (Int Immunopharmacol 2023)", url: "https://pubmed.ncbi.nlm.nih.gov/36580759/" },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy TB-500 UK — Verified Suppliers, Cheapest First",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-tb-500-uk",
    title: "Cheapest TB-500 UK: Lowest Price Per mg Compared",
    description:
      "Cheapest TB-500 UK — the lowest verified price per milligram across every UK research supplier we track, refreshed weekly from live supplier product listings.",
    h1: "Cheapest TB-500 UK",
    focusKeyword: "cheapest tb-500 uk",
    intro: [
      "Finding the cheapest TB-500 UK listing is easy. Finding the cheapest TB-500 UK listing that is worth buying is not, because the smallest headline price in this market is routinely attached to the least verifiable product. TB-500 is sold as a lyophilised research powder in 2mg, 5mg and 10mg vials by dozens of UK suppliers, and a straight price sort ranks pack size rather than value: a £14 two-milligram vial sits at the top of a price list ahead of a £40 ten-milligram vial that costs less than half as much per milligram.",
      "This page solves that by ranking on cost per milligram — the only metric that compares fairly across pack sizes. Every row in the live table below has been normalised: the headline price is divided by the milligram content of the vial, so a 2mg pack and a 10mg pack appear on the same scale. The table is rebuilt from suppliers' published pages on a weekly cycle, and only suppliers whose verification signals we can confirm are included at all.",
      "The reason a per-mg ranking matters more for TB-500 than for most compounds is the width of the gap. The difference between the best and worst cost per milligram in this market is not a rounding error — it is a multiple. Buyers who compare on headline price are systematically guided toward small vials, which is the opposite of what a per-mg comparison rewards.",
      "Everything on this page is presented for laboratory and educational reference. TB-500 is not a licensed medicine and is not authorised for human use; research suppliers sell it under research-use-only terms. For the cheapest listings across every pack size, use the table below; for the full market view, see the [**TB-500 price comparison →**](/compound-guides/tb-500-price-comparison-uk).",
    ],
    sections: [
      {
        title: "Why Price Per mg Is the Only Fair TB-500 Comparison",
        body: "A price column sorts by what you pay today; a price-per-mg column sorts by what you pay for the material. For a compound sold in three pack sizes, those two orderings disagree almost every time. The cheapest TB-500 listing in the UK is almost always a small vial, because a smaller vial contains less; the best value listing is almost always a large one, because the fixed cost of testing, packaging and handling is spread across more material.\n\nThe per-mg calculation is simple — headline price divided by the milligram content of the vial — but it is worth being precise about two things. First, only the active peptide content counts; if a listing bundles bacteriostatic water or a mixing kit, that does not change the milligram figure for the peptide itself. Second, the calculation assumes the stated content is accurate, which is exactly why a per-mg ranking must be paired with a documentation check. The cheapest cost per milligram in a market of completely unverified products is not a bargain; it is an unverified claim at a low price.\n\nThat is why every supplier in the table below is one whose verification signals we could confirm. Ranking on cost per milligram among documented suppliers gives you a genuine answer; ranking on cost per milligram across the entire market would simply find the listing that has cut the most corners.",
        table: {
          header: ["Pack size", "Typical role", "How it prices"],
          rows: [
            ["2mg", "Smallest pack; lowest headline price", "Highest cost per mg — the outlier in any price sort"],
            ["5mg", "The middle option most suppliers stock", "Mid-range per mg; the common default"],
            ["10mg", "Largest standard pack", "Lowest cost per mg from most suppliers"],
          ],
        },
      },
      {
        title: "What Makes a Cheap Listing Cheap",
        body: "When a TB-500 listing undercuts the rest of the market by a wide margin, the saving comes from somewhere. There are only a few places it can come from, and each one is checkable.\n\nThe first is batch testing. A Certificate of Analysis from a named laboratory referencing a specific batch costs money to commission on every production run. A supplier who skips it saves exactly that cost and can pass part of the saving on — which is why the very cheapest listings in this market are also the ones with nothing verifiable attached. This is not a coincidence; it is arithmetic.\n\nThe second is packaging and handling. Fully labelled, batch-coded vials with correct research-use-only warnings cost more than unlabelled ones. The third is warehousing. A supplier holding UK stock pays for it; a drop-shipper does not, and the saving shows up in a lower list price and a longer, less predictable delivery time.\n\nThe practical rule is to treat an unusually low price as a prompt to check rather than a reason to buy. If a listing is dramatically cheaper than everything around it, look for the batch-linked certificate, the purity figure and the stated form. A listing that is cheap and documented is a good buy; a listing that is cheap and silent is a question.",
        list: [
          "The cheapest listings almost always skip batch testing, which is the single largest avoidable cost in this market.",
          "Unlabelled or minimally labelled vials cost less to produce than compliant research packaging.",
          "Drop-shipped listings avoid UK warehousing costs, which shows up in price and in delivery reliability.",
          "A low price plus a batch-linked COA and a stated purity figure is a genuinely good buy.",
        ],
      },
      {
        title: "Buying Cheap TB-500 Without Buying Bad TB-500",
        body: "The aim of this page is not to encourage buying the cheapest thing available — it is to help you find the lowest cost per milligram among suppliers who can document what they sell. Those two goals point in the same direction more often than the market's presentation suggests.\n\nIn practice, the best value TB-500 purchases in the UK come from suppliers who stock the larger packs and publish batch documentation. They are not the cheapest headline prices — that honour nearly always goes to a small vial — but they are the cheapest per milligram, and they are the ones where the milligram figure is backed by a certificate.\n\nIf your research involves pairing TB-500 with the repair peptides it is most commonly studied alongside, the same value logic applies to [BPC-157](/compounds/bpc-157), and the [TB-500 for sale](/compound-guides/tb-500-for-sale-uk) page covers which suppliers actually hold stock. For the widest price picture, the full comparison table lists every supplier we track regardless of ranking.",
      },
    ],
    faq: [
      {
        question: "Where is the cheapest TB-500 in the UK?",
        answer:
          "The cheapest TB-500 in the UK by headline price is nearly always the smallest pack size, because it contains the least material. Measured properly — by cost per milligram — the value usually sits with 10mg vials from suppliers who publish batch documentation. The live table above ranks every supplier we track on exactly that per-mg basis.",
      },
      {
        question: "How is price per mg calculated for TB-500?",
        answer:
          "The headline price of the vial is divided by the milligram content of the active peptide. A £40 10mg vial works out at £4.00 per mg; a £14 2mg vial works out at £7.00 per mg. Only the peptide content counts — bundled diluent or accessories do not change the calculation.",
      },
      {
        question: "Is cheap TB-500 safe to buy?",
        answer:
          "A low price is not a quality signal either way; what matters is the documentation attached to the listing. The cheapest listings in this market are frequently the ones with no batch-linked Certificate of Analysis. We would treat an unusually low price as a prompt to check the certificate, purity figure and stated form before ordering.",
      },
      {
        question: "Why do some UK suppliers not appear in the cheapest table?",
        answer:
          "The table only includes suppliers whose verification signals — a live site, a Certificate of Analysis, stated form and purity, a working contact route and confirmed domain control — we can independently confirm. Suppliers that could not be verified are excluded rather than listed behind a caveat, which is why our table is narrower than the raw market.",
      },
    ],
    sources: [
      { label: "Discovering thymosin beta 4 as a human exerkine and growth factor (Am J Physiol Cell Physiol 2021)", url: "https://pubmed.ncbi.nlm.nih.gov/34495765/" },
      { label: "Thymosin β4 and Actin: Binding Modes, Biological Functions and Clinical Applications (Curr Protein Pept Sci 2023)", url: "https://pubmed.ncbi.nlm.nih.gov/36464872/" },
      { label: "Thymosin β4: A Multi-Faceted Tissue Repair Stimulating Protein in Heart Injury (Curr Med Chem 2020)", url: "https://pubmed.ncbi.nlm.nih.gov/31333080/" },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest TB-500 UK — Ranked by Cost Per mg",
    rowLimit: 10,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "tb-500-price-comparison-uk",
    title: "TB-500 Price Comparison UK: Every Supplier Side by Side",
    description:
      "TB-500 price comparison UK — the full side-by-side table of every UK supplier we track, showing pack size, headline price and cost per mg, updated every week.",
    h1: "TB-500 Price Comparison UK",
    focusKeyword: "tb-500 price comparison uk",
    intro: [
      "A complete TB-500 price comparison UK table has to solve a problem that a simple price list does not: the same compound is sold in 2mg, 5mg and 10mg vials, so a single price column produces a list ordered by pack size rather than by value. This page shows the whole market instead — every UK supplier ViralPeps tracks for TB-500, with the pack size, headline price and cost per milligram side by side, and no row limit. Nothing is hidden behind a shortlist.",
      "TB-500 is the trade name for a synthetic fragment of thymosin beta-4, the 43-amino-acid actin-binding protein. It is one of the highest-volume compounds in the UK research market, which is precisely why a full comparison is worth having: with this many listings, the spread between the cheapest and most expensive cost per milligram is large, and the spread between the most and least verifiable suppliers is larger still.",
      "The table below is generated from data the site holds on each supplier's published listings and is refreshed on a weekly cycle. It is not a static snapshot and it is not curated to favour advertisers — no supplier pays for inclusion or position. Each row links straight to the supplier's own product page so you can verify the current price against their live listing before ordering.",
      "Everything on this page is presented for laboratory and educational reference. TB-500 is not a licensed medicine in the UK and is not authorised for human use. Research suppliers sell it under research-use-only terms for in-vitro work. If you want the market summarised rather than tabulated, start with the [**TB-500 comparison hub →**](/compounds/tb-500).",
    ],
    sections: [
      {
        title: "How to Read a Full TB-500 Price Table",
        body: "A full market table is only useful if you know which columns to trust for which decision. For TB-500, three columns carry almost all of the information: pack size, headline price and cost per milligram.\n\nPack size tells you what you are comparing. TB-500 is sold in 2mg, 5mg and 10mg vials, and the pack size determines both the headline price and the cost per milligram. Two listings at the same headline price can differ by a factor of five in milligram content, so reading price without pack size is meaningless.\n\nHeadline price tells you the cash outlay — what leaves your account today. That matters for budgeting a single purchase, but it is a poor guide to value, because it rewards small vials. Cost per milligram tells you what you are paying for the material itself, and it is the column to sort on if you are comparing across pack sizes. That is why this table shows all three side by side rather than collapsing them into a single ranking.\n\nThe fourth piece of information is not in the table at all: whether the supplier's listing is backed by a batch-linked Certificate of Analysis and a stated purity figure. That is a documentation question, and the [TB-500 UK supplier page](/compound-guides/tb-500-for-sale-uk) covers it supplier by supplier.",
        table: {
          header: ["Column", "What it tells you", "Best used for"],
          rows: [
            ["Pack size", "Milligram content of the vial", "Making two listings comparable"],
            ["Headline price", "Cash outlay today", "Single-purchase budgeting"],
            ["Cost per mg", "Price of the material itself", "Comparing across pack sizes"],
            ["Verification state", "Whether the listing is documented", "Deciding whether to trust a row"],
          ],
        },
      },
      {
        title: "Why the UK TB-500 Market Is So Wide",
        body: "The spread in this table is not an artefact of how we collect data. It reflects a real and structural feature of the UK research-peptide market.\n\nTB-500 sits at the intersection of two demand streams. Thymosin beta-4 has a substantial published literature covering actin binding, cell migration, wound repair, corneal healing and cardiac studies, which gives the compound a scientific reputation that any reseller can invoke by name. At the same time, it is one of the peptides most frequently discussed alongside [BPC-157](/compounds/bpc-157), which keeps search interest high. A name with both a literature pedigree and strong search demand is attractive to list, and the barrier to listing is low.\n\nThe result is a market with a long tail. A small number of established suppliers with warehousing, commissioned testing and published certificates sit alongside a much larger group of storefronts offering the same compound names with none of the infrastructure. When they all appear in the same search result, the price range widens and the documentation range widens further.\n\nThat is the case for showing the whole market rather than a shortlist. A shortlist tells you what the editor chose; a full table lets you see the range and decide where on it you are comfortable buying.",
      },
      {
        title: "Comparing TB-500 Against Its Common Research Partners",
        body: "TB-500 is rarely considered in isolation. Most research interest in this compound involves comparing it with, or pairing it against, the other repair-focused peptides that occupy the same shelf in the market.\n\nThe most common pairing is TB-500 and BPC-157, which are frequently listed together and often sold as a combined vial. Both are repair-oriented, both circulate in the same pack sizes, and both attract the same long tail of suppliers — so the price comparison method here transfers directly to the [BPC-157 price comparison](/compound-guides/bpc-157-price-comparison-uk).\n\nGHK-Cu is the third compound in that group. It is a copper tripeptide rather than a thymosin fragment, but it is sold to the same research audience, in overlapping pack sizes, by a heavily overlapping set of suppliers. The [GHK-Cu price comparison](/compound-guides/ghk-cu-price-comparison-uk) applies the identical per-milligram method.\n\nWhat carries across all three is the underlying rule: compare on cost per milligram, check the pack size before the price, and treat documentation as the tie-breaker. A table that lets you do all three at once is doing its job.",
      },
    ],
    faq: [
      {
        question: "What is the average price of TB-500 in the UK?",
        answer:
          "TB-500 in the UK typically ranges from under £20 for a 2mg vial to around £45–£60 for a 10mg vial, depending on the supplier. Because pack sizes differ, an average headline price is not very meaningful — the useful figure is cost per milligram, which the table above calculates for every listing we track.",
      },
      {
        question: "Why is TB-500 sold in different pack sizes?",
        answer:
          "TB-500 is most commonly sold in 2mg, 5mg and 10mg lyophilised vials. The smaller packs lower the entry cost for a single purchase, while the larger packs carry a lower cost per milligram. Which one represents better value depends on the calculation rather than the headline price.",
      },
      {
        question: "Does ViralPeps take payment for supplier positions?",
        answer:
          "No. Suppliers cannot pay for inclusion or for a higher position in the table. Rows are ordered by the column you sort on — headline price or cost per milligram — and every supplier in the table is one whose verification signals we could independently confirm.",
      },
      {
        question: "How often is the TB-500 price table updated?",
        answer:
          "The table is rebuilt from suppliers' published listings on a weekly cycle, so prices reflect their most recent state rather than a snapshot taken once. Each row links straight to the supplier's own product page so you can confirm the current price against their live listing before ordering.",
      },
    ],
    sources: [
      { label: "Thymosin β4 and Actin: Binding Modes, Biological Functions and Clinical Applications (Curr Protein Pept Sci 2023)", url: "https://pubmed.ncbi.nlm.nih.gov/36464872/" },
      { label: "Thymosin β4: A Multi-Faceted Tissue Repair Stimulating Protein in Heart Injury (Curr Med Chem 2020)", url: "https://pubmed.ncbi.nlm.nih.gov/31333080/" },
      { label: "Thymosin beta-4 denotes new directions towards developing prosperous anti-aging regenerative therapies (Int Immunopharmacol 2023)", url: "https://pubmed.ncbi.nlm.nih.gov/36709593/" },
      { label: "Thymosin β4 Promotes Dermal Healing (Vitam Horm 2016)", url: "https://pubmed.ncbi.nlm.nih.gov/27450738/" },
    ],
    tableMode: "full",
    tableHeading: "TB-500 Price Comparison UK — Every Supplier We Track",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-tb-500-online-uk",
    title: "Buy TB-500 Online UK: Ordering, Payment & Delivery",
    description:
      "Buy TB-500 online UK — how ordering, payment and delivery actually work across UK research-peptide suppliers, plus what to check before you place an order.",
    h1: "Buy TB-500 Online UK",
    focusKeyword: "buy tb-500 online uk",
    intro: [
      "To buy TB-500 online UK buyers have dozens of choices, and at almost any supplier the transaction takes five minutes. The harder question is what happens between placing the order and disposing of the vial — and that gap is where the practical differences between suppliers show up. TB-500 is sold as a lyophilised powder in 2mg, 5mg and 10mg vials, and the way a supplier handles payment, dispatch, packaging and post-sale contact varies more than any product photograph suggests.",
      "This page covers the mechanics of buying rather than the compound itself: how payment is typically taken, what realistic dispatch and delivery windows look like, how the material arrives, and what to check in the first minutes after it does. The live table below lists every UK supplier we track with current prices and a direct link to their product page, so you can move from research to an actual order without guesswork.",
      "The reason the ordering process deserves its own page is that TB-500 is a high-volume listing in a low-barrier market. There are many suppliers, many of them small, and the differences that matter at checkout — whether a supplier holds UK stock or drop-ships, whether they take card or bank transfer, whether they publish batch documentation, whether they answer a question — are not visible in a price comparison alone.",
      "Everything on this page is presented for laboratory and educational reference. TB-500 is not a licensed medicine in the UK and is not authorised for human use; suppliers sell it under research-use-only terms for in-vitro work. If you are still weighing suppliers, start with the [**TB-500 comparison hub →**](/compounds/tb-500).",
    ],
    sections: [
      {
        title: "How Ordering Works at UK TB-500 Suppliers",
        body: "The ordering flow at most UK research-peptide suppliers is standard e-commerce: find the compound, select a pack size, add to basket, check out. What differs is what surrounds those steps, and the differences are where a buyer should look.\n\nThe first difference is whether a supplier actually holds stock. A supplier with UK warehousing can dispatch within days and will usually state a cut-off time for same-day processing. A drop-shipper takes the order and forwards it, which means the quoted window is an estimate rather than a commitment, and the actual shipping origin may be outside the UK. Both models are visible if you look for them: warehoused suppliers tend to publish dispatch times, and drop-shippers tend to publish vague windows.\n\nThe second difference is documentation access before purchase. A supplier who publishes a batch-linked Certificate of Analysis on their own site expects to be checked and is comfortable with it. A supplier who only provides a certificate on request, after payment, is asking you to buy first and verify later — the wrong order of operations for a research reagent.\n\nThe third is support. Sending a question before ordering is the cheapest test available: whether it is answered, how quickly, and whether the answer engages with the actual question tells you more about a supplier than any page of website copy.",
        list: [
          "Check whether the supplier publishes a dispatch time — warehoused stock ships predictably; drop-shipped orders do not.",
          "Confirm the Certificate of Analysis is available before you pay, not only on request afterwards.",
          "Send a question before ordering and judge the supplier on whether and how it is answered.",
          "Verify the pack size you are ordering matches the milligram content you have budgeted for.",
        ],
      },
      {
        title: "Payment Methods and What They Signal",
        body: "Payment method is a genuinely useful supplier signal in this market, because it correlates with how much infrastructure a supplier has.\n\nEstablished suppliers with registered businesses commonly take card payments, sometimes alongside bank transfer. Card processing requires a merchant account and a business identity that can pass an underwriting check, which is why the least established storefronts in any market are also the ones that take only bank transfer or cryptocurrency. That is not an argument that a card-only policy makes a supplier good — plenty of legitimate small suppliers use bank transfer — but it is a reason to notice when a listing offers nothing else.\n\nBank transfer is common and not inherently a problem. It does, however, remove the consumer protections that card payments carry, which raises the importance of the other verification signals: a live, stable site, a batch-linked certificate, a working contact route and confirmed domain control. If a supplier takes only bank transfer, hold them to a stricter standard on everything else.\n\nThe practical guidance is to prefer suppliers where the payment method, the business identity and the documentation all point the same way. A supplier who takes card, publishes batch certificates and replies to email is a coherent proposition. A supplier who takes only untraceable payment and publishes nothing is equally coherent in the other direction.",
        table: {
          header: ["Payment method", "What it typically indicates"],
          rows: [
            ["Card", "Registered business with a merchant account; underwriting-checked"],
            ["Card + bank transfer", "Established supplier offering flexibility"],
            ["Bank transfer only", "Common among small suppliers; removes card protections — check documentation harder"],
            ["Cryptocurrency only", "Minimal business infrastructure; treat as highest-risk"],
          ],
        },
      },
      {
        title: "Delivery, Packaging and First Checks",
        body: "When TB-500 arrives it should arrive as a sealed vial of lyophilised powder, correctly labelled with the compound name, the milligram content, a batch or lot reference and research-use-only wording. The presence of that batch reference is what lets you tie the vial to the Certificate of Analysis for that production run.\n\nDelivery time in the UK depends heavily on whether the supplier holds stock. Warehoused suppliers typically dispatch within a day or two and deliver in a few days. Drop-shipped orders can take considerably longer and are more likely to arrive with an overseas origin. Neither is disqualifying on its own, but the quoted window is one of the most reliable indicators of which model a supplier runs.\n\nIn the first minutes after the vial arrives, three checks are worth doing. Confirm the label matches exactly what you ordered — compound, pack size and batch. Compare the batch reference on the vial with the certificate published for that batch. And inspect the vial's integrity: a broken seal, a cracked vial or visible contamination is a reason to contact the supplier before anything else happens.\n\nFor the broader view on which suppliers hold stock and how their listings compare, see the [TB-500 for sale](/compound-guides/tb-500-for-sale-uk) page, and for the market-wide price picture the [TB-500 price comparison](/compound-guides/tb-500-price-comparison-uk) lists every supplier we track.",
      },
    ],
    faq: [
      {
        question: "Can I buy TB-500 online in the UK?",
        answer:
          "TB-500 is sold online by UK research-chemical suppliers under research-use-only terms for laboratory work. It is not a licensed medicine and is not authorised for human use. The table above lists every UK supplier we track with current prices and a direct link to their product page.",
      },
      {
        question: "How long does TB-500 delivery take in the UK?",
        answer:
          "Suppliers holding UK stock typically dispatch within a day or two and deliver within a few days. Suppliers who drop-ship from overseas take considerably longer and their quoted windows are estimates rather than commitments. Whether a supplier publishes a dispatch time is usually a reliable indicator of which model they run.",
      },
      {
        question: "What payment methods do UK TB-500 suppliers accept?",
        answer:
          "Established suppliers commonly accept card payments, sometimes alongside bank transfer. Less established storefronts often accept only bank transfer or cryptocurrency. Card payments carry consumer protections that transfers do not, so a transfer-only supplier should be held to a stricter standard on documentation and contact.",
      },
      {
        question: "What should I check when my TB-500 order arrives?",
        answer:
          "Check that the label matches what you ordered — compound, milligram content and batch reference — compare that batch reference against the supplier's published Certificate of Analysis, and inspect the vial for a broken seal, cracks or visible contamination. Any of those issues is a reason to contact the supplier before proceeding.",
      },
    ],
    sources: [
      { label: "Dangers of Injectable Peptides and Other Unregulated \"Biohacking\" Drugs (Mo Med 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42757290/" },
      { label: "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance (Sports Med 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/41966639/" },
      { label: "Thymosin β4 Promotes Dermal Healing (Vitam Horm 2016)", url: "https://pubmed.ncbi.nlm.nih.gov/27450738/" },
    ],
    tableMode: "full",
    tableHeading: "Buy TB-500 Online UK — Suppliers, Prices and Direct Product Links",
    rowLimit: 20,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "tb-500-for-sale-uk",
    title: "TB-500 For Sale UK: Who Actually Holds Stock",
    description:
      "TB-500 for sale UK — which UK suppliers actually hold stock, how to verify a live listing, and why an in-stock price always beats a low price that never ships.",
    h1: "TB-500 For Sale UK",
    focusKeyword: "tb-500 for sale uk",
    intro: [
      "Look for TB-500 for sale UK suppliers and you will find dozens of listings — but a TB-500 listing that is for sale is not the same as a TB-500 listing that is actually available, and in this market the gap is wide enough to matter. Dozens of UK suppliers list the compound, but a meaningful share show a price on a product page they cannot immediately ship: the vial is on backorder, the page is a permanent placeholder, or the order is passed to an overseas drop-shipper whose delivery window slips. A price that never results in a dispatch is not a price at all.",
      "This page is about availability rather than value. It shows which UK suppliers currently hold TB-500 in stock, across the 2mg, 5mg and 10mg packs the compound is sold in, so you can tell the difference between a live listing and a dormant one before you commit. The live table below is refreshed on a weekly cycle from suppliers' published pages and marks stock status explicitly on every row.",
      "Availability deserves its own page for TB-500 specifically because the compound is unusually popular. Thymosin beta-4 has a long research history covering actin regulation and tissue repair, and TB-500 is one of the peptides most often discussed alongside [BPC-157](/compounds/bpc-157). High search interest makes it worth listing for suppliers of every size, including those without the stock depth to back the listing up.",
      "Everything on this page is presented for laboratory and educational reference. TB-500 is not a licensed medicine in the UK and is not authorised for human use; it is sold by research suppliers under research-use-only terms. If you are comparing value rather than availability, see the [**TB-500 price comparison →**](/compound-guides/tb-500-price-comparison-uk).",
    ],
    sections: [
      {
        title: "In Stock vs Listed — Why the Distinction Matters",
        body: "A product page on a supplier's website tells you that the supplier wants to sell you something. It does not tell you that the thing exists in their warehouse. Those are different facts, and the second one is the one that determines whether your order ships next week or next month.\n\nThe distinction matters more in the research-peptide market than in most retail because the barrier to listing is very low. A supplier can publish a product page with a price and a stock photograph without holding any inventory at all, then source the material when an order arrives. When sourcing goes smoothly this is invisible to the buyer. When it does not — because the supplier's own upstream is out of stock, or because the order crosses a border — the buyer discovers the difference only after paying.\n\nThere is also a quieter version of the same problem: the dead listing. A product page that has been live for months with a price that never changes and a stock badge that never updates is often a page nobody is maintaining. It looks available; it is simply neglected.\n\nThe way to tell these apart is to read the signals rather than the price. Does the supplier publish a dispatch time? Is there a stated cut-off for same-day processing? Is the stock badge consistent with the price? A supplier with nothing to say about dispatch is usually a supplier who is not shipping.",
        list: [
          "A product page proves a supplier wants to sell, not that they hold stock.",
          "Listing barriers are low in this market, so out-of-stock pages are common and often unnoticed.",
          "A price that never changes and a stock badge that never updates usually means a neglected page.",
          "A published dispatch time is the clearest indicator that a supplier actually ships from UK stock.",
        ],
      },
      {
        title: "How to Verify a Live TB-500 Listing",
        body: "Before ordering from any TB-500 listing, four checks will tell you whether it is genuinely live. None of them takes more than a minute, and together they separate an operating supplier from a dormant storefront.\n\nFirst, does the supplier state a dispatch time? \"Dispatched within 24 hours\" or \"orders before 2pm ship same day\" are commitments made by a supplier who knows their own warehouse. The absence of any such statement, on a site that otherwise says plenty, is telling.\n\nSecond, is the Certificate of Analysis tied to a batch? A live listing run by an operating business has current batches, and current batches have certificates. A certificate that is months old, or absent, suggests a page that is not being actively maintained.\n\nThird, does the supplier answer a question? Send a specific one before ordering — for example, asking to confirm the current batch number — and see whether the answer is specific. Suppliers who are genuinely shipping that compound know their batch numbers.\n\nFourth, does the domain check out? The TrustScore badge verifies supplier domain control, which distinguishes an established business from a storefront that could vanish. All four checks together take less time than filling in the checkout form.",
        table: {
          header: ["Check", "A live listing shows", "A dormant listing shows"],
          rows: [
            ["Dispatch statement", "Specific times and cut-offs", "Silence, or a vague window"],
            ["Batch-linked COA", "Current batch with certificate", "Stale, generic or absent"],
            ["Question answered", "Specific answer, given quickly", "No reply, or a copy-paste response"],
            ["Domain control", "TrustScore badge installed", "No verifiable business identity"],
          ],
        },
      },
      {
        title: "What In Stock TB-500 Costs — and Why It Is Worth It",
        body: "In-stock TB-500 is not always the cheapest TB-500, and that is expected. A supplier holding UK stock pays for warehousing, batch testing and the working capital tied up in inventory; a supplier who sources on demand pays for none of that and can quote a lower price. The saving at the cheap end is real, and so is the risk attached to it.\n\nThe value of buying from a supplier who genuinely holds stock is that the price you see is a price you can act on. The order ships when it says it will, the vial arrives with a batch reference that matches a certificate, and if something goes wrong there is a UK business to contact. When TB-500 is held in UK inventory, delivery is typically a matter of days.\n\nThe practical approach is to use the stock column as a filter before you use the price column as a ranking. A listing that is in stock at a competitive cost per milligram is a better purchase than a marginally cheaper listing that may never dispatch, and the per-mg calculation keeps that comparison honest across pack sizes.\n\nFor the value-ranked view, see [cheapest TB-500](/compound-guides/cheapest-tb-500-uk); for suppliers and how each one compares on documentation, see the [TB-500 UK supplier](/compound-guides/tb-500-for-sale-uk) analysis and the [best TB-500 peptide](/compound-guides/best-tb-500-peptide) trust ranking.",
      },
    ],
    faq: [
      {
        question: "Where is TB-500 in stock in the UK?",
        answer:
          "The live table above shows stock status for every UK supplier we track, updated on a weekly cycle from their published pages. Suppliers holding UK inventory typically dispatch within a day or two and deliver within a few days, whereas drop-shipped listings take longer and quote estimates rather than commitments.",
      },
      {
        question: "Why do some TB-500 listings show a price but never ship?",
        answer:
          "The barrier to creating a product page is very low, so suppliers can list a compound they do not hold and source it only when an order arrives. When their own upstream is out of stock, or the order crosses a border, the buyer discovers this only after paying. Checking for a published dispatch time is the quickest way to identify these listings.",
      },
      {
        question: "Is in-stock TB-500 more expensive?",
        answer:
          "Often slightly, and legitimately so. A supplier holding UK stock pays for warehousing, batch testing and inventory. Buying in stock means the price you see is one you can act on: the order ships when promised, and there is a UK business to contact if anything goes wrong.",
      },
      {
        question: "How can I check a TB-500 listing is live before ordering?",
        answer:
          "Four checks: does the supplier publish a specific dispatch time, is the Certificate of Analysis tied to a current batch, do they answer a specific question before you order, and does the domain show a verifiable business identity such as the TrustScore badge. Together these take less than a minute and distinguish a live listing from a dormant one.",
      },
    ],
    sources: [
      { label: "Thymosin β4 and Actin: Binding Modes, Biological Functions and Clinical Applications (Curr Protein Pept Sci 2023)", url: "https://pubmed.ncbi.nlm.nih.gov/36464872/" },
      { label: "Thymosin β4 and the anti-fibrotic switch (Int Immunopharmacol 2023)", url: "https://pubmed.ncbi.nlm.nih.gov/36580759/" },
      { label: "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance (Sports Med 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/41966639/" },
      { label: "Thymosin β4 Promotes Dermal Healing (Vitam Horm 2016)", url: "https://pubmed.ncbi.nlm.nih.gov/27450738/" },
    ],
    tableMode: "trust",
    tableHeading: "TB-500 For Sale UK — Suppliers With Live Listings, Ranked by TrustScore",
    rowLimit: 25,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-tb-500-peptide",
    title: "Best TB-500 Peptide UK: Suppliers Ranked by TrustScore",
    description:
      "Best TB-500 peptide UK — UK suppliers ranked by verifiable trust signals rather than price, including Certificate of Analysis, purity and domain ownership.",
    h1: "Best TB-500 Peptide",
    focusKeyword: "best tb-500 peptide",
    intro: [
      "Deciding which is the best TB-500 peptide to buy in the UK is a question about suppliers rather than about the molecule. Every listing in this market claims to contain the actin-binding fragment of thymosin beta-4; what separates them is whether the supplier can evidence that claim. The fragment is inexpensive as a raw material and trivial to relabel, which means the quality of a purchase is determined almost entirely by the quality of the supplier behind it — and suppliers in this market differ far more than their websites suggest.",
      "This page ranks UK TB-500 suppliers by trust signals rather than by price: whether a site is live and stable, whether it publishes a batch-linked Certificate of Analysis from a named laboratory, whether it states the form and purity of what it sells, whether it has a working contact route and compliance language, and whether it has confirmed control of its own domain through the TrustScore badge. The ranking below is derived from those signals, and the live table reflects the suppliers we can actually verify.",
      "The reasoning behind ranking on trust rather than price is specific to this compound. TB-500 carries a real scientific reputation because the parent protein thymosin beta-4 has a broad research literature, and that reputation is transferable to a label without any corresponding obligation to test the contents. When a market rewards name recognition and does not require evidence, price becomes a noise signal. Documentation does not.",
      "Everything here is presented for laboratory and educational reference. TB-500 is not a licensed medicine and is not authorised for human use. The [**TB-500 hub →**](/compounds/tb-500) carries the full research profile and market overview.",
    ],
    sections: [
      {
        title: "What \"Best\" Means for a Research Peptide",
        body: "For a compound sold as a research reagent, \"best\" has a specific and testable meaning. It is not the cheapest listing, the most attractive website, or the supplier with the largest catalogue. It is the supplier who can demonstrate, on their own published pages, that the material they sell has been independently tested, that they are a real business behind a domain they control, and that they stand behind what they ship.\n\nThat definition matters because the alternative — judging by price or presentation — systematically rewards the wrong behaviour. A supplier who skips third-party testing can undercut one who commissions it, which is exactly how the cheapest listings in a head-to-head price sort end up being the ones with nothing verifiable attached. Ranking by trust inverts that, so a supplier who invests in documentation rises rather than falls.\n\nThe trust signals we use are deliberately conservative. A live, stable site. A Certificate of Analysis tied to a batch and naming the laboratory. A stated form and purity. A contact route that answers. Compliance language that matches research-use-only terms. And the TrustScore badge, which verifies domain control and distinguishes a genuine supplier from a storefront built to disappear.",
        table: {
          header: ["Trust signal", "What a strong supplier shows", "What the weak ones show"],
          rows: [
            ["Site stability", "Live, resolvable, consistent", "Often offline or parked"],
            ["Certificate of Analysis", "Batch-linked, named laboratory", "Generic, undated or absent"],
            ["Form + purity", "Lyophilised powder, purity quoted", "Vague or borrowed scientific language"],
            ["Contact route", "Replies to a real question", "Form only, no answer"],
            ["Domain control", "TrustScore badge installed", "No verifiable identity"],
          ],
        },
      },
      {
        title: "How the TrustScore Ranking Works",
        body: "The TrustScore is a composite of the checks above, weighted toward the signals that are hardest to fake. A supplier's site resolving and having a title is worth little on its own, because both are trivial; a batch-linked Certificate of Analysis from a named laboratory is worth much more, because commissioning it costs real money and cannot be faked convincingly. Contact, compliance and shipping language sit between the two, since they indicate an operating business but can be copied by anyone.\n\nThe ranking this produces is not a statement that one supplier's material is purer than another's — no third-party comparison can prove that without testing each purchase, which is beyond the scope of a comparison site. It is a statement that one supplier has made their material verifiable and another has not, which for a research buyer is the practical question. A supplier who publishes a batch COA is telling you they are willing to be checked.\n\nWe re-run the checks rather than treating them as permanent. A supplier who published batch certificates last quarter but has quietly stopped is a different proposition from one who has never missed, and the ranking reflects current state, not reputation.",
      },
      {
        title: "Choosing Between the Top TB-500 Suppliers",
        body: "Once you have a shortlist of suppliers that pass the trust bar, the remaining decision is about fit rather than quality. The two most common considerations are pack size and format. TB-500 is typically sold in 2mg, 5mg and 10mg research vials; the 2mg vial keeps the entry cost lower while the 10mg vial carries a better cost per milligram if your work will consume more material. Suppliers who stock multiple sizes let you decide on the metric that matters to your work.\n\nFormat is the other axis. Almost every research supplier sells lyophilised powder for reconstitution, but a number list TB-500 pre-blended with the repair peptides it is most often studied alongside — [BPC-157](/compounds/bpc-157), [GHK-Cu](/compounds/ghk-cu) and KPV. Blends carry their own documentation burden, so hold them to the same standard: a certificate naming the batch and every component, not a generic claim.\n\nFor the price dimension, the [cheapest TB-500](/compound-guides/cheapest-tb-500-uk) page gives the unit-cost shortlist and the [TB-500 price comparison](/compound-guides/tb-500-price-comparison-uk) gives the full market. Used together with the trust ranking here, they let you buy from a supplier who both documents their material and prices it sensibly — which is the only combination that qualifies as the best TB-500 peptide to buy.",
      },
    ],
    faq: [
      {
        question: "What is the best TB-500 peptide to buy in the UK?",
        answer:
          "The best choice is the supplier with the strongest verifiable trust signals rather than the lowest price: a live site, a batch-linked Certificate of Analysis from a named laboratory, a stated form and purity, a working contact route and confirmed domain control. The ranking above orders UK suppliers on exactly those signals.",
      },
      {
        question: "Should I buy the cheapest TB-500 peptide?",
        answer:
          "Not on price alone. Because the TB-500 name borrows the scientific reputation of thymosin beta-4 without requiring any evidence of contents, the cheap end of the UK market includes listings with nothing verifiable attached. A low price is a data point; the documentation attached to the listing is what determines whether it is a sensible purchase.",
      },
      {
        question: "What is the TrustScore and how is it calculated?",
        answer:
          "TrustScore is a composite of verifiable supplier signals — site stability, a batch-linked Certificate of Analysis, stated form and purity, a working contact route, compliance language and confirmed domain control. It is weighted toward the hardest-to-fake signals, and it is recalculated rather than treated as a permanent award.",
      },
      {
        question: "Is a TB-500 blend better than a single-peptide vial?",
        answer:
          "Blends of TB-500 with repair peptides such as BPC-157, GHK-Cu and KPV suit work that studies those combinations together, but they carry a higher documentation burden. Hold a blend to the same standard as a single vial — a certificate naming the batch and every component, not a generic claim.",
      },
    ],
    sources: [
      { label: "Thymosin β4 and Actin: Binding Modes, Biological Functions and Clinical Applications (Curr Protein Pept Sci 2023)", url: "https://pubmed.ncbi.nlm.nih.gov/36464872/" },
      { label: "Thymosin β4: A Multi-Faceted Tissue Repair Stimulating Protein in Heart Injury (Curr Med Chem 2020)", url: "https://pubmed.ncbi.nlm.nih.gov/31333080/" },
      { label: "Thymosin beta-4 denotes new directions towards developing prosperous anti-aging regenerative therapies (Int Immunopharmacol 2023)", url: "https://pubmed.ncbi.nlm.nih.gov/36709593/" },
      { label: "Thymosin β4 Promotes Dermal Healing (Vitam Horm 2016)", url: "https://pubmed.ncbi.nlm.nih.gov/27450738/" },
    ],
    tableMode: "trust",
    tableHeading: "Best TB-500 Peptide — UK Suppliers Ranked by TrustScore",
    rowLimit: 25,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
