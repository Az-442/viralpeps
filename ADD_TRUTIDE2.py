#!/usr/bin/env python3
"""Add Trutide vendor to vendors.json and Trutide sources to compounds.json.
Uses text-preserving insertion to avoid reformatting the whole file."""
import json

# ============================================================
# PART 1: vendors.json (append formatted entry, preserve style)
# ============================================================
with open("src/data/vendors.json", encoding="utf-8") as f:
    vendors_raw = f.read()

if '"slug": "trutide"' in vendors_raw:
    print("vendors.json already contains trutide, skipping.")
else:
    # Build the new vendor as a JSON fragment with 2-space indent (matches file)
    # Vendors.json uses ensure_ascii=True (escapes like \u00a3). Emit escapes to match.
    v_lines = []
    v_lines.append("  {")
    fields = [
        ("id", "trutide"),
        ("name", "Trutide"),
        ("slug", "trutide"),
        ("website", "https://trutide.co.uk"),
        ("rating", 4.5),
        ("verified", True),
        ("founded", 2025),
        ("country", "UK"),
        ("description", "UK-based research peptide supplier (Trutide Research Ltd, Company No. 17148085) based in Mildenhall, Suffolk. Every batch is third-party HPLC tested to verify identity, composition and purity, with COA available on request. Deliberately curated catalogue of single-compound research peptides and blends, supplied lyophilised in sealed vials. Free Royal Mail Tracked 24 over £25 with same-day dispatch before 2pm."),
    ]
    highlights = [
        "Third-party HPLC tested - COA on request",
        "UK registered company (Trutide Research Ltd)",
        "Curated catalogue - quality over quantity",
        "Free Royal Mail Tracked 24 over £25",
        "Same-day dispatch (order before 2pm)",
        "Extremely competitive pricing",
    ]
    shipping = [
        "UK free (Royal Mail Tracked 24, over £25)",
        "Same-day dispatch before 2pm Mon-Fri",
    ]
    payment = [
        "Cards (Visa/Mastercard)",
        "Apple Pay",
        "Google Pay",
        "Pay by Bank",
    ]

    def esc(s):
        return json.dumps(s, ensure_ascii=True)

    for k, v in fields:
        if isinstance(v, bool):
            vv = "true" if v else "false"
        elif isinstance(v, (int, float)):
            vv = str(v)
        else:
            vv = esc(v)
        v_lines.append(f'    "{k}": {vv},')
    v_lines.append('    "highlights": [')
    for h in highlights:
        v_lines.append(f"      {esc(h)},")
    v_lines.append("    ],")
    v_lines.append('    "shipping": [')
    for s in shipping:
        v_lines.append(f"      {esc(s)},")
    v_lines.append("    ],")
    v_lines.append('    "payment": [')
    for p in payment:
        v_lines.append(f"      {esc(p)},")
    v_lines.append("    ],")
    v_lines.append('    "lastTested": "2026-08-02",')
    v_lines.append('    "labTested": true')
    v_lines.append("  }")

    # Simpler robust approach: strip trailing whitespace, ensure ends with ']',
    # then replace ']' with '  },\n  NEW...\n]'
    body = vendors_raw.rstrip()
    assert body.endswith("]"), "vendors.json does not end with ]"
    body = body.rstrip(']').rstrip()
    # body currently ends with '  }' (last vendor object) which needs a comma
    new_content = body + ",\n" + "\n".join(v_lines) + "\n]\n"
    with open("src/data/vendors.json", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("vendors.json: appended Trutide via text insertion")

# ============================================================
# PART 2: compounds.json (text-preserving insertion)
# ============================================================
with open("src/data/compounds.json", encoding="utf-8") as f:
    lines = f.read().split("\n")

# Sources to add: compound id -> source dict
sources_map = {
    "bpc-157": {
        "vendor": "Trutide",
        "url": "https://trutide.co.uk/product/bpc-157-10mg/",
        "price": "\u00a329.95",
        "inStock": True,
        "image": "/images/products/trutide/bpc-157.webp",
        "dosage": "10mg",
    },
    "ghk-cu": {
        "vendor": "Trutide",
        "url": "https://trutide.co.uk/product/ghk-cu-100mg/",
        "price": "\u00a332.95",
        "inStock": True,
        "image": "/images/products/trutide/ghk-cu.webp",
        "dosage": "100mg",
    },
    "nad-plus": {
        "vendor": "Trutide",
        "url": "https://trutide.co.uk/product/nad-1000mg/",
        "price": "\u00a369.95",
        "inStock": True,
        "image": "/images/products/trutide/nad-plus.webp",
        "dosage": "1000mg",
    },
    "wolverine-stack-bpc157-tb500-blend": {
        "vendor": "Trutide",
        "url": "https://trutide.co.uk/product/wolverine/",
        "price": "\u00a349.95",
        "inStock": True,
        "image": "/images/products/trutide/wolverine.webp",
        "dosage": "20mg",
    },
    "klow": {
        "vendor": "Trutide",
        "url": "https://trutide.co.uk/product/klow-80mg/",
        "price": "\u00a364.95",
        "inStock": True,
        "image": "/images/products/trutide/klow.webp",
        "dosage": "80mg",
    },
    "cjc-1295-ipamorelin-blend": {
        "vendor": "Trutide",
        "url": "https://trutide.co.uk/product/cjc-1295-no-dac-ipamorelin-10mg/",
        "price": "\u00a339.95",
        "inStock": True,
        "image": "/images/products/trutide/cjc-1295-ipamorelin-blend.webp",
        "dosage": "10mg",
    },
}

# Pre-build each source's text block (6-space object base, 8-space keys)
def source_block(src):
    out = []
    out.append("      {")
    for k, v in src.items():
        if isinstance(v, bool):
            val = "true" if v else "false"
        elif isinstance(v, (int, float)):
            val = str(v)
        else:
            val = json.dumps(v, ensure_ascii=False)
        out.append(f"        {json.dumps(k)}: {val},")
    out.append("      }")
    return out

def find_compound_sources_end(compound_id):
    """Return index of the '    ]' line that closes the sources array for compound_id."""
    start = None
    for i, ln in enumerate(lines):
        if f'    "id": "{compound_id}",' in ln:
            start = i
            break
    if start is None:
        return None
    # Walk forward to find '"sources": [' line for THIS compound
    src_start = None
    for i in range(start, len(lines)):
        ln = lines[i]
        if '"sources":' in ln and "[" in ln:
            src_start = i
            break
    if src_start is None:
        return None
    # From src_start, find matching close ']'. Track depth with '{' and '['.
    depth = 0
    for i in range(src_start, len(lines)):
        ln = lines[i]
        depth += ln.count("{") + ln.count("[")
        depth -= ln.count("}") + ln.count("]")
        if depth == 0 and i > src_start:
            return i
    return None

for cid, src in sources_map.items():
    end = find_compound_sources_end(cid)
    if end is None:
        print(f"SKIP: could not locate sources for {cid}")
        continue
    # The line at 'end' is '    ]'. Check no Trutide already present in this compound's sources.
    # Insert source_block before it. The line before has the previous source '      }' (no comma)
    # or '      ],'. We add a comma to previous close and append our block.
    prev = lines[end - 1].rstrip()
    if '"Trutide"' in "\n".join(lines[end - 200:end]):
        print(f"SKIP: {cid} already has Trutide source")
        continue
    block = source_block(src)
    if prev == "      }":
        # change previous close to add comma
        lines[end - 1] = "      },"
        insert = block  # my block last, no trailing comma
    elif prev == "    ]":
        # empty-ish source list guard (not expected)
        insert = ["      " + block[0]] if False else block
    else:
        # prev might be '      ]' style on same line or something unusual
        insert = block
    # splice: keep existing '    ]' at 'end'
    new_lines = lines[:end] + insert + lines[end:]
    lines = new_lines
    print(f"Inserted Trutide source into {cid}")

with open("src/data/compounds.json", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print("DONE")
