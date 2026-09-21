#!/usr/bin/env python3
import json
d = json.load(open('src/data/compounds.json'))
# find a crown-peptides source example
for it in d:
    for s in it.get('sources', []):
        if isinstance(s, dict) and '/crown-peptides/' in s.get('image',''):
            print("compound:", it['slug'])
            print("vendor name used:", s.get('vendor'))
            print("image:", s.get('image'))
            print("^^^^^^^^^")
            break
    else:
        continue
    break
# Also confirm leolab folder usage pattern in compounds
for it in d:
    for s in it.get('sources', []):
        if isinstance(s, dict) and '/leolab/' in s.get('image',''):
            print("LEOLAB example compound:", it['slug'], "vendor field:", s.get('vendor'), "img", s.get('image'))
            break
    else:
        continue
    break
