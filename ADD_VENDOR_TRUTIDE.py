#!/usr/bin/env python3
"""Append Trutide vendor to vendors.json using text insertion (preserves formatting)."""
import json

with open("src/data/vendors.json", encoding="utf-8") as f:
    raw = f.read()

if '"slug": "trutide"' in raw:
    print("vendors.json already contains trutide; nothing to do.")
    raise SystemExit(0)

def esc(s):
    # vendors.json uses ensure_ascii escapes like \\u00a3 for £
    return json.dumps(s, ensure_ascii=True)

lines = []
lines.append("  {")
lines.append('    "id": "trutide",')
lines.append('    "name": "Trutide",')
lines.append('    "slug": "trutide",')
lines.append('    "website": "https://trutide.co.uk",')
lines.append('    "rating": 4.5,')
lines.append('    "verified": true,')
lines.append('    "founded": 2025,')
lines.append('    "country": "UK",')
lines.append('    "description": ' + esc(
    "UK-based research peptide supplier (Trutide Research Ltd, Company No. 17148085) based in Mildenhall, "
    "Suffolk. Every batch is third-party HPLC tested to verify identity, composition and purity, with COA "
    "available on request. Deliberately curated catalogue of single-compound research peptides and blends, "
    "supplied lyophilised in sealed vials. Free Royal Mail Tracked 24 over \u00a325 with same-day dispatch before 2pm."
) + ",")
lines.append('    "highlights": [')
for idx, h in enumerate([
    "Third-party HPLC tested - COA on request",
    "UK registered company (Trutide Research Ltd)",
    "Curated catalogue - quality over quantity",
    "Free Royal Mail Tracked 24 over \u00a325",
    "Same-day dispatch (order before 2pm)",
    "Extremely competitive pricing",
]):
    comma = "," if idx < 5 else ""
    lines.append("      " + esc(h) + comma)
lines.append("    ],")
lines.append('    "shipping": [')
for idx, s in enumerate([
    "UK free (Royal Mail Tracked 24, over \u00a325)",
    "Same-day dispatch before 2pm Mon-Fri",
]):
    comma = "," if idx < 1 else ""
    lines.append("      " + esc(s) + comma)
lines.append("    ],")
lines.append('    "payment": [')
for idx, p in enumerate([
    "Cards (Visa/Mastercard)",
    "Apple Pay",
    "Google Pay",
    "Pay by Bank",
]):
    comma = "," if idx < 3 else ""
    lines.append("      " + esc(p) + comma)
lines.append("    ],")
lines.append('    "lastTested": "2026-08-02",')
lines.append('    "labTested": true')
lines.append("  }")

# Append before the final ']'
body = raw.rstrip()
assert body.endswith("]"), "vendors.json does not end with ]"
body = body.rstrip("]").rstrip()
new_content = body + ",\n" + "\n".join(lines) + "\n]\n"

with open("src/data/vendors.json", "w", encoding="utf-8") as f:
    f.write(new_content)

# Validate
with open("src/data/vendors.json", encoding="utf-8") as f:
    data = json.load(f)
print("vendors.json valid:", len(data), "vendors; trutide present:", any(v.get("slug") == "trutide" for v in data))
