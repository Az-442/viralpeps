#!/usr/bin/env python3
import subprocess, json
# Map product page slug -> (compound local slug)
mapping = [
    ("bpc-157-uk-10mg",              "bpc-157"),
    ("bpc-157-tb-500-uk-10mg",       "bpc-157-tb-500"),
    ("cjc-1295-no-dac-uk-5mg",       "cjc-1295-no-dac"),
    ("cjc-1295-ipamorelin-uk-10mg",  "cjc-1295-ipamorelin"),
    ("ghk-cu-uk-50mg",               "ghk-cu"),
    ("ipamorelin-uk-5mg",            "ipamorelin"),
    ("mots-c-uk-10mg",               "mots-c"),
    ("retatrutide-uk-10mg",          "retatrutide"),
    ("retatrutide-uk-20mg",          "retatrutide"),
    ("tb-500-uk-5mg",                "tb-500"),
    ("tesamorelin-uk-10mg",          "tesamorelin"),
    ("bacteriostatic-water-uk-10ml", "bacteriostatic-water"),
]
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0"
out=[]
for prod, comp in mapping:
    page=f"https://spxlabs.co.uk/product/{prod}/"
    html = subprocess.run(["curl","-sL","-A",UA,page],capture_output=True,text=True).stdout
    import re
    m=re.search(r'<meta property="og:image" content="([^"]+)"', html)
    img = m.group(1) if m else None
    out.append({"product":prod,"compound":comp,"og_image":img})
print(json.dumps(out,indent=2))
