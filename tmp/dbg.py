import re
import requests

H = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept-Language": "en-GB,en;q=0.9",
}
urls = [
    "https://lab77peptides.uk/peptides/tirzepatide?format=vial&size=20mg",
    "https://lab77peptides.uk/peptides/tirzepatide?format=vial&size=60mg",
    "https://www.apexbiolabs.co.uk/product/tirzepatide-20mg/",
    "https://www.prime-peptides.co.uk/product/tirzepatide/",
]
for u in urls:
    try:
        r = requests.get(u, headers=H, timeout=25)
    except Exception as e:
        print(u, "ERR", e); continue
    h = r.text
    print("=" * 100)
    print(u, r.status_code, len(h))
    for rx, name in [
        ('"price"\\s*:\\s*"?([\\d.]+)', "jsonld"),
        ('<meta[^>]+price:amount[^>]+content="([\\d.]+)"', "meta"),
        ('£\\s?(\\d{1,3}(?:,\\d{3})*(?:\\.\\d{1,2})?)', "pound"),
        ('"priceSpecification"', "pricespec"),
        ('(?:data-price|data-product-price)="([\\d.]+)"', "dataprice"),
    ]:
        found = re.findall(rx, h)[:8]
        if found:
            print(f"  {name}: {found}")
    # show £ contexts
    for m in list(re.finditer(r"£\s?\d[\d,.]*", h))[:6]:
        s = max(0, m.start() - 90)
        print("   ctx:", re.sub(r"\s+", " ", h[s:m.end() + 30])[-140:])
