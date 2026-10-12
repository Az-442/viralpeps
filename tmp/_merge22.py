import re, os

ROOT = '/Users/time4you/viralpeps'
RC = os.path.join(ROOT, 'src/data/research-content.ts')
NL = chr(10)

src = open(RC, 'rb').read().decode('utf-8')

SEAM = '  ],' + NL + '},' + NL + NL + '};' + NL + 'export default content;'
n = src.count(SEAM)
print("seam count:", n)
assert n == 1, "seam not unique"

blocks = []
for f in ['/tmp/kw22_a.ts', '/tmp/kw22_b.ts', '/tmp/kw22_c.ts']:
    b = open(f).read()
    b = b.rstrip()
    if not b.endswith(','):
        b += ','
    blocks.append(b)

insert = NL.join(blocks)
new = src.replace(SEAM, '  ],' + NL + '},' + NL + NL + insert + NL + NL + '};' + NL + 'export default content;')

# sanity: no doubled separators
assert new.count('},' + NL + ',' + NL) == 0
assert new.count('},,') == 0

open(RC, 'w').write(new)
print("merged. new size:", len(new), "delta:", len(new)-len(src))

# verify keys present
for k in ['buy-kpv-uk','aod-9604-vs-mots-c','recovery-peptide-suppliers-uk']:
    print(k, "->", ("'%s'" % k) in new)
