import json

compounds = json.load(open("src/data/compounds.json"))
VENDOR = "Tested Peptides"
removed = []

# Keep the Tested Peptides source only on the FIRST (canonical, most-sourced) record
# for any compound id that appears more than once.
from collections import defaultdict
by_id = defaultdict(list)
for i, c in enumerate(compounds):
    by_id[c["id"]].append(i)

for cid, idxs in by_id.items():
    if len(idxs) < 2:
        continue
    # canonical = the record with the most sources
    canonical = max(idxs, key=lambda i: len(compounds[i].get("sources", [])))
    for i in idxs:
        if i == canonical:
            continue
        before = len(compounds[i]["sources"])
        compounds[i]["sources"] = [s for s in compounds[i]["sources"] if s.get("vendor") != VENDOR]
        after = len(compounds[i]["sources"])
        if before != after:
            removed.append((cid, i, before - after))

json.dump(compounds, open("src/data/compounds.json", "w"), indent=2, ensure_ascii=False)
print("Removed Tested Peptides duplicate sources from non-canonical records:")
for cid, idx, n in removed:
    print(f"  {cid} (index {idx}): removed {n}")
