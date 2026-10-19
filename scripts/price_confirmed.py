#!/usr/bin/env python3
"""Strict discrepancy check.

A scraped price is ONLY trusted when:
  - the page has exactly ONE distinct JSON-LD offer price, AND
  - that price is plausibly the same product (within 60%..166% of stored, i.e. drift not variant)
Multi-variant pages are reported separately for human review, never auto-applied.
"""
import json, re
from collections import Counter

ROOT = "/Users/time4you/viralpeps"

res = json.load(open(f"{ROOT}/scripts/price_scan_v2.json"))
verify = {r["url"]: r for r in json.load(open(f"{ROOT}/scripts/price_verify.json"))}


def val(p):
    if not p:
        return None
    m = re.search(r"(\d+(?:\.\d+)?)", str(p).replace(",", ""))
    return float(m.group(1)) if m else None


single, multi, rejected = [], [], []
for r in res:
    m = r.get("method") or ""
    old, new = val(r["old"]), val(r["new"])
    if old is None or new is None or old == 0:
        continue
    # "json-ld+Nvars" means multiple distinct prices on page => ambiguous
    if re.match(r"json-ld\+\d+vars", m):
        r["old_v"], r["new_v"] = old, new
        multi.append(r)
        continue
    if m in ("json-ld", "inline-json"):
        r["old_v"], r["new_v"] = old, new
        single.append(r)
    else:
        rejected.append(r)

print(f"single-price pages (trusted): {len(single)}")
print(f"multi-variant pages (review only): {len(multi)}")

# apply sanity band on single pages
ok, wild = [], []
for r in single:
    ratio = r["new_v"] / r["old_v"]
    (ok if 0.6 <= ratio <= 1.66 else wild).append(r)

print(f"  plausible drift (0.6-1.66x): {len(ok)}")
print(f"  wild ratio (likely variant/parse): {len(wild)}")

chg = [r for r in ok if abs(r["new_v"] - r["old_v"]) / r["old_v"] * 100 > 5]
print(f"\nCONFIRMED >5% price changes: {len(chg)}")

# exclude records the verifier says are oos/delisted
clean = []
for r in chg:
    v = verify.get(r["url"])
    vd = v["verdict"] if v else None
    r["verdict"] = vd
    if vd in ("delisted-404", "delisted-410"):
        continue
    clean.append(r)

print(f"  after removing delisted: {len(clean)}")

for r in sorted(clean, key=lambda x: -abs(x["new_v"] - x["old_v"]) / x["old_v"])[:45]:
    pct = (r["new_v"] - r["old_v"]) / r["old_v"] * 100
    print(f"{pct:7.1f}% {r['vendor'][:20]:20} {r['slug'][:26]:26} {r['old']:>9} -> {r['new']:>9}  {r['url'][:58]}")

print("\nvendors affected:", Counter(r["vendor"] for r in clean).most_common(20))
json.dump(clean, open(f"{ROOT}/scripts/confirmed_changes.json", "w"), indent=1)
json.dump(multi, open(f"{ROOT}/scripts/review_multivariant.json", "w"), indent=1)
