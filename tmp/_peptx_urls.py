import ssl, urllib.request, re
urls = [
 "https://peptx.co.uk/single-vials/tirzepatide",
 "https://peptx.co.uk/single-vials/semaglutide",
 "https://peptx.co.uk/single-vials/retatrutide",
 "https://peptx.co.uk/single-vials/bpc-157",
 "https://peptx.co.uk/single-vials/ghk-cu",
 "https://peptx.co.uk/single-vials/tesamorelin",
 "https://peptx.co.uk/single-vials/mots-c",
 "https://peptx.co.uk/single-vials/ss-31",
 "https://peptx.co.uk/single-vials/selank",
 "https://peptx.co.uk/single-vials/semax",
 "https://peptx.co.uk/single-vials/kisspeptin-10",
 "https://peptx.co.uk/single-vials/pt-141",
 "https://peptx.co.uk/single-vials/nad",
 "https://peptx.co.uk/single-vials/kpv",
 "https://peptx.co.uk/single-vials/sermorelin",
 "https://peptx.co.uk/single-vials/ipamorelin",
 "https://peptx.co.uk/single-vials/dsip",
 "https://peptx.co.uk/single-vials/mt-1",
 "https://peptx.co.uk/single-vials/ahk-cu",
 "https://peptx.co.uk/single-vials/5-amino-1mq",
 "https://peptx.co.uk/single-vials/ara-290",
 "https://peptx.co.uk/single-vials/cartalax",
 "https://peptx.co.uk/single-vials/pe-22-28",
 "https://peptx.co.uk/single-vials/mazdutide",
 "https://peptx.co.uk/single-vials/ta-1-thymosin-alpha-1",
 "https://peptx.co.uk/single-vials/klow-blend",
 "https://peptx.co.uk/single-vials/glutathione",
 "https://peptx.co.uk/single-vials/l-carnitine",
 "https://peptx.co.uk/single-vials/oxytocin-acetate",
 "https://peptx.co.uk/single-vials/eloralintide",
 "https://peptx.co.uk/single-vials/aod-9604",
 "https://peptx.co.uk/single-vials/cagrilintide",
 "https://peptx.co.uk/single-vials/liraglutide",
]
ctx = ssl._create_unverified_context()
for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'})
        r = urllib.request.urlopen(req, timeout=15, context=ctx)
        body = r.read().decode('utf-8', errors='ignore')
        t = re.search(r'<title[^>]*>(.*?)</title>', body, re.I|re.S)
        title = (t.group(1).strip() if t else 'NO TITLE')[:70]
        print(f"{r.getcode()} | {u.split('/')[-1]} | {title}")
    except Exception as e:
        print(f"ERR | {u.split('/')[-1]} | {str(e)[:60]}")
