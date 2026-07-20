import json
with open('src/data/compounds.json') as f:
    data = json.load(f)
print(f'Total compounds: {len(data)}')

polygon_products = [
    'bpc-157', 'cjc-1295', 'dsip', 'epithalon', 'ghk-cu', 'ipamorelin',
    'kpv', 'mots-c', 'mt2', 'pt-141', 'retatrutide', 'selank',
    'semaglutide', 'semax', 'sermorelin', 'tesamorelin', 'tirzepatide',
    '5-amino-1mq', 'ahk-cu',
    # blends
    'glow', 'klow', 'wolverine',
]

for p in polygon_products:
    found = [c['name'] for c in data if p in c['name'].lower() or p in c['id'].lower()]
    if found:
        print(f'{p}: FOUND -> {found}')
    else:
        print(f'{p}: NOT FOUND')
