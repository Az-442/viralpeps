#!/usr/bin/env python3
"""Add Octagon Peptides to vendors.json and compounds.json"""
import json
import os
import re
from urllib.request import urlopen

VENDORS_PATH = '/Users/time4you/viralpeps/src/data/vendors.json'
COMPOUNDS_PATH = '/Users/time4you/viralpeps/src/data/compounds.json'

# Load existing data
with open(VENDORS_PATH) as f:
    vendors = json.load(f)

with open(COMPOUNDS_PATH) as f:
    compounds = json.load(f)

vendor_id = "octagon-peptides"
vendor_name = "Octagon Peptides"

if any(v['id'] == vendor_id for v in vendors):
    print(f"⚠️ {vendor_name} already exists in vendors.json, skipping...")
else:
    vendors.append({
        "id": vendor_id,
        "name": vendor_name,
        "slug": vendor_id,
        "website": "https://octagonpeptides.co.uk",
        "rating": 4.5,
        "verified": False,
        "founded": 2025,
        "country": "UK",
        "description": "UK-based research peptide supplier with 35 high-purity compounds supplied for laboratory research. All products manufactured to strict quality specifications with purity levels verified through analytical testing. Certificates of Analysis (COAs) available to support transparency. Free UK delivery on orders over £100 with next-day guaranteed dispatch before 12pm.",
        "highlights": [
            "35 products in catalog",
            "Third-party tested with COAs",
            "Free UK delivery over £100",
            "Next-day dispatch (order before 12pm)",
            "Research-focused supply",
            "UK-based"
        ],
        "shipping": [
            "UK free over £100 (next-day guaranteed, order before 12pm Mon-Fri)"
        ],
        "payment": [
            "Cards (Visa/Mastercard)",
            "Online bank transfer"
        ],
        "lastTested": "",
        "labTested": True
    })
    print(f"✅ Added {vendor_name} to vendors.json")

# Now add compound entries
# Map of Octagon product names to our compound slugs
# Format: (compound_slug, product_name, url_slug, price, category)
octagon_products = [
    # Peptides already in our catalog
    ("aod-9604", "AOD 9604 5 mg", "aod-9604-5-mg", "£35.00", "research-peptides"),
    ("bpc-157", "BPC-157 10 mg", "bpc-157-10-mg", "£30.00", "regenerative-peptides"),
    ("cjc-1295", "CJC with DAC 5 mg", "cjc-with-dac-5-mg", "£30.00", "growth-hormone-peptides"),
    ("cjc-1295-no-dac", "CJC no DAC 5 mg", "cjc-no-dac-5-mg", "£25.00", "growth-hormone-peptides"),
    ("dsip", "DSIP 10 mg", "dsip-10-mg", "£25.00", "research-peptides"),
    ("epitalon", "Epithalon 10 mg", "epithalon-10-mg", "£25.00", "research-peptides"),
    ("ghk-cu", "GHK-Cu 100 mg", "ghk-cu-100-mg", "£50.00", "copper-peptides"),
    ("hexarelin", "Hexarelin 5 mg", "hexarelin-5-mg", "£25.00", "growth-hormone-peptides"),
    ("igf-1-lr3", "IGF-1 LR3", "igf-1-lr3", "£40.00", "growth-hormone-peptides"),
    ("ipamorelin", "Ipamorelin 10 mg", "ipamorelin-10-mg", "£35.00", "growth-hormone-peptides"),
    ("kisspeptin-10", "Kisspeptin 10 mg", "kisspeptin-10-mg", "£30.00", "research-peptides"),
    ("kpv", "KPV 10 mg", "kpv-10-mg", "£25.00", "research-peptides"),
    ("mots-c", "MOTS-c 20 mg", "mots-c-20-mg", "£45.00", "research-peptides"),
    ("oxytocin", "Oxytocin 5 mg", "oxytocin-5-mg", "£25.00", "neuropeptides"),
    ("peg-mgf", "PEG-MGF 2 mg", "peg-mgf-2-mg", "£20.00", "research-peptides"),
    ("pt-141-bremelanotide", "PT-141 10 mg", "pt-141-10-mg", "£30.00", "research-peptides"),
    ("selank", "Selank 10 mg", "selank-10-mg", "£30.00", "neuropeptides"),
    ("semax", "Semax 10 mg", "semax-10-mg", "£30.00", "neuropeptides"),
    ("ss-31", "SS-31 10 mg", "ss-31-10-mg", "£40.00", "research-peptides"),
    ("tb-500", "TB-500 10 mg", "tb-500-10-mg", "£35.00", "regenerative-peptides"),
    ("tesamorelin", "Tesamorelin 10 mg", "tesamorelin-10-mg", "£45.00", "growth-hormone-peptides"),
    ("semaglutide", "Reta", "reta", "£115.00", "glp-1-agonists"),
    ("melanotan-ii", "MT-2 10 mg", "mt-2-10-mg", "£30.00", "research-peptides"),
    ("ghrp-2", "CJC-1295 no DAC + Ipamorelin 5mg/5mg", "cjc-1295-no-dac-ipamorelin-5mg-5mg", "£50.00", "growth-hormone-peptides"),
    ("bpc-157-tb-500-blend", "BPC 10 mg + TB 10 mg", "bpc-10-mg-tb-10-mg", "£60.00", "peptide-blends"),
]

# Products not already in our catalog as standalone compounds
# These are supplement/accessory items or new compounds
# 5-Amino-1MQ 50 mg - research compound
# BAC Water - lab supply
# Acetic Water 3 ml - lab supply
# Cagri 10 mg - research peptide
# Glow 70 mg - peptide blend
# KLOW 80 mg - peptide blend
# NAD+ - supplement
# Tirze 30 mg - tirzepatide
# SLU-PP-332 5 mg - research compound

# Find existing compounds and add Octagon as a source
compound_slug_map = {
    "aod-9604": "aod-9604",
    "bpc-157": "bpc-157",
    "cjc-1295-with-dac": "cjc-1295",
    "cjc-1295-no-dac": "cjc-1295-no-dac",
    "dsip": "dsip",
    "epitalon": "epitalon",
    "ghk-cu": "ghk-cu",
    "hexarelin": "hexarelin",
    "igf-1-lr3": "igf-1-lr3",
    "ipamorelin": "ipamorelin",
    "kisspeptin-10": "kisspeptin-10",
    "kpv": "kpv",
    "mots-c": "mots-c",
    "oxytocin": "oxytocin",
    "peg-mgf": "peg-mgf",
    "pt-141-bremelanotide": "pt-141-bremelanotide",
    "selank": "selank",
    "semax": "semax",
    "ss-31": "ss-31",
    "tb-500": "tb-500",
    "tesamorelin": "tesamorelin",
    "melanotan-ii": "melanotan-ii",
    "semaglutide": "semaglutide",
    "bpc-157-tb-500-blend": "bpc-157-tb-500-blend",
    "cjc-1295-no-dac-ipamorelin": "ghrp-2",
}

# Map compound slugs to their index for quick lookup
compound_by_slug = {c.get('slug', ''): i for i, c in enumerate(compounds)}

added_count = 0

# 1. AOD 9604 5 mg - £35.00
slug = "aod-9604"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/aod-9604-5-mg/",
            "price": "£35.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "5mg"
        })
        added_count += 1
        print(f"  + AOD 9604 (£35.00)")

# 2. BPC-157 10 mg - £30.00
slug = "bpc-157"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/bpc-157-10-mg/",
            "price": "£30.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + BPC-157 (£30.00)")

# 3. CJC with DAC 5 mg - £30.00
slug = "cjc-1295"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/cjc-with-dac-5-mg/",
            "price": "£30.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "5mg"
        })
        added_count += 1
        print(f"  + CJC-1295 with DAC (£30.00)")

# 4. CJC no DAC 5 mg - £25.00
slug = "cjc-1295-no-dac"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/cjc-no-dac-5-mg/",
            "price": "£25.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "5mg"
        })
        added_count += 1
        print(f"  + CJC-1295 no DAC (£25.00)")

# 5. DSIP 10 mg - £25.00
slug = "dsip"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/dsip-10-mg/",
            "price": "£25.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + DSIP (£25.00)")

# 6. Epithalon 10 mg - £25.00
slug = "epitalon"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/epithalon-10-mg/",
            "price": "£25.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + Epithalon (£25.00)")

# 7. GHK-Cu 100 mg - £50.00
slug = "ghk-cu"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/ghk-cu-100-mg/",
            "price": "£50.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "100mg"
        })
        added_count += 1
        print(f"  + GHK-Cu (£50.00)")

# 8. Hexarelin 5 mg - £25.00
slug = "hexarelin"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/hexarelin-5-mg/",
            "price": "£25.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "5mg"
        })
        added_count += 1
        print(f"  + Hexarelin (£25.00)")

# 9. IGF-1 LR3 - £40.00
slug = "igf-1-lr3"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/igf-1-lr3/",
            "price": "£40.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "1mg"
        })
        added_count += 1
        print(f"  + IGF-1 LR3 (£40.00)")

# 10. Ipamorelin 10 mg - £35.00
slug = "ipamorelin"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/ipamorelin-10-mg/",
            "price": "£35.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + Ipamorelin (£35.00)")

# 11. Kisspeptin 10 mg - £30.00
slug = "kisspeptin-10"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/kisspeptin-10-mg/",
            "price": "£30.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + Kisspeptin (£30.00)")

# 12. KPV 10 mg - £25.00
slug = "kpv"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/kpv-10-mg/",
            "price": "£25.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + KPV (£25.00)")

# 13. MOTS-c 20 mg - £45.00
slug = "mots-c"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/mots-c-20-mg/",
            "price": "£45.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "20mg"
        })
        added_count += 1
        print(f"  + MOTS-c (£45.00)")

# 14. Oxytocin 5 mg - £25.00
slug = "oxytocin"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/oxytocin-5-mg/",
            "price": "£25.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "5mg"
        })
        added_count += 1
        print(f"  + Oxytocin (£25.00)")

# 15. PEG-MGF 2 mg - £20.00
slug = "peg-mgf"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/peg-mgf-2-mg/",
            "price": "£20.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "2mg"
        })
        added_count += 1
        print(f"  + PEG-MGF (£20.00)")

# 16. PT-141 10 mg - £30.00
slug = "pt-141-bremelanotide"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/pt-141-10-mg/",
            "price": "£30.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + PT-141 (£30.00)")

# 17. Selank 10 mg - £30.00
slug = "selank"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/selank-10-mg/",
            "price": "£30.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + Selank (£30.00)")

# 18. Semax 10 mg - £30.00
slug = "semax"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/semax-10-mg/",
            "price": "£30.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + Semax (£30.00)")

# 19. SS-31 10 mg - £40.00
slug = "ss-31"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/ss-31-10-mg/",
            "price": "£40.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + SS-31 (£40.00)")

# 20. TB-500 10 mg - £35.00
slug = "tb-500"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/tb-500-10-mg/",
            "price": "£35.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + TB-500 (£35.00)")

# 21. Tesamorelin 10 mg - £45.00
slug = "tesamorelin"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/tesamorelin-10-mg/",
            "price": "£45.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + Tesamorelin (£45.00)")

# 22. Reta (Retatrutide) - £115.00 (mid-range)
slug = "semaglutide"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/reta/",
            "price": "£115.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + Reta/Retatrutide (£115.00)")

# 23. MT-2 (Melanotan II) 10 mg - £30.00
slug = "melanotan-ii"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/mt-2-10-mg/",
            "price": "£30.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg"
        })
        added_count += 1
        print(f"  + MT-2 (Melanotan II) (£30.00)")

# 24. BPC 10 mg + TB 10 mg (Blend) - £60.00
slug = "bpc-157-tb-500-blend"
if slug in compound_by_slug:
    idx = compound_by_slug[slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/bpc-10-mg-tb-10-mg/",
            "price": "£60.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "10mg/10mg"
        })
        added_count += 1
        print(f"  + BPC 10 mg + TB 10 mg (Blend) (£60.00)")

# 25. Tirze 30 mg (Tirzepatide)
# Find tirzepatide in compounds
tirz_slug = "tirzepatide"
if tirz_slug in compound_by_slug:
    idx = compound_by_slug[tirz_slug]
    existing_sources = [s.get('vendor') for s in compounds[idx].get('sources', [])]
    if vendor_name not in existing_sources:
        compounds[idx]['sources'].append({
            "vendor": vendor_name,
            "url": "https://octagonpeptides.co.uk/product/tirze-30-mg/",
            "price": "£85.00",
            "inStock": True,
            "image": "/images/vendors/octagon-peptides.svg",
            "dosage": "30mg"
        })
        added_count += 1
        print(f"  + Tirze/Tirzepatide 30mg (£85.00)")

# Write back
with open(VENDORS_PATH, 'w') as f:
    json.dump(vendors, f, indent=2, ensure_ascii=False)

with open(COMPOUNDS_PATH, 'w') as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)

print(f"\nDone! Added vendor plus {added_count} compound sources.")
print(f"Total vendors: {len(vendors)}")
