#!/usr/bin/env python3
"""Verify the Revexa addition: image files exist, source counts, no dupes."""
import json
import os
import sys

data = json.load(open("src/data/compounds.json", encoding="utf-8"))
compounds = data if isinstance(data, list) else data["compounds"]

missing = []
seen = []
for c in compounds:
    for s in c.get("sources", []) or []:
        if s.get("vendor") != "Revexa":
            continue
        img = s.get("image") or ""
        seen.append((c["slug"], s.get("dosage"), s.get("price"), img))
        if not img:
            missing.append((c["slug"], "NO IMAGE FIELD"))
            continue
        p = "public" + img
        if not os.path.exists(p):
            missing.append((c["slug"], img))

print(f"Revexa source entries: {len(seen)}")
print(f"Unique compounds touched: {len({s[0] for s in seen})}")
dupes = len(seen) - len({(s[0], s[3]) for s in seen})
print(f"Duplicate (compound,image) pairs: {dupes}")
print(f"Missing/blank images: {len(missing)}")
for m in missing:
    print("  MISSING:", m)

# price sanity
bad_price = [s for s in seen if not (s[2] or "").startswith("£")]
print(f"Malformed prices: {len(bad_price)}")
for b in bad_price:
    print("  BAD:", b)

# vendor record
vendors = json.load(open("src/data/vendors.json", encoding="utf-8"))
v = [x for x in vendors if x.get("slug") == "revexa"]
print(f"\nVendor in vendors.json: {len(v)}")
if v:
    print("  name:", v[0]["name"], "| website:", v[0]["website"])
    print("  logo exists:", os.path.exists("public/images/vendors/revexa.png"))

sys.exit(1 if (missing or dupes or bad_price) else 0)
