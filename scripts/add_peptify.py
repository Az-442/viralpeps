#!/usr/bin/env python3
"""Add Peptify UK as a source to existing compounds and create new compounds."""
import json
import os

BASE = '/Users/time4you/viralpeps/src/data'

with open(f'{BASE}/compounds.json', 'r') as f:
    compounds = json.load(f)

# Peptify UK product data
peptify = {
    "vendor": "Peptify UK",
    "inStock": True,
}

# Map of compound slugs to their Peptify UK source data
sources_to_add = {
    "bpc-157": {
        "url": "https://www.peptifyuk.com/products/bpc-157-10mg",
        "price": "£26.99",
        "dosage": "10mg",
        "image": "/images/products/peptify/bpc-157.png"
    },
    "tb-500": {
        "url": "https://www.peptifyuk.com/products/tb-500-5mg",
        "price": "£24.99",
        "dosage": "5mg",
        "image": "/images/products/peptify/tb-500.png"
    },
    "ghk-cu": {
        "url": "https://www.peptifyuk.com/products/ghk-cu-50mg",
        "price": "£18.99",
        "dosage": "50mg",
        "image": "/images/products/peptify/ghk-cu.png"
    },
    "tesamorelin": {
        "url": "https://www.peptifyuk.com/products/tesamorelin-10mg",
        "price": "£49.99",
        "dosage": "10mg",
        "image": "/images/products/peptify/tesamorelin.png"
    },
    "ipamorelin": {
        "url": "https://www.peptifyuk.com/products/ipamorelin-10mg",
        "price": "£29.99",
        "dosage": "10mg",
        "image": "/images/products/peptify/ipamorelin.png"
    },
    "mots-c": {
        "url": "https://www.peptifyuk.com/products/mots-c-10mg",
        "price": "£34.99",
        "dosage": "10mg",
        "image": "/images/products/peptify/mots-c.png"
    },
    "nad-plus": {
        "url": "https://www.peptifyuk.com/products/nad-500mg",
        "price": "£44.99",
        "dosage": "500mg",
        "image": "/images/products/peptify/nad-plus.png"
    },
    "selank": {
        "url": "https://www.peptifyuk.com/products/selank-10mg",
        "price": "£24.99",
        "dosage": "10mg",
        "image": "/images/products/peptify/selank.png"
    },
    "kpv": {
        "url": "https://www.peptifyuk.com/products/kpv-10mg",
        "price": "£24.99",
        "dosage": "10mg",
        "image": "/images/products/peptify/kpv.png"
    },
    "semax": {
        "url": "https://www.peptifyuk.com/products/semax-10mg",
        "price": "£34.99",
        "dosage": "10mg",
        "image": "/images/products/peptify/semax.png"
    },
    "bacteriostatic-water": {
        "url": "https://www.peptifyuk.com/products/bacteriostatic-water-10ml",
        "price": "£7.99",
        "dosage": "10ml",
        "image": "/images/products/peptify/bacteriostatic-water.png"
    },
    "wolverine-stack-bpc157-tb500-blend": {
        "url": "https://www.peptifyuk.com/products/bpc-157-tb500-blend-20mg",
        "price": "£59.99",
        "dosage": "20mg",
        "image": "/images/products/peptify/wolverine-stack-bpc157-tb500-blend.png"
    },
    "glow": {
        "url": "https://www.peptifyuk.com/products/glow-blend-70mg",
        "price": "£55.99",
        "dosage": "70mg",
        "image": "/images/products/peptify/glow.png"
    },
    "klow": {
        "url": "https://www.peptifyuk.com/products/klow-blend-80mg",
        "price": "£79.99",
        "dosage": "80mg",
        "image": "/images/products/peptify/klow.png"
    }
}

# Add sources to existing compounds
for compound in compounds:
    slug = compound.get("slug")
    if slug in sources_to_add:
        # Check if Peptify UK is already a source
        existing = [s for s in compound["sources"] if s.get("vendor") == "Peptify UK"]
        if existing:
            print(f"Peptify UK already in {slug}, skipping")
            continue
        
        source_data = sources_to_add[slug]
        entry = {
            "vendor": "Peptify UK",
            "url": source_data["url"],
            "price": source_data["price"],
            "inStock": True,
            "dosage": source_data["dosage"],
            "image": source_data["image"]
        }
        compound["sources"].append(entry)
        print(f"Added Peptify UK source to {slug}")

# Create new compound entries
new_compounds = [
    {
        "id": "glp-3",
        "name": "GLP-3 (RT)",
        "slug": "glp-3",
        "aliases": ["GLP-3 RT", "GLP-3 (Research Tracer)"],
        "category": "glp-1-agonists",
        "description": "GLP-3 (RT) is a research tracer analogue of GLP-1 designed for metabolic pathway studies. It shares partial structural homology with native GLP-1 and is used in receptor binding and signalling research.",
        "mechanism": "Research tracer compound that interacts with GLP-1 receptor pathways. Used for in-vitro receptor binding studies and metabolic signalling pathway research.",
        "cas": "",
        "molarMass": "",
        "sequence": "",
        "purity": "≥99%",
        "form": "Lyophilized powder",
        "halfLife": "",
        "researchAreas": [
            "Metabolic research",
            "GLP-1 receptor studies",
            "Receptor binding",
            "Signalling pathways"
        ],
        "commonDosages": [],
        "sources": [
            {
                "vendor": "Peptify UK",
                "url": "https://www.peptifyuk.com/products/glp-3-rt-10mg",
                "price": "£59.99",
                "inStock": True,
                "dosage": "10mg",
                "image": "/images/products/peptify/glp-3.png"
            }
        ],
        "longDescription": "",
        "faq": []
    },
    {
        "id": "selank-semax-blend",
        "name": "Selank + Semax Blend",
        "slug": "selank-semax-blend",
        "aliases": ["Selank/Semax Blend", "Selank-Semax combo"],
        "category": "peptide-blends",
        "description": "A pre-formulated research blend combining Selank and Semax, two synthetic peptide analogues studied for cognitive function and neurological research. This blend offers a convenient single-vial format for combined administration studies.",
        "mechanism": "Selank is a synthetic heptapeptide analogue of tuftsin that modulates the enkephalin system and IL-6 expression. Semax is a synthetic analogue of ACTH(4-10) that increases brain-derived neurotrophic factor (BDNF) and modulates dopaminergic and serotonergic systems. Combined, they are studied for synergistic cognitive and neuroprotective effects.",
        "cas": "N/A (blend)",
        "molarMass": "N/A (blend of Selank ~753.9 + Semax ~1,022.2 g/mol)",
        "sequence": "N/A (blend of Selank TKPRPGP + Semax MEHFPGP)",
        "purity": "≥99%",
        "form": "Lyophilized powder",
        "halfLife": "",
        "researchAreas": [
            "Cognitive research",
            "Neurological studies",
            "Anxiety research",
            "Neuroprotection",
            "Peptide blends"
        ],
        "commonDosages": [],
        "sources": [
            {
                "vendor": "Peptify UK",
                "url": "https://www.peptifyuk.com/products/selank-semax-blend-20mg",
                "price": "£44.99",
                "inStock": True,
                "dosage": "20mg",
                "image": "/images/products/peptify/selank-semax-blend.png"
            }
        ],
        "longDescription": "",
        "faq": []
    }
]

compounds.extend(new_compounds)
print(f"Added {len(new_compounds)} new compounds")

# Write back
with open(f'{BASE}/compounds.json', 'w') as f:
    json.dump(compounds, f, indent=2)

print(f"Done! Total compounds: {len(compounds)}")
