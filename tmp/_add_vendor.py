import json

# ---------- 1. Add vendor ----------
vp = 'src/data/vendors.json'
v = json.load(open(vp))
if any(x['slug'] == 'kingston-peptides' for x in v):
    print('VENDOR ALREADY EXISTS - abort'); raise SystemExit(1)

vendor = {
    "id": "kingston-peptides",
    "name": "Kingston Peptides",
    "slug": "kingston-peptides",
    "website": "https://kingstonpeptides.com",
    "rating": 4.8,
    "verified": True,
    "founded": 2025,
    "country": "UK",
    "description": "Kingston Peptides is a UK-based research peptide supplier operating from 124 City Road, London (EC1V 2NX), selling HPLC-tested research compounds for in-vitro laboratory use. Every batch is third-party tested by Janoshik Analytical with certificates of analysis available, and the site advertises a 99.7% average measured purity plus an independent-testing guarantee (80% of test cost and 100% of shipping covered, full order refund regardless of result). Orders ship via Royal Mail tracked services with same-day dispatch before 2pm UK time. Sold strictly for laboratory research use only.",
    "highlights": [
        "Every batch third-party tested by Janoshik Analytical with COAs available",
        "99.7% average measured purity advertised; 99%+ HPLC verified",
        "Independent-testing guarantee - they cover 80% of test cost + 100% shipping and refund the full order regardless of result",
        "Heavy metal screening (ND - Not Detected) reported per batch",
        "Royal Mail tracked shipping - free UK delivery over £50",
        "Same-day dispatch on orders placed before 2pm UK time",
        "Pay by Bank, wire transfer or cryptocurrency",
        "Research-use-only - not for human or veterinary consumption"
    ],
    "shipping": [
        "Royal Mail 2nd Class Tracked - UK delivery 2-3 working days, £3.00 (free over £50.00)",
        "Royal Mail International Tracked - Europe 3-5 working days (£7.00), North America & Rest of World 6-7 working days (£10.00); free over £50.00",
        "Same-day dispatch on orders placed before 2pm UK time on working days",
        "Tracking number emailed on dispatch",
        "Discreet, temperature-appropriate packaging; lyophilised peptides shipped with ice packs in warmer months",
        "Ships worldwide except Australia, New Zealand and Japan; import duties/taxes are the customer's responsibility"
    ],
    "payment": [
        "Pay by Bank",
        "Wire Transfer",
        "Cryptocurrency"
    ],
    "lastTested": "2026-10-08",
    "labTested": True,
    "email": "info@kingstonpeptides.com",
    "delivery": "Royal Mail tracked - UK 2-3 working days £3.00 (free over £50) · Europe 3-5 days £7 · North America/RoW 6-7 days £10 (free over £50) · same-day dispatch before 2pm UK · ships worldwide except AU/NZ/JP"
}
v.append(vendor)
json.dump(v, open(vp, 'w'), indent=2, ensure_ascii=False)
print('VENDOR ADDED. Total:', len(v))
