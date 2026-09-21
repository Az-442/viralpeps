#!/usr/bin/env python3
"""Point duplicate Claripep dose-variant images at a single canonical file
(cjc-1295 5mg/10mg and ghk-cu 50mg/200mg share one product photo)."""
import json
DATA='src/data/compounds.json'
c=json.load(open(DATA))
remap = {
    '/images/products/claripep/cjc-1295-5mg.webp': '/images/products/claripep/cjc-1295.webp',
    '/images/products/claripep/ghk-cu-50mg.webp':  '/images/products/claripep/ghk-cu.webp',
}
n=0
for comp in c:
    for s in comp.get('sources',[]):
        if s.get('vendor')=='Claripep' and s.get('image') in remap:
            print(f"  {comp['slug']:14s} {s.get('dosage','-'):7s} {s['image']} -> {remap[s['image']]}")
            s['image']=remap[s['image']]
            n+=1
json.dump(c, open(DATA,'w'), indent=2)
print('remapped', n)
