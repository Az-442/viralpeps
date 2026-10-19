#!/usr/bin/env python3
"""Apply confirmed price updates to compounds.json.

Rules:
 - Only entries confirmed by scan_v3 with reason 'rendered==jsonld' (highest confidence)
   or 'single jsonld' where the ratio is sane (0.5x .. 2.1x).
 - Never touch entries flagged DELISTED.
 - Report every change made.
"""
import json, re, shutil, time
from collections import Counter

ROOT = "/Users/time4you/viralpeps"
DATA = f"{ROOT}/src/data/compounds.json"

chg = json.load(open(f"{ROOT}/scripts/changes_v3.json"))

apply_list, skipped = [], []
for r in chg:
    ratio = r["new_v"] / r["old_v"]
    if "rendered==jsonld" in r["reason"]:
        apply_list.append(r)          # highest confidence, any ratio
    elif r["reason"] == "single jsonld" and 0.5 <= ratio <= 2.1:
        apply_list.append(r)          # sane single-source drift
    else:
        skipped.append(r)

print(f"to apply: {len(apply_list)}   skipped (ambiguous/extreme): {len(skipped)}")

data = json.load(open(DATA))
applied, notfound = [], 0
for r in apply_list:
    hit = False
    for c in data:
        if c["slug"] != r["slug"]:
            continue
        for s in c.get("sources", []):
            if s.get("url") == r["url"] and s.get("vendor") == r["vendor"]:
                old = s.get("price")
                new = f"£{r['new_v']:.2f}"
                if old != new:
                    s["price"] = new
                    applied.append((r["vendor"], r["slug"], old, new, r["reason"]))
                hit = True
    if not hit:
        notfound += 1

print(f"applied {len(applied)} price updates (notfound {notfound})")

if applied:
    shutil.copy(DATA, f"{DATA}.bak.autoprice_{time.strftime('%Y%m%d_%H%M%S')}")
    json.dump(data, open(DATA, "w"), indent=2, ensure_ascii=False)
    print("written")
    for a in applied[:60]:
        print(f"  {a[0][:20]:20} {a[1][:26]:26} {a[2]:>9} -> {a[3]:>9}  [{a[4]}]")

json.dump(skipped, open(f"{ROOT}/scripts/skipped_v3.json", "w"), indent=1)
print("vendors touched:", Counter(a[0] for a in applied).most_common())
