import json

d = json.load(open('tmp/_peptx_live.json'))
prods = {p["id"]: p for p in d["products"]}

# Task file claims: slug -> (price, dose)
task = {
 "tirzepatide": ("£46.99", "10mg"), "semaglutide": ("£42.99", "20mg"),
 "retatrutide": ("£43.99", "10mg"), "bpc-157": ("£27.99", "10mg"),
 "ghk-cu": ("£21.99", "50mg"), "tesamorelin": ("£41.99", "10mg"),
 "mots-c": ("£22.99", "10mg"), "ss-31": ("£32.99", "10mg"),
 "selank": ("£24.99", "10mg"), "semax": ("£24.99", "10mg"),
 "kisspeptin-10": ("£24.99", "5mg"), "pt-141": ("£23.99", "10mg"),
 "nad": ("£28.99", "500mg"), "kpv": ("£25.99", "10mg"),
 "sermorelin": ("£32.99", "10mg"), "ipamorelin": ("£19.99", "5mg"),
 "dsip": ("£19.99", "5mg"), "mt-1": ("£20.99", "10mg"),
 "ahk-cu": ("£24.99", "100mg"), "5-amino-1mq": ("£24.99", "50mg"),
 "ara-290": ("£34.99", "16mg"), "cartalax": ("£45.99", "40mg"),
 "pe-22-28": ("£25.99", "10mg"), "mazdutide": ("£27.99", "10mg"),
 "ta-1-thymosin-alpha-1": ("£25.99", "5mg"), "klow-blend": ("£63.99", "80mg"),
 "glutathione": ("£19.99", "1500mg"), "l-carnitine": ("£16.99", None),
 "oxytocin-acetate": ("£23.99", "5mg"), "eloralintide": (None, "5mg"),
}

# map VP slug -> peptx product id
mapping = {
 "tirzepatide":"sv-tirzepatide","semaglutide":"sv-semaglutide","retatrutide":"sv-retatrutide",
 "bpc-157":"sv-bpc157","ghk-cu":"sv-ghk-cu","tesamorelin":"sv-tesamorelin","mots-c":"sv-mots-c",
 "ss-31":"sv-ss-31","selank":"sv-selank","semax":"sv-semax","kisspeptin-10":"sv-kisspeptin-10",
 "pt-141":"sv-pt-141","nad":"sv-nad-plus","kpv":"sv-kpv","sermorelin":"sv-sermorelin",
 "ipamorelin":"sv-ipamorelin","dsip":"sv-dsip","mt-1":"sv-mt-1","ahk-cu":"sv-ahk-cu",
 "5-amino-1mq":"sv-5-amino-1mq","ara-290":"sv-ara-290","cartalax":"sv-cartalax",
 "pe-22-28":"sv-pe-22-28","mazdutide":"sv-mazdutide","ta-1-thymosin-alpha-1":"sv-ta1",
 "klow-blend":"sv-klow","glutathione":"sv-glutathione","l-carnitine":"sv-l-carnitine",
 "oxytocin-acetate":"sv-oxytocin","eloralintide":"sv-eloralintide",
}

for slug, pid in mapping.items():
    p = prods.get(pid)
    sv = [v for v in d["variants"] if v["product_id"] == pid and v.get("product_type") == "single_vial"]
    sv.sort(key=lambda v: (v.get("display_order") or 999))
    cheapest = None
    for v in sv:
        pg = v.get("price_gbp")
        if pg is None: continue
        if cheapest is None or pg < cheapest[0]:
            cheapest = (pg, v["dose"], v.get("in_stock"), v.get("stock_count"))
    tf = task.get(slug, (None,None))
    live = f"£{cheapest[0]}" if cheapest else "NONE"
    flag = ""
    if cheapest and tf[0]:
        tfn = float(tf[0].replace("£",""))
        if abs(tfn - cheapest[0]) > 0.01:
            flag = f"  <<< MISMATCH task={tf[0]} live={live} (diff {tfn-cheapest[0]:+.2f})"
    print(f'{slug:24} task={str(tf[0]):8} live={live:9} dose={str(cheapest[1]) if cheapest else "-":28} stock={cheapest[3] if cheapest else "-"}{flag}')
