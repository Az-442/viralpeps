import json

c = json.load(open('src/data/compounds.json'))
print("=== DUPLICATE source entries (same vendor) ===")
for comp in c:
    srcs = comp.get('sources', [])
    seen = {}
    for i, s in enumerate(srcs):
        key = s.get('vendor')
        seen.setdefault(key, []).append(i)
    for v, idxs in seen.items():
        if len(idxs) > 1:
            print(f"{comp['slug']}: {v} x{len(idxs)} -> {[srcs[i].get('price') for i in idxs]} dosages={[srcs[i].get('dosage') for i in idxs]}")

print()
print("=== PeptX images referenced but MISSING on disk ===")
import os
missing = set()
for comp in c:
    for s in comp.get('sources', []):
        if 'eptx' in s.get('vendor','').lower():
            img = s.get('image','')
            if img and not img.startswith('http'):
                p = 'public' + img
                if not os.path.exists(p):
                    missing.add(img)
print(missing or "none")
print()
print("=== dist/vendor stats ===")
v = json.load(open('src/data/vendors.json'))
print("Total vendors:", len(v))
for vv in v:
    print(' -', vv.get('name'), '|', vv.get('slug'))
