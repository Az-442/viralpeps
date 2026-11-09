#!/usr/bin/env python3
import json
d = json.load(open('/Users/time4you/.hermes/cron/jobs.json'))
jobs = d if isinstance(d, list) else d.get('jobs', d)
if isinstance(jobs, dict):
    jobs = list(jobs.values())
for j in jobs:
    s = json.dumps(j).lower()
    if 'viralpeps' in s or 'delist' in s:
        print(j.get('id'), '|', j.get('name'), '|', j.get('schedule'), '|', j.get('status'), '|', j.get('last_run_at'))
