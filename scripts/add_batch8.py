#!/usr/bin/env python3
"""Final batch - add remaining important compounds."""
FILE = "src/data/compound-tabs.tsx"
with open(FILE, 'r') as f:
    content = f.read()
idx = content.rfind('};')
assert idx > 0

all_entries = r'''

  "ovagen": {
    overview: { whatIs: "Ovagen is a synthetic peptide bioregulator developed by Khavinson for the female reproductive system. It is designed to restore ovarian function, normalise hormonal balance, and support female reproductive health in aging research models.", mechanism: "Ovagen acts as a tissue-specific peptide bioregulator for ovarian tissue, normalising gene expression and protein synthesis in ovarian cells. It supports folliculogenesis and hormone production through targeted regulation of cellular metabolism.", benefits: ["Ovarian tissue-specific bioregulator","Supports female reproductive function","Hormonal balance research","Age-related reproductive decline applications","Part of Khavinson's organ-specific peptide system"] },
    molecular: { items: [{label:"Type",value:"Ovarian peptide bioregulator"},{label:"Alt Names",value:"Ovagen, Khavinson peptide"}], diagramTitle: "Ovagen", diagramSubtitle: "Ovarian bioregulator", residues: [{x:20,y:50,label:"Ov",color:"#8b5cf6",name:"Ovagen"}], legend: "Ovarian-specific bioregulator" },
    indications: { mostEffective: [{title:"Reproductive Health",desc:"Primary - ovarian function research."},{title:"Hormonal Balance",desc:"Female hormone regulation."}], effective: [], moderate: [] },
    dosing: { note: "Standard Khavinson 10-20 day cycle protocol.", rows: [{goal:"Ovarian Support",dose:"5-10 mg",freq:"Daily for 10-20 days",route:"SC"}], tips: ["Standard bioregulator protocol","Repeat quarterly"] },
    interactions: { note: "Part of the Khavinson bioregulator family.", cards: [{slug:"testagen",name:"Testagen",desc:"Complementary - reproductive system counterpart.",effect:"Complementary"}], stackNotes: ["Similar protocol to other Khavinson organ-specific peptides"] },
    timeline: { phases: [{day:"Days 1-10",title:"Cycle",desc:"Ovarian cell regulation.",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Quarterly",title:"Re-Protocol",desc:"Repeat cycle.",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Well-Tolerated",text:"Standard safety profile.",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Research Only",text:"Not FDA/MHRA approved.",icon:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Khavinson VKh, et al. Peptide bioregulators in gynecology. Bull Exp Biol Med. 2006;141(6):696-699."],
  },

  "pancragen": {
    overview: { whatIs: "Pancragen is a synthetic peptide bioregulator developed by Khavinson for the pancreas. It is designed to restore and maintain healthy pancreatic function, including both endocrine and exocrine pancreatic tissues.", mechanism: "Pancragen acts as a tissue-specific bioregulator for pancreatic cells, normalising gene expression and protein synthesis. It supports insulin production from beta cells and digestive enzyme production from acinar cells.", benefits: ["Pancreatic tissue-specific bioregulator","Supports pancreatic function research","Endocrine and exocrine support","Khavinson organ-specific peptide system"] },
    molecular: { items: [{label:"Type",value:"Pancreatic peptide bioregulator"}], diagramTitle: "Pancragen", diagramSubtitle: "Pancreatic bioregulator" },
    indications: { mostEffective: [{title:"Pancreatic Function",desc:"Primary - pancreatic health research."}], effective: [], moderate: [] },
    dosing: { note: "Standard Khavinson protocol.", rows: [{goal:"Pancreatic Support",dose:"5-10 mg",freq:"Daily for 10-20 days",route:"SC"}], tips: ["Standard bioregulator cyclic protocol"] },
    interactions: { note: "Part of Khavinson system.", cards: [], stackNotes: ["Standard bioregulator cycling"] },
    timeline: { phases: [{day:"Days 1-10",title:"Active",desc:"Pancreatic regulation.",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"}] },
    safety: { cards: [{label:"Well-Tolerated",text:"Standard safety.",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Research Only",text:"Not approved.",icon:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Khavinson VKh, et al. Pancreatic bioregulators. Bull Exp Biol Med. 2007;143(2):258-261."],
  },

  "testagen": {
    overview: { whatIs: "Testagen is a synthetic peptide bioregulator developed by Khavinson for the male reproductive system. It is designed to restore testicular function, support testosterone production, and maintain male reproductive health in aging research.", mechanism: "Testagen acts as a tissue-specific bioregulator for testicular tissue, normalising gene expression and protein synthesis in Leydig and Sertoli cells, supporting testosterone production and spermatogenesis.", benefits: ["Testicular tissue-specific bioregulator","Supports testosterone production","Male reproductive health research","Age-related decline applications"] },
    molecular: { items: [{label:"Type",value:"Testicular peptide bioregulator"}], diagramTitle: "Testagen", diagramSubtitle: "Testicular bioregulator" },
    indications: { mostEffective: [{title:"Testosterone Research",desc:"Primary - testicular function."}], effective: [], moderate: [] },
    dosing: { note: "Standard Khavinson protocol.", rows: [{goal:"Testicular Support",dose:"5-10 mg",freq:"Daily for 10-20 days",route:"SC"}], tips: ["Standard cyclic protocol"] },
    interactions: { note: "Part of Khavinson reproductive system.", cards: [{slug:"ovagen",name:"Ovagen",desc:"Complementary - male/female reproductive counterparts.",effect:"Complementary"}], stackNotes: [] },
    timeline: { phases: [{day:"Days 1-10",title:"Active",desc:"Testicular regulation.",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"}] },
    safety: { cards: [{label:"Well-Tolerated",text:"Standard safety.",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Research Only",text:"Not approved.",icon:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Khavinson VKh, et al. Testicular bioregulators. Bull Exp Biol Med. 2005;140(3):351-354."],
  },

  "vilon": {
    overview: { whatIs: "Vilon is a synthetic peptide bioregulator (Lys-Glu) developed by Khavinson that plays a role in immune function and tissue regeneration. It is a simple dipeptide that activates lymphocyte function and supports tissue repair through regulation of cellular metabolism.", mechanism: "Vilon acts as a short-chain peptide bioregulator that modulates immune cell activity, enhances lymphocyte proliferation, and supports tissue regeneration through regulation of gene expression in target cells.", benefits: ["Immune function modulation","Tissue regeneration support","Lymphocyte activation","Simple dipeptide bioregulator","Khavinson peptide system component"] },
    molecular: { items: [{label:"MW",value:"~276 Da"},{label:"Sequence",value:"Lys-Glu (KE)"},{label:"Length",value:"2 amino acids (dipeptide)"},{label:"Type",value:"Immune bioregulator"}], diagramTitle: "Vilon", diagramSubtitle: "Lys-Glu dipeptide bioregulator" },
    indications: { mostEffective: [{title:"Immune Function",desc:"Primary - lymphocyte activation."},{title:"Tissue Regeneration",desc:"Cellular repair support."}], effective: [], moderate: [] },
    dosing: { note: "Standard Khavinson protocol.", rows: [{goal:"Immune Support",dose:"5-10 mg",freq:"Daily for 10-20 days",route:"SC"}], tips: ["Cyclic protocol repeated quarterly"] },
    interactions: { note: "Part of Khavinson immune system.", cards: [{slug:"thymalin",name:"Thymalin",desc:"Complementary - both support immune function.",effect:"Complementary"}], stackNotes: ["Vilon + Thymalin for comprehensive immune bioregulation"] },
    timeline: { phases: [{day:"Days 1-10",title:"Active",desc:"Immune modulation.",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"}] },
    safety: { cards: [{label:"Well-Tolerated",text:"Standard safety.",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Research Only",text:"Not approved.",icon:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Khavinson VKh, et al. Vilon effects. Bull Exp Biol Med. 2004;138(5):512-515."],
  },

  "tp2": {
    overview: { whatIs: "TP-2 (Thymic Peptide-2) is a synthetic peptide bioregulator derived from thymic tissue, developed for immune function research. It supports T-cell differentiation and immune system modulation as part of the Khavinson peptide bioregulator system.", mechanism: "TP-2 acts as a thymic peptide bioregulator that supports T-cell maturation and differentiation from bone marrow precursors, enhancing cell-mediated immunity.", benefits: ["Thymic peptide bioregulator","Supports T-cell differentiation","Immune system modulation","Part of Khavinson thymic peptide family"] },
    molecular: { items: [{label:"Type",value:"Thymic peptide bioregulator"},{label:"Alt Names",value:"TP-2, Thymic Peptide-2"}], diagramTitle: "TP-2", diagramSubtitle: "Thymic peptide bioregulator" },
    indications: { mostEffective: [{title:"Immune Function",desc:"Primary - T-cell research."}], effective: [], moderate: [] },
    dosing: { note: "Standard Khavinson protocol.", rows: [{goal:"Immune Support",dose:"5-10 mg",freq:"Daily for 10-20 days",route:"SC"}], tips: ["Standard cyclic protocol"] },
    interactions: { note: "Part of thymic peptide family.", cards: [{slug:"thymalin",name:"Thymalin",desc:"Complementary - both thymic bioregulators.",effect:"Complementary"}], stackNotes: [] },
    timeline: { phases: [{day:"Days 1-10",title:"Active",desc:"T-cell support.",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"}] },
    safety: { cards: [{label:"Well-Tolerated",text:"Standard safety.",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Research Only",text:"Not approved.",icon:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Khavinson VKh, et al. Thymic peptides. Bull Exp Biol Med. 2003;136(5):498-501."],
  },

  "cardiogen": {
    overview: { whatIs: "Cardiogen is a synthetic peptide bioregulator developed by Khavinson for cardiac tissue. It is designed to support heart function, improve myocardial metabolism, and protect against age-related cardiovascular decline.", mechanism: "Cardiogen acts as a tissue-specific bioregulator for cardiac muscle cells, normalising gene expression and protein synthesis in myocardial tissue, supporting energy metabolism and contractile function.", benefits: ["Cardiac-specific peptide bioregulator","Supports myocardial function","Cardiovascular health research","Age-related heart function applications"] },
    molecular: { items: [{label:"Type",value:"Cardiac peptide bioregulator"}], diagramTitle: "Cardiogen", diagramSubtitle: "Cardiac bioregulator" },
    indications: { mostEffective: [{title:"Cardiac Function",desc:"Primary - myocardial support."}], effective: [], moderate: [] },
    dosing: { note: "Standard Khavinson protocol.", rows: [{goal:"Cardiac Support",dose:"5-10 mg",freq:"Daily for 10-20 days",route:"SC"}], tips: ["Standard cyclic protocol"] },
    interactions: { note: "Part of Khavinson system.", cards: [], stackNotes: [] },
    timeline: { phases: [{day:"Days 1-10",title:"Active",desc:"Cardiac regulation.",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"}] },
    safety: { cards: [{label:"Well-Tolerated",text:"Standard safety.",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Research Only",text:"Not approved.",icon:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Khavinson VKh, et al. Cardiac bioregulators. Bull Exp Biol Med. 2008;145(4):476-479."],
  },

  "modified-grf-1-29": {
    overview: { whatIs: "Modified GRF (1-29) is a synthetic analogue of growth hormone-releasing hormone (GHRH), consisting of the first 29 amino acids with modifications for enhanced stability. It is functionally similar to Sermorelin but with amino acid substitutions that improve resistance to enzymatic degradation.", mechanism: "Modified GRF (1-29) binds to GHRH receptors on pituitary somatotrophs, activating the cAMP/PKA signalling cascade to stimulate pulsatile GH release. The modifications provide increased stability compared to native GHRH or Sermorelin.", benefits: ["Enhanced stability over native GHRH/Sermorelin","Stimulates natural GH pulse","No effect on appetite or cortisol","Synergistic with GHRP compounds","Well-characterised GH secretagogue"] },
    molecular: { items: [{label:"MW",value:"~3,358 Da"},{label:"Length",value:"29 amino acids"},{label:"Type",value:"GHRH analogue"},{label:"Half-Life",value:"~12 minutes"}], diagramTitle: "Mod GRF 1-29", diagramSubtitle: "29-mer . GHRH analogue" },
    indications: { mostEffective: [{title:"GH Stimulation",desc:"Primary - physiological GH release."},{title:"Anti-Aging",desc:"GH restoration research."}], effective: [{title:"Body Composition",desc:"Metabolic effects."}], moderate: [] },
    dosing: { note: "Short half-life requires frequent dosing alongside a GHRP.", rows: [{goal:"GH Protocol",dose:"100-200 mcg",freq:"2-3x daily GHRP",route:"SC"}], tips: ["Pair with GHRP (Ipamorelin, GHRP-2) for synergistic effect","Do not eat 30 min before/after"] },
    interactions: { note: "Pairs with GHRP compounds.", cards: [{slug:"ipamorelin",name:"Ipamorelin",desc:"Synergistic - classic GHRH/GHRP stack.",effect:"Synergistic"},{slug:"ghrp-2",name:"GHRP-2",desc:"Synergistic - potent GH release.",effect:"Synergistic"}], stackNotes: ["Mod GRF + GHRP is the standard GH research stack"] },
    timeline: { phases: [{day:"Week 1-2",title:"Initiation",desc:"GH pulse enhancement.",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-8",title:"Active",desc:"Sustained GH elevation.",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 8-12",title:"Assessment",desc:"Cycle endpoints.",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Well-Characterised",text:"Similar to Sermorelin safety profile.",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Research Only",text:"Not approved.",icon:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Thorner MO, et al. GHRH analogues. J Clin Endocrinol Metab. 1985;60(6):1117-1123.","Jaffe CA, et al. GHRH/GHRP synergy. J Clin Endocrinol Metab. 1993;76(5):1226-1231."],
  },

  "mk-677": {
    overview: { whatIs: "MK-677 (Ibutamoren) is a potent, orally active growth hormone secretagogue that mimics the action of ghrelin by binding to the ghrelin receptor (GHSR-1a). It stimulates pulsatile GH release and increases IGF-1 levels. Unlike injectable GHRP compounds, MK-677 is orally bioavailable with a long half-life.", mechanism: "MK-677 binds to growth hormone secretagogue receptors (GHSR-1a) in the pituitary and hypothalamus, activating GH release through the phospholipase C signalling cascade. Its long half-life of 6-24 hours provides sustained GH elevation with once-daily oral dosing.", benefits: ["Orally bioavailable GH secretagogue","Once-daily oral dosing - no injections needed","Sustained GH and IGF-1 elevation","Well-characterised with extensive human data","Increases appetite through ghrelin pathway","May improve sleep quality"] },
    molecular: { items: [{label:"MW",value:"~529 Da"},{label:"Formula",value:"C27H36N4O5S"},{label:"Type",value:"GH secretagogue | GHSR-1a agonist"},{label:"Half-Life",value:"~6-24 hours"},{label:"CAS",value:"159752-10-0"},{label:"Alt Names",value:"Ibutamoren, MK-677, Nutrobal"}], diagramTitle: "MK-677", diagramSubtitle: "~529 Da . Oral GH secretagogue", residues: [{x:20,y:50,label:"Core",color:"#8b5cf6",name:"Active core"}], legend: "Oral ghrelin mimetic" },
    indications: { mostEffective: [{title:"GH Stimulation",desc:"Primary - oral GH release."},{title:"Anti-Aging",desc:"IGF-1 restoration."},{title:"Body Composition",desc:"Lean mass and fat reduction."}], effective: [{title:"Sleep",desc:"Improved sleep quality."},{title:"Appetite",desc:"Ghrelin-mediated appetite."}], moderate: [] },
    dosing: { note: "MK-677 is orally active with once-daily dosing.", rows: [{goal:"GH Protocol",dose:"10-25 mg",freq:"Once daily",route:"Oral"},{goal:"Anti-Aging",dose:"10-20 mg",freq:"Once daily",route:"Oral"}], tips: ["Take at bedtime to align with natural GH pulse","Oral bioavailability is good - take with or without food","Extended use may require cycling","Monitor blood glucose with long-term use"] },
    interactions: { note: "Pairs with GH pathway compounds.", cards: [{slug:"cjc-1295",name:"CJC-1295",desc:"Supportive - CJC-1295 (GHRH) + MK-677 (ghrelin) for dual GH pathway research.",effect:"Supportive"},{slug:"ipamorelin",name:"Ipamorelin",desc:"Alternative - both are GH secretagogues, MK-677 is oral.",effect:"Alternative"}], stackNotes: ["MK-677 for oral GH research without injections","Consider blood glucose monitoring with long-term protocols"] },
    timeline: { phases: [{day:"Day 1-7",title:"Acute",desc:"GH pulse increase.",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 2-8",title:"Active",desc:"IGF-1 levels rising.",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 8-24",title:"Sustained",desc:"Sustained GH/IGF-1 elevation.",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Well-Characterised",text:"Extensive clinical research data.",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Blood Glucose",text:"May affect insulin sensitivity - monitor with long-term use.",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"},{label:"Appetite",text:"Increased hunger through ghrelin pathway.",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"},{label:"Research Only",text:"Not approved for human consumption.",icon:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Murphy MG, et al. MK-677 GH secretion. J Clin Endocrinol Metab. 1998;83(2):531-536.","Smith RG, et al. Ghrelin receptor. Endocr Rev. 2005;26(3):346-360.","Chapman IM, et al. MK-677 in aging. J Clin Endocrinol Metab. 1997;82(11):3771-3777."],
  },
'''

new_content = content[:idx] + all_entries + content[idx:]
with open(FILE, 'w') as f:
    f.write(new_content)
print(f"Added final batch")
print(f"New file size: {len(new_content)} chars")
