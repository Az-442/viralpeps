#!/usr/bin/env python3
"""Add ghkcu skin/hair entry to research-content.ts"""
import re

path = '/Users/time4you/viralpeps/src/data/research-content.ts'
with open(path) as f:
    content = f.read()

# Read ghkcu entry from temp file
with open('/Users/time4you/viralpeps/tmp/article-ghkcu-skin-hair.txt') as f:
    ghkcu_text = f.read()
parts = ghkcu_text.split('---ARTICLE---')
ghkcu_entry = parts[1].strip()

# Find the closing - the last occurrence before export default content
# The file ends with:
#   ]
# },
# };
# export default content;

# Find the last }, before };\nexport default content;
closing_pattern = '],\n},\n};\nexport default content;'
idx = content.rfind(closing_pattern)
if idx == -1:
    print("Trying alternate pattern...")
    # Try without newlines
    idx = content.rfind('};\nexport default content;')
    if idx == -1:
        print("Could not find closing pattern")
        exit(1)
    # Go back to find the start of the last entry
    last_entry_start = content.rfind('\n},\n', 0, idx)
    if last_entry_start == -1:
        last_entry_start = idx
    else:
        last_entry_start += 3  # skip past the },\n
    
    new_content = content[:last_entry_start] + ',\n' + ghkcu_entry + '\n' + content[last_entry_start:]
else:
    # We found ],\n},\n};\nexport default content;
    # The ] closes last entry's refs array, }, closes last entry object
    # We insert between the } and }; - which means we replace the pattern
    # with ],\n},\nghkcu_entry\n};\nexport default content;
    old = content[idx:idx+len(closing_pattern)]
    new_part = '],\n},\n' + ghkcu_entry + '\n};\nexport default content;'
    new_content = content[:idx] + new_part + content[idx+len(closing_pattern):]

with open(path, 'w') as f:
    f.write(new_content)

print(f"File written: {len(new_content)} chars")
# Verify
double_export = new_content.count('export default content;')
print(f"export default content; count: {double_export}")
count_ghkcu = new_content.count('ghk-cu-for-skin-hair')
print(f"ghk-cu-for-skin-hair occurrences: {count_ghkcu}")
