import urllib.request, ssl, os
ctx = ssl._create_unverified_context()
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
for url, dest in [("https://peptx.co.uk/favicon.png?v=8", "tmp/_peptx_favicon.png"),
                  ("https://peptx.co.uk/apple-touch-icon.png?v=8", "tmp/_peptx_apple.png")]:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': UA, 'Referer': 'https://peptx.co.uk/'})
        d = urllib.request.urlopen(req, timeout=30, context=ctx).read()
        open(dest, 'wb').write(d)
        print(f"OK {dest} {len(d)}b")
    except Exception as e:
        print(f"ERR {url}: {str(e)[:80]}")
