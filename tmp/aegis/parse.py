#!/usr/bin/env python3
import json, os, re, glob

d = os.path.dirname(os.path.abspath(__file__))
res = {}
for f in sorted(glob.glob(os.path.join(d, "*.html"))):
    slug = os.path.basename(f).replace(".html", "")
    html = open(f, encoding="utf-8", errors="replace").read()

    def first(pats):
        for p in pats:
            m = re.search(p, html, re.S | re.I)
            if m:
                return m.group(1).strip()
        return None

    # og:image
    og = first([r'property="og:image"\s+content="([^"]+)"',
                r'property="og:image" content="([^"]+)"'])
    # canonical
    canon = first([r'<link rel="canonical" href="([^"]+)"'])
    # JSON-LD product blocks
    blocks = re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', html, re.S)
    info = []
    for b in blocks:
        try:
            j = json.loads(b)
        except Exception:
            continue
        arr = j if isinstance(j, list) else [j]
        for ent in arr:
            if not isinstance(ent, dict):
                continue
            t = ent.get("@type")
            if isinstance(t, list):
                t = t[0]
            if t in ("Product", "product"):
                nm = ent.get("name")
                off = ent.get("offers", {})
                info.append({
                    "name": nm,
                    "price": off.get("price") if isinstance(off, dict) else None,
                    "currency": off.get("priceCurrency") if isinstance(off, dict) else None,
                    "avail": off.get("availability") if isinstance(off, dict) else None,
                })
    # gallery images (woocommerce) via data attr or wpgs
    imgs = re.findall(r'<img[^>]+src="([^"]+)"[^>]*class="[^"]*wp-post-image[^"]*"', html)
    if not imgs:
        imgs = re.findall(r'property="og:image"[^>]*content="([^"]+)"', html)
    res[slug] = {
        "og": og,
        "canonical": canon,
        "ld": info,
        "title_tag": first([r'<title>([^<]+)</title>']),
        "h1": first([r'<h1[^>]*>(.*?)</h1>']),
    }

print(json.dumps(res, indent=2))
