/**
 * CJC-1295 + Ipamorelin silo spokes — content for /compound-guides/[slug].
 *
 * Six spokes, each targeting one modifier keyword. NO canonicals between spokes.
 * Prices are NEVER hardcoded — the page renders them live from
 * src/data/cjc-1295-ipamorelin-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * MODIFIER NOTES (Google UK autocomplete, harvested live for this run):
 *  - `where to buy cjc-1295 ipamorelin uk` → ZERO exact results, but
 *    `where to buy cjc 1295 ipamorelin` is an exact suggestion (type 512), and
 *    `cjc 1295 ipamorelin pen buy online uk` appears for the buy variant.
 *    Kept as-is.
 *  - `cheapest cjc-1295 ipamorelin uk` → ZERO exact, but returns
 *    `best price for cjc 1295 ipamorelin` and `cjc 1295 ipamorelin cheapest`.
 *    Kept as-is (same intent).
 *  - `cjc-1295 ipamorelin price comparison uk` → ZERO exact. Substituted with
 *    `cjc 1295 ipamorelin price uk` — an exact suggestion (type 512) from the
 *    `cjc 1295 ipamorelin uk` cluster.
 *  - `buy cjc-1295 ipamorelin online uk` → confirmed (
 *    `cjc 1295 ipamorelin pen buy online uk`).
 *  - `cjc-1295 ipamorelin uk supplier` → ZERO results in every ordering tried
 *    ("supplier uk", "uk supplier", "suppliers uk", "best supplier").
 *    Substituted with `cjc 1295 ipamorelin supplier` → returns
 *    `cjc 1295 ipamorelin provider` and `where to buy cjc 1295 ipamorelin`.
 *  - `best cjc-1295 ipamorelin peptide` → ZERO exact, but the `best cjc 1295
 *    ipamorelin` head returns `best cjc 1295 ipamorelin blend`,
 *    `best source for cjc 1295 ipamorelin`, `best cjc 1295 ipamorelin brand`.
 *    Kept as-is.
 *
 * Google normalises the hyphen away; every harvest was therefore run on the
 * spaced form "cjc 1295 ipamorelin" as well as the hyphenated slug form.
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
    slug: "where-to-buy-cjc-1295-ipamorelin-uk",
    title: "Where to Buy CJC-1295 + Ipamorelin UK: Suppliers 2026",
    description:
      "Where to buy CJC-1295 + Ipamorelin UK — compare live prices from verified UK research suppliers, then check stock, shipping and Certificates of Analysis first.",
    h1: "Where to Buy CJC-1295 + Ipamorelin UK",
    focusKeyword: "where to buy cjc-1295 ipamorelin uk",
    intro: [
      "If you are searching for where to buy CJC-1295 + Ipamorelin UK, the first thing to understand is that where to buy cjc-1295 ipamorelin uk is a question about a blend, not a single compound. CJC-1295 is a growth hormone-releasing hormone analogue — a GRF(1-29) backbone carrying a maleimidopropionic acid linker that binds covalently to serum albumin — and Ipamorelin is a pentapeptide growth hormone secretagogue that acts at the ghrelin receptor GHSR-1a. Selling them in one vial means the supplier has co-lyophilised two chemically distinct substances into a single lyophilised cake.",
      "That detail changes every buying question. You cannot audit a blend the way you audit a single agent, because the analytical certificate has to cover two identities, two purities and a ratio. Below is a live table of every UK supplier ViralPeps tracks for the CJC-1295 + Ipamorelin blend, with pack size, stock status, price and a direct link to each listing. It is regenerated from a weekly price scrape, so the figures reflect those suppliers' own listing pages at the most recent check.",
      "The blend is well founded in the literature on both sides. Ipamorelin was characterised as a selective GHSR-1a agonist with minimal effect on ACTH and cortisol compared with earlier GHRP generation compounds, and CJC-1295's albumin-binding design was shown to extend growth hormone and IGF-I responses substantially versus unmodified GRF. Neither finding tells you anything about the purity of a particular vial, but together they explain why the combination is one of the most commonly stocked research blends in the UK market — and why it attracts undocumented sellers.",
      "Everything here is presented for laboratory and educational reference only. Neither compound is a licensed medicine in the UK and nothing on this page is medical guidance. For the compound's full research profile, mechanism and reference data, start with the [**CJC-1295 + Ipamorelin research hub →**](/compounds/cjc-1295-ipamorelin-blend).",
    ],
    sections: [
      {
        title: "How the table below is ordered",
        body:
          "Rows are sorted by price ascending, with ties broken alphabetically by vendor name for stable output. Every row carries a link straight to the supplier's own product page so you can verify the listing yourself rather than trusting a directory entry. Vendors that sell several pack sizes from one page are expanded into one row per pack, because a headline price without a pack size is a meaningless number — and with a blend, the pack size is even more ambiguous than usual.",
      },
      {
        title: "The pack label is the thing most buyers misread",
        body:
          "Blend vials are usually labelled by total content across both components: \"5mg+5mg\" means 5mg of CJC-1295 plus 5mg of Ipamorelin, for 10mg total in the vial. Some suppliers instead label a 10mg vial as \"10mg blend\" without splitting the ratio, and a minority sell an uneven ratio. Always confirm two things on the product page: which component each figure refers to, and whether the stated mass is per component or combined. Our per-mg column sums every milligram figure in the label so a 5mg+5mg vial is priced per 10mg of total content.",
        list: [
          "Is the label per component (5mg+5mg) or combined (10mg blend)?",
          "Is the ratio 1:1, or weighted toward one component?",
          "Does the Certificate of Analysis state mg of each substance, or only total peptide content?",
        ],
      },
      {
        title: "Four checks before you place an order",
        body:
          "The UK research peptide market has no licensing gate, so verification is entirely on the buyer. For a blend the certificate question is stricter than for a single agent, because a certificate that reports one purity figure cannot establish that two substances are both present and both as declared. Look for a batch-referenced third-party analysis, a physical UK address or company number, a contact channel that survives a test enquiry, and research-use-only framing on the listing itself.",
        list: [
          "Certificate of Analysis naming the testing laboratory, the batch number on your vial, and both components.",
          "A purity figure per component, or at minimum a mass-spectrometry confirmation of both observed masses.",
          "Company number or registered address that resolves on Companies House.",
          "A contact route you have actually tested — not a form that silently discards submissions.",
        ],
      },
      {
        title: "Why blends are the easiest product to fake",
        body:
          "A blend is analytically harder to audit than a single peptide, and that difficulty is an opportunity for anyone selling to a buyer who will not check. Three failure modes are common: a vial that contains both compounds but at a ratio far from the label; a vial that contains only one of the two; and a vial where one component is a cheaper analogue substituted for the declared substance. None of these are detectable from the outside of a vial, and only the second and third would show on a competent certificate of analysis. This is the single strongest argument for buying from a supplier that publishes per-batch analytical data rather than a generic purity claim on a product page.",
      },
      {
        title: "What UK delivery actually looks like",
        body:
          "Most UK-listed suppliers dispatch from within the UK, which means one to three working days in transit for in-stock items. Overseas storefronts that rank for UK terms routinely quote seven to twenty-one days plus customs exposure. Lyophilised peptide is comparatively stable at ambient temperature for short periods, but a vial held at a customs facility for a fortnight through a summer is a vial with an unknown temperature history. If a delivery window is not stated on the product page, treat that as a missing data point rather than a given.",
      },
      {
        title: "Blend or two separate vials — an honest comparison",
        body:
          "A blend is convenient and usually cheaper per milligram than buying the two compounds separately, but it removes an experimental variable: with a single vial you cannot vary the ratio between the two components, and you cannot substitute one without discarding the other. If your design only ever needs a fixed ratio, the blend is the sensible purchase. If you may want to hold one component constant while varying the other, buy separately — the [**CJC-1295 guide set**](/compound-guides/where-to-buy-cjc-1295-uk) and the [**Ipamorelin guide set**](/compound-guides/where-to-buy-ipamorelin-uk) cover each single agent on its own terms, and the price of two single-agent vials is not always the higher option once pack sizes are normalised.",
      },
      {
        title: "What the price comparison does not tell you",
        body:
          "A directory can tell you what suppliers charge and whether their sites are live. It cannot tell you whether the powder in the vial matches the label; only batch-linked analysis can do that, and even then only for the batch tested. Use the table to shortlist, then use the certificate to decide. Suppliers whose TrustScore inputs include a public COA library are flagged as verified in the table, and the [**supplier verification page**](/compound-guides/cjc-1295-ipamorelin-supplier-uk) walks through how to read what they publish.",
      },
    ],
    faq: [
      {
        question: "Is CJC-1295 + Ipamorelin legal to buy in the UK?",
        answer:
          "The blend is sold by UK vendors as a research-use-only laboratory material rather than a licensed medicine. It is not an approved medicinal product, so it cannot lawfully be sold for human use or with therapeutic claims. Buyers are responsible for confirming that their intended use is lawful; this page is educational only and is not legal advice.",
      },
      {
        question: "What does a 5mg+5mg CJC-1295 + Ipamorelin vial actually contain?",
        answer:
          "Ten milligrams of total peptide: 5mg of CJC-1295 and 5mg of Ipamorelin, assuming a 1:1 ratio as labelled. Some suppliers sell uneven ratios or label the combined figure only, so confirm the split on the product page and on the Certificate of Analysis before comparing it with another listing.",
      },
      {
        question: "Why is the blend cheaper per mg than buying the two compounds separately?",
        answer:
          "Blends are usually filled as one lyophilisation run in one vial, which halves the vial, stopper, labelling and packaging cost per milligram and simplifies shipping. Whether the saving is real depends on the ratio and pack size — compare the per-mg column on this page against the single-agent CJC-1295 and Ipamorelin tables before assuming the blend wins.",
      },
      {
        question: "Do UK suppliers ship CJC-1295 + Ipamorelin the same day?",
        answer:
          "In-stock items from UK-based suppliers are typically dispatched within one working day and arrive in one to three working days. The table shows a stock flag per listing, but stock moves quickly on popular blends, so confirm at checkout rather than relying on the directory snapshot.",
      },
      {
        question: "Should I buy CJC-1295 with DAC or without DAC in a blend?",
        answer:
          "Blends are almost always formulated with the no-DAC form, sometimes listed as Mod GRF(1-29), because the DAC form's albumin binding is a separate pharmacokinetic variable. Check which one the listing specifies — the words DAC, no-DAC or Mod GRF should appear on the product page. If they do not, ask before ordering.",
      },
    ],
    sources: [
      {
        label:
          "Ipamorelin, the first selective growth hormone secretagogue (Eur J Endocrinol, 1998)",
        url: "https://pubmed.ncbi.nlm.nih.gov/9849822/",
      },
      {
        label:
          "Prolonged stimulation of GH and IGF-I secretion by CJC-1295, a long-acting heat-stable analog of GH-releasing hormone (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy CJC-1295 + Ipamorelin UK — Live Prices",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-cjc-1295-ipamorelin-uk",
    title: "Cheapest CJC-1295 + Ipamorelin UK: Price Per mg 2026",
    description:
      "Cheapest CJC-1295 + Ipamorelin UK — verified listings normalised to price per milligram of total vial content, so pack-size tricks cannot hide the real cost.",
    h1: "Cheapest CJC-1295 + Ipamorelin UK",
    focusKeyword: "cheapest cjc-1295 ipamorelin uk",
    intro: [
      "Finding the cheapest CJC-1295 + Ipamorelin UK listing is not the same as finding the lowest number on a screen: cheapest cjc-1295 ipamorelin uk is a question about normalised cost, not about the smallest printed figure. A blend is priced inconsistently across the market: some suppliers quote a 5mg+5mg vial, others a 10mg+10mg vial, and a few quote a combined mass without saying how it is split. The headline price therefore tells you almost nothing about what a milligram costs.",
      "This page solves that by normalising every listing we track to a single unit — pounds per milligram of total peptide content in the vial. A 5mg+5mg vial is counted as 10mg, because that is what is physically in the vial. The table below is sorted by that normalised rate, ascending, and regenerated from the weekly price scrape.",
      "The same principle applies to the two single agents. Ipamorelin alone is sold in packs from a few milligrams up to 10mg, and CJC-1295 alone is sold in 2mg, 5mg and 10mg vials with materially different per-milligram rates at each size. Comparing a blend against single-agent vials without normalising is how buyers end up paying more for the convenience.",
      "Everything here is presented for laboratory and educational reference only. Neither compound is a licensed medicine in the UK and nothing on this page is medical guidance. For mechanism, sequence and reference data, see the [**CJC-1295 + Ipamorelin research hub**](/compounds/cjc-1295-ipamorelin-blend).",
    ],
    sections: [
      {
        title: "How price per milligram is calculated here",
        body:
          "Every milligram figure in a pack label is summed. \"5mg+5mg\" becomes 10mg; \"10mg+10mg\" becomes 20mg; a plain \"10mg\" stays 10mg. The listed price is then divided by that total. Rows without a parsable milligram figure are pushed to the bottom of the table rather than being guessed at, because an assumed pack size is worse than a missing one.",
        table: {
          header: ["Pack label", "Total mg counted", "Price", "Per-mg rate"],
          rows: [
            ["5mg+5mg", "10mg", "£34.00", "£3.40/mg"],
            ["10mg+10mg", "20mg", "£58.00", "£2.90/mg"],
            ["10mg (combined)", "10mg", "£29.00", "£2.90/mg"],
            ["5mg (combined, unsplit)", "5mg", "£24.00", "£4.80/mg"],
          ],
        },
      },
      {
        title: "The three ways a cheap listing is not cheap",
        body:
          "A low headline price can hide a smaller vial, a single-component listing described as a blend, or an unverified supplier whose certificate does not exist. The first is caught by the per-mg column. The second is caught only by reading the product page: if the listing says 10mg and does not name both compounds, you cannot tell whether you are buying a blend. The third is caught by checking the certificate — and it is the one that costs the most, because unusable material at any price is a total loss.",
        list: [
          "Smaller vial — visible in the per-mg column, invisible in the headline price.",
          "Blend in name only — one component, or an unstated ratio.",
          "No batch-linked Certificate of Analysis — the cheapest listing can be the most expensive purchase.",
        ],
      },
      {
        title: "Bulk vials versus repeated small orders",
        body:
          "Across the market, the 10mg+10mg tier almost always carries a lower per-milligram rate than the 5mg+5mg tier from the same supplier, often by a wide margin. That is normal packaging economics: one lyophilisation run, one vial, one set of shipping costs. The trade-off is that a single large vial is a single point of failure — one compromised vial loses the whole batch of material, whereas two smaller vials isolate the risk. If your work is sensitive to a single vial's integrity, the per-mg premium on the smaller size can be worth paying.",
      },
      {
        title: "When the cheapest supplier is the wrong supplier",
        body:
          "A price table ranks suppliers on one axis. Before acting on the top row, check whether that supplier publishes a batch-referenced certificate, whether it has a UK registered presence, and whether its listing survives a contact test. The [**supplier verification guide**](/compound-guides/cjc-1295-ipamorelin-supplier-uk) sets out the checks in order. In practice the median price from a fully documented supplier is a better default than the floor price from an undocumented one.",
      },
      {
        title: "Comparing the blend against two separate vials",
        body:
          "At equal ratio to content, the blend usually undercuts the sum of two single-agent vials at the same total milligram count, because you pay for one vial and one shipment. That advantage disappears if your design needs an uneven ratio, since you would be buying milligram content you cannot use. The honest comparison is per milligram of the component you actually need, not per milligram of total peptide — see [**CJC-1295 prices**](/compound-guides/cheapest-cjc-1295-uk) and [**Ipamorelin prices**](/compound-guides/cheapest-ipamorelin-uk) for the single-agent rates.",
      },
      {
        title: "How often these prices are refreshed",
        body:
          "The underlying scrape runs weekly against suppliers' own listing pages. Prices on the live table are therefore a recent snapshot rather than a real-time quote, and a supplier can change a price between the scrape and your visit. Treat the table as a shortlist generator and confirm on the product page at checkout.",
      },
      {
        title: "The arithmetic that makes a price look wrong",
        body:
          "A blend listing can appear dramatically cheaper than another when the two are quoted on different bases. Suppose supplier A sells a 5mg+5mg vial for £34 and supplier B sells a 10mg+10mg vial for £58. On headline price B looks expensive. On total peptide A is £3.40/mg and B is £2.90/mg, so B is cheaper by roughly 15 percent per milligram. Reverse the two pack sizes in the labels — a supplier quoting '10mg' for a vial that actually contains 5mg of each component — and the same arithmetic lands on the wrong answer entirely. That is why the label, not the number, is the input that decides the ranking.",
      },
      {
        title: "Shipping charged into the comparison",
        body:
          "A per-milligram figure that excludes shipping is an incomplete figure. UK suppliers commonly charge a flat delivery fee in the range of a few pounds, with free delivery above a basket threshold. On a single small vial that fee can be 10 to 15 percent of the total, which is often larger than the per-milligram gap between the two cheapest listings. If you are buying once, compare checkout totals. If you are buying the same pack size repeatedly, the per-milligram view is more durable because shipping is constant and cancels out.",
      },
      {
        title: "Where the floor price comes from and why it moves",
        body:
          "A supplier at the bottom of the table is usually one buying in larger synthesis batches, filling in a lower-cost format, or trading on thin margin to win search visibility. Those positions are unstable. When a supplier restocks at a worse rate it repricess within weeks, and when a low-cost seller runs out the floor jumps to the next row. Because the table is regenerated weekly, a listing that has been at the floor for several consecutive scrapes is a much stronger signal than one that appeared there once.",
      },
      {
        title: "Why price per milligram is the wrong number for a blend in one specific case",
        body:
          "Normalising a blend to total content assumes you need both components in equal measure. If your work only uses a 1:1 blend, that assumption holds and the number is correct. If you actually need more of one component than the other, the blend's per-milligram rate overstates its value, because you are paying for material you will not use. In that case the honest comparison is cost per milligram of the binding component, which requires per-component pricing — something most blend listings do not publish. That is a limitation of the market, not of the table.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest CJC-1295 + Ipamorelin in the UK per mg?",
        answer:
          "The table above is sorted by normalised price per milligram of total vial content at the most recent scrape, and the top row is the current floor among suppliers we track. Because prices change weekly, check the live figure rather than relying on any number quoted in text.",
      },
      {
        question: "Is a 10mg+10mg vial better value than 5mg+5mg?",
        answer:
          "Usually yes on a per-milligram basis, often by 15 to 30 percent, because packaging and shipping are fixed costs. The trade-off is concentration risk: one compromised large vial loses twice the material of one compromised small vial.",
      },
      {
        question: "Does a low price mean low purity?",
        answer:
          "Not automatically, but it is a reason to check. Suppliers reporting batch-linked third-party analysis are verifiable regardless of price; a floor-price listing with no certificate is unverifiable regardless of price. The per-mg column ranks cost, not quality.",
      },
      {
        question: "Are there hidden costs in a cheap UK listing?",
        answer:
          "Shipping, cold-chain packaging and card fees are the usual extras. A supplier with a low unit price and a high flat shipping charge can lose the comparison once delivery is included, so check the checkout total for the pack size you actually want.",
      },
    ],
    sources: [
      {
        label:
          "Ipamorelin, the first selective growth hormone secretagogue (Eur J Endocrinol, 1998)",
        url: "https://pubmed.ncbi.nlm.nih.gov/9849822/",
      },
      {
        label:
          "Sustained GH and IGF-I responses to CJC-1295 in healthy adults: a randomized, placebo-controlled study (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/17018654/",
      },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest CJC-1295 + Ipamorelin UK — Price Per mg",
    rowLimit: 25,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "cjc-1295-ipamorelin-price-uk",
    title: "CJC-1295 + Ipamorelin Price UK: Full Comparison",
    description:
      "CJC-1295 + Ipamorelin price UK — a full side-by-side table of every UK supplier we track, with pack sizes, stock status, price and TrustScore in a single view.",
    h1: "CJC-1295 + Ipamorelin Price UK",
    focusKeyword: "cjc-1295 ipamorelin price uk",
    intro: [
      "This page answers one question: CJC-1295 + Ipamorelin price UK, right now, across every supplier we track. The cjc-1295 ipamorelin price uk figure that matters is not one number but the full distribution, because pack size moves the unit cost more than any supplier's margin does. It is the full comparison view — every listing we track, every pack size, sorted by price, with no filtering on quality or stock so that you can see the entire shape of the market rather than a curated slice of it.",
      "The spread across UK suppliers is wide, and not only because pack sizes differ. The same nominal 10mg+10mg blend varies materially between suppliers, and a handful of listings sit far above the market median because they bundle shipping, solvent or ancillary items into the unit price. Sorting by price alone will surface those bundles at the bottom rather than the top, which is worth knowing before you conclude anything from the extremes.",
      "For context on the underlying chemistry: the blend combines a modified GRF(1-29) analogue with a selective GHSR-1a agonist. Both act on the growth hormone axis through different receptors, which is why the combination appears together in research catalogues. Its price position in the market reflects demand rather than novelty — the individual components have both been commercially available for years.",
      "Everything here is presented for laboratory and educational reference only. Neither compound is a licensed medicine in the UK and nothing on this page is medical guidance. Mechanism and reference data live on the [**CJC-1295 + Ipamorelin research hub**](/compounds/cjc-1295-ipamorelin-blend).",
    ],
    sections: [
      {
        title: "The price bands, in plain terms",
        body:
          "The UK blend market clusters into three rough bands. The floor band is dominated by small single-vial listings, often 5mg+5mg, where the seller is competing purely on headline price. The middle band is where most established UK suppliers sit, typically 10mg+10mg vials with a published certificate. The top band is either genuine premium — reference-standard grade, full analytical package — or a listing with bundled extras. Bands are approximate and move with supplier pricing, which is why the table is regenerated weekly rather than written into this page.",
        table: {
          header: ["Band", "Typical pack", "What distinguishes it"],
          rows: [
            ["Floor", "5mg+5mg single vial", "Lowest headline price, certificate often absent"],
            ["Middle", "10mg+10mg vial", "Published COA, UK address, established trading history"],
            ["Premium", "Any pack, documented", "Reference grade or bundled solvent and shipping"],
          ],
        },
      },
      {
        title: "Why two suppliers quote different prices for the same pack",
        body:
          "Every supplier buys from a different synthesis source, fills in different batch sizes, and carries different overheads. Shipping is the largest single variable: a supplier offering free tracked delivery has already priced it in, while a supplier charging a flat fee shows a lower unit price but a higher checkout total. Card processing fees, cold-chain packaging and the cost of third-party analysis also land in the unit price for anyone paying for them.",
        list: [
          "Free shipping versus flat-fee shipping — compare the checkout total, not the unit price.",
          "Forced-bundle listings that include solvent or ancillary items.",
          "Certificate cost — third-party analysis per batch is real money and shows in the price.",
          "Pack size — a 10mg+10mg vial is not twice a 5mg+5mg vial in cost.",
        ],
      },
      {
        title: "Reading the full table correctly",
        body:
          "The table is sorted by price ascending and shows each row's trust score where we have computed one. A row with a low price and a high trust score is the interesting case; a row with a low price and no trust score is the one to inspect manually. Rows are per price listing, so a supplier with three pack sizes appears three times — that is deliberate, because suppliers frequently price one size aggressively and the others at a premium.",
      },
      {
        title: "What drives price movement over time",
        body:
          "Blend prices in the UK have generally drifted downward as more suppliers entered, but the movement is lumpy rather than smooth. A supplier restocking at a better rate will reprice within weeks; a supplier that has stopped updating its shop will hold an old price that is either far above or far below the market. Both look the same in a table, which is why the stock and liveness columns matter as much as the number.",
      },
      {
        title: "The per-milligram view",
        body:
          "Price alone ranks pack sizes rather than value. If you want the ranking that normalises pack size away, the [**cheapest per-mg page**](/compound-guides/cheapest-cjc-1295-ipamorelin-uk) divides each price by total vial content and sorts on that. The two tables will not agree at the top, and that difference is the whole point of having both.",
      },
      {
        title: "Comparing against single-agent pricing",
        body:
          "A blend competes with its own components. CJC-1295 is listed across the market from roughly the mid-teens per vial upward depending on pack size, and Ipamorelin from a similar floor. Whether the blend is better value depends on the ratio you need and the pack size you buy; the [**CJC-1295 price page**](/compound-guides/cjc-1295-price-uk) and the [**Ipamorelin price page**](/compound-guides/ipamorelin-price-uk) give the single-agent side of that comparison.",
      },
      {
        title: "Reading the spread rather than the average",
        body:
          "An average price across a blend market is close to meaningless, because it mixes three different pack sizes and at least two quality tiers. The more useful measure is the spread between the fifth and fifth-from-last listings: that interquartile range describes where the market genuinely trades and is not distorted by a single premium listing or a single loss-leader. If the spread is narrow, price is competitive and you should choose on documentation. If the spread is wide, the market is confused about what the product is, and pack-size normalisation becomes essential before any comparison is made.",
      },
      {
        title: "Premium listings — what the extra money is actually buying",
        body:
          "A listing priced well above the middle band is usually one of three things: reference-grade material with a full analytical package including amino acid analysis, a bundle that includes bacteriostatic water and shipping in one figure, or a small operation with no scale that has priced itself out of the market without noticing. The first is a legitimate premium for work that depends on the material being what the label says to tight tolerance. The second is a packaging choice you can usually undo by buying the components separately. The third is neither, and shows up as a listing that has not been repriced in a long time.",
      },
      {
        title: "Why the cheapest band is thin on documentation",
        body:
          "Third-party analysis per batch costs real money, and a supplier competing at the floor of the market has to either absorb that cost or skip it. Most skip it, or publish a single analysis reused across many batches. That is not always dishonesty — some low-cost sellers do test and simply run thin margins — but it does mean the floor band should be inspected rather than trusted. The middle band is where published per-batch data becomes the norm, and that is the reason most of the market's volume sits there rather than at either extreme.",
      },
      {
        title: "How to use this table if you are comparing across suppliers you already know",
        body:
          "If you have shortlisted two or three suppliers, ignore the ranking and compare only their rows for the pack size you intend to buy. Look at the price, the trust score and the stock flag in the same row rather than across different rows. A supplier that is third in the table overall can be first for the specific 10mg+10mg pack, because suppliers frequently price one size aggressively and the rest defensively. The table repeats a supplier per pack size for exactly this reason.",
      },
    ],
    faq: [
      {
        question: "What is a typical CJC-1295 + Ipamorelin price in the UK?",
        answer:
          "Typical UK pricing for a 10mg+10mg blend sits in the middle band of the table above, with entry 5mg+5mg vials materially cheaper and documented premium listings higher. Quoting a single figure would be misleading because pack size drives most of the variance — use the live table.",
      },
      {
        question: "Why is one supplier's price three times another's for the same pack?",
        answer:
          "Bundled shipping or solvent, reference-grade material, forced ancillaries, or simply a stale listing that has not been repriced. Check the checkout total and the certificate before concluding that the higher price buys more.",
      },
      {
        question: "Does the price include shipping?",
        answer:
          "It varies by supplier. Some include tracked UK delivery in the listing price and some add a flat fee at checkout. The table shows the unit price only, so add the stated shipping charge before comparing across suppliers.",
      },
      {
        question: "Are prices in the table live?",
        answer:
          "They are refreshed from suppliers' own listing pages by a weekly scrape, so they are a recent snapshot rather than a real-time quote. Prices can change between the scrape and your visit, and the product page is always the authoritative figure.",
      },
    ],
    sources: [
      {
        label:
          "Ipamorelin, the first selective growth hormone secretagogue (Eur J Endocrinol, 1998)",
        url: "https://pubmed.ncbi.nlm.nih.gov/9849822/",
      },
      {
        label:
          "Prolonged stimulation of GH and IGF-I secretion by CJC-1295, a long-acting heat-stable analog of GH-releasing hormone (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
    ],
    tableMode: "full",
    tableHeading: "CJC-1295 + Ipamorelin Price UK — Every Listing",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-cjc-1295-ipamorelin-online-uk",
    title: "Buy CJC-1295 + Ipamorelin Online UK: Ordering Guide",
    description:
      "Buy CJC-1295 + Ipamorelin online UK — how ordering works at UK research suppliers, what payment methods to expect and how quickly a blend vial then arrives.",
    h1: "Buy CJC-1295 + Ipamorelin Online UK",
    focusKeyword: "buy cjc-1295 ipamorelin online uk",
    intro: [
      "If you want to buy CJC-1295 + Ipamorelin online UK suppliers make the purchase itself trivial — but to buy cjc-1295 ipamorelin online uk safely is a different exercise from completing a card form. A shipping address and a confirmation email tell you nothing about what is in the vial. The parts that require attention are the ones no checkout page explains: what the vial label means, what should arrive with it, and what you should do when it does. This page covers the ordering process end to end.",
      "The blend is one of the most commonly stocked research products in the UK market, which cuts both ways. Choice is wide and prices are competitive, but the same popularity means a large number of storefronts that rank well and document nothing. A listing being findable is not evidence of anything except an SEO budget.",
      "The two components are well characterised individually — Ipamorelin as a selective GHSR-1a agonist, CJC-1295 as an albumin-binding GRF analogue with a substantially extended plasma half-life — and neither fact is a substitute for batch-level analysis of the vial in front of you. The ordering guide below is about the transaction, not the pharmacology.",
      "Everything here is presented for laboratory and educational reference only. Neither compound is a licensed medicine in the UK and nothing on this page is medical guidance. For the compound's research profile, see the [**CJC-1295 + Ipamorelin research hub**](/compounds/cjc-1295-ipamorelin-blend).",
    ],
    sections: [
      {
        title: "What to check on the product page before you click buy",
        body:
          "Four things should be visible on the listing itself, not buried in a footer. If any of them is missing, that is a signal rather than an inconvenience. The strongest single indicator is a batch-referenced certificate: a generic purity claim on a product page is marketing copy, while a certificate naming a batch number and a testing laboratory is evidence attached to a specific lot of material.",
        list: [
          "Both components named, with the ratio and whether the mass figure is per component or combined.",
          "A Certificate of Analysis link that resolves to a real document with a batch number.",
          "Research-use-only framing on the listing itself — no dosing or human-use guidance.",
          "A stated delivery window and a shipping charge you can see before checkout.",
        ],
      },
      {
        title: "Payment methods you should expect to see",
        body:
          "UK research suppliers typically accept debit and credit cards, and many now offer bank transfer or faster payments. Card payment gives you a chargeback route that bank transfer does not, which matters more in this market than in most. A supplier that accepts only cryptocurrency or bank transfer, with no card route and no company number, is asking you to accept all of the counterparty risk. That is a legitimate choice for some buyers and a red flag for most.",
      },
      {
        title: "What arrives, and what should be inside the box",
        body:
          "A lyophilised blend ships as a sealed glass vial containing a powder cake, normally inside protective packaging with a desiccant. Expect the vial label to state both components, the mass of each, and a batch number that matches the certificate published on the supplier's site. If the batch number on the vial does not match the certificate you can find online, stop there — that is the one check that separates a documented supplier from a plausible-looking one.",
        table: {
          header: ["Item", "What to verify"],
          rows: [
            ["Vial label", "Both components named, mass per component, batch number"],
            ["Certificate", "Same batch number, testing lab named, purity per component"],
            ["Packaging", "Sealed vial, desiccant present, no damage to the crimp"],
            ["Powder cake", "Intact plug; excessive shrinkage or discoloration warrants a query"],
          ],
        },
      },
      {
        title: "Delivery timescales in practice",
        body:
          "In-stock UK-listed items typically dispatch within one working day and arrive in one to three working days. Royal Mail Tracked 24 and 48 are the common services, with courier options on higher-value orders. Overseas sellers ranking for UK terms quote seven to twenty-one days plus customs handling. For a lyophilised product the transit time matters less than the temperature history during it, and a customs hold is the worst case because it is both long and uncontrolled.",
      },
      {
        title: "Handling on arrival",
        body:
          "Lyophilised peptide is comparatively robust at ambient temperature for short periods but should be stored refrigerated for anything beyond immediate use, and protected from light. Reconstituted material has a much shorter working life and is normally held refrigerated. These are general laboratory handling notes, not instructions for use; the certificate and the supplier's own documentation are the relevant references for your work.",
      },
      {
        title: "What to do if the order goes wrong",
        body:
          "Blend orders fail in predictable ways: wrong pack size, a single-agent vial sent instead of a blend, a missing certificate, or damage in transit. Because blends are mislabelled more often than single agents, photograph the vial label and the batch number on arrival — that is the evidence a supplier will ask for, and having it makes a replacement straightforward. Paying by card preserves a dispute route if the supplier stops responding.",
      },
      {
        title: "The checkout flow, step by step",
        body:
          "A typical UK research supplier checkout runs in four steps: basket with pack selection, delivery address and shipping method, payment, and confirmation. The two places mistakes happen are pack selection, where a dropdown labelled by total mass can hide the ratio, and shipping method, where the cheapest option may drop tracking. Choose tracked delivery for anything over two vials — an untracked parcel that goes missing is unresolvable after the fact, and the supplier will ask for a tracking reference you cannot supply. Keep the confirmation email; the order number is what you will quote if the batch certificate needs matching later.",
      },
      {
        title: "What payment protection actually covers",
        body:
          "Card payments in the UK carry chargeback rights through the card issuer, and purchases above the relevant threshold can fall under Section 75 protection where the supplier takes payment as part of a regulated credit agreement. In practice chargeback is the route that matters: if a supplier takes payment and does not deliver, or delivers something materially different from the description, the card issuer can reverse the transaction. Bank transfer and cryptocurrency carry no such route. That is the entire practical difference between payment methods in this market, and it is worth more than any discount a supplier offers for bank transfer.",
      },
      {
        title: "Ordering more than one pack size at once",
        body:
          "If you need two pack sizes, buying both in one order usually reduces total shipping and keeps the batch numbers adjacent, which makes record-keeping simpler. It also concentrates risk in a single parcel. For blends specifically, ordering two of the same pack size from one batch is safer than ordering two different sizes if the smaller size is a different fill run — the certificates will not match and your records become harder to reconcile. Check whether the supplier states batch numbers before dispatch; most do on request.",
      },
      {
        title: "What a good supplier confirmation email contains",
        body:
          "Beyond the order number, a well-run supplier confirms the exact pack and ratio, the batch number assigned, and the dispatch service. If the confirmation email states only a price and a product name, the batch number is something you will have to request after arrival. That is not a reason to cancel, but it is the point at which to send the certificate request, because matching a batch after the vial is in your hand is easier than reconstructing it weeks later when the supplier has restocked.",
      },
    ],
    faq: [
      {
        question: "Can I buy CJC-1295 + Ipamorelin online in the UK with a debit card?",
        answer:
          "Most UK research suppliers accept debit and credit cards. Card payment also gives you a chargeback route if an order fails, which bank transfer does not — worth weighing if you are buying from a supplier you have not used before.",
      },
      {
        question: "How long does UK delivery take for a blend vial?",
        answer:
          "In-stock items from UK-based suppliers typically arrive in one to three working days, usually by Royal Mail Tracked. Orders from overseas sellers quoting UK delivery take seven to twenty-one days and may be subject to customs handling.",
      },
      {
        question: "What should the vial label say on a CJC-1295 + Ipamorelin blend?",
        answer:
          "Both component names, the mass of each, and a batch number that matches the Certificate of Analysis published on the supplier's site. A label showing only a combined mass, or no batch number at all, makes verification impossible.",
      },
      {
        question: "Do I need to pay for cold-chain shipping?",
        answer:
          "Lyophilised peptide does not require cold-chain shipping for short UK transit, and most suppliers ship at ambient with protective packaging. Reconstituted material is different and is normally held refrigerated. Check what the supplier states rather than assuming.",
      },
    ],
    sources: [
      {
        label:
          "Ipamorelin, the first selective growth hormone secretagogue (Eur J Endocrinol, 1998)",
        url: "https://pubmed.ncbi.nlm.nih.gov/9849822/",
      },
      {
        label:
          "Sustained GH and IGF-I responses to CJC-1295 in healthy adults: a randomized, placebo-controlled study (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/17018654/",
      },
    ],
    tableMode: "price",
    tableHeading: "Buy CJC-1295 + Ipamorelin Online UK — Live Listings",
    rowLimit: 20,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "cjc-1295-ipamorelin-supplier-uk",
    title: "CJC-1295 + Ipamorelin Supplier UK: How to Verify One",
    description:
      "CJC-1295 + Ipamorelin supplier UK — how to verify a UK vendor's Certificates of Analysis, live stock claims and TrustScore before you ever commit to an order.",
    h1: "CJC-1295 + Ipamorelin Supplier UK",
    focusKeyword: "cjc-1295 ipamorelin supplier uk",
    intro: [
      "Choosing a CJC-1295 + Ipamorelin supplier UK buyers can actually verify is a different exercise from finding the cheapest listing. The cjc-1295 ipamorelin supplier uk question is stricter for a blend than for any single compound, because one certificate has to cover two identities. A certificate that reports one purity figure cannot establish that two substances are both present, both as declared, and in the stated ratio. Verification has to be designed around that fact.",
      "This page sets out the checks in the order they should be applied — cheapest to run first, because most suppliers fail early and there is no point paying for an assay on a vendor whose company number does not exist. The live table below shows every supplier we track for the blend alongside the trust score we compute from public signals.",
      "The components themselves are not obscure. Ipamorelin has a well-established selectivity profile at GHSR-1a, and CJC-1295's albumin-binding linker was designed and characterised to extend growth hormone and IGF-I responses well beyond unmodified GRF. A supplier that cannot answer basic identity questions about a blend of two well-documented peptides is telling you something about its quality control, not about the difficulty of the chemistry.",
      "Everything here is presented for laboratory and educational reference only. Neither compound is a licensed medicine in the UK and nothing on this page is medical guidance. For research background, see the [**CJC-1295 + Ipamorelin research hub**](/compounds/cjc-1295-ipamorelin-blend).",
    ],
    sections: [
      {
        title: "Check 1 — does the company exist in the UK",
        body:
          "A company number or registered address that resolves on Companies House is a two-minute check that eliminates a large share of the market. A trading name with no registered entity behind it is not automatically fraudulent, but it does mean there is no legal person to pursue if an order fails. A supplier trading for two years with filed accounts is a materially different counterparty from one that appeared last quarter.",
      },
      {
        title: "Check 2 — is the certificate batch-linked and does it cover both components",
        body:
          "This is the check that most separates suppliers. A valid certificate for a blend should name the testing laboratory, carry a batch number that matches the vial, and report purity per component — or at minimum a mass-spectrometry confirmation showing both expected masses. A one-line purity percentage with no batch number and no laboratory name is not a certificate; it is a graphic.",
        list: [
          "Testing laboratory named and independently identifiable.",
          "Batch number that matches the vial you receive.",
          "Purity reported per component, not as a single blended figure.",
          "Mass spectrometry or HPLC trace, not just a stated percentage.",
          "A date, so you can tell whether the analysis predates the current stock.",
        ],
      },
      {
        title: "Check 3 — does the listing survive a contact test",
        body:
          "Send one specific, answerable question before ordering — for example, asking for the certificate for the current batch of the pack size you intend to buy. A supplier that answers with the document has cleared the hardest hurdle. One that answers vaguely, or not at all, has told you what post-sale support will look like. This costs nothing and takes one email.",
      },
      {
        title: "Check 4 — is the stock claim real",
        body:
          "Stock flags in directories are a snapshot. Suppliers frequently leave items listed as in stock after they have sold out, especially on popular blends. The consequence is a delay rather than a loss, but it is worth knowing whether your supplier updates stock or waits for the backorder complaint. A supplier whose site shows a live stock figure per pack is more likely to be accurate than one that shows a green badge on everything.",
      },
      {
        title: "What the TrustScore actually measures",
        body:
          "The score in the table is computed from public, checkable signals: whether the site is live and returns a normal status, whether a certificate page exists, whether research-use-only framing is present, whether there is a review mechanism, stated shipping terms, a contact route, and a real page title. It measures documentation and liveness. It does not measure purity, and a high score is not a purity claim — no directory can make that claim honestly.",
        table: {
          header: ["Signal", "Weight", "What it proves"],
          rows: [
            ["Site live and responding", "15", "The supplier is trading today"],
            ["Certificate page exists", "25", "Documentation is published at all"],
            ["Research-use-only framing", "5", "Listing does not make therapeutic claims"],
            ["Contact route present", "10", "There is a channel to raise a problem"],
            ["Shipping terms stated", "5", "Delivery expectations are declared"],
            ["Review mechanism", "10", "Feedback is exposed, not hidden"],
          ],
        },
      },
      {
        title: "The order to run the checks in",
        body:
          "Company registration first, certificate second, contact test third, stock fourth. That order is deliberate: the first two eliminate most of the market in under five minutes, and the contact test only becomes worth your time for suppliers that cleared both. Running them in reverse wastes effort on vendors that were never viable.",
      },
      {
        title: "Why blends attract weaker suppliers",
        body:
          "A blend is harder to falsify convincingly and harder to verify, and both facts push in the same direction. The seller knows a buyer has less ability to check two components than one, and a buyer who cannot check tends to shop on price. That combination produces a market segment with more undocumented listings than the single-agent segment by a visible margin. It does not mean every blend listing is suspect — several reputable UK suppliers stock blends as a convenience product — but it does mean the base rate of documentation is lower, and the verification checks matter proportionally more.",
      },
      {
        title: "The questions a real supplier can answer without looking anything up",
        body:
          "Two questions separate a supplier that knows its product from one that resells a catalogue. First, which form of CJC-1295 is in the blend — with DAC or without — and second, what the label mass means per component. A supplier whose staff can answer both immediately is operating its own purchasing, or at least has a technical relationship with whoever does. A supplier that redirects both questions to a generic contact form is passing through material it has not examined. Neither answer is proof of quality, but the inability to answer is a strong signal about how the rest of the operation runs.",
      },
      {
        title: "Batch traceability after restocking",
        body:
          "Suppliers restock frequently, and a certificate published today may describe a batch that sold out last month. The check that matters is not whether a certificate exists on the site, but whether the certificate you receive matches the vial in your hand. Suppliers that publish a certificate per batch, with the batch number visible on the product page before purchase, are the ones for whom this check is operable. Suppliers that publish one undated analysis reused across the whole product line have made the check impossible, which is itself the finding.",
      },
      {
        title: "What complaints look like when they are real",
        body:
          "Legitimate complaints in this market are specific: a batch number that does not match, a label that omits the ratio, a vial that arrived with a broken crimp, an order that never shipped. They are resolvable and usually resolved quickly. The complaints that indicate a deeper problem are vague and repeated across many buyers over months, with no supplier response. Reading a handful of recent third-party reviews is worth ten minutes, provided you weight specific complaints over generic praise, and provided you treat a wall of uniformly glowing reviews on a young site as the absence of signal rather than evidence of quality.",
      },
    ],
    faq: [
      {
        question: "How do I verify a CJC-1295 + Ipamorelin supplier in the UK?",
        answer:
          "In order: confirm a Companies House registration, check that the Certificate of Analysis names a testing laboratory and a batch number matching the vial with purity per component, send one specific question to the contact address and see if you get a document back, and confirm the stock claim for the pack size you want.",
      },
      {
        question: "What should a blend Certificate of Analysis contain?",
        answer:
          "The testing laboratory identity, the batch number, the date, purity reported for each component rather than as one blended figure, and the analytical method or trace. A single purity percentage with no batch reference cannot be tied to the vial you receive.",
      },
      {
        question: "Does a high TrustScore guarantee the purity of the peptide?",
        answer:
          "No. The score measures documentation and liveness — whether a certificate is published, whether the site is trading, whether terms are stated. It is a shortlisting signal. Purity can only be established from batch-level analysis of the material itself.",
      },
      {
        question: "Is a supplier with no UK company registration necessarily a problem?",
        answer:
          "Not necessarily fraudulent, but it removes your practical recourse if an order fails, and it makes the traceability of the material unknowable. For a blend, where mislabelling is the common failure mode, that is a significant gap.",
      },
      {
        question: "What if the batch number on my vial does not match the certificate?",
        answer:
          "Query it with the supplier before using the material and keep photographs. A mismatch means the certificate you relied on does not describe the vial you received, which is the single most important verification failure to catch.",
      },
    ],
    sources: [
      {
        label:
          "Ipamorelin, the first selective growth hormone secretagogue (Eur J Endocrinol, 1998)",
        url: "https://pubmed.ncbi.nlm.nih.gov/9849822/",
      },
      {
        label:
          "Prolonged stimulation of GH and IGF-I secretion by CJC-1295, a long-acting heat-stable analog of GH-releasing hormone (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
    ],
    tableMode: "trust",
    tableHeading: "CJC-1295 + Ipamorelin Supplier UK — Ranked by TrustScore",
    rowLimit: 25,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-cjc-1295-ipamorelin-peptide",
    title: "Best CJC-1295 + Ipamorelin Peptide UK: Ranked 2026",
    description:
      "Best CJC-1295 + Ipamorelin peptide for UK researchers — ranked by independent TrustScore, published purity verification and price per milligram of content.",
    h1: "Best CJC-1295 + Ipamorelin Peptide",
    focusKeyword: "best cjc-1295 ipamorelin peptide",
    intro: [
      "The question of which is the best CJC-1295 + Ipamorelin peptide has no single answer, because best depends on whether you weight documentation, price or pack size. Searching for the best cjc-1295 ipamorelin peptide in the UK returns a list sorted by visibility; what follows is sorted by evidence. What can be answered honestly is which suppliers do the things a verification-minded buyer needs — publish batch-linked analysis, keep a live and traceable UK presence, and price transparently per pack. The ranking below is built on that, not on opinion.",
      "Blends are a specific case in this market. Because the two components are co-lyophilised into one vial, the analytical bar is higher than for a single agent and the failure modes are more varied, yet blends attract some of the least documented sellers precisely because they are hard to audit. A ranking that stopped at price would put those sellers at the top.",
      "Both components have credible published literature. Ipamorelin was characterised as a selective growth hormone secretagogue with a distinctly cleaner profile at GHSR-1a than earlier GHRP generation compounds, and CJC-1295's albumin-binding modification was shown to sustain growth hormone and IGF-I responses far beyond unmodified GRF. That literature is why researchers look for the blend — and why the material has to be verified rather than assumed.",
      "Everything here is presented for laboratory and educational reference only. Neither compound is a licensed medicine in the UK and nothing on this page is medical guidance. For sequence, mechanism and reference data, see the [**CJC-1295 + Ipamorelin research hub**](/compounds/cjc-1295-ipamorelin-blend).",
    ],
    sections: [
      {
        title: "How this ranking is built",
        body:
          "Suppliers are ordered by a computed TrustScore, then by price for ties. The score rewards published documentation and penalises dark or undocumented sites; it is not a purity measurement and we do not present it as one. Verified suppliers — those in our verified set — sort above unverified ones regardless of score, so a documented supplier with an average score will outrank an undocumented one with a good site.",
      },
      {
        title: "What separates the genuinely best from the merely popular",
        body:
          "Popularity in this market is mostly a function of search visibility and forum repetition. The signals that actually correlate with a usable product are narrower: a certificate you can tie to your vial, a laboratory you can identify, a date on the analysis, and a supplier that responds when something is wrong. None of those correlate reliably with how often a brand is mentioned.",
        list: [
          "Batch-linked analysis with an identifiable laboratory and a date.",
          "Purity reported per component rather than as one blended figure.",
          "A live UK presence with a resolvable company registration.",
          "A supplier that answers a specific technical question in writing.",
        ],
      },
      {
        title: "Price versus documentation — the real trade-off",
        body:
          "The cheapest listing and the best-documented listing are rarely the same supplier. In practice the premium for documentation is modest at the pack sizes most researchers buy, and it buys the ability to cite your material in a write-up. If the material is for anything beyond general handling, paying the mid-market price from a documented supplier is usually the lower-cost decision in total, because unusable material at any price is a complete loss.",
      },
      {
        title: "Why blend ratios matter more than brand",
        body:
          "A 1:1 blend from one supplier and a 1:1 blend from another are directly comparable only if both actually contain a 1:1 ratio. The certificate is what establishes that. Where a supplier publishes per-component mass, the listing is auditable; where it publishes a combined figure only, it is not, regardless of the brand name on the vial.",
      },
      {
        title: "When the blend is not the right purchase at all",
        body:
          "If your design needs a fixed ratio and a single vial is convenient, the blend is the better buy. If you need to vary one component while holding the other, or you only need one of the two, the single agents are the correct purchase — see the [**CJC-1295 guide set**](/compound-guides/where-to-buy-cjc-1295-uk) and the [**Ipamorelin guide set**](/compound-guides/where-to-buy-ipamorelin-uk). Buying a blend you cannot fully use is more expensive per usable milligram than buying what you actually need.",
      },
      {
        title: "The practical conclusion",
        body:
          "Rank the shortlist by documentation first, then by price per milligram from the [**cheapest per-mg view**](/compound-guides/cheapest-cjc-1295-ipamorelin-uk), then confirm the current batch certificate before ordering. That sequence produces a supplier you can defend, which is the only sense in which best is meaningful here.",
      },
      {
        title: "What the literature does and does not tell you about the pairing",
        body:
          "The case for the pairing rests on two separate mechanisms rather than one. Ipamorelin is a selective agonist at the ghrelin receptor GHSR-1a, and its early characterisation was notable for a cleaner profile than earlier growth hormone secretagogues, with less stimulation of ACTH and cortisol. CJC-1295 acts upstream through the GHRH receptor on the GRF(1-29) backbone, and its albumin-binding linker was designed to extend exposure well beyond unmodified GRF. Acting at both a GHRH receptor and a ghrelin receptor is the reason the combination appears in research catalogues. None of that literature speaks to the purity of any particular vial, and a strong mechanistic rationale is often used to sell weak material.",
      },
      {
        title: "The three product tiers you will actually encounter",
        body:
          "UK listings for the blend fall into three practical tiers. The research tier is a 5mg+5mg or 10mg+10mg vial with a per-batch certificate and a UK registered supplier — the default purchase. The reference tier adds a full analytical package, quantitative HPLC, mass spectrometry with observed and theoretical masses, and sometimes amino acid analysis, at a premium that is worth paying only if your work depends on tight tolerance. The convenience tier bundles the blend with solvent and accessories, which is convenient and usually the most expensive way to buy each component. Knowing which tier a listing belongs to takes one look at its certificate page.",
      },
      {
        title: "Why brand recognition is a weak signal in this market",
        body:
          "Peptide suppliers have short lifespans and high churn. A brand that is well known today may be a different legal entity trading under the same name next year, and a brand nobody has heard of may be the most rigorous operator in the segment. Reputation built on forum mentions decays quickly and is easy to manufacture. What does not decay is a certificate with a date, a laboratory name and a batch number, and a company that has been filing accounts for several years. Those two things travel with the supplier; the brand name does not.",
      },
      {
        title: "The decision rule that survives all of this",
        body:
          "If you cannot tie a certificate to a batch, do not buy — regardless of brand, price or how many people recommended it. If you can, then choose on price per milligram of the pack size you actually need, from the [**per-mg table**](/compound-guides/cheapest-cjc-1295-ipamorelin-uk). That rule is deliberately blunt because the alternative — weighing reputation, reviews and brand familiarity — is built on signals that are cheap to fake and expensive to verify, whereas a batch number is neither.",
      },
    ],
    faq: [
      {
        question: "What is the best CJC-1295 + Ipamorelin blend in the UK?",
        answer:
          "The table above ranks UK suppliers by computed TrustScore, which weights published documentation, a live site and stated terms, then price. Because best depends on whether you weight documentation or price, the ranking is a shortlist rather than a verdict — confirm the current batch certificate before ordering.",
      },
      {
        question: "Is a 1:1 blend better than separate vials?",
        answer:
          "A 1:1 blend is convenient and usually cheaper per milligram of total content, but it fixes the ratio. If your work needs an uneven ratio or only one of the components, separate vials are the better purchase.",
      },
      {
        question: "Does a higher price mean higher purity?",
        answer:
          "Not reliably. Price reflects packaging, shipping, marketing and margin as much as material quality. Purity is established by batch analysis, and the only price-related signal worth using is whether a supplier charges enough to be paying for third-party testing.",
      },
      {
        question: "How do I confirm the ratio before I buy?",
        answer:
          "The product page should state the mass of each component, and the Certificate of Analysis should show per-component purity. If the listing shows only a combined mass, ask for the per-component figures in writing before ordering.",
      },
    ],
    sources: [
      {
        label:
          "Ipamorelin, the first selective growth hormone secretagogue (Eur J Endocrinol, 1998)",
        url: "https://pubmed.ncbi.nlm.nih.gov/9849822/",
      },
      {
        label:
          "Prolonged stimulation of GH and IGF-I secretion by CJC-1295, a long-acting heat-stable analog of GH-releasing hormone (JCEM, 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
    ],
    tableMode: "trust",
    tableHeading: "Best CJC-1295 + Ipamorelin Peptide UK — Ranked by TrustScore",
    rowLimit: 20,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
