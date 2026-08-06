#!/usr/bin/env python3
"""Add SupplyPeptides sources to compounds.json (idempotent)."""
import json

VENDOR = "SupplyPeptides"

# (compound_slug, product_page_url, price, dosage, in_stock)
SOURCES = [
    ("retatrutide", "https://supplypeptides.co.uk/products/retatrutide", "£50.00", "10mg", True),
    ("tirzepatide", "https://supplypeptides.co.uk/products/tirz-20mg", "£50.00", "10mg", True),
    ("semaglutide", "https://supplypeptides.co.uk/products/sema", "£40.00", "10mg", True),
    ("ghk-cu", "https://supplypeptides.co.uk/products/ghk-cu", "£17.00", "50mg", True),
    ("bpc-157-tb-500", "https://supplypeptides.co.uk/products/bpc-157-tb-500-mix", "£40.00", "10mg", True),
    ("tesamorelin", "https://supplypeptides.co.uk/products/tesamorelin", "£70.00", "5mg", True),
    ("semax", "https://supplypeptides.co.uk/products/semax", "£30.00", "5mg", True),
    ("selank", "https://supplypeptides.co.uk/products/selank", "£24.00", "5mg", True),
    ("klow", "https://supplypeptides.co.uk/products/klow", "£55.00", "80mg", True),
    ("igf-1-lr3", "https://supplypeptides.co.uk/products/igf-lr3", "£75.00", "1mg", True),
    ("mots-c", "https://supplypeptides.co.uk/products/mots-c", "£25.00", "10mg", True),
    ("pt-141-bremelanotide", "https://supplypeptides.co.uk/products/pt-141", "£30.00", "10mg", True),
    ("ss-31", "https://supplypeptides.co.uk/products/ss-31", "£120.00", "10mg", True),
    ("tb-500", "https://supplypeptides.co.uk/products/tb-500", "£25.00", "5mg", True),
    ("nad-plus", "https://supplypeptides.co.uk/products/nad", "£60.00", "500mg", True),
    ("ipamorelin", "https://supplypeptides.co.uk/products/ipamorelin", "£45.00", "5mg", True),
    ("melanotan-ii", "https://supplypeptides.co.uk/products/melanotan-2", "£20.00", "10mg", True),
    ("pinealon", "https://supplypeptides.co.uk/products/pinealon-10", "£27.00", "10mg", True),
    ("glow", "https://supplypeptides.co.uk/products/glow", "£50.00", "70mg", True),
    ("cjc-1295", "https://supplypeptides.co.uk/products/cjc-1295-no-dac", "£40.00", "5mg", True),
    ("cjc-1295-ipamorelin-blend", "https://supplypeptides.co.uk/products/cjc-1295-no-dac-ipamorelin-mix", "£60.00", "10mg", True),
]

with open("src/data/compounds.json") as f:
    compounds = json.load(f)

compound_map = {c["slug"]: c for c in compounds}

added = 0
skipped = 0
missing = []

for slug, url, price, dosage, in_stock in SOURCES:
    if slug not in compound_map:
        missing.append(slug)
        continue
    compound = compound_map[slug]
    # Dedup: skip if vendor+url+dosage already exists
    exists = any(
        s.get("vendor") == VENDOR and s.get("url") == url and (s.get("dosage") or "") == dosage
        for s in compound.get("sources", [])
    )
    if exists:
        skipped += 1
        continue
    source = {
        "vendor": VENDOR,
        "url": url,
        "price": price,
        "inStock": in_stock,
        "dosage": dosage,
        "image": f"/images/products/supply-peptides/{slug}.webp",
    }
    compound.setdefault("sources", []).append(source)
    added += 1

with open("src/data/compounds.json", "w") as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)
    f.write("\n")

print(f"Added: {added}")
print(f"Skipped (already present): {skipped}")
if missing:
    print(f"MISSING compound slugs: {missing}")
print("Done")
