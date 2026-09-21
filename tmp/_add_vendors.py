import json

V = 'src/data/vendors.json'
v = json.load(open(V))
existing_slugs = {x["slug"] for x in v}
print("existing count:", len(v))

NEW = [
{
  "id": "vialverse",
  "name": "VialVerse",
  "slug": "vialverse",
  "website": "https://vialverse.com",
  "rating": 4.5,
  "verified": True,
  "country": "UK",
  "description": "VialVerse is a UK research-peptide supplier stocking a broad catalogue of peptides, blends and laboratory essentials, with products grouped by research field (metabolic, longevity, repair and recovery, neurochemical, hormone and receptor). Every listing carries a batch-level Certificate of Analysis and purity details, and orders are dispatched from the UK via Royal Mail Tracked 24 with tracking supplied after dispatch. All material is supplied strictly for scientific laboratory and analytical research use.",
  "highlights": [
    "Broad catalogue covering peptides, blends and laboratory essentials",
    "Batch-level COA and purity documentation published on product pages",
    "Products organised by research field for easier navigation",
    "Royal Mail Tracked 24 - next-working-day delivery aim after dispatch",
    "Free UK delivery on orders over £75",
    "Research-use-only - not for human consumption"
  ],
  "shipping": [
    "UK - Royal Mail Tracked 24 (next-working-day delivery aim following dispatch)",
    "£4.95 standard tracked UK delivery",
    "Free UK delivery automatically applied to qualifying orders over £75",
    "Orders normally prepared for dispatch within 1-2 working days",
    "Tracking information supplied after dispatch"
  ],
  "payment": [
    "Card payment",
    "Pay by Bank",
    "Manual bank transfer where available at checkout"
  ],
  "lastTested": "2026-09-18",
  "labTested": True
},
{
  "id": "kings-bio-labs",
  "name": "Kings BioLabs",
  "slug": "kings-bio-labs",
  "website": "https://www.kingsbiolabs.co.uk",
  "rating": 4.5,
  "verified": True,
  "country": "UK",
  "description": "Kings BioLabs is a UK research-peptide supplier operated by Kings BioLabs Ltd (company no. 17404130, registered in England and Wales) offering lyophilised research material with batch traceability and a Certificate of Analysis available on request for each product and strength. Orders are shipped via an appropriate tracked UK delivery service, with a £4.99 UK delivery charge. The site is TrustedSite verified and runs a research-use-only policy across the range.",
  "highlights": [
    "UK-registered company - Kings BioLabs Ltd, company no. 17404130",
    "Batch traceability across the catalogue",
    "Certificate of Analysis available on request per product and strength",
    "Tracked UK delivery service where available",
    "TrustedSite verified and verified payment processing (Wallid)",
    "Research-use-only - not for human consumption, diagnostic or therapeutic use"
  ],
  "shipping": [
    "UK - tracked delivery service where available",
    "£4.99 UK delivery",
    "Dispatch estimated at point of order - same-day dispatch not guaranteed",
    "Estimated delivery times begin from date of dispatch, not date of order"
  ],
  "payment": [
    "Card payment",
    "Verified payment processing (Wallid)"
  ],
  "lastTested": "2026-09-18",
  "labTested": True
},
]

for rec in NEW:
    if rec["slug"] in existing_slugs:
        print("ALREADY EXISTS, updating:", rec["slug"])
        for x in v:
            if x["slug"] == rec["slug"]:
                x.update(rec)
    else:
        v.append(rec)
        print("ADDED:", rec["slug"], "-", rec["name"])

# Claripep already exists - ensure it has the required fields filled correctly
for x in v:
    if x["slug"] == "claripep":
        print("\nCLARIPEP existing fields:")
        print(json.dumps({k: x.get(k) for k in ("name","website","rating","verified","labTested","lastTested")}, indent=2))

json.dump(v, open(V, 'w'), indent=2, ensure_ascii=False)
print("\ntotal vendors now:", len(v))
