#!/usr/bin/env python3
with open('src/data/compound-tabs.tsx','r') as f:
    c = f.read()
lines = c.split('\n')
for i, line in enumerate(lines):
    if 'molecular:' in line and 'residues:' not in line:
        print(f'Line {i+1}: {line[:100]}')
