#!/usr/bin/env python3
"""Fix molecular blocks missing residues and legend."""
FILE = "src/data/compound-tabs.tsx"
with open(FILE, 'r') as f:
    content = f.read()

# Fix patterns: molecular: { ... } without residues
import re

# Replace molecular blocks that don't have residues
def fix_molecular(match):
    block = match.group(0)
    if 'residues:' in block:
        return block
    # Add empty residues and legend before closing }
    block = block.rstrip()
    if block.endswith(' }'):
        block = block[:-2] + ', residues: [], legend: "" }'
    elif block.endswith(' },'):
        block = block[:-3] + ', residues: [], legend: "" },'
    return block

# Find molecular blocks
content = re.sub(
    r'molecular:\s*\{[^}]*?\}',
    fix_molecular,
    content
)

with open(FILE, 'w') as f:
    f.write(content)
print("Fixed molecular blocks")
