#!/usr/bin/env python3
"""Check which target compound slugs exist in compounds.json + variant/compareSlug status."""
import json

c = json.load(open('src/data/compounds.json'))
by_slug = {x['slug']: x for x in c}

targets = ['tirzepatide','semaglutide','retatrutide','bpc-157','ghk-cu','tesamorelin','mots-c',
 'ss-31','selank','semax','kisspeptin','pt-141','nad-plus','eloralintide','kpv','sermorelin',
 'ipamorelin','dsip','mt-1','mt-2','ahk-cu','5-amino-1mq','ara-290','cartalax','pe-22-28',
 'mazdutide','thymosin-alpha-1','klow-blend','glutathione','l-carnitine','oxytocin-acetate']

print("=== target slug status ===")
for t in targets:
    if t in by_slug:
        x = by_slug[t]
        srcs = x.get('sources', [])
        vendors = sorted(set(s.get('vendor') for s in srcs))
        print(f"{t:20s} EXISTS  sources={len(srcs):2d} compareSlug={x.get('compareSlug','-'):20s} vendors={len(vendors)}")
    else:
        # look for near matches
        near = [k for k in by_slug if k.startswith(t)]
        print(f"{t:20s} MISSING  near={near[:6]}")

print()
print("=== total compounds ===", len(c))
print()
# Task 2/3/4 supplier names check
v = json.load(open('src/data/vendors.json'))
names = [x['name'] for x in v]
print("existing vendor names:")
for n in names:
    print("  ", n)
for cand in ['Claripep','VialVerse','Kings Bio Labs','Kings BioLabs']:
    print(f"  -> {cand} present?", cand in names)
