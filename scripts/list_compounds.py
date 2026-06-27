import json

with open('src/data/compounds.json') as f:
    compounds = json.load(f)

for c in compounds:
    vendor_names = [s["vendor"] for s in c["sources"]]
    print(f'{c["id"]:40s} | cat={c["category"]:25s} | {len(c["sources"])} sources | vendors: {vendor_names}')

print(f'\nTotal compounds: {len(compounds)}')
