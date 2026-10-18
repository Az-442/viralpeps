/**
 * Bacteriostatic Water silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword and has its own SERP intent.
 * NO canonicals between spokes.
 * Prices are NEVER hardcoded here — the page renders them live from
 * src/data/bacteriostatic-water-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — autocomplete evidence pulled live from Google UK (2026-10-18):
 *   1. where to buy bacteriostatic water uk → exact #1 (`where to buy bacteriostatic water uk`)
 *   2. cheapest bacteriostatic water uk     → 0 for the strict form → substituted `cheapest bac water uk` (exact #1)
 *   3. bacteriostatic water price comparison uk → 0 → substituted `where to buy bacteriostatic water pharmacy uk` (#1 under the pharmacy probe) + `bacteriostatic water uk 30ml`
 *   4. buy bacteriostatic water online uk   → close hit `buy bac water online uk` (exact #1)
 *   5. bacteriostatic water uk supplier     → close hit `bac water supplier uk` (exact #1)
 *   6. best bacteriostatic water peptide    → close hit `best bacteriostatic water for peptides` (exact #1) + `best bac water peptides`
 *
 * Bacteriostatic Water is a diluent / laboratory supply, not a research compound,
 * so every spoke is written about the SUPPLY (sterility, preservative, volume,
 * documentation) rather than about biological effects. This is the same
 * deliberate deviation applied to the NAD+ silo, which is a coenzyme rather
 * than a peptide.
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
    slug: "where-to-buy-bacteriostatic-water-uk",
    title: "Where to Buy Bacteriostatic Water UK: Verified Suppliers",
    description:
      "Where to buy bacteriostatic water UK — compare live vial prices from verified UK suppliers, check the preservative, volume and sterility claims before ordering.",
    h1: "Where to Buy Bacteriostatic Water UK",
    focusKeyword: "where to buy bacteriostatic water uk",
    intro: [
      "If you are looking for where to buy bacteriostatic water UK, the first thing worth understanding is what you are actually shopping for. Bacteriostatic water is not a research compound with a biological mechanism to evaluate — it is a sterile diluent. It is water for injection that contains a small amount of an antimicrobial preservative, almost always benzyl alcohol at 0.9% by volume, which is what makes it \"bacteriostatic\": it does not necessarily kill bacteria outright, but it suppresses their growth, and that is the property that lets a single vial be entered more than once without the whole container becoming a contamination risk on the first puncture.",
      "That distinction changes what \"good\" looks like on this page. There is no potency to compare, no sequence to verify and no literature to weigh. What there is instead is a specification and a documentation trail: the volume in the vial, the preservative and its stated concentration, whether the material is labelled for laboratory or research use, and whether the supplier can tell you anything verifiable about the batch you will receive. The table below lists every UK supplier ViralPeps tracks for bacteriostatic water, with the pack volume, headline price, cost per millilitre, stock flag and a direct link to the supplier's own listing. It is rebuilt from suppliers' published pages on a weekly cycle.",
      "The UK market for this item is unusually broad, and the breadth is itself the thing to notice. Bacteriostatic water is bought as a consumable alongside lyophilised peptides, so almost every peptide supplier carries some version of it, and the presentations cluster into a small number of formats: 3ml and 10ml vials dominate, with 5ml and 30ml options at the edges. Because it is a cheap, high-frequency line, it is also the item most often added to a catalogue with the least documentation attached, which is why the checks below matter more than the price sort does.",
      "Everything on this page is presented for laboratory and educational reference. Bacteriostatic water sold by research suppliers is supplied under research-use-only terms for in-vitro work, and it is not presented here as a therapeutic or medical product. If you want the full market view rather than the availability view, start with the [**Bacteriostatic Water comparison hub →**](/compounds/bacteriostatic-water).",
    ],
    sections: [
      {
        title: "Where to Buy Bacteriostatic Water UK — What to Check First",
        body: "The phrase \"where to buy\" hides the more useful question: which listing tells you what is in the vial? Bacteriostatic water is exposed on this front for a specific reason. It is a commodity item in a market full of lookalikes — sterile water, water for injection without preservative, sodium chloride 0.9% for irrigation, and acetic acid solutions all sit next to it on the same supplier shelves and are visually indistinguishable in a photograph. A listing that simply says \"bacteriostatic water\" and shows a vial has told you almost nothing about which of those you are being sent.\\n\\nOur audit checklist is the same one we apply to every supplier on the site, adapted for a supply item. A stated preservative and concentration — 0.9% benzyl alcohol is the standard, and a listing that omits it has left out the single defining property of the product. A stated fill volume in the product title or specification, not just in an image. Unambiguous research-use-only or laboratory-use labelling. A contact route that genuinely replies. And confirmed control of the domain they sell from, which is what the TrustScore signal exists to establish: a supplier who advertises on their own domain is proving they control it, which rules out the throwaway storefronts that are common at the bottom of this market.\\n\\nOne further point specific to a diluent: the preservative is simultaneously the feature and the constraint. Benzyl alcohol is what makes multi-entry use defensible, and it is also the reason bacteriostatic water is not interchangeable with preservative-free water for injection in every application — there are documented incompatibilities between benzyl-alcohol-preserved diluents and certain drug products, and the published literature on parenteral preservatives is explicit that the choice of diluent is a formulation decision rather than a neutral one. A supplier who understands their own product will not describe it as simply \"sterile water\".",
        list: [
          "A stated preservative and concentration (0.9% benzyl alcohol is the market standard) — without it the listing has not defined its own product.",
          "A stated fill volume in the specification, not only in the product photograph.",
          "Research-use-only or laboratory-use labelling throughout, with no marketing implying human or medical use.",
          "An actual product-page URL, so the item you are comparing is the item you will receive.",
          "Confirmed domain ownership, which is what the TrustScore signal verifies.",
        ],
      },
      {
        title: "Reading the UK Market: Vial Sizes and Who Actually Stocks It",
        body: "The UK bacteriostatic water market has a shape worth knowing before you compare anything. It is dominated by two formats — 10ml and 3ml — because those match two different working patterns. A 10ml vial suits a laboratory that reconstitutes several lyophilised items from one diluent stock over a period; a 3ml vial suits smaller or more occasional use where a large multi-entry vial would sit open longer than its contents justify. Alongside them you will find 5ml presentations and occasional 30ml or larger bottles, the latter usually aimed at higher-throughput buyers rather than single users.\\n\\nThe supplier population is wide because almost every peptide vendor carries the line. In our current data that means roughly seventy UK suppliers listing at least one bac-water product, with a substantial share of them listing two sizes at once. That has two practical consequences. First, the price spread across the market is much wider than the price spread within any one supplier — the cheapest 3ml listing and the most expensive 10ml listing are not remotely comparable. Second, because the item is cheap and frequently bundled into orders, a lot of listings are effectively catalogue filler, and the documentation quality tracks that: some suppliers publish a Certificate of Analysis for their diluent, many do not, and a handful do not even state the preservative.\\n\\nThe single most useful thing you can do is compare within a format rather than across formats. A 3ml vial at a low headline price is not cheaper than a 10ml vial at twice that price; per millilitre it is usually the more expensive of the two by a wide margin. The [cheapest bacteriostatic water](/compound-guides/cheapest-bacteriostatic-water-uk) page ranks on cost per millilitre specifically so that comparison is done for you rather than left to mental arithmetic.",
        table: {
          header: ["Format", "Typical use", "What to watch"],
          rows: [
            ["3ml vial", "Smaller or occasional reconstitution work", "Highest cost per ml — cheap headline, poor value"],
            ["5ml vial", "Middle ground; less common", "Check the preservative is stated, not assumed"],
            ["10ml vial", "The market standard multi-entry size", "Best balance of value and practical working life"],
            ["30ml bottle", "Higher-throughput laboratory use", "Longest open-vial life — only sensible if you will use it"],
          ],
        },
      },
      {
        title: "What You Should Not Accept From a UK Listing",
        body: "Because bacteriostatic water is cheap, buyers tend to extend it less scrutiny than they would to a peptide costing twenty times as much. That is the wrong way round. A diluent goes into every reconstitution you perform, so a problem with it contaminates everything downstream of it, and the failure modes are quiet rather than dramatic.\\n\\nThe clearest warning sign is substitution without disclosure. Listings that offer \"sterile water\", \"bacteriostatic water\" and \"sodium chloride 0.9%\" as though they were flavours of the same thing are either confused or hoping you are. They are different products with different preservative status, and the difference is exactly the thing that determines whether repeated entry into the vial is defensible. Sodium chloride 0.9% without a preservative is not bacteriostatic water, whatever the product page implies.\\n\\nThe second sign is a missing fill volume. If the only place the volume appears is inside a photograph of the label, you cannot compare that listing with anything, and you cannot tell whether a suspiciously low price is a small vial or a mispriced large one. We show a dash rather than a guess on any row where the volume is not stated in parseable text, and those rows sink to the bottom of any per-millilitre ranking for that reason.\\n\\nThe third is silence on documentation. Not every supplier will have a batch-linked Certificate of Analysis available for a consumable at this price point, but a supplier who publishes one for their diluent is telling you something real about how they run their business — and the [Bacteriostatic Water UK supplier](/compound-guides/bacteriostatic-water-uk-supplier) page goes through what each of those signals is worth in practice.",
      },
    ],
    faq: [
      {
        question: "Where can I buy bacteriostatic water in the UK?",
        answer:
          "ViralPeps compares bacteriostatic water listings from UK research suppliers, who sell it as a laboratory diluent under research-use-only terms. We list only suppliers whose verification signals we can independently confirm, and the live table above shows every one we currently track, with volumes and prices refreshed weekly.",
      },
      {
        question: "What is bacteriostatic water actually made of?",
        answer:
          "It is sterile water for injection containing an antimicrobial preservative, conventionally 0.9% benzyl alcohol by volume. The preservative is what allows a vial to be entered more than once with a reasonable expectation that microbial growth is suppressed. A listing that does not state its preservative has not defined its product, which is the first thing to check.",
      },
      {
        question: "Is bacteriostatic water the same as sterile water or saline?",
        answer:
          "No. Sterile water and water for injection may contain no preservative at all, and sodium chloride 0.9% is a saline solution that may or may not be preserved. Bacteriostatic water is defined by its preservative content. Treat any listing that presents these as interchangeable options as one that has not understood its own product.",
      },
      {
        question: "Do UK suppliers sell 3ml and 10ml bacteriostatic water?",
        answer:
          "Yes — those are the two dominant formats, with 5ml and occasional 30ml bottles alongside. The choice is about working pattern rather than price: a 3ml vial costs more per millilitre but suits occasional use, while a 10ml vial is better value provided you will use it within a sensible period after first entry.",
      },
    ],
    sources: [
      {
        label: "Antimicrobial Preservatives for Protein and Peptide Formulations: An Overview (Pharmaceutics 2023)",
        url: "https://pubmed.ncbi.nlm.nih.gov/36839885/",
      },
      {
        label: "Antimicrobial preservative use in parenteral products: past and present (J Pharm Sci 2007)",
        url: "https://pubmed.ncbi.nlm.nih.gov/17722087/",
      },
      {
        label: "Incompatibility of ifosfamide with benzyl-alcohol-preserved bacteriostatic water for injection (Am J Hosp Pharm 1988)",
        url: "https://pubmed.ncbi.nlm.nih.gov/3369469/",
      },
      {
        label: "Final report on the safety assessment of Benzyl Alcohol, Benzoic Acid, and Sodium Benzoate (Int J Toxicol 2001)",
        url: "https://pubmed.ncbi.nlm.nih.gov/11766131/",
      },
    ],
    tableMode: "price",
    tableHeading: "Where to Buy Bacteriostatic Water UK — Verified Suppliers, Cheapest First",
    rowLimit: 25,
  },

  /* ─────────────────────────── 2 ─────────────────────────── */
  {
    slug: "cheapest-bacteriostatic-water-uk",
    title: "Cheapest Bacteriostatic Water UK: Lowest Price Per ml",
    description:
      "Cheapest bacteriostatic water UK — the lowest verified price per millilitre across UK suppliers we track, compared at matched vial sizes and refreshed weekly.",
    h1: "Cheapest Bacteriostatic Water UK",
    focusKeyword: "cheapest bacteriostatic water uk",
    intro: [
      "Finding the cheapest bacteriostatic water UK listing sounds like a simple sort, and it is — provided you sort on the right number. The mistake almost everyone makes is to compare headline prices across different vial sizes. A 3ml vial at £2.49 looks cheaper than a 10ml vial at £4.95, and it is, but per millilitre it is roughly seventy per cent more expensive. Since bacteriostatic water is sold almost entirely by volume and has no meaningful potency dimension, cost per millilitre is the only figure that makes two listings genuinely comparable, and it is the figure this page ranks on.",
      "The table below is sorted by cost per millilitre across every UK supplier ViralPeps tracks for bacteriostatic water, drawn live from our comparison database and rebuilt weekly. Because the UK market spreads across 3ml, 5ml, 10ml and 30ml presentations, the per-ml curve does most of the work here: the cheapest way to buy the item is almost always a larger vial, and the interesting question is not \"what is the smallest price\" but \"how much does the size discount justify\".",
      "There is a second, less obvious trap. Bacteriostatic water is a consumable that is entered repeatedly, and it has a practical working life once opened. Buying the largest, cheapest per-millilitre bottle available and then using a tenth of it is not a saving; it is a false economy that also means you are working from a vial that has been open far longer than it should be. The honest way to use a per-millilitre ranking is to fix the format that matches your working pattern first, then compare per-ml within that format. The [where to buy bacteriostatic water UK](/compound-guides/where-to-buy-bacteriostatic-water-uk) guide covers how to pick the format.",
      "Everything here is presented for laboratory and educational reference. Bacteriostatic water from research suppliers is offered for in-vitro work under research-use-only terms. The [**Bacteriostatic Water hub →**](/compounds/bacteriostatic-water) carries the full market overview.",
    ],
    sections: [
      {
        title: "How We Calculate Cost Per Millilitre",
        body: "Cost per millilitre is the vial price divided by the stated fill volume. It sounds trivial, and the arithmetic is, but two things make it the right metric here rather than a formality. The first is that the UK price spread on this item is driven far more by vial size than by supplier efficiency — the same supplier will often list a 3ml and a 10ml at prices that look close in absolute terms and differ by a factor of two or three per millilitre. A headline price sort therefore ranks suppliers on their smallest pack, which is the opposite of what a value-conscious buyer wants.\\n\\nThe second is that bacteriostatic water has no potency to trade off against price. With a peptide, a cheap listing invites the question of whether the material is under-dosed. With a diluent, a millilitre is a millilitre — the variables are sterility, preservative content and documentation, not mass of active substance. That makes price per millilitre unusually meaningful: once you have restricted yourself to listings that state their preservative and are labelled research-use-only, the remaining choice really is a price choice.\\n\\nWhere a listing does not state its volume in parseable text — because the volume appears only in an image, or the product title omits it — we show a dash rather than assigning a figure. A guessed per-millilitre number would corrupt the sort and mislead the comparison, so those rows sink to the bottom of the table instead. In our current data that affects a meaningful minority of listings, and it is a fair reflection of how casually some suppliers treat this product.",
        table: {
          header: ["Vial size", "Illustrative price", "Cost per ml"],
          rows: [
            ["3ml vial", "£2.49", "£0.83/ml"],
            ["5ml vial", "£4.99", "£1.00/ml"],
            ["10ml vial", "£3.00", "£0.30/ml"],
            ["30ml bottle", "£2.50", "£0.08/ml"],
            ["Volume not stated", "£3.00", "—"],
          ],
        },
      },
      {
        title: "Why the Cheapest Per Millilitre Is Usually the Largest Vial",
        body: "On almost every consumable, unit price falls as pack size rises, and bacteriostatic water is no exception — but the effect here is extreme rather than gentle. The fixed costs of a sterile filled vial are dominated by the container, the fill and the sterilisation step rather than by the water itself, which costs almost nothing per millilitre. Once a supplier has absorbed the cost of filling one vial, filling it with thirty millilitres instead of three adds very little, so the larger format can be priced close to the smaller one and still be profitable.\\n\\nThe practical consequence is that a genuine per-millilitre ranking looks almost inverted against a headline price ranking. In our current data the single best per-millilitre figure in the market comes from a 30ml bottle costing a couple of pounds, while the cheapest headline prices in the table belong to 3ml vials that are an order of magnitude worse value per millilitre. Neither figure is wrong; they answer different questions, and a buyer who sorts on headline price has quietly chosen the worst-value format in the market.\\n\\nThat said, there is a real reason small vials exist and sell. A 3ml vial is the right answer when you need a small amount of diluent for a single reconstitution and will not open the vial again, or when the working period is short enough that a large opened vial would be wasted. The saving from buying 30ml is only a saving if the contents get used. Buying the cheapest per millilitre and then discarding most of the bottle is the one outcome that is worse than buying the expensive small vial — so the ranking is a tool, not a target.",
      },
      {
        title: "Getting the Best Value Without Cutting Corners on Verification",
        body: "There are three legitimate ways to pay less for bacteriostatic water in the UK, and none of them involves accepting an unverifiable listing. The first is format, as above: move to the largest vial you will genuinely consume and the per-millilitre cost usually collapses. The second is supplier positioning within a format — even within 10ml vials, where the market is most competitive, the spread between the cheapest and dearest verified listings is substantial, and choosing from the value end of that band is a real saving with no downside.\\n\\nThe third is consolidating. Because so many peptide suppliers carry bacteriostatic water as a consumable, adding a vial to a peptide order often avoids a second delivery charge entirely, and the delivered cost can beat a marginally cheaper standalone listing. That is worth modelling explicitly rather than assuming the lowest headline price wins once postage is counted.\\n\\nWhat you should not do is trade documentation for a few pence. This item goes into every reconstitution you carry out, and the failure modes are quiet. A listing that does not state its preservative concentration, or that blurs the line between bacteriostatic water and unpreserved saline, is not a bargain at any price. For the specification checklist that should precede any price comparison, see the [where to buy bacteriostatic water UK](/compound-guides/where-to-buy-bacteriostatic-water-uk) guide, and for the full unfiltered market see the [price comparison](/compound-guides/bacteriostatic-water-price-comparison-uk) page.",
      },
    ],
    faq: [
      {
        question: "What is the cheapest bacteriostatic water in the UK?",
        answer:
          "The live table above shows the lowest verified cost per millilitre across the UK suppliers ViralPeps tracks, recomputed weekly from their published pages. We rank on cost per millilitre rather than headline price because vial sizes vary so widely that a small vial looks cheaper than a larger one while costing several times more per millilitre.",
      },
      {
        question: "Why is a bigger vial cheaper per millilitre?",
        answer:
          "Because the costs of a sterile filled vial are dominated by the container, fill and sterilisation rather than by the water, which costs very little per millilitre. Filling a 30ml bottle instead of a 3ml one adds little to that fixed cost, so the larger format can be priced close to the smaller one and still return a profit.",
      },
      {
        question: "Is the biggest, cheapest bottle always better value?",
        answer:
          "Only if you will use it. Bacteriostatic water has a practical working life once opened, so a large bottle that sits open for months while you use a fraction of it is a false economy. Fix the format that matches your working pattern first, then compare cost per millilitre within that format.",
      },
      {
        question: "Why do some rows show a dash instead of a price per millilitre?",
        answer:
          "Where a listing does not state the fill volume in parseable text — for example where the volume appears only in a product photograph — we show a dash rather than estimating. A guessed figure would distort the sort, so those rows sink to the bottom of the table instead of being assigned a made-up number.",
      },
    ],
    sources: [
      {
        label: "Antimicrobial preservative use in parenteral products: past and present (J Pharm Sci 2007)",
        url: "https://pubmed.ncbi.nlm.nih.gov/17722087/",
      },
      {
        label: "Antimicrobial Preservatives for Protein and Peptide Formulations: An Overview (Pharmaceutics 2023)",
        url: "https://pubmed.ncbi.nlm.nih.gov/36839885/",
      },
      {
        label: "Liquid growth hormone: preservatives and buffers (Horm Res 2004)",
        url: "https://pubmed.ncbi.nlm.nih.gov/15539807/",
      },
    ],
    tableMode: "perMg",
    tableHeading: "Cheapest Bacteriostatic Water UK — Ranked by Cost Per ml",
    rowLimit: 15,
  },

  /* ─────────────────────────── 3 ─────────────────────────── */
  {
    slug: "bacteriostatic-water-price-comparison-uk",
    title: "Bacteriostatic Water Price Comparison UK: Full Market",
    description:
      "Bacteriostatic water price comparison UK — every UK supplier and vial size we track in one live table, with cost per ml, stock status and verification flags.",
    h1: "Bacteriostatic Water Price Comparison UK",
    focusKeyword: "bacteriostatic water price comparison uk",
    intro: [
      "This bacteriostatic water price comparison UK page exists to answer a different question from the other guides in this cluster. The where-to-buy guide asks which listing you can verify; the cheapest guide asks which is the best value; this one simply shows you the whole market, every listing we track, at once. It is the unfiltered view — no winner declared, no shortlist imposed — because there are times when what you actually need is the complete shape of the UK supply and price distribution rather than a recommendation drawn from it.",
      "The table below lists every bacteriostatic water listing ViralPeps tracks across UK suppliers, across every vial format those suppliers sell: 3ml, 5ml, 10ml and 30ml, plus any presentation where the volume is not stated in the listing text. Each row carries the supplier, the volume, the headline price, the derived cost per millilitre, the current stock flag and a link to the supplier's own product page. It is generated live from our comparison database and rebuilt weekly, so the range you see reflects suppliers' most recent published state.",
      "Because this is a full market view, the numbers are wide in a way the curated guides are not. The cheapest 3ml vial in the UK and the most expensive 10ml vial are separated by a factor of more than ten in headline price, and by a similar factor per millilitre once formats are aligned. Neither extreme is a mistake. The low end reflects a commodity item sold at near-cost as an attachment to larger orders; the high end reflects suppliers positioned as premium, or simply not competing on this line at all. Seeing both is the point of the page.",
      "Everything here is presented for laboratory and educational reference. Bacteriostatic water sold by UK research suppliers is supplied under research-use-only terms for laboratory and in-vitro work, and it is not presented here as a therapeutic or medical product. The [**Bacteriostatic Water hub →**](/compounds/bacteriostatic-water) carries the product detail behind these listings.",
    ],
    sections: [
      {
        title: "What the Full UK Price Distribution Actually Shows",
        body: "Looked at as a whole rather than sorted, the UK bacteriostatic water market has three distinct bands, and knowing which band a listing sits in tells you more than its exact price does. The bottom band is the small-vial commodity tier: 3ml and occasionally 5ml vials priced at a couple of pounds, almost always as attachments to a peptide order rather than as a destination purchase. This is where the cheapest headline prices live, and it is also where the worst value per millilitre lives, because a small filled vial carries nearly all the fixed cost of a large one.\\n\\nThe middle band is the 10ml working tier, which is where the bulk of the market sits and where genuine competition happens. Within this band the spread is still meaningful — in our current data the cheapest verified 10ml listing costs a fraction of the most expensive one — but the format is the same, so the per-millilitre comparison is clean and the choice is a real one. If you are going to compare anything on this page, compare here.\\n\\nThe top band is sparsely populated and mostly consists of larger bottles and specialist presentations, where the per-millilitre figure can be dramatically better than anything in the lower bands. These listings are not the cheapest in absolute terms and never show up in a headline price sort, which is precisely why a full-market view is useful: the best per-millilitre value in the entire market sits in this band, and it is invisible to anyone shopping on headline price alone.\\n\\nThe practical reading is that price bands in this market track format almost entirely, and supplier positioning secondarily. A listing's price tells you which format it is before it tells you anything about how competitive its supplier is.",
        table: {
          header: ["Band", "Format", "Price per ml"],
          rows: [
            ["Commodity tier", "3ml–5ml vials", "Highest cost per ml by a wide margin"],
            ["Working tier", "10ml vials", "Mid-range; where real competition happens"],
            ["Bulk tier", "30ml bottles", "Lowest cost per ml in the market"],
            ["Unstated", "Volume not in text", "Not comparable — shown as a dash"],
          ],
        },
      },
      {
        title: "Why Full-Market Data Beats a Shortlist on This Item",
        body: "For a compound with a synthesis cost floor, a shortlist is genuinely useful: there is a price below which a legitimate listing cannot go, so the cheapest few rows are worth understanding. Bacteriostatic water is not that kind of product. Its raw material cost approaches nothing, the manufacturing cost is dominated by filling and sterilisation, and the item is frequently sold near cost as an attachment to peptide orders. That means there is no meaningful price floor to reason from, and outliers are ordinary commercial behaviour rather than warnings.\\n\\nA full-market view handles that better than a shortlist does. It lets you see that a given supplier prices their diluent far above or below their peers, which is information about the supplier as much as about the product, and it lets you match a format to your actual working pattern rather than being pushed toward whichever format happened to win a ranking. When the entire market spans £2 to £26 in our current data, a top-ten list hides most of the decision.\\n\\nThe trade-off is that a full table does not do any thinking for you. You have to decide the format you want, then scan that band, then apply the specification checks that a price table cannot express: is the preservative stated, is the volume stated, is the research-use-only labelling present. The [where to buy bacteriostatic water UK](/compound-guides/where-to-buy-bacteriostatic-water-uk) guide sets those checks out, and the [cheapest bacteriostatic water](/compound-guides/cheapest-bacteriostatic-water-uk) page applies them to the value end of the market.",
      },
      {
        title: "Reading the Table: Columns and Caveats",
        body: "Every column on this page means something specific, and a couple of them are commonly misread. The supplier column shows the trading name we have on file, with a tick where the supplier has independently passed our verification checks — that tick reflects a live storefront, accessible documentation, research-use-only labelling and a working contact route, not a judgement about this particular vial. The volume column shows what the listing states. Where a listing does not state a fill volume in the product text, the row shows a dash rather than a guess.\\n\\nThe cost-per-millilitre column is derived, not published by suppliers, and it is the only column that lets you compare across formats. It shows a dash wherever the volume is a dash, which means unstated listings are effectively excluded from any value comparison — that is deliberate. A listing that will not tell you how much it is selling cannot be described as good value or bad value.\\n\\nThe stock flag reflects the listing's state at the last refresh, which is a weekly snapshot rather than a live inventory feed; a row showing in stock can sell out between refreshes, and we note that rather than implying more precision than we have. Finally, remember that this table covers bacteriostatic water only. Solutions that sit adjacent to it on supplier shelves — unpreserved saline, sterile water without preservative, acetic acid diluted for peptide work — are separate products and are excluded here, because comparing them on price would be comparing different things.",
        list: [
          "Supplier tick = passed independent verification checks, not a guarantee about this specific vial.",
          "Volume comes from the listing text; a dash means the supplier did not state it.",
          "Cost per ml is derived from price and volume, and is blank wherever volume is blank.",
          "Stock is a weekly snapshot, not a live inventory feed.",
          "The table covers bacteriostatic water only — adjacent saline, sterile water and acetic acid listings are excluded.",
        ],
      },
    ],
    faq: [
      {
        question: "How does this price comparison differ from the cheapest page?",
        answer:
          "The cheapest page ranks on cost per millilitre and shows a shortlist; this page shows the entire market with no filter and no winner declared. It is designed for buyers who want the full distribution — every supplier, every format, every price — rather than a recommendation drawn from it.",
      },
      {
        question: "Why is the price range for bacteriostatic water in the UK so wide?",
        answer:
          "Because the item is a near-zero-cost commodity where price is driven by vial format and supplier positioning rather than material cost. Small vials carry nearly the same fixed filling cost as large ones, so they look cheap and cost more per millilitre, while some suppliers price the line far above the market because it is an attachment rather than a destination purchase.",
      },
      {
        question: "Are all these listings actually bacteriostatic water?",
        answer:
          "The table covers bacteriostatic water only. Adjacent products sold on the same supplier shelves — unpreserved saline, sterile water for injection without preservative, and acetic acid solutions — are separate items and are excluded, because comparing them on price would not be comparing like with like.",
      },
      {
        question: "How often is the price data refreshed?",
        answer:
          "Weekly, from suppliers' own published listing pages. The stock flag is therefore a weekly snapshot rather than a live inventory feed, and it is possible for a listing shown as in stock to sell out between refreshes.",
      },
    ],
    sources: [
      {
        label: "Antimicrobial Preservatives for Protein and Peptide Formulations: An Overview (Pharmaceutics 2023)",
        url: "https://pubmed.ncbi.nlm.nih.gov/36839885/",
      },
      {
        label: "Antimicrobial preservative use in parenteral products: past and present (J Pharm Sci 2007)",
        url: "https://pubmed.ncbi.nlm.nih.gov/17722087/",
      },
      {
        label: "Bacteriostatic preserved saline for pain-free periocular injections: review (Eye (Lond) 2022)",
        url: "https://pubmed.ncbi.nlm.nih.gov/35017698/",
      },
    ],
    tableMode: "full",
    tableHeading: "Bacteriostatic Water Price Comparison UK — Every Listing We Track",
    rowLimit: 0,
  },

  /* ─────────────────────────── 4 ─────────────────────────── */
  {
    slug: "buy-bacteriostatic-water-online-uk",
    title: "Buy Bacteriostatic Water Online UK: Ordering & Delivery",
    description:
      "Buy bacteriostatic water online UK — what to order, how UK suppliers handle payment and delivery, and the four details to confirm before you complete checkout.",
    h1: "Buy Bacteriostatic Water Online UK",
    focusKeyword: "buy bacteriostatic water online uk",
    intro: [
      "When you buy bacteriostatic water online UK, you are making one of the smallest purchases in the research-supply market and one of the most frequently repeated, which is exactly why it is worth getting the ordering details right once rather than re-learning them every time. The item is cheap, the listings are numerous and the differences between them are mostly in the fine print: what volume is actually being sent, whether postage makes a small order uneconomic, and whether the supplier's checkout makes clear what you are buying before you pay.",
      "This page is about the transaction rather than the product. It covers the practical mechanics of buying bacteriostatic water from UK suppliers — choosing the right format for your order, understanding how postage changes the effective price of a low-value line item, what typical dispatch and delivery expectations look like, and the four specification details worth confirming before you hit pay. The table below lists current UK listings with prices and direct purchase links, so you can check any of it against a live example.",
      "One general observation about ordering this item specifically: because it is almost always bought alongside something else, the single biggest determinant of what you actually pay is not the price of the vial but whether you are paying postage for it. A vial added to an existing peptide order costs its price; the same vial bought on its own can double in effective cost once delivery is counted. That is not a reason to avoid buying it separately when you need it, but it is a reason to think about timing.",
      "Everything here is presented for laboratory and educational reference. Bacteriostatic water sold by research suppliers is supplied under research-use-only terms for in-vitro laboratory work, and nothing on this page describes a medical or therapeutic application. The [**Bacteriostatic Water hub →**](/compounds/bacteriostatic-water) has the full product and market detail.",
    ],
    sections: [
      {
        title: "Choosing the Right Vial for Your Order",
        body: "Before ordering, decide which format you are actually buying, because the wrong choice is the most common avoidable cost in this category. Three formats do almost all the work in the UK market. A 3ml vial is the right answer for occasional or one-off work: it is the cheapest thing to add to an order, and it avoids the situation where you open a large vial for a single use and then leave it sitting. A 10ml vial is the market standard and the best balance for regular laboratory use, since the per-millilitre cost is materially better and the vial supports a sensible number of entries before its practical working life is exhausted. A 30ml bottle makes sense only for higher-throughput use where you will genuinely work through the contents.\\n\\nThe thing to resist is buying the largest format purely because its per-millilitre figure is the best in the market. Bacteriostatic water is a preserved diluent intended for repeated entry over a defined working period, and a bottle that stays open far longer than that period is not a saving regardless of its unit cost. If you are unsure how quickly you will use it, the smaller format is the more disciplined purchase.\\n\\nIt is also worth confirming that what you are ordering is the preserved product rather than an adjacent one. Suppliers frequently list bacteriostatic water next to unpreserved sterile water, water for injection and sodium chloride 0.9%, sometimes in near-identical vials. The preservative content is the defining difference and the specification line is where it should be stated: 0.9% benzyl alcohol is the market standard, and a product page that does not name its preservative has left the critical detail for you to infer.",
        table: {
          header: ["Order pattern", "Sensible format", "Why"],
          rows: [
            ["Adding to a peptide order", "3ml or 10ml", "Postage already covered; match to how much you will use"],
            ["Standalone top-up order", "10ml or 30ml", "Justifies the delivery charge; best cost per ml"],
            ["Occasional single use", "3ml", "Avoids opening a large vial you will not finish"],
            ["Regular laboratory work", "10ml", "Best balance of value and working life"],
          ],
        },
      },
      {
        title: "Payment, Dispatch and Delivery Expectations",
        body: "UK research-supply checkouts are broadly consistent in how they handle a low-value line like this, but the details vary enough to affect your total. Most accept standard card payment through a hosted processor, and some accept bank transfer; a minority restrict small orders or apply minimum order values, which is worth checking before you build an order around a single cheap vial. Where a minimum order exists, it is usually expressed in the basket rather than the product page, so it will not appear in any price comparison table.\\n\\nDispatch is typically same-day or next-day for orders placed on a business day before a stated cut-off, with delivery via a tracked UK service. For a consumable at this price point, most suppliers use a standard tracked service rather than next-day premium, so the common experience is delivery within a few working days of dispatch. Where a supplier states a dispatch lead time on their product page, take that as the figure rather than the headline delivery estimate at checkout, which often quotes the courier's transit time only.\\n\\nThe practical consequence for ordering is that the cheapest listing in a table is not always the cheapest delivered order. A vial that is a few pence cheaper but comes from a supplier charging more for postage, or requiring a larger basket to ship at all, can cost more in total than a slightly dearer listing. If you are buying this item on its own rather than adding it to a larger order, compare delivered totals rather than headline prices — and if you are adding it to an order, ignore postage entirely and compare the vial price in isolation.",
      },
      {
        title: "Four Things to Confirm Before You Pay",
        body: "There are four details worth confirming at checkout, and each one corresponds to a failure mode that is common enough in this market to be worth the thirty seconds. The first is the fill volume. Confirm it in the product specification, not in the photograph. A listing that shows a large vial image but ships a smaller one is not rare, and it is impossible to dispute afterwards if the specification already said what you would receive.\\n\\nThe second is the preservative. Confirm that the listing states bacteriostatic water with a named preservative at a stated concentration. If the page describes the item only as sterile water, or if the preservative appears nowhere in the product text, treat it as a different product until proven otherwise. This distinction is the entire reason the category exists.\\n\\nThe third is the research-use framing. Legitimate UK suppliers list bacteriostatic water as a laboratory or research-use product and label it accordingly. A listing that markets it in human-use or medical terms is signalling that it does not understand — or does not care about — the compliance boundaries of the category, and that is a reason to look elsewhere regardless of price.\\n\\nThe fourth is the contact route. Check that there is a working way to reach the supplier before you order, not after. For a cheap consumable most buyers never need it, which is precisely why the suppliers who do not maintain one are the ones you discover too late. The [Bacteriostatic Water UK supplier](/compound-guides/bacteriostatic-water-uk-supplier) page explains how those signals are checked and what the TrustScore flags actually represent.",
        list: [
          "Fill volume stated in the specification text — not inferred from a product photograph.",
          "Preservative named, with a concentration (0.9% benzyl alcohol is standard).",
          "Research-use-only or laboratory-use labelling present on the listing.",
          "A working contact route you have verified before placing the order.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I buy bacteriostatic water online in the UK?",
        answer:
          "Yes — it is sold online by UK research suppliers as a laboratory diluent under research-use-only terms. The table above links directly to current listings with prices and stock status, and every supplier shown is one ViralPeps tracks from their own published storefront.",
      },
      {
        question: "Which vial size should I order?",
        answer:
          "Match the format to your working pattern rather than chasing the best per-millilitre price. A 3ml vial suits occasional or single use and avoids leaving a large vial open; a 10ml vial is the standard for regular laboratory work and materially cheaper per millilitre; a 30ml bottle only makes sense if you will genuinely work through it.",
      },
      {
        question: "Does postage make small orders uneconomic?",
        answer:
          "Often, yes. A single cheap vial bought on its own can effectively double in cost once delivery is added, whereas the same vial added to an existing peptide order costs only its price. If you are ordering it standalone, compare delivered totals rather than headline prices — and if you are adding it to a larger order, compare vial prices in isolation.",
      },
      {
        question: "What should I check before completing checkout?",
        answer:
          "Four things: the fill volume stated in the specification rather than in a photograph, the preservative with its concentration, research-use-only labelling on the listing, and a working contact route. Each corresponds to a common failure in this market, and none of them will be caught by the checkout page itself.",
      },
    ],
    sources: [
      {
        label: "Antimicrobial Preservatives for Protein and Peptide Formulations: An Overview (Pharmaceutics 2023)",
        url: "https://pubmed.ncbi.nlm.nih.gov/36839885/",
      },
      {
        label: "Antimicrobial preservative use in parenteral products: past and present (J Pharm Sci 2007)",
        url: "https://pubmed.ncbi.nlm.nih.gov/17722087/",
      },
      {
        label: "Bacteriostatic saline containing benzyl alcohol decreases the pain associated with the injection of propofol (Anesth Analg 2005)",
        url: "https://pubmed.ncbi.nlm.nih.gov/15728052/",
      },
    ],
    tableMode: "price",
    tableHeading: "Buy Bacteriostatic Water Online UK — Current Listings and Prices",
    rowLimit: 20,
  },

  /* ─────────────────────────── 5 ─────────────────────────── */
  {
    slug: "bacteriostatic-water-uk-supplier",
    title: "Bacteriostatic Water UK Supplier: Who Stocks It",
    description:
      "Bacteriostatic water UK supplier guide — which suppliers actually stock it, how to verify a listing before you rely on it, and what the supplier signals mean.",
    h1: "Bacteriostatic Water UK Supplier",
    focusKeyword: "bacteriostatic water uk supplier",
    intro: [
      "Searching for a bacteriostatic water UK supplier returns dozens of names, and almost none of them are specialist suppliers of it. That is the defining feature of this market: bacteriostatic water is a consumable attachment, stocked by peptide vendors because their customers need it to reconstitute the vials they are already buying, not because supplying diluent is their business. Understanding that shapes how you should evaluate a bacteriostatic water UK supplier. You are not looking for a diluent specialist — there are essentially none in this market — you are looking for a peptide supplier whose consumables line is managed with the same care as their main catalogue.",
      "This page is about supplier identity rather than price. It covers who actually stocks bacteriostatic water in the UK, how many of them exist, how the supplier population is structured, and how to verify a specific listing before you rely on it. Because a defective diluent affects every reconstitution carried out with it, the supplier question here is more consequential than the price question — the saving between the cheapest and dearest verified vial is a couple of pounds, while the cost of working from an unverified one is not measurable in the same units.",
      "The table below lists the UK suppliers ViralPeps tracks with bacteriostatic water listings, ranked by verification evidence. A tick marks suppliers that have independently passed our checks — a live storefront, accessible documentation, research-use-only labelling and a working contact route. The ranking weights a Certificate of Analysis on the actual product page above one on the site alone, because for a supply item the question is whether the specific vial was documented, not whether the business talks about testing somewhere on its homepage.",
      "Everything here is presented for laboratory and educational reference. Bacteriostatic water sold by UK research suppliers is supplied under research-use-only terms for in-vitro work, and no supplier relationship described here constitutes an endorsement of any particular use. The [**Bacteriostatic Water hub →**](/compounds/bacteriostatic-water) carries the product detail.",
    ],
    sections: [
      {
        title: "Who Actually Supplies Bacteriostatic Water in the UK",
        body: "The UK supplier population for this item is broad and shallow. In our current data, more than seventy suppliers list at least one bacteriostatic water product, and a large share of them list two sizes — typically a 3ml and a 10ml — which tells you the line exists to serve two different order patterns rather than to be a product in its own right. Almost none of these businesses would describe themselves as a diluent supplier. They are peptide vendors, and bacteriostatic water is the last item on their catalogue because their customers need it once the peptides have arrived.\\n\\nThat structure has a predictable consequence for quality control. A supplier's attention concentrates on the products that carry their margin and their reputation — the peptides — and a consumable priced at a few pounds receives less scrutiny, in the same way that an accessory does in any retail category. The result is a wide spread in how much a listing tells you. Some suppliers publish a Certificate of Analysis for their diluent and state the preservative and fill volume explicitly. Others list it as a stock item with a photograph and a price and nothing else. Both are selling to the same market at similar prices.\\n\\nWhat you are really choosing between, then, is not specialist versus generalist but attentive versus inattentive. A peptide supplier who documents their diluent properly is signalling that their catalogue discipline extends across the whole range, which is useful information about them well beyond this one purchase. That is the logic behind the ranking on this page, and it is why evidence leads rather than price.",
        table: {
          header: ["Supplier type", "Common in the UK?", "What it means for a bac-water buyer"],
          rows: [
            ["Peptide vendor, bac water as an accessory", "Yes — the overwhelming majority", "Quality control of the consumable line varies enormously"],
            ["Laboratory / reagent specialist", "Rare", "May publish fuller specification, usually at a higher price"],
            ["Compounding pharmacy", "Very rare for research-use supply", "Different regulatory framing; not a like-for-like comparison"],
            ["Marketplace reseller", "Occasional", "Weakest documentation; hardest to hold accountable"],
          ],
        },
      },
      {
        title: "How to Verify a UK Bacteriostatic Water Listing",
        body: "Verification here is simpler than for a peptide, because there is no sequence, mass or purity to check against a specification. What you can check is whether the listing defines its own product. Start with the preservative: a genuine listing states bacteriostatic water with a named preservative at a stated concentration, conventionally 0.9% benzyl alcohol. A page that says only \"sterile water\" or omits the preservative entirely has not told you what it is selling, and in a category where unpreserved sterile water and saline sit on the same shelf, that omission is material rather than cosmetic.\\n\\nNext, check the fill volume in the specification text rather than the image. Then check the compliance framing: legitimate research suppliers describe bacteriostatic water as a laboratory or research-use product and label it as such. A supplier marketing it in human-use or medical terms is outside the norms of the category.\\n\\nThen look for documentation. A Certificate of Analysis naming a laboratory and referencing a batch is the strongest signal available, and for a supply item the most valuable version is one attached to the product page itself rather than a general compliance page. A site that publishes a COA for its peptides but not its diluent is still a reasonable supplier, but you should not treat their diluent as documented when it is not. Finally, confirm the domain: a supplier operating from their own verified domain, rather than a disposable storefront or a marketplace listing, is one you can hold accountable if something goes wrong.",
        list: [
          "Preservative named with its concentration — the defining property of the product.",
          "Fill volume stated in the specification text, not merely shown in a photograph.",
          "Research-use-only or laboratory-use labelling on the listing itself.",
          "A Certificate of Analysis attached to the product page, where one exists.",
          "A working contact route, tested before you order rather than after.",
        ],
      },
      {
        title: "What the TrustScore Flag on This Page Does and Does Not Mean",
        body: "The tick beside a supplier on this page means they have passed our independent verification checks: their storefront resolves, secondary pages carry shipping, contact and compliance language, and there is a route to a Certificate of Analysis either hosted on-site or linked from a testing laboratory. It does not mean we have tested a vial ourselves. We do not buy, receive or assay product, and the flag should be read as a check on whether a supplier behaves like a real, accountable business rather than a claim about the contents of any particular container.\\n\\nFor this silo the ranking also weights the strength of the evidence rather than relying on the site-wide TrustScore alone. That site-wide score is a single composite, and across a supplier population this size it tends to collapse onto a couple of values, which makes it a poor discriminator between seventy suppliers. Adding product-level signals — whether the specific product page publishes a COA, whether the site does, whether there is an independent review presence, whether the site is live — separates suppliers on evidence in a way a single number cannot.\\n\\nThe way to use both together is straightforward. Use the tick and the ranking to shortlist, then confirm the two things a flag cannot confirm for you: that the listing states its preservative and volume, and that the vial you receive carries batch information consistent with what the supplier published. A flag is a filter for dodging obvious risk, not a substitute for reading the product page.",
      },
    ],
    faq: [
      {
        question: "Who supplies bacteriostatic water in the UK?",
        answer:
          "Overwhelmingly, UK peptide vendors who stock it as a consumable so their customers can reconstitute lyophilised products, rather than specialist diluent suppliers. Almost none of the businesses in this market would describe themselves as a bacteriostatic water specialist, which is why listing quality varies so widely between suppliers.",
      },
      {
        question: "What should a UK bacteriostatic water listing state?",
        answer:
          "At minimum the preservative and its concentration — conventionally 0.9% benzyl alcohol — and the fill volume in the specification text. It should also carry research-use-only or laboratory-use labelling. A listing that omits the preservative has not defined its product, since unpreserved sterile water and saline sit on the same shelves.",
      },
      {
        question: "Does a verified tick guarantee the product is genuine?",
        answer:
          "No. It means the supplier passed independent checks for a live storefront, accessible documentation, research-use-only labelling and a working contact route. ViralPeps does not buy or assay product. Only a Certificate of Analysis tied to your specific batch can speak to the contents of a particular vial.",
      },
      {
        question: "Why does the ranking place evidence above price?",
        answer:
          "Because the spread between the cheapest and most expensive verified vial is only a few pounds, while a diluent that is mis-specified or undocumented affects every reconstitution made with it. For a supply item, a documented listing is worth more than a marginally cheaper undocumented one.",
      },
    ],
    sources: [
      {
        label: "Antimicrobial Preservatives for Protein and Peptide Formulations: An Overview (Pharmaceutics 2023)",
        url: "https://pubmed.ncbi.nlm.nih.gov/36839885/",
      },
      {
        label: "Antimicrobial preservative use in parenteral products: past and present (J Pharm Sci 2007)",
        url: "https://pubmed.ncbi.nlm.nih.gov/17722087/",
      },
      {
        label: "Final report on the safety assessment of Benzyl Alcohol, Benzoic Acid, and Sodium Benzoate (Int J Toxicol 2001)",
        url: "https://pubmed.ncbi.nlm.nih.gov/11766131/",
      },
    ],
    tableMode: "trust",
    tableHeading: "Bacteriostatic Water UK Suppliers — Ranked by Verification Evidence",
    rowLimit: 25,
  },

  /* ─────────────────────────── 6 ─────────────────────────── */
  {
    slug: "best-bacteriostatic-water-peptide",
    title: "Best Bacteriostatic Water for Peptides: What to Choose",
    description:
      "Best bacteriostatic water for peptides — how to choose between vials, what preservative content means for repeated use, and which UK suppliers rank highest.",
    h1: "Best Bacteriostatic Water for Peptides",
    focusKeyword: "best bacteriostatic water peptide",
    intro: [
      "Choosing the best bacteriostatic water peptide for laboratory work is not quite the same question as choosing the best bacteriostatic water in general, and the difference is worth spelling out. Bacteriostatic water exists in this market to serve one job: reconstituting lyophilised peptides in a laboratory setting. That job imposes three requirements — the diluent must be free of contamination, it must present a stable environment for a peptide once reconstituted, and it must retain its own microbial protection across repeated entries into the vial. How well a given listing meets those three requirements is what \"best\" should mean, and it is not the same as cheapest.",
      "This page evaluates bacteriostatic water specifically through the peptide-reconstitution lens. It covers what preservative content does once a peptide is in solution, how vial format interacts with repeated use, what the published literature on antimicrobial preservatives in peptide formulations actually says, and how to choose between the vials on offer. The table below ranks UK suppliers by verification evidence — a product-page Certificate of Analysis first, then site documentation, then independent review presence and liveness — with prices shown alongside so the trade-off between assurance and cost is visible.",
      "One caveat governs the whole page. Reconstitution is a laboratory technique, and the choice of diluent is not neutral: the preservative that makes a vial reusable is also a chemical constituent that interacts with what it is added to. The published literature is explicit that preservative selection is a formulation decision with real trade-offs, and that some drug products are incompatible with benzyl-alcohol-preserved diluents. Treat what follows as information for laboratory decision-making, not as procedure.",
      "Everything here is presented for laboratory and educational reference. Peptides and diluents sold by UK research suppliers are supplied under research-use-only terms for in-vitro work, and nothing on this page describes a human or therapeutic application. The [**Bacteriostatic Water hub →**](/compounds/bacteriostatic-water) carries the full product detail.",
    ],
    sections: [
      {
        title: "What Makes Bacteriostatic Water Suited to Peptide Reconstitution",
        body: "The reason bacteriostatic water is the default diluent in peptide work comes down to a single property: the preservative. Water for injection is sterile when it is filled, but a vial that is entered with a needle more than once is no longer sterile in a practical sense, because every entry introduces a path for environmental organisms into the container. A preserved diluent addresses this by including an antimicrobial agent — conventionally benzyl alcohol at 0.9% — that suppresses microbial growth in the container across its working life. That is what allows a single vial to be used for multiple reconstitutions over a period rather than being a single-entry proposition.\\n\\nThe published literature on antimicrobial preservatives in parenteral and peptide formulations supports the general principle while being clear about its limits. Preservatives are effective at suppressing growth rather than guaranteeing sterility, they are selected for compatibility with the formulation, and their inclusion is a deliberate formulation choice with trade-offs. Reviews of preservative use in protein and peptide formulations note that the preservative must be compatible with the active substance and that its selection is not interchangeable across products. That is the technical basis for treating the preservative as the defining property of the product rather than an incidental one.\\n\\nPractical implications follow directly. A listing that does not state its preservative has not told you whether you are holding a preserved multi-entry diluent or a single-use sterile one, and the two are used differently. A listing that states bacteriostatic water but supplies unpreserved saline has given you something with a different working life entirely. Confirming the preservative is therefore not pedantry — it determines how many times the vial can legitimately be entered, which determines whether the format you bought is the right one.",
      },
      {
        title: "Vial Format, Repeated Entry and Working Life",
        body: "Because the whole value of a preserved diluent is that it supports repeated entry, vial format is a decision about working life rather than only about price. A vial that is opened once and used immediately has little need of a preservative; a vial that will be entered six times over a fortnight depends on one. That makes the choice between a 3ml and a 10ml vial a question about how quickly you will work through it, and it is why the largest, cheapest-per-millilitre format is not automatically the best choice here despite being the best value per millilitre.\\n\\nThe tension is real and has no universal answer. Take the 3ml vial: it is the most expensive per millilitre in the market by a wide margin, but it is the honest choice if you are reconstituting one item and will not return to the diluent soon, since you finish it and have no long-lived opened container. Take the 30ml bottle: it offers by far the lowest cost per millilitre, but it is only sensible if a laboratory will work through thirty millilitres in a period consistent with the container's practical working life. The 10ml vial sits between them and is the market's default for good reason — it supports a realistic number of entries without remaining open for an unreasonable time in most working patterns.\\n\\nThe decision rule that follows is to fix the format from your working pattern first, then compare within it. Once you have done that, the per-millilitre spread inside a single format is still worth checking — it is meaningful within the 10ml band in particular — but it is a second-order question behind getting the format right. The [buy bacteriostatic water online UK](/compound-guides/buy-bacteriostatic-water-online-uk) guide sets out how the formats map to different order patterns.",
        table: {
          header: ["Format", "Entries it supports", "Best for"],
          rows: [
            ["3ml vial", "Few — finish quickly after opening", "Single or occasional reconstitution"],
            ["5ml vial", "Moderate, less common format", "Middle-ground working pattern"],
            ["10ml vial", "A realistic multi-entry working life", "Regular laboratory use — the default"],
            ["30ml bottle", "Long series of entries", "Higher-throughput laboratories only"],
          ],
        },
      },
      {
        title: "How the Best Bacteriostatic Water for Peptides Is Ranked Here",
        body: "The ranking on this page is evidence-first rather than price-first, and the ordering of the evidence is specific to this product. In first place is a Certificate of Analysis published on the product page itself, because for a supply item the question that matters is whether the specific vial was documented, not whether the business mentions testing somewhere on its site. Second is a COA published elsewhere on the supplier's site, which establishes that they test but not necessarily this line. Third is an independent third-party review presence, which is a weak signal about quality and a reasonable one about whether the business is real and accountable. Fourth is whether the storefront is live at all.\\n\\nThe site-wide TrustScore is used only as a final discriminator, because on a supplier population this size it compresses onto a couple of values and cannot separate seventy suppliers on its own. That is a deliberate adjustment for this silo rather than a change to the site's methodology, and it is why two suppliers who both show a tick here can sit at quite different ranks.\\n\\nWhat the ranking will not do is tell you which vial is best for your specific peptide. That is a formulation question, and the literature is clear that preservative compatibility is product-specific: benzyl-alcohol-preserved diluents are not appropriate for every substance, and there are documented incompatibilities with particular drug products in the pharmacopoeial and formulation literature. Where a specific peptide has published handling guidance that excludes preserved diluents, that guidance governs regardless of how well a supplier ranks here.",
        list: [
          "Product-page COA ranks above a site-wide COA — the vial, not the homepage, is what matters.",
          "Independent review presence is a signal about accountability, not about vial quality.",
          "A live storefront is the floor, not a recommendation.",
          "Format choice should follow your working pattern, not the per-millilitre ranking.",
          "Preservative compatibility is product-specific — check the guidance for your peptide before assuming a preserved diluent is appropriate.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the best bacteriostatic water for peptides?",
        answer:
          "The best listing is one that states its preservative and concentration (conventionally 0.9% benzyl alcohol), states the fill volume in the specification, is labelled research-use-only, and publishes a Certificate of Analysis on the product page. Format matters as much as supplier: choose the vial size that matches how many times you will enter it.",
      },
      {
        question: "Is a bigger vial better for peptide work?",
        answer:
          "Not automatically. A larger vial is cheaper per millilitre, but the value of a preserved diluent depends on repeated entry over a sensible working life. A large bottle that stays open far longer than its practical working period is a false economy; a 10ml vial is the usual default for regular laboratory use.",
      },
      {
        question: "Is bacteriostatic water always the right diluent for a peptide?",
        answer:
          "No. Preservative compatibility is product-specific. The formulation literature notes that benzyl-alcohol-preserved diluents are incompatible with some drug products, and where a specific substance has published handling guidance that excludes preserved diluents, that guidance applies regardless of how well a supplier ranks.",
      },
      {
        question: "Why does this ranking weight the product-page COA so heavily?",
        answer:
          "Because for a supply item the decisive question is whether the specific vial was documented, not whether the supplier tests things in general. A Certificate of Analysis on the product page is the closest a buyer can get to that, and it outranks a site-wide compliance statement that may not cover the diluent line at all.",
      },
    ],
    sources: [
      {
        label: "Antimicrobial Preservatives for Protein and Peptide Formulations: An Overview (Pharmaceutics 2023)",
        url: "https://pubmed.ncbi.nlm.nih.gov/36839885/",
      },
      {
        label: "Antimicrobial preservative use in parenteral products: past and present (J Pharm Sci 2007)",
        url: "https://pubmed.ncbi.nlm.nih.gov/17722087/",
      },
      {
        label: "Liquid growth hormone: preservatives and buffers (Horm Res 2004)",
        url: "https://pubmed.ncbi.nlm.nih.gov/15539807/",
      },
      {
        label: "Stability of lyophilized teriparatide, PTH(1-34), after reconstitution (Eur J Pharm Biopharm 2016)",
        url: "https://pubmed.ncbi.nlm.nih.gov/26620825/",
      },
      {
        label: "Incompatibility of ifosfamide with benzyl-alcohol-preserved bacteriostatic water for injection (Am J Hosp Pharm 1988)",
        url: "https://pubmed.ncbi.nlm.nih.gov/3369469/",
      },
    ],
    tableMode: "trust",
    tableHeading: "Best Bacteriostatic Water for Peptides — UK Suppliers Ranked by Evidence",
    rowLimit: 25,
  },
];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
