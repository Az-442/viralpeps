#!/usr/bin/env python3
"""Add the Revexa vendor entry + source entries to compounds.json.

Usage:
  python3 scripts/add_revexa.py --vendor   # append vendor to vendors.json only
  python3 scripts/add_revexa.py --sources  # add source entries to compounds.json only
  python3 scripts/add_revexa.py --all      # both
"""
import argparse
import json
import sys

VENDOR_FILE = "src/data/vendors.json"
COMPOUNDS_FILE = "src/data/compounds.json"
VENDOR_NAME = "Revexa"

# (compound master slug or variant slug, url path, price, dosage, local image filename)
SOURCES = [
    # --- Weight loss / metabolic ---
    ("tirzepatide", "tirzepatide-research-grade-10mg", "55.00", "10mg", "tirzepatide-10mg.webp"),
    ("tirzepatide", "tirzepatide-research-grade-20mg", "69.00", "20mg", "tirzepatide-20mg.webp"),
    ("tirzepatide", "tirzepatide-research-grade-30mg", "79.00", "30mg", "tirzepatide-30mg.webp"),
    ("tirzepatide", "tirzepatide-research-grade-40mg", "89.00", "40mg", "tirzepatide-40mg.webp"),
    ("tirzepatide", "pack-of-5-tirzepatide-research-grade-20mg", "275.00", "100mg (5 x 20mg)", "tirzepatide-20mg-5pack.webp"),
    ("tirzepatide", "pack-of-5-tirzepatide-research-grade-40mg", "345.00", "200mg (5 x 40mg)", "tirzepatide-40mg-5pack.webp"),
    ("retatrutide", "copy-of-retatrutide-research-grade", "85.00", "10mg", "retatrutide-10mg.webp"),
    ("retatrutide", "20mg-retatrutide-research-grade", "105.00", "20mg", "retatrutide-20mg.webp"),
    ("retatrutide", "30mg-retatrutide-research-grade", "115.00", "30mg", "retatrutide-30mg.webp"),
    ("retatrutide", "40mg-retatrutide-research-grade", "125.00", "40mg", "retatrutide-40mg.webp"),
    ("retatrutide", "pack-of-5-retatrutide-research-grade-20mg", "399.00", "100mg (5 x 20mg)", "retatrutide-20mg-5pack.webp"),
    ("retatrutide", "pack-of-5-retatrutide-research-grade-40mg", "489.00", "200mg (5 x 40mg)", "retatrutide-40mg-5pack.webp"),
    ("mots-c", "mots-c-10mg", "29.00", "10mg", "mots-c-10mg.webp"),
    ("mots-c", "mots-c-40mg", "74.99", "40mg", "mots-c-40mg.webp"),
    # --- Repair / healing ---
    ("bpc-157", "bpc-157-5mg", "25.00", "5mg", "bpc-157-5mg.webp"),
    ("bpc-157", "bpc-157-10mg", "25.00", "10mg", "bpc-157-10mg.webp"),
    ("tb-500", "tb-500-5mg", "37.00", "5mg", "tb-500-5mg.webp"),
    ("tb-500", "tb-500-10mg", "39.00", "10mg", "tb-500-10mg.webp"),
    ("ghk-cu", "ghk-cu-50mg", "27.00", "50mg", "ghk-cu-50mg.webp"),
    ("ghk-cu", "ghk-cu-100mg", "35.00", "100mg", "ghk-cu-100mg.webp"),
    ("kpv", "kpv-10mg", "21.99", "10mg", "kpv-10mg.webp"),
    ("klow", "klow-blend-peptide-complex-80mg", "74.00", "80mg", "klow-blend-80mg.webp"),
    # --- Growth hormone ---
    ("ipamorelin", "ipamorelin-10mg", "35.00", "10mg", "ipamorelin-10mg.webp"),
    ("tesamorelin", "tesamorelin-research-grade-10mg", "49.00", "10mg", "tesamorelin-10mg.webp"),
    ("igf-1-lr3", "igf-1-lr3-1mg", "42.99", "1mg", "igf-1-lr3-1mg.webp"),
    # --- Longevity / anti-aging ---
    ("nad-plus", "100mg-nad-nicotinamide-adenine-dinucleotide", "19.00", "100mg", "nad-plus-100mg.webp"),
    ("nad-plus", "500mg-nad-nicotinamide-adenine-dinucleotide", "65.00", "500mg", "nad-plus-500mg.webp"),
    ("nad-plus", "1000mg-nad-nicotinamide-adenine-dinucleotide", "99.00", "1000mg", "nad-plus-1000mg.webp"),
    ("epitalon", "epitalon-10mg-telomerase-research-tetrapeptide", "27.00", "10mg", "epitalon-10mg.webp"),
    ("pinealon", "pinealon-10mg-neuroprotective-research-tripeptide", "28.00", "10mg", "pinealon-10mg.webp"),
    ("ss-31", "ss-31-10mg", "47.00", "10mg", "ss-31-10mg.webp"),
    ("5-amino-1mq", "5-amino-1mq-10mg-small-molecule", "25.00", "10mg", "5-amino-1mq-10mg.webp"),
    ("snap-8", "snap-8-10mg", "22.99", "10mg", "snap-8-10mg.webp"),
    ("ahk-cu", "ahk-cu-50mg", "24.99", "50mg", "ahk-cu-50mg.webp"),
    # --- Cognitive ---
    ("semax", "semax-10mg-acth-4-10-analogue", "29.00", "10mg", "semax-10mg.webp"),
    ("selank", "selank-10mg", "29.00", "10mg", "selank-10mg.webp"),
    ("dsip", "dsip-5mg-delta-sleep-inducing-peptide", "20.00", "5mg", "dsip-5mg.webp"),
    ("dsip", "dsip-10mg-delta-sleep-inducing-peptide", "29.00", "10mg", "dsip-10mg.webp"),
    ("adamax", "adamax-10mg", "42.99", "10mg", "adamax-10mg.webp"),
    # --- Melanocortin / libido ---
    ("pt-141-bremelanotide", "pt-141-10mg-melanocortin-receptor-research-peptide", "24.99", "10mg", "pt-141-10mg.webp"),
    ("kisspeptin-10", "kisspeptin-5mg-gnrh-pathway-research-compound", "29.00", "5mg", "kisspeptin-5mg.webp"),
    # --- Tanning ---
    ("melanotan-ii", "melanotan-2-10mg", "22.00", "10mg", "melanotan-2-10mg.webp"),
    # --- Lab supplies ---
    ("bacteriostatic-water", "bacteriostatic-water", "6.99", "10ml", "bacteriostatic-water.webp"),
]


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def save(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def add_vendor():
    vendors = load(VENDOR_FILE)
    if any(v.get("slug") == "revexa" for v in vendors):
        print("Vendor 'revexa' already present — skipping.")
        return 0
    with open("tmp/revexa_vendor.json", encoding="utf-8") as f:
        vendor = json.load(f)
    vendors.append(vendor)
    save(VENDOR_FILE, vendors)
    print(f"Added vendor 'Revexa'. vendors.json now has {len(vendors)} entries.")
    return 0


def add_sources():
    data = load(COMPOUNDS_FILE)
    compounds = data if isinstance(data, list) else data["compounds"]
    by_slug = {c["slug"]: c for c in compounds}

    added = 0
    missing_targets = []
    for master, url_path, price, dosage, img in SOURCES:
        comp = by_slug.get(master)
        if comp is None:
            missing_targets.append(master)
            continue
        url = f"https://www.revexa.co.uk/product-page/{url_path}"
        sources = comp.setdefault("sources", [])
        # idempotent: skip if this vendor+url already recorded
        if any(s.get("vendor") == VENDOR_NAME and s.get("url") == url for s in sources):
            continue
        entry = {
            "vendor": VENDOR_NAME,
            "url": url,
            "price": f"£{price}",
            "inStock": True,
            "image": f"/images/products/revexa/{img}",
            "dosage": dosage,
        }
        sources.append(entry)
        added += 1

    if missing_targets:
        print("MISSING TARGET COMPOUNDS:", sorted(set(missing_targets)))
        return 1

    save(COMPOUNDS_FILE, data)
    print(f"Added {added} Revexa source entries across {len({s[0] for s in SOURCES})} compounds.")
    return 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--vendor", action="store_true")
    ap.add_argument("--sources", action="store_true")
    ap.add_argument("--all", action="store_true")
    a = ap.parse_args()
    rc = 0
    if a.vendor or a.all:
        rc |= add_vendor()
    if a.sources or a.all:
        rc |= add_sources()
    if not (a.vendor or a.sources or a.all):
        ap.print_help()
    return rc


if __name__ == "__main__":
    sys.exit(main())
