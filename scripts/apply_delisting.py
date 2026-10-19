#!/usr/bin/env python3
"""Remove verified-delisted source entries from compounds.json.

Only removes entries whose exact URL re-verified as 404/410 live.
Skips: JGPep+ (200 but parked 'coming soon'), Proforma/Dr P/MyPep (403 blocked).
"""
import json, shutil, datetime
from collections import Counter

BASE = '/Users/time4you/viralpeps'
COMP = f'{BASE}/src/data/compounds.json'

re_ = json.load(open(f'{BASE}/scripts/delisted_reverify.json'))

# entries verified gone on re-probe
gone = [r for r in re_ if r.get('final_status') in (404, 410)]
gone_urls = set(r['url'] for r in gone)
print(f"verified-gone URLs: {len(gone_urls)}")

skipped = [r for r in re_ if r.get('final_status') not in (404, 410)]
print("skipped (not 404/410):", len(skipped), Counter(r.get('final_status') for r in skipped))

comp = json.load(open(COMP))
before_compounds = len(comp)
before_sources = sum(len(c.get('sources', [])) for c in comp)

removed = []
emptied = []
new_comp = []
for c in comp:
    src = c.get('sources', [])
    keep, drop = [], []
    for s in src:
        if s.get('url') in gone_urls:
            drop.append(s)
        else:
            keep.append(s)
    for s in drop:
        removed.append((c.get('slug'), s.get('vendor'), s.get('price'), s.get('url')))
    if not keep and src:
        emptied.append((c.get('slug'), c.get('name'), [s.get('vendor') for s in drop]))
        continue  # drop the whole compound
    c['sources'] = keep
    new_comp.append(c)

after_sources = sum(len(c.get('sources', [])) for c in new_comp)
print(f"\ncompounds: {before_compounds} -> {len(new_comp)}")
print(f"sources:   {before_sources} -> {after_sources}  (removed {before_sources-after_sources})")
print(f"\nremoved source entries: {len(removed)}")
print(f"compounds deleted (all sources gone): {len(emptied)}")
for e in emptied:
    print("   -", e[0], "|", e[1], "|", e[2])

print("\nremovals by vendor:")
for v, n in Counter(r[1] for r in removed).most_common():
    print(f"  {n:3d}  {v}")

stamp = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
shutil.copy(COMP, f'{BASE}/scripts/compounds.json.bak.{stamp}')
json.dump(new_comp, open(COMP, 'w'), indent=2, ensure_ascii=False)
json.dump([{'slug': r[0], 'vendor': r[1], 'price': r[2], 'url': r[3]} for r in removed],
          open(f'{BASE}/scripts/removed_delisted_{stamp}.json', 'w'), indent=1)
print(f"\nbackup: scripts/compounds.json.bak.{stamp}")
