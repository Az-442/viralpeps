#!/usr/bin/env python3
"""Sweep Octagon product URLs: HTTP status + stock markers."""
import json
import subprocess

with open('/Users/time4you/viralpeps/src/data/compounds.json') as f:
    data = json.load(f)

urls = []
for comp in data:
    for src in comp.get('sources', []):
        if src.get('vendor') == 'Octagon Peptides' and src.get('url'):
            urls.append((comp.get('name'), src.get('url')))

# dedupe
seen = set()
uniq = []
for name, u in urls:
    if u not in seen:
        seen.add(u)
        uniq.append((name, u))

print(f"Unique Octagon URLs: {len(uniq)}")
for name, u in uniq:
    try:
        r = subprocess.run(["curl", "-sL", "--max-time", "20", "-o", "/dev/null", "-w", "%{http_code}", u],
                           capture_output=True, text=True, timeout=40)
        code = r.stdout.strip()
        # also fetch body to check markers for non-200
        marker = ""
        if code != "200":
            r2 = subprocess.run(["curl", "-sL", "--max-time", "20", u], capture_output=True, text=True, timeout=40)
            html = r2.stdout.lower()
            if "page not found" in html or "404" in html[:2000]:
                marker = "PAGE_NOT_FOUND"
            elif "out of stock" in html and "add to cart" not in html:
                marker = "OOS_BADGE"
            else:
                marker = "check_manually"
        print(f"{code} {marker:15s} {name:40s} {u}")
    except Exception as e:
        print(f"ERR  {str(e)[:40]:15s} {name:40s} {u}")
