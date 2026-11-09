#!/usr/bin/env python3
"""Apply verified delistings to compounds.json.

VERIFIED DELISTED (browser/site-search confirmed, product absent from vendor catalogue):
  ThePeptideCode   Retatrutide (20mg, 30mg)  - no reta in 33-product catalogue
  XL Peptides      Melanotan I, Melanotan II, Tesamorelin, Semax, Selank,
                   Bacteriostatic Water      - absent from 30-product catalogue
  PeptidesX        GHRP-2, GHRP-6            - absent from 42-product sitemap
  SPX Labs         Retatrutide 10mg/20mg     - absent from 32-product catalogue
  VialVerse        Hexarelin, SLU-PP-332, AICAR, Matrixyl 3000 - absent
  Fat Pig Peptides Glow 70mg, 5-Amino-1MQ    - site search returns no products
  Total Peptides   Retatrutide (glp3)        - 404 (unreachable product page)
  Phoenix BioLabs  all 10 listed             - all 404, MOTS-c moved -> link rot, not delisted

EXCLUDED (false positive / URL change, NOT deleted):
  BuyReta          - soft-404 string only; products load fine
  JGPep+           - sitewide URL restructure; products exist under new slugs
  Phoenix BioLabs  - products moved; would need URL remap, not deletion
  SPX Labs bacteriostatic - still live at same URL
  Midshire Labs B12 - page renders (in stock)
"""
import json, shutil, datetime, os

ROOT = "/Users/time4you/viralpeps"
P = f"{ROOT}/src/data/compounds.json"

REMOVE = {
    "ThePeptideCode": {"retatrutide"},
    "XL Peptides": {"melanotan-i", "melanotan-ii", "tesamorelin", "semax", "selank", "bacteriostatic-water"},
    "PeptidesX": {"ghrp-2", "ghrp-6"},
    "SPX Labs": {"retatrutide"},
    "VialVerse": {"hexarelin", "slu-pp-332-5mg", "aicar-50mg", "matrixyl-3000-20mg"},
    "Fat Pig Peptides": {"glow", "5-amino-1mq-50mg"},
    "Total Peptides": {"retatrutide"},
}
# vendor -> set of source URL substrings that are the specific dead listings
REMOVE_URLS = {
    "ThePeptideCode": ["retatrutide"],
    "XL Peptides": ["melanotan-2", "melanotan-1", "tesamorelin-5mg", "semax-10mg", "selank-10mg", "bacteriostatic-water-10ml"],
    "PeptidesX": ["ghrp-2", "ghrp-6"],
    "SPX Labs": ["retatrutide-uk-10mg", "retatrutide-uk-20mg"],
    "VialVerse": ["hexarelin", "slu-pp-332", "aicar", "matrixyl"],
    "Fat Pig Peptides": ["glow-blend-70mg", "5-amino-1mq-50mg"],
    "Total Peptides": ["glp3"],
}

data = json.load(open(P))
DRY = os.environ.get("DRY") == "1"
if not DRY:
    ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    shutil.copy(P, f"{P}.bak.delisted_{ts}")

removed, kept_report, compounds_dropped = [], [], []

for c in list(data):
    sources = c.get("sources", [])
    new_sources = []
    for s in sources:
        v = s.get("vendor")
        u = s.get("url", "") or ""
        kill = False
        if v in REMOVE_URLS:
            if any(t in u for t in REMOVE_URLS[v]):
                kill = True
        if kill:
            removed.append({"vendor": v, "compound": c["name"], "url": u})
        else:
            new_sources.append(s)
    if new_sources != sources:
        c["sources"] = new_sources
        if not new_sources:
            data.remove(c)
            compounds_dropped.append(c["name"])

if not DRY:
    json.dump(data, open(P, "w"), indent=2, ensure_ascii=False)

print(f"REMOVED source entries: {len(removed)}")
for r in removed:
    print(f"  {r['vendor']:20} {r['compound'][:38]:38} {r['url']}")
print(f"\nCOMPOUNDS DROPPED (no sources left): {len(compounds_dropped)}")
for n in compounds_dropped:
    print("  ", n)
print(f"\ncompounds before/after: check file")
json.dump(removed, open(f"{ROOT}/scripts/removed_delisted_{ts if not DRY else 'dryrun'}.json", "w"), indent=1)
print("backup:", f"{P}.bak.delisted_{ts}" if not DRY else "(dry run)")
