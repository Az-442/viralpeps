#!/usr/bin/env python3
import json, re

ROOT = "/Users/time4you/viralpeps"
res = json.load(open(f"{ROOT}/scripts/price_scan_result.json"))
data = json.load(open(f"{ROOT}/src/data/compounds.json"))

def val(p):
    if not p: return None
    m = re.search(r"(\d+(?:\.\d+)?)", p.replace(",", ""))
    return float(m.group(1)) if m else None

# index sources
idx = {}
for c in data:
    for s in c.get("sources", []):
        idx[(s["vendor"], s.get("url"))] = (c["slug"], s)

changed, delisted, blocked, noprice, same = [], [], [], [], 0
for r in res:
    old = val(r.get("old_price"))
    new = val(r.get("new_price"))
    if r["status"] == 404 or r["status"] == 410:
        delisted.append(r); continue
    if r["status"] in (403, 503, 402) or r["status"] is None:
        blocked.append(r); continue
    if new is None:
        noprice.append(r); continue
    if old is None:
        continue
    if old == 0:
        continue
    pct = abs(new - old) / old * 100
    if pct > 5:
        changed.append((r, old, new, pct))

print(f"changed >5%: {len(changed)}")
print(f"404/410: {len(delisted)}")
print(f"blocked/neterr: {len(blocked)}")
print(f"no price parsed: {len(noprice)}")
print("\n=== SAMPLE CHANGED (first 40) ===")
for r, o, n, p in sorted(changed, key=lambda x: -x[3])[:40]:
    print(f"{p:6.1f}%  {r['vendor'][:24]:24} {r['slug'][:28]:28} {r['old_price']:>9} -> £{n:.2f}  [{r['note']}] {r['url'][:70]}")

print("\n=== 404 / GONE (first 40) ===")
for r in delisted[:40]:
    print(f"{r['status']} {r['vendor'][:24]:24} {r['slug'][:26]:26} {r['url'][:80]}")
