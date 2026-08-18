#!/usr/bin/env python3
"""Add Peptides Online UK source entries to existing compounds in compounds.json."""
import json, collections

PATH = "/Users/time4you/viralpeps/src/data/compounds.json"
with open(PATH, encoding="utf-8") as f:
    compounds = json.load(f)

VENDOR = "Peptides Online UK"
IMG = "/images/products/peptides-online-uk/{}.webp"
SITE = "https://www.peptidesonline.uk"

# slug -> (product_path, price, dosage)
entries = {
    "acetic-acid-10ml":        ("/shop/acetic-acid-0-6-10ml/", "£5.95", "10ml"),
    "bacteriostatic-water":    ("/shop/bacteriostatic-water-10ml/", "£3.95", None),
    "bpc-157":                 ("/shop/bpc-157/", "£13.95", "5mg"),
    "cjc-1295-ipamorelin-blend": ("/shop/cjc-1295-ipamorelin-blend/", "£39.95", "5mg+5mg"),
    "cjc-1295-no-dac":         ("/shop/cjc-1295-no-dac/", "£12.95", "2mg"),
    "cjc-1295-with-dac":       ("/shop/cjc-1295-with-dac/", "£21.50", "2mg"),
    "dsip":                    ("/shop/dsip/", "£14.95", "5mg"),
    "epitalon":                ("/shop/epitalon/", "£14.95", "10mg"),
    "ghk-cu":                  ("/shop/ghk-cu/", "£24.95", "50mg"),
    "ghrp-2":                  ("/shop/ghrp-2/", "£9.95", "5mg"),
    "ghrp-6":                  ("/shop/ghrp-6/", "£9.95", "5mg"),
    "glow":                    ("/shop/glow-blend/", "£64.95", "70mg"),
    "igf-1-lr3":               ("/shop/igf-1-lr3/", "£39.95", "1mg"),
    "ipamorelin":              ("/shop/ipamorelin/", "£19.95", "5mg"),
    "melanotan-ii":            ("/shop/melanotan-2/", "£24.95", "10mg"),
    "mots-c":                  ("/shop/mots-c-10mg/", "£24.95", "10mg"),
    "nad-plus":                ("/shop/nad-500mg/", "£54.95", "500mg"),
    "pt-141-bremelanotide":    ("/shop/pt-141/", "£19.95", "10mg"),
    "semax":                   ("/shop/semax/", "£18.95", "5mg"),
    "ss-31":                   ("/shop/ss-31-10mg/", "£39.95", "10mg"),
    "tb-500":                  ("/shop/tb-500/", "£15.95", "2mg"),
    "tesamorelin":             ("/shop/tesamorelin/", "£19.95", "2mg"),
}

by_slug = {c["slug"]: c for c in compounds}

added, missing = [], []
for slug, (path, price, dosage) in entries.items():
    comp = by_slug.get(slug)
    if comp is None:
        missing.append(slug)
        continue
    src = {
        "vendor": VENDOR,
        "url": SITE + path,
        "price": price,
        "inStock": True,
        "image": IMG.format(slug),
    }
    if dosage:
        src["dosage"] = dosage
    # avoid duplicates
    if any(s.get("vendor") == VENDOR for s in comp["sources"]):
        continue
    comp["sources"].append(src)
    added.append(slug)

with open(PATH, "w", encoding="utf-8") as f:
    json.dump(compounds, f, ensure_ascii=False, indent=2)
    f.write("\n")

print("Added sources for", len(added), "compounds")
print("Missing (no matching compound):", missing if missing else "none")
for s in added:
    print("  +", s)
