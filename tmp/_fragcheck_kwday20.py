#!/usr/bin/env python3
"""Type-check each Day-20 fragment as a real module using the project's tsc.

Wraps each block (which starts with the Record key `'slug': { ... }`) inside
`const x: Record<string, ResearchPageContent> = { <block> };` and runs tsc --noEmit.
"""
import os
import subprocess
import sys

ROOT = '/Users/time4you/viralpeps'
os.chdir(ROOT)

FRAGS = {
    '/tmp/kw_day20_p21_vs_semax.ts': 'p21-vs-semax',
    '/tmp/kw_day20_wl_suppliers.ts': 'wl',
    '/tmp/kw_day20_cheapest.ts': 'cheap',
}

os.makedirs('src/data', exist_ok=True)
for path, tag in FRAGS.items():
    body = open(path, encoding='utf-8').read()
    if not body.lstrip().startswith("'"):
        print('WARN: body does not start with a quoted key:', path)
    harness = (
        "import type { ResearchPageContent } from './research-content';\n"
        "const x: Record<string, ResearchPageContent> = {\n"
        + body + "\n};\n"
        "console.log(x);\n"
    )
    out = 'src/data/__fragcheck_image.ts'
    open(out, 'w', encoding='utf-8').write(harness)
    r = subprocess.run(['./node_modules/.bin/tsc', '--noEmit', '--strict',
                        '--moduleResolution', 'bundler', '--module', 'esnext',
                        '--target', 'es2020', '--skipLibCheck', out],
                       capture_output=True, text=True)
    print('===', tag, '===')
    # filter out the import/console lines noise
    print(r.stdout.strip() or '(no tsc output)')
    print(r.stderr.strip() or '')
    print('rc:', r.returncode)
os.remove('src/data/__fragcheck_image.ts')
