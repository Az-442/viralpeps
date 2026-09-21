import json, subprocess

# Kings BioLabs: the autocheck missed `shipping` for a mechanical reason —
# its `pageCandidates.slice(0, 4)` window probed /faqs, /contact, /privacy-policy,
# /terms but stopped before /shipping-returns, which DOES contain "tracked"
# ("Orders are sent using an appropriate tracked UK delivery service where available").
# The signal is real and independently confirmed, so record it.
# Everything else is taken verbatim from the script's own output.

V = 'src/data/vendors.json'
v = json.load(open(V))

kbl = [x for x in v if x["slug"] == "kings-bio-labs"][0]
print("BEFORE kbl _autoChecks:", json.dumps(kbl.get("_autoChecks", {}), indent=2))
kbl["_autoChecks"] = {
    "live": True,
    "coa": True,         # "certificate of analys" found on home + secondary pages
    "ruo": True,         # "research use only" on home + secondary pages
    "reviews": False,    # no independent review platform linked
    "shipping": True,    # "tracked UK delivery service" on /shipping-returns (verified directly)
    "contact": True,     # /contact page + info@kingsbiolabs.co.uk in footer
    "productPageFetched": False,
    "evidence": {
        "coa": "certificate of analys",
        "ruo": "research use only",
        "reviews": None,
        "shipping": "tracked",
        "contact": "contact",
    },
    "checkedAt": "2026-09-18T00:43:02.969Z",
    "note": "shipping confirmed by direct fetch of /shipping-returns; autocheck pageCandidates.slice(0,4) window stopped before that page",
}
print("\nAFTER kbl _autoChecks:", json.dumps(kbl["_autoChecks"], indent=2))

# report the other two
for slug in ("vialverse", "claripep"):
    x = [y for y in v if y["slug"] == slug][0]
    print(f"\n{slug} _autoChecks:", json.dumps(x.get("_autoChecks"), indent=2))

json.dump(v, open(V, 'w'), indent=2, ensure_ascii=False)
print("\nwritten")
