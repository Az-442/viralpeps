"""Merge the three KW29 articles into research-content.ts and research.ts."""
import re

REPO = '/Users/time4you/viralpeps'
P = f'{REPO}/src/data/research-content.ts'
NL = chr(10)

SEAM = '  ],' + NL + '},' + NL + NL + '};' + NL + 'export default content;'
src = open(P, encoding='utf-8').read()
assert src.count(SEAM) == 1, f"seam count {src.count(SEAM)}"

blocks = []
for f in ['/tmp/kw29_a1.txt', '/tmp/kw29_a2.txt', '/tmp/kw29_a3.txt']:
    t = open(f, encoding='utf-8').read().strip()
    if not t.endswith(','):
        t += ','
    blocks.append(t)

insert = NL + NL.join(blocks)
replacement = '  ],' + NL + '},' + NL + NL + insert + NL + NL + '};' + NL + 'export default content;'
out = src.replace(SEAM, replacement, 1)
open(P, 'w', encoding='utf-8').write(out)

# verify each new slug appears inside the const object and before the closing
for s in ['mots-c-suppliers-uk', 'buy-research-peptides-uk', 'staircase-of-vial-sizes']:
    n = out.count(f"slug: '{s}'")
    print(f"  content slug '{s}' occurrences: {n}")
print("  'export default content;' at", out.find('export default content;'), "of", len(out))
print("  file grew from", len(src), "to", len(out))
