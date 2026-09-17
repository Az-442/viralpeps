#!/usr/bin/env python3
"""Spot-check that the Revexa run did not damage other vendors' TrustScores."""
import json
import urllib.request

SLUGS = [
    "kyro-labs-peptides", "apex-pharma", "spx-labs", "uk-peptides",
    "pure-peptides-uk", "sterling-peptides", "pioneer-peptides",
    "advanced-peptides-uk", "claripep", "peptide-pal",
]

for s in SLUGS:
    try:
        with urllib.request.urlopen(
            f"http://localhost:3501/api/trust-score?slug={s}", timeout=10
        ) as r:
            d = json.load(r)
        print(f"{s:26s} score={d.get('score'):>3}  ticks={len(d.get('ticks') or [])}")
    except Exception as e:  # noqa: BLE001
        print(f"{s:26s} ERROR {e}")
