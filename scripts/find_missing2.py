#!/usr/bin/env python3
"""Fix remaining molecular blocks missing residues/legend."""
import re
FILE = "src/data/compound-tabs.tsx"
with open(FILE, 'r') as f:
    content = f.read()

# Find all molecular blocks that are on a single line (compact format)
# and are missing 'residues:'
lines = content.split('\n')
for i, line in enumerate(lines):
    stripped = line.strip()
    if stripped.startswith('molecular:') and 'residues:' not in stripped:
        print(f"Line {i+1}: MISSING residues -> {stripped[:100]}...")
