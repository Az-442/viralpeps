#!/usr/bin/env python3
"""List all source entries for a given vendor from compounds.json."""
import json, sys

vendor = sys.argv[1]
with open('/Users/time4you/viralpeps/src/data/compounds.json') as f:
    data = json.load(f)

n = 0
for c in data:
    for s in c.get('sources', []):
        if s.get('vendor') == vendor:
            n += 1
            print(f"{c.get('slug',''):45s} | {s.get('url','')}")
print(f"TOTAL {vendor} entries: {n}")
