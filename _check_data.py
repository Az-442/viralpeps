#!/usr/bin/env python3
"""Check which vendor-compound combos exist in compounds.json."""
import json

with open('src/data/compounds.json') as f:
    compounds = json.load(f)

with open('src/data/vendors.json') as f:
    vendors = json.load(f)

vendor_names = {v['slug']: v['name'] for v in vendors}

# Build lookup: (vendor_slug_or_name, compound_slug) -> url
existing = {}
for c in compounds:
    slug = c.get('slug', '')
    for s in c.get('sources', []):
        v_name = s.get('vendor', '')
        url = s.get('url', '')
        # Map vendor name to slug
        v_slug = None
        for vslug, vname in vendor_names.items():
            if v_name.lower() == vname.lower():
                v_slug = vslug
                break
        key = (v_slug or v_name, slug)
        existing[key] = url

# Test cases that should exist
failures = [
    # (vendor_slug, compound_slug)
    ("express-peptides", "tirzepatide"),
    ("express-peptides", "semaglutide"),
    ("express-peptides", "retatrutide"),
    ("express-peptides", "nad"),
    ("express-peptides", "ll-37"),
    ("pure-peptides-uk", "tirzepatide"),
    ("pure-peptides-uk", "aod-9604"),
    ("pure-peptides-uk", "glutathion"),
    ("sterling-peptides", "semaglutide"),
    ("research-peptide-uk", "bpc-157"),
    ("research-peptide-uk", "ghk-cu"),
    ("research-peptide-uk", "tirzepatide"),
    ("research-peptide-uk", "semaglutide"),
    ("research-peptide-uk", "retatrutide"),
    ("tide-labs", "tirzepatide"),
    ("tide-labs", "semaglutide"),
    ("dr-peptides", "tirzepatide"),
    ("dr-peptides", "retatrutide"),
    ("kensington-labs", "tirzepatide"),
    ("kensington-labs", "cjc-1295"),
    ("peptides-lab-uk", "semaglutide"),
    ("uk-peptides", "tirzepatide"),
    ("imperial-peptides", "tirzepatide"),
    ("imperial-peptides", "semaglutide"),
    ("research-peptides-uk-main", "ghk-cu"),
    ("research-peptides-uk-main", "tirzepatide"),
    ("biohack-peptides", "semaglutide"),
    ("biohack-peptides", "retatrutide"),
    ("the-peptide-company", "tb-500"),
    ("the-peptide-company", "tirzepatide"),
    ("new-wave-peptides", "tirzepatide"),
]

print("Checking vendor-compound existence in compounds.json:")
print("=" * 80)
for v_slug, c_slug in failures:
    v_name = vendor_names.get(v_slug, v_slug)
    url = existing.get((v_slug, c_slug))
    # Also check by vendor name directly
    alt_url = existing.get((v_name, c_slug))
    found = url or alt_url
    status = "FOUND ✓" if found else "NOT FOUND ✗"
    print(f"  {v_slug}/{c_slug}: {status} -> {found or ''}")

# Also check: does research-peptide-uk even have these compounds listed at all?
print("\n\nResearch Peptide UK (research-peptide-uk) sources:")
for c in compounds:
    for s in c.get('sources', []):
        if s.get('vendor', '') == 'Research Peptides UK':
            print(f"  {c['slug']}: {s['url']}")

print("\n\nResearch Peptides UK Main (research-peptides-uk-main) sources:")
for c in compounds:
    for s in c.get('sources', []):
        if s.get('vendor', '') == 'Research Peptides (main)':
            print(f"  {c['slug']}: {s['url']}")
