import json

d = json.load(open('tmp/_peptx_live.json'))
task = {
 "tirzepatide": "£46.99","semaglutide":"£42.99","retatrutide":"£43.99","bpc-157":"£27.99",
 "ghk-cu":"£21.99","tesamorelin":"£41.99","mots-c":"£22.99","ss-31":"£32.99","selank":"£24.99",
 "semax":"£24.99","kisspeptin-10":"£24.99","pt-141":"£23.99","nad":"£28.99","kpv":"£25.99",
 "sermorelin":"£32.99","ipamorelin":"£19.99","dsip":"£19.99","mt-1":"£20.99","ahk-cu":"£24.99",
 "5-amino-1mq":"£24.99","ara-290":"£34.99","cartalax":"£45.99","pe-22-28":"£25.99",
 "mazdutide":"£27.99","ta-1-thymosin-alpha-1":"£25.99","klow-blend":"£63.99",
 "glutathione":"£19.99","l-carnitine":"£16.99","oxytocin-acetate":"£23.99",
}
mapping = {
 "tirzepatide":"sv-tirzepatide","semaglutide":"sv-semaglutide","retatrutide":"sv-retatrutide",
 "bpc-157":"sv-bpc157","ghk-cu":"sv-ghk-cu","tesamorelin":"sv-tesamorelin","mots-c":"sv-mots-c",
 "ss-31":"sv-ss-31","selank":"sv-selank","semax":"sv-semax","kisspeptin-10":"sv-kisspeptin-10",
 "pt-141":"sv-pt-141","nad":"sv-nad-plus","kpv":"sv-kpv","sermorelin":"sv-sermorelin",
 "ipamorelin":"sv-ipamorelin","dsip":"sv-dsip","mt-1":"sv-mt-1","ahk-cu":"sv-ahk-cu",
 "5-amino-1mq":"sv-5-amino-1mq","ara-290":"sv-ara-290","cartalax":"sv-cartalax",
 "pe-22-28":"sv-pe-22-28","mazdutide":"sv-mazdutide","ta-1-thymosin-alpha-1":"sv-ta1",
 "klow-blend":"sv-klow","glutathione":"sv-glutathione","l-carnitine":"sv-l-carnitine",
 "oxytocin-acetate":"sv-oxytocin",
}

print(f'{"VP slug":24} {"task£":7} {"base-dose-in-stock":32} {"cheapest in stock":18} verdict')
for slug, pid in mapping.items():
    sv = [v for v in d["variants"] if v["product_id"] == pid and v.get("product_type") == "single_vial"]
    sv.sort(key=lambda v: (v.get("display_order") or 999))
    instock = [v for v in sv if v.get("in_stock") and v.get("price_gbp")]
    tgt = float(task[slug].replace("£",""))
    exact = [v for v in sv if v.get("price_gbp") == tgt]
    pick = exact[0] if exact else (instock[0] if instock else (sv[0] if sv else None))
    oos = None if (pick and pick.get("in_stock")) else "OOS!"
    print(f'{slug:24} {task[slug]:7} {str(pick["dose"]) if pick else "-":32} {("£"+str(pick["price_gbp"])+" "+str(oos or "")) if pick else "-":18} nvar={len(sv)} instock={len(instock)}')

print("\n--- FULL VARIANT TABLE (all single vials) ---")
prods = {p["id"]: p for p in d["products"]}
for pid in sorted(set(mapping.values())):
    sv = [v for v in d["variants"] if v["product_id"] == pid and v.get("product_type") == "single_vial"]
    sv.sort(key=lambda v: (v.get("price_gbp") or 0))
    parts = [f'{v["dose"]}=£{v["price_gbp"]}{"" if v.get("in_stock") else " (OOS)"} [stk={v.get("stock_count")}]' for v in sv]
    print(f'{pid:22} {" | ".join(parts)}')
