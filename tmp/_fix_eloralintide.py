#!/usr/bin/env python3
"""Fix: PeptX eloralintide — price is non-orderable (Production paused).
Storing an empty price corrupts the page's meta description + FAQ JSON-LD
("prices starting from £0.00"). Correct action: remove the PeptX source
from eloralintide, matching how aod-9604 / cagrilintide / liraglutide
(no single-vial page) were handled.
"""
import json, shutil, os

BASE = "/Users/time4you/viralpeps/src/data"
P = os.path.join(BASE, "compounds.json")
SHIM = "/tmp/compounds.json"
shutil.copy(P, SHIM)

with open(SHIM) as f:
    data = json.load(f)

comps = data if isinstance(data, list) else data.get("compounds", [])
changed = 0
for comp in comps:
    if comp.get("slug") != "eloralintide":
        continue
    before = len(comp.get("sources", []))
    kept = []
    for s in comp.get("sources", []):
        if str(s.get("vendor", "")).strip().lower() == "peptx":
            print("REMOVING PeptX source:", json.dumps(s))
            changed += 1
            continue
        kept.append(s)
    comp["sources"] = kept
    print("eloralintide sources: %d -> %d" % (before, len(kept)))

if changed:
    with open(P + ".new", "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("wrote", P + ".new")
else:
    print("no change needed")
