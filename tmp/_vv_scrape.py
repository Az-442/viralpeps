import ssl, urllib.request, re, json, time

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')

def fetch(u):
    req = urllib.request.Request(u, headers={'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9'})
    r = urllib.request.urlopen(req, timeout=30, context=ctx)
    return r.getcode(), r.read().decode('utf-8', errors='ignore')

locs = json.load(open('tmp/_vv_sitemap.json'))
pep = [u for u in locs if '/peptides/' in u]
print("PEPTIDE PAGES:", len(pep))

out = {}
for u in pep:
    slug = u.rstrip('/').split('/')[-1]
    try:
        code, body = fetch(u)
        title = re.search(r'<title[^>]*>(.*?)</title>', body, re.I|re.S)
        title = title.group(1).strip() if title else "NO TITLE"
        # JSON-LD offers: price + currency
        offers = re.findall(r'\{"@type":"Offer".*?\}', body, re.S)
        prices = [float(p) for p in re.findall(r'"price":"?([\d.]+)"?', body)]
        # variant names/doses near offers
        names = re.findall(r'"name":"([^"]{2,40})"', body)
        # image
        og = re.search(r'property=["\']og:image["\'][^>]+content=["\']([^"\']+)', body, re.I)
        # soft-404 guard: title must name the product, not just the site
        n_offer_blocks = len(re.findall(r'"@type":"Offer"', body))
        out[slug] = {
            "url": u, "status": code, "title": title,
            "prices": sorted(set(prices)), "n_offers": n_offer_blocks,
            "og": og.group(1) if og else None,
        }
        print(f'{code} | {slug:24} | offers={n_offer_blocks:2} | prices={sorted(set(prices))[:8]} | {title[:52]}')
    except Exception as e:
        print(f'ERR | {slug:24} | {str(e)[:70]}')
        out[slug] = {"url": u, "error": str(e)[:120]}
    time.sleep(0.25)

json.dump(out, open('tmp/_vv_pages.json','w'), indent=2)
