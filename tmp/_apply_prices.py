#!/usr/bin/env python3
"""Apply CHANGED price updates from price_check_results.json to compounds.json."""
import json, shutil, datetime, os

ROOT = "/Users/time4you/viralpeps"
P = f"{ROOT}/src/data/compounds.json"
RES = f"{ROOT}/tmp/price_check_results.json"
DATE = datetime.date.today().strftime("%Y%m%d")
BACKUP = f"{ROOT}/tmp/compounds.backup.{DATE}.json"

results = json.load(open(RES))
changed = [r for r in results if r["status"] == "CHANGED"]

data = json.load(open(P))
# backup BEFORE mutating
shutil.copy(P, BACKUP)

applied = []
for r in changed:
    ci, si = r["ci"], r["si"]
    src = data[ci]["sources"][si]
    # sanity: same vendor + url
    assert src["vendor"] == r["vendor"], f"vendor mismatch ci={ci} si={si}"
    assert (src.get("url") or "") == r["url"], f"url mismatch ci={ci} si={si}"
    old = src.get("price")
    src["price"] = r["scraped"]
    applied.append({
        "vendor": r["vendor"], "compound": r["compound"], "url": r["url"],
        "old": old, "new": r["scraped"], "pct": r.get("pct"),
    })

json.dump(data, open(P, "w"), indent=2, ensure_ascii=False)

print(f"backup: {BACKUP}")
print(f"applied: {len(applied)} price updates")
for a in applied:
    print(f"  {a['vendor'][:22]:22} {a['compound'][:30]:30} {a['old']} -> {a['new']} ({a['pct']:+.1f}%)")
