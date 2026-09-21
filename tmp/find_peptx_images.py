#!/usr/bin/env python3
"""Find the PeptX product image endpoint by inspecting the JS bundle + page payload."""
import re, ssl, urllib.request, json

ctx = ssl._create_unverified_context()
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122 Safari/537.36'}

def get(url):
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=30, context=ctx).read().decode('utf-8', errors='ignore')

# Look for the API/asset base and any image path templates in the JS bundle
js = get('https://peptx.co.uk/assets/index-1RPc8p28.js')
print("bundle len", len(js))
for pat in [r'__l5e[^"\'`]{0,80}', r'/single-vials/[^"\'`]{0,40}', r'vial[^"\'`]{0,60}\.(webp|png|jpg)']:
    m = set(re.findall(pat, js))
    print(f"\n--- pattern {pat} ({len(m)}) ---")
    for x in list(m)[:20]:
        print("  ", x)

# asset path template
m = set(re.findall(r'["\'`]([^"\'`]{0,120}assets-v1[^"\'`]{0,80})["\'`]', js))
print("\n--- assets-v1 refs ---")
for x in list(m)[:20]:
    print("  ", x)

# product slug -> image mapping
m = set(re.findall(r'(products?/[a-z0-9\-]{2,40}\.(?:webp|png|jpg|avif))', js, re.I))
print("\n--- product image refs ---")
for x in list(m)[:30]:
    print("  ", x)
