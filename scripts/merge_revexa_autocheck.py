#!/usr/bin/env python3
"""Merge the Revexa autocheck entry back into the full cache.

`vendor-autocheck.mjs --slug=revexa --write-data` overwrites
src/data/trustscore-autocheck.json with ONLY the probed vendor, dropping the
cached entries for every other vendor. This restores the HEAD cache and layers
the freshly-probed Revexa entry on top.

Run:  python3 scripts/merge_revexa_autocheck.py
"""
import json
import subprocess
import sys

CACHE = "src/data/trustscore-autocheck.json"

head_raw = subprocess.run(
    ["git", "show", f"HEAD:{CACHE}"], capture_output=True, text=True, check=True
).stdout
head = json.loads(head_raw)

current = json.load(open(CACHE, encoding="utf-8"))

if not isinstance(current, dict):
    print("Unexpected cache shape — aborting", file=sys.stderr)
    sys.exit(1)

revexa = current.get("revexa")
if not revexa:
    print("No 'revexa' entry in the current cache — aborting", file=sys.stderr)
    sys.exit(1)

merged = dict(head)
# drop any stale key then re-add with the fresh probe
merged.pop("revexa", None)
merged["revexa"] = revexa

json.dump(merged, open(CACHE, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
open(CACHE, "a", encoding="utf-8").write("\n")

print(f"Restored cache: {len(head)} HEAD entries + revexa = {len(merged)} total")
missing = sorted(set(head) - set(merged))
if missing:
    print("WARNING missing:", missing)
    sys.exit(1)
