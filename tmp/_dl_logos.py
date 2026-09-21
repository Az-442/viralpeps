import ssl, urllib.request, os, hashlib

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')

def dl(url, dest, referer=None):
    h = {'User-Agent': UA}
    if referer: h['Referer'] = referer
    req = urllib.request.Request(url, headers=h)
    data = urllib.request.urlopen(req, timeout=40, context=ctx).read()
    open(dest, 'wb').write(data)
    return len(data), hashlib.md5(data).hexdigest()

os.makedirs('public/images/vendors', exist_ok=True)
print("=== VENDOR LOGOS ===")
jobs = [
 ("vialverse", "https://vialverse.com/img/logo-1787432638.jpg", "https://vialverse.com"),
 ("kings-bio-labs", "https://cdn.prod.website-files.com/6a87656033956480c122537d/6a87cd321c3abca6ec115967_E6D2CB33-0706-4EE7-81E8-DC1E99888632.PNG", "https://www.kingsbiolabs.co.uk"),
 ("peptx", "https://peptx.co.uk/__l5e/assets-v1/87764e4e-fd87-4593-93d7-5835f20b0d65/px-crest.webp", "https://peptx.co.uk"),
]
for slug, url, ref in jobs:
    ext = url.split('?')[0].rsplit('.',1)[-1].lower()
    dest = f'public/images/vendors/{slug}.{ext}'
    try:
        n, m = dl(url, dest, ref)
        print(f'OK {slug:18} {n:>8}b  {dest}  md5={m[:10]}')
    except Exception as e:
        print(f'ERR {slug}: {str(e)[:100]}')
