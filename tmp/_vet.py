import re, requests
HEADERS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
           "Accept-Language": "en-GB,en;q=0.9"}
URLS = [
 "https://bluewellpeptides.com/product/dsip-15mg-peptide/",
 "https://midshirelabs.co.uk/products/vip/",
 "https://ukpeptides.org/buy/bacteriostatic-water-3ml",
 "https://omnichems.co.uk/product/bpc-157-10mg-mana-buffs/",
 "https://researchpeptide.co.uk/product/hgh-fragment-176-191-10mg/",
 "https://unitedpeptides.co.uk/product/retatrutide-40mg/",
 "https://my-peptides.co.uk/products/bpc-157",
 "https://spxlabs.co.uk/product/mots-c-uk-10mg/",
]
for u in URLS:
    try:
        r = requests.get(u, headers=HEADERS, timeout=25)
        h = r.text
        t = re.search(r"<title[^>]*>(.*?)</title>", h, re.S|re.I)
        h1 = re.search(r"<h1[^>]*>(.*?)</h1>", h, re.S|re.I)
        prices = sorted(set(re.findall(r"£\s?([\d,]+\.\d{2})", h)))[:8]
        print(f"\n=== {r.status_code} {u}")
        print("  TITLE:", re.sub(r"\s+"," ",t.group(1)).strip()[:90] if t else "")
        print("  H1   :", re.sub(r"<[^>]+>","",h1.group(1)).strip()[:90] if h1 else "")
        print("  PRICES:", prices)
    except Exception as e:
        print(f"\n=== ERR {u} {type(e).__name__}")
