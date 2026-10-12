import json, ssl, urllib.request, re

slugs = ["glow-bpc-157-tb-500-ghk-cu","wolverine-bpc-157-tb-500","bpc-157","ghk-cu",
         "bacteriostatic-water","melanotan-ii","reta","selank","semax","tb-500"]
ctx = ssl._create_unverified_context()
for s in slugs:
    u = f"https://kingstonpeptides.com/en/products/{s}"
    req = urllib.request.Request(u, headers={'User-Agent':'Mozilla/5.0'})
    b = urllib.request.urlopen(req, timeout=20, context=ctx).read().decode('utf-8','ignore')
    # json-ld full
    ld = re.findall(r'<script type="application/ld\+json">(.*?)</script>', b, re.S)
    prod = [x for x in ld if '"Product"' in x]
    print("=== ", s)
    if prod:
        d = json.loads(prod[0])
        print("  name:", d.get('name'))
        print("  offers:", json.dumps(d.get('offers'))[:400])
        print("  image:", d.get('image'))
    # find variant/size text
    sizes = re.findall(r'\b(\d+(?:\.\d+)?\s*(?:mg|mcg|ml|g))\b', b)
    print("  sizes seen:", list(dict.fromkeys(sizes))[:10])
