#!/usr/bin/env python3
"""Dry-run: show which compounds lose sources and which become empty."""
import json

PATH = '/Users/time4you/viralpeps/src/data/compounds.json'
TO_DELETE = {
    'SupplyPeptides': {
        'https://supplypeptides.co.uk/products/tirz-20mg',
        'https://supplypeptides.co.uk/products/retatrutide',
        'https://supplypeptides.co.uk/products/sema',
    },
    'Precision Peptides': {
        'https://precision-peptides.shop/product/glp-2-tirz-15mg/',
        'https://precision-peptides.shop/product/glp-2-tirz-30mg/',
        'https://precision-peptides.shop/product/glp-3-reta-10mg/',
        'https://precision-peptides.shop/product/glp-3-reta-20mg/',
    },
}

data = json.load(open(PATH))
for c in data:
    sources = c.get('sources', [])
    hits = [s for s in sources if s.get('vendor') in TO_DELETE and s.get('url') in TO_DELETE[s.get('vendor')]]
    if hits:
        remaining = [s.get('vendor') for s in sources if s not in hits]
        print(f"{c.get('slug'):30s} total={len(sources):2d} removing={len(hits)} remaining_vendors={remaining}")
