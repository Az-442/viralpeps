#!/usr/bin/env python3
import json
d = json.load(open('src/data/compounds.json'))
print("Top-level type:", type(d))
# compounds.json likely a dict of compound -> list of sources, OR list.
if isinstance(d, dict):
    print("KEYS:", list(d.keys())[:40])
    # find one compound with leolab
    for k, v in d.items():
        if isinstance(v, list):
            for s in v:
                if isinstance(s, dict) and s.get('vendor')=='LeoLab Peptides UK':
                    print("===", k)
                    print(json.dumps(s, indent=2))
                    break
