#!/usr/bin/env python3
import json, re
d = json.load(open('/Users/time4you/.hermes/cron/jobs.json'))
jobs = d if isinstance(d, list) else d.get('jobs', d)
if isinstance(jobs, dict):
    jobs = list(jobs.values())
for j in jobs:
    if j.get('id') == '804893dcd578':
        out = j.get('last_output') or j.get('last_result') or j.get('output') or ''
        if not out:
            print('KEYS:', [k for k in j.keys()])
        else:
            open('/Users/time4you/viralpeps/tmp/_scraper_output.txt', 'w').write(out if isinstance(out, str) else json.dumps(out, indent=1))
            print('WROTE', len(out))
