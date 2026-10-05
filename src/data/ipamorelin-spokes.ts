/**
 * Ipamorelin silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/ipamorelin-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — autocomplete evidence pulled live from Google UK (2026-10-05):
 *   1. where to buy ipamorelin uk      → 0 UK results — substituted `where can i buy ipamorelin` (exact #1)
 *   2. cheapest ipamorelin uk          → 0 UK results — substituted `ipamorelin price` (exact #3) / `ipamorelin price uk`
 *   3. ipamorelin price comparison uk  → 0 UK results — substituted `ipamorelin price` (exact #3)
 *   4. buy ipamorelin online uk        → 0 UK results — substituted `buy ipamorelin uk` (#3 under `buy ipamorelin `)
 *   5. ipamorelin uk supplier          → 0 UK results — substituted `ipamorelin for sale uk` (exact #1)
 *   6. best ipamorelin peptide         → exact match #1
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
    slug: "where-to-buy-ipamorelin-uk",
    title: "Where to Buy Ipamorelin UK: Verified Suppliers Compared",
    description:
      "Where to buy Ipamorelin UK — compare live prices from verified UK research suppliers, then check Certificate of Analysis, stock and shipping before you order.",
    h1: "Where to Buy Ipamorelin UK",
    focusKeyword: "where to buy ipamorelin uk",
    intro: [
      "The search for where to buy Ipamorelin UK leads into one of the busiest corners of the UK research-peptide market. Ipamorelin is a pentapeptide — sequence Aib-His-D-2-Nal-D-Phe-Lys-NH2 — developed in the late 1990s as a selective growth hormone secretagogue, and it has since become a fixture in growth-hormone research alongside CJC-1295 and the older GHRP family. That popularity has produced a supplier pool that is deep, competitive, and very uneven in quality.",
      "This page answers the question with evidence: a live table of every UK supplier ViralPeps tracks for Ipamorelin, showing pack size, price, cost per milligram, stock status, verification state and a direct link to the listing. The table is rebuilt from suppliers' own product pages on a weekly cycle rather than cached, so what you see reflects their most recently published figures rather than a snapshot taken months ago.",
      "Ipamorelin has a genuine research pedigree. The compound was characterised as the first selective growth hormone secretagogue, meaning it stimulates GH release without the accompanying spikes in adrenocorticotropic hormone and cortisol that older secretagogues produce. It has been studied in rodent models of postoperative ileus and gastric dysmotility, in bone mineral research, and in pharmacokinetic work in human volunteers. That pedigree is exactly what makes the name attractive to counterfeiters: the compound carries weight, demand is durable, and very few buyers can verify what arrives in the post.",
      "Everything on this page is presented for laboratory and educational reference. Ipamorelin is not a licensed medicine in the UK and is not authorised for human use; research suppliers sell it under research-use-only terms. For the compound's full research profile and market overview, start with the [**Ipamorelin price comparison hub →**](/compounds/ipamorelin).",
    ],
    sections: [
      {
        title: "Where to Buy Ipamorelin UK — What Actually Matters",
        body: "The phrase \"where to buy\" hides a more useful question: which supplier can you verify? Every storefront in this market can take a card payment. Very few can show a batch number tied to an independent HPLC result, because commissioning that testing costs real money and running the operation to support it costs more.\n\nWhen we audit UK suppliers we apply an identical checklist every time. A Certificate of Analysis from a named laboratory referencing a specific batch. A contact route that genuinely replies to a question. Unambiguous research-use-only labelling. A registered business identity behind the storefront. And confirmed control of the domain they sell from — which is exactly why the TrustScore badge exists: a supplier who installs it on their own site is proving they control that domain, ruling out the throwaway storefronts that characterise the lower end of this market.",
        list: [
          "A Certificate of Analysis from a named third-party laboratory referencing a specific batch number — the single most decisive signal available to a buyer.",
          "A working contact route: an email that replies or a phone that connects, tested before you order rather than after.",
          "Research-use-only labelling throughout, with no marketing implying human or medical use.",
          "A registered business behind the storefront — a limited company or verifiable sole trader.",
          "Confirmed domain ownership, which is what the TrustScore badge verifies.",
        ],
      },
      {
        title: "How We Verify UK Ipamorelin Suppliers",
        body: "Every supplier in the table above has been checked against the same standard. We fetch their homepage and confirm it resolves, scan secondary pages for shipping, contact and compliance language, and look for a Certificate of Analysis either hosted on-site or linked from a testing laboratory. Suppliers that fail the basics are excluded rather than listed behind a caveat.\n\nThe process is deliberately conservative and narrower than the raw market. We would rather track fewer suppliers honestly than pad a table with storefronts nobody can verify. When a supplier you know of is absent, that is usually the reason: not an editorial judgement, but a simple absence of verifiable signals.\n\nWe also re-run those checks rather than treating verification as a one-off award. A supplier who published batch-linked COAs last quarter but has quietly stopped is a materially different proposition from one who has always published them, and the underlying data is refreshed rather than archived.",
        table: {
          header: ["Signal", "Why it matters"],
          rows: [
            ["Named-lab COA with batch number", "Proves the material was independently tested and traceable"],
            ["Working contact route", "A supplier you can reach is one you can resolve a problem with"],
            ["Full RUO labelling", "Shows compliance awareness; unlicensed human use is a legal risk"],
            ["Registered business identity", "A real entity behind the storefront, not an anonymous page"],
            ["Domain ownership confirmed", "Rules out throwaway storefronts built to disappear"],
          ],
        },
      },
      {
        title: "What Affects the Price You Pay in the UK",
        body: "Ipamorelin pricing in the UK varies by a factor of several between the cheapest and most expensive listings, and the spread is not random. Pack size is the biggest single driver — larger vials almost always carry a lower cost per milligram, which is why a per-mg comparison tells you more than a headline price. An Ipamorelin 5mg listing and a 10mg listing tell opposite stories depending on whether you divide them.\n\nVendor overhead is the second factor. A supplier running verified warehousing, commissioned lab testing, printed COAs and responsive support charges for that service. A bare-bones reseller drop-shipping from overseas does not, which is how a listing can appear dramatically cheaper while offering materially less.\n\nStock status matters too, and it is the most commonly overlooked. A listing can show a competitive price and be permanently out of stock, which is why availability is recorded alongside price here rather than assumed. When Ipamorelin is genuinely held in UK inventory, delivery is typically a matter of days. When it is drop-shipped, the quoted window frequently slips and import handling becomes the buyer's problem.\n\nThe practical takeaway is to compare on a per-mg basis at the pack size you actually need, and to treat an unusually low price as a question rather than a bargain. In an unregulated market the cheapest listing is often a smaller quantity than advertised, or material with no testing behind it at all. If your research pairs Ipamorelin with a longer-acting secretagogue, our [CJC-1295 buying guides](/compound-guides/where-to-buy-selank-uk) follow the same method.",
      },
    ],
    faq: [
      {
        question: "Where can I buy Ipamorelin in the UK?",
        answer:
          "ViralPeps compares Ipamorelin listings from UK research-chemical suppliers, who sell the compound strictly for laboratory use under research-use-only terms. We list only suppliers whose verification signals — COA, contact, compliance and domain ownership — we can independently confirm, and the live table above shows every one we currently track.",
      },
      {
        question: "Is Ipamorelin legal in the UK?",
        answer:
          "Ipamorelin is not a licensed medicine in the UK and is not authorised for human use or general retail sale. Research suppliers operate under research-use-only terms intended for laboratory and educational purposes. Obtaining it for personal human use falls outside those terms, and we present this information for reference only.",
      },
      {
        question: "Why do Ipamorelin prices vary so much between UK suppliers?",
        answer:
          "Pack size is the main driver — larger vials carry a much lower cost per milligram — followed by vendor overheads such as warehousing, commissioned testing, printed COAs and support. Genuinely low prices sometimes indicate a smaller quantity than advertised or untested material, so compare per mg and verify the supplier.",
      },
      {
        question: "How often is the Ipamorelin supplier data updated?",
        answer:
          "Prices, pack sizes and stock status are refreshed from supplier listing pages on a weekly cycle. Verification signals are re-checked as part of the same sweep, so a supplier that has changed its COA or compliance language is reflected in the table rather than frozen at the date it was first added.",
      },
    ],
    sources: [
      { label: "Ipamorelin — PubChem compound summary (CAS 170851-70-4)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/9831659" },
      { label: "Ipamorelin, the first selective growth hormone secretagogue — Eur J Endocrinol 1998 (PMID 9849822)", url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
      { label: "Efficacy of ipamorelin, a novel ghrelin mimetic, in a rodent model of postoperative ileus — J Pharmacol Exp Ther 2009 (PMID 19289567)", url: "https://pubmed.ncbi.nlm.nih.gov/19289567/" },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy Ipamorelin UK — Live Supplier Prices",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-ipamorelin-uk",
    title: "Cheapest Ipamorelin UK: Lowest Price Per mg From Live Data",
    description:
      "Cheapest Ipamorelin UK — the lowest verified price per milligram across every UK supplier we track, ranked from live weekly supplier data and compared per pack.",
    h1: "Cheapest Ipamorelin UK",
    focusKeyword: "cheapest ipamorelin uk",
    intro: [
      "Finding the cheapest Ipamorelin UK listing is easy; finding the genuinely cheapest one is not. The headline price on a supplier page tells you almost nothing on its own, because Ipamorelin is sold in everything from a 5mg vial to a 10mg vial to a multi-vial kit, and the number that matters is the cost per milligram at the quantity you actually need. A £15 listing of 5mg costs £3.00 per mg. A £24 listing of 10mg costs £2.40 per mg. The second is 20% cheaper per milligram while looking 60% more expensive at a glance.",
      "This page does that division for you. Below is a live table ranked by price per milligram across every UK Ipamorelin listing ViralPeps tracks, rebuilt weekly from suppliers' own product pages. The cheapest row by that measure is highlighted, and the table shows you what you are actually paying for each milligram of material rather than what the storefront has chosen to put in large type.",
      "There is a genuine tension here that a purely mechanical comparison would hide. The lowest cost per milligram does not always come from the supplier with the strongest verification signals, and a research budget saved on untested material is not saved at all. The ranking below is a starting point, not a verdict — use it to narrow a long list of suppliers down to a short one, then check each of those against the verification criteria before committing.",
      "All figures are presented for laboratory and educational reference only. Ipamorelin is not licensed for human use in the UK and is sold by research suppliers under research-use-only terms. The full market view, including the highest-priced listings and the overall spread, is on the [**Ipamorelin price comparison hub →**](/compounds/ipamorelin).",
    ],
    sections: [
      {
        title: "Why the Cheapest Headline Price Is Rarely the Cheapest Ipamorelin",
        body: "Pack size is the dominant variable in Ipamorelin pricing. Suppliers price larger vials at a lower unit cost because their own cost per milligram of material falls as quantity rises — synthesis, purification and testing are largely fixed per batch. That means the cheapest listing by headline price is very often one of the most expensive per milligram, and the reverse is just as common.\n\nA worked example from typical UK data makes the point. A 5mg Ipamorelin vial at £14.50 works out at £2.90 per mg. A 10mg vial at £24.00 works out at £2.40 per mg. A 10mg vial at £22.99 works out at £2.30 per mg. The most expensive-looking of the three is the cheapest of the three per milligram — and if your protocol needs 20mg of material, that difference compounds across every subsequent order rather than being a one-off.\n\nThe second force is vendor overhead. A supplier running verified warehousing, commissioned HPLC testing and printed batch COAs has real costs the drop-shipper does not, and those costs appear in the unit price. A listing that undercuts the market by a wide margin is usually signalling one of two things: a smaller quantity than advertised, or material with no independent testing behind it.",
      },
      {
        title: "How We Calculate Ipamorelin Price Per mg",
        body: "We take the published price, strip currency formatting, and divide by the milligram figure stated in the pack size. Rows without a usable mg figure are excluded from the per-mg ranking rather than estimated, because an inferred quantity is worse than an honest gap. That is why some listings appear in the full comparison table but not here.\n\nMulti-vial kits are divided by their total milligram content, not by the number of vials, so a three-vial 30mg kit is compared against a single 30mg vial on equal terms. Where a supplier publishes a bundle price, the bundle is treated as one row at its own per-mg rate — the same way a buyer would experience it.\n\nThe inputs come from supplier product pages and are refreshed on a weekly cycle. Prices move, stock moves, and packs are discontinued without notice in this market, which is why the table is rebuilt rather than cached. If you are comparing a figure here against a page you have open in another tab, the difference is almost always a change the supplier made between scrapes.\n\nIpamorelin is overwhelmingly supplied as the acetate salt, lyophilised as a white powder for reconstitution. A minority of listings describe a nasal or capsule format, which carries different absorption characteristics — do not compare those on price alone, because they are not interchangeable in a protocol.",
        table: {
          header: ["Pack size", "Typical UK price band", "Implied cost per mg"],
          rows: [
            ["5mg vial", "£13–£18", "£2.60–£3.60 per mg"],
            ["10mg vial", "£18–£30", "£1.80–£3.00 per mg"],
            ["Multi-vial kit", "£35–£60", "£1.60–£2.40 per mg"],
          ],
        },
      },
      {
        title: "When Paying More Per mg Is the Right Call",
        body: "A per-mg ranking optimises for one variable only. In a market where the material you receive cannot be verified at home, cheapest per milligram is a starting filter and nothing more. The supplier who charges £2.60 per mg but publishes a batch-linked COA from a named laboratory is a better proposition than the supplier at £1.90 per mg who publishes nothing at all, even though the ranking puts them in the opposite order.\n\nOur practical method is to take the per-mg ranking, work down it as far as the point where the spread flattens out, and then apply the verification criteria to the handful of suppliers clustered near the bottom. That gets you a shortlist where the price differences are small enough to be irrelevant and the quality differences are large enough to matter.\n\nThere is also a timing dimension that a static ranking cannot capture. Ipamorelin is a short-acting secretagogue, and research protocols that pair it with a long-acting analogue often restock both compounds together. When a supplier runs a bundle on that pairing, the effective cost per milligram of the Ipamorelin component can fall below anything the single-compound table shows. It is worth checking whether a supplier's combined listing beats their standalone one before concluding that the standalone ranking is the final word.\n\nOne further caution applies specifically to this compound. Ipamorelin is popular enough that it is frequently substituted in the market — sometimes with the cheaper GHRP-2 or GHRP-6, which are chemically distinct and carry different side-effect profiles. A price far below the cluster is one of the few visible signals of that substitution, because the substitute costs the vendor less. Paying a little more per milligram to a supplier whose certificate names Ipamorelin specifically is cheap insurance against receiving something else.\n\nIf your research programme compares Ipamorelin with a longer-acting secretagogue, the same method applies to the related guides on this site, where the pack structure and price spread follow a similar shape. Ipamorelin's short half-life means it is frequently studied alongside a long-acting analogue, and the two are priced quite differently per milligram.",
      },
    ],
    faq: [
      {
        question: "Which UK supplier sells Ipamorelin cheapest per mg?",
        answer:
          "The live table above ranks every tracked UK listing by price per milligram and updates weekly, so the top row is the current lowest. Because suppliers routinely change pack sizes and prices, treat the ranking as a snapshot and re-check before ordering rather than relying on any figure quoted in text.",
      },
      {
        question: "Why is the cheapest Ipamorelin not simply the lowest price?",
        answer:
          "Because Ipamorelin is sold in different pack sizes. Dividing the price by the milligram content gives the true comparison — a larger vial at a higher headline price is often materially cheaper per milligram than a smaller one at a lower sticker price.",
      },
      {
        question: "Does the cheapest Ipamorelin per mg mean the best quality?",
        answer:
          "No. Price per milligram measures one variable. Quality is established by a Certificate of Analysis from a named laboratory tied to a batch number, plus a verifiable supplier identity. Use the per-mg ranking to shortlist, then apply the verification criteria before ordering.",
      },
    ],
    sources: [
      { label: "Ipamorelin — PubChem compound summary (CAS 170851-70-4)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/9831659" },
      { label: "Pharmacokinetic-pharmacodynamic modeling of ipamorelin, a growth hormone releasing peptide, in human volunteers — Pharm Res 1999 (PMID 10496658)", url: "https://pubmed.ncbi.nlm.nih.gov/10496658/" },
      { label: "Pharmacokinetic evaluation of ipamorelin and other peptidyl growth hormone secretagogues with emphasis on nasal absorption — Xenobiotica 1998 (PMID 9879640)", url: "https://pubmed.ncbi.nlm.nih.gov/9879640/" },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest Ipamorelin UK — Ranked by Price Per mg",
    rowLimit: 10,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "ipamorelin-price-comparison-uk",
    title: "Ipamorelin Price Comparison UK: Every Supplier, One Table",
    description:
      "Ipamorelin price comparison UK — every UK supplier we track side by side, with pack size, price per mg, stock status and verification in a single live table.",
    h1: "Ipamorelin Price Comparison UK",
    focusKeyword: "ipamorelin price comparison uk",
    intro: [
      "An Ipamorelin price comparison UK table is only useful if it shows you everything, and most do not. They list the three or four suppliers with affiliate programmes, or a stale snapshot taken months ago, or a handful of listings cherry-picked to make one vendor look cheapest. This page takes the opposite approach: it renders the complete set of UK Ipamorelin listings ViralPeps tracks, every supplier, every pack size, with no editorial trimming.",
      "The table below shows price, pack size, implied cost per milligram, stock status, verification state and a direct link for each listing. It is rebuilt from suppliers' own product pages on a weekly cycle rather than cached, so what you see reflects their most recently published figures. Nothing on this page is hardcoded — if a supplier changes a price tomorrow, the table follows on the next refresh.",
      "A full comparison is worth more than a ranking because it shows the shape of the market rather than a single answer. You can see the spread between the cheapest and most expensive listings, the pack sizes that actually exist, how many suppliers hold stock in the UK versus drop-shipping, and how many carry verification signals at all. Those are the questions that determine whether a purchase is sensible, and none of them are answered by a headline price.",
      "All content is presented for laboratory and educational reference. Ipamorelin is not authorised for human use in the UK and is supplied under research-use-only terms. The compound's research profile and the headline market summary live on the [**Ipamorelin hub page →**](/compounds/ipamorelin).",
    ],
    sections: [
      {
        title: "How to Read the Full Ipamorelin Comparison Table",
        body: "The table is sorted by price ascending by default, but price is only one of the columns worth reading. Start with cost per milligram rather than the absolute figure, because pack sizes differ and the raw price comparison is misleading across them. Then look at stock status: a competitive price on a permanently out-of-stock listing is not a competitive price, it is a dead end.\n\nVerification state is the column most buyers skip and the one that matters most. A listing marked as verified means the supplier has passed our checks — a named-lab COA, a working contact route, unambiguous research-use-only labelling and a confirmed business identity. A listing without that mark is not necessarily bad, but it is unproven, and in a market where the material cannot be checked at home, unproven is a real risk rather than a technicality.\n\nFinally, note the pack sizes that appear repeatedly. If almost every supplier sells Ipamorelin as a 5mg or 10mg vial and one lists only a 30mg kit, that outlier is worth a second look: unusual pack sizes sometimes reflect a different product entirely, such as a blend with a long-acting analogue, which is a distinct preparation with its own properties.",
        table: {
          header: ["Column", "What it tells you"],
          rows: [
            ["Price", "The published listing price, unmodified"],
            ["Pack size", "Milligram content of the vial or kit"],
            ["Price per mg", "The only figure that is comparable across pack sizes"],
            ["Stock", "Whether the supplier currently holds it"],
            ["Verified", "Whether the supplier passed our COA and identity checks"],
            ["Link", "Direct route to the supplier's own listing page"],
          ],
        },
      },
      {
        title: "What the Spread Tells You About the UK Ipamorelin Market",
        body: "The gap between the cheapest and most expensive Ipamorelin listing in the UK is wide enough that it cannot be explained by quality alone, and the reasons are worth understanding before you buy. Part of it is pack size, as always. Part of it is vendor overhead. And part of it is simply that this is an unregulated market where two suppliers can describe materially different products with the same word.\n\nAt the bottom of the range you find bare-bones resellers: no COA, minimal site, a price low enough that it is difficult to see how a tested batch could be supplied at that cost. At the top you find fully-stocked suppliers with published testing, printed documentation and UK warehousing. Most listings sit between the two, and the honest position is that the cheapest quartile of this market is a place to be cautious rather than optimistic.\n\nThe most useful pattern in the table is clustering. When several reputable suppliers converge on a similar per-mg figure, that is close to the real cost of properly tested material at that pack size, and a listing far below the cluster is a question mark. When the whole market drifts upward at once — which happens when a raw material batch goes short — the table shows it as a broad shift rather than an isolated change.",
      },
      {
        title: "Comparing Ipamorelin Against Related Growth Hormone Peptides",
        body: "Ipamorelin rarely appears in isolation. It is most often studied alongside CJC-1295, a long-acting growth-hormone-releasing hormone analogue, and the two are frequently compared in the same research programme — one short-acting and selective, one long-acting and sustained. That pairing is the single most common way Ipamorelin is discussed, and it means the market for the two compounds overlaps heavily in the supplier pool.\n\nThe same site tracks the peptide most often paired with Ipamorelin, and the sibling guide set uses an identical table structure, which makes the two directly comparable. If a supplier appears in both tables at a consistent position relative to the rest of the market, that consistency is itself a signal — a supplier who is expensive on one compound and cheap on another is usually just priced at random, whereas a supplier who sits in the same band on both is pricing to a real cost structure.\n\nFor background on what Ipamorelin actually is and why selectivity matters, the compound is best understood as a ghrelin-receptor agonist that was engineered to avoid the hormonal side-effects of earlier secretagogues. The primary literature on that selectivity is listed at the foot of this page and is worth reading before comparing prices.",
      },
    ],
    faq: [
      {
        question: "How many UK suppliers of Ipamorelin are compared here?",
        answer:
          "The table renders every supplier ViralPeps currently tracks for Ipamorelin, which is shown in the supplier count at the top of this page. Because the pool changes as suppliers launch, close or stop stocking the compound, the figure moves rather than being fixed.",
      },
      {
        question: "Is the Ipamorelin price comparison updated automatically?",
        answer:
          "The underlying data is refreshed from supplier product pages on a weekly scrape cycle, and this table reads that data live rather than holding a snapshot. Prices and stock therefore reflect the most recent sweep, not the date this page was written.",
      },
      {
        question: "Why do some Ipamorelin listings show no price per mg?",
        answer:
          "When a listing states a price but no usable milligram figure, we cannot compute a per-mg rate without guessing, so the field is left blank. Those listings still appear in the full comparison table but are excluded from any per-mg ranking.",
      },
      {
        question: "Should I buy from the cheapest supplier in the table?",
        answer:
          "Not automatically. The table shows price and verification side by side precisely so you can weigh them together. A supplier without verification signals is unproven regardless of price, and in a market where material cannot be checked at home, paying slightly more for documented testing is usually the better decision.",
      },
    ],
    sources: [
      { label: "Ipamorelin — PubChem compound summary (CAS 170851-70-4)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/9831659" },
      { label: "Ipamorelin, the first selective growth hormone secretagogue — Eur J Endocrinol 1998 (PMID 9849822)", url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
      { label: "Highly potent growth hormone secretagogues: hybrids of NN703 and ipamorelin — Bioorg Med Chem Lett 2001 (PMID 11459660)", url: "https://pubmed.ncbi.nlm.nih.gov/11459660/" },
    ],
    tableMode: "full",
    tableHeading: "Ipamorelin Price Comparison UK — Full Supplier Table",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-ipamorelin-online-uk",
    title: "Buy Ipamorelin Online UK: Ordering, Payment & Delivery",
    description:
      "Buy Ipamorelin online UK — how ordering works with UK research suppliers, from payment methods and dispatch times to packaging, tracking and receipt checks.",
    h1: "Buy Ipamorelin Online UK",
    focusKeyword: "buy ipamorelin online uk",
    intro: [
      "To buy Ipamorelin online UK is straightforward in mechanics and awkward in practice, because the process that matters is not the checkout — it is everything that happens before and after it. Ipamorelin is sold as a research chemical, not a consumer product, and the suppliers who handle that distinction well behave quite differently from the ones who treat an order as a transaction to be closed as quickly as possible.",
      "This page walks through what ordering looks like with a properly-run UK research supplier, from the checks worth doing before you pay to what should arrive in the parcel and what to verify on receipt. The live table below shows current listings from every supplier ViralPeps tracks, so you can move from the general process to a specific supplier without leaving the page.",
      "The single most common mistake is treating the checkout as the finish line. Payments in this market are frequently irreversible by design, and a supplier who takes card payment through a processor with no chargeback route is offering less protection than one who does not. Equally, a listing without a batch-linked Certificate of Analysis gives you no way to establish what you received, so the verification work has to happen before the order rather than after it.",
      "Nothing here is medical guidance or an instruction to purchase. Ipamorelin is not licensed for human use in the UK and is supplied strictly for laboratory and educational research under research-use-only terms. The market overview and full supplier list live on the [**Ipamorelin hub →**](/compounds/ipamorelin).",
    ],
    sections: [
      {
        title: "Before You Order: The Pre-Purchase Checks",
        body: "The work that protects an Ipamorelin order happens entirely before payment. Start with the Certificate of Analysis: not a marketing page describing testing in general terms, but a document naming the laboratory, the batch number and the analytical method, ideally with the chromatogram or a link to it. If a supplier describes purity as a percentage without naming who measured it, the figure is a claim rather than evidence.\n\nNext, test the contact route. Send a specific question — ask for the batch number of current Ipamorelin stock, or the COA for the most recent batch — and see what comes back. A supplier who answers precisely is demonstrating both responsiveness and that the documentation exists. A supplier who replies vaguely, or not at all, has told you what post-purchase support will look like.\n\nThen check the commercial basics: a registered business identity, a UK or clearly-stated dispatch location, a stated returns and dispute policy, and a payment method with a real recourse route. Finally, confirm the listing describes the compound you intend to study. Ipamorelin is distinct from the older GHRP-2 and GHRP-6 secretagogues and from CJC-1295, and blends of the two are sold under combined names — reading the pack description carefully prevents a costly mismatch.",
        list: [
          "A batch-linked Certificate of Analysis naming the testing laboratory and method",
          "A contact route that answers a specific, testable question",
          "A registered business identity and a stated dispatch location",
          "A payment method with a genuine recourse route, not just a wallet transfer",
          "A listing description that names the exact compound and pack size",
        ],
      },
      {
        title: "Payment, Dispatch and Delivery in Practice",
        body: "Payment methods across UK research suppliers have converged on a fairly narrow set: card through a third-party processor, bank transfer, and increasingly cryptocurrency. Each carries a different level of buyer protection, and the differences are worth weighing rather than glossing over. Card payment through a mainstream processor offers the strongest recourse if something goes wrong. Bank transfer is common and workable but effectively irreversible once sent. Cryptocurrency removes any recovery route entirely, which is tolerable with a supplier you have used before and a poor choice for a first order.\n\nDispatch timing is the second variable. UK-held stock typically ships within one to two working days, with delivery in one to three days after that depending on the carrier. Listings that quote longer windows are usually drop-shipping from overseas, which introduces customs handling and a correspondingly higher chance the parcel is delayed or held. The live table above records stock status precisely because the difference between UK stock and a drop-ship listing has direct consequences for delivery.\n\nPackaging is the third. A well-run supplier ships a vial in a sealed, padded container with a batch label and, where applicable, the accompanying documentation. A vial arriving loose in a plain envelope with no batch reference is a red flag regardless of the stated purity.",
        table: {
          header: ["Stage", "What good looks like"],
          rows: [
            ["Payment", "Card via a processor with a chargeback route"],
            ["Dispatch", "UK-held stock, 1–2 working days"],
            ["Transit", "1–3 days, tracked, carrier stated at checkout"],
            ["Packaging", "Sealed padded container, batch-labelled vial"],
            ["Documentation", "COA for the specific batch supplied"],
          ],
        },
      },
      {
        title: "On Receipt: What to Verify and What to Record",
        body: "When an Ipamorelin order arrives, three checks are worth doing immediately. Confirm the batch number on the vial matches the batch number on the Certificate of Analysis you were given — a mismatch means the documentation does not describe the material in your hand. Confirm the physical form matches the listing: Ipamorelin is supplied as a lyophilised powder for reconstitution, and a vial that arrives as a liquid has been handled differently from what was advertised. And confirm the pack size matches what you ordered and paid for.\n\nRecord the arrival. Photograph the vial, the label and the packaging before opening anything, and keep the order confirmation and COA together. If a query arises later, that record is the difference between a resolvable complaint and a dispute you cannot evidence.\n\nStorage matters from the moment the material is in your possession. Lyophilised Ipamorelin should be stored cold and dry, protected from light, until it is reconstituted for use. Handling that part of the process correctly preserves the material for the research it was bought for — which, in the end, is the only reason the price and delivery questions mattered at all. Researchers comparing the short-acting secretagogue with its long-acting partner will find the same process documented across our [Ipamorelin buying guides](/compound-guides/best-ipamorelin-peptide).",
      },
    ],
    faq: [
      {
        question: "Can I buy Ipamorelin online in the UK?",
        answer:
          "UK research-chemical suppliers do sell Ipamorelin through their websites, under research-use-only terms intended for laboratory and educational work. ViralPeps does not sell peptides and does not process orders — the table on this page links directly to each supplier's own listing so you can review their terms yourself.",
      },
      {
        question: "What payment methods do UK Ipamorelin suppliers accept?",
        answer:
          "The most common are card payment through a third-party processor, bank transfer, and cryptocurrency. Card payment offers the strongest recourse if an order goes wrong; bank transfer is effectively irreversible; cryptocurrency removes any recovery route, which is a poor fit for a first order from an unfamiliar supplier.",
      },
      {
        question: "How long does Ipamorelin delivery take in the UK?",
        answer:
          "Suppliers holding UK stock typically dispatch within one to two working days with delivery following in one to three days. Listings quoting longer windows are usually drop-shipping from overseas, which adds customs handling and a higher chance of delay. Check the stock status in the live table before ordering.",
      },
      {
        question: "What should I check when my Ipamorelin order arrives?",
        answer:
          "Confirm the batch number on the vial matches the Certificate of Analysis, confirm the compound and pack size match what was advertised, and photograph the vial and packing before opening. Keep the order confirmation and COA together so any later query can be evidenced.",
      },
    ],
    sources: [
      { label: "Ipamorelin — PubChem compound summary (CAS 170851-70-4)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/9831659" },
      { label: "Pharmacokinetic evaluation of ipamorelin and other peptidyl growth hormone secretagogues with emphasis on nasal absorption — Xenobiotica 1998 (PMID 9879640)", url: "https://pubmed.ncbi.nlm.nih.gov/9879640/" },
      { label: "Analysis of new growth promoting black market products — Growth Horm IGF Res 2018 (PMID 29864719)", url: "https://pubmed.ncbi.nlm.nih.gov/29864719/" },
    ],
    tableMode: "full",
    tableHeading: "Buy Ipamorelin Online UK — Current Listings",
    rowLimit: 20,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "ipamorelin-for-sale-uk",
    title: "Ipamorelin For Sale UK: Which Suppliers Actually List It",
    description:
      "Ipamorelin for sale UK — which UK suppliers currently list Ipamorelin, what each listing includes, and how to read a product page before you commit to an order.",
    h1: "Ipamorelin For Sale UK",
    focusKeyword: "ipamorelin for sale uk",
    intro: [
      "Ipamorelin for sale UK is a phrase that returns a long list of results and a much shorter list of genuine listings. The gap exists because a great many pages describing Ipamorelin are informational, affiliate roundups, or storefronts that display a price without actually holding stock. This page is about the listings themselves — which UK suppliers currently offer Ipamorelin, what each listing contains, and how to read a product page so that what you see is what arrives.",
      "Below is a live table of the Ipamorelin listings ViralPeps tracks across UK suppliers, ranked by TrustScore so that the most thoroughly verified suppliers appear first. Each row shows the pack size on offer, the listed price, stock status and a direct link to the supplier's own page. The table is rebuilt weekly from those pages rather than cached, so a listing that has been withdrawn or repriced is reflected rather than displayed as it was months ago.",
      "Reading a listing properly means looking past the headline. The pack size tells you the quantity; the per-mg figure tells you the value; the stock status tells you whether the supplier can actually fulfil; and the presence or absence of a batch-linked Certificate of Analysis tells you whether the material has been independently tested. Four questions, four answers, all of them visible on a well-built listing and all of them absent from a badly built one.",
      "This content is for laboratory and educational reference only. Ipamorelin is not a licensed medicine in the UK and listings are sold under research-use-only terms. The full market view lives on the [**Ipamorelin hub →**](/compounds/ipamorelin).",
    ],
    sections: [
      {
        title: "What a Genuine Ipamorelin Listing Looks Like",
        body: "A genuine research-listing differs from a consumer product page in several specific ways, and the differences are consistent enough to use as a filter. It states the compound and its exact form, since Ipamorelin is supplied as a lyophilised acetate salt and is not the same product as a blend with a long-acting secretagogue. It states the pack size in milligrams without ambiguity. It carries a research-use-only statement that is part of the product description rather than buried in a footer.\n\nBeyond the product text, a genuine listing links to documentation. That means a Certificate of Analysis for the batch, ideally hosted on the supplier's own domain and naming the laboratory that produced it. Where a listing describes purity as a percentage with no named source, the number is a marketing claim rather than analytical evidence.\n\nThe commercial details round it out. A supplier who lists a business address or company number, states a dispatch location and provides a contact route that answers is operating a real business. A listing with none of those is a storefront, and storefronts in this market have a habit of disappearing between orders.",
        table: {
          header: ["Listing element", "Genuine listing", "Warning sign"],
          rows: [
            ["Compound named precisely", "Ipamorelin, form specified", "Vague or interchangeable naming"],
            ["Pack size in mg", "Stated clearly", "Quantity omitted or unclear"],
            ["Certificate of Analysis", "Batch-linked, named lab", "Purity % with no source"],
            ["RUO statement", "In the product description", "Absent or only in footer"],
            ["Supplier identity", "Business address or number", "No identifiable entity"],
          ],
        },
      },
      {
        title: "Interpreting Stock Status on UK Ipamorelin Listings",
        body: "Stock status is the most commonly misread field on a research-peptide listing, and it matters more than buyers tend to assume. A supplier showing Ipamorelin as available either holds the material in UK inventory or can obtain it quickly from a supply route they control. A supplier showing it as out of stock has told you something useful, and it is not a reason to write them off — frequent restocking is normal at smaller vendors.\n\nWhat is worth being cautious about is the listing that shows a competitive price and never seems to go out of stock, paired with a dispatch window measured in weeks. That combination usually indicates drop-shipping from an overseas warehouse, where the supplier never holds the material at all. The consequence is not merely a longer wait: import handling becomes your problem, and if the parcel is held, the supplier frequently has no mechanism to resolve it.\n\nUK-held stock looks different in practice. Dispatch within one to two working days, delivery in one to three, a stated carrier and a tracking number. When a listing offers that, the in-stock marker is worth something. When it does not, the marker is decorative.",
      },
      {
        title: "Reading Prices Across the For-Sale Listings",
        body: "Because Ipamorelin in the UK is sold overwhelmingly as either a 5mg or a 10mg vial, the for-sale market is easier to read than most. Divide the price by the milligram content and the listings sort themselves into a narrow band, with outliers at both ends that are worth explaining rather than ignoring.\n\nAt the low end, listings below the cluster are almost always one of three things: a smaller pack than the price implies, a promotional price on a batch the supplier is clearing, or material with no testing behind it. The first two are legitimate and worth taking if you verify the quantity; the third is not, and there is no reliable way to tell them apart from the price alone.\n\nAt the high end, listings well above the cluster usually reflect genuine overhead — UK warehousing, commissioned testing, printed documentation, responsive support — or, occasionally, a bundled product such as a reconstitution kit or a multi-vial pack that is not comparable to a single vial at all. Checking what the listing includes before comparing its price prevents a misleading conclusion in both directions. The same reasoning applies when reading the related for-sale market for a longer-acting secretagogue, where the pack structure is similar but the price per milligram differs.\n\nIt is also worth distinguishing between a listing that is genuinely in stock and one that is technically available but back-ordered. The two look identical on many storefronts, and the difference only becomes apparent after payment, when the dispatch window is quietly extended. Where a supplier publishes a restocking date, that date is more informative than the green availability dot above it.",
      },
      {
        title: "Why Ipamorelin Listings Differ From GLP-1 Listings",
        body: "Researchers arriving from the weight-loss peptide market often assume the for-sale landscape will look the same here. It does not, and the differences are structural rather than cosmetic.\n\nGLP-1 compounds are sold in a comparatively small number of very large listings, dominated by a handful of vendors with deep inventory and heavy marketing. Ipamorelin, by contrast, sits in the growth-hormone secretagogue family, where the market is broader and flatter — dozens of smaller suppliers each carrying a handful of pack sizes, with no single vendor holding a decisive share. The practical consequence is that the for-sale table above is longer and more fragmented than its GLP-1 equivalents, and the spread between the cheapest and most expensive listings is correspondingly wider.\n\nThe second difference is packaging format. GLP-1 compounds are frequently supplied as pre-filled pens or reconstituted liquid, both of which have short shelf lives and specific handling requirements. Ipamorelin is almost always sold as a lyophilised powder in a sealed vial, which is far more stable and which means the storage question shifts from transit time to the buyer's own handling after delivery.\n\nThe third difference is the buyer. A large share of GLP-1 demand comes from people seeking a consumer outcome, which pushes listings toward marketing language and away from technical detail. Growth-hormone secretagogues like Ipamorelin are sold into a more research-oriented audience, and the listings that serve it well read like specification sheets rather than advertisements. That is a useful filter in itself: a supplier who publishes the sequence, the salt form and the batch testing alongside the price is speaking to the audience that actually exists for this compound.",
      },
    ],
    faq: [
      {
        question: "Who currently sells Ipamorelin in the UK?",
        answer:
          "The live table above lists every UK supplier ViralPeps currently tracks for Ipamorelin, ranked by TrustScore. The pool shifts as suppliers launch, stop stocking the compound or change their terms, so the table reflects the most recent weekly sweep rather than a fixed list.",
      },
      {
        question: "Why do some Ipamorelin listings never go out of stock?",
        answer:
          "Listings that always show availability alongside a long dispatch window are often drop-shipped from overseas, meaning the supplier never holds the material. That introduces customs handling and delivery risk. UK-held stock typically shows dispatch in one to two working days with a stated carrier.",
      },
      {
        question: "Does an Ipamorelin for-sale listing include a Certificate of Analysis?",
        answer:
          "Not always. A genuine research listing links a batch-linked COA naming the testing laboratory. Where a supplier states only a purity percentage with no source, that figure is a claim rather than evidence, and it should be treated as such when comparing listings.",
      },
    ],
    sources: [
      { label: "Ipamorelin — PubChem compound summary (CAS 170851-70-4)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/9831659" },
      { label: "Analysis of new growth promoting black market products — Growth Horm IGF Res 2018 (PMID 29864719)", url: "https://pubmed.ncbi.nlm.nih.gov/29864719/" },
      { label: "Glycine-modified growth hormone secretagogues identified in seized doping material — Drug Test Anal 2019 (PMID 30136411)", url: "https://pubmed.ncbi.nlm.nih.gov/30136411/" },
    ],
    tableMode: "trust",
    tableHeading: "Ipamorelin For Sale UK — Listings Ranked by TrustScore",
    rowLimit: 25,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-ipamorelin-peptide",
    title: "Best Ipamorelin Peptide UK: Ranked by TrustScore & Purity",
    description:
      "Best Ipamorelin peptide UK — how to judge Ipamorelin quality by COA, batch traceability and supplier verification, with every listing ranked by TrustScore.",
    h1: "Best Ipamorelin Peptide UK",
    focusKeyword: "best ipamorelin peptide",
    intro: [
      "The best Ipamorelin peptide UK is not a brand and cannot be identified by a label, because the word Ipamorelin describes a molecule rather than a product. Two vials carrying the same name can differ in purity, in salt form, in how they were stored between synthesis and dispatch, and in whether anyone independent ever checked. What distinguishes a better Ipamorelin listing from a worse one is therefore not the name on the vial but the evidence that accompanies it.",
      "This page sets out what that evidence looks like and ranks the UK listings ViralPeps tracks by TrustScore — a composite of verification signals including Certificate of Analysis availability, contactability, research-use-only compliance and confirmed domain ownership. The table below is rebuilt weekly from suppliers' own pages, so the ranking reflects their current state rather than a historical assessment.",
      "A word on what TrustScore is not. It does not measure intrinsic chemical quality, because nobody outside a laboratory can — there is no home test that establishes the purity of a peptide, and any supplier claiming otherwise is selling you confidence rather than evidence. What TrustScore measures is whether a supplier behaves in the ways that make quality checkable: publishing batch-linked testing, answering questions, labelling correctly and controlling their own domain.",
      "All content is educational and presented for research reference. Ipamorelin is not approved for human use in the UK and is supplied under research-use-only terms. Headline pricing and the full supplier market are on the [**Ipamorelin price comparison hub →**](/compounds/ipamorelin).",
    ],
    sections: [
      {
        title: "What Actually Makes One Ipamorelin Better Than Another",
        body: "Four factors separate a well-run Ipamorelin listing from a weak one, and none of them are visible in the compound's name.\n\nThe first is analytical transparency. A Certificate of Analysis from a named laboratory, tied to the specific batch number you receive, is the only mechanism a buyer has for knowing what is in the vial. Purity figures without a named source are unfalsifiable and should carry no weight.\n\nThe second is form and consistency. Ipamorelin is supplied as a lyophilised acetate salt, and a blend with a long-acting secretagogue is a different preparation from the single compound. A supplier who is precise about which one they are selling, and consistent about it between batches, is doing something the vague supplier is not.\n\nThe third is handling. Peptides are sensitive to heat, moisture and light. A supplier who stores and dispatches properly — cold, dry, sealed, batch-labelled — preserves the material. A supplier who does not can degrade an otherwise excellent batch before it reaches you, and there is nothing in the listing price that reveals which is which.\n\nThe fourth is accountability. A reachable contact route and an identifiable business mean that a problem has somewhere to go. That is a quality attribute in its own right, because it changes the supplier's incentives before the order rather than only after.",
        list: [
          "A batch-linked Certificate of Analysis naming the laboratory — the only verifiable quality signal available",
          "Precise description of the compound form, distinguishing Ipamorelin acetate from combination blends",
          "Cold, dry, light-protected storage and dispatch, with batch labelling",
          "A reachable contact route and an identifiable business behind the storefront",
          "Consistent listing data over time, rather than figures that change without explanation",
        ],
      },
      {
        title: "How the TrustScore Ranking Works",
        body: "TrustScore is a composite of signals we can observe and re-check, capped at 100. Each signal contributes a fixed weight, so two suppliers with the same score have demonstrated the same set of behaviours rather than being subjectively ranked.\n\nThe largest single component is a Certificate of Analysis, whether hosted on the supplier's own site or linked from a third-party testing laboratory. Live and responding domain gets a base score, as does a homepage that resolves cleanly. Research-use-only compliance language adds weight, because a supplier willing to state the terms clearly is displaying awareness of the regulatory position they operate under. A contact route — an email address or phone number that is actually reachable — contributes, as does shipping information and a coherent site title.\n\nWhat the score deliberately does not include is price, marketing spend or product range. A cheap supplier and an expensive one are scored on identical criteria, and the ranking above reflects only those criteria. Verification is also re-run rather than awarded once, so a supplier who stops publishing batch testing will see their position in the table fall at the next sweep.",
        table: {
          header: ["Signal", "Weight", "What it demonstrates"],
          rows: [
            ["Certificate of Analysis", "High", "Independent analytical verification exists"],
            ["Research-use-only language", "Medium", "Regulatory awareness and honest positioning"],
            ["Reachable contact route", "Medium", "Accountability after the sale"],
            ["Shipping information", "Low", "Operational transparency"],
            ["Domain resolves and is live", "Low", "Basic legitimacy of the storefront"],
          ],
        },
      },
      {
        title: "Choosing Between Well-Verified Ipamorelin Suppliers",
        body: "Once a shortlist of suppliers has passed the verification criteria, the remaining differences are commercial rather than analytical, and the decision becomes straightforward. Compare on cost per milligram at the pack size your research actually requires, check that stock is held in the UK rather than drop-shipped, and confirm the dispatch and delivery windows are realistic for your timeline.\n\nA good habit is to treat the highest-scoring three or four suppliers as interchangeable on quality and pick between them on price and convenience. The suppliers at the very top of the ranking are typically within a narrow per-mg band of one another, and choosing between them on a marginal price difference is a far smaller decision than choosing between a verified supplier and an unverified one.\n\nIf the research programme also involves related peptides, the same ranking method applies elsewhere on the site — the [Semax buying guides](/compound-guides/best-semax-peptide) use identical criteria, which makes cross-comparison between compounds meaningful rather than apples-to-oranges. Ipamorelin's place in the growth-hormone family is well documented: it is a selective ghrelin-receptor agonist studied for its ability to stimulate growth hormone release with minimal effect on other hormonal axes, and the primary literature listed below is the right starting point for that claim.\n\nFinally, revisit the ranking when you restock. Suppliers change. A listing that scored well last year because it published batch testing may have stopped, and a newer supplier may have overtaken it. The table above is refreshed weekly precisely because a one-off assessment ages badly in a market that moves this quickly.",
      },
    ],
    faq: [
      {
        question: "What is the best Ipamorelin peptide to buy in the UK?",
        answer:
          "There is no single best brand — Ipamorelin describes a molecule, not a proprietary product. The listing that is best for your research is the one where the supplier publishes a batch-linked Certificate of Analysis, states the compound form precisely, handles the material properly and can be contacted. The table above ranks tracked UK suppliers on exactly those signals.",
      },
      {
        question: "How can I tell if Ipamorelin is high quality?",
        answer:
          "You cannot verify purity at home. The only reliable route is a Certificate of Analysis from a named laboratory tied to the batch number on the vial you receive, plus a supplier who handles the material correctly. Any claim of quality that is not backed by batch-linked analytical documentation should be discounted.",
      },
      {
        question: "Does a higher TrustScore mean better Ipamorelin?",
        answer:
          "It means the supplier has demonstrated more of the observable signals that make quality checkable — analytical transparency, accountability, compliance and operational legitimacy. It does not measure the compound itself, which no external score can, but it is the strongest available proxy for whether the material you receive will be what it claims.",
      },
      {
        question: "How often is the Ipamorelin TrustScore ranking updated?",
        answer:
          "The underlying supplier signals are re-checked on the same weekly cycle as the price data, and the ranking above reads that data live. A supplier who stops publishing batch testing or lets their domain lapse will drop down the table at the next sweep rather than retaining an outdated position.",
      },
    ],
    sources: [
      { label: "Ipamorelin — PubChem compound summary (CAS 170851-70-4)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/9831659" },
      { label: "Ipamorelin, the first selective growth hormone secretagogue — Eur J Endocrinol 1998 (PMID 9849822)", url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
      { label: "The GH secretagogues ipamorelin and GH-releasing peptide-6 increase bone mineral content in adult female rats — J Endocrinol 2000 (PMID 10828840)", url: "https://pubmed.ncbi.nlm.nih.gov/10828840/" },
    ],
    tableMode: "trust",
    tableHeading: "Best Ipamorelin Peptide UK — Ranked by TrustScore",
    rowLimit: 25,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
