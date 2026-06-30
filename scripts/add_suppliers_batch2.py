#!/usr/bin/env python3
"""Add Peptides Lab UK and Biohack Peptides to ViralPeps."""
import json
from pathlib import Path

DATA_DIR = Path('/Users/time4you/viralpeps/src/data')

# ── VENDOR DEFINITIONS ──

PEPTIDES_LAB_UK = {
    "id": "peptides-lab-uk",
    "name": "Peptides Lab UK",
    "slug": "peptides-lab-uk",
    "website": "https://peptideslabuk.com",
    "rating": 4.8,
    "verified": True,
    "founded": 2020,
    "country": "UK",
    "description": "One of the UK's largest research peptide suppliers with 98+ lab-tested products. All batches independently third-party tested via Optima Labs (ISO/IEC 17025). Cold-chain storage, auto-apply volume discounts, and free UK delivery on all orders.",
    "highlights": [
        "98+ products — largest UK catalog",
        "Third-party tested (Optima Labs ISO/IEC 17025)",
        "Free UK delivery",
        "Auto volume discounts (up to 20% off)",
        "Batch-specific COAs",
        "500,000+ orders fulfilled"
    ],
    "shipping": ["UK free delivery", "Cold-chain available", "Next-business-day dispatch"],
    "payment": ["Cards", "Bank transfer", "Cryptocurrency"],
    "lastTested": "2026-06-30",
    "labTested": True
}

BIOHACK_VENDOR = {
    "id": "biohack-peptides",
    "name": "Biohack Peptides",
    "slug": "biohack-peptides",
    "website": "https://biohackpeptides.co.uk",
    "rating": 4.9,
    "verified": True,
    "founded": 2023,
    "country": "UK",
    "description": "Premium UK research peptide supplier with a 4.9★ rating across 103 reviews. All products third-party lab tested via Janoshik with public COAs. Free next-day UK delivery, bulk discounts up to 25% off, and exceptional customer support.",
    "highlights": [
        "4.9/5 rating — 103 reviews",
        "Lab tested (Janoshik)",
        "Free next-day UK delivery",
        "Bulk discounts up to 25% off",
        "Free gift over £100",
        "98% of reviewers recommend"
    ],
    "shipping": ["UK free next-day (orders before 3pm)"],
    "payment": ["Cards", "Bank transfer"],
    "lastTested": "2026-06-30",
    "labTested": True
}

# ── PRODUCT MAPPINGS ──

PLU_PRODUCTS = [
    # (product_name, compound_id, dosage, price, url_suffix)
    ("Retatrutide 5mg", "retatrutide", "5mg", "\u00a359.99", ""),
    ("Retatrutide 10mg", "retatrutide", "10mg", "\u00a398.99", ""),
    ("Retatrutide 15mg", "retatrutide", "15mg", "\u00a3139.99", ""),
    ("Retatrutide 20mg", "retatrutide", "20mg", "\u00a3179.99", ""),
    ("Retatrutide 30mg", "retatrutide", "30mg", "\u00a3246.00", ""),
    ("Tirzepatide 10mg", "tirzepatide", "10mg", "\u00a382.99", ""),
    ("Tirzepatide 20mg", "tirzepatide", "20mg", "\u00a3149.99", ""),
    ("Tirzepatide 30mg", "tirzepatide", "30mg", "\u00a3199.00", ""),
    ("Tirzepatide 40mg", "tirzepatide", "40mg", "\u00a3239.00", ""),
    ("Tirzepatide 60mg", "tirzepatide", "60mg", "\u00a3279.00", ""),
    ("BPC-157 5mg", "bpc-157", "5mg", "\u00a317.99", ""),
    ("TB-500 5mg", "tb-500", "5mg", "\u00a323.99", ""),
    ("GHK-Cu 50mg", "ghk-cu", "50mg", "\u00a337.99", ""),
    ("GHK-Cu 100mg", "ghk-cu", "100mg", "\u00a369.99", ""),
    ("MOTS-c 10mg", "mots-c", "10mg", "\u00a328.99", ""),
    ("Semax 5mg", "semax", "5mg", "\u00a316.99", ""),
    ("NAD+ 500mg", "nad-plus", "500mg", "\u00a396.99", ""),
    ("CJC-1295 with DAC 2mg", "cjc-1295-with-dac", "2mg", "\u00a359.99", ""),
    ("CJC-1295 No DAC", "cjc-1295-no-dac", "10mg", "\u00a389.99", ""),
    ("MT-2 10mg", "mt2", "10mg", "\u00a358.99", ""),
    ("Bacteriostatic Water 10ml", "bacteriostatic-water", "10ml", "\u00a36.99", ""),
    ("Ipamorelin 10mg", "ipamorelin", "10mg", "\u00a321.99", ""),
    ("Tesamorelin 10mg", "tesamorelin", "10mg", "\u00a327.99", ""),
    ("5-Amino-1MQ", "5-amino-1mq", "10mg", "\u00a316.00", ""),
    ("AOD9604", "aod9604", "5mg", "\u00a324.99", ""),
    ("Sermorelin Acetate", "sermorelin", "5mg", "\u00a323.99", ""),
    ("Selank 5mg", "selank", "5mg", "\u00a339.99", ""),
    ("DSIP", "dsip", "5mg", "\u00a322.99", ""),
    ("SS-31 10mg", "ss-31", "10mg", "\u00a397.99", ""),
    ("CJC-1295 + Ipamorelin Stack", "cjc-1295-ipamorelin-blend", "10mg", "\u00a3119.00", ""),
    ("BPC 5mg + TB 5mg Stack", "wolverine-stack-bpc157-tb500-blend", "5mg+5mg", "\u00a379.00", ""),
    ("Glow Stack (GHK-Cu+BPC-157+TB-500)", "glow", "70mg", "\u00a389.00", ""),
    ("Wolverine Stack (BPC-157+TB-500)", "wolverine-stack-bpc157-tb500-blend", "20mg", "\u00a389.00", ""),
    ("KLOW Peptide 80mg", "klow", "80mg", "\u00a3112.00", ""),
    ("AICAR", "aicar", "50mg", "\u00a339.99", ""),
    ("PT-141 10mg", "pt-141", "10mg", "\u00a344.99", ""),
    ("KPV 10mg", "kpv", "10mg", "\u00a368.99", ""),
    ("Epithalon", "epitalon", "10mg", "\u00a342.99", ""),
    ("FOXO4-DRI", "foxo4-dr1", "10mg", "\u00a3194.99", ""),
    ("PEG MGF", "peg-mgf", "2mg", "\u00a379.99", ""),
    ("Thymosin Alpha-1 5mg", "thymosin-alpha-1", "5mg", "\u00a3139.99", ""),
    ("LH-HCG 5000IU", "hcg", "5000IU", "\u00a349.99", ""),
    ("Oxytocin 5mg", "oxytocin", "5mg", "\u00a325.99", ""),
    ("SNAP-8", "snap-8", "10mg", "\u00a327.00", ""),
    ("ARA-290", "ara-290", "10mg", "\u00a369.00", ""),
    ("Glutathione", "glutathione", "1500mg", "\u00a389.00", ""),
    ("Cagrilintide 5mg", "sterling-cagrilintide-5mg", "5mg", "\u00a3149.00", ""),
    ("HGH Fragment 176-191", "fragment-176-191", "5mg", "\u00a358.99", ""),
    ("GHRP-6", "ghrp-6", "5mg", "\u00a322.99", ""),
    ("Follistatin 344", "follistatin-344", "1mg", "\u00a3229.00", ""),
    ("Survodutide", "survodutide", "10mg", "\u00a3160.00", ""),
    ("Adipotide", "adipotide", "5mg", "\u00a3179.99", ""),
    ("VIP", "vip", "10mg", "\u00a367.00", ""),
    ("Thymalin", "thymalin", "10mg", "\u00a346.99", ""),
    ("IGF-1 LR3", "igf-1-lr3", "1mg", "\u00a339.99", ""),
    ("IGF-DES", "igf-1-des", "1mg", "\u00a351.99", ""),
    ("LL-37", "ll-37", "5mg", "\u00a3149.00", ""),
    ("Gonadorelin Acetate", "gonadorelin", "5mg", "\u00a342.99", ""),
]

BIOHACK_PRODUCTS = [
    ("BPC-157 5mg (with Bac Water)", "bpc-157", "5mg", "\u00a317.99", ""),
    ("BPC-157 10mg (with Bac Water)", "bpc-157", "10mg", "\u00a324.99", ""),
    ("TB-500 5mg (with Bac Water)", "tb-500", "5mg", "\u00a318.99", ""),
    ("TB-500 10mg (with Bac Water)", "tb-500", "10mg", "\u00a328.99", ""),
    ("BPC-157 + TB-500 Blend 10mg (with Bac Water)", "wolverine-stack-bpc157-tb500-blend", "10mg", "\u00a323.99", ""),
    ("BPC-157 + TB-500 Blend 20mg (with Bac Water)", "wolverine-stack-bpc157-tb500-blend", "20mg", "\u00a339.99", ""),
    ("GHK-Cu 50mg (with Bac Water)", "ghk-cu", "50mg", "\u00a318.99", ""),
    ("GHK-Cu 100mg (with Bac Water)", "ghk-cu", "100mg", "\u00a329.99", ""),
    ("MOTS-c 10mg (with Bac Water)", "mots-c", "10mg", "\u00a318.99", ""),
    ("MOTS-c 40mg (with Bac Water)", "mots-c", "40mg", "\u00a344.99", ""),
    ("Semax 5mg (with Bac Water)", "semax", "5mg", "\u00a317.99", ""),
    ("Selank 5mg (with Bac Water)", "selank", "5mg", "\u00a317.99", ""),
    ("NAD+ 500mg (with Bac Water)", "nad-plus", "500mg", "\u00a349.99", ""),
    ("5-Amino-1MQ 5mg (with Bac Water)", "5-amino-1mq", "5mg", "\u00a322.99", ""),
    ("5-Amino-1MQ 50mg (with Bac Water)", "5-amino-1mq", "50mg", "\u00a344.99", ""),
    ("Tesamorelin 5mg (with Bac Water)", "tesamorelin", "5mg", "\u00a324.99", ""),
    ("Tesamorelin 10mg (with Bac Water)", "tesamorelin", "10mg", "\u00a334.99", ""),
    ("Tesamorelin 15mg (with Bac Water)", "tesamorelin", "15mg", "\u00a344.99", ""),
    ("CJC-1295 No DAC 5mg (with Bac Water)", "cjc-1295-no-dac", "5mg", "\u00a319.99", ""),
    ("CJC-1295 + Ipamorelin Blend 10mg (with Bac Water)", "cjc-1295-ipamorelin-blend", "10mg", "\u00a334.99", ""),
    ("SS-31 50mg (with Bac Water)", "ss-31", "50mg", "\u00a364.99", ""),
    ("Bacteriostatic Water 10ml", "bacteriostatic-water", "10ml", "\u00a39.99", ""),
    ("KPV 10mg (with Bac Water)", "kpv", "10mg", "\u00a318.99", ""),
    ("PT-141 10mg (with Bac Water)", "pt-141", "10mg", "\u00a317.99", ""),
    ("Kisspeptin 5mg (with Bac Water)", "kisspeptin", "5mg", "\u00a318.99", ""),
    ("Melanotan II 10mg (with Bac Water)", "mt2", "10mg", "\u00a319.99", ""),
    ("HCG 5000 IU (with Bac Water)", "hcg", "5000IU", "\u00a324.99", ""),
    ("HCG 10000 IU (with Bac Water)", "hcg", "10000IU", "\u00a339.99", ""),
    ("Thymosin Alpha-1 5mg (with Bac Water)", "thymosin-alpha-1", "5mg", "\u00a324.99", ""),
    ("SLU-PP-332 5mg (with Bac Water)", "slu-pp-332", "5mg", "\u00a339.99", ""),
    ("IGF-1 LR3 1mg (with Bac Water)", "igf-1-lr3", "1mg", "\u00a329.99", ""),
    ("Glutathione 1500mg (with Bac Water)", "glutathione", "1500mg", "\u00a339.99", ""),
    ("GLOW Blend 70mg (with Bac Water)", "glow", "70mg", "\u00a359.99", ""),
    ("KLOW Blend 80mg (with Bac Water)", "klow", "80mg", "\u00a369.99", ""),
]

def slugify(text):
    import re
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

def main():
    with open(DATA_DIR / 'vendors.json') as f:
        vendors = json.load(f)
    with open(DATA_DIR / 'compounds.json') as f:
        compounds = json.load(f)

    compound_index = {c['id']: c for c in compounds}
    existing_vendor_ids = {v['id'] for v in vendors}

    # Add Peptides Lab UK vendor
    if PEPTIDES_LAB_UK['id'] not in existing_vendor_ids:
        vendors.append(PEPTIDES_LAB_UK)
        print(f"✅ Added vendor: {PEPTIDES_LAB_UK['name']}")
    else:
        print(f"⚠️  Vendor exists: {PEPTIDES_LAB_UK['name']}")

    # Add Biohack vendor
    if BIOHACK_VENDOR['id'] not in existing_vendor_ids:
        vendors.append(BIOHACK_VENDOR)
        print(f"✅ Added vendor: {BIOHACK_VENDOR['name']}")
    else:
        print(f"⚠️  Vendor exists: {BIOHACK_VENDOR['name']}")

    # Function to add sources
    def add_sources(supplier_name, supplier_slug, products, vendor_name):
        added = 0
        skipped = 0
        unmatched = []
        for prod_name, cid, dosage, price, _ in products:
            if cid not in compound_index:
                unmatched.append((prod_name, cid))
                continue
            compound = compound_index[cid]
            sources = compound.setdefault('sources', [])
            existing = any(
                s.get('vendor') == vendor_name and s.get('dosage') == dosage
                for s in sources
            )
            if not existing:
                sources.append({
                    "vendor": vendor_name,
                    "url": f"https://{supplier_slug}.com",
                    "price": price,
                    "inStock": True,
                    "image": f"/images/products/{supplier_slug}/{slugify(prod_name)}.webp",
                    "dosage": dosage
                })
                added += 1
            else:
                skipped += 1
        return added, skipped, unmatched

    plu_added, plu_skipped, plu_nomatch = add_sources(
        "peptideslabuk", "peptideslabuk", PLU_PRODUCTS, "Peptides Lab UK"
    )
    print(f"\nPeptides Lab UK: {plu_added} added, {plu_skipped} skipped")
    if plu_nomatch:
        print(f"  No match: {plu_nomatch}")

    bio_added, bio_skipped, bio_nomatch = add_sources(
        "biohackpeptides.co.uk", "biohackpeptides", BIOHACK_PRODUCTS, "Biohack Peptides"
    )
    print(f"\nBiohack Peptides: {bio_added} added, {bio_skipped} skipped")
    if bio_nomatch:
        print(f"  No match: {bio_nomatch}")

    # Write
    with open(DATA_DIR / 'vendors.json', 'w') as f:
        json.dump(vendors, f, indent=2, ensure_ascii=False)
    with open(DATA_DIR / 'compounds.json', 'w') as f:
        json.dump(compounds, f, indent=2, ensure_ascii=False)

    # Final stats
    print(f"\nTotal vendors: {len(vendors)}")
    print(f"Total compounds: {len(compounds)}")

if __name__ == '__main__':
    main()
