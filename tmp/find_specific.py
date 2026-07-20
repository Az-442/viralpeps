import json
with open('src/data/compounds.json') as f:
    data = json.load(f)

# Find epithalon specifically
for c in data:
    if 'epithalon' in c.get('name', '').lower() or 'epithalon' in c.get('id', '').lower():
        print(f"id={c.get('id')}, name={c.get('name')}")
        
# Find 5-amino-1mq
for c in data:
    if '5-amino' in c.get('name', '').lower() or '5-amino' in c.get('id', '').lower():
        print(f"id={c.get('id')}, name={c.get('name')}")
