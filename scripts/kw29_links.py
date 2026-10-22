import json, re, os

d = json.load(open('/Users/time4you/viralpeps/src/data/compounds.json'))
slugs = {c.get('slug') for c in d}
v = json.load(open('/Users/time4you/viralpeps/src/data/vendors.json'))
vslugs = {x.get('slug') for x in v}
src = open('/Users/time4you/viralpeps/src/data/research-content.ts', encoding='utf-8').read()
reg = open('/Users/time4you/viralpeps/src/data/research.ts', encoding='utf-8').read()
articles = set(re.findall(r"slug:\s*[\"']([a-z0-9-]+)[\"']", src)) | set(re.findall(r"slug:\s*[\"']([a-z0-9-]+)[\"']", reg))

targets = [
    'compounds/mots-c', 'compounds/5-amino-1mq', 'compounds/bpc-157', 'compounds/tb-500',
    'compounds/retatrutide', 'compounds/tirzepatide', 'compounds/ghk-cu', 'compounds/aod-9604',
    'compounds/cjc-1295-no-dac', 'compounds/epitalon', 'compounds/cortagen-research-peptide',
    'research/mots-c-research-summary', 'research/mots-c-for-metabolism', 'research/mots-c-vs-5-amino-1mq',
    'research/aod-9604-vs-mots-c', 'research/high-purity-research-peptides',
    'research/research-peptides-for-sale-uk', 'research/peptides-for-sale-uk',
    'research/where-to-buy-peptides-uk', 'research/buy-peptides-online-uk',
    'research/uk-peptide-price-comparison', 'research/uk-peptide-comparison-site',
    'research/how-to-read-a-coa', 'research/choosing-a-supplier', 'research/peptide-reconstitution-guide',
    'research/cheapest-peptides-uk', 'research/research-peptides-guide', 'research/uk-peptide-directory',
    'research/types-of-research-peptides', 'research/longevity-peptide-suppliers-uk',
    'research/cardiogen-research-summary', 'research/cardiogen-suppliers-uk',
]
print("=== TARGET CHECK ===")
for t in targets:
    kind, s = t.split('/', 1)
    if kind == 'compounds':
        ok = s in slugs
    elif kind == 'vendors':
        ok = s in vslugs
    else:
        ok = s in articles
    print(('OK   ' if ok else 'BROKEN ') + t)

print("\n=== guide images present ===")
for s in ['mots-c-suppliers-uk', 'buy-research-peptides-uk', 'staircase-of-vial-sizes']:
    p = f'/Users/time4you/viralpeps/public/images/guides/{s}.png'
    print(s, os.path.exists(p))
