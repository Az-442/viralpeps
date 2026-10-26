import re, json, requests

H = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
     "Accept-Language": "en-GB,en;q=0.9"}
for u in ["https://www.peptidesx.uk/product/bpc-157/", "https://biohackerxlab.com/product/bpc-157/"]:
    h = requests.get(u, headers=H, timeout=25).text
    print("="*100); print(u)
    m = re.search(r'data-product_variations="(.*?)"\s*>', h, re.S)
    if not m:
        m = re.search(r"'product_variations'\s*:\s*(\[.*?\])\s*,", h, re.S)
    if m:
        raw = m.group(1)
        import html as htmlmod
        raw = htmlmod.unescape(raw)
        try:
            vars_ = json.loads(raw)
            for v in vars_[:10]:
                print("  var:", v.get("sku"), "|", v.get("attributes"), "| price_html:",
                      re.sub(r"<[^>]+>", "", str(v.get("price_html")))[:40], "| display_price:", v.get("display_price"))
        except Exception as e:
            print("  parse err", e, raw[:200])
    else:
        print("  no variations json found")
