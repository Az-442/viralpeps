#!/usr/bin/env python3
"""Scrape VialVerse per-variant dose + price, then set the dosage field on each
source entry using the LOWEST single-unit price (per task instruction)."""
import json, re, ssl, urllib.request

ctx = ssl._create_unverified_context()
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122 Safari/537.36'}
DATA = 'src/data/compounds.json'
c = json.load(open(DATA))

def get(u):
    req = urllib.request.Request(u, headers=UA)
    return urllib.request.urlopen(req, timeout=30, context=ctx).read().decode('utf-8', errors='ignore')

urls = sorted({s['url'] for comp in c for s in comp.get('sources', [])
               if s.get('vendor') == 'VialVerse' and not s.get('dosage')})
print(f"VialVerse URLs needing dosage: {len(urls)}\n")

results = {}
for u in urls:
    try:
        h = get(u)
        # variant structure: look for combinations of mg label + price
        pairs = re.findall(r'([0-9]+(?:\.[0-9])?\s*(?:mg|mcg|ml|iu|g))\b[^{}]{0,180}?"?price"?\s*:?\s*"?([0-9]+\.[0-9]{2})', h, re.I)
        if not pairs:
            # alternate: price then label
            pairs = re.findall(r'"?(?:price)"?\s*:?\s*"?([0-9]+\.[0-9]{2})"?[^{}]{0,180}?([0-9]+(?:\.[0-9])?\s*(?:mg|mcg|ml|iu))', h, re.I)
            pairs = [(b, a) for a, b in pairs]
        # clean + dedupe preserving order
        seen = []
        for dose, price in pairs:
            d = re.sub(r'\s+', '', dose).lower()
            if (d, price) not in seen:
                seen.append((d, price))
        results[u] = seen
    except Exception as e:
        results[u] = f'ERR {e}'

apply = {}
for u, pairs in results.items():
    if isinstance(pairs, str):
        print(f"  {u}\n      {pairs[:80]}")
        continue
    print(f"  {u}\n      {pairs[:10]}")
    if pairs:
        # cheapest
        best = min(pairs, key=lambda x: float(x[1]))
        apply[u] = best

print(f"\n=== resolved {len(apply)} URLs ===")
for u, (dose, price) in apply.items():
    print(f"  {dose:10s} £{price:8s} {u}")

json.dump(apply, open('tmp/vialverse_doses.json', 'w'), indent=2)
