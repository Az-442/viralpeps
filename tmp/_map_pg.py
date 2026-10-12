#!/usr/bin/env python3
"""Map Peptide Global products to existing master compound ids."""
import json, re

c = json.load(open("src/data/compounds.json"))
# master compounds (no compareSlug)
masters = [x for x in c if not x.get("compareSlug")]
print("total compounds:", len(c), "masters:", len(masters))

def find(name):
    """find master compound whose name/slug/aliases match"""
    key = re.sub(r"[^a-z0-9]", "", name.lower())
    hits = []
    for m in masters:
        cands = [m["slug"], m["name"]] + m.get("aliases", [])
        for cd in cands:
            ck = re.sub(r"[^a-z0-9]", "", str(cd).lower())
            if ck and (ck == key or key.startswith(ck) or ck.startswith(key)):
                hits.append((m["slug"], m["name"]))
                break
    return hits

products = json.load(open("tmp/_pg_scrape.json"))
for p in products:
    slug = p["url"].split("/product/")[-1].strip("/")
    # base name from slug: strip -vial/-pen/-Nmg
    base = re.sub(r"-(vial|pen)$", "", slug)
    base = re.sub(r"-\d+(mg|ml)$", "", base)
    hits = find(base)
    print(f"{slug:32s} base={base:22s} -> {hits}")
