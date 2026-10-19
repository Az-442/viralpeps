/**
 * SS-31 (elamipretide) silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/ss-31-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — autocomplete evidence pulled live from Google UK (2026-10-19):
 *   1. where-to-buy-ss-31-uk     → `where to buy ss-31 uk` = 0 UK hits → substituted
 *                                   `where can i buy ss-31` (exact #1, also `where can i buy ss-31 peptide`)
 *   2. cheapest-ss-31-uk         → `cheapest ss-31 uk` = 0 → substituted `ss 31 best price` / `ss 31 peptide best price`
 *   3. ss-31-price-comparison-uk → `ss-31 price comparison uk` = 0 → substituted `ss 31 price` (exact #1,
 *                                   also `ss 31 peptide price`, `ss 31 50mg price`, `ss 31 10mg price`)
 *   4. buy-ss-31-online-uk       → `buy ss-31 online uk` = 0 → substituted `buy ss 31 peptide uk` (exact #1,
 *                                   also `buy ss 31 uk`, `ss 31 peptide buy uk`)
 *   5. ss-31-for-sale-uk         → `ss-31 uk supplier` = 0 (also `ss-31 uk suppliers`) → substituted
 *                                   `ss 31 peptide for sale` (exact #1) → UK form `ss 31 peptide buy uk`
 *   6. best-ss-31-peptide        → exact match #1 (`best ss 31 peptide`) — passed
 *
 * Note: `ss-31` autocompletes in the spaced form (`ss 31`) for most modifiers; both
 * forms were harvested. Elamipretide probes (`elamipretide uk`, `elamipretide buy uk`)
 * corroborate buyer intent.
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
    slug: "where-to-buy-ss-31-uk",
    title: "Where to Buy SS-31 UK: Verified Suppliers Compared",
    description:
      "Where to buy SS-31 UK — compare live prices from every UK research supplier we track, then check the COA, stated purity, stock and shipping before you order.",
    h1: "Where to Buy SS-31 UK",
    focusKeyword: "where to buy ss-31 uk",
    intro: [
      "Searching for where to buy SS-31 UK puts you in front of one of the more confusing corners of the British research-peptide market, because SS-31 is a compound that travels under at least three names. SS-31 is the original laboratory designation for a four-amino-acid mitochondria-targeting peptide; elamipretide is the international non-proprietary name it was given when it entered clinical development; and it also appears in older literature under the trade names Bendavia and MTP-131. A UK supplier may list any one of those names, or all of them, for the same molecule — a tetrapeptide with the sequence D-Arg-dimethylTyr-Lys-Phe-NH2 that accumulates inside mitochondria and binds cardiolipin on the inner membrane.",
      "That naming sprawl matters when you are trying to buy, because it fragments the market in ways a simple product search cannot show you. Listings that look like separate compounds are frequently the same material, and listings that look identical may be selling very different things: a lyophilised research vial, a pre-mixed solution, a pen-format product, or a multi-vial kit. This page answers the buying question with evidence rather than adjectives: a live table of every UK supplier ViralPeps tracks for SS-31, showing the pack label, headline price, cost per milligram where the pack states one, stock status, verification state and a direct link to the supplier's own product page.",
      "SS-31's research pedigree is why it attracts both serious suppliers and opportunists. The peptide comes out of the Szeto-Schiller programme at Weill Cornell, where a series of cell-permeable tetrapeptides were screened for their ability to reach the mitochondrial inner membrane without needing a membrane potential. SS-31 was the lead candidate, and the resulting literature — ischaemia-reperfusion injury, cardiac energetics, kidney injury, skeletal muscle ageing, ophthalmic disease and, most recently, rare mitochondrial disease — is substantial and genuinely referenced (see the sources at the foot of this page). A compound with real papers, a real clinical programme and a name most buyers cannot easily verify is exactly the profile counterfeit listings target.",
      "Everything on this page is presented for laboratory and educational reference. SS-31 is sold by UK research suppliers as a research reagent under research-use-only terms; it is not a licensed medicine in the UK and is not authorised for human use. Even though elamipretide has been through clinical trials and received accelerated approval in the United States for Barth syndrome, that approval does not translate into a consumer product, and a research vial is not the same article as a regulated drug. If you are auditing the market rather than buying today, start with the [**SS-31 price comparison hub →**](/compounds/ss-31).",
    ],
    sections: [
      {
        title: "Where to Buy SS-31 UK — What Actually Matters",
        body: "The phrase \"where to buy\" hides a more useful question: which supplier can you verify? SS-31 is unusually exposed on this front for two reasons. First, the multi-name problem means a listing can be titled \"elamipretide\" while another titles the identical molecule \"SS-31\", and the two will not surface together in a search. Second, the peptide has a genuine pharmaceutical halo because of its clinical development, and that halo is easy to borrow: a storefront that leans on trial language while publishing no batch documentation is telling you something about how it operates.\n\nWhen we audit UK suppliers we apply an identical checklist every time. A Certificate of Analysis from a named laboratory referencing a specific batch. A contact route that genuinely replies to a question. Unambiguous research-use-only labelling. A registered business identity behind the storefront. And confirmed control of the domain they sell from — which is exactly why the TrustScore badge exists: a supplier who installs it on their own site is proving they control that domain, ruling out the throwaway storefronts that characterise the lower end of this market.\n\nFor SS-31 specifically, one additional check matters more than it does for most peptides: does the listing state the actual quantity in milligrams? A meaningful share of UK SS-31 listings quote a price and a product name with no pack figure at all — sometimes because the source page is vague, sometimes because the vendor sells several pack sizes and has not broken them out. A listing that will not tell you how much material you are buying cannot be compared with one that will, and it should be treated as a question rather than a bargain.",
        list: [
          "A Certificate of Analysis from a named third-party laboratory referencing a specific batch number — the single most decisive signal available to a buyer.",
          "A working contact route: an email that replies or a phone that connects, tested before you order rather than after.",
          "Research-use-only labelling throughout, with no marketing implying human or medical use.",
          "A stated pack quantity in milligrams, so the listing can be compared honestly on cost per mg.",
          "Confirmed domain ownership, which is what the TrustScore badge verifies.",
        ],
      },
      {
        title: "How We Verify UK SS-31 Suppliers",
        body: "Every supplier in the table above has been checked against the same standard. We fetch their homepage and confirm it resolves, scan secondary pages for shipping, contact and compliance language, and look for a Certificate of Analysis either hosted on-site or linked from a testing laboratory. Suppliers that fail the basics are excluded rather than listed behind a caveat.\n\nThe process is deliberately conservative and narrower than the raw market. We would rather track fewer suppliers honestly than pad a table with storefronts nobody can verify. When a supplier you know of is absent, that is usually the reason: not an editorial judgement, but a simple absence of verifiable signals.\n\nWe also re-run those checks rather than treating verification as a one-off award. A supplier who published batch-linked COAs last quarter but has quietly stopped is a materially different proposition from one who has always published them, and the underlying data is refreshed rather than archived. The same discipline applies to stock: a listing recorded as available last month may have been out of stock for three weeks, which is why availability sits next to the price rather than in a footnote.",
        table: {
          header: ["Signal", "Why it matters"],
          rows: [
            ["Named-lab COA with batch number", "Proves the material was independently tested and traceable"],
            ["Working contact route", "A supplier you can reach is one you can resolve a problem with"],
            ["Full RUO labelling", "Shows compliance awareness; unlicensed human use is a legal risk"],
            ["Pack quantity stated", "Without milligrams a listing cannot be compared at all"],
            ["Domain ownership confirmed", "Rules out throwaway storefronts built to disappear"],
          ],
        },
      },
      {
        title: "What Affects the Price You Pay in the UK",
        body: "SS-31 pricing in the UK varies by roughly a factor of ten between the cheapest and most expensive listings we track, and the spread is not random. The clearest driver is pack size: SS-31 is most commonly sold as a 10mg lyophilised vial, with 50mg vials and occasional multi-vial kits at the top of the range. Because peptide synthesis is charged partly by the length and complexity of the sequence, and SS-31's dimethyltyrosine residue is a non-standard building block, the cost of goods does not fall away with scale as fast as it does for simpler molecules — but larger vials still carry a lower cost per milligram.\n\nVendor overhead is the second factor. A supplier running UK warehousing, commissioned lab testing, printed COAs and responsive support charges for that service. A bare-bones reseller drop-shipping from overseas does not, which is how a listing can appear dramatically cheaper while offering materially less. Note that a number of available SS-31 listings are bundles or kits rather than single vials; a kit price divided by a single vial's milligram figure will look catastrophically expensive, so read what the pack actually contains before drawing conclusions.\n\nStock status matters too, and it is the most commonly overlooked. A listing can show a competitive price and be permanently out of stock, which is why availability is recorded alongside price here rather than assumed. When SS-31 is genuinely held in UK inventory, delivery is typically a matter of days. When it is drop-shipped, the quoted window frequently slips and import handling becomes the buyer's problem.\n\nThe practical takeaway is to compare on a per-mg basis at the pack size you actually need, and to treat an unusually low price as a question rather than a bargain. If your research pairs SS-31 with the other mitochondrial peptide in this category, our [MOTS-c comparison hub](/compounds/mots-c) follows the same method, as does the [BPC-157 comparison hub](/compounds/bpc-157) for the repair-peptide field.",
      },
    ],
    faq: [
      {
        question: "Where can I buy SS-31 in the UK?",
        answer:
          "ViralPeps compares SS-31 listings from UK research-chemical suppliers, who sell the lyophilised peptide strictly for laboratory use under research-use-only terms. We list only suppliers whose verification signals — COA, contact, compliance and domain ownership — we can independently confirm, and the live table above shows every one we currently track.",
      },
      {
        question: "Is SS-31 the same as elamipretide?",
        answer:
          "Yes. SS-31 is the original laboratory designation for the peptide; elamipretide is the international non-proprietary name adopted for clinical development, and it has also appeared in the literature as Bendavia and MTP-131. The four-amino-acid sequence is the same. Suppliers list it under any of those names, which is one reason searching for a single term under-reports the market.",
      },
      {
        question: "Is SS-31 legal in the UK?",
        answer:
          "SS-31 is not a licensed medicine in the UK and is not authorised for human use or general retail sale as a drug. It is sold as a research reagent under research-use-only terms intended for laboratory and educational purposes. Its regulatory approval in another jurisdiction for a rare disease does not make a research vial a consumer product. We present this information for reference only.",
      },
      {
        question: "Why do SS-31 prices vary so much between UK suppliers?",
        answer:
          "Pack size is the main driver — a 50mg vial carries a much lower cost per milligram than a 10mg vial — followed by vendor overheads such as UK warehousing, commissioned testing, printed COAs and support. Some of the spread also reflects kits and multi-vial bundles being listed alongside single vials, which is why reading what the pack contains matters before comparing prices.",
      },
    ],
    sources: [
      { label: "Elamipretide: A Review of Its Structure, Mechanism of Action, and Therapeutic Potential (Int J Mol Sci 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39940712/" },
      { label: "Mitochondria-targeted peptide accelerates ATP recovery and reduces ischemic kidney injury (JASN 2011)", url: "https://pubmed.ncbi.nlm.nih.gov/21546574/" },
      { label: "Potent mitochondria-targeted peptides reduce myocardial infarction in rats (Coron Artery Dis 2007)", url: "https://pubmed.ncbi.nlm.nih.gov/17429296/" },
      { label: "Genome-wide CRISPR screen identifies phospholipid scramblase 3 as the biological target of SS-31 (JASN 2024)", url: "https://pubmed.ncbi.nlm.nih.gov/38530359/" },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy SS-31 UK — Live Supplier Prices",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-ss-31-uk",
    title: "Cheapest SS-31 UK: Lowest Price Per mg Compared",
    description:
      "Cheapest SS-31 UK — the lowest verified price per milligram from every UK supplier we track, ranked per mg rather than per vial so pack sizes compare honestly.",
    h1: "Cheapest SS-31 UK",
    focusKeyword: "cheapest ss-31 uk",
    intro: [
      "Finding the cheapest SS-31 UK listing is not the same as finding the best value, and the gap between the two is wider for this peptide than for most of the market we track. SS-31 is sold in 10mg and 50mg vials, in pens, in multi-vial kits and under at least three names — SS-31, elamipretide and MTP-131 — and the headline price on a search-results page tells you almost nothing about which of those you are looking at. A £20 listing and a £200 listing can be selling the same molecule in wildly different quantities.",
      "This page is the short answer to the price question. It ranks every UK SS-31 listing we track by cost per milligram rather than by headline price, because a per-mg figure is the only comparison that stays honest across pack sizes. The table below shows the lowest per-mg options first and flags the best value at the top, with the pack label printed next to every row so you can see exactly what the figure is divided by.",
      "One caveat runs through everything that follows. A low price is a data point, not a recommendation. In a market where the same material is relabelled under three names and where some listings quote no pack quantity at all, the cheapest entry is frequently the one with the least information attached to it — no batch-linked Certificate of Analysis, no stated purity, no verifiable supplier behind the storefront. Use the ranking here to shortlist, then verify the shortlist against the signals we describe.",
      "Prices come live from the same dataset that powers the [**SS-31 price comparison hub →**](/compounds/ss-31) and are refreshed weekly. Nothing on this page is a fixed quote, and a ranking today is not a ranking next month.",
    ],
    sections: [
      {
        title: "Why Cost Per mg Beats Headline Price for SS-31",
        body: "SS-31 is sold at two dominant strengths, 10mg and 50mg, with a long tail of kits, pens and bundles. That makes headline prices close to useless as a comparison tool: a 10mg vial and a 50mg vial from the same supplier will carry very different prices for the same molecule, and a five-vial kit will carry another figure again.\n\nDividing price by milligrams gives you a figure comparable across every single-vial listing in the market. It is not perfect. It says nothing about purity, packaging quality, whether the material is current, or whether the batch documentation is honest. And it cannot be applied to a kit without knowing how many milligrams the kit actually contains — which is why we print the pack label alongside every row rather than quietly dividing by whatever number is nearest.\n\nThe pattern you will see in the table is predictable: smaller vials almost always carry a higher cost per milligram, and the largest packs carry the lowest. That is normal economics — the fixed costs of synthesis, testing, packing and shipping are spread across more material — but it means the \"cheapest\" listing depends entirely on whether you are comparing total price or unit price, and on whether you will ever use the extra material before it degrades in storage.",
      },
      {
        title: "What a Genuinely Cheap SS-31 Listing Looks Like",
        body: "There is a legitimate way to be cheap and an illegitimate way, and the difference is visible in what the supplier publishes. Legitimate low prices come from volume buying, minimal packaging, and selling a single pack size without the overhead of a full catalogue. Illegitimate low prices come from under-dosing a vial, substituting a cheaper analogue with a similar name, or selling untested powder and describing it as research grade. SS-31's three names give a dishonest seller more room than usual, because a buyer who searches for \"SS-31\" will not necessarily recognise an elamipretide listing that is quietly something else.\n\nThe dividing line is documentation. A supplier selling cheaply on volume can still publish a batch-linked Certificate of Analysis, because they commissioned one for the batch they bought. A supplier selling cheaply on deception cannot, because there is nothing to certify. When two listings differ substantially on price, the COA is where the difference lives.",
        table: {
          header: ["What you check", "Legitimate low price", "Warning sign"],
          rows: [
            ["Certificate of Analysis", "Named lab, batch number, linked on-site", "Absent, or a generic undated PDF"],
            ["Stated quantity", "Explicit mg per vial", "Ambiguous — \"one vial\" or a kit with no mg total"],
            ["Purity figure", "Quoted from HPLC/mass-spec", "Not stated anywhere"],
            ["Naming", "Consistent SS-31 / elamipretide identity", "Switches names mid-listing, or implies a drug product"],
            ["Contact route", "Replies before you order", "Contact form only, no response"],
          ],
        },
      },
      {
        title: "The Cheapest Listing Is Rarely the Best Purchase",
        body: "The instinct to sort by price and buy the top result is understandable, and in most of the UK research-peptide market it produces a reasonable outcome: the spread between the cheapest and the most expensive legitimate suppliers is usually a factor of two or three, and both ends are tested material. SS-31 is a partial exception, because the pharmaceutical halo around elamipretide fattens the top of the market with listings priced for perceived prestige, while the names sprawling across three variants fatten the bottom with listings that are hard to verify at all.\n\nThe practical approach is to take the per-mg ranking here — which already excludes anything we cannot parse — and treat it as a shortlist rather than an answer. From that shortlist, a supplier with a batch-linked COA, a stated purity figure and a working contact route at a mid-range per-mg price is a better purchase than the cheapest listing without them.\n\nIt also helps to know which format you actually need. Research buyers overwhelmingly want lyophilised SS-31 for reconstitution; a pen-format product is a convenience item with a different cost structure, and a multi-vial kit is only cheaper per milligram if you will consume it. Our guide to [where to buy SS-31 in the UK](/compound-guides/where-to-buy-ss-31-uk) covers the verification checklist in full, and the [SS-31 for sale UK](/compound-guides/ss-31-for-sale-uk) page explains which suppliers actually hold stock rather than advertising it.",
      },
      {
        title: "How Storage Changes the Economics of a Big Vial",
        body: "Cost per milligram assumes you will use what you buy, and for a lyophilised peptide that assumption has a shelf life. SS-31 arrives as a fluffy white cake that should be stored desiccated and, for anything beyond short-term handling, frozen; reconstituted solutions are markedly less stable and are typically worked with fresh rather than banked. If your research plan consumes a few milligrams a month, a 50mg vial bought for its low cost per milligram can end up more expensive per milligram consumed than two 10mg vials bought on demand.\n\nThat is not an argument against large vials — it is an argument for buying against your actual throughput. The per-mg table is the right way to compare, but the number you should optimise is cost per milligram of material you will actually use, net of anything that degrades in the fridge while you work through the rest. For researchers running a defined protocol, a mid-size pack bought twice usually beats one large pack bought once.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest SS-31 price in the UK?",
        answer:
          "The cheapest verified listing changes as suppliers run promotions and restock, so this page reads the live figure rather than quoting a fixed number. The table above sorts every UK SS-31 listing we track by cost per milligram and shows the lowest current option first, with the pack label printed beside each row.",
      },
      {
        question: "Is the cheapest SS-31 safe to buy?",
        answer:
          "Price alone tells you nothing about quality. In the SS-31 market the cheapest listings are also the ones least likely to publish a batch-linked Certificate of Analysis or a stated purity figure, and the peptide's three names make substitution easier than usual. Verify the documentation before buying, not after.",
      },
      {
        question: "Why is SS-31 so much cheaper per mg in larger vials?",
        answer:
          "The fixed costs of synthesis, third-party testing, packing and shipping are spread across more material in a larger vial, so the cost per milligram falls even when the headline price rises. This is normal across the peptide market and is why a per-mg comparison is the only meaningful one — provided you will actually use the material before it degrades.",
      },
      {
        question: "Does a lower price mean lower purity?",
        answer:
          "Not necessarily. Volume buying and minimal packaging can produce genuinely low prices on fully tested material. The reliable indicator of quality is documentation — a named-lab Certificate of Analysis tied to a batch number — not the position of a listing in a price sort.",
      },
    ],
    sources: [
      { label: "Elamipretide: A Review of Its Structure, Mechanism of Action, and Therapeutic Potential (Int J Mol Sci 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39940712/" },
      { label: "Mitochondrial-targeted SS-31 peptide attenuates radiation-induced cardiomyocyte senescence (J Radiat Res 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42456009/" },
      { label: "Targeting Mitochondria in MASLD: Comparative Evaluation of MitoQ and SS-31 in Aged Female Mice (Physiol Res 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42708867/" },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest SS-31 UK — Ranked by Price Per mg",
    rowLimit: 10,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "ss-31-price-comparison-uk",
    title: "SS-31 Price Comparison UK: Every Supplier, Every Price",
    description:
      "SS-31 price comparison UK — the full side-by-side table of every UK research supplier we track, with live prices, pack sizes, cost per mg and stock status.",
    h1: "SS-31 Price Comparison UK",
    focusKeyword: "ss-31 price comparison uk",
    intro: [
      "An SS-31 price comparison UK buyers can actually use has to do two things at once: show every listing in the market, and make clear which listings are selling the same thing. SS-31 — also called elamipretide, and historically Bendavia and MTP-131 — is listed by UK suppliers at prices that span roughly a factor of ten, and a large part of that spread has nothing to do with supplier efficiency. It reflects different pack sizes, different formats, and a naming problem that fragments the market into listings that never appear side by side in a search.",
      "This page is the full picture rather than the shortlist. Where our [cheapest SS-31 guide](/compound-guides/cheapest-ss-31-uk) ranks a short top-10 by cost per milligram and hands you a single answer, this comparison renders the complete table: every UK supplier ViralPeps tracks, every pack label they publish, the headline price, the cost per milligram derived from the stated quantity, the stock state, the verification state and a direct link to the supplier's own listing.",
      "The table is regenerated from suppliers' published pages on a weekly cycle, so what you see is the market's current state rather than a snapshot taken months ago. Because SS-31 appears under several names, we match listings on compound identity rather than on keyword: an elamipretide listing is included, and a listing that is plainly a different peptide is not, however similar its name.",
      "Read this page as a market map, not a shopping cart. It exists so that you can see the shape of the market — the genuine range, the pack sizes that dominate, the kits that distort the top end and the clusters worth ignoring. For the compound's full research profile and background, the [**SS-31 hub →**](/compounds/ss-31) is the starting point.",
    ],
    sections: [
      {
        title: "How to Read an SS-31 Price Comparison",
        body: "A price comparison is only as useful as the columns it shows, and for SS-31 three columns do the heavy lifting. The first is the stated pack size: a comparison that lists prices without quantities is comparing a 10mg vial to a 50mg kit as though they were the same product. The second is cost per milligram, the only figure that normalises across pack sizes — and where a pack is a kit or a pen and no clean milligram figure exists, the honest answer is a dash rather than a guess. The third is stock status, because a competitive price on a permanently out-of-stock listing is noise.\n\nTwo further columns in this table are editorial rather than factual. The verification state records whether a supplier meets the checks described on our [SS-31 for sale UK page](/compound-guides/ss-31-for-sale-uk) — a working site, a contact route, compliance language and a discoverable Certificate of Analysis. The TrustScore badge records whether a supplier has installed a badge on their own domain, which verifies domain control and rules out throwaway storefronts.\n\nEverything else is the supplier's own published data. We do not estimate prices, and we do not fill gaps with plausible figures; where a supplier does not publish a quantity or a stock state, the table shows what exists rather than inventing the rest.",
        table: {
          header: ["Column", "What it tells you", "Why it matters"],
          rows: [
            ["Pack", "Milligrams per vial as stated", "Without it, headline prices are not comparable"],
            ["Price", "Supplier's current headline figure", "The number you pay before shipping"],
            ["Cost per mg", "Price ÷ stated milligrams", "The only cross-pack comparison that works"],
            ["Stock", "Whether the listing is currently available", "A cheap out-of-stock listing is not a price"],
            ["Verified", "Whether verification checks passed", "Distinguishes audited suppliers from the rest"],
            ["TrustScore", "Domain-control badge present", "Rules out anonymous storefronts"],
          ],
        },
      },
      {
        title: "Why the Range Is So Wide",
        body: "The first thing a full SS-31 comparison reveals is how wide the range is — considerably wider than a market selling a single tested product should produce. The explanation is layered. At the top end sit multi-vial kits, pen products priced for convenience, and small-quantity listings priced for urgency; at the bottom sit high-volume research suppliers and a tail of listings whose documentation does not match their confidence.\n\nPack size explains the largest single slice of the spread. SS-31 is most commonly sold as a 10mg lyophilised vial, with 50mg vials carrying a markedly lower cost per milligram from the same supplier. A buyer scanning headline prices without reading quantities will systematically misread which supplier is cheaper — and because the peptide is listed under three names, the misreading is easy to make twice.\n\nThe remaining spread comes from overhead and from the pharmaceutical halo. Suppliers who commission third-party testing, hold UK stock and answer enquiries charge for that. Suppliers who drop-ship and test nothing do not. And some listings price against elamipretide's clinical reputation rather than against the cost of a research reagent, which is a marketing decision rather than a molecular one. All of it appears in the same table with the same peptide name, which is precisely why the verification column sits next to the price column rather than in a footnote.",
      },
      {
        title: "What the Table Cannot Tell You",
        body: "A price comparison can show you what suppliers publish. It cannot tell you whether the material in a vial matches the certificate describing it, because that requires independent testing of an actual purchase — something no price table can do at scale. It also cannot tell you about a supplier's reliability over time, only their current state, and it cannot resolve a listing that publishes no pack quantity into one that does.\n\nWhat it can do is make the market legible, so that a buyer walks into a purchase knowing the genuine range, the pack sizes that matter and the documentation to ask for. That is the purpose of this page. Treat the cheapest listings as questions and the best-documented listings as candidates, and the comparison does its job.\n\nIf you are deciding between SS-31 and the other mitochondria-targeted peptides, the same method applies to [MOTS-c](/compounds/mots-c), and the wider repair-peptide field is covered at [BPC-157](/compounds/bpc-157) and [TB-500](/compounds/tb-500). The [best SS-31 peptide](/compound-guides/best-ss-31-peptide) page ranks suppliers by trust rather than price.",
      },
      {
        title: "Keeping the Comparison Honest",
        body: "Three habits keep a comparison like this from decaying into noise. The first is refreshing from the supplier's own published page rather than from a historical archive, so that a price that was true last quarter is not presented as though it were true today. The second is refusing to normalise listings that cannot be normalised: a kit with no stated milligram total gets a dash rather than an invented per-mg figure, because a fabricated number is worse than an absent one.\n\nThe third is remembering what the table is for. It is not a leaderboard and it is not a recommendation engine. It is a map of what suppliers publish, and the columns that matter most — documentation, contact, domain control — are the ones a price column cannot express. Read it alongside the verification material rather than instead of it, and the comparison earns its place on the page.",
      },
    ],
    faq: [
      {
        question: "How current are the prices in this SS-31 comparison?",
        answer:
          "The table is rebuilt from suppliers' published listing pages on a weekly cycle, so the figures reflect their most recent state rather than a fixed snapshot. Prices in the UK research-peptide market move frequently through promotions and restocks, so always confirm the live figure on the supplier's own page before ordering.",
      },
      {
        question: "Why do some SS-31 listings look far cheaper than others?",
        answer:
          "Pack size is the main driver — a 50mg vial carries a much lower cost per milligram than a 10mg vial — followed by supplier overheads like third-party testing and UK stockholding. Some of the spread also reflects kits and pen products being compared against single vials, which is why the pack label is printed next to every price.",
      },
      {
        question: "Does this comparison include elamipretide listings?",
        answer:
          "Yes. SS-31 and elamipretide are two names for the same tetrapeptide, so both are included and matched on compound identity rather than on the keyword used in the listing title. Listings for peptides with similar names but different sequences are excluded.",
      },
      {
        question: "Should I just buy the cheapest listing in the table?",
        answer:
          "No. The cheapest listing is a question, not an answer. Use the table to see the genuine range, then verify the shortlist — a batch-linked Certificate of Analysis from a named laboratory, a stated purity figure, a working contact route and a verifiable supplier identity are what make a listing safe to buy from.",
      },
    ],
    sources: [
      { label: "Elamipretide: A Review of Its Structure, Mechanism of Action, and Therapeutic Potential (Int J Mol Sci 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39940712/" },
      { label: "SS-31, a Mitochondria-Targeting Peptide, Ameliorates Kidney Disease (Oxid Med Cell Longev 2022)", url: "https://pubmed.ncbi.nlm.nih.gov/35707274/" },
      { label: "SS-31 treatment ameliorates cardiac mitochondrial morphology and defective mitophagy in a murine Barth syndrome model (Sci Rep 2024)", url: "https://pubmed.ncbi.nlm.nih.gov/38871974/" },
    ],
    tableMode: "full",
    tableHeading: "SS-31 Price Comparison UK — Every Tracked Supplier",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-ss-31-online-uk",
    title: "Buy SS-31 Online UK: Ordering, Payment & Delivery",
    description:
      "Buy SS-31 online UK — how ordering from UK research suppliers works, exactly what payment and delivery to expect, and key checks to make before you check out.",
    h1: "Buy SS-31 Online UK",
    focusKeyword: "buy ss-31 online uk",
    intro: [
      "To buy SS-31 online UK buyers face a market that looks simpler than it is. The peptide is easy to find — dozens of UK storefronts list it — but \"easy to find\" and \"safe to order from\" are not the same thing, and SS-31 adds two complications that most peptides do not have. The first is naming: SS-31, elamipretide, Bendavia and MTP-131 all describe the same tetrapeptide, so the same product can appear under several titles and the search results do not consolidate. The second is format: alongside the standard lyophilised vial, suppliers sell pens, pre-mixed solutions and multi-vial kits, and each is ordered, shipped and handled differently.",
      "This page is about the transaction itself. It covers how ordering from a UK research supplier actually works — what you provide, what you receive, how payment is handled, what delivery timelines look like when material is genuinely held in UK stock, and which checks to complete before you check out rather than after. It is not a price guide; for that, the [SS-31 price comparison](/compound-guides/ss-31-price-comparison-uk) and the [cheapest SS-31](/compound-guides/cheapest-ss-31-uk) pages cover the numbers.",
      "The ordering mechanics across UK suppliers are more uniform than the marketing suggests. Most are small operations running standard e-commerce platforms, taking card payments through a processor, and dispatching from UK addresses. That uniformity is useful: it means the same short pre-order checklist applies everywhere, and a supplier who fails it is a supplier to skip regardless of how competitive their price looks.",
      "Everything here is presented for laboratory and educational reference. SS-31 is sold by research suppliers under research-use-only terms and is not authorised for human use in the UK; the fact that elamipretide has been through clinical trials and is approved elsewhere for a rare disease does not make a research vial a medicine. The [**SS-31 hub →**](/compounds/ss-31) carries the compound's full research profile.",
    ],
    sections: [
      {
        title: "How Ordering from a UK Research Supplier Works",
        body: "A typical order from a UK SS-31 supplier follows a predictable path. You select a pack — usually a 10mg or 50mg lyophilised vial, occasionally a kit or a pen — add it to a cart on a standard e-commerce platform, and pay by card through the site's processor. There is rarely an account requirement, and rarely a prescription-style gate, because the material is sold as a research reagent rather than a medicine.\n\nWhat arrives is a sealed vial of lyophilised powder, usually with a rubber septum and an aluminium crimp, packed in protective material. Depending on the supplier you may receive a printed Certificate of Analysis, a batch label on the vial, or a link to a COA hosted on their site. Suppliers who commission third-party testing will typically reference the batch on both the vial and the certificate.\n\nThree things commonly catch out first-time buyers of SS-31 specifically. The first is that lyophilised powder requires reconstitution before use in a laboratory setting and does not arrive ready to work with — that is a normal property of the format, not a defect. The second is that not every listing is a bare vial: if you have ordered a kit or a pen, read what the pack contains before assuming a milligram figure. The third is that the vial is not a finished product; it is a research material, and the supplier's terms will say so explicitly.",
        list: [
          "Select your pack — 10mg and 50mg vials dominate the UK SS-31 market, with kits and pens at the top of the range.",
          "Pay by card through the supplier's own processor; avoid anything that requires an unusual payment route.",
          "Expect a sealed vial of lyophilised powder, not a ready-to-use liquid.",
          "Check the batch reference on the vial against the Certificate of Analysis you can access.",
          "Confirm the research-use-only terms are stated on the product page, not only in a footer.",
        ],
      },
      {
        title: "Payment and Delivery — What to Expect in the UK",
        body: "Card payment through a recognised processor is the norm. A supplier who pushes you toward an unusual route — a bank transfer to a personal account, a cryptocurrency-only checkout, or an off-site payment link — is signalling something about how they operate, and none of it is reassuring. The presence of a conventional processor is not proof of quality, but its absence in a market that routinely offers cards is worth noticing.\n\nDelivery is where UK-based stock separates from drop-shipping. A supplier holding SS-31 in UK inventory typically dispatches within a day or two and delivers domestically in a matter of days. A supplier drop-shipping from overseas will quote a longer window, which frequently slips, and will leave you handling any import issues. Both are visible before you buy: UK stockholding is usually stated, and a delivery estimate is almost always quoted.\n\nDiscreet packaging is standard across the market, which means a plain outer parcel with no product description on the outside. If a supplier's listing suggests otherwise, or promises unusually fast international delivery, treat it as a reason to look more closely at where the material is actually shipping from.",
        table: {
          header: ["Stage", "UK-stock supplier", "Drop-shipper warning signs"],
          rows: [
            ["Checkout", "Card via a recognised processor", "Bank transfer to a person, crypto-only"],
            ["Dispatch", "Usually within 1–2 days", "Long, vague or open-ended"],
            ["Delivery", "Domestic, a few days", "Quoted from overseas, often slips"],
            ["Packaging", "Plain outer parcel", "Unusual or ambiguous claims"],
            ["Documentation", "Batch label + COA access", "No batch reference at all"],
          ],
        },
      },
      {
        title: "The Pre-Order Checklist for SS-31",
        body: "Before you complete an SS-31 order, four checks take less than five minutes and eliminate most of the risk in this market. First, find the Certificate of Analysis and confirm it names a laboratory and a batch. Second, confirm the listing states the quantity in milligrams and quotes a purity figure — a listing vague on both may be a kit with unclear contents or material of unstated grade. Third, send a question to the supplier's contact route and see whether the answer comes back; a supplier who does not reply before a sale will not reply after one. Fourth, confirm the terms of sale say research-use-only.\n\nNone of these checks requires domain expertise, and together they do most of the work of separating a supplier worth ordering from one worth skipping. The [SS-31 for sale UK](/compound-guides/ss-31-for-sale-uk) page explains the verification standard in full, and if you are weighing suppliers by quality rather than by transaction, the [best SS-31 peptide](/compound-guides/best-ss-31-peptide) ranking orders them by trust signals.",
      },
      {
        title: "Reconstitution Materials You Will Need",
        body: "An SS-31 order is rarely complete on its own. Lyophilised peptide needs a diluent, and UK research suppliers typically sell bacteriostatic water or a comparable sterile diluent alongside their peptide catalogue. Ordering both together is usually cheaper than a second shipment, and it avoids the common situation where a vial arrives and sits unused because nothing sterile is on the bench to reconstitute it with.\n\nPay attention to the volumes involved. A 10mg vial is a small quantity of material, and the diluent volume chosen determines the concentration of the resulting solution — a practical detail that is far easier to plan before the vial is open than after. Suppliers who sell both usually link them on the product page, and a supplier whose SS-31 listing has no companion diluent is not necessarily a problem, just a sign you will be shopping twice.",
      },
    ],
    faq: [
      {
        question: "Can I buy SS-31 online in the UK without a prescription?",
        answer:
          "UK research suppliers sell SS-31 as a research reagent under research-use-only terms and typically do not require a prescription for that purpose. It is not a licensed medicine and is not authorised for human use, so any purchase is for laboratory and educational reference only. Its approval in another jurisdiction for a rare disease does not change that.",
      },
      {
        question: "How long does SS-31 delivery take in the UK?",
        answer:
          "A supplier holding SS-31 in UK inventory usually dispatches within a day or two and delivers domestically in a matter of days. Suppliers drop-shipping from overseas quote longer windows that often slip, and may leave import handling to the buyer. The delivery estimate is normally stated before checkout.",
      },
      {
        question: "What payment methods do UK SS-31 suppliers accept?",
        answer:
          "Card payment through a recognised processor is standard. Treat requests for bank transfer to a personal account, cryptocurrency-only checkout or off-site payment links as a warning sign — a supplier unwilling to use conventional payment is signalling something about how they operate.",
      },
      {
        question: "Should I order SS-31 and bacteriostatic water together?",
        answer:
          "It is usually cheaper and more practical to order the diluent with the peptide, since lyophilised SS-31 cannot be used without one. Buying both in one shipment also avoids the situation where a vial arrives and cannot be prepared because nothing sterile is to hand.",
      },
    ],
    sources: [
      { label: "Elamipretide: A Review of Its Structure, Mechanism of Action, and Therapeutic Potential (Int J Mol Sci 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39940712/" },
      { label: "Mitochondria-targeted peptide accelerates ATP recovery and reduces ischemic kidney injury (JASN 2011)", url: "https://pubmed.ncbi.nlm.nih.gov/21546574/" },
      { label: "Long-term efficacy and safety of elamipretide in Barth syndrome: 168-week TAZPOWER extension (Genet Med 2024)", url: "https://pubmed.ncbi.nlm.nih.gov/38602181/" },
    ],
    tableMode: "full",
    tableHeading: "Buy SS-31 Online UK — Live Research Supplier Listings",
    rowLimit: 20,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "ss-31-for-sale-uk",
    title: "SS-31 for Sale UK: Who Actually Holds Stock & How to Verify",
    description:
      "SS-31 for sale UK — which suppliers genuinely hold the peptide in stock, the formats they list, and how to verify every listing with a batch-linked COA check.",
    h1: "SS-31 for Sale UK",
    focusKeyword: "ss-31 for sale uk",
    intro: [
      "SS-31 for sale UK is a phrase that promises availability, and availability is exactly what this market is worst at delivering honestly. Because SS-31 is sold under at least three names and in four different formats, a surprising share of listings that look like stock are something else: a drop-shipped item quoted from overseas, a pre-order dressed as a product, a kit whose contents are not itemised, or a link that has been dead for a fortnight. The search results do not distinguish between them, and neither does a price.",
      "This page covers the supply side of the market: which UK suppliers publish SS-31 as currently available, what format and pack sizes they list, and how to verify a listing before you rely on it. It is deliberately not a price list — the [cheapest SS-31](/compound-guides/cheapest-ss-31-uk) and [SS-31 price comparison](/compound-guides/ss-31-price-comparison-uk) pages handle the numbers. Here the subject is availability, and specifically the difference between a listing that is real and one that is only advertising.",
      "The reason this matters more for SS-31 than for a commodity peptide is that the compound sits in an odd regulatory position. Elamipretide has completed clinical trials and received accelerated approval in the United States for Barth syndrome, a rare X-linked disorder of cardiolipin metabolism. That approval gives the molecule a pharmaceutical reputation, which in turn makes demand from research buyers spiky — a paper appears, a podcast mentions it, and stock disappears. Suppliers who plan for that hold inventory; suppliers who do not, list a product and hope. The evidence of which is which is usually visible before you order.",
      "All of this is presented for laboratory and educational reference. SS-31 is not a licensed medicine in the UK and is not authorised for human use; research suppliers sell it under research-use-only terms. For the compound's full research background, the [**SS-31 hub →**](/compounds/ss-31) is the place to start.",
    ],
    sections: [
      {
        title: "Three Kinds of SS-31 Listing",
        body: "The single most useful distinction in the UK SS-31 market is between a listing that is held, one that is drop-shipped, and one that is a bundle. A held listing is material physically in the UK, dispatched by the supplier, with a UK-relevant delivery estimate of days rather than weeks. A drop-shipped listing is material ordered from an overseas source when you buy, with the supplier acting as an intermediary; the price can be attractive and the timeline can be fictional. A bundle is a kit or pen — legitimate, but with a cost structure and a content list that differ from a bare vial.\n\nThe distinction matters because it is invisible in a product photo. Two listings can look identical and behave very differently, and the signals that separate them are administrative rather than visual: a stated UK dispatch time, a stock indicator that changes, a batch number that exists, and a contact route that answers a question about whether an item is genuinely on the shelf.\n\nFor SS-31 specifically, add a fourth case — the pricing that reflects elamipretide's clinical reputation rather than the cost of a research reagent. A listing priced several times the market median is not automatically a better product; frequently it is the same vial with more confident copy.",
        table: {
          header: ["Listing type", "What it looks like", "What to check"],
          rows: [
            ["Held in UK", "Short domestic dispatch estimate, stock status changes", "Batch number and COA linked from the page"],
            ["Drop-shipped", "Long or vague window, priced sharply", "Where it ships from, and who handles import"],
            ["Bundle / kit", "Multiple vials or a pen, one headline price", "The milligram total, itemised"],
            ["Reputation-priced", "Far above market median, trial-heavy copy", "Independent documentation, not marketing"],
          ],
        },
      },
      {
        title: "How to Verify an SS-31 Listing Before You Rely On It",
        body: "Verification in this market means working through a short checklist and accepting that a supplier who fails any step is a supplier to skip. The checklist is not complicated; it is simply more disciplined than most buyers are.\n\nStart with the Certificate of Analysis. It should name the laboratory that produced it and reference a specific batch, and it should be findable from the product page rather than only on request. A COA that names no lab, carries no batch number or is undated is decoration, not documentation. Next, confirm the listing states the quantity and a purity figure; an SS-31 listing that is vague on both is likely a bundle with unclear contents or material of unstated grade.\n\nThen test the contact route before you need it. Send a question about stock or about the batch and see whether a reply arrives and whether it engages with the question. A supplier who answers promptly before a sale is a supplier you can resolve a problem with afterwards; a supplier who does not is a dead end the moment something goes wrong — and in an availability-driven market, \"sorry, out of stock\" is exactly the problem you are trying to avoid.\n\nThe TrustScore badge supplements these checks rather than replacing them. Because installing the badge on their own site requires control of that domain, it verifies that the supplier is who they claim to be and not a throwaway storefront built to take orders and vanish — but it says nothing about the material itself, which is what the COA is for.",
        list: [
          "A Certificate of Analysis naming the laboratory and the batch, discoverable from the product page.",
          "A stated pack quantity and a purity figure from that testing.",
          "A stock indicator you can watch change, plus a stated dispatch window.",
          "A contact route that replies to a real question before you order.",
          "Research-use-only terms stated on the product page, not buried in a footer.",
        ],
      },
      {
        title: "What UK Suppliers Actually List for SS-31",
        body: "Across the UK suppliers we track, the published shape of an SS-31 listing is fairly consistent, which makes anomalies easy to spot. Pack sizes cluster around a 10mg lyophilised vial, with 50mg vials at a better cost per milligram and a small number of pens and multi-vial kits. A minority of suppliers list SS-31 alongside the other mitochondria-targeted peptide it is most often studied next to — [MOTS-c](/compounds/mots-c) — as part of a metabolic research range, and several also carry the repair peptides that appear in the same protocols, such as [BPC-157](/compounds/bpc-157) and [TB-500](/compounds/tb-500).\n\nTesting practice is where suppliers diverge most. Some publish a batch-linked Certificate of Analysis for every SS-31 batch and reference it on the product page; others publish a single generic COA and apply it to everything they sell; others publish nothing. Because SS-31 is a relatively expensive peptide to synthesise — four residues including a non-standard dimethyltyrosine, at reasonably high purity — the cost of commissioning testing is a smaller share of margin than it is for a cheap tripeptide, which makes the absence of any documentation harder to explain.\n\nAvailability is the other axis, and it is the one this page exists for. A supplier who states a dispatch window, shows a stock indicator and answers an availability question quickly is a supplier you can rely on to ship. A supplier who lists SS-31 with no stock state and a three-week estimate is telling you it is drop-shipped, which is fine if you plan for it and not fine if you do not.",
      },
      {
        title: "When SS-31 Is Out of Stock Everywhere",
        body: "Demand for SS-31 is more event-driven than for most research peptides, which means stock shortages are real and recurring rather than a permanent feature of the market. When a supplier restocks, the listing reappears at a new price; when a batch sells through, the listing goes quiet or gets a two-to-three week estimate. Reading the table as a snapshot rather than a promise protects you from the common frustration of ordering against a stale page.\n\nThe practical response to a shortage is not to accept the first premium-priced listing that appears. Compare the current in-stock set on a per-milligram basis, check whether the supplier that is out of stock publishes a restock date, and decide whether a larger vial from a supplier who does hold stock is better value than waiting for a specific pack size. In a market where a 50mg vial can cost less per milligram than a 10mg vial from the same supplier, waiting for the smaller pack is rarely the rational choice.",
      },
    ],
    faq: [
      {
        question: "Which UK suppliers have SS-31 for sale?",
        answer:
          "The live table above lists every UK supplier ViralPeps currently tracks for SS-31 as a research reagent, with their pack labels, prices, stock state and verification state. Suppliers listing elamipretide are the same compound and are included.",
      },
      {
        question: "How do I know an SS-31 listing is genuinely in stock?",
        answer:
          "Look for a stock indicator that changes over time, a stated UK dispatch window measured in days, and a supplier who answers an availability question promptly. Listings with no stock state and a long or vague delivery estimate are typically drop-shipped rather than held.",
      },
      {
        question: "Why is SS-31 sometimes out of stock across many suppliers?",
        answer:
          "Demand is event-driven and batches are finite. When a paper or review draws attention to the peptide, stock clears quickly, and suppliers who do not hold inventory show a restock estimate rather than a product. Checking a supplier's dispatch window rather than their headline price tells you what to expect.",
      },
      {
        question: "What is the TrustScore badge on an SS-31 supplier?",
        answer:
          "It records that a supplier has installed a badge on their own website, which proves they control that domain and rules out throwaway storefronts. It supplements the documentation checks rather than replacing them — it verifies the supplier's identity, not the material in the vial.",
      },
    ],
    sources: [
      { label: "Elamipretide: a mitochondria-targeting drug for Barth syndrome (Trends Pharmacol Sci 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42448476/" },
      { label: "Elamipretide: The first cardiolipin-directed mitochondrial therapeutic approved under accelerated approval (Drug Discov Ther 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/41260682/" },
      { label: "Elamipretide: A Review of Its Structure, Mechanism of Action, and Therapeutic Potential (Int J Mol Sci 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39940712/" },
    ],
    tableMode: "trust",
    tableHeading: "SS-31 for Sale UK — Suppliers Ranked by Trust Signals",
    rowLimit: 25,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-ss-31-peptide",
    title: "Best SS-31 Peptide UK: Ranked by Trust & Verification",
    description:
      "Best SS-31 peptide UK — suppliers ranked by independent TrustScore, batch-linked Certificate of Analysis and stated purity rather than headline price alone.",
    h1: "Best SS-31 Peptide",
    focusKeyword: "best ss-31 peptide",
    intro: [
      "Deciding which is the best SS-31 peptide to buy in the UK is a question about suppliers rather than about the molecule. Every listing in this market claims to contain the same four-amino-acid sequence — D-Arg-dimethylTyr-Lys-Phe-NH2, the mitochondria-targeting tetrapeptide also known as elamipretide — and what separates them is whether the supplier can evidence that claim. SS-31 is hard enough to synthesise correctly that the quality of a purchase is determined almost entirely by the quality of the supplier behind it, and suppliers in this market differ far more than their websites suggest.",
      "This page ranks UK SS-31 suppliers by trust signals rather than by price: whether a site is live and stable, whether it publishes a batch-linked Certificate of Analysis from a named laboratory, whether it states the quantity and purity of what it sells, whether it has a working contact route and compliance language, and whether it has confirmed control of its own domain through the TrustScore badge. The ranking below is derived from those signals, and the live table reflects the suppliers we can actually verify.",
      "The reasoning behind ranking on trust rather than price is specific to this compound. SS-31 circulates under three names and in four formats, and its clinical pedigree — elamipretide has been through phase 2/3 trials and gained accelerated approval in the US for Barth syndrome — makes it easy to price against reputation rather than against the cost of a research reagent. In that environment, price becomes a noise signal in both directions: too cheap suggests an under-dosed vial, too expensive suggests marketing. Documentation is the signal that does not move.",
      "Everything here is presented for laboratory and educational reference. SS-31 is not a licensed medicine in the UK and is not authorised for human use; the peptide's clinical development elsewhere does not make a research vial a drug product. The [**SS-31 hub →**](/compounds/ss-31) carries the full research profile and market overview.",
    ],
    sections: [
      {
        title: "What \"Best\" Means for a Research Peptide",
        body: "For a compound sold as a research reagent, \"best\" has a specific and testable meaning. It is not the cheapest listing, the most attractive website, or the supplier with the largest catalogue. It is the supplier who can demonstrate, on their own published pages, that the material they sell has been independently tested, that they are a real business behind a domain they control, and that they stand behind what they ship.\n\nThat definition matters because the alternative — judging by price or presentation — systematically rewards the wrong behaviour. A supplier who skips third-party testing can undercut one who commissions it, which is exactly how the cheapest listings in a head-to-head price sort end up being the ones with nothing verifiable attached. Ranking by trust inverts that, so a supplier who invests in documentation rises rather than falls.\n\nThe trust signals we use are deliberately conservative. A live, stable site. A Certificate of Analysis tied to a batch and naming the laboratory. A stated quantity and purity. A contact route that answers. Compliance language that matches research-use-only terms. And the TrustScore badge, which verifies domain control and distinguishes a genuine supplier from a storefront built to disappear.",
        table: {
          header: ["Trust signal", "What a strong supplier shows", "What the weak ones show"],
          rows: [
            ["Site stability", "Live, resolvable, consistent", "Often offline or parked"],
            ["Certificate of Analysis", "Batch-linked, named laboratory", "Generic, undated or absent"],
            ["Quantity + purity", "Explicit mg per vial, purity quoted", "Vague, or kit contents unstated"],
            ["Contact route", "Replies to a real question", "Form only, no answer"],
            ["Domain control", "TrustScore badge installed", "No verifiable identity"],
          ],
        },
      },
      {
        title: "How the TrustScore Ranking Works",
        body: "The TrustScore is a composite of the checks above, weighted toward the signals that are hardest to fake. A supplier's site resolving and having a title is worth little on its own, because both are trivial; a batch-linked Certificate of Analysis from a named laboratory is worth much more, because commissioning it costs real money and cannot be faked convincingly. Contact, compliance and shipping language sit between the two, since they indicate an operating business but can be copied by anyone.\n\nThe ranking this produces is not a statement that one supplier's material is purer than another's — no third-party comparison can prove that without testing each purchase, which is beyond the scope of a comparison site. It is a statement that one supplier has made their material verifiable and another has not, which for a research buyer is the practical question. A supplier who publishes a batch COA is telling you they are willing to be checked.\n\nWe re-run the checks rather than treating them as permanent. A supplier who published batch certificates last quarter but has quietly stopped is a different proposition from one who has never missed, and the ranking reflects current state, not reputation. That matters more than usual for a peptide whose supply is event-driven and whose listings come and go.",
      },
      {
        title: "Choosing Between the Top SS-31 Suppliers",
        body: "Once you have a shortlist of suppliers that pass the trust bar, the remaining decision is about fit rather than quality. The two most common considerations are pack size and format. SS-31 is typically sold as a 10mg and a 50mg research vial; the 10mg vial keeps the entry cost lower while the 50mg vial carries a better cost per milligram if your work will consume more material. Suppliers who stock both let you decide on the metric that matters to your work rather than on what happens to be in stock.\n\nFormat is the other axis. Almost every research supplier sells lyophilised powder for reconstitution, but a few list SS-31 as a pen or bundled with diluent, and some list it alongside [MOTS-c](/compounds/mots-c) for comparative mitochondrial work. Blends and kits carry their own documentation burden, so hold them to the same standard: a certificate naming the batch and the components, not a generic claim.\n\nFor the price dimension, the [cheapest SS-31](/compound-guides/cheapest-ss-31-uk) page gives the unit-cost shortlist and the [SS-31 price comparison](/compound-guides/ss-31-price-comparison-uk) gives the full market. Used together with the trust ranking here, they let you buy from a supplier who both documents their material and prices it sensibly — which is the only combination that qualifies as the best SS-31 peptide to buy.",
      },
      {
        title: "What the Research Actually Supports",
        body: "A buyer's guide should be honest about the state of the evidence, because the quality of the literature is part of what makes a compound worth its price. SS-31's animal and in-vitro literature is broad and has been accumulating since the mid-2000s: reduced infarct size in rodent models of myocardial ischaemia, faster ATP recovery after renal ischaemia, restored mitochondrial energetics and exercise tolerance in aged mouse muscle, protection in models of diabetic cardiomyopathy, and a CRISPR screen that identified phospholipid scramblase 3 as a biological target. That target work is the strongest mechanistic anchor the field has, and it is consistent with the compound's proposed cardiolipin-binding behaviour.\n\nThe human evidence is narrower and more mixed. In Barth syndrome, a phase 2/3 randomised trial followed by a 168-week open-label extension reported benefits in a rare disease with no alternative therapy, and elamipretide has since received accelerated approval in the United States on that basis. In primary mitochondrial myopathy, the MMPOWER-3 post hoc analysis found genotype-specific effects rather than a uniform one. A phase 3 heart failure programme did not meet its functional endpoints. In age-related macular degeneration, the randomised ReCLAIM-2 phase 2 trial tested the compound in geographic atrophy.\n\nFor a research buyer, the practical read is that SS-31 is a well-studied molecule with a genuine mechanism and an uneven clinical record — which is normal for a peptide at this stage and is exactly why it remains a research reagent rather than a licensed product in the UK. That is also a reason to hold any seller who overclaims to a higher documentation standard, not a lower one.",
      },
    ],
    faq: [
      {
        question: "What is the best SS-31 peptide to buy in the UK?",
        answer:
          "The best choice is the supplier with the strongest verifiable trust signals rather than the lowest price: a live site, a batch-linked Certificate of Analysis from a named laboratory, a stated quantity and purity, a working contact route and confirmed domain control. The ranking above orders UK suppliers on exactly those signals.",
      },
      {
        question: "Should I buy the cheapest SS-31 peptide?",
        answer:
          "Not on price alone. SS-31 is listed under several names and in several formats, and the bottom of the market includes kits with unclear contents and material of unstated grade. A low price is a data point; the documentation attached to the listing is what determines whether it is a safe purchase.",
      },
      {
        question: "What is the TrustScore and how is it calculated?",
        answer:
          "TrustScore is a composite of verifiable supplier signals — site stability, a batch-linked Certificate of Analysis, stated quantity and purity, a working contact route, compliance language and confirmed domain control. It is weighted toward the hardest-to-fake signals, and it is recalculated rather than treated as a permanent award.",
      },
      {
        question: "Is there human clinical evidence for SS-31?",
        answer:
          "Yes, though it is uneven. Elamipretide has randomised trial and long-term extension data in Barth syndrome, genotype-specific post hoc findings in primary mitochondrial myopathy (MMPOWER-3), a phase 2 trial in geographic atrophy, and a phase 3 heart failure programme that did not meet its functional endpoints. None of this makes a research vial a licensed medicine in the UK.",
      },
    ],
    sources: [
      { label: "Elamipretide: A Review of Its Structure, Mechanism of Action, and Therapeutic Potential (Int J Mol Sci 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39940712/" },
      { label: "A phase 2/3 randomized clinical trial and open-label extension of elamipretide in Barth syndrome (Genet Med 2021)", url: "https://pubmed.ncbi.nlm.nih.gov/33077895/" },
      { label: "Genotype-specific effects of elamipretide in primary mitochondrial myopathy: MMPOWER-3 post hoc analysis (Orphanet J Rare Dis 2024)", url: "https://pubmed.ncbi.nlm.nih.gov/39574155/" },
      { label: "ReCLAIM-2: Phase II trial of elamipretide in age-related macular degeneration (Ophthalmol Sci 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39605874/" },
      { label: "Mitochondria-targeted peptide rapidly improves mitochondrial energetics and skeletal muscle performance in aged mice (Aging Cell 2013)", url: "https://pubmed.ncbi.nlm.nih.gov/23692570/" },
      { label: "Improving mitochondrial function with SS-31 reverses age-related redox stress and improves exercise tolerance in aged mice (Free Radic Biol Med 2019)", url: "https://pubmed.ncbi.nlm.nih.gov/30597195/" },
      { label: "Genome-wide CRISPR screen identifies phospholipid scramblase 3 as the biological target of SS-31 (JASN 2024)", url: "https://pubmed.ncbi.nlm.nih.gov/38530359/" },
    ],
    tableMode: "trust",
    tableHeading: "Best SS-31 Peptide — UK Suppliers Ranked by TrustScore",
    rowLimit: 25,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
