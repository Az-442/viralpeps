import json
data = json.load(open('src/data/compounds.json'))
slugs = [c['slug'] for c in data]
print(f'Total compounds: {len(data)}')
print('Slugs:', slugs)
# Also show what vendors exist
vendors = json.load(open('src/data/vendors.json'))
print(f'Total vendors: {len(vendors)}')
print('Vendor names:', [v['name'] for v in vendors])
