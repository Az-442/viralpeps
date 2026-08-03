#!/usr/bin/env python3
"""Insert Trutide sources into compounds.json with correct bracket tracking."""
import json

with open("src/data/compounds.json", encoding="utf-8") as f:
    lines = f.read().split("\n")

# source blocks to insert
sources_map = {
    "bpc-157": ("https://trutide.co.uk/product/bpc-157-10mg/", "\u00a329.95", "10mg", "bpc-157.webp"),
    "ghk-cu": ("https://trutide.co.uk/product/ghk-cu-100mg/", "\u00a332.95", "100mg", "ghk-cu.webp"),
    "nad-plus": ("https://trutide.co.uk/product/nad-1000mg/", "\u00a369.95", "1000mg", "nad-plus.webp"),
    "wolverine-stack-bpc157-tb500-blend": ("https://trutide.co.uk/product/wolverine/", "\u00a349.95", "20mg", "wolverine.webp"),
    "klow": ("https://trutide.co.uk/product/klow-80mg/", "\u00a364.95", "80mg", "klow.webp"),
    "cjc-1295-ipamorelin-blend": ("https://trutide.co.uk/product/cjc-1295-no-dac-ipamorelin-10mg/", "\u00a339.95", "10mg", "cjc-1295-ipamorelin-blend.webp"),
}

def locate_sources_end(target_id):
    """Return line index just-before the '    ]' (i.e. index of the ] line) closing
    the 'sources' array of the compound with matching id, or None."""
    # First find the compound's '"id": "<target>",' line position.
    compound_line = None
    for i, ln in enumerate(lines):
        if ln.strip() == f'"id": "{target_id}",':
            compound_line = i
            break
    if compound_line is None:
        return None

    # Now walk forward from the compound start to find its 'sources' array close.
    # Use a bracket counter anchored at the start of the compound object.
    # Find the line containing the compound opening: search backward for standalone '{'.
    obj_start = compound_line
    while obj_start >= 0 and lines[obj_start].strip() != "{":
        obj_start -= 1
    if obj_start < 0:
        return None

    # Walk from obj_start; track depth of {} and []. When we hit '"sources": [' (depth of [ )
    # then continue until that array's closing bracket returns depth to the pre-sources level.
    depth = 0
    sources_open_idx = None
    sources_open_depth = None
    i = obj_start
    while i < len(lines):
        ln = lines[i]
        # count brackets
        opens = ln.count("{") + ln.count("[")
        closes = ln.count("}") + ln.count("]")
        if sources_open_idx is None:
            # not inside sources yet; check if this line opens sources
            if '"sources"' in ln and "[" in ln:
                sources_open_idx = i
                sources_open_depth = depth
                depth += opens - closes
            else:
                depth += opens - closes
            i += 1
            continue
        else:
            depth += opens - closes
            if depth == sources_open_depth:
                # closed the sources array on this line
                return i
            i += 1
    return None

def build_source_block(url, price, dosage, img):
    b = []
    b.append("      {")
    b.append(f'        "vendor": "Trutide",')
    b.append(f'        "url": "{url}",')
    b.append(f'        "price": "{price}",')
    b.append("        \"inStock\": true,")
    b.append(f'        "image": "/images/products/trutide/{img}",')
    b.append(f'        "dosage": "{dosage}"')
    b.append("      }")
    return b

for cid, (url, price, dosage, img) in sources_map.items():
    end = locate_sources_end(cid)
    if end is None:
        print("MISS:", cid)
        continue
    # Check if Trutide already present in the compound segment (last ~300 lines before end)
    seg = "\n".join(lines[max(0, end-300):end])
    if '"Trutide"' in seg:
        print("SKIP (exists):", cid)
        continue
    # The line at 'end' is the sources close '    ]'/']'. The line before, end-1, is the
    # previous source's close '}' (inconsistent indentation in file). Append a comma.
    prev = lines[end - 1].rstrip()
    if prev.endswith("}") and not prev.endswith("},"):
        lines[end - 1] = prev + ","
    # Insert the new source block before the sources close line.
    block = build_source_block(url, price, dosage, img)
    lines = lines[:end] + block + lines[end:]
    # sanity: validate JSON incrementally
    try:
        json.loads("\n".join(lines))
        print("OK+valid:", cid)
    except json.JSONDecodeError as e:
        print("INVALID after", cid, ":", e)
        break

with open("src/data/compounds.json", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))
print("DONE")
