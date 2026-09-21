import ssl, urllib.request, re, json, time

ctx = ssl._create_unverified_context()

def fetch(u):
    req = urllib.request.Request(u, headers={'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'})
    r = urllib.request.urlopen(req, timeout=25, context=ctx)
    return r.getcode(), r.read().decode('utf-8', errors='ignore')

# --- VialVerse: get the GB sitemap ---
print("=== VIALVERSE SITEMAP ===")
try:
    code, body = fetch("https://vialverse.com/vv-sitemap-1-gb-1.xml")
    print("status", code, "bytes", len(body))
    locs = re.findall(r'<loc>(.*?)</loc>', body)
    print("URLS:", len(locs))
    for l in locs[:200]:
        print("  ", l)
    json.dump(locs, open('tmp/_vv_sitemap.json','w'), indent=2)
except Exception as e:
    print("ERR", str(e)[:200])
