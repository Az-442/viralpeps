import re, requests
HEADERS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
           "Accept-Language": "en-GB,en;q=0.9"}
URLS = [
 "https://www.na-peptides.co.uk/product/mt-1-10mg-pen/",
 "https://mk-677-placeholder.invalid",
 "https://researchpeptide.co.uk/product/mk-677-ibutamoren-10mg-100-tablets/",
 "https://researchpeptide.co.uk/product/tesofensine-500mcg-100-tablets/",
 "https://kingstonpeptides.com/en/products/bacteriostatic-water",
 "https://elitepeptides.uk/product/cjc-1295-w-o-dac-ipamorelin-10mg-10mg/",
 "https://alphamino.co.uk/shop/nad-research-grade/",
 "https://spxlabs.co.uk/product/bpc-157-tb-500-uk-10mg/",
 "https://www.na-peptides.co.uk/product/retatrutide-60mg-pen/",
]
for u in URLS:
    if ".invalid" in u: continue
    try:
        r = requests.get(u, headers=HEADERS, timeout=25)
        h = r.text
        t = re.search(r"<title[^>]*>(.*?)</title>", h, re.S|re.I)
        h1 = re.search(r"<h1[^>]*>(.*?)</h1>", h, re.S|re.I)
        print(f"\n=== {r.status_code} {u}")
        print("  TITLE:", re.sub(r"\s+"," ",t.group(1)).strip()[:95] if t else "")
        print("  H1   :", re.sub(r"<[^>]+>","",h1.group(1)).strip()[:95] if h1 else "")
        m = re.search(r'application/ld\+json[^>]*>(.*?)</script>', h, re.S|re.I)
        if m:
            for mm in re.findall(r'"price"\s*:\s*"?([\d.]+)"?[^}]{0,80}', m.group(1))[:6]:
                print("   ld price:", mm)
    except Exception as e:
        print(f"\n=== ERR {u} {type(e).__name__}")
