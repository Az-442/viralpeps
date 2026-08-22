import json
with open('src/data/compounds.json') as f:
    data = json.load(f)

# Find specific compounds matching Polygon products
wanted_names = [
    'BPC-157', 'CJC-1295 (no DAC)', 'DSIP (Delta Sleep-Inducing Peptide)',
    'Epithalon', 'GHK-Cu', 'Ipamorelin', 'KPV',
    'MOTS-c', 'Melanotan II', 'PT-141 (Bremelanotide)',
    'Retatrutide', 'Selank', 'Semaglutide', 'Semax',
    'Sermorelin', 'Tesamorelin', 'Tirzepatide',
    '5-Amino-1MQ', 'AHK-CU 100mg', 'Glow', 'KLOW', 'Wolverine Stack BPC157 & TB 500 Blend'
]

for name in wanted_names:
    for c in data:
        if c['name'].lower() == name.lower():
            print(f"FOUND '{name}': id={c['id']}, slug={c['slug']}, category={c.get('category','?')}")
            # Show current sources
            for s in c['sources']:
                print(f"  Source: {s['vendor']} - {s.get('price','?')}")
            break
    else:
        print(f"NOT FOUND: '{name}'")
