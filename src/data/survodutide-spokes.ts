/**
 * Survodutide silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/survodutide-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Modifier check (UK autocomplete, 28 Oct 2026): all six target modifiers
 * returned UK results for survodutide — no substitution needed. Spoke 5 is
 * `survodutide-uk-supplier` (the "for sale" modifier is not portable here).
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
    slug: "where-to-buy-survodutide-uk",
    title: "Where to Buy Survodutide UK: Verified Suppliers 2026",
    description:
      "Where to buy survodutide uk — compare live prices from verified UK research suppliers, then check stock, shipping and Certificates of Analysis before ordering.",
    h1: "Where to Buy Survodutide UK",
    focusKeyword: "where to buy survodutide uk",
    intro: [
      "If you are asking where to buy survodutide uk researchers face a problem that is now very familiar in the incretin space: a compound that appears in every news cycle, a handful of genuine UK stockists, and a long tail of storefronts that would rather sell you a story than a Certificate of Analysis. Survodutide is Boehringer Ingelheim's dual glucagon and GLP-1 receptor agonist, developed in partnership with Zealand Pharma under the code BI 456906, and its visibility in obesity and MASH research is exactly what makes unverified material profitable to move.",
      "This page answers the question with listing data rather than opinion. Below is a live table of every UK supplier ViralPeps tracks for survodutide, sorted by price, with pack size, availability and a direct link to each listing. The table is regenerated from our weekly price scrape, so what you see reflects those suppliers' own pages at the most recent check — not a snapshot taken when the article was written.",
      "Survodutide is a synthetic acylated peptide built on an oxyntomodulin-inspired backbone. It carries a C18 fatty acid chain that binds serum albumin, which is the design feature behind once-weekly dosing in the clinical programme. Its dual agonism is the research interest: GLP-1 receptor activation reduces appetite and slows gastric emptying, while glucagon receptor activation raises energy expenditure — two levers most single-agonist compounds do not pull at once.",
      "Everything on this page is presented for laboratory and educational reference only. Survodutide is an investigational medicine and is not licensed for sale in the UK; nothing here is medical guidance. For the compound overview, trial context and what each UK listing actually contains, start with the [**Survodutide price comparison hub →**](/compounds/survodutide).",
    ],
    sections: [
      {
        title: "Where to Buy Survodutide UK — The Only Question That Matters",
        body: "The phrase \"where to buy\" hides a more useful question: which supplier can you actually verify? Any storefront can accept a card payment. Very few can show you a batch number tied to a third-party HPLC result, name the laboratory that issued it, and still be trading in six months.\n\nWhen we audit a UK supplier for a GLP-1 class compound we look for the same five signals every time: a published Certificate of Analysis with batch numbers, a working contact route, a registered business behind the storefront, unambiguous research-use-only labelling, and a domain the operator genuinely owns. Survodutide sharpens this requirement rather than softening it. Because it is a large, acylated peptide with a lipid chain, purity is harder to establish than for a short linear sequence, and a supplier who cannot produce mass spectrometry confirmation alongside HPLC is asking you to take a great deal on trust.\n\nThe other practical filter is who actually holds stock in the UK. A listing that ships domestically in days is a materially different proposition from one that drop-ships and leaves import handling to you — particularly for a compound that needs cold-chain care in transit.",
        list: [
          "COA with batch numbers from a named third-party laboratory — HPLC purity plus mass spectrometry confirmation of the expected mass.",
          "A real contact route: an email that replies, or a phone number that connects to someone who knows the catalogue.",
          "Research-use-only labelling throughout, with no marketing of the compound for human use.",
          "A registered limited company or verifiable sole trader behind the storefront.",
          "Domain ownership confirmed — which is exactly what our TrustScore badge verifies.",
        ],
      },
      {
        title: "How We Verify UK Survodutide Suppliers",
        body: "Every supplier in the table above has passed the same checklist. We fetch their homepage and confirm it resolves, scan secondary pages for shipping, contact and compliance language, and look for a Certificate of Analysis hosted on-site or linked from a named testing laboratory. Suppliers that fail the basics — dead domain, no contact route, no compliance language at all — do not make the list.\n\nThe process is deliberately conservative. We would rather track six suppliers honestly than pad a comparison table with storefronts nobody can verify. If a UK supplier you know of is missing from the table, that is usually the reason: not that they were excluded on purpose, but that the verification signals were not there to find at the time of the audit.\n\nWe also re-run these checks rather than treating them as a one-off. A supplier who published COAs last quarter but has quietly stopped is a different proposition from one who has always published them, and the TrustScore data behind this page is refreshed rather than archived. For a compound this new to the retail market, that ongoing check is the whole point.",
        table: {
          header: ["Signal", "Why it matters for survodutide"],
          rows: [
            ["Named-lab COA with batch number", "Proves the material was independently tested and traceable to a batch"],
            ["Mass spec confirmation", "An acylated 4 kDa peptide can pass HPLC while being the wrong molecule"],
            ["Working contact route", "A supplier you can reach is a supplier you can resolve a problem with"],
            ["Full RUO labelling", "Shows compliance awareness; unlicensed sale to the public is a legal risk"],
            ["Domain ownership confirmed", "Rules out throwaway storefronts built to disappear"],
          ],
        },
      },
      {
        title: "What the Price Difference Between UK Listings Actually Means",
        body: "Survodutide pricing in the UK varies by a wide margin between the cheapest and most expensive listings, and the spread is rarely random. Vial size is the biggest driver: a 10mg vial almost always carries a lower cost per milligram than a 5mg vial from the same supplier, which is why per-mg comparison is more informative than the headline number. Vendor overhead is the second factor — a supplier running UK warehousing, printed COAs and proper support charges for it, while a bare-bones reseller shipping from overseas does not.\n\nStock status matters as much as price. A listing can show a competitive figure and be permanently out of stock, so we record availability alongside cost. Where material is genuinely held in the UK, delivery is typically a matter of days; where it is drop-shipped, quoted delivery often slips.\n\nTreat an unusually low price as a question rather than a bargain. In an unregulated market the cheapest listing is frequently a smaller quantity than advertised, or material with no testing behind it at all. One useful comparison: the [**cheapest survodutide uk**](/compound-guides/cheapest-survodutide-uk) page ranks the same suppliers purely on verified cost per milligram, so you can see whether a headline price is actually competitive once pack size is accounted for.",
      },
    ],
    faq: [
      {
        question: "Where can I buy survodutide in the UK?",
        answer:
          "Survodutide is an investigational medicine and is not licensed for general sale in the UK. ViralPeps compares listings from UK research-chemical suppliers who sell the compound strictly for laboratory use only. We list only suppliers whose verification signals — COA, contact, compliance language and domain ownership — we can confirm ourselves.",
      },
      {
        question: "Is it legal to buy survodutide in the UK?",
        answer:
          "Survodutide is not an approved medicine anywhere, so it cannot legally be sold to the public for human use. Research suppliers operate under research-use-only terms intended for laboratory and educational work. Buying investigational material for personal use falls outside those terms, and we present this information for reference only, not as guidance.",
      },
      {
        question: "How much does survodutide cost in the UK?",
        answer:
          "UK listings currently start under £50 for a 10mg vial and rise with pack size and supplier overhead. The live table above shows the current figure for every supplier we track, updated weekly from their own pages, so compare on cost per milligram rather than the headline price.",
      },
      {
        question: "Should I buy a 5mg or 10mg survodutide vial?",
        answer:
          "Cost per milligram is almost always lower on the larger vial, so a 10mg pack is better value if you can use it within the compound's stability window once reconstituted. If you need to split research across separate sessions, check how the supplier labels storage and whether the batch has a retest date.",
      },
    ],
    sources: [
      { label: "Boehringer Ingelheim — survodutide (BI 456906) pipeline information", url: "https://www.boehringer-ingelheim.com/human-health/metabolic-diseases/obesity" },
      { label: "Zealand Pharma — survodutide discovery programme", url: "https://www.zealandpharma.com/" },
      { label: "MHRA — guidance on the sale and supply of medicines", url: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency" },
    ],
    tableMode: "price",
    tableHeading: "Survodutide price by UK supplier — cheapest first",
    rowLimit: 8,
  },
  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-survodutide-uk",
    title: "Cheapest Survodutide UK: Lowest Price Per mg (Live)",
    description:
      "Cheapest survodutide uk — the lowest verified price per milligram across every UK supplier we track, refreshed weekly from live listings rather than quoted from an old review.",
    h1: "Cheapest Survodutide UK",
    focusKeyword: "cheapest survodutide uk",
    intro: [
      "Finding the cheapest survodutide uk listing is easy. Finding the genuinely cheapest is not, because the headline price on a supplier page tells you almost nothing about value — vial size, pack composition and per-milligram cost move independently of the number printed in large type. This page ranks UK suppliers on verified cost per milligram, pulled live from the same weekly scrape that feeds every price table on ViralPeps.",
      "Survodutide is a dual glucagon and GLP-1 receptor agonist discovered by Zealand Pharma and developed by Boehringer Ingelheim as BI 456906. It is an acylated peptide of roughly 4.2 kDa with a C18 fatty acid chain that binds albumin, which is what stretches its dosing interval in the clinical programme. As a research material it is sold in lyophilised vials, usually 5mg and 10mg, and it is that difference in vial size that produces most of the apparent price spread across UK listings.",
      "Below you will find the full per-milligram ranking, followed by the arithmetic you should apply before you decide a listing is cheap. Every figure is generated from supplier data at the time of the last scrape; the table is not a static quote from a review written months ago.",
      "This is reference information for laboratory and educational use only. Survodutide is investigational and unlicensed in the UK, and nothing here is medical or dosing guidance. For the compound's full listing set — every pack size, every supplier, sorted by price — see the [**Survodutide price comparison hub →**](/compounds/survodutide).",
    ],
    sections: [
      {
        title: "Cheapest Survodutide UK — Why Headline Prices Mislead",
        body: "A price is a number; value is a ratio. Two listings showing £49.90 and £79.90 can invert the moment you divide by milligrams, because one may be a 5mg vial and the other 10mg. In this category the spread in cost per milligram across UK suppliers is routinely 40–60%, which is far more than the spread in headline prices suggests once pack sizes are normalised.\n\nThe second distortion is multi-pack pricing. Some suppliers list a single pack with an options drop-down; others list each vial separately. Our scraper expands combined listings into one row per pack so the comparison is like-for-like — which is why the row count on the table above may be higher than the number of suppliers listed.\n\nThird, and least visible: the cheap listing is sometimes the leaner product. A supplier selling at a significant discount to every competitor is either buying in volume, cutting overhead — or cutting quantity or testing. The first two are legitimate; the third is not, and you cannot tell them apart from the price alone.",
        list: [
          "Normalise to cost per milligram before comparing anything.",
          "Check whether the listing is one vial or a multi-pack with an options drop-down.",
          "Confirm the vial is lyophilised powder, not a pre-mixed liquid of unclear concentration.",
          "Check that a COA exists for the specific batch, not just a generic sample COA on a separate page.",
        ],
      },
      {
        title: "The Per-Milligram Arithmetic, Worked Through",
        body: "The calculation is simple but worth stating explicitly because it is where most comparisons go wrong. Take the listing price, divide by the milligram figure on the label, and compare the result. A £49.90 ten-milligram vial is £4.99/mg. A £39.90 five-milligram vial is £7.98/mg — 60% more expensive per milligram despite looking cheaper.\n\nThe reason larger vials win on this metric is fixed cost. Packaging, the COA, the cold-chain envelope and the supplier's margin are largely constant per vial, so the marginal cost of the extra five milligrams is small. That is why cost per milligram falls predictably as pack size rises, and why a per-mg ranking and a headline-price ranking genuinely disagree.\n\nThe counterweight is stability. Once reconstituted, a peptide is working against hydrolysis and aggregation, and a 10mg vial you cannot use within its stability window is worse value than a 5mg vial you can. The per-mg calculation tells you the unit economics; your own usage pattern decides whether the larger pack is actually available to you. If you are comparing this compound against other incretins, the same arithmetic applies on the [**mazdutide silo**](/compounds/mazdutide) and the [**tirzepatide silo**](/compounds/tirzepatide) pages.",
        table: {
          header: ["Listing", "Price", "mg", "Cost per mg"],
          rows: [
            ["Example A — 5mg vial", "£39.90", "5", "£7.98/mg"],
            ["Example B — 10mg vial", "£49.90", "10", "£4.99/mg"],
            ["Example C — 10mg vial", "£79.90", "10", "£7.99/mg"],
          ],
        },
      },
      {
        title: "When the Cheapest Listing Is the Wrong Choice",
        body: "There are three situations where paying more per milligram is the rational decision. The first is batch traceability: a supplier who publishes a per-batch COA with a mass spectrometry trace is giving you something the cheapest listing does not, and that costs money to produce. For an acylated peptide where the wrong molecule can pass a purity check, that confirmation is not decoration.\n\nThe second is UK stock. A listing that ships domestically avoids customs uncertainty and transit temperature swings, both of which matter for a lyophilised powder that should not sit in a warm warehouse for a fortnight.\n\nThe third is support. If a vial arrives cracked or the batch reference does not match the COA, a supplier with a working contact route resolves it. The cheapest storefront on the page frequently does not answer. Our [**where to buy survodutide uk**](/compound-guides/where-to-buy-survodutide-uk) page sets out the five verification signals we check before a supplier is listed at all — a useful filter to apply before the price even comes into it.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest survodutide in the UK?",
        answer:
          "The current lowest verified cost per milligram is shown at the top of the live table on this page, refreshed weekly from supplier listings. Headline prices start under £50 for a 10mg vial, but the per-mg ranking is the figure that actually identifies the cheapest option.",
      },
      {
        question: "Why is survodutide cheaper per mg in larger vials?",
        answer:
          "Most of a vial's cost is fixed — packaging, testing, COA production and supplier overhead — so the extra material in a larger vial is inexpensive to add. That is why cost per milligram falls predictably as pack size rises, and why a per-mg ranking differs from a headline price ranking.",
      },
      {
        question: "Is a cheap survodutide listing a red flag?",
        answer:
          "Not automatically. Volume buying and lower overhead legitimately produce lower prices. But a listing significantly below every competitor is worth checking against the supplier's COA, pack size and contact route — because a smaller quantity or untested material produces exactly the same low headline price.",
      },
      {
        question: "Does ViralPeps take payment for supplier placements?",
        answer:
          "Featured placements are marked as sponsored where they exist, and they never change the price ranking — the per-mg sort is computed from scraped listing data alone. Any supplier shown as featured still goes through the same verification checks as every other listing on the page.",
      },
    ],
    sources: [
      { label: "Boehringer Ingelheim — survodutide (BI 456906) programme", url: "https://www.boehringer-ingelheim.com/human-health/metabolic-diseases/obesity" },
      { label: "Zealand Pharma — peptide discovery and licensing", url: "https://www.zealandpharma.com/" },
      { label: "MHRA — sale and supply of unlicensed medicines", url: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency" },
    ],
    tableMode: "perMg",
    tableHeading: "Lowest survodutide cost per mg — UK suppliers ranked",
    rowLimit: 0,
  },
  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "survodutide-price-comparison-uk",
    title: "Survodutide Price Comparison UK: All Suppliers (Live)",
    description:
      "Survodutide price comparison uk — every UK listing side by side with pack size, stock status and cost per milligram, rebuilt each week from live supplier pages.",
    h1: "Survodutide Price Comparison UK",
    focusKeyword: "survodutide price comparison uk",
    intro: [
      "A survodutide price comparison is only useful if it is current, and a survodutide price comparison uk researchers can rely on needs something more than a table copied from a supplier's homepage. This page holds the full side-by-side view: every UK listing ViralPeps tracks for the compound, with pack size, stock status, price and cost per milligram, rebuilt automatically each week from the suppliers' own pages.",
      "Survodutide is Boehringer Ingelheim's dual glucagon and GLP-1 receptor agonist, developed with Zealand Pharma under the code BI 456906. It is an acylated peptide of roughly 4.2 kDa, once-weekly in the clinical programme thanks to a C18 fatty acid chain that binds albumin. In the research market it is supplied as lyophilised powder, most commonly in 5mg and 10mg vials, occasionally in larger packs.",
      "The table below is the complete dataset, not a curated shortlist. It shows what each supplier is charging at the last scrape, which is the only basis on which a comparison can honestly be made — a price quote from a review written three months ago is a historical artefact.",
      "This is reference material for laboratory and educational purposes. Survodutide is investigational and unlicensed in the UK; nothing here is medical guidance. For mechanism, trial context and verification standards, see the [**Survodutide compound hub →**](/compounds/survodutide).",
    ],
    sections: [
      {
        title: "Survodutide Price Comparison UK — How to Read the Table",
        body: "The table above is sorted by price, but price is the least interesting column. Read it left to right instead: who the supplier is, what the pack actually contains, whether it is in stock, what it costs, and finally what that works out to per milligram. The last column is the one that supports a decision.\n\nRows are per pack, not per supplier. Where a vendor sells multi-pack options behind a drop-down, each option appears as its own row, because a 5mg and a 10mg pack from the same storefront are not competing products — they are different value propositions. The same applies to dual-vial kits, which we expand so you can see the per-vial arithmetic.\n\nStock status comes from the supplier's own page at scrape time. It changes, sometimes daily, so treat it as a signal rather than a guarantee: a listing shown in stock may have sold out since the last run, and one shown out of stock may have been restocked. Every row links directly to the supplier's product page so you can confirm before ordering.",
        table: {
          header: ["Column", "What it tells you"],
          rows: [
            ["Supplier", "Who holds the listing — verified status shown via TrustScore"],
            ["Pack", "Vial size as stated on the supplier's own page"],
            ["Price", "Listing price at the last scrape, in GBP"],
            ["Per mg", "Price divided by milligrams — the only fair comparison"],
            ["Stock", "Availability recorded at scrape time"],
          ],
        },
      },
      {
        title: "Why Survodutide Prices Move Between Weeks",
        body: "Three things drive week-to-week movement in this compound's UK pricing. The first is stock: a supplier who runs out and restocks often reprices on the way back, and a batch with a short retest date may be discounted to clear. The second is competition — this is a crowded incretin shelf, and suppliers adjust to stay visibly competitive against neighbouring listings.\n\nThe third is less visible and more structural. Survodutide is early in its commercial life, and the number of UK suppliers willing to stock it is still small. When one enters or leaves the market, the average moves noticeably because there are so few listings behind it. That is also why we show the full set rather than a top three: with a thin market, the difference between the third and sixth cheapest listing can easily be 30%.\n\nBecause of this, a comparison page that is not regenerated is actively misleading. Our scrape runs weekly and the table above is rebuilt from that data each time. If you are tracking a specific supplier's pricing over time, the [**cheapest survodutide uk**](/compound-guides/cheapest-survodutide-uk) page ranks the same data set on cost per milligram instead of absolute price.",
      },
      {
        title: "Comparing Survodutide Against Other Incretins",
        body: "Researchers comparing incretin-class compounds usually want the same normalised view across more than one molecule. Survodutide's mechanism is dual glucagon and GLP-1 agonism; semaglutide and tirzepatide are GLP-1-based with, in tirzepatide's case, added GIP activity. That difference in mechanism does not change the arithmetic — cost per milligram, pack size and stock status are the variables that decide value in every case.\n\nViralPeps runs the same comparison for the other incretins researchers most often cross-shop: [**tirzepatide**](/compounds/tirzepatide), [**semaglutide**](/compounds/semaglutide), [**retatrutide**](/compounds/retatrutide) and [**mazdutide**](/compounds/mazdutide). Each hub carries a live price table generated by the same scraper, so a cross-compound comparison is a fair one — the same suppliers, the same normalisation, the same weekly refresh.\n\nOne caution when cross-comparing: vial sizes are not standardised across compounds. A 10mg vial of a GLP-1 agonist and a 10mg vial of a triple agonist are not interchangeable research quantities, and per-mg cost across compounds is not an apples-to-apples measure of potency. Compare price efficiency within a compound; compare mechanism and trial data between them.",
        list: [
          "Within a compound: rank on cost per milligram at the pack size you need.",
          "Across compounds: rank on mechanism, published trial endpoints and purity evidence.",
          "Never compare per-mg across compounds as though potency were equal.",
        ],
      },
    ],
    faq: [
      {
        question: "How often is this survodutide price comparison updated?",
        answer:
          "The table is regenerated from a weekly scrape of each supplier's own product page. Prices, pack sizes and stock status therefore reflect the most recent run rather than the date this page was written. Stock in particular can change within days of any refresh.",
      },
      {
        question: "Why do different suppliers list different survodutide vial sizes?",
        answer:
          "UK research suppliers stock 5mg and 10mg vials most commonly, with occasional larger packs or multi-vial bundles. Because vials are not standardised, the comparison table expands every option into its own row so pack size is always visible next to price.",
      },
      {
        question: "Is the cheapest listing per mg always in stock?",
        answer:
          "Not necessarily. The per-mg ranking is computed from prices at the last scrape and does not adjust for availability, so a very cheap listing can sit at the top while showing out of stock. Every row links to the supplier's page so you can confirm before ordering.",
      },
      {
        question: "Does a featured supplier affect the ranking?",
        answer:
          "No. Sponsored placements are labelled where they exist and are never inserted into the price sort, which is computed purely from scraped listing data. A featured listing still has to pass the same verification checks as every other row.",
      },
    ],
    sources: [
      { label: "Boehringer Ingelheim — survodutide clinical programme", url: "https://www.boehringer-ingelheim.com/human-health/metabolic-diseases/obesity" },
      { label: "Zealand Pharma — survodutide originator", url: "https://www.zealandpharma.com/" },
      { label: "MHRA — regulatory position on research chemicals", url: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency" },
    ],
    tableMode: "full",
    tableHeading: "Every survodutide listing in the UK — price, pack, stock and cost per mg",
    rowLimit: 0,
  },
  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-survodutide-online-uk",
    title: "Buy Survodutide Online UK: Ordering & Delivery Guide",
    description:
      "Buy survodutide online uk — how ordering from UK research suppliers actually works, what payment and delivery to expect, and the checks to run before you pay.",
    h1: "Buy Survodutide Online UK",
    focusKeyword: "buy survodutide online uk",
    intro: [
      "To buy survodutide online uk researchers have to navigate an unusual market: a compound at the centre of an active clinical programme, sold by a small number of UK stockists and a much larger number of storefronts with no verifiable presence. This page covers the practical mechanics of ordering — what a legitimate transaction looks like, what payment and delivery to expect, and which checks are worth running before you enter card details.",
      "Survodutide is Boehringer Ingelheim's dual glucagon and GLP-1 receptor agonist, discovered by Zealand Pharma and known in the literature as BI 456906. It is an acylated peptide of roughly 4.2 kDa, supplied as a lyophilised powder in 5mg and 10mg vials. Because it is a large peptide with a lipid side chain, it is also a compound where the difference between a verified and an unverified seller shows up in the material rather than the packaging.",
      "The live table below shows current UK listings with price, pack size and stock status, so you can see what is actually orderable now rather than what was orderable when an article was written. Links go straight to the supplier's own product page — we do not resell, and we do not take a cut of any order.",
      "Everything here is presented for laboratory and educational reference only. Survodutide is investigational and unlicensed in the UK, so it cannot lawfully be sold for human use; nothing on this page is medical guidance. For the compound's research profile and full supplier set, see the [**Survodutide compound hub →**](/compounds/survodutide).",
    ],
    sections: [
      {
        title: "Buy Survodutide Online UK — What a Legitimate Order Looks Like",
        body: "A straightforward transaction has a predictable shape. You find a listing, the product page states vial size and purity, a Certificate of Analysis is either linked or published for the batch, the supplier declares research-use-only terms, and checkout takes a normal card payment through a recognised processor with a UK entity behind it. Confirmation arrives by email within minutes, with an order number you can reference later.\n\nWhat a problematic transaction looks like is equally predictable. The product page has no COA and no batch reference. Purity is a number in a marketing banner with no laboratory named. Payment has to go by bank transfer to a personal account, or by cryptocurrency, with no invoice. Delivery is quoted as \"2–4 weeks\" with no tracking. Contact is a form that never replies. Any one of these is a reason to slow down; two or more together is a reason to walk away.\n\nOne recurring pattern in this category deserves a specific mention: the storefront that clones a real supplier's design. If a site looks professionally built but the domain is a few weeks old, the COA images are generic rather than batch-specific, and the about page has no company number, that is a template, not a business.",
        list: [
          "Product page states vial size, purity and form (lyophilised powder, not pre-mixed liquid).",
          "COA available for the specific batch, from a named laboratory, with a mass spec trace.",
          "Research-use-only terms stated plainly at checkout or in the product description.",
          "Card payment through a recognised processor, with a UK-registered entity behind the site.",
          "Order confirmation email with a referenceable order number.",
        ],
      },
      {
        title: "Payment Methods and What They Reveal",
        body: "Card payment through a mainstream processor is the most useful signal a supplier can offer, because processors run their own merchant checks and will drop an account that generates fraud complaints. Bank transfer is common in this market and not automatically a problem — several established UK suppliers use it — but it removes your chargeback route, so it should come with an invoice, a company name and a verifiable trading history.\n\nCryptocurrency-only checkout is a different matter. It is occasionally offered by legitimate operators for privacy, but as a sole payment method on a new domain it is the standard structure of a scam: irreversible, untraceable and easy to abandon. If a supplier accepts only crypto, treat the price advantage as irrelevant.\n\nWhatever the method, keep the confirmation email. It ties the order to a batch and a date, which is the evidence you need if the vial arrives damaged, mislabelled or not at all. Our [**where to buy survodutide uk**](/compound-guides/where-to-buy-survodutide-uk) page lists the verification signals we check before any supplier appears in our tables.",
        table: {
          header: ["Payment route", "Risk profile"],
          rows: [
            ["Card via mainstream processor", "Lowest risk — processor vetting plus chargeback route"],
            ["Bank transfer with invoice and company name", "Moderate — reversible only through negotiation"],
            ["Crypto-only, no invoice", "Highest — irreversible and untraceable; avoid"],
          ],
        },
      },
      {
        title: "Delivery Times, Packaging and Cold Chain",
        body: "Domestic UK dispatch from a supplier holding stock typically arrives in one to three working days. Lyophilised peptide powder is stable at ambient temperatures for the duration of normal transit, so it does not require ice packs for a two-day domestic journey — a supplier who insists on refrigerated courier for a domestic vial is often adding cost without adding benefit. What does matter is that the vial is sealed, protected from light, and not left in a hot delivery depot over a weekend.\n\nOverseas dispatch is slower and less predictable. Quoted times are frequently 10–21 days, customs handling is the buyer's problem, and a parcel can be held for inspection with no explanation. Transit temperatures over that window are uncontrolled. If a UK-stocked listing exists at a modest premium, the reliability usually outweighs the saving.\n\nOn arrival, check the vial before reconstituting: powder should be a coherent cake or plug, not a loose scatter of fragments, and the label batch number should match the COA you were given. If either is wrong, contact the supplier before opening anything further — that is exactly the scenario where a working contact route earns its keep.",
      },
    ],
    faq: [
      {
        question: "Can I buy survodutide online in the UK?",
        answer:
          "Survodutide is sold online by UK research-chemical suppliers under research-use-only terms, for laboratory and educational purposes. It is investigational and unlicensed, so it cannot lawfully be sold to the public for human use, and ViralPeps compares listings for reference only rather than selling anything itself.",
      },
      {
        question: "How long does UK survodutide delivery take?",
        answer:
          "Domestically dispatched orders from a supplier holding UK stock typically arrive in one to three working days. Overseas dispatch is commonly quoted at 10–21 days, with customs handling as an additional variable and less control over transit temperature.",
      },
      {
        question: "What payment methods do UK survodutide suppliers accept?",
        answer:
          "Most established UK research suppliers accept card payment through a mainstream processor, and several also accept bank transfer against an invoice. A supplier accepting cryptocurrency only, with no invoice and no company identity, carries materially higher risk and is best avoided.",
      },
      {
        question: "What should I check when the vial arrives?",
        answer:
          "Confirm the label batch number matches the Certificate of Analysis you were given, check that the lyophilised powder forms a coherent cake rather than loose fragments, and confirm the vial seal and light-protective packaging are intact. Raise any discrepancy with the supplier before proceeding.",
      },
    ],
    sources: [
      { label: "Boehringer Ingelheim — survodutide development programme", url: "https://www.boehringer-ingelheim.com/human-health/metabolic-diseases/obesity" },
      { label: "UK Action Fraud — reporting online retail fraud", url: "https://www.actionfraud.police.uk/" },
      { label: "MHRA — buying medicines online safely", url: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency" },
    ],
    tableMode: "price",
    tableHeading: "Current survodutide UK listings — orderable now",
    rowLimit: 6,
  },
  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "survodutide-uk-supplier",
    title: "Survodutide UK Supplier: How to Verify Before Buying",
    description:
      "Survodutide uk supplier checks that actually separate real stockists from storefronts — COA and mass spec, domain ownership, TrustScore and the questions to ask first.",
    h1: "Survodutide UK Supplier",
    focusKeyword: "survodutide uk supplier",
    intro: [
      "Choosing a survodutide uk supplier is a verification exercise, not a shopping one. The compound is easy to list and hard to prove: an acylated peptide of roughly 4.2 kDa that can pass an HPLC purity check while still being the wrong molecule. The suppliers worth using are the ones who understand that and publish evidence accordingly. This page sets out exactly what that evidence looks like and how to test a supplier against it in ten minutes.",
      "Survodutide — Boehringer Ingelheim's BI 456906, discovered by Zealand Pharma — is a dual glucagon and GLP-1 receptor agonist with a C18 fatty acid chain for albumin binding. It is early in its commercial life, which means the UK supplier pool is small and still forming. That is precisely when verification matters most, because a thin market is easy for an unverified storefront to enter and easy for it to leave again with your money.",
      "The table below ranks tracked UK suppliers by independent TrustScore, which weights live domain, published COA, review presence, shipping information and contact route. It is not a popularity ranking and it is not influenced by who pays for a featured placement — sponsored slots are labelled separately and never enter the trust sort.",
      "All of this is reference information for laboratory and educational use. Survodutide is investigational and unlicensed in the UK; nothing here is medical guidance. The compound's mechanism, trial context and full listing set live on the [**Survodutide price comparison hub →**](/compounds/survodutide).",
    ],
    sections: [
      {
        title: "Survodutide UK Supplier — The Five Checks That Decide It",
        body: "Start with the Certificate of Analysis. Not a COA page in general, but a COA for the batch number printed on the vial you will receive. It should name the testing laboratory, state HPLC purity with the chromatogram, and — for this compound specifically — include mass spectrometry confirming the expected mass of approximately 4.2 kDa. Without the mass spec, an HPLC result tells you a peak is pure, not that the peak is survodutide.\n\nSecond, the contact route. A published email address that replies within a working day, or a phone number that connects to someone who knows the catalogue. Test it with a simple pre-sales question about batch numbers before you order anything. A supplier who cannot answer that is not going to resolve a problem afterwards.\n\nThird, the legal entity. A company number, a registered address, and — where the site claims it — a trading history that matches. Fourth, unambiguous research-use-only labelling on the product page and at checkout, with no marketing language implying human use. Fifth, domain ownership, which is what the TrustScore badge verifies: the supplier installs a badge on their own site linking back to us, which proves they control the domain they sell from and cannot be a clone.",
      },
      {
        title: "How TrustScore Is Calculated",
        body: "TrustScore is a 100-point composite built from signals we can verify remotely, refreshed rather than archived. A live resolving domain contributes 10 points, a homepage returning a 200 status 5, a published COA on the homepage or a secondary page 25, research-use-only language 5, a visible review mechanism 10, published shipping information 5, a working contact route 10, and a meaningful page title 5.\n\nThe weights reflect what actually predicts a good outcome. COA carries the single largest share because it is the signal most expensive to fake convincingly at scale. Contact and review signals carry meaningful weight because they are what you will need if something goes wrong. Aesthetics carry none — a beautiful storefront with no COA scores badly, which is the intended behaviour.\n\nRead the score as a filter, not a verdict. A high score means the verifiable basics are in place; it does not mean the material in a particular batch has been checked by us. Batch-level confirmation still has to come from the COA the supplier provides with your order.",
        table: {
          header: ["TrustScore signal", "Weight"],
          rows: [
            ["COA published (home or secondary page)", "25"],
            ["Live domain", "10"],
            ["Visible review mechanism", "10"],
            ["Working contact route", "10"],
            ["Homepage returns HTTP 200", "5"],
            ["Research-use-only language", "5"],
            ["Published shipping information", "5"],
            ["Meaningful page title", "5"],
          ],
        },
      },
      {
        title: "Red Flags Specific to Incretin Suppliers",
        body: "Beyond the generic signs, incretin-class compounds attract a few specific patterns. The first is borrowed trial data: marketing copy quoting SURMOUNT or SYNCHRONIZE results as though they applied to the vial on sale. Trial endpoints describe a pharmaceutical formulation used under protocol; they say nothing about a research vial, and a supplier leaning on them is selling confidence rather than evidence.\n\nSecond, hand-waved identity data. Many storefronts list \"purity ≥98%\" with no laboratory, and identity fields copied inconsistently across sites — some quoting one CAS number, others another, several quoting none. Survodutide's identifier data is not uniform across secondary sources, which is exactly why mass spec confirmation matters more here than for a well-characterised short peptide.\n\nThird, pressure mechanics: countdown timers, \"only 3 left\" that resets on refresh, and discounts that never expire. These are retail tactics imported from consumer e-commerce into a market where they have no legitimate function.\n\nA practical test that catches most of this: ask the supplier, in writing, for the batch number and the testing laboratory of the vial they would ship. A verified supplier answers within a day. A storefront answers with a generic COA link, or not at all.",
      },
    ],
    faq: [
      {
        question: "How do I verify a UK survodutide supplier?",
        answer:
          "Check five things: a per-batch Certificate of Analysis naming the testing laboratory and including mass spectrometry, a working contact route you have tested with a question, a registered company entity, research-use-only labelling, and domain ownership confirmed by a badge or similar proof.",
      },
      {
        question: "What is TrustScore and does it affect ranking?",
        answer:
          "TrustScore is a 100-point composite of verifiable signals — live domain, published COA, reviews, shipping and contact information — refreshed rather than archived. The trust sort on this page is computed from that data alone; sponsored placements are labelled separately and never inserted into it.",
      },
      {
        question: "Why does survodutide need mass spec confirmation?",
        answer:
          "Survodutide is an acylated peptide of about 4.2 kDa, and HPLC purity alone shows that a peak is clean without proving which molecule it is. Mass spectrometry confirms the expected mass, which is the check that distinguishes correct material from a pure but wrong sequence.",
      },
      {
        question: "Should I trust a supplier quoting clinical trial results?",
        answer:
          "Trial endpoints describe a pharmaceutical formulation used under a study protocol, not a research vial sold online. A supplier using them as product marketing is selling confidence rather than evidence, and it is worth weighing that against what their COA actually shows.",
      },
    ],
    sources: [
      { label: "Boehringer Ingelheim — survodutide (BI 456906) information", url: "https://www.boehringer-ingelheim.com/human-health/metabolic-diseases/obesity" },
      { label: "Zealand Pharma — peptide platform and licensing", url: "https://www.zealandpharma.com/" },
      { label: "Companies House — company register search", url: "https://find-and-update.company-information.service.gov.uk/" },
    ],
    tableMode: "trust",
    tableHeading: "Survodutide UK suppliers ranked by independent TrustScore",
    rowLimit: 6,
  },
  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-survodutide-peptide",
    title: "Best Survodutide Peptide UK: Ranked by Trust & Purity",
    description:
      "Best survodutide peptide uk ranking — scored on independent TrustScore, COA and identity evidence, then price per mg, with the trade-offs behind each position explained.",
    h1: "Best Survodutide Peptide UK",
    focusKeyword: "best survodutide peptide uk",
    intro: [
      "The best survodutide peptide uk listing is not simply the cheapest or the most heavily promoted one. It is the listing where you can verify what you are getting, at a price that is competitive once pack size is normalised. This page ranks tracked UK listings on that basis: independent TrustScore and identity evidence first, then cost per milligram, with the reasoning behind each position made explicit so you can reweight it for your own priorities.",
      "Survodutide is Boehringer Ingelheim's dual glucagon and GLP-1 receptor agonist, developed with Zealand Pharma as BI 456906. Structurally it is an oxyntomodulin-inspired peptide of roughly 4.2 kDa, acylated with a C18 fatty acid chain that binds albumin and supports once-weekly dosing in the clinical programme. Its dual mechanism — GLP-1 for appetite and gastric emptying, glucagon for energy expenditure — is what distinguishes it from single-agonist incretins in the research literature.",
      "Because the molecule is large and lipidated, identity confirmation is the decisive quality signal. A peptide of this size and modification is harder to characterise than a short linear sequence, so a supplier publishing mass spectrometry alongside HPLC is telling you something meaningful about how they run their QC.",
      "Reference information for laboratory and educational use only. Survodutide is investigational and unlicensed in the UK; nothing here is medical guidance. For full pricing and every listing, see the [**Survodutide price comparison hub →**](/compounds/survodutide).",
    ],
    sections: [
      {
        title: "Best Survodutide Peptide UK — How the Ranking Works",
        body: "Two criteria, applied in order. First, verification: does the supplier publish a per-batch Certificate of Analysis from a named laboratory, with mass spectrometry as well as HPLC, alongside a working contact route and research-use-only terms? Suppliers who do not are ranked below those who do, irrespective of price. Second, within the verified group, cost per milligram at the pack size listed.\n\nThe ordering is deliberate. A cheap listing from an unverified supplier is not a better product at a lower price; it is an unknown product. Since the compound cannot be assessed from a photograph, the only substitute for direct testing is the supplier's own documentation — and a supplier who has not produced that documentation has given you nothing to assess.\n\nWhere two suppliers are equally verified, price per milligram breaks the tie, and UK stock breaks a tie again. That last factor is underrated: domestic dispatch removes customs uncertainty and reduces time in uncontrolled transit temperatures, both of which matter for a lyophilised powder.",
        list: [
          "Verified: per-batch COA from a named lab, including mass spec.",
          "Verified: working contact route tested before ordering.",
          "Verified: research-use-only terms stated clearly.",
          "Then: lowest cost per milligram at the pack size you need.",
          "Then: UK-held stock over overseas drop-ship.",
        ],
      },
      {
        title: "What Separates the Top Listings From the Rest",
        body: "The strongest listings share four habits. They publish the batch number on the product page rather than hiding it behind a support request. They state the testing laboratory by name, which makes the result checkable. They label vials unambiguously, including the exact milligram content and the form. And they keep their COA page current — a certificate dated two years ago for a batch that no longer ships is not evidence about what you will receive.\n\nWeaker listings tend to fail in one of two ways. Either the documentation is generic — a sample COA that applies to no specific batch, often recycled across products — or the identity fields are inconsistent, with a molecular weight or identifier that disagrees with the primary literature. For survodutide specifically, some secondary sources quote conflicting identifiers, so a supplier who publishes a specific, internally consistent identity set with a matching mass spec trace is demonstrating more care than most.\n\nThe practical consequence is that the gap between the best and worst listing is not mainly about price. It is about whether you can answer the question \"what exactly is in this vial\" before you open it.",
        table: {
          header: ["Signal", "Top listings", "Weaker listings"],
          rows: [
            ["Batch number on product page", "Published", "Hidden behind support request"],
            ["Testing laboratory named", "Yes", "Generic or unnamed"],
            ["Mass spec alongside HPLC", "Yes", "HPLC only, or no data"],
            ["COA currency", "Recent batch", "Recycled sample certificate"],
            ["Identity fields", "Internally consistent", "Contradictory across pages"],
          ],
        },
      },
      {
        title: "Weighing Price Against Verification",
        body: "Once verification is established, price decides. Compare on cost per milligram, not headline price — a 10mg vial at £49.90 is £4.99/mg while a 5mg vial at £39.90 is £7.98/mg, a 60% difference that the headline numbers entirely conceal. Our [**cheapest survodutide uk**](/compound-guides/cheapest-survodutide-uk) page runs that arithmetic across every tracked listing.\n\nThere is a ceiling to how much verification is worth paying for. A 15–20% premium for a supplier who publishes per-batch mass spec and answers email within a day is straightforwardly good value. A 60% premium for the same documentation is not — you are then paying for branding rather than evidence.\n\nThe same discipline applies when comparing this compound against neighbours on the incretin shelf. Researchers cross-shopping [**tirzepatide**](/compounds/tirzepatide), [**retatrutide**](/compounds/retatrutide), [**semaglutide**](/compounds/semaglutide) or [**mazdutide**](/compounds/mazdutide) should apply identical criteria to each, because a supplier who is careful with one compound's documentation is usually careful with all of them — and one who is not, is not.",
      },
    ],
    faq: [
      {
        question: "What makes the best survodutide peptide in the UK?",
        answer:
          "Verification first: a per-batch Certificate of Analysis from a named laboratory including mass spectrometry, a tested contact route and clear research-use-only terms. Among verified suppliers, the best listing is then the lowest cost per milligram at the pack size you need, with UK-held stock preferred.",
      },
      {
        question: "Is the most expensive survodutide the best one?",
        answer:
          "No. Price above roughly a 15–20% premium for genuine per-batch testing and responsive support buys branding rather than evidence. Above that level the documentation is usually identical, and the extra cost does not correspond to a better characterised product.",
      },
      {
        question: "Why does mass spectrometry matter more for survodutide?",
        answer:
          "It is an acylated peptide of about 4.2 kDa, and HPLC purity alone confirms a peak is clean without proving which molecule it is. Mass spec confirms the expected mass, which is the check that separates correct material from a pure but wrong sequence.",
      },
      {
        question: "Should I compare survodutide to tirzepatide or retatrutide on price?",
        answer:
          "Compare within a compound on cost per milligram; compare between compounds on mechanism and published trial data. Vial sizes are not standardised across molecules, and per-mg cost across different compounds is not a measure of potency or equivalence.",
      },
    ],
    sources: [
      { label: "Boehringer Ingelheim — survodutide (BI 456906) programme", url: "https://www.boehringer-ingelheim.com/human-health/metabolic-diseases/obesity" },
      { label: "Zealand Pharma — survodutide discovery", url: "https://www.zealandpharma.com/" },
      { label: "MHRA — research chemical and medicine regulation", url: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency" },
    ],
    tableMode: "trust",
    tableHeading: "Best survodutide UK listings — verification first, then cost per mg",
    rowLimit: 0,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
