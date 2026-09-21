import ssl, urllib.request, os, io
from PIL import Image

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')

def grab(url, referer=None):
    h = {'User-Agent': UA}
    if referer:
        h['Referer'] = referer
    return urllib.request.urlopen(urllib.request.Request(url, headers=h), timeout=45, context=ctx).read()

jobs = [
  ("vialverse", "https://vialverse.com/img/logo-1787432638.jpg", "https://vialverse.com"),
  ("kings-bio-labs", "https://cdn.prod.website-files.com/6a87656033956480c122537d/6a87cd321c3abca6ec115967_E6D2CB33-0706-4EE7-81E8-DC1E99888632.PNG", "https://www.kingsbiolabs.co.uk"),
  ("peptx", "https://peptx.co.uk/__l5e/assets-v1/87764e4e-fd87-4593-93d7-5835f20b0d65/px-crest.webp", "https://peptx.co.uk"),
]

for slug, url, ref in jobs:
    raw = grab(url, ref)
    im = Image.open(io.BytesIO(raw))
    print(f"{slug:16} src {im.mode} {im.size} {len(raw)}b")
    if im.mode in ("RGBA", "LA", "P"):
        bg = Image.new("RGB", im.size, (255, 255, 255))
        im2 = im.convert("RGBA")
        bg.paste(im2, mask=im2.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")
    dest = f"public/images/vendors/{slug}.png"
    im.save(dest, "PNG")
    print(f"   -> {dest} {os.path.getsize(dest)}b  {im.size}")
