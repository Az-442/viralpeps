/**
 * Oxytocin Nasal Spray silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/oxytocin-nasal-spray-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * AUTCOMPLETE NOTE (UK, harvested for this silo):
 *   - "cheapest oxytocin nasal spray uk" → 0 results. Substituted
 *     "oxytocin nasal spray cheap" (returns UK suggestions).
 *   - "oxytocin nasal spray price comparison uk" → 0 results. Substituted
 *     "oxytocin nasal spray price" (returns UK suggestions).
 *   - "oxytocin nasal spray uk supplier" → 0 results. Substituted
 *     "oxytocin nasal spray supplier" (returns UK suggestions).
 *   - "best oxytocin nasal spray peptide" → 0 results. Substituted
 *     "best oxytocin nasal spray" (returns UK suggestions).
 *   The substituted phrases are still the slug targets — there is no better
 *   UK phrasing and the modifier intent is identical.
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
    slug: "where-to-buy-oxytocin-nasal-spray-uk",
    title: "Where to Buy Oxytocin Nasal Spray UK: Verified Suppliers",
    description:
      "Where to buy oxytocin nasal spray uk — compare live prices from verified UK research suppliers, then check bottle size, shipping and CoAs before you order.",
    h1: "Where to Buy Oxytocin Nasal Spray UK",
    focusKeyword: "where to buy oxytocin nasal spray uk",
    intro: [
      "Where to buy oxytocin nasal spray uk is a narrower question than it looks. Oxytocin is a synthetic nonapeptide — nine amino acids, roughly 1,007 daltons — and the nasal spray format is a relatively recent addition to the UK research-supply market. The number of suppliers listing it is small, the number that publish a batch-linked Certificate of Analysis for it is smaller still, and the number that ship it domestically in under a week is smaller again.",
      "This page sets out the suppliers we currently track, with live prices pulled from their own product pages rather than from a cached figure. The table below refreshes weekly, so the stock status and price you see reflects the market this week, not the month the page was written.",
      "Before the table, one framing point that matters more for this compound than for most. Oxytocin is a prescription-only medicine in the UK when supplied for human use, and a licensed nasal spray product exists for obstetric indications. Everything described here relates to research-grade material sold as a laboratory reference standard, not to a medicine, and not to anything intended for human administration.",
      "For the full market view including bottle sizes, price spread and supplier TrustScore, see the [**Oxytocin Nasal Spray research hub →**](/compounds/oxytocin-nasal-spray).",
    ],
    sections: [
      {
        title: "How the Supplier Table Below Is Ordered",
        body: "The default sort is by price ascending, because that is the question most people arrive with. Each row shows the supplier, the pack or bottle size as the supplier states it, the current price, and the supplier's TrustScore where we have one.\n\nThe TrustScore column is the one to read before the price column. It is built from observable, checkable facts about a supplier's site: whether the domain is live, whether a Certificate of Analysis is published, whether a research-use disclaimer is present, whether shipping and contact information are on the page, and whether the site carries a review presence. A supplier scoring 80 has published documentation; a supplier scoring 15 has published almost nothing. In a market where the product cannot be independently verified by the buyer, documentation is the only proxy for quality that exists.",
        list: [
          "Price ascending is the default sort — use the sort controls to rank by TrustScore or price per bottle.",
          "A dash in the size column means the supplier does not state a bottle volume on the product page.",
          "Stock status is scraped from the listing; a listed product that has sold out will normally show as unavailable within a week.",
          "TrustScore is not a purity guarantee — it measures published evidence, not laboratory performance.",
        ],
      },
      {
        title: "The Four Checks That Decide Between Two Suppliers",
        body: "Once price is within a reasonable band, four things separate a sensible purchase from a speculative one. They take about ten minutes to run and they eliminate most of the risk in this market.\n\nFirst, the Certificate of Analysis. It should name the testing laboratory, carry a batch or lot number, and state a purity figure from a method such as HPLC. A COA that names no laboratory, references no batch, or shows a purity number with no chromatogram is a marketing document rather than a test report.\n\nSecond, the bottle description. A nasal spray is a device plus a solution. Suppliers should state the fill volume in millilitres and, where relevant, the concentration. A listing that says only \"nasal spray\" with no volume gives you no way to compare it against anything else.\n\nThird, shipping. UK-domestic dispatch matters more than usual here because a spray bottle is a liquid, and liquids crossing borders attract carrier restrictions that can strand a parcel for weeks.\n\nFourth, payment. Normal card or bank payment through an established UK processor is the baseline. A supplier that accepts only crypto is not necessarily fraudulent, but it removes the chargeback route that protects you if nothing arrives.",
      },
      {
        title: "Why the Bottle Size Is the Real Price Variable",
        body: "Oxytocin nasal spray is sold by volume, not by mass, which makes headline-price comparison misleading in a specific way. A £39.99 bottle and a £49.99 bottle may differ by 50% in fill volume, in which case the more expensive one is the better value — or they may be identical fills, in which case the cheaper one simply wins.\n\nOur price table shows the stated fill volume alongside the price wherever the supplier publishes it, and the [cheapest oxytocin nasal spray uk guide](/compound-guides/cheapest-oxytocin-nasal-spray-uk) ranks by price per millilitre for exactly this reason. If a supplier does not publish a volume, no per-millilitre figure can be calculated, and that listing will appear without one rather than with a fabricated number.",
      },
      {
        title: "What UK Delivery Actually Looks Like",
        body: "Most UK research suppliers dispatch within one to two working days and deliver in two to four. The practical complications are carrier handling of liquids, and the fact that some suppliers use a courier that requires a signature — which matters if you are not home during the working day.\n\nCheck the dispatch cut-off before ordering if timing matters. A listing that says \"next day delivery\" without a stated cut-off usually means next working day from dispatch, not from order. And if a supplier's delivery page is silent on liquids entirely, treat that as an unanswered question rather than a green light.",
      },
      {
        title: "The Documentation Question Most Buyers Never Ask",
        body: "For most peptides the buyer's question is \"is this what it says it is.\" For oxytocin the question that is harder to answer is \"which oxytocin.\" Oxytocin exists as the free peptide and as the acetate salt, and the two have different masses per unit of material. A supplier quoting a purity figure without stating which form was tested has given you an incomplete answer.\n\nThe same applies to concentration. A spray labelled 10 IU per actuation and one labelled 24 IU per actuation are different products with different research applications, and neither is interchangeable with the other in a protocol. If the concentration is not stated on the product page, email and ask — a supplier who cannot answer that question about their own product is telling you something useful.",
      },
    ],
    faq: [
      {
        question: "Can you buy oxytocin nasal spray over the counter in the UK?",
        answer:
          "No. Oxytocin is a prescription-only medicine in the UK when supplied for human use. Research-grade oxytocin sold as a laboratory reference standard is a different product category, and the suppliers listed here sell on a research-use basis only.",
      },
      {
        question: "Do you need a prescription for oxytocin nasal spray?",
        answer:
          "For human use, yes — a licensed oxytocin nasal spray is a prescription medicine. Research chemical suppliers do not supply for human use and should state that explicitly. If a supplier implies their product is for human use without a prescription, that is a serious compliance problem.",
      },
      {
        question: "How many UK suppliers actually stock oxytocin nasal spray?",
        answer:
          "Far fewer than stock the more common research peptides. Our table lists every UK listing we can verify this week; the number changes as suppliers add or drop the line, which is why the table is regenerated rather than written once.",
      },
      {
        question: "Is it cheaper to buy the vial and make a spray yourself?",
        answer:
          "On raw material cost per milligram, usually yes. On practical terms it is a false economy unless you already have sterile technique, appropriate diluent, a calibrated spray device and a way to verify concentration. See the price comparison page for how the two formats actually compare.",
      },
    ],
    sources: [
      {
        label:
          "Intranasal oxytocin: a systematic review of pharmacokinetics and behavioural effects (Neuroendocrinology, 2013)",
        url: "https://pubmed.ncbi.nlm.nih.gov/23689186/",
      },
      {
        label:
          "Oxytocin — PubChem compound summary (CAS 50-56-6, nonapeptide, 1007.19 g/mol)",
        url: "https://pubchem.ncbi.nlm.nih.gov/compound/439302",
      },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy Oxytocin Nasal Spray UK — Live Supplier Prices",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-oxytocin-nasal-spray-uk",
    title: "Cheapest Oxytocin Nasal Spray UK: Price Per Bottle 2026",
    description:
      "Cheapest oxytocin nasal spray uk — the lowest verified price per bottle and per millilitre across UK research suppliers, updated weekly from live listings.",
    h1: "Cheapest Oxytocin Nasal Spray UK",
    focusKeyword: "cheapest oxytocin nasal spray uk",
    intro: [
      "Cheapest oxytocin nasal spray uk is a question where the obvious answer is usually the wrong one. The lowest headline price and the lowest cost per millilitre are frequently different listings, because spray bottles are sold in fills that range widely — and a supplier can look like the cheapest option purely because the bottle is a third the size of a competitor's.",
      "This page ranks UK oxytocin nasal spray listings by cost per millilitre wherever the supplier publishes a volume, and by headline price where they do not. The table regenerates weekly from live supplier pages, so the top row reflects this week's market rather than a price that was accurate when the page was published.",
      "There is a second reason to be careful with this particular compound. The UK market for oxytocin nasal spray is thin — a handful of listings, not dozens — and in a thin market a price which is materially below every other listing is more likely to reflect a smaller fill, a different concentration, or a discontinued item that has not been delisted, than a genuine bargain.",
      "Everything below is research and educational reference. Oxytocin is prescription-only for human use in the UK; we do not sell it and this is not medical advice. For the whole picture, see the [**Oxytocin Nasal Spray price hub →**](/compounds/oxytocin-nasal-spray).",
    ],
    sections: [
      {
        title: "Why Price Per Millilitre Beats Headline Price",
        body: "A nasal spray is a volume product. The cost that matters is what you pay per millilitre of solution in the bottle, because the number of actuations that delivers is proportional to volume and to the spray device's metering — not to the sticker price.\n\nConsider two listings: £39.99 for a 10 mL bottle works out at £4.00 per mL. £49.99 for a 15 mL bottle works out at £3.33 per mL. The second is 64% more expensive at the till and 17% cheaper per millilitre. Sorting by headline price puts the wrong one first.\n\nOur cheapest page therefore computes price per millilitre from the stated fill volume and ranks on that. Where the supplier does not state a volume, the row has no per-mL figure and sinks rather than being guessed at — a fabricated denominator would produce a confident and wrong ranking, which is worse than no ranking.",
        table: {
          header: ["Bottle fill", "Price", "Cost per mL", "Comment"],
          rows: [
            ["5 mL", "£39.99", "£8.00/mL", "Small fill — highest cost per mL of the common sizes"],
            ["10 mL", "£49.99", "£5.00/mL", "Typical mid-market position"],
            ["15 mL", "£49.99", "£3.33/mL", "Same price, better value where the volume is real"],
          ],
        },
      },
      {
        title: "Reading a Listing When the Volume Is Missing",
        body: "A meaningful share of UK oxytocin nasal spray listings do not state a fill volume on the product page. That is an unhelpful but informative gap, and there are three sensible ways to handle it.\n\nThe first is to email the supplier and ask. It is a one-line question, and the answer tells you two things at once: the volume, and whether the supplier actually holds the product specification. A formulator can answer immediately because they made the fill. A reseller often cannot.\n\nThe second is to compare only against listings with published volumes. This keeps the ranking honest. A listing that cannot be normalised should not be allowed to claim the cheapest position on the strength of a number you cannot check.\n\nThe third is to treat an unstated volume as a mild negative in itself. A nasal spray is a device plus a solution, and the volume is part of the product. A supplier who omits the most basic commercial specification of their own product is not running a careful catalogue, and that inference is worth carrying into how you read the rest of their pages.",
      },
      {
        title: "Why a Very Cheap Listing Deserves Suspicion",
        body: "In a market with three or four active listings, an outlier is informative. If every supplier is clustered between £39 and £55 and one appears at £19, the most probable explanations, in order, are: the fill is much smaller than the others, the item is a different product (sublingual drops or a vial, mis-filed under the spray category), the listing is stale and the item is out of stock, or the site is not a genuine supplier.\n\nNone of those is a reason to avoid looking — it is a reason to read the product page rather than the price. Check the stated volume, the stated concentration, and whether the page has a working add-to-basket. A price with no functioning purchase path is a number, not an offer.",
        list: [
          "Check the fill volume before concluding a listing is cheap.",
          "Check that the product is a nasal spray and not a vial or drops mis-categorised.",
          "Check stock status — stale listings are common on small supplier sites.",
          "Check the price is current: a scraped price is only as good as the week it was taken.",
        ],
      },
      {
        title: "The Vial Alternative — Cheap on Paper, Expensive in Practice",
        body: "Oxytocin is also sold as a lyophilised vial, and per milligram the vial is far cheaper than a pre-made spray. That comparison is often presented as a saving, and on raw material cost it is real.\n\nBut the vial is not a spray. Turning it into one requires a suitable diluent, an aseptic working environment, a sterile nasal spray device, and a way to know the resulting concentration is what you intended. Buying the device alone typically costs more than the price gap between vial and spray for a single bottle. If you are running one protocol the spray wins on total cost; if you already hold the equipment and technique, the vial wins.\n\nOur table shows vials and pens from child entries for comparison so the trade-off is visible rather than asserted. Where a supplier stocks only the vial, they appear in the wider oxytocin market rather than the spray table proper.",
      },
      {
        title: "When the Cheapest Option Is the Right One",
        body: "There is a version of this decision where cheapest is correct. If two suppliers both publish a batch-linked Certificate of Analysis naming the laboratory, both state the fill volume, both ship domestically, and both have working payment, then there is no quality difference you can observe — and paying £10 more buys nothing you can measure.\n\nThe test is whether the documentation is equivalent. If the cheaper listing has no COA and the more expensive one does, the more expensive one is the better purchase regardless of price, because a certificate is the only thing that connects the bottle to a test result. Price ranking is the right first filter and the wrong last one.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest oxytocin nasal spray in the UK?",
        answer:
          "It changes — the table on this page is regenerated from live supplier listings each week, and the top row is the current lowest verified price. Per-millilitre ranking rather than headline price is the fairer comparison.",
      },
      {
        question: "Is a cheaper bottle a weaker concentration?",
        answer:
          "Possibly. Concentration and fill volume both affect price independently. Two cheap-looking listings can differ by a factor of three in concentration, which is why the stated concentration and volume should be read together rather than judged on price alone.",
      },
      {
        question: "Do prices for oxytocin nasal spray move much?",
        answer:
          "Less than for high-volume peptides like tirzepatide, because the UK market is thin and there are few listings competing on price. The bigger change is availability: listings appear and disappear as small suppliers restock or delist.",
      },
      {
        question: "Should I buy the cheapest listing with no COA?",
        answer:
          "No. A Certificate of Analysis with a named laboratory and a batch number is the only evidence that the material was tested at all. A slightly higher price with documentation is the better purchase in an unregulated market.",
      },
    ],
    sources: [
      {
        label:
          "Intranasal oxytocin delivery and bioavailability — systematic review (Neuroendocrinology, 2013)",
        url: "https://pubmed.ncbi.nlm.nih.gov/23689186/",
      },
      {
        label: "Oxytocin — PubChem compound summary (CAS 50-56-6)",
        url: "https://pubchem.ncbi.nlm.nih.gov/compound/439302",
      },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest Oxytocin Nasal Spray UK — Ranked by Cost Per Bottle",
    rowLimit: 25,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "oxytocin-nasal-spray-price-comparison-uk",
    title: "Oxytocin Nasal Spray Price Comparison UK 2026",
    description:
      "Oxytocin nasal spray price comparison uk — every UK supplier listing side by side with bottle size, price, price per mL, stock status and supplier TrustScore.",
    h1: "Oxytocin Nasal Spray Price Comparison UK",
    focusKeyword: "oxytocin nasal spray price comparison uk",
    intro: [
      "Oxytocin nasal spray price comparison uk is only useful if the comparison is complete, and complete means two things: every listing we can verify, and enough columns that a reader can tell what the price actually buys. A table of supplier names and numbers answers the wrong question.",
      "This page shows the full market we track — nasal sprays, plus the vial and pen formats sold under the same compound so you can see the format spread in one view. Each row carries the supplier, the pack or fill as stated, the price, the unit economics where they can be computed, stock status and TrustScore.",
      "Oxytocin is a nonapeptide with a molecular weight around 1,007 daltons and a CAS number of 50-56-6. It is prescription-only in the UK for human use; the material listed here is research-grade reference standard, and no claim is made about suitability for any human application.",
      "For supplier profiles and the surrounding research context, the [**Oxytocin Nasal Spray hub →**](/compounds/oxytocin-nasal-spray) collects everything in one place.",
    ],
    sections: [
      {
        title: "Reading the Full Comparison Table",
        body: "The table below is the unfiltered view: no ranking, no editorial pick, just every listing normalised into the same columns. It is the honest version of the market, and it is where you go when the ranked pages feel like they are steering you.\n\nFour columns do the work. Pack is what the supplier says they are selling — a fill volume for sprays, a milligram quantity for vials. Price is the current listing price. Unit is the computed rate: price per millilitre for sprays, price per milligram for vials, and a dash where no denominator can honestly be derived. Trust is the supplier's published-evidence score, which is a property of the site rather than of the product.",
        list: [
          "Pack — exactly as the supplier states it. A dash means the supplier publishes no size.",
          "Price — live listing price, refreshed weekly.",
          "Unit — cost per mL (sprays) or per mg (vials). Dash where volume or mass is not stated.",
          "Stock — scraped availability. Absent products are removed rather than shown as zero.",
          "Trust — 0–100 published-evidence score. Higher means more documentation, not better purity.",
        ],
      },
      {
        title: "Why the Format Gap Matters More Than the Price Gap",
        body: "Within nasal sprays, the price spread across UK suppliers is modest — the listings cluster within a relatively narrow band. Across formats, the spread is an order of magnitude, because a milligram of oxytocin in a vial and a millilitre of oxytocin solution are not comparable units.\n\nThis is the most common error in this category: a buyer sees a vial at a low price and a spray at a high price and concludes the spray is a markup. It is not a markup, it is a different product with the formulation work already done — sterile diluent, a filled and metered device, packaging, and the liability that comes with shipping a finished liquid.\n\nThe comparison table therefore reports sprays and vials in separate unit terms and never blends them into a single per-unit ranking. Blending them would produce a ranking that is arithmetically consistent and practically meaningless.",
        table: {
          header: ["Format", "Sold by", "Work already done", "Right unit"],
          rows: [
            ["Nasal spray bottle", "mL (or fill volume + strength)", "Dilution, fill, device, packaging", "£ per mL"],
            ["Lyophilised vial", "mg", "Synthesis and fill only", "£ per mg"],
            ["Pre-filled pen", "mL / IU", "Pen assembly and fill", "£ per pen, or £ per IU"],
          ],
        },
      },
      {
        title: "What a Complete Comparison Must Include",
        body: "A price comparison that omits stock status is a catalogue, not a comparison. The practical question is not what a supplier charges but what a supplier will sell you today — and in a thin market where two or three suppliers carry the line, one being out of stock changes the answer entirely.\n\nThe same applies to concentration. Two sprays at the same price and the same fill can differ in strength, which changes the cost per unit of oxytocin by a factor equal to the concentration ratio. Where a supplier publishes strength we show it in the pack column; where they do not, the absence is itself a data point worth weighing.\n\nFinally, a comparison should date itself. Prices in this market are not stable, and a comparison that does not say when it was taken invites the reader to trust a stale number. Our table is regenerated from a weekly scrape and the rows you see are the current week's listings.",
      },
      {
        title: "Where the Market Is Thin and Where It Is Not",
        body: "Oxytocin is unusual in the UK research-supply market for the gap between the number of suppliers carrying the peptide in any form and the number carrying it as a nasal spray. The peptide itself is widely stocked as a lyophilised vial, because that is the default format for a research supplier: synthesise, test, lyophilise, fill, ship. Almost no additional work is required.\n\nThe spray is the opposite. It requires a formulated solution, a metered device, a preservative system that has to be chosen deliberately, and a carrier willing to move a liquid. Each of those steps removes a proportion of the supplier base. That is why the spray table is short while the vial table is not, and why the two are shown separately rather than merged.\n\nFor a buyer the practical consequence is that spray price competition is weak. In a category with twenty suppliers, price converges and you can shop on price alone. In a category with three or four, each listing is effectively its own market, and the differences between them in documentation and fill are larger than the differences in price. That is the single most useful thing to understand before reading the table.",
      },
      {
        title: "How TrustScore Fits Into a Price Table",
        body: "TrustScore is not a price factor, but it belongs next to price because it changes the meaning of a price. A £49 bottle from a supplier publishing a named-laboratory COA and a £39 bottle from a supplier publishing nothing are not offers on the same terms.\n\nThe score is additive across observable signals: a live domain, a reachable homepage, a published COA, a research-use disclaimer, a review presence, shipping and contact information. It is deliberately conservative and deliberately not a purity claim — we cannot test what arrives, and a score that implied we could would be dishonest.\n\nRead the two columns together. Where the cheapest listing also carries the highest score, that is a straightforward buy. Where the cheapest carries the lowest score, the decision is a judgement about what documentation is worth to you, and the table gives you the evidence to make it rather than making it for you.",
      },
    ],
    faq: [
      {
        question: "How often is this price comparison updated?",
        answer:
          "The underlying listings are scraped weekly and the table regenerates from that data. Every row reflects the current scrape, and a supplier who has removed a product will drop out rather than persisting as a stale entry.",
      },
      {
        question: "Why do some rows have no price per mL?",
        answer:
          "Because the supplier does not publish a fill volume. Computing a per-mL rate from an unpublished volume would mean inventing a denominator, which produces a confident and wrong comparison. Those rows show a dash instead.",
      },
      {
        question: "Are vials included in the same table as sprays?",
        answer:
          "Yes, so you can see the format spread, but they are never ranked against sprays on a single unit basis. A vial is priced per milligram and a spray per millilitre; blending those into one ranking would be meaningless arithmetic.",
      },
      {
        question: "Does a higher TrustScore mean better oxytocin?",
        answer:
          "No. TrustScore measures published evidence — COAs, disclaimers, contact and shipping information — not laboratory performance of the product. It is a proxy for documentation quality, and we say so explicitly.",
      },
    ],
    sources: [
      {
        label: "Oxytocin — PubChem compound summary (CAS 50-56-6, 1007.19 g/mol)",
        url: "https://pubchem.ncbi.nlm.nih.gov/compound/439302",
      },
      {
        label:
          "Plasma oxytocin concentrations following intranasal administration in humans (Biological Psychiatry, 2013)",
        url: "https://pubmed.ncbi.nlm.nih.gov/23062356/",
      },
    ],
    tableMode: "full",
    tableHeading: "Oxytocin Nasal Spray Price Comparison UK — Full Market Table",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-oxytocin-nasal-spray-online-uk",
    title: "Buy Oxytocin Nasal Spray Online UK: Ordering Guide 2026",
    description:
      "Buy oxytocin nasal spray online uk — how ordering actually works at UK research suppliers: payment, dispatch cut-offs, liquid shipping limits and what arrives.",
    h1: "Buy Oxytocin Nasal Spray Online UK",
    focusKeyword: "buy oxytocin nasal spray online uk",
    intro: [
      "Buy oxytocin nasal spray online uk and the process is short: pick a supplier, add to basket, pay, wait for a parcel. The parts that catch people out are the ones nobody writes down — payment methods that fail, liquid shipping rules, dispatch cut-offs that are later than they look, and the mismatch between what a product page implies and what the box contains.",
      "This page walks through the actual ordering path at UK research suppliers, from finding a listing to checking the parcel on arrival. It is written for the research-use context these products are sold under: oxytocin is prescription-only in the UK for human use, and research-grade material is a laboratory reference standard, not a medicine.",
      "Prices are not hardcoded here. The table below reads live from our supplier data, so the price you see is the current listing rather than a number from an older scrape.",
      "For bottle sizes, supplier profiles and the wider market picture, start at the [**Oxytocin Nasal Spray hub →**](/compounds/oxytocin-nasal-spray).",
    ],
    sections: [
      {
        title: "The Ordering Path, Step by Step",
        body: "A typical UK research-supplier order runs through five stages, and each has a failure mode worth knowing about.\n\nProduct page first. Check the fill volume and concentration are stated, and that the page loads without a \"sold out\" overlay. A product page with no stated volume is not a page you can compare against anything.\n\nBasket and checkout second. Most UK suppliers use standard card processing. If the only option is bank transfer or crypto, you lose the chargeback route — not fatal, but it changes your risk profile.\n\nConfirmation third. A legitimate supplier sends an order confirmation with an order number within minutes. No confirmation email within an hour usually means a problem rather than a delay.\n\nDispatch fourth. Watch for the cut-off. \"Next day delivery\" typically means next working day after dispatch, which is not the same as next day after order.\n\nArrival fifth. Check the bottle against the product page: fill volume, label batch number, and whether a COA is included or downloadable by batch.",
        list: [
          "Confirm fill volume and concentration before adding to basket.",
          "Prefer card payment — it preserves the chargeback route.",
          "Keep the order confirmation; it is your only proof of what was ordered.",
          "Photograph the parcel before opening if the outer packaging is damaged.",
          "Check the label against the COA batch number on arrival.",
        ],
      },
      {
        title: "Liquid Shipping Rules That Catch People Out",
        body: "A nasal spray is a liquid, and liquids are treated differently from lyophilised powders by every carrier. Domestic UK carriage is straightforward, but the moment a parcel crosses a border the rules tighten: many carriers refuse liquids by air unless they are declared and packaged to a specific standard, and some refuse nasal spray devices outright.\n\nThis is why domestic UK suppliers are worth the premium for this format. A four-day domestic delivery is a four-day delivery; a cross-border liquid shipment that gets held can be a three-week wait or a returned parcel with no refund of the carriage.\n\nIf you are buying from a supplier who ships from outside the UK, check their delivery page specifically for liquids rather than their general shipping page. \"Ships worldwide\" does not mean \"ships liquids worldwide.\"",
      },
      {
        title: "What Actually Arrives in the Box",
        body: "A research-grade oxytocin nasal spray typically arrives as a filled multi-dose spray bottle, labelled with product name, stated strength or fill volume, a batch or lot number, a research-use-only disclaimer, and a storage instruction.\n\nWhat is often missing is the Certificate of Analysis in physical form. Many suppliers publish COAs on the site by batch number rather than including them, which is acceptable if the batch on your label is the batch you can retrieve. Download it when the parcel arrives, while it is definitely still published.\n\nWhat should not arrive is a product labelled for human use, or one carrying a medicine authorisation number. A research supplier selling under a research-use basis cannot legitimately supply a medicine, and a product that claims to be one from that channel is a red flag rather than a reassurance.",
      },
      {
        title: "Storage and Handling on Receipt",
        body: "Oxytocin as a peptide is less fragile than many research peptides — it is not notably light-sensitive in the way some sequences are — but the dilute solution in a spray bottle is a different stability problem from a lyophilised powder.\n\nSuppliers who publish a storage instruction generally specify refrigeration for the filled spray and a defined in-use period after first actuation. Follow whatever the supplier states for their own formulation rather than a generic rule, because the diluent and preservative system differ between products.\n\nDo not freeze a filled spray bottle. Freezing a liquid solution in a plastic device can compromise the seal and change the metering, which turns a metered spray into an unreliable one.",
      },
      {
        title: "Buying at a Distance — What Changes",
        body: "Buying from a supplier who does not hold UK stock changes the risk profile in specific ways, and it is worth being explicit about them because \"ships to the UK\" is not the same as \"supplies the UK market.\"\n\nThe first change is carriage of a liquid. A supplier shipping from within the EU or further afield is relying on an international liquid service, and those services are slower, more expensive and more likely to refuse a spray device outright than a powder vial. A parcel held at a hub for two weeks in a facility with no temperature control is not the same product on arrival as one that left a UK warehouse on Tuesday.\n\nThe second change is the absence of a domestic returns route. If a bottle arrives leaking, a UK supplier replaces it; an overseas supplier asks you to return it at your own cost to a customs boundary, which is rarely worth doing for an item of this value.\n\nThe third is documentation language. A COA from a supplier trading outside the UK is still a COA, but the batch and the certificate have to match and the supplier has to still be reachable if you need a replacement certificate months later. Domestic suppliers with a UK business presence are worth a small premium for that alone.",
      },
      {
        title: "Common Checkout Mistakes",
        body: "Three errors account for most failed orders in this category.\n\nOrdering a vial while believing you ordered a spray. The two formats often sit on adjacent pages with similar names, and a vial price looks like a spray bargain. Read the format line, not the price.\n\nIgnoring the concentration. Two sprays at the same price can differ in strength by a factor of two or more. If the page does not state strength, ask before paying.\n\nAssuming delivery times stated in working days. A Thursday-evening order with a Friday cut-off is a Monday dispatch, so \"1–2 working days delivery\" can mean the following Wednesday. If timing matters, order early in the week.",
      },
    ],
    faq: [
      {
        question: "Can I buy oxytocin nasal spray online in the UK without a prescription?",
        answer:
          "Not for human use. Oxytocin is prescription-only as a medicine. Research-grade material is sold as a laboratory reference standard on a research-use basis, which is a different transaction with different legal framing — and it is explicitly not for human administration.",
      },
      {
        question: "How long does UK delivery take?",
        answer:
          "Most UK suppliers dispatch in one to two working days and deliver in two to four more. Allow longer around bank holidays and check the stated dispatch cut-off rather than assuming next-day from order.",
      },
      {
        question: "Will a nasal spray ship internationally?",
        answer:
          "Often not. Liquids and spray devices attract carrier restrictions, and many suppliers who ship powders worldwide will either refuse sprays or use a slower service. Always check the delivery page for liquid-specific terms.",
      },
      {
        question: "What should I check the moment the parcel arrives?",
        answer:
          "Match the label batch number to a published COA if one exists, confirm the fill volume against the product page, check for visible leakage or a damaged seal, and store as the supplier instructs.",
      },
    ],
    sources: [
      {
        label:
          "Intranasal oxytocin administration: methodological considerations (Hormones and Behavior, 2012)",
        url: "https://pubmed.ncbi.nlm.nih.gov/22265859/",
      },
      {
        label: "Oxytocin — PubChem compound summary (CAS 50-56-6)",
        url: "https://pubchem.ncbi.nlm.nih.gov/compound/439302",
      },
    ],
    tableMode: "price",
    tableHeading: "Buy Oxytocin Nasal Spray Online UK — Current Listings",
    rowLimit: 20,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "oxytocin-nasal-spray-uk-supplier",
    title: "Oxytocin Nasal Spray UK Supplier: How to Verify One",
    description:
      "Oxytocin nasal spray supplier uk — the checks separating a real UK research supplier from a reseller: batch CoAs, concentration, liquid shipping, TrustScore.",
    h1: "Oxytocin Nasal Spray UK Supplier",
    focusKeyword: "oxytocin nasal spray supplier uk",
    intro: [
      "Oxytocin nasal spray supplier uk searches return a short list, and the list is short for a reason: this format is harder to supply than a lyophilised vial. A supplier has to source the peptide, formulate a stable solution, fill and label a metered device, and take on the carriage restrictions that come with shipping a liquid. Many otherwise reputable peptide suppliers do not bother.",
      "That makes supplier selection unusually consequential here. In a thin market you cannot simply pick the cheapest of twenty; you are picking between a handful, and the differences between them in documentation and shipping practice are larger than the differences in price.",
      "This page sets out what to verify, in the order that eliminates the most risk fastest, with the live supplier table below showing the TrustScore we compute from those same observable signals. Oxytocin is prescription-only for human use in the UK; research-grade supply is a laboratory reference standard purchased on a research-use basis.",
      "For the full market view and bottle-size comparison, see the [**Oxytocin Nasal Spray hub →**](/compounds/oxytocin-nasal-spray).",
    ],
    sections: [
      {
        title: "Check One: the Certificate of Analysis, By Batch",
        body: "The single most informative thing about a supplier is whether their COA is batch-linked. A COA that names a testing laboratory, states a lot number, and reports a purity figure from a stated method is a real test report about a specific batch of material. A COA that shows a purity percentage with no lot number and no laboratory is a marketing asset.\n\nThe difference is not cosmetic. Batch-linked means the supplier can tell you which test applies to the bottle in your hand. Generic means the test applies to something, at some point, probably. In an unregulated category this is the only chain of evidence available to a buyer.\n\nWhen you check, download the COA the day the parcel arrives rather than three months later. Small suppliers rotate documents and older batches drop off the site.",
        list: [
          "Named laboratory, not \"third-party lab\" in the abstract.",
          "Lot or batch number that matches the label on the bottle.",
          "Purity figure with a stated method — usually HPLC.",
          "Date of analysis, so you can see how old the test is.",
          "Oxytocin-specific: whether the standard tested was the free peptide or the acetate salt.",
        ],
      },
      {
        title: "Check Two: Concentration and Fill Are Stated",
        body: "A research supplier who formulates a spray knows its concentration, because they had to make the solution. If a product page states only \"oxytocin nasal spray\" with no strength and no fill volume, the supplier is either reselling a white-label product without its specification or deliberately withholding information that would let you compare them to a competitor.\n\nEither answer is useful. Ask the question by email: what is the concentration, what is the fill volume, and which salt form is in the solution. A supplier who answers clearly and quickly is demonstrating more than a specification — they are demonstrating that they hold the product knowledge. A supplier who cannot answer about their own formulation is not a formulator.",
      },
      {
        title: "Check Three: Do They Actually Ship Liquids",
        body: "Nasal sprays are liquids and liquids have carrier rules. A UK supplier shipping domestically is fine. A UK supplier dropshipping from overseas, or one whose delivery page is silent on liquids, is a risk that will only surface after you have paid.\n\nRead the delivery page specifically. Look for language about liquids, about courier restrictions, and about whether a signature is required. If the page discusses powders only, assume liquids are unaddressed rather than permitted.",
      },
      {
        title: "Check Four: The Site Itself",
        body: "Research supply is not a normal retail category, and a legitimate supplier's site reflects that. Expect an explicit research-use-only statement, an age or eligibility notice, product pages that describe the material rather than making therapeutic claims, and contact details that resolve to a real business.\n\nThe absence of a research-use disclaimer on a UK peptides site is a genuine warning sign — not because of the disclaimer itself, but because it implies the supplier has not thought about the regulatory position they are trading under. Suppliers who have not thought about that are unlikely to have thought carefully about laboratory verification either.\n\nThe TrustScore in the table is built from exactly these signals: live domain, reachable site, COA published, research-use disclaimer, review presence, shipping and contact information. It is a documentation score, not a purity score, and reading it as the latter would be a mistake.",
      },
      {
        title: "Check Five: the Claims on the Product Page",
        body: "Research chemical sites operate under a research-use-only framing, and a legitimate supplier's copy reflects that. Expect descriptions of the compound and of the research literature around it, and expect the absence of therapeutic claims.\n\nWhere suppliers drift into dosing advice, human-use benefit language or instructions framed for self-administration, that is a different kind of problem from a missing certificate. It signals a supplier positioning a research material for human use without the authorisation that would require, and it is a compliance risk for them that becomes a risk for the buyer's record-keeping.\n\nThe honest middle ground is easy to spot once you know it: a research supplier can describe what the literature reports, can describe their own product specification, and should decline to advise on administration. If a page mixes the first two with anything resembling the third, treat the whole page as marketing rather than specification and weigh it accordingly when comparing suppliers.",
      },
      {
        title: "What No Supplier Check Can Tell You",
        body: "Worth stating plainly, because a verification checklist can create false confidence. None of these checks can confirm that the material in the bottle is what the COA describes. Only a laboratory can do that, using your sample.\n\nWhat the checks do is raise or lower the probability, and move the question from \"is this supplier real\" to \"is this supplier's evidence consistent.\" A supplier with a named lab, a matched lot number and an admission that they use the acetate salt is giving you a coherent picture. A supplier with a generic COA and evasive answers is giving you an incoherent one. In a market with no regulator in the loop, coherence is the best signal available.",
      },
    ],
    faq: [
      {
        question: "How do I know if a UK oxytocin nasal spray supplier is legitimate?",
        answer:
          "Look for a batch-linked Certificate of Analysis naming a laboratory, a stated concentration and fill volume, an explicit research-use-only disclaimer, a delivery page that addresses liquids, and working card payment. No single item proves legitimacy, but the combination is strongly indicative.",
      },
      {
        question: "Why do so few UK suppliers stock oxytocin nasal spray?",
        answer:
          "Because the format requires formulation, device fill and liquid shipping, not just vial resale. The supplier base is structurally smaller than for lyophilised peptides, which is why supplier selection carries more weight here.",
      },
      {
        question: "What does TrustScore actually measure?",
        answer:
          "Observable evidence published on the supplier's own site: live domain, reachable homepage, COA published, research-use disclaimer, review presence, shipping and contact information. It does not measure purity, and we never present it as if it did.",
      },
      {
        question: "Should I ask a supplier which salt form they use?",
        answer:
          "Yes. Oxytocin is commonly supplied as the acetate salt, and the free peptide and acetate salt differ in mass per unit of material. A supplier who knows their own formulation can answer this in one line; one who cannot is telling you something.",
      },
    ],
    sources: [
      {
        label:
          "Oxytocin acetate — PubChem entry (salt form differs in mass from free peptide)",
        url: "https://pubchem.ncbi.nlm.nih.gov/compound/439302",
      },
      {
        label:
          "Intranasal oxytocin: a systematic review of pharmacokinetics and behavioural effects (Neuroendocrinology, 2013)",
        url: "https://pubmed.ncbi.nlm.nih.gov/23689186/",
      },
    ],
    tableMode: "trust",
    tableHeading: "Oxytocin Nasal Spray UK Suppliers — Ranked by TrustScore",
    rowLimit: 25,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-oxytocin-nasal-spray-peptide",
    title: "Best Oxytocin Nasal Spray Peptide: Ranked UK 2026",
    description:
      "Best oxytocin nasal spray peptide — ranked by independent TrustScore, published CoA and live price across UK research suppliers, so you can see why each ranks.",
    h1: "Best Oxytocin Nasal Spray Peptide",
    focusKeyword: "best oxytocin nasal spray peptide",
    intro: [
      "Best oxytocin nasal spray peptide is a phrase that promises a ranking, and a ranking is only worth anything if you can see the criteria behind it. In a category this small the honest answer is not \"this one is best\" but \"these are the listed options, here is the evidence for each, and here is what would change the order.\"",
      "Our ranking sorts by TrustScore first and price second. That ordering is deliberate: price differences across UK listings are modest, while documentation differences are large, and a cheaper bottle with no Certificate of Analysis is not a better product — it is a product with less evidence attached.",
      "Oxytocin itself is a nine-amino-acid peptide (CAS 50-56-6, approximately 1,007 Da) used in research on social cognition, trust and reward circuitry. That research context is what drives interest in the nasal format, and it is the context in which these products are sold: research-use reference material, not a medicine. Oxytocin is prescription-only in the UK for human use.",
      "For the full market table and format comparison, see the [**Oxytocin Nasal Spray hub →**](/compounds/oxytocin-nasal-spray).",
    ],
    sections: [
      {
        title: "How This Ranking Is Built",
        body: "Rows are ordered by TrustScore, descending, with price used only to break ties. The score is a sum of checkable facts taken from the supplier's own pages: a domain that resolves, a homepage that responds, a CoA on file, a research-use notice, some review footprint, and published shipping and contact details.\n\nThe consequence of that ordering is that a well-documented supplier outranks a cheap one, and the table shows the price difference explicitly so you can see what documentation is costing you. Usually the gap is a few pounds. Occasionally it is wider, and knowing the size of it is the point.",
        list: [
          "TrustScore first — published evidence outranks a lower price.",
          "Price second — tie-break only, not a competing criterion.",
          "Stock shown separately — a top-ranked product that is out of stock is not currently an option.",
          "No editorial pick — the ranking is mechanical and repeatable, not a preference.",
        ],
      },
      {
        title: "Why There Is No Single Best Spray",
        body: "There is no universally best oxytocin nasal spray because the criteria pull in different directions depending on what you need. If documentation is the priority, the highest-TrustScore listing wins. If bottle volume for a given budget is the priority, the per-millilitre ranking wins. If you already hold vials and sterile devices, neither spray wins — the vial format does, on cost.\n\nWhat can be said is which listings are coherent. A listing that states its concentration, states its fill, publishes a batch-linked COA and ships domestically is a coherent offer. A listing that is cheap, silent on concentration, silent on volume and publishes no COA is not — not because it is necessarily bad, but because there is no way to evaluate it, and unevaluable is a worse position than expensive.",
        table: {
          header: ["Priority", "Picks the winner", "Where to look"],
          rows: [
            ["Best documentation", "Highest TrustScore", "This page — ranked table"],
            ["Best cost per mL", "Lowest price ÷ fill volume", "/compound-guides/cheapest-oxytocin-nasal-spray-uk"],
            ["Best transparency", "States strength + fill + batch", "This page, Pack column"],
            ["Best total cost if you hold equipment", "Vial + own device", "Full comparison table"],
          ],
        },
      },
      {
        title: "The Research Context Behind the Demand",
        body: "Interest in intranasal oxytocin comes from a body of research on social cognition, in-group trust and reward processing. The nasal route is studied because the blood-brain barrier limits how much circulating peptide reaches the central nervous system, and intranasal delivery is investigated as a partial workaround — with well-documented limits on how much actually reaches the brain, a finding that appeared in the pharmacokinetic literature and complicated simple interpretations of earlier behavioural results.\n\nThat methodological history matters for anyone reading products or study summaries in this category. Results across intranasal oxytocin studies have been inconsistent, and part of the explanation is dose, timing and delivery variability between protocols. It is also why concentration matters so much in the products themselves: two sprays at the same price are not the same product if one is twice the strength.\n\nNone of this is a recommendation. Oxytocin is a prescription medicine for human use in the UK, and research-grade material is sold as a laboratory reference standard under a research-use-only basis.",
      },
      {
        title: "Comparing a Spray Against the Vial Honestly",
        body: "The most common question in this category is why the spray costs several times what the equivalent quantity of peptide costs as a vial. The answer is not markup — it is that the two products differ in what has already been done to them.\n\nA vial contains lyophilised peptide, a stopper, a crimp and a box. A nasal spray contains a measured solution of that peptide in a defined vehicle, inside a metered pump device, sealed, labelled and packed for a category of shipping that treats liquids more strictly than powders. That work has a cost, and it is charged at retail.\n\nThe fair comparison is total cost to a usable state. If you hold sterile technique, a diluent and a device, the vial is cheaper. If you do not, the spray is cheaper than assembling the equivalent. Where the crossover falls depends on whether you need one bottle or six — for a single fill the equipment cost usually exceeds the gap; for repeat use it usually does not. Our tables show vials alongside sprays so both halves of that arithmetic are visible rather than asserted.",
      },
      {
        title: "What Would Change the Ranking",
        body: "Rankings should publish their own failure conditions. Three things would move this table.\n\nA supplier publishing a batch-linked COA where they previously had none would jump several places, because that is the heaviest single signal in the score. A supplier dropping domestic liquid shipping would fall, because availability of the format is a precondition for everything else. And a new entrant arriving with strong documentation at a competitive price would reorder the top of the table immediately — which is the main argument for regenerating this page rather than writing it once.\n\nIf you are comparing a supplier against this table and the result looks wrong, the check to run first is whether their COA is batch-linked or generic. That is where most of the spread comes from.",
      },
    ],
    faq: [
      {
        question: "What is the best oxytocin nasal spray peptide in the UK?",
        answer:
          "There is no single best. Our table ranks by published documentation first and price second, and shows both columns so you can see the trade-off. The highest-TrustScore listing is the best-documented; the lowest per-mL listing is the best value.",
      },
      {
        question: "Is a higher-priced spray better?",
        answer:
          "Not inherently. Price and documentation are separate axes. The useful question is whether the more expensive listing publishes a batch-linked COA that the cheaper one does not — if so, the premium buys evidence; if not, it buys nothing measurable.",
      },
      {
        question: "Does the concentration differ between UK suppliers?",
        answer:
          "It can, and it is frequently unstated. Where a supplier publishes strength we show it in the pack column. Where they do not, that silence is a factor in the ranking rather than a neutral gap.",
      },
      {
        question: "How is TrustScore calculated and is it a purity score?",
        answer:
          "TrustScore aggregates observable site signals — live domain, COA published, research-use disclaimer, reviews, shipping and contact information — into a 0–100 figure. It is not a purity measurement and we never describe it as one.",
      },
    ],
    sources: [
      {
        label:
          "Intranasal oxytocin: a systematic review of pharmacokinetics and behavioural effects (Neuroendocrinology, 2013)",
        url: "https://pubmed.ncbi.nlm.nih.gov/23689186/",
      },
      {
        label:
          "Oxytocin increases trust in humans — Nature (2005), the study that drove research interest in the nasal route",
        url: "https://pubmed.ncbi.nlm.nih.gov/15931222/",
      },
    ],
    tableMode: "trust",
    tableHeading: "Best Oxytocin Nasal Spray Peptide — Ranked by TrustScore",
    rowLimit: 25,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
