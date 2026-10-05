#!/usr/bin/env python3
"""Remove verified-delisted source entries from compounds.json.

Verified by browser on 2026-10-05. Only entries whose URLs returned a genuine
404 AND whose product is absent from the vendor's live catalog are removed.

A compound is removed ONLY if it had sources before AND all of them were
deleted by this run (i.e. it becomes newly empty). Pre-existing source-less
compounds are left untouched.
"""
import json
import shutil
from datetime import datetime

PATH = '/Users/time4you/viralpeps/src/data/compounds.json'

TO_DELETE = {
    'SupplyPeptides': {
        'https://supplypeptides.co.uk/products/tirz-20mg',      # tirzepatide
        'https://supplypeptides.co.uk/products/retatrutide',    # retatrutide
        'https://supplypeptides.co.uk/products/sema',           # semaglutide
    },
    'Precision Peptides': {
        'https://precision-peptides.shop/product/glp-2-tirz-15mg/',  # tirzepatide
        'https://precision-peptides.shop/product/glp-2-tirz-30mg/',  # tirzepatide
        'https://precision-peptides.shop/product/glp-3-reta-10mg/',  # retatrutide
        'https://precision-peptides.shop/product/glp-3-reta-20mg/',  # retatrutide
    },
}

stamp = datetime.now().strftime('%Y%m%d_%H%M%S')
backup = f'{PATH}.bak.delisted_{stamp}'
shutil.copy2(PATH, backup)
print(f'Backup: {backup}')

data = json.load(open(PATH))
before_compounds = len(data)
before_sources = sum(len(c.get('sources', [])) for c in data)

removed_sources = []
removed_compounds = []
new_data = []
for c in data:
    sources = c.get('sources', [])
    kept = [s for s in sources
            if not (s.get('vendor') in TO_DELETE and s.get('url') in TO_DELETE[s.get('vendor')])]
    n_deleted = len(sources) - len(kept)
    for s in sources:
        if s.get('vendor') in TO_DELETE and s.get('url') in TO_DELETE[s.get('vendor')]:
            removed_sources.append((s.get('vendor'), c.get('slug'), s.get('url')))

    # Remove compound ONLY if it HAD sources and ALL of them were deleted now.
    if sources and not kept:
        removed_compounds.append(c.get('slug'))
        continue
    c['sources'] = kept
    new_data.append(c)

after_sources = sum(len(c.get('sources', [])) for c in new_data)

print(f'\nCompounds: {before_compounds} -> {len(new_data)}')
print(f'Sources:   {before_sources} -> {after_sources}')
print(f'\nRemoved {len(removed_sources)} source entries:')
for r in removed_sources:
    print('   ', r)
print(f'\nCompounds removed (became empty): {removed_compounds or "none"}')

json.dump(new_data, open(PATH, 'w'), indent=2, ensure_ascii=False)
print('\nWritten.')
