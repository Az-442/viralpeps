import json
c = json.load(open('src/data/compounds.json'))
vendors = set()
for comp in c:
    for s in comp.get('sources', []):
        vendors.add(s['vendor'])
for v in sorted(vendors):
    print(v)
print('---')
print('Total:', len(vendors))
