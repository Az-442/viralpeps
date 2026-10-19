#!/usr/bin/env python3
"""Report trusted price discrepancies from json-ld / inline-json extraction only."""
import json, re
from collections import Counter, defaultdict

ROOT = "/Users/time4you/viralpeps"
res = json.load(open(f"{ROOT}/scripts/price_scan_v2.json"))


def val(p):
    if not p:
        return None
    m = re.search(r"(\d+(?:\.\d+)?)", str(p).replace(",", ""))
    return float(m.group(1)) if m else None


trusted = []
for r in res:
    if not (r["method"] or "").startswith(("json-ld", "inline-json")):
        continue
    old, new = val(r["old"]), val(r["new"])
    if old is None or new is None or old == 0:
        continue
    pct = (new - old) / old * 100
    r["old_v"], r["new_v"], r["pct"] = old, new, pct
    trusted.append(r)

multi = [r for r in trusted if r["method"] != "json-ld" and "vars" in r["method"]]
print(f"trusted prices: {len(trusted)}  (multi-variant pages: {len(multi)})")

chg = [r for r in trusted if abs(r["pct"]) > 5]
same = [r for r in trusted if abs(r["pct"]) <= 5]
print(f">5% change: {len(chg)}   within 5%: {len(same)}")

print("\n-- biggest drops (>5%, sorted by pct) --")
for r in sorted(chg, key=lambda x: x["pct"])[:35]:
    print(f"{r['pct']:7.1f}%  {r['vendor'][:22]:22} {r['slug'][:28]:28} {r['old']:>9} -> {r['new']:>9}  {r['url'][:62]}")

print("\n-- biggest rises (>5%) --")
for r in sorted(chg, key=lambda x: -x["pct"])[:35]:
    print(f"{r['pct']:7.1f}%  {r['vendor'][:22]:22} {r['slug'][:28]:28} {r['old']:>9} -> {r['new']:>9}  {r['url'][:62]}")

print("\n-- per-vendor change counts --")
c = Counter(r["vendor"] for r in chg)
for v, n in c.most_common(25):
    print(f"{v[:28]:28} {n}")
