import json, re, ssl, urllib.request

# 1. JSON validity
c = json.load(open('src/data/compounds.json'))
v = json.load(open('src/data/vendors.json'))
print("JSON OK. compounds:", len(c), "vendors:", len(v))

# 2. collect Kingston sources
ks = []
for comp in c:
    for s in comp.get('sources', []):
        if s.get('vendor') == 'Kingston Peptides':
            ks.append((comp['slug'], s))
print("Kingston source entries:", len(ks))

# 3. GUARD 1+2: URL title content check
ctx = ssl._create_unverified_context()
print("\n--- URL GUARD CHECK ---")
for slug, s in ks:
    u = s['url']
    try:
        req = urllib.request.Request(u, headers={'User-Agent':'Mozilla/5.0'})
        b = urllib.request.urlopen(req, timeout=25, context=ctx).read().decode('utf-8','ignore')
        t = re.search(r'<title>(.*?)</title>', b, re.I)
        title = t.group(1) if t else 'NO TITLE'
        generic = title.lower().startswith('kingston peptides -') or 'products' in title.lower()[:20]
        cart = 'Add to Cart' in b or 'addToCart' in b or 'shopping cart' in b.lower()
        print(f"  {slug:38s} cart={cart} | {title[:70]}")
    except Exception as e:
        print(f"  {slug:38s} ERR {str(e)[:60]}")

# 4. GUARD 4: price sanity
print("\n--- PRICE SANITY ---")
import statistics
for slug, s in ks:
    comp = [x for x in c if x['slug']==slug][0]
    prices = []
    for src in comp['sources']:
        try:
            prices.append(float(re.sub(r'[£,]','',src['price'])))
        except: pass
    p = float(re.sub(r'[£,]','',s['price']))
    med = statistics.median(prices)
    flag = ''
    if p > 3*med or p < med/3:
        flag = f'  <-- FLAG (median {med:.2f})'
    print(f"  {slug:38s} £{p:.2f} (median £{med:.2f}){flag}")
