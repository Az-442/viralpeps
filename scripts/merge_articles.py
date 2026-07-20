"""Merge 4 article tmp files into a single TS block for insertion."""
files = [
    "/tmp/semaglutide-content.ts",
    "/tmp/nad-content.ts",
    "/tmp/mots-c-content.ts",
    "/tmp/ss-31-content.ts",
]

parts = []
for fpath in files:
    with open(fpath) as f:
        obj = f.read().strip()
    if obj.startswith("const article = "):
        obj = obj[len("const article = "):]
    if obj.endswith(";"):
        obj = obj[:-1]
    obj = obj.strip()
    parts.append(obj)

result = ",\n".join(parts)
with open("/tmp/merged_articles.ts", "w") as f:
    f.write(result)
print(f"Merged {len(parts)} articles, {len(result)} bytes -> /tmp/merged_articles.ts")
