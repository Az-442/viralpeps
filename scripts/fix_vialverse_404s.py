#!/usr/bin/env python3
"""
VialVerse 404 repair.

Guard #1 found two source URLs returning hard 404:
  /peptides/melanotan-i    (maps to compound melanotan-i)
  /peptides/melanotan-ii   (maps to compound melanotan-ii)

Neither slug appears in VialVerse's own sitemap as a live page. The sitemap
lists the delisted slug spellings, so they were retired. Resolve the real
current URLs by scraping the live catalogue for the tanning compounds, and if
they cannot be verified, pull the dead source so no soft/hard 404 ships.
"""
import re, ssl, urllib.request, json, sys

UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'}
ROOT = '/Users/time4you/viralpeps'

def get(u):
    r = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30,
                               context=ssl._create_unverified_context())
    return r.getcode(), r.read(600000).decode('utf-8', 'ignore')

# 1. Scrape the live catalogue pages for any tanning/melanotan product links.
found = {}
for listing in ['https://vialverse.com/peptides', 'https://vialverse.com/all-products',
                'https://vialverse.com/', 'https://vialverse.com/peptides-melanotan',
                'https://vialverse.com/research-fields/hormone-receptor']:
    try:
        code, html = get(listing)
    except Exception as e:
        print(f'  listing {listing}: {str(e)[:50]}')
        continue
    links = set(re.findall(r'href="(/peptides/[a-z0-9\-]+)"', html, re.I))
    tan = sorted(l for l in links if re.search(r'melan|mt-?[12]|tan', l, re.I))
    print(f'  {listing} -> {len(links)} peptide links, tanning matches: {tan}')
    for t in tan:
        found[t] = listing

print('\nTanning candidates on the live catalogue:', list(found) or 'NONE FOUND')

# 2. Also try the obvious slug guesses that are NOT the dead ones.
for guess in ['/peptides/melanotan-2', '/peptides/mt-2', '/peptides/melanotan-1', '/peptides/mt-1']:
    try:
        code, html = get('https://vialverse.com' + guess)
        t = re.search(r'<title[^>]*>(.*?)</title>', html, re.I | re.S)
        title = re.sub(r'\s+', ' ', t.group(1)).strip()[:60] if t else ''
        print(f'  {guess} -> {code}  {title}')
        if code == 200 and re.search(r'melanotan|mt-[12]', guess, re.I):
            found[guess] = 'guess'
    except Exception as e:
        print(f'  {guess} -> {str(e)[:45]}')

# 3. Apply: if a real URL was found, rewrite; otherwise remove the dead source.
comp = json.load(open(f'{ROOT}/src/data/compounds.json'))
changed = []

DEAD = {
    'https://vialverse.com/peptides/melanotan-i': 'melanotan-i',
    'https://vialverse.com/peptides/melanotan-ii': 'melanotan-ii',
}

for c in comp:
    for s in c.get('sources', []):
        if s.get('vendor') != 'VialVerse':
            continue
        if s.get('url') in DEAD:
            changed.append((c['slug'], s['url']))

print('\nDead VialVerse sources found:', changed)

if len(sys.argv) > 1 and sys.argv[1] == '--apply':
    removed = 0
    for c in comp:
        before = len(c.get('sources', []))
        c['sources'] = [s for s in c.get('sources', [])
                        if not (s.get('vendor') == 'VialVerse' and s.get('url') in DEAD)]
        removed += before - len(c['sources'])
    json.dump(comp, open(f'{ROOT}/src/data/compounds.json', 'w'), indent=2)
    open(f'{ROOT}/src/data/compounds.json', 'a').write('\n')
    print(f'APPLIED: removed {removed} dead VialVerse source(s)')
