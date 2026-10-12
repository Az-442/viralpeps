#!/usr/bin/env python3
"""Validate every internal link in the three Day-20 articles against
compounds.json slugs + research.ts slugs (both quote formats) + research-content.ts keys."""
import json
import os
import re

os.chdir('/Users/time4you/viralpeps')

compounds = json.load(open('src/data/compounds.json'))
compound_slugs = {c.get('slug') for c in compounds if c.get('slug')}
vendor_data = json.load(open('src/data/vendors.json'))
vendor_slugs = {v.get('slug') for v in vendor_data if v.get('slug')}

rc = open('src/data/research-content.ts', encoding='utf-8').read()
rt = open('src/data/research.ts', encoding='utf-8').read()

research_slugs = set(re.findall(r"^['\"]([a-z0-9][a-z0-9-]*)['\"]\s*:\s*\{", rc, re.M))
research_slugs |= set(re.findall(r"slug:\s*['\"]([a-z0-9][a-z0-9-]*)['\"]", rt))
research_slugs |= set(re.findall(r"^\s*['\"]([a-z0-9][a-z0-9-]*)['\"]\s*:", rc, re.M))

# extract the three articles' text
for slug in ['p21-vs-semax', 'weight-loss-peptide-suppliers-uk', 'cheapest-peptides-uk']:
    m = re.search(r"^'" + re.escape(slug) + r"':\s*\{", rc, re.M)
    start = m.start()
    # find end (next top-level key or tail)
    nxt = re.search(r"\n'[a-z0-9-]+':\s*\{", rc[start + 10:])
    end = start + 10 + nxt.start() if nxt else rc.index('\n\n};\nexport default content;', start)
    body = rc[start:end]
    links = re.findall(r"\]\((/(?:compounds|research|vendors)/[a-z0-9-]+)\)", body)
    print(f'\n=== {slug} === ({len(links)} links)')
    bad = []
    for href in links:
        if href.startswith('/compounds/'):
            ok = href.split('/')[2] in compound_slugs
        elif href.startswith('/vendors/'):
            ok = href.split('/')[2] in vendor_slugs
        elif href.startswith('/research/'):
            ok = href.split('/')[2] in research_slugs
        else:
            ok = False
        status = 'OK ' if ok else 'BROKEN'
        if not ok:
            bad.append(href)
        print(f'  [{status}] {href}')
    if bad:
        print('  !! BROKEN:', bad)
