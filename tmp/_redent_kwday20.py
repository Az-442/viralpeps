#!/usr/bin/env python3
"""Re-dent the three Day-20 entries from 2-space to column-0 keys, matching the
dominant convention of recent entries in research-content.ts.

Only touches the byte range of the three entries we just inserted.
"""
import os
import re

os.chdir('/Users/time4you/viralpeps')
src = open('src/data/research-content.ts', encoding='utf-8').read()

start = src.index("  'p21-vs-semax': {")
end = src.index('\n\n};\nexport default content;', start)
segment = src[start:end]

# De-indent by exactly 2 spaces any line that starts with 2..N spaces,
# but ONLY lines belonging to this block (all lines in the segment are ours).
lines = segment.split('\n')
fixed = []
for ln in lines:
    if ln.startswith('  '):
        fixed.append(ln[2:])
    else:
        fixed.append(ln)
segment2 = '\n'.join(fixed)

out = src[:start] + segment2 + src[end:]
open('src/data/research-content.ts', 'w', encoding='utf-8').write(out)

# verify
seg = open('src/data/research-content.ts', encoding='utf-8').read()
for slug in ['p21-vs-semax', 'weight-loss-peptide-suppliers-uk', 'cheapest-peptides-uk']:
    m = re.search(r"^'%s': \{" % re.escape(slug), seg, re.M)
    print(slug, 'col-0 key:', bool(m))
print('tail:', repr(seg[-80:]))
print('double comma:', len(re.findall(r',\s*,', seg)))
