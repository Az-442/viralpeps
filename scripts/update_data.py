#!/usr/bin/env python3
"""Add Eva Peptide and Be Better Peptides to vendors.json and compounds.json."""
import json
import os

BASE = '/Users/time4you/viralpeps/src/data'

# ── 1. Load vendors.json ──
with open(f'{BASE}/vendors.json') as f:
    vendors = json.load(f)

existing_ids = {v['id'] for v in vendors}

# ── 2. Add Eva Peptide ──
if 'eva-peptide' not in existing_ids:
    vendors.append({
        "id": "eva-peptide",
        "name": "Eva Peptide UK",
        "slug": "eva-peptide",
        "website": "https://evapeptide.co.uk",
        "rating": 4.3,
        "verified": False,
        "founded": 2024,
        "country": "UK",
        "description": "UK-based research peptide supplier offering 60+ premium-grade compounds. All products lab-tested with certificates available. Competitive pricing on GLP-1 agonists and research peptides with fast UK delivery.",
        "highlights": [
            "60+ products in catalog",
            "Lab-tested compounds",
            "Competitive pricing",
            "Fast UK delivery"
        ],
        "shipping": [
            "UK (free over £350)",
            "International"
        ],
        "payment": [
            "Cards (credit/debit)"
        ],
        "lastTested": "",
        "labTested": True
    })
    print("Added eva-peptide to vendors.json")

# ── 3. Add Be Better Peptides ──
if 'be-better-peptides' not in existing_ids:
    vendors.append({
        "id": "be-better-peptides",
        "name": "Be Better Peptides",
        "slug": "be-better-peptides",
        "website": "https://bebetterpeptides.com",
        "rating": 4.5,
        "verified": False,
        "founded": 2025,
        "country": "UK",
        "description": "UK-based research peptide supplier with a curated catalog of high-purity compounds. All products independently tested with COAs. Free UK delivery over certain spend thresholds with complimentary bacteriostatic water included.",
        "highlights": [
            "Independent third-party testing",
            "Complimentary BAC water with orders",
            "Curated product range",
            "24-hour dispatch"
        ],
        "shipping": [
            "UK (tracked, 24-hour dispatch)",
            "International"
        ],
        "payment": [
            "Cards (Shopify Payments)"
        ],
        "lastTested": "",
        "labTested": True
    })
    print("Added be-better-peptides to vendors.json")

with open(f'{BASE}/vendors.json', 'w') as f:
    json.dump(vendors, f, indent=2)
    f.write('\n')

print(f"vendors.json now has {len(vendors)} entries")

# ── 4. Load compounds.json ──
with open(f'{BASE}/compounds.json') as f:
    compounds = json.load(f)

compound_map = {c['id']: c for c in compounds}

# ── 5. Helper to add source ──
def add_source(compound_id, vendor_name, url, price, dosage, image_path):
    c = compound_map.get(compound_id)
    if not c:
        print(f"  WARN: compound '{compound_id}' not found")
        return False
    # Check if this vendor+url combo already exists
    existing_urls = {(s.get('vendor',''), s.get('url','')) for s in c.get('sources', [])}
    if (vendor_name, url) in existing_urls:
        print(f"  SKIP: {vendor_name} -> {compound_id} (already exists)")
        return False
    
    entry = {
        "vendor": vendor_name,
        "url": url,
        "price": price,
        "inStock": True,
        "image": image_path
    }
    if dosage:
        entry["dosage"] = dosage
    
    if 'sources' not in c:
        c['sources'] = []
    c['sources'].append(entry)
    print(f"  ADDED: {vendor_name} -> {compound_id} ({price})")
    return True

# ── 6. Add Eva Peptide sources ──
EVA = "Eva Peptide UK"
print("\n--- Adding Eva Peptide UK sources ---")

# Tirzepatide - various dosages (10-vial packs)
add_source("tirzepatide", EVA, "https://evapeptide.co.uk/product/buy-tirzepatide-uk/",
           "£47.00", "5mg×10vials", "/images/products/eva-peptide/tirzepatide.png")
add_source("tirzepatide", EVA, "https://evapeptide.co.uk/product/buy-tirzepatide-uk/",
           "£74.00", "10mg×10vials", "/images/products/eva-peptide/tirzepatide.png")
add_source("tirzepatide", EVA, "https://evapeptide.co.uk/product/buy-tirzepatide-uk/",
           "£110.00", "15mg×10vials", "/images/products/eva-peptide/tirzepatide.png")

# Semaglutide
add_source("semaglutide", EVA, "https://evapeptide.co.uk/product/buy-semaglutide-uk/",
           "£21.00", "2mg×10vials", "/images/products/eva-peptide/semaglutide.png")
add_source("semaglutide", EVA, "https://evapeptide.co.uk/product/buy-semaglutide-uk/",
           "£53.00", "5mg×10vials", "/images/products/eva-peptide/semaglutide.png")
add_source("semaglutide", EVA, "https://evapeptide.co.uk/product/buy-semaglutide-uk/",
           "£84.00", "10mg×10vials", "/images/products/eva-peptide/semaglutide.png")

# BPC-157
add_source("bpc-157", EVA, "https://evapeptide.co.uk/product/buy-bpc-157-uk/",
           "£52.00", "5mg×10vials", "/images/products/eva-peptide/bpc-157.png")
add_source("bpc-157", EVA, "https://evapeptide.co.uk/product/buy-bpc-157-uk/",
           "£73.00", "10mg×10vials", "/images/products/eva-peptide/bpc-157.png")

# Retatrutide
add_source("retatrutide", EVA, "https://evapeptide.co.uk/product/buy-retatrutide-uk/",
           "£74.00", "5mg×10vials", "/images/products/eva-peptide/retatrutide.png")
add_source("retatrutide", EVA, "https://evapeptide.co.uk/product/buy-retatrutide-uk/",
           "£136.00", "10mg×10vials", "/images/products/eva-peptide/retatrutide.png")

# MOTS-c
add_source("mots-c", EVA, "https://evapeptide.co.uk/product/buy-mots-c-uk/",
           "£84.00", "5mg×10vials", "/images/products/eva-peptide/mots-c.png")

# TB-500
add_source("tb-500", EVA, "https://evapeptide.co.uk/product/buy-tb500-uk/",
           "£105.00", "5mg×10vials", "/images/products/eva-peptide/tb500.png")
add_source("tb-500", EVA, "https://evapeptide.co.uk/product/buy-tb500-uk/",
           "£142.00", "10mg×10vials", "/images/products/eva-peptide/tb500.png")

# GHK-Cu
add_source("ghk-cu", EVA, "https://evapeptide.co.uk/product/buy-ghk-cu-uk/",
           "£52.00", "50mg×10vials", "/images/products/eva-peptide/ghk-cu.png")

# CJC-1295 (with DAC)
add_source("cjc-1295", EVA, "https://evapeptide.co.uk/product/buy-cjc-1295-dac-uk/",
           "£57.00", "2mg×10vials", "/images/products/eva-peptide/cjc-1295-dac.png")

# Ipamorelin
add_source("ipamorelin", EVA, "https://evapeptide.co.uk/product/buy-ipamorelin-uk/",
           "£52.00", "5mg×10vials", "/images/products/eva-peptide/ipamorelin.png")

# Epithalon
add_source("epithalon", EVA, "https://evapeptide.co.uk/product/buy-epithalon-uk/",
           "£42.00", "10mg×10vials", "/images/products/eva-peptide/epithalon.png")

# AOD9604
add_source("aod-9604", EVA, "https://evapeptide.co.uk/product/buy-aod9604-uk/",
           "£142.00", "5mg×10vials", "/images/products/eva-peptide/aod9604.png")

# Cagrilintide
add_source("cagrilintide", EVA, "https://evapeptide.co.uk/product/buy-cagrilintide-uk/",
           "£142.00", "5mg×10vials", "/images/products/eva-peptide/cagrilintide.png")

# Tesamorelin
add_source("tesamorelin", EVA, "https://evapeptide.co.uk/product/buy-tesamorelin-uk/",
           "£136.00", "5mg×10vials", "/images/products/eva-peptide/tesamorelin.png")

# Thymosin Alpha-1
add_source("thymosin-alpha-1", EVA, "https://evapeptide.co.uk/product/buy-thymosin-alpha-1-uk/",
           "£110.00", "5mg×10vials", "/images/products/eva-peptide/thymosin-alpha-1.png")

# HGH Fragment 176-191
add_source("hgh-fragment-176-191", EVA, "https://evapeptide.co.uk/product/buy-hgh-fragment-176-191-uk/",
           "£63.00", "5mg×10vials", "/images/products/eva-peptide/hgh-fragment.png")

# PT-141
add_source("pt-141", EVA, "https://evapeptide.co.uk/product/buy-pt-141-uk/",
           "£36.00", "10mg×10vials", "/images/products/eva-peptide/pt-141.png")

# Melanotan 2
add_source("melanotan-2", EVA, "https://evapeptide.co.uk/product/buy-melanotan-2-uk/",
           "£42.00", "10mg×10vials", "/images/products/eva-peptide/melanotan-2.png")

# ── 7. Add Be Better Peptides sources ──
BBP = "Be Better Peptides"
print("\n--- Adding Be Better Peptides sources ---")

add_source("bpc-157", BBP, "https://bebetterpeptides.com/products/buy-bpc-157-10mg",
           "£24.99", "10mg", "/images/products/be-better-peptides/bpc-157.png")

add_source("ghk-cu", BBP, "https://bebetterpeptides.com/products/buy-ghk-cu-50mg",
           "£19.99", "50mg", "/images/products/be-better-peptides/ghk-cu.png")

add_source("ghk-cu", BBP, "https://bebetterpeptides.com/products/ghk-cu-100mg",
           "£32.99", "100mg", "/images/products/be-better-peptides/ghk-cu.png")

add_source("cjc-1295", BBP, "https://bebetterpeptides.com/products/cjc-1295-with-dac-2mg",
           "£34.99", "5mg", "/images/products/be-better-peptides/cjc-1295.png")

add_source("epithalon", BBP, "https://bebetterpeptides.com/products/epithalon",
           "£18.99", "10mg", "/images/products/be-better-peptides/epithalon.png")

add_source("ghrp-2", BBP, "https://bebetterpeptides.com/products/ghrp-2-10mg",
           "£18.99", "10mg", "/images/products/be-better-peptides/ghrp-2.png")

add_source("ipamorelin", BBP, "https://bebetterpeptides.com/products/ipamorelin-5mg",
           "£17.99", "5mg", "/images/products/be-better-peptides/ipamorelin.png")

add_source("aod-9604", BBP, "https://bebetterpeptides.com/products/aod-9604-5mg",
           "£24.99", "5mg", "/images/products/be-better-peptides/aod9604.png")

add_source("igf-1-lr3", BBP, "https://bebetterpeptides.com/products/igf1-lr3-1mg",
           "£39.99", "1mg", None)

add_source("hgh-fragment-176-191", BBP, "https://bebetterpeptides.com/products/buy-hgh-fragment-176-191-5mg",
           "£23.99", "5mg", "/images/products/be-better-peptides/hgh-fragment.png")

# ── 8. Save compounds.json ──
with open(f'{BASE}/compounds.json', 'w') as f:
    json.dump(compounds, f, indent=2)
    f.write('\n')

print(f"\nDone! compounds.json updated.")
