import re, json, requests

H = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
     "Accept-Language": "en-GB,en;q=0.9"}

urls = [
 "https://lab77peptides.uk/peptides/tirzepatide?format=vial&size=20mg",
 "https://www.apexbiolabs.co.uk/product/tirzepatide-20mg/",
 "https://www.prime-peptides.co.uk/product/tirzepatide/",
 "https://peptx.co.uk/single-vials/tirzepatide",
 "https://pslabs.uk/products/tz-glp1",
]
for u in urls:
    r = requests.get(u, headers=H, timeout=25)
    h = r.text
    print("="*110); print(u, r.status_code)
    for m in re.finditer(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', h, re.S):
        txt = m.group(1).strip()
        try:
            obj = json.loads(txt)
        except Exception:
            print("  [invalid jsonld]", txt[:120]); continue
        objs = obj if isinstance(obj, list) else [obj]
        for o in objs:
            if isinstance(o, dict) and ("offers" in o or o.get("@type") == "Product"):
                print("  LD Product:", o.get("name"), "| offers:", json.dumps(o.get("offers"))[:300])
    for rx in (r'class="[^"]*(?:price|amount)[^"]*"[^>]*>\s*([^<]{1,30})<',
               r'(?:id|class)="(?:price|product-price)[^"]*"[^>]*>([^<]{1,40})<'):
        for f in re.findall(rx, h)[:6]:
            print("  markup:", repr(f.strip()[:60]))
