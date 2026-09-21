#!/usr/bin/env python3
"""Final integrity check: duplicates, missing images, URL sanity for the 3 suppliers."""
import json, os, hashlib, collections, re

c = json.load(open('src/data/compounds.json'))
VENDORS = ['PeptX', 'Claripep', 'VialVerse']
BANNED = re.compile(r'/(shop|products|category|collections)(/|$)', re.I)

print("=== per-vendor totals ===")
for v in VENDORS:
    ents = [(comp['slug'], s) for comp in c for s in comp.get('sources', []) if s.get('vendor') == v]
    print(f"  {v:10s} {len(ents):3d} source entries across {len({e[0] for e in ents})} compounds")

print("\n=== duplicate (vendor, compound, url, price) tuples ===")
seen = collections.Counter()
for comp in c:
    for s in comp.get('sources', []):
        if s.get('vendor') in VENDORS:
            seen[(s['vendor'], comp['slug'], s.get('url'), s.get('price'))] += 1
dups = {k: n for k, n in seen.items() if n > 1}
print("  ", dups or "NONE")

print("\n=== missing / broken images ===")
bad = []
for comp in c:
    for s in comp.get('sources', []):
        if s.get('vendor') not in VENDORS:
            continue
        img = s.get('image', '')
        if not img:
            bad.append((s['vendor'], comp['slug'], 'NO-IMAGE-FIELD'))
        elif not img.startswith('http') and not os.path.exists('public' + img):
            bad.append((s['vendor'], comp['slug'], 'MISSING ' + img))
print("  ", bad or "NONE")

print("\n=== category-page URLs ===")
cat = [(s['vendor'], comp['slug'], s['url']) for comp in c for s in comp.get('sources', [])
       if s.get('vendor') in VENDORS and BANNED.search(s.get('url', ''))]
print("  ", cat or "NONE")

print("\n=== image uniqueness (per vendor) ===")
for v in VENDORS:
    hm = {}
    for comp in c:
        for s in comp.get('sources', []):
            if s.get('vendor') != v:
                continue
            img = s.get('image', '')
            if img.startswith('http') or not os.path.exists('public' + img):
                continue
            h = hashlib.md5(open('public' + img, 'rb').read()).hexdigest()
            hm.setdefault(h, []).append(comp['slug'])
    shared = {k: vv for k, vv in hm.items() if len(vv) > 1}
    print(f"  {v:10s} unique={len(hm):3d} shared-hash={shared or 'none'}")

print("\n=== vendor entries in vendors.json ===")
vend = json.load(open('src/data/vendors.json'))
for v in VENDORS:
    e = next((x for x in vend if x['name'] == v), None)
    if e:
        print(f"  {v:10s} slug={e['slug']:12s} verified={e.get('verified')} rating={e.get('rating')} labTested={e.get('labTested')} email={e.get('email','-')}")
    else:
        print(f"  {v:10s} NOT IN vendors.json")
print(f"\ntotal vendors: {len(vend)}   total compounds: {len(c)}")
