#!/usr/bin/env python3
import re, html as H, os

d = os.path.dirname(os.path.abspath(__file__))

# 1) claims scan across files
print("=== CLAIMS ===")
fset = ["ghk-cu.html", "bpc-157.html", "retatrutide-10mg.html", "klow.html"]
seen = set()
for f in fset:
    h = open(os.path.join(d, f), encoding="utf-8", errors="replace").read()
    for m in re.finditer(r'[^<>]{0,60}(COA|certificate of analysis|third[- ]party|99%|HPLC|independently lab|independently test|purit)[^<>]{0,60}', h, re.I):
        s = re.sub(r'\s+', ' ', H.unescape(m.group(0))).strip()
        if s and s not in seen and len(s) < 200:
            seen.add(s)
            print("-", s)

# 2) product short descriptions (entry-content). Extract from woocommerce product data
print("\n=== PRODUCT SHORT DESCRIPTIONS (summary area) ===")
for f in ["ghk-cu.html", "retatrutide-10mg.html", "klow.html", "nad.html", "mt-2.html", "glow.html", "retatrutide-20mg-pen.html", "bacteriostatic-water.html"]:
    h = open(os.path.join(d, f), encoding="utf-8", errors="replace").read()
    # price area
    m = re.search(r'<p class="price">(.*?)</p>', h, re.S)
    price = H.unescape(re.sub(r'<[^>]+>', ' ', m.group(1))).strip() if m else None
    # short description: the text near product info tab
    descm = re.search(r'<div class="woocommerce-product-details__short-description">(.*?)</div>', h, re.S)
    desc = ''
    if descm:
        desc = re.sub(r'\s+', ' ', H.unescape(re.sub(r'<[^>]+>', ' ', descm.group(1)))).strip()
    print(f"#### {f} | price={price}")
    print("   desc:", desc[:600])
