import json, ssl, urllib.request, re

slugs = ["glow-bpc-157-tb-500-ghk-cu","wolverine-bpc-157-tb-500","bpc-157","ghk-cu",
         "bacteriostatic-water","melanotan-ii","reta","selank","semax","tb-500"]
ctx = ssl._create_unverified_context()
for s in slugs:
    u = f"https://kingstonpeptides.com/en/products/{s}"
    try:
        req = urllib.request.Request(u, headers={'User-Agent':'Mozilla/5.0'})
        b = urllib.request.urlopen(req, timeout=20, context=ctx).read().decode('utf-8','ignore')
        title = re.search(r'<title>(.*?)</title>', b, re.I)
        # look for JSON-LD product data
        ld = re.findall(r'<script type="application/ld\+json">(.*?)</script>', b, re.S)
        prod = [x for x in ld if '"Product"' in x]
        imgs = re.findall(r'"(?:image|img|url)":\s*"(https://[^"]+\.(?:webp|jpg|jpeg|png))"', b)
        prices = re.findall(r'£([\d.]+)', b)
        print("=== ", s)
        print("  title:", title.group(1)[:80] if title else "NONE")
        print("  ldjson product:", (prod[0][:300] if prod else "none"))
        print("  imgs:", list(dict.fromkeys(imgs))[:4])
        print("  prices:", list(dict.fromkeys(prices))[:8])
    except Exception as e:
        print("=== ", s, "ERR", str(e)[:80])
