"""Insert merged articles into research-content.ts before closing };"""
with open("src/data/research-content.ts") as f:
    lines = f.readlines()

with open("/tmp/merged_articles.ts") as f:
    merged = f.read()

# Find insertion point: the '};' near end of file closing the content Record
insert_pos = None
for i in range(len(lines) - 1, -1, -1):
    if lines[i].strip() == "};":
        insert_pos = i
        break

if insert_pos is None:
    print("ERROR: Could not find }; closing brace")
    exit(1)

# Indent each line by 2 spaces
merged_indented = ""
for line in merged.split("\n"):
    if line.strip():
        merged_indented += "  " + line + "\n"
    else:
        merged_indented += "\n"

# Insert before '};'
new_lines = lines[:insert_pos] + [merged_indented] + lines[insert_pos:]

with open("src/data/research-content.ts", "w") as f:
    f.writelines(new_lines)

print(f"Inserted at line {insert_pos + 1}, total file now {len(new_lines)} lines")
