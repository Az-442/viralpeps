import type { ResearchPageContent, ResearchSection } from "./research-content-hmg-price";

// appended by Class C queue day 11 (KLOW) — see class-c-article-queue.md
export const klowContent: Record<string, ResearchPageContent> = {
  "klow-research-guide": {
    slug: "klow-research-guide",
    compoundSlug: "klow",
    pullQuote:
      "KLOW is a formulation, not a molecule — it has no CAS number, no formula and no molecular weight of its own. Every fact worth stating about it belongs to one of its four components, and the published record studies those four separately, never together.",
    quickInfo: [
      { label: "Class", value: "Four-peptide co-formulation (research use only)" },
      { label: "Components", value: "BPC-157, GHK-Cu, TB-500, KPV" },
      { label: "Typical ratio", value: "1:5:1:1 — GHK-Cu dominant by mass" },
      { label: "Own CAS / formula / MW", value: "None — the blend is not a single substance" },
      { label: "Related preparation", value: "GLOW — the same three peptides without KPV" },
      { label: "Blend-level clinical data", value: "None published" },
      { label: "Component literature", value: "Predominantly preclinical" },
      { label: "UK listings tracked", value: "65 catalogue sources" },
    ],
    sections: [
      {
        title: "What KLOW Actually Is",
        body:
          "KLOW is the catalogue name for a research preparation that supplies four peptides in a single vial: BPC-157, GHK-Cu, TB-500 and KPV. In most listings the four are co-lyophilised — freeze-dried together into one cake — in a ratio of roughly 1:5:1:1, which makes GHK-Cu about 50 mg of an 80 mg vial and the other three about 10 mg each.\n\nThe name is a composition label, not a compound name. This distinction matters more than it first appears. A compound name refers to one identifiable substance with a defined structure, a CAS registry number and a molecular weight. A formulation name refers to a mixture whose contents are specified as a list of components, each with its own identity. KLOW is the second kind. It has no CAS number, no molecular formula, no molecular weight and no amino-acid sequence, because there is no single molecule to describe. Any page that quotes one of those figures for KLOW as a whole is describing something that does not exist.\n\nKLOW is also a derivation of an earlier three-peptide preparation, GLOW, which supplies BPC-157, GHK-Cu and TB-500 without KPV. KLOW is GLOW plus a fourth sequence. That is a statement about what is in the vial. It is not a statement that the fourth peptide adds anything, because no study has compared the two head to head.\n\nThe [KLOW compound page](/compounds/klow) lists each UK supplier product by strength and format, which is the practical starting point for anyone comparing what is actually on the market.",
      },
      {
        title: "Molecular Identity — Component by Component",
        body:
          "Because KLOW has no identity of its own, the honest identity block is four identities. All figures below were retrieved from PubChem and are reproducible.\n\n**BPC-157.** Pentadecapeptide, 15 amino acids, a fragment of a protein originally characterised in gastric juice. PubChem CID 9941957; molecular formula C62H98N16O22; average mass 1419.5 Da; CAS 137525-51-0.\n\n**GHK-Cu.** The copper(II) complex of the tripeptide glycyl-histidyl-lysine. This is where most catalogues go wrong. The free tripeptide GHK is CID 73587, formula C14H24N6O4, mass 340.38 Da, CAS 49557-75-7. The copper complex is a different substance: CID 71587328, formula C14H23CuN6O4+, mass 402.92 Da, CAS 89030-95-5, also indexed as prezatide copper or copper tripeptide-1. The gap between 340.38 and 402.92 is roughly 62 Da — the copper atom and a proton. If a page quotes 340 for a copper peptide product, it is quoting the free peptide and the number is wrong for the material in the vial.\n\n**TB-500.** A synthetic peptide based on the actin-binding region of thymosin β4, a 43-residue protein. The parent protein is PubChem CID 45382195, formula C212H350N56O78S, mass approximately 4,963 Da. TB-500 itself is a fragment rather than the full protein, and no separate CAS registry number is issued for it. Component pages routinely call the parent \"44-amino-acid\", which is one residue out; the human sequence is 43.\n\n**KPV.** The C-terminal tripeptide of α-melanocyte-stimulating hormone — lysine-proline-valine. PubChem CID 125672, listed under the name \"Msh (11-13)\", formula C16H30N4O4, mass 342.43 Da, CAS 67727-97-3.\n\nOne practical warning on that last entry. Searching PubChem for the bare string \"KPV\" does not return the peptide. It returns CID 13294447, 5-phenyl-2-keto-valeric acid — a small organic acid with formula C11H12O3 and mass 192.21 Da, entirely unrelated to the tripeptide. The peptide has to be retrieved as \"Lys-Pro-Val\" or \"Msh (11-13)\". Anyone verifying identity by typing the three-letter code into a database and copying the first hit will record the wrong molecule.",
      },
      {
        title: "Mechanism of Action — Four Separate Stories",
        body:
          "There is no KLOW mechanism. There are four component mechanisms, each studied in its own literature, and nothing in the published record describes how they interact when co-administered.\n\n**BPC-157** is described as pleiotropic, meaning no single receptor has been identified. Research has examined VEGFR2-associated angiogenesis, the nitric-oxide system and ERK1/2 signalling in various models. The gastrointestinal literature is the deepest strand, largely rodent-based.\n\n**GHK-Cu** has an unusually broad literature for a tripeptide, including a distinctive gene-expression-profiling strand. The copper is functional rather than incidental: the complex is studied in the context of copper-dependent enzymes and matrix remodelling. Much of this work is in vitro, computational, or animal-based.\n\n**TB-500** derives its rationale from actin sequestration — the parent protein binds G-actin, and the fragment is studied for cell migration. That is the best-characterised biochemistry in the group. The wider claims attached to it in commercial writing run considerably further than the actin literature supports.\n\n**KPV** is the most mechanistically specific of the four. It is taken up by the PepT1 transporter and studied for reduction of NF-κB and MAP-kinase inflammatory signalling in cell and rodent models. The PepT1 route is why the KPV literature clusters around intestinal inflammation rather than skin.\n\nPutting those four mechanisms in one vial is a formulation decision. Describing them as \"four complementary pathways working together\" is a marketing construction that appears on many supplier pages and has no experimental basis — no study has administered the combination, so the interaction is untested rather than complementary.",
      },
      {
        title: "What the Research Literature Actually Shows",
        body:
          "The central finding for anyone assessing KLOW is an absence: there is essentially no peer-reviewed research on the four peptides administered together. No controlled study establishes what the preparation does as a unit. No study compares it against any single component. No study establishes that the 1:5:1:1 ratio is optimal, or even that it was derived from anything other than catalogue convenience.\n\nThe reason is structural rather than conspiratorial. Peptide research is built around single defined molecules, precisely so that an observed effect can be attributed to one substance. A four-component blend introduces four variables at once and cannot attribute anything. Studying it properly would be a separate programme of work with its own design and controls. Nobody has run it.\n\nThe component literature is real but uneven, and every strand of it is predominantly preclinical. Representative verified citations:\n\n- Sikiric P et al., \"Stable gastric pentadecapeptide BPC 157: novel therapy in gastrointestinal tract\", *Current Pharmaceutical Design*, 2011 — PMID 21548867.\n- Pickart L and Margolina A, \"Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data\", *International Journal of Molecular Sciences*, 2018 — PMID 29986520.\n- Goldstein AL, Hannappel E and Kleinman HK, \"Thymosin beta4: actin-sequestering protein moonlights to repair injured tissues\", *Trends in Molecular Medicine*, 2005 — PMID 16099219.\n- Dalmasso G et al., \"PepT1-mediated tripeptide KPV uptake reduces intestinal inflammation\", *Gastroenterology*, 2008 — PMID 18061177.\n- Getting SJ, Schiöth HB and Perretti M, \"Dissection of the anti-inflammatory effect of the core and C-terminal (KPV) alpha-melanocyte-stimulating hormone peptides\", *Journal of Pharmacology and Experimental Therapeutics*, 2003 — PMID 12750433.\n\nEach of those supports a claim about one peptide. None of them supports a claim about KLOW. Mixing them into a single reference list on a blend page is the most common form of overstatement in this category: the citations are genuine, the inference does not follow.",
      },
      {
        title: "Provenance — Where the Name Comes From",
        body:
          "KLOW does not appear in the scientific literature. It is a commercial catalogue name, and its history is short and traceable to supplier marketing rather than to a discovery paper.\n\nThe pattern is visible. GLOW — BPC-157, GHK-Cu and TB-500 — circulated as a skin and repair blend in the cosmetic-peptide resale market. KLOW extended it with KPV, which brought a fourth mechanism into the story and a fourth sequence onto the label. The lettering is a branding choice, not a nomenclature standard; no IUPAC or IUBMB convention produces it.\n\nThe consequence for anyone reading about KLOW is that the sourcing hierarchy has to be inverted compared with a normal compound. For a compound with a discovery paper, you read the paper first and the vendor last. For KLOW there is no discovery paper to read, so the vendor page is the only primary description of what the product is — and vendor pages disagree with each other about composition, ratio and strength. The UK market alone currently lists 80 mg blends, an odd 70 mg listing that is actually the three-peptide GLOW total, a 160 mg listing, and a handful of listings with no stated strength at all.\n\nThat is the honest provenance story: a marketing name attached to a formulation, with no originating study, no standardised specification and no agreed definition across the suppliers using it.",
      },
      {
        title: "The Blend Question — Why Measurement Is Harder Than It Looks",
        body:
          "A certificate of analysis for a single peptide asks a simple question: is this the right molecule, and how pure is it? HPLC gives a purity percentage; mass spectrometry confirms identity. For a four-component blend the question splits in two, and most certificates only answer one half.\n\nPer-component identity testing confirms that each of the four sequences is present. That is useful, and it is what most suppliers mean by \"each component verified independently\". It does not confirm that they are present in the stated ratio. Four passing identity lines are equally consistent with a 1:5:1:1 vial and with a 1:1:1:1 vial.\n\nThe test that speaks to proportion is a net-content assay — a quantitative measurement of how many milligrams of each component are actually in the vial. That number can be reconciled against the label. This is where the category is weakest: certificates frequently omit net content, and where it is present it is not always reconciled.\n\nA worked example from a live UK-facing listing makes the point better than any abstract warning. One supplier's page states a composition of GHK-Cu 50 mg, BPC-157 10 mg, TB-500 10 mg and KPV 10 mg — 80 mg total — and then publishes a certificate panel reporting measured net content of GHK-Cu 67.05 mg, KPV 13.89 mg, BPC-157 10.37 mg and TB-500 8.63 mg. Those four figures sum to 99.94 mg. Against the label, GHK-Cu is 34 percent high, KPV is 39 percent high, BPC-157 is 3.7 percent high and TB-500 is 13.7 percent low. The page presents both the label and the certificate without ever reconciling them.\n\nEither figure could be right depending on what was measured — total peptide mass, mass of a salt form, or something else. The point is not that the product is defective. The point is that a certificate which does not reconcile with the label on the same page tells a researcher nothing about whether the vial contains what it says it contains. Reading a COA means doing the arithmetic, not just checking that a document exists.",
      },
      {
        title: "Regulatory Position and Practical Handling",
        body:
          "None of the four components is approved by any medicines regulator for a combined use, and no approved product combines them. In the UK, peptide products sold for laboratory research sit outside the licensed-medicines framework provided they are genuinely supplied for research use and not for human administration; a supplier marketing to consumers for self-administration is in different territory entirely.\n\nTwo components appear on the WADA Prohibited List — BPC-157 and TB-500 — which is relevant to any researcher working with athletes or in a sports-science context, and relevant to anyone who assumes that \"research chemical\" implies no regulatory footprint.\n\nHandling notes are generic and apply to each component: lyophilised material should be stored sealed, protected from light and moisture, and refrigerated or frozen depending on the intended storage duration. GHK-Cu adds a copper-complex consideration, since copper content and stoichiometry are part of what makes the material reproducible rather than a decorative detail.\n\nWhat matters for this page is the framing. KLOW is supplied for in-vitro laboratory research. Nothing here describes administration to a person, and the articles on this site do not provide dosing information for any compound.",
      },
      {
        title: "How to Read a KLOW Claim",
        body:
          "A short checklist, built from the failure patterns above, for evaluating anything written about this blend.\n\n**Does it quote a CAS number, formula or molecular weight for KLOW itself?** If yes, it is wrong. Those belong to the components.\n\n**Does it quote 340 Da for the copper peptide?** That is free GHK, not GHK-Cu. The complex is 402.92 Da.\n\n**Does it call thymosin β4 44 amino acids?** The human sequence is 43. Off-by-one, but it indicates the component sections were written without consulting the cited paper.\n\n**Does it claim the ratio is \"established by the research\"?** No published study establishes the ratio. It is a formulation choice.\n\n**Does it present component citations as support for the blend?** Five genuine PMIDs about four separate peptides do not support a claim about the four together.\n\n**Does it reconcile a certificate against the label?** If it shows a COA without doing the arithmetic, it has not verified anything.\n\nApplying that checklist to the pages currently ranking for KLOW leaves very little standing. That is not a reason to dismiss the components — each has a real literature — but it is a reason to treat blend-level claims with far more caution than component-level claims. The [KLOW compound page](/compounds/klow) is the place to start on what is actually listed in the UK, and the [full vendor list](/vendors) covers who is selling it.",
      },
    ],
    faq: [
      {
        question: "Does KLOW have a CAS number?",
        answer:
          "No. KLOW is a four-component formulation, not a single substance, so no CAS registry number, molecular formula, molecular weight or sequence exists for it. Each of the four components has its own identity: BPC-157 is CAS 137525-51-0, GHK-Cu is CAS 89030-95-5, KPV is CAS 67727-97-3, and TB-500 has no separate registry number issued.",
      },
      {
        question: "Is there research on the KLOW blend itself?",
        answer:
          "Essentially none. The published literature studies BPC-157, GHK-Cu, TB-500 and KPV separately, and those bodies of work are predominantly preclinical. No controlled study administers the four together, and none compares the blend against any single component.",
      },
      {
        question: "What is the difference between KLOW and GLOW?",
        answer:
          "GLOW is the three-peptide preparation of BPC-157, GHK-Cu and TB-500. KLOW is those same three plus KPV, a fourth sequence derived from α-MSH. That is a difference in what is in the vial. No study compares the two preparations, so no claim about which is more effective can be made from the literature.",
      },
      {
        question: "Why is GHK-Cu 50 mg when the other three are 10 mg?",
        answer:
          "The 1:5:1:1 ratio reflects supplier formulation practice rather than a published finding. GHK-Cu is the most abundant component by mass in every KLOW listing we track. No study establishes that this ratio is optimal, and it should be read as a catalogue specification rather than a research result.",
      },
      {
        question: "Can a certificate of analysis prove a blend's ratio?",
        answer:
          "Only if it reports quantitative net content per component, and only if those figures are reconciled against the label. Identity testing alone confirms that each sequence is present but says nothing about proportion. Several certificates omit net content entirely, which means the ratio cannot be verified from the document.",
      },
    ],
    references: [
      "Sikiric P et al. Stable gastric pentadecapeptide BPC 157: novel therapy in gastrointestinal tract. Curr Pharm Des. 2011. PMID 21548867.",
      "Pickart L, Margolina A. Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data. Int J Mol Sci. 2018. PMID 29986520.",
      "Goldstein AL, Hannappel E, Kleinman HK. Thymosin beta4: actin-sequestering protein moonlights to repair injured tissues. Trends Mol Med. 2005. PMID 16099219.",
      "Dalmasso G et al. PepT1-mediated tripeptide KPV uptake reduces intestinal inflammation. Gastroenterology. 2008. PMID 18061177.",
      "Getting SJ, Schiöth HB, Perretti M. Dissection of the anti-inflammatory effect of the core and C-terminal (KPV) alpha-melanocyte-stimulating hormone peptides. J Pharmacol Exp Ther. 2003. PMID 12750433.",
      "Molecular identity verified against PubChem records CID 9941957 (BPC-157), CID 71587328 (prezatide copper), CID 73587 (GHK free peptide), CID 45382195 (thymosin beta-4), CID 125672 (Msh 11-13).",
    ],
  },
};
