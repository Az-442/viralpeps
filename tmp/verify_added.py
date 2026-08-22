import json

compounds = json.load(open("src/data/compounds.json"))
VENDOR = "Tested Peptides"

# Count total Tested Peptides sources
total = sum(1 for c in compounds for s in c.get("sources", []) if s.get("vendor") == VENDOR)
print("Total Tested Peptides sources:", total)

# Group by compound id
from collections import Counter
cnt = Counter()
for c in compounds:
    for s in c.get("sources", []):
        if s.get("vendor") == VENDOR:
            cnt[c["id"]] += 1

for cid, n in sorted(cnt.items()):
    print(f"  {cid}: {n}")

# Check duplicate ids overall (potential problem)
ids = [c["id"] for c in compounds]
dupes = {i for i in ids if ids.count(i) > 1}
print("\nCompound ids appearing more than once:", sorted(dupes))
