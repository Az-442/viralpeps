#!/usr/bin/env python3
"""Inspect compounds.json structure."""
import json

d = json.load(open('/Users/time4you/viralpeps/src/data/compounds.json'))
print(type(d), len(d))
c = d[0]
print('top keys:', list(c.keys()))
print(json.dumps(c.get('sources', [])[:1], indent=2)[:800])
