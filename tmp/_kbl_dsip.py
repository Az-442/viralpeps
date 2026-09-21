import ssl, urllib.request, os, hashlib, io
from PIL import Image

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')

url = "https://cdn.prod.website-files.com/6a87656033956480c122537d/6a8ae154ce974591e0e16805_E9E4A66D-F359-469F-9FC3-A297A43C5897.webp"
req = urllib.request.Request(url, headers={'User-Agent': UA, 'Referer': 'https://www.kingsbiolabs.co.uk/'})
raw = urllib.request.urlopen(req, timeout=40, context=ctx).read()
im = Image.open(io.BytesIO(raw)).convert("RGB")
if im.width > 800:
    im = im.resize((800, int(im.height * 800 / im.width)), Image.LANCZOS)
dest = "public/images/products/kings-bio-labs/dsip.webp"
im.save(dest, "WEBP", quality=88)
print(f"OK dsip {os.path.getsize(dest)}b {im.size} md5={hashlib.md5(raw).hexdigest()[:10]}")

# final inventory + uniqueness
import glob
files = sorted(glob.glob("public/images/products/kings-bio-labs/*.webp"))
print(f"\nKBL images: {len(files)}")
seen = {}
for f in files:
    m = hashlib.md5(open(f,'rb').read()).hexdigest()
    seen.setdefault(m, []).append(os.path.basename(f))
dups = {m: v for m, v in seen.items() if len(v) > 1}
print("duplicates:", dups if dups else "none - all unique")
for f in files:
    print("  ", os.path.basename(f), os.path.getsize(f), "b")
