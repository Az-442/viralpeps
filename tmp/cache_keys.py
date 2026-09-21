#!/usr/bin/env python3
import json
c=json.load(open('src/data/trustscore-autocheck.json'))
print("cache keys count:", len(c))
if isinstance(c, dict):
    for k in list(c.keys()):
        print(" ", k)
