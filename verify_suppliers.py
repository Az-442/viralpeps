import json

with open('src/data/compounds.json') as f:
    data = json.load(f)

bp = sum(1 for c in data for s in c.get('sources', []) if 'Brit Peptides' in s.get('vendor', ''))
nw = sum(1 for c in data for s in c.get('sources', []) if 'New Wave Peptides' in s.get('vendor', ''))

print(f'Brit Peptides sources: {bp}')
print(f'New Wave Peptides sources: {nw}')
print(f'Total new sources: {bp + nw}')

# Show which compounds have each vendor
for c in data:
    for s in c.get('sources', []):
        if 'Brit Peptides' in s.get('vendor', ''):
            print(f'  BP -> {c["id"]}: {s["price"]} ({s.get("dosage","N/A")}) {"instock" if s["inStock"] else "OOS"}')
            break

for c in data:
    for s in c.get('sources', []):
        if 'New Wave Peptides' in s.get('vendor', ''):
            print(f'  NW -> {c["id"]}: {s["price"]} ({s.get("dosage","N/A")})')
            break

# Verify vendors.json
with open('src/data/vendors.json') as f:
    vdata = json.load(f)
print(f'\nVendors in vendors.json: {[v["id"] for v in vdata]}')
