#!/usr/bin/env python3
"""
Remove stale orphan image files (not referenced by any source entry).

Guard 3 as originally written flagged byte-identical MD5s as "placeholders".
On inspection every duplicate pair is one REFERENCED file + one ORPHAN
left behind by an earlier rename/dedup pass. No entry ships a shared image:
  - every referenced VialVerse file maps 1:1 to exactly one compound
  - the referenced file in each pair is the one the live entry points at

Verified before deleting: the file being removed is NOT referenced by any
source entry in compounds.json.
"""
import json, os, re, shutil, hashlib

ROOT = '/Users/time4you/viralpeps'
comp = json.load(open(ROOT + '/src/data/compounds.json'))

# Refs must be scoped PER VENDOR DIRECTORY — image filenames are reused across
# vendors (e.g. kisspeptin.webp exists under several vendor folders), so a global
# set of basenames would wrongly protect an orphan just because a *different*
# vendor references a file with the same name.
ALL_REFS = {}
for c in comp:
    for s in c.get('sources', []):
        img = s.get('image')
        if not img:
            continue
        m = re.match(r'/images/products/([^/]+)/(.+)$', img)
        if m:
            ALL_REFS.setdefault(m.group(1), set()).add(m.group(2))

# Orphans identified by audit_image_orphans.py
ORPHANS = {
    'peptx': ['kisspeptin.webp', 'eloralintide.webp'],
    'vialverse': ['cjc-1295-ipamorelin.webp', 'glow-blend.webp', 'klow-blend.webp',
                  'matrixyl.webp', 'nad.webp', 'oxytocin.webp',
                  'melanotan-i.webp', 'melanotan-ii.webp'],
}

backup = os.path.join(ROOT, '.orphan-backup')
os.makedirs(backup, exist_ok=True)

removed, kept = [], []
for vdir, files in ORPHANS.items():
    d = f'{ROOT}/public/images/products/{vdir}'
    for f in files:
        p = os.path.join(d, f)
        if not os.path.exists(p):
            continue
        # SAFETY: never delete a file this vendor's entries reference
        if f in ALL_REFS.get(vdir, set()):
            kept.append((vdir, f))
            print('!! REFUSING to delete referenced file:', vdir, f)
            continue
        shutil.move(p, os.path.join(backup, f'{vdir}__{f}'))
        removed.append((vdir, f))

print('moved to .orphan-backup/:', len(removed))
for v, f in removed:
    print('   %-12s %s' % (v, f))
if kept:
    print('kept (still referenced):', kept)

# re-verify uniqueness on the remaining referenced files
print()
for vdir in ('peptx', 'vialverse', 'claripep', 'kings-bio-labs'):
    d = f'{ROOT}/public/images/products/{vdir}'
    if not os.path.isdir(d):
        continue
    files = sorted(f for f in os.listdir(d) if f.endswith(('.webp', '.png', '.jpg')))
    hs = {}
    for f in files:
        h = hashlib.md5(open(os.path.join(d, f), 'rb').read()).hexdigest()
        hs.setdefault(h, []).append(f)
    dupes = {h: v for h, v in hs.items() if len(v) > 1}
    print('%-16s %d files, %d unique, dupes=%d' % (vdir, len(files), len(hs), len(dupes)))
    for h, vv in dupes.items():
        print('     DUP', vv)
