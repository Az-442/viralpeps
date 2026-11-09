"""Apply vetted weekly price updates to compounds.json."""
import json, shutil, sys, os
from datetime import date

COMPOUNDS = "/Users/time4you/viralpeps/src/data/compounds.json"
RESULTS = "/Users/time4you/viralpeps/tmp/price_check_results.json"
BACKUP = f"/Users/time4you/viralpeps/tmp/compounds.backup.{date.today().isoformat()}.json"

# REJECT: source dosage does not match the page's actual size, or the price is not
# dose-specific (generic variant / multi-size page), or it is a different product form.
REJECT_SUBSTR = [
    ("Bluewell Peptides", "DSIP", "5mg", "page is DSIP 15mg, source 5mg"),
    ("Midshire Labs", "VIP 5mg", "10mg", "page VIP 10mg, source 5mg"),
    ("UKPeptides.org", "Bacteriostatic Water", "10ml", "3ml page (£1.99), source 10ml"),
    ("Kingston Peptides", "Bacteriostatic Water", "10ml", "£1.00 not attributable to 10ml"),
    ("Omnichems", "BPC-157", "10mg", "'Mana Buffs' variant, not the 10mg vial"),
    ("Research Peptides UK", "Fragment 176-191", "-", "page is 10mg SKU, source undosed"),
    ("United Peptides", "Retatrutide", "20mg", "page is 40mg pen, 5 tier prices"),
    ("My Peptides", "BPC-157", "10mg", "generic page, multiple SKUs"),
    ("My Peptides", "TB-500", "10mg", "generic page, multiple SKUs"),
    ("My Peptides", "Melanotan II", "20mg", "generic page, multiple SKUs"),
    ("My Peptides", "CJC-1295", "3mg", "generic page, multiple SKUs"),
    ("My Peptides", "Tesamorelin", "10mg", "generic page, multiple SKUs"),
    ("My Peptides", "MOTS-c", "32mg", "generic page, multiple SKUs"),
    ("My Peptides", "GHK-Cu", "60mg", "generic page, multiple SKUs"),
    ("My Peptides", "KPV", "12mg", "generic page, multiple SKUs"),
    ("My Peptides", "Ipamorelin", "6mg", "generic page, multiple SKUs"),
    ("My Peptides", "PT-141", "10mg", "generic page, multiple SKUs"),
    ("My Peptides", "NAD+", "1000mg", "homepage-style listing price"),
    ("SPX Labs", "MOTS-c", "-", "page shows £0.00, price not real"),
    ("Elite Peptides", "CJC-1295 + Ipamorelin", "-", "stored no-dose value overwritten by 10+10mg"),
    ("N&A Peptides", "Melanotan I", "10mg pen", "already stored as pen; no clean match"),
    ("Alphamino", "NAD+", "500mg-1000mg", "range SKU, single price not attributable"),
    ("Alpha-amino-placeholder", "x", "x", "never"),
]

def rejection_reason(vendor, comp, dosage):
    for rv, rc, rd, why in REJECT_SUBSTR:
        if rv == vendor and rc in comp and rd == (dosage or "-"):
            return why
    return None

res = json.load(open(RESULTS))
data = json.load(open(COMPOUNDS))

applied, rejected = [], []
for r in res:
    if r.get("status") != "CHANGED":
        continue
    why = rejection_reason(r["vendor"], r["compound"], r.get("dosage"))
    if why:
        rejected.append((r, why))
        continue
    src = data[r["ci"]]["sources"][r["si"]]
    old = src.get("price")
    new = r["scraped"]
    if old == new:
        continue
    src["price"] = new
    applied.append((r["vendor"], r["compound"], r.get("dosage"), old, new, r.get("pct")))

shutil.copyfile(COMPOUNDS, BACKUP)
json.dump(data, open(COMPOUNDS, "w"), indent=2, ensure_ascii=False)

print(f"APPLIED {len(applied)}")
for a in applied:
    print(f"  {a[0][:22]:22} | {a[1][:26]:26} | {a[2] or '-':10} | {a[3]:>9} -> {a[4]:>9} ({a[5]:+.1f}%)")
print(f"\nREJECTED {len(rejected)}")
for r, w in rejected:
    print(f"  {r['vendor'][:22]:22} | {r['compound'][:26]:26} | {w}")
json.dump([{"vendor": a[0], "compound": a[1], "dosage": a[2], "old": a[3], "new": a[4]} for a in applied],
          open("/Users/time4you/viralpeps/tmp/applied_this_run.json", "w"), indent=2, ensure_ascii=False)
