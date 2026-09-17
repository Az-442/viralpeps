/**
 * Retatrutide silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes (per retatrutide-silo-spec.md).
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/retatrutide-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
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
    slug: "where-to-buy-retatrutide",
    title: "Where to Buy Retatrutide UK: Verified Suppliers 2026",
    description:
      "Where to buy retatrutide uk — compare live prices from verified UK research suppliers, then check stock, shipping and purity before you order online today.",
    h1: "Where to Buy Retatrutide UK",
    focusKeyword: "where to buy retatrutide uk",
    intro: [
      "If you are asking where to buy retatrutide uk researchers run into a genuine problem: the search results are dominated by overseas storefronts with no verifiable UK presence, no published Certificates of Analysis and prices that change every week. Retatrutide is a triple agonist — a single molecule acting on the GIP, GLP-1 and glucagon receptors — and it is one of the most heavily counterfeited research peptides in circulation.",
      "This page answers the question with data rather than opinion. Below is a live table of every UK supplier ViralPeps tracks for retatrutide, sorted by price, with pack size, stock status and a direct link to each listing. It is regenerated from our weekly price scrape, so what you see reflects those suppliers' own listing pages at the most recent check.",
      "The compound itself is well documented. The landmark phase 2 trial published in the New England Journal of Medicine in 2023 established retatrutide's triple-agonist profile in obesity research, and later work has extended the investigation into type 2 diabetes, liver disease and obstructive sleep apnoea. That scientific visibility is exactly why unverified material appears so readily in the market.",
      "Everything here is presented for laboratory and educational reference. Retatrutide is not licensed for human use anywhere in the world, and nothing on this page is medical guidance. For a broader overview of the compound's research profile, start with the [**Retatrutide price comparison hub →**](/compounds/retatrutide).",
    ],
    sections: [
      {
        title: "Where to Buy Retatrutide UK — What Actually Matters",
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
      },
      {
        title: "UK Stock vs Overseas Shipping",
        body: "One difference that rarely shows up in search results is where the parcel actually ships from. A UK-based supplier typically dispatches the next working day and delivers within one to three working days domestically, which matters if a research schedule has a fixed start date. Overseas listings can look cheaper on the headline price but add customs handling, longer transit and — for cold-chain items — a real risk of temperature exposure in transit.\n\nWhen comparing the rows below, read the pack size as carefully as the price. A low-cost listing for a small vial and a mid-range listing for a large one are not competing offers; the per-mg column normalises them so you are comparing like with like. This is the single most common mistake we see researchers make when they first use a comparison site.",
      },
      {
        title: "What to Check Before You Order",
        body: "Three checks take under five minutes and eliminate most of the risk attached to buying research peptides online.",
        list: [
          "Match the COA batch number to the batch printed on the vial you receive. A generic COA with no batch reference proves nothing about the material in your vial.",
          "Confirm the pack size in milligrams, not just the price. Retatrutide is commonly sold in 5mg, 10mg, 20mg, 30mg and 40mg presentations, and some suppliers list pen formats separately.",
          "Check the supplier's current listing page rather than a cached search result — research peptide pricing and stock move quickly, which is exactly why we re-scrape weekly rather than publishing a static table.",
        ],
      },
      {
        title: "What Retatrutide Is and Why UK Research Interest Is High",
        body: "Retatrutide is a single synthetic peptide engineered to agonise three receptors simultaneously: GIP, GLP-1 and glucagon. That triple mechanism distinguishes it from the dual agonists that preceded it, and it is the reason the compound attracted so much attention following the 2023 phase 2 readout.\n\nSubsequent research has explored the compound across metabolic dysfunction-associated steatotic liver disease, body composition in type 2 diabetes, and — more recently — obstructive sleep apnoea and knee osteoarthritis in the TRIUMPH registrational programme. For a researcher, that breadth of published interest is useful; for a supplier, it is a marketing opportunity, which is why so many storefronts list it.\n\nThe practical consequence is that supply is broad and quality is uneven. Comparing across many suppliers, as the table above does, is a better strategy than committing to the first result a search engine returns.",
      },
      {
        title: "Where to Look Next",
        body: "If price is your primary concern, the [**cheapest retatrutide UK guide →**](/compound-guides/cheapest-retatrutide-uk) ranks every listing by verified cost per milligram rather than headline price — a different ordering entirely. If you want the complete picture without a shortlist, the [**retatrutide price comparison UK →**](/compound-guides/retatrutide-price-comparison-uk) page shows every tracked supplier side by side.\n\nFor the ordering mechanics — payment methods, dispatch times and what a supplier's checkout tells you about how established they are — see the [**buy retatrutide online UK guide →**](/compound-guides/buy-retatrutide-online-uk). And if verifiability matters more to you than price, the [**best retatrutide peptide ranking →**](/compound-guides/best-retatrutide-peptide) orders suppliers by TrustScore instead.",
      },
    ],
    faq: [
      {
        question: "Where can I buy retatrutide in the UK?",
        answer:
          "ViralPeps tracks verified UK research suppliers for retatrutide and compares their live prices side by side. The table on this page lists every supplier we currently track, with pack size, price, price per mg and stock status. It is refreshed weekly from the suppliers' own listing pages.",
      },
      {
        question: "How do I know a retatrutide supplier is legitimate?",
        answer:
          "Look for a published Certificate of Analysis from a named third-party laboratory with a batch number, a working contact method, a registered business identity and clear research-use-only labelling. Confirmed domain ownership is the final signal. All five are what our TrustScore method checks.",
      },
      {
        question: "Is it cheaper to buy retatrutide from a UK supplier or overseas?",
        answer:
          "Headline prices are often lower overseas, but UK suppliers typically deliver in one to three days with no customs handling. Normalised by price per mg, the UK market is frequently competitive — and you avoid transit-time risk to the product.",
      },
      {
        question: "What pack sizes does retatrutide come in?",
        answer:
          "UK suppliers most commonly list 5mg, 10mg, 20mg, 30mg and 40mg vials, with some offering pen formats. The per-mg column on our table lets you compare across different pack sizes on a like-for-like basis.",
      },
      {
        question: "Does ViralPeps sell retatrutide?",
        answer:
          "No. ViralPeps is a price comparison and supplier directory only. We do not sell peptides, hold stock, or take orders. Every listing links out to the supplier's own website, and all compounds referenced on this site are for in-vitro research use only.",
      },
    ],
    sources: [
      {
        label: "Retatrutide — A Game Changer in Obesity Pharmacotherapy (Biomolecules, 2025)",
        url: "https://pubmed.ncbi.nlm.nih.gov/40563436/",
      },
      {
        label: "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — Phase 2 Trial (NEJM, 2023)",
        url: "https://pubmed.ncbi.nlm.nih.gov/37366315/",
      },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy Retatrutide — UK Suppliers",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-retatrutide-uk",
    title: "Cheapest Retatrutide UK: Lowest Price Per mg 2026",
    description:
      "Cheapest retatrutide uk — every UK supplier ranked by its verified price per mg, not headline price. Live supplier data refreshed weekly for fair comparisons.",
    h1: "Cheapest Retatrutide UK",
    focusKeyword: "cheapest retatrutide uk",
    intro: [
      "Finding the cheapest retatrutide uk listing is not the same as finding the cheapest vial. Retatrutide is sold in pack sizes from 5mg to 40mg, and the supplier with the lowest headline price is frequently the most expensive per milligram. This page ranks UK suppliers by verified price per milligram so the comparison is genuinely like for like.",
      "The table below sorts every UK listing we track by cost per milligram, ascending. That single change reorders the market: some of the most expensive-sounding listings turn out to be the best value, while some of the cheapest-looking ones fall away once pack size is accounted for.",
      "Prices are pulled live from our weekly scrape of supplier listing pages. Nothing on this page is hardcoded — when a supplier changes a price, the table follows on the next build. That matters more than it might sound in a market where repricing happens without notice.",
      "If you want the wider picture rather than a shortlist, the [**Retatrutide price comparison hub →**](/compounds/retatrutide) shows every supplier alongside the compound's research profile.",
    ],
    sections: [
      {
        title: "Why Price Per mg Is the Only Fair Way to Compare",
        body: "A low-priced small vial sounds cheaper than a mid-priced large one until you notice the pack sizes differ substantially. Once you divide price by milligrams, the picture frequently inverts, and the larger pack can work out at roughly half the cost per milligram.\n\nHeadline price rewards small packs; price per milligram rewards the genuinely better deal. That is why we lead with it here rather than listing suppliers in the order their prices appear on their own sites.\n\nWe compute it directly: the listed price divided by the milligram figure in the pack label. Where a supplier sells a pen format or an unusual presentation without a clean milligram figure, the row shows a dash rather than a fabricated number — an invented figure would be worse than an honest gap.",
      },
      {
        title: "Cheapest Retatrutide UK — The Current Market",
        body: "The UK retatrutide market is unusually wide, and the spread between the lowest and highest price per milligram is substantial. Notably, it does not track supplier size. Smaller specialist laboratories frequently undercut the larger storefronts on a per-milligram basis while offering equivalent HPLC documentation and, in several cases, better batch traceability.\n\nUse the table above as your shortlist, then verify the supplier before ordering. The cheapest listing is only useful if the supplier can show you a batch-matched Certificate of Analysis — otherwise you have found the cheapest unverifiable option, which is not the same thing.",
      },
      {
        title: "Cheapest Does Not Mean Best Value",
        body: "Price is one input; verifiability is the other. A supplier at the bottom of the price table who publishes a batch-numbered COA from a named laboratory is better value than a marginally cheaper one who publishes nothing. The difference in cost per milligram is usually a few pence; the difference in what you can verify is total.\n\nOur TrustScore method scores suppliers on published COAs, contact verification, genuine reviews, research-use compliance, shipping reliability and confirmed domain ownership. None of those signals can be purchased, which is what makes the score meaningful rather than decorative. If you want the ranking that weights price and verifiability together rather than price alone, read the [**best retatrutide peptide guide →**](/compound-guides/best-retatrutide-peptide) instead.",
      },
      {
        title: "How Often These Prices Change",
        body: "Research peptide pricing moves quickly. Suppliers reprice as batch costs shift, and stock can disappear and reappear within days. Our scraper re-checks every tracked listing weekly and the tables on this site render from that dataset, so a page refresh always shows the current scrape rather than a snapshot from months ago.\n\nIf you are comparing this page against a cached search result or a screenshot, trust the live page. This is also why we do not publish a \"cheapest supplier\" as a permanent statement — the answer genuinely changes.",
      },
      {
        title: "Pack Size Strategy",
        body: "If you have determined your required quantity, the cheapest option on a per-milligram basis is almost always the larger pack. The trade-off is absolute outlay and storage: more material means more committed spend and a longer period holding lyophilised powder under cold conditions.\n\nFor most laboratory work the sensible sequence is: decide the pack size that matches your schedule, then find the cheapest supplier at that size, then verify that supplier. Chasing the lowest per-milligram figure into a pack size you will not use before it degrades is not a saving.",
      },
      {
        title: "Where to Compare Further",
        body: "For the full supplier set without a row limit, see the [**retatrutide price comparison UK →**](/compound-guides/retatrutide-price-comparison-uk) page. If you are still deciding which suppliers are worth your time, the [**where to buy retatrutide UK guide →**](/compound-guides/where-to-buy-retatrutide) covers the verification checklist in detail, and the [**best retatrutide peptide →**](/compound-guides/best-retatrutide-peptide) page ranks by TrustScore. For current stock availability across the market, see [**retatrutide for sale →**](/compound-guides/retatrutide-for-sale).",
      },
      {
        title: "Retatrutide Pricing Benchmarks Explained",
        body: "It helps to know where the money actually goes. Across the UK market, the cost of a retatrutide listing is driven by four things: the milligram quantity in the pack, the batch size the supplier bought, whether third-party HPLC testing was commissioned for that batch, and the supplier's own margin. Only the first of those is visible on a product page, and it is the one most buyers fixate on.\n\nA supplier who commissions independent testing on every batch carries a real per-unit cost that a supplier who republishes an old COA does not. That difference shows up as a few pence per milligram, and it is usually worth paying. What is not worth paying for is a premium that reflects branding rather than testing — some of the most expensive listings in the table above have no better documentation than the cheapest ones.\n\nIt is also worth noting that price per milligram tends to fall as pack size rises, but not linearly. A pack four times the size of another does not usually cost four times as much, which is why the largest packs dominate the top of a per-milligram ranking. That is a structural feature of this market, not a temporary anomaly, and it will persist as long as suppliers price by batch.",
      },
      {
        title: "Setting a Realistic Budget",
        body: "If you are new to comparing research peptides, the spread in this table can be genuinely surprising. A useful approach is to decide first what quantity you need and over what period, then check what the cheapest verified supplier charges for exactly that, rather than being drawn towards whichever supplier currently sits at the top of a per-milligram ranking.\n\nBudget for verification as well as product. Where a supplier offers a larger pack at a marginally better per-milligram rate but you will only use a fraction of it, the effective cost of what you actually consume is higher, not lower. The same logic applies to storage: material held beyond its stable window is material you have paid for and cannot use.\n\nFinally, treat any price you see on a cached page or a forum screenshot as unreliable. The live table above is refreshed weekly from supplier listing pages, and it is the only version of these numbers we stand behind.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest retatrutide in the UK?",
        answer:
          "The lowest price changes as suppliers reprice stock. This page ranks every UK listing we track by price per mg, so the top row is the current cheapest on that basis. It is refreshed weekly from live supplier listing pages.",
      },
      {
        question: "Why is price per mg better than the headline price?",
        answer:
          "Retatrutide is sold in 5mg to 40mg packs. A small vial with a low headline price can cost far more per milligram than a larger one. Ranking by price per mg normalises different pack sizes onto a single comparable number.",
      },
      {
        question: "Is the cheapest retatrutide supplier the safest?",
        answer:
          "Not automatically. Price and verifiability are separate signals. Check that the supplier publishes a Certificate of Analysis with a batch number from a named third-party laboratory, and that they have a working contact route, before ordering.",
      },
      {
        question: "How often are retatrutide prices updated?",
        answer:
          "ViralPeps re-scrapes every tracked UK supplier listing weekly. The tables on this site render from that scraped data, so they always reflect the most recent check rather than a fixed snapshot.",
      },
      {
        question: "Do pen formats work out cheaper?",
        answer:
          "Not consistently. Pen presentations are priced differently from standard vials and do not always map cleanly onto a per-mg figure, which is why those rows show a dash in the per-mg column. Compare the total pack price against the mg delivered before assuming a pen is better value.",
      },
    ],
    sources: [
      {
        label:
          "Efficacy and safety of retatrutide (TRANSCEND-T2D-1), phase 3 trial (The Lancet, 2026)",
        url: "https://pubmed.ncbi.nlm.nih.gov/42250575/",
      },
      {
        label:
          "Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for type 2 diabetes — phase 2 trial (The Lancet, 2023)",
        url: "https://pubmed.ncbi.nlm.nih.gov/37385280/",
      },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest Retatrutide UK — Ranked by Price Per mg",
    rowLimit: 25,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "retatrutide-price-comparison-uk",
    title: "Retatrutide Price Comparison UK: All Suppliers Compared",
    description:
      "Retatrutide price comparison uk — every tracked UK supplier side by side, with pack size, price and price per mg. Live data refreshed weekly for UK buyers.",
    h1: "Retatrutide Price Comparison UK",
    focusKeyword: "retatrutide price comparison uk",
    intro: [
      "A retatrutide price comparison uk researchers can rely on has to do three things: cover every supplier, normalise pack sizes, and refresh often enough that the numbers are still true when you read them. This page does all three. The table below is the complete set of UK retatrutide listings ViralPeps tracks, sorted by price ascending with no row limit.",
      "Retatrutide is a triple receptor agonist — GIP, GLP-1 and glucagon — and interest in it has made the UK market unusually crowded. That is good for competition and bad for transparency: the same compound appears at wildly different prices across dozens of storefronts, in pack sizes that make headline prices almost meaningless on their own.",
      "Every figure here is rendered live from our weekly scrape of supplier listing pages, presented for research and educational reference. This page is the no-filter view; if you would rather see a ranked shortlist, the [**cheapest retatrutide UK →**](/compound-guides/cheapest-retatrutide-uk) and [**best retatrutide peptide →**](/compound-guides/best-retatrutide-peptide) pages approach the same data from opposite directions.",
      "For the compound's specifications, mechanism and research background, the [**Retatrutide hub page →**](/compounds/retatrutide) carries the full profile.",
    ],
    sections: [
      {
        title: "Retatrutide Price Comparison UK — Reading the Table",
        body: "The table lists four things that matter: which supplier, what pack size they sell, what they charge, and what that works out to per milligram. A tick beside a supplier name marks an independently verified vendor under our TrustScore method, meaning they publish COAs, have a verified contact route and a confirmed domain.\n\nThe per-milligram column is the one to focus on. It is the only figure that lets you compare a small vial against a large one without doing arithmetic yourself, and it frequently reorders the table when you sort by it. Where a supplier sells a pen or an unusual presentation without a clean milligram figure, that cell shows a dash rather than an invented number.",
      },
      {
        title: "The Spread Across the UK Market",
        body: "Even setting pack size aside, the UK market shows a genuinely wide range. Some of that spread is legitimate — batch costs, third-party testing, domestic cold-chain handling and packaging all carry real expense — and some of it is simply margin. Comparing across the full table rather than the first few rows is the fastest way to see which is which.\n\nIt is also worth comparing against the adjacent compounds in the same class. Retatrutide sits alongside semaglutide, tirzepatide, survodutide and cagrilintide, and the price relationships between them shift as supply matures and as new research is published. For a researcher deciding between mechanisms, the relative pricing is as informative as the absolute pricing.",
      },
      {
        title: "Pack Sizes and Presentations",
        body: "UK suppliers most commonly list retatrutide in 5mg, 10mg, 20mg, 30mg and 40mg vials. Several also offer a pen presentation, priced differently and not always mapping cleanly onto a per-milligram figure — so those rows show the price and pack label without a per-mg derivation.\n\nBuying a larger pack almost always reduces cost per milligram, but it also increases the upfront spend and the amount of material held in cold storage. For most laboratory work the practical question is which pack size matches your research schedule, then which supplier is cheapest at that size.",
      },
      {
        title: "Why Prices Move",
        body: "Research peptide pricing is not stable in the way consumer goods are. Batch sizes vary, third-party testing costs are absorbed or passed on, and stock cycles in and out. A supplier who is cheapest this month may not be next month, and a listing that is in stock today may be gone by the weekend.\n\nThat is why we re-scrape weekly rather than publishing a one-off table. A price comparison that is six months old is not a comparison — it is a historical record, and acting on it means acting on information that is no longer true.",
      },
      {
        title: "How to Use This Table",
        body: "Treat the comparison as a shortlist generator rather than a decision engine. Scan for the pack size you need, note the two or three cheapest suppliers at that size, then run each through the verification checklist: published COA with batch number from a named laboratory, working contact route, clear research-use-only labelling, verifiable business identity behind the domain.\n\nThe supplier who survives verification is your answer, even if they are one or two places down the price table. The [**where to buy retatrutide UK guide →**](/compound-guides/where-to-buy-retatrutide) walks through that checklist step by step, and the [**buy retatrutide online UK guide →**](/compound-guides/buy-retatrutide-online-uk) covers what to expect at checkout.",
      },
      {
        title: "What This Page Does Not Do",
        body: "ViralPeps does not sell peptides. We hold no stock, take no orders and accept no payment from buyers. Every listing links out to the supplier's own website, where the transaction happens entirely between you and them.\n\nWe also do not accept payment to alter a supplier's position in this table. The order is determined by price and by data, and the verification ticks reflect checks rather than commercial arrangements. Where a supplier is featured elsewhere on the site, that is a separate, labelled placement — the comparison table itself stays ordered by price.",
      },
      {
        title: "What a Good Comparison Page Should Show",
        body: "Most comparison content in this category fails in one of three ways. It lists prices without pack sizes, which makes the numbers incomparable. It covers a handful of well-known suppliers while omitting the smaller laboratories where the best per-milligram rates often sit. Or it is published once and never revisited, so the figures decay quietly in the background while still appearing authoritative.\n\nThis page is built to avoid all three. Every row carries a pack size alongside the price, the table covers the full set of suppliers we track with no shortlist, and the underlying dataset is refreshed weekly by an automated scraper that visits each supplier's own listing page rather than relying on a search index.\n\nThat last point matters more than it sounds. Search indexes lag. A listing that appears current in search results may have been changed weeks earlier, and a supplier who has since delisted a product can still appear to offer it. Reading prices from the supplier's own page is the only method that reflects reality.",
      },
      {
        title: "Comparing Across the GLP-1 Class",
        body: "Retatrutide does not exist in isolation. Researchers working in metabolic and weight-related areas typically compare across several compounds in the same broad class: semaglutide, tirzepatide, survodutide, mazdutide and cagrilintide among them. Each has a different receptor profile and a different evidence base, and the pricing relationships between them shift as supply matures.\n\nFrom a pure cost perspective, retatrutide tends to sit at a premium relative to the earlier single and dual agonists, which is consistent with its more recent research profile and the greater complexity of its synthesis. Whether that premium is justified depends entirely on your research question rather than on the price itself.\n\nFor researchers comparing mechanisms, our compound pages for each of those peptides carry their own supplier sets and pricing, so the comparison can be run on exactly the same basis as this one.",
      },
    ],
    faq: [
      {
        question: "How many UK suppliers sell retatrutide?",
        answer:
          "ViralPeps currently tracks a large set of UK research suppliers listing retatrutide, with the exact figure shown in the table footnote and updated as suppliers are added or delisted. The table above lists every one of them, with no row limit.",
      },
      {
        question: "What is the price range for retatrutide in the UK?",
        answer:
          "The range spans from the lowest to the highest tracked listing and is recalculated from live data on every page load. Because pack sizes differ widely, the per-mg column is the fairer comparison than the headline price.",
      },
      {
        question: "Does the table include pen presentations?",
        answer:
          "Yes. Suppliers offering pen formats are included with their pack label. Where the presentation does not map cleanly onto a milligram figure, the per-mg cell shows a dash rather than a derived number.",
      },
      {
        question: "How current is this price comparison?",
        answer:
          "The underlying data is refreshed weekly by our price scraper, which checks each supplier's own listing page. Every table on this site renders from that dataset, so it reflects the most recent scrape rather than a stored snapshot.",
      },
      {
        question: "Can suppliers pay to rank higher in the table?",
        answer:
          "No. The comparison table is ordered by price and by data only. Verification ticks reflect independent checks, not commercial arrangements, and featured placements elsewhere on the site are labelled as such and never alter the table ordering.",
      },
    ],
    sources: [
      {
        label:
          "Effects of retatrutide on body composition in people with type 2 diabetes (Lancet Diabetes & Endocrinology, 2025)",
        url: "https://pubmed.ncbi.nlm.nih.gov/40609566/",
      },
      {
        label:
          "Retatrutide for metabolic dysfunction-associated steatotic liver disease, phase 2a trial (Nature Medicine, 2024)",
        url: "https://pubmed.ncbi.nlm.nih.gov/38858523/",
      },
    ],
    tableMode: "full",
    tableHeading: "Retatrutide Price Comparison — All UK Suppliers",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-retatrutide-online-uk",
    title: "Buy Retatrutide Online UK: Ordering & Delivery Guide",
    description:
      "Buy retatrutide online uk — how ordering works with UK research suppliers, including payment methods, delivery times, stock checks and pre-purchase checks.",
    h1: "Buy Retatrutide Online UK",
    focusKeyword: "buy retatrutide online uk",
    intro: [
      "To buy retatrutide online uk researchers deal with a market that looks like e-commerce but does not behave like it. There is no regulated supply chain, no standardised product listing and no consumer protection designed for this category — which means the due diligence sits entirely with the buyer. This guide covers how ordering actually works with UK suppliers and what to verify before you commit.",
      "Retatrutide's mechanism — simultaneous GIP, GLP-1 and glucagon receptor agonism — has made it one of the most discussed research peptides of the decade, and that demand has produced a large and uneven supplier landscape. The table below shows current UK listings with pack size, price and stock status, rendered live from our weekly scrape.",
      "All content is for laboratory and educational reference. Retatrutide is not approved for human use, and nothing here constitutes medical advice. For the wider supplier picture, start at the [**Retatrutide hub →**](/compounds/retatrutide) or the full [**price comparison →**](/compound-guides/retatrutide-price-comparison-uk).",
    ],
    sections: [
      {
        title: "Buy Retatrutide Online UK — How Ordering Works",
        body: "Most UK research suppliers sell through a standard e-commerce checkout: add the vial to a cart, pay, receive a dispatch notification. A handful operate on enquiry instead, where you email first and receive a payment link. Both models are normal in this market and neither is inherently better.\n\nThe step that separates good suppliers from poor ones happens after payment, not before. A serious supplier ships with a batch number that matches a published Certificate of Analysis, and packs the vial appropriately for transit. One that cannot tell you the batch reference is not a supplier to order from twice, whatever their price.",
      },
      {
        title: "Payment Methods and What They Tell You",
        body: "The payment method a supplier accepts is a useful signal about how established they are, and it is worth reading carefully rather than treating all options as equivalent.",
        list: [
          "Card or bank transfer indicates a supplier with a merchant relationship and, usually, a registered business behind them. It is the strongest combination available in this market.",
          "Crypto-only is common and not disqualifying on its own. Our TrustScore method gives a reduced weight to verified businesses that take crypto only, recognising that it is a legitimate operating choice but a weaker verification signal.",
          "A brand-new domain accepting only crypto, with no COA and no working contact route, is the combination to avoid entirely.",
        ],
      },
      {
        title: "Delivery Expectations in the UK",
        body: "UK-based research suppliers typically dispatch the next working day and deliver within one to three working days domestically. That is the practical advantage of buying from a UK supplier rather than an overseas one: no customs clearance, no extended transit, and no ambiguity about where the parcel is at any point.\n\nWhere a supplier publishes tracked shipping, that is a reasonable sign they handle volume regularly and have a process. For cold-chain sensitive material, transit time matters more than it does for stabilised lyophilised powder — but a shorter domestic route is a genuine benefit either way, particularly in warmer months.",
      },
      {
        title: "Before You Buy — The Five-Minute Check",
        body: "Run these checks against any supplier before your first order. They take under five minutes and eliminate most of the risk in this category.",
        list: [
          "Does the site publish a Certificate of Analysis, and does it name the testing laboratory? An unnamed lab tells you nothing.",
          "Is there a batch number on the COA that you can match to the vial on arrival? Without batch traceability the document proves nothing about your vial.",
          "Is there a working contact route — an email that gets a reply, or a phone number? Test it before you need it.",
          "Is the research-use-only labelling clear and consistent across the site, or does the marketing imply human use?",
          "Is there a verifiable business behind the domain? Our TrustScore badge confirms domain ownership for suppliers who install it.",
        ],
      },
      {
        title: "Storage on Arrival",
        body: "Retatrutide, like most lyophilised research peptides, should be stored cold and dry — typically well below freezing for long-term storage, with the vial kept sealed and away from light. Reconstituted material is considerably less stable and should be handled strictly according to the supplier's documentation.\n\nWe cover the practical handling steps in our reconstitution and storage guides if you want the full protocol, including the solvents and techniques appropriate to a lyophilised powder.",
      },
      {
        title: "Comparing Before You Order",
        body: "It is worth spending a few minutes on price before committing, because the spread in this market is wide enough that the difference is meaningful. The [**cheapest retatrutide UK →**](/compound-guides/cheapest-retatrutide-uk) page ranks listings by cost per milligram, which is the fairer metric across different pack sizes. If you would rather prioritise verifiability over price, the [**best retatrutide peptide →**](/compound-guides/best-retatrutide-peptide) page orders suppliers by TrustScore instead.\n\nFor a sense of what is currently in stock across the market — useful if your research schedule has a fixed start date — see [**retatrutide for sale →**](/compound-guides/retatrutide-for-sale).",
      },
      {
        title: "Understanding What You Are Ordering",
        body: "Retatrutide is supplied as a lyophilised powder in a sealed vial for the overwhelming majority of UK listings, with a minority offering pre-formulated pen presentations. The distinction is not cosmetic. Lyophilised powder is comparatively stable when kept cold and dry, and it gives the researcher control over reconstitution. A pen presentation is a formulated product with different handling requirements and a shorter practical window.\n\nWhen you order, confirm which form the listing refers to. Product titles are not always explicit, and a pack size quoted for a pen may refer to total peptide content rather than volume. If the listing is ambiguous, that ambiguity is itself a reason to look elsewhere — a supplier who cannot describe their own product clearly is unlikely to document a batch properly.\n\nPackaging matters too. A vial shipped in appropriate protective packaging with cold-chain handling where required arrives intact; one shipped in a padded envelope may not. Suppliers who publish their dispatch process are generally the ones who have thought about this.",
      },
      {
        title: "Returns, Disputes and What to Do If Something Is Wrong",
        body: "Because this is an unregulated market, there is no consumer protection framework designed for research peptide purchases. That makes the pre-purchase checks more important, not less, and it makes a supplier's responsiveness the single best predictor of how a problem will be resolved.\n\nTest the contact route before you need it. Send a straightforward question about batch documentation or dispatch times and see whether you get a substantive reply within a working day. A supplier who answers that promptly will usually engage if something goes wrong with an order. One who does not reply before a sale is unlikely to reply after one.\n\nIf a vial arrives with a batch number that does not match the published COA, or with no batch reference at all, document it immediately with photographs and raise it in writing. How a supplier handles that conversation tells you whether to use them again, and it is information worth having regardless of the outcome of the individual order.",
      },
    ],
    faq: [
      {
        question: "Can I buy retatrutide online in the UK?",
        answer:
          "Yes — many UK research suppliers list retatrutide for laboratory use through standard online checkouts. ViralPeps compares their listings by price, pack size and price per mg. All listings are for research use only and not for human consumption.",
      },
      {
        question: "How long does delivery take from a UK retatrutide supplier?",
        answer:
          "UK-based suppliers typically dispatch the next working day and deliver within one to three working days domestically. Overseas suppliers add customs handling and longer transit, which carries more risk for temperature-sensitive material.",
      },
      {
        question: "What payment methods do UK retatrutide suppliers accept?",
        answer:
          "Card and bank transfer are common among established suppliers, and crypto-only is also widespread in this market. A verified business accepting card represents the strongest combination; crypto-only from an unverifiable domain is the weakest.",
      },
      {
        question: "What should I check before ordering retatrutide online?",
        answer:
          "Confirm the supplier publishes a Certificate of Analysis from a named laboratory with a batch number, has a working contact route, uses clear research-use-only labelling, and has a verifiable business behind the domain. Match the batch number to the vial on arrival.",
      },
      {
        question: "How should retatrutide be stored after delivery?",
        answer:
          "Lyophilised retatrutide should be kept cold, dry and sealed, away from light. Reconstituted material is far less stable and should be handled according to the supplier's own documentation. See our reconstitution and storage guides for the full protocol.",
      },
    ],
    sources: [
      {
        label:
          "Retatrutide for obesity, obstructive sleep apnea and knee osteoarthritis — TRIUMPH trial design (Diabetes, Obesity and Metabolism, 2026)",
        url: "https://pubmed.ncbi.nlm.nih.gov/41090431/",
      },
      {
        label:
          "The power of three: Retatrutide's role in modern obesity and diabetes therapy (European Journal of Pharmacology, 2024)",
        url: "https://pubmed.ncbi.nlm.nih.gov/39515565/",
      },
    ],
    tableMode: "price",
    tableHeading: "Buy Retatrutide Online UK — Current Listings",
    rowLimit: 20,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "retatrutide-for-sale",
    title: "Retatrutide for Sale UK: Live Listings & Stock 2026",
    description:
      "Retatrutide for sale in the UK — live listings across all verified research suppliers, with current stock status, pack sizes and price per mg, updated weekly.",
    h1: "Retatrutide for Sale",
    focusKeyword: "retatrutide for sale",
    intro: [
      "Retatrutide for sale listings change constantly — vials sell out, batches rotate, and suppliers reprice without notice. This page shows what is currently listed across the UK research suppliers ViralPeps tracks, with stock status and pack size for each entry, refreshed from our weekly scrape.",
      "Retatrutide is a triple agonist acting on the GIP, GLP-1 and glucagon receptors, and it is sold in the UK strictly as a research compound. Every listing below is presented for laboratory and educational reference only, and none of it constitutes medical advice.",
      "Because availability is the variable that matters most when you are actively looking, the table includes an in-stock indication alongside price and pack size. If price is your primary filter rather than availability, the [**cheapest retatrutide UK →**](/compound-guides/cheapest-retatrutide-uk) page reorders the same market by cost per milligram.",
      "For the compound's research profile and full supplier set, the [**Retatrutide hub →**](/compounds/retatrutide) is the starting point.",
    ],
    sections: [
      {
        title: "Retatrutide for Sale — What Is Currently Listed",
        body: "The table above is the current state of the UK market as we last measured it: which suppliers have retatrutide listed, in what pack size, at what price, and whether it was in stock at the time of the check.\n\nStock status is a point-in-time signal, not a guarantee. A supplier showing in stock at the weekly check may have sold through by the time you visit. Always confirm on the supplier's own listing page before ordering — the link in each row takes you there directly.",
      },
      {
        title: "Stock Availability Across the UK Market",
        body: "Retatrutide availability fluctuates more than most research peptides. Popular pack sizes — particularly mid-range vials — sell through faster than the extremes, and some suppliers operate on a batch-release model where listings disappear entirely between batches rather than showing as out of stock.\n\nThe practical consequence is that the supplier with the best price is not always the supplier with stock. When you are ready to order, scan the in-stock entries first, then compare price within that subset. It is a different search order from a pure price comparison, and it is the one that reflects how this market actually works.",
      },
      {
        title: "Pack Sizes Currently on Offer",
        body: "UK listings currently span small single-vial presentations through to large multi-milligram packs, with pen formats appearing alongside standard vials at some suppliers. Larger packs carry a lower cost per milligram but a higher absolute outlay, and they commit you to storing more material for longer.\n\nIf you are weighing a larger pack purely on price per milligram, check the storage guidance first. Long-term stability depends on keeping the lyophilised powder cold, dry and sealed, and a bargain that degrades before you use it is not a bargain.",
      },
      {
        title: "Reading a Listing Critically",
        body: "A listing is not a supplier. Several things that look like product information on a storefront are actually marketing, and it is worth separating them. A stated purity figure with no linked Certificate of Analysis is a claim, not a measurement. A \"lab tested\" badge that does not name the laboratory is decoration. A stock indicator with no dispatch policy tells you nothing about when your order would actually ship.\n\nThe information that does count is specific: a batch number matched to a third-party COA from a named lab, a clear dispatch and delivery policy, a working contact route, and research-use-only labelling. Our TrustScore method scores exactly those signals, and the badge is not for sale.",
      },
      {
        title: "Buying Safely From a Listing",
        body: "Before ordering from any row in the table, verify the basics. Then verify them again on the supplier's own page, because the tick in our table reflects the last time we checked rather than the moment you are reading this.",
        list: [
          "Match the COA batch number to the vial on arrival — this is the only check that confirms the document applies to your material.",
          "Confirm the pack size in milligrams rather than trusting a product title, which may describe a different variant.",
          "Check whether shipping is tracked, and what the dispatch timeline is.",
          "Confirm the form you will receive — lyophilised powder versus a pen presentation are handled very differently.",
        ],
      },
      {
        title: "Where to Compare Next",
        body: "If you want the complete market view with no row limit, see the [**retatrutide price comparison UK →**](/compound-guides/retatrutide-price-comparison-uk) page. For the verification checklist applied step by step, the [**where to buy retatrutide UK guide →**](/compound-guides/where-to-buy-retatrutide) walks through it. And if you would rather rank suppliers by how verifiable they are than by what they charge, the [**best retatrutide peptide →**](/compound-guides/best-retatrutide-peptide) page sorts by TrustScore.\n\nOrdering mechanics — payment methods, delivery expectations and what a checkout tells you about a supplier — are covered in the [**buy retatrutide online UK guide →**](/compound-guides/buy-retatrutide-online-uk).",
      },
      {
        title: "How Listings Appear and Disappear",
        body: "Understanding the supply cycle helps explain why availability looks erratic. Most UK research suppliers buy in batches, have each batch tested, and list stock while that batch lasts. When it sells through, the listing may be removed entirely rather than marked out of stock — particularly at smaller laboratories that do not want to hold backorders.\n\nThe result is that a supplier can appear and disappear from a comparison table without anything being wrong. It does not necessarily mean they have stopped trading or been delisted; it often means they are between batches and will reappear within a few weeks.\n\nLarger storefronts tend to keep listings live and mark them out of stock instead, which makes them look more stable in a snapshot but does not actually mean they have material available. Reading the in-stock column is more informative than reading the mere presence of a row.",
      },
      {
        title: "Judging Whether a Listing Is Worth Pursuing",
        body: "A listing is worth pursuing when four things hold simultaneously: the pack size matches what you need, the price is reasonable on a per-milligram basis, the supplier shows verifiable documentation, and the item is genuinely in stock. Three out of four is not enough — the missing one is usually the documentation, and that is the one that cannot be remedied after purchase.\n\nThe fastest way to assess documentation is to look for a Certificate of Analysis that names a laboratory and carries a batch number. If it does both, the supplier is operating to a standard. If it names no laboratory, or carries no batch reference, the document cannot be tied to the material you would receive, and the listing should be treated as unverified regardless of how professional the website looks.\n\nIt is also worth checking whether the supplier describes what happens if an order goes wrong. A published policy, even a minimal one, indicates a business that has considered the scenario. Silence on the point usually reflects a storefront optimised for taking payments rather than resolving problems.",
      },
    ],
    faq: [
      {
        question: "Is retatrutide available for sale in the UK?",
        answer:
          "Yes — multiple UK research suppliers list retatrutide for laboratory use. ViralPeps tracks and compares those listings by pack size, price and price per mg. All listings are for research use only and not for human consumption.",
      },
      {
        question: "Why does retatrutide stock fluctuate so much?",
        answer:
          "Availability moves with batch release. Suppliers often list stock only while a tested batch lasts, so popular pack sizes sell through quickly and listings can disappear between batches. Check the supplier's own page before ordering.",
      },
      {
        question: "What pack sizes of retatrutide are available?",
        answer:
          "Current UK listings include small single-vial presentations through to large packs, with 5mg, 10mg, 20mg, 30mg and 40mg appearing most often, plus pen formats at some suppliers. The per-mg column normalises them for comparison.",
      },
      {
        question: "Does an in-stock listing guarantee availability?",
        answer:
          "No. Stock status reflects the last weekly scrape and is a point-in-time signal. Suppliers can sell through between checks, so always confirm on the supplier's own listing page before ordering.",
      },
      {
        question: "What does a purity figure on a listing actually mean?",
        answer:
          "On its own, very little. A purity percentage is only meaningful when it comes from a named third-party laboratory and is tied to a batch number you can match to your vial. Without both, it is a marketing claim rather than a measurement.",
      },
    ],
    sources: [
      {
        label:
          "Triple hormone receptor agonist retatrutide for MASLD, phase 2a trial (Nature Medicine, 2024)",
        url: "https://pubmed.ncbi.nlm.nih.gov/38858523/",
      },
      {
        label:
          "Efficacy and safety of retatrutide for obesity — systematic review (Journal of Basic and Clinical Physiology and Pharmacology, 2025)",
        url: "https://pubmed.ncbi.nlm.nih.gov/40728138/",
      },
    ],
    tableMode: "price",
    tableHeading: "Retatrutide for Sale — Current UK Listings",
    rowLimit: 30,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-retatrutide-peptide",
    title: "Best Retatrutide Peptide UK: TrustScore Ranking 2026",
    description:
      "The best retatrutide peptide in the UK, ranked by independent TrustScore rather than price alone — COAs, supplier verification and overall value, compared.",
    h1: "Best Retatrutide Peptide",
    focusKeyword: "best retatrutide peptide",
    intro: [
      "The best retatrutide peptide is not the cheapest one. It is the one from a supplier who can prove what they sold you. This page ranks UK retatrutide listings using TrustScore — our method-backed rating of how transparent and verifiable a supplier is — rather than price alone, and then shows the price so you can judge value for yourself.",
      "Retatrutide is a triple receptor agonist targeting GIP, GLP-1 and glucagon simultaneously, which is what distinguishes it from the dual agonists that came before it. That mechanism is precisely why counterfeit and unverified material is a real concern in this category: the compound is well known, in demand, and therefore worth imitating.",
      "TrustScore is not for sale. It is built from fixed, non-purchasable signals, and serious compliance failures cap a supplier's score regardless of anything else they do well. The table below orders every tracked UK retatrutide listing on that basis.",
      "Everything here is for laboratory and educational reference. Retatrutide is not licensed for human use. For the compound's research profile, see the [**Retatrutide hub →**](/compounds/retatrutide); for a price-first view, see the [**full price comparison →**](/compound-guides/retatrutide-price-comparison-uk).",
    ],
    sections: [
      {
        title: "What Makes the Best Retatrutide Peptide",
        body: "Our TrustScore method scores every UK supplier on the same fixed signals, and none of them can be bought. A supplier earns points for publishing Certificates of Analysis from a named third-party laboratory, for having a verified contact route, for genuine review presence on trusted platforms such as Trustpilot and Google, for clear research-use-only compliance, for reliable shipping and support, and for confirming domain ownership.\n\nThe score is capped for serious failures — no verifiable business identity, marketing research chemicals for human or medical use, or no verifiable domain ownership. That capping matters: two suppliers selling identical vials at identical prices can sit at very different TrustScores if one of them can demonstrate what the other cannot.",
      },
      {
        title: "Best Retatrutide Peptide UK — The Ranking",
        body: "The table below lists retatrutide listings ordered by TrustScore, with verified vendors surfaced first, then by price within each band. It reads differently from a pure price table, which is the point: the top of this list is not the cheapest listing, it is the most defensible one.\n\nUse it as a shortlist. The score tells you how verifiable a supplier is; the price tells you what they charge. The right answer is usually the highest-scoring supplier you can afford at the pack size you actually need — not the top row unconditionally.",
      },
      {
        title: "Purity, COAs and What Verification Actually Means",
        body: "A Certificate of Analysis is only meaningful if three things line up: it comes from a named third-party laboratory, it references a batch number, and that batch number matches the vial you receive. Generic COAs with no batch reference, or ones hosted on the supplier's own domain with no external laboratory named, do not establish anything about the material in your vial.\n\nPurity figures are typically reported as an HPLC percentage. A high purity figure from an unverifiable source is worth less than a slightly lower figure from a documented one. Verification is the variable you actually control — by choosing who to buy from. The contents of the vial you cannot inspect.",
      },
      {
        title: "Value, Not Just Price",
        body: "Once you have a shortlist of high-scoring suppliers, price becomes the deciding factor — but on a per-milligram basis, not headline price. Retatrutide is sold from 5mg through to 40mg, and the larger packs almost always win on cost per milligram.\n\nBalance that against what you actually need. Overbuying a pack size you will not use before it degrades is not value, it is waste with extra storage requirements attached. The [**cheapest retatrutide UK →**](/compound-guides/cheapest-retatrutide-uk) page ranks on cost per milligram if that is your primary filter, and [**retatrutide for sale →**](/compound-guides/retatrutide-for-sale) shows current stock across the market.",
      },
      {
        title: "Why Price Alone Misleads",
        body: "A price ordering tells you what suppliers charge. It does not tell you whether the supplier will still exist next month, whether they will answer an email, or whether the batch number on your vial corresponds to anything they published. In a market with no regulator and no consumer protection designed for the category, those questions matter more than a few pounds of difference.\n\nThis is why we lead with TrustScore on this page and put price second. It is a deliberate inversion of the usual comparison-site ordering, and it reflects what actually protects a buyer in an unregulated market.",
      },
      {
        title: "How to Apply This Ranking",
        body: "Start at the top of the table and work down until you find a supplier whose price at your required pack size is acceptable. Then complete the same verification steps we did: check the COA names a laboratory and carries a batch number, test the contact route, confirm the research-use-only framing, and match the batch on arrival.\n\nThe [**where to buy retatrutide UK guide →**](/compound-guides/where-to-buy-retatrutide) covers the verification checklist in full, and the [**buy retatrutide online UK guide →**](/compound-guides/buy-retatrutide-online-uk) covers what to expect once you order.",
      },
      {
        title: "What Verification Signals Mean in Practice",
        body: "It is worth being concrete about what each TrustScore signal actually tells you, because they are not equally informative. A published COA from a named laboratory with a batch number is the strongest single signal: it demonstrates that the supplier commissions testing, publishes the results, and can trace material to a batch.\n\nA verified contact route is second. It proves there is a person behind the storefront who responds, which is what makes any other issue resolvable. Genuine review presence on trusted platforms adds context but is easier to influence at the margins, which is why it carries less weight than documentation.\n\nResearch-use compliance — clear labelling that material is for in-vitro research only, with no marketing implying human use — is a legal and ethical signal as much as a trust signal. Suppliers who are sloppy about it are often sloppy about other things. Domain ownership confirmation closes the loop by establishing that the business controls the website it sells from.",
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
        question: "What is the best retatrutide peptide in the UK?",
        answer:
          "The best option is the highest-scoring supplier you can verify at the pack size you need. ViralPeps ranks UK retatrutide listings by TrustScore, which weights published COAs, contact verification, genuine reviews, compliance and domain ownership ahead of price.",
      },
      {
        question: "Is the best retatrutide peptide the most expensive one?",
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
          "Efficacy and Safety of GLP-1 Receptor Agonists, Dual Agonists, and Retatrutide — Bayesian network meta-analysis (Obesity, 2025)",
        url: "https://pubmed.ncbi.nlm.nih.gov/40685589/",
      },
      {
        label:
          "Efficacy and safety of retatrutide, a novel GLP-1, GIP and glucagon receptor agonist — systematic review and meta-analysis (Baylor University Medical Center Proceedings, 2025)",
        url: "https://pubmed.ncbi.nlm.nih.gov/40291085/",
      },
    ],
    tableMode: "trust",
    tableHeading: "Best Retatrutide Peptide UK — Ranked by TrustScore",
    rowLimit: 25,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
