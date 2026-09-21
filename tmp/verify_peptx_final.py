#!/usr/bin/env python3
"""Final verification of the PeptX fix."""
import json, os, hashlib, re

c = json.load(open('src/data/compounds.json'))
entries = []
for comp in c:
    for s in comp.get('sources', []):
        if s.get('vendor') == 'PeptX':
            entries.append((comp['slug'], s))

print(f"PeptX source entries: {len(entries)}")
print()
bad_url = [ (sl,s) for sl,s in entries if not re.fullmatch(r'https://peptx\.co\.uk/single-vials/[a-z0-9\-]+', s.get('url','')) ]
bad_img = [ (sl,s) for sl,s in entries if not s.get('image','').startswith('/images/products/peptx/') or not os.path.exists('public'+s.get('image','')) ]
bad_price = [ (sl,s) for sl,s in entries if not s.get('price','').startswith('£') ]
nodosage = [ (sl,s) for sl,s in entries if not s.get('dosage') ]

print("URLs not matching /single-vials/<slug>:", [ (a,b.get('url')) for a,b in bad_url ] or "NONE")
print("Images missing on disk             :", [ (a,b.get('image')) for a,b in bad_img ] or "NONE")
print("Prices not £-prefixed              :", [ (a,b.get('price')) for a,b in bad_price ] or "NONE")
print("No dosage                          :", [ (a,b.get('price')) for a,b in nodosage ] or "NONE")
print()

# duplicates
from collections import Counter
cnt = Counter((sl, s.get('url')) for sl,s in entries)
dups = {k:v for k,v in cnt.items() if v>1}
print("duplicate (compound,url) pairs:", dups or "NONE")
print()

# image uniqueness
hashes = {}
for sl, s in entries:
    p = 'public' + s['image']
    h = hashlib.md5(open(p,'rb').read()).hexdigest()
    hashes.setdefault(h, []).append(sl)
shared = {k:v for k,v in hashes.items() if len(v)>1}
print("images sharing identical bytes:", shared or "NONE (all unique)")
print()
print("=== FINAL LIST ===")
for sl, s in sorted(entries):
    print(f"  {sl:20s} {s.get('price'):8s} {s.get('dosage','-'):8s} {s['url']}")
