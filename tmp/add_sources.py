#!/usr/bin/env python3
import json
path='src/data/compounds.json'
data=json.load(open(path))

# SPX Labs source entries to add per compound slug
# (slug, url, price, local image slug, inStock)
adds = {
 "bpc-157": [("https://spxlabs.co.uk/product/bpc-157-uk-10mg/","\u00a327.99","bpc-157")],
 "bpc-157-tb-500": [("https://spxlabs.co.uk/product/bpc-157-tb-500-uk-10mg/","\u00a332.99","bpc-157-tb-500")],
 "cjc-1295-no-dac": [("https://spxlabs.co.uk/product/cjc-1295-no-dac-uk-5mg/","\u00a327.99","cjc-1295-no-dac")],
 "cjc-1295-ipamorelin": [("https://spxlabs.co.uk/product/cjc-1295-ipamorelin-uk-10mg/","\u00a334.99","cjc-1295-ipamorelin")],
 "ghk-cu": [("https://spxlabs.co.uk/product/ghk-cu-uk-50mg/","\u00a318.99","ghk-cu")],
 "ipamorelin": [("https://spxlabs.co.uk/product/ipamorelin-uk-5mg/","\u00a321.99","ipamorelin")],
 "mots-c": [("https://spxlabs.co.uk/product/mots-c-uk-10mg/","\u00a326.99","mots-c")],
 "retatrutide": [("https://spxlabs.co.uk/product/retatrutide-uk-10mg/","\u00a335.00","retatrutide"),
                 ("https://spxlabs.co.uk/product/retatrutide-uk-20mg/","\u00a350.00","retatrutide-20mg")],
 "tb-500": [("https://spxlabs.co.uk/product/tb-500-uk-5mg/","\u00a324.99","tb-500")],
 "tesamorelin": [("https://spxlabs.co.uk/product/tesamorelin-uk-10mg/","\u00a332.99","tesamorelin")],
 "bacteriostatic-water": [("https://spxlabs.co.uk/product/bacteriostatic-water-uk-10ml/","\u00a35.00","bacteriostatic-water")],
}

by={it['slug']:it for it in data}
count=0
for slug, lst in adds.items():
    if slug not in by:
        print("MISSING compound:", slug); continue
    # verify not already added
    existing_vendors=[s.get('vendor') for s in (by[slug].get('sources') or [])]
    if "SPX Labs" in existing_vendors:
        print("SKIP already has SPX:", slug); continue
    srcs=by[slug].setdefault('sources',[])
    for url,price,img in lst:
        srcs.append({
          "vendor":"SPX Labs",
          "url":url,
          "price":price,
          "inStock":True,
          "image":f"/images/products/spx-labs/{img}.webp"
        })
        count+=1
    print(f"added to {slug}: {len(lst)}")
print("TOTAL added:", count)
with open(path,'w') as f:
    json.dump(data,f,indent=2,ensure_ascii=False)
    f.write("\n")
