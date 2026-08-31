#!/usr/bin/env python3
"""Inspect compounds.json structure and Octagon Peptides entries."""
import json

with open('/Users/time4you/viralpeps/src/data/compounds.json') as f:
    data = json.load(f)

print("TYPE:", type(data).__name__)
if isinstance(data, dict):
    print("KEYS:", list(data.keys())[:10])
    # find octagon
    for k, v in data.items():
        s = json.dumps(v).lower()
        if 'octagon' in s:
            print("FOUND octagon in top-level key:", k)
    # if list of compounds under a key
    for k, v in data.items():
        if isinstance(v, list):
            print("LIST under key:", k, "len:", len(v))
            if v:
                print("sample:", json.dumps(v[0])[:800])
elif isinstance(data, list):
    print("LIST len:", len(data))
    if data:
        print("sample:", json.dumps(data[0], indent=2)[:1500])
