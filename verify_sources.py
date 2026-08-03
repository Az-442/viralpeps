#!/usr/bin/env python3
import json
with open('src/data/compounds.json') as f:
    data = json.load(f)
reta_count = 0
for compound in data:
    for source in compound.get('sources', []):
        if source.get('vendor') == 'RETA UK':
            reta_count += 1
            img = source.get('image', 'none')[:60]
            print(f"  {compound['id']}: {source['price']} - image={img}")
print(f'Total RETA UK sources: {reta_count}')
print(f'Total compounds: {len(data)}')
