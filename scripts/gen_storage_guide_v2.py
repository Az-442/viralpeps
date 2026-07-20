#!/usr/bin/env python3
"""Generate the peptide storage guide TypeScript entry and write to file."""
import json

article = {
    "slug": "peptide-storage-guide",
    "minutes": 10,
    "pullQuote": "Correct storage is the single most important factor determining peptide stability and experimental reproducibility — a few degrees or a single freeze-thaw cycle can render months of work unusable.",
    "quickInfo": [
        {"label": "Category", "value": "Guide"},
        {"label": "Read Time", "value": "10 min"},
        {"label": "Key Principle", "value": "Cold, dry, dark, stable"},
    ],
    "sections": [
        {
            "title": "Why Peptide Storage Matters",
            "body": "Peptides are delicate molecular chains held together by amide bonds. Once synthesised, every peptide faces a slow but relentless assault from its environment. Three degradation pathways dominate:\n\nHydrolysis — water molecules attack peptide bonds, especially at elevated temperatures. Even in lyophilised (freeze-dried) form, residual moisture catalyses backbone cleavage, producing truncated fragments that skew research data.\n\nOxidation — sulphur-containing residues (methionine, cysteine) and aromatic rings (tryptophan, tyrosine) react with ambient oxygen. The result is a chemically altered peptide that may lose target affinity.\n\nDeamidation — asparagine and glutamine side-chains spontaneously hydrolyse to aspartate and glutamate. This subtle change alters net charge and can abolish receptor binding. Deamidation rates double for every 10\u00b0C rise in temperature.\n\nThese reactions are temperature-driven: each 10\u00b0C reduction roughly halves the degradation rate. This is why a disciplined cold chain is non-negotiable for reproducible research.",
        },
        {
            "title": "Storing Lyophilised Peptides",
            "body": "Lyophilised (freeze-dried) peptides are the most stable physical form, but stability varies with sequence composition and storage conditions. Below is a summary of best-practice storage parameters.",
            "table": {
                "header": ["Storage Method", "Temperature", "Maximum Duration", "Notes"],
                "rows": [
                    ["Long-term freezer", "-20\u00b0C", "Several years", "Preferred for all peptides; stability depends on sequence"],
                    ["Ultra-low freezer", "-80\u00b0C", "Indefinite", "For oxidation-prone residues (Met, Cys, Trp)"],
                    ["Refrigerator (short-term)", "2\u20138\u00b0C", "4\u20136 weeks", "Acceptable if reconstitution planned within weeks"],
                    ["Room temperature (desiccated)", "15\u201325\u00b0C", "Days to weeks", "NOT recommended for long-term; desiccator essential"],
                ],
            },
            "subsections": [
                {
                    "title": "Light Sensitivity",
                    "body": "Many peptides contain photo-reactive residues (Trp, Tyr, Phe) that degrade under fluorescent or sunlight exposure. Store lyophilised vials in opaque boxes or wrap in aluminium foil. Amber glass vials offer partial protection but should still be kept in a dark cabinet.",
                },
                {
                    "title": "Moisture Control",
                    "body": "Residual moisture is the enemy of dry peptide stability. Always allow vials to reach room temperature before opening to prevent condensation. For peptides stored longer than six months, transfer to a sealed desiccator with colour-indicating silica gel.",
                },
            ],
        },
        {
            "title": "Storing Reconstituted Peptides",
            "body": "Once a peptide is dissolved, degradation accelerates dramatically. The reconstitution solvent and storage temperature determine usable shelf life.",
            "table": {
                "header": ["Condition", "Temperature", "Shelf Life", "Notes"],
                "rows": [
                    ["Bacteriostatic water (0.9% benzyl alcohol)", "2\u20138\u00b0C", "4\u20136 weeks", "Antimicrobial protection; suitable for multi-dose vials"],
                    ["Sterile water (single-use only)", "2\u20138\u00b0C", "24\u201348 hours", "No preservative; discard unused portion immediately"],
                    ["Aliquoted and frozen", "-20\u00b0C", "3\u20136 months", "Avoid repeated freeze-thaw cycles; label each aliquot"],
                ],
            },
            "subsections": [
                {
                    "title": "Aliquoting Strategy",
                    "body": "Always aliquot reconstituted peptides before freezing. Divide into single-use volumes (10\u201350 \u00b5L per tube) so each thaw provides exactly one experiment's worth. Use low-protein-binding tubes and label every tube with peptide name, concentration, date, and batch number.",
                },
                {
                    "title": "Freeze-Thaw Warnings",
                    "body": "Each freeze-thaw cycle damages tertiary structure and promotes aggregation. A single cycle can reduce bioactivity by 10\u201330% in some peptides. Never re-freeze a thawed aliquot; design your aliquoting scheme so each tube is discarded after one use.",
                },
            ],
        },
        {
            "title": "The Reconstitution Process",
            "body": "Correct reconstitution technique preserves peptide integrity from the moment solvent meets powder.\n\nStep 1 \u2014 Equilibrate to room temperature. Remove the lyophilised vial from storage and let it sit for 15\u201320 minutes unopened. This prevents moisture condensation on the cold powder.\n\nStep 2 \u2014 Calculate the required volume of solvent based on peptide mass and desired concentration. Note that the stated weight includes counter-ions (usually TFA); actual peptide content is typically 70\u201385% of the labelled mass.\n\nStep 3 \u2014 Use bacteriostatic water (0.9% benzyl alcohol) for multi-dose experiments or sterile water for single-use. For hydrophobic peptides, start with a small volume of dilute acetic acid or DMSO before diluting to final volume.\n\nStep 4 \u2014 Direct the solvent stream against the inner vial wall, not directly onto the powder. Let it run down the glass to avoid violent aerosolisation that can denature the peptide.\n\nStep 5 \u2014 Gently swirl or roll the vial for 30\u201360 seconds. Do NOT vortex or shake vigorously \u2014 shear forces denature peptides and create aggregates.\n\nStep 6 \u2014 Inspect. The solution should be clear and colourless. Cloudiness, particles, or discolouration indicates aggregation or contamination.\n\nStep 7 \u2014 Immediately aliquot into single-use volumes using sterile technique. Wipe vial septa with an alcohol swab before each puncture.",
        },
        {
            "title": "Common Mistakes",
            "body": "Even experienced researchers make storage errors. The most frequent pitfalls are described below.",
            "subsections": [
                {
                    "title": "Vigorous Shaking or Vortexing",
                    "body": "Shaking introduces mechanical shear that unfolds secondary structure and promotes aggregation. The foam that forms traps peptides at air-water interfaces where denaturation occurs within seconds. Always swirl gently or roll the vial.",
                },
                {
                    "title": "Repeated Freeze-Thaw Cycles",
                    "body": "Each freeze-thaw cycle exposes the peptide to concentrated solute effects during ice crystal formation, leading to pH shifts and aggregation. Three cycles can reduce activity by over 50% in sensitive peptides. The only solution is proper aliquoting.",
                },
                {
                    "title": "Exposure to Light",
                    "body": "Fluorescent laboratory lighting accelerates photo-degradation of Trp, Tyr, Phe, and Cys residues. A peptide left on a laboratory bench can lose measurable activity within hours. Store all peptides in opaque or light-resistant containers.",
                },
                {
                    "title": "Confusing Bacteriostatic and Sterile Water",
                    "body": "Sterile water contains no preservative. Using it for a multi-dose vial creates contamination risk after the first puncture. Bacteriostatic water (0.9% benzyl alcohol) inhibits microbial growth and is suitable for repeated access over 4\u20136 weeks. Always confirm the solvent type before reconstitution.",
                },
            ],
        },
        {
            "title": "Quick Reference Table",
            "body": "A one-page summary of recommended storage conditions at a glance.",
            "table": {
                "header": ["Form", "Storage", "Temperature", "Shelf Life", "Key Warning"],
                "rows": [
                    ["Lyophilised (long-term)", "Freezer, desiccator", "-20\u00b0C", "Several years", "Keep desiccated; avoid moisture"],
                    ["Lyophilised (short-term)", "Refrigerator", "2\u20138\u00b0C", "4\u20136 weeks", "Plan reconstitution window"],
                    ["Reconstituted (bac water)", "Refrigerator", "2\u20138\u00b0C", "4\u20136 weeks", "Wipe septum before each use"],
                    ["Reconstituted (sterile water)", "Refrigerator", "2\u20138\u00b0C", "24\u201348 hours", "Single-use; discard remainder"],
                    ["Frozen aliquots", "Freezer", "-20\u00b0C", "3\u20136 months", "Never re-freeze after thaw"],
                ],
            },
        },
    ],
    "faq": [
        {"question": "Can I store lyophilised peptides at room temperature?", "answer": "Dry peptides are stable at room temperature for days to weeks, but not for long-term storage. The degradation rate at 20\u201325\u00b0C is orders of magnitude higher than at -20\u00b0C. If you must store at room temperature, use a sealed desiccator and limit storage to two weeks maximum."},
        {"question": "How do I know if my peptide has degraded?", "answer": "The most obvious sign is a change in solution appearance \u2014 cloudiness, particles, discolouration, or a gel-like consistency all indicate degradation. For a quantitative check, run an HPLC trace against the original purity data; a shift in the main peak or new peaks indicates hydrolysis or oxidation."},
        {"question": "Is -80\u00b0C storage necessary for all peptides?", "answer": "No. While -80\u00b0C provides the longest stability, it is essential only for peptides with oxidation-prone residues (methionine, cysteine, tryptophan) or those stored beyond two years. For most research peptides used within 12\u201318 months, -20\u00b0C in a desiccator is adequate."},
        {"question": "What is the best solvent for hydrophobic peptides?", "answer": "Start with a small volume of a strong solvent such as dilute acetic acid (10\u201330% v/v), DMSO, or HFIP. Once fully dissolved, dilute to working concentration with water or buffer. Keep the final concentration of the strong solvent below 1\u20135% to avoid interfering with assays."},
        {"question": "Can I use saline for reconstitution?", "answer": "No. Saline without a preservative still supports microbial growth after the first vial puncture. Always use bacteriostatic water for multi-dose vials or sterile water for single-use applications. For cell culture work, use endotoxin-free water."},
    ],
    "references": [
        "Carpenter, J. F., & Crowe, J. H. (1989). An infrared spectroscopic study of the interactions of carbohydrates with dried proteins. Biochemistry, 28(9), 3916\u20133922.",
        "Manning, M. C., Patel, K., & Borchardt, R. T. (1989). Stability of protein pharmaceuticals. Pharmaceutical Research, 6(11), 903\u2013918.",
        "Cleland, J. L., & Langer, R. (1994). Formulation and delivery of proteins and peptides: design and development strategies. ACS Symposium Series, 567, 1\u201319.",
        "Wang, W. (1999). Instability, stabilization, and formulation of liquid protein pharmaceuticals. International Journal of Pharmaceutics, 185(2), 129\u2013188.",
        "Chi, E. Y., et al. (2003). Physical stability of proteins in aqueous solution. Pharmaceutical Research, 20(9), 1325\u20131336.",
    ],
}

# Write as TypeScript
lines = []
lines.append('import { ResearchPageContent } from "@/data/research-content";')
lines.append("")
lines.append(f"const peptideStorageGuide: ResearchPageContent = {json.dumps(article, indent=2)};")
lines.append("")
lines.append("export { peptideStorageGuide };")

with open("/tmp/peptide-storage-guide-content.ts", "w") as f:
    f.write("\n".join(lines))

out = "\n".join(lines)
print(f"Written /tmp/peptide-storage-guide-content.ts ({len(out)} bytes)")
