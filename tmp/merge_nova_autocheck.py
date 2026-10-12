#!/usr/bin/env python3
"""Merge the novavitality autocheck entry back into the full cache."""
import json, subprocess, sys

CACHE = "src/data/trustscore-autocheck.json"
SLUG = "novavitality"

head_raw = subprocess.run(["git", "show", f"HEAD:{CACHE}"], capture_output=True, text=True, check=True).stdout
head = json.loads(head_raw)
current = json.load(open(CACHE, encoding="utf-8"))
if not isinstance(current, dict):
    print("Unexpected cache shape — aborting", file=sys.stderr); sys.exit(1)
entry = current.get(SLUG)
if not entry:
    print(f"No '{SLUG}' entry in current cache — aborting", file=sys.stderr); sys.exit(1)
merged = dict(head)
merged.pop(SLUG, None)
merged[SLUG] = entry
json.dump(merged, open(CACHE, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
open(CACHE, "a", encoding="utf-8").write("\n")
print(f"Restored cache: {len(head)} HEAD entries + {SLUG} = {len(merged)} total")
missing = sorted(set(head) - set(merged))
if missing:
    print("WARNING missing:", missing); sys.exit(1)
