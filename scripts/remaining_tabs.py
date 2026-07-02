#!/usr/bin/env python3
"""Script to identify remaining compounds that need tab content."""
import json, re

with open('src/data/compounds.json') as f:
    data = json.load(f)

# Read current tabs
with open('src/data/compound-tabs.tsx') as f:
    tabs_content = f.read()

# Extract all tab keys from the file
import re
tab_keys = re.findall(r'^\s+"([^"]+)"\s*:', tabs_content, re.MULTILINE)

# Keys that are base compound slugs (exclude interface names)
current_bases = set()
for k in tab_keys:
    if k[0].islower() and k not in ('whatIs', 'molecular', 'indications', 'dosing', 
                                      'interactions', 'timeline', 'safety', 'references',
                                      'overview', 'items', 'diagramTitle', 'diagramSubtitle',
                                      'residues', 'legend', 'mostEffective', 'effective',
                                      'moderate', 'note', 'rows', 'tips', 'cards',
                                      'stackNotes', 'phases', 'label', 'text', 'icon',
                                      'color', 'slug', 'name', 'desc', 'effect',
                                      'day', 'title', 'goal', 'dose', 'freq', 'route',
                                      'compoundTabs', 'getBaseCompoundSlug', 'BASE_SLUGS'):
        current_bases.add(k)

# From compounds.json, find unique base-level compounds (stripping variants)
def get_compound_base(slug):
    # Strip common product suffixes
    s = re.sub(r'-\d+(mg|mcg|iu|g)$', '', slug)
    s = re.sub(r'-(?:pen|vial|combo|pack)-express(?:-[a-z0-9]+)?$', '', s)
    s = re.sub(r'-(?:5pack|10pack|3pack)-express$', '', s)
    s = s.replace('-acetate', '').replace('-nasal-spray', '').replace('-oral', '')
    s = re.sub(r'-(?:research|the-peptide-company|peptide-research|peptide|imperial|uk)$', '', s)
    s = re.sub(r'-research-peptides-uk$', '', s)
    s = s.replace('-peptide', '')
    return s

# Group compounds by their base name
from collections import defaultdict
base_groups = defaultdict(list)
seen_variants = set()

for item in data:
    slug = item['slug']
    if slug in seen_variants:
        continue
    seen_variants.add(slug)
    
    # Skip non-compound items
    if any(x in slug for x in ['bac-water', 'bacteriostatic', 'acetic-acid', 'pbs-', 'storage-',
                                'shb-', 'hhb-', 'water-', 'bundle-', '-stack', 'proprietary-',
                                'cognitive-signalling']):
        continue
    if slug.startswith('sterling-') or slug.startswith('premium-'):
        continue
    
    base = get_compound_base(slug)
    base_groups[base].append(slug)

# Sort by number of variants (most popular first)
sorted_groups = sorted(base_groups.items(), key=lambda x: len(x[1]), reverse=True)

print("REMAINING COMPOUNDS TO ADD (sorted by popularity):")
print("=" * 60)

remaining_count = 0
done_count = 0

for base, variants in sorted_groups:
    # Check if any variant slug matches a tab key or is a variant of a known tab key
    has_tabs = False
    for v in variants:
        if v in current_bases:
            has_tabs = True
            break
        for cb in current_bases:
            if v.startswith(cb + '-') or v == cb:
                has_tabs = True
                break
        if has_tabs:
            break
    
    if not has_tabs:
        remaining_count += 1
        example_name = variants[0]
        print(f"\n{remaining_count}. BASE: {base}")
        print(f"   Variants ({len(variants)}): {', '.join(variants[:4])}")
    else:
        done_count += 1

print(f"\n{'=' * 60}")
print(f"Done: {done_count} | Remaining: {remaining_count}")
print(f"Total compound groups: {done_count + remaining_count}")
