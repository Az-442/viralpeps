#!/usr/bin/env python3
"""Extract the full PeptX real product-image map from the JS bundle."""
import re, ssl, urllib.request, json

ctx = ssl._create_unverified_context()
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122 Safari/537.36'}
req = urllib.request.Request('https://peptx.co.uk/assets/index-1RPc8p28.js', headers=UA)
js = urllib.request.urlopen(req, timeout=30, context=ctx).read().decode('utf-8', errors='ignore')

# All assets-v1 image paths
imgs = sorted(set(re.findall(r'/__l5e/assets-v1/[0-9a-f\-]+/[A-Za-z0-9_\-\.]+\.(?:webp|png|jpg|avif)', js)))
print(f"total asset images: {len(imgs)}")

# Try to find the product object: look for occurrences of {slug: "...", name: "...", image: "..."}
# Find the data array region
for key in ['"slug"', 'slug:', 'img:', 'image:']:
    c = js.count(key)
    print(f"  occurrence of {key!r}: {c}")

# Extract windows around each image ref to find the accompanying slug/price
recs = []
for m in re.finditer(r'/__l5e/assets-v1/[0-9a-f\-]+/[A-Za-z0-9_\-\.]+\.(?:webp|png|jpg|avif)', js):
    start = max(0, m.start() - 400)
    end = min(len(js), m.end() + 200)
    ctxw = js[start:end]
    slugs = re.findall(r'slug:"([a-z0-9\-]+)"', ctxw)
    names = re.findall(r'name:"([^"]{2,50})"', ctxw)
    recs.append({'img': m.group(0), 'slug': slugs[-1] if slugs else None, 'name': names[-1] if names else None})

# Dedupe by img
seen = {}
for r in recs:
    if r['img'] not in seen:
        seen[r['img']] = r

json.dump(seen, open('tmp/peptx_imgmap_raw.json', 'w'), indent=2)
print(f"\nunique images with context: {len(seen)}")
for k, v in list(seen.items()):
    print(f"  {str(v['slug']):28s} {str(v['name']):28s} {k.split('/')[-1]}")
