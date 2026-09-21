import ssl, urllib.request, re, json

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')

def get(u):
    req = urllib.request.Request(u, headers={'User-Agent': UA, 'Accept-Language':'en-GB,en;q=0.9'})
    r = urllib.request.urlopen(req, timeout=30, context=ctx)
    return r.getcode(), r.read()

for label, home in [("VialVerse","https://vialverse.com"),
                    ("KingsBioLabs","https://www.kingsbiolabs.co.uk"),
                    ("PeptX","https://peptx.co.uk")]:
    print(f"\n===== {label} ({home}) =====")
    try:
        code, raw = get(home)
        body = raw.decode('utf-8', errors='ignore')
        print("status", code, "bytes", len(raw))
        # logo-ish images
        imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>', body)
        for i in imgs[:25]:
            print("   IMG:", i[:120])
        # inline svg in header/logo
        print("   --- icon links ---")
        for m in re.findall(r'<link[^>]+rel=["\'][^"\']*icon[^"\']*["\'][^>]*>', body)[:6]:
            print("   ", m[:160])
        # jsonld logo
        for m in re.findall(r'"logo"\s*:\s*(\{[^}]*\}|"[^"]*")', body)[:3]:
            print("   LOGO-JSONLD:", m[:160])
        # svg inline count
        print("   inline <svg> in first 20k:", body[:20000].count('<svg'))
    except Exception as e:
        print("ERR", str(e)[:120])
