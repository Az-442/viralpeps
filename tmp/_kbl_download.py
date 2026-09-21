import ssl, urllib.request, os, hashlib, io, time, re
from PIL import Image

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')
BASE = "https://cdn.prod.website-files.com/6a87656033956480c122537d/"

# vp slug -> exact asset filename on the KBL CDN (verified from live pages)
MAP = {
 "tesamorelin":         "6a8ae443fcc541cde3475bd7_Tesamorelin-10mg.PNG",
 "bpc-157":             "6a8ae367cc7cc962db54f758_BPC-157-10mg.webp",
 "tb-500":              "6a8ae446b5ae54a09cef0cf5_TB-500-10mg.PNG",
 "ghk-cu":              "6a8ae44c10c1d2eadf2300a4_GHK-CU-100mg.PNG",
 "mots-c":              "6a8ae44ace974591e0e1f30f_MOTS-C-40mg.PNG",
 "ss-31":               "6a8ae450a1641af0c3209e8f_SS-31-10mg.PNG",
 "kpv":                 "6a8ae44b48afd5c51a7b45ac_KVP-10mg.PNG",
 "selank":              "6a8ae442d72c40621ce44def_Selank-10mg.PNG",
 "nad-plus":            "6a8ae3ecfcc541cde3475032_NAD%2B-1000mg.PNG",
 "ara-290":             "6a8ae44948afd5c51a7b457d_ARA-290-10mg.PNG",
 "thymosin-alpha-1":    "6a8ae4443b4e660e254c9e44_Thymosin%20Alphs-10mg.PNG",
 "cjc-1295-ipamorelin": "6a8ae44d9f5726c823c1c4b1_CJC%201295%2BIpamorelin-10mg.PNG",
 "dsip":                None,   # need to find below
}

OUT = 'public/images/products/kings-bio-labs'
os.makedirs(OUT, exist_ok=True)

def fetch_bin(u):
    req = urllib.request.Request(u, headers={'User-Agent': UA, 'Referer': 'https://www.kingsbiolabs.co.uk/'})
    return urllib.request.urlopen(req, timeout=40, context=ctx).read()

def fetch_txt(u):
    req = urllib.request.Request(u, headers={'User-Agent': UA, 'Referer': 'https://www.kingsbiolabs.co.uk/'})
    return urllib.request.urlopen(req, timeout=40, context=ctx).read().decode('utf-8', errors='ignore')

# resolve dsip by scraping its page for the DSIP asset
body = fetch_txt("https://www.kingsbiolabs.co.uk/dsip")
m = re.findall(r'(6a[0-9a-f]{22}_[A-Za-z0-9%+._-]*DSIP[A-Za-z0-9%+._-]*\.(?:PNG|png|webp|jpg))', body, re.I)
print("DSIP asset candidates:", m[:3])
if m:
    MAP["dsip"] = m[0]

results = {}
for slug, fn in MAP.items():
    if not fn:
        print(f"SKIP {slug} (no asset resolved)")
        results[slug] = None
        continue
    url = BASE + fn
    try:
        raw = fetch_bin(url)
        if len(raw) < 1000:
            print(f"TOO SMALL {slug} {len(raw)}b")
            results[slug] = None
            continue
        im = Image.open(io.BytesIO(raw)).convert("RGB")
        if im.width > 800:
            im = im.resize((800, int(im.height * 800 / im.width)), Image.LANCZOS)
        dest = f"{OUT}/{slug}.webp"
        im.save(dest, 'WEBP', quality=88)
        results[slug] = {"url": url, "file": dest, "md5": hashlib.md5(raw).hexdigest(),
                         "size": os.path.getsize(dest), "dims": im.size}
        print(f"OK {slug:22} {os.path.getsize(dest):>7}b {im.size}")
    except Exception as e:
        print(f"ERR {slug}: {str(e)[:80]}")
        results[slug] = None
    time.sleep(0.2)

ok = [k for k, v in results.items() if v]
print(f"\nDownloaded {len(ok)}/{len(MAP)}")
md5s = {}
for k, v in results.items():
    if v: md5s.setdefault(v["md5"], []).append(k)
dups = {mm: kk for mm, kk in md5s.items() if len(kk) > 1}
print("DUPLICATES:", dups if dups else "none - all unique")
import json
json.dump(results, open('tmp/_kbl_downloaded.json','w'), indent=2)
