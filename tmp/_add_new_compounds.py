import json

COMP = 'src/data/compounds.json'
c = json.load(open(COMP))
have = {x["slug"] for x in c}

# VialVerse stocks these; we have no master compound for them.
# Each is a genuine, distinct research peptide. Minimal but complete master entries
# (per skill: only add a compound when at least one listed vendor stocks it).
NEW = [
{
  "id": "abaloparatide",
  "slug": "abaloparatide",
  "name": "Abaloparatide",
  "aliases": ["BAL", "Abaloparatide Acetate", "BA058"],
  "category": "growth-hormone",
  "description": "Abaloparatide is a synthetic 34-amino-acid analogue of parathyroid hormone-related protein (PTHrP) developed for the study of bone anabolism. It acts as a selective agonist at the PTH1 receptor, with a conformational profile that favours the RG (G-protein-coupled) receptor state over the R0 state. In research models it is used to investigate osteoblast-driven bone formation, bone mineral density signalling and calcium homeostasis.",
  "mechanism": "Selective agonist at the PTH1 receptor (PTH1R). Preferential binding to the RG conformation of PTH1R drives Gs/cAMP signalling with relatively less beta-arrestin recruitment than PTH(1-34), shifting the downstream response profile toward anabolic bone formation. Signalling through cAMP/PKA in osteoblasts upregulates markers of osteoblast differentiation and increases bone formation rate in research models.",
  "cas": "247062-33-5",
  "molarMass": "3960.5 g/mol",
  "sequence": "Ala-Val-Ser-Glu-His-Gln-Leu-Leu-His-Asp-Lys-Gly-Lys-Ser-Ile-Gln-Asp-Leu-Arg-Arg-Arg-Glu-Leu-Leu-Glu-Lys-Leu-Leu-Glu-Lys-Leu-Leu-Glu-Lys-Leu",
  "purity": "≥98%",
  "form": "Lyophilised powder",
  "halfLife": "~1.7 hours (subcutaneous, research data)",
  "researchAreas": ["Bone formation", "Osteoblast signalling", "PTH1R agonist studies", "Calcium homeostasis"],
  "commonDosages": ["3mg"],
  "sources": [
    {
      "vendor": "VialVerse",
      "url": "https://vialverse.com/peptides/abaloparatide",
      "price": "£85.00",
      "inStock": True,
      "image": "/images/products/vialverse/abaloparatide.webp",
      "dosage": "3mg"
    }
  ]
},
{
  "id": "teriparatide",
  "slug": "teriparatide",
  "name": "Teriparatide",
  "aliases": ["PTH (1-34)", "rhPTH(1-34)", "Forteo"],
  "category": "growth-hormone",
  "description": "Teriparatide is the recombinant 1-34 N-terminal fragment of human parathyroid hormone, the biologically active portion of PTH. It is the classic anabolic PTH receptor agonist used in bone research. Unlike the full-length hormone, the 1-34 fragment retains the osteoanabolic signalling activity while having a much shorter circulating half-life, making it a standard tool for studying intermittent PTH exposure and bone remodelling.",
  "mechanism": "Binds and activates the PTH1 receptor (PTH1R) on osteoblasts, stimulating adenylyl cyclase via Gs and raising intracellular cAMP. Intermittent activation favours osteoblast differentiation and bone formation, whereas continuous elevation favours resorption. Downstream signalling also involves PKC and calcium mobilisation. The 1-34 fragment reproduces the full receptor-activating profile of native PTH.",
  "cas": "52232-67-4",
  "molarMass": "4117.7 g/mol",
  "sequence": "Ser-Val-Ser-Glu-Ile-Gln-Leu-Met-His-Asn-Leu-Gly-Lys-His-Leu-Asn-Ser-Met-Glu-Arg-Val-Glu-Trp-Leu-Arg-Lys-Lys-Leu-Gln-Asp-Val-His-Asn-Phe",
  "purity": "≥98%",
  "form": "Lyophilised powder",
  "halfLife": "~1 hour (subcutaneous, research data)",
  "researchAreas": ["Bone formation", "Osteoblast signalling", "PTH1R agonist studies", "Calcium homeostasis"],
  "commonDosages": ["750mcg"],
  "sources": [
    {
      "vendor": "VialVerse",
      "url": "https://vialverse.com/peptides/teriparatide",
      "price": "£55.00",
      "inStock": True,
      "image": "/images/products/vialverse/teriparatide.webp",
      "dosage": "750mcg"
    }
  ]
},
{
  "id": "thymulin",
  "slug": "thymulin",
  "name": "Thymulin",
  "aliases": ["FTS", "Facteur Thymique Sérique", "Serum Thymic Factor"],
  "category": "immunity-peptides",
  "description": "Thymulin is a nonapeptide produced by thymic epithelial cells and is the classic serum thymic factor. It requires a bound zinc ion for biological activity. Thymulin is studied as a marker and mediator of thymic endocrine function, with research interest in T-cell differentiation, immune modulation and the decline of thymic output with age.",
  "mechanism": "Acts on T-lymphocytes via a specific high-affinity receptor, promoting T-cell differentiation and enhancing the function of T-helper and natural killer cell populations. Its activity is strictly zinc-dependent — the Zn2+ ion held in the peptide's coordination pocket is required for receptor binding, and the metal-free peptide is biologically inactive.",
  "cas": "63958-90-7",
  "molarMass": "858.0 g/mol (peptide; Zn complex ~923 g/mol)",
  "sequence": "Glu-Ala-Lys-Ser-Gln-Gly-Gly-Ser-Asn",
  "purity": "≥98%",
  "form": "Lyophilised powder",
  "halfLife": "Short (minutes in circulation; research data)",
  "researchAreas": ["T-cell differentiation", "Thymic endocrine function", "Immune modulation", "Zinc-dependent signalling"],
  "commonDosages": ["10mg"],
  "sources": [
    {
      "vendor": "VialVerse",
      "url": "https://vialverse.com/peptides/thymulin",
      "price": "£32.00",
      "inStock": True,
      "image": "/images/products/vialverse/thymulin.webp",
      "dosage": "10mg"
    }
  ]
},
{
  "id": "tesamorelin-ipamorelin",
  "slug": "tesamorelin-ipamorelin",
  "name": "Tesamorelin + Ipamorelin",
  "aliases": ["Tesa/Ipa Blend", "Tesamorelin Ipamorelin Blend"],
  "category": "growth-hormone",
  "description": "A two-component growth-hormone research blend combining tesamorelin, a stabilised GHRH(1-44) analogue, with ipamorelin, a selective ghrelin-receptor (GHS-R1a) agonist. The pairing is studied for its complementary mechanism: tesamorelin drives GHRH-receptor signalling at the pituitary while ipamorelin acts on the ghrelin receptor, producing a combined secretagogue effect with less cortisol and prolactin elevation than older GHRP analogues.",
  "mechanism": "Tesamorelin binds the GHRH receptor on anterior pituitary somatotrophs, raising cAMP and priming GH synthesis and release. Ipamorelin selectively activates the ghrelin receptor (GHS-R1a), triggering Gq/11-mediated calcium mobilisation and GH release, and suppressing somatostatin tone. Together the two receptors act synergistically on GH release while ipamorelin's selectivity limits ACTH/cortisol and prolactin co-stimulation.",
  "cas": "218949-48-5 (tesamorelin) / 170851-70-4 (ipamorelin)",
  "molarMass": "5134.9 g/mol (tesamorelin) / 711.9 g/mol (ipamorelin)",
  "sequence": "Blend — tesamorelin: trans-3-hexenoyl-Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-Gln-Gln-Gly-Glu-Ser-Asn-Gln-Glu-Arg-Gly-Ala-Arg-Ala-Arg-Leu-NH2 ; ipamorelin: Aib-His-D-2-Nal-D-Phe-Lys-NH2",
  "purity": "≥98%",
  "form": "Lyophilised powder",
  "halfLife": "Tesamorelin ~26-38 min; Ipamorelin ~2 hours (research data)",
  "researchAreas": ["Growth hormone release", "GHRH receptor signalling", "Ghrelin receptor signalling", "Body composition"],
  "commonDosages": ["10mg"],
  "sources": [
    {
      "vendor": "VialVerse",
      "url": "https://vialverse.com/peptides/tesamorelin-ipamorelin",
      "price": "£42.00",
      "inStock": True,
      "image": "/images/products/vialverse/tesamorelin-ipamorelin.webp",
      "dosage": "10mg"
    }
  ]
},
]

added = []
for rec in NEW:
    if rec["slug"] in have:
        print(f"SKIP (exists): {rec['slug']}")
        continue
    c.append(rec)
    added.append(rec["slug"])
    print(f"ADDED master compound: {rec['slug']:26} ({rec['name']}) - {len(rec['sources'])} source")

json.dump(c, open(COMP, 'w'), indent=2, ensure_ascii=False)
print("\nadded:", added)
print("total compounds:", len(c))
