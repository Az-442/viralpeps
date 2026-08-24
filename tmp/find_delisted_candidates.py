#!/usr/bin/env python3
"""Find delisted candidates in compounds.json for verification."""
import json

with open('/Users/time4you/viralpeps/src/data/compounds.json') as f:
    compounds = json.load(f)

print(f"Total compounds: {len(compounds)}")

# Focus vendors/compounds flagged in the scraper report
targets = [
    ('Tide Labs', None),   # BPC-157 5mg, NAD+ 500mg, KPV 5mg sold out
    ('Express Peptides', None),
    ('CMSR Labs', None),
]

for c in compounds:
    for s in c.get('sources', []):
        if s.get('vendor') in ('Tide Labs', 'Express Peptides', 'CMSR Labs'):
            print(f"\nCOMPOUND: {c['slug']} ({c.get('name','')})")
            print(json.dumps(s, indent=2))
