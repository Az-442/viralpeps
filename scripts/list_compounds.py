#!/usr/bin/env python3
"""List all compound IDs from compounds.json"""
import json
with open('/Users/time4you/viralpeps/src/data/compounds.json') as f:
    compounds = json.load(f)
for c in compounds:
    print(c['id'])
