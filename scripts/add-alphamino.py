#!/usr/bin/env python3
"""Add Alphamino as a source to existing compounds in compounds.json"""

import json
import sys

with open('src/data/compounds.json', 'r') as f:
    compounds = json.load(f)

# Map of Alphamino product slugs to the compound IDs they map to
# Alphamino sells each compound as a single product with size variants
ALPHAMINO_SOURCES = {
    "bpc-157": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/bpc/",
            "price": "£18.00–£30.00",
            "inStock": True,
            "image": "/images/products/alphamino/bpc-157.webp",
            "dosage": "5mg-10mg"
        }
    ],
    "tb-500": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/tb-500-research-grade-peptide/",
            "price": "£20.00–£30.00",
            "inStock": True,
            "image": "/images/products/alphamino/tb-500.webp",
            "dosage": "5mg-10mg"
        }
    ],
    "tesamorelin": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/tesamorelin/",
            "price": "£52.50",
            "inStock": True,
            "image": "/images/products/alphamino/tesamorelin.webp",
            "dosage": "5mg-10mg"
        }
    ],
    "ss-31": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/ss-31/",
            "price": "£28.00",
            "inStock": True,
            "image": "/images/products/alphamino/ss-31.webp",
            "dosage": "5mg-10mg"
        }
    ],
    "ghk-cu": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/ghk-cu-research-grade-peptide/",
            "price": "£24.50–£35.00",
            "inStock": True,
            "image": "/images/products/alphamino/ghk-cu.webp",
            "dosage": "50mg-100mg"
        }
    ],
    "mots-c": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/motsc-research-grade-peptide/",
            "price": "£25.00",
            "inStock": True,
            "image": "/images/products/alphamino/mots-c.webp",
            "dosage": "5mg-10mg"
        }
    ],
    "mt2": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/mt-ii-research-grade-peptide/",
            "price": "£22.50",
            "inStock": True,
            "image": "/images/products/alphamino/mt2.webp",
            "dosage": "5mg-10mg"
        }
    ],
    "nad-plus": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/nad-research-grade/",
            "price": "£33.50–£55.00",
            "inStock": True,
            "image": "/images/products/alphamino/nad-plus.webp",
            "dosage": "500mg-1000mg"
        }
    ],
    "selank": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/selank/",
            "price": "£18.00–£29.99",
            "inStock": True,
            "image": "/images/products/alphamino/selank.webp",
            "dosage": "5mg-10mg"
        }
    ],
    "semax": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/semax/",
            "price": "£12.00–£29.99",
            "inStock": True,
            "image": "/images/products/alphamino/semax.webp",
            "dosage": "5mg-10mg"
        }
    ],
    "cjc-1295-ipamorelin-blend": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/cjc-ipa/",
            "price": "£38.00",
            "inStock": True,
            "image": "/images/products/alphamino/cjc-ipa.webp",
            "dosage": "2mg-5mg"
        }
    ],
    "igf-1-lr3": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/alp_l3/",
            "price": "£48.00",
            "inStock": False,
            "image": "/images/products/alphamino/igf-1-lr3.webp",
            "dosage": "1mg-2mg"
        }
    ],
    "glow": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/glow-research-peptide/",
            "price": "£55.00",
            "inStock": True,
            "image": "/images/products/alphamino/glow.webp",
            "dosage": "70mg"
        }
    ],
    "klow": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/klow-stack/",
            "price": "£57.00",
            "inStock": True,
            "image": "/images/products/alphamino/klow.webp",
            "dosage": "80mg"
        }
    ],
    "bacteriostatic-water": [
        {
            "vendor": "Alphamino",
            "url": "https://alphamino.co.uk/shop/bac-water/",
            "price": "£5.00–£9.00",
            "inStock": True,
            "image": "/images/products/alphamino/bacteriostatic-water.webp",
            "dosage": "3ml-10ml"
        }
    ]
}

# Track modifications
modified_count = 0
not_found = []

for compound in compounds:
    cid = compound["id"]
    if cid in ALPHAMINO_SOURCES:
        sources = ALPHAMINO_SOURCES[cid]
        # Check if Alphamino source already exists for this compound
        existing_vendors = [s["vendor"] for s in compound.get("sources", [])]
        if "Alphamino" not in existing_vendors:
            compound.setdefault("sources", []).extend(sources)
            modified_count += 1
            print(f"  ✓ Added Alphamino source to '{cid}' ({compound['name']})")
        else:
            print(f"  - Alphamino already in '{cid}', skipping")

# Also handle the "bpc-157-5mg" style entries - check if any variant entries exist
# that should also get Alphamino
for compound in compounds:
    cid = compound["id"]
    # Check for compound IDs that start with one of our keys
    for key in ALPHAMINO_SOURCES:
        if cid.startswith(key + "-") or cid.startswith("premium-" + key):
            existing_vendors = [s["vendor"] for s in compound.get("sources", [])]
            if "Alphamino" not in existing_vendors and "Alphamino" not in [s.get("vendor") for s in compound.get("sources", [])]:
                # Add a single source entry pointing to the main product page
                source = {
                    "vendor": "Alphamino",
                    "url": ALPHAMINO_SOURCES[key][0]["url"],
                    "price": ALPHAMINO_SOURCES[key][0]["price"],
                    "inStock": ALPHAMINO_SOURCES[key][0]["inStock"],
                    "image": ALPHAMINO_SOURCES[key][0]["image"]
                }
                compound.setdefault("sources", []).append(source)
                modified_count += 1
                print(f"  ✓ Added Alphamino source to variant '{cid}'")
            break

with open('src/data/compounds.json', 'w') as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)

print(f"\nDone! Modified {modified_count} compound entries.")
