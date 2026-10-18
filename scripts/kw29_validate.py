"""Validate every internal link inside the three KW29 articles against real slugs."""
import json, re

REPO = '/Users/time4you/viralpeps'
src = open(f'{REPO}/src/data/research-content.ts', encoding='utf-8').read()

comp = {c.get('slug') for c in json.load(open(f'{REPO}/src/data/compounds.json'))}
vend = {v.get('slug') for v in json.load(open(f'{REPO}/src/data/vendors.json'))}
reg = open(f'{REPO}/src/data/research.ts', encoding='utf-8').read()
arts = set(re.findall(r"slug:\s*[\"']([a-z0-9-]+)[\"']", src)) | set(re.findall(r"slug:\s*[\"']([a-z0-9-]+)[\"']", reg))

# slice each new article's byte range
pos = [(m.start(), m.group(1)) for m in re.finditer(r"[\"']([a-z0-9-]+)[\"']:\s*\{", src)]
idx = {k: i for i, (p, k) in enumerate(pos)}

bad = 0
total = 0
for key in ['mots-c-suppliers-uk', 'buy-research-peptides-uk', 'staircase-of-vial-sizes']:
    i = idx[key]
    start = pos[i][0]
    end = pos[i + 1][0] if i + 1 < len(pos) else len(src)
    blk = src[start:end]
    links = sorted(set(re.findall(r"\]\((/[a-z0-9\-/]*)\)", blk)))
    print(f"\n{key}: {len(links)} distinct internal links")
    for l in links:
        total += 1
        parts = l.strip('/').split('/')
        if parts[0] == 'compounds':
            ok = len(parts) > 1 and parts[1] in comp
        elif parts[0] == 'vendors':
            ok = len(parts) > 1 and parts[1] in vend
        elif parts[0] == 'research':
            ok = len(parts) > 1 and parts[1] in arts
        else:
            ok = False
        print(('  OK     ' if ok else '  BROKEN ') + l)
        if not ok:
            bad += 1
print(f"\nTOTAL {total} links, {bad} broken")

missing = [s for s in ['mots-c-suppliers-uk', 'buy-research-peptides-uk', 'staircase-of-vial-sizes'] if s not in arts]
print("registry missing:", missing)
