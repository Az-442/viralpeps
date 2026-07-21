#!/usr/bin/env python3
import json

with open('src/data/vendors.json') as f:
    v = json.load(f)
print(f'Vendors: {len(v)} entries — OK')

with open('src/data/compounds.json') as f:
    c = json.load(f)
print(f'Compounds: {len(c)} entries — OK')

lab77_count = 0
for compound in c:
    for s in compound['sources']:
        if s.get('vendor') == 'Lab77 Peptides':
            lab77_count += 1
print(f'Lab77 Peptides sources: {lab77_count} total')

lab77_vendor = [x for x in v if x['id'] == 'lab77-peptides']
if lab77_vendor:
    print(f'Lab77 Peptides vendor entry: ✓')
else:
    print('ERROR: Lab77 Peptides vendor entry not found!')
