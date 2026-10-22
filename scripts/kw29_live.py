import re, subprocess, urllib.request

BASE = 'https://www.viralpeps.co.uk'
SLUGS = ['mots-c-suppliers-uk', 'buy-research-peptides-uk', 'staircase-of-vial-sizes']
EXPECT = {
    'mots-c-suppliers-uk': 'MOTS-c Suppliers UK',
    'buy-research-peptides-uk': 'Buy Research Peptides UK',
    'staircase-of-vial-sizes': 'Staircase of Vial Sizes',
}


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=45) as r:
        return r.getcode(), r.read()


print("=== LIVE ARTICLE CHECK ===")
for s in SLUGS:
    code, body = get(f'{BASE}/research/{s}')
    h = body.decode('utf-8', 'replace')
    title = (re.search(r'<title>(.*?)</title>', h, re.S) or [None, 'NO TITLE'])[1]
    canon = (re.search(r'<link rel="canonical" href="([^"]+)"', h) or [None, 'NONE'])[1]
    ok_title = EXPECT[s].lower() in title.lower()
    ok_canon = canon.rstrip('/').endswith(f'/research/{s}')
    print(f"  {s}")
    print(f"    {code}  title_ok={ok_title}  canonical_ok={ok_canon}")
    print(f"    title: {title[:110]}")
    print(f"    canon: {canon}")

print("\n=== CARD IMAGES ===")
for s in SLUGS:
    try:
        code, body = get(f'{BASE}/images/guides/{s}.png')
        print(f"  {s}.png -> {code} {len(body)} bytes")
    except Exception as e:
        print(f"  {s}.png -> ERR {e}")

print("\n=== INTEGRATION ===")
code, body = get(f'{BASE}/research')
h = body.decode('utf-8', 'replace')
for s in SLUGS:
    print(f"  /research lists {s}: {f'/research/{s}' in h}")
code, body = get(f'{BASE}/sitemap.xml')
sm = body.decode('utf-8', 'replace')
for s in SLUGS:
    print(f"  sitemap has {s}: {s in sm}")
code, body = get(f'{BASE}/compounds/mots-c')
print(f"  /compounds/mots-c links mots-c-suppliers-uk: {'/research/mots-c-suppliers-uk' in body.decode('utf-8','replace')}")
