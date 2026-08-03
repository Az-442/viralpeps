#!/usr/bin/env python3
"""Add Trutide vendor to vendors.json and Trutide sources to compounds.json."""
import json, collections

VENDOR_SLUG = "trutide"

# ---- 1. vendors.json ----
with open("src/data/vendors.json", encoding="utf-8") as f:
    vendors = json.load(f)

# Ensure not already present
if any(v.get("slug") == VENDOR_SLUG or v.get("id") == VENDOR_SLUG for v in vendors):
    print("WARN: trutide already in vendors.json")
else:
    trutide = {
        "id": "trutide",
        "name": "Trutide",
        "slug": "trutide",
        "website": "https://trutide.co.uk",
        "rating": 4.5,
        "verified": True,
        "founded": 2025,
        "country": "UK",
        "description": "UK-based research peptide supplier (Trutide Research Ltd, Company No. 17148085) based in Mildenhall, Suffolk. Every batch is third-party HPLC tested to verify identity, composition and purity, with COA available on request. Deliberately curated catalogue of single-compound research peptides and blends, supplied lyophilised in sealed vials. Free Royal Mail Tracked 24 over £25 with same-day dispatch before 2pm.",
        "highlights": [
            "Third-party HPLC tested - COA on request",
            "UK registered company (Trutide Research Ltd)",
            "Curated catalogue - quality over quantity",
            "Free Royal Mail Tracked 24 over £25",
            "Same-day dispatch (order before 2pm)",
            "Extremely competitive pricing"
        ],
        "shipping": [
            "UK free (Royal Mail Tracked 24, over £25)",
            "Same-day dispatch before 2pm Mon-Fri"
        ],
        "payment": [
            "Cards (Visa/Mastercard)",
            "Apple Pay",
            "Google Pay",
            "Pay by Bank"
        ],
        "lastTested": "2026-08-02",
        "labTested": True
    }
    vendors.append(trutide)
    with open("src/data/vendors.json", "w", encoding="utf-8") as f:
        json.dump(vendors, f, ensure_ascii=False, indent=2)
    print("Added trutide to vendors.json")

# ---- 2. compounds.json ----
with open("src/data/compounds.json", encoding="utf-8") as f:
    compounds = json.load(f)

# Trutide sources to add: master compound id -> source object
sources_map = {
    "bpc-157": {
        "vendor": "Trutide",
        "url": "https://trutide.co.uk/product/bpc-157-10mg/",
        "price": "£29.95",
        "inStock": True,
        "image": "/images/products/trutide/bpc-157.webp",
        "dosage": "10mg",
    },
    "ghk-cu": {
        "vendor": "Trutide",
        "url": "https://trutide.co.uk/product/ghk-cu-100mg/",
        "price": "£32.95",
        "inStock": True,
        "image": "/images/products/trutide/ghk-cu.webp",
        "dosage": "100mg",
    },
    "nad-plus": {
        "vendor": "Trutide",
        "url": "https://trutide.co.uk/product/nad-1000mg/",
        "price": "£69.95",
        "inStock": True,
        "image": "/images/products/trutide/nad-plus.webp",
        "dosage": "1000mg",
    },
    "wolverine-stack-bpc157-tb500-blend": {
        "vendor": "Trutide",
        "url": "https://trutide.co.uk/product/wolverine/",
        "price": "£49.95",
        "inStock": True,
        "image": "/images/products/trutide/wolverine.webp",
        "dosage": "20mg",
    },
    "klow": {
        "vendor": "Trutide",
        "url": "https://trutide.co.uk/product/klow-80mg/",
        "price": "£64.95",
        "inStock": True,
        "image": "/images/products/trutide/klow.webp",
        "dosage": "80mg",
    },
    "cjc-1295-ipamorelin-blend": {
        "vendor": "Trutide",
        "url": "https://trutide.co.uk/product/cjc-1295-no-dac-ipamorelin-10mg/",
        "price": "£39.95",
        "inStock": True,
        "image": "/images/products/trutide/cjc-1295-ipamorelin-blend.webp",
        "dosage": "10mg",
    },
}

compound_ids = {c.get("id"): c for c in compounds}
added = 0
for cid, src in sources_map.items():
    c = compound_ids.get(cid)
    if c is None:
        print("MISSING MASTER:", cid)
        continue
    sources = c.get("sources", [])
    # avoid duplicates
    if any(s.get("vendor") == "Trutide" for s in sources):
        print("SKIP (already has Trutide):", cid)
        continue
    sources.append(src)
    added += 1
    print("Added Trutide source to:", cid)

with open("src/data/compounds.json", "w", encoding="utf-8") as f:
    json.dump(compounds, f, ensure_ascii=False, indent=2)
    f.write("\n")

print(f"DONE: added {added} Trutide sources")
