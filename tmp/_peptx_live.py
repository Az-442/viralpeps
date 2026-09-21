import re, json, urllib.request, ssl

js = open('/tmp/peptx_app.js', encoding='utf-8', errors='ignore').read()
base = re.search(r'https://([a-z0-9]+)\.supabase\.co', js).group(1)
keys = sorted(set(re.findall(r'eyJ[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}', js)), key=len)
key = keys[-1]
HDR = {"apikey": key, "Authorization": "Bearer " + key, "User-Agent": "Mozilla/5.0"}
ctx = ssl._create_unverified_context()

def get(path):
    u = f"https://{base}.supabase.co/rest/v1/{path}"
    req = urllib.request.Request(u, headers=HDR)
    return json.loads(urllib.request.urlopen(req, timeout=30, context=ctx).read().decode())

prods = get("products?select=*&order=id")
vars_ = get("product_variants?select=*&order=product_id")
json.dump({"products": prods, "variants": vars_}, open('tmp/_peptx_live.json','w'), indent=2)

# Build map
by_prod = {}
for v in vars_:
    by_prod.setdefault(v["product_id"], []).append(v)

print(f"PRODUCTS: {len(prods)}  VARIANTS: {len(vars_)}\n")
print("=== SINGLE-VIAL products (is_active) ===")
for p in sorted(prods, key=lambda x: x["id"]):
    if not p.get("is_active"):
        continue
    vs = [v for v in by_prod.get(p["id"], []) if v.get("product_type") == "single_vial"]
    if not vs:
        continue
    vs.sort(key=lambda v: (v.get("display_order") or 999))
    doses = ", ".join(f'{v["dose"]}=£{v.get("price_gbp")}{"" if v.get("in_stock") else "(OOS)"}' for v in vs)
    coa = p.get("coa_status")
    print(f'{p["id"]:28} | {p["name"][:42]:44} | COA={coa:8} | {doses}')
