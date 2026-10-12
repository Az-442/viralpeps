#!/usr/bin/env python3
"""Proper dedupe: extract real article slugs from research.ts and research-content.ts."""
import os
import re

os.chdir('/Users/time4you/viralpeps')

rc = open('src/data/research-content.ts', encoding='utf-8').read()
rt = open('src/data/research.ts', encoding='utf-8').read()

# research-content.ts: keys of the `content` Record: at start of line, quoted, followed by ': {'
rc_keys = set(re.findall(r"^['\"]([a-z0-9][a-z0-9-]*)['\"]\s*:\s*\{", rc, re.M))

# research.ts guides array: `slug: "..."` or `slug: '...'`
rt_slugs = set(re.findall(r"slug:\s*['\"]([a-z0-9][a-z0-9-]*)['\"]", rt))

print('research-content.ts keys:', len(rc_keys))
print('research.ts slugs     :', len(rt_slugs))

# Day 20 planned slugs
plan = ['p21-vs-semax', 'weight-loss-peptide-suppliers-uk', 'cheapest-peptides-uk']
print('\n=== Day 20 dedupe ===')
for s in plan:
    print(f'  {s:38s} rc={s in rc_keys}  guides={s in rt_slugs}')

# near-dupes for safety
print('\n=== near matches (semax / weight-loss / cheap) ===')
for s in sorted(rc_keys | rt_slugs):
    if 'semax' in s or 'weight-loss' in s or 'cheap' in s or 'p21' in s:
        print('  ', s)

# also count: slugs only in rc (content without registry) and only in registry
only_rc = rc_keys - rt_slugs
only_rt = rt_slugs - rc_keys
print('\nrc-only (no registry):', len(only_rc))
print('registry-only (no content):', len(only_rt))
print('registry-only list:', sorted(only_rt))
