/**
 * NAD+ silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/nad-plus-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — autocomplete evidence pulled live from Google UK (2026-10-17):
 *   1. where to buy nad+ uk        → exact #1 (`where to buy nad+ uk`); also `buy nad+ peptide uk` #1
 *   2. cheapest nad+ uk            → exact #1 (`cheapest nad+ uk`); also `cheapest nad+ peptide`
 *   3. nad+ price comparison uk    → 0 for the strict form → substituted `nad+ price uk` (exact #1) + `nad cost uk`
 *   4. buy nad+ online uk          → real UK hits (`buy nad online uk`, `buy nad+ injections online uk`, `buy nad+ peptide uk` #1)
 *   5. nad+ uk supplier            → 0 → substituted `nad+ uk stockists` (exact #1) / `nad supplier uk` (#1)
 *   6. best nad+ peptide           → exact #1 (`best nad+ peptide`)
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
    slug: "where-to-buy-nad-plus-uk",
    title: "Where to Buy NAD+ UK: Verified Suppliers",
    description:
      "Where to buy NAD+ UK — compare live prices from verified UK research suppliers, then check the Certificate of Analysis, pack size and stock before you order.",
    h1: "Where to Buy NAD+ UK",
    focusKeyword: "where to buy nad+ uk",
    intro: [
      "Searching for where to buy NAD+ UK leads you into a category that is genuinely different from the peptide market around it, and the difference is worth understanding before you spend anything. NAD+, or nicotinamide adenine dinucleotide, is not a synthetic peptide at all — it is a dinucleotide coenzyme built from two nucleotides joined by a pyrophosphate bond, and it sits at the centre of cellular redox chemistry. Every living cell uses it, which is precisely why it behaves unlike a research decapeptide in both how it is sold and what you should look for when you buy it.",
      "This page answers the availability question with evidence rather than adjectives: a live table of every UK supplier ViralPeps tracks for NAD+, showing pack size, headline price, cost per milligram, stock status and a direct link to the supplier's own product page. Figures are rebuilt from suppliers' published pages on a weekly cycle, so what you see reflects their most recent state rather than a snapshot taken months ago.",
      "The supplier landscape here is unusually wide, and that width is itself informative. NAD+ is sold in a range of presentations — 500mg vials dominate, with 1000mg and smaller 100mg or 250mg options forming a second band, and a handful of pen and multi-vial formats at the edges. Because it is a naturally occurring coenzyme rather than a patented synthetic analogue, the ingredient is more widely traded, which means the low end of the market is populated by everything from bulk supplement suppliers to research-reagent storefronts. The listing quality varies accordingly, and so does the documentation.",
      "Everything on this page is presented for laboratory and educational reference. NAD+ sold by research suppliers is supplied under research-use-only terms intended for in-vitro work, and it is not presented here as a therapeutic product. If you are auditing the market rather than buying today, start with the [**NAD+ comparison hub →**](/compounds/nad-plus).",
    ],
    sections: [
      {
        title: "Where to Buy NAD+ UK — What Actually Matters",
        body: "The phrase \"where to buy\" hides a more useful question: which supplier can you actually verify? NAD+ is exposed on this front for a specific reason. It is a molecule with an enormous consumer-facing reputation — it appears in longevity journalism, supplement marketing and wellness clinics — and that reputation is freely available for any storefront to borrow. A listing that leans on the general enthusiasm around NAD+ without publishing a batch-linked Certificate of Analysis is doing exactly that, and the borrowing is invisible unless you look for the document.\n\nWhen we audit UK suppliers we apply an identical checklist every time. A Certificate of Analysis from a named laboratory referencing a specific batch. A contact route that genuinely replies to a question. Unambiguous research-use-only labelling. A registered business identity behind the storefront. And confirmed control of the domain they sell from, which is why the TrustScore badge exists: a supplier who installs it on their own site is proving they control that domain, ruling out the throwaway storefronts that characterise the lower end of this market.\n\nFor a dinucleotide there is one further check that matters more than it does for a short synthetic peptide: chemical identity. NAD+ is not a single-chain molecule you can verify by mass alone, and it has a closely related reduced form, NADH, that is a genuinely different reagent with different handling requirements. A supplier who cannot state which form they are shipping, at what purity, verified how, is one whose listing you cannot compare against anything — including its own previous batch.",
        list: [
          "A Certificate of Analysis from a named third-party laboratory referencing a specific batch number — the single most decisive signal available to a buyer.",
          "An explicit statement of which redox form is supplied (NAD+, and the purity figure that goes with it).",
          "A working contact route: an email that replies or a phone that connects, tested before you order rather than after.",
          "Research-use-only labelling throughout, with no marketing implying human, medical or therapeutic use.",
          "Confirmed domain ownership, which is what the TrustScore badge verifies.",
        ],
      },
      {
        title: "How We Verify UK NAD+ Suppliers",
        body: "Every supplier in the table above has been checked against the same standard. We fetch their homepage and confirm it resolves, scan secondary pages for shipping, contact and compliance language, and look for a Certificate of Analysis either hosted on-site or linked from a testing laboratory. Suppliers that fail the basics are excluded rather than listed behind a caveat.\n\nThe process is deliberately conservative. We would rather track fewer suppliers honestly than pad a table with storefronts nobody can verify. When a supplier you know of is absent, that is usually the reason: not an editorial judgement, but a simple absence of verifiable signals.\n\nWe also re-run those checks rather than treating verification as a one-off award. A supplier who published batch-linked certificates last quarter but has quietly stopped is a materially different proposition from one who has always published them, and the underlying data is refreshed rather than archived. Because NAD+ is a widely traded commodity molecule, the pool of sellers is larger than for most peptides and the documentation quality is more variable, which makes these checks the deciding factor more often than they are on a niche research compound.",
        table: {
          header: ["Signal", "Why it matters"],
          rows: [
            ["Named-lab COA with batch number", "Proves the material was independently tested and traceable"],
            ["Redox form stated", "NAD+ and NADH are different reagents with different handling"],
            ["Working contact route", "A supplier you can reach is one you can resolve a problem with"],
            ["Full RUO labelling", "Shows compliance awareness; the research-only framing is what we track"],
            ["Domain ownership confirmed", "Rules out throwaway storefronts built to disappear"],
          ],
        },
      },
      {
        title: "What Affects the Price You Pay in the UK",
        body: "NAD+ pricing in the UK varies widely between the cheapest and most expensive listings, and the spread is wider than on most research peptides. The clearest driver is pack size and the shape of this market: 500mg presentations dominate, with 1000mg and a scatter of 100mg to 250mg options alongside, plus a handful of pen and multi-vial formats. Because the molecule is a bulk-tradeable coenzyme rather than a bespoke synthesis, the raw-material cost per gram is lower than for a 44-residue peptide, which means vendor overhead and presentation format move the headline price more than the chemistry does.\n\nVendor overhead is the second factor, and it cuts both ways here. A supplier running verified warehousing, commissioned lab testing, printed certificates and responsive support charges for that service. A bulk supplement reseller charging by the gram does not, which is how a listing can appear dramatically cheaper while offering a materially different grade of material — one that may be food-grade or cosmetic-grade rather than a characterised research reagent. The gap in price is often the gap in specification, not a discount.\n\nStock status matters too, and it is the most commonly overlooked. A listing can show a competitive price and be permanently out of stock, which is why availability is recorded alongside price here rather than assumed. When NAD+ is genuinely held in UK inventory, delivery is typically a matter of days. When it is drop-shipped, the quoted window frequently slips and import handling becomes the buyer's problem.\n\nThe practical takeaway is to compare on a per-mg basis at the pack size you actually need, and to treat an unusually low price as a question rather than a bargain. NAD+ is one of the compounds in this market where a genuinely cheap listing can be real, because the underlying material is not expensive — but it is also the compound where a cheap listing is most likely to be a different specification entirely. For related research-area context, see the [Epitalon comparison hub](/compounds/epitalon) and the [SS-31 comparison hub](/compounds/ss-31), both of which sit in the same cellular-health research space.",
      },
    ],
    faq: [
      {
        question: "Where can I buy NAD+ in the UK?",
        answer:
          "ViralPeps compares NAD+ listings from UK research-chemical suppliers, who sell the coenzyme strictly for laboratory use under research-use-only terms. We list only suppliers whose verification signals — COA, contact, compliance and domain ownership — we can independently confirm, and the live table above shows every one we currently track.",
      },
      {
        question: "Is NAD+ legal in the UK?",
        answer:
          "NAD+ is a naturally occurring coenzyme and is sold as a research reagent and, separately, in supplement formats. Research suppliers list it under research-use-only terms for laboratory and educational purposes. We present this information for reference only and do not supply, recommend or endorse any particular application.",
      },
      {
        question: "Why does NAD+ come in so many different pack sizes?",
        answer:
          "Because it is a widely traded coenzyme rather than a bespoke synthetic peptide. UK listings cluster around 500mg vials, with 1000mg and smaller 100mg to 250mg presentations alongside, plus pen and multi-vial formats. Because pack sizes are spread out, cost per milligram is the most useful way to compare two listings — the stat strip at the top of this page shows how many distinct pack sizes we currently track.",
      },
      {
        question: "What should I check before buying NAD+ from a UK supplier?",
        answer:
          "Confirm the listing states a pack mass and which redox form is supplied, look for a Certificate of Analysis that names the laboratory and references a batch, test the contact route before you need it, and check whether the supplier holds UK stock. A listing that omits the specification entirely gives you nothing to compare, however competitive its headline price looks.",
      },
    ],
    sources: [
      { label: "NAD(+) signaling in Parkinson's disease: molecular mechanisms and therapeutic perspectives (Front Neurol 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42877680/" },
      { label: "Restoring NAD(+) pathways in brain aging and neurodegenerative diseases: roles of vitamin B3 metabolites, gut microbiota, and exercise in cognitive health (Front Nutr 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42846758/" },
      { label: "Narrative review of intravenous NAD(+) and NAD(+) precursors in wellness and translational medicine (Front Aging 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42787547/" },
      { label: "The aging purinome: A purinergic framework linking the hallmarks of aging to inflammaging (Ageing Res Rev 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42858859/" },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy NAD+ UK — Verified Suppliers, Cheapest First",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-nad-plus-uk",
    title: "Cheapest NAD+ UK: Lowest Price Per mg",
    description:
      "Cheapest NAD+ UK — the lowest verified price per milligram across every UK research supplier we track, compared at matched pack sizes and refreshed weekly here.",
    h1: "Cheapest NAD+ UK",
    focusKeyword: "cheapest nad+ uk",
    intro: [
      "Finding the cheapest NAD+ UK listing is a genuine price-sort exercise — but on this compound the trap is different from the one you meet on a research peptide. NAD+, or nicotinamide adenine dinucleotide, is a dinucleotide coenzyme rather than a synthetic peptide, and it is traded as a bulk commodity as well as a characterised research reagent. That means a very low price can be entirely real, because the raw material itself is not expensive. The question this page answers is therefore not \"is this too cheap to be true\" but \"is this cheap because it is efficient, or cheap because it is a different specification\". We rank on price per milligram and show the specification signals alongside each figure so you can tell the two apart.",
      "The table below is sorted by cost per milligram across every UK supplier ViralPeps tracks, drawn live from our comparison database and rebuilt weekly. Because pack sizes in this market spread across 100mg, 250mg, 500mg and 1000mg presentations, per-mg is the only figure that makes two listings genuinely comparable — a 250mg vial at £20 and a 500mg vial at £30 tell opposite stories depending on whether you divide them.",
      "A note on why we do not simply sort by headline price here. On a molecule traded by the gram, the headline price largely tracks pack size, so a cheap headline on a small vial can be worse value than a mid-priced larger one. The per-mg column corrects for that, and it is where the real ranking lives. Where a listing does not state a milligram figure in a parseable way, we show a dash rather than a guess.",
      "Everything here is presented for laboratory and educational reference. NAD+ from research suppliers is offered for in-vitro work under research-use-only terms. The [**NAD+ hub →**](/compounds/nad-plus) carries the full research profile and market overview.",
    ],
    sections: [
      {
        title: "Cheapest NAD+ UK — How We Calculate Price Per mg",
        body: "Cost per milligram is the price divided by the mass in the vial, and it is the only metric that lets you compare different pack sizes honestly. Our table computes it from the dosage field on each listing, so a 250mg vial at £20 resolves to £0.08/mg while a 500mg vial at £30 resolves to £0.06/mg — a difference a headline price sort completely hides, because the 250mg vial looks cheaper while costing more per unit of material.\n\nBecause NAD+ is sold across a genuinely wide spread of pack sizes, most of the useful comparison happens across sizes rather than within them. That is the opposite of a compound like Tesamorelin, where nearly every listing clusters at 10mg. Here the per-mg curve is where the market structure is legible: larger packs almost always resolve lower, and the question is whether the discount is steep enough to justify buying material you may not use before it degrades.\n\nThe current best verified per-mg figure this week is shown in the stat strip at the top of the page, and it is recalculated on every refresh. Where a listing quotes a price and an image without specifying the vial mass in text, we show a dash rather than assign a number — a deliberate choice, because a fabricated per-mg figure is worse than an absent one.",
        table: {
          header: ["Pack", "Price", "Cost per mg"],
          rows: [
            ["100mg vial", "£12.00", "£0.12/mg"],
            ["250mg vial", "£20.00", "£0.08/mg"],
            ["500mg vial", "£30.00", "£0.06/mg"],
            ["1000mg vial", "£45.00", "£0.05/mg"],
            ["Unlabelled pack", "£28.00", "—"],
          ],
        },
      },
      {
        title: "Why the Cheapest NAD+ Listing Is Sometimes Perfectly Fine",
        body: "On a bespoke modified peptide, a price far below the market cluster is a warning sign, because the synthesis carries a real cost floor that no legitimate supplier can price under indefinitely. NAD+ is not that kind of molecule. It is a dinucleotide coenzyme that can be produced at scale, and the raw material cost per gram is low. A genuinely cheap listing is therefore entirely plausible, and treating every low price as suspicious would be as misleading as treating every low price as a bargain.\n\nThe real distinction at the cheap end is specification, not authenticity. NAD+ is sold in grades that range from characterised research reagent with a certified purity figure to bulk material intended for other uses entirely, and the two do not carry the same documentation. A listing that quotes a price but no purity figure, no analytical method and no redox form is not necessarily fraudulent; it may simply be a different grade being sold into a market where the buyer is expected to know the difference. The cost of not checking is receiving material you cannot characterise.\n\nThe other distinction is form. NAD+ has a closely related reduced counterpart in NADH, and they are different reagents — different absorption profiles, different stability, different handling. A supplier who conflates the two in their listing, or who does not say which is supplied, is one whose cheap price you cannot evaluate, because you do not know what is in the vial. That is the single most important thing to resolve before price becomes the deciding factor.",
      },
      {
        title: "Getting the Best Value Without Compromising on Verification",
        body: "There are two legitimate ways to pay less per milligram for NAD+, and neither involves taking a risk on an unverified listing. The first is pack size: the jump from a 250mg vial to a 500mg or 1000mg presentation usually reduces the per-mg cost materially, and if your work will consume the material that is a straightforward saving. The second is choosing a supplier on the value side of the verified cluster rather than the top of it, which on a widely traded molecule is often a wide gap.\n\nWhat you should not do is buy the largest pack available purely because the per-mg figure is lowest. NAD+ has a defined stability profile in solution, and stocking material you will not use within its practical window is a false economy regardless of the unit price. The sensible approach is to establish how much you will use in the period you will use it, then buy the pack size that fits — comparing per-mg within that constraint rather than across the whole table.\n\nFor the full market rather than just the cheapest rows, the [NAD+ price comparison](/compound-guides/nad-plus-price-comparison-uk) page shows every listing we track. For a trust-first shortlist instead of a price-first one, see the [best NAD+ peptide](/compound-guides/best-nad-plus-peptide) ranking, and for a supplier-identity view the [NAD+ UK stockists](/compound-guides/nad-plus-uk-stockists) guide.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest NAD+ in the UK?",
        answer:
          "The live table above shows the lowest verified cost per milligram across the UK research suppliers ViralPeps tracks, recomputed weekly from their published pages. We rank on cost per milligram rather than headline price because pack sizes vary so widely that a small vial can look cheaper than a larger one while costing more per milligram.",
      },
      {
        question: "Is a very cheap NAD+ listing a red flag?",
        answer:
          "Not necessarily. NAD+ is a widely traded coenzyme with a lower raw-material cost than a bespoke synthetic peptide, so genuinely cheap listings are plausible. The question is specification rather than authenticity — check that the listing states the pack mass, the redox form supplied and a certified purity figure, because a cheap listing without those tells you nothing.",
      },
      {
        question: "Why do you show a dash instead of a per-mg price on some rows?",
        answer:
          "Where a listing does not state a milligram figure in a parseable way, we show a dash rather than estimating. A fabricated per-mg figure would distort the sort and mislead the comparison, so rows without a resolvable mass sink to the bottom instead of being assigned a made-up number.",
      },
      {
        question: "Does buying a larger pack of NAD+ reduce the cost per milligram?",
        answer:
          "Usually, and often steeply, because the material is inexpensive at scale. Moving from a 250mg vial to a 500mg or 1000mg presentation typically carries a materially lower cost per milligram. That is a legitimate saving provided your work will consume the material within its practical stability window, which is the constraint to check before buying the largest pack.",
      },
    ],
    sources: [
      { label: "Safety and Metabolism-Related Outcomes of Oral Nicotinamide Mononucleotide Supplementation in Adults: A Systematic Review and Meta-Analysis (Nutrients 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42514320/" },
      { label: "A phase-II randomized controlled pilot study of nicotinamide riboside supplementation in older adults with amnestic mild cognitive impairment (Alzheimers Dement 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42478598/" },
      { label: "Narrative review of intravenous NAD(+) and NAD(+) precursors in wellness and translational medicine (Front Aging 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42787547/" },
      { label: "Nicotinamide Supplementation in Glaucoma: A Systematic Review of Human Studies (Nutrients 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42739057/" },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest NAD+ UK — Every Listing Sorted by Cost Per mg",
    rowLimit: 25,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "nad-plus-price-comparison-uk",
    title: "NAD+ Price Comparison UK: Full Market",
    description:
      "NAD+ price comparison UK — every UK supplier we track in one side-by-side table, with pack size, cost per mg, stock status and live verification signals shown.",
    h1: "NAD+ Price Comparison UK",
    focusKeyword: "nad+ price comparison uk",
    intro: [
      "A genuine NAD+ price comparison UK table has to do more than line up numbers, because on this molecule the price itself carries information that is easy to misread. NAD+, or nicotinamide adenine dinucleotide, is a dinucleotide coenzyme rather than a synthetic peptide, and it is traded both as a characterised research reagent and as bulk material. That dual character means the same pack size can appear at radically different prices for reasons that have nothing to do with efficiency — different grades, different documentation, different redox forms. This page shows the entire market side by side so you can see where those boundaries fall.",
      "The table below is the complete set of NAD+ listings ViralPeps tracks across UK research suppliers, with pack size, headline price, cost per milligram, verification status, stock and a direct link to each supplier's own product page. It is generated live from our comparison database and rebuilt from suppliers' published pages every week, so the figures move as they move.",
      "Because this is the full-market view rather than a shortlist, it is where the structure of the market becomes visible. You can see the dominant 500mg cluster, the 1000mg band above it, the smaller 100mg and 250mg presentations below, and the pen and multi-vial formats at the edges — alongside the documentation column that separates suppliers publishing batch-linked certificates from those who do not. That combination — price shape plus specification — is what makes this page useful before you have decided which single listing to buy from.",
      "Everything here is presented for laboratory and educational reference. NAD+ from research suppliers is offered for in-vitro work under research-use-only terms. The [**NAD+ hub →**](/compounds/nad-plus) carries the full compound profile.",
    ],
    sections: [
      {
        title: "How to Read a Full-Market NAD+ Price Table",
        body: "The first thing a full-market table reveals is the shape of the pricing rather than any single value. NAD+ listings cluster around the 500mg vial, with 1000mg forming the band above and 100mg and 250mg presentations below. Within each size band the spread between the cheapest and most expensive verified supplier is wide — much wider than on a bespoke peptide — because the market includes both purpose-built research reagents and bulk material sold into the same search results. When the spread is unusually wide, the outlier is more likely to be a specification difference than an efficiency win or a scam.\n\nThe second thing it reveals is the cost-per-milligram column. A small vial at a headline price that looks competitive can resolve to a per-mg figure well above a 500mg or 1000mg presentation, which is the most common way buyers misread this market. Sorting by per-mg rather than price reorders the table substantially and usually moves the sensible options to the top.\n\nThe third is stock. Availability varies between suppliers on a weekly basis, and a listing that has sat out of stock for months is not a real price whatever it says. We record the in-stock flag from the supplier's own page rather than assuming availability, because on a commodity molecule the difference between listed and available is often the difference between a warehouse operation and a storefront that orders in.",
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
        body: "On most research peptides, a wide price spread mostly reflects pack size and vendor overhead. On NAD+ the picture is a little different, because the spread also tracks specification grade. A supplier selling a characterised research reagent with a certified purity figure and a batch-linked certificate is not selling the same product as a bulk reseller charging by the gram, even when both list the same pack size. The low outliers in this market are therefore a mixed group: some are genuine bulk-efficiency, and some are materially different goods.\n\nThat does not mean every expensive listing is good and every cheap one is bad — the opposite, on this molecule. It means the informative question is not \"who is cheapest\" but \"who can evidence the specification of what they sell, and at what price\". A supplier with a batch-linked Certificate of Analysis at a mid-cluster price is a sound buy, and a cheap listing that also states its purity figure and redox form may be a better one. The table is arranged so you can make that judgement rather than being pushed toward a single ranking.\n\nThe scientific literature shapes how you should read the market as well. NAD+ sits at the centre of cellular redox chemistry and is studied across ageing, neurodegeneration and metabolic research; reviews have catalogued its roles and the therapeutic interest around restoring its pathways. That research base is genuinely informative about the molecule, but it tells you nothing about the contents of any particular research vial. Separating the compound's reputation from the listing's evidence is the discipline this page is designed to support.\n\nIf you want the market narrowed rather than fully displayed, the [cheapest NAD+](/compound-guides/cheapest-nad-plus-uk) page gives the unit-cost shortlist and the [best NAD+ peptide](/compound-guides/best-nad-plus-peptide) page gives the trust-first one.",
      },
      {
        title: "Tracking Prices Over Time",
        body: "A single week's table is a snapshot; the useful signal is how it changes. NAD+ prices in the UK do move, and they move for legible reasons: bulk raw-material pricing, presentation format changes as suppliers add or retire pen formats, and the ordinary cycle of a supplier restocking and then running down inventory. Watching the same suppliers across several weeks is therefore more informative than a one-off comparison, which is why we refresh this data on a weekly cycle rather than publishing a static list.\n\nWe do not attempt to publish a price history chart for this compound, because the market is broad enough that average figures would obscure more than they reveal — a 100mg vial and a 1000mg vial in the same average tell you nothing useful. Instead, the table always reflects the most recent crawl, and the live indicator on the table header tells you when that was. If a figure looks out of line with what you saw last month, checking the supplier's own page directly is the right next step — the link is in every row.\n\nFor the wider research context in which NAD+ sits, the [SS-31 comparison hub](/compounds/ss-31) and the [Epitalon comparison hub](/compounds/epitalon) cover neighbouring compounds in the cellular-health literature, and both follow the same weekly refresh discipline. NAD+ is most often compared against those two because all three appear in ageing- and mitochondria-focused research rather than in the peptide-hormone literature.",
      },
    ],
    faq: [
      {
        question: "How many UK suppliers stock NAD+?",
        answer:
          "The live table above shows every UK supplier ViralPeps currently tracks for NAD+, and the stat strip at the top of the page gives the exact count. It is a wide pool, wider than most peptides, because NAD+ is a bulk-tradeable coenzyme as well as a research reagent — which is also why listing quality varies so much across it.",
      },
      {
        question: "Why is the price per mg different between a 250mg vial and a 500mg vial?",
        answer:
          "Because cost per milligram is the price divided by mass. A 250mg vial contains half the material a 500mg vial does, so at a comparable headline price its cost per milligram is higher. That is why we sort on per-mg rather than headline price — it is the only figure that makes different pack sizes comparable.",
      },
      {
        question: "How often is this comparison table updated?",
        answer:
          "Weekly. We crawl suppliers' published product pages and rebuild the table on a seven-day cycle, so the figures reflect their most recent state. The live indicator on the table header shows that the data is on the current refresh, and every row links to the supplier's own page if you want to confirm a figure directly.",
      },
      {
        question: "Should I buy from the cheapest supplier in the table?",
        answer:
          "Not on price alone — but for a different reason than on a bespoke peptide. NAD+ is genuinely inexpensive at scale, so cheap listings are plausible. The real question is specification: check that a listing states the pack mass, the redox form supplied and a certified purity figure before treating its price as comparable to anything else.",
      },
    ],
    sources: [
      { label: "The aging purinome: A purinergic framework linking the hallmarks of aging to inflammaging (Ageing Res Rev 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42858859/" },
      { label: "A context-dependent framework for targeting NAD metabolism in cancer (Cell Metab 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42880252/" },
      { label: "Therapeutic Targeting of Inflammaging and Emerging Strategies for Managing Age-Related Multimorbidity: A Narrative Review (Clin Interv Aging 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42781074/" },
      { label: "Bone Marrow Macrophage STING Signaling is a Direct Nexus Linking Marrow Adipose Expansion to NAD(+) Depletion and Osteogenic Decline in Skeletal Aging (Adv Sci 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42876239/" },
    ],
    tableMode: "full",
    tableHeading: "NAD+ Price Comparison UK — Every Tracked Listing",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-nad-plus-online-uk",
    title: "Buy NAD+ Online UK: Ordering Guide",
    description:
      "Buy NAD+ online UK — how UK research suppliers handle ordering, payment, dispatch and delivery, plus exactly what to confirm before you place an order here.",
    h1: "Buy NAD+ Online UK",
    focusKeyword: "buy nad+ online uk",
    intro: [
      "If you are about to buy NAD+ online UK suppliers are the practical place to look, but the ordering process on this molecule has details that do not apply to every research peptide, and they are worth knowing before you pay rather than after. NAD+, or nicotinamide adenine dinucleotide, is a dinucleotide coenzyme rather than a synthetic chain, and it is sold in a range of presentations from small vials to pens and multi-packs. Because the same molecule is also widely traded as bulk material, the identity and specification of what you receive matters as much as the price you paid.",
      "This page walks through what actually happens when you order NAD+ from a UK research supplier: how ordering and payment typically work, what a supplier should tell you before you commit, how dispatch and delivery differ between suppliers holding UK stock and those drop-shipping, and what arrives in the parcel. It also sets out the checks worth making in the five minutes before you place an order, which is where most avoidable problems are caught.",
      "The live price table below lets you compare the suppliers this guide refers to, with pack size, cost per milligram and a direct link to each supplier's own product page. It is rebuilt weekly from suppliers' published pages so the ordering details it links to are current.",
      "Everything here is presented for laboratory and educational reference. NAD+ from research suppliers is offered for in-vitro work under research-use-only terms. The [**NAD+ hub →**](/compounds/nad-plus) carries the full compound profile.",
    ],
    sections: [
      {
        title: "How Ordering NAD+ Online Actually Works",
        body: "The mechanics are ordinary: you select a pack size on the supplier's product page, add it to a basket, and check out. What differs from a mainstream retailer is the surrounding context. Research-reagent suppliers usually require you to acknowledge research-use-only terms, often at checkout, and reputable ones will not market the product for any human application. This matters more on NAD+ than on most compounds, because the molecule carries an enormous consumer-facing reputation — so a storefront that leans on wellness language and implies a human use is borrowing credibility it has not earned. If a listing suggests an application beyond laboratory work, treat it as a specification signal and weigh everything else on the site accordingly.\n\nPayment is typically card or bank transfer, with some suppliers offering cryptocurrency. Card payment has an obvious advantage: it gives you a chargeback route if the order does not arrive or does not match. Bank transfer offers no such protection and is a favourite of the storefronts that disappear, so the payment method a supplier insists on is itself a signal worth weighing. Where a supplier offers both, there is usually no reason to choose the less protected option.\n\nOrder confirmation should tell you three things: a batch or lot reference, a dispatch estimate, and a tracking number once the parcel moves. A supplier who provides a batch reference at the point of order is one who can tie your purchase back to a Certificate of Analysis, which is the whole point of buying from a documented source in the first place.",
        list: [
          "Research-use-only acknowledgement at checkout — normal and expected for this category.",
          "Card payment where available, because it preserves a chargeback route.",
          "A batch or lot reference on the order confirmation, tying your purchase to a COA.",
          "A stated redox form and purity figure on the listing itself, not just on request.",
          "A stated dispatch estimate before you pay, not after you chase.",
        ],
      },
      {
        title: "Dispatch, Delivery and Handling Expectations",
        body: "NAD+ is supplied by research vendors as a powder or lyophilised solid, and stable handling depends on keeping it cool and dry. What you should expect from a supplier holding UK stock is dispatch within a day or two, tracked delivery within a few days, and packaging that protects the container: a sealed pouch or padded container rather than a bare vial in an envelope.\n\nDrop-shipped listings behave differently. The dispatch estimate becomes an estimate in the loosest sense, delivery windows slip, and if the parcel crosses a border the buyer inherits the import handling. On a molecule that has a defined stability profile and that is also traded in bulk grades, a long and uncertain supply chain is an additional risk layer on top of the ordinary ones. The single most useful question to ask before ordering is whether the supplier holds the stock in the UK; the second is what they quote for dispatch.\n\nTemperature during transit matters less for a dry powder than for a reconstituted solution, but it is not irrelevant, and a supplier who says nothing about storage conditions at all is telling you something. The published research on NAD+ precursors and intravenous NAD+ discusses stability and handling as practical variables, and the ordinary practice of keeping the material cold, dry and dark is the safe default for any such reagent.",
        table: {
          header: ["Ordering factor", "What good looks like"],
          rows: [
            ["Payment method", "Card offered, chargeback route preserved"],
            ["Order confirmation", "Batch/lot reference plus dispatch estimate"],
            ["Specification", "Redox form and purity figure stated on the listing"],
            ["Dispatch window", "Stated and short — days, not weeks"],
            ["Packaging", "Sealed pouch or padded container, container protected"],
          ],
        },
      },
      {
        title: "Five Checks Before You Place the Order",
        body: "The five minutes before checkout are where most avoidable problems are caught, and NAD+'s dual identity as both a research reagent and a bulk-traded molecule makes the checks slightly more important than average.\n\nFirst, confirm the listing states a pack mass explicitly — 100mg, 250mg, 500mg or 1000mg. A listing that shows only a price without a size gives you nothing to compare. Second, confirm which redox form is supplied and look for a purity figure with the analytical method behind it; a generic purity claim with no method is not a substitute. Third, look for a Certificate of Analysis that names the laboratory and references a batch. Fourth, test the contact route before you need it — send one question and see whether a human replies within a working day. Fifth, confirm the supplier holds UK stock, because that is what separates a predictable delivery from a speculative one.\n\nNone of these checks requires technical knowledge of the molecule. They are ordinary due-diligence steps that a genuine supplier will pass without effort, and that an opportunistic listing will struggle with. If a listing fails two or more of them, the price advantage it is offering is not worth the risk you are carrying.\n\nTo compare the suppliers this guide refers to, see the [NAD+ price comparison](/compound-guides/nad-plus-price-comparison-uk) page for the full market, or the [NAD+ UK stockists](/compound-guides/nad-plus-uk-stockists) guide for a stock-focused view.",
        list: [
          "Vial mass stated explicitly in the listing, not only a price.",
          "Redox form and purity method stated, not just a purity percentage.",
          "A Certificate of Analysis naming the laboratory and a batch number.",
          "A contact route you have tested and that replied.",
          "A payment method that preserves your chargeback right.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I buy NAD+ online in the UK?",
        answer:
          "Yes — NAD+ is listed by UK research-chemical suppliers, who sell it for laboratory use under research-use-only terms. ViralPeps does not sell any peptides or reagents; we compare listings so you can check price, pack size and supplier verification before choosing where to buy.",
      },
      {
        question: "What should arrive when I order NAD+?",
        answer:
          "A sealed container of powder or lyophilised solid, packaged to protect it, with an order confirmation carrying a batch or lot reference. Reputable suppliers also dispatch with tracking and provide a Certificate of Analysis linked to the batch. If any of those is missing, ask the supplier directly before assuming it is normal.",
      },
      {
        question: "Is card or bank transfer better when buying NAD+?",
        answer:
          "Card payment is generally preferable because it preserves a chargeback route if the order does not arrive or does not match the listing. Bank transfer offers no such protection, so where a supplier offers both there is usually no reason to choose the less protected option.",
      },
      {
        question: "How long does NAD+ delivery take in the UK?",
        answer:
          "From a supplier holding UK stock, dispatch is typically within a day or two and tracked delivery follows within a few days. Drop-shipped listings behave less predictably, with longer and more variable windows, which is why confirming that a supplier holds stock in the UK is the single most useful question to ask before ordering.",
      },
    ],
    sources: [
      { label: "Narrative review of intravenous NAD(+) and NAD(+) precursors in wellness and translational medicine (Front Aging 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42787547/" },
      { label: "Transcriptional Profiling Shows Dampening of Interferon Gene Signatures by NAD(+) Augmentation in Ataxia-Telangiectasia (Int J Mol Sci 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42449929/" },
      { label: "NAD+ augmentation by nicotinamide riboside engages SLIT2/ROBO1 signaling to attenuate Th17 inflammation in psoriasis (JCI Insight 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42048163/" },
      { label: "PROMETHEUS clinical trial protocol: tailoring healthy ageing with lifestyle and nutraceuticals (Geroscience 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42393428/" },
    ],
    tableMode: "price",
    tableHeading: "Buy NAD+ Online UK — Suppliers You Can Order From",
    rowLimit: 25,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "nad-plus-uk-stockists",
    title: "NAD+ UK Stockists: Who Stocks It & How to Verify",
    description:
      "NAD+ UK stockists guide — who actually stocks NAD+ in the UK, how to verify a listing, and the signals that separate genuine stockists from bulk resellers.",
    h1: "NAD+ UK Stockists",
    focusKeyword: "nad+ uk stockists",
    intro: [
      "Looking for a NAD+ UK stockist means more than finding a site that lists the molecule, because this is a compound where the gap between a genuine research stockist and an opportunistic reseller is wider than average. NAD+, or nicotinamide adenine dinucleotide, is a dinucleotide coenzyme that is both a characterised research reagent and a bulk-traded commodity. That second identity means the UK market contains suppliers selling material of quite different specifications under the same compound name — and the clinical and wellness reputation the molecule carries is freely available to any listing to borrow, while the evidence that matters, a batch-linked Certificate of Analysis tied to the material in the container, is not.",
      "This page is about supplier identity rather than price. It sets out what actually distinguishes a UK stockist from a reseller, how we verify stockists, and the specific signals that separate a documented listing from one that merely uses the right vocabulary. The live table below shows every NAD+ stockist ViralPeps tracks, with their verification status, TrustScore and a direct link to their own product page.",
      "The distinction matters all the more here because NAD+ does not have the safeguard a bespoke peptide has. You cannot assume that every listing under the same name is the same goods, because on a commodity molecule the name covers a range of grades. The only way to know what a specifier is offering is the documentation attached to it, which is what this page is designed to help you read.",
      "Everything here is presented for laboratory and educational reference. NAD+ from research suppliers is offered for in-vitro work under research-use-only terms. The [**NAD+ hub →**](/compounds/nad-plus) carries the full compound profile.",
    ],
    sections: [
      {
        title: "What Separates a UK Stockist From a Reseller",
        body: "The clearest structural difference is stock. A UK stockist holds NAD+ in domestic inventory, dispatches it themselves, and can tell you a batch reference at the point of order. A reseller takes your money and passes the order to someone else, often overseas, which stretches the delivery window, removes the supplier's control over packaging and handling, and inserts an additional party between you and any problem. Both may list the same price; only one of them can answer a question about the specific container you received.\n\nThe second difference is documentation provenance, and on NAD+ it carries an extra dimension. A genuine stockist holds the Certificates of Analysis for the batches they hold, and can give you the document for the batch number on your order — including the redox form and purity method. A reseller typically reposts a generic certificate or a manufacturer's illustration that references a different batch, if it references one at all. The test is simple: ask for the COA that corresponds to your batch number, and ask what the stated purity method was. A stockist who can produce both immediately is holding their own material; one who deflects is not.\n\nThe third is identity continuity. A supplier with a track record, a registered business, and a stable domain has something to lose. A storefront that appears, sells a low-cost listing for a few months and disappears has nothing to lose, which is why the TrustScore badge — which verifies that a supplier controls the domain they sell from — is a practical filter rather than a decorative one.",
        table: {
          header: ["Signal", "Genuine UK stockist", "Reseller"],
          rows: [
            ["Stock location", "UK inventory, self-dispatched", "Overseas, drop-shipped"],
            ["COA for your batch", "Provided on request", "Generic or absent"],
            ["Redox form + purity", "Stated with analytical method", "Absent or ambiguous"],
            ["Contact quality", "Named person, replies", "Form-only, slow or silent"],
            ["Domain continuity", "Stable, verifiable identity", "New or disposable storefront"],
          ],
        },
      },
      {
        title: "How ViralPeps Verifies NAD+ Stockists",
        body: "Our audit turns a set of observable facts into a score. We load the supplier's homepage and record whether it responds. We walk the secondary pages and note what they say about dispatch, returns and who is behind the business. We look for a batch-linked Certificate of Analysis, either hosted on the site or reachable from a testing laboratory's domain. Those observations are then combined into the TrustScore you see in the table — a number derived from stated criteria, not a star rating we hand out on instinct.\n\nThe scope is deliberately narrow, and deliberately unequal across compounds. For NAD+ we would rather name the stockists we can evidence than the many we cannot, which is why the table is shorter than a raw market scan would produce. NAD+ is sold by supplement retailers, bulk chemical suppliers and research vendors alike, and only some of those belong in a research-reagent comparison at all. A missing supplier is almost always a missing signal — an unreachable certificate, an unanswered enquiry, or a listing that does not state its specification — rather than a view about their pricing.\n\nVerification is also a moving state, not a past achievement. Documentation that existed last quarter and has since lapsed counts as lapsed. Because NAD+ has a large scientific literature that is trivially easy to quote, the vocabulary of credibility costs a listing nothing; a traceable batch record with a named analytical method is the one asset that has to be earned, and it is what we refresh against on every cycle.",
      },
      {
        title: "The Checks That Matter Most on This Compound",
        body: "Three checks carry more weight on NAD+ than they would on a bespoke synthetic peptide.\n\nThe first is specification disclosure. NAD+ has a closely related reduced form, NADH, that is a genuinely different reagent, and the market contains material of different grades sold under the same name. A stockist who states the redox form, the purity figure and the analytical method behind it has nothing to hide; one who describes only price and pack size has given you nothing to verify. This check does more work here than anywhere else on this site.\n\nThe second is batch-level traceability. Ask for the Certificate of Analysis that matches your batch number, not a certificate in general. A stockist who genuinely commissions testing will produce a document with a laboratory name, a method and a batch reference — and will do so without hesitation.\n\nThe third is contact responsiveness, tested before you commit. Send one specific question and observe whether a human answers. This single test separates most genuine stockists from most resellers, and it costs nothing but a day.\n\nFor a price-led view of the same market, see the [cheapest NAD+](/compound-guides/cheapest-nad-plus-uk) page or the full [NAD+ price comparison](/compound-guides/nad-plus-price-comparison-uk). For an ordering-focused walkthrough, the [buy NAD+ online UK](/compound-guides/buy-nad-plus-online-uk) guide covers payment, dispatch and what to expect in the parcel.",
        list: [
          "Ask for the COA matching your specific batch number, and note whether it is produced promptly.",
          "Ask which redox form is supplied and what the stated purity method was.",
          "Test the contact route with one question before ordering, not after a problem appears.",
          "Confirm UK stock and a stated dispatch window in writing before you pay.",
          "Check that the domain is stable and the business identity is verifiable.",
        ],
      },
    ],
    faq: [
      {
        question: "Who stocks NAD+ in the UK?",
        answer:
          "UK research-chemical suppliers list NAD+ for laboratory use under research-use-only terms, and it is also sold by supplement retailers and bulk chemical suppliers. ViralPeps tracks the research stockists whose verification signals we can independently confirm, and the live table above shows every one of them with their TrustScore and a link to their own product page.",
      },
      {
        question: "How do I check a NAD+ supplier is genuine?",
        answer:
          "Three tests do most of the work. Ask which redox form is supplied and what the stated purity method was — a stockist who can answer precisely is holding characterised material. Ask for the Certificate of Analysis that matches your specific batch number. And send one question through the contact route before ordering to see whether a human replies.",
      },
      {
        question: "What is the TrustScore badge on a supplier listing?",
        answer:
          "It reflects a set of verification signals — the storefront being live, an accessible Certificate of Analysis, research-use-only labelling, a working contact route and confirmed domain ownership. Because it verifies that a supplier controls the domain they sell from, it filters out disposable storefronts that appear briefly and disappear without accountability.",
      },
      {
        question: "Why are some well-known NAD+ vendors absent from your table?",
        answer:
          "Absence usually means a verifiable signal was missing rather than an editorial judgement — no accessible Certificate of Analysis, no stated specification, no working contact route, or no confirmed UK stock. We re-run the checks periodically, so a supplier who adds documentation can be listed in a later refresh.",
      },
    ],
    sources: [
      { label: "A context-dependent framework for targeting NAD metabolism in cancer (Cell Metab 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42880252/" },
      { label: "The impact of nicotinamide mononucleotide on ovarian health: A comprehensive literature review of preclinical evidence and therapeutic potential (Clin Exp Reprod Med 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42547047/" },
      { label: "The aging purinome: A purinergic framework linking the hallmarks of aging to inflammaging (Ageing Res Rev 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42858859/" },
      { label: "Therapeutic Targeting of Inflammaging and Emerging Strategies for Managing Age-Related Multimorbidity: A Narrative Review (Clin Interv Aging 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42781074/" },
    ],
    tableMode: "trust",
    tableHeading: "NAD+ UK Stockists — Verified Suppliers Ranked by TrustScore",
    rowLimit: 25,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-nad-plus-peptide",
    title: "Best NAD+ Peptide UK: TrustScore Ranking",
    description:
      "Best NAD+ peptide — ranked by independent TrustScore, purity verification and live price per mg across every UK research supplier we track, refreshed weekly.",
    h1: "Best NAD+ Peptide",
    focusKeyword: "best nad+ peptide",
    intro: [
      "Deciding on the best NAD+ peptide means deciding what \"best\" should measure, and this page is explicit about the choice. NAD+, or nicotinamide adenine dinucleotide, is a dinucleotide coenzyme rather than a synthetic peptide, and it is both a characterised research reagent and a bulk-traded commodity. That dual identity means every listing can cite the same scientific literature around cellular redox and ageing, so compound reputation cannot distinguish between them. What can distinguish them is specification disclosure, documentation, domain accountability and stock reliability — which is exactly what this ranking weights most heavily.",
      "The table below ranks every UK NAD+ supplier ViralPeps tracks by a composite of verification signals, with cost per milligram shown alongside so you can see the trade-off rather than having it hidden from you. Verified suppliers who publish batch-linked certificates, state their redox form and maintain a working contact route sit at the top; unverified listings sit below regardless of how competitive their headline price looks. It is generated live from our comparison database and refreshed weekly.",
      "If you want the reasoning behind the ranking rather than just the ordering, the sections below explain what each signal measures and why it carries the weight it does on this particular molecule. If you would rather start from cost, the [cheapest NAD+](/compound-guides/cheapest-nad-plus-uk) page gives the per-milligram shortlist instead.",
      "Everything here is presented for laboratory and educational reference. NAD+ from research suppliers is offered for in-vitro work under research-use-only terms. The [**NAD+ hub →**](/compounds/nad-plus) carries the full compound profile.",
    ],
    sections: [
      {
        title: "How the Best NAD+ Peptide Ranking Is Built",
        body: "The ranking is a composite, not a single metric, because no single number answers the question honestly. We weight four things. Specification disclosure comes first: does the supplier state the redox form supplied, the purity figure, and the analytical method behind it? Documentation comes second: does the supplier publish or supply a Certificate of Analysis from a named laboratory, referencing a specific batch? Domain accountability comes third, captured by the TrustScore signal that confirms a supplier controls the domain they sell from. Price per milligram comes fourth, and it is deliberately last, because on this molecule a low price is often genuine and therefore carries less diagnostic weight than the specification attached to it.\n\nThat ordering is a deliberate editorial choice, and it produces a different top of the table than a pure price sort would. It is possible that a listing offering a lower per-mg figure sits below a more fully specified supplier in this ranking. That is the ranking working as intended: it is answering \"which is best\" as \"which is most verifiable at a fair price\", not \"which is cheapest\".\n\nOn NAD+ the specification weighting does more work than on any other compound on this site, and it is worth being explicit about why. Because the material is inexpensive at scale, the cheap end of this market contains both genuinely efficient suppliers and goods of a different grade entirely, and the two can look identical on a price table. The signals that separate them — a stated form, a named method, a batch-linked certificate — are exactly the ones a listing cannot borrow, which is why they lead the ranking.",
        table: {
          header: ["Signal", "Weight", "Why"],
          rows: [
            ["Specification disclosure", "Highest", "Form and method cannot be borrowed; defines what you are buying"],
            ["Batch-linked COA", "High", "Proves traceable testing"],
            ["Domain accountability", "High", "Filters disposable storefronts"],
            ["Contact quality", "Supporting", "Predicts whether problems get resolved"],
            ["Price per mg", "Supporting", "Matters, but not at the cost of specification"],
          ],
        },
      },
      {
        title: "The Difference Between Cheapest and Best on This Compound",
        body: "On a bespoke synthetic peptide, cheapest and best frequently diverge because the cheap end is where misrepresentation concentrates. On NAD+ the picture is subtler, and it is worth stating plainly: a low price here is not suspicious in itself. The molecule is produced at scale and the raw material cost is low, so efficient suppliers genuinely can undercut the field. Treating every cheap listing as a con would push buyers toward paying over the odds for no additional assurance.\n\nWhat makes a listing unverifiable, rather than cheap, is the absence of specification. A listing that quotes a price and a pack size but no redox form, no purity figure and no analytical method has not told you what it is selling, and no price is comparable to a listing that has. That is the distinction this ranking is built to make, and it is why specification leads the weighting rather than documentation alone.\n\nThe practical approach is to filter on specification first, then compare per-mg within the survivors. If you do that on this market, you will typically find that the difference between the specified cluster and the raw cheapest listing is small — which makes the decision easy rather than agonising, and means you rarely have to choose between paying less and knowing what you bought.\n\nFor the supplier-identity view behind this ranking, see the [NAD+ UK stockists](/compound-guides/nad-plus-uk-stockists) guide. For the ordering mechanics, the [buy NAD+ online UK](/compound-guides/buy-nad-plus-online-uk) walkthrough covers payment, dispatch and delivery expectations.",
      },
      {
        title: "Reading the Table Critically",
        body: "A ranking is only useful if you understand what it is not saying. This table does not tell you which supplier has the best customer service, because we cannot measure that at scale. It does not tell you which listing is most likely to be in stock next month, because stock is a weekly variable recorded as a flag rather than predicted. And it does not tell you whether any particular container is what it claims, because only a Certificate of Analysis tied to a batch number can do that.\n\nWhat it does tell you is which suppliers have demonstrated the signals that correlate with being a real, accountable business selling a specified product. That is a filter, not a guarantee, and treating it as the start of your diligence rather than the end of it is the right way to use it.\n\nWe refresh the ranking weekly along with the underlying price data, so a supplier who adds specification detail can rise and one who lets documentation lapse can fall. The stat strip at the top of the page shows the current best per-mg figure and the top TrustScore in the market, which together give you the two ends of the trade-off this ranking is designed to navigate.",
        list: [
          "The ranking filters on accountability and specification; it does not certify the contents of any container.",
          "A low price per mg is not itself a warning sign on this molecule — a missing specification is.",
          "The specified cluster's price range is where the real comparison happens.",
          "Stock and service are recorded facts, not predictions.",
          "A batch-linked Certificate of Analysis with a named method is the only thing that verifies a specific listing.",
        ],
      },
    ],
    faq: [
      {
        question: "What makes the best NAD+ peptide?",
        answer:
          "Specification disclosure first — the redox form supplied, the purity figure and the analytical method behind it — then a batch-linked Certificate of Analysis from a named laboratory, confirmed domain ownership and a contact route that replies. NAD+'s scientific reputation is available to every listing for free, so the ranking leans on the signals a listing cannot borrow.",
      },
      {
        question: "Is the best NAD+ peptide also the cheapest?",
        answer:
          "Not necessarily, though the gap is narrower than on a bespoke peptide. NAD+ is genuinely inexpensive at scale, so efficient suppliers can undercut the field. What separates a good listing from a cheap one is whether it states its redox form, purity figure and analytical method — without those, no price is comparable to anything else.",
      },
      {
        question: "How often is this ranking updated?",
        answer:
          "Weekly, along with the underlying price data. We re-run the verification checks periodically rather than treating them as a one-off award, so a supplier who adds documentation can rise in the ranking and one who lets it lapse can fall. The stat strip at the top of the page shows the current top TrustScore.",
      },
      {
        question: "Does a high TrustScore guarantee the product is genuine?",
        answer:
          "No. It is a filter, not a guarantee. A high score means a supplier has demonstrated the signals that correlate with being a real, accountable business — a live storefront, accessible documentation, research-use-only labelling and a working contact route. Only a Certificate of Analysis tied to your specific batch number can speak to the contents of a particular container.",
      },
    ],
    sources: [
      { label: "Restoring NAD(+) pathways in brain aging and neurodegenerative diseases: roles of vitamin B3 metabolites, gut microbiota, and exercise in cognitive health (Front Nutr 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42846758/" },
      { label: "NAD(+) signaling in Parkinson's disease: molecular mechanisms and therapeutic perspectives (Front Neurol 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42877680/" },
      { label: "A phase-II randomized controlled pilot study of nicotinamide riboside supplementation in older adults with amnestic mild cognitive impairment (Alzheimers Dement 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42478598/" },
      { label: "Safety and Metabolism-Related Outcomes of Oral Nicotinamide Mononucleotide Supplementation in Adults: A Systematic Review and Meta-Analysis (Nutrients 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42514320/" },
    ],
    tableMode: "trust",
    tableHeading: "Best NAD+ Peptide — Verified UK Suppliers Ranked by TrustScore",
    rowLimit: 25,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
