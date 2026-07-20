"""Insert merged articles (with slug keys) into research-content.ts."""
with open("src/data/research-content.ts") as f:
    lines = f.readlines()

with open("/tmp/merged_articles.ts") as f:
    merged = f.read()

# Find insertion point: '};' near end of file closing the content Record
insert_pos = None
for i in range(len(lines) - 1, -1, -1):
    if lines[i].strip() == "};":
        insert_pos = i
        break

if insert_pos is None:
    print("ERROR: Could not find }; closing brace")
    exit(1)

# Already has proper indentation from merge script
merged_lines = merged.split("\n")

# Insert before '};'
new_lines = lines[:insert_pos] + [l + "\n" for l in merged_lines] + lines[insert_pos:]

with open("src/data/research-content.ts", "w") as f:
    f.writelines(new_lines)

print(f"Inserted at line {insert_pos + 1}, total file now {len(new_lines)} lines")
