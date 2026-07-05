#!/usr/bin/env python3
"""Add CMSR Labs and Proforma Peptides to the ViralPeps database."""

import json
import copy
from pathlib import Path

DATA_DIR = Path('/Users/time4you/viralpeps/src/data')

# =========================================================
# 1. Read existing data
# =========================================================
vendors = json.loads((DATA_DIR / 'vendors.json').read_text())
compounds = json.loads((DATA_DIR / 'compounds.json').read_text())

def find_vendor_id(slug):
    """Check if vendor exists by id/slug."""
    for v in vendors:
        if v['id'] == slug:
            return True
    return False

def find_compound_by_id(cid):
    """Find compound in compounds array by its 'id' field."""
    for c in compounds:
        if c['id'] == cid:
            return c
    return None

def add_source(compound_id, vendor_name, url, price, in_stock, image, dosage=None):
    """Add a source entry to a compound's sources array."""
    c = find_compound_by_id(compound_id)
    if c is None:
        print(f"  ⚠ Compound '{compound_id}' not found, skipping")
        return False
    
    if 'sources' not in c:
        c['sources'] = []
    
    source = {
        "vendor": vendor_name,
        "url": url,
        "price": price,
        "inStock": in_stock,
        "image": image
    }
    if dosage:
        source["dosage"] = dosage
    
    c['sources'].append(source)
    print(f"  ✓ Added {vendor_name} | {compound_id} | {price} | {dosage or 'N/A'}")
    return True

# =========================================================
# 2. Add CMSR Labs to vendors.json
# =========================================================
CMSR_SLUG = "cmsr-labs"
CMSR_NAME = "CMSR Labs"

print("=" * 60)
print("STEP 1: Adding vendors to vendors.json")
print("=" * 60)

if not find_vendor_id(CMSR_SLUG):
    cmsr_vendor = {
        "id": CMSR_SLUG,
        "name": CMSR_NAME,
        "slug": CMSR_SLUG,
        "website": "https://cmsrlabs.co",
        "rating": 4.0,
        "verified": False,
        "founded": 2025,
        "country": "UK",
        "description": "UK-based research peptide supplier offering premium-grade compounds with Janoshik third-party lab testing. Free next-day UK delivery, products independently verified with batch-specific COAs. Known for competitive pricing on GLP-1 agonists and research peptides.",
        "highlights": [
            "Janoshik lab tested",
            "Free next-day UK delivery",
            "Competitive pricing",
            "Money-back guarantee"
        ],
        "shipping": [
            "UK free next-day (order before 1:30pm Mon-Fri)"
        ],
        "payment": [
            "Cards",
            "Apple Pay",
            "Google Pay",
            "Bank transfer (Boodil)"
        ],
        "lastTested": "2026-07-01",
        "labTested": True
    }
    vendors.append(cmsr_vendor)
    print(f"  ✓ Added vendor: {CMSR_NAME}")
else:
    print(f"  - Vendor '{CMSR_SLUG}' already exists, skipping")

# =========================================================
# 3. CMSR Labs — Product sources
# =========================================================
print()
print("=" * 60)
print("STEP 2: Adding CMSR Labs product sources")
print("=" * 60)

cmsr_products = [
    # (compound_id, product_name, url, price, stock, image_slug, dosage)
    ("retatrutide", "Retatrutide 10mg", "https://cmsrlabs.co/shop/", "£74.95", True, "retatrutide", "10mg"),
    ("retatrutide", "Retatrutide 15mg", "https://cmsrlabs.co/shop/", "£99.95", True, "retatrutide", "15mg"),
    ("retatrutide", "Retatrutide 20mg", "https://cmsrlabs.co/shop/", "£124.95", True, "retatrutide", "20mg"),
    ("retatrutide", "Retatrutide 5mg", "https://cmsrlabs.co/shop/", "£49.95", True, "retatrutide", "5mg"),
    ("semaglutide", "Semaglutide 5mg", "https://cmsrlabs.co/shop/", "£44.95", True, "semaglutide", "5mg"),
    ("semaglutide", "Semaglutide 10mg", "https://cmsrlabs.co/shop/", "£76.95", True, "semaglutide", "10mg"),
    ("semaglutide", "Semaglutide 15mg", "https://cmsrlabs.co/shop/", "£84.95", True, "semaglutide", "15mg"),
    ("semaglutide", "Semaglutide 20mg", "https://cmsrlabs.co/shop/", "£99.95", True, "semaglutide", "20mg"),
    ("tirzepatide", "Tirzepatide 5mg", "https://cmsrlabs.co/shop/", "£39.95", True, "tirzepatide", "5mg"),
    ("tirzepatide", "Tirzepatide 10mg", "https://cmsrlabs.co/shop/", "£49.95", True, "tirzepatide", "10mg"),
    ("tirzepatide", "Tirzepatide 15mg", "https://cmsrlabs.co/shop/", "£59.95", True, "tirzepatide", "15mg"),
    ("tirzepatide", "Tirzepatide 20mg", "https://cmsrlabs.co/shop/", "£79.95", True, "tirzepatide", "20mg"),
    ("tirzepatide", "Tirzepatide 30mg", "https://cmsrlabs.co/shop/", "£99.95", True, "tirzepatide", "30mg"),
    ("tirzepatide", "Tirzepatide 40mg", "https://cmsrlabs.co/shop/", "£124.95", True, "tirzepatide", "40mg"),
    ("tirzepatide", "Tirzepatide 50mg", "https://cmsrlabs.co/shop/", "£149.95", True, "tirzepatide", "50mg"),
    ("tirzepatide", "Tirzepatide 60mg", "https://cmsrlabs.co/shop/", "£179.95", True, "tirzepatide", "60mg"),
    # Cagrilintide skipped - no master compound ID exists (only vendor-specific entries like sterling-cagrilintide-10mg)
    ("pt-141", "PT-141 10mg", "https://cmsrlabs.co/shop/", "£39.90", True, "pt-141", "10mg"),
    ("mt2", "Melanotan II 10mg", "https://cmsrlabs.co/shop/", "£29.95", True, "melanotan-ii", "10mg"),
    ("semax", "Semax 5mg", "https://cmsrlabs.co/shop/", "£29.95", True, "semax", "5mg"),
    ("selank", "Selank 5mg", "https://cmsrlabs.co/shop/", "£34.95", True, "selank", "5mg"),
    ("tesamorelin", "Tesamorelin 5mg", "https://cmsrlabs.co/shop/", "£79.90", True, "tesamorelin", "5mg"),
    ("tesamorelin", "Tesamorelin 10mg", "https://cmsrlabs.co/shop/", "£124.90", True, "tesamorelin", "10mg"),
    ("ara-290", "ARA-290 10mg", "https://cmsrlabs.co/shop/", "£69.90", True, "ara-290", "10mg"),
    ("hcg", "HCG 5000IU", "https://cmsrlabs.co/shop/", "£44.95", True, "hcg", "5000IU"),
    ("hcg", "HCG 10000IU", "https://cmsrlabs.co/shop/", "£44.95", True, "hcg", "10000IU"),
]

for prod in cmsr_products:
    compound_id, name, url, price, stock, img_slug, dosage = prod
    add_source(
        compound_id=compound_id,
        vendor_name=CMSR_NAME,
        url=url,
        price=price,
        in_stock=stock,
        image=f"/images/products/{CMSR_SLUG}/{img_slug}.webp",
        dosage=dosage
    )

# =========================================================
# 4. Add Proforma Peptides to vendors.json
# =========================================================
PROFORMA_SLUG = "proforma-peptides"
PROFORMA_NAME = "Proforma Peptides"

print()
print("=" * 60)
print("STEP 3: Adding Proforma Peptides vendor")
print("=" * 60)

if not find_vendor_id(PROFORMA_SLUG):
    proforma_vendor = {
        "id": PROFORMA_SLUG,
        "name": PROFORMA_NAME,
        "slug": PROFORMA_SLUG,
        "website": "https://www.proformapeptides.co.uk",
        "rating": 4.8,
        "verified": True,
        "founded": 2024,
        "country": "UK",
        "description": "London-based UK research peptide supplier with 62 products and a 5★ Trustpilot rating across 250+ reviews. All products cGMP-manufactured and HPLC-tested with purity exceeding 99%. Registered UK company (No. 16557437) with fast Royal Mail Tracked 24 delivery.",
        "highlights": [
            "5★ Trustpilot — 250+ reviews",
            "HPLC tested — 99%+ purity",
            "cGMP-compliant manufacturing",
            "Royal Mail Tracked 24 delivery",
            "62 products in catalog",
            "Registered UK company"
        ],
        "shipping": [
            "UK Royal Mail Tracked 24 (dispatch 1-2 business days)"
        ],
        "payment": [
            "Cards",
            "Bank transfer",
            "Shopify Payments"
        ],
        "lastTested": "2026-06-30",
        "labTested": True
    }
    vendors.append(proforma_vendor)
    print(f"  ✓ Added vendor: {PROFORMA_NAME}")
else:
    print(f"  - Vendor '{PROFORMA_SLUG}' already exists, skipping")

# =========================================================
# 5. Proforma Peptides — Product sources
# =========================================================
print()
print("=" * 60)
print("STEP 4: Adding Proforma Peptides product sources")
print("=" * 60)

proforma_products = [
    # (compound_id, product_name, url, price, stock, image_slug, dosage)
    ("bpc-157", "BPC-157 5mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£15.99", True, "bpc-157", "5mg"),
    ("bpc-157", "BPC-157 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£29.99", True, "bpc-157", "10mg"),
    ("bpc-157", "BPC-157 500mcg", "https://www.proformapeptides.co.uk/collections/all-products/", "£44.99", True, "bpc-157", "500mcg"),
    ("tb-500", "TB500 5mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£24.99", True, "tb-500", "5mg"),
    ("tb-500", "TB500 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£34.99", True, "tb-500", "10mg"),
    ("ss-31", "SS31 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£29.99", True, "ss-31", "10mg"),
    ("ss-31", "SS31 50mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£59.99", True, "ss-31", "50mg"),
    ("semax", "Semax 5mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£19.99", True, "semax", "5mg"),
    ("semax", "Semax 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£29.99", True, "semax", "10mg"),
    ("ara-290", "ARA-290 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£24.99", True, "ara-290", "10mg"),
    ("mots-c", "MOTS-c 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£24.99", True, "mots-c", "10mg"),
    ("mots-c", "MOTS-c 40mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£59.99", True, "mots-c", "40mg"),
    ("ghrp-2", "GHRP-2 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£9.99", True, "ghrp-2", "10mg"),
    ("selank", "Selank 5mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£15.99", True, "selank", "5mg"),
    ("selank", "Selank 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£24.99", True, "selank", "10mg"),
    ("ghk-cu", "GHK-CU 50mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£24.99", True, "ghk-cu", "50mg"),
    ("ghk-cu", "GHK-CU 100mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£44.99", True, "ghk-cu", "100mg"),
    ("thymosin-alpha-1", "Thymosin Alpha-1 5mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£29.99", True, "thymosin-alpha-1", "5mg"),
    ("kisspeptin-10", "Kisspeptin-10 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£24.99", True, "kisspeptin-10", "10mg"),
    ("cjc-1295", "CJC-1295 with DAC 5mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£24.99", True, "cjc-1295", "5mg"),
    ("cjc-1295", "CJC-1295 without DAC 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£34.99", True, "cjc-1295", "10mg"),
    ("epitalon", "Epitalon 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£14.99", True, "epitalon", "10mg"),
    ("vip", "VIP 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£29.99", True, "vip", "10mg"),
    ("nad-plus", "NAD+ 500mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£29.99", True, "nad-plus", "500mg"),
    ("mt2", "MT2 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£19.99", True, "melanotan-ii", "10mg"),
    ("tesamorelin", "Tesamorelin 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£59.99", True, "tesamorelin", "10mg"),
    ("pt-141", "PT-141 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£19.99", True, "pt-141", "10mg"),
    ("ll-37", "LL37 5mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£24.99", True, "ll-37", "5mg"),
    ("kpv", "KPV 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£29.99", True, "kpv", "10mg"),
    ("ipamorelin", "Ipamorelin 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£39.99", True, "ipamorelin", "10mg"),
    ("igf-1-lr3", "IGF-1 LR3 (10x100mcg)", "https://www.proformapeptides.co.uk/collections/all-products/", "£149.99", True, "igf-1-lr3", "100mcg"),
    ("igf-1-des", "IGF-1 Des 1mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£34.99", False, "igf-1-des", "1mg"),
    ("dsip", "DSIP 5mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£19.99", True, "dsip", "5mg"),
    ("aod9604", "AOD9604 5mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£24.99", True, "aod9604", "5mg"),
    ("5-amino-1mq", "5-Amino-1MQ 5mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£19.99", True, "5-amino-1mq", "5mg"),
    ("5-amino-1mq", "5-Amino-1MQ 10mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£29.99", True, "5-amino-1mq", "10mg"),
    ("5-amino-1mq", "5-Amino-1MQ 50mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£79.99", True, "5-amino-1mq", "50mg"),
    ("l-carnitine", "L-Carnitine 50ml", "https://www.proformapeptides.co.uk/collections/all-products/", "£45.99", True, "l-carnitine", "50ml"),
    ("ghk-cu", "GHKCU 1250mcg", "https://www.proformapeptides.co.uk/collections/all-products/", "£39.99", True, "ghk-cu", "1250mcg"),
    ("slu-pp-332", "SLU-PP 332 50mg", "https://www.proformapeptides.co.uk/collections/all-products/", "£84.99", True, "slu-pp-332", "50mg"),
]

for prod in proforma_products:
    compound_id, name, url, price, stock, img_slug, dosage = prod
    add_source(
        compound_id=compound_id,
        vendor_name=PROFORMA_NAME,
        url=url,
        price=price,
        in_stock=stock,
        image=f"/images/products/{PROFORMA_SLUG}/{img_slug}.webp",
        dosage=dosage
    )

# =========================================================
# 6. Write back
# =========================================================
print()
print("=" * 60)
print("STEP 5: Writing updated data files")
print("=" * 60)

(DATA_DIR / 'vendors.json').write_text(json.dumps(vendors, indent=2, ensure_ascii=False) + '\n')
print(f"  ✓ vendors.json written ({len(vendors)} vendors)")

(DATA_DIR / 'compounds.json').write_text(json.dumps(compounds, indent=2, ensure_ascii=False) + '\n')
print(f"  ✓ compounds.json written ({len(compounds)} compounds)")

# =========================================================
# 7. Verification
# =========================================================
print()
print("=" * 60)
print("STEP 6: Verification")
print("=" * 60)

# Count CMSR sources
cmsr_count = 0
for c in compounds:
    for s in c.get('sources', []):
        if CMSR_NAME in s.get('vendor', ''):
            cmsr_count += 1

proforma_count = 0
for c in compounds:
    for s in c.get('sources', []):
        if PROFORMA_NAME in s.get('vendor', ''):
            proforma_count += 1

print(f"  CMSR Labs sources added: {cmsr_count}")
print(f"  Proforma Peptides sources added: {proforma_count}")

# List compounds with new sources
print()
print("CMSR Labs — compound coverage:")
for c in compounds:
    for s in c.get('sources', []):
        if CMSR_NAME in s.get('vendor', ''):
            print(f"  - {c['name']} ({c['id']}): {s['price']} ({s.get('dosage','N/A')})")

print()
print("Proforma Peptides — compound coverage:")
for c in compounds:
    for s in c.get('sources', []):
        if PROFORMA_NAME in s.get('vendor', ''):
            print(f"  - {c['name']} ({c['id']}): {s['price']} ({s.get('dosage','N/A')})")

print()
print("DONE")
