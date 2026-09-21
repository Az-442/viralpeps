#!/usr/bin/env python3
import json, collections
path='src/data/vendors.json'
data=json.load(open(path), object_pairs_hook=collections.OrderedDict)
new={
 "id":"spx-labs",
 "name":"SPX Labs",
 "slug":"spx-labs",
 "website":"https://spxlabs.co.uk",
 "rating":4.0,
 "verified":False,
 "founded":2026,
 "country":"UK",
 "description":"SPX Labs is a Belfast-based UK research peptide and compound supplier focused on batch traceability, product specifications and analytical documentation over blanket purity claims. It offers an initial research range covering BPC-157, TB-500, GHK-Cu, CJC-1295, Ipamorelin, MOTS-C, Retatrutide and Tesamorelin alongside bacteriostatic water, each assigned identifiable batch references with available COA/analytical records tied to product and batch. Research-use-only labelling, an 18+ research-gated website, a growing COA library and quality-testing reference content support laboratory evaluation. Stocked and dispatched from within the UK.",
 "highlights":[
  "Belfast, Northern Ireland based (UK dispatch)",
  "Batch traceability on every product",
  "Batch/COA analytical documentation where available",
  "Research-use-only, 18+ gated site",
  "UK dispatch with tracked options where selected",
  "Quality & testing reference content (HPLC, LC-MS, COA guide)"
 ],
 "shipping":[
  "UK dispatch (stocked & shipped from within the United Kingdom)",
  "Tracking provided where a tracked service is selected",
  "International offered at checkout where available"
 ],
 "payment":[
  "Bank transfer (BACS)",
  "Secure online checkout (payments processed at checkout)"
 ],
 "lastTested":"",
 "labTested":True,
 "_autoChecks":{}
}
# ensure unique id/slug not already present
assert not any(x.get('slug')=='spx-labs' for x in data), "slug exists"
data.append(new)
with open(path,'w') as f:
    json.dump(data,f,indent=2,ensure_ascii=False)
    f.write("\n")
print("vendors.json now has", len(data), "vendors")
