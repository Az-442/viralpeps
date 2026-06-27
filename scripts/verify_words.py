import json
with open('src/data/compounds.json') as f:
    data = json.load(f)
for c in data:
    if c['id'] == 'follistatin-344':
        wc = len(c['description'].split())
        print(f'Description word count: {wc}')
        print(f'Description: {c["description"]}')
        print(f'\nMeta check - id: {c["id"]}, name: {c["name"]}, slug: {c["slug"]}')
        print(f'Category: {c["category"]}')
        break
