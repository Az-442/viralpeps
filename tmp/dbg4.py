import re, json, requests

H = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
     "Accept-Language": "en-GB,en;q=0.9"}
LD_RE = re.compile(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', re.S | re.I)

urls = [
 "https://peptidesuk4u.co.uk/product/tirzepatide",
 "https://www.peptidesx.uk/product/bpc-157/",
 "https://pioneerpeptides.co.uk/products/bpc-157/",
 "https://www.revexa.co.uk/product-page/bpc-157-5mg",
 "https://biohackerxlab.com/product/bpc-157/",
 "https://ukpeptides.org/buy/bpc-157-5mg",
]
for u in urls:
    h = requests.get(u, headers=H, timeout=25).text
    print("="*110); print(u)
    for m in LD_RE.finditer(h):
        try:
            obj = json.loads(m.group(1).strip())
        except Exception:
            continue
        objs = obj if isinstance(obj, list) else [obj]
        for o in objs:
            if isinstance(o, dict) and o.get("offers"):
                offs = o["offers"]
                offs = offs if isinstance(offs, list) else [offs]
                for of in offs:
                    print(f"   offer: name={str(of.get('name'))[:50]!r} price={of.get('price')} cur={of.get('priceCurrency')} sku={of.get('sku')}")
    # variations / option labels
    for rx in (r'<option[^>]*>([^<]{2,40})</option>', r'variation_id', r'data-product_variations'):
        f = re.findall(rx, h)
        if f:
            print("   ", rx[:28], "->", str(f)[:300])
