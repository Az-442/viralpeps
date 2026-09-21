import ssl, urllib.request, re, json, time

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')

def fetch(u):
    req = urllib.request.Request(u, headers={'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9'})
    return urllib.request.urlopen(req, timeout=30, context=ctx).read().decode('utf-8', errors='ignore')

URLS = ["tesamorelin","bpc-157","tb-500","ghk-cu","mots-c","ss-31","kpv","selank",
        "dsip","nad","ara-290","thymosin-alpha-1","cjc-1295-ipamorelin"]
out = {}
for s in URLS:
    u = f"https://www.kingsbiolabs.co.uk/{s}"
    try:
        body = fetch(u)
        fp = re.findall(r'data-fixed-price="£([\d,.]+)"', body)
        ld = re.findall(r'"price":\s*"£([\d,.]+)"', body)
        name = re.search(r'<title[^>]*>(.*?)</title>', body, re.I|re.S)
        # images
        og = re.search(r'property=["\']og:image["\'][^>]+content=["\']([^"\']+)', body, re.I)
        imgs = re.findall(r'(https://[^"\']*?\.(?:webp|png|jpg|jpeg))', body)
        imgs = [i for i in dict.fromkeys(imgs) if 'kingsbio' in i.lower() or 'cdn' in i.lower()]
        out[s] = {"url": u, "fixed_price": fp, "ld_price": ld,
                  "title": name.group(1).strip() if name else None,
                  "og": og.group(1) if og else None, "imgs": imgs[:12]}
        print(f'{s:24} fixed={fp} ld={ld} og={(og.group(1)[:70] if og else None)}')
    except Exception as e:
        print(f'ERR {s}: {str(e)[:80]}')
    time.sleep(0.3)
json.dump(out, open('tmp/_kbl_detail.json','w'), indent=2)
