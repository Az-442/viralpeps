import json
data = json.load(open('src/data/compounds.json'))
print(f'Valid JSON: {len(data)} compounds')
for c in data:
    print(f'  {c["name"]}: {len(c.get("sources", []))} sources')
