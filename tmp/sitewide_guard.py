#!/usr/bin/env python3
"""
SITE-WIDE soft-404 sweep — apply the new guards to EVERY source URL in the catalogue.
Reports category-page URLs and soft-404s. Read-only (no writes).
"""
import json, re, ssl, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

ctx = ssl._create_unverified_context()
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122 Safari/537.36'}
c = json.load(open('src/data/compounds.json'))

BANNED = re.compile(r'/(shop|products|category|collections|product-category)(/|$|\?)', re.I)
urls = {}
for comp in c:
    for s in comp.get('sources', []):
        u = s.get('url', '')
        if u and u.startswith('http') and 'example.com' not in u:
            urls.setdefault(u, set()).add(s.get('vendor'))

print(f"total unique URLs in catalogue: {len(urls)}")
cat = [u for u in urls if BANNED.search(u)]
print(f"\ncategory-page URLs (guard 2): {len(cat)}")
for u in cat[:30]:
    print("  ", u)

def check(u):
    try:
        req = urllib.request.Request(u, headers=UA)
        resp = urllib.request.urlopen(req, timeout=20, context=ctx)
        html = resp.read().decode('utf-8', errors='ignore')
        t = re.search(r'<title>(.*?)</title>', html, re.I | re.S)
        title = re.sub(r'\s+', ' ', t.group(1).strip()) if t else 'NO TITLE'
        return (u, resp.getcode(), title[:90])
    except Exception as e:
        return (u, 'ERR', str(e)[:60])

print("\nchecking all URLs (GET + title)...")
res = []
with ThreadPoolExecutor(max_workers=12) as ex:
    futs = {ex.submit(check, u): u for u in urls}
    for i, f in enumerate(as_completed(futs), 1):
        res.append(f.result())

errs = [r for r in res if r[1] != 200]
print(f"\n=== NON-200 / ERRORS: {len(errs)} ===")
for u, code, title in sorted(errs):
    print(f"  {str(code):5s} {u}")
    print(f"        {title}")

# soft-404 heuristic: title looks like a generic site name
print("\n=== possible soft-404s (generic-looking titles) ===")
susp = []
for u, code, title in res:
    tl = title.lower()
    if code == 200 and ('404' in tl or 'page not found' in tl or 'not found' in tl):
        susp.append((u, code, title))
for u, code, title in susp:
    print(f"  {u}\n      {title}")
print(f"  count: {len(susp)}")

json.dump([{'url': u, 'code': c_, 'title': t} for u, c_, t in res], open('tmp/sitewide_url_sweep.json', 'w'), indent=2)
print("\nsaved tmp/sitewide_url_sweep.json")
