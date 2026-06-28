#!/usr/bin/env python3
"""
Merge Express Peptides entries into compounds.json
1. Append all Express Peptides product entries as individual compounds
2. Update source entries in master compounds that reference Express Peptides
3. Update vendors.json compoundCount
"""

import json
import sys

COMPOUNDS_PATH = "/Users/time4you/viralpeps/src/data/compounds.json"
EXPRESS_ENTRIES_PATH = "/Users/time4you/viralpeps/src/data/express-peptides-entries.json"
VENDORS_PATH = "/Users/time4you/viralpeps/src/data/vendors.json"

# ============================================================
# Step 1: Build express entries and check for duplicates
# ============================================================
print("=" * 60)
print("STEP 1: Loading Express Peptides entries...")
with open(EXPRESS_ENTRIES_PATH) as f:
    express_entries = json.load(f)
print(f"  Loaded {len(express_entries)} express entries")

print("\nSTEP 2: Loading master compounds.json...")
with open(COMPOUNDS_PATH) as f:
    compounds = json.load(f)
print(f"  Loaded {len(compounds)} master compounds")

# Check for existing express-prefixed entries
existing_ids = {c["id"] for c in compounds}
new_entries = [e for e in express_entries if e["id"] not in existing_ids]
duplicates = [e for e in express_entries if e["id"] in existing_ids]
print(f"  New entries to add: {len(new_entries)}")
print(f"  Duplicates (skipped): {len(duplicates)}")
for d in duplicates:
    print(f"    - {d['id']}")

# ============================================================
# Step 2: Update source entries in master compounds
# ============================================================
print("\nSTEP 3: Updating source entries in master compounds...")
express_slug = "express-peptides"
express_vendor_name = "Express Peptides"

# Build a mapping from compareSlug -> list of express entries
compare_map = {}
for entry in new_entries:
    cs = entry.get("compareSlug")
    if cs:
        if cs not in compare_map:
            compare_map[cs] = []
        compare_map[cs].append(entry)

# For each master compound, update the Express Peptides source entry
updated_sources_count = 0
new_sources_added = 0

for compound in compounds:
    c_slug = compound["slug"]
    sources = compound.get("sources", [])
    
    # Check if Express Peptides is already a source
    existing_ep_sources = [s for s in sources if "Express" in s.get("vendor", "")]
    
    # Find matching express entries for this compound
    matching_entries = compare_map.get(c_slug, [])
    
    if existing_ep_sources:
        # Update existing EP source(s)
        for ep_source in existing_ep_sources:
            if matching_entries:
                # Update URL, price, image from the first matching entry
                first_entry = matching_entries[0]
                source_data = first_entry["sources"][0]
                ep_source["url"] = source_data["url"]
                ep_source["price"] = source_data["price"]
                ep_source["image"] = source_data.get("image", "")
            updated_sources_count += 1
            print(f"  Updated: {c_slug} EP source ({ep_source['price']})")
    elif matching_entries and c_slug != "needle-tip":
        # Add a new Express Peptides source
        first_entry = matching_entries[0]
        new_source = dict(first_entry["sources"][0])
        sources.append(new_source)
        new_sources_added += 1
        print(f"  Added EP source to: {c_slug} ({new_source['price']})")

print(f"  Sources updated: {updated_sources_count}")
print(f"  New sources added: {new_sources_added}")

# ============================================================
# Step 3: Append new entries to compounds.json
# ============================================================
print("\nSTEP 4: Appending new entries to compounds.json...")
compounds.extend(new_entries)
print(f"  New total compounds: {len(compounds)}")

# Write the updated compounds.json
with open(COMPOUNDS_PATH, 'w') as f:
    json.dump(compounds, f, indent=2)
print(f"  Written to {COMPOUNDS_PATH}")

# ============================================================
# Step 4: Update vendors.json compoundCount
# ============================================================
print("\nSTEP 5: Updating vendors.json compoundCount for express-peptides...")
with open(VENDORS_PATH) as f:
    vendors = json.load(f)

for vendor in vendors:
    if vendor["id"] == "express-peptides":
        # Count how many entries have Express Peptides as a source
        ep_count = 0
        for c in compounds:
            for s in c.get("sources", []):
                if "Express Peptides" in s.get("vendor", ""):
                    ep_count += 1
                    break  # count once per compound
        old_count = vendor["compoundCount"]
        vendor["compoundCount"] = ep_count
        print(f"  compoundCount: {old_count} -> {ep_count}")

with open(VENDORS_PATH, 'w') as f:
    json.dump(vendors, f, indent=2)
print(f"  Written to {VENDORS_PATH}")

# ============================================================
# Verification
# ============================================================
print("\n" + "=" * 60)
print("VERIFICATION")
print("=" * 60)

with open(COMPOUNDS_PATH) as f:
    final_compounds = json.load(f)

# Count Express-specific entries (those with '-express' suffix)
express_compound_ids = [c for c in final_compounds if c["id"].endswith("-express")]
print(f"1. Express product entries added: {len(express_compound_ids)}")

# Count zero in 'other' category among express entries
other_express = [c for c in express_compound_ids if c["category"] == "other"]
print(f"2. Express entries in 'other' category: {len(other_express)}")

# Check compareSlug for non-supplies express entries
non_supplies = [c for c in express_compound_ids if c["category"] != "supplies"]
no_compare = [c for c in non_supplies if c.get("compareSlug") is None]
print(f"3. Non-supplies entries without compareSlug: {len(no_compare)}")
if no_compare:
    for c in no_compare:
        print(f"    {c['id']}: {c['name']} ({c['category']})")

# Count categories for express entries
cats = {}
for c in express_compound_ids:
    cat = c["category"]
    cats[cat] = cats.get(cat, 0) + 1
print("4. Category distribution:")
for cat, count in sorted(cats.items()):
    print(f"    {cat}: {count}")

# Check vendors.json
with open(VENDORS_PATH) as f:
    v = json.load(f)
for vendor in v:
    if vendor["id"] == "express-peptides":
        print(f"5. Express Peptides compoundCount in vendors.json: {vendor['compoundCount']}")

# Verify all non-supplies express entries have compareSlug matching a master compound
master_slugs = {c["slug"] for c in final_compounds if not c["id"].endswith("-express")}
compare_slugs = {c.get("compareSlug") for c in express_compound_ids if c.get("compareSlug")}
unmatched = compare_slugs - master_slugs
if unmatched:
    print(f"6. WARNING: compareSlugs not matching any master compound: {unmatched}")
else:
    print(f"6. All compareSlugs match existing master compounds ✓")

print("\nDone!")
