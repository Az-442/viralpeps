# Remaining Compound Tabs to Add

Target file: `src/data/compound-tabs.tsx`
Project: `/Users/time4you/viralpeps`

## Priority 1 — Popular (2+ product variants)
Add these 20+ base compounds in order of popularity:

1. **peg-mgf** — PEGylated Mechano Growth Factor (PEG-MGF)
2. **igf-1-lr3** — IGF-1 Long R3 (Insulin-like Growth Factor)
3. **mgf** — Mechano Growth Factor 2mg
4. **slu-pp-332** — SLU-PP-332 (mitochondrial/ERR agonist)
5. **thymosin-beta-4-tb500** — Thymosin Beta-4 TB500 (already have tb-500, this is for variants)
6. **vesugen** — Vesugen (Khavinson peptide)
7. **glutathione** — Glutathione (master antioxidant)
8. **igf-1-des** — IGF-1 DES (Insulin-like Growth Factor variant)
9. **snap-8** — SNAP-8 (cosmetic peptide, acetyl hexapeptide)
10. **l-carnitine** — L-Carnitine (amino acid derivative)
11. **melanotan-ii** — Melanotan II (tanning peptide)
12. **epithalon** — Epitalon variant slug
13. **hcg** — HCG (Human Chorionic Gonadotropin)
14. **gonadorelin** — Gonadorelin (GnRH)
15. **noopept** — Noopept (nootropic)
16. **p21** — P21 (J147, neuroprotective)
17. **cagrilintide** — Cagrilintide (amylin analog)
18. **tesofensine** — Tesofensine (dopamine/noradrenaline reuptake inhibitor)
19. **selegiline** — Selegiline (MAO-B inhibitor)
20. **mk-677** — Ibutamoren (GH secretagogue, oral)
21. **bpc-157-tb-500-blend** / **wolverine** — Wolverine stack blends

## Priority 2 — Single-variant (less popular)
22. klow, pinealon, vilon, cardiogen, pnc-27, pe-22-28, pal-ghk, tp2, ovagen, pancragen, testagen, mazdutide, survodutide

## How to add each compound

For each compound, add the entry before the closing `};` line.

Each entry must follow this exact compact format (single-line properties):

```
"compound-slug": {
    overview: { whatIs: "Detailed what-is paragraph (100-200 words).", mechanism: "Mechanism of action paragraph (80-150 words).", benefits: ["Benefit 1","Benefit 2","Benefit 3","Benefit 4","Benefit 5","Benefit 6"] },
    molecular: { items: [{label:"Molecular Weight",value:"X Da"},{label:"Sequence",value:"X"},{label:"Length",value:"X amino acids"},{label:"Type",value:"X"}], diagramTitle: "Title", diagramSubtitle: "Subtitle", residues: [{x:20,y:50,label:"A",color:"#8b5cf6",name:"Name"},{x:60,y:50,label:"B",color:"#0891b2",name:"Name2"}], legend: "A=Name  B=Name2" },
    indications: { mostEffective: [{title:"X",desc:"X"},{title:"Y",desc:"Y"}], effective: [{title:"X",desc:"X"}], moderate: [] },
    dosing: { note: "Dosing note.", rows: [{goal:"X",dose:"X",freq:"X",route:"X"},{goal:"X",dose:"X",freq:"X",route:"X"}], tips: ["Tip 1","Tip 2","Tip 3","Tip 4"] },
    interactions: { note: "Desc.", cards: [{slug:"x",name:"X",desc:"X",effect:"Synergistic"},{slug:"y",name:"Y",desc:"Y",effect:"Complementary"}], stackNotes: ["Note 1","Note 2","Note 3"] },
    timeline: { phases: [{day:"Week 1-2",title:"Initiation",desc:"Desc",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-8",title:"Active",desc:"Desc",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 8-12",title:"Sustained",desc:"Desc",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"X",text:"X",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"X",text:"X",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Author A, et al. Journal. Year;Vol(Issue):Pages.","Author B, et al. Journal. Year;Vol(Issue):Pages.","Author C, et al. Journal. Year;Vol(Issue):Pages."],
  },
```

## Important rules
- Add entries BEFORE the `};` closing line
- Use the exact same format/style as existing entries
- Add the new slug to the BASE_SLUGS set
- Run `npm run build` after each batch to check for errors
- Commit with `git add -A && git commit -m "Add X compound tabs" && git push origin main`
- After each commit push, continue with the next compound
- Work through Priority 1 first (2+ variant compounds), then Priority 2
- Use the correct residue color palette: #8b5cf6, #0891b2, #d97706, #7c3aed, #059669, #6366f1, #db2777, #eab308, #06b6d4, #ef4444
