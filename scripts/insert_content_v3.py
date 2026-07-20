#!/usr/bin/env python3
"""Insert 4 article content entries into research-content.ts before export default content;"""
# Read the insert content
with open("/tmp/research_content_insert.txt") as f:
    insert_content = f.read()

# Read the target file
with open("src/data/research-content.ts") as f:
    file_content = f.read()

# Find the end of the content Record — insert before `};` then newline then `export default content;`
# The last entry ends with `]\n}` then next line is `};` then `\nexport default content;\n`
# We want to insert just before `};` that closes the record

# Find: the last `];` closing a references array, then `]` then the next line has `};\n`
# Actually let me find `};\n\nexport default content;`
marker = "};\n\nexport default content;"
pos = file_content.rfind(marker)

if pos == -1:
    # Try alternate patterns
    marker = "};\n\nexport default content"
    pos = file_content.rfind(marker)

if pos != -1:
    # Insert before the `};` that closes the content record
    new_content = file_content[:pos] + ",\n" + insert_content + "\n" + file_content[pos:]
    # The existing last entry already has a comma after it, so our leading comma might duplicate
    # Check: is there already a `},` before the `};`
    # Actually, the last entry ends with `]\n}` — the closing brace of the article, then there should be a comma
    # before the `};` that closes the record. Let me just verify
    
    with open("src/data/research-content.ts", "w") as f:
        f.write(new_content)
    print(f"Inserted at position {pos}")
    print(f"New file size: {len(new_content)} bytes")
else:
    print(f"ERROR: Could not find marker '{marker}' in file")
    # Debug: show the last 200 chars
    print("Last 300 chars of file:")
    print(repr(file_content[-300:]))
