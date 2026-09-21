#!/usr/bin/env python3
"""MANDATORY GUARD: title-content check on every source URL for the 4 suppliers."""
import json, re, ssl, urllib.request

ctx = ssl._create_unverified_context()
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122 Safari/537.36'}
c = json.load(open('src/data/compounds.json'))

VENDORS = ['PeptX', 'Claripep', 'VialVerse', 'Kings BioLabs']
BANNED = re.compile(r'/(shop|products|category|collections)(/|$)', re.I)

urls = {}
for comp in c:
    for s in comp.get('sources', []):
        if s.get('vendor') in VENDORS:
            urls.setdefault((s['vendor'], s['url']), []).append(comp['slug'])

print(f"unique URLs to check: {len(urls)}\n")
results = {}
bad = []
for (vendor, url), comps in sorted(urls.items()):
    if BANNED.search(url):
        print(f"REJECT-CATEGORY {vendor:12s} {url}")
        bad.append((vendor, url, 'category-page'))
        continue
    try:
        req = urllib.request.Request(url, headers=UA)
        resp = urllib.request.urlopen(req, timeout=25, context=ctx)
        html = resp.read().decode('utf-8', errors='ignore')
        code = resp.getcode()
        t = re.search(r'<title>(.*?)</title>', html, re.I | re.S)
        title = re.sub(r'\s+', ' ', t.group(1).strip()) if t else 'NO TITLE'
        # soft-404 heuristic: title equals generic site name
        generic = ('peptx,' in title.lower() and 'single vial' not in title.lower())
        flag = 'SOFT404' if generic else 'OK'
        if generic:
            bad.append((vendor, url, 'soft-404'))
        results[(vendor, url)] = (code, title[:95], flag)
    except Exception as e:
        results[(vendor, url)] = ('ERR', str(e)[:60], 'ERR')
        bad.append((vendor, url, str(e)[:50]))

for v in VENDORS:
    rows = [(u, r) for (vv, u), r in results.items() if vv == v]
    print(f"\n=== {v} ({len(rows)} URLs) ===")
    for u, (code, title, flag) in sorted(rows):
        mark = '  ' if flag == 'OK' else '!!'
        print(f"{mark} {str(code):4s} {flag:8s} {u}")
        print(f"      {title}")

print(f"\n\nBAD URLs: {len(bad)}")
for b in bad:
    print("  ", b)
json.dump({f"{k[0]}|{k[1]}": v for k, v in results.items()}, open('tmp/guard_urls.json', 'w'), indent=2)
