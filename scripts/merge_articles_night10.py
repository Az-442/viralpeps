"""Normalize and merge 4 article tmp files into research.ts and research-content.ts entries.

Reads tmp files, fixes format issues, generates insertion chunks for both files.
"""
import re
import json

# === Read all 4 tmp files ===
files = {
    "pt141-vs-melanotan2": "/tmp/pt141-vs-melanotan2-content.ts",
    "aod9604-vs-tesamorelin": "/tmp/aod9604-vs-tesamorelin-content.ts",
    "peptide-storage-guide": "/tmp/peptide-storage-guide-content.ts",
    "choosing-a-uk-supplier": "/tmp/choosing-a-uk-supplier-content.ts",
}

articles = {}  # slug -> cleaned TypeScript object string

for slug, path in files.items():
    with open(path) as f:
        content = f.read()

    # Remove import lines
    content = re.sub(r'^import.*?from\s+["\'][^"\']*["\'];?\s*\n', '', content, flags=re.MULTILINE)

    # Remove export default lines
    content = re.sub(r'^export\s+default\s+\w+;\s*\n', '', content, flags=re.MULTILINE)

    # Remove const declarations: const article: ResearchPageContent = { OR const content: ... OR const peptideStorageGuide: ...
    content = re.sub(r'^const\s+\w+\s*:\s*ResearchPageContent\s*=\s*', '', content, flags=re.MULTILINE)
    content = re.sub(r'^const\s+\w+\s*=\s*', '', content, flags=re.MULTILINE)

    # Remove trailing "export { article };" or similar
    content = re.sub(r'^export\s*\{\s*\w+\s*\}\s*;\s*\n', '', content, flags=re.MULTILINE)

    # Remove DO NOT EDIT / generated comments
    content = re.sub(r'^//.*?\n', '', content, flags=re.MULTILINE)

    # Remove lone trailing semicolons that are part of the const object
    content = content.strip()
    if content.endswith(';'):
        content = content[:-1].strip()

    # Convert backtick template strings to double-quoted strings with escaped newlines
    # Find all backtick strings and convert them
    lines = content.split('\n')
    new_lines = []
    in_backtick = False
    backtick_parts = []

    for line in lines:
        if not in_backtick:
            # Check if line starts a backtick
            bt_match = re.match(r'^(\s*(?:\w+:\s*)?)`(.*)', line)
            if bt_match and '`' in line and not line.strip().endswith('`'):
                in_backtick = True
                prefix = bt_match.group(1)
                inner = bt_match.group(2)
                backtick_parts = [inner]
                continue
            
            # Single-line backtick
            bt_single = re.match(r'^(\s*(?:\w+:\s*)?)`(.*)`(.*)', line)
            if bt_single:
                prefix = bt_single.group(1)
                inner = bt_single.group(2)
                suffix = bt_single.group(3)
                # Escape double quotes inside
                inner_escaped = inner.replace('"', '\\"')
                # Replace newlines in backtick content with \\n
                inner_escaped = inner_escaped.replace('\n', '\\n')
                new_lines.append(f'{prefix}"{inner_escaped}"{suffix}')
                continue

            new_lines.append(line)
        else:
            if line.strip().endswith('`'):
                # End of backtick
                inner = line.strip()[:-1]
                backtick_parts.append(inner)
                full_inner = '\n'.join(backtick_parts)
                full_inner_escaped = full_inner.replace('"', '\\"')
                full_inner_escaped = full_inner_escaped.replace('\n', '\\n')
                new_lines.append(f'{prefix}"{full_inner_escaped}"')
                in_backtick = False
                backtick_parts = []
            else:
                backtick_parts.append(line)

    content = '\n'.join(new_lines)

    # Fix commas on their own lines (bonus lines with just a comma)
    content = re.sub(r'\n\s*,\s*\n', ',\n', content)

    # Remove the trailing } that closes the const declaration 
    # (we want the object body, not including the closing })
    # Actually we need the FULL object including closing brace
    
    # Store the cleaned content
    articles[slug] = content
    print(f"=== {slug} ===")
    print(f"Lines: {len(content.split(chr(10)))}")
    # Check for remaining backticks
    bt_count = content.count('`')
    print(f"Backtick count: {bt_count}")
    print()

# === Generate research.ts entries (guides array) ===
# These go in the guides array
guide_entries = {
    "pt141-vs-melanotan2": {
        "title": "PT-141 vs Melanotan 2: Melanocortin Receptor Comparison",
        "desc": "A detailed comparison of PT-141 (Bremelanotide) and Melanotan II (MT-II) — two melanocortin receptor agonists with shared origins but divergent pharmacology, evidence bases, and clinical trajectories.",
        "category": "Articles",
        "section": "comparisons",
        "slug": "pt141-vs-melanotan2",
        "image": "pt141-vs-melanotan2",
        "minutes": 12,
        "tags": ["pt-141", "melanotan-ii", "comparison", "melanocortin", "sexual-health"],
    },
    "aod9604-vs-tesamorelin": {
        "title": "AOD 9604 vs Tesamorelin: Metabolic Peptide Comparison",
        "desc": "A detailed comparison of AOD-9604 (modified hGH fragment) and Tesamorelin (synthetic GHRH analogue) — peripheral vs central mechanisms, subcutaneous vs visceral fat targeting, safety profiles, and clinical evidence.",
        "category": "Articles",
        "section": "comparisons",
        "slug": "aod9604-vs-tesamorelin",
        "image": "aod9604-vs-tesamorelin",
        "minutes": 12,
        "tags": ["aod-9604", "tesamorelin", "comparison", "metabolic", "fat-loss"],
    },
    "peptide-storage-guide": {
        "title": "Peptide Storage Guide — Best Practices for Stability",
        "desc": "A comprehensive guide to storing lyophilised and reconstituted peptides. Temperature, light, moisture, freeze-thaw cycles, and common mistakes that compromise research peptide stability.",
        "category": "Guide",
        "section": "research-hub",
        "slug": "peptide-storage-guide",
        "image": "peptide-storage",
        "minutes": 10,
        "tags": ["storage", "stability", "lyophilised", "reconstitution", "guide"],
    },
    "choosing-a-uk-supplier": {
        "title": "Choosing a UK Peptide Supplier",
        "desc": "A practical guide to evaluating UK peptide suppliers — COAs, business registration, pricing, payment methods, shipping, and red flags to watch for in an unregulated market.",
        "category": "Guide",
        "section": "research-hub",
        "slug": "choosing-a-uk-supplier",
        "image": "choosing-supplier",
        "minutes": 10,
        "tags": ["suppliers", "uk", "buying-guide", "coa", "quality"],
    },
}

# Write research.ts insertion chunk
research_ts_lines = []
for slug, entry in guide_entries.items():
    research_ts_lines.append("  {")
    for key, value in entry.items():
        if isinstance(value, str):
            research_ts_lines.append(f'    {key}: "{value}",')
        elif isinstance(value, int):
            research_ts_lines.append(f"    {key}: {value},")
        elif isinstance(value, list):
            items = ", ".join(f'"{v}"' for v in value)
            research_ts_lines.append(f"    {key}: [{items}],")
    research_ts_lines.append("  },")

research_ts_chunk = "\n".join(research_ts_lines)
print("=== research.ts chunk ===")
print(research_ts_chunk)
print()

# === Generate research-content.ts insertion chunk ===
# Each article needs a slug-key wrapper
research_content_chunks = []
for slug in ["pt141-vs-melanotan2", "aod9604-vs-tesamorelin", "peptide-storage-guide", "choosing-a-uk-supplier"]:
    obj_body = articles[slug]
    # The object should already start with { and end with }
    # Wrap with slug key
    wrapped = f'  "{slug}": {obj_body},'
    research_content_chunks.append(wrapped)

research_content_chunk = "\n\n".join(research_content_chunks)
print("=== research-content.ts chunk (first 200 chars) ===")
print(research_content_chunk[:200])
print(f"... ({len(research_content_chunk)} total chars)")

# Write output files
with open("/tmp/research_ts_insert.txt", "w") as f:
    f.write(research_ts_chunk)

with open("/tmp/research_content_insert.txt", "w") as f:
    f.write(research_content_chunk)

print("\nWritten to /tmp/research_ts_insert.txt and /tmp/research_content_insert.txt")
