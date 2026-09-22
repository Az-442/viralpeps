#!/usr/bin/env python3
"""
Resolve Guard 3 (image uniqueness) findings.

Duplicates found:
  PeptX:     kisspeptin-10.webp == kisspeptin.webp
             -> `kisspeptin.webp` is a STALE ORPHAN. The live source entry points
                at `/images/products/peptx/kisspeptin-10.webp`. Delete the orphan.
  VialVerse: 6 pairs where `<entity>.webp` == `<entity>-blend/.webp` duplicate:
               cjc-1295-ipamorelin-blend.webp == cjc-1295-ipamorelin.webp
               glow-blend.webp  == glow.webp
               klow-blend.webp  == klow.webp
               matrixyl-3000.webp == matrixyl.webp
               nad-plus.webp    == nad.webp
               oxytocin-acetate.webp == oxytocin.webp
             -> Identify which filename each live source entry actually
                references, fetch the real per-product image from VialVerse for
                the ones that are missing, and delete the rest.

VialVerse product images are served from their sitemap's image:loc entries.
This script reads the live source references, reports which file each entry
needs, and flags any that would resolve to a duplicate file.
"""
import json, os, hashlib, re, ssl, urllib.request

ROOT = '/Users/time4you/viralpeps'
comp = json.load(open(ROOT + '/src/data/compounds.json'))

for vendor, vdir in [('PeptX', 'peptx'), ('VialVerse', 'vialverse')]:
    d = f'{ROOT}/public/images/products/{vdir}'
    refs = set()
    for c in comp:
        for s in c.get('sources', []):
            if s.get('vendor') == vendor and s.get('image'):
                refs.add(os.path.basename(s['image']))
    files = sorted(f for f in os.listdir(d) if f.endswith(('.webp', '.png', '.jpg')))
    orphans = [f for f in files if f not in refs]
    missing = sorted(r for r in refs if not os.path.exists(os.path.join(d, r)))
    print('=' * 78)
    print(vendor, ': referenced', len(refs), '| files on disk', len(files))
    print('  ORPHANS (on disk, not referenced by any entry):')
    for o in orphans:
        print('     ', o, os.path.getsize(os.path.join(d, o)), 'bytes')
    if missing:
        print('  MISSING (referenced but no file):')
        for m in missing:
            print('     ', m)
    # report the duplicates specifically
    hs = {}
    for f in files:
        h = hashlib.md5(open(os.path.join(d, f), 'rb').read()).hexdigest()
        hs.setdefault(h, []).append(f)
    for h, v in hs.items():
        if len(v) > 1:
            print('  DUP %s -> %s' % (h[:12], v))
            for f in v:
                live = 'REFERENCED' if f in refs else 'orphan'
                print('       %-34s %s' % (f, live))
