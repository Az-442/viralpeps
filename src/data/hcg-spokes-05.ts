/**
 * hCG silo spoke 5 of 6 — hCG supplier UK.
 * Prices are NEVER hardcoded — rendered live from hcg-silo.ts.
 */
import type { Spoke } from "./hcg-spokes-types";

export const spoke: Spoke = {
  slug: "hcg-supplier-uk",
  title: "hCG Supplier UK: How to Verify Before You Buy",
  description:
    "hCG supplier UK — the verification checklist we run on every UK listing: batch-linked COA, beta subunit identity, storage, contact and TrustScore, weighted.",
  h1: "hCG Supplier UK",
  focusKeyword: "hcg supplier uk",
  intro: [
    "Choosing an hCG supplier UK buyers can verify is a different exercise from choosing a peptide supplier, because the material is a glycoprotein rather than a synthesised chain and the paperwork therefore carries more of the evidence. With a peptide you can cross-check a stated molecular weight against a sequence. With hCG there is no single formula to check, so the certificate and the supplier's handling of it become the whole audit.",
    "This page sets out the verification checklist we apply to every UK listing we track, in the order of weight, and explains what each check actually catches in practice. It is written for hCG specifically where the compound demands it — identity testing against the beta subunit, storage discipline for a protein, preparation route — and otherwise draws on the same supplier audit used across the site.",
    "The listings below are the live UK hCG market as we track it, sorted by verification and TrustScore rather than by price, because at this level of price spread the supplier is the variable that matters. Every row links to the supplier's own product page. Nothing here is medical advice; every listing is a research-use-only reagent, and hCG for human use is a prescription-only medicine in the UK.",
    "If your question is which suppliers exist and what they charge, the [hCG price comparison page](/compound-guides/hcg-price-comparison-uk) is the faster answer. This page is about how to tell a real one from a convincing one.",
  ],
  sections: [
    {
      title: "The Checks That Carry Real Weight, in Order",
      body:
        "Not all verification signals are equal, and the ordering matters because most buyers run them in the wrong sequence — checking website polish before checking the certificate, when polish is the cheapest thing to fake.\n\nFirst and heaviest: a batch-linked Certificate of Analysis from a named laboratory. The certificate exists to connect tested material to shipped material. Without a batch number it does not do that, whatever else it says. For hCG, look at what the certificate claims to have measured — a purity percentage alone is insufficient for a heterodimeric glycoprotein, because it shows only that the sample is largely one thing, not that the thing is hCG.\n\nSecond: identity confirmation against the beta subunit. hCG's alpha chain is identical to the alpha chain of luteinising hormone, follicle-stimulating hormone and thyroid-stimulating hormone, so alpha-directed evidence cannot distinguish hCG from its close relatives. The beta chain is what confers specificity at the LH/CG receptor, and it is what commercial pregnancy assays target for exactly that reason. A supplier whose certificate does not address the beta subunit has not demonstrated identity.\n\nThird: consistent research-use-only positioning. RUO labelling on the product page, in the terms, on the vial label, and no human-use, weight-loss or fertility claims anywhere in the site's marketing. This is a legal category boundary as well as an ethical one, and a supplier who straddles it has an incentive to be hard to find if something goes wrong.\n\nFourth: a contact route that answers before payment. One question — which batch is current stock from — is enough. A working-day reply is the normal standard.\n\nFifth: a traceable business identity and domain control. Company name, UK address, and ideally the TrustScore badge installed on their own domain, which proves they operate it. This check is cheap for an honest supplier and expensive for a disposable storefront, which is why it discriminates well.",
      table: {
        header: ["Check", "What it catches", "What it does not prove"],
        rows: [
          ["Batch-linked COA", "Untested material and recycled certificates", "That your specific vial came from that batch"],
          ["Beta-subunit identity", "Alpha-chain-only material passed off as hCG", "Purity of the preparation"],
          ["Consistent RUO positioning", "Suppliers straddling the medicine boundary", "Product quality either way"],
          ["Contact reply before payment", "Ghost storefronts and abandoned operations", "That a future dispute will be resolved"],
          ["TrustScore / domain control", "Throwaway domains and impersonation", "Anything about the material inside the vial"],
        ],
      },
    },
    {
      title: "Reading a hCG Certificate of Analysis Properly",
      body:
        "A hCG certificate is a more interesting document than a peptide certificate, and reading it properly is the single highest-value skill in this market.\n\nThe header should identify the material, the lot or batch number, the date of analysis and the laboratory performing it. If the laboratory is named as the supplier itself, the certificate is an internal specification sheet rather than independent analysis — that is not automatically disqualifying for a research reagent, but it is a materially weaker document and should be weighted as such.\n\nThe identity section is the part to read closely. For a small peptide, mass spectrometry alone establishes identity to within a fraction of a dalton. For hCG the intact molecule is a heterodimer with variable glycosylation, so identity is typically established by a method capable of recognising the assembled beta chain — an immunoassay directed at the beta subunit, or mass spectrometry with peptide mapping across the subunit sequence. What you want to see is a statement that the beta subunit was detected or sequenced, not a bare statement that the material \"is hCG\".\n\nPurity is reported separately and by HPLC, usually as a percentage of peak area. This tells you how much of the sample is a single species, which is genuinely useful, but it cannot tell you that the species is hCG. A certificate reporting 99% purity with no identity confirmation is a well-purified unknown.\n\nBeyond those two sections, look for what is missing. Endotoxin testing matters for any biological preparation and is often absent. Residual moisture matters for lyophilised stability. Sterility is irrelevant for a non-clinical reagent and its presence on a certificate is sometimes a sign that the supplier is copying a pharmaceutical template rather than reporting on their own material.\n\nOne last point on batch numbers: they should match the vial. If the certificate you were shown is for batch A and the vial says batch B, nothing on the certificate applies to what you are holding. This is the most common documentation defect in the market and the easiest to catch at the moment of delivery.",
    },
    {
      title: "Storage, Cold Chain and Why hCG Is Less Forgiving",
      body:
        "Storage is the check that a peptide buyer can skip and a hCG buyer cannot, and it is the one almost nobody asks about because it is not on the product page.\n\nhCG is a glycosylated protein. It is more sensitive than a small synthetic peptide to three things: temperature excursions, which cause unfolding and aggregation; mechanical stress, which does the same; and repeated freeze-thaw cycles, which are cumulative. Lyophilised material is stable for extended periods under cold storage but degrades faster at ambient temperature, and every day a vial spends in a warm depot is a day of degradation that no certificate will reflect, because the certificate describes the batch at the time of analysis, not its journey since.\n\nSo the question to ask is not \"do you store it cold\" but \"how does it travel\". A UK supplier shipping domestically over 1–3 days with a cold pack and a description they can articulate is in a different position from a supplier who ships ambient and has never considered the question. Neither answer is verifiable from outside, but the answer you get tells you whether the question has been asked internally.\n\nReconstitution is the point where the material becomes fragile. A protein in solution has a short usable window compared with a reconstituted peptide, and the way it is handled matters: gentle mixing rather than vigorous shaking, appropriate diluent, and storage that respects what the supplier recommends. A supplier whose listing includes handling guidance for reconstituted material is a supplier who understands their own product. One who does not has not, and that is a signal about the depth of their quality function generally.\n\nThe honest summary: storage and handling are the checks you cannot fully verify before purchase, which is precisely why they should be weighted in combination with everything else rather than treated as a pass-fail test.",
    },
    {
      title: "TrustScore, What It Is and What It Is Not",
      body:
        "TrustScore appears on every supplier we list, so it is worth being exact about what it measures, because it is easy to over-read.\n\nIt is a composite of observable signals about a supplier's public presence: whether the site is live and returns a 200, whether a Certificate of Analysis is published, whether research-use-only language is present, whether a contact route exists, whether shipping terms are stated, whether the site has been reviewed, and whether our badge has been installed on the supplier's own domain. Each of those is checkable from outside and each contributes a fixed weight to a score out of 100.\n\nWhat that produces is a measure of how much of a real, documented business is visible from the outside. That is genuinely useful, because the failure mode this market suffers from most is not bad material — it is suppliers who are not really there. A disposable domain with a template storefront and no contact method scores low because there is nothing to score.\n\nWhat TrustScore is not: it is not an assay, not an accreditation, and not a purity claim. We do not independently test supplier vials, and no score on this site says anything about what is inside a specific batch. A supplier scoring 70 with a batch-linked certificate naming the beta subunit is a better bet for hCG than a supplier scoring 90 whose certificate reports only a purity percentage, because the score measures presence and the certificate measures the thing you actually care about.\n\nThe badge's specific value is in the way it is verified: a supplier installs it on their own domain, which demonstrates domain control. That is a cheap thing for an honest supplier to do and awkward for a throwaway operation, which is why it discriminates better than almost any other single signal we collect.",
    },
  ],
  faq: [
    {
      question: "What should a UK hCG supplier publish before I buy?",
      answer:
        "A unit figure in international units, a Certificate of Analysis referencing a specific batch with identity confirmed against the beta subunit, storage and handling information, research-use-only labelling throughout, and a contact route that replies. A traceable UK business identity and domain control are the remaining basics.",
    },
    {
      question: "Is a purity percentage enough on an hCG certificate?",
      answer:
        "No. Purity reported by HPLC shows how much of the sample is a single species; it does not show that the species is hCG. Because hCG shares its alpha chain with LH, FSH and TSH, the certificate needs to address the beta subunit, which is the part unique to hCG.",
    },
    {
      question: "Why does storage matter more for hCG than for a peptide?",
      answer:
        "hCG is a glycosylated protein and is more sensitive to temperature excursions, mechanical stress and freeze-thaw cycles than a small synthetic peptide. Lyophilised material degrades faster at ambient temperature, and reconstituted material has a short usable window compared with a reconstituted peptide.",
    },
    {
      question: "Does a high TrustScore mean safe hCG?",
      answer:
        "No. TrustScore measures observable signals about the supplier's public presence — a live site, a published COA, RUO labelling, a contact route, domain control. It is not an assay and does not say anything about the contents of a specific batch. Read it alongside the certificate, not instead of it.",
    },
  ],
  sources: [
    {
      label: "UniProt P01215 — Glycoprotein hormones alpha chain (CGA), identical across hCG, LH, FSH and TSH",
      url: "https://www.uniprot.org/uniprotkb/P01215/entry",
    },
    {
      label: "UniProt P01233 — Choriogonadotropin subunit beta (CGB), human; the specificity-conferring chain",
      url: "https://www.uniprot.org/uniprotkb/P01233/entry",
    },
    {
      label: "Chorionic Gonadotropin (Human) — BNF monograph; UK prescription-only classification",
      url: "https://bnf.nice.org.uk/drugs/chorionic-gonadotropin/",
    },
  ],
  tableMode: "trust",
  tableHeading: "hCG Supplier UK — Ranked by Verification and TrustScore",
  rowLimit: 12,
};
