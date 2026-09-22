#!/usr/bin/env python3
"""
MANDATORY NEW GUARDS — run before shipping ANY listing.

1. Title-content check  — the page must be a real product page: product-specific
   title (NOT the bare site title) AND a visible price AND an add-to-cart control.
   A soft-404 serves the site shell: generic title, no price.
   NOTE: literal slug-token matching is deliberately NOT used — it false-positives
   on legitimately worded titles (e.g. "GLOW Peptide Blend" for slug glow-blend).
2. Category-page reject — /shop, /products, /category/*, /collections/* are never
   valid product URLs.
3. Image uniqueness     — a vendor's product images must not share one MD5
   (byte-identical files = placeholders).
4. Price sanity         — flag any price >3x or <1/3 of the median for that
   compound across all vendors (usually a bulk/MOQ price leaking into a
   single-unit field).

Usage:  python3 scripts/supplier_guards.py
Exit 0 = all pass, exit 1 = failures.
"""
import json, re, ssl, urllib.request, hashlib, os, sys, statistics, concurrent.futures

ROOT = '/Users/time4you/viralpeps'

VENDORS = [
    ('PeptX', 'peptx'),
    ('Claripep', 'claripep'),
    ('VialVerse', 'vialverse'),
    ('Kings BioLabs', 'kings-bio-labs'),
]

UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'}

# Bare/generic site title each vendor serves on a soft-404 or category page.
SITE_TOKENS = dict([
    ('PeptX', 'Peptx, Research Peptides Direct from Factory'),
    ('Claripep', 'Claripep'),
    ('VialVerse', 'VialVerse'),
    ('Kings BioLabs', 'Buy Peptides UK | Research Use Only | Kings BioLabs'),
])

compounds = json.load(open(ROOT + '/src/data/compounds.json'))

# --- PeptX is a client-rendered SPA: its product HTML carries NO price, so
# --- price/cart sniffing false-fails. Its authoritative catalogue is its own
# --- public API, which we cache here and use as the product-page evidence.
PEPTX_LIVE = {}
_pl = '/tmp/peptx_live.json'
if os.path.exists(_pl):
    _d = json.load(open(_pl))
    for _p in _d['products']:
        for _v in _d['variants']:
            if _v['product_id'] == _p['id'] and _v.get('is_active') and _v.get('price_gbp') is not None:
                PEPTX_LIVE.setdefault(_p['id'], []).append(_v)


def peptx_api_evidence(url):
    """Return (ok, detail) using PeptX's live catalogue for a /single-vials/<slug> URL.

    The /single-vials/<slug> PAGE slug does not always equal the catalogue
    product id, so map the known divergences explicitly rather than guessing.
    """
    slug = url.rstrip('/').split('/')[-1]
    ALIAS = {
        'klow-blend': 'sv-klow',
        'nad': 'sv-nad-plus',
        'oxytocin-acetate': 'sv-oxytocin',
        'ta-1-thymosin-alpha-1': 'sv-ta1',
        'mt-1': 'sv-mt-1',
        'semax': 'sv-semax',
        'selank': 'sv-selank',
    }
    pid = ALIAS.get(slug, 'sv-' + slug)
    rows = PEPTX_LIVE.get(pid)
    if not rows:
        for k in PEPTX_LIVE:
            if k.startswith('sv-') and k[3:].replace('-', '') == slug.replace('-', ''):
                rows = PEPTX_LIVE[k]
                pid = k
                break
    if not rows:
        return False, 'no live catalogue rows for %s' % pid
    doses = sorted(set(str(r.get('dose')) for r in rows))
    return True, 'live API %s: %d active variant(s) %s' % (pid, len(rows), doses[:3])

# ---------- gather entries ----------
entries = dict((name, []) for name, _ in VENDORS)
for c in compounds:
    for s in c.get('sources', []):
        if s.get('vendor') in entries:
            e = dict(s)
            e['compound'] = c['slug']
            e['compound_name'] = c.get('name')
            entries[s['vendor']].append(e)


def fetch(u):
    try:
        req = urllib.request.Request(u, headers=UA)
        r = urllib.request.urlopen(req, timeout=25, context=ssl._create_unverified_context())
        body = r.read(300000).decode('utf-8', errors='ignore')
        t = re.search(r'<title[^>]*>(.*?)</title>', body, re.I | re.S)
        title = re.sub(r'\s+', ' ', t.group(1)).strip() if t else ''
        has_price = bool(re.search(r'£\s?\d', body))
        has_cart = bool(re.search(r'add to (cart|basket)|add-to-cart|woocommerce-add-to-cart', body, re.I))
        return r.getcode(), title, has_price, has_cart, None
    except Exception as e:
        return None, '', False, False, str(e)[:70]


fail = 0

# ---------- GUARD 1 + 2 ----------
print('=' * 78)
print('GUARD 1 (title-content / real product page) + GUARD 2 (category-page reject)')
print('=' * 78)
for vendor, slug in VENDORS:
    urls = sorted(set(e['url'] for e in entries[vendor]))
    print('\n--- %s: %d unique URLs, %d entries' % (vendor, len(urls), len(entries[vendor])))
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
        results = list(ex.map(fetch, urls))
    for u, (code, title, has_price, has_cart, err) in zip(urls, results):
        problems = []
        if re.search(r'/(shop|products|category|collections)(/|$)', u):
            problems.append('CATEGORY PAGE')
        if code is None:
            problems.append('FETCH ERR ' + (err or ''))
        elif code != 200:
            problems.append('HTTP %s' % code)
        elif not title:
            problems.append('NO TITLE')
        else:
            site_name = re.sub(r'[^a-z0-9]', '', SITE_TOKENS[vendor].lower())
            if re.sub(r'[^a-z0-9]', '', title.lower()) == site_name:
                problems.append('SOFT-404 (bare site title: "%s")' % title[:48])
            elif vendor == 'PeptX':
                # SPA: validate against PeptX's own live catalogue instead of
                # sniffing price/cart out of client-rendered HTML.
                ok, detail = peptx_api_evidence(u)
                if not ok:
                    problems.append('PEPTX API: ' + detail)
                else:
                    title = title + '  [' + detail + ']'
            elif not has_price or not has_cart:
                problems.append('NOT A PRODUCT PAGE (price=%s, cart=%s) "%s"'
                                % (has_price, has_cart, title[:42]))
        if problems:
            fail += 1
            print('   FAIL %s\n        -> %s' % (u, ' | '.join(problems)))
        else:
            print('   OK   %s  [%s]' % (u, title[:58]))

# ---------- GUARD 3 ----------
print('\n' + '=' * 78)
print('GUARD 3 (image uniqueness — byte-identical placeholders)')
print('=' * 78)
for vendor, slug in VENDORS:
    d = ROOT + '/public/images/products/' + slug
    if not os.path.isdir(d):
        print('   %s: DIRECTORY MISSING %s' % (vendor, d))
        fail += 1
        continue
    files = sorted(f for f in os.listdir(d) if f.endswith(('.webp', '.png', '.jpg')))
    hs = {}
    for f in files:
        h = hashlib.md5(open(os.path.join(d, f), 'rb').read()).hexdigest()
        hs.setdefault(h, []).append(f)
    dupes = dict((h, v) for h, v in hs.items() if len(v) > 1)
    referenced = set(os.path.basename(e.get('image') or '') for e in entries[vendor] if e.get('image'))
    missing_ref = sorted(x for x in referenced if x and not os.path.exists(os.path.join(d, x)))
    print('   %s %s: %d files, %d unique MD5s' % ('PASS' if not dupes else 'FAIL', vendor, len(files), len(hs)))
    if dupes:
        fail += 1
        for h, v in dupes.items():
            print('        dup %s -> %s' % (h[:12], v))
    if missing_ref:
        print('        !! referenced-but-missing files: %s' % missing_ref)
    if not referenced:
        print('        !! NO image field set on any entry')

# ---------- GUARD 4 ----------
print('\n' + '=' * 78)
print('GUARD 4 (price sanity vs per-compound median across all vendors)')
print('=' * 78)


def num(p):
    m = re.search(r'([\d.]+)', str(p).replace(',', ''))
    return float(m.group(1)) if m else None


flagged = 0
median_cache = {}
for c in compounds:
    ps = [num(s.get('price')) for s in c.get('sources', [])]
    median_cache[c['slug']] = [x for x in ps if x]

for vendor, slug in VENDORS:
    for e in entries[vendor]:
        p = num(e.get('price'))
        if p is None:
            continue
        peers = median_cache.get(e['compound'], [])
        if len(peers) < 3:
            continue
        med = statistics.median(peers)
        if p > 3 * med or p < med / 3:
            flagged += 1
            print('   FLAG %-12s %-28s %9s (median £%.2f, %.2fx)  %s'
                  % (vendor, e['compound'], e.get('price'), med, p / med, e['url']))
print('   price outliers flagged: %d' % flagged)

print('\n' + '=' * 78)
print('GUARD RESULT: %s' % ('ALL PASS' if fail == 0 else '%d FAILURES' % fail))
print('=' * 78)
sys.exit(1 if fail else 0)
