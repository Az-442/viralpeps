#!/usr/bin/env python3
"""Verify: JSON parses, all image paths exist, coverage reconciliation, no dupes."""
import json, os

V = "Peptide Global"
v = json.load(open("src/data/vendors.json"))
c = json.load(open("src/data/compounds.json"))
print("JSON OK. vendors:", len(v), "compounds:", len(c))

vend = [x for x in v if x["slug"] == "peptide-global"]
print("vendor entry:", len(vend), "| logo:", os.path.exists("public/images/vendors/peptide-global.png"))

srcs = [(comp["slug"], s) for comp in c for s in comp.get("sources", []) if s.get("vendor") == V]
print("source entries:", len(srcs))

# every image path exists
missing = [s["image"] for _, s in srcs if not os.path.exists(s["image"].lstrip("/"))]
print("missing image files:", missing)

# coverage reconciliation
imgs = {f.rsplit(".", 1)[0] for f in os.listdir("public/images/products/peptide-global")}
used = {os.path.basename(s["image"]).rsplit(".", 1)[0] for _, s in srcs}
print("images with no listing:", sorted(imgs - used))
print("listings with no image:", sorted(used - imgs))

# duplicate source entries
import collections
dupes = [k for k, n in collections.Counter((s["url"], s["price"], s.get("dosage")) for _, s in srcs).items() if n > 1]
print("duplicate (url,price,dosage) tuples:", dupes)

# all urls are product pages
bad = [s["url"] for _, s in srcs if "/product/" not in s["url"]]
print("non-product URLs:", bad)

# compounds touched
print("compounds covered:", len({comp["slug"] for comp, _ in [(cc, s) for cc, s in [(comp['slug'], s) for comp in c for s in comp.get('sources',[]) if s.get('vendor')==V]]}))
print("distinct compound slugs:", len({cs for cs, _ in srcs}))
for cs, s in sorted(srcs):
    print(f"   {cs:26s} {s.get('dosage',''):6s} {s['price']}")
