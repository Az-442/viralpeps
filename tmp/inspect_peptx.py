import json

c = json.load(open('src/data/compounds.json'))
n = 0
vendors_seen = set()
for comp in c:
    for s in comp.get('sources', []):
        v = s.get('vendor', '')
        if 'eptx' in v.lower():
            vendors_seen.add(v)
            n += 1
            print(comp['slug'], '|', v, '|', s.get('url'), '|', s.get('price'), '|', s.get('dosage', '-'), '|', s.get('image', 'noimage'))
print('TOTAL:', n)
print('VENDOR NAMES:', vendors_seen)
