#!/usr/bin/env python3
"""Add Applied Peptides vendor sources to compounds.json."""
import json

VENDOR = "Applied Peptides"

with open("src/data/compounds.json", encoding="utf-8") as f:
    compounds = json.load(f)

sources_map = {
    "retatrutide": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/premium-retatrutide-30mg-pen-",
            "price": "£175.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/retatrutide-pen-30mg.webp",
            "note": "Premium pen 30mg",
        },
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/retatrutide-30mg-",
            "price": "£135.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/retatrutide-30mg.webp",
            "dosage": "30mg",
        },
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/retatrutide-20mg",
            "price": "£105.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/retatrutide-20mg.webp",
            "dosage": "20mg",
        },
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/retatrutide-10mg",
            "price": "£55.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/retatrutide-10mg.webp",
            "dosage": "10mg",
        },
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/retatrutide-bundle-10mg",
            "price": "£65.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/retatrutide-bundle-10mg.webp",
            "note": "Bundle 10mg",
        },
    ],
    "tirzepatide": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/tirzepatide-30mg-",
            "price": "£110.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/tirzepatide-30mg.webp",
            "dosage": "30mg",
        },
    ],
    "tesamorelin": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/tesamorelin-10mg",
            "price": "£45.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/tesamorelin-10mg.webp",
            "dosage": "10mg",
        },
    ],
    "kpv": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/kpv-30mg",
            "price": "£45.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/kpv-30mg.webp",
            "dosage": "30mg",
        },
    ],
    "cagrilintide": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/cagrilintide-5mg",
            "price": "£40.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/cagrilintide-5mg.webp",
            "dosage": "5mg",
        },
    ],
    "nad-plus": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/nad-500mg",
            "price": "£40.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/nad-500mg.webp",
            "dosage": "500mg",
        },
    ],
    "mots-c": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/mots-c-20mg",
            "price": "£35.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/mots-c-20mg.webp",
            "dosage": "20mg",
        },
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/mots-c-10mg",
            "price": "£20.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/mots-c-10mg.webp",
            "dosage": "10mg",
        },
    ],
    "ghk-cu": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/ghkcu-100mg",
            "price": "£35.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/ghk-cu-100mg.webp",
            "dosage": "100mg",
        },
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/ghkcu-50mg",
            "price": "£20.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/ghk-cu-50mg.webp",
            "dosage": "50mg",
        },
    ],
    "cjc-1295-with-dac": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/cjc-1295-with-dac-5mg",
            "price": "£32.50",
            "inStock": True,
            "image": "/images/products/applied-peptides/cjc-1295-with-dac-5mg.webp",
            "dosage": "5mg",
        },
    ],
    "tb-500": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/-tb-500-10mg",
            "price": "£30.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/tb-500-10mg.webp",
            "dosage": "10mg",
        },
    ],
    "bacteriostatic-water": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/pfizer-hospira-bacteriostatic-water-usp-30ml",
            "price": "£21.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/bacteriostatic-water-30ml.webp",
            "note": "USP 30ml",
        },
    ],
    "bpc-157": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/bpc157-10mg",
            "price": "£17.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/bpc-157-10mg.webp",
            "dosage": "10mg",
        },
    ],
    "melanotan-ii": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/mt-2-10mg-melanotan-2-",
            "price": "£15.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/mt2-10mg.webp",
            "dosage": "10mg",
            "note": "MT-2 (Melanotan 2)",
        },
    ],
    "semax": [
        {
            "vendor": VENDOR,
            "url": "https://appliedpeptides.com/store/ols/products/semax-and-selank-10mg-bundle",
            "price": "£35.00",
            "inStock": True,
            "image": "/images/products/applied-peptides/semax-selank-10mg.webp",
            "note": "Semax + Selank 10mg bundle",
        },
    ],
}

compound_ids = {c.get("id"): c for c in compounds}
added = 0
missing = []
for cid, sources in sources_map.items():
    c = compound_ids.get(cid)
    if c is None:
        missing.append(cid)
        print("MISSING MASTER:", cid)
        continue
    existing = c.get("sources", [])
    # avoid duplicates (skip if Applied Peptides already present for this compound)
    if any(s.get("vendor") == VENDOR for s in existing):
        print("SKIP (already has Applied Peptides):", cid)
        continue
    existing.extend(sources)
    added += len(sources)
    print("Added %d Applied source(s) to: %s" % (len(sources), cid))

with open("src/data/compounds.json", "w", encoding="utf-8") as f:
    json.dump(compounds, f, ensure_ascii=False, indent=2)
    f.write("\n")

print("MISSING TARGETS:", missing or "none")
print("DONE: added %d Applied Peptides sources" % added)
