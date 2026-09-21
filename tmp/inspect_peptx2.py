import json, re

c = json.load(open('src/data/compounds.json'))
print("=== ALL compounds mentioning PeptX (any field) ===")
for comp in c:
    srcs = [s for s in comp.get('sources', []) if 'eptx' in s.get('vendor','').lower()]
    # also check slug/id for peptx hints
    if srcs:
        print(f"\n{comp['slug']}  (id={comp.get('id')}, compareSlug={comp.get('compareSlug','-')})")
        print(f"  name: {comp.get('name')}")
        for s in srcs:
            print(f"    url={s.get('url')}")
            print(f"    price={s.get('price')} dosage={s.get('dosage','-')} image={s.get('image','-')} inStock={s.get('inStock')}")

print("\n\n=== PeptX vendor entry ===")
v = json.load(open('src/data/vendors.json'))
for vv in v:
    if 'eptx' in vv.get('name','').lower() or 'eptx' in vv.get('slug','').lower():
        print(json.dumps(vv, indent=2))
