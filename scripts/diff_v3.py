#!/usr/bin/env python3
import json, re
from collections import Counter

ROOT = "/Users/time4you/viralpeps"
out = json.load(open(f"{ROOT}/scripts/scan_v3.json"))


def val(p):
    if not p:
        return None
    m = re.search(r"(\d+(?:\.\d+)?)", str(p).replace(",", ""))
    return float(m.group(1)) if m else None


priced = []
for r in out:
    if r["confirmed"] not in ("PRICE", "OOS"):
        continue
    if r.get("new") is None:
        continue
    old = val(r["old"])
    if not old:
        continue
    new = float(r["new"])
    r["old_v"], r["new_v"] = old, new
    r["pct"] = (new - old) / old * 100
    priced.append(r)

print(f"comparable: {len(priced)}")
chg = [r for r in priced if abs(r["pct"]) > 5]
print(f">5% change: {len(chg)}   within 5%: {len(priced)-len(chg)}")
print(f"  high-confidence (rendered==jsonld): {sum(1 for r in chg if 'rendered' in r['reason'])}")
print(f"  single jsonld: {sum(1 for r in chg if r['reason']=='single jsonld')}")

print("\n== TOP 45 by magnitude ==")
for r in sorted(chg, key=lambda x: -abs(x["pct"]))[:45]:
    print(f"{r['pct']:7.1f}% {r['vendor'][:20]:20} {r['slug'][:25]:25} {r['old']:>9} -> £{r['new_v']:>8.2f}  {'OK' if 'rendered' in r['reason'] else '  '} {r['url'][:50]}")

print("\nvendors:", Counter(r["vendor"] for r in chg).most_common(22))
json.dump(chg, open(f"{ROOT}/scripts/changes_v3.json", "w"), indent=1)
json.dump([r for r in priced if abs(r["pct"]) <= 5], open(f"{ROOT}/scripts/unchanged_v3.json", "w"), indent=1)
