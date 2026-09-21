import ssl, urllib.request, re, json, os, hashlib, io, time
from PIL import Image

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')

def fetch(u, binary=False):
    req = urllib.request.Request(u, headers={'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9',
                                             'Referer': 'https://vialverse.com/'})
    d = urllib.request.urlopen(req, timeout=40, context=ctx).read()
    return d if binary else d.decode('utf-8', errors='ignore')

locs = json.load(open('tmp/_vv_sitemap.json'))
pep = [u for u in locs if '/peptides/' in u]
OUT = 'public/images/products/vialverse'
os.makedirs(OUT, exist_ok=True)

results = {}
for u in pep:
    slug = u.rstrip('/').split('/')[-1]
    try:
        body = fetch(u)
        og = re.search(r'property=["\']og:image["\'][^>]+content=["\']([^"\']+)', body, re.I)
        if not og:
            print(f'NO OG {slug}')
            results[slug] = None
            continue
        img_url = og.group(1)
        # sanity: the image filename should relate to the slug
        fn = img_url.rsplit('/', 1)[-1]
        raw = fetch(img_url, binary=True)
        if len(raw) < 1000:
            print(f'TOO SMALL {slug} {len(raw)}b')
            results[slug] = None
            continue
        im = Image.open(io.BytesIO(raw)).convert("RGB")
        # convert to webp, cap width at 800
        if im.width > 800:
            im = im.resize((800, int(im.height * 800 / im.width)), Image.LANCZOS)
        dest = f'{OUT}/{slug}.webp'
        im.save(dest, 'WEBP', quality=88)
        results[slug] = {"url": img_url, "file": dest,
                         "src_md5": hashlib.md5(raw).hexdigest(),
                         "size": os.path.getsize(dest), "dims": im.size}
        print(f'OK {slug:24} {img_url.split("/")[-2:]:}  {os.path.getsize(dest)}b {im.size}')
    except Exception as e:
        print(f'ERR {slug}: {str(e)[:80]}')
        results[slug] = None
    time.sleep(0.2)

json.dump(results, open('tmp/_vv_downloaded.json','w'), indent=2)
ok = [k for k,v in results.items() if v]
print(f"\nDownloaded {len(ok)}/{len(pep)}")
# uniqueness check
md5s = {}
for k,v in results.items():
    if v: md5s.setdefault(v["src_md5"], []).append(k)
dups = {m:k for m,k in md5s.items() if len(k) > 1}
print("DUPLICATE source images:", dups if dups else "none - all unique")
