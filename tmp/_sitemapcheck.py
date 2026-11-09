import re, urllib.request, ssl
CTX = ssl.create_default_context(); CTX.check_hostname = False; CTX.verify_mode = ssl.CERT_NONE
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
sites = {
 "XL Peptides": "https://xlpeptides.com",
 "PeptidesX": "https://www.peptidesx.uk",
 "SPX Labs": "https://spxlabs.co.uk",
 "VialVerse": "https://vialverse.com",
}
targets = {
 "XL Peptides": ["melanotan-2", "tesamorelin", "semax", "selank", "ss-31", "bacteriostatic", "melanotan-1"],
 "PeptidesX": ["ghrp-2", "ghrp-6"],
 "SPX Labs": ["retatrutide", "bacteriostatic"],
 "VialVerse": ["hexarelin", "slu-pp-332", "aicar", "matrixyl"],
}
for v, base in sites.items():
    urls = set()
    for path in ["/wp-sitemap.xml", "/sitemap_index.xml", "/sitemap.xml"]:
        try:
            req = urllib.request.Request(base + path, headers=UA)
            with urllib.request.urlopen(req, timeout=20, context=CTX) as r:
                body = r.read(400000).decode("utf-8", "replace")
            subs = re.findall(r"<loc>([^<]+)</loc>", body)
            if path.endswith("sitemap.xml") and not subs:
                continue
            for s in subs:
                if "product" in s or "sitemap" in s:
                    try:
                        req2 = urllib.request.Request(s, headers=UA)
                        with urllib.request.urlopen(req2, timeout=20, context=CTX) as r2:
                            urls |= set(re.findall(r"<loc>([^<]+)</loc>", r2.read(800000).decode("utf-8", "replace")))
                    except Exception:
                        pass
            if urls:
                break
        except Exception:
            pass
    urls = {u for u in urls if "/product" in u}
    print(f"=== {v}: {len(urls)} product urls")
    for t in targets[v]:
        hits = sorted(u for u in urls if t in u)
        print(f"  {t}: {hits[:3] if hits else 'NONE'}")
