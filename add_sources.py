#!/usr/bin/env python3
"""Add Nova Peptide and Stratford Peptides source entries to compounds.json"""
import json
import copy

with open('src/data/compounds.json', 'r') as f:
    data = json.load(f)

# Nova Peptide sources
nova_sources = {
    "retatrutide": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/retatrutide/", "price": "£60.00", "inStock": True, "image": "/images/products/nova-peptide/retatrutide.webp"}
    ],
    "bpc-157": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/bpc157-10mg/", "price": "£38.00", "inStock": True, "image": "/images/products/nova-peptide/bpc-157.webp"}
    ],
    "tb-500": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/tb500-10mg/", "price": "£38.00", "inStock": True, "image": "/images/products/nova-peptide/tb-500.webp"}
    ],
    "ghk-cu": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/ghk-cu/", "price": "£30.00", "inStock": True, "image": "/images/products/nova-peptide/ghk-cu.webp"}
    ],
    "mots-c": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/mots-c-10mg/", "price": "£32.00", "inStock": True, "image": "/images/products/nova-peptide/mots-c.webp"}
    ],
    "ipamorelin": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/ipamorelin/", "price": "£40.00", "inStock": True, "image": "/images/products/nova-peptide/ipamorelin.webp"}
    ],
    "5-amino-1mq": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/5-amino-1mq/", "price": "£48.00", "inStock": True, "image": "/images/products/nova-peptide/5-amino-1mq.webp"}
    ],
    "bacteriostatic-water": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/bac-water-10ml/", "price": "£8.99", "inStock": True, "image": "/images/products/nova-peptide/bac-water.webp"}
    ],
    "cjc-1295": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/cjc-1295-10mg-without-dac/", "price": "£48.00", "inStock": True, "image": "/images/products/nova-peptide/cjc-1295.webp"}
    ],
    "kpv": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/kpv-10mg/", "price": "£38.00", "inStock": True, "image": "/images/products/nova-peptide/kpv.webp"}
    ],
    "aod9604": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/aod-9604/", "price": "£48.00", "inStock": True, "image": "/images/products/nova-peptide/aod-9604.webp"}
    ],
    "epitalon": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/epitalon/", "price": "£28.00", "inStock": True, "image": "/images/products/nova-peptide/epitalon.png"}
    ],
    "semax": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/semax/", "price": "£39.00", "inStock": True, "image": "/images/products/nova-peptide/semax.webp"}
    ],
    "tesamorelin": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/tesamorelin/", "price": "£60.00", "inStock": True, "image": "/images/products/nova-peptide/tesamorelin.png"}
    ],
    "nad-plus": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/nad/", "price": "£50.00", "inStock": True, "image": "/images/products/nova-peptide/nad.webp"}
    ],
    "ss-31": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/ss-31/", "price": "£38.00", "inStock": True, "image": "/images/products/nova-peptide/ss-31.webp"}
    ],
    "pt-141": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/pt-141-vial/", "price": "£30.00", "inStock": True, "image": "/images/products/nova-peptide/pt-141.webp"}
    ],
    "kisspeptin-10": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/kisspeptin/", "price": "£30.00", "inStock": True, "image": "/images/products/nova-peptide/kisspeptin.png"}
    ],
    "selank": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/vial-selank/", "price": "£38.00", "inStock": True, "image": "/images/products/nova-peptide/selank.png"}
    ],
    "mt2": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/melanotan-ii/", "price": "£26.00", "inStock": True, "image": "/images/products/nova-peptide/melanotan-ii.webp"}
    ],
    "wolverine-stack-bpc157-tb500-blend": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/the-wolverine-stack-bpc-157-and-tb-500/", "price": "£69.00", "inStock": True, "image": "/images/products/nova-peptide/wolverine-stack.webp"}
    ],
    "glow": [
        {"vendor": "Nova Peptide", "url": "https://www.novapeptide.co.uk/product/glow-blend/", "price": "£80.00", "inStock": True, "image": "/images/products/nova-peptide/glow-blend.webp"}
    ]
}

# Stratford Peptides sources (all sold out currently)
stratford_sources = {
    "retatrutide": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/retatrutide", "price": "From £94.98", "inStock": False, "image": "/images/products/stratford-peptides/retatrutide.png"}
    ],
    "bpc-157": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/bcp-157", "price": "From £29.98", "inStock": False, "image": "/images/products/stratford-peptides/bpc-157.png"}
    ],
    "tb-500": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/tb500-tb4", "price": "£23.88", "inStock": False, "image": "/images/products/stratford-peptides/tb500.png"}
    ],
    "ghk-cu": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/ghk-cu", "price": "From £18.90", "inStock": False, "image": "/images/products/stratford-peptides/ghk-cu.png"}
    ],
    "mots-c": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/mots-c", "price": "£24.98", "inStock": False, "image": "/images/products/stratford-peptides/mots-c.png"}
    ],
    "ipamorelin": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/ipamorelin", "price": "From £26.88", "inStock": False, "image": "/images/products/stratford-peptides/ipamorelin.png"}
    ],
    "5-amino-1mq": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/5-amino-1mq", "price": "From £24.98", "inStock": False, "image": "/images/products/stratford-peptides/5-amino-1mq.png"}
    ],
    "cjc-1295": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/cjc-1295-no-dac", "price": "£26.88", "inStock": False, "image": "/images/products/stratford-peptides/cjc-1295.png"}
    ],
    "kpv": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/kpv", "price": "£22.88", "inStock": False, "image": "/images/products/stratford-peptides/kpv.png"}
    ],
    "aod9604": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/aod-9604", "price": "£24.98", "inStock": False, "image": "/images/products/stratford-peptides/aod-9604.png"}
    ],
    "epitalon": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/epitalon", "price": "£23.88", "inStock": False, "image": "/images/products/stratford-peptides/epitalon.png"}
    ],
    "semax": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/semax-10mg", "price": "£28.88", "inStock": False, "image": "/images/products/stratford-peptides/semax.png"}
    ],
    "selank": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/selank", "price": "£23.88", "inStock": False, "image": "/images/products/stratford-peptides/selank.png"}
    ],
    "tesamorelin": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/tesamorelin", "price": "From £34.98", "inStock": False, "image": "/images/products/stratford-peptides/tesamorelin.png"}
    ],
    "ss-31": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/ss-31", "price": "£25.88", "inStock": False, "image": "/images/products/stratford-peptides/ss-31.png"}
    ],
    "mt2": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/melanotan-2", "price": "£23.88", "inStock": False, "image": "/images/products/stratford-peptides/melanotan-ii.png"}
    ],
    "dsip": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/disp", "price": "£25.60", "inStock": False, "image": "/images/products/stratford-peptides/dsip.png"}
    ],
    "igf-1-lr3": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/no-product", "price": "£28.88", "inStock": False, "image": "/images/products/stratford-peptides/igf-1-lr3.png"}
    ],
    "nad-plus": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/nad", "price": "£38.98", "inStock": False, "image": "/images/products/stratford-peptides/nad.png"}
    ],
    "snap-8": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/snap-8", "price": "£24.98", "inStock": False, "image": "/images/products/stratford-peptides/snap-8.png"}
    ],
    "l-carnitine": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/l-carnitine", "price": "£26.88", "inStock": False, "image": "/images/products/stratford-peptides/l-carnitine.png"}
    ],
    "tirzepatide": [
        {"vendor": "Stratford Peptides", "url": "https://www.stratfordpeptides.com/products/tirzepatide", "price": "From £29.98", "inStock": False, "image": "/images/products/stratford-peptides/tirzepatide.png"}
    ]
}

# Add sources to matching compounds
added_nova = 0
added_stratford = 0
not_found = []

for compound in data:
    cid = compound["id"]
    if cid in nova_sources:
        # Check if Nova Peptide already exists as a source
        existing = any(s.get("vendor") == "Nova Peptide" for s in compound.get("sources", []))
        if not existing:
            for s in nova_sources[cid]:
                compound.setdefault("sources", []).append(s)
            added_nova += 1
    
    if cid in stratford_sources:
        existing = any(s.get("vendor") == "Stratford Peptides" for s in compound.get("sources", []))
        if not existing:
            for s in stratford_sources[cid]:
                compound.setdefault("sources", []).append(s)
            added_stratford += 1

# Check which compounds weren't found
for cid in nova_sources:
    if not any(c["id"] == cid for c in data):
        not_found.append(f"Nova: {cid}")
for cid in stratford_sources:
    if not any(c["id"] == cid for c in data):
        not_found.append(f"Stratford: {cid}")

print(f"Nova Peptide sources added to {added_nova} compounds")
print(f"Stratford Peptides sources added to {added_stratford} compounds")
if not_found:
    print(f"Not found in compounds.json: {not_found}")

# Check for Tesa-Ipa blend - need to find if there's a compound for this
tesa_ipa = [c for c in data if "tesa" in c["id"].lower() or "ipa" in c["id"].lower() or "blend" in c["id"].lower()]
print(f"\nPossible Tesa-Ipa blend compounds: {[c['id'] for c in tesa_ipa[:10]]}")

with open('src/data/compounds.json', 'w') as f:
    json.dump(data, f, indent=2)

print("\nDone! compounds.json updated.")
