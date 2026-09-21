import ssl, urllib.request, re, json, time

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')

def fetch(u):
    req = urllib.request.Request(u, headers={'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9'})
    r = urllib.request.urlopen(req, timeout=30, context=ctx)
    return r.getcode(), r.read().decode('utf-8', errors='ignore')

URLS = ["tesamorelin","bpc-157","tb-500","ghk-cu","mots-c","ss-31","kpv","selank",
        "dsip","nad","ara-290","thymosin-alpha-1","cjc-1295-ipamorelin"]
out = {}
print("=== KINGS BIO LABS ===")
for s in URLS:
    u = f"https://www.kingsbiolabs.co.uk/{s}"
    try:
        code, body = fetch(u)
        t = re.search(r'<title[^>]*>(.*?)</title>', body, re.I|re.S)
        t = t.group(1).strip() if t else "NO TITLE"
        prices = sorted(set(float(p) for p in re.findall(r'£\s?([\d,]+\.\d{2})', body.replace(',',''))))
        prices2 = sorted(set(float(p) for p in re.findall(r'"price":\s*"?([\d.]+)"?', body)))
        og = re.search(r'property=["\']og:image["\'][^>]+content=["\']([^"\']+)', body, re.I)
        out[s] = {"url": u, "status": code, "title": t, "prices": prices or prices2, "og": og.group(1) if og else None}
        print(f'{code} | {s:24} | {str(prices or prices2)[:40]:42} | {t[:58]}')
    except Exception as e:
        print(f'ERR | {s:24} | {str(e)[:70]}')
        out[s] = {"url": u, "error": str(e)[:150]}
    time.sleep(0.3)
json.dump(out, open('tmp/_kbl_pages.json','w'), indent=2)
