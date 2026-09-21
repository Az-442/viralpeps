import json
d = json.load(open('tmp/_peptx_live.json'))
print("=== Searching all PeptX products for AOD / Cagri / Lira ===")
for p in d["products"]:
    pid = p["id"].lower(); nm = p["name"].lower()
    if any(k in pid or k in nm for k in ["aod", "cagri", "lira"]):
        vs = [v for v in d["variants"] if v["product_id"] == p["id"]]
        print(f'\nPRODUCT: {p["id"]} | {p["name"]} | type={p.get("product_type")} | active={p.get("is_active")} | coming_soon={p.get("coming_soon")} | avail={p.get("availability_status")}')
        for v in sorted(vs, key=lambda x: (x.get("product_type") or "", x.get("display_order") or 999)):
            print(f'   {v.get("product_type"):14} {str(v.get("dose")):16} box=${v.get("box_price_usd")} unit=${v.get("unit_price_usd")} gbp=£{v.get("price_gbp")} units={v.get("units_per_box")} instock={v.get("in_stock")}')

print("\n=== ALL product_type values present ===")
from collections import Counter
print(Counter(v.get("product_type") for v in d["variants"]))
