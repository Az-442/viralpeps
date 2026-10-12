#!/usr/bin/env python3
"""Cross-check every guide-card image ref across research.ts against disk."""
import os
import re

os.chdir('/Users/time4you/viralpeps')
rt = open('src/data/research.ts', encoding='utf-8').read()
refs = re.findall(r"image:\s*[\"']([a-z0-9-]+)[\"']", rt)
missing = []
for r in refs:
    p = f'public/images/guides/{r}.png'
    if not os.path.exists(p):
        missing.append((r, p))
print('total image refs:', len(refs))
print('missing:', missing)
# confirm our three exist
for slug in ['p21-vs-semax', 'weight-loss-peptide-suppliers-uk', 'cheapest-peptides-uk']:
    p = f'public/images/guides/{slug}.png'
    print(f'  {slug}: exists={os.path.exists(p)} size={os.path.getsize(p) if os.path.exists(p) else 0}')
