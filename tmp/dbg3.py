import re, requests

H = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
     "Accept-Language": "en-GB,en;q=0.9"}
for u in ["https://www.apexbiolabs.co.uk/product/tirzepatide-20mg/",
          "https://www.prime-peptides.co.uk/product/tirzepatide/"]:
    h = requests.get(u, headers=H, timeout=25).text
    print("="*110); print(u)
    for m in list(re.finditer(r"£\s?\d[\d,.]*", h))[:25]:
        s = max(0, m.start()-120)
        print("  ...", re.sub(r"\s+", " ", h[s:m.end()+20])[-150:])
