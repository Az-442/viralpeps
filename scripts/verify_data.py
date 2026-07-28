import json, os

with open('src/data/vendors.json') as f:
    vendors = json.load(f)

form = [v for v in vendors if v['slug'] == 'form-peptides']
print(f'Vendors total: {len(vendors)}')
print(f'FORM Peptides in vendors: {len(form)}')
if form:
    print(f'  name: {form[0]["name"]}')
    print(f'  website: {form[0]["website"]}')

with open('src/data/compounds.json') as f:
    compounds = json.load(f)

count = 0
for c in compounds:
    for s in c.get('sources', []):
        if s['vendor'] == 'FORM Peptides':
            count += 1
            break

print(f'Compounds total: {len(compounds)}')
print(f'Compounds with FORM Peptides: {count}')

for c in compounds:
    if c['slug'] in ('tirzepatide', 'bpc-157', 'retatrutide'):
        for s in c.get('sources', []):
            if s['vendor'] == 'FORM Peptides':
                print(f'{c["slug"]}: {s["price"]} -> {s["image"]}')

img_dir = 'public/images/products/form-peptides'
files = os.listdir(img_dir)
print(f'\nProduct images: {len(files)} files')
for f in sorted(files):
    size = os.path.getsize(os.path.join(img_dir, f))
    print(f'  {f}: {size} bytes')
