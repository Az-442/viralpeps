#!/usr/bin/env python3
"""Validate vendors.json and compounds.json are valid JSON & report vendor presence."""
import json

def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)

vendors = load("/Users/time4you/viralpeps/src/data/vendors.json")
compounds = load("/Users/time4you/viralpeps/src/data/compounds.json")
print("vendors.json valid:", len(vendors), "vendors")
print("compounds.json valid:", len(compounds), "compounds")

# find the new vendor
nv = [v for v in vendors if v["slug"] == "peptides-online-uk"]
print("New vendor found:", nv[0]["name"] if nv else "MISSING")

# unique vendor names in compounds sources
names = set()
for c in compounds:
    for s in c.get("sources", []):
        names.add(s["vendor"])
print("Total distinct vendors in sources:", len(names))
print("'Peptides Online UK' still absent from sources:", ("Peptides Online UK" not in names))
