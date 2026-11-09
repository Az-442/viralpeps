#!/usr/bin/env python3
import json
from collections import Counter
r = json.load(open('/Users/time4you/viralpeps/scripts/scan_20261109.json'))
bad = [x for x in r if x['status'] in (404, 410) or x.get('nf')]
print(len(bad))
for x in bad:
    print(x['status'], x['vendor'], '|', x['compound'], '|', x['url'])
