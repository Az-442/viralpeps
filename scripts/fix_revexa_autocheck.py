#!/usr/bin/env python3
"""Manually set Revexa's _autoChecks reviews signal.

The Wix Reviews/testimonial section on revexa.co.uk ("What Customers Say About
Our Service" with a named verified research customer review) is JS-injected and
does not appear in the plain-HTTP fetch the autocheck uses. Verified in a real
browser (browser_navigate + scroll, rendered DOM). Same class of limitation
documented in the daily-supplier-addition SOP for SPA suppliers.
"""
import argparse
import json

VENDORS = "src/data/vendors.json"
AUTOCHECK = "src/data/trustscore-autocheck.json"
EVIDENCE = "testimonial section \"What Customers Say About Our Service\" (rendered)"

ap = argparse.ArgumentParser()
ap.add_argument("--write-data", action="store_true")
args = ap.parse_args()

vendors = json.load(open(VENDORS, encoding="utf-8"))
for v in vendors:
    if v.get("slug") != "revexa":
        continue
    ac = v.setdefault("_autoChecks", {})
    ac["reviews"] = True
    ev = ac.setdefault("evidence", {})
    ev["reviews"] = EVIDENCE
    ac.setdefault("manualOverride", {})["reviews"] = (
        "Revexa testimonial section is JS-injected (Wix) and absent from the raw "
        "HTTP fetch; confirmed rendering in a real browser at / (rendered SPA)."
    )
    print("vendors.json updated:", json.dumps({k: ac[k] for k in ("reviews", "evidence")}, indent=2))

if args.write_data:
    json.dump(vendors, open(VENDORS, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    open(VENDORS, "a", encoding="utf-8").write("\n")
    print("Written:", VENDORS)

    # keep the raw autocheck cache in sync so a rebuild doesn't revert the flag
    try:
        cache = json.load(open(AUTOCHECK, encoding="utf-8"))
        if isinstance(cache, dict) and "revexa" in cache:
            entry = cache["revexa"]
            if isinstance(entry, dict):
                entry["reviews"] = True
                ev = entry.setdefault("evidence", {})
                if isinstance(ev, dict):
                    ev["reviews"] = EVIDENCE
                entry.setdefault("manualOverride", {})["reviews"] = (
                    "rendered-SPA testimonial section — verified in browser"
                )
        json.dump(cache, open(AUTOCHECK, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
        print("Written:", AUTOCHECK)
    except FileNotFoundError:
        print("No trustscore-autocheck.json — skipped")
