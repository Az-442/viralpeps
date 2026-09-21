#!/usr/bin/env python3
"""Audit the 3 new suppliers: vendor entries, source entries, images on disk."""
import json, os

c = json.load(open('src/data/compounds.json'))
v = json.load(open('src/data/vendors.json'))

for name in ['Claripep', 'VialVerse', 'Kings BioLabs', 'PeptX']:
    print("=" * 70)
    print(f"VENDOR: {name}")
    vv = next((x for x in v if x['name'] == name), None)
    if vv:
        print(json.dumps(vv, indent=2, ensure_ascii=False))
    else:
        print("  NOT FOUND in vendors.json")

    entries = []
    for comp in c:
        for s in comp.get('sources', []):
            if s.get('vendor') == name:
                entries.append((comp['slug'], s))
    print(f"\n  source entries: {len(entries)}")
    missing_img = []
    for slug, s in entries:
        img = s.get('image', '')
        ok = 'OK'
        if not img:
            ok = 'NO-IMAGE-FIELD'
            missing_img.append(slug)
        elif not img.startswith('http'):
            if not os.path.exists('public' + img):
                ok = 'IMG-MISSING-ON-DISK'
                missing_img.append(slug)
        print(f"    {slug:28s} {s.get('price','-'):9s} {s.get('dosage','-'):8s} {ok:20s} {s.get('url','')}")
    if missing_img:
        print(f"  !! images missing: {missing_img}")
    print()
