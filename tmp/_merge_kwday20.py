#!/usr/bin/env python3
"""Merge the three Day-20 fragments into src/data/research-content.ts.

Seam (verified this run, no-indent form, matches exactly 1):
    'by the site footer.',\n  ],\n},\n\n};\nexport default content;
actually the raw tail is:  ...],\n},\n\n};\nexport default content;
i.e. b'],' + NL + b'},' + NL + NL + b'};' + NL + b'export default content;'

Replacement keeps the seam's own '],' + NL + '},' and inserts the new entries
each ending with its own trailing comma (the last one too, since it is no
longer last). Then re-emits NL + NL + '};' + NL + 'export default content;'.
"""
import os

os.chdir('/Users/time4you/viralpeps')
NL = '\n'
SEAM = '],' + NL + '},' + NL + NL + '};' + NL + 'export default content;'

rc = open('src/data/research-content.ts', encoding='utf-8').read()
count = rc.count(SEAM)
print('seam matches:', count)
assert count == 1, 'SEAM must match exactly once'

blocks = []
for path in ['/tmp/kw_day20_p21_vs_semax.ts',
             '/tmp/kw_day20_wl_suppliers.ts',
             '/tmp/kw_day20_cheapest.ts']:
    b = open(path, encoding='utf-8').read().rstrip()
    blocks.append(b)

# Each block already starts with "  'slug': {" and ends with "}".
# The original last entry's closing is supplied by the seam's '],\n},'.
# Each new entry must carry its own trailing comma (it is no longer last;
# even the final one, because it is followed by the seam's '],\n},' which
# closes the ORIGINAL last entry that now precedes all of ours? No —
# order: seam's '],\n},' closes the ORIGINAL last entry, then ours follow,
# then NL+NL+};'. So ours are appended AFTER the original last entry's '},'.
# We must give each of ours a trailing comma, including the last, because
# the tail '};' expects a preceding comma-separated list ending '},'.
joined = (',' + NL).join(blocks)   # comma between our entries
# final entry also needs a trailing comma before the tail
new_tail = '],' + NL + '},' + NL + joined + ',' + NL + NL + '};' + NL + 'export default content;'

out = rc.replace(SEAM, new_tail)
open('src/data/research-content.ts', 'w', encoding='utf-8').write(out)

# sanity: no double commas, no stray comma before closing brace
import re
print('double-comma occurrences:', len(re.findall(r',\s*,', out)))
print("'},\\n,\\n' occurrences:", out.count('},\n,\n'))
print("'\\n,\\n\\n};' occurrences:", out.count('\n,\n\n};'))

# verify each slug is a Record key
for slug in ['p21-vs-semax', 'weight-loss-peptide-suppliers-uk', 'cheapest-peptides-uk']:
    print(slug, 'present:', ("'" + slug + "':") in out)

# verify tail
print('tail:', repr(out[-120:]))
