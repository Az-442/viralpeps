#!/usr/bin/env python3
import json
v = json.load(open('/Users/time4you/viralpeps/src/data/vendors.json'))
for x in v:
    if x['id'] == 'ol-research':
        print(json.dumps(x, indent=2))
        break

c = json.load(open('/Users/time4you/viralpeps/src/data/compounds.json'))
ol_count = 0
for comp in c:
    for s in comp.get('sources', []):
        if s.get('vendor') == 'OL Research':
            ol_count += 1
            print(f"  {comp['id']}: {s.get('dosage', 'N/A')} @ {s['price']}")
print(f"\nTotal OL Research sources: {ol_count}")
print(f"Total compounds: {len(c)}")
