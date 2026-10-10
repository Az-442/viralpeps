/**
 * GHK-Cu silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/ghk-cu-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — autocomplete evidence pulled live from Google UK (2026-10-10):
 *   1. where to buy ghk-cu uk   → real UK hits (`where to buy ghk cu uk`, `where to buy ghk cu peptide uk`)
 *   2. cheapest ghk-cu uk       → 0 UK results — substituted `cheapest ghk cu` (exact #1 / #2)
 *   3. ghk-cu price comparison uk → 0 UK results — substituted `ghk cu price uk` (exact #1)
 *   4. buy ghk-cu online uk     → real UK hit (`ghk cu buy online uk`)
 *   5. ghk-cu uk supplier       → exact match #1 (`ghk cu uk supplier`)
 *   6. best ghk-cu peptide      → exact match #1 (`best ghk cu peptide` / `best ghk-cu peptide`)
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
    slug: "where-to-buy-ghk-cu-uk",
    title: "Where to Buy GHK-Cu UK: Verified Suppliers Compared",
    description:
      "Where to buy GHK-Cu UK — compare live prices from every verified UK research supplier, then check Certificate of Analysis, stock and shipping before ordering.",
    h1: "Where to Buy GHK-Cu UK",
    focusKeyword: "where to buy ghk-cu uk",
    intro: [
      "The search for where to buy GHK-Cu UK leads into one of the deepest supplier pools in the UK research-peptide market — and one of the most confusing, because GHK-Cu is a compound that is sold as two very different products. GHK-Cu is the copper(II) complex of the tripeptide glycyl-L-histidyl-L-lysine: a three-amino-acid sequence that occurs naturally in human plasma, saliva and urine, and that binds copper with unusual affinity. Depending on which listing you land on, you may be looking at a lyophilised research powder, a cosmetic-grade serum, or a hydrogel-embedded dermal product — and the price, the purity standard and the reason for buying could not be more different.",
      "This page answers the question with evidence rather than adjectives: a live table of every UK supplier ViralPeps tracks for GHK-Cu, showing pack size, headline price, cost per milligram, stock status, verification state and a direct link to the supplier's own product page. The table is rebuilt from suppliers' published pages on a weekly cycle, so the figures reflect their most recent state rather than a snapshot taken months ago.",
      "GHK-Cu's research pedigree is why it attracts both serious suppliers and opportunists. The tripeptide was first isolated in 1973 by Loren Pickart and has since accumulated a genuinely broad literature spanning wound healing, collagen and glycosaminoglycan synthesis, antioxidant and anti-inflammatory signalling, and gene-expression studies that report it can modulate the activity of a large number of human genes. A compound with a real body of published work, a memorable name and a research audience that cannot easily verify what arrives in a vial is exactly the profile counterfeit listings target.",
      "Everything on this page is presented for laboratory and educational reference. GHK-Cu is a cosmetic ingredient and a research reagent, not a licensed medicine; research suppliers sell the lyophilised peptide under research-use-only terms. If you are auditing the market rather than buying today, start with the [**GHK-Cu price comparison hub →**](/compounds/ghk-cu).",
    ],
    sections: [
      {
        title: "Where to Buy GHK-Cu UK — What Actually Matters",
        body: "The phrase \"where to buy\" hides a more useful question: which supplier can you verify? GHK-Cu is unusually exposed on this front, because the same chemical name is used for a €15 cosmetic serum and a £40 research vial. A storefront that sells both, mixing cosmetic and research language, tells you something about how carefully it distinguishes the two.\\n\\nWhen we audit UK suppliers we apply an identical checklist every time. A Certificate of Analysis from a named laboratory referencing a specific batch. A contact route that genuinely replies to a question. Unambiguous research-use-only labelling. A registered business identity behind the storefront. And confirmed control of the domain they sell from — which is exactly why the TrustScore badge exists: a supplier who installs it on their own site is proving they control that domain, ruling out the throwaway storefronts that characterise the lower end of this market.\\n\\nFor a compound with a cosmetic twin, one additional check matters: does the listing state the form and the purity standard? A research vial should say lyophilised powder and quote a purity figure from an HPLC or mass-spec result. Cosmetics quote an INCI name and a percentage. If a listing is vague on both, treat it as a question.",
        list: [
          "A Certificate of Analysis from a named third-party laboratory referencing a specific batch number — the single most decisive signal available to a buyer.",
          "A working contact route: an email that replies or a phone that connects, tested before you order rather than after.",
          "Research-use-only labelling throughout, with no marketing implying human or medical use.",
          "A Clear form statement — lyophilised powder with a quoted purity figure for the research grade, not a cosmetic serum presented as one.",
          "Confirmed domain ownership, which is what the TrustScore badge verifies.",
        ],
      },
      {
        title: "How We Verify UK GHK-Cu Suppliers",
        body: "Every supplier in the table above has been checked against the same standard. We fetch their homepage and confirm it resolves, scan secondary pages for shipping, contact and compliance language, and look for a Certificate of Analysis either hosted on-site or linked from a testing laboratory. Suppliers that fail the basics are excluded rather than listed behind a caveat.\\n\\nThe process is deliberately conservative and narrower than the raw market. We would rather track fewer suppliers honestly than pad a table with storefronts nobody can verify. When a supplier you know of is absent, that is usually the reason: not an editorial judgement, but a simple absence of verifiable signals.\\n\\nWe also re-run those checks rather than treating verification as a one-off award. A supplier who published batch-linked COAs last quarter but has quietly stopped is a materially different proposition from one who has always published them, and the underlying data is refreshed rather than archived.",
        table: {
          header: ["Signal", "Why it matters"],
          rows: [
            ["Named-lab COA with batch number", "Proves the material was independently tested and traceable"],
            ["Working contact route", "A supplier you can reach is one you can resolve a problem with"],
            ["Full RUO labelling", "Shows compliance awareness; unlicensed human use is a legal risk"],
            ["Form + purity stated", "Distinguishes research lyophilisate from cosmetic-grade material"],
            ["Domain ownership confirmed", "Rules out throwaway storefronts built to disappear"],
          ],
        },
      },
      {
        title: "What Affects the Price You Pay in the UK",
        body: "GHK-Cu pricing in the UK varies by a factor of dozens between the cheapest and most expensive listings, but the spread is not random — and the clearest driver is the same one that catches buyers out. The tripeptide is commonly sold in 50mg and 100mg research vials, so pack size is the biggest single driver of headline price: larger vials almost always carry a lower cost per milligram, which is why a per-mg comparison tells you more than a headline price. A 50mg listing and a 100mg listing tell opposite stories depending on whether you divide them.\\n\\nVendor overhead is the second factor. A supplier running verified warehousing, commissioned lab testing, printed COAs and responsive support charges for that service. A bare-bones reseller drop-shipping from overseas does not, which is how a listing can appear dramatically cheaper while offering materially less.\\n\\nStock status matters too, and it is the most commonly overlooked. A listing can show a competitive price and be permanently out of stock, which is why availability is recorded alongside price here rather than assumed. When GHK-Cu is genuinely held in UK inventory, delivery is typically a matter of days. When it is drop-shipped, the quoted window frequently slips and import handling becomes the buyer's problem.\\n\\nThe practical takeaway is to compare on a per-mg basis at the pack size you actually need, and to treat an unusually low price as a question rather than a bargain. If your research pairs GHK-Cu with the repair peptides it is most often blended with, our [BPC-157 comparison hub](/compounds/bpc-157) and [TB-500 comparison hub](/compounds/tb-500) follow the same method.",
      },
    ],
    faq: [
      {
        question: "Where can I buy GHK-Cu in the UK?",
        answer:
          "ViralPeps compares GHK-Cu listings from UK research-chemical suppliers, who sell the lyophilised peptide strictly for laboratory use under research-use-only terms. We list only suppliers whose verification signals — COA, contact, compliance and domain ownership — we can independently confirm, and the live table above shows every one we currently track.",
      },
      {
        question: "Is GHK-Cu legal in the UK?",
        answer:
          "GHK-Cu is not a licensed medicine in the UK and is not authorised for human use or general retail sale as a drug. It is widely used as a cosmetic ingredient and sold as a research reagent under research-use-only terms intended for laboratory and educational purposes. We present this information for reference only.",
      },
      {
        question: "Why do GHK-Cu prices vary so much between UK suppliers?",
        answer:
          "Pack size is the main driver — larger vials carry a much lower cost per milligram — followed by vendor overheads such as warehousing, commissioned testing, printed COAs and support. Some of the spread also reflects cosmetic-grade material being listed alongside research-grade powder, which is why checking the stated form and purity matters.",
      },
      {
        question: "What is the difference between GHK-Cu and a cosmetic copper peptide serum?",
        answer:
          "A research listing sells GHK-Cu as lyophilised powder intended for laboratory reconstitution, with a quoted purity figure from third-party testing. A cosmetic serum contains GHK-Cu or a derivative as one ingredient in a formulated topical product carrying an INCI name. They are regulated differently and are not interchangeable in a research context.",
      },
    ],
    sources: [
      { label: "GHK-Cu as a Bioactive Metallopeptide and Drug-Delivery Cargo (Pharmaceutics 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42797253/" },
      { label: "The human tri-peptide GHK and tissue remodeling (J Biomater Sci Polym Ed 2008)", url: "https://pubmed.ncbi.nlm.nih.gov/18644225/" },
      { label: "GHK and DNA: resetting the human genome to health (Biomed Res Int 2014)", url: "https://pubmed.ncbi.nlm.nih.gov/25302294/" },
      { label: "Topically applied GHK as an anti-wrinkle peptide (Bioimpacts 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39963574/" },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy GHK-Cu UK — Live Supplier Prices",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-ghk-cu-uk",
    title: "Cheapest GHK-Cu UK: Lowest Price Per mg Compared",
    description:
      "Cheapest GHK-Cu UK — the lowest verified price per milligram across every UK supplier we track, with weekly live listing data ranked per mg, not per vial size.",
    h1: "Cheapest GHK-Cu UK",
    focusKeyword: "cheapest ghk-cu uk",
    intro: [
      "Finding the cheapest GHK-Cu UK listing is not the same as finding the best value, and the gap between the two is wider for this compound than for almost any other peptide we track. GHK-Cu is sold as two different products under one chemical name — a lyophilised research powder and a cosmetic-grade serum — and the headline price on a search-results page rarely tells you which one you are looking at. A £9 listing and a £40 listing can be selling fundamentally different things.",
      "This page is the short answer to the price question. It ranks every UK GHK-Cu listing we track by cost per milligram rather than by headline price, because GHK-Cu is commonly sold in 50mg and 100mg vials and a per-mg figure is the only comparison that stays honest across pack sizes. The table below shows the lowest per-mg options first, with the cheapest overall listing called out separately.",
      "One caveat runs through everything that follows. A low price is a data point, not a recommendation. In a market where the same name covers research lyophilisate and a cosmetic serum, the cheapest listing is frequently the one with the least information attached to it — no batch-linked Certificate of Analysis, no stated purity, no verifiable supplier behind the storefront. Use the ranking here to shortlist, then verify the shortlist against the signals we describe.",
      "Prices come live from the same dataset that powers the [**GHK-Cu price comparison hub →**](/compounds/ghk-cu) and are refreshed weekly. Nothing on this page is a fixed quote.",
    ],
    sections: [
      {
        title: "Why Cost Per mg Beats Headline Price for GHK-Cu",
        body: "GHK-Cu is sold in a wide range of pack sizes and formats, which makes headline prices almost useless as a comparison tool. A 50mg research vial and a 100mg research vial from the same supplier will carry very different prices, and a topical serum containing a fraction of a percent of copper peptide will carry yet another — with no relationship to the others.\\n\\nDividing price by milligrams gives you a figure that is comparable across every research listing in the market. It is not perfect: it says nothing about purity, packaging quality or whether the material is current, and it cannot be applied to a cosmetic product because those do not quote a milligram quantity of peptide. But for the research-grade market it is the single most useful number on the page.\\n\\nThe pattern you will see in the table is predictable: smaller vials almost always carry a higher cost per milligram, and the largest vials carry the lowest. That is normal economics — the fixed costs of testing, packing and shipping are spread across more material — but it means the \"cheapest\" listing depends entirely on whether you are comparing total price or unit price.",
      },
      {
        title: "What a Genuinely Cheap GHK-Cu Listing Looks Like",
        body: "There is a legitimate way to be cheap and an illegitimate way, and the difference is visible in what the supplier publishes. Legitimate low prices come from volume buying, minimal packaging, and selling a single pack size without the overhead of a full catalogue. Illegitimate low prices come from under-dosing a vial, substituting cosmetic-grade material, or selling untested powder and describing it as research grade.\\n\\nThe dividing line is documentation. A supplier selling cheaply on volume can still publish a batch-linked Certificate of Analysis, because they commissioned one for the batch they bought. A supplier selling cheaply on deception cannot, because there is nothing to certify. When two listings differ substantially on price, the COA is where the difference lives.",
        table: {
          header: ["What you check", "Legitimate low price", "Warning sign"],
          rows: [
            ["Certificate of Analysis", "Named lab, batch number, linked on-site", "Absent, or a generic undated PDF"],
            ["Stated form", "Lyophilised powder", "Vague, or cosmetic serum language"],
            ["Purity figure", "Quoted from HPLC/mass-spec", "Not stated anywhere"],
            ["Contact route", "Replies before you order", "Contact form only, no response"],
            ["Pack size stated", "Explicit mg per vial", "Ambiguous — \"one vial\""],
          ],
        },
      },
      {
        title: "The Cheapest Listing Is Rarely the Best Purchase",
        body: "The instinct to sort by price and buy the top result is understandable, and in most of the UK research-peptide market it produces a reasonable outcome: the spread between the cheapest and the most expensive legitimate suppliers is usually a factor of two or three, and both ends are tested material. GHK-Cu is a partial exception, because the cosmetic-versus-research confusion fattens the cheap end of the market with listings that were never competing on the same terms.\\n\\nThe practical approach is to take the per-mg ranking here — which already excludes anything we cannot verify — and treat it as a shortlist rather than an answer. From that shortlist, a supplier with a batch-linked COA, a stated purity figure and a working contact route at a mid-range per-mg price is a better purchase than the cheapest listing without them.\\n\\nIt also helps to know which format you actually need. Research buyers overwhelmingly want lyophilised GHK-Cu for reconstitution; topical buyers want a formulated serum and should be shopping in the cosmetics market, not here. Our guide to [where to buy GHK-Cu in the UK](/compound-guides/where-to-buy-ghk-cu-uk) covers the verification checklist in full, and the [GHK-Cu UK supplier](/compound-guides/ghk-cu-uk-supplier) page explains which suppliers stock which format.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest GHK-Cu price in the UK?",
        answer:
          "The cheapest verified listing changes as suppliers run promotions and restock, so this page reads the live figure rather than quoting a fixed number. The table above sorts every UK GHK-Cu listing we track by cost per milligram and shows the lowest current option first, alongside the cheapest overall headline price.",
      },
      {
        question: "Is the cheapest GHK-Cu safe to buy?",
        answer:
          "Price alone tells you nothing about quality. In the GHK-Cu market the cheapest listings are also the ones least likely to publish a batch-linked Certificate of Analysis or a stated purity figure, because the same chemical name covers research powder and cosmetic serum. Verify the documentation before buying, not after.",
      },
      {
        question: "Why is GHK-Cu so much cheaper per mg in larger vials?",
        answer:
          "The fixed costs of third-party testing, packing and shipping are spread across more material in a larger vial, so the cost per milligram falls even when the headline price rises. This is normal across the peptide market and is why a per-mg comparison is the only meaningful one.",
      },
      {
        question: "Does a lower price mean lower purity?",
        answer:
          "Not necessarily. Volume buying and minimal packaging can produce genuinely low prices on fully tested material. The reliable indicator of quality is documentation — a named-lab Certificate of Analysis tied to a batch number — not the position of a listing in a price sort.",
      },
    ],
    sources: [
      { label: "GHK-Cu as a Bioactive Metallopeptide and Drug-Delivery Cargo (Pharmaceutics 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42797253/" },
      { label: "A Systematic Review of the Mechanisms and Therapeutic Applications of GHK-Cu (Arch Intern Med Res 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42787770/" },
      { label: "Liposomes as Carriers of GHK-Cu Tripeptide for Cosmetic Application (Pharmaceutics 2023)", url: "https://pubmed.ncbi.nlm.nih.gov/37896245/" },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest GHK-Cu UK — Ranked by Price Per mg",
    rowLimit: 10,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "ghk-cu-price-comparison-uk",
    title: "GHK-Cu Price Comparison UK: Every Supplier, Every Price",
    description:
      "GHK-Cu price comparison UK — the full side-by-side table of every UK research supplier we track, with live prices, pack sizes, cost per mg and stock status.",
    h1: "GHK-Cu Price Comparison UK",
    focusKeyword: "ghk-cu price comparison uk",
    intro: [
      "A GHK-Cu price comparison UK buyers can actually use has to do two things at once: show every listing in the market, and make clear which listings are selling the same thing. GHK-Cu — the copper(II) complex of the tripeptide glycyl-L-histidyl-L-lysine — is listed by UK suppliers at prices that span more than an order of magnitude, and a large part of that spread has nothing to do with supplier efficiency. It reflects the fact that cosmetic-grade and research-grade GHK-Cu share a name but not a market.",
      "This page is the full picture rather than the shortlist. Where our [cheapest GHK-Cu guide](/compound-guides/cheapest-ghk-cu-uk) ranks a short top-10 by cost per milligram and hands you a single answer, this comparison renders the complete table: every UK supplier ViralPeps tracks, every pack size they publish, the headline price, the cost per milligram derived from the stated quantity, the stock state, the verification state and a direct link to the supplier's own listing.",
      "The table is regenerated from suppliers' published pages on a weekly cycle, so what you see is the market's current state rather than a snapshot taken months ago. Because GHK-Cu is used both topically in cosmetics and as a research reagent, we keep the comparison scoped to suppliers selling the lyophilised peptide under research-use-only terms; where a supplier lists both, the research listing is the one shown.",
      "Read this page as a market map, not a shopping cart. It exists so that you can see the shape of the market — the genuine range, the pack sizes that dominate, the outliers worth investigating and the clusters worth ignoring. For the compound's full research profile and background, the [**GHK-Cu hub →**](/compounds/ghk-cu) is the starting point.",
    ],
    sections: [
      {
        title: "How to Read a GHK-Cu Price Comparison",
        body: "A price comparison is only as useful as the columns it shows, and for GHK-Cu three columns do the heavy lifting. The first is the stated pack size: a comparison that lists prices without quantities is comparing a 50mg vial to a 100mg vial as though they were the same product. The second is cost per milligram, the only figure that normalises across pack sizes. The third is stock status, because a competitive price on a permanently out-of-stock listing is noise.\\n\\nTwo further columns in this table are editorial rather than factual. The verification state records whether a supplier meets the checks described on our [GHK-Cu UK supplier page](/compound-guides/ghk-cu-uk-supplier) — a working site, a contact route, compliance language and a discoverable Certificate of Analysis. The TrustScore badge records whether a supplier has installed a badge on their own domain, which verifies domain control and rules out throwaway storefronts.\\n\\nEverything else is the supplier's own published data. We do not estimate prices, and we do not fill gaps with plausible figures; where a supplier does not publish a quantity or a stock state, the table shows what exists rather than inventing the rest.",
        table: {
          header: ["Column", "What it tells you", "Why it matters"],
          rows: [
            ["Pack size", "Milligrams per vial as stated", "Without it, headline prices are not comparable"],
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
        body: "The first thing a full GHK-Cu comparison reveals is how wide the range is — considerably wider than a market selling a single tested product should produce. The explanation is layered. At the top end sit cosmetic-adjacent listings and small-quantity research vials priced for convenience; at the bottom sit high-volume research suppliers and a tail of listings whose documentation does not match their confidence.\\n\\nPack size explains perhaps the largest single slice of the spread. GHK-Cu is commonly sold in 50mg and 100mg research vials, and the cost per milligram on the larger vial is frequently less than half that of the smaller one from the same supplier. A buyer scanning headline prices without reading quantities will systematically misread which supplier is cheaper.\\n\\nThe remaining spread comes from overhead. Suppliers who commission third-party testing, hold UK stock and answer enquiries charge for that. Suppliers who drop-ship and test nothing do not. Both appear in the same table with the same chemical name, which is precisely why the verification column sits next to the price column rather than in a footnote.",
      },
      {
        title: "What the Table Cannot Tell You",
        body: "A price comparison can show you what suppliers publish. It cannot tell you whether the material in a vial matches the certificate describing it, because that requires independent testing of an actual purchase — something no price table can do at scale. It also cannot tell you about a supplier's reliability over time, only their current state.\\n\\nWhat it can do is make the market legible, so that a buyer walks into a purchase knowing the genuine range, the pack sizes that matter and the documentation to ask for. That is the purpose of this page. Treat the cheapest listings as questions and the best-documented listings as candidates, and the comparison does its job.\\n\\nIf you are deciding between GHK-Cu and the repair peptides it is often stacked with, the same method applies to [BPC-157](/compounds/bpc-157) and [TB-500](/compounds/tb-500), and the [best GHK-Cu peptide](/compound-guides/best-ghk-cu-peptide) page ranks suppliers by trust rather than price.",
      },
    ],
    faq: [
      {
        question: "How current are the prices in this GHK-Cu comparison?",
        answer:
          "The table is rebuilt from suppliers' published listing pages on a weekly cycle, so the figures reflect their most recent state rather than a fixed snapshot. Prices in the UK research-peptide market move frequently through promotions and restocks, so always confirm the live figure on the supplier's own page before ordering.",
      },
      {
        question: "Why do some GHK-Cu listings look far cheaper than others?",
        answer:
          "Pack size is the main driver — a 100mg vial carries a much lower cost per milligram than a 50mg vial — followed by supplier overheads like third-party testing and UK stockholding. Some of the spread also reflects cosmetic-grade material being listed under the same name as research-grade powder, which is why checking the stated form and purity matters.",
      },
      {
        question: "Does this comparison include cosmetic GHK-Cu products?",
        answer:
          "The comparison is scoped to suppliers selling lyophilised GHK-Cu under research-use-only terms. Where a supplier lists both a cosmetic serum and a research vial, the research listing is the one shown, because a cosmetic product does not quote a milligram quantity and cannot be compared on cost per mg.",
      },
      {
        question: "Should I just buy the cheapest listing in the table?",
        answer:
          "No. The cheapest listing is a question, not an answer. Use the table to see the genuine range, then verify the shortlist — a batch-linked Certificate of Analysis from a named laboratory, a stated purity figure, a working contact route and a verifiable supplier identity are what make a listing safe to buy from.",
      },
    ],
    sources: [
      { label: "GHK-Cu as a Bioactive Metallopeptide and Drug-Delivery Cargo (Pharmaceutics 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42797253/" },
      { label: "A Systematic Review of the Mechanisms and Therapeutic Applications of GHK-Cu (Arch Intern Med Res 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42787770/" },
      { label: "The Regenerative Potential of GHK-Cu in Aesthetic Medicine (Aesthet Surg J 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42619529/" },
    ],
    tableMode: "full",
    tableHeading: "GHK-Cu Price Comparison UK — Every Tracked Supplier",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-ghk-cu-online-uk",
    title: "Buy GHK-Cu Online UK: Ordering, Payment & Delivery",
    description:
      "Buy GHK-Cu online UK — how ordering from UK research suppliers works, what payment and delivery to expect, and the key checks to make before you check out.",
    h1: "Buy GHK-Cu Online UK",
    focusKeyword: "buy ghk-cu online uk",
    intro: [
      "To buy GHK-Cu online UK buyers face a market that looks simpler than it is. The compound is easy to find — dozens of UK storefronts list it — but \"easy to find\" and \"safe to order from\" are not the same thing, and GHK-Cu adds a complication that most peptides do not have. Because GHK-Cu is a legitimate cosmetic ingredient as well as a research reagent, the search results mix formulated skincare with lyophilised research powder, and the two are ordered, shipped and used in completely different ways.",
      "This page is about the transaction itself. It covers how ordering from a UK research supplier actually works — what you provide, what you receive, how payment is handled, what delivery timelines look like when material is genuinely held in UK stock, and which checks to complete before you check out rather than after. It is not a price guide; for that, the [GHK-Cu price comparison](/compound-guides/ghk-cu-price-comparison-uk) and the [cheapest GHK-Cu](/compound-guides/cheapest-ghk-cu-uk) pages cover the numbers.",
      "The ordering mechanics across UK suppliers are more uniform than the marketing suggests. Most are small operations running standard e-commerce platforms, taking card payments through a processor, and dispatching from UK addresses. That uniformity is useful: it means the same short pre-order checklist applies everywhere, and a supplier who fails it is a supplier to skip regardless of how competitive their price looks.",
      "Everything here is presented for laboratory and educational reference. GHK-Cu is sold by research suppliers under research-use-only terms and is not authorised for human use; cosmetic products containing it are a separate market with separate regulation. The [**GHK-Cu hub →**](/compounds/ghk-cu) carries the compound's full research profile.",
    ],
    sections: [
      {
        title: "How Ordering from a UK Research Supplier Works",
        body: "A typical order from a UK GHK-Cu supplier follows a predictable path. You select a pack size — usually 50mg or 100mg of lyophilised powder, occasionally smaller quantities — add it to a cart on a standard e-commerce platform, and pay by card through the site's processor. There is rarely an account requirement, and rarely a prescription-style gate, because the material is sold as a research reagent rather than a medicine.\\n\\nWhat arrives is a sealed vial of lyophilised powder, usually with a rubber septum and an aluminium crimp, packed in protective material. Depending on the supplier you may receive a printed Certificate of Analysis, a batch label on the vial, or a link to a COA hosted on their site. Suppliers who commission third-party testing will typically reference the batch on both the vial and the certificate.\\n\\nTwo things commonly catch out first-time buyers. The first is that lyophilised powder requires reconstitution before use in a laboratory setting, and it does not arrive ready to work with — that is a normal property of the format, not a defect. The second is that the vial is not the finished product; it is a research material, and the supplier's terms will say so explicitly.",
        list: [
          "Select your pack size — 50mg and 100mg vials dominate the UK GHK-Cu market.",
          "Pay by card through the supplier's own processor; avoid anything that requires an unusual payment route.",
          "Expect a sealed vial of lyophilised powder, not a ready-to-use liquid.",
          "Check the batch reference on the vial against the Certificate of Analysis you can access.",
          "Confirm the research-use-only terms are stated on the product page, not only in a footer.",
        ],
      },
      {
        title: "Payment and Delivery — What to Expect in the UK",
        body: "Card payment through a recognised processor is the norm. A supplier who pushes you toward an unusual route — a bank transfer to a personal account, a cryptocurrency-only checkout, or an off-site payment link — is signalling something about how they operate, and none of it is reassuring. The presence of a conventional processor is not proof of quality, but its absence in a market that routinely offers cards is worth noticing.\\n\\nDelivery is where UK-based stock separates from drop-shipping. A supplier holding GHK-Cu in UK inventory typically dispatches within a day or two and delivers domestically in a matter of days. A supplier drop-shipping from overseas will quote a longer window, which frequently slips, and will leave you handling any import issues. Both are visible before you buy: UK stockholding is usually stated, and a delivery estimate is almost always quoted.\\n\\nDiscreet packaging is standard across the market, which means a plain outer parcel with no product description on the outside. If a supplier's listing suggests otherwise, or promises unusually fast international delivery, treat it as a reason to look more closely at where the material is actually shipping from.",
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
        title: "The Pre-Order Checklist for GHK-Cu",
        body: "Before you complete a GHK-Cu order, four checks take less than five minutes and eliminate most of the risk in this market. First, find the Certificate of Analysis and confirm it names a laboratory and a batch. Second, confirm the listing states the form — lyophilised powder — and quotes a purity figure, because a listing vague on both may be cosmetic-adjacent material. Third, send a question to the supplier's contact route and see whether the answer comes back; a supplier who does not reply before a sale will not reply after one. Fourth, confirm the terms of sale say research-use-only.\\n\\nNone of these checks requires domain expertise, and together they do most of the work of separating a supplier worth ordering from one worth skipping. The [GHK-Cu UK supplier](/compound-guides/ghk-cu-uk-supplier) page explains the verification standard in full, and if you are weighing suppliers by quality rather than by transaction, the [best GHK-Cu peptide](/compound-guides/best-ghk-cu-peptide) ranking orders them by trust signals.",
      },
    ],
    faq: [
      {
        question: "Can I buy GHK-Cu online in the UK without a prescription?",
        answer:
          "UK research suppliers sell GHK-Cu as a research reagent under research-use-only terms and typically do not require a prescription for that purpose. It is not a licensed medicine and is not authorised for human use, so any purchase is for laboratory and educational reference only. Cosmetic products containing GHK-Cu are a separate, differently regulated market.",
      },
      {
        question: "How long does GHK-Cu delivery take in the UK?",
        answer:
          "A supplier holding GHK-Cu in UK inventory usually dispatches within a day or two and delivers domestically in a matter of days. Suppliers drop-shipping from overseas quote longer windows that often slip, and may leave import handling to the buyer. The delivery estimate is normally stated before checkout.",
      },
      {
        question: "What payment methods do UK GHK-Cu suppliers accept?",
        answer:
          "Card payment through a recognised processor is standard. Treat requests for bank transfer to a personal account, cryptocurrency-only checkout or off-site payment links as a warning sign — a supplier unwilling to use conventional payment is signalling something about how they operate.",
      },
      {
        question: "What checks should I make before ordering GHK-Cu?",
        answer:
          "Four: confirm the Certificate of Analysis names a laboratory and a batch; confirm the listing states lyophilised powder and quotes a purity figure; test the contact route by sending a question and waiting for a reply; and confirm the terms of sale state research-use-only. These take minutes and eliminate most of the risk.",
      },
    ],
    sources: [
      { label: "GHK-Cu as a Bioactive Metallopeptide and Drug-Delivery Cargo (Pharmaceutics 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42797253/" },
      { label: "Liposomes as Carriers of GHK-Cu Tripeptide for Cosmetic Application (Pharmaceutics 2023)", url: "https://pubmed.ncbi.nlm.nih.gov/37896245/" },
      { label: "Topically applied GHK as an anti-wrinkle peptide (Bioimpacts 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/39963574/" },
    ],
    tableMode: "full",
    tableHeading: "Buy GHK-Cu Online UK — Live Research Supplier Listings",
    rowLimit: 20,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "ghk-cu-uk-supplier",
    title: "GHK-Cu UK Supplier: Which Suppliers Stock It & How to Verify",
    description:
      "GHK-Cu UK supplier guide — which UK suppliers stock the copper peptide, the form they sell it in, and how to verify every listing with a batch-linked COA check.",
    h1: "GHK-Cu UK Supplier",
    focusKeyword: "ghk-cu uk supplier",
    intro: [
      "A GHK-Cu UK supplier list is only useful if it tells you which supplier is which, and GHK-Cu makes that harder than it should be. The compound — the copper(II) complex of the tripeptide glycyl-L-histidyl-L-lysine — is sold in the UK by two overlapping populations of seller: research-chemical suppliers who dispatch lyophilised powder under research-use-only terms, and cosmetics or skincare brands who incorporate copper peptides into formulated topical products. They share a chemical name, a marketing vocabulary and very little else.",
      "This page covers the supplier side of the market: who is actually stocking GHK-Cu as a research reagent, what form and pack sizes they publish, and how to verify a listing before you rely on it. It is deliberately not a price list — the [cheapest GHK-Cu](/compound-guides/cheapest-ghk-cu-uk) and [GHK-Cu price comparison](/compound-guides/ghk-cu-price-comparison-uk) pages handle the numbers. Here the subject is the supplier, and specifically the difference between a supplier who can be checked and one who can only be taken on trust.",
      "Verification is the thread running through everything below. In a market where the same name covers a testing-labelled research vial and a moisturiser, the supplier's published documentation is the only durable signal you have. Everything else — the website's polish, the review count, the confident copy — is trivially manufactured and tells you nothing about whether the batch behind a listing was tested or where it came from.",
      "All of this is presented for laboratory and educational reference. GHK-Cu is not a licensed medicine and is not authorised for human use; research suppliers sell it under research-use-only terms. For the compound's full research background, the [**GHK-Cu hub →**](/compounds/ghk-cu) is the place to start.",
    ],
    sections: [
      {
        title: "Two Kinds of GHK-Cu Supplier",
        body: "The single most useful distinction in the UK GHK-Cu market is between research suppliers and cosmetic suppliers, because the two answer different questions and are not substitutable. A research supplier sells a defined quantity of lyophilised peptide, quotes a purity figure from third-party testing, and expects the buyer to reconstitute and handle it as a laboratory material. A cosmetic supplier sells a formulated product — a serum, cream or topical — in which GHK-Cu or a derivative is one ingredient among many, described by an INCI name and a percentage.\\n\\nBoth are legitimate markets, but only one is a research market. When a supplier blurs the two — selling a research vial with skincare language, or a cosmetic product with research-grade claims — the ambiguity itself is the signal. It usually means the supplier is optimising for search traffic rather than for either customer, and it makes the listing harder to evaluate on its own terms.\\n\\nFor a research buyer, the practical filter is simple: does the listing state lyophilised powder, quote a milligram quantity, and reference a purity figure from testing? If yes, it is a research listing. If it describes a topical product with a cosmetic INCI name, it is not, regardless of how it is titled.",
        table: {
          header: ["Attribute", "Research supplier", "Cosmetic supplier"],
          rows: [
            ["Form sold", "Lyophilised powder", "Formulated serum, cream or topical"],
            ["Quantity stated", "Milligrams per vial", "Percentage in a formula"],
            ["Identity", "Chemical name + purity figure", "INCI name"],
            ["Testing", "Third-party Certificate of Analysis", "Safety assessment for cosmetics"],
            ["Terms", "Research-use-only", "Consumer cosmetic labelling"],
          ],
        },
      },
      {
        title: "How to Verify a GHK-Cu Supplier",
        body: "Verification in this market means working through a short checklist and accepting that a supplier who fails any step is a supplier to skip. The checklist is not complicated; it is simply more disciplined than most buyers are.\\n\\nStart with the Certificate of Analysis. It should name the laboratory that produced it and reference a specific batch, and it should be findable from the product page rather than only on request. A COA that names no lab, carries no batch number or is undated is decoration, not documentation. Next, confirm the listing states the form and a purity figure; a GHK-Cu listing that is vague on both is likely cosmetic-adjacent material carried under a research title.\\n\\nThen test the contact route before you need it. Send a question about the batch or the COA and see whether a reply arrives and whether it engages with the question. A supplier who answers promptly before a sale is a supplier you can resolve a problem with afterwards; a supplier who does not is a dead end the moment something goes wrong. Finally, confirm the terms of sale state research-use-only, and check that a real business identity sits behind the storefront.\\n\\nThe TrustScore badge supplements these checks rather than replacing them. Because installing the badge on their own site requires control of that domain, it verifies that the supplier is who they claim to be and not a throwaway storefront built to take orders and vanish — but it says nothing about the material itself, which is what the COA is for.",
        list: [
          "A Certificate of Analysis naming the laboratory and the batch, discoverable from the product page.",
          "A stated form (lyophilised powder) and a purity figure from that testing.",
          "A contact route that replies to a real question before you order.",
          "Research-use-only terms stated on the product page, not buried in a footer.",
          "A verifiable business identity and confirmed domain control behind the storefront.",
        ],
      },
      {
        title: "What UK Suppliers Publish for GHK-Cu",
        body: "Across the UK suppliers we track, the published shape of a GHK-Cu listing is fairly consistent, which makes anomalies easy to spot. Pack sizes cluster around 50mg and 100mg of lyophilised powder, with occasional smaller or larger vials; the 50mg vial is the most common entry point and the 100mg vial is the best value on a per-milligram basis. A minority of suppliers list GHK-Cu alongside the repair peptides it is frequently blended with — [BPC-157](/compounds/bpc-157), [TB-500](/compounds/tb-500) and KPV — as part of a general catalogue.\\n\\nTesting practice is where suppliers diverge most. Some publish a batch-linked Certificate of Analysis for every GHK-Cu batch and reference it on the product page; others publish a single generic COA and apply it to everything they sell; others publish nothing. The distribution is roughly what you would expect — the more established suppliers test, and the newest storefronts often do not. Because GHK-Cu is comparatively inexpensive as a raw material, the cost of commissioning testing is a meaningful share of a supplier's margin on it, which is exactly why a published COA is such a strong signal of how seriously they treat the market.\\n\\nPack and format completeness matter too. A supplier who states the mg quantity, the form, the purity figure and the batch reference on the product page has done the work of making their listing verifiable. A supplier who states a price and a name has not.",
      },
    ],
    faq: [
      {
        question: "Which UK suppliers stock GHK-Cu?",
        answer:
          "The live table above lists every UK supplier ViralPeps currently tracks for GHK-Cu as a research reagent, with their pack sizes, prices and verification state. Suppliers selling GHK-Cu only as a formulated cosmetic product are outside the scope of this comparison, because they do not quote a milligram quantity.",
      },
      {
        question: "How do I know a GHK-Cu supplier is legitimate?",
        answer:
          "Check four things: a Certificate of Analysis naming the laboratory and the batch, a stated form of lyophilised powder with a quoted purity figure, a contact route that replies before you order, and research-use-only terms on the product page. A supplier who passes all four is verifiable; one who fails any is not.",
      },
      {
        question: "What is the TrustScore badge on a GHK-Cu supplier?",
        answer:
          "It records that a supplier has installed a badge on their own website, which proves they control that domain and rules out throwaway storefronts. It supplements the documentation checks rather than replacing them — it verifies the supplier's identity, not the material in the vial.",
      },
      {
        question: "Do UK GHK-Cu suppliers test their material?",
        answer:
          "Some do, and it shows in whether a batch-linked Certificate of Analysis is published on the product page. Others publish a single generic certificate applied to everything, and some publish nothing. Because the cost of testing is a meaningful share of margin on an inexpensive raw material, a published batch-linked COA is a strong signal of a supplier's standards.",
      },
    ],
    sources: [
      { label: "GHK-Cu as a Bioactive Metallopeptide and Drug-Delivery Cargo (Pharmaceutics 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42797253/" },
      { label: "A Systematic Review of the Mechanisms and Therapeutic Applications of GHK-Cu (Arch Intern Med Res 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42787770/" },
      { label: "The human tri-peptide GHK and tissue remodeling (J Biomater Sci Polym Ed 2008)", url: "https://pubmed.ncbi.nlm.nih.gov/18644225/" },
    ],
    tableMode: "trust",
    tableHeading: "GHK-Cu UK Suppliers — Ranked by Trust Signals",
    rowLimit: 25,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-ghk-cu-peptide",
    title: "Best GHK-Cu Peptide UK: Ranked by Trust & Verification",
    description:
      "Best GHK-Cu peptide UK — suppliers ranked by independent TrustScore, batch-linked Certificate of Analysis and stated purity rather than headline price alone.",
    h1: "Best GHK-Cu Peptide",
    focusKeyword: "best ghk-cu peptide",
    intro: [
      "Deciding which is the best GHK-Cu peptide to buy in the UK is a question about suppliers rather than about the molecule. Every listing in this market claims to contain the copper(II) complex of glycyl-L-histidyl-L-lysine; what separates them is whether the supplier can evidence that claim. GHK-Cu is cheap as a raw material and trivial to relabel, which means the quality of a purchase is determined almost entirely by the quality of the supplier behind it — and suppliers in this market differ far more than their websites suggest.",
      "This page ranks UK GHK-Cu suppliers by trust signals rather than by price: whether a site is live and stable, whether it publishes a batch-linked Certificate of Analysis from a named laboratory, whether it states the form and purity of what it sells, whether it has a working contact route and compliance language, and whether it has confirmed control of its own domain through the TrustScore badge. The ranking below is derived from those signals, and the live table reflects the suppliers we can actually verify.",
      "The reasoning behind ranking on trust rather than price is specific to this compound. Because GHK-Cu is a legitimate cosmetic ingredient, the cheap end of the UK market is unusually crowded with listings that would never have competed on research terms — formulated topicals, unquantified dropper bottles, and powder of unstated origin. When a search result mixes those with testing-labelled research vials, price becomes a noise signal. Documentation does not.",
      "Everything here is presented for laboratory and educational reference. GHK-Cu is not a licensed medicine and is not authorised for human use. The [**GHK-Cu hub →**](/compounds/ghk-cu) carries the full research profile and market overview.",
    ],
    sections: [
      {
        title: "What \"Best\" Means for a Research Peptide",
        body: "For a compound sold as a research reagent, \"best\" has a specific and testable meaning. It is not the cheapest listing, the most attractive website, or the supplier with the largest catalogue. It is the supplier who can demonstrate, on their own published pages, that the material they sell has been independently tested, that they are a real business behind a domain they control, and that they stand behind what they ship.\\n\\nThat definition matters because the alternative — judging by price or presentation — systematically rewards the wrong behaviour. A supplier who skips third-party testing can undercut one who commissions it, which is exactly how the cheapest listings in a head-to-head price sort end up being the ones with nothing verifiable attached. Ranking by trust inverts that, so a supplier who invests in documentation rises rather than falls.\\n\\nThe trust signals we use are deliberately conservative. A live, stable site. A Certificate of Analysis tied to a batch and naming the laboratory. A stated form and purity. A contact route that answers. Compliance language that matches research-use-only terms. And the TrustScore badge, which verifies domain control and distinguishes a genuine supplier from a storefront built to disappear.",
        table: {
          header: ["Trust signal", "What a strong supplier shows", "What the weak ones show"],
          rows: [
            ["Site stability", "Live, resolvable, consistent", "Often offline or parked"],
            ["Certificate of Analysis", "Batch-linked, named laboratory", "Generic, undated or absent"],
            ["Form + purity", "Lyophilised powder, purity quoted", "Vague or cosmetic language"],
            ["Contact route", "Replies to a real question", "Form only, no answer"],
            ["Domain control", "TrustScore badge installed", "No verifiable identity"],
          ],
        },
      },
      {
        title: "How the TrustScore Ranking Works",
        body: "The TrustScore is a composite of the checks above, weighted toward the signals that are hardest to fake. A supplier's site resolving and having a title is worth little on its own, because both are trivial; a batch-linked Certificate of Analysis from a named laboratory is worth much more, because commissioning it costs real money and cannot be faked convincingly. Contact, compliance and shipping language sit between the two, since they indicate an operating business but can be copied by anyone.\\n\\nThe ranking this produces is not a statement that one supplier's material is purer than another's — no third-party comparison can prove that without testing each purchase, which is beyond the scope of a comparison site. It is a statement that one supplier has made their material verifiable and another has not, which for a research buyer is the practical question. A supplier who publishes a batch COA is telling you they are willing to be checked.\\n\\nWe re-run the checks rather than treating them as permanent. A supplier who published batch certificates last quarter but has quietly stopped is a different proposition from one who has never missed, and the ranking reflects current state, not reputation.",
      },
      {
        title: "Choosing Between the Top GHK-Cu Suppliers",
        body: "Once you have a shortlist of suppliers that pass the trust bar, the remaining decision is about fit rather than quality. The two most common considerations are pack size and format. GHK-Cu is typically sold in 50mg and 100mg research vials; the 50mg vial keeps the entry cost lower while the 100mg vial carries a better cost per milligram if your work will consume more material. Suppliers who stock both let you decide on the metric that matters to your work.\\n\\nFormat is the other axis. Almost every research supplier sells lyophilised powder for reconstitution, but a few list GHK-Cu pre-formulated or blended with the repair peptides it is often studied alongside — [BPC-157](/compounds/bpc-157), [TB-500](/compounds/tb-500) and KPV. Blends carry their own documentation burden, so hold them to the same standard: a certificate naming the batch and the components, not a generic claim.\\n\\nFor the price dimension, the [cheapest GHK-Cu](/compound-guides/cheapest-ghk-cu-uk) page gives the unit-cost shortlist and the [GHK-Cu price comparison](/compound-guides/ghk-cu-price-comparison-uk) gives the full market. Used together with the trust ranking here, they let you buy from a supplier who both documents their material and prices it sensibly — which is the only combination that qualifies as the best GHK-Cu peptide to buy.",
      },
    ],
    faq: [
      {
        question: "What is the best GHK-Cu peptide to buy in the UK?",
        answer:
          "The best choice is the supplier with the strongest verifiable trust signals rather than the lowest price: a live site, a batch-linked Certificate of Analysis from a named laboratory, a stated form and purity, a working contact route and confirmed domain control. The ranking above orders UK suppliers on exactly those signals.",
      },
      {
        question: "Should I buy the cheapest GHK-Cu peptide?",
        answer:
          "Not on price alone. Because GHK-Cu is also a cosmetic ingredient, the cheap end of the UK market includes formulated topicals and unquantified products that never competed on research terms. A low price is a data point; the documentation attached to the listing is what determines whether it is a safe purchase.",
      },
      {
        question: "What is the TrustScore and how is it calculated?",
        answer:
          "TrustScore is a composite of verifiable supplier signals — site stability, a batch-linked Certificate of Analysis, stated form and purity, a working contact route, compliance language and confirmed domain control. It is weighted toward the hardest-to-fake signals, and it is recalculated rather than treated as a permanent award.",
      },
      {
        question: "Is a GHK-Cu blend better than a single-peptide vial?",
        answer:
          "Blends of GHK-Cu with repair peptides such as BPC-157, TB-500 and KPV suit work that studies those combinations together, but they carry a higher documentation burden. Hold a blend to the same standard as a single vial — a certificate naming the batch and every component, not a generic claim.",
      },
    ],
    sources: [
      { label: "GHK-Cu as a Bioactive Metallopeptide and Drug-Delivery Cargo (Pharmaceutics 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42797253/" },
      { label: "The Regenerative Potential of GHK-Cu in Aesthetic Medicine (Aesthet Surg J 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42619529/" },
      { label: "Exploring the beneficial effects of GHK-Cu on an experimental model of colitis (Front Pharmacol 2025)", url: "https://pubmed.ncbi.nlm.nih.gov/40672369/" },
      { label: "Stem cell recovering effect of copper-free GHK in skin (J Pept Sci 2012)", url: "https://pubmed.ncbi.nlm.nih.gov/23019153/" },
    ],
    tableMode: "trust",
    tableHeading: "Best GHK-Cu Peptide — UK Suppliers Ranked by TrustScore",
    rowLimit: 25,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
