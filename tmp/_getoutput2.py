#!/usr/bin/env python3
import json
d = json.load(open('/Users/time4you/.hermes/cron/jobs.json'))
jobs = d if isinstance(d, list) else d.get('jobs', d)
if isinstance(jobs, dict):
    jobs = list(jobs.values())
for j in jobs:
    if j.get('id') == '804893dcd578':
        print('SCRIPT:', j.get('script'))
        print('NO_AGENT:', j.get('no_agent'))
        print('WORKDIR:', j.get('workdir'))
        print('LAST_STATUS:', j.get('last_status'), j.get('last_error'))
