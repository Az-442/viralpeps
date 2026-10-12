#!/usr/bin/env python3
"""Print the tb-500-suppliers-uk entry from research-content.ts to use as a structural template."""
import os
import re

os.chdir('/Users/time4you/viralpeps')
rc = open('src/data/research-content.ts', encoding='utf-8').read()

key = 'tb-500-suppliers-uk'
# find `'key': {` (any quote) as a Record key at line start-ish
m = re.search(r"\n['\"]" + re.escape(key) + r"['\"]\s*:\s*\{", rc)
if not m:
    print('NOT FOUND')
    raise SystemExit
start = m.start() + 1

# brace-match to find end of object
i = rc.index('{', m.end() - 1)
depth = 0
j = i
in_str = None
esc = False
while j < len(rc):
    ch = rc[j]
    if in_str:
        if esc:
            esc = False
        elif ch == '\\':
            esc = True
        elif ch == in_str:
            in_str = None
    else:
        if ch in ('"', "'"):
            in_str = ch
        elif ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                break
    j += 1
print(rc[start:j + 1])
