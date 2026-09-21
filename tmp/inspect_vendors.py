#!/usr/bin/env python3
import json
d = json.load(open('src/data/vendors.json'))
print('VENDOR COUNT:', len(d))
print('KEYS:', list(d[0].keys()))
print('SLUGS:', [v.get('slug') for v in d])
