import json
with open('src/data/compounds.json') as f:
    data = json.load(f)
print(f'Valid JSON - {len(data)} compounds total')

# Find the compound we just added
for c in data:
    if c['id'] == 'follistatin-344':
        print(f'Found: {c["name"]} (id={c["id"]})')
        print(f'  Category: {c["category"]}')
        print(f'  Sources ({len(c["sources"])}):')
        for s in c['sources']:
            print(f'    - {s["vendor"]}: {s["price"]} (inStock={s["inStock"]})')
        print(f'  Description length: {len(c["description"])} words')
        break
