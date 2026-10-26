import re, json, html as htmlmod, requests

H = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
     "Accept-Language": "en-GB,en;q=0.9"}
urls = ["https://biohackerxlab.com/product/tb-500/",
        "https://ukpeptides.org/buy/bpc-157-5mg",
        "https://newwavepeptides.co.uk/buy-peptide/peptides/bpc-157-5mg-10mg",
        "https://www.revexa.co.uk/product-page/bpc-157-5mg"]
for u in urls:
    h = requests.get(u, headers=H, timeout=25).text
    print("="*100); print(u, len(h))
    m = re.search(r'data-product_variations="(.*?)"\s*>', h, re.S)
    if m:
        vs = json.loads(htmlmod.unescape(m.group(1)))
        for v in vs:
            print("   VAR", v.get("attributes"), "display_price=", v.get("display_price"),
                  "=", re.sub(r"<[^>]+>", "", str(v.get("price_html"))))
    for m2 in re.finditer(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', h, re.S):
        try:
            o = json.loads(m2.group(1).strip())
        except Exception:
            continue
        for n in (o if isinstance(o, list) else [o]):
            if isinstance(n, dict) and n.get("offers"):
                offs = n["offers"] if isinstance(n["offers"], list) else [n["offers"]]
                for of in offs:
                    print("   LD", of.get("name"), of.get("price"), of.get("priceCurrency"))
    for txt in re.findall(r"£\s?\d[\d,.]*", h)[:8]:
        pass
