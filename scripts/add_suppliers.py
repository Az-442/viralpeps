#!/usr/bin/env python3
"""
Add Peptigen Labs and Premio Peptides as new vendors + add product sources.
"""
import json
import os
import urllib.request
from pathlib import Path

BASE = '/Users/time4you/viralpeps'
VENDORS_PATH = f'{BASE}/src/data/vendors.json'
COMPOUNDS_PATH = f'{BASE}/src/data/compounds.json'
IMAGES_DIR = f'{BASE}/public/images/products'

# ============================================================
# 1. Add vendors to vendors.json
# ============================================================

vendors = json.load(open(VENDORS_PATH))

# Peptigen Labs
peptigen_vendor = {
    "id": "peptigen-labs",
    "name": "Peptigen Labs",
    "slug": "peptigen-labs",
    "website": "https://peptigenlabs.co.uk",
    "rating": 4.9,
    "verified": True,
    "founded": 2024,
    "country": "UK",
    "description": "British research laboratory supplier offering premium research-use-only peptides. All products independently purity tested by Brown Institute of Biomolecular Research, batch documented, with same-day dispatch before 14:00 for tracked next-day UK delivery. Rated 4.9/5 from 140+ verified UK customers.",
    "highlights": [
        "4.9/5 rating — 140+ verified reviews",
        "Independently purity tested",
        "Same-day dispatch (before 14:00)",
        "Next-day UK delivery",
        "Batch documented",
        "UK stock"
    ],
    "shipping": [
        "UK next-day (order before 14:00)"
    ],
    "payment": [
        "Cards",
        "Bank transfer"
    ],
    "lastTested": "2026-07-09",
    "labTested": True
}

# Premio Peptides
premio_vendor = {
    "id": "premio-peptides",
    "name": "Premio Peptides",
    "slug": "premio-peptides",
    "website": "https://premiopeptides.co.uk",
    "rating": 4.7,
    "verified": True,
    "founded": 2024,
    "country": "UK",
    "description": "UK research peptide supplier offering 99%+ HPLC-verified peptides with same-day dispatch and free UK delivery over £75. All products ship with third-party certificates of analysis. Known for preloaded pen delivery systems including Retatrutide, GHK-Cu Glow Stack, and BPC-157/TB-500 Wolverine Stack.",
    "highlights": [
        "99%+ HPLC-verified purity",
        "Same-day dispatch (before 14:00)",
        "Free UK delivery over £75",
        "CoA with every order",
        "Preloaded pen options",
        "UK stock"
    ],
    "shipping": [
        "UK next-day (free over £75)"
    ],
    "payment": [
        "Cards",
        "Bank transfer"
    ],
    "lastTested": "2026-07-09",
    "labTested": True
}

# Check if already exists
existing_vendor_ids = [v['id'] for v in vendors]
if 'peptigen-labs' not in existing_vendor_ids:
    vendors.append(peptigen_vendor)
    print("Added Peptigen Labs to vendors.json")
else:
    print("Peptigen Labs already in vendors.json")

if 'premio-peptides' not in existing_vendor_ids:
    vendors.append(premio_vendor)
    print("Added Premio Peptides to vendors.json")
else:
    print("Premio Peptides already in vendors.json")

json.dump(vendors, open(VENDORS_PATH, 'w'), indent=2)
print(f"Vendors.json now has {len(vendors)} entries")

# ============================================================
# 2. Add product sources to compounds.json
# ============================================================

compounds = json.load(open(COMPOUNDS_PATH))
compounds_by_slug = {c['slug']: c for c in compounds}

# --- Peptigen Labs Sources ---
peptigen_sources = {
    'ghk-cu': {
        'vendor': 'Peptigen Labs',
        'url': 'https://peptigenlabs.co.uk/products/PL-GHKCU-50',
        'price': '£25.99',
        'inStock': True,
        'image': '/images/products/peptigen-labs/ghk-cu-50mg.png',
        'dosage': '50mg'
    },
    'mots-c': {
        'vendor': 'Peptigen Labs',
        'url': 'https://peptigenlabs.co.uk/products/PL-MOTS-10',
        'price': '£44.99',
        'inStock': True,
        'image': '/images/products/peptigen-labs/mots-c-10mg.png',
        'dosage': '10mg'
    },
    'semax': [
        {
            'vendor': 'Peptigen Labs',
            'url': 'https://peptigenlabs.co.uk/products/PL-SMX-10',
            'price': '£39.99',
            'inStock': True,
            'image': '/images/products/peptigen-labs/semax-10mg.png',
            'dosage': '10mg'
        },
        {
            'vendor': 'Peptigen Labs',
            'url': 'https://peptigenlabs.co.uk/products/PL-SMX-5',
            'price': '£29.99',
            'inStock': True,
            'image': '/images/products/peptigen-labs/semax-5mg.png',
            'dosage': '5mg'
        }
    ],
    'bpc-157': {
        'vendor': 'Peptigen Labs',
        'url': 'https://peptigenlabs.co.uk/products/PL-BPC-10',
        'price': '£49.99',
        'inStock': True,
        'image': '/images/products/peptigen-labs/bpc-157-10mg.png',
        'dosage': '10mg'
    },
    'retatrutide': [
        {
            'vendor': 'Peptigen Labs',
            'url': 'https://peptigenlabs.co.uk/products/PL-RET-10',
            'price': '£69.99',
            'inStock': True,
            'image': '/images/products/peptigen-labs/retatrutide-10mg.png',
            'dosage': '10mg'
        },
        {
            'vendor': 'Peptigen Labs',
            'url': 'https://peptigenlabs.co.uk/products/PL-RET-20',
            'price': '£99.99',
            'inStock': True,
            'image': '/images/products/peptigen-labs/retatrutide-20mg.png',
            'dosage': '20mg'
        },
        {
            'vendor': 'Peptigen Labs',
            'url': 'https://peptigenlabs.co.uk/products/PL-RET-30',
            'price': '£139.99',
            'inStock': True,
            'image': '/images/products/peptigen-labs/retatrutide-30mg.png',
            'dosage': '30mg'
        }
    ],
    'epitalon': {
        'vendor': 'Peptigen Labs',
        'url': 'https://peptigenlabs.co.uk/products/PL-EPI-10',
        'price': '£29.99',
        'inStock': True,
        'image': '/images/products/peptigen-labs/epitalon-10mg.png',
        'dosage': '10mg'
    },
    'ipamorelin': {
        'vendor': 'Peptigen Labs',
        'url': 'https://peptigenlabs.co.uk/products/PL-IPA-5',
        'price': '£29.99',
        'inStock': True,
        'image': '/images/products/peptigen-labs/ipamorelin-5mg.png',
        'dosage': '5mg'
    },
    'nad-plus': {
        'vendor': 'Peptigen Labs',
        'url': 'https://peptigenlabs.co.uk/products/PL-NAD-500',
        'price': '£49.99',
        'inStock': True,
        'image': '/images/products/peptigen-labs/nad-plus-500mg.png',
        'dosage': '500mg'
    },
    'slu-pp-332': {
        'vendor': 'Peptigen Labs',
        'url': 'https://peptigenlabs.co.uk/products/PL-SLU-5',
        'price': '£39.99',
        'inStock': True,
        'image': '/images/products/peptigen-labs/slu-pp-332-5mg.png',
        'dosage': '5mg'
    },
    'tb-500': {
        'vendor': 'Peptigen Labs',
        'url': 'https://peptigenlabs.co.uk/products/PL-TB5-5',
        'price': '£39.99',
        'inStock': True,
        'image': '/images/products/peptigen-labs/tb-500-5mg.png',
        'dosage': '5mg'
    },
    'ss-31': {
        'vendor': 'Peptigen Labs',
        'url': 'https://peptigenlabs.co.uk/products/PL-SS31-10',
        'price': '£39.99',
        'inStock': True,
        'image': '/images/products/peptigen-labs/ss-31-10mg.png',
        'dosage': '10mg'
    },
    'kisspeptin-10': {
        'vendor': 'Peptigen Labs',
        'url': 'https://peptigenlabs.co.uk/products/PL-KISS-10',
        'price': '£39.99',
        'inStock': True,
        'image': '/images/products/peptigen-labs/kisspeptin-10-10mg.png',
        'dosage': '10mg'
    },
    'glutathione': {
        'vendor': 'Peptigen Labs',
        'url': 'https://peptigenlabs.co.uk/products/PL-GLUT-600',
        'price': '£29.99',
        'inStock': True,
        'image': '/images/products/peptigen-labs/glutathione-600mg.png',
        'dosage': '600mg'
    },
    'bacteriostatic-water': [
        {
            'vendor': 'Peptigen Labs',
            'url': 'https://peptigenlabs.co.uk/products/PL-BACT-3',
            'price': '£3.99',
            'inStock': True,
            'image': '/images/products/peptigen-labs/bacteriostatic-water-3ml.png',
            'dosage': '3ml'
        },
        {
            'vendor': 'Peptigen Labs',
            'url': 'https://peptigenlabs.co.uk/products/PL-BACT-10',
            'price': '£7.99',
            'inStock': True,
            'image': '/images/products/peptigen-labs/bacteriostatic-water-10ml.png',
            'dosage': '10ml'
        }
    ]
}

# --- Premio Peptides Sources ---
premio_sources = {
    'bpc-157': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/bpc-157',
        'price': '£130.00',
        'inStock': True,
        'image': '/images/products/premio-peptides/bpc-157.png'
    },
    'tb-500': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/tb-500',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/tb-500.png'
    },
    'cjc-1295': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/cjc-1295-no-dac',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/cjc-1295-no-dac.png'
    },
    'ipamorelin': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/ipamorelin',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/ipamorelin.png'
    },
    'tesamorelin': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/tesamorelin',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/tesamorelin.png'
    },
    'igf-1-lr3': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/igf-1-lr3',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/igf-1-lr3.png'
    },
    'semax': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/semax',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/semax.png'
    },
    'selank': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/selank',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/selank.png'
    },
    'dsip': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/dsip',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/dsip.png'
    },
    'pt-141-bremelanotide': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/pt-141',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/pt-141.png'
    },
    'oxytocin': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/oxytocin',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/oxytocin.png'
    },
    'kisspeptin-10': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/kisspeptin-10',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/kisspeptin-10.png'
    },
    'epitalon': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/epithalon',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/epitalon.png'
    },
    'nad-plus': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/nad-plus',
        'price': '£149.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/nad-plus.png'
    },
    'glutathione': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/glutathione',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/glutathione.png'
    },
    'mots-c': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/mots-c',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/mots-c.png'
    },
    'thymosin-alpha-1': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/thymosin-alpha-1',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/thymosin-alpha-1.png'
    },
    'ghk-cu': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/ghk-cu',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/ghk-cu.png'
    },
    'melanotan-ii': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/melanotan-ii',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/melanotan-ii.png'
    },
    'kpv': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/kpv',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/kpv.png'
    },
    '5-amino-1mq': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/5-amino-1mq',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/5-amino-1mq.png'
    },
    'follistatin-344': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/follistatin-344',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/follistatin-344.png'
    },
    'retatrutide': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/retatrutide',
        'price': '£169.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/retatrutide-40mg.png',
        'dosage': '40mg'
    },
    'ss-31': {
        'vendor': 'Premio Peptides',
        'url': 'https://premiopeptides.co.uk/compounds/ss-31',
        'price': '£199.99',
        'inStock': True,
        'image': '/images/products/premio-peptides/ss-31.png'
    }
}

# Add sources to compounds
count_peptigen = 0
count_premio = 0

for slug, sources_data in peptigen_sources.items():
    if slug in compounds_by_slug:
        compound = compounds_by_slug[slug]
        if not isinstance(sources_data, list):
            sources_data = [sources_data]
        for src in sources_data:
            # Check if this vendor already has a source for this compound
            existing_vendors = [s.get('vendor') for s in compound.get('sources', [])]
            if 'Peptigen Labs' not in existing_vendors:
                compound.setdefault('sources', []).append(src)
                count_peptigen += 1
                print(f"  Added Peptigen Labs source for {slug}")
            else:
                print(f"  Peptigen Labs already has source for {slug}")

for slug, sources_data in premio_sources.items():
    if slug in compounds_by_slug:
        compound = compounds_by_slug[slug]
        if not isinstance(sources_data, list):
            sources_data = [sources_data]
        for src in sources_data:
            existing_vendors = [s.get('vendor') for s in compound.get('sources', [])]
            if 'Premio Peptides' not in existing_vendors:
                compound.setdefault('sources', []).append(src)
                count_premio += 1
                print(f"  Added Premio Peptides source for {slug}")
            else:
                print(f"  Premio Peptides already has source for {slug}")

json.dump(compounds, open(COMPOUNDS_PATH, 'w'), indent=2)
print(f"\nAdded {count_peptigen} Peptigen Labs sources and {count_premio} Premio Peptides sources to compounds.json")
print(f"Total compounds.json size: {len(compounds)} entries")

# ============================================================
# 3. Create image directories
# ============================================================
os.makedirs(f'{IMAGES_DIR}/peptigen-labs', exist_ok=True)
os.makedirs(f'{IMAGES_DIR}/premio-peptides', exist_ok=True)
print("\nCreated image directories")
