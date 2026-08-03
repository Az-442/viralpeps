#!/usr/bin/env python3
"""Add RETA UK sources to compounds.json"""
import json, re, sys

with open('src/data/compounds.json', 'r') as f:
    data = f.read()

# Define all sources to add per compound ID
sources_map = {
    "ghk-cu": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/ghk-cu",
        "price": "£17.00",
        "inStock": True,
        "image": "/images/products/reta-uk/ghk-cu.webp",
        "dosage": "50mg"
    }],
    "bpc-157": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/bpc-157-tb-500-mix",
        "price": "£40.00",
        "inStock": True,
        "image": "/images/products/reta-uk/bpc-157-tb-500-mix.webp",
        "dosage": "20mg"
    }],
    "tb-500": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/tb-500",
        "price": "£25.00",
        "inStock": True,
        "image": "/images/products/reta-uk/tb-500.webp",
        "dosage": "10mg"
    }],
    "cjc-1295": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/cjc-1295-no-dac",
        "price": "£40.00",
        "inStock": True,
        "image": "/images/products/reta-uk/cjc-1295-no-dac.webp",
        "dosage": "No DAC"
    }],
    "igf-1-lr3": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/igf-lr3",
        "price": "£75.00",
        "inStock": True,
        "image": "/images/products/reta-uk/igf-lr3.webp",
        "dosage": "1mg"
    }],
    "tesamorelin": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/tesamorelin",
        "price": "£70.00",
        "inStock": True,
        "image": "/images/products/reta-uk/tesamorelin.webp",
        "dosage": "10mg"
    }],
    "mots-c": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/mots-c",
        "price": "£25.00",
        "inStock": True,
        "image": "/images/products/reta-uk/mots-c.webp",
        "dosage": "40mg"
    }],
    "ss-31": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/ss-31",
        "price": "£30.00",
        "inStock": True,
        "image": "/images/products/reta-uk/ss-31.webp",
        "dosage": "50mg"
    }],
    "semax": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/semax",
        "price": "£30.00",
        "inStock": True,
        "image": "/images/products/reta-uk/semax.webp",
        "dosage": "10mg"
    }],
    "selank": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/selank",
        "price": "£24.00",
        "inStock": True,
        "image": "/images/products/reta-uk/selank.webp",
        "dosage": "10mg"
    }],
    "pt-141": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/pt-141",
        "price": "£30.00",
        "inStock": True,
        "image": "/images/products/reta-uk/pt-141.webp",
        "dosage": "10mg"
    }],
    "ipamorelin": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/ipamorelin",
        "price": "£45.00",
        "inStock": True,
        "image": "/images/products/reta-uk/ipamorelin.webp",
        "dosage": "10mg"
    }],
    "glow": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/glow",
        "price": "£50.00",
        "inStock": True,
        "image": "/images/products/reta-uk/glow.webp"
    }],
    "klow": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/klow",
        "price": "£55.00",
        "inStock": True,
        "image": "/images/products/reta-uk/klow.webp"
    }],
    "bacteriostatic-water": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/bacteriorastic-water-10ml",
        "price": "£8.00",
        "inStock": True,
        "image": "/images/products/reta-uk/bacteriostatic-water.webp"
    }],
    "nad-plus": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/nad",
        "price": "£60.00",
        "inStock": True,
        "image": "/images/products/reta-uk/nad-plus.webp",
        "dosage": "500mg"
    }],
    "pinealon": [{
        "vendor": "RETA UK",
        "url": "https://reta-uk.com/products/pinealon-10",
        "price": "£27.00",
        "inStock": True,
        "image": "/images/products/reta-uk/pinealon-10.webp",
        "dosage": "10mg"
    }]
}

# For each compound, find the "sources": [ line and insert our entry before the closing ]
for compound_id, sources in sources_map.items():
    # Find the compound's sources section
    # Pattern: find the compound with matching id, then its sources array
    source_str = json.dumps(sources[0], indent=4)
    
    # Find this compound's sources section
    lines = data.split('\n')
    target_line_idx = -1
    for i, line in enumerate(lines):
        if f'"id": "{compound_id}"' in line:
            target_line_idx = i
            break
    
    if target_line_idx < 0:
        print(f"Could not find compound: {compound_id}")
        continue
    
    # Find the sources closing bracket for this compound
    # Walk forward from target_line_idx to find the last "]" that closes "sources"
    sources_start = -1
    sources_end = -1
    depth = 0
    in_sources = False
    bracket_count = 0
    
    for i in range(target_line_idx, len(lines)):
        line = lines[i]
        if '"sources"' in line and '[' in line and not in_sources:
            in_sources = True
            sources_start = i
            continue
        
        if in_sources:
            if '{' in line:
                bracket_count += line.count('{')
            if '}' in line:
                bracket_count -= line.count('}')
            if bracket_count < 0:
                bracket_count = 0
            
            if ']' in line and bracket_count <= 0:
                sources_end = i
                break
    
    if sources_start < 0 or sources_end < 0:
        print(f"Could not find sources for: {compound_id}")
        continue
    
    # Insert the new source before the closing ]
    source_json = json.dumps(sources[0], indent=4)
    insert_text = ',\n' + '\n'.join('  ' + l if l.startswith('  ') else l for l in source_json.split('\n'))
    
    # Find the last non-empty line before the closing ]
    lines[sources_end] = insert_text + '\n  ]'
    data = '\n'.join(lines)
    print(f"Added source to {compound_id}")

with open('src/data/compounds.json', 'w') as f:
    f.write(data)

print("Done adding sources")
