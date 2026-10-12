#!/usr/bin/env python3
"""Probe the merge seam in research-content.ts and the registry anchor in research.ts."""
import os

os.chdir('/Users/time4you/viralpeps')
NL = b'\n'

raw = open('src/data/research-content.ts', 'rb').read()
variants = {
    'no-indent': b'],' + NL + b'},' + NL + NL + b'};' + NL + b'export default content;',
    '2s-2s': b'  ],' + NL + b'  },' + NL + NL + b'};' + NL + b'export default content;',
    '2s-0': b'  ],' + NL + b'},' + NL + NL + b'};' + NL + b'export default content;',
    '4s-2s': b'    ],' + NL + b'  },' + NL + NL + b'};' + NL + b'export default content;',
}
print('=== research-content.ts seam variants ===')
for k, v in variants.items():
    print(f'  {k}: {raw.count(v)}')
print('--- tail 160 raw bytes ---')
print(repr(raw[-160:]))
print('--- total bytes ---', len(raw))

r2 = open('src/data/research.ts', 'rb').read()
anchor = b'  },' + NL + b'];' + NL + NL + b'export const compoundList'
print('\n=== research.ts guides-array anchor ===')
print('  count:', r2.count(anchor))
i = r2.find(b'export const compoundList')
print('--- context before compoundList ---')
print(repr(r2[i - 320:i + 50]))

# count existing guides entries
print('\n=== research.ts exports ===')
for pat in [b'export const guides', b'export const compoundList', b'export interface ResearchArticle']:
    print(' ', pat.decode(), '->', r2.find(pat))
