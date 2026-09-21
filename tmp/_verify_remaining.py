import ssl, urllib.request, re
urls = ["https://mypepbiotech.co.uk/product/liraglutide-10mg/",
        "https://mypepbiotech.co.uk/product/cagrilintide/",
        "https://peptx.co.uk/product/aod-9604",
        "https://peptx.co.uk/product/cagrilintide",
        "https://peptx.co.uk/product/liraglutide"]
ctx = ssl._create_unverified_context()
for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent':'Mozilla/5.0'})
        r = urllib.request.urlopen(req, timeout=20, context=ctx)
        b = r.read().decode('utf-8', errors='ignore')
        t = re.search(r'<title[^>]*>(.*?)</title>', b, re.I|re.S)
        print(f'{r.getcode()} | {u[:60]:62} | {(t.group(1).strip() if t else "NO TITLE")[:60]}')
    except Exception as e:
        print(f'ERR | {u[:60]:62} | {str(e)[:50]}')
