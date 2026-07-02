#!/usr/bin/env python3
with open('src/data/compound-tabs.tsx','r') as f:
    lines = f.readlines()
for i in range(3835, min(3845, len(lines))):
    print(f'{i+1}: {repr(lines[i])}', end='')
