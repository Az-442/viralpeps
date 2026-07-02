#!/usr/bin/env python3
"""Fix all molecular blocks with double commas properly."""
FILE = "src/data/compound-tabs.tsx"
with open(FILE, 'r') as f:
    content = f.read()

fixes = [
    ('}], , diagramTitle:', '}], diagramTitle:'),
    ('"}], , diagramTitle:', '"}], diagramTitle:'),
    ('"]], , diagramTitle:', '"]], diagramTitle:'),
]

for old, new in fixes:
    if old in content:
        content = content.replace(old, new)
        print(f"Fixed: {old}")

with open(FILE, 'w') as f:
    f.write(content)
print("Done")
