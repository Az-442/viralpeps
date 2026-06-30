#!/usr/bin/env python3
"""
Add Raccoon Peptides and Kensington Labs suppliers to ViralPeps.
Adds vendors to vendors.json and their product sources to compounds.json.
"""
import json
import re
from datetime import datetime
from pathlib import Path

DATA_DIR = Path('/Users/time4you/viralpeps/src/data')

# ── 1. Add vendors ──────────────────────────────────────────────────

RACCOON_VENDOR = {
    "id": "raccoon-peptides",
    "name": "Raccoon Peptides",
    "slug": "raccoon-peptides",
    "website": "https://www.raccoonpeptides.com",
    "rating": 4.9,
    "verified": True,
    "founded": 2022,
    "country": "UK",
    "description": "Premium UK peptide supplier with 95+ products independently lab-tested via HPLC and mass spectrometry. 4.9/5 rating. Known for fast delivery, discreet packaging, exceptional customer service and value pricing.",
    "highlights": [
        "4.9/5 rating",
        "Lab tested (Janoshik/HPLC)",
        "95+ products",
        "Fast UK delivery",
        "Discreet packaging",
        "Free over £100"
    ],
    "shipping": [
        "UK free over £100",
        "Royal Mail Tracked 24",
        "International tracked"
    ],
    "payment": [
        "Cards",
        "PayPal",
        "Google Pay"
    ],
    "lastTested": "2026-06-29",
    "labTested": True
}

KENSINGTON_VENDOR = {
    "id": "kensington-labs",
    "name": "Kensington Labs UK",
    "slug": "kensington-labs",
    "website": "https://www.kensingtonlabs.co.uk",
    "rating": 4.6,
    "verified": True,
    "founded": 2021,
    "country": "UK",
    "description": "UK-based research peptide supplier offering a curated catalog of 74 premium-grade compounds. Trustpilot-rated 4.6/5. All products independently lab-tested with COAs per batch. Free next-day delivery on all orders.",
    "highlights": [
        "4.6/5 rating",
        "Lab tested (Janoshik)",
        "74 products",
        "Free next-day delivery",
        "Volume discounts (up to 10% off)",
        "COA per batch"
    ],
    "shipping": [
        "UK free next-day (orders before 1:30pm Mon-Fri)",
        "International via kensingtonlabs.shop"
    ],
    "payment": [
        "Cards",
        "Bank transfer",
        "Apple Pay",
        "Google Pay"
    ],
    "lastTested": "2026-06-28",
    "labTested": True
}

# ── 2. Product → Master Compound mapping ───────────────────────────
# Format: (product_name_regex, master_compound_id, variant_size, variant_price)

# --- RACCOON PEPTIDES PRODUCTS ---
RACCOON_PRODUCTS = [
    # BPC-157 variants
    ("BPC-157 10mg", "bpc-157", "10mg", "£19.50"),
    ("BPC-157 20mg", "bpc-157", "20mg", "£34.90"),
    ("BPC-157 40mg", "bpc-157", "40mg", "£49.00"),
    ("BPC-157 5mg & TB-500 5mg", "wolverine-stack-bpc157-tb500-blend", "5mg+5mg", "£24.90"),
    ("BPC-157 10mg & TB-500 10mg", "bpc-10mg-tb-10mg-20mg", "10mg+10mg", "£44.95"),

    # GHRP/GHRH
    ("CJC-1295 No Dac 10mg", "cjc-1295-no-dac", "10mg", "£24.90"),
    ("CJC-1295 with DAC 5mg", "cjc-1295-with-dac", "5mg", "£19.98"),
    ("CJC1295 5mg + Ipamorelin 5mg", "cjc-1295-ipamorelin-blend", "5mg+5mg", "£29.49"),
    ("CJC1295 10mg + Ipamorelin 10mg", "cjc-1295-ipamorelin-blend", "10mg+10mg", "£54.90"),
    ("Ipamorelin 10mg", "ipamorelin", "10mg", "£21.00"),
    ("GHRP-2 10mg", "ghrp-2", "10mg", "£15.90"),
    ("GHRP-6 10mg", "ghrp-6", "10mg", "£12.00"),
    ("Sermorelin 5mg", "sermorelin", "5mg", "£22.95"),

    # GLP-1 / Metabolic
    ("Tirzepatide 10mg", "tirzepatide", "10mg", "£39.00"),
    ("Tirzepatide 20mg", "tirzepatide", "20mg", "£59.00"),
    ("Tirzepatide 30mg", "tirzepatide", "30mg", "£79.00"),
    ("Tirzepatide 45mg", "tirzepatide", "45mg", "£94.00"),
    ("Tirzepatide 60mg", "tirzepatide", "60mg", "£109.00"),
    ("Retatrutide 10mg", "retatrutide", "10mg", "£39.00"),
    ("Retatrutide 20mg", "retatrutide", "20mg", "£59.00"),
    ("Retatrutide 30mg", "retatrutide", "30mg", "£74.00"),
    ("Retatrutide 40mg", "retatrutide", "40mg", "£99.00"),
    ("Retatrutide 50mg", "retatrutide", "50mg", "£129.00"),
    ("Retatrutide 60mg", "retatrutide", "60mg", "£149.00"),
    ("Semaglutide 5mg", "semaglutide", "5mg", "£29.00"),
    ("Semaglutide 10mg", "semaglutide", "10mg", "£49.00"),
    ("AOD 9604 5mg", "aod9604", "5mg", "£18.90"),
    ("AOD 9604 10mg", "aod9604", "10mg", "£34.90"),
    ("Cagrilintide 5mg", "sterling-cagrilintide-5mg", "5mg", "£24.95"),
    ("Cagrilintide 10mg", "sterling-cagrilintide-10mg", "10mg", "£47.90"),

    # Healing / Recovery
    ("TB-500 10mg", "tb-500", "10mg", "£24.90"),
    ("GHK-CU 50mg", "ghk-cu", "50mg", "£13.89"),
    ("GHK-CU 100mg", "ghk-cu", "100mg", "£27.99"),
    ("BPC 157 5mg & TB-500 5mg", "glow", "5mg+5mg", "£24.90"),

    # Cognitive / Nootropic
    ("DSIP 5mg", "dsip", "5mg", "£9.99"),
    ("DSIP 10mg", "dsip", "10mg", "£19.00"),
    ("Selank 10mg", "selank", "10mg", "£21.00"),
    ("Semax 10mg", "semax", "10mg", "£23.00"),

    # Anti-aging / Longevity
    ("Epitalon 10mg", "epitalon", "10mg", "£13.98"),
    ("Epitalon 50mg", "epitalon", "50mg", "£49.50"),
    ("5-Amino-1MQ 10mg", "5-amino-1mq", "10mg", "£26.95"),
    ("5-Amino-1MQ 50mg", "5-amino-1mq", "50mg", "£41.99"),
    ("MOTS-C 10mg", "mots-c", "10mg", "£17.49"),
    ("MOTS-C 20mg", "mots-c", "20mg", "£33.00"),
    ("MOTS-C 40mg", "mots-c", "40mg", "£43.90"),
    ("NAD+ 500mg", "nad-plus", "500mg", "£25.90"),
    ("NAD+ 1000mg", "nad-plus", "1000mg", "£44.90"),

    # Mitochondrial
    ("SS-31 10mg", "ss-31", "10mg", "£21.25"),
    ("SS-31 50mg", "ss-31", "50mg", "£59.50"),
    ("KPV 10mg", "kpv", "10mg", "£19.97"),

    # Tesamorelin / Growth
    ("Tesamorelin 10mg", "tesamorelin", "10mg", "£34.90"),
    ("Tesamorelin 20mg", "tesamorelin", "20mg", "£69.00"),
    ("Tesamorelin 5mg/Ipamorelin 5mg Blend", "tesamorelin", "5mg+5mg", "£39.00"),
    ("PT-141 10mg", "pt-141", "10mg", "£16.90"),

    # New compounds for Raccoon
    ("Adipotide 10mg", "adipotide", "10mg", "£44.90"),
    ("ARA 290 16mg", "ara-290", "16mg", "£29.40"),
    ("Glutathione 1500mg", "glutathione", "1500mg", "£39.00"),
    ("SLU-PP-332 5mg", "slu-pp-332", "5mg", "£24.95"),
    ("Kisspeptin-10 10mg", "kisspeptin-10", "10mg", "£27.80"),
    ("Melanotan 2 10mg", "mt2", "10mg", "£24.90"),
    ("Thymosin Alpha-1 10mg", "thymosin-alpha-1", "10mg", "£47.90"),
    ("Thymulin 10mg", "thymalin", "10mg", "£29.00"),
    ("VIP 10mg", "vip", "10mg", "£29.00"),
    ("Oxytocin 10mg", "oxytocin", "10mg", "£24.90"),
    ("Mazdutide 10mg", "mazdutide", "10mg", "£49.95"),
    ("Survodutide 10mg", "survodutide", "10mg", "£39.00"),
    ("PEG MGF 2mg", "peg-mgf", "2mg", "£24.90"),
    ("IGF-1LR3 1mg", "igf-1-lr3", "1mg", "£27.40"),
    ("MGF 2mg", "mgf", "2mg", "£19.90"),
    ("AOD 9604 5mg", "aod9604", "5mg", "£18.90"),
    ("GHK-CU 50mg", "ghk-cu", "50mg", "£13.89"),
    ("GHK-CU 100mg", "ghk-cu", "100mg", "£27.99"),
    ("5-Amino-1MQ 50mg", "5-amino-1mq", "50mg", "£41.99"),
    ("Bacteriostatic water 10ml", "bacteriostatic-water", "10ml", "£4.95"),
    ("Bacteriostatic water 3ml", "bacteriostatic-water", "3ml", "£3.75"),

    # Blends from Raccoon
    ("GLOW Blend", "glow", "blend", "£41.00"),
    ("Klow Blend 80mg", "klow", "blend", "£52.90"),
    ("MitoPrime Blend", "mots-c", "blend", "£39.99"),
]

# --- KENSINGTON LABS PRODUCTS ---
KENSINGTON_PRODUCTS = [
    ("BPC 157 - 5mg", "bpc-157", "5mg", "£18.90"),
    ("BPC 157 - 10mg", "bpc-157", "10mg", "£29.95"),
    ("BPC 157 and TB500 Stack - 10mg", "wolverine-stack-bpc157-tb500-blend", "10mg", "£32.89"),
    ("BPC-157 & TB500 Blend - 10mg", "wolverine-stack-bpc157-tb500-blend", "10mg blend", "£29.95"),
    ("BPC-157 and TB500 blend - 20mg", "wolverine-stack-bpc157-tb500-blend", "20mg", "£39.95"),
    ("CJC-1295 (no DAC) & Ipamorelin Blend 10mg", "cjc-1295-ipamorelin-blend", "10mg", "£34.95"),
    ("CJC-1295 (no DAC) 5mg & Ipamorelin 5mg Stack", "cjc-1295-ipamorelin-blend", "5mg+5mg", "£34.95"),
    ("CJC-1295 with DAC 5mg", "cjc-1295-with-dac", "5mg", "£34.95"),
    ("CJC-1295 without DAC 5mg", "cjc-1295-no-dac", "5mg", "£29.95"),
    ("CJC-1295 without DAC 10mg", "cjc-1295-no-dac", "10mg", "£44.95"),
    ("Ipamorelin - 5mg", "ipamorelin", "5mg", "£19.95"),
    ("Ipamorelin - 10mg", "ipamorelin", "10mg", "£29.95"),
    ("TB500 - 5mg", "tb-500", "5mg", "£19.95"),
    ("TB500 - 10mg", "tb-500", "10mg", "£24.95"),
    ("GHK-CU - 50mg", "ghk-cu", "50mg", "£29.95"),
    ("GHK-CU - 100mg", "ghk-cu", "100mg", "£39.95"),
    ("5 Amino 1MQ - 5", "5-amino-1mq", "5mg", "£27.45"),
    ("5 Amino 1MQ - 10mg", "5-amino-1mq", "10mg", "£44.95"),
    ("5 Amino 1MQ - 50mg", "5-amino-1mq", "50mg", "£54.95"),
    ("AOD9604 - 5mg", "aod9604", "5mg", "£43.95"),
    ("DSIP - 5mg", "dsip", "5mg", "£24.95"),
    ("Sermorelin - 5mg", "sermorelin", "5mg", "£34.95"),
    ("MOTS-c - 10mg", "mots-c", "10mg", "£24.95"),
    ("MOTS-c - 40mg", "mots-c", "40mg", "£44.90"),
    ("NAD+ - 100mg", "nad-plus", "100mg", "£54.95"),
    ("NAD+ - 500mg", "nad-plus", "500mg", "£74.95"),
    ("Tesamorelin - 5mg", "tesamorelin", "5mg", "£24.95"),
    ("Tesamorelin - 10mg", "tesamorelin", "10mg", "£44.95"),
    ("PT-141 - 10mg", "pt-141", "10mg", "£29.95"),
    ("SS-31 - 10mg", "ss-31", "10mg", "£49.90"),
    ("KPV - 5mg", "kpv", "5mg", "£24.95"),
    ("KPV - 10mg", "kpv", "10mg", "£32.95"),
    ("Epitalon - 10mg", "epitalon", "10mg", "£24.95"),
    ("Epitalon - 50mg", "epitalon", "50mg", "£74.95"),
    ("Semax - 5mg", "semax", "5mg", "£24.95"),
    ("Selank - 5mg", "selank", "5mg", "£24.95"),
    ("GHRP-2 Acetate - 10mg", "ghrp-2", "10mg", "£20.90"),
    ("GHRP-6 Acetate - 5mg", "ghrp-6", "5mg", "£17.90"),
    ("Gonadorelin - 5mg", "gonadorelin", "5mg", "£39.90"),
    ("Survodutide 10mg", "survodutide", "10mg", "£49.90"),
    ("LL37 - 5mg", "ll-37", "5mg", "£29.95"),
    ("ARA_290 - 10mg", "ara-290", "10mg", "£54.90"),
    ("B7-33 - 10mg", "b7-33", "10mg", "£34.90"),
    ("FOXO4-DR1 - 10mg", "foxo4-dr1", "10mg", "£169.90"),
    ("ACTH 1-39 - 5mg", "acth-1-39", "5mg", "£49.90"),
    ("Ace031 - 1mg", "ace-031", "1mg", "£44.95"),
    ("Adamax - 5mg", "adamax", "5mg", "£29.95"),
    ("Adamax - 10mg", "adamax", "10mg", "£49.99"),
    ("Dermorphin - 5mg", "dermorphin", "5mg", "£28.90"),
    ("GDF-8 - 1mg", "gdf-8", "1mg", "£74.90"),
    ("Glutathione - 1500mg", "glutathione", "1500mg", "£44.90"),
    ("Hexarelin Acetate - 5mg", "hexarelin", "5mg", "£27.95"),
    ("HGH Frag 176-191 - 10mg", "fragment-176-191", "10mg", "£46.90"),
    ("IGF-1LR3 - 1mg", "igf-1-lr3", "1mg", "£34.95"),
    ("Kisspeptin - 5mg", "kisspeptin", "5mg", "£24.95"),
    ("Kisspeptin - 10mg", "kisspeptin-10", "10mg", "£29.95"),
    ("Lipo-c 10ml", "lipo-c", "10ml", "£49.90"),
    ("Oxytocin - 10mg", "oxytocin", "10mg", "£29.90"),
    ("PEG MGF - 2mg", "peg-mgf", "2mg", "£24.95"),
    ("Pinealon - 10mg", "pinealon", "10mg", "£29.90"),
    ("Snap-8 - 10mg", "snap-8", "10mg", "£19.95"),
    ("Thymalin - 10mg", "thymalin", "10mg", "£24.95"),
    ("Thymosin Alpha 1 - 5mg", "thymosin-alpha-1", "5mg", "£19.95"),
    ("Thymosin Alpha 1 - 10mg", "thymosin-alpha-1", "10mg", "£34.95"),
    ("VIP - 10mg", "vip", "10mg", "£44.90"),
    ("10ml Bacteriostatic Mixing Water", "bacteriostatic-water", "10ml", "£8.45"),
    ("Glow Blend - 70mg", "glow", "70mg", "£104.90"),
]


def get_slug(text):
    """Convert product name to a URL-friendly slug."""
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

def main():
    # ── Load current data ──
    with open(DATA_DIR / 'compounds.json', 'r') as f:
        compounds = json.load(f)
    with open(DATA_DIR / 'vendors.json', 'r') as f:
        vendors = json.load(f)

    # Build compound lookup by ID
    compound_index = {c['id']: c for c in compounds}

    # ── Check for duplicate vendor IDs ──
    existing_vendor_ids = {v['id'] for v in vendors}
    print(f"Existing vendors ({len(vendors)}):")
    for v in vendors:
        print(f"  - {v['id']} ({v['name']})")
    print()

    # ── Add Raccoon vendor ──
    if RACCOON_VENDOR['id'] not in existing_vendor_ids:
        vendors.append(RACCOON_VENDOR)
        print(f"✅ Added vendor: {RACCOON_VENDOR['name']}")
    else:
        print(f"⚠️  Vendor already exists: {RACCOON_VENDOR['name']}")

    # ── Add Kensington vendor ──
    if KENSINGTON_VENDOR['id'] not in existing_vendor_ids:
        vendors.append(KENSINGTON_VENDOR)
        print(f"✅ Added vendor: {KENSINGTON_VENDOR['name']}")
    else:
        print(f"⚠️  Vendor already exists: {KENSINGTON_VENDOR['name']}")

    print()

    # ── Add Raccoon products as sources ──
    raccoon_added = 0
    raccoon_skipped = 0
    raccoon_nomatch = []

    for prod_name, cid, dosage, price in RACCOON_PRODUCTS:
        if cid in compound_index:
            compound = compound_index[cid]
            sources = compound.setdefault('sources', [])

            # Check if Raccoon already has a variant entry for this
            slug = f"raccoon-peptides-{cid}-{re.sub(r'[^a-z0-9]+', '-', dosage.lower()).strip('-')}"
            url = f"https://www.raccoonpeptides.com/collections/peptides"
            img = f"/images/products/raccoon-peptides/{get_slug(prod_name)}.webp"

            # Simple dedup check
            existing = any(s.get('vendor') == 'Raccoon Peptides' and s.get('dosage') == dosage for s in sources)
            if not existing:
                sources.append({
                    "vendor": "Raccoon Peptides",
                    "url": url,
                    "price": price,
                    "inStock": True,
                    "image": img,
                    "dosage": dosage
                })
                raccoon_added += 1
            else:
                raccoon_skipped += 1
        else:
            raccoon_nomatch.append((prod_name, cid))

    print(f"Raccoon Peptides: {raccoon_added} products added, {raccoon_skipped} skipped (duplicates)")
    if raccoon_nomatch:
        print(f"  No matching compound ID for:")
        for p, c in raccoon_nomatch:
            print(f"    - {p} → {c}")

    # ── Add Kensington products ──
    kens_added = 0
    kens_skipped = 0
    kens_nomatch = []

    for prod_name, cid, dosage, price in KENSINGTON_PRODUCTS:
        if cid in compound_index:
            compound = compound_index[cid]
            sources = compound.setdefault('sources', [])

            url = f"https://www.kensingtonlabs.co.uk/shop/"
            img = f"/images/products/kensington-labs/{get_slug(prod_name)}.webp"

            # Dedup
            existing = any(s.get('vendor') == 'Kensington Labs UK' and s.get('dosage') == dosage for s in sources)
            if not existing:
                sources.append({
                    "vendor": "Kensington Labs UK",
                    "url": url,
                    "price": price,
                    "inStock": True,
                    "image": img,
                    "dosage": dosage
                })
                kens_added += 1
            else:
                kens_skipped += 1
        else:
            kens_nomatch.append((prod_name, cid))

    print(f"Kensington Labs: {kens_added} products added, {kens_skipped} skipped (duplicates)")
    if kens_nomatch:
        print(f"  No matching compound ID for:")
        for p, c in kens_nomatch:
            print(f"    - {p} → {c}")

    print(f"\nTotal vendors: {len(vendors)}")
    print(f"Total compounds: {len(compounds)}")

    # ── Write updated files ──
    with open(DATA_DIR / 'compounds.json', 'w') as f:
        json.dump(compounds, f, indent=2, ensure_ascii=False)
    with open(DATA_DIR / 'vendors.json', 'w') as f:
        json.dump(vendors, f, indent=2, ensure_ascii=False)

    print("\n✅ Files updated successfully!")

if __name__ == '__main__':
    main()
