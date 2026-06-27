import json
with open('/Users/time4you/viralpeps/src/data/compounds.json') as f:
    data = json.load(f)
print(f"JSON VALID - {len(data)} compounds loaded")
for c in data:
    for s in c.get('sources', []):
        if 'example.com' in s.get('url', ''):
            pass
