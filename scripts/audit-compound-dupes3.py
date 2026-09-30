#!/usr/bin/env python3
"""Classify duplicate compounds: which are safe to merge + redirect."""
import json, re
from collections import defaultdict

c = json.load(open('src/data/compounds.json'))
comps = c if isinstance(c, list) else c.get('compounds', [])

def norm(n):
    n = n.lower()
    n = re.sub(r'\s*\(.*?\)\s*', ' ', n)
    n = re.sub(r'\s*\d+\s*(mg|mcg|g|iu|ml)\b', ' ', n)
    n = re.sub(r'[^a-z0-9]+', '', n)
    return n

# Build canonical: the entry in each name-group with the MOST sources
byname = defaultdict(list)
for x in comps:
    byname[norm(x.get('name',''))].append(x)

# Global URL -> set of compound ids
urlmap = defaultdict(set)
for x in comps:
    for s in x.get('sources',[]):
        u=(s.get('url') or '').strip().lower()
        if u: urlmap[u].add(x['id'])

canonical = {}
for k, v in byname.items():
    if len(v) > 1:
        winner = max(v, key=lambda z: len(z.get('sources',[])))
        canonical[k] = winner['id']

cats = {"exact_url_dupe": [], "unique_urls": [], "empty": [], "redirect_tag": []}

for k, v in sorted(byname.items()):
    if len(v) <= 1:
        continue
    win = canonical[k]
    for x in v:
        if x['id'] == win:
            continue
        cid = x['id']
        srcs = x.get('sources',[])
        if len(srcs)==0:
            cats['empty'].append((cid, win))
            continue
        if cid.endswith('-redirect'):
            cats['redirect_tag'].append((cid, win, len(srcs)))
            continue
        # are ALL this entry's urls already inside the canonical entry?
        winurls = set()
        for w in byname[k]:
            if w['id']==win:
                winurls = {(s.get('url') or '').strip().lower() for s in w.get('sources',[])}
        myurls = {(s.get('url') or '').strip().lower() for s in srcs}
        if myurls and myurls.issubset(winurls):
            cats['exact_url_dupe'].append((cid, win, len(srcs)))
        else:
            cats['unique_urls'].append((cid, win, len(srcs)))

for cat, items in cats.items():
    print("\n=== %s : %d ===" % (cat.upper(), len(items)))
    for it in items:
        print("   %-50s -> %-30s (src=%s)" % (it[0], it[1], it[2] if len(it)>2 else ''))

print("\n--- SUMMARY ---")
print("total compounds:", len(comps))
print("name-collision groups:", len([k for k,v in byname.items() if len(v)>1]))
print("exact_url_dupe (SAFE to merge+redirect):", len(cats['exact_url_dupe']))
print("+ empty (SAFE to delete+redirect):", len(cats['empty']))
print("+ redirect_tag (SAFE):", len(cats['redirect_tag']))
print("unique_urls (NEED REVIEW — carry unique sources):", len(cats['unique_urls']))
