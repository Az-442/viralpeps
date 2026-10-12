#!/usr/bin/env python3
"""Precise check: literal backslash-run lengths before n in each fragment."""
import re
import sys

for path in sys.argv[1:]:
    raw = open(path, 'rb').read()
    runs = {}
    for m in re.finditer(rb'(\\+)n', raw):
        L = len(m.group(1))
        runs[L] = runs.get(L, 0) + 1
    total_n = raw.count(b'n')
    print(f'{path}:')
    print(f'   backslash-runs before n: {dict(sorted(runs.items()))}')
    print(f'   raw.count(b"\\\\n") = {raw.count(bytes([92, 110]))}  (single-backslash n occurrences)')
    print(f'   raw.count(b"\\\\\\\\n") = {raw.count(bytes([92, 92, 110]))}  (double-backslash n)')
    print(f'   raw.count(b"\\\\\\\\\\\\\\\\n") = {raw.count(bytes([92, 92, 92, 92, 110]))}')
