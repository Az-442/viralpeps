import re, urllib.request, ssl
CTX = ssl.create_default_context(); CTX.check_hostname = False; CTX.verify_mode = ssl.CERT_NONE
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}

def fetch(u):
    req = urllib.request.Request(u, headers=UA)
    with urllib.request.urlopen(req, timeout=25, context=CTX) as r:
        return r.read(600000).decode("utf-8", "replace")

for base, targets, pages in [
    ("https://xlpeptides.com", ["melanotan", "tesamorelin", "semax", "selank", "ss-31", "bacteriostatic", "retatrutide"],
     ["/shop/", "/shop/page/2/", "/shop/page/3/", "/product-category/peptides/", "/product-category/misc/"]),
    ("https://vialverse.com", ["hexarelin", "slu-pp-332", "aicar", "matrixyl"],
     ["/", "/peptides", "/shop"]),
]:
    print("===", base)
    for p in pages:
        try:
            b = fetch(base + p)
        except Exception as e:
            print(" ", p, "ERR", e)
            continue
        hrefs = sorted(set(re.findall(r'href="([^"]*(?:/product/|/peptides/)[^"]*)"', b)))
        print(" ", p, len(hrefs), "links")
        for t in targets:
            hits = [h for h in hrefs if t in h.lower()]
            if hits:
                print("    ", t, hits[:3])
