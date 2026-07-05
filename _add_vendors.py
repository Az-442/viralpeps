#!/usr/bin/env python3
"""Add XL Peptides (xlpeptides.com) to vendors.json"""
import json

# 1. Read vendors.json
with open('src/data/vendors.json') as f:
    vendors = json.load(f)

# Check if XL Peptides already exists
existing_ids = [v['id'] for v in vendors]
if 'xl-peptides' not in existing_ids:
    xl_entry = {
        "id": "xl-peptides",
        "name": "XL Peptides",
        "slug": "xl-peptides",
        "website": "https://xlpeptides.com",
        "rating": 4.6,
        "verified": False,
        "founded": 2024,
        "country": "UK",
        "description": "UK-based research peptide supplier offering high-purity compounds with third-party testing. Registered company (Bio Research Ltd T/A XL Peptides #15464334) based in Nottingham. Accepts credit/debit cards and cryptocurrency with 5% discount. Free UK shipping on all orders via Royal Mail.",
        "highlights": [
            "10,000+ customers",
            "Cards + Crypto accepted",
            "Free UK shipping",
            "Registered UK company (Bio Research Ltd)",
            "Bulk discounts available"
        ],
        "shipping": [
            "UK free (Royal Mail)",
            "Europe (£15 flat rate)",
            "Rest of World (£25 flat rate)"
        ],
        "payment": [
            "Cards (Visa/MasterCard)",
            "Bitcoin (BTC)",
            "Monero (XMR)"
        ],
        "lastTested": "",
        "labTested": False
    }
    vendors.append(xl_entry)
    with open('src/data/vendors.json', 'w') as f:
        json.dump(vendors, f, indent=2, ensure_ascii=False)
    print("✅ Added XL Peptides to vendors.json")
else:
    print("⚠️ XL Peptides already exists in vendors.json")

# Check if Chroma Peptides already exists
if 'chroma-peptides' not in existing_ids:
    chroma_entry = {
        "id": "chroma-peptides",
        "name": "Chroma Peptides",
        "slug": "chroma-peptides",
        "website": "https://chromapeptides.co.uk",
        "rating": 4.5,
        "verified": False,
        "founded": 2024,
        "country": "UK",
        "description": "UK-based premium research peptide supplier with 40+ products, all in-house tested to 99%+ purity. Operated by KADIYSKI LIMITED. Offers free UK delivery over £50, next working day dispatch, and pre-filled cartridge formats. Bulk discounts up to 12% off and welcome discount code WELCOME10 for 10% off first orders.",
        "highlights": [
            "99% minimum purity",
            "5000+ satisfied researchers",
            "Free UK delivery over £50",
            "Bulk discounts up to 12%",
            "Pre-filled cartridge options",
            "Welcome discount 10% off"
        ],
        "shipping": [
            "UK free over £50 (next working day dispatch)",
            "International (40+ countries)"
        ],
        "payment": [
            "Cards",
            "Shopify Payments"
        ],
        "lastTested": "",
        "labTested": True
    }
    vendors.append(chroma_entry)
    with open('src/data/vendors.json', 'w') as f:
        json.dump(vendors, f, indent=2, ensure_ascii=False)
    print("✅ Added Chroma Peptides to vendors.json")
else:
    print("⚠️ Chroma Peptides already exists in vendors.json")
