"""Merge the 4 tmp content files into research-content.ts and research.ts."""
import re
import json

# === Step 1: Read tmp files and extract the object bodies ===

def extract_object_body(text, key_name):
    """Extract the TS object body for a given key from a record, or the whole object from a const."""
    # Try record format first: "key": { ... }
    pattern = r'"' + re.escape(key_name) + r'":\s*\{'
    m = re.search(pattern, text)
    if m:
        start = m.end() - 1  # point to opening {
        depth = 0
        for i in range(start, len(text)):
            if text[i] == '{':
                depth += 1
            elif text[i] == '}':
                depth -= 1
                if depth == 0:
                    return text[start:i+1]
        return None
    # Try const format: const name: Type = { ... }
    const_pattern = r'const\s+\w+\s*:\s*\w+\s*=\s*(\{)'
    m2 = re.search(const_pattern, text)
    if m2:
        start = m2.start(1)
        depth = 0
        for i in range(start, len(text)):
            if text[i] == '{':
                depth += 1
            elif text[i] == '}':
                depth -= 1
                if depth == 0:
                    body = text[start:i+1]
                    return body
    return None

# Read all tmp files
files = {
    "ghkcu-research-summary": "/Users/time4you/viralpeps/tmp/ghkcu-content.ts",
    "retatrutide-research-summary": "/Users/time4you/viralpeps/tmp/retatrutide-content.ts",
    "semax-research-summary": "/Users/time4you/viralpeps/tmp/semax-content.ts",
    "selank-research-summary": "/Users/time4you/viralpeps/tmp/selank-content.ts",
}

bodies = {}
for slug, path in files.items():
    with open(path) as f:
        text = f.read()
    obj = extract_object_body(text, slug)
    if obj:
        bodies[slug] = obj
        print(f"Extracted {slug}: {len(obj)} chars")
    else:
        print(f"FAILED to extract {slug}")

if len(bodies) != 4:
    print("ERROR: Not all bodies extracted")
    exit(1)

# === Step 2: Build the insert for research-content.ts ===
# Insert before the last }; (closing of the content record)
insert_blocks = []
for slug, body in bodies.items():
    insert_blocks.append(f'  "{slug}": {body},')

content_insert = "\n".join(insert_blocks) + "\n"

# Read existing research-content.ts
with open("/Users/time4you/viralpeps/src/data/research-content.ts") as f:
    content_ts = f.read()

# Find the closing of the content record: last `};` before `export default content;`
export_idx = content_ts.rfind("export default content;")
# Find the last `};` before export
close_idx = content_ts.rfind("};", 0, export_idx)
if close_idx == -1:
    print("ERROR: Could not find closing }; in research-content.ts")
    exit(1)

new_content_ts = content_ts[:close_idx] + ",\n" + content_insert + content_ts[close_idx:]

with open("/Users/time4you/viralpeps/src/data/research-content.ts", "w") as f:
    f.write(new_content_ts)

print(f"Updated research-content.ts: added {len(bodies)} entries")
print(f"File size: {len(new_content_ts)} chars")

# === Step 3: Build insert for research.ts ===
# Add 4 entries to the guides array before the closing ];
# Using compound slugs and existing guide images

research_entries = [
    {
        "title": "GHK-Cu Research Summary",
        "desc": "Overview of GHK-Cu, a naturally occurring copper peptide complex that modulates gene expression, promotes tissue repair, and supports skin health research.",
        "category": "Compound Profiles",
        "section": "peptides",
        "compound": "GHK-Cu",
        "slug": "ghkcu-research-summary",
        "image": "ghkcu-summary",
        "tags": ["copper", "skin", "collagen", "wound-healing"],
    },
    {
        "title": "Retatrutide Research Summary",
        "desc": "Overview of Retatrutide (LY3437943), a first-in-class triple GLP-1/GIP/glucagon receptor agonist for metabolic and obesity research.",
        "category": "Compound Profiles",
        "section": "peptides",
        "compound": "Retatrutide",
        "slug": "retatrutide-research-summary",
        "image": "retatrutide-summary",
        "tags": ["glp-1", "metabolic", "obesity", "triple-agonist"],
    },
    {
        "title": "Semax Research Summary",
        "desc": "Overview of Semax, a synthetic ACTH(4-10) analog that upregulates BDNF and NGF for neuroprotection, cognitive enhancement, and stroke recovery research.",
        "category": "Compound Profiles",
        "section": "peptides",
        "compound": "Semax",
        "slug": "semax-research-summary",
        "image": "semax-summary",
        "tags": ["nootropic", "neuroprotection", "bdnf", "cognitive"],
    },
    {
        "title": "Selank Research Summary",
        "desc": "Overview of Selank (TP-7), a synthetic heptapeptide tuftsin analog with anxiolytic and nootropic properties for neuropeptide research.",
        "category": "Compound Profiles",
        "section": "peptides",
        "compound": "Selank",
        "slug": "selank-research-summary",
        "image": "selank-summary",
        "tags": ["anxiolytic", "nootropic", "gaba", "neuropeptide"],
    },
]

research_insert_lines = []
for e in research_entries:
    research_insert_lines.append("  {")
    for k, v in e.items():
        if isinstance(v, str):
            research_insert_lines.append(f'    {k}: "{v}",')
        elif isinstance(v, list):
            items = ", ".join(f'"{i}"' for i in v)
            research_insert_lines.append(f"    {k}: [{items}],")
    research_insert_lines.append("  },")

research_insert = "\n".join(research_insert_lines) + "\n"

# Read existing research.ts
with open("/Users/time4you/viralpeps/src/data/research.ts") as f:
    research_ts = f.read()

# Insert before ]; at end of guides array
close_bracket = research_ts.rfind("];")
if close_bracket == -1:
    print("ERROR: Could not find ]; in research.ts")
    exit(1)

new_research_ts = research_ts[:close_bracket] + "\n" + research_insert + research_ts[close_bracket:]

with open("/Users/time4you/viralpeps/src/data/research.ts", "w") as f:
    f.write(new_research_ts)

print(f"Updated research.ts: added {len(research_entries)} entries")
print(f"File size: {len(new_research_ts)} chars")

# Also remove the \n at the end that was added
print("\nDone!")
