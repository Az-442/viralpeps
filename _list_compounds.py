#!/usr/bin/env python3
import json
with open('src/data/compounds.json') as f:
    compounds = json.load(f)
for c in compounds:
    print(f"{c['id']:30s} | {c['name']}")
print(f'\nTotal compounds: {len(compounds)}')
