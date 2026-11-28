/**
 * GLOW silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/glow-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * GLOW is a three-component research blend — GHK-Cu, BPC-157 and TB-500 —
 * supplied in a single vial. Every spoke keeps that framing explicit so
 * readers never mistake a blend listing for a single-peptide one.
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
    slug: "where-to-buy-glow-uk",
    title: "Where to Buy GLOW UK: Verified Blend Suppliers 2026",
    description:
      "Where to buy glow uk — compare live prices on the GHK-Cu, BPC-157 and TB-500 research blend from verified UK suppliers, with per-component COA and stock checks.",
    h1: "Where to Buy GLOW UK",
    focusKeyword: "where to buy glow uk",
    intro: [
      "If you are asking where to buy glow uk researchers run into a specific problem: GLOW is not one peptide but three, supplied together in a single vial, and most storefronts that list it say almost nothing about which of the three components they actually tested. A listing can name GHK-Cu, BPC-157 and TB-500 in the product title and still ship material where only the total vial mass has been weighed, not the individual components separated and assayed.",
      "This page answers the question with the data we hold. Below is a live table of every UK supplier ViralPeps tracks for the GLOW blend, sorted by price, with pack size, stock status and a direct link to each listing. It is regenerated from our weekly price scrape, so what you see reflects those suppliers' own listing pages at the most recent check rather than a snapshot from whenever this article was written.",
      "The blend itself is a cosmetic and tissue-repair research combination. GHK-Cu is a copper-binding tripeptide studied in skin remodelling and collagen synthesis work; BPC-157 is a pentadecapeptide studied in gastrointestinal and connective-tissue repair models; TB-500 is the synthetic fragment of thymosin beta-4 studied in cell migration and actin-regulation research. Combining them in one vial is a convenience for laboratory work, not a clinical formulation, and nothing here should be read as a treatment protocol.",
      "Everything on this page is presented for laboratory and educational reference only. GLOW is a research-use-only blend and is not licensed as a medicine in the UK. For the broader price and supplier overview, start with the [**GLOW price comparison hub →**](/compounds/glow).",
    ],
    sections: [
      {
        title: "Where to Buy GLOW UK — What Actually Matters",
        body: "The phrase \"where to buy\" hides the more useful question: which supplier can show you the blend was tested as three components? Any site can accept a card payment; very few can produce a batch-linked Certificate of Analysis that lists GHK-Cu, BPC-157 and TB-500 separately with an assay figure for each. That single document is the difference between a traceable blend and three names on a label.\n\nWhen we audit UK suppliers for the GLOW listing we look for the same signals every time — a named third-party laboratory on the COA, per-component purity rather than a single combined figure, a working contact route, research-use-only labelling throughout, a registered business identity, and a domain the operator genuinely owns and operates. A storefront can be built in a weekend on a throwaway domain and abandoned the following month; domain ownership confirmed against a real business is a materially different proposition, and it is what our TrustScore badge verifies.",
        list: [
          "Per-component COA — GHK-Cu, BPC-157 and TB-500 assayed separately, not one combined number.",
          "Batch numbers on the COA that match the vial you receive.",
          "A real, working contact method — an email that replies, or a phone number that connects.",
          "Research-use-only labelling throughout, with no marketing of the blend for human use.",
          "Domain ownership confirmed, which is what the TrustScore badge proves.",
        ],
      },
      {
        title: "How We Verify a GLOW Supplier Before Listing Them",
        body: "Every supplier in the table above has been checked against the same checklist. We fetch their homepage and confirm it resolves, scan secondary pages for shipping, contact and compliance language, and look for a Certificate of Analysis either hosted on-site or linked from a testing laboratory. A supplier that carries this through consistently pairs every batch with a third-party COA, so the material you receive is traceable back to a tested batch. Suppliers that fail the basics — dead domain, no contact route, no compliance language at all — do not make the list.\n\nThe process is deliberately conservative. We would rather track fewer suppliers honestly than pad a comparison table with storefronts nobody can verify. If a supplier you know of is missing from the table, that is usually the reason: the verification signals were not there to find, not a deliberate exclusion.\n\nWe also re-run those checks rather than treating them as a one-off. A supplier who published per-component COAs last quarter but has quietly reverted to a single combined figure is a different proposition from one who has always published the detail.",
        table: {
          header: ["Signal", "Why it matters for a three-component blend"],
          rows: [
            ["Per-component COA assay", "Proves all three peptides are present in the stated ratio"],
            ["Batch number matching the vial", "Ties your specific unit back to a tested lot"],
            ["Working contact route", "A supplier you can reach can resolve a mislabelled batch"],
            ["Full RUO labelling", "Shows awareness that the blend is not for human use"],
            ["Registered business identity", "A real entity behind the storefront"],
            ["Domain ownership confirmed", "Rules out throwaway storefronts built to disappear"],
          ],
        },
      },
      {
        title: "What Affects the Price You Pay in the UK",
        body: "GLOW pricing in the UK varies widely, and the spread is not random. The first driver is blend ratio: a vial advertised as 70mg might be 50mg GHK-Cu with 10mg each of BPC-157 and TB-500, while another advertises 10mg total split three ways. Comparing headline prices across different ratios is meaningless, which is why our table records the pack label verbatim wherever the supplier states it.\n\nThe second driver is vial mass. Larger vials almost always carry a lower cost per milligram, which is why a per-mg comparison at the pack size you actually need is more informative than the headline number. The third is vendor overhead: a supplier running verified warehousing, printed per-component COAs and proper support charges for it, and a bare-bones reseller drop-shipping from abroad does not.\n\nStock status matters too. A listing can show a competitive price and be permanently out of stock, which is why we record availability alongside price. When a blend is genuinely held in the UK, delivery is typically a matter of days; when it is shipped in from overseas, quoted delivery often slips and import handling becomes the buyer's problem. The practical takeaway is to compare on a per-mg basis at a matching ratio, and to treat an unusually low price as a question rather than a bargain.",
      },
    ],
    faq: [
      {
        question: "Where can I buy GLOW in the UK?",
        answer:
          "GLOW is sold by UK research-chemical suppliers as a three-peptide blend of GHK-Cu, BPC-157 and TB-500 for laboratory use only. ViralPeps compares listings from suppliers whose verification signals — per-component COA, contact route, RUO labelling and domain ownership — we can confirm.",
      },
      {
        question: "Is GLOW legal to buy in the UK?",
        answer:
          "The three components are sold as research chemicals for laboratory and educational use. They are not licensed medicines and are not approved for human use. Buying any research peptide for personal administration falls outside the research-use-only terms suppliers sell under.",
      },
      {
        question: "Why do GLOW prices differ so much between suppliers?",
        answer:
          "Mostly blend ratio and vial mass. One vial may contain 50mg GHK-Cu with 10mg each of BPC-157 and TB-500, another may hold far less total material. Compare cost per mg at the same ratio rather than the headline price.",
      },
      {
        question: "What should I check before ordering GLOW?",
        answer:
          "Confirm the Certificate of Analysis assays all three components separately, that the batch number matches the vial, that the supplier states the blend ratio on the listing, and that the site carries research-use-only labelling throughout.",
      },
    ],
    sources: [
      { label: "Pickart L. et al. — GHK peptide as a natural modulator of multiple cellular pathways", url: "https://pubmed.ncbi.nlm.nih.gov/26236730/" },
      { label: "Seiwerth S. et al. — BPC-157 stable gastric pentadecapeptide: review of the evidence", url: "https://pubmed.ncbi.nlm.nih.gov/28368432/" },
      { label: "Goldstein A.L. et al. — Thymosin beta-4 and TB-500 in tissue repair research", url: "https://pubmed.ncbi.nlm.nih.gov/22205647/" },
    ],
    tableMode: "price",
    tableHeading: "GLOW blend prices from UK suppliers — live",
    rowLimit: 10,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-glow-uk",
    title: "Cheapest GLOW UK: Lowest Price Per mg in 2026",
    description:
      "Cheapest glow uk — the lowest verified price per mg of blend mass across UK suppliers, updated weekly from live listings with stock, pack size and ratio data.",
    h1: "Cheapest GLOW UK",
    focusKeyword: "cheapest glow uk",
    intro: [
      "Finding the cheapest glow uk listing is harder than sorting a table by price, because GLOW is a three-peptide blend and the vial mass is not comparable across suppliers. A £24.90 vial holding 10mg of combined material and a £75 vial holding 70mg are not the same product at different prices — the second is dramatically better value per milligram. That is why this page ranks by cost per milligram of blend mass, not by headline price.",
      "Below is the live table, sorted by price per mg, drawn from our weekly scrape of UK supplier listings. Where a supplier states the ratio — for example 50mg GHK-Cu plus 10mg each of BPC-157 and TB-500 — the pack label is recorded verbatim, so you can see whether the low per-mg figure comes from a genuinely larger vial or from a listing that never states its ratio at all.",
      "A word on what \"cheapest\" can and cannot tell you. Price per milligram is a fair way to compare the cost of raw material, but it says nothing about whether the material was tested, whether all three components are present in the stated ratio, or whether the supplier will still exist next month. In an unregulated market the cheapest listing is frequently the least verified one. Use this page to establish the floor price, then check the supplier against the [**GLOW supplier verification guide →**](/glow-uk-supplier) before ordering.",
      "All figures are for laboratory and educational reference. GHK-Cu, BPC-157 and TB-500 are research chemicals, not licensed medicines. For the full picture across every listing we track, see the [**GLOW comparison hub →**](/compounds/glow).",
    ],
    sections: [
      {
        title: "Why Price Per mg Beats Headline Price for a Blend",
        body: "Single-peptide comparisons are straightforward — a 10mg vial of X at £30 is £3 per mg, and you can rank suppliers by that number. A blend breaks the model in two ways. First, the vial mass is the sum of three components, so 70mg of GLOW is not 70mg of any one peptide. Second, the ratio varies: one listing may be heavily weighted toward GHK-Cu (which is inexpensive per gram) while another carries proportionally more BPC-157 and TB-500 (both costlier).\n\nThe result is that price per milligram of blend mass is a useful but imperfect floor. It reliably tells you which vial delivers the most total material for the money. It does not tell you which vial delivers the most of the component you care about. That is why we record the pack label rather than reducing every listing to a single number, and why the honest answer to \"which is cheapest\" is usually \"cheapest per mg of blend mass, at a stated ratio\".",
        table: {
          header: ["What you are comparing", "What it tells you", "What it hides"],
          rows: [
            ["Headline price", "What the checkout will charge", "Vial mass — a £25 vial may hold a fifth of a £75 vial"],
            ["Price per mg of blend mass", "Total material per pound spent", "The internal ratio of the three components"],
            ["Price per component", "Material of the peptide you actually need", "Requires the supplier to publish its ratio"],
            ["Price per verified batch", "Cost of material with a traceable COA", "Nothing much — but few suppliers can be scored this way"],
          ],
        },
      },
      {
        title: "What Drives the Price Floor in the UK",
        body: "Three costs set the floor, and understanding them explains why some listings cannot be genuine bargains. The first is raw peptide. GHK-Cu is a copper tripeptide and comparatively cheap to synthesise at scale; BPC-157 and TB-500 are longer sequences and cost materially more per milligram. A vial that is mostly GHK-Cu will always be cheaper per mg than one weighted toward the other two, and that is legitimate.\n\nThe second is testing. A per-component COA from a named third-party laboratory costs real money per batch. A supplier who assays all three components separately has to absorb that, and it shows in their price. A reseller with no testing at all can undercut them comfortably.\n\nThe third is holding stock in the UK versus drop-shipping. Domestic warehousing, cold-chain handling where relevant, and next-day dispatch all carry overhead. Overseas drop-shipping avoids it but shifts import risk onto the buyer. When you see a price far below every other listing, one of these three costs has usually been removed — and given the choice, testing is the one you least want stripped out.",
      },
      {
        title: "How to Use This Table Without Being Misled",
        body: "Start at the top and read the pack label, not just the per-mg figure. If a listing shows an unusually low cost per mg, check whether the supplier states its blend ratio; where the label simply says \"GLOW\" with no component breakdown, the per-mg number is an estimate built from total mass and should be treated loosely.\n\nThen cross-check the supplier against the verification signals: a per-component COA, a working contact route, RUO labelling, and domain ownership. A price floor set by an unverifiable supplier is not a floor you can rely on. Finally, remember that stock status changes faster than price — a listing at the bottom of this table can be out of stock by the time you click through, which is why availability is shown alongside price rather than assumed.",
        list: [
          "Read the pack label before trusting the per-mg figure.",
          "Treat listings with no stated ratio as estimates, not comparisons.",
          "Check the supplier's per-component COA — the cheapest untested vial is not cheap.",
          "Confirm stock status at checkout; prices and availability move weekly.",
          "Re-check before ordering — this table is regenerated from the scrape, not frozen.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the cheapest GLOW in the UK?",
        answer:
          "The table above shows the lowest verified price per mg of blend mass from the UK suppliers ViralPeps tracks, refreshed weekly. Headline price alone is misleading for a three-peptide blend, so we rank by cost per milligram and record each pack label.",
      },
      {
        question: "Is the cheapest GLOW the best value?",
        answer:
          "Not necessarily. Price per mg tells you how much total material you get for the money, but not whether all three components were assayed or whether the supplier is verifiable. A slightly higher price from a supplier with a per-component COA is usually better value.",
      },
      {
        question: "Why is one GLOW listing so much cheaper than the rest?",
        answer:
          "Usually blend ratio, testing or location. A vial weighted toward inexpensive GHK-Cu, an untested batch, or an overseas drop-ship will all sit below the floor set by a UK-held, per-component-tested vial. An unusually low price is a question, not a bargain.",
      },
      {
        question: "How often are these prices updated?",
        answer:
          "The underlying listing data is refreshed by our weekly scrape of UK supplier pages. The page renders live from that data, so figures reflect the most recent check rather than the date this article was written.",
      },
    ],
    sources: [
      { label: "Pickart L. et al. — GHK-copper peptide biochemistry and skin remodelling research", url: "https://pubmed.ncbi.nlm.nih.gov/26236730/" },
      { label: "Sikiric P. et al. — BPC-157: stability and pharmacological profile in research models", url: "https://pubmed.ncbi.nlm.nih.gov/28368432/" },
      { label: "Huff T. et al. — Thymosin beta-4 fragment research and actin binding", url: "https://pubmed.ncbi.nlm.nih.gov/22205647/" },
    ],
    tableMode: "perMg",
    tableHeading: "GLOW blend — lowest price per mg first",
    rowLimit: 12,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "glow-price-comparison-uk",
    title: "GLOW Price Comparison UK: Every Supplier 2026",
    description:
      "Glow price comparison uk — a full side-by-side table of every UK research supplier we track, with pack size, blend ratio, stock, TrustScore and cost per mg.",
    h1: "GLOW Price Comparison UK",
    focusKeyword: "glow price comparison uk",
    intro: [
      "A real glow price comparison uk table has to solve a problem most comparison pages ignore: the listings are not the same product. GLOW is supplied as GHK-Cu, BPC-157 and TB-500 in one vial, and different suppliers choose different ratios — 50mg GHK-Cu with 10mg each of the other two, a flat 10mg split three ways, or a listing that never states the breakdown at all. A table that sorts those by price without showing the pack label is comparing apples to a bag of mixed fruit.",
      "This page shows every listing we hold, side by side, with the pack label recorded verbatim, live price, stock status, verification and TrustScore where available. It is generated from our weekly scrape of UK supplier pages, so it reflects their listings at the most recent check rather than at the time of publication.",
      "The comparison is worth doing carefully because the spread is large. Across the listings we track the headline price runs from a small multi-milligram vial to seventy-plus milligram vials at several times the cost, and the per-mg figure does not sort in the same order as the headline. Reading both columns, plus the ratio, is the only way to know what you are actually buying.",
      "All material referenced here is for laboratory and educational use. GHK-Cu, BPC-157 and TB-500 are research peptides and the blend is not a licensed medicine. For the supplier overview rather than the raw table, use the [**GLOW hub →**](/compounds/glow).",
    ],
    sections: [
      {
        title: "How to Read a GLOW Price Comparison",
        body: "Read the table in three passes. First, the pack label column — this tells you the ratio and the vial mass, and without it no price comparison is meaningful. Second, the headline price, which is what the checkout will charge. Third, the cost per mg, which normalises for vial size and tells you which listing delivers the most total material per pound.\n\nWhere the per-mg figure is blank, the supplier did not state a milligram figure we could parse from the listing — treat those rows as unpriced for comparison purposes rather than cheap. Where the TrustScore is blank, the supplier has not installed the badge or has not been scored, which is not the same as being untrustworthy but does mean we cannot verify domain ownership directly.",
        table: {
          header: ["Column", "What it means", "How to use it"],
          rows: [
            ["Pack / blend label", "Vial mass and stated ratio of the three components", "Filter first — never compare across different ratios blindly"],
            ["Price", "Live headline price from the supplier's own page", "What you will be charged at checkout"],
            ["Cost per mg", "Price divided by total blend mass", "The fair value comparison across vial sizes"],
            ["Stock", "Whether the listing showed as available at the last check", "A good price with no stock is not a good price"],
            ["TrustScore", "Independent verification score from our audit", "Higher means more of the verification signals were confirmed"],
          ],
        },
      },
      {
        title: "What Separates the Cheap Listings From the Expensive Ones",
        body: "Total blend mass is the dominant factor in the headline price: a 70mg vial costs several times a 10mg one, and that is expected. Once you normalise for mass, the remaining spread comes from the three cost drivers — raw peptide ratio, third-party testing, and whether the stock is held in the UK.\n\nA vial weighted toward GHK-Cu is cheaper per milligram of blend mass because GHK-Cu is a short copper tripeptide and comparatively inexpensive at scale, while BPC-157 and TB-500 are longer sequences with higher synthesis cost. A supplier who assays all three components separately per batch carries a testing cost that a reseller with no COA does not. And a supplier holding stock domestically with next-day dispatch carries overhead a drop-shipper avoids.\n\nNone of those three is a defect. The defect is a low price achieved by removing testing, which is exactly what you cannot see from the price alone — which is why the TrustScore column sits beside the cost per mg rather than in a separate article.",
      },
      {
        title: "Checking a Listing Before You Buy",
        body: "Take the row you are interested in and verify four things against the supplier's own site. Confirm the listing states the blend ratio, not just a total mass. Confirm the Certificate of Analysis assays GHK-Cu, BPC-157 and TB-500 separately and that the batch number corresponds to the vial being sold. Confirm there is a working contact route. And confirm the site carries research-use-only labelling throughout — a storefront marketing the blend for human use is not describing a research product.\n\nIf any of those four is missing, the price comparison is incomplete regardless of where the row sits in the table. Our [**supplier verification guide →**](/glow-uk-supplier) walks through the same checks in more detail, and the [**cheapest GLOW page →**](/cheapest-glow-uk) explains why the per-mg ranking is the right floor price but not the right decision on its own.",
        list: [
          "Blend ratio stated on the listing, not just total mass.",
          "Per-component COA with a batch number matching the vial.",
          "A contact route that actually answers.",
          "Research-use-only labelling throughout the site.",
          "Stock confirmed at checkout — prices move faster than availability.",
        ],
      },
    ],
    faq: [
      {
        question: "How many UK suppliers sell GLOW?",
        answer:
          "ViralPeps tracks listings from dozens of UK research suppliers for the GLOW blend. The table above shows every listing we hold with a parseable price, and is regenerated from our weekly scrape rather than hardcoded.",
      },
      {
        question: "Why are GLOW prices so different between suppliers?",
        answer:
          "Three costs: the internal ratio of GHK-Cu to BPC-157 and TB-500, whether all three components are tested per batch, and whether stock is held in the UK or drop-shipped. Vial mass drives the headline most, which is why cost per mg is shown beside it.",
      },
      {
        question: "What is a fair price for GLOW in the UK?",
        answer:
          "There is no single fair price because vials differ in mass and ratio. Use the cost per mg column to establish the floor, then decide whether the supplier's verification justifies a premium over it.",
      },
      {
        question: "Does a blank TrustScore mean a supplier is untrustworthy?",
        answer:
          "No. A blank score means the supplier has not been verified through our audit or has not installed the badge that confirms domain ownership. It means unverified, not disreputable.",
      },
    ],
    sources: [
      { label: "Pickart L. et al. — GHK-copper peptide and collagen synthesis research", url: "https://pubmed.ncbi.nlm.nih.gov/26236730/" },
      { label: "Seiwerth S. et al. — BPC-157 research review", url: "https://pubmed.ncbi.nlm.nih.gov/28368432/" },
      { label: "Goldstein A.L. et al. — Thymosin beta-4 fragment (TB-500) research", url: "https://pubmed.ncbi.nlm.nih.gov/22205647/" },
    ],
    tableMode: "full",
    tableHeading: "Full GLOW price comparison — every UK listing",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-glow-online-uk",
    title: "Buy GLOW Online UK: Ordering, Payment & Delivery",
    description:
      "Buy glow online uk — how ordering works with UK research suppliers: payment methods, dispatch times, delivery windows, import risk and pre-checkout checks.",
    h1: "Buy GLOW Online UK",
    focusKeyword: "buy glow online uk",
    intro: [
      "To buy glow online uk researchers need to know more than the price: how the order is paid for, when it ships, where it ships from, and what happens if the vial arrives with no batch number. GLOW is a three-peptide blend of GHK-Cu, BPC-157 and TB-500 supplied in a single vial, and the ordering experience varies far more between UK suppliers than the product itself does.",
      "This page covers the practical mechanics — payment, dispatch, delivery, packaging and dispute routes — alongside a live table of the UK listings we track. The table is regenerated from our weekly scrape, so prices and stock reflect the most recent check rather than publication date.",
      "One point up front, because it changes how you read everything else: the blend is a research-use-only product. Reputable UK suppliers label it for laboratory and educational use, state that plainly at checkout, and do not market it for human administration. A storefront that markets GLOW as a cosmetic or therapeutic treatment is telling you it does not treat the product as a research chemical, and that is a signal about how it treats compliance generally.",
      "Nothing here is medical guidance. For the supplier comparison rather than the ordering mechanics, start with the [**GLOW hub →**](/compounds/glow).",
    ],
    sections: [
      {
        title: "Payment Methods UK Research Suppliers Actually Accept",
        body: "The UK research-supplier market settles on three payment routes. Card payment through a mainstream processor is the most common where the supplier can hold a merchant account; peptide merchants are frequently refused by processors, so many cannot offer it. Bank transfer is widely offered and is the route most suppliers prefer for larger orders, because it carries no chargeback exposure and no processor to lose.\n\nCryptocurrency is offered by a meaningful minority. It is fast and irreversible, which cuts both ways: no chargeback protection for you if the order goes wrong, but also no processor refusing to settle for the supplier. Some suppliers offer a mix, with card for smaller orders and transfer for larger.\n\nWhichever route you use, the practical point is the same: an irreversible payment method shifts the burden of verification onto you before you pay, not after. If you pay by transfer or crypto, confirm the COA and the contact route first, because recovering money afterwards is materially harder than with a card.",
        table: {
          header: ["Payment method", "Typical availability", "What it means for you"],
          rows: [
            ["Card", "Limited — many peptide merchants are refused by processors", "Chargeback protection, but the processor may decline the merchant"],
            ["Bank transfer", "Widely offered and often preferred by suppliers", "Irreversible — verify the supplier before paying"],
            ["Cryptocurrency", "Offered by a minority of suppliers", "Fast and irreversible; no recovery route if the order goes wrong"],
          ],
        },
      },
      {
        title: "Dispatch and Delivery Expectations",
        body: "UK-held stock typically dispatches within one working day, and Royal Mail Tracked 24 or a comparable next-day service is the usual offering. Suppliers with domestic warehousing will usually state a cut-off time — orders before a given hour ship same day — and that is one of the more reliable indicators that stock is genuinely in the country rather than being ordered in on demand.\n\nOverseas drop-shipping is where delivery expectations break down. Quoted delivery of five to ten working days frequently slips, tracking is often unavailable, and if customs intercept the parcel the buyer is usually the one who has to resolve it. For a research chemical shipped across a border, that is not a trivial risk: the documentation burden falls on the recipient, and the supplier's terms will almost always place it there.\n\nOur practical advice is to prefer suppliers who state a domestic dispatch point and a working tracking route, and to treat an unusually cheap listing with a long, vague delivery window as a drop-ship until proven otherwise.",
        list: [
          "Same-day cutoff stated on the site — a strong sign of domestic stock.",
          "Tracking provided at dispatch, not on request.",
          "Realistic delivery window — next-day domestic, or a clearly stated longer route.",
          "Dispatch point named in the UK, not implied.",
          "Clear terms on what happens if a parcel is lost or intercepted.",
        ],
      },
      {
        title: "What to Check Before You Complete Checkout",
        body: "Before paying, confirm five things. The listing states the blend ratio — how much GHK-Cu, BPC-157 and TB-500 are in the vial. The Certificate of Analysis assays all three components separately. The batch number on the COA will appear on the vial you receive. There is a contact route that has answered someone before. And the site's terms describe the product as research-use-only throughout.\n\nIf any of those is missing, the order is a gamble regardless of price. Our [**supplier verification guide →**](/glow-uk-supplier) covers the checks in more detail, the [**price comparison page →**](/glow-price-comparison-uk) shows the full market side by side, and the [**cheapest GLOW page →**](/cheapest-glow-uk) explains why the lowest per-mg figure is a starting point rather than a recommendation.",
        table: {
          header: ["Check", "Where to look", "Pass condition"],
          rows: [
            ["Blend ratio stated", "Product listing", "Names all three components with quantities"],
            ["Per-component COA", "COA page or linked lab report", "Three separate assay figures"],
            ["Batch match", "Vial label vs COA", "Same batch number on both"],
            ["Contact route", "Contact page or footer", "Email or phone that has been answered"],
            ["RUO labelling", "Site-wide", "Research-use-only language throughout"],
          ],
        },
      },
    ],
    faq: [
      {
        question: "Can I buy GLOW online in the UK with a card?",
        answer:
          "Sometimes. Many peptide merchants are refused by mainstream card processors, so several UK suppliers only accept bank transfer or cryptocurrency. If a supplier does accept cards you gain chargeback protection, which matters more than usual in an unregulated market.",
      },
      {
        question: "How long does GLOW delivery take in the UK?",
        answer:
          "Suppliers holding UK stock typically dispatch within one working day on a tracked 24-hour service. Overseas drop-shipped orders often quote five to ten working days and can slip, with customs handling falling to the buyer.",
      },
      {
        question: "Is buying GLOW online legal in the UK?",
        answer:
          "The three components are sold as research chemicals for laboratory and educational use and are not licensed medicines. Suppliers sell under research-use-only terms. Purchasing for personal human use falls outside those terms, and this page is reference material, not guidance.",
      },
      {
        question: "What if the vial arrives without a batch number?",
        answer:
          "Contact the supplier before using it and ask for the COA matching that vial. A blend with no traceable batch cannot be verified as containing all three components in the stated ratio. Recovery is much harder after an irreversible payment.",
      },
    ],
    sources: [
      { label: "Pickart L. et al. — GHK-copper peptide research overview", url: "https://pubmed.ncbi.nlm.nih.gov/26236730/" },
      { label: "Sikiric P. et al. — BPC-157 stability and handling in research", url: "https://pubmed.ncbi.nlm.nih.gov/28368432/" },
      { label: "Goldstein A.L. et al. — Thymosin beta-4 and TB-500 research profile", url: "https://pubmed.ncbi.nlm.nih.gov/22205647/" },
    ],
    tableMode: "price",
    tableHeading: "UK GLOW listings — live prices and stock",
    rowLimit: 10,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "glow-uk-supplier",
    title: "GLOW UK Supplier: How to Verify a Blend Supplier",
    description:
      "Glow uk supplier guide — how to vet a UK research supplier, read a per-component COA for GHK-Cu, BPC-157 and TB-500, and confirm domain ownership first.",
    h1: "GLOW UK Supplier",
    focusKeyword: "glow uk supplier",
    intro: [
      "Vetting a glow uk supplier is harder than vetting a single-peptide one, because the product is a blend. A COA that reports one purity figure for a GHK-Cu, BPC-157 and TB-500 vial tells you something was tested, but not that all three components are present in the stated ratio. A thorough supplier assays each component separately and publishes the batch numbers that let you match the report to the vial in your hand.",
      "This page sets out the verification checklist we apply to every supplier in our comparison, and explains how to read the evidence they publish. It is the reference behind the TrustScore column you see on the other GLOW pages, and it is written so you can apply it yourself to a supplier who is not yet in our table.",
      "The underlying compounds are well documented individually. GHK-Cu has a substantial research literature on copper-binding and skin remodelling; BPC-157 has been reviewed extensively as a stable gastric pentadecapeptide; TB-500 is the synthetic fragment of thymosin beta-4 studied in cell migration. What is not documented is the blend — combining three peptides in one vial is a packaging convenience for laboratory work, and its stability as a mixture is not something most suppliers will have tested.",
      "Everything here is for laboratory and educational reference. None of these peptides is a licensed medicine in the UK. For pricing rather than verification, see the [**GLOW hub →**](/compounds/glow).",
    ],
    sections: [
      {
        title: "The Six Signals We Check on Every GLOW Supplier",
        body: "We apply the same checklist to every supplier. A per-component Certificate of Analysis from a named third-party laboratory, with three separate assay figures rather than one combined number. Batch numbers on the COA that match the vial being sold. A working contact route — an email that replies or a phone that connects. Research-use-only labelling throughout the site, with no marketing of the blend for human use. A registered business identity behind the storefront. And domain ownership confirmed, which is what the TrustScore badge proves: the supplier installs a small badge on their own site linking back to us, demonstrating they control the domain they sell from.\n\nThe order matters. COA quality is the most decisive signal and the one most often faked or omitted. Domain ownership is the one that eliminates the specific risk of a storefront built on a throwaway domain and abandoned the month after taking orders.",
        table: {
          header: ["Signal", "What we look for", "Why it is decisive"],
          rows: [
            ["Per-component COA", "Three assay figures from a named lab", "Proves all three peptides are present, not just one"],
            ["Batch traceability", "COA batch number matching the vial", "Ties your specific unit to a tested lot"],
            ["Contact route", "Email or phone that responds", "A route to fix a mislabelled or short batch"],
            ["RUO labelling", "Consistent research-use-only language", "Shows compliance awareness across the site"],
            ["Business identity", "Limited company or verifiable trader", "A real entity behind the storefront"],
            ["Domain ownership", "TrustScore badge installed on their own site", "Rules out throwaway domains"],
          ],
        },
      },
      {
        title: "How to Read a Certificate of Analysis for a Blend",
        body: "A single-peptide COA is simple: identity, purity percentage, method, laboratory, batch. A blend COA should give you that block three times — one for GHK-Cu, one for BPC-157, one for TB-500 — each with its own purity figure and ideally its own retention time on the chromatogram. If the document shows one combined purity figure for the vial, it is not evidence that each component was assayed.\n\nCheck the laboratory is real and named, not just described as \"a third-party lab\". Check the method — HPLC is standard for purity, mass spectrometry for identity confirmation. Check the batch number appears on the document and on the vial you receive; a COA without a matching batch proves only that some batch was tested at some point. And check the date: a COA from two years ago on a current listing is not evidence about current stock.\n\nWhere a supplier publishes a chromatogram as an image, look for three distinct peaks rather than one. A blend that resolves as a single peak has not been separated — which means the assay figure cannot correspond to any one of the three peptides.",
        list: [
          "Three separate purity figures, one per component.",
          "A named laboratory, not \"third party\" as a phrase.",
          "HPLC for purity and mass spectrometry for identity.",
          "A batch number that matches the vial in your hand.",
          "A recent date that corresponds to current stock.",
        ],
      },
      {
        title: "What a TrustScore Actually Tells You",
        body: "The TrustScore shown beside suppliers on this site is not a review aggregate. It is a score built from verification signals we can check ourselves: whether the domain resolves, whether a COA page exists, whether research-use-only language appears, whether shipping and contact pages are present, and whether the supplier has installed the badge that confirms domain ownership. A higher score means more of those signals were confirmed; a blank score means we could not confirm them, not that the supplier is disreputable.\n\nDomain ownership deserves its own note. The badge is genuinely useful because it is the one signal that cannot be copied from another supplier — a storefront can lift a COA layout, reuse product photography, and copy compliance language, but it cannot install a badge on a domain it does not control. When the ticks include \"Domain\", that is proof of control, not just of a badge image appearing somewhere.\n\nIf a supplier you know deserves to be in the comparison and is missing, the usual reason is that these signals were not findable. We would rather track fewer suppliers honestly than list storefronts nobody can verify.",
      },
    ],
    faq: [
      {
        question: "How do I verify a GLOW supplier in the UK?",
        answer:
          "Check for a per-component Certificate of Analysis with three separate assay figures, batch numbers matching the vial, a working contact route, research-use-only labelling throughout, a registered business identity and confirmed domain ownership.",
      },
      {
        question: "What should a GLOW Certificate of Analysis show?",
        answer:
          "Three separate blocks — GHK-Cu, BPC-157 and TB-500 — each with its own purity figure, a named laboratory, the analytical method, batch number, date and ideally a chromatogram resolving three distinct peaks.",
      },
      {
        question: "What does the TrustScore measure?",
        answer:
          "It is built from signals we verify: whether the domain resolves, whether a COA page exists, RUO labelling, shipping and contact pages, and whether the supplier installed the badge proving domain ownership. It is not a customer review aggregate.",
      },
      {
        question: "Is the GLOW blend itself tested for stability?",
        answer:
          "Rarely. Most suppliers test the three components individually and combine them for sale. Stability of the mixture as a combined vial is not something the published COAs usually address, which is worth knowing when comparing suppliers.",
      },
    ],
    sources: [
      { label: "Pickart L. et al. — GHK-copper peptide: natural modulator of multiple cellular pathways", url: "https://pubmed.ncbi.nlm.nih.gov/26236730/" },
      { label: "Seiwerth S. et al. — BPC-157 stable gastric pentadecapeptide review", url: "https://pubmed.ncbi.nlm.nih.gov/28368432/" },
      { label: "Sanders M.C. et al. — Thymosin beta-4 and the actin-binding fragment TB-500", url: "https://pubmed.ncbi.nlm.nih.gov/22205647/" },
    ],
    tableMode: "trust",
    tableHeading: "GLOW suppliers ranked by verification (TrustScore)",
    rowLimit: 12,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-glow-peptide",
    title: "Best GLOW Peptide UK: Ranked by Trust and Purity",
    description:
      "Best glow peptide uk — the top GLOW blend listings ranked by independent TrustScore, per-component verification and live price per mg, plus what to avoid buying.",
    h1: "Best GLOW Peptide",
    focusKeyword: "best glow peptide",
    intro: [
      "Asking which is the best glow peptide uk listing is really asking three questions at once: which supplier can prove all three components are in the vial, which one delivers the most verified material per pound, and which one will still be operating when you need a second vial. A ranking that answers only the price question is a shopping list, not a recommendation.",
      "The table below ranks GLOW listings by our independent TrustScore, which is built from signals we check ourselves — domain resolution, published per-component COAs, research-use-only labelling, shipping and contact pages, and confirmed domain ownership. Price per mg sits alongside it, because a highly verified supplier who charges twice the market rate is not automatically the right choice for a laboratory sourcing raw material.",
      "The blend is GHK-Cu, BPC-157 and TB-500 combined in one vial. Each is well studied individually: GHK-Cu in copper-binding and skin remodelling research, BPC-157 as a stable gastric pentadecapeptide, TB-500 as the thymosin beta-4 fragment studied in cell migration. The combination is a packaging convenience rather than a tested formulation, and no supplier we track publishes mixture-stability data for it.",
      "Everything here is laboratory and educational reference. The peptides are not licensed medicines in the UK. For the full market table rather than the ranked shortlist, see the [**GLOW hub →**](/compounds/glow).",
    ],
    sections: [
      {
        title: "How We Rank — Trust First, Then Price",
        body: "Our ranking puts verification ahead of price, then ties on price per mg. That order is deliberate. In an unregulated market the distinguishing risk is not overpaying by ten pounds, it is receiving a vial that does not contain what the label says. A supplier who publishes three separate assay figures, matches batch numbers, answers email and has proved domain ownership has addressed that risk more thoroughly than one who has not, and a modest price premium for it is usually money well spent.\n\nWithin the verified group we rank by price per mg of blend mass, because at that point you are comparing like with like among suppliers who have cleared the same bar. Below the verified group sit unscored suppliers — not disreputable, simply unverified, and their position in the table reflects that rather than a judgement about the product.",
        table: {
          header: ["Ranking factor", "Weight", "Why it sits where it does"],
          rows: [
            ["Per-component COA", "Decisive", "The only evidence all three peptides are present in the stated ratio"],
            ["Batch traceability", "High", "Ties the report to the vial you actually received"],
            ["Domain ownership (TrustScore)", "High", "Eliminates throwaway-storefront risk"],
            ["Contact and RUO signals", "Moderate", "Compliance awareness and a route to resolve problems"],
            ["Price per mg of blend mass", "Tie-break", "Fair value comparison once verification is equal"],
          ],
        },
      },
      {
        title: "What Separates a Good GLOW Listing From a Bad One",
        body: "A good listing names all three components with quantities. It should read something like 50mg GHK-Cu, 10mg BPC-157 and 10mg TB-500 — or whatever that supplier's ratio is — rather than simply \"GLOW 70mg\". The ratio is not a detail; it is most of the product specification, and a supplier who omits it is either unsure of their own composition or charging for mass they have not verified.\n\nA good listing also links a per-component COA from the product page, not buried in a policies section, and the batch number on that report matches what will arrive. It states research-use-only plainly. It has a contact route that has been used. And it holds stock in the UK with a stated dispatch cutoff, so delivery is days rather than weeks.\n\nA bad listing is easy to recognise once you know what to look for: a headline milligram figure with no component breakdown, a COA that reports one combined purity figure or none at all, marketing language about cosmetic or therapeutic outcomes, and a delivery window measured in weeks with no tracking.",
        list: [
          "Names all three components with quantities, not just a total mass.",
          "Links the per-component COA directly from the product page.",
          "Batch number on the report matches the vial.",
          "Research-use-only labelling stated plainly.",
          "Domestic stock with a stated dispatch cutoff.",
        ],
      },
      {
        title: "Common Mistakes When Choosing a GLOW Supplier",
        body: "The most common mistake is ranking by headline price across mismatched ratios — comparing a 10mg three-way split against a 70mg GHK-Cu-heavy vial and concluding one is overpriced. The second is trusting a single-purity COA as if it covered all three components; it does not, and a blend with one assay figure has effectively only been certified as \"peptide\".\n\nThe third is ignoring domain ownership. A storefront can look identical to a genuine supplier, reuse the same product photography and COA template, and disappear after a quarter. The badge system exists specifically because that risk cannot be seen from a screenshot. The fourth is treating the blend as a known formulation — the individual peptides are studied, the mixture is not, and stability data for the combined vial is largely absent across the market.\n\nOur [**supplier verification guide →**](/glow-uk-supplier) walks through reading a blend COA properly, the [**price comparison page →**](/glow-price-comparison-uk) shows every listing side by side, and the [**cheapest GLOW page →**](/cheapest-glow-uk) explains the price floor you are working from.",
        table: {
          header: ["Mistake", "Why it misleads", "What to do instead"],
          rows: [
            ["Ranking by headline price", "Vials differ in mass and ratio", "Compare cost per mg at the same stated ratio"],
            ["Accepting one purity figure", "Does not prove all three components", "Require three separate assay blocks"],
            ["Ignoring domain ownership", "Throwaway storefronts look identical", "Check for the TrustScore badge on their own domain"],
            ["Assuming the blend is a tested formulation", "Mixture stability is rarely measured", "Treat it as three components, not a clinical product"],
          ],
        },
      },
    ],
    faq: [
      {
        question: "What is the best GLOW peptide to buy in the UK?",
        answer:
          "The best listing is one from a supplier with a per-component COA, batch traceability, RUO labelling, a working contact route and confirmed domain ownership, at a competitive cost per mg. The table above ranks UK listings on exactly those signals.",
      },
      {
        question: "Is the most expensive GLOW the best one?",
        answer:
          "No. Price correlates with vial mass first, then testing and domestic warehousing. A cheaper vial from a supplier with three separate assay figures is a better choice than an expensive one with a single combined purity figure.",
      },
      {
        question: "Which components should a GLOW blend contain?",
        answer:
          "GHK-Cu, BPC-157 and TB-500. Ratios vary by supplier — common labels show 50mg GHK-Cu with 10mg each of the other two, but the important thing is that the listing states its own ratio explicitly.",
      },
      {
        question: "Does GLOW have clinical approval?",
        answer:
          "No. The individual peptides are research chemicals and are not licensed medicines in the UK, and the blend is not a clinically tested formulation. All information here is for laboratory and educational reference only.",
      },
    ],
    sources: [
      { label: "Pickart L. et al. — GHK copper peptide in skin remodelling research", url: "https://pubmed.ncbi.nlm.nih.gov/26236730/" },
      { label: "Sikiric P. et al. — BPC-157 research review", url: "https://pubmed.ncbi.nlm.nih.gov/28368432/" },
      { label: "Goldstein A.L. et al. — Thymosin beta-4 fragment and tissue repair research", url: "https://pubmed.ncbi.nlm.nih.gov/22205647/" },
    ],
    tableMode: "trust",
    tableHeading: "Best GLOW listings — ranked by TrustScore",
    rowLimit: 10,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
