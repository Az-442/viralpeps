#!/usr/bin/env python3
import json, os, re, html as H

d = os.path.dirname(os.path.abspath(__file__))
for slug in ["bpc-157", "mots-c", "tb-500"]:
    html = open(os.path.join(d, slug + ".html"), encoding="utf-8", errors="replace").read()
    # extract data-product_variations JSON attribute
    m = re.search(r'data-product_variations="([^"]+)"', html)
    if not m:
        print(slug, "-> no variations attr"); continue
    raw = H.unescape(m.group(1))
    try:
        v = json.loads(raw)
    except Exception as e:
        print(slug, "parse err", e); continue
    print("=====", slug, "=====")
    for var in v:
        attrs = var.get("attributes", {})
        print(" ", attrs.get("attribute_size") or attrs, "->", var.get("display_price"), var.get("display_regular_price"), "stock", var.get("is_in_stock"), var.get("max_qty"))
