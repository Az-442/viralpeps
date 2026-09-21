#!/usr/bin/env python3
"""Add the 2 remaining PeptX sources under their real VP compound slugs."""
import json, os

DATA = 'src/data/compounds.json'
c = json.load(open(DATA))
by_slug = {x['slug']: x for x in c}

# (vp_slug, peptx_url_slug, img_file, price, dosage)
REMAINING = [
    ('melanotan-i', 'mt-1',        'mt-1.webp',        '£20.99', '10mg'),
    ('klow',        'klow-blend',  'klow-blend.webp',  '£63.99', '80mg'),
]

for vp_slug, px_slug, imgfile, price, dosage in REMAINING:
    comp = by_slug.get(vp_slug)
    if not comp:
        print(f"SKIP {vp_slug}: not found")
        continue
    disk = os.path.join('public/images/products/peptx', imgfile)
    if not os.path.exists(disk):
        print(f"SKIP {vp_slug}: image missing {disk}")
        continue
    url = f"https://peptx.co.uk/single-vials/{px_slug}"
    imgpath = f"/images/products/peptx/{imgfile}"

    existing = [s for s in comp['sources'] if s.get('vendor') == 'PeptX']
    if existing:
        s = existing[0]
        s.update({'url': url, 'price': price, 'dosage': dosage, 'image': imgpath, 'inStock': True})
        print(f"UPDATED {vp_slug} -> {url} {price} {dosage}")
    else:
        comp['sources'].append({
            'vendor': 'PeptX', 'url': url, 'price': price,
            'inStock': True, 'image': imgpath, 'dosage': dosage,
        })
        print(f"ADDED {vp_slug} -> {url} {price} {dosage}")

json.dump(c, open(DATA, 'w'), indent=2)
print("\nsaved")
