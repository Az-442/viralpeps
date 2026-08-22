#!/usr/bin/env python3
"""Fix duplicate export default content and add remaining ghkcu skin/hair article"""
import re

path = '/Users/time4you/viralpeps/src/data/research-content.ts'
with open(path) as f:
    content = f.read()

# Remove duplicate export default content lines
content = re.sub(r'\nexport default content;\s*\nexport default content;', '\nexport default content;', content)

# Count occurrences
count = content.count('export default content;')
print(f"export default content; count: {count}")

# Now add the ghk-cu-for-skin-hair entry
# Read from temp file
with open('/Users/time4you/viralpeps/tmp/article-ghkcu-skin-hair.txt') as f:
    ghkcu_content = f.read()

# Parse the content portion (after ---ARTICLE---)
parts = ghkcu_content.split('---ARTICLE---')
if len(parts) == 2:
    ghkcu_entry = parts[1].strip()
else:
    print(f"ERROR: ghkcu file has {len(parts)} parts")
    exit(1)

# Insert before the final };\nexport default content;
closing = '\n};\nexport default content;'
idx = content.rfind(closing)
if idx == -1:
    print("ERROR: Could not find closing pattern")
    exit(1)

# Insert with a comma separator (the previous entry's closing is },
# so ghkcu entry is added as ,\nentry\n
# Actually, the closing is };\n - a single } closes the last content entry,
# then ; closes the Record. We need to insert between } and ;
# But the closing pattern is:\n};\nexport default content;
# The } closes the Record object, so we need to INSERT before the } that closes the Record.
# The last entry before the closing ends with\n],\n},
# Then the Record closes with };
# So we insert between the last entry's } and the Record's };
# The pattern is: last_entry_closing\n};\nexport default content;
# Where last_entry_closing is:\n],\n},
# Let me find a longer unique anchor

# Actually, let me find the last }, before };\nexport default content;
# and insert after that },

closing_start = '],\n},\n};\nexport default content;'
idx2 = content.rfind(closing_start)
if idx2 == -1:
    # Try alternative pattern
    closing_start = ']\n  ],\n},\n};\nexport default content;'
    idx2 = content.rfind(closing_start)
    if idx2 == -1:
        print("ERROR: Could not find closing entry pattern")
        # Let's find what's at the end
        print(f"Last 200 chars: {repr(content[-200:])}")
        exit(1)

# Insert the ghkcu entry between the last entry's closing }, and the Record's };
# The pattern is: ...,\n},\n};\nexport default content;
# We want: ...,\n},\nghkcu_entry,\n};\nexport default content;
insertion_point = idx2 + len(',\n},\n')  # Position after the closing }, of the last entry
new_content = content[:idx2] + ',\n' + ghkcu_entry + ',\n}\n};\nexport default content;' + content[idx2 + len(',\n},\n};\nexport default content;'):]

with open(path, 'w') as f:
    f.write(new_content)

print(f"File written: {len(new_content)} chars")
# Verify
double_export = new_content.count('export default content;')
print(f"export default content; count after: {double_export}")
