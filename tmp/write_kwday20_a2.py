#!/usr/bin/env python3
"""Write the weight-loss-peptide-suppliers-uk fragment (Day-20 article 2).

Article type: (grouped) -> section: research-hub. No compoundSlug (grouped supplier guide).
Stats from compounds.json (Oct 2026): 70 WL vendors, 305 WL listings across 15 compounds;
GLP-1/incretin subgroup 64 vendors / 281 listings.
"""

FRAG = r"""  'weight-loss-peptide-suppliers-uk': {
    slug: 'weight-loss-peptide-suppliers-uk',
    pullQuote: 'Weight loss is the only compound category in the UK research market where the suppliers mostly do not sell what the buyers think they are buying. The molecules with actual clinical evidence — semaglutide, tirzepatide, retatrutide — are prescription-only medicines in the UK, and no research-chemical vendor can lawfully sell them for human use. What the catalogue actually lists is the same category of unlicensed research reagent as everything else on the site, and the gap between the clinical reality and the listing language is the most expensive trap in the market.',
    quickInfo: [
      { label: 'Category', value: 'Weight-loss and metabolic research peptides (GLP-1, dual and triple agonists, and metabolic adjuvants)' },
      { label: 'UK vendors stocking the category', value: '70 vendors across 15 tracked compounds' },
      { label: 'Priced listings tracked', value: '305 (October 2026 snapshot)' },
      { label: 'GLP-1 / incretin subgroup', value: '64 vendors, 281 listings' },
      { label: 'Cheapest category entry', value: 'L-Carnitine GBP 9.99; semaglutide and tirzepatide both from GBP 14.75' },
      { label: 'Most-stocked compound', value: 'Retatrutide — 138 listings, 55 vendors' },
      { label: 'Regulatory status in the UK', value: 'Semaglutide and tirzepatide are prescription-only medicines; retatrutide is unlicensed everywhere' },
      { label: 'Key hazard', value: 'Listings that imply a licensed medicine while selling an unlicensed research reagent' },
    ],
    sections: [
      {
        title: 'What "Weight Loss Peptide Suppliers UK" Actually Means',
        body: 'This is the most searched and least understood corner of the UK peptide market, and the confusion is structural rather than incidental.\\n\\nThe category mixes two completely different things under one heading:\\n\\n**Prescription medicines.** Semaglutide (Ozempic, Wegovy) and tirzepatide (Mounjaro, Zepbound) are licensed medicines in the UK, prescribed through the NHS or private clinicians for type 2 diabetes and obesity. They are regulated medicines with real human trial data behind them.\\n\\n**Research peptides.** The same named molecules — plus retatrutide, survodutide, mazdutide and a set of metabolic adjuvants — are sold by research-chemical vendors as lyophilised powders for laboratory use. These listings are not medicines, cannot lawfully be sold for human use, and are governed by the same research-reagent framing as every other peptide on this site.\\n\\nWhen someone searches "weight loss peptide suppliers UK," they may want either. The suppliers almost all sit on the research-reagent side, and the successful ones make that clear. The ones to avoid are the listings that borrow clinical language — "Ozempic alternative," "same as Mounjaro" — while selling an unlicensed reagent.\\n\\n[**Compare every semaglutide price ->**](/compounds/semaglutide) · [**Compare every tirzepatide price ->**](/compounds/tirzepatide) · [**Compare every retatrutide price ->**](/compounds/retatrutide)',
      },
      {
        title: 'The UK Supply Market — 70 Vendors, 15 Compounds, 305 Listings',
        body: 'As of October 2026 ViralPeps tracks **70 UK vendors selling 305 priced weight-loss listings across 15 compounds**, with the incretin subgroup alone accounting for **64 vendors and 281 listings**. That makes weight loss the second-deepest category in the catalogue after recovery, and by far the most concentrated in buyer attention.',
        table: {
          header: ['Compound', 'Vendors', 'Listings', 'Lowest Price', 'What It Is'],
          rows: [
            ['Retatrutide', '55', '138', 'GBP 18.45', 'Triple GLP-1/GIP/glucagon agonist; unlicensed everywhere'],
            ['Tirzepatide', '36', '90', 'GBP 14.75', 'Dual GIP/GLP-1 agonist; a licensed medicine in the UK'],
            ['Semaglutide', '20', '31', 'GBP 14.75', 'GLP-1 agonist; a licensed medicine in the UK'],
            ['L-Carnitine', '8', '10', 'GBP 9.99', 'Metabolic adjuvant solution, not an incretin'],
            ['Mazdutide', '7', '7', 'GBP 27.99', 'Dual GLP-1/glucagon agonist (investigational)'],
            ['Lipo-C', '6', '6', 'GBP 24.49', 'Lipotropic injection blend, not an incretin'],
            ['Survodutide', '5', '5', 'GBP 39.00', 'Dual GLP-1/glucagon agonist (investigational)'],
            ['Adipotide (FTPP)', '4', '4', 'GBP 33.99', 'Adipose-targeting peptide; early-stage'],
            ['Eloralintide', '3', '3', 'GBP 70.00', 'Amylin analogue (investigational)'],
            ['GLP-3 (RT)', '3', '3', 'GBP 59.00', 'Vendor-labelled retatrutide variant; naming is non-standard'],
          ],
        },
      },
      {
        title: 'The Four Traps That Define This Category',
        body: 'Weight loss attracts more misleading listings than any other category on the site, because the clinical drugs are famous and the research reagents are not. These are the four traps that matter.',
        subsections: [
          {
            title: 'Trap 1 — Clinical branding on a research reagent',
            body: 'A listing that names Ozempic, Wegovy or Mounjaro is either selling a licensed medicine it cannot lawfully sell, or borrowing the name of a licensed medicine to sell an unlicensed reagent. Both are red flags. A legitimate research vendor names the molecule (semaglutide), states the form (lyophilised powder) and does not repeatedly reference brand-name medicines. The words "Ozempic alternative" on a research-chemical listing are a marketing device, not a specification.',
          },
          {
            title: 'Trap 2 — The purity number with no mass confirmation',
            body: 'GLP-1 analogues are large, modified peptides — semaglutide is a 31-residue backbone with a fatty-acid side chain, tirzepatide is a 39-residue dual agonist. These are among the most synthetically demanding compounds on the site, which makes identity confirmation more important here than for a short fragment. A "99% pure" claim without a mass-spectrometry result that matches the expected mass of the analogue is not verification. Demand the method and the mass.',
          },
          {
            title: 'Trap 3 — Non-standard names hiding non-standard molecules',
            body: 'The catalogue contains listings such as "GLP-3 (RT)" — a vendor coinage that appears to reference retatrutide but is not a standard chemical name. On a category this hyped, invented names are a way to sell an uncharacterised or mislabelled product without claiming to be a specific licensed compound. If a listing does not use the standard INN for the molecule, treat the specification as unverified until the vendor provides an identity document.',
          },
          {
            title: 'Trap 4 — Dose confusion between research and clinical units',
            body: 'Clinical semaglutide and tirzepatide are dosed in milligrams on a titrated weekly schedule; research listings are sold as milligram vials of lyophilised powder with no dosing guidance. Buyers arriving from the clinical world frequently assume the research listing maps onto a clinical protocol. It does not. A research vial is a reagent, and the gulf between a licensed medicine and an unlicensed powder with the same name is the entire reason this category needs its own guide.',
          },
        ],
      },
      {
        title: 'Which Suppliers Sit Where',
        body: 'The category is served by two broad types of vendor, and they carry different risk profiles.\\n\\n**Breadth vendors** — operations such as those tracking five or more weight-loss compounds — treat the category as one shelf among many and usually sell the incretins alongside recovery, growth-hormone and cosmetic peptides. They are not specialists, and the practical question is whether their identity paperwork is consistent across the whole catalogue, not just the flagship listing.\\n\\n**Depth vendors** — operations carrying one or two incretins but many dose tiers — are effectively retatrutide or tirzepatide specialists. Depth often means better batch documentation for the molecule they focus on, but it also means their listing language tends to drift toward the clinical register, because that is what their buyers search for.\\n\\nIn neither case does the supplier type tell you the reagent is verified. The verification is the certificate, not the storefront. Because this category spans compounds of very different sizes and modifications, the checks are the same ones set out in the [**how to read a CoA guide ->**](/research/how-to-read-a-coa): state the sequence, confirm the mass, batch-match the certificate, and treat the brand name on the listing as advertising rather than evidence.',
      },
      {
        title: 'The Clinical Context Buyers Should Have',
        body: 'The reason weight-loss peptides are searched so heavily is that the incretins are genuinely effective medicines, and it is worth stating the real numbers plainly, because they are the benchmark against which any research listing should be read.\\n\\n**Semaglutide** produced roughly 14.9% mean weight loss in the STEP-1 trial of adults with overweight or obesity. **Tirzepatide** produced up to about 20.9% in SURMOUNT-1 — the strongest result of any phase 3 obesity trial. **Retatrutide**, the triple agonist, produced around 24% at its highest dose in a phase 2 trial. These are licenced or investigational medicines, delivered by titration under clinical supervision, with monitoring.\\n\\nNone of that transfers to a research vial. The trial results describe a regulated drug in a controlled protocol, not a lyophilised powder sold for laboratory use. When a research listing implies the clinical result, it is conflating a medicine with a reagent — and that conflation is the single most useful thing for a buyer in this category to be able to spot.\\n\\nFor the trial-level detail, see the [**tirzepatide for weight loss guide ->**](/research/tirzepatide-for-weight-loss), the [**semaglutide for weight loss guide ->**](/research/semaglutide-for-weight-loss), and the [**survodutide for weight loss guide ->**](/research/survodutide-for-weight-loss). The head-to-head compound comparisons are covered in [**tirzepatide vs survodutide ->**](/research/tirzepatide-vs-survodutide) and [**retatrutide vs tirzepatide ->**](/research/retatrutide-vs-tirzepatide).',
      },
      {
        title: 'How to Evaluate a Weight-Loss Supplier',
        body: 'Stripped of the marketing, the evaluation is the same as for any research reagent, with one category-specific addition.\\n\\n**One — does the listing avoid clinical branding?** A vendor that names the molecule and states the form is being straight; one that leads with Ozempic or Mounjaro is selling a feeling.\\n\\n**Two — is there a mass-spectrometry identity confirmation?** For a modified 31- or 39-residue analogue this is the decisive document. Purity without mass does not confirm you have the right molecule.\\n\\n**Three — is the certificate batch-matched and dated?** Same rule as everywhere: no batch number, no date, no lab name — no claim.\\n\\n**Four — does the price sit in a defensible band?** The category floor is roughly GBP 14.75 for semaglutide and tirzepatide, and the wide spread above it reflects brand positioning and dose tier rather than molecule difficulty.\\n\\n**Five, and specific to this category — is the listing honest about what it is not?** The best weight-loss vendors say plainly that their product is a research reagent and not a medicine. That sentence is worth more than any purity badge.\\n\\nFor the broader supplier landscape, the [**UK peptide directory ->**](/research/uk-peptide-directory) covers all 106 vendors, and the [**best peptides for weight loss ->**](/research/best-peptides-for-weight-loss) guide compares the compounds on evidence rather than price.',
      },
    ],
    faq: [
      { question: 'How many UK vendors sell weight-loss peptides?', answer: 'As of October 2026 ViralPeps tracks 70 UK vendors selling 305 priced weight-loss listings across 15 compounds. The incretin subgroup alone accounts for 64 vendors and 281 listings, led by retatrutide (55 vendors, 138 listings).' },
      { question: 'Can I legally buy semaglutide or tirzepatide as a research peptide in the UK?', answer: 'Semaglutide and tirzepatide are prescription-only medicines in the UK. Research-chemical vendors sell the same named molecules as unlicensed laboratory reagents, which cannot lawfully be sold for human use. Buying a research reagent is not the same as obtaining a licensed medicine, and the listings that blur the two are the ones to avoid.' },
      { question: 'Why is retatrutide so widely stocked if it is unlicensed?', answer: 'Retatrutide is an investigational triple agonist not approved anywhere, so it cannot be a licensed medicine — which leaves the research-reagent market as its only route to buyers. That is why it is the most-stocked compound in the category (55 UK vendors) despite having no approved status anywhere in the world.' },
      { question: 'What is a fair price for a weight-loss research peptide in the UK?', answer: 'The category floor is roughly GBP 14.75 (semaglutide and tirzepatide). Retatrutide starts around GBP 18.45. For the larger modified analogues, low prices deserve scrutiny on fill size and batch documentation rather than being taken as a bargain.' },
      { question: 'How do I verify a weight-loss peptide supplier?', answer: 'Five checks: the listing avoids clinical branding; a mass-spectrometry identity confirmation is available; the certificate is batch-matched and dated; the price sits in a defensible band; and the vendor states plainly that its product is a research reagent, not a medicine. [**How to read a CoA ->**](/research/how-to-read-a-coa)' },
      { question: 'Are "GLP-3" listings the same as retatrutide?', answer: 'Not verifiably. "GLP-3 (RT)" is a vendor coinage, not a standard chemical name. It appears to reference retatrutide, but without an identity document you cannot confirm which molecule is being sold. Treat non-standard names as unverified specifications.' },
    ],
    references: [
      'Wilding JPH, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity. N Engl J Med. 2021;384(11):989-1002. PMID: 33567185.',
      'Jastreboff AM, et al. Tirzepatide Once Weekly for the Treatment of Obesity. N Engl J Med. 2022;387(3):205-216. PMID: 35658024.',
      'Fr\u00edas JP, et al. Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes. N Engl J Med. 2021;385(6):503-515. PMID: 34170647.',
      'Jastreboff AM, et al. Triple-Hormone-Receptor Agonist Retatrutide for Obesity - A Phase 2 Trial. N Engl J Med. 2023;389(6):514-526. PMID: 37366315.',
      'Bawadi H, et al. Impact of Semaglutide, Liraglutide and Tirzepatide on Cardiometabolic Outcomes: A Comparative Narrative Review. Endocrinol Diabetes Metab. 2026;9(3). PMID: 42747132.',
      'Ahmed MM, et al. GLP-1 receptor agonists in primary care: readiness, equity, and the risk of a two-tiered obesity treatment landscape. Ther Adv Endocrinol Metab. 2026;17. PMID: 42523902.',
      'ViralPeps catalogue data \u2014 70 weight-loss vendors, 305 listings across 15 compounds, October 2026 snapshot.',
    ],
  }"""

with open('/tmp/kw_day20_wl_suppliers.ts', 'w', encoding='utf-8') as f:
    f.write(FRAG)
print('wrote fragment:', len(FRAG), 'chars')
