#!/usr/bin/env python3
"""Add OL Research product sources to existing compounds in compounds.json"""
import json
import re

COMPOUNDS_PATH = '/Users/time4you/viralpeps/src/data/compounds.json'

with open(COMPOUNDS_PATH) as f:
    compounds = json.load(f)

# Mapping of OL Research products to compound IDs and their actual URLs
ol_products = {
    # (compound_id, vendor_name, url, price, inStock, image, dosage)
    "bpc-157": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/bpc-157-10mg/",
        "price": "£22.50",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-BPC-157-10-900x900.webp",
        "dosage": "10mg"
    }],
    "tb-500": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/tb-500-10mg/",
        "price": "£24.30",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-TB-500-10-900x900.webp",
        "dosage": "10mg"
    }],
    "ghk-cu": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/copper-ghk-cu-50mg/",
        "price": "£25.20",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-GHK-CU-50-900x900.webp",
        "dosage": "50mg"
    }],
    "ahk-cu": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/ahk-cu-50mg/",
        "price": "£36.00",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-AHK-CU-50-900x900.webp",
        "dosage": "50mg"
    }],
    "aod9604": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/aod9604-5mg/",
        "price": "£44.00",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-AOD9604-5-900x900.webp",
        "dosage": "5mg"
    }],
    "cjc-1295": [
        {
            "vendor": "OL Research",
            "url": "https://olresearch.co.uk/product/cjc-1295-dac-5mg/",
            "price": "£36.00",
            "inStock": True,
            "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-CJC1295-DAC-5-900x900.webp",
            "dosage": "DAC 5mg"
        },
        {
            "vendor": "OL Research",
            "url": "https://olresearch.co.uk/product/cjc-1295-no-dac-10mg/",
            "price": "£32.40",
            "inStock": True,
            "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-CJC1295-ND-10-900x900.webp",
            "dosage": "No DAC 10mg"
        }
    ],
    "ipamorelin": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/ipamorelin-10mg/",
        "price": "£31.50",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-IPAMORELIN-10-900x900.webp",
        "dosage": "10mg"
    }],
    "mots-c": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/mots-c-10mg/",
        "price": "£24.30",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-MOTS-C-10-900x900.webp",
        "dosage": "10mg"
    }],
    "pt-141": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/pt-141-10mg/",
        "price": "£17.10",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-PT141-10-900x900.webp",
        "dosage": "10mg"
    }],
    "selank": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/selank-5mg/",
        "price": "£17.55",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-SELANK-5-900x900.webp",
        "dosage": "5mg"
    }],
    "semax": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/semax-5mg/",
        "price": "£17.55",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-SEMAX-5-900x900.webp",
        "dosage": "5mg"
    }],
    "epitalon": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/epithalon-10mg/",
        "price": "£17.10",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-EPITHALON-10-900x900.webp",
        "dosage": "10mg"
    }],
    "kpv": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/kpv-10mg/",
        "price": "£25.20",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-KPV-10-900x900.webp",
        "dosage": "10mg"
    }],
    "retatrutide": [
        {
            "vendor": "OL Research",
            "url": "https://olresearch.co.uk/product/r3ta-20mg/",
            "price": "£81.00",
            "inStock": True,
            "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-R3TA-20-900x900.webp",
            "dosage": "20mg"
        },
        {
            "vendor": "OL Research",
            "url": "https://olresearch.co.uk/product/r3ta-30mg/",
            "price": "£126.00",
            "inStock": True,
            "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-R3TA-30-900x900.webp",
            "dosage": "30mg"
        }
    ],
    "tesamorelin": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/tesamorelin-10mg/",
        "price": "£46.80",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-TESAMORELIN-10-900x900.webp",
        "dosage": "10mg"
    }],
    "snap-8": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/snap-8-10mg/",
        "price": "£17.10",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-SNAP-8-10-900x900.webp",
        "dosage": "10mg"
    }],
    "glow": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/glow-70mg/",
        "price": "£58.50",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-GLOW-70-900x900.webp",
        "dosage": "70mg"
    }],
    "klow": [{
        "vendor": "OL Research",
        "url": "https://olresearch.co.uk/product/klow-80mg/",
        "price": "£72.00",
        "inStock": True,
        "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-KLOW-80-900x900.webp",
        "dosage": "80mg"
    }]
}

# Find each compound and add OL Research as a source
added_count = 0
for compound in compounds:
    cid = compound.get('id')
    if cid in ol_products:
        sources = compound.get('sources', [])
        ol_sources = ol_products[cid]
        
        # Check if OL Research already exists for this compound
        existing_vendors = {s.get('vendor') for s in sources}
        
        for ol_src in ol_sources:
            if 'OL Research' not in existing_vendors:
                sources.append(ol_src)
                added_count += 1
                print(f"Added OL Research to {cid} — {ol_src.get('dosage', '1 vial')} @ {ol_src['price']}")
            else:
                print(f"OL Research already in {cid}")

# Now add compounds that don't exist yet — Melanotan II and NAD+
existing_ids = {c.get('id') for c in compounds}

if 'melanotan-ii' not in existing_ids:
    compounds.append({
        "id": "melanotan-ii",
        "name": "Melanotan II",
        "slug": "melanotan-ii",
        "aliases": ["MT-II"],
        "category": "tanning",
        "description": "Melanotan II is a synthetic analogue of the naturally occurring alpha-melanocyte stimulating hormone (α-MSH). It stimulates melanogenesis by binding to melanocortin receptors, leading to increased skin pigmentation. Studied for tanning, photoprotection, and sexual health applications.",
        "mechanism": "Agonist at melanocortin receptors MC1R (melanogenesis), MC3R, and MC4R (appetite/sexual function). Activation of MC1R stimulates tyrosinase and eumelanin production.",
        "purity": "≥99%",
        "form": "Lyophilized powder",
        "researchAreas": ["Tanning", "Photoprotection", "Sexual health"],
        "commonDosages": ["0.25-1.0 mg/day"],
        "sources": [{
            "vendor": "OL Research",
            "url": "https://olresearch.co.uk/product/melanotan-ii-10mg/",
            "price": "£18.00",
            "inStock": True,
            "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-MELANOTAN-2-10-900x900.webp",
            "dosage": "10mg"
        }]
    })
    added_count += 1
    print(f"Created new compound: melanotan-ii from OL Research @ £18.00")
else:
    print("melanotan-ii already exists")

if 'nad-plus' not in existing_ids:
    compounds.append({
        "id": "nad-plus",
        "name": "NAD+",
        "slug": "nad-plus",
        "aliases": ["Nicotinamide Adenine Dinucleotide", "NAD"],
        "category": "longevity",
        "description": "NAD+ (Nicotinamide Adenine Dinucleotide) is a fundamental coenzyme found in every living cell. It plays a critical role in cellular energy metabolism, DNA repair, and sirtuin activation. NAD+ levels decline with age, making it a key compound in longevity and anti-aging research.",
        "mechanism": "Essential coenzyme in redox reactions, substrate for sirtuins (SIRT1-7), PARPs, and CD38. Involved in oxidative phosphorylation, glycolysis, and mitochondrial function.",
        "purity": "≥98%",
        "form": "Lyophilized powder",
        "researchAreas": ["Longevity", "Anti-aging", "Cellular energy", "DNA repair", "Mitochondrial health"],
        "commonDosages": ["250-1000 mg/day"],
        "sources": [
            {
                "vendor": "OL Research",
                "url": "https://olresearch.co.uk/product/nad-500mg/",
                "price": "£40.50",
                "inStock": True,
                "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-NAD-500-900x900.webp",
                "dosage": "500mg"
            },
            {
                "vendor": "OL Research",
                "url": "https://olresearch.co.uk/product/nad-1000mg/",
                "price": "£76.50",
                "inStock": True,
                "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-NAD-1000-900x900.webp",
                "dosage": "1000mg"
            }
        ]
    })
    added_count += 1
    print(f"Created new compound: nad-plus from OL Research @ £40.50/£76.50")
else:
    print("nad-plus already exists")

# Write back
with open(COMPOUNDS_PATH, 'w') as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)

print(f"\nDone! Added {added_count} OL Research sources to compounds.json")
print(f"Total compounds: {len(compounds)}")
