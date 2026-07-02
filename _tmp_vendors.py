import json
with open('src/data/vendors.json') as f:
    vendors = json.load(f)
for v in vendors:
    print(f'{v["slug"]} -> {v.get("website","MISSING")}')
