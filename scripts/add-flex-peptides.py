#!/usr/bin/env python3
"""Add Flex Peptides as a new vendor and their products to the ViralPeps directory."""
import json
import os
import subprocess
import sys

VENDOR_SLUG = "flex-peptides"

# ── 1. Define vendor entry ──────────────────────────────────────────────
vendor = {
    "id": "flex-peptides",
    "name": "Flex Peptides",
    "slug": "flex-peptides",
    "website": "https://www.flexpeptides.co.uk",
    "rating": 4.8,
    "verified": True,
    "founded": 2024,
    "country": "UK",
    "description": "UK-based supplier of premium research peptides. 98%+ purity verified by third-party certificates of analysis. BPC-157, TB-500, Tirzepatide and more. Fast UK shipping.",
    "highlights": [
        "Third-party batch tested",
        "98%+ HPLC purity",
        "UK-based stock",
        "COA on every product",
        "Fast UK shipping"
    ],
    "shipping": [
        "UK (fast tracked shipping, free on qualifying orders)"
    ],
    "payment": [
        "Cards (Worldpay)"
    ],
    "lastTested": "",
    "labTested": True
}

# Products that match existing compound names in our DB
products = [
    {
        "name": "BPC-157",
        "slug": "bpc-157",
        "dosage": "5mg",
        "price": "£15.95",
        "url": "https://www.flexpeptides.co.uk/products/bpc-157-5mg",
        "image_url": "https://www.flexpeptides.co.uk/products/bpc-157-5mg.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/bpc-157.webp"
    },
    {
        "name": "TB-500",
        "slug": "tb-500",
        "dosage": "10mg",
        "price": "£19.95",
        "url": "https://www.flexpeptides.co.uk/products/tb-500-10mg",
        "image_url": "https://www.flexpeptides.co.uk/products/tb500-5mg.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/tb-500.webp"
    },
    {
        "name": "TB-500",
        "slug": "tb-500",
        "dosage": "5mg",
        "price": "£19.95",
        "url": "https://www.flexpeptides.co.uk/products/tb-500-5mg",
        "image_url": "https://www.flexpeptides.co.uk/products/tb-500-5mg.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/tb-500-5mg.webp"
    },
    {
        "name": "Tirzepatide",
        "slug": "tirzepatide",
        "dosage": "20mg",
        "price": "£65.00",
        "url": "https://www.flexpeptides.co.uk/products/tirzepatide-20mg",
        "image_url": "https://www.flexpeptides.co.uk/products/tirzepatide-20mg-.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/tirzepatide.webp"
    },
    {
        "name": "GHK-Cu",
        "slug": "ghk-cu",
        "dosage": "100mg",
        "price": "£39.95",
        "url": "https://www.flexpeptides.co.uk/products/ghk-cu-100",
        "image_url": "https://www.flexpeptides.co.uk/products/ghk-cu-100.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/ghk-cu.webp"
    },
    {
        "name": "Tesamorelin",
        "slug": "tesamorelin",
        "dosage": "20mg",
        "price": "£59.95",
        "url": "https://www.flexpeptides.co.uk/products/tesamorelin-20mg",
        "image_url": "https://www.flexpeptides.co.uk/products/tesamorelin-20mg.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/tesamorelin.webp"
    },
    {
        "name": "Ipamorelin",
        "slug": "ipamorelin",
        "dosage": "10mg",
        "price": "£14.95",
        "url": "https://www.flexpeptides.co.uk/products/ipamorelin-10mg",
        "image_url": "https://www.flexpeptides.co.uk/products/ipamorelin-10mg.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/ipamorelin.webp"
    },
    {
        "name": "AOD9604",
        "slug": "aod9604",
        "dosage": "10mg",
        "price": "£49.95",
        "url": "https://www.flexpeptides.co.uk/products/aod-10mg",
        "image_url": "https://www.flexpeptides.co.uk/products/aod-10mg.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/aod9604.webp"
    },
    {
        "name": "Glutathione",
        "slug": "glutathione",
        "dosage": "1500mg",
        "price": "£29.95",
        "url": "https://www.flexpeptides.co.uk/products/glu-1500mg",
        "image_url": "https://www.flexpeptides.co.uk/products/glu-1500mg.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/glutathione.webp"
    },
    {
        "name": "MOTS-c",
        "slug": "mots-c",
        "dosage": "20mg",
        "price": "£36.95",
        "url": "https://www.flexpeptides.co.uk/products/mots-c-20mg",
        "image_url": "https://www.flexpeptides.co.uk/products/motsc-20mg.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/mots-c.webp"
    },
    {
        "name": "NAD+",
        "slug": "nad",
        "dosage": "1000mg",
        "price": "£49.95",
        "url": "https://www.flexpeptides.co.uk/products/nad-1000mg",
        "image_url": "https://www.flexpeptides.co.uk/products/nad-1000mg.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/nad.webp"
    },
    {
        "name": "SS-31 (Elamipretide)",
        "slug": "ss-31",
        "dosage": "10mg",
        "price": "£49.95",
        "url": "https://www.flexpeptides.co.uk/products/ss-31-10mg",
        "image_url": "https://www.flexpeptides.co.uk/products/ss-31-10mg.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/ss-31.webp"
    },
    {
        "name": "Selank",
        "slug": "selank",
        "dosage": "5mg",
        "price": "£29.95",
        "url": "https://www.flexpeptides.co.uk/products/selank",
        "image_url": "https://www.flexpeptides.co.uk/products/selank.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/selank.webp"
    },
    {
        "name": "BPC-157 + TB-500 Blend",
        "slug": "bpc-157-tb-500-blend",
        "dosage": "10mg",
        "price": "£34.95",
        "url": "https://www.flexpeptides.co.uk/products/bpc-500-tb-500-wolv-10mg",
        "image_url": "https://www.flexpeptides.co.uk/products/bpc-500-tb-500-wolv-10mg-.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/bpc-157-tb-500-blend.webp"
    },
    {
        "name": "Retatrutide",
        "slug": "retatrutide",
        "dosage": "20mg",
        "price": "£49.81",
        "url": "https://www.flexpeptides.co.uk/products/retatrutide-20mg",
        "image_url": "https://www.flexpeptides.co.uk/products/retatrutide-20mg.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/retatrutide.webp"
    },
    {
        "name": "Retatrutide",
        "slug": "retatrutide",
        "dosage": "30mg",
        "price": "£66.95",
        "url": "https://www.flexpeptides.co.uk/products/retatrutide-30mg",
        "image_url": "https://www.flexpeptides.co.uk/products/retatrutide-30mg.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/retatrutide-30mg.webp"
    },
    {
        "name": "Kisspeptin",
        "slug": "kisspeptin",
        "dosage": "5mg",
        "price": "£23.95",
        "url": "https://www.flexpeptides.co.uk/products/kisspep-10mg",
        "image_url": "https://www.flexpeptides.co.uk/products/kisspep-10mg.jpg",
        "image_local": f"/images/products/{VENDOR_SLUG}/kisspeptin.webp"
    }
]

BASE_DIR = "/Users/time4you/viralpeps"

# ── 2. Download product images ──────────────────────────────────────────
img_dir = os.path.join(BASE_DIR, "public", "images", "products", VENDOR_SLUG)
os.makedirs(img_dir, exist_ok=True)
print(f"Created directory: {img_dir}")

for p in products:
    local_filename = os.path.basename(p["image_local"])
    local_path = os.path.join(img_dir, local_filename)
    if not os.path.exists(local_path):
        result = subprocess.run(
            ["curl", "-sL", "-o", local_path, p["image_url"]],
            capture_output=True, text=True
        )
        size = os.path.getsize(local_path) if os.path.exists(local_path) else 0
        print(f"  Downloaded {p['name']} {p.get('dosage','')}: {size} bytes")
    else:
        size = os.path.getsize(local_path)
        print(f"  Already exists {p['name']} {p.get('dosage','')}: {size} bytes")

# ── 3. Download vendor logo (OG image) ──────────────────────────────────
logo_dir = os.path.join(BASE_DIR, "public", "images", "vendors")
os.makedirs(logo_dir, exist_ok=True)
logo_path = os.path.join(logo_dir, f"{VENDOR_SLUG}.png")
if not os.path.exists(logo_path):
    logo_url = "https://www.flexpeptides.co.uk/og-image.png"
    subprocess.run(["curl", "-sL", "-o", logo_path, logo_url], capture_output=True)
    size = os.path.getsize(logo_path) if os.path.exists(logo_path) else 0
    print(f"Downloaded logo: {size} bytes")
else:
    print("Logo already exists")

# ── 4. Add vendor to vendors.json ──────────────────────────────────────
vendors_path = os.path.join(BASE_DIR, "src", "data", "vendors.json")
with open(vendors_path) as f:
    vendors = json.load(f)

# Check if already exists
existing_ids = [v["id"] for v in vendors]
if VENDOR_SLUG not in existing_ids:
    vendors.append(vendor)
    with open(vendors_path, "w") as f:
        json.dump(vendors, f, indent=2)
    print(f"Added vendor '{vendor['name']}' to vendors.json")
else:
    print(f"Vendor '{VENDOR_SLUG}' already exists in vendors.json")

# ── 5. Map compounds to add sources ────────────────────────────────────
# Build lookup: compound name (lowercase) -> list of sources to add
compound_sources_map = {
    "bpc-157": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/bpc-157-5mg", "price": "£15.95", "inStock": True, "image": "/images/products/flex-peptides/bpc-157.webp", "dosage": "5mg"}
    ],
    "tb-500": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/tb-500-5mg", "price": "£19.95", "inStock": True, "image": "/images/products/flex-peptides/tb-500-5mg.webp", "dosage": "5mg"},
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/tb-500-10mg", "price": "£19.95", "inStock": True, "image": "/images/products/flex-peptides/tb-500.webp", "dosage": "10mg"}
    ],
    "tirzepatide": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/tirzepatide-20mg", "price": "£65.00", "inStock": True, "image": "/images/products/flex-peptides/tirzepatide.webp", "dosage": "20mg"}
    ],
    "ghk-cu": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/ghk-cu-100", "price": "£39.95", "inStock": True, "image": "/images/products/flex-peptides/ghk-cu.webp", "dosage": "100mg"}
    ],
    "tesamorelin": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/tesamorelin-20mg", "price": "£59.95", "inStock": True, "image": "/images/products/flex-peptides/tesamorelin.webp", "dosage": "20mg"}
    ],
    "ipamorelin": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/ipamorelin-10mg", "price": "£14.95", "inStock": True, "image": "/images/products/flex-peptides/ipamorelin.webp", "dosage": "10mg"}
    ],
    "aod9604": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/aod-10mg", "price": "£49.95", "inStock": True, "image": "/images/products/flex-peptides/aod9604.webp", "dosage": "10mg"}
    ],
    "glutathione": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/glu-1500mg", "price": "£29.95", "inStock": True, "image": "/images/products/flex-peptides/glutathione.webp", "dosage": "1500mg"}
    ],
    "mots-c": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/mots-c-20mg", "price": "£36.95", "inStock": True, "image": "/images/products/flex-peptides/mots-c.webp", "dosage": "20mg"}
    ],
    "nad+": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/nad-1000mg", "price": "£49.95", "inStock": True, "image": "/images/products/flex-peptides/nad.webp", "dosage": "1000mg"}
    ],
    "ss-31": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/ss-31-10mg", "price": "£49.95", "inStock": True, "image": "/images/products/flex-peptides/ss-31.webp", "dosage": "10mg"}
    ],
    "selank": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/selank", "price": "£29.95", "inStock": True, "image": "/images/products/flex-peptides/selank.webp", "dosage": "5mg"}
    ],
    "kisspeptin": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/kisspep-10mg", "price": "£23.95", "inStock": True, "image": "/images/products/flex-peptides/kisspeptin.webp", "dosage": "5mg"}
    ],
    "retatrutide": [
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/retatrutide-20mg", "price": "£49.81", "inStock": True, "image": "/images/products/flex-peptides/retatrutide.webp", "dosage": "20mg"},
        {"vendor": "Flex Peptides", "url": "https://www.flexpeptides.co.uk/products/retatrutide-30mg", "price": "£66.95", "inStock": True, "image": "/images/products/flex-peptides/retatrutide-30mg.webp", "dosage": "30mg"}
    ],
}

compounds_path = os.path.join(BASE_DIR, "src", "data", "compounds.json")
with open(compounds_path) as f:
    compounds = json.load(f)

added_count = 0
for compound in compounds:
    cid = compound["id"]
    if cid in compound_sources_map:
        sources_to_add = compound_sources_map[cid]
        # Check if Flex Peptides source already exists
        existing_vendors = [s["vendor"] for s in compound.get("sources", [])]
        if "Flex Peptides" not in existing_vendors:
            compound.setdefault("sources", []).extend(sources_to_add)
            added_count += len(sources_to_add)
            print(f"  Added {len(sources_to_add)} source(s) for '{cid}'")
        else:
            print(f"  Flex Peptides already in sources for '{cid}'")

print(f"\nTotal sources added: {added_count}")

with open(compounds_path, "w") as f:
    json.dump(compounds, f, indent=2)

print("Updated compounds.json")

# ── 6. Summary ─────────────────────────────────────────────────────────
print("\n── DONE ──")
print(f"Vendor: {vendor['name']}")
print(f"Logo: images/vendors/{VENDOR_SLUG}.png")
print(f"Products added: {added_count}")
print(f"Product images in: public/images/products/{VENDOR_SLUG}/")
