import ssl, urllib.request, re, json, os, hashlib, time

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')

def fetch(u):
    req = urllib.request.Request(u, headers={'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9'})
    return urllib.request.urlopen(req, timeout=35, context=ctx).read().decode('utf-8', errors='ignore')

locs = json.load(open('tmp/_vv_sitemap.json'))
pep = [u for u in locs if '/peptides/' in u]

OUT = 'public/images/products/vialverse'
os.makedirs(OUT, exist_ok=True)

found = {}
for u in pep:
    slug = u.rstrip('/').split('/')[-1]
    try:
        body = fetch(u)
        # product image candidates: /NNN-large_default/name.jpg  or -default_md- / images
        cands = re.findall(r'(?:src|data-src|content)=["\']((?:https://vialverse\.com)?/\d+-[a-z_]+/[^"\']+\.(?:jpg|jpeg|png|webp))["\']', body)
        cands += re.findall(r'"(https://vialverse\.com/\d+-[a-z_]+/[^"]+\.(?:jpg|jpeg|png|webp))"', body)
        # prefer the largest variant
        def rank(c):
            if 'large_default' in c: return 0
            if 'default_md' in c: return 1
            if 'home_default' in c: return 2
            return 3
        cands = sorted(set(cands), key=rank)
        found[slug] = [c if c.startswith('http') else 'https://vialverse.com' + c for c in cands[:6]]
        print(f'{slug:24} {len(cands)} cands  {found[slug][:1]}')
    except Exception as e:
        print(f'ERR {slug}: {str(e)[:70]}')
    time.sleep(0.2)

json.dump(found, open('tmp/_vv_imgs.json','w'), indent=2)
