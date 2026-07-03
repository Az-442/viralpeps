#!/usr/bin/env python3
"""Add Bluewell Peptides and Anglo Peptides to vendors.json"""
import json

VENDORS_PATH = '/Users/time4you/viralpeps/src/data/vendors.json'
COMPOUNDS_PATH = '/Users/time4you/viralpeps/src/data/compounds.json'

# Load vendors
with open(VENDORS_PATH) as f:
    vendors = json.load(f)

# Check if already exist
existing_ids = {v['id'] for v in vendors}

# Supplier 1: Bluewell Peptides
if 'bluewell-peptides' not in existing_ids:
    vendors.append({
        "id": "bluewell-peptides",
        "name": "Bluewell Peptides",
        "slug": "bluewell-peptides",
        "website": "https://bluewellpeptides.com",
        "rating": 4.9,
        "verified": True,
        "founded": 2022,
        "country": "UK",
        "description": "UK-based research peptide supplier offering COA-verified peptides tested to 99.1%+ HPLC purity via third-party Axonis Analytics. Same-day dispatch before 2pm for next-day UK delivery. GMP-compliant UK facility with cold-chain storage.",
        "highlights": [
            "4.9/5.0 on Peptide Supermarket",
            "HPLC tested 99.1%+ purity",
            "Third-party tested (Axonis Analytics)",
            "Same-day dispatch",
            "Free shipping over £100",
            "Cold-chain storage"
        ],
        "shipping": [
            "UK RM Tracked 24 (free over £100, from £4.99)",
            "UK Special Delivery Guaranteed (£7.50)",
            "European Express (£9.99)",
            "Worldwide Tracked (£12.95)"
        ],
        "payment": [
            "Bank transfer (Fena)",
            "Cards (Stripe)",
            "Apple Pay",
            "Google Pay"
        ],
        "lastTested": "2026-06-27",
        "labTested": True
    })
    print("Added Bluewell Peptides to vendors")
else:
    print("Bluewell Peptides already exists")

# Supplier 2: Anglo Peptides
if 'anglo-peptides' not in existing_ids:
    vendors.append({
        "id": "anglo-peptides",
        "name": "Anglo Peptides",
        "slug": "anglo-peptides",
        "website": "https://anglopeptides.com",
        "rating": 4.3,
        "verified": True,
        "founded": 2025,
        "country": "UK",
        "description": "London-based research peptide supplier offering HPLC-tested compounds at ≥98% purity with batch-specific documentation. Brand of Anglo-Peptides Ltd (Company No. 16423217), a registered UK chemical wholesale company. Free UK shipping over £100.",
        "highlights": [
            "UK registered company (Anglo-Peptides Ltd)",
            "HPLC tested ≥98% purity",
            "Batch-numbered products",
            "London-based",
            "Free shipping over £100",
            "Mix & Match savings"
        ],
        "shipping": [
            "UK RM Tracked 24 (free over £100)",
            "International tracked (5-10 business days)"
        ],
        "payment": [
            "Cards (Shopify/Worldpay)",
            "Bank transfer"
        ],
        "lastTested": "2026-06-25",
        "labTested": True
    })
    print("Added Anglo Peptides to vendors")
else:
    print("Anglo Peptides already exists")

# Write back
with open(VENDORS_PATH, 'w') as f:
    json.dump(vendors, f, indent=2, ensure_ascii=False)

print(f"Total vendors: {len(vendors)}")
