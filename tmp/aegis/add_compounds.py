#!/usr/bin/env python3
import json, os

VENDOR = "Aegis Peptides"
COMP = "/Users/time4you/viralpeps/src/data/compounds.json"
IMG = "/images/products/aegis-peptides"

data = json.load(open(COMP))
by = {it["slug"]: it for it in data}

IM = IMG + "/"
# additions: slug -> list of (dosage_or_None, price, url, imagefile, inslock)
adds = {
 "bacteriostatic-water": [
   (None, "\u00a35.00", "https://aegispeptidesuk.co.uk/product/bacteriostatic-water/", "bacteriostatic-water"),
 ],
 "bpc-157": [
   ("5mg", "\u00a314.99", "https://aegispeptidesuk.co.uk/product/bpc-157/", "bpc-157"),
   ("10mg", "\u00a324.99", "https://aegispeptidesuk.co.uk/product/bpc-157/", "bpc-157"),
 ],
 "tb-500": [
   ("5mg", "\u00a324.99", "https://aegispeptidesuk.co.uk/product/tb-500/", "tb-500"),
   ("10mg", "\u00a344.99", "https://aegispeptidesuk.co.uk/product/tb-500/", "tb-500"),
 ],
 "ghk-cu": [
   ("100mg", "\u00a329.99", "https://aegispeptidesuk.co.uk/product/ghk-cu/", "ghk-cu"),
 ],
 "glow": [
   ("70mg", "\u00a359.99", "https://aegispeptidesuk.co.uk/product/glow/", "glow"),
 ],
 "klow": [
   ("80mg", "\u00a379.99", "https://aegispeptidesuk.co.uk/product/klow/", "klow"),
   ("80mg pen", "\u00a3109.99", "https://aegispeptidesuk.co.uk/product/klow-80mg-pen/", "klow-pen"),
 ],
 "mots-c": [
   ("10mg", "\u00a324.99", "https://aegispeptidesuk.co.uk/product/mots-c/", "mots-c"),
   ("40mg", "\u00a369.99", "https://aegispeptidesuk.co.uk/product/mots-c/", "mots-c"),
 ],
 "mt2": [
   ("10mg", "\u00a324.99", "https://aegispeptidesuk.co.uk/product/mt-2/", "mt-2"),
 ],
 "nad-plus": [
   ("500mg", "\u00a354.99", "https://aegispeptidesuk.co.uk/product/nad/", "nad"),
 ],
 "retatrutide": [
   ("10mg", "\u00a359.99", "https://aegispeptidesuk.co.uk/product/retatrutide-10mg/", "retatrutide-10mg"),
   ("20mg", "\u00a389.99", "https://aegispeptidesuk.co.uk/product/retatrutide-20mg/", "retatrutide-20mg"),
   ("30mg", "\u00a3119.99", "https://aegispeptidesuk.co.uk/product/retatrutide-30mg/", "retatrutide-30mg"),
   ("40mg", "\u00a3159.99", "https://aegispeptidesuk.co.uk/product/retatrutide-40mg/", "retatrutide-40mg"),
   ("20mg pen", "\u00a3119.99", "https://aegispeptidesuk.co.uk/product/retatrutide-20mg-pen/", "retatrutide-20mg-pen"),
   ("40mg pen", "\u00a3189.99", "https://aegispeptidesuk.co.uk/product/retatrutide-40mg-pen/", "retatrutide-40mg-pen"),
 ],
}

added = 0
missing = []
for slug, lst in adds.items():
    if slug not in by:
        missing.append(slug); continue
    node = by[slug]
    existing = node.setdefault("sources", [])
    existing_vendors = [s.get("vendor") for s in existing]
    if VENDOR in existing_vendors:
        print("SKIP already has", VENDOR, "in", slug); continue
    for dosage, price, url, imgfile in lst:
        e = {
            "vendor": VENDOR,
            "url": url,
            "price": price,
            "inStock": True,
            "image": IM + imgfile + ".webp",
        }
        if dosage:
            e["dosage"] = dosage
        existing.append(e)
        added += 1
    print(f"added to {slug}: {len(lst)}")

print("MISSING nodes:", missing)
print("TOTAL added:", added)

with open(COMP, "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
    f.write("\n")
print("saved", COMP)
