import re, urllib.request, ssl
CTX = ssl.create_default_context(); CTX.check_hostname = False; CTX.verify_mode = ssl.CERT_NONE
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}

def catalog(base, pages, pat):
    out = set()
    for p in pages:
        try:
            req = urllib.request.Request(base + p, headers=UA)
            with urllib.request.urlopen(req, timeout=25, context=CTX) as r:
                b = r.read(800000).decode("utf-8", "replace")
            out |= set(re.findall(pat, b))
        except Exception:
            pass
    return out

xl = catalog("https://xlpeptides.com", ["/shop/", "/shop/page/2/", "/shop/page/3/"], r'href="(https://xlpeptides\.com/product/[^"]+)"')
print("XL Peptides catalogue:", len(xl))
for u in sorted(xl):
    print("  ", u.split("/product/")[1])

vv = catalog("https://vialverse.com", ["/peptides", "/shop"], r'href="([^"]*/(?:peptides|product)/[^"]+)"')
print("\nVialVerse catalogue:", len(vv))
for u in sorted(vv):
    print("  ", u)
