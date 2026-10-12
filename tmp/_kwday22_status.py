import re, json, os

rc = open('src/data/research-content.ts').read()
rt = open('src/data/research.ts').read()

# Record keys in research-content
keys_rc = set(re.findall(r"^\s*['\"]([a-z0-9\-\.]+)['\"]:\s*\{", rc, re.M))
# slug: fields
slugs_rc = set(re.findall(r"slug:\s*['\"]([a-z0-9\-\.]+)['\"]", rc))
all_rc = keys_rc | slugs_rc
print("research-content keys:", len(keys_rc), "slug fields:", len(slugs_rc))

# registry slugs in research.ts guides array
slugs_rt = set(re.findall(r"slug:\s*['\"]([a-z0-9\-\.]+)['\"]", rt))
print("research.ts slugs:", len(slugs_rt))

# plan
plan = open('kw-phase-1-list.md').read()
days = re.findall(r"^## Day (\d+) .*?\n(.*?)(?=^## Day |\Z)", plan, re.M | re.S)
for num, body in days:
    entries = re.findall(r"`([a-z0-9\-]+)`\s*—\s*\*\*(.+?)\*\*\s*\((\w+)\)", body)
    status = []
    for slug, name, typ in entries:
        present = (slug in keys_rc) or (slug in slugs_rc) or (slug in slugs_rt)
        status.append(f"{slug}={'OK' if present else 'MISSING'}")
    print(f"Day {num}: " + " | ".join(status))
