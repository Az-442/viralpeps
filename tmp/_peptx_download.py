import urllib.request, ssl, os, json, hashlib

assets = json.load(open('tmp/_peptx_assets.json'))
ctx = ssl._create_unverified_context()
OUT = 'public/images/products/peptx'
os.makedirs(OUT, exist_ok=True)

# VP compound slug -> peptx asset basename (the real product render)
want = {
 "tirzepatide": "tirz-30mg.webp", "semaglutide": "sema-20mg.webp",
 "retatrutide": "reta-10mg.webp", "bpc-157": "bpc-157-10mg.webp",
 "ghk-cu": "ghk-cu-50mg.webp", "tesamorelin": "tesamorelin-10mg.webp",
 "mots-c": "mots-c-10mg.webp", "ss-31": "ss-31-10mg.webp",
 "selank": "selank-10mg.webp", "semax": "semax-10mg.webp",
 "kisspeptin-10": "kisspeptin-10-5mg.webp", "pt-141": "pt-141-10mg.webp",
 "nad-plus": "nad-500mg.webp", "kpv": "kpv-10mg.webp",
 "sermorelin": "sermorelin-10mg.webp", "ipamorelin": "ipamorelin-5mg.webp",
 "dsip": "dsip-5mg.webp", "mt-1": "mt1-10mg.webp",
 "ahk-cu": "ahk-cu-100mg.webp", "5-amino-1mq": "5-amino-1mq-50mg.webp",
 "ara-290": "ara-290-16mg.webp", "cartalax": "cartalax-40mg.webp",
 "pe-22-28": "pe-22-28-10mg.webp", "mazdutide": "maz-10mg.webp",
 "thymosin-alpha-1": "ta1-thymosin-alpha1-5mg.webp", "klow-blend": "klow-blend-80mg.webp",
 "glutathione": "glutathione-1500mg.webp", "l-carnitine": "l-carnitine-600mg-10ml.webp",
 "oxytocin-acetate": "oxytocin-acetate-5mg.webp", "eloralintide": "elora-5mg.webp",
}

# build basename -> full path
by_base = {p.split('/')[-1]: p for p in assets}

def md5f(fp):
    return hashlib.md5(open(fp, 'rb').read()).hexdigest()

results = {}
for slug, base in want.items():
    src = by_base.get(base)
    if not src:
        print(f"MISSING ASSET {slug} -> {base}")
        results[slug] = None
        continue
    url = "https://peptx.co.uk" + src
    dest = f"{OUT}/{slug}.webp"
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Referer':'https://peptx.co.uk/'})
        data = urllib.request.urlopen(req, timeout=30, context=ctx).read()
        if len(data) < 500:
            print(f"TOO SMALL {slug} {len(data)}b")
            results[slug] = None
            continue
        open(dest, 'wb').write(data)
        results[slug] = {"file": dest, "bytes": len(data), "md5": hashlib.md5(data).hexdigest()}
        print(f"OK {slug:22} {len(data):>7}b  md5={results[slug]['md5'][:10]}")
    except Exception as e:
        print(f"ERR {slug} {str(e)[:70]}")
        results[slug] = None

json.dump(results, open('tmp/_peptx_downloaded.json','w'), indent=2)
