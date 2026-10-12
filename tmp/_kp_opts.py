import json, ssl, urllib.request, re, html

slugs = ["glow-bpc-157-tb-500-ghk-cu","wolverine-bpc-157-tb-500","ghk-cu",
         "bacteriostatic-water","melanotan-ii","reta","selank","semax","tb-500"]
ctx = ssl._create_unverified_context()
for s in slugs:
    u = f"https://kingstonpeptides.com/en/products/{s}"
    req = urllib.request.Request(u, headers={'User-Agent':'Mozilla/5.0'})
    b = urllib.request.urlopen(req, timeout=20, context=ctx).read().decode('utf-8','ignore')
    # Find option buttons: pattern like "5mg £13.00 In stock"
    opts = re.findall(r'(\d+(?:\.\d+)?\s*(?:mg|mcg|ml|g))\s*</[^>]*>\s*<[^>]*>£([\d.]+)', b)
    if not opts:
        # alt: search for data attributes
        opts = re.findall(r'"label":"([^"]*(?:mg|mcg|ml)[^"]*)","price":(\d+(?:\.\d+)?)', b, re.I)
    # generic: find all size+price pairs in HTML text
    txt = re.sub(r'<[^>]+>', ' ', b)
    pairs = re.findall(r'(\d+(?:\.\d+)?\s*(?:mg|mcg|ml))\s+£([\d.]+)', txt)
    stock = 'In stock' in txt or 'InStock' in b
    print("=== ", s, "| stock:", stock)
    print("   text pairs:", list(dict.fromkeys(pairs))[:8])
    print("   opts:", list(dict.fromkeys(opts))[:8])
