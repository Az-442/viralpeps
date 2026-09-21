import json
d = json.load(open('src/data/vendors.json'))
for v in d:
    if v['slug'] == 'spx-labs' or 'spx' in v.get('name','').lower() or 'spx' in v.get('website','').lower():
        print(json.dumps(v, indent=2))
