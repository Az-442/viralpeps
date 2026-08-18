#!/usr/bin/env python3
"""Verify Peptides Online UK sources were added correctly with image fields."""
import json, os

COMP = "/Users/time4you/viralpeps/src/data/compounds.json"
VEND = "/Users/time4you/viralpeps/src/data/vendors.json"
with open(COMP, encoding="utf-8") as f:
    compounds = json.load(f)
with open(VEND, encoding="utf-8") as f:
    vendors = json.load(f)

VENDOR = "Peptides Online UK"
by_slug = {c["slug"]: c for c in compounds}

# 1. Confirm each source has an image field
entries = [
    "acetic-acid-10ml","bacteriostatic-water","bpc-157","cjc-1295-ipamorelin-blend",
    "cjc-1295-no-dac","cjc-1295-with-dac","dsip","epitalon","ghk-cu","ghrp-2","ghrp-6",
    "glow","igf-1-lr3","ipamorelin","melanotan-ii","mots-c","nad-plus",
    "pt-141-bremelanotide","semax","ss-31","tb-500","tesamorelin",
]
missing_img = []
missing_files = []
for slug in entries:
    comp = by_slug.get(slug)
    if not comp:
        missing_img.append(slug + " (NO COMPOUND)")
        continue
    srcs = [s for s in comp["sources"] if s.get("vendor") == VENDOR]
    for s in srcs:
        img = s.get("image")
        if not img:
            missing_img.append(f"{slug}: no image field")
        else:
            # check file exists on disk
            rel = img.lstrip("/")
            full = os.path.join("/Users/time4you/viralpeps/public", rel)
            if not os.path.exists(full):
                missing_files.append(f"{slug}: file missing {img}")

print("Compound count:", len(compounds))
print("Vendor list count:", len(vendors))
newv = [v for v in vendors if v["slug"] == "peptides-online-uk"]
print("Vendors entry present:", bool(newv))
# count total sources for this vendor
total = sum(1 for c in compounds for s in c.get("sources",[]) if s.get("vendor")==VENDOR)
print("Total Peptides Online UK sources:", total)
print("Missing image fields:", missing_img if missing_img else "NONE")
print("Missing image files on disk:", missing_files if missing_files else "NONE")
