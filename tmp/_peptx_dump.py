import json

c = json.load(open('src/data/compounds.json'))
n = 0
for comp in c:
    for s in comp.get('sources', []):
        if 'peptx' in s.get('vendor', '').lower():
            n += 1
            print(f"{comp['slug']}|{comp.get('name')}|{s.get('price')}|{s.get('url')}|{s.get('dosage','-')}|{s.get('image','-')}")
print('TOTAL', n)
