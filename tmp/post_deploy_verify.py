#!/usr/bin/env python3
"""POST-DEPLOY live verification: every PeptX link on the live site + the 3 vendor pages."""
import json, re, ssl, urllib.request
ctx = ssl._create_unverified_context()
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122 Safari/537.36'}

def get(u):
    req = urllib.request.Request(u, headers=UA)
    r = urllib.request.urlopen(req, timeout=30, context=ctx)
    return r.getcode(), r.read().decode('utf-8', errors='ignore')

c = json.load(open('src/data/compounds.json'))
peptx = [(comp['slug'], s['url']) for comp in c for s in comp.get('sources', []) if s.get('vendor') == 'PeptX']
print(f"PeptX listings in data: {len(peptx)}\n")

# 1. verify each compound page on the LIVE site exposes the peptx link
missing = []
for slug, url in peptx:
    try:
        code, html = get(f"https://www.viralpeps.co.uk/compounds/{slug}")
        fragment = url.replace('https://peptx.co.uk', '')
        if code != 200 or fragment not in html:
            missing.append((slug, code, fragment))
    except Exception as e:
        missing.append((slug, 'ERR', str(e)[:40]))
print(f"compound pages missing the PeptX link: {len(missing)}")
for m in missing:
    print("   ", m)

# 2. verify the 3 vendor profile pages
print("\nvendor profile pages:")
for s in ['peptx', 'claripep', 'vialverse']:
    try:
        code, html = get(f"https://www.viralpeps.co.uk/vendors/{s}")
        t = re.search(r'<title>(.*?)</title>', html, re.S)
        print(f"  {s:12s} HTTP {code}  {(t.group(1).strip() if t else '?')[:60]}")
    except Exception as e:
        print(f"  {s:12s} ERR {e}")

# 3. confirm Kings BioLabs is gone everywhere
print("\nkings-bio-labs references still in data:")
kb = [comp['slug'] for comp in c for s in comp.get('sources', []) if s.get('vendor') == 'Kings BioLabs']
print("   ", kb or "NONE")
