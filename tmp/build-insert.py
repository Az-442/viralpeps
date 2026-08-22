#!/usr/bin/env python3
"""Build combined insertion blocks for research.ts and research-content.ts"""
import os, re

tmp_dir = '/Users/time4you/viralpeps/tmp'

files = [
    'article-weight-loss.txt',
    'article-skin.txt',
    'article-recovery.txt',
    'article-ghkcu-skin-hair.txt',
]

# Extract research.ts entries and research-content.ts entries
ts_entries = []
content_entries = []

for fname in files:
    path = os.path.join(tmp_dir, fname)
    with open(path) as f:
        text = f.read()
    parts = text.split('---ARTICLE---')
    if len(parts) != 2:
        print(f"ERROR: {fname} has {len(parts)} parts, expected 2")
        continue
    ts_entries.append(parts[0].strip())
    content_entries.append(parts[1].strip())

# Build research.ts insertion block
# Insert before "];" (end of guides array)
# The 4 entries go after the last existing entry (best-peptides-for-muscle-growth)
# Each TS entry is already a bare {...} object literal
ts_block = ',\n'.join(ts_entries)
print(f"=== RESEARCH.TS INSERTION ===")
print(ts_block)
print(f"\n({len(ts_entries)} entries)")

# Build research-content.ts insertion block
# Insert before "};" (end of content Record)
# Each content entry is already 'slug': { ... } 
content_block_parts = []
for entry in content_entries:
    content_block_parts.append(f'{entry}')
content_block = ',\n'.join(content_block_parts)
print(f"\n=== RESEARCH-CONTENT.TS INSERTION ===")
print(f"{content_block[:200]}...")
print(f"\n({len(content_entries)} entries)")

# Build the combined research-content.ts insertion (with trailing comma format)
combined_content = ''
for i, entry in enumerate(content_entries):
    combined_content += entry
    if i < len(content_entries) - 1:
        combined_content += ',\n'
    else:
        combined_content += '\n'

# Write combined insert files
with open(os.path.join(tmp_dir, 'research-ts-block.txt'), 'w') as f:
    f.write(ts_block)

with open(os.path.join(tmp_dir, 'research-content-block.txt'), 'w') as f:
    f.write(combined_content)

print(f"\nWritten to tmp/")
