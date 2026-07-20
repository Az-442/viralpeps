"""Re-merge articles with slug keys for content Record format."""
files = [
    ("semaglutide-research-summary", "/tmp/semaglutide-content.ts"),
    ("nad-plus-research-summary", "/tmp/nad-content.ts"),
    ("mots-c-research-summary", "/tmp/mots-c-content.ts"),
    ("ss-31-research-summary", "/tmp/ss-31-content.ts"),
]

parts = []
for key, fpath in files:
    with open(fpath) as f:
        obj = f.read().strip()
    # Strip 'const article = ' prefix and trailing ';'
    if obj.startswith("const article = "):
        obj = obj[len("const article = "):]
    if obj.endswith(";"):
        obj = obj[:-1]
    obj = obj.strip()
    # Add slug key wrapper
    wrapped = f'  "{key}": {obj}'
    parts.append(wrapped)

result = ",\n".join(parts)
with open("/tmp/merged_articles.ts", "w") as f:
    f.write(result)
print(f"Merged {len(parts)} articles with slug keys, {len(result)} bytes")
