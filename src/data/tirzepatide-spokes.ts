/**
 * Tirzepatide silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/tirzepatide-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * NOTE: spoke 5 is `tirzepatide-uk-supplier` (NOT `tirzepatide-for-sale`).
 * "tirzepatide for sale uk" returns ZERO UK autocomplete results — the
 * "for sale" modifier is not portable from the Retatrutide silo.
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
    slug: "where-to-buy-tirzepatide-uk",
    title: "Where to Buy Tirzepatide UK: Verified Suppliers 2026",
    description:
      "Where to buy tirzepatide uk — compare live prices from verified UK research suppliers, then check stock, shipping and Certificates of Analysis before ordering.",
    h1: "Where to Buy Tirzepatide UK",
    focusKeyword: "where to buy tirzepatide uk",
    intro: [
      "If you are asking where to buy tirzepatide uk researchers face a familiar problem: the search results are dominated by overseas storefronts with no verifiable UK presence, no published Certificates of Analysis, and prices that shift every week. Tirzepatide is a dual GIP and GLP-1 receptor agonist — the same mechanism that made it one of the most-discussed research compounds of the decade — and that visibility is precisely why unverified material circulates so freely.",
      "This page answers the question with data rather than opinion. Below is a live table of every UK supplier ViralPeps tracks for tirzepatide, sorted by price, with pack size, stock status and a direct link to each listing. It is regenerated from our weekly price scrape, so what you see reflects those suppliers' own listing pages at the most recent check.",
      "The compound itself is well documented. Tirzepatide was developed as a once-weekly dual agonist and studied extensively in metabolic research, with the SURPASS and SURMOUNT trial programmes establishing its profile across glycaemic and weight-related endpoints. Later work has extended the investigation into sleep apnoea, heart failure and fatty liver disease. That scientific weight is exactly what makes counterfeit and mislabelled material profitable to sell.",
      "Everything here is presented for laboratory and educational reference. Tirzepatide is a prescription medicine in the UK and is not licensed for general sale; nothing on this page is medical guidance. For a broader overview of the compound's research profile, start with the [**Tirzepatide price comparison hub →**](/compounds/tirzepatide).",
    ],
    sections: [
      {
        title: "Where to Buy Tirzepatide UK — What Actually Matters",
        body: "The phrase \"where to buy\" hides a more useful question: which supplier can you actually verify? Any site can accept a card payment; very few can show you a batch number tied to a third-party HPLC result. When we audit UK suppliers we look for the same signals every time — a published Certificate of Analysis from a named laboratory, a working contact route, a registered business identity, clear research-use-only labelling, and a domain the operator genuinely owns and operates.\n\nThat last point matters more than it sounds. A storefront can be built in a weekend on a throwaway domain and abandoned the following month. Domain ownership confirmed against a real business is a materially different proposition, and it is the reason our TrustScore badge exists: the supplier installs a small badge on their own site linking back to us, which proves they control the domain they sell from.",
        list: [
          "COA published with batch numbers, from a named third-party lab — the single most decisive signal a supplier controls.",
          "A real, working contact method — an email that replies, or a phone number that connects.",
          "Research-use-only labelling throughout, with no marketing of the compound for human use.",
          "A registered business behind the storefront — a limited company or a verifiable sole trader.",
          "Domain ownership confirmed, which is what the TrustScore badge verifies.",
        ],
      },
      {
        title: "How We Verify Suppliers Before Listing Them",
        body: "Every supplier in the table above has been checked against the same checklist. We fetch their homepage and confirm it resolves, scan secondary pages for shipping, contact and compliance language, and look for a Certificate of Analysis either hosted on-site or linked from a testing laboratory. Suppliers that fail the basics — dead domain, no contact route, no compliance language at all — do not make the list.\n\nThe process is deliberately conservative. We would rather track fewer suppliers honestly than pad a comparison table with storefronts nobody can verify. If a supplier you know of is missing, that is usually the reason: not that they were excluded deliberately, but that the verification signals were not there to find.\n\nWe also re-run those checks rather than treating them as a one-off. A supplier who published COAs last quarter but has quietly stopped is a different proposition from one who has always published them, and the TrustScore data on this site is refreshed rather than archived.",
        table: {
          header: ["Signal", "Why it matters"],
          rows: [
            ["Named-lab COA with batch number", "Proves the material was independently tested and traceable"],
            ["Working contact route", "A supplier you can reach is a supplier you can resolve a problem with"],
            ["Full RUO labelling", "Shows compliance awareness; unlicensed sale to the public is a legal risk"],
            ["Registered business identity", "A real entity behind the storefront, not an anonymous page"],
            ["Domain ownership confirmed", "Rules out throwaway storefronts built to disappear"],
          ],
        },
      },
      {
        title: "What Affects the Price You Pay in the UK",
        body: "Tirzepatide pricing in the UK varies by a factor of several between the cheapest and most expensive listings, and the spread is not random. Pack size is the biggest driver — larger vials almost always carry a lower cost per milligram, which is why a per-mg comparison is more informative than a headline price. Vendor overhead is the second factor: a supplier running verified warehousing, printed COAs and proper support charges for it, and a bare-bones reseller shipping from abroad does not.\n\nStock status matters too. A listing can show a competitive price and be permanently out of stock, which is why we record availability alongside price. When a supplier's material is genuinely held in the UK, delivery is typically a matter of days; when it is drop-shipped from overseas, quoted delivery often slips and import handling becomes the buyer's problem.\n\nThe practical takeaway is to compare on a per-mg basis at the pack size you actually need, and to treat an unusually low price as a question rather than a bargain. In an unregulated market, the cheapest listing is frequently a smaller quantity than advertised or material with no testing behind it.",
      },
    ],
    faq: [
      {
        question: "Where can I buy tirzepatide in the UK?",
        answer:
          "Tirzepatide is a prescription medicine in the UK and is not licensed for general retail sale. ViralPeps compares listings from UK research-chemical suppliers, who sell the compound strictly for laboratory use only. We list only suppliers whose verification signals — COA, contact, compliance and domain ownership — we can confirm.",
      },
      {
        question: "Is it legal to buy tirzepatide in the UK?",
        answer:
          "Tirzepatide is a prescription-only medicine, so it cannot be legally sold to the public for human use. Research suppliers operate under research-use-only terms intended for laboratory and educational purposes. Buying a prescription medicine for personal use falls outside those terms, and we present this information for reference only, not as guidance.",
      },
      {
        question: "Why do tirzepatide prices vary so much between UK suppliers?",
        answer:
          "Pack size is the main driver — larger vials carry a much lower cost per milligram — followed by vendor overheads such as warehousing, printed COAs and support. Genuinely low prices sometimes indicate a smaller quantity than advertised or untested material, so compare on a per-mg basis and verify the supplier.",
      },
      {
        question: "How quickly do UK tirzepatide suppliers deliver?",
        answer:
          "UK-held stock typically arrives within a few working days. Overseas drop-shipped listings often quote longer windows and can slip, with import handling falling to the buyer. Check the listing's stated shipping origin before ordering, and confirm stock status, since some competitive prices sit on permanently out-of-stock items.",
      },
      {
        question: "Does every UK supplier publish a Certificate of Analysis?",
        answer:
          "No — and that is the single most useful filter. Suppliers that publish a named-laboratory COA with a batch number are demonstrating that their material was independently tested and traceable. Suppliers that publish none, or publish a generic COA with no batch reference, cannot show that the material you receive is the material that was tested.",
      },
    ],
    sources: [
      {
        label:
          "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes — SURPASS-2 (New England Journal of Medicine, 2021)",
        url: "https://pubmed.ncbi.nlm.nih.gov/34170647/",
      },
      {
        label:
          "Tirzepatide Once Weekly for the Treatment of Obesity — SURMOUNT-1 (New England Journal of Medicine, 2022)",
        url: "https://pubmed.ncbi.nlm.nih.gov/35658024/",
      },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy Tirzepatide UK — Live Supplier Prices",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-tirzepatide-uk",
    title: "Cheapest Tirzepatide UK: Lowest Price Per mg 2026",
    description:
      "Cheapest tirzepatide uk — find the lowest verified price per mg across UK research suppliers, updated weekly from live listings, with pack sizes and stock.",
    h1: "Cheapest Tirzepatide UK",
    focusKeyword: "cheapest tirzepatide uk",
    intro: [
      "Cheapest tirzepatide uk is a straightforward question with a non-obvious answer. The lowest headline price and the lowest cost per milligram are usually different listings, because a 10mg vial at £39 and a 60mg vial at £139 tell opposite stories depending on how you divide them. This page ranks UK tirzepatide listings by cost per milligram, which is the only comparison that normalises for pack size.",
      "Below is a live table of the lowest per-mg listings we track, regenerated weekly from suppliers' own pricing pages. The top row is the current cheapest verified option on a per-mg basis, with the price-per-mg figure shown for every row so you can see the spread rather than trusting a single number.",
      "A word of caution before the table. In an unregulated market, a price that looks too good is often a quantity that is smaller than advertised, or material with no testable provenance. Per-mg ranking helps you compare fairly, but it does not replace verification — a supplier with a slightly higher per-mg price and a published COA is usually the better purchase than the cheapest listing with no documentation behind it.",
      "Everything on this page is for research and educational reference. Tirzepatide is a prescription medicine in the UK; ViralPeps does not sell it and this is not medical advice. For the full market view, see the [**Tirzepatide price comparison hub →**](/compounds/tirzepatide).",
    ],
    sections: [
      {
        title: "Why Price Per mg Beats Headline Price",
        body: "Tirzepatide is sold in packs ranging from single 10mg vials to larger multi-pack listings, and the per-unit economics change dramatically with size. A supplier advertising £39 may be offering 10mg — £3.90 per mg — while another advertising £139 for 60mg is offering £2.32 per mg. On headline price the first looks cheaper; on the measure that actually matters, the second is 40% better value.\n\nThis is why our cheapest page sorts by cost per milligram rather than sticker price. The ranking surfaces the genuine value leader and lets you see immediately when a low headline number is masking an unfavourable pack size.\n\nThe one caveat is that per-mg value is only meaningful if the stated quantity is real. Certificates of Analysis with batch numbers are the mechanism that ties an advertised quantity to tested material, which is why the highest-value listings on this page are also the ones with the strongest documentation.",
      },
      {
        title: "What Else to Check Before Choosing the Cheapest",
        body: "Cost per milligram is the right first filter, but three other factors decide whether a cheap listing is actually a good purchase.",
        list: [
          "Stock status — a competitive price on a permanently out-of-stock item is not a purchase option at all.",
          "Shipping origin and cost — a lower unit price can be wiped out by overseas delivery times and import handling.",
          "Documentation — a named-lab COA with a batch number is the difference between tested material and an unverifiable claim.",
          "Payment method — established UK suppliers typically offer normal card or bank payment; crypto-only demands are a yellow flag.",
          "Recency of listing — a price scraped this week reflects the current market; a cached price may not exist any more.",
        ],
      },
      {
        title: "How the Cheapest Tirzepatide Price Changes Over Time",
        body: "Tirzepatide pricing is not stable. As more suppliers enter the UK research market, competition pushes headline prices down, but availability and per-mg value move unevenly — a supplier can cut a 10mg price while quietly raising the 60mg. That is why this table is regenerated from a weekly scrape rather than publishing a fixed figure.\n\nThe practical implication is that \"cheapest today\" may not be \"cheapest next month.\" If cost is your primary concern, re-check before each purchase rather than relying on a remembered number. The same applies to stock: a listing that dried up after a competitor's exit can reappear at a different price point entirely.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest tirzepatide in the UK right now?",
        answer:
          "The live table at the top of this page shows the current lowest verified price per milligram across the UK listings we track. Because prices move weekly, the cheapest option is the top row of that table rather than any fixed figure quoted elsewhere.",
      },
      {
        question: "Is the cheapest tirzepatide the best value?",
        answer:
          "Not automatically. Cost per milligram is the fairest way to compare pack sizes, but a low price with no Certificate of Analysis, no working contact route, or a permanently out-of-stock listing is not real value. Verify the supplier before treating a low price as a bargain.",
      },
      {
        question: "Why is tirzepatide cheaper per mg in larger packs?",
        answer:
          "Larger vials carry the same handling, testing and shipping overheads spread across more material, so suppliers can offer a lower unit price while preserving margin. That is why a 60mg listing frequently beats a 10mg listing on price per milligram even when its headline price is higher.",
      },
      {
        question: "Do cheap tirzepatide suppliers in the UK publish COAs?",
        answer:
          "Some do, some do not. The cheapest listings with documentation are the ones worth considering; the cheapest without any are the ones to treat with caution. A named-laboratory COA referencing a batch number is the fastest way to separate a genuine value listing from an unverifiable one.",
      },
      {
        question: "How often are tirzepatide prices updated on this page?",
        answer:
          "The table is regenerated from a weekly scrape of suppliers' own listing pages. Prices therefore reflect the most recent check rather than a historical archive. Re-check before purchasing, since a price that was cheapest last week may have changed.",
      },
    ],
    sources: [
      {
        label:
          "Tirzepatide Once Weekly for the Treatment of Obesity — SURMOUNT-1 (New England Journal of Medicine, 2022)",
        url: "https://pubmed.ncbi.nlm.nih.gov/35658024/",
      },
      {
        label:
          "Efficacy and safety of tirzepatide in type 2 diabetes: a systematic review and meta-analysis (Frontiers in Endocrinology, 2023)",
        url: "https://pubmed.ncbi.nlm.nih.gov/37265666/",
      },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest Tirzepatide UK — Ranked by Price Per mg",
    rowLimit: 10,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "tirzepatide-price-comparison-uk",
    title: "Tirzepatide Price Comparison UK: Every Supplier 2026",
    description:
      "Tirzepatide price comparison uk — a full side-by-side table of every UK research supplier we track, with pack sizes, per-mg cost and live stock status shown.",
    h1: "Tirzepatide Price Comparison UK",
    focusKeyword: "tirzepatide price comparison uk",
    intro: [
      "A proper tirzepatide price comparison uk researchers can act on needs to show every listing, not a curated top ten. This page carries the full table — every UK tirzepatide supplier ViralPeps tracks, at every pack size, with the price, the cost per milligram and the current stock status side by side.",
      "Unlike the cheapest page, this comparison does not crown a winner. It exists to show the shape of the market: the range from the lowest to the highest listing, the spread of per-mg costs, and which suppliers sit where. That overview is what lets you judge whether a price you have been quoted is reasonable or an outlier.",
      "The table is regenerated from our weekly scrape of suppliers' own pages, so the figures reflect the most recent check rather than a snapshot from months ago. Prices in this market move, listings go out of stock, and new suppliers appear — which is why a static comparison goes stale within weeks.",
      "Everything here is for research and educational reference only. Tirzepatide is a prescription medicine in the UK and ViralPeps does not sell it. For the compound's research profile and the hub view, see [**Tirzepatide UK →**](/compounds/tirzepatide).",
    ],
    sections: [
      {
        title: "How to Read a Tirzepatide Price Comparison",
        body: "A price table is only useful if you know which column decides your choice. If you are buying a fixed quantity, headline price is the number you pay. If you are comparing value, cost per milligram is the column that matters, because it strips out the effect of pack size. If availability is your constraint, the stock column eliminates listings that cannot ship at all.\n\nThe most common mistake is reading only the first column. A listing at £39 looks cheaper than one at £139 until you notice the first is 10mg and the second is 60mg — £3.90 versus £2.32 per mg. Sorting by per-mg cost reorders the entire table and usually changes which supplier is the sensible pick.\n\nWe also record the vendor's verification status alongside price. Two listings at the same per-mg cost are not equivalent if one publishes a named-lab COA and the other publishes nothing, and the comparison table is designed to make that visible rather than bury it.",
        table: {
          header: ["Column", "What it tells you"],
          rows: [
            ["Vendor", "Who is selling the listing"],
            ["Pack size", "The quantity advertised, in mg"],
            ["Price", "The headline figure at that pack size"],
            ["Per mg", "The normalised cost — the fairest value comparison"],
            ["Stock", "Whether the listing can actually ship today"],
          ],
        },
      },
      {
        title: "Why the UK Tirzepatide Market Is So Wide",
        body: "The gap between the cheapest and most expensive UK tirzepatide listing is large, and it is not explained by quality alone. Several forces widen it. Suppliers sourcing in bulk and holding UK stock can compete on unit price; resellers drop-shipping from overseas carry thinner margins and quote higher. Vendors that print COAs and run support overheads price for that service; bare storefronts do not.\n\nCompetition has also been intensifying. As more suppliers enter the research-chemical market, headline prices have drifted down in the most commoditised pack sizes, while availability has become more volatile — the same price war that lowers a 10mg listing can leave a 60mg listing out of stock for weeks.\n\nThe result is a market where price alone is a poor signal. The comparison table exists so you can see both the number and the context: who is selling, at what quantity, with what documentation, and whether it is actually available.",
      },
      {
        title: "Keeping the Comparison Honest",
        body: "A price comparison is only as good as its sourcing. We collect prices directly from suppliers' own listing pages rather than trusting aggregators or cached snapshots, and we re-run the collection weekly so the table reflects current reality. Listings that fail verification — dead domains, no contact route, no compliance language — are excluded rather than included with a caveat.\n\nWe also guard against the failure modes that make comparison sites untrustworthy: we reject soft-404 pages that return a homepage instead of a product, screen out category pages masquerading as listings, and flag price outliers that fall far outside the market range, since those usually indicate a data error or a listing that has changed shape. Where a listing cannot be verified, it is dropped rather than published with a question mark.\n\nThe upshot is a table that is narrower than the raw market but honest about what it contains — which is more useful than a longer list of numbers nobody can verify.",
      },
    ],
    faq: [
      {
        question: "How many UK tirzepatide suppliers does ViralPeps compare?",
        answer:
          "The live table above reflects every UK supplier we can verify at the time of the most recent scrape. The count changes as suppliers enter and leave the market and as verification passes or fails, so the current supplier figure is shown on the table itself rather than quoted as a fixed number.",
      },
      {
        question: "Why does the price comparison show pack sizes separately?",
        answer:
          "Because pack size is the single biggest driver of price and of value. Showing each pack as its own row means a 10mg listing and a 60mg listing are compared honestly on the per-mg column, rather than a single headline price hiding the difference in quantity.",
      },
      {
        question: "Does the cheapest listing always win on this comparison?",
        answer:
          "No. The comparison does not declare a winner — it shows the full market so you can weigh price against documentation, stock and vendor verification. A marginally higher per-mg price with a published COA is often the better purchase than the outright cheapest listing with no paperwork.",
      },
      {
        question: "How current are the prices in this table?",
        answer:
          "Prices are collected from suppliers' own listing pages and refreshed weekly. The table therefore reflects the most recent check. Because the market moves, a figure here can differ from what a supplier shows today, so always confirm on the supplier's page before ordering.",
      },
      {
        question: "Are out-of-stock listings included in the comparison?",
        answer:
          "Yes — with their stock status shown, so you can see the listing exists and at what price, while knowing it may not ship immediately. Excluding them entirely would hide part of the market; showing availability alongside price lets you judge whether a competitive price is actually purchasable.",
      },
    ],
    sources: [
      {
        label:
          "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes — SURPASS-2 (New England Journal of Medicine, 2021)",
        url: "https://pubmed.ncbi.nlm.nih.gov/34170647/",
      },
      {
        label:
          "Tirzepatide for the Treatment of Obstructive Sleep Apnea and Obesity — SURMOUNT-OSA (New England Journal of Medicine, 2024)",
        url: "https://pubmed.ncbi.nlm.nih.gov/38912654/",
      },
    ],
    tableMode: "full",
    tableHeading: "Tirzepatide Price Comparison UK — Full Supplier Table",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-tirzepatide-online-uk",
    title: "Buy Tirzepatide Online UK: Ordering & Delivery Guide",
    description:
      "Buy tirzepatide online uk — how UK research suppliers handle ordering, payment and delivery, what to check before you pay, and the red flags worth avoiding.",
    h1: "Buy Tirzepatide Online UK",
    focusKeyword: "buy tirzepatide online uk",
    intro: [
      "To buy tirzepatide online uk buyers deal with a market that has no licensing regime looking after them, which puts the burden of diligence on the purchaser. This page covers the practical mechanics — how ordering works, which payment methods are normal, what delivery expectations are realistic, and what to check before you hand over money.",
      "It is worth stating the legal position plainly. Tirzepatide is a prescription-only medicine in the UK and cannot be legally sold to the public for human use. Research-chemical suppliers sell it under research-use-only terms for laboratory and educational purposes, and that is the context in which the listings on this site exist. Nothing here is medical advice.",
      "Below is a live view of current UK listings with prices and stock, so you can see the market before reading the guidance. The ordering advice that follows applies whichever supplier you choose — the mechanics are broadly consistent, and so are the warning signs.",
      "Everything on this page is presented for reference. For the market overview and the compound's research profile, see the [**Tirzepatide hub page →**](/compounds/tirzepatide).",
    ],
    sections: [
      {
        title: "How Ordering From a UK Supplier Works",
        body: "The typical UK research supplier runs a straightforward e-commerce flow: a product page with the pack size and price, a basket and checkout, and either immediate card processing or a bank-transfer option. Orders from suppliers holding UK stock usually dispatch within a working day or two, with delivery a matter of days after that.\n\nThe variation is in the details. Some suppliers list stock live and process immediately; others take orders and source to fulfil, which stretches delivery. Some show a single pack size per product; others offer a dropdown of 10mg through 60mg. Some require account creation; a smaller number allow guest checkout. None of these differences is itself a red flag, but understanding which model you are dealing with sets your expectations correctly.\n\nBefore paying, confirm three things: the pack size and price match what you intended, the stock status is genuinely available, and the supplier's contact details are real. That last check is quick — an email that replies or a phone number that connects separates a functioning business from an abandoned storefront.",
      },
      {
        title: "Payment Methods and What They Signal",
        body: "Payment method is one of the clearest signals of how established a supplier is, because the options available to a business reflect its banking relationships and its tolerance for chargebacks.",
        table: {
          header: ["Method", "What it usually indicates"],
          rows: [
            ["Debit/credit card", "An established merchant account; card networks impose some accountability"],
            ["Bank transfer", "Common with UK suppliers; offers no chargeback protection, so verify first"],
            ["Crypto only", "Weaker accountability; often a short-term or anonymous operation"],
            ["Cash on collection", "Rare; only relevant if you can physically visit a UK premises"],
          ],
        },
      },
      {
        title: "Delivery Expectations in the UK",
        body: "Delivery times in the UK research market split cleanly by where the stock sits. Suppliers holding UK inventory typically dispatch within one to two working days and deliver within a few days. Suppliers drop-shipping from overseas — sometimes advertised as a UK storefront — quote longer windows that frequently slip, and volatile international postage means the estimate can move after you have paid.\n\nIt is also worth checking how a supplier handles problems. A supplier with a published returns or resolution policy and a working contact route will address a missing or damaged order; a storefront with no contact method and no policy has no mechanism to make anything right. For research-use-only products, returns are often restricted for legal reasons, which makes pre-purchase verification even more important — once material has shipped, reversing the transaction is rarely straightforward.\n\nThe practical rule is to favour suppliers who hold UK stock, state their shipping origin clearly, and provide a contact route that responds before you order.",
        list: [
          "Check the stated shipping origin — UK-held stock from a UK supplier is the lowest-risk combination.",
          "Confirm stock status on the listing itself, not just on a marketing page.",
          "Read any delivery and resolution policy before paying; research-use-only terms often limit returns.",
          "Test the contact route with a question before ordering, not after.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I legally buy tirzepatide online in the UK?",
        answer:
          "Tirzepatide is a prescription-only medicine and cannot legally be sold to the public for human use. UK research-chemical suppliers sell it under research-use-only terms for laboratory and educational purposes. ViralPeps lists suppliers in that context and does not provide guidance on obtaining it for personal use.",
      },
      {
        question: "What payment methods do UK tirzepatide suppliers accept?",
        answer:
          "Most established UK research suppliers take card payments, often alongside bank transfer. Card processing implies an established merchant account with some accountability. Crypto-only payment is a weaker signal and is common among anonymous operations, so treat it as a reason to verify the supplier more carefully.",
      },
      {
        question: "How long does UK tirzepatide delivery take?",
        answer:
          "Suppliers holding UK stock typically dispatch within one to two working days and deliver within a few days. Overseas drop-shipped listings quote longer windows that often slip, and import handling may fall to the buyer. Check the stated shipping origin before ordering.",
      },
      {
        question: "What should I check before paying a tirzepatide supplier?",
        answer:
          "Confirm the pack size and price, confirm the listing is genuinely in stock, and verify the supplier is real — a published COA from a named lab, a contact route that replies, research-use-only labelling and a registered business identity. These checks take minutes and are the difference between a purchase and a gamble.",
      },
      {
        question: "Is it safe to buy tirzepatide from an overseas storefront?",
        answer:
          "Overseas listings carry more risk: no UK presence to resolve problems, longer and less predictable delivery, and no UK consumer protections. They may also present as UK-facing while shipping from abroad. If a supplier's origin is unclear, that opacity is itself worth weighing against the price advantage.",
      },
    ],
    sources: [
      {
        label:
          "Tirzepatide Once Weekly for the Treatment of Obesity — SURMOUNT-1 (New England Journal of Medicine, 2022)",
        url: "https://pubmed.ncbi.nlm.nih.gov/35658024/",
      },
      {
        label:
          "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes — SURPASS-2 (New England Journal of Medicine, 2021)",
        url: "https://pubmed.ncbi.nlm.nih.gov/34170647/",
      },
    ],
    tableMode: "full",
    tableHeading: "Buy Tirzepatide Online UK — Current Listings",
    rowLimit: 20,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "tirzepatide-uk-supplier",
    title: "Tirzepatide UK Supplier: How to Verify Before You Buy",
    description:
      "Tirzepatide uk supplier — how to check a supplier's Certificates of Analysis, stock, business identity and TrustScore, and which UK suppliers meet the bar.",
    h1: "Tirzepatide UK Supplier",
    focusKeyword: "tirzepatide uk supplier",
    intro: [
      "Choosing a tirzepatide uk supplier is really a question of verification, not preference. Any storefront can list a price and take an order; very few can evidence that the material is what they claim it is. This page sets out exactly how to check a supplier, and shows which UK suppliers currently meet the bar.",
      "The verification stack has four layers, in order of decisiveness: a Certificate of Analysis from a named laboratory referencing a batch number; a working contact route; research-use-only compliance language throughout; and a confirmed business identity behind the domain. A supplier that passes all four is in a different category from one that passes none, even if their prices look similar.",
      "Below is a live ranking of UK tirzepatide suppliers by TrustScore, our transparent 0–100 measure built from independently verified signals. It is not for sale and cannot be improved by paying — the only thing a supplier can do to influence it is publish better documentation and run a more accountable business.",
      "Tirzepatide is a prescription medicine in the UK; the suppliers here operate under research-use-only terms and nothing on this page is medical guidance. For the market view, see [**Tirzepatide UK →**](/compounds/tirzepatide).",
    ],
    sections: [
      {
        title: "The Four Checks That Matter Most",
        body: "Verification sounds complicated, but it reduces to four checks you can perform on any supplier in a few minutes. Each one is hard to fake without actually running a legitimate operation, which is what makes them useful.",
        list: [
          "Certificate of Analysis — from a named independent laboratory, referencing a specific batch number, ideally hosted on the supplier's own domain. Generic COAs without a batch reference prove nothing about the material you receive.",
          "Working contact route — an email that replies or a phone number that connects. Test it with a real question before ordering rather than discovering it is dead afterwards.",
          "Research-use-only compliance — clear RUO labelling throughout, with no marketing implying human or medical use. Absence of compliance language is both a legal red flag and a signal of a short-term operation.",
          "Business identity and domain ownership — a registered company or verifiable sole trader behind the storefront, and proven control of the domain. Our TrustScore badge exists for exactly this: a supplier installs it on their own site, proving they control the domain they sell from.",
        ],
      },
      {
        title: "How TrustScore Ranks UK Tirzepatide Suppliers",
        body: "TrustScore is a 0–100 measure built from fixed, non-purchasable signals collected automatically and refreshed rather than archived. Published COAs and lab testing carry the greatest weight, followed by verified contact, genuine third-party reviews, research-use compliance, shipping and support, and a real storefront. Serious failures cap the score, and the method is not for sale.\n\nThe intended reading is comparative, not absolute. A supplier scoring in the high range has demonstrated several verification signals; one scoring low has not. Because the underlying data is refreshed, a supplier who stops publishing COAs will see their score fall over time, which is the point — verification is treated as a current state, not a permanent award.",
        table: {
          header: ["Signal", "Weight", "What it establishes"],
          rows: [
            ["Published COA / lab testing", "Highest", "Material was independently tested and traceable"],
            ["Verified contact", "High", "A real, reachable business behind the storefront"],
            ["Genuine reviews", "Medium", "Independent evidence of trading history"],
            ["RUO compliance", "Medium", "Awareness of legal obligations"],
            ["Shipping & support", "Medium", "Operational reliability"],
            ["Domain ownership", "Medium", "Rules out throwaway storefronts"],
          ],
        },
      },
      {
        title: "Suppliers to Avoid — Patterns That Repeat",
        body: "Across every supplier audit we run, the same red flags reappear. Recognising them saves the cost of learning by experience.\n\nA brand-new domain with no trading history, no COA and crypto-only payment is the classic profile of a storefront built to extract money and disappear. Prices that sit far below the market range are another: in an unregulated market that usually means a quantity smaller than advertised or material with no testing behind it. Marketing language that implies human or medical use is a compliance failure and often signals an operation that will not survive scrutiny.\n\nPerhaps the most underrated flag is a dead contact route. A supplier you cannot reach is a supplier with no mechanism to resolve a problem, and the absence of any reply over several days is a decision the supplier has effectively already made for you.",
      },
    ],
    faq: [
      {
        question: "How do I check if a UK tirzepatide supplier is legitimate?",
        answer:
          "Run four checks: a Certificate of Analysis from a named lab with a batch number, a contact route that replies, clear research-use-only labelling, and a registered business identity with confirmed domain ownership. A supplier that passes all four is verifiable; one that passes none should be avoided regardless of price.",
      },
      {
        question: "What is a good TrustScore for a tirzepatide supplier?",
        answer:
          "Treat it comparatively. Higher scores mean more verification signals were confirmed — published COAs, verified contact, genuine reviews, compliance and domain ownership. A low score means those signals were absent. Because the data is refreshed, scores move as a supplier's behaviour changes.",
      },
      {
        question: "Can a supplier pay to improve their TrustScore?",
        answer:
          "No. TrustScore is built from independently verified signals and is not for sale. Domain verification by installing the badge confirms ownership only and does not influence other signals or the ordering of the tables on this site.",
      },
      {
        question: "Does a Certificate of Analysis guarantee the material is genuine?",
        answer:
          "Only if it comes from a named third-party laboratory, references a batch number, and that batch number matches the vial you receive. A generic COA with no batch reference cannot establish that the material you bought was the material tested.",
      },
      {
        question: "Why do some UK suppliers not appear on this site?",
        answer:
          "Usually because the verification signals were not there to find — a dead domain, no working contact route, or no compliance language at all. We would rather track fewer suppliers honestly than list storefronts nobody can verify. A supplier can be added once those signals exist.",
      },
    ],
    sources: [
      {
        label:
          "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes — SURPASS-2 (New England Journal of Medicine, 2021)",
        url: "https://pubmed.ncbi.nlm.nih.gov/34170647/",
      },
      {
        label:
          "Tirzepatide for the Treatment of Obstructive Sleep Apnea and Obesity — SURMOUNT-OSA (New England Journal of Medicine, 2024)",
        url: "https://pubmed.ncbi.nlm.nih.gov/38912654/",
      },
    ],
    tableMode: "trust",
    tableHeading: "Tirzepatide UK Suppliers — Ranked by TrustScore",
    rowLimit: 25,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-tirzepatide-peptide",
    title: "Best Tirzepatide Peptide UK: Ranked by TrustScore 2026",
    description:
      "Best tirzepatide peptide — UK listings ranked by independent TrustScore, purity verification and price, so you can see which suppliers actually meet the bar.",
    h1: "Best Tirzepatide Peptide",
    focusKeyword: "best tirzepatide peptide",
    intro: [
      "The best tirzepatide peptide is not the cheapest listing or the one with the loudest marketing — it is the one you can verify at the pack size you need. This page ranks UK tirzepatide listings by TrustScore, our transparent 0–100 measure built from independently confirmed signals, with price shown alongside so you can weigh verification against cost.",
      "TrustScore puts documentation first. A published Certificate of Analysis from a named laboratory, verified contact, genuine third-party reviews, research-use compliance, and confirmed domain ownership all count; serious failures cap the score. None of it can be bought, which is what makes the ranking worth reading.",
      "Below is the live ranked table, regenerated as our underlying verification data refreshes. Because the signals are re-collected rather than archived, a supplier that stops publishing COAs will drift down the ranking over time — the list reflects current state, not reputation.",
      "Tirzepatide is a prescription-only medicine in the UK and the suppliers here operate strictly under research-use-only terms. Nothing on this page is medical advice. For the wider market, see the [**Tirzepatide price comparison hub →**](/compounds/tirzepatide).",
    ],
    sections: [
      {
        title: "How We Rank Tirzepatide Peptides in the UK",
        body: "The ranking above is driven by TrustScore, which weights fixed, non-purchasable signals. Published COAs and independent lab testing carry the most weight because they are the hardest to fake and the most useful to a buyer; verified contact, genuine reviews, compliance language, shipping and support, and proven domain ownership follow. Where scores tie, price breaks the tie.\n\nThis ordering is a deliberate choice to put verifiability ahead of cost. A supplier with a strong verification record and a slightly higher price is usually the better purchase than a cheaper one with no documentation, because the difference in price is small and the difference in risk is not.\n\nThe data behind the ranking is refreshed rather than archived, so the list moves as suppliers' behaviour changes. A supplier that introduces published COAs will rise; one that removes them will fall. That responsiveness is the reason to trust the ranking more than a one-off review.",
      },
      {
        title: "What Separates the Best From the Rest",
        body: "Across the UK listings we track, the strongest suppliers share a set of habits rather than a single feature.",
        list: [
          "They publish batch-linked COAs from a named laboratory as standard, not on request.",
          "They maintain a contact route that actually replies, and they answer questions before a sale.",
          "They label consistently for research use and avoid any implication of human or medical use.",
          "They operate behind a registered business and a domain they demonstrably control.",
          "They keep stock status honest, rather than listing speculative availability.",
        ],
      },
      {
        title: "Common Red Flags to Watch For",
        body: "Certain patterns reliably indicate a supplier worth avoiding, regardless of how attractive the price looks.",
        list: [
          "Purity percentages quoted with no linked Certificate of Analysis, or a COA that names no testing laboratory.",
          "Marketing language that implies human or medical use — a compliance failure, and often a sign of a short-term operation.",
          "No working contact route, or a contact form that produces no reply over several days.",
          "A domain registered very recently combined with crypto-only payment and no published documentation.",
          "Prices dramatically below the market range for the stated pack size, which in an unregulated market usually indicates either a smaller quantity than advertised or material with no testing behind it.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the best tirzepatide peptide in the UK?",
        answer:
          "The best option is the highest-scoring supplier you can verify at the pack size you need. ViralPeps ranks UK tirzepatide listings by TrustScore, which weights published COAs, contact verification, genuine reviews, compliance and domain ownership ahead of price.",
      },
      {
        question: "Is the best tirzepatide peptide the most expensive one?",
        answer:
          "No. Price and verifiability are separate signals. Some high-scoring suppliers are also among the cheaper listings on a per-mg basis. The ranking on this page surfaces verification first and shows price alongside it, so you can judge both.",
      },
      {
        question: "How is TrustScore calculated?",
        answer:
          "TrustScore scores fixed, non-purchasable signals: published Certificates of Analysis from a named lab, verified contact, genuine reviews, research-use compliance, shipping and support, and confirmed domain ownership. Serious failures cap the score, and the method is not for sale.",
      },
      {
        question: "Does a Certificate of Analysis guarantee purity?",
        answer:
          "Only if it comes from a named third-party laboratory, references a batch number, and that number matches the vial you receive. Generic COAs without a batch reference do not establish that the material you bought was the material tested.",
      },
      {
        question: "Can a supplier pay to improve their TrustScore?",
        answer:
          "No. The method is built from independently verified signals and is not for sale. Domain verification is free for suppliers who install the badge, but it confirms ownership only — it does not influence the other scoring signals or the ordering of this table.",
      },
    ],
    sources: [
      {
        label:
          "Tirzepatide Once Weekly for the Treatment of Obesity — SURMOUNT-1 (New England Journal of Medicine, 2022)",
        url: "https://pubmed.ncbi.nlm.nih.gov/35658024/",
      },
      {
        label:
          "Efficacy and safety of tirzepatide in type 2 diabetes: a systematic review and meta-analysis (Frontiers in Endocrinology, 2023)",
        url: "https://pubmed.ncbi.nlm.nih.gov/37265666/",
      },
    ],
    tableMode: "trust",
    tableHeading: "Best Tirzepatide Peptide UK — Ranked by TrustScore",
    rowLimit: 25,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
