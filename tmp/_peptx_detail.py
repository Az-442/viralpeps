import ssl, urllib.request, re, json, time

SLUGS = ["tirzepatide","semaglutide","retatrutide","bpc-157","ghk-cu","tesamorelin",
         "mots-c","ss-31","selank","semax","kisspeptin-10","pt-141","nad","kpv",
         "sermorelin","ipamorelin","dsip","mt-1","ahk-cu","5-amino-1mq","ara-290",
         "cartalax","pe-22-28","mazdutide","ta-1-thymosin-alpha-1","klow-blend",
         "glutathione","l-carnitine","oxytocin-acetate","eloralintide"]

ctx = ssl._create_unverified_context()
out = {}
for slug in SLUGS:
    u = f"https://peptx.co.uk/single-vials/{slug}"
    try:
        req = urllib.request.Request(u, headers={'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'})
        r = urllib.request.urlopen(req, timeout=20, context=ctx)
        body = r.read().decode('utf-8', errors='ignore')
        # prices: look for £ values in JSON-LD or data attributes
        prices = sorted(set(re.findall(r'£\s?(\d+\.\d{2})', body)), key=lambda x: float(x))
        # og image
        og = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)', body, re.I)
        # shopify/variant json
        variants = re.findall(r'"price"\s*:\s*"?(\d+(?:\.\d+)?)"?', body)
        out[slug] = {"url": u, "prices": prices[:12], "og": og.group(1) if og else None, "variants": variants[:12]}
        print(f"{slug} | £{prices[:8]} | og={ (og.group(1) if og else None) }")
    except Exception as e:
        print(f"ERR {slug} {str(e)[:60]}")
    time.sleep(0.3)

json.dump(out, open('tmp/_peptx_detail.json','w'), indent=2)
