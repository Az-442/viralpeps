import json
json.load(open('src/data/vendors.json'))
print('vendors.json: OK')
json.load(open('src/data/compounds.json'))
print('compounds.json: OK')
print(f"Vendor count: {len(json.load(open('src/data/vendors.json')))}")
print(f"Compound count: {len(json.load(open('src/data/compounds.json')))}")
