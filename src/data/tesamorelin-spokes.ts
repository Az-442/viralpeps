/**
 * Tesamorelin silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/tesamorelin-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — autocomplete evidence pulled live from Google UK (2026-10-16):
 *   1. where to buy tesamorelin uk    → exact #1 (`tesamorelin peptide where to buy uk`)
 *   2. cheapest tesamorelin uk        → 0 for the strict form → substituted `cheapest tesamorelin` (exact #1) + `cheapest tesamorelin peptide` (#2)
 *   3. tesamorelin price comparison uk → 0 → substituted `tesamorelin price uk` (exact #1) + `tesamorelin uk price`
 *   4. buy tesamorelin online uk      → 0 → substituted `buy tesamorelin peptide uk` (exact #1) + `buy tesamorelin uk` (under `buy tesamorelin `)
 *   5. tesamorelin uk supplier        → close match #1 (`tesamorelin uk stockists`) — kept as UK supplier
 *   6. best tesamorelin peptide       → exact #1 (`best tesamorelin peptide`)
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
    slug: "where-to-buy-tesamorelin-uk",
    title: "Where to Buy Tesamorelin UK: Verified Suppliers",
    description:
      "Where to buy Tesamorelin UK — compare live prices from verified UK research suppliers, then check Certificate of Analysis, stock and delivery before you order.",
    h1: "Where to Buy Tesamorelin UK",
    focusKeyword: "where to buy tesamorelin uk",
    intro: [
      "Searching for where to buy Tesamorelin UK puts you in a different market from the GLP-1 compounds that dominate British peptide headlines, and the difference is worth understanding before you spend anything. Tesamorelin is a synthetic 44-amino-acid analogue of growth hormone-releasing hormone, stabilised with a trans-3-hexenoyl modification at the N-terminus that blocks rapid enzymatic cleavage of the peptide. That single structural change is what turns a hormone with a circulating half-life measured in minutes into a research reagent with a half-life closer to half an hour, and it is why Tesamorelin exists as a practical laboratory material at all rather than being degraded almost as soon as it enters circulation.",
      "This page answers the availability question with evidence rather than adjectives: a live table of every UK supplier ViralPeps tracks for Tesamorelin, showing pack size, headline price, cost per milligram, stock status and a direct link to the supplier's own product page. Figures are rebuilt from suppliers' published pages on a weekly cycle, so what you see reflects their most recent state rather than a snapshot taken months ago.",
      "The reason the supplier pool here behaves differently from a metabolic peptide is partly regulatory and partly pharmacological. Tesamorelin is an approved medicine in some jurisdictions, marketed for visceral adiposity in adults, and it has been through randomised controlled trials rather than only bench work. That dual identity — licensed drug in one context, research reagent in another — means the UK listings you find sit firmly in the research-use-only category, sold as lyophilised powder for laboratory work rather than for human use. It also means the scientific literature behind the molecule is unusually deep, which is a double-edged sword: a listing can borrow that credibility for free, so documentation is what separates a genuine supplier from an opportunistic one.",
      "Everything on this page is presented for laboratory and educational reference. Tesamorelin is not authorised for human use in the UK, and research suppliers sell it under research-use-only terms intended for in-vitro work. If you are auditing the market rather than buying today, start with the [**Tesamorelin comparison hub →**](/compounds/tesamorelin).",
    ],
    sections: [
      {
        title: "Where to Buy Tesamorelin UK — What Actually Matters",
        body: "The phrase \"where to buy\" hides a more useful question: which supplier can you actually verify? Tesamorelin is exposed on this front for a specific reason. It is a marketed pharmaceutical product elsewhere in the world, which means the branding, dosage language and clinical reputation of the licensed drug are all available to borrow at zero cost to a reseller. A storefront that leans on the credibility of clinical trials without publishing a batch-linked Certificate of Analysis is doing exactly that, and the borrowing is invisible unless you look for the document.\n\nWhen we audit UK suppliers we apply an identical checklist every time. A Certificate of Analysis from a named laboratory referencing a specific batch. A contact route that genuinely replies to a question. Unambiguous research-use-only labelling. A registered business identity behind the storefront. And confirmed control of the domain they sell from, which is why the TrustScore badge exists: a supplier who installs it on their own site is proving they control that domain, ruling out the throwaway storefronts that characterise the lower end of this market.\n\nFor a GHRH analogue there is one further check that matters more than it does for a short synthetic peptide. Tesamorelin appears on doping-control watchlists as a growth-hormone-releasing hormone analogue, and laboratories have published analytical methods specifically for detecting GHRH analogues in urine. That means the genuine article is a molecule worth testing for, which cuts both ways: it confirms there is a real product to verify, and it tells you that the market around it has attracted enough attention to warrant analytical publications in the first place.",
        list: [
          "A Certificate of Analysis from a named third-party laboratory referencing a specific batch number — the single most decisive signal available to a buyer.",
          "A working contact route: an email that replies or a phone that connects, tested before you order rather than after.",
          "Research-use-only labelling throughout, with no marketing implying human, medical or athletic use.",
          "A stated form and purity: lyophilised powder with a quoted purity figure and the analytical method behind it.",
          "Confirmed domain ownership, which is what the TrustScore badge verifies.",
        ],
      },
      {
        title: "How We Verify UK Tesamorelin Suppliers",
        body: "Every supplier in the table above has been checked against the same standard. We fetch their homepage and confirm it resolves, scan secondary pages for shipping, contact and compliance language, and look for a Certificate of Analysis either hosted on-site or linked from a testing laboratory. Suppliers that fail the basics are excluded rather than listed behind a caveat.\n\nThe process is deliberately conservative. We would rather track fewer suppliers honestly than pad a table with storefronts nobody can verify. When a supplier you know of is absent, that is usually the reason: not an editorial judgement, but a simple absence of verifiable signals.\n\nWe also re-run those checks rather than treating verification as a one-off award. A supplier who published batch-linked certificates last quarter but has quietly stopped is a materially different proposition from one who has always published them, and the underlying data is refreshed rather than archived. Because Tesamorelin's price clusters around a narrow band of pack sizes, the differences between suppliers are often documentation and service rather than headline cost — which makes these checks the deciding factor more often than they are on a cheap synthetic peptide.",
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
        body: "Tesamorelin pricing in the UK varies widely between the cheapest and most expensive listings, but the spread is not random. The clearest driver is pack size, and the shape of this market is unusual: the 10mg vial dominates strongly, with 5mg and 20mg presentations forming a second cluster and a small number of larger or multi-vial options at the top. That concentration actually works in your favour, because it means most listings are close to directly comparable — but it also means the per-milligram figure is where the real ranking lives, not the headline price.\n\nVendor overhead is the second factor. A supplier running verified warehousing, commissioned lab testing, printed certificates and responsive support charges for that service. A bare-bones reseller drop-shipping from overseas does not, which is how a listing can appear dramatically cheaper while offering materially less. Because this is a modified 44-residue peptide rather than a short chain, the production cost floor is a larger share of the retail price than it is for a decapeptide, so the gap between a genuine listing and a relabelled one is narrower than a casual price sort would suggest.\n\nStock status matters too, and it is the most commonly overlooked. A listing can show a competitive price and be permanently out of stock, which is why availability is recorded alongside price here rather than assumed. When Tesamorelin is genuinely held in UK inventory, delivery is typically a matter of days. When it is drop-shipped, the quoted window frequently slips and import handling becomes the buyer's problem.\n\nThe practical takeaway is to compare on a per-mg basis at the pack size you actually need, and to treat an unusually low price as a question rather than a bargain. For the compounds Tesamorelin is most often studied alongside in the growth-hormone research area, see the [Ipamorelin comparison hub](/compounds/ipamorelin) and the [CJC-1295 comparison hub](/compounds/cjc-1295).",
      },
    ],
    faq: [
      {
        question: "Where can I buy Tesamorelin in the UK?",
        answer:
          "ViralPeps compares Tesamorelin listings from UK research-chemical suppliers, who sell the lyophilised peptide strictly for laboratory use under research-use-only terms. We list only suppliers whose verification signals — COA, contact, compliance and domain ownership — we can independently confirm, and the live table above shows every one we currently track.",
      },
      {
        question: "Is Tesamorelin legal in the UK?",
        answer:
          "Tesamorelin is an approved medicine in some countries but is not authorised for human use in the UK, and it is a prohibited substance in sport as a growth-hormone-releasing hormone analogue. UK research suppliers list it as a research reagent under research-use-only terms for laboratory and educational purposes. We present this information for reference only and do not supply, recommend or endorse its use.",
      },
      {
        question: "Why is Tesamorelin sold as a research reagent rather than a medicine in the UK?",
        answer:
          "Because it does not hold a UK marketing authorisation. Where a GHRH analogue is licensed elsewhere it is regulated as a medicine; in the UK research market the same molecule is distributed as a research chemical under research-use-only terms. That distinction is why the verification checklist on this page weighs documentation so heavily.",
      },
      {
        question: "Which pack size of Tesamorelin do UK suppliers usually stock?",
        answer:
          "The 10mg vial dominates UK listings, with 5mg and 20mg presentations forming a second cluster and a smaller number of larger or multi-vial options. Because pack sizes are concentrated, cost per milligram is the most useful way to compare two listings — the stat strip at the top of this page shows how many distinct pack sizes we currently track.",
      },
    ],
    sources: [
      { label: "Effects of tesamorelin (TH9507), a growth hormone-releasing factor analog, in HIV-infected patients with excess abdominal fat (J Clin Endocrinol Metab 2010)", url: "https://pubmed.ncbi.nlm.nih.gov/20554713/" },
      { label: "Tesamorelin: a growth hormone-releasing factor analogue for HIV-associated lipodystrophy (Ann Pharmacother 2012)", url: "https://pubmed.ncbi.nlm.nih.gov/22298602/" },
      { label: "Advances in the detection of growth hormone releasing hormone synthetic analogs (Drug Test Anal 2021)", url: "https://pubmed.ncbi.nlm.nih.gov/34665524/" },
      { label: "Analysis of growth hormone releasing hormone and its analogs in urine using nano liquid chromatography coupled to mass spectrometry (J Pharm Biomed Anal 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/41138283/" },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy Tesamorelin UK — Verified Suppliers, Cheapest First",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-tesamorelin-uk",
    title: "Cheapest Tesamorelin UK: Lowest Price Per mg",
    description:
      "Cheapest Tesamorelin UK — the lowest verified price per milligram across every UK research supplier we track, compared at matched pack sizes and updated weekly.",
    h1: "Cheapest Tesamorelin UK",
    focusKeyword: "cheapest tesamorelin uk",
    intro: [
      "Finding the cheapest Tesamorelin UK listing looks like a straightforward price sort, and on this compound that is precisely the trap. Tesamorelin is a synthetic 44-amino-acid GHRH analogue carrying an N-terminal trans-3-hexenoyl modification that protects it from rapid enzymatic degradation, which makes it a materially longer and more complex synthesis than a five- or ten-residue peptide. That complexity sets a real production cost floor. When a listing appears far below the market cluster, the more probable explanation is that it is not what it claims, not that you have found an efficient supplier. This page therefore ranks on price per milligram rather than headline price, and it shows you the documentation signals alongside each figure so the cheapest listing you can actually buy is distinguishable from the cheapest listing that merely exists.",
      "The table below is sorted by cost per milligram across every UK supplier ViralPeps tracks, drawn live from our comparison database and rebuilt weekly. Because pack sizes in this market cluster heavily around 10mg vials, with 5mg and 20mg forming a second band, per-mg is the only figure that makes two listings genuinely comparable — a 5mg vial at £30 and a 10mg vial at £50 tell opposite stories depending on whether you divide them.",
      "A note on why we do not simply sort by price here. On high-volume metabolic peptides, a cheap listing is often a real and useful data point. On a peptide whose genuine article appears on doping-control watchlists and has published analytical detection methods, the cheap end is where misrepresentation concentrates, and we would be doing you a disservice by implying otherwise. The ranking below is transparent about that tension rather than hiding it.",
      "Everything here is presented for laboratory and educational reference. Tesamorelin is not authorised for human use in the UK and is sold as a research reagent for in-vitro work. The [**Tesamorelin hub →**](/compounds/tesamorelin) carries the full research profile and market overview.",
    ],
    sections: [
      {
        title: "Cheapest Tesamorelin UK — How We Calculate Price Per mg",
        body: "Cost per milligram is the price divided by the peptide mass in the vial, and it is the only metric that lets you compare different pack sizes honestly. Our table computes it from the dosage field on each listing, so a 5mg vial at £30 resolves to £6.00/mg while a 10mg vial at £50 resolves to £5.00/mg — a difference a headline price sort completely hides, because the 5mg looks cheaper while costing more per unit of material.\n\nBecause Tesamorelin is sold in a concentrated band of pack sizes, most of the useful comparison happens between suppliers at the same size rather than across sizes. Where a supplier offers a larger pack or a multi-vial option, the per-mg figure will typically be lower, which is the legitimate bulk discount you would expect from any reagent market. The current best verified per-mg figure this week is shown in the stat strip at the top of the page, and it is recalculated on every refresh.\n\nWhere a listing does not state a milligram figure in a parseable way, we show a dash rather than a guess. Rows without a resolvable mass sink to the bottom of the per-mg sort rather than being assigned an invented number — a deliberate choice, because a fabricated per-mg figure is worse than an absent one. Roughly a fifth of the listings we track for Tesamorelin fall into this category, usually because the supplier quotes a price and an image without specifying the vial size in text.",
        table: {
          header: ["Pack", "Price", "Cost per mg"],
          rows: [
            ["5mg vial", "£30.00", "£6.00/mg"],
            ["10mg vial", "£50.00", "£5.00/mg"],
            ["20mg vial", "£90.00", "£4.50/mg"],
            ["40mg pack", "£109.00", "£2.73/mg"],
            ["Unlabelled pack", "£45.00", "—"],
          ],
        },
      },
      {
        title: "Why the Cheapest Listing Is Often Not the Best Buy",
        body: "On a modified 44-residue peptide, the floor price is set by chemistry. Synthesising a correctly folded, correctly modified 44-amino-acid chain, purifying it and verifying it costs real money at every step, and no legitimate supplier can price below that floor indefinitely. A listing that undercuts the rest of the market by a wide margin is therefore making a claim about its material, not about its efficiency.\n\nThe three most common patterns at the cheap end are worth recognising. First, a listing that quotes a price but no purity figure and no analytical method — there is nothing to compare. Second, a listing that borrows the scientific reputation of the licensed pharmaceutical product, or of the clinical trials behind it, without any batch documentation of its own. Third, a listing from a storefront with no verifiable business identity, which is where the TrustScore badge becomes the practical filter.\n\nThe sensible approach is to use the per-mg sort to build a shortlist, then apply the documentation filter before buying. If a listing survives both, the price gap is real. If it only survives the price sort, the saving is theoretical. On Tesamorelin specifically, the spread between genuinely verified suppliers is often modest enough that the documentation-first shortlist and the price-first shortlist overlap substantially — which is the reassuring outcome, because it means you rarely have to choose between the two.",
      },
      {
        title: "Getting the Best Value Without Compromising on Verification",
        body: "There are two legitimate ways to pay less per milligram for Tesamorelin, and neither involves taking a risk on an unverified listing. The first is pack size: the jump from a 5mg vial to a 10mg or 20mg presentation usually reduces the per-mg cost materially, and if your work will consume the material anyway that is a straightforward saving. The second is choosing a supplier on the value side of the verified cluster rather than the top of it — the spread between verified suppliers alone is often wide enough that a careful comparison saves a meaningful percentage.\n\nWhat you should not do is treat a below-floor price as evidence of a better deal. The analytical literature on GHRH analogues exists precisely because this is a category where detection matters: laboratories have published mass-spectrometry and immunopurification methods specifically for growth-hormone-releasing hormone analogues in urine, and reviews have catalogued the advances in detecting them. That body of work is a reminder that this is a category where product identity is worth verifying rather than assuming.\n\nFor the full market rather than just the cheapest rows, the [Tesamorelin price comparison](/compound-guides/tesamorelin-price-comparison-uk) page shows every listing we track. For a trust-first shortlist instead of a price-first one, see the [best Tesamorelin peptide](/compound-guides/best-tesamorelin-peptide) ranking.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest Tesamorelin in the UK?",
        answer:
          "The live table above shows the lowest verified cost per milligram across the UK research suppliers ViralPeps tracks, recomputed weekly from their published pages. We rank on cost per milligram rather than headline price because pack sizes differ, and a 5mg vial can look cheaper than a 10mg vial while costing more per milligram.",
      },
      {
        question: "Is a very cheap Tesamorelin listing a red flag?",
        answer:
          "Often, yes. Tesamorelin is a modified 44-amino-acid peptide, so authentic synthesis carries a real cost floor that a short synthetic peptide does not. A listing priced far below the market cluster without a batch-linked Certificate of Analysis is making an unverifiable claim rather than offering a bargain.",
      },
      {
        question: "Why do you show a dash instead of a per-mg price on some rows?",
        answer:
          "Where a listing does not state a milligram figure in a parseable way, we show a dash rather than estimating. A fabricated per-mg figure would distort the sort and mislead the comparison, so rows without a resolvable mass sink to the bottom instead of being assigned a made-up number.",
      },
      {
        question: "Does buying a larger pack of Tesamorelin reduce the cost per milligram?",
        answer:
          "Usually. Moving from a 5mg vial to a 10mg or 20mg presentation typically carries a lower cost per milligram than the smaller size, which is the ordinary bulk discount you would expect in any reagent market. If your work will consume the material, that is a legitimate way to reduce unit cost without trading away verification.",
      },
    ],
    sources: [
      { label: "Advances in the detection of growth hormone releasing hormone synthetic analogs (Drug Test Anal 2021)", url: "https://pubmed.ncbi.nlm.nih.gov/34665524/" },
      { label: "Analysis of growth hormone releasing hormone and its analogs in urine using nano liquid chromatography coupled to mass spectrometry (J Pharm Biomed Anal 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/41138283/" },
      { label: "Tesamorelin: a growth hormone-releasing factor analogue for HIV-associated lipodystrophy (Ann Pharmacother 2012)", url: "https://pubmed.ncbi.nlm.nih.gov/22298602/" },
      { label: "Efficacy and Safety of Tesamorelin in People Living With HIV With Lipodystrophy: A Systematic Review (J Int Assoc Provid AIDS Care 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42538058/" },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest Tesamorelin UK — Every Listing Sorted by Cost Per mg",
    rowLimit: 25,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "tesamorelin-price-comparison-uk",
    title: "Tesamorelin Price Comparison UK: Full Market",
    description:
      "Tesamorelin price comparison UK — every UK supplier we track in one side-by-side table, with pack size, cost per mg, stock status and live verification signals.",
    h1: "Tesamorelin Price Comparison UK",
    focusKeyword: "tesamorelin price comparison uk",
    intro: [
      "A genuine Tesamorelin price comparison UK table has to do more than list prices, because on this compound the price itself carries information that is easy to misread. Tesamorelin is a synthetic 44-amino-acid analogue of growth hormone-releasing hormone, modified at the N-terminus with a trans-3-hexenoyl group so that it resists the enzymatic cleavage that destroys native GHRH within minutes. Producing that molecule authentically requires a longer and more demanding synthesis than a short peptide, which places a real cost floor under the market and makes an unusually low price a signal to investigate rather than to celebrate. This page shows the entire market side by side so you can see where that floor sits and judge any listing against it.",
      "The table below is the complete set of Tesamorelin listings ViralPeps tracks across UK research suppliers, with pack size, headline price, cost per milligram, verification status, stock and a direct link to each supplier's own product page. It is generated live from our comparison database and rebuilt from suppliers' published pages every week, so the figures move as they move.",
      "Because this is the full-market view rather than a shortlist, it is where the structure of the market becomes visible. You can see the dominant 10mg cluster, the 5mg and 20mg band around it, the occasional larger pack priced in a way that only makes sense when divided by mass, and the documentation column that separates suppliers who publish batch-linked certificates from those who do not. That combination — price shape plus documentation — is what makes this page useful before you have decided which single listing to buy from.",
      "Everything here is presented for laboratory and educational reference. Tesamorelin is not authorised for human use in the UK and is sold by research suppliers under research-use-only terms for in-vitro work. The [**Tesamorelin hub →**](/compounds/tesamorelin) carries the full compound profile.",
    ],
    sections: [
      {
        title: "How to Read a Full-Market Tesamorelin Price Table",
        body: "The first thing a full-market table reveals is the shape of the pricing rather than any single value. Tesamorelin listings cluster heavily around the 10mg vial, with 5mg and 20mg forming a second band, and within each band the spread between the cheapest and most expensive verified supplier is usually modest — often a few tens of percent, not the multiples you see on short synthetic peptides where cheap powder is common. When the spread is unusually wide, the outlier is more likely to be a documentation problem than an efficiency win.\n\nThe second thing it reveals is the cost-per-milligram column. A 5mg presentation at a headline price that looks competitive can resolve to a per-mg figure above a 10mg or 20mg vial, which is the single most common way buyers misread this market. Sorting by per-mg rather than price reorders the table substantially and usually moves the sensible options to the top.\n\nThe third is stock. Availability varies between suppliers on a weekly basis, and a listing that has sat out of stock for months is not a real price whatever it says. We record the in-stock flag from the supplier's own page rather than assuming availability, because on a peptide that carries a meaningful production cost the difference between listed and available matters.",
        table: {
          header: ["Column", "What it tells you"],
          rows: [
            ["Supplier", "Who is selling, with a tick when independently verified"],
            ["Pack", "Vial size — the single biggest driver of headline price"],
            ["Price", "The headline figure, cheapest-first on this page"],
            ["Per mg", "Cost per milligram — the only honest cross-pack comparison"],
            ["Compare", "Direct link to the supplier's own product page"],
          ],
        },
      },
      {
        title: "What the Spread Between Suppliers Actually Reflects",
        body: "On most research peptides, a wide price spread mostly reflects pack size and vendor overhead. On Tesamorelin the picture is slightly different, because the raw-material cost is a larger share of the total. A supplier cannot undercut the synthesis floor without making a claim about their material, so the low outliers in this market are structurally more suspicious than they would be for a synthetic decapeptide.\n\nThat does not mean every expensive listing is good and every cheap one is bad. It means the informative question is not \"who is cheapest\" but \"who can evidence what they sell, and at what price\". A supplier with a batch-linked Certificate of Analysis from a named laboratory at a mid-cluster price is a better buy than a handful of pounds saved on an undocumented listing, and the table is arranged so you can make that judgement rather than being pushed toward a single ranking.\n\nThe clinical literature also shapes how you should read the market. Tesamorelin has been through randomised, double-blind, multicentre trials, and systematic reviews of its efficacy and safety have been published. That research base is genuinely informative about the molecule, but it tells you nothing about the contents of any particular research vial. Separating the compound's reputation from the listing's evidence is the discipline this page is designed to support.\n\nIf you want the market narrowed rather than fully displayed, the [cheapest Tesamorelin](/compound-guides/cheapest-tesamorelin-uk) page gives the unit-cost shortlist and the [best Tesamorelin peptide](/compound-guides/best-tesamorelin-peptide) page gives the trust-first one.",
      },
      {
        title: "Tracking Prices Over Time",
        body: "A single week's table is a snapshot; the useful signal is how it changes. Tesamorelin prices in the UK do move, and they move for legible reasons: batch availability from the upstream manufacturer, exchange-rate effects on imported material, and the ordinary cycle of a supplier restocking and then running down inventory. Watching the same suppliers across several weeks is therefore more informative than a one-off comparison, which is why we refresh this data on a weekly cycle rather than publishing a static list.\n\nWe do not attempt to publish a price history chart for this compound, because the market is concentrated enough that a single supplier changing a single listing would visibly distort one. Instead, the table always reflects the most recent crawl, and the live indicator on the table header tells you when that was. If a figure looks out of line with what you saw last month, checking the supplier's own page directly is the right next step — the link is in every row.\n\nFor the wider market context in which Tesamorelin sits, the [CJC-1295 comparison hub](/compounds/cjc-1295) and the [Ipamorelin comparison hub](/compounds/ipamorelin) cover the secretagogue side of the same research area, and both follow the same weekly refresh discipline. Tesamorelin is most often compared against those two compounds because all three act on the growth-hormone axis through related but distinct mechanisms.",
      },
    ],
    faq: [
      {
        question: "How many UK suppliers stock Tesamorelin?",
        answer:
          "The live table above shows every UK supplier ViralPeps currently tracks for Tesamorelin, and the stat strip at the top of the page gives the exact count. It is a substantial pool, but a smaller one than high-volume compounds like BPC-157, because Tesamorelin is a longer modified peptide with a higher synthesis cost barrier.",
      },
      {
        question: "Why is the price per mg different between a 5mg vial and a 10mg vial?",
        answer:
          "Because cost per milligram is the price divided by mass. A 5mg vial contains half the peptide a 10mg vial does, so at a comparable headline price its cost per milligram is higher. That is why we sort on per-mg rather than headline price — it is the only figure that makes different pack sizes comparable.",
      },
      {
        question: "How often is this comparison table updated?",
        answer:
          "Weekly. We crawl suppliers' published product pages and rebuild the table on a seven-day cycle, so the figures reflect their most recent state. The live indicator on the table header shows that the data is on the current refresh, and every row links to the supplier's own page if you want to confirm a figure directly.",
      },
      {
        question: "Should I buy from the cheapest supplier in the table?",
        answer:
          "Not on price alone. Tesamorelin has a real synthesis cost floor, so a listing far below the market cluster is making a claim about its material rather than offering a deal. Build a shortlist from the per-mg sort, then apply the documentation filter — a batch-linked Certificate of Analysis from a named laboratory — before buying.",
      },
    ],
    sources: [
      { label: "Effects of tesamorelin on non-alcoholic fatty liver disease in HIV: a randomised, double-blind, multicentre trial (Lancet HIV 2019)", url: "https://pubmed.ncbi.nlm.nih.gov/31611038/" },
      { label: "Efficacy and safety of tesamorelin in people with HIV on integrase inhibitors (AIDS 2024)", url: "https://pubmed.ncbi.nlm.nih.gov/38905488/" },
      { label: "Population pharmacokinetic analysis of tesamorelin in HIV-infected patients and healthy subjects (Clin Pharmacokinet 2015)", url: "https://pubmed.ncbi.nlm.nih.gov/25358450/" },
      { label: "Tesamorelin: a growth hormone-releasing factor analogue for HIV-associated lipodystrophy (Ann Pharmacother 2012)", url: "https://pubmed.ncbi.nlm.nih.gov/22298602/" },
    ],
    tableMode: "full",
    tableHeading: "Tesamorelin Price Comparison UK — Every Tracked Listing",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-tesamorelin-online-uk",
    title: "Buy Tesamorelin Online UK: Ordering Guide",
    description:
      "Buy Tesamorelin online UK — how UK research suppliers handle ordering, payment, dispatch and delivery, plus exactly what to confirm before you place your order.",
    h1: "Buy Tesamorelin Online UK",
    focusKeyword: "buy tesamorelin online uk",
    intro: [
      "If you are about to buy Tesamorelin online UK suppliers are the practical place to look, but the ordering process on a modified GHRH analogue has details that do not apply to every research peptide, and they are worth knowing before you pay rather than after. Tesamorelin is a synthetic 44-amino-acid analogue of growth hormone-releasing hormone, stabilised by an N-terminal trans-3-hexenoyl modification that resists rapid enzymatic cleavage. Because it is a longer chain than the typical research decapeptide, and because its genuine article is a molecule that doping-control laboratories specifically test for, the identity of what you receive matters as much as the price you paid.",
      "This page walks through what actually happens when you order Tesamorelin from a UK research supplier: how ordering and payment typically work, what a supplier should tell you before you commit, how dispatch and delivery differ between suppliers holding UK stock and those drop-shipping, and what arrives in the parcel. It also sets out the checks worth making in the five minutes before you place an order, which is where most avoidable problems are caught.",
      "The live price table below lets you compare the suppliers this guide refers to, with pack size, cost per milligram and a direct link to each supplier's own product page. It is rebuilt weekly from suppliers' published pages so the ordering details it links to are current.",
      "Everything here is presented for laboratory and educational reference. Tesamorelin is not authorised for human use in the UK, is a prohibited substance in sport, and research suppliers sell it under research-use-only terms for in-vitro work. The [**Tesamorelin hub →**](/compounds/tesamorelin) carries the full compound profile.",
    ],
    sections: [
      {
        title: "How Ordering Tesamorelin Online Actually Works",
        body: "The mechanics are ordinary: you select a pack size on the supplier's product page, add it to a basket, and check out. What differs from a mainstream retailer is the surrounding context. Research-reagent suppliers usually require you to acknowledge research-use-only terms, often at checkout, and reputable ones will not market the product for any human application. This matters more on Tesamorelin than on most compounds, because the molecule is a licensed medicine in some jurisdictions — so a storefront that borrows clinical language and implies a human use is crossing a line that a compliant supplier does not. If a listing suggests an application beyond laboratory work, treat it as a compliance signal and weigh everything else on the site accordingly.\n\nPayment is typically card or bank transfer, with some suppliers offering cryptocurrency. Card payment has an obvious advantage: it gives you a chargeback route if the order does not arrive or does not match. Bank transfer offers no such protection and is a favourite of the storefronts that disappear, so the payment method a supplier insists on is itself a signal worth weighing. Where a supplier offers both, there is usually no reason to choose the less protected option.\n\nOrder confirmation should tell you three things: a batch or lot reference, a dispatch estimate, and a tracking number once the parcel moves. A supplier who provides a batch reference at the point of order is one who can tie your purchase back to a Certificate of Analysis, which is the whole point of buying from a documented source in the first place.",
        list: [
          "Research-use-only acknowledgement at checkout — normal and expected for this category.",
          "Card payment where available, because it preserves a chargeback route.",
          "A batch or lot reference on the order confirmation, tying your purchase to a COA.",
          "A stated dispatch estimate before you pay, not after you chase.",
          "Tracking provided when the parcel moves, not on request.",
        ],
      },
      {
        title: "Dispatch, Delivery and Handling Expectations",
        body: "Tesamorelin is supplied as a lyophilised powder, and in that form it is more stable than a reconstituted solution — but it is still a peptide with a defined storage profile, and reputable suppliers treat it accordingly. What you should expect from a supplier holding UK stock is dispatch within a day or two, tracked delivery within a few days, and packaging that protects the vial: a sealed pouch or padded container rather than a bare vial in an envelope.\n\nDrop-shipped listings behave differently. The dispatch estimate becomes an estimate in the loosest sense, delivery windows slip, and if the parcel crosses a border the buyer inherits the import handling. On a compound with a genuine synthesis floor and analytical detection methods published for GHRH analogues, a long and uncertain supply chain is an additional risk layer on top of the ordinary ones. The single most useful question to ask before ordering is whether the supplier holds the stock in the UK; the second is what they quote for dispatch.\n\nTemperature during transit matters less for lyophilised powder than for a reconstituted solution, but it is not irrelevant, and a supplier who says nothing about storage conditions at all is telling you something. The published pharmacokinetic work on Tesamorelin modelled its behaviour after administration and confirms it is a peptide whose stability depends on handling; the ordinary practice of keeping lyophilised material cold and dry is the safe default.",
        table: {
          header: ["Ordering factor", "What good looks like"],
          rows: [
            ["Payment method", "Card offered, chargeback route preserved"],
            ["Order confirmation", "Batch/lot reference plus dispatch estimate"],
            ["Dispatch window", "Stated and short — days, not weeks"],
            ["Packaging", "Sealed pouch or padded container, vial protected"],
            ["Tracking", "Provided automatically when the parcel moves"],
          ],
        },
      },
      {
        title: "Five Checks Before You Place the Order",
        body: "The five minutes before checkout are where most avoidable problems are caught, and Tesamorelin's position as both a licensed medicine elsewhere and a research reagent in the UK makes the checks slightly more important than average.\n\nFirst, confirm the listing states a vial mass explicitly — 5mg, 10mg, 20mg or larger. A listing that shows only a price without a size gives you nothing to compare. Second, look for a Certificate of Analysis that names the laboratory and references a batch; a generic purity claim with no document is not a substitute. Third, test the contact route before you need it — send one question and see whether a human replies within a working day. Fourth, check the payment options and prefer the one that preserves a chargeback route. Fifth, confirm the supplier holds UK stock, because that is what separates a predictable delivery from a speculative one.\n\nNone of these checks requires technical knowledge of the molecule. They are ordinary due-diligence steps that a genuine supplier will pass without effort, and that an opportunistic listing will struggle with. If a listing fails two or more of them, the price advantage it is offering is not worth the risk you are carrying.\n\nTo compare the suppliers this guide refers to, see the [Tesamorelin price comparison](/compound-guides/tesamorelin-price-comparison-uk) page for the full market, or the [Tesamorelin UK supplier](/compound-guides/tesamorelin-uk-supplier) guide for a stock-focused view.",
        list: [
          "Vial mass stated explicitly in the listing, not only a price.",
          "A Certificate of Analysis naming the laboratory and a batch number.",
          "A contact route you have tested and that replied.",
          "A payment method that preserves your chargeback right.",
          "Confirmed UK stock rather than an overseas drop-ship.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I buy Tesamorelin online in the UK?",
        answer:
          "Yes — Tesamorelin is listed by UK research-chemical suppliers, who sell the lyophilised peptide strictly for laboratory use under research-use-only terms. ViralPeps does not sell peptides; we compare listings so you can check price, pack size and supplier verification before choosing where to buy.",
      },
      {
        question: "What should arrive when I order Tesamorelin?",
        answer:
          "A sealed vial of lyophilised powder, packaged to protect the glass, with an order confirmation carrying a batch or lot reference. Reputable suppliers also dispatch with tracking and provide a Certificate of Analysis linked to the batch. If any of those is missing, ask the supplier directly before assuming it is normal.",
      },
      {
        question: "Is card or bank transfer better when buying Tesamorelin?",
        answer:
          "Card payment is generally preferable because it preserves a chargeback route if the order does not arrive or does not match the listing. Bank transfer offers no such protection, so where a supplier offers both there is usually no reason to choose the less protected option.",
      },
      {
        question: "How long does Tesamorelin delivery take in the UK?",
        answer:
          "From a supplier holding UK stock, dispatch is typically within a day or two and tracked delivery follows within a few days. Drop-shipped listings behave less predictably, with longer and more variable windows, which is why confirming that a supplier holds stock in the UK is the single most useful question to ask before ordering.",
      },
    ],
    sources: [
      { label: "Population pharmacokinetic analysis of tesamorelin in HIV-infected patients and healthy subjects (Clin Pharmacokinet 2015)", url: "https://pubmed.ncbi.nlm.nih.gov/25358450/" },
      { label: "Population pharmacokinetic and pharmacodynamic analysis of tesamorelin in HIV-infected patients and healthy subjects (J Pharmacokinet Pharmacodyn 2015)", url: "https://pubmed.ncbi.nlm.nih.gov/25895899/" },
      { label: "Analysis of growth hormone releasing hormone and its analogs in urine using nano liquid chromatography coupled to mass spectrometry (J Pharm Biomed Anal 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/41138283/" },
      { label: "Tesamorelin: a growth hormone-releasing factor analogue for HIV-associated lipodystrophy (Ann Pharmacother 2012)", url: "https://pubmed.ncbi.nlm.nih.gov/22298602/" },
    ],
    tableMode: "price",
    tableHeading: "Buy Tesamorelin Online UK — Suppliers You Can Order From",
    rowLimit: 25,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "tesamorelin-uk-supplier",
    title: "Tesamorelin UK Supplier: Who Stocks It & How to Verify",
    description:
      "Tesamorelin UK supplier guide — who stocks Tesamorelin in the UK, how to verify a listing, and the signals that separate the genuine stockists from resellers.",
    h1: "Tesamorelin UK Supplier",
    focusKeyword: "tesamorelin uk supplier",
    intro: [
      "Looking for a Tesamorelin UK supplier means more than finding a site that lists the molecule, because this is a compound where the gap between a genuine supplier and an opportunistic reseller is wider than average. Tesamorelin is a synthetic 44-amino-acid growth hormone-releasing hormone analogue with an N-terminal trans-3-hexenoyl modification that makes it resistant to rapid enzymatic cleavage. It is an approved medicine in some markets and a research reagent in the UK, which means the clinical reputation of the licensed product is freely available for any listing to borrow — while the evidence that matters, a batch-linked Certificate of Analysis tied to the material in the vial, is not.",
      "This page is about supplier identity rather than price. It sets out what actually distinguishes a UK supplier from a reseller, how we verify stockists, and the specific signals that separate a documented listing from one that merely uses the right vocabulary. The live table below shows every Tesamorelin stockist ViralPeps tracks, with their verification status, TrustScore and a direct link to their own product page.",
      "The distinction matters because Tesamorelin is a prohibited substance in sport and analytical methods exist specifically to detect GHRH analogues in biological samples. That is not a reason to distrust the market; it is a reason to verify precisely who you are buying from, because the genuine article is a molecule that laboratories have been built to test for, and the market around such molecules tends to attract more than its share of mislabelled material.",
      "Everything here is presented for laboratory and educational reference. Tesamorelin is not authorised for human use in the UK, and research suppliers sell it under research-use-only terms intended for in-vitro work. The [**Tesamorelin hub →**](/compounds/tesamorelin) carries the full compound profile.",
    ],
    sections: [
      {
        title: "What Separates a UK Supplier From a Reseller",
        body: "The clearest structural difference is stock. A UK supplier holds Tesamorelin in domestic inventory, dispatches it themselves, and can tell you a batch reference at the point of order. A reseller takes your money and passes the order to someone else, often overseas, which stretches the delivery window, removes the supplier's control over packaging and handling, and inserts an additional party between you and any problem. Both may list the same price; only one of them can answer a question about the specific vial you received.\n\nThe second difference is documentation provenance. A genuine supplier holds the Certificates of Analysis for the batches they stock, and can give you the document for the batch number on your order. A reseller typically reposts a generic certificate or a manufacturer's illustration that references a different batch, if it references one at all. The test is simple: ask for the COA that corresponds to your batch number. A supplier who can produce it immediately is holding their own stock; one who deflects is not.\n\nThe third is identity continuity. A supplier with a track record, a registered business, and a stable domain has something to lose. A storefront that appears, sells a low-cost listing for a few months and disappears has nothing to lose, which is why the TrustScore badge — which verifies that a supplier controls the domain they sell from — is a practical filter rather than a decorative one.",
        table: {
          header: ["Signal", "Genuine UK supplier", "Reseller"],
          rows: [
            ["Stock location", "UK inventory, self-dispatched", "Overseas, drop-shipped"],
            ["COA for your batch", "Provided on request", "Generic or absent"],
            ["Contact quality", "Named person, replies", "Form-only, slow or silent"],
            ["Domain continuity", "Stable, verifiable identity", "New or disposable storefront"],
            ["Packaging", "Supplier-controlled", "Whatever the third party uses"],
          ],
        },
      },
      {
        title: "How ViralPeps Verifies Tesamorelin Stockists",
        body: "Our audit turns a set of observable facts into a score. We load the supplier's homepage and record whether it responds. We walk the secondary pages and note what they say about dispatch, returns and who is behind the business. We look for a batch-linked Certificate of Analysis, either hosted on the site or reachable from a testing laboratory's domain. Those observations are then combined into the TrustScore you see in the table — a number derived from stated criteria, not a star rating we hand out on instinct.\n\nThe scope is deliberately narrow, and deliberately unequal across compounds. For Tesamorelin we would rather name eight stockists we can evidence than twenty we cannot, which is why the table is shorter than a raw market scan would produce. A missing supplier is almost always a missing signal — an unreachable certificate, an unanswered enquiry — rather than a view about their pricing.\n\nVerification is also a moving state, not a past achievement. Documentation that existed last quarter and has since lapsed counts as lapsed. Because Tesamorelin's scientific literature is extensive and trivially easy to quote, the vocabulary of credibility costs a listing nothing; a traceable batch record is the one asset that has to be earned, and it is what we refresh against on every cycle.",
      },
      {
        title: "The Checks That Matter Most on This Compound",
        body: "Three checks carry more weight on Tesamorelin than they would on a cheap synthetic peptide.\n\nThe first is batch-level traceability. Ask for the Certificate of Analysis that matches your batch number, not a certificate in general. On a 44-residue modified peptide, the analytical work is more involved than on a short chain, so a supplier who genuinely commissions it will have a document with a laboratory name, a method and a batch reference — and will produce it without hesitation.\n\nThe second is contact responsiveness, tested before you commit. Send one specific question and observe whether a human answers. This single test separates most genuine stockists from most resellers, and it costs nothing but a day.\n\nThe third is delivery reality. Confirm the supplier holds UK stock and ask what they quote for dispatch. A supplier who answers plainly is one you can hold to that answer; a supplier who avoids the question is telling you the delivery will be as uncertain as the answer.\n\nFor a price-led view of the same market, see the [cheapest Tesamorelin](/compound-guides/cheapest-tesamorelin-uk) page or the full [Tesamorelin price comparison](/compound-guides/tesamorelin-price-comparison-uk). For an ordering-focused walkthrough, the [buy Tesamorelin online UK](/compound-guides/buy-tesamorelin-online-uk) guide covers payment, dispatch and what to expect in the parcel.",
        list: [
          "Ask for the COA matching your specific batch number, and note whether it is produced promptly.",
          "Test the contact route with one question before ordering, not after a problem appears.",
          "Confirm UK stock and a stated dispatch window in writing before you pay.",
          "Check that the domain is stable and the business identity is verifiable.",
          "Treat any human-use implication in the marketing as a compliance red flag.",
        ],
      },
    ],
    faq: [
      {
        question: "Who stocks Tesamorelin in the UK?",
        answer:
          "UK research-chemical suppliers list Tesamorelin as a research reagent sold under research-use-only terms. ViralPeps tracks the stockists whose verification signals we can independently confirm, and the live table above shows every one of them with their TrustScore and a link to their own product page.",
      },
      {
        question: "How do I check a Tesamorelin supplier is genuine?",
        answer:
          "Three tests do most of the work. Ask for the Certificate of Analysis that matches your specific batch number and see whether it is produced promptly. Send one question through the contact route before ordering and see whether a human replies. And confirm the supplier holds UK stock with a stated dispatch window rather than drop-shipping from overseas.",
      },
      {
        question: "What is the TrustScore badge on a supplier listing?",
        answer:
          "It reflects a set of verification signals — the storefront being live, an accessible Certificate of Analysis, research-use-only labelling, a working contact route and confirmed domain ownership. Because it verifies that a supplier controls the domain they sell from, it filters out disposable storefronts that appear briefly and disappear without accountability.",
      },
      {
        question: "Why are some well-known peptide vendors absent from your Tesamorelin table?",
        answer:
          "Absence usually means a verifiable signal was missing rather than an editorial judgement — no accessible Certificate of Analysis, no working contact route, or no confirmed UK stock. We re-run the checks periodically, so a supplier who adds documentation can be listed in a later refresh.",
      },
    ],
    sources: [
      { label: "Analysis of growth hormone releasing hormone and its analogs in urine using nano liquid chromatography coupled to mass spectrometry (J Pharm Biomed Anal 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/41138283/" },
      { label: "Advances in the detection of growth hormone releasing hormone synthetic analogs (Drug Test Anal 2021)", url: "https://pubmed.ncbi.nlm.nih.gov/34665524/" },
      { label: "An antibody-free, ultrafiltration-based assay for the detection of growth hormone-releasing hormones in urine (J Pharm Biomed Anal 2022)", url: "https://pubmed.ncbi.nlm.nih.gov/35298973/" },
      { label: "Comparison of magnetic bead surface functionalities for the immunopurification of growth hormone-releasing hormones (J Chromatogr A 2020)", url: "https://pubmed.ncbi.nlm.nih.gov/32971474/" },
    ],
    tableMode: "trust",
    tableHeading: "Tesamorelin UK Supplier — Verified Stockists Ranked by TrustScore",
    rowLimit: 25,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-tesamorelin-peptide",
    title: "Best Tesamorelin Peptide UK: TrustScore Ranking",
    description:
      "Best Tesamorelin peptide — ranked by independent TrustScore, purity verification and live price per mg across every UK supplier we track, updated weekly here.",
    h1: "Best Tesamorelin Peptide",
    focusKeyword: "best tesamorelin peptide",
    intro: [
      "Deciding on the best Tesamorelin peptide means deciding what \"best\" should measure, and this page is explicit about the choice. Tesamorelin is a synthetic 44-amino-acid growth hormone-releasing hormone analogue, modified at the N-terminus with a trans-3-hexenoyl group that resists rapid enzymatic cleavage, and it is an approved medicine in some markets while being a research reagent in the UK. That dual identity means every listing can cite the same clinical literature, so compound reputation cannot distinguish between them. What can distinguish them is documentation, domain accountability and stock reliability — which is exactly what this ranking weights most heavily.",
      "The table below ranks every UK Tesamorelin supplier ViralPeps tracks by a composite of verification signals, with cost per milligram shown alongside so you can see the trade-off rather than having it hidden from you. Verified suppliers who publish batch-linked certificates and maintain a working contact route sit at the top; unverified listings sit below regardless of how competitive their headline price looks. It is generated live from our comparison database and refreshed weekly.",
      "If you want the reasoning behind the ranking rather than just the ordering, the sections below explain what each signal measures and why it carries the weight it does on this particular compound. If you would rather start from cost, the [cheapest Tesamorelin](/compound-guides/cheapest-tesamorelin-uk) page gives the per-milligram shortlist instead.",
      "Everything here is presented for laboratory and educational reference. Tesamorelin is not authorised for human use in the UK, is a prohibited substance in sport, and research suppliers sell it under research-use-only terms for in-vitro work. The [**Tesamorelin hub →**](/compounds/tesamorelin) carries the full compound profile.",
    ],
    sections: [
      {
        title: "How the Best Tesamorelin Peptide Ranking Is Built",
        body: "The ranking is a composite, not a single metric, because no single number answers the question honestly. We weight four things. Documentation comes first: does the supplier publish or supply a Certificate of Analysis from a named laboratory, referencing a specific batch? Domain accountability comes second, captured by the TrustScore signal that confirms a supplier controls the domain they sell from. Contact quality comes third — a working, responsive route that survives a test enquiry. Price per milligram comes fourth, and it is deliberately last, because on this compound the cheap end is where misrepresentation concentrates.\n\nThat ordering is a deliberate editorial choice, and it produces a different top of the table than a pure price sort would. It is possible that a listing offering a lower per-mg figure sits below a more expensive verified supplier in this ranking. That is the ranking working as intended: it is answering \"which is best\" as \"which is most verifiable at a fair price\", not \"which is cheapest\".\n\nThe evidence base behind the compound supports taking documentation seriously. Tesamorelin has been evaluated in randomised, double-blind, multicentre trials, and systematic reviews of its efficacy and safety have been published. That literature is real and easy to cite — which is precisely why it cannot discriminate between listings, and why the ranking leans on signals that a listing cannot borrow.",
        table: {
          header: ["Signal", "Weight", "Why"],
          rows: [
            ["Batch-linked COA", "Highest", "Cannot be borrowed; proves traceable testing"],
            ["Domain accountability", "High", "Filters disposable storefronts"],
            ["Contact quality", "High", "Predicts whether problems get resolved"],
            ["Price per mg", "Supporting", "Matters, but not at the cost of verification"],
          ],
        },
      },
      {
        title: "The Difference Between Cheapest and Best on This Compound",
        body: "On a cheap synthetic decapeptide, cheapest and best frequently coincide — a low price often simply reflects a lean operation selling a commodity. Tesamorelin is not that compound. It is a 44-residue modified peptide whose authentic synthesis carries a real cost floor, and its genuine article is a GHRH analogue that analytical laboratories have specifically published detection methods for. When those two facts are combined, an unusually low listing is more likely to be making a claim about its material than to be offering genuine efficiency.\n\nThat does not mean expensive is good. The verified cluster of UK suppliers spans a meaningful price range, and within it, choosing on the value side is sensible and saves real money. What it means is that the useful comparison happens inside the verified cluster, not across the whole table. A listing outside that cluster has not earned its price comparison, because there is no evidence it is selling the same thing.\n\nThe practical approach is to filter on documentation first, then compare per-mg within the survivors. If you do that on this market, you will typically find that the resulting shortlist is only a little more expensive per milligram than the raw cheapest listing — which makes the decision easy rather than agonising.\n\nFor the supplier-identity view behind this ranking, see the [Tesamorelin UK supplier](/compound-guides/tesamorelin-uk-supplier) guide. For the ordering mechanics, the [buy Tesamorelin online UK](/compound-guides/buy-tesamorelin-online-uk) walkthrough covers payment, dispatch and delivery expectations.",
      },
      {
        title: "Reading the Table Critically",
        body: "A ranking is only useful if you understand what it is not saying. This table does not tell you which supplier has the best customer service, because we cannot measure that at scale. It does not tell you which listing is most likely to be in stock next month, because stock is a weekly variable recorded as a flag rather than predicted. And it does not tell you whether any particular vial is what it claims, because only a Certificate of Analysis tied to a batch number can do that.\n\nWhat it does tell you is which suppliers have demonstrated the signals that correlate with being a real, accountable business selling a documented product. That is a filter, not a guarantee, and treating it as the start of your diligence rather than the end of it is the right way to use it.\n\nWe refresh the ranking weekly along with the underlying price data, so a supplier who adds documentation can rise and one who lets it lapse can fall. The stat strip at the top of the page shows the current best per-mg figure and the top TrustScore in the market, which together give you the two ends of the trade-off this ranking is designed to navigate.",
        list: [
          "The ranking filters on accountability; it does not certify the contents of any vial.",
          "Price per mg is a supporting signal, not the primary one, on this compound.",
          "The verified cluster's price range is where the real comparison happens.",
          "Stock and service are recorded facts, not predictions.",
          "A batch-linked Certificate of Analysis is the only thing that verifies a specific listing.",
        ],
      },
    ],
    faq: [
      {
        question: "What makes the best Tesamorelin peptide?",
        answer:
          "Documentation first, then domain accountability, contact quality and price per milligram. Tesamorelin's clinical reputation is available to every listing for free, so the signals that actually distinguish suppliers are a batch-linked Certificate of Analysis from a named laboratory, confirmed domain ownership and a contact route that replies — none of which can be borrowed.",
      },
      {
        question: "Is the best Tesamorelin peptide also the cheapest?",
        answer:
          "Not necessarily, and on this compound that is the point. Tesamorelin is a modified 44-amino-acid peptide with a real synthesis cost floor, so an unusually cheap listing is more likely to be making a claim about its material than offering an efficiency. The sensible comparison happens inside the verified cluster rather than across the whole table.",
      },
      {
        question: "How often is this ranking updated?",
        answer:
          "Weekly, along with the underlying price data. We re-run the verification checks periodically rather than treating them as a one-off award, so a supplier who adds documentation can rise in the ranking and one who lets it lapse can fall. The stat strip at the top of the page shows the current top TrustScore.",
      },
      {
        question: "Does a high TrustScore guarantee the product is genuine?",
        answer:
          "No. It is a filter, not a guarantee. A high score means a supplier has demonstrated the signals that correlate with being a real, accountable business — a live storefront, accessible documentation, research-use-only labelling and a working contact route. Only a Certificate of Analysis tied to your specific batch number can speak to the contents of a particular vial.",
      },
    ],
    sources: [
      { label: "Effects of Tesamorelin on Neurocognitive Impairment in Persons With HIV and Abdominal Obesity (J Infect Dis 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39813152/" },
      { label: "Effects of growth hormone-releasing hormone on cognitive function in adults with mild cognitive impairment and healthy older adults (Arch Neurol 2012)", url: "https://pubmed.ncbi.nlm.nih.gov/22869065/" },
      { label: "The Growth Hormone Releasing Hormone Analogue, Tesamorelin, Decreases Muscle Fat and Increases Muscle Area in Adults with HIV (J Frailty Aging 2019)", url: "https://pubmed.ncbi.nlm.nih.gov/31237318/" },
      { label: "Body composition, hepatic fat, metabolic, and safety outcomes of Tesamorelin, a GHRH analogue, in HIV-associated lipodystrophy (Obes Res Clin Pract 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/41545261/" },
    ],
    tableMode: "trust",
    tableHeading: "Best Tesamorelin Peptide — Verified UK Suppliers Ranked by TrustScore",
    rowLimit: 25,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
